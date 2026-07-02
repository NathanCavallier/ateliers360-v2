import FAQ from '@/components/faq';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const isEnglish = locale?.startsWith('en');

  return {
    title: isEnglish ? 'FAQ | Ateliers 360 Lab' : 'FAQ | Ateliers 360 Lab',
    description: isEnglish
      ? 'Common questions about Ateliers 360, Passerelle Jeunesse and Cavalier Studio.'
      : 'Questions fréquemment posées sur Ateliers 360, Passerelle Jeunesse et Cavalier Studio.',
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  return <FAQ locale={locale} />;
}
