import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const { supabaseClient, user, error: authError } = await getAuthenticatedSupabase(
    request,
    cookieStore
  );

  if (!user || !supabaseClient) {
    return NextResponse.json(
      { error: authError || 'Unauthorized' },
      { status: 401 }
    );
  }

  const supabase = supabaseClient;

  const body = await request.json();
  const { family_id, child_id, email, expires_in_days = 7 } = body;
  if (!family_id)
    return NextResponse.json({ error: 'family_id required' }, { status: 400 });

  const token = randomBytes(16).toString('hex');
  const expires_at = new Date(
    Date.now() + expires_in_days * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from('family_invitations')
    .insert([
      {
        family_id,
        child_id: child_id || null,
        token,
        email: email || null,
        expires_at,
      },
    ])
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: { token: data.token, expires_at: data.expires_at },
  });
}
