import FAQ from '@/components/faq';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const isEnglish = locale?.startsWith('en');

  return {
    title: isEnglish ? 'FAQ | Ateliers 360' : 'FAQ | Ateliers 360',
    description: isEnglish
      ? 'Common questions about Ateliers 360.'
      : 'Questions fréquemment posées sur Ateliers 360.',
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  return <FAQ locale={locale} />;
}
