import createMiddleware from 'next-intl/middleware';
import { auth } from '@/lib/auth';
import { routing } from '@/i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const i18nMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if accessing admin area (except login page)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = await auth();

    if (!session?.user) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while authenticated, redirect to dashboard
  if (pathname === '/admin/login') {
    const session = await auth();

    if (session?.user) {
      const dashboardUrl = new URL('/admin', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Apply i18n middleware for non-admin routes
  if (!pathname.startsWith('/admin')) {
    // Protect professional accounts that are not yet verified.
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (supabaseUrl && supabaseKey) {
        // createServerClient expects cookie helpers to read session from request
        let supabaseResponse = NextResponse.next({
          request: { headers: request.headers },
        });

        const supabase = createServerClient(supabaseUrl, supabaseKey, {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet: any[]) {
              cookiesToSet.forEach(({ name, value, options }) =>
                request.cookies.set(name, value)
              );
              supabaseResponse = NextResponse.next({ request });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        });

        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('account_type, is_verified')
            .eq('id', user.id)
            .maybeSingle();

          const professionalTypes = ['establishment', 'center', 'animator'];
          const accountType = profile?.account_type;
          const isVerified = profile?.is_verified;

          const isProfessional =
            typeof accountType === 'string' &&
            professionalTypes.includes(accountType);

          if (
            isProfessional &&
            isVerified === false &&
            !pathname.includes('/en-attente-validation')
          ) {
            const waitingUrl = new URL(
              `/${request.nextUrl.locale || 'fr'}/en-attente-validation`,
              request.url
            );
            return NextResponse.redirect(waitingUrl);
          }
        }
      }
    } catch (e) {
      // If anything fails here, fall back to i18n behavior without blocking users.
      console.warn('Middleware verification check failed:', e);
    }

    return i18nMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
