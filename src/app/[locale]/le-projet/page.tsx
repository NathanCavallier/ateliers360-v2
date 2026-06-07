import LeProjet from '@/components/le-projet';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Le Projet | Ateliers 360',
    description: 'Vision unifiee Ateliers 360 et Passerelle Jeunesse.',
  };
}

export default async function LeProjetPage({ params }: PageProps) {
  const { locale } = await params;
  return <LeProjet locale={locale} />;
}
