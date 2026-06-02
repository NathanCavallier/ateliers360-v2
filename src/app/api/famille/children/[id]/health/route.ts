import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';

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
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  const supabase = supabaseClient;

  const body = await request.json();
  const { id: childId } = await params;

  // Verify ownership: child.family_id must belong to current user
  const { data: child } = await supabase
    .from('children')
    .select('id, family_id')
    .eq('id', childId)
    .single();

  if (!child)
    return NextResponse.json({ error: 'Child not found' }, { status: 404 });

  if (child.family_id !== user.id) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  const payload = {
    emergency_contact_name: body.emergency_contact_name || null,
    emergency_contact_phone: body.emergency_contact_phone || null,
    doctor_name: body.doctor_name || null,
    other_allergies: body.other_allergies || null,
    allergies: body.allergies || null,
    pai_required: body.pai_required || false,
    meds_authorized: body.meds_authorized || null,
    notes: body.notes || null,
    updated_at: new Date().toISOString(),
  };

  const { error: upsertErr } = await supabase
    .from('children')
    .update(payload)
    .eq('id', childId);

  if (upsertErr)
    return NextResponse.json({ error: upsertErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, data: payload });
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

  if (childError)
    return NextResponse.json({ error: childError.message }, { status: 500 });

  if (!child)
    return NextResponse.json({ error: 'Child not found' }, { status: 404 });

  if (child.family_id !== user.id)
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });

  return NextResponse.json({ data: child });
}
