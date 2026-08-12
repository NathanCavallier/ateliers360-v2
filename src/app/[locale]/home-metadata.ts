import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/seo';

export async function getHomeMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: `${t('title')} — Ateliers 360`,
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
      locale: localeTag,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Ateliers 360',
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Ateliers 360' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle'),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export async function getDisciplinesMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'DisciplinesPage' });
  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: `${t('title')} — Ateliers 360`,
    description: t('subtitle') || t('title'),
    openGraph: {
      title: t('title'),
      description: t('subtitle') || t('title'),
      type: 'website',
      locale: localeTag,
      url: `${SITE_URL}/${locale}/disciplines`,
      siteName: 'Ateliers 360',
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Disciplines' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle') || t('title'),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export async function getPacksMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'PacksPage' });
  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: `${t('title')} — Ateliers 360`,
    description: t('subtitle') || t('title'),
    openGraph: {
      title: t('title'),
      description: t('subtitle') || t('title'),
      type: 'website',
      locale: localeTag,
      url: `${SITE_URL}/${locale}/packs`,
      siteName: 'Ateliers 360',
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Packs' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle') || t('title'),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export async function getModulesMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ModulesPage' });
  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: `${t('title')} — Ateliers 360`,
    description: t('subtitle') || t('title'),
    openGraph: {
      title: t('title'),
      description: t('subtitle') || t('title'),
      type: 'website',
      locale: localeTag,
      url: `${SITE_URL}/${locale}/modules`,
      siteName: 'Ateliers 360',
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Modules' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle') || t('title'),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export async function getAteliersMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'AtelierListPage' });
  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: `${t('title')} — Ateliers 360`,
    description: t('description') || t('title'),
    openGraph: {
      title: t('title'),
      description: t('description') || t('title'),
      type: 'website',
      locale: localeTag,
      url: `${SITE_URL}/${locale}/ateliers`,
      siteName: 'Ateliers 360',
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Ateliers' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description') || t('title'),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export async function getBlogMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    title: `${t('title')} — Ateliers 360`,
    description: t('subtitle') || t('description') || t('title'),
    openGraph: {
      title: t('title'),
      description: t('subtitle') || t('description') || t('title'),
      type: 'website',
      locale: localeTag,
      url: `${SITE_URL}/${locale}/blog`,
      siteName: 'Ateliers 360',
      images: [{ url: DEFAULT_OG_IMAGE, alt: 'Blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle') || t('description') || t('title'),
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
