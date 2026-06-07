import PasserelleJeunesse from '@/components/passerelle-jeunesse';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Passerelle Jeunesse | Ateliers 360',
    description: 'Accompagnement mobilite et parcours jeunesse par Ateliers 360.',
  };
}

export default async function PasserelleJeunessePage({ params }: PageProps) {
  const { locale } = await params;
  return <PasserelleJeunesse locale={locale} />;
}
