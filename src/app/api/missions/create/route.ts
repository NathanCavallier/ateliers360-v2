// src/app/api/missions/create/route.ts
// API pour créer une demande de mission Passerelle Jeunesse

import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendEmail } from '@/lib/email';
import { stripe } from '@/lib/stripe';

interface MissionRequest {
  guardianName: string;
  email: string;
  phone: string;
  youngName: string;
  age: number;
  dates: string;
  departure: string;
  arrival: string;
  details: string;
}

// Validation de l'email
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sanitize text input
function sanitizeText(s?: string | null): string | null {
  if (!s) return null;
  const trimmed = String(s).trim();
  return trimmed.length > 5000 ? trimmed.slice(0, 5000) : trimmed;
}

/**
 * Template email de confirmation de mission
 */
function getMissionConfirmationEmail({
  guardianName,
  youngName,
  dates,
  departure,
  arrival,
}: {
  guardianName: string;
  youngName: string;
  dates: string;
  departure: string;
  arrival: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande de mission reçue - Passerelle Jeunesse</title>
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
                                ✓ Demande de mission reçue
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #ecfdf5; font-size: 14px;">
                                Passerelle Jeunesse
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px;">
                            <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px;">
                                Bonjour ${sanitizeText(guardianName) || 'responsable'},
                            </p>

                            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                Votre demande d'accompagnement pour <strong>${sanitizeText(youngName)}</strong> a été reçue. Notre équipe va l'examiner et vous contactera dans les 48 heures pour confirmer les détails et finaliser la mission.
                            </p>

                            <!-- Mission Details -->
                            <div style="background-color: #f9fafb; border-left: 4px solid #059669; padding: 16px; margin: 24px 0; border-radius: 6px;">
                                <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 14px; font-weight: 600;">
                                    Détails de la mission :
                                </h3>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">
                                            <strong>Jeune :</strong> ${sanitizeText(youngName)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">
                                            <strong>Dates :</strong> ${sanitizeText(dates)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #6b7280; font-size: 13px;">
                                            <strong>Trajet :</strong> ${sanitizeText(departure)} → ${sanitizeText(arrival)}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                <strong>Prochaines étapes :</strong>
                            </p>
                            <ol style="margin: 0 0 24px 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.8;">
                                <li>Réception et étude de votre demande</li>
                                <li>Appel de confirmation dans les 48h</li>
                                <li>Envoi du devis et des conditions</li>
                                <li>Signature numérique du contrat</li>
                                <li>Mise en place de l'accompagnement</li>
                            </ol>

                            <!-- CTA -->
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="https://www.ateliers360.fr/fr/passerelle-jeunesse" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px;">
                                    En savoir plus sur Passerelle Jeunesse
                                </a>
                            </div>

                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                                Des questions ? Vous pouvez nous répondre directement à cet email ou nous contacter au <strong>contact@ateliers360.fr</strong>
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

/**
 * Email interne pour l'équipe
 */
function getInternalMissionEmail(missionData: MissionRequest): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: sans-serif; color: #333;">
    <h2>Nouvelle demande de mission Passerelle Jeunesse</h2>

    <h3>Responsable</h3>
    <ul>
        <li><strong>Nom :</strong> ${sanitizeText(missionData.guardianName)}</li>
        <li><strong>Email :</strong> ${sanitizeText(missionData.email)}</li>
        <li><strong>Téléphone :</strong> ${sanitizeText(missionData.phone)}</li>
    </ul>

    <h3>Jeune</h3>
    <ul>
        <li><strong>Prénom :</strong> ${sanitizeText(missionData.youngName)}</li>
        <li><strong>Âge :</strong> ${missionData.age}</li>
    </ul>

    <h3>Mission</h3>
    <ul>
        <li><strong>Dates :</strong> ${sanitizeText(missionData.dates)}</li>
        <li><strong>Départ :</strong> ${sanitizeText(missionData.departure)}</li>
        <li><strong>Arrivée :</strong> ${sanitizeText(missionData.arrival)}</li>
    </ul>

    <h3>Contexte et besoins</h3>
    <p style="white-space: pre-wrap;">${sanitizeText(missionData.details)}</p>

    <hr>
    <p><strong>Date reçue :</strong> ${new Date().toLocaleString('fr-FR')}</p>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: MissionRequest = await req.json();

    // Validation
    if (
      !body.guardianName ||
      !body.email ||
      !body.phone ||
      !body.youngName ||
      !body.age ||
      !body.dates ||
      !body.departure ||
      !body.arrival ||
      !body.details
    ) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    if (body.age < 6 || body.age > 25) {
      return NextResponse.json(
        { error: 'L\'âge doit être entre 6 et 25 ans' },
        { status: 400 }
      );
    }

    // Store in Supabase
    const { data, error } = await supabaseAdmin
      .from('mission_requests')
      .insert({
        guardian_name: sanitizeText(body.guardianName),
        email: sanitizeText(body.email),
        phone: sanitizeText(body.phone),
        young_name: sanitizeText(body.youngName),
        age: body.age,
        dates: sanitizeText(body.dates),
        departure: sanitizeText(body.departure),
        arrival: sanitizeText(body.arrival),
        details: sanitizeText(body.details),
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select('id');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de la demande' },
        { status: 500 }
      );
    }

    const missionId = data?.[0]?.id;

    // Send confirmation email to guardian
    const confirmationSent = await sendEmail({
      to: body.email,
      subject: 'Votre demande de mission Passerelle Jeunesse - Confirmation',
      html: getMissionConfirmationEmail(body),
    });

    // Send internal notification to team
    const internalEmailSent = await sendEmail({
      to: process.env.PASSERELLE_TEAM_EMAIL || 'contact@ateliers360.fr',
      subject: `[NOUVELLE MISSION] ${body.guardianName} - ${body.youngName}`,
      html: getInternalMissionEmail(body),
    });

    console.log(
      'Mission emails sent:',
      { confirmationSent, internalEmailSent }
    );

    return NextResponse.json(
      {
        success: true,
        missionId,
        message: 'Votre demande a été reçue. Nous vous contacterons dans les 48 heures.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating mission:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
