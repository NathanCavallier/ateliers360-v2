// src/app/api/contact/route.ts
import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { getContactRecipient, getContactNotificationEmail, sendEmail } from "@/lib/email";

type Body = {
    name: string;
    email: string;
    establishment?: string;
    role?: string;
    message: string;
    source?: string | null | undefined;
    metadata?: Record<string, string | null | undefined>;
};

function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(s?: string | null): string | null {
    if (!s) return null;
    // Basic trim and length limit to avoid huge payloads
    const trimmed = String(s).trim();
    return trimmed.length > 2000 ? trimmed.slice(0, 2000) : trimmed;
}

export async function POST(req: NextRequest) {
    try {
        const body: Body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ error: "Missing required fields" }, {
                status: 400,
            });
        }
        if (!validateEmail(body.email)) {
            return NextResponse.json({ error: "Invalid email address" }, {
                status: 400,
            });
        }

        // Sanitize
        const name = sanitizeText(body.name)!;
        const email = sanitizeText(body.email)!;
        const establishment = sanitizeText(body.establishment);
        const role = sanitizeText(body.role);
        const message = sanitizeText(body.message)!;
        const source = sanitizeText(body.source) || null;
        const metadata: Record<string, string | null> = {
            source,
        };

        if (body.metadata) {
            for (const [key, value] of Object.entries(body.metadata)) {
                metadata[key] = sanitizeText(value) || null;
            }
        }

        // Check if supabaseAdmin is available
        if (!supabaseAdmin) {
            console.error("Supabase admin client not initialized - missing SUPABASE_SERVICE_ROLE_KEY");
            return NextResponse.json({
                error: "Server configuration error - cannot process request"
            }, {
                status: 500,
            });
        }

        // Insert into DB (structure_requests)
        const insertPayload = {
            structure_name: establishment || null,
            contact_name: name,
            email,
            phone: null,
            audience: role || null,
            message,
            status: "new",
            metadata: {
              source,
              ...metadata,
            },
        };

        const { data, error } = await supabaseAdmin
            .from("structure_requests")
            .insert(insertPayload)
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error (structure_requests):", error);
            return NextResponse.json({ error: "Database error - could not save message" }, {
                status: 500,
            });
        }

        if (!data) {
            console.error("No data returned from insert");
            return NextResponse.json({ error: "Database error - no response" }, {
                status: 500,
            });
        }

        // Notify admin (best-effort, non-blocking)
        (async () => {
            try {
                const adminEmail = getContactRecipient(metadata);
                if (!adminEmail) {
                    console.warn("Admin email not configured - skipping admin notification");
                    return;
                }

                const subjectParts = ["Nouvelle demande contact"];
                if (metadata.pole) subjectParts.push(metadata.pole);
                if (metadata.service) subjectParts.push(metadata.service);
                const adminSubject = subjectParts.join(" — ");

                const adminHtml = getContactNotificationEmail({
                    nom: name,
                    email,
                    subject: adminSubject,
                    message,
                    metadata,
                });

                await sendEmail({
                    to: adminEmail,
                    subject: `${adminSubject} — ${establishment || name}`,
                    html: adminHtml,
                });
            } catch (notifyErr) {
                console.error("Admin notification failed:", notifyErr);
            }
        })();

        // Optional: send confirmation to user if enabled
        if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
            (async () => {
                try {
                    const confirmationHtml = `
            <p>Bonjour ${name},</p>
            <p>Merci pour votre message. Nous avons bien reçu votre demande et revenons vers vous rapidement.</p>
            <p>Cordialement,<br/>L'équipe Ateliers 360</p>
          `;
                    await sendEmail({
                        to: email,
                        subject: "Réception de votre message — Ateliers 360",
                        html: confirmationHtml,
                    });
                } catch (err) {
                    console.error("Client confirmation email failed:", err);
                }
            })();
        }

        return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
    } catch (err) {
        console.error("contact route error:", err);
        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });
    }
}
