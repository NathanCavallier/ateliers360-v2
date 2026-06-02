import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Initialiser Stripe uniquement si la clé est présente
export const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-11-17.clover',
    typescript: true,
}) : null;

// Helper pour vérifier si Stripe est configuré
function ensureStripe() {
    if (!stripe) {
        throw new Error('Stripe n\'est pas configuré. Veuillez ajouter STRIPE_SECRET_KEY dans .env.local');
    }
    return stripe;
}

// Helper pour créer une session de checkout
export async function createCheckoutSession({
    reservationId,
    workshopTitle,
    amount,
    email,
    successUrl,
    cancelUrl,
}: {
    reservationId: number;
    workshopTitle: string;
    amount: number;
    email: string;
    successUrl: string;
    cancelUrl: string;
}) {
    const stripeClient = ensureStripe();
    const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: `Atelier: ${workshopTitle}`,
                        description: 'Réservation d\'atelier Ateliers 360',
                    },
                    unit_amount: Math.round(amount * 100), // Stripe utilise les centimes
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        customer_email: email,
        metadata: {
            reservation_id: reservationId.toString(),
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
    });

    return session;
}

// Helper pour récupérer une session
export async function getCheckoutSession(sessionId: string) {
    const stripeClient = ensureStripe();
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);
    return session;
}

// Helper pour construire l'événement webhook
export function constructWebhookEvent(
    payload: string | Buffer,
    signature: string
): Stripe.Event {
    const stripeClient = ensureStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error('STRIPE_WEBHOOK_SECRET est manquant');
    }

    return stripeClient.webhooks.constructEvent(payload, signature, webhookSecret);
}
