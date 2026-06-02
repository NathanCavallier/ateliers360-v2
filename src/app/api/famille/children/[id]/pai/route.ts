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

  const { id: childId } = await params;
  const form = await request.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  // Verify child ownership
  const { data: child } = await supabase
    .from('children')
    .select('id, family_id')
    .eq('id', childId)
    .single();
  if (!child)
    return NextResponse.json({ error: 'Child not found' }, { status: 404 });

  if (child.family_id !== user.id)
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });

  const fileName = `pai/${childId}/${Date.now()}-${(file as any).name || 'pai.pdf'}`;
  const arrayBuffer = await file.arrayBuffer();
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from('pai')
    .upload(fileName, new Uint8Array(arrayBuffer), {
      contentType: (file as any).type || 'application/pdf',
    });

  if (uploadErr)
    return NextResponse.json({ error: uploadErr.message }, { status: 500 });

  const publicUrl = supabase.storage.from('pai').getPublicUrl(uploadData.path)
    .data.publicUrl;

  const { error: updateErr } = await supabase
    .from('children')
    .update({ pai_url: publicUrl })
    .eq('id', childId);
  if (updateErr)
    return NextResponse.json({ error: updateErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, url: publicUrl });
}
