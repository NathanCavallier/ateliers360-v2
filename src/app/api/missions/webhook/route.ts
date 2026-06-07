// src/app/api/missions/webhook/route.ts
// Webhook Stripe pour les paiements de missions Passerelle Jeunesse

import { NextResponse, NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendEmail } from '@/lib/email';

interface PaymentConfirmationEmail {
  guardianEmail: string;
  youngName: string;
  missionId: string;
  amount: number;
  transactionId: string;
}

function getPaymentConfirmationEmail({
  youngName,
  missionId,
  amount,
  transactionId,
}: PaymentConfirmationEmail): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paiement confirmé - Passerelle Jeunesse</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                ✓ Paiement confirmé
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #ecfdf5; font-size: 14px;">
                                Acompte Passerelle Jeunesse
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px;">
                            <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px;">
                                Merci pour votre paiement !
                            </p>

                            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                L'acompte de sécurité pour l'accompagnement de <strong>${youngName}</strong> a été reçu et confirmé. Votre demande de mission est maintenant en phase de préparation.
                            </p>

                            <!-- Payment Details -->
                            <div style="background-color: #f9fafb; border-left: 4px solid #059669; padding: 16px; margin: 24px 0; border-radius: 6px;">
                                <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 14px; font-weight: 600;">
                                    Récapitulatif du paiement :
                                </h3>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">
                                            <strong>Montant :</strong> ${amount.toFixed(2)} €
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">
                                            <strong>Référence :</strong> ${transactionId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">
                                            <strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                <strong>Prochaines étapes :</strong>
                            </p>
                            <ol style="margin: 0 0 24px 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
                                <li>Notre équipe confirmera les détails de la mission</li>
                                <li>Un responsable vous appellera pour finaliser le planning</li>
                                <li>Documents et contrats seront signés numériquement</li>
                                <li>Mise en place de l'accompagnement</li>
                            </ol>

                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                                Vous pouvez suivre l'avancement de votre mission en utilisant la référence <strong>${missionId}</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                © 2026 Ateliers 360 & Passerelle Jeunesse. Tous droits réservés.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const body = await req.text();

    if (!stripe) {
      console.error('Stripe not configured');
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      const missionId = paymentIntent.metadata?.mission_id;
      const youngName = paymentIntent.metadata?.young_name;
      const guardianEmail = paymentIntent.receipt_email;

      console.log('Payment succeeded:', {
        missionId,
        youngName,
        guardianEmail,
        amount: paymentIntent.amount / 100,
      });

      if (missionId && guardianEmail) {
        // Update mission status in Supabase
        const { error: updateError } = await supabaseAdmin
          .from('mission_requests')
          .update({
            status: 'paid',
            stripe_payment_id: paymentIntent.id,
            stripe_session_id: paymentIntent.charges.data[0]?.payment_method_details?.card?.wallet?.type || 'card',
            updated_at: new Date().toISOString(),
          })
          .eq('id', missionId);

        if (updateError) {
          console.error('Error updating mission status:', updateError);
        }

        // Send confirmation email
        const emailSent = await sendEmail({
          to: guardianEmail,
          subject: 'Paiement confirmé - Passerelle Jeunesse',
          html: getPaymentConfirmationEmail({
            guardianEmail,
            youngName,
            missionId,
            amount: paymentIntent.amount / 100,
            transactionId: paymentIntent.id,
          }),
        });

        console.log('Confirmation email sent:', emailSent);

        // Send internal notification
        await sendEmail({
          to: process.env.PASSERELLE_TEAM_EMAIL || 'contact@ateliers360.fr',
          subject: `[PAIEMENT REÇU] Mission ${missionId} - ${youngName}`,
          html: `
            <h2>Paiement de mission reçu</h2>
            <ul>
              <li><strong>ID Mission :</strong> ${missionId}</li>
              <li><strong>Jeune :</strong> ${youngName}</li>
              <li><strong>Email :</strong> ${guardianEmail}</li>
              <li><strong>Montant :</strong> ${(paymentIntent.amount / 100).toFixed(2)} €</li>
              <li><strong>Transaction Stripe :</strong> ${paymentIntent.id}</li>
              <li><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</li>
            </ul>
          `,
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
