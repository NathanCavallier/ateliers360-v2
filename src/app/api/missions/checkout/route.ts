// src/app/api/missions/checkout/route.ts
// API pour initier le paiement Stripe d'un acompte mission Passerelle Jeunesse

import { NextResponse, NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';

interface CheckoutRequest {
  missionId: string;
  youngName: string;
  guardianEmail: string;
  amount: number; // Montant en euros
  estimatedDays: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json();

    if (
      !body.missionId ||
      !body.youngName ||
      !body.guardianEmail ||
      !body.amount ||
      body.amount <= 0
    ) {
      return NextResponse.json(
        { error: 'Paramètres manquants ou invalides' },
        { status: 400 }
      );
    }

    if (!stripe) {
      console.error('Stripe non configuré');
      return NextResponse.json(
        { error: 'Stripe n\'est pas configuré' },
        { status: 500 }
      );
    }

    // Déterminer le pourcentage d'acompte (20% par défaut)
    const depositPercentage = 0.2;
    const depositAmount = Math.round(body.amount * depositPercentage * 100); // En centimes

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Accompagnement Passerelle Jeunesse - ${body.youngName}`,
              description: `Acompte de sécurité (20% du tarif estimé) - ${body.estimatedDays} jour(s)`,
              images: [
                'https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/sign/images/logo_Ateliers360.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtlY',
              ],
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: body.guardianEmail,
      metadata: {
        mission_id: body.missionId,
        young_name: body.youngName,
        mission_type: 'passerelle_mobility',
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.ateliers360.fr'}/fr/demander-mission?status=success&missionId=${body.missionId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.ateliers360.fr'}/fr/demander-mission?status=cancelled`,
      billing_address_collection: 'required',
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Impossible de créer la session de paiement' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        checkoutUrl: session.url,
        sessionId: session.id,
        depositAmount: depositAmount / 100, // Retourner le montant en euros
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la création du checkout:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'initialisation du paiement' },
      { status: 500 }
    );
  }
}
