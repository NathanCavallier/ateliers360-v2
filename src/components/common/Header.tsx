'use client';

import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Logo from '@/components/common/Logo';
import LocaleSwitcher from '@/components/common/LocaleSwitcher';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';

const Header = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const isHeaderVisible = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const t = useTranslations('Navigation');

  const authButton = useMemo(() => {
    const inscriptionPath = `/${locale}/inscription`;
    const loginPath = `/${locale}/login`;
    const waitingPath = `/${locale}/en-attente-validation`;
    const isInscriptionFlow =
      pathname === inscriptionPath ||
      pathname.startsWith(`${inscriptionPath}/`) ||
      pathname === waitingPath;

    if (pathname === loginPath) {
      return { href: inscriptionPath, label: t('sign_up') };
    }

    if (isInscriptionFlow) {
      return { href: loginPath, label: t('log_in') };
    }

    return { href: inscriptionPath, label: t('sign_up') };
  }, [locale, pathname, t]);

  const primaryLinks = [
    { href: '/ateliers', label: t('workshops_list') },
    { href: '/catalogues', label: t('catalogues') },
    { href: '/constructeur', label: t('constructor') },
    { href: '/contrats', label: t('contracts') },
    { href: '/familles', label: t('families') },
    { href: '/contact', label: t('contact') },
  ];

  const ctaLink = { href: '/reserver', label: t('reserve') };

  const secondaryLinks = [
    { href: '/disciplines', label: t('disciplines') },
    { href: '/modules', label: t('modules') },
    { href: '/packs', label: t('packs') },
    { href: '/pour-les-entreprises', label: t('companies') },
    { href: '/pour-les-structures', label: t('structures') },
    { href: '/pour-les-ecoles', label: t('schools') },
    { href: '/tarifs', label: t('pricing') },
    { href: '/recompenses', label: t('rewards') },
    { href: '/a-propos', label: t('about') },
  ];

  const moreLinks = secondaryLinks;
  const mobileLinks = [...primaryLinks, ...moreLinks, ctaLink];

  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/90 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition-all duration-300",
      !isHeaderVisible && "md:translate-y-0 -translate-y-full md:-translate-y-1/2"
    )}>
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 sm:px-6">
        {/* Top row: Logo + Auth / always visible */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Logo />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
                {t('brand_name')}
              </span>
              <span className="text-sm font-semibold text-slate-100">
                {t('brand_tagline')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 shadow-inner">
              <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950">
                {t('new_badge')}
              </span>
              <span>{t('catalogue_label')}</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <LocaleSwitcher />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="inline-flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {t('account')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/${locale}/dashboard`}>{t('account')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>{t('logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm">
                  <Link href={authButton.href}>{authButton.label}</Link>
                </Button>
              )}
            </div>
            <div className="md:hidden">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        {/* Navigation row: hidden on scroll (mobile), visible on desktop */}
        <div className={cn(
          "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between transition-all duration-300",
          !isHeaderVisible && "md:block hidden"
        )}>
          <nav className="order-2 flex flex-wrap justify-center gap-2 text-sm sm:order-1">
            {primaryLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={cn(
                  'rounded-full px-4 py-2 font-semibold transition duration-200 ease-out whitespace-nowrap shadow-sm',
                  pathname === `/${locale}${href}`
                    ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/20'
                    : 'border border-slate-800/80 bg-slate-900/80 text-slate-200 hover:border-emerald-400/40 hover:bg-slate-900/95 hover:text-white'
                )}
              >
                {label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition duration-200 hover:border-emerald-400/40 hover:bg-slate-900/95 hover:text-white">
                {t('more')}
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {moreLinks.map(({ href, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      href={`/${locale}${href}`}
                      className={cn(
                        'w-full cursor-pointer',
                        pathname === `/${locale}${href}` ? 'font-semibold text-emerald-600' : ''
                      )}
                    >
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/** Espacement horizontal */}
            <div className="px-5"></div>

            <div className="order-1 flex flex-wrap items-center justify-center gap-3 sm:order-2 lg:justify-end">
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/${locale}${ctaLink.href}`}>{ctaLink.label}</Link>
              </Button>
              <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/75 px-3 py-2 text-sm text-slate-400">
                <span className="font-semibold text-slate-100">{t('ready_to_book')}</span>
              </div>
            </div>

          </nav>
        </div>

        {/* Description section: hidden on mobile scroll */}
        <div className={cn(
          "rounded-[2rem] border border-white/10 bg-slate-900/80 px-5 py-3 text-sm text-slate-300 shadow-inner sm:px-6 transition-all duration-300",
          !isHeaderVisible && "md:block hidden"
        )}>
          <p className="text-center text-slate-300">
            {t('header_description')}
          </p>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t('toggle_menu')}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto px-4 py-6">
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="sr-only">{t('close_menu')}</span>
                  <ChevronDown className="h-6 w-6 rotate-180" />
                </Button>
              </div>
              <nav className="space-y-3">
                {mobileLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={`/${locale}${href}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block rounded-2xl px-4 py-3 text-base font-semibold transition-colors',
                      pathname === `/${locale}${href}`
                        ? 'bg-emerald-400 text-slate-950'
                        : 'text-muted-foreground hover:bg-slate-800/80 hover:text-white'
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-4 rounded-2xl bg-slate-900/80 p-4 text-sm text-slate-300">
                  {user ? (
                    <>
                      <Link
                        href={`/${locale}/dashboard`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block rounded-xl bg-slate-950 px-3 py-2 font-semibold text-white"
                      >
                        {t('account')}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="mt-3 w-full rounded-xl bg-emerald-400 px-3 py-2 text-left font-semibold text-slate-950"
                      >
                        {t('logout')}
                      </button>
                    </>
                  ) : (
                    <Link
                      href={authButton.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-xl bg-emerald-400 px-3 py-2 text-center font-semibold text-slate-950"
                    >
                      {authButton.label}
                    </Link>
                  )}
                </div>
              </nav>
              <div className="mt-6 border-t border-slate-800/70 pt-4">
                <LocaleSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

