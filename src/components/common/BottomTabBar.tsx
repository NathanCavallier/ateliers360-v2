'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calendar, User, Search } from 'lucide-react';

const BottomTabBar = () => {
  const locale = useLocale();
  const pathname = usePathname() || '/';
  const t = useTranslations('Navigation');

  const tabs = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/ateliers', label: t('workshops_list'), icon: BookOpen },
    { href: '/reserver', label: 'Réserver', icon: Calendar },
    { href: '/catalogues', label: t('catalogues'), icon: Search },
    { href: '/dashboard', label: 'Compte', icon: User },
  ];

  const withLocale = (p: string) => `/${locale}${p}`;

  return (
    <nav aria-label="Navigation mobile" className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className="mx-4 w-auto rounded-3xl bg-white/95 dark:bg-slate-900/85 border border-border/20 shadow-2xl backdrop-blur-md px-2 py-2">
        <ul className="flex items-center gap-1">
          {tabs.map(({ href, label, icon: Icon }) => {
            const full = withLocale(href);
            const active =
              pathname === full ||
              pathname === `${full}/` ||
              pathname.startsWith(`${full}/`);
            return (
              <li key={href} className="flex-1">
                <Link href={full} className="flex w-full flex-col items-center justify-center px-3 py-1" aria-label={label}>
                  <div
                    className={`flex items-center justify-center rounded-full p-2 transition-transform duration-200 ease-out ${
                      active ? 'bg-primary/10 scale-105 shadow-md' : 'bg-transparent'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors transform ${
                        active ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <span className={`mt-1 text-[12px] leading-3 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomTabBar;
