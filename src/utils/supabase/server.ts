import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-server";
import type { User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

const extractBearerToken = (request?: Request | null) => {
  if (!request) return null;
  const authHeader =
    request.headers.get('authorization') ||
    request.headers.get('Authorization') ||
    request.headers.get('x-access-token');
  const match = authHeader?.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? authHeader ?? null;
};

export async function getAuthenticatedSupabase(
  request: Request | null,
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Promise<{
  supabaseClient: ReturnType<typeof createClient> | typeof supabaseAdmin | null;
  user: User | null;
  authSource: 'cookie' | 'token' | null;
  error?: string;
}> {
  const supabaseClient = createClient(cookieStore);

  // First try cookie-based server auth (SSR or same-site requests).
  const { data: userData, error: userError } = await supabaseClient.auth.getUser();

  if (userData?.user) {
    return {
      supabaseClient,
      user: userData.user,
      authSource: 'cookie',
    };
  }

  const token = extractBearerToken(request);
  if (!token) {
    return { supabaseClient: null, user: null, authSource: null };
  }

  const { data: tokenUserData, error: tokenError } =
    await supabaseAdmin.auth.getUser(token);
  if (tokenError || !tokenUserData?.user) {
    return {
      supabaseClient: null,
      user: null,
      authSource: null,
      error: tokenError?.message || 'Invalid access token',
    };
  }

  return {
    supabaseClient: supabaseAdmin,
    user: tokenUserData.user,
    authSource: 'token',
  };
}
