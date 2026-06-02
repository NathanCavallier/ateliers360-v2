import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const childId = url.searchParams.get('child_id');

  if (!childId) {
    return NextResponse.json(
      { error: 'child_id is required' },
      { status: 400 }
    );
  }

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
  const { data: child, error: childError } = await supabase
    .from('children')
    .select('id, family_id')
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

  const { data, error: authError } = await supabase
    .from('authorizations')
    .select('*')
    .eq('child_id', childId)
    .order('granted_at', { ascending: false });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { child_id, consents } = body || {};

  if (!child_id || !Array.isArray(consents)) {
    return NextResponse.json(
      { error: 'child_id and consents are required' },
      { status: 400 }
    );
  }

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

  const { data: child, error: childError } = await supabase
    .from('children')
    .select('id, family_id')
    .eq('id', child_id)
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

  const savedRecords: any[] = [];

  for (const consent of consents) {
    const record = {
      child_id,
      consent: consent.type,
      granted: Boolean(consent.granted),
      granted_at: consent.granted ? new Date().toISOString() : null,
    };

    const { data: existing } = await supabase
      .from('authorizations')
      .select('id')
      .eq('child_id', child_id)
      .eq('consent', consent.type)
      .maybeSingle();

    if (existing?.id) {
      const { data, error: updateError } = await supabase
        .from('authorizations')
        .update(record)
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      savedRecords.push(data);
    } else {
      const { data, error: insertError } = await supabase
        .from('authorizations')
        .insert(record)
        .select()
        .single();

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      savedRecords.push(data);
    }
  }

  return NextResponse.json({ data: savedRecords });
}
