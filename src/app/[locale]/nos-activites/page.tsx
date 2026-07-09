import NosActivites from '@/components/nos-activites';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Nos activites | Ateliers 360',
    description: 'Decouvrez les deux poles Ateliers 360, Passerelle Jeunesse et Cavalier Studio.',
  };
}

export default async function NosActivitesPage({ params }: PageProps) {
  const { locale } = await params;
  return <NosActivites locale={locale} />;
}
