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

  // Mobile: only show essential links
  const mobilePrimaryLinks = [
    { href: '/', label: t('home') || 'Accueil' },
    { href: '/a-propos', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

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
      "sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/90 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition-all duration-300"
    )}>
      {/* MOBILE HEADER - Ultra minimal */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 gap-3">
        <Logo />
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10" aria-label={t('toggle_menu')}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
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

              {/* Mobile-only info banner */}
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                <p className="font-semibold">📱 Version Mobile Limitée</p>
                <p className="mt-1">Accès informatif et prise de contact uniquement.</p>
              </div>

              <nav className="space-y-3">
                {mobilePrimaryLinks.map(({ href, label }) => (
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
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4 space-y-3">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Prise de contact</p>
                  <Button asChild className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950">
                    <Link href={`/${locale}/contact`} onClick={() => setIsMobileMenuOpen(false)}>
                      Nous contacter
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={`/${locale}/reserver`} onClick={() => setIsMobileMenuOpen(false)}>
                      Réserver
                    </Link>
                  </Button>
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

