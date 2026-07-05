import { getTranslations } from 'next-intl/server';
import PasserelleJeunesse from '@/components/passerelle-jeunesse';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PasserelleJeunessePage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function PasserelleJeunessePage({ params }: PageProps) {
  const { locale } = await params;
  return <PasserelleJeunesse locale={locale} />;
}
