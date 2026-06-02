import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return NextResponse.json(
      { ok: false, error: 'Jeton manquant' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('attestations')
    .select('id, student_id, workshop_id, issued_at, pdf_url, signed_by, qr_token')
    .eq('qr_token', token)
    .single();

  if (error) {
    if (error.code === 'PGRST116' || error.code === '404') {
      return NextResponse.json({ ok: false, verified: false }, { status: 404 });
    }
    console.error('Erreur de vérification d’attestation:', error);
    return NextResponse.json(
      { ok: false, error: 'Erreur serveur lors de la vérification' },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({ ok: false, verified: false }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    verified: true,
    ...data,
  });
}
