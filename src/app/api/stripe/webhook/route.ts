import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  // Import dynamique pour éviter les erreurs au build
  const { constructWebhookEvent } = await import('@/lib/stripe');
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Signature manquante',
        },
        { status: 400 }
      );
    }

    // Vérifier et construire l'événement webhook
    const event = constructWebhookEvent(body, signature);

    // Gérer les différents types d'événements
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Vérifier si la session contient un group_id (paiement groupé)
        const reservationId = session.metadata?.reservation_id;
        const groupId = session.metadata?.group_id;

        if (groupId) {
          // Récupérer les réservations du groupe
          const { data: reservations, error: fetchErr } = await supabaseAdmin
            .from('reservations')
            .select('*, ateliers(*)')
            .eq('group_id', groupId);

          if (fetchErr || !reservations || reservations.length === 0) {
            console.error(
              'Aucune réservation trouvée pour group_id',
              groupId,
              fetchErr
            );
            break;
          }

          // Mettre à jour toutes les réservations du groupe vers 'paid'
          const { error: updateErr } = await supabaseAdmin
            .from('reservations')
            .update({ status: 'paid', updated_at: new Date().toISOString() })
            .eq('group_id', groupId);

          if (updateErr) {
            console.error(
              'Erreur lors de la mise à jour des réservations du groupe:',
              updateErr
            );
            break;
          }

          console.log(
            `Réservations du groupe ${groupId} marquées comme payées (${reservations.length})`
          );

          const {
            sendReservationConfirmation,
            sendAdminNotification,
            sendEmail,
          } = await import('@/lib/email');

          // Envoyer un email de confirmation à chaque client
          await Promise.all(
            reservations.map(async (r: any) => {
              try {
                await sendReservationConfirmation({
                  nom: r.nom,
                  email: r.email,
                  workshopTitle: r.ateliers?.titre || 'Atelier',
                  date: new Date(r.date_atelier).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                  participants: r.participants_count,
                });
              } catch (e) {
                console.error('Erreur envoi email confirmation client:', e);
              }
            })
          );

          // Envoyer un email synthèse à l'admin
          try {
            const adminEmail =
              process.env.ADMIN_EMAIL || 'admin@ateliers360.fr';
            const summaryHtml = `
                            <h3>Paiement groupé reçu - group_id: ${groupId}</h3>
                            <p>${reservations.length} réservation(s) marquées comme payées :</p>
                            <ul>
                            ${reservations.map((r: any) => `<li>${r.nom} — ${r.email} — ${r.ateliers?.titre} — ${r.date_atelier} — ${r.participants_count} pers.</li>`).join('')}
                            </ul>
                        `;

            await sendEmail({
              to: adminEmail,
              subject: `Paiement groupé reçu (${reservations.length} réservations)`,
              html: summaryHtml,
            });
          } catch (e) {
            console.error('Erreur envoi email admin summary:', e);
          }

          break;
        }

        if (reservationId) {
          // Récupérer les détails de la réservation
          const { data: reservation, error: fetchError } = await supabaseAdmin
            .from('reservations')
            .select('*, ateliers(*)')
            .eq('id', reservationId)
            .single();

          if (fetchError || !reservation) {
            console.error(
              'Erreur lors de la récupération de la réservation:',
              fetchError
            );
            break;
          }

          // Assertion de type pour éviter les erreurs TypeScript
          const typedReservation = reservation as any;

          // Mettre à jour le statut de la réservation
          const updateData: Record<string, any> = {
            status: 'paid',
            updated_at: new Date().toISOString(),
          };
          const { error } = await supabaseAdmin
            .from('reservations')
            .update(updateData as never)
            .eq('id', reservationId);

          if (error) {
            console.error(
              'Erreur lors de la mise à jour de la réservation:',
              error
            );
          } else {
            console.log(`Réservation ${reservationId} marquée comme payée`);

            // Envoyer les emails de confirmation
            const { sendReservationConfirmation, sendAdminNotification } =
              await import('@/lib/email');

            await Promise.all([
              sendReservationConfirmation({
                nom: typedReservation.nom,
                email: typedReservation.email,
                workshopTitle: typedReservation.ateliers.titre,
                date: new Date(
                  typedReservation.date_atelier
                ).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                participants: typedReservation.participants_count,
              }),
              sendAdminNotification({
                nom: typedReservation.nom,
                email: typedReservation.email,
                workshopTitle: typedReservation.ateliers.titre,
                date: new Date(
                  typedReservation.date_atelier
                ).toLocaleDateString('fr-FR'),
                participants: typedReservation.participants_count,
                etablissement: typedReservation.etablissement,
              }),
            ]);

            console.log('Emails de confirmation envoyés');
          }
        } else {
          console.error(
            'ID de réservation et group_id manquants dans les métadonnées'
          );
        }

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent réussi:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Échec du paiement:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook Stripe:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 400 }
    );
  }
}
