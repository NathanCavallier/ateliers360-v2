import { createClient } from '@supabase/supabase-js';
import type { Database, WorkshopDB } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side Supabase client (will be null if env vars missing)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;

export async function getAuthHeaders(): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * ATELIERS / WORKSHOPS
 */

// Helper function to get workshops
export async function getWorkshops(): Promise<
  Database['public']['Tables']['ateliers']['Row'][]
> {
  const client = supabase;
  if (!client) {
    console.warn('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await client
      .from('ateliers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching workshops:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error in getWorkshops:', error);
    return [];
  }
}

// Helper function to get workshops by type
export async function getWorkshopsByType(
  type: 'workshop' | 'module' | 'pack'
): Promise<Database['public']['Tables']['ateliers']['Row'][]> {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('ateliers')
      .select('*')
      .eq('type', type)
      .order('sequence_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching workshops by type ${type}:`, error);
    return [];
  }
}

// Helper function to get a workshop by slug
export async function getWorkshopBySlug(
  slug: string
): Promise<Database['public']['Tables']['ateliers']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('ateliers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching workshop by slug:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in getWorkshopBySlug:', error);
    return null;
  }
}

/**
 * ATELIERS - ADMIN ACTIONS
 */

// Helper function to get a workshop by ID
export async function getWorkshopById(
  id: number
): Promise<Database['public']['Tables']['ateliers']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('ateliers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching workshop by ID:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in getWorkshopById:', error);
    return null;
  }
}

// Helper function to create a workshop
export async function createWorkshop(
  workshop: Database['public']['Tables']['ateliers']['Insert']
) {
  const client = supabase;
  if (!client) return null;

  const { id: _, created_at: __, updated_at: ___, ...payload } = workshop;

  const { data, error } = await client
    .from('ateliers')
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error('Error creating workshop:', error);
    return null;
  }
  return data;
}

// Helper function to duplicate a workshop
export async function duplicateWorkshop(
  id: number
): Promise<Database['public']['Tables']['ateliers']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const original = await getWorkshopById(id);
    if (!original) throw new Error('Original workshop not found');

    // Prepare copy data (omit ID and timestamps, update title and slug)
    const { id: _, created_at: __, updated_at: ___, ...rest } = original;

    const timestamp = Date.now().toString().slice(-4);
    const copyData = {
      ...rest,
      titre: `${rest.titre} (Copie)`,
      slug: `${rest.slug}-copy-${timestamp}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await (client.from('ateliers') as any)
      .insert(copyData)
      .select()
      .single();

    if (error) {
      console.error('Error duplicating workshop:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in duplicateWorkshop:', error);
    return null;
  }
}

// Helper function to update a workshop
export async function updateWorkshop(
  id: number,
  workshop: Database['public']['Tables']['ateliers']['Update']
): Promise<Database['public']['Tables']['ateliers']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await (client.from('ateliers') as any)
      .update(workshop)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating workshop:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in updateWorkshop:', error);
    return null;
  }
}

// Helper function to delete a workshop
export async function deleteWorkshop(
  id: number
): Promise<Database['public']['Tables']['ateliers']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await (client.from('ateliers') as any)
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting workshop:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in deleteWorkshop:', error);
    return null;
  }
}

/**
 * RESERVATIONS
 */

// Helper function to create a reservation
export async function createReservation(
  reservation: Database['public']['Tables']['reservations']['Insert']
): Promise<Database['public']['Tables']['reservations']['Row'] | null> {
  const client = supabase;
  if (!client) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await (client.from('reservations') as any)
      .insert(reservation)
      .select()
      .single();

    if (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in createReservation:', error);
    throw error;
  }
}

// Helper function to get all reservations (admin)
export async function getReservations(): Promise<
  Database['public']['Tables']['reservations']['Row'][]
> {
  const client = supabase;
  if (!client) {
    console.warn('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await (client.from('reservations') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as any) || [];
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
}

// Helper function to get a single reservation by ID
export async function getReservationById(
  id: number
): Promise<Database['public']['Tables']['reservations']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await (client.from('reservations') as any)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in getReservationById:', error);
    return null;
  }
}

// Helper function to update reservation status
export async function updateReservationStatus(
  id: number,
  status: Database['public']['Tables']['reservations']['Row']['status']
): Promise<Database['public']['Tables']['reservations']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await (client.from('reservations') as any)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating reservation status:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error in updateReservationStatus:', error);
    return null;
  }
}

/**
 * BLOG ARTICLES
 */

// Helper function to get blog articles
export async function getBlogArticles(): Promise<
  Database['public']['Tables']['blog_articles']['Row'][]
> {
  const client = supabase;
  if (!client) {
    console.warn('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await (client.from('blog_articles') as any)
      .select('*')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (error) {
      // if the column doesn't exist (e.g., older DB schema), fallback to a simpler query
      if (error?.code === '42703') {
        const fallback = await (client.from('blog_articles') as any).select('*');
        return fallback.data || [];
      }
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching blog articles:', error);
    return [];
  }
}

// Helper function to get a blog article by slug
export async function getBlogArticleBySlug(
  slug: string
): Promise<Database['public']['Tables']['blog_articles']['Row'] | null> {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await (client.from('blog_articles') as any)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in getBlogArticleBySlug:', error);
    return null;
  }
}

/**
 * EVENTS / CALENDAR
 */

// Helper function to get all events
export async function getEvents() {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('events')
      .select('*, ateliers(*)')
      .gte('date_event', new Date().toISOString().split('T')[0])
      .order('date_event', { ascending: true })
      .order('heure_debut', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Helper function to get events by date range
export async function getEventsByDateRange(startDate: string, endDate: string) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('events')
      .select('*, ateliers(*)')
      .gte('date_event', startDate)
      .lte('date_event', endDate)
      .order('date_event', { ascending: true })
      .order('heure_debut', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events by date range:', error);
    return [];
  }
}

// Helper function to get events for a specific date
export async function getEventsByDate(date: string) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('events')
      .select('*, ateliers(*)')
      .eq('date_event', date)
      .order('heure_debut', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events for specific date:', error);
    return [];
  }
}

/**
 * GROUPS MANAGEMENT
 */

// --- Groups ---

export async function createGroup(
  group: Database['public']['Tables']['groups']['Insert']
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await (client.from('groups') as any)
      .insert(group)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

export async function getGroups() {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('groups') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
}

export async function getGroupById(id: number) {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await (client.from('groups') as any)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching group by id:', error);
    return null;
  }
}

export async function updateGroup(
  id: number,
  updates: Database['public']['Tables']['groups']['Update']
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await (client.from('groups') as any)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
}

export async function deleteGroup(id: number) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { error } = await (client.from('groups') as any)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting group:', error);
    return false;
  }
}

// --- Group Members ---

export async function addGroupMember(
  member: Database['public']['Tables']['group_members']['Insert']
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await (client.from('group_members') as any)
      .insert(member)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding group member:', error);
    throw error;
  }
}

export async function getGroupMembers(groupId: number) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('group_members') as any)
      .select('*, user:user_id(email)') // Assuming user_id links to auth.users which might not be directly queryable depending on permissions, but usually it's fine or we query profiles. For now, let's keep it simple.
      // Actually, querying linked auth users is tricky. We might need a public profile table.
      // For MVP, let's just get the rows.
      .select('*')
      .eq('group_id', groupId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching group members:', error);
    return [];
  }
}

export async function removeGroupMember(groupId: number, userId: string) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { error } = await (client.from('group_members') as any)
      .delete()
      .match({ group_id: groupId, user_id: userId });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing group member:', error);
    return false;
  }
}

// --- Group Sessions ---

export async function createGroupSession(
  session: Database['public']['Tables']['group_sessions']['Insert']
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await (client.from('group_sessions') as any)
      .insert(session)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating group session:', error);
    throw error;
  }
}

export async function getGroupSessions(groupId: number) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('group_sessions') as any)
      .select('*')
      .eq('group_id', groupId)
      .order('date_session', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching group sessions:', error);
    return [];
  }
}

// --- Attendance ---

export async function markAttendance(
  attendanceData: Database['public']['Tables']['attendance']['Insert']
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    // Upsert to handle updates
    const { data, error } = await (client.from('attendance') as any)
      .upsert(attendanceData, { onConflict: 'session_id, member_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw error;
  }
}

// Helper to get attendance for a session
export async function getAttendanceForSession(sessionId: number) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('attendance') as any)
      .select('*')
      .eq('session_id', sessionId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching attendance for session:', error);
    return [];
  }
}

// --- Group Resources ---

export async function uploadGroupResource(
  file: File,
  metadata: { group_id: number; title: string; type: 'file' }
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    // 1. Upload file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${metadata.group_id}/${Date.now()}.${fileExt}`;
    const { error: uploadError } = await client.storage
      .from('group-resources')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. Get public URL
    const {
      data: { publicUrl },
    } = client.storage.from('group-resources').getPublicUrl(fileName);

    // 3. Create database record
    const { data, error } = await (client.from('group_resources') as any)
      .insert({
        group_id: metadata.group_id,
        title: metadata.title,
        file_url: publicUrl,
        file_type: 'file',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading resource:', error);
    throw error;
  }
}

export async function createLinkResource(resource: {
  group_id: number;
  title: string;
  url: string;
}) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await (client.from('group_resources') as any)
      .insert({
        group_id: resource.group_id,
        title: resource.title,
        file_url: resource.url,
        file_type: 'link',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating link resource:', error);
    throw error;
  }
}

export async function getGroupResources(groupId: number) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('group_resources') as any)
      .select('*')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching group resources:', error);
    return [];
  }
}

export async function deleteGroupResource(id: number, fileUrl?: string) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    // 1. Delete DB record
    const { error } = await (client.from('group_resources') as any)
      .delete()
      .eq('id', id);

    if (error) throw error;

    // 2. If it's a file, try to delete from storage (optional cleanup)
    // We act on best effort here as extracting path from URL is brittle without storing path
    // For MVP we just delete the record.

    return true;
  } catch (error) {
    console.error('Error deleting resource:', error);
    return false;
  }
}

// --- Evaluations ---

export async function addEvaluation(
  evaluation: Database['public']['Tables']['evaluations']['Insert']
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await (client.from('evaluations') as any)
      .insert(evaluation)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding evaluation:', error);
    throw error;
  }
}

export async function getEvaluations(memberId: number) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('evaluations') as any)
      .select('*')
      .eq('member_id', memberId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    return [];
  }
}

// --- Users / Profiles ---

export async function searchUsers(query: string) {
  const client = supabase;
  if (!client) return [];

  try {
    const { data, error } = await (client.from('profiles') as any)
      .select('*')
      .or(`email.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

export async function getProfile(userId: string) {
  const client = supabase;
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('profiles')
      .select('id, email, full_name, account_type')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Database['public']['Tables']['profiles']['Row'] | null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function updateProfile(
  profile: Partial<Database['public']['Tables']['profiles']['Update']> & {
    id: string;
  }
) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  try {
    const { data, error } = await client
      .from('profiles')
      .update(profile)
      .eq('id', profile.id)
      .select()
      .single();

    if (error) throw error;
    return data as Database['public']['Tables']['profiles']['Row'];
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * PROJETS / FIL ROUGE
 */

export async function getGroupProjects(groupId: number) {
  const client = supabase;
  if (!client) return [];

  const { data, error } = await client
    .from('projects')
    .select('*, project_steps(*)')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching group projects:', error);
    return [];
  }
  return data;
}

export async function createProject(project: {
  group_id: number;
  title: string;
  description?: string;
}) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  const { data, error } = await client
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addProjectStep(step: {
  project_id: number;
  title: string;
  description?: string;
  step_order: number;
}) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  const { data, error } = await client
    .from('project_steps')
    .insert(step)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStudentDeliverables(memberId: number) {
  const client = supabase;
  if (!client) return [];

  const { data, error } = await client
    .from('project_deliverables')
    .select('*, project_steps(*, projects(*))')
    .eq('member_id', memberId);

  if (error) {
    console.error('Error fetching deliverables:', error);
    return [];
  }
  return data;
}

export async function addDeliverable(deliverable: {
  step_id: number;
  member_id: number;
  content?: string;
  file_url?: string;
}) {
  const client = supabase;
  if (!client) throw new Error('Supabase client not initialized');

  const { data, error } = await client
    .from('project_deliverables')
    .insert(deliverable)
    .select()
    .single();

  if (error) throw error;
  return data;
}
