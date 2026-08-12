import { getBlogArticleBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import BlogArticleClient from '@/components/blog/BlogArticleClient';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/seo';
import type { BlogArticle } from '@/lib/types';

interface Props {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getBlogArticleBySlug(params.slug);
  const t = await getTranslations({ locale: params.locale, namespace: 'BlogPage' });

  if (!article) {
    return {
      title: t('not_found') || 'Article non trouvé | Ateliers 360',
    };
  }

  const description =
    article.excerpt || article.contenu.replace(/\n+/g, ' ').slice(0, 160);
  const articleUrl = `${SITE_URL}/${params.locale}/blog/${article.slug}`;
  const image = article.image_url || DEFAULT_OG_IMAGE;

  return {
    title: `${article.titre} | Ateliers 360`,
    description,
    keywords: [
      ...(article.tags || []),
      article.category || '',
      'blog',
      'Ateliers 360',
    ].filter(Boolean),
    openGraph: {
      title: article.titre,
      description,
      type: 'article',
      locale: params.locale === 'en' ? 'en_US' : 'fr_FR',
      siteName: 'Ateliers 360',
      url: articleUrl,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.titre,
      description,
      images: [image],
    },
    alternates: {
      canonical: articleUrl,
      languages: {
        en: `${SITE_URL}/en/blog/${article.slug}`,
        fr: `${SITE_URL}/fr/blog/${article.slug}`,
      },
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const article = await getBlogArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  return <BlogArticleClient article={article} locale={params.locale} />;
}
