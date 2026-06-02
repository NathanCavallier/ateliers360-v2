// src/app/api/dashboard/contacts/[id]/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function PATCH(req: Request, { params }: any) {
  try {
    const body = await req.json();
    const status = body?.status;
    if (!status)
      return NextResponse.json({ error: 'Missing status' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('contact_form')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Update contact_form error:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err) {
    console.error('PATCH /api/dashboard/contacts/[id] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const { error } = await supabaseAdmin
      .from('contact_form')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Delete contact_form error:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/dashboard/contacts/[id] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
