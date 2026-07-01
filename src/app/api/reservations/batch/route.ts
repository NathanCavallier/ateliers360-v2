import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { z } from 'zod';
import { getContactRecipient, sendReservationConfirmation, sendEmail } from '@/lib/email';

type IncomingReservation = {
  atelier_id: number;
  nom: string;
  email: string;
  participants_count: number;
  date_atelier: string; // YYYY-MM-DD
  etablissement?: string | null;
  adresse?: string | null;
};

const batchSchema = z.object({
  reservations: z.array(
    z.object({
      atelier_id: z.number().int().positive(),
      nom: z.string().min(2),
      email: z.string().email(),
      participants_count: z.number().int().positive(),
      date_atelier: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      etablissement: z.string().optional().nullable(),
      adresse: z.string().optional().nullable(),
    }),
  ),
  paymentMode: z.enum(['payment', 'reserve']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reservations, paymentMode } = batchSchema.parse(body);

    if (!Array.isArray(reservations) || reservations.length === 0) {
      return NextResponse.json({ success: false, error: 'Aucune réservation fournie' }, { status: 400 });
    }

    // Générer un groupId pour l'ensemble des réservations
    const groupId = typeof crypto !== 'undefined' && (crypto as any).randomUUID
      ? (crypto as any).randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Préparer les enregistrements à insérer
    const now = new Date().toISOString();
    const status = paymentMode === 'reserve' ? 'confirmed' : 'pending';
    const toInsert = reservations.map((r) => ({
      atelier_id: r.atelier_id,
      nom: r.nom,
      email: r.email,
      etablissement: r.etablissement || null,
      adresse: r.adresse || null,
      participants_count: r.participants_count,
      date_atelier: r.date_atelier,
      status,
      group_id: groupId,
      created_at: now,
      updated_at: now,
    }));

    const { data, error } = await supabaseAdmin.from('reservations').insert(toInsert).select();

    if (error) {
      console.error('Error inserting batch reservations:', error);
      const msg = error.message || 'Erreur lors de la création des réservations';
      const isMissingGroupId = /column \"group_id\" of relation \"reservations\" does not exist/i.test(msg);

      if (isMissingGroupId) {
        return NextResponse.json(
          {
            success: false,
            error: 'La colonne group_id est manquante dans la table reservations',
            details: msg,
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: msg,
          details: process.env.NODE_ENV === 'development' ? error : undefined,
        },
        { status: 500 },
      );
    }

    if (paymentMode === 'reserve' && data && data.length) {
      const atelierIds = Array.from(new Set(data.map((r: any) => r.atelier_id)));
      const { data: ateliersData } = await supabaseAdmin
        .from('ateliers')
        .select('id, titre')
        .in('id', atelierIds);
      const atelierMap = new Map<number, string>();
      (ateliersData || []).forEach((atelier: any) => atelierMap.set(atelier.id, atelier.titre));

      await Promise.all(
        (data as any[]).map(async (reservation) => {
          try {
            await sendReservationConfirmation({
              nom: reservation.nom,
              email: reservation.email,
              workshopTitle: atelierMap.get(reservation.atelier_id) || 'Atelier Ateliers 360',
              date: new Date(reservation.date_atelier).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              participants: reservation.participants_count,
            });
          } catch (emailError) {
            console.error('Erreur envoi email de réservation sans paiement:', emailError);
          }
        }),
      );

      try {
        const summaryHtml = `
          <h3>Réservations sans paiement immédiat - group_id: ${groupId}</h3>
          <p>${data.length} réservation(s) enregistrée(s) sans paiement immédiat :</p>
          <ul>
            ${data
              .map(
                (r: any) =>
                  `<li>${r.nom} — ${r.email} — ${atelierMap.get(r.atelier_id) || 'Atelier'} — ${r.date_atelier} — ${r.participants_count} pers.</li>`,
              )
              .join('')}
          </ul>
        `;

        const adminEmail = getContactRecipient({ requestType: "reservation" }) || process.env.ADMIN_EMAIL || 'admin@ateliers360.fr';
        await sendEmail({
          to: adminEmail,
          subject: `Réservation sans paiement immédiat reçue (${data.length})`,
          html: summaryHtml,
        });
      } catch (summaryError) {
        console.error('Erreur envoi email admin summary pour réservations sans paiement:', summaryError);
      }
    }

    return NextResponse.json({ success: true, groupId, reservations: data, paymentMode }, { status: 201 });
  } catch (err) {
    console.error('Batch reservation error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST with reservations payload.',
      methods: ['POST'],
    },
    { status: 405 },
  );
}
