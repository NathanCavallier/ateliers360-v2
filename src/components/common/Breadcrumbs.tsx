'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const t = useTranslations('Navigation');

  return (
    <nav className="flex mb-6 text-sm font-medium overflow-x-auto whitespace-nowrap pb-2 md:pb-0" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('home')}</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="ml-1 text-muted-foreground hover:text-primary transition-colors md:ml-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-1 text-foreground font-semibold md:ml-2">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
