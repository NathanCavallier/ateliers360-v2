// src/app/api/structures/contact/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendEmail, getAdminNotificationEmail } from "@/lib/email";

type Body = {
  structure: string;
  contact: string;
  email: string;
  phone?: string;
  message: string;
  audience?: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    if (!body.structure || !body.contact || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const insertPayload = {
      structure_name: body.structure,
      contact_name: body.contact,
      email: body.email,
      phone: body.phone || null,
      message: body.message,
      metadata: { audience: body.audience || null },
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

    // Notify admin
    try {
      const adminEmail = process.env.FROM_EMAIL_ADMIN || process.env.FROM_EMAIL;
      if (adminEmail) {
        const adminHtml = getAdminNotificationEmail({
          nom: body.contact,
          email: body.email,
          workshopTitle: "Demande structure",
          date: new Date().toISOString(),
          participants: 0,
          etablissement: body.structure,
        });
        await sendEmail({
          to: adminEmail,
          subject: `Nouvelle demande structure — ${body.structure}`,
          html: adminHtml,
        });
      }
    } catch (notifyErr) {
      console.error("Admin notification failed:", notifyErr);
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("structures/contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
