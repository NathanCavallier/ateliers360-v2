import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  FamilyProfile,
  Child,
  AuthorizationConsent,
} from '../types-accounts';

export async function createFamily(
  supabase: SupabaseClient,
  profile: Partial<FamilyProfile>
) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();
  return { data, error };
}

export async function addChild(
  supabase: SupabaseClient,
  child: Partial<Child>
) {
  const { data, error } = await supabase
    .from('children')
    .insert(child)
    .select()
    .single();
  return { data, error };
}

export async function getChildrenByFamily(
  supabase: SupabaseClient,
  familyId: string
) {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('family_id', familyId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function saveAuthorization(
  supabase: SupabaseClient,
  consent: Partial<AuthorizationConsent>
) {
  const { data, error } = await supabase
    .from('authorizations')
    .upsert(consent)
    .select();
  return { data, error };
}

export async function getAuthorizationsForChild(
  supabase: SupabaseClient,
  childId: string
) {
  const { data, error } = await supabase
    .from('authorizations')
    .select('*')
    .eq('child_id', childId)
    .order('granted_at', { ascending: false });
  return { data, error };
}
