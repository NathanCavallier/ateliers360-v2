// src/app/api/schools/contact/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendEmail, getAdminNotificationEmail } from "@/lib/email";

type Body = {
  institution: string;
  contact: string;
  email: string;
  level: string;
  message: string;
  source?: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  return trimmed.length > 2000 ? trimmed.slice(0, 2000) : trimmed;
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    if (!body.institution || !body.contact || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const institution = sanitizeText(body.institution)!;
    const contact = sanitizeText(body.contact)!;
    const email = sanitizeText(body.email)!;
    const level = sanitizeText(body.level) ?? null;
    const message = sanitizeText(body.message)!;
    const source = sanitizeText(body.source);

    const insertPayload = {
      structure_name: institution,
      contact_name: contact,
      email,
      phone: null,
      audience: level,
      message,
      status: "new",
      metadata: { source: source || null, requestType: "school" },
    };

    const { data, error } = await supabaseAdmin
      .from("structure_requests")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error (structure_requests):", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    try {
      const adminEmail = process.env.FROM_EMAIL_ADMIN || process.env.FROM_EMAIL;
      if (adminEmail) {
        const adminHtml = getAdminNotificationEmail({
          nom: contact,
          email,
          workshopTitle: "Demande école",
          date: new Date().toISOString(),
          participants: 0,
          etablissement: institution,
        });
        await sendEmail({
          to: adminEmail,
          subject: `Nouvelle proposition école — ${institution}`,
          html: adminHtml,
        });
      }
    } catch (notifyErr) {
      console.error("Admin notification failed:", notifyErr);
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("schools/contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
