import Link from 'next/link';
import { AlertTriangle, Bus, Clock, MapPin, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: 'Bloom Connect | Mobilité premium Nancy–Metz–Grand Est',
    description:
      'Bloom Connect est un service de mobilité hybride premium pour les professionnels du corridor Nancy–Metz–Grand Est.',
    openGraph: {
      title: 'Bloom Connect | Mobilité premium Nancy–Metz–Grand Est',
      description:
        'Bloom Connect est un service de mobilité hybride premium pour les professionnels du corridor Nancy–Metz–Grand Est.',
      url: `https://www.ateliers360.fr/${locale}/cavalier-studio/bloom-connect`,
    },
  };
}

export default async function BloomConnectPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="space-y-16">
      <section className="bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
            Un projet Cavalier Studio
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Bloom Connect</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Réinventer la mobilité entre les pôles de la Grande Région avec un service hybride premium,
            pensé pour les professionnels frontaliers.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#liste-attente">Rejoindre la liste d'attente</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="#concept">En savoir plus</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Réponse sous 48h',
              'Liste d’attente ouverte',
              'Service premium à venir',
              'Corridor Grand Est–France',
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
                <p className="font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6" id="concept">
        <h2 className="text-3xl font-bold">Comment fonctionne Bloom Connect</h2>
        <p className="mt-4 max-w-3xl text-slate-700 leading-8">
          Bloom Connect combine la régularité d’une ligne de transport, le confort premium d’un service dédié
          et la flexibilité d’une réservation simple. L’objectif : transformer le trajet en temps utile.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            {
              title: 'Régularité',
              icon: Clock,
              text: 'Créneaux fixes sur le corridor Grand Est–France, garantis sans surcharge et avec une place réservée.',
            },
            {
              title: 'Exclusivité',
              icon: Bus,
              text: 'Véhicules haut de gamme, chauffeurs formés, services à bord pour un trajet confortable et productif.',
            },
            {
              title: 'Flexibilité',
              icon: MapPin,
              text: 'Réservation simple, options sur demande et service capable de répondre aux besoins ponctuels des entreprises.',
            },
            {
              title: 'Abonnement',
              icon: Sparkles,
              text: 'Formules mensuelles pour garantir la place, simplifier la facturation et optimiser le remboursement frais professionnels.',
            },
          ].map((item) => (
            <Card key={item.title} className="border-slate-200">
              <CardHeader>
                <div className="flex items-center gap-2 text-accent-foreground">
                  <item.icon className="h-5 w-5" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-slate-700">{item.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold">Pour qui ?</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Le frontalier régulier',
                text: 'Vous traversez la Grande Région plusieurs fois par semaine et voulez utiliser ce temps utilement.',
              },
              {
                title: 'Le professionnel en déplacement',
                text: 'Vous avez besoin d’un service premium facturable en note de frais sans les contraintes d’un VTC classique.',
              },
              {
                title: 'L’entreprise',
                text: 'Vous organisez les déplacements de plusieurs collaborateurs sur le corridor lorrain.',
              },
            ].map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardContent>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="mt-3 text-slate-700 leading-7">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6" id="liste-attente">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Rejoignez la liste d'attente</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Soyez informé en priorité du lancement et bénéficiez d’une offre early bird exclusive.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700 pl-5 list-disc">
                <li>Notification prioritaire</li>
                <li>Offre de lancement exclusive</li>
                <li>Accès privilégié aux créneaux</li>
              </ul>
            </div>
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="rounded-2xl bg-slate-900/5 p-4">
                <p className="font-semibold">Pack 5 trajets/mois</p>
                <p>À partir de 150 €/mois HT</p>
              </div>
              <div className="rounded-2xl bg-slate-900/5 p-4">
                <p className="font-semibold">Pack 10 trajets/mois</p>
                <p>À partir de 270 €/mois HT</p>
              </div>
              <div className="rounded-2xl bg-slate-900/5 p-4">
                <p className="font-semibold">Pack entreprise</p>
                <p>Sur devis selon fréquence et effectifs</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/fr/contact?pole=cavalier-studio&service=bloom-connect-b2b">Demander un devis entreprise</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-50">
              <Link href="/fr/contact?pole=cavalier-studio">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
