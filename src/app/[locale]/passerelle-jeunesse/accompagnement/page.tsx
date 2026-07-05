import { getTranslations } from 'next-intl/server';
import PasserelleJeunesseAccompagnement from '@/components/passerelle-jeunesse-accompagnement';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PasserelleJeunesseAccompagnementPage' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AccompagnementPage({ params }: PageProps) {
  const { locale } = await params;
  return <PasserelleJeunesseAccompagnement locale={locale} />;
}
