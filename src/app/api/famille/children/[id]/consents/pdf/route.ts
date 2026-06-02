import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function buildChildConsentPdf(child: any, auths: any[] = []) {
  const doc = await PDFDocument.create();
  let page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const logoPath = resolve(process.cwd(), 'public/images/logo.png');
  const logoBytes = readFileSync(logoPath);
  const logoImage = await doc.embedPng(logoBytes);
  const logoWidth = 120;
  const logoHeight = (logoImage.height / logoImage.width) * logoWidth;

  page.drawImage(logoImage, {
    x: 40,
    y: 790 - logoHeight,
    width: logoWidth,
    height: logoHeight,
  });

  page.drawText('Ateliers 360', {
    x: 180,
    y: 780,
    size: 18,
    font: fontBold,
    color: rgb(0.1, 0.3, 0.6),
  });

  page.drawText('Consentement parental RGPD', {
    x: 180,
    y: 760,
    size: 12,
    font: font,
    color: rgb(0.15, 0.15, 0.15),
  });

  page.drawText('Document d’autorisation et de protection des données', {
    x: 180,
    y: 744,
    size: 10,
    font: font,
    color: rgb(0.45, 0.45, 0.45),
  });

  page.drawLine({
    start: { x: 40, y: 730 },
    end: { x: 555, y: 730 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  const generationDate = new Date().toLocaleDateString('fr-FR');
  page.drawText(`Date de génération : ${generationDate}`, {
    x: 40,
    y: 712,
    size: 10,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  let y = 690;

  page.drawText('1. Renseignements de l’enfant', {
    x: 40,
    y,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  y -= 18;

  const childLines = [
    `Nom : ${child?.first_name || ''} ${child?.last_name || ''}`.trim(),
      `Date de naissance : ${child?.birth_date || child?.birthdate || ''}`,
    `Médicaments autorisés : ${child?.meds_authorized || 'Aucun renseigné'}`,
    `Contact d'urgence : ${child?.emergency_contact_name || 'Non renseigné'} ${child?.emergency_contact_phone || ''}`.trim(),
    `Médecin traitant : ${child?.doctor_name || 'Non renseigné'}`,
    `Notes : ${child?.notes || 'Aucune note'}`,
  ];

  for (const line of childLines) {
    page.drawText(line, { x: 40, y, size: 10, font });
    y -= 14;
  }

  y -= 10;

  const consentDefinitions: Record<string, string> = {
    photos_internal:
      'Autorise l’utilisation de photos à usage interne Ateliers 360 (rapports pédagogiques, dossiers internes).',
    photos_public:
      'Autorise la publication de photos sur le site web et les supports de communication d’Ateliers 360.',
    videos_internal:
      'Autorise l’utilisation de vidéos à usage interne uniquement.',
    videos_public:
      'Autorise la publication de vidéos sur les supports de communication externe.',
    pedagogical_data:
      'Autorise l’utilisation des données pédagogiques de l’enfant pour le suivi et l’amélioration des ateliers.',
    newsletter:
      'Autorise l’envoi d’informations et de newsletters Ateliers 360.',
  };

  const consentLabels: Record<string, string> = {
    photos_internal: 'Photos internes',
    photos_public: 'Photos publiques',
    videos_internal: 'Vidéos internes',
    videos_public: 'Vidéos publiques',
    pedagogical_data: 'Données pédagogiques',
    newsletter: 'Newsletter',
  };

  const allConsentTypes = [
    'photos_internal',
    'photos_public',
    'videos_internal',
    'videos_public',
    'pedagogical_data',
    'newsletter',
  ];

  const authMap = new Map(auths.map((item) => [item.consent, item]));

  page.drawText('2. Autorisation RGPD', {
    x: 40,
    y,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  y -= 18;

  for (const consentType of allConsentTypes) {
    if (y < 130) {
      page = doc.addPage([595, 842]);
      y = 800;
    }

    const auth = authMap.get(consentType) || {
      granted: false,
      granted_at: null,
    };
    const grantedText = auth.granted ? 'Oui' : 'Non';
    const label = consentLabels[consentType] || consentType;

    page.drawText(label, {
      x: 40,
      y,
      size: 11,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    y -= 16;

    page.drawText(`Autorisation accordée : ${grantedText}`, {
      x: 45,
      y,
      size: 10,
      font,
      color: rgb(0.15, 0.15, 0.15),
    });
    y -= 14;

    if (auth.granted && auth.granted_at) {
      const grantedAt = new Date(auth.granted_at).toLocaleDateString('fr-FR');
      page.drawText(`Date de validation : ${grantedAt}`, {
        x: 45,
        y,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4),
      });
      y -= 14;
    }

    page.drawText(consentDefinitions[consentType] || '', {
      x: 45,
      y,
      size: 10,
      font,
      color: rgb(0.15, 0.15, 0.15),
      lineHeight: 12,
      maxWidth: 510,
    });
    y -= 38;
  }

  if (y < 140) {
    page = doc.addPage([595, 842]);
    y = 800;
  }

  page.drawText('3. Signature', {
    x: 40,
    y,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  y -= 18;

  page.drawText(
    'Je soussigné(e), parent ou tuteur légal, confirme avoir lu et accepté les autorisations ci-dessus.',
    {
      x: 40,
      y,
      size: 10,
      font,
      color: rgb(0.15, 0.15, 0.15),
      lineHeight: 12,
      maxWidth: 510,
    }
  );
  y -= 28;

  page.drawText(
    'Signature : ________________________________________________',
    {
      x: 40,
      y,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    }
  );
  y -= 24;

  page.drawText('Date : ________________________________', {
    x: 40,
    y,
    size: 10,
    font,
    color: rgb(0, 0, 0),
  });

  return doc.save();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const { supabaseClient, user, error } = await getAuthenticatedSupabase(
    request,
    cookieStore
  );

  if (!user || !supabaseClient) {
    return NextResponse.json(
      { error: error || 'Not authenticated' },
      { status: 401 }
    );
  }

  const supabase = supabaseClient;

  const { id: childId } = await params;
  const { data: child, error: childError } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .single();

  if (childError || !child) {
    return NextResponse.json(
      { error: childError?.message || 'Child not found' },
      { status: 404 }
    );
  }

  if (child.family_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { data: auths, error: authError } = await supabase
    .from('authorizations')
    .select('*')
    .eq('child_id', childId);

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const pdfBytes = await buildChildConsentPdf(child, auths || []);
  const path = `consents/${childId}/consent-${Date.now()}.pdf`;

  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from('consents')
    .upload(path, new Uint8Array(pdfBytes), {
      contentType: 'application/pdf',
    });

  if (uploadErr) {
    return NextResponse.json({ error: uploadErr.message }, { status: 500 });
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from('consents')
    .createSignedUrl(uploadData.path, 60);
  if (signedError) {
    return NextResponse.json({ error: signedError.message }, { status: 500 });
  }

  await supabase
    .from('children')
    .update({ consent_pdf_path: path })
    .eq('id', childId);

  return NextResponse.json({ ok: true, url: signedData.signedUrl, path });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const { supabaseClient, user, error } = await getAuthenticatedSupabase(
    request,
    cookieStore
  );

  if (!user || !supabaseClient) {
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  const supabase = supabaseClient;

  const { id: childId } = await params;
  const { data: child, error: childError } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .single();
  if (childError || !child) {
    return NextResponse.json({ error: childError?.message || 'Child not found' }, { status: 404 });
  }

  // Check if the child belongs to the authenticated user's family
  if (child.family_id !== user.id) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  if (!child.consent_pdf_path) {
    return NextResponse.json(
      { error: 'No stored consent PDF for this child' },
      { status: 404 }
    );
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from('consents')
    .createSignedUrl(child.consent_pdf_path, 60);

  if (signedError) {
    return NextResponse.json({ error: signedError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    url: signedData.signedUrl,
    path: child.consent_pdf_path,
  });
}
