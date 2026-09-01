import Link from 'next/link';
import { Compass, Sparkles, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: 'Conseil & accompagnement numérique | Cavalier Studio',
    description:
      'Sprint stratégique, retainer mensuel et accompagnement à la transformation numérique pour les structures du Grand Est.',
    openGraph: {
      title: 'Conseil & accompagnement numérique | Cavalier Studio',
      description:
        'Sprint stratégique, retainer mensuel et accompagnement à la transformation numérique pour les structures du Grand Est.',
      url: `https://www.ateliers360.fr/${locale}/cavalier-studio/conseil`,
    },
  };
}

export default async function ConseilPage({ params }: PageProps) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  return (
    <div className="space-y-16">
      <section className="bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
            Conseil & accompagnement numérique
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Cadrer, prioriser, décider — avant de développer quoi que ce soit</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Le plus grand gaspillage en numérique est de développer ce qu’il ne fallait pas. Nous aidons à définir exactement ce dont vous avez besoin, ce que ça coûte et dans quel ordre avancer.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`${basePath}/contact?pole=cavalier-studio&service=sprint`}>Réserver un sprint</Link>
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
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <Sparkles className="h-5 w-5" />
                <CardTitle className="text-xl">Sprint stratégique</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Analyse rapide, priorisation des chantiers et feuille de route opérationnelle.</p>
              <p className="font-semibold">290 – 490 € HT</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <Compass className="h-5 w-5" />
                <CardTitle className="text-xl">Accompagnement projet</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Suivi du projet numérique, conseils de gouvernance et choix de stack.</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <Users className="h-5 w-5" />
                <CardTitle className="text-xl">Retainer mensuel</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Support continu, points stratégiques réguliers et mise à jour des priorités.</p>
              <p className="font-semibold">400 – 1 600 €/mois HT</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
            <h2 className="text-3xl font-bold">Nos formats de conseil</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {[
                {
                  title: 'Sprint stratégique',
                  text: 'Demi-journée pour cadrer votre besoin, prioriser les fonctionnalités et établir une feuille de route.',
                },
                {
                  title: 'Accompagnement sur mesure',
                  text: 'Suivi de projet, alignement des équipes et arbitrage technique et fonctionnel.',
                },
                {
                  title: 'Retainer mensuel',
                  text: 'Support continu pour garder le cap sur les priorités numériques et agir rapidement.',
                },
                {
                  title: 'Recommandations actionnables',
                  text: 'Rapport clair avec étapes, chiffrage et planning pour lancer votre projet en confiance.',
                },
              ].map((item) => (
                <Card key={item.title} className="border-slate-200">
                  <CardContent>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <p className="mt-2 text-slate-700 leading-7">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Prêt à décider avant de développer ?</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Un bon conseil numérique évite les heures perdues sur des fonctionnalités qui n’apportent pas de valeur.
              </p>
            </div>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`${basePath}/contact?pole=cavalier-studio&service=conseil`}>
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-slate-300 text-slate-900 hover:bg-slate-50">
                <Link href={`${basePath}/cavalier-studio`}>
                  Revenir aux offres Cavalier Studio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
