'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, Settings, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getDashboardRole, getNavigationItemsForRole } from '@/lib/dashboardRoleConfig';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadProfileType() {
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('account_type')
        .eq('id', user.id)
        .maybeSingle();

      const metadata = user.user_metadata as any;
      setAccountType((profile as any)?.account_type || metadata?.account_type || null);
      setIsAdmin(
        (profile as any)?.account_type === 'admin' ||
          metadata?.role === 'admin' ||
          metadata?.account_type === 'admin'
      );
    }

    loadProfileType();
  }, []);

  const dashboardRole = useMemo(
    () => (isAdmin ? 'admin' : getDashboardRole(accountType, null)),
    [accountType, isAdmin]
  );

  const visibleNavigationItems = useMemo(
    () => getNavigationItemsForRole(dashboardRole),
    [dashboardRole]
  );

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push(`/${locale}/login`);
    }
  };

  const isActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    const hrefPath = href;
    return currentPath === hrefPath || currentPath.startsWith(hrefPath + '/');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* SIDEBAR - Desktop */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 h-full bg-slate-950 text-white border-r border-slate-800 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <Link href={`/${locale}/dashboard`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center font-bold text-white">
                A
              </div>
              {sidebarOpen && (
                <span className="font-bold text-lg">Ateliers 360</span>
              )}
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {visibleNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link key={item.href} href={`/${locale}${item.href}`}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 mb-2 transition-colors',
                    active
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{t(item.label)}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center text-slate-400 hover:text-slate-200 mb-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-slate-400 hover:text-red-400"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="text-sm">{t('dashboard_menu.logout')}</span>
            )}
          </Button>
        </div>
      </aside>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50">
          <div className="fixed left-0 top-0 h-full w-64 bg-slate-950 text-white p-4 border-r border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <Link href={`/${locale}/dashboard`}>
                <div className="font-bold text-lg">A360</div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="space-y-2">
              {visibleNavigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link key={item.href} href={`/${locale}${item.href}`}>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3',
                        active
                          ? 'bg-accent text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{t(item.label)}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 mt-8"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>{t('dashboard_menu.logout')}</span>
            </Button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main
        className={cn(
          'flex-1 flex flex-col overflow-hidden transition-all duration-300',
          'md:ml-64'
        )}
      >
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between md:justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/60" />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <div className="container py-6 px-4 md:px-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
