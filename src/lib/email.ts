/// Fichier : src/lib/email.ts
// Configuration pour l'envoi d'emails avec Resend
// Documentation: https://resend.com/docs/send-with-nodejs

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL ||
    "Ateliers 360 <noreply@ateliers360.fr>";

if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY manquant. Les emails ne seront pas envoyés.");
}

/**
 * Envoie un email via l'API Resend
 */
export async function sendEmail(
    { to, subject, html, from }: EmailOptions,
): Promise<boolean> {
    if (!RESEND_API_KEY) {
        console.warn("Envoi d'email ignoré (RESEND_API_KEY manquant):", {
            to,
            subject,
        });
        return false;
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: from || FROM_EMAIL,
                to: [to],
                subject,
                html,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Erreur Resend:", error);
            return false;
        }

        const data = await response.json();
        console.log("Email envoyé avec succès:", data.id);
        return true;
    } catch (error) {
        console.error("Erreur lors de l'envoi d'email:", error);
        return false;
    }
}

/**
 * Template d'email de confirmation de réservation (Design amélioré)
 */
export function getReservationConfirmationEmail({
    nom,
    workshopTitle,
    date,
    participants,
    email,
}: {
    nom: string;
    workshopTitle: string;
    date: string;
    participants: number;
    email: string;
}): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Confirmation de réservation - Ateliers 360</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

                    <!-- Header avec gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #005B99 0%, #00A7C7 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Ateliers 360</h1>
                            <p style="margin: 12px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">✨ Confirmation de réservation</p>
                        </td>
                    </tr>

                    <!-- Success Badge -->
                    <tr>
                        <td style="padding: 30px 30px 0; text-align: center;">
                            <div style="display: inline-block; background-color: #d4edda; color: #155724; padding: 12px 24px; border-radius: 50px; font-size: 14px; font-weight: 600;">
                                Réservation confirmée
                            </div>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 30px 20px;">
                            <p style="margin: 0 0 20px; font-size: 18px; color: #333333; line-height: 1.6;">
                                Bonjour <strong>${nom}</strong>,
                            </p>
                            <p style="margin: 0 0 25px; font-size: 16px; color: #555555; line-height: 1.7;">
                                Merci d'avoir réservé un atelier chez <strong>Ateliers 360</strong> ! Nous sommes ravis de vous accueillir et de partager notre passion pour les sciences et la technologie.
                            </p>

                            <!-- Reservation Details Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%); border: 2px solid #00A7C7; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h2 style="margin: 0 0 20px; color: #005B99; font-size: 20px; font-weight: 700;">📋 Détails de votre réservation</h2>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                                    <span style="color: #6c757d; font-size: 14px;">Atelier</span>
                                                </td>
                                                <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #212529; font-size: 15px;">${workshopTitle}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                                    <span style="color: #6c757d; font-size: 14px;">Date</span>
                                                </td>
                                                <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #212529; font-size: 15px;">${date}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0; border-bottom: 1px solid #e9ecef;">
                                                    <span style="color: #6c757d; font-size: 14px;">Participants</span>
                                                </td>
                                                <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #212529; font-size: 15px;">${participants} personne${
        participants > 1 ? "s" : ""
    }</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px 0;">
                                                    <span style="color: #6c757d; font-size: 14px;">Contact</span>
                                                </td>
                                                <td style="padding: 10px 0; text-align: right;">
                                                    <strong style="color: #212529; font-size: 15px;">${email}</strong>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Next Steps -->
                            <h3 style="margin: 30px 0 15px; color: #005B99; font-size: 18px; font-weight: 700;">Prochaines étapes</h3>

                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 32px; vertical-align: top;">
                                                    <div style="width: 24px; height: 24px; background-color: #00A7C7; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold;">1</div>
                                                </td>
                                                <td style="padding-left: 12px; color: #555555; font-size: 15px; line-height: 1.6;">
                                                    Notre équipe vous contactera <strong>sous 48h</strong> pour confirmer les derniers détails
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 32px; vertical-align: top;">
                                                    <div style="width: 24px; height: 24px; background-color: #00A7C7; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold;">2</div>
                                                </td>
                                                <td style="padding-left: 12px; color: #555555; font-size: 15px; line-height: 1.6;">
                                                    Vous recevrez un <strong>rappel 48h avant</strong> la date de l'atelier
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 32px; vertical-align: top;">
                                                    <div style="width: 24px; height: 24px; background-color: #00A7C7; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: bold;">3</div>
                                                </td>
                                                <td style="padding-left: 12px; color: #555555; font-size: 15px; line-height: 1.6;">
                                                    Préparez vos questions et votre curiosité ! Tout le matériel sera fourni
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Contact Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px; background-color: #f8f9fa; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 12px; font-size: 15px; color: #333333; font-weight: 600;">📞 Besoin d'aide ?</p>
                                        <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.7;">
                                            Notre équipe est à votre disposition :<br>
                                            <a href="mailto:contact@ateliers360.fr" style="color: #00A7C7; text-decoration: none; font-weight: 500;">contact@ateliers360.fr</a><br>
                                            <a href="https://www.ateliers360.fr" style="color: #00A7C7; text-decoration: none; font-weight: 500;">www.ateliers360.fr</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px; color: #6c757d; font-size: 13px; line-height: 1.6;">
                                © 2025 <strong>Ateliers 360</strong> - Inspirer la prochaine génération d'innovateurs
                            </p>
                            <p style="margin: 0; font-size: 12px;">
                                <a href="https://www.ateliers360.fr/fr/politique-confidentialite" style="color: #00A7C7; text-decoration: none; margin: 0 8px;">Politique de confidentialité</a> •
                                <a href="https://www.ateliers360.fr/fr/mentions-legales" style="color: #00A7C7; text-decoration: none; margin: 0 8px;">Mentions légales</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

/**
 * Template d'email de notification admin (Design amélioré)
 */
export function getAdminNotificationEmail({
    nom,
    email,
    workshopTitle,
    date,
    participants,
    etablissement,
}: {
    nom: string;
    email: string;
    workshopTitle: string;
    date: string;
    participants: number;
    etablissement?: string;
}): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Nouvelle réservation - Ateliers 360 Admin</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎉 Nouvelle réservation</h1>
                            <p style="margin: 10px 0 0; color: #ffffff; font-size: 15px; opacity: 0.95;">Backoffice Ateliers 360</p>
                        </td>
                    </tr>

                    <!-- Alert Badge -->
                    <tr>
                        <td style="padding: 25px 30px 0; text-align: center;">
                            <div style="display: inline-block; background-color: #d4edda; color: #155724; padding: 10px 20px; border-radius: 50px; font-size: 13px; font-weight: 600;">
                                ⚠️ Action requise sous 48h
                            </div>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 25px 30px;">
                            <p style="margin: 0 0 20px; font-size: 16px; color: #333333; line-height: 1.6;">
                                Une nouvelle réservation vient d'être confirmée. Voici les détails :
                            </p>

                            <!-- Reservation Details -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(to bottom, #fff8e1 0%, #ffffff 100%); border: 2px solid #ffc107; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h2 style="margin: 0 0 15px; color: #ff6f00; font-size: 18px; font-weight: 700;">📋 Détails de l'atelier</h2>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 40%;">Atelier</td>
                                                <td style="padding: 8px 0; text-align: right;">
                                                    <strong style="color: #212529; font-size: 15px;">${workshopTitle}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #ffe082;">📅 Date souhaitée</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #ffe082;">
                                                    <strong style="color: #212529; font-size: 15px;">${date}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #ffe082;">👥 Participants</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #ffe082;">
                                                    <strong style="color: #212529; font-size: 15px;">${participants} personne${
        participants > 1 ? "s" : ""
    }</strong>
                                                </td>
                                            </tr>
                                            ${
        etablissement
            ? `
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #ffe082;">🏫 Établissement</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #ffe082;">
                                                    <strong style="color: #212529; font-size: 15px;">${etablissement}</strong>
                                                </td>
                                            </tr>
                                            `
            : ""
    }
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Contact Info -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 12px; color: #1565c0; font-size: 16px; font-weight: 700;">👤 Contact client</h3>
                                        <p style="margin: 8px 0; font-size: 15px; color: #333333;">
                                            <strong>Nom :</strong> ${nom}
                                        </p>
                                        <p style="margin: 8px 0; font-size: 15px; color: #333333;">
                                            <strong>Email :</strong> <a href="mailto:${email}" style="color: #2196f3; text-decoration: none; font-weight: 500;">${email}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Action Required -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #ff5722 0%, #f44336 100%); border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <p style="margin: 0 0 12px; color: #ffffff; font-size: 16px; font-weight: 700;">⚡ Action requise</p>
                                        <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6;">
                                            Contacter le client <strong>sous 48h</strong> pour confirmer<br>les détails pratiques de l'atelier
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Quick Actions -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 10px 5px;" width="50%">
                                        <a href="mailto:${email}" style="display: block; background-color: #2196f3; color: #ffffff; text-align: center; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                            📧 Envoyer email
                                        </a>
                                    </td>
                                    <td style="padding: 10px 5px;" width="50%">
                                        <a href="https://ateliers360.fr/admin/reservations" style="display: block; background-color: #4caf50; color: #ffffff; text-align: center; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                            📊 Voir admin
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #6c757d; font-size: 12px;">
                                © 2025 Ateliers 360 - Backoffice Admin
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

/**
 * Template d'email de notification pour les demandes de contact
 */
export function getContactNotificationEmail({
    nom,
    email,
    subject,
    message,
    metadata,
}: {
    nom: string;
    email: string;
    subject: string;
    message: string;
    metadata?: Record<string, string | null>;
}): string {
    const metadataRows = metadata
        ? Object.entries(metadata)
              .filter(([, value]) => value)
              .map(
                  ([key, value]) => `
                    <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 35%;">${key}</td>
                        <td style="padding: 8px 0; text-align: right; color: #212529; font-size: 15px;">${value}</td>
                    </tr>
                `
              )
              .join("")
        : "";

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nouvelle demande de contact — Ateliers 360</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
                    <tr>
                        <td style="background:#005b99;color:#ffffff;padding:24px;text-align:center;">
                            <h1 style="margin:0;font-size:24px;">Nouvelle demande de contact</h1>
                            <p style="margin:8px 0 0;font-size:14px;">${subject}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px;color:#333333;">
                            <p style="margin:0 0 16px;">Vous avez reçu une nouvelle demande de contact.</p>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                <tr>
                                    <td style="padding:8px 0;color:#666666;font-size:14px;width:35%;">Nom</td>
                                    <td style="padding:8px 0;text-align:right;color:#212529;font-size:15px;">${nom}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;color:#666666;font-size:14px;">Email</td>
                                    <td style="padding:8px 0;text-align:right;color:#212529;font-size:15px;">${email}</td>
                                </tr>
                                ${metadataRows ? `
                                <tr>
                                    <td colspan="2" style="padding:16px 0 8px;color:#333333;font-size:15px;font-weight:700;">Informations supplémentaires</td>
                                </tr>
                                ${metadataRows}` : ""}
                            </table>
                            <div style="margin-top:24px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
                                <h2 style="margin:0 0 12px;font-size:16px;color:#111827;">Message</h2>
                                <p style="margin:0;font-size:15px;line-height:1.6;color:#333333;white-space:pre-wrap;">${message}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

/**
 * Envoie un email de confirmation de réservation au client
 */
export async function sendReservationConfirmation(params: {
    nom: string;
    email: string;
    workshopTitle: string;
    date: string;
    participants: number;
}): Promise<boolean> {
    const html = getReservationConfirmationEmail(params);

    return sendEmail({
        to: params.email,
        subject:
            `Confirmation de réservation - ${params.workshopTitle} | Ateliers 360`,
        html,
    });
}

/**
 * Template d'email de rappel avant l'atelier (48h ou 24h)
 */
export function getReminderEmail({
    nom,
    email,
    workshopTitle,
    date,
    participants,
    timeFrame,
    location,
    duration,
}: {
    nom: string;
    email: string;
    workshopTitle: string;
    date: string;
    participants: number;
    timeFrame: "48h" | "24h";
    location?: string;
    duration?: string;
}): string {
    const is48h = timeFrame === "48h";
    const badgeColor = is48h ? "#ffc107" : "#ff5722";
    const badgeText = is48h ? "⏰ Dans 48 heures" : "🔔 Demain !";
    const headerGradient = is48h
        ? "linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)"
        : "linear-gradient(135deg, #f44336 0%, #e91e63 100%)";

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--[if mso]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <![endif]-->
    <title>Rappel atelier - Ateliers 360</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

                    <!-- Header -->
                    <tr>
                        <td style="background: ${headerGradient}; padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Ateliers 360</h1>
                            <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">✨ Rappel d'atelier</p>
                        </td>
                    </tr>

                    <!-- Time Badge -->
                    <tr>
                        <td style="padding: 25px 30px 0; text-align: center;">
                            <div style="display: inline-block; background-color: ${badgeColor}; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-size: 15px; font-weight: 700; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);">
                                ${badgeText}
                            </div>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 25px 30px;">
                            <p style="margin: 0 0 10px; font-size: 17px; color: #333333;">
                                Bonjour <strong>${nom}</strong> ! 👋
                            </p>
                            <p style="margin: 0 0 25px; font-size: 16px; color: #555555; line-height: 1.6;">
                                ${
        is48h
            ? "Votre atelier approche à grands pas ! On se réjouit de vous accueillir très prochainement."
            : "C'est demain ! 🎉 Votre atelier aura lieu dans moins de 24 heures. Tout est prêt pour vous accueillir !"
    }
                            </p>

                            <!-- Workshop Details Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(to bottom, #e8f5e9 0%, #ffffff 100%); border: 2px solid #4caf50; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h2 style="margin: 0 0 15px; color: #2e7d32; font-size: 18px; font-weight: 700;">📚 Votre atelier</h2>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 40%;">Atelier</td>
                                                <td style="padding: 8px 0; text-align: right;">
                                                    <strong style="color: #212529; font-size: 15px;">${workshopTitle}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #a5d6a7;">📅 Date & Heure</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #a5d6a7;">
                                                    <strong style="color: #212529; font-size: 15px;">${date}</strong>
                                                </td>
                                            </tr>
                                            ${
        duration
            ? `
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #a5d6a7;">⏱️ Durée</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #a5d6a7;">
                                                    <strong style="color: #212529; font-size: 15px;">${duration}</strong>
                                                </td>
                                            </tr>
                                            `
            : ""
    }
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #a5d6a7;">👥 Participants</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #a5d6a7;">
                                                    <strong style="color: #212529; font-size: 15px;">${participants} personne${
        participants > 1 ? "s" : ""
    }</strong>
                                                </td>
                                            </tr>
                                            ${
        location
            ? `
                                            <tr>
                                                <td style="padding: 8px 0; color: #666666; font-size: 14px; border-top: 1px solid #a5d6a7;">📍 Lieu</td>
                                                <td style="padding: 8px 0; text-align: right; border-top: 1px solid #a5d6a7;">
                                                    <strong style="color: #212529; font-size: 15px;">${location}</strong>
                                                </td>
                                            </tr>
                                            `
            : ""
    }
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Preparation Checklist -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 15px; color: #e65100; font-size: 16px; font-weight: 700;">🎒 À prévoir</h3>

                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 6px 0;">
                                                    <span style="color: #4caf50; font-size: 16px; margin-right: 8px;">✓</span>
                                                    <span style="color: #333333; font-size: 14px;">Venez 5-10 minutes en avance</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0;">
                                                    <span style="color: #4caf50; font-size: 16px; margin-right: 8px;">✓</span>
                                                    <span style="color: #333333; font-size: 14px;">Apportez votre curiosité et vos questions</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0;">
                                                    <span style="color: #4caf50; font-size: 16px; margin-right: 8px;">✓</span>
                                                    <span style="color: #333333; font-size: 14px;">Tout le matériel sera fourni sur place</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0;">
                                                    <span style="color: #4caf50; font-size: 16px; margin-right: 8px;">✓</span>
                                                    <span style="color: #333333; font-size: 14px;">Tenue confortable recommandée</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            ${
        is48h
            ? `
                            <!-- 48h Specific Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%); border-radius: 8px; padding: 20px; margin: 25px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0; color: #1565c0; font-size: 15px; line-height: 1.6;">
                                            💡 <strong>Astuce :</strong> Pensez à noter l'atelier dans votre agenda !<br>
                                            Vous recevrez un dernier rappel <strong>24h avant</strong>.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            `
            : `
                            <!-- 24h Specific Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #ffebee 0%, #ffffff 100%); border-radius: 8px; padding: 20px; margin: 25px 0; border: 2px solid #f44336;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 10px; color: #c62828; font-size: 16px; font-weight: 700;">
                                            🚀 C'est bientôt le grand jour !
                                        </p>
                                        <p style="margin: 0; color: #d32f2f; font-size: 14px; line-height: 1.6;">
                                            N'oubliez pas : <strong>demain ${date}</strong><br>
                                            On a hâte de vous accueillir ! 🎉
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            `
    }

                            <!-- Contact Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 30px; background-color: #f8f9fa; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <p style="margin: 0 0 10px; color: #333333; font-size: 14px; font-weight: 600;">Une question ? Un imprévu ?</p>
                                        <p style="margin: 0; font-size: 14px; color: #555555;">
                                            📧 <a href="mailto:contact@ateliers360.fr" style="color: #00A7C7; text-decoration: none; font-weight: 500;">contact@ateliers360.fr</a>
                                            <br>
                                            🌐 <a href="https://ateliers360.fr" style="color: #00A7C7; text-decoration: none; font-weight: 500;">ateliers360.fr</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 8px; color: #6c757d; font-size: 12px;">
                                © 2025 Ateliers 360 - Ateliers créatifs & scientifiques
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #adb5bd;">
                                <a href="https://ateliers360.fr/politique-confidentialite" style="color: #6c757d; text-decoration: none;">Politique de confidentialité</a>
                                •
                                <a href="https://ateliers360.fr/mentions-legales" style="color: #6c757d; text-decoration: none;">Mentions légales</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

/**
 * Envoie une notification admin pour une nouvelle réservation
 */
export async function sendAdminNotification(params: {
    nom: string;
    email: string;
    workshopTitle: string;
    date: string;
    participants: number;
    etablissement?: string;
}): Promise<boolean> {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@ateliers360.fr";
    const html = getAdminNotificationEmail(params);

    return sendEmail({
        to: adminEmail,
        subject: `Nouvelle réservation - ${params.workshopTitle}`,
        html,
    });
}

/**
 * Envoie un rappel avant l'atelier (48h ou 24h)
 */
export async function sendReminderEmail(params: {
    nom: string;
    email: string;
    workshopTitle: string;
    date: string;
    participants: number;
    timeFrame: "48h" | "24h";
    location?: string;
    duration?: string;
}): Promise<boolean> {
    const html = getReminderEmail(params);
    const subject = params.timeFrame === "48h"
        ? `Dans 2 jours : ${params.workshopTitle} | Ateliers 360`
        : `Demain : ${params.workshopTitle} | Ateliers 360`;

    return sendEmail({
        to: params.email,
        subject,
        html,
    });
}
