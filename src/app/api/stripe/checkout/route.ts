import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-server';
import { z } from 'zod';

const checkoutSchema = z.object({
  reservationId: z.number().int().positive().optional(),
  groupId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reservationId, groupId } = checkoutSchema.parse(body);

    const origin = request.headers.get('origin') || 'http://localhost:3000';

      // Ensure Supabase server client is available
    if (!supabaseAdmin) {
      return NextResponse.json(
        { success: false, error: 'Supabase admin client not configured' },
        { status: 500 }
      );
    }

    // Cas: paiement pour un seul id de réservation
    if (reservationId) {
      const { data: reservation, error: resError } = await supabaseAdmin
        .from('reservations')
        .select('*, ateliers(*)')
        .eq('id', reservationId)
        .single();

      if (resError || !reservation) {
        return NextResponse.json(
          { success: false, error: 'Réservation non trouvée' },
          { status: 404 }
        );
      }

      const typedReservation = reservation as any;

      if (
        typedReservation.status === 'paid' ||
        typedReservation.status === 'confirmed'
      ) {
        return NextResponse.json(
          { success: false, error: 'Cette réservation a déjà été payée' },
          { status: 400 }
        );
      }

      // Créer la session Stripe pour une réservation
      if (!stripe) throw new Error('Stripe non configuré');

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Atelier: ${typedReservation.ateliers.titre}`,
                description: 'Réservation Ateliers 360',
              },
              unit_amount: Math.round(
                typedReservation.ateliers.tarif_eur * 100
              ),
            },
            quantity: typedReservation.participants_count || 1,
          },
        ],
        mode: 'payment',
        customer_email: typedReservation.email,
        metadata: { reservation_id: String(typedReservation.id) },
        success_url: `${origin}/fr/reserver/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/fr/reserver?atelier=${typedReservation.atelier_id}&canceled=true`,
      });

      // Mettre à jour la réservation avec l'ID Stripe
      await supabaseAdmin
        .from('reservations')
        .update({ stripe_session_id: session.id })
        .eq('id', reservationId);

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        url: session.url,
      });
    }

    // Cas: paiement pour un groupe de réservations
    if (groupId) {
      const { data: reservations, error: resError } = await supabaseAdmin
        .from('reservations')
        .select('*, ateliers(*)')
        .eq('group_id', groupId);

      if (resError || !reservations || reservations.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Réservations du groupe introuvables' },
          { status: 404 }
        );
      }

      if (!stripe) throw new Error('Stripe non configuré');

      // Construire les line_items agrégés par atelier pour éviter les lignes redondantes
      const itemsMap = new Map<
        string,
        { name: string; unit_amount: number; quantity: number }
      >();

      for (const r of reservations as any[]) {
        const key = String(r.atelier_id);
        const price = Math.round((r.ateliers?.tarif_eur || 0) * 100);
        const qty = r.participants_count || 1;

        if (itemsMap.has(key)) {
          const existing = itemsMap.get(key)!;
          existing.quantity += qty;
        } else {
          itemsMap.set(key, {
            name: `Atelier: ${r.ateliers?.titre || key}`,
            unit_amount: price,
            quantity: qty,
          });
        }
      }

      const line_items = Array.from(itemsMap.values()).map((it) => ({
        price_data: {
          currency: 'eur',
          product_data: { name: it.name },
          unit_amount: it.unit_amount,
        },
        quantity: it.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        // si possible, prendre l'email de la première réservation
        customer_email: (reservations as any[])[0]?.email || undefined,
        metadata: { group_id: String(groupId) },
        success_url: `${origin}/fr/reserver/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/fr/reserver?canceled=true`,
      });

      // Mettre à jour toutes les réservations avec l'id Stripe
      await supabaseAdmin
        .from('reservations')
        .update({ stripe_session_id: session.id })
        .eq('group_id', groupId);

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        url: session.url,
      });
    }

    return NextResponse.json(
      { success: false, error: 'reservationId ou groupId requis' },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Erreur lors de la création de la session Stripe:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création de la session de paiement',
      },
      { status: 500 }
    );
  }
}
