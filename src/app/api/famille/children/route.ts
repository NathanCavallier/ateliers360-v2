import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAuthenticatedSupabase } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.first_name) {
      return NextResponse.json(
        { error: 'first_name is required' },
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
    const payload = {
      family_id: user.id,
      first_name: body.first_name,
      last_name: body.last_name || null,
      birthdate: body.birthdate || null,
      emergency_contact_name: body.emergency_contact_name || null,
      emergency_contact_phone: body.emergency_contact_phone || null,
      doctor_name: body.doctor_name || null,
      other_allergies: body.other_allergies || null,
      pai_required: Boolean(body.pai_required),
      meds_authorized: body.meds_authorized || null,
      notes: body.notes || null,
    };

    const { data, error: insertError } = await supabase
      .from('children')
      .insert(payload)
      .select()
      .single();
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
