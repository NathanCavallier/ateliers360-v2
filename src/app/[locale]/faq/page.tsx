import FAQ from '@/components/faq';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'FAQ | Ateliers 360 & Passerelle Jeunesse',
    description: 'Questions fréquemment posées sur Ateliers 360 et Passerelle Jeunesse.',
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  return <FAQ locale={locale} />;
}
