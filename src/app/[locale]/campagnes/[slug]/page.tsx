import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getAllCampaigns, getCampaign } from '@/data/campaigns';
import { CampaignLandingPage } from '@/components/campaigns/CampaignLandingPage';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/seo';

interface CampaignPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const campaign = getCampaign(slug);

  if (!campaign) {
    return {};
  }

  const localeTag = locale === 'en' ? 'en_US' : 'fr_FR';
  const pageUrl = `${SITE_URL}/${locale}/campagnes/${slug}`;

  return {
    title: `${campaign.title} — Ateliers 360`,
    description: campaign.description,
    openGraph: {
      title: campaign.title,
      description: campaign.description,
      type: 'website',
      locale: localeTag,
      url: pageUrl,
      images: campaign.heroImage
        ? [{ url: campaign.heroImage }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: campaign.title,
      description: campaign.description,
      images: campaign.heroImage ? [campaign.heroImage] : undefined,
    },
  };
}

export function generateStaticParams() {
  const locales = ['fr', 'en'];

  return locales.flatMap((locale) =>
    getAllCampaigns().map((campaign) => ({
      locale,
      slug: campaign.slug,
    })),
  );
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { locale, slug } = await params;
  const campaign = getCampaign(slug);

  if (!campaign) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/${locale}/campagnes/${slug}`;

  return <CampaignLandingPage campaign={campaign} url={pageUrl} />;
}
