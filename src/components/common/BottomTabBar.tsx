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

  return null;

  // Mobile bottom navigation is hidden in favor of clean mobile-only experience
  // return (
  //   <nav aria-label="Navigation mobile" className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center">
  //     ...
  //   </nav>
  // );
};

export default BottomTabBar;
