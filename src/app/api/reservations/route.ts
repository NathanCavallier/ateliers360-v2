import { NextRequest, NextResponse } from "next/server";
import { createReservationServer } from "@/lib/supabase-server-actions";
import { getAdminNotificationEmail, getContactRecipient, sendEmail } from "@/lib/email";
import { z } from "zod";

// Schéma de validation pour les réservations
const reservationSchema = z.object({
    atelier_id: z.number().int().positive(),
    email: z.string().email("Email invalide"),
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    etablissement: z.string().optional().nullable(),
    adresse: z.string().optional().nullable(),
    participants_count: z.number().int().positive(
        "Le nombre de participants doit être supérieur à 0",
    ),
    date_atelier: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Format de date invalide (YYYY-MM-DD)",
    ),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Valider les données avec Zod
        const validatedData = reservationSchema.parse(body);

        // Créer la réservation dans Supabase (côté serveur avec supabaseAdmin)
        let reservation;
        try {
            reservation = await createReservationServer({
                atelier_id: validatedData.atelier_id,
                email: validatedData.email,
                nom: validatedData.nom,
                etablissement: validatedData.etablissement || null,
                adresse: validatedData.adresse || null,
                participants_count: validatedData.participants_count,
                date_atelier: validatedData.date_atelier,
                status: "pending",
            });
        } catch (dbError) {
            console.error("Database error creating reservation:", dbError);
            return NextResponse.json({
                success: false,
                error: "Impossible de créer la réservation en base de données",
                details: dbError instanceof Error
                    ? dbError.message
                    : String(dbError),
            }, { status: 500 });
        }

        // Envoyer une notification email dès la création de la réservation,
        // sans attendre un traitement uniquement backoffice.
        (async () => {
            try {
                const adminEmail = getContactRecipient({ requestType: "reservation" });
                if (!adminEmail) {
                    console.warn("Admin email not configured - skipping reservation notification");
                    return;
                }

                const adminHtml = getAdminNotificationEmail({
                    nom: validatedData.nom,
                    email: validatedData.email,
                    workshopTitle: `Réservation atelier #${validatedData.atelier_id}`,
                    date: validatedData.date_atelier,
                    participants: validatedData.participants_count,
                    etablissement: validatedData.etablissement || undefined,
                });

                await sendEmail({
                    to: adminEmail,
                    subject: `Nouvelle réservation atelier — ${validatedData.nom}`,
                    html: adminHtml,
                });
            } catch (notifyErr) {
                console.error("Reservation notification failed:", notifyErr);
            }
        })();

        console.log("Reservation created successfully:", reservation);

        return NextResponse.json({
            success: true,
            reservation,
            message: "Réservation créée avec succès",
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation error:", error.errors);
            return NextResponse.json({
                success: false,
                error: "Données invalides",
                details: error.errors,
            }, { status: 400 });
        }

        console.error("Erreur lors de la création de la réservation:", error);

        return NextResponse.json({
            success: false,
            error: "Erreur serveur lors de la création de la réservation",
            details: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    // Pour l'instant, retourner une erreur 404
    // Cette route sera implémentée plus tard pour l'admin
    return NextResponse.json({
        success: false,
        error: "Endpoint non implémenté",
    }, { status: 404 });
}
