import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
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

    const pathParts = request.url.split('/');
    const id = pathParts[pathParts.length - 1];
    const { data: child, error: childError } = await supabase
      .from('children')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (childError) return NextResponse.json({ error: childError.message }, { status: 500 });
    if (!child) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (child.family_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    return NextResponse.json({ child });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
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

    const updates: any = {};
    const allowed = [
      'first_name',
      'last_name',
      'birthdate',
      'emergency_contact_name',
      'emergency_contact_phone',
      'doctor_name',
      'other_allergies',
      'pai_required',
      'meds_authorized',
      'notes',
    ];

    for (const k of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, k)) updates[k] = body[k];
    }

    const pathParts = request.url.split('/');
    const id = pathParts[pathParts.length - 1];

    const { data: existing } = await supabase
      .from('children')
      .select('family_id')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (existing.family_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { data, error: updateError } = await supabase
      .from('children')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
