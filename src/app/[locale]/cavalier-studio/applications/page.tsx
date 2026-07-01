import Link from 'next/link';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: 'Applications web & mobiles sur mesure | Cavalier Studio',
    description:
      'Développement d’applications web et mobiles sur mesure pour associations, collectivités, PME et porteurs de projets.',
    openGraph: {
      title: 'Applications web & mobiles sur mesure | Cavalier Studio',
      description:
        'Développement d’applications web et mobiles sur mesure pour associations, collectivités, PME et porteurs de projets.',
      url: `https://www.ateliers360.fr/${locale}/cavalier-studio/applications`,
    },
  };
}

export default async function ApplicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  return (
    <div className="space-y-16">
      <section className="bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
            Applications web & mobiles
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Des applications qui résolvent de vrais problèmes</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Pas de template, pas de solution générique. Nous concevons des outils numériques sur mesure qui s’adaptent à vos utilisateurs, à vos process et à vos contraintes réelles.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`${basePath}/contact?pole=cavalier-studio&service=applications`}>Demander un sprint stratégique</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href={`${basePath}/cavalier-studio`}>
                Revenir aux offres
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl">Applications métiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Outils de gestion, extranet, plateformes de services ou d’inscription : nous réalisons
                des applications qui simplifient les flux et réduisent les tâches manuelles.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>Plateforme d’adhésion et billetterie</li>
                <li>Espace de suivi pour familles et équipes</li>
                <li>Tableaux de bord et statistiques</li>
                <li>Intégration API et synchronisation de données</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl">Applications mobiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p>
                Des applications mobiles pensées pour les usages du terrain, les familles et les équipes.
                iOS, Android ou web mobile : nous adaptons la solution à votre écosystème.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>Booking et gestion d’événements</li>
                <li>Notifications et communication en temps réel</li>
                <li>Gestion de présence et d’activité</li>
                <li>Interfaces simples pour tous les publics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: 'Audit du besoin',
                text: 'Nous commençons par comprendre vos usages réels avant de proposer une solution technique.',
              },
              {
                title: 'Prototype rapide',
                text: 'Maquette et prototype interactif pour valider l’expérience avant le développement.',
              },
              {
                title: 'Déploiement maîtrisé',
                text: 'Livraison sur un environnement de staging, recette collaborative et mise en production soignée.',
              },
            ].map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardContent>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="mt-2 text-slate-700 text-sm leading-7">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Technologies adaptées à votre projet</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Next.js, React, React Native, Supabase, Stripe, API sur mesure : nous choisissons la stack en fonction de votre besoin,
                pas l’inverse.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Applications métiers</p>
                <p className="text-sm text-slate-600">Services internes, réservations, espaces privés.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900">Interfaces mobiles</p>
                <p className="text-sm text-slate-600">Outils dédiés aux familles, collaborateurs et participants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
