// src/app/api/companies/contact/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendEmail, getAdminNotificationEmail, getContactRecipient } from "@/lib/email";

type Body = {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  offer?: string;
  message: string;
  source?: string; // optional: utm or page
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // Basic validation
    if (!body.company || !body.contact || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Insert into DB
    const insertPayload = {
      company_name: body.company,
      contact_name: body.contact,
      email: body.email,
      phone: body.phone || null,
      offer_ref: body.offer || null,
      message: body.message,
      metadata: { source: body.source || null, requestType: "company" },
    };

    const { data, error } = await supabaseAdmin
      .from("company_requests")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error (company_requests):", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Notify admin (non-blocking)
    try {
      const adminEmail = getContactRecipient({ requestType: "company" });
      if (adminEmail) {
        const adminHtml = getAdminNotificationEmail({
          nom: body.contact,
          email: body.email,
          workshopTitle: body.offer || "Demande entreprise",
          date: new Date().toISOString(),
          participants: 0,
          etablissement: body.company,
        });
        await sendEmail({
          to: adminEmail,
          subject: `Nouvelle demande entreprise — ${body.company}`,
          html: adminHtml,
        });
      }
    } catch (notifyErr) {
      console.error("Admin notification failed:", notifyErr);
    }

    // Confirmation email to client (optional)
    try {
      if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
        const confirmationHtml = `<p>Bonjour ${body.contact},<br/>Merci pour votre demande. Nous revenons vers vous rapidement.</p>`;
        await sendEmail({
          to: body.email,
          subject: `Réception de votre demande — ${body.company}`,
          html: confirmationHtml,
        });
      }
    } catch (clientNotifyErr) {
      console.error("Client confirmation email failed:", clientNotifyErr);
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("companies/contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
