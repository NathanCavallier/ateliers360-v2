// src/app/api/companies/quote/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { renderQuoteHtml } from '@/lib/quotes';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { chromium } from 'playwright'; // npm i playwright
import { v4 as uuidv4 } from 'uuid';

type QuoteItem = { description: string; qty: number; unit_price: number };
type Body = {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  offer_title: string;
  items: QuoteItem[];
  tax_rate?: number;
  valid_until?: string;
  payment_terms?: string;
  request_id?: string | null; // optional: link to company_requests.id
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // Basic validation
    if (
      !body.company ||
      !body.contact ||
      !body.email ||
      !body.items ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Render HTML from template
    const html = renderQuoteHtml({
      company: body.company,
      contact: body.contact,
      email: body.email,
      phone: body.phone || '',
      quote_number: `DEVIS-${Date.now()}`,
      offer_title: body.offer_title,
      offer_description: body.offer_title,
      items: body.items.map((it) => ({
        description: it.description,
        qty: it.qty,
        unit_price: `${it.unit_price.toFixed(2)}€`,
        line_total: `${(it.qty * it.unit_price).toFixed(2)}€`,
      })),
      subtotal: body.items
        .reduce((s, it) => s + it.qty * it.unit_price, 0)
        .toFixed(2),
      tax_rate: body.tax_rate ?? 20,
      tax: (
        body.items.reduce((s, it) => s + it.qty * it.unit_price, 0) *
        ((body.tax_rate ?? 20) / 100)
      ).toFixed(2),
      total: (
        body.items.reduce((s, it) => s + it.qty * it.unit_price, 0) *
        (1 + (body.tax_rate ?? 20) / 100)
      ).toFixed(2),
      valid_until: body.valid_until || '',
      payment_terms: body.payment_terms || '30 jours net',
    });

    // Generate PDF using Playwright
    const browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    // Upload to Supabase Storage
    const fileName = `quotes/${uuidv4()}.pdf`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from('quotes')
      .upload(fileName, Buffer.from(pdfBuffer), {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return NextResponse.json(
        { error: 'Storage upload failed' },
        { status: 500 }
      );
    }

    // Create public or signed URL (signed for limited time)
    const { data: publicData, error: urlError } = await supabaseAdmin.storage
      .from('quotes')
      .createSignedUrl(fileName, 60 * 60 * 24); // 24h signed URL

    if (urlError) {
      console.error('Supabase createSignedUrl error:', urlError);
      return NextResponse.json(
        { error: 'Could not create file URL' },
        { status: 500 }
      );
    }

    const quoteUrl = publicData.signedUrl;

    // Optionally link to company_requests
    if (body.request_id) {
      try {
        const { data: existing, error: selErr } = await supabaseAdmin
          .from('company_requests')
          .select('metadata')
          .eq('id', body.request_id)
          .single();

        if (!selErr) {
          const newMeta = {
            ...(existing?.metadata || {}),
            quote_url: quoteUrl,
          };
          await supabaseAdmin
            .from('company_requests')
            .update({ metadata: newMeta })
            .eq('id', body.request_id);
        }
      } catch (err) {
        console.warn('Could not update company_requests metadata:', err);
      }
    }

    // Optionally send email with quote link to client
    try {
      const { sendEmail } = await import('@/lib/email');
      const htmlEmail = `<p>Bonjour ${body.contact},</p>
        <p>Veuillez trouver votre devis : <a href="${quoteUrl}">Télécharger le devis (PDF)</a></p>`;
      await sendEmail({
        to: body.email,
        subject: `Votre devis — ${body.offer_title}`,
        html: htmlEmail,
      });
    } catch (emailErr) {
      console.error('Sending quote email failed:', emailErr);
    }

    return NextResponse.json({ ok: true, url: quoteUrl }, { status: 201 });
  } catch (err) {
    console.error('companies/quote route error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
