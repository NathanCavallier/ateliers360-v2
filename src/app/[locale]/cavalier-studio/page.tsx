import Link from 'next/link';
import { ArrowRight, Users, Sparkles, ShieldCheck, BookOpen, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: 'Cavalier Studio | Ateliers 360',
    description:
      'Cavalier Studio développe des sites, applications, intégrations IA et conseil numérique pour les structures éducatives, associatives et territoriales du Luxembourg.',
    openGraph: {
      title: 'Cavalier Studio | Ateliers 360',
      description:
        'Sites web, applications mobiles, intelligence artificielle et conseil numérique au Luxembourg pour les structures éducatives, associatives et territoriales.',
      url: `https://www.ateliers360.fr/${locale}/cavalier-studio`,
    },
  };
}

export default async function CavalierStudioPage({ params }: PageProps) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  const services = [
    {
      title: 'Sites & présences numériques',
      description:
        'Sites vitrines, sites associatifs, plateformes métiers et refontes sur mesure pour une présence web professionnelle.',
      href: `${basePath}/cavalier-studio/sites`,
    },
    {
      title: 'Applications web & mobiles',
      description:
        'Outils sur mesure pour vos usages réels : applications métiers, services aux publics et expériences mobiles.',
      href: `${basePath}/cavalier-studio/applications`,
    },
    {
      title: 'Intelligence artificielle appliquée',
      description:
        'Audit, intégration et formation : l’IA concrète pour améliorer vos process sans jargon inutile.',
      href: `${basePath}/cavalier-studio/intelligence-artificielle`,
    },
    {
      title: 'Bloom Connect',
      description:
        'Projet de mobilité premium entre Nancy, Metz et Luxembourg, pensé comme une solution hybride et sur mesure.',
      href: `${basePath}/cavalier-studio/bloom-connect`,
    },
    {
      title: 'Conseil & accompagnement numérique',
      description:
        'Sprint stratégique, feuille de route digitale et gouvernance de projet pour lancer les bonnes initiatives.',
      href: `${basePath}/cavalier-studio/conseil`,
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
              Pôle Solutions Numériques
            </Badge>
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
              Cavalier Studio
            </h1>
            <p className="text-xl leading-8 text-slate-300">
              Sites web, applications, intelligence artificielle et conseil numérique.
              Un studio actif au Luxembourg qui accompagne les associations, collectivités,
              écoles et PME de la région.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`${basePath}/contact?pole=cavalier-studio`}>
                  Demander un devis gratuit
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <Link href={`${basePath}/cavalier-studio#services`}>
                  Découvrir les offres
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-24" id="services">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-accent-600">Ce que nous créons</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Un seul interlocuteur pour votre projet numérique
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              De la refonte d’un site à l’intégration d’une application métier,
              nous accompagnons chaque étape du projet, avec une approche pragmatique,
              transparente et adaptée aux contraintes du terrain.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="border-slate-200 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-slate-700 leading-relaxed">{service.description}</p>
                  <Button asChild variant="outline" className="w-fit">
                    <Link href={service.href}>
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-950 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                title: 'Réponse sous 48h',
              },
              {
                icon: ShieldCheck,
                title: 'Devis gratuit & sans engagement',
              },
              {
                icon: Globe,
                title: 'Luxembourg · Grande Région',
              },
              {
                icon: Users,
                title: 'Projets livrés dans les délais',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-semibold">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-accent-600">Pourquoi Cavalier Studio</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Une approche locale, transparente et utile</h2>
              <p className="text-slate-700 leading-8">
                Basé au Luxembourg, Cavalier Studio comprend les usages des établissements scolaires,
                des associations, des collectivités et des entreprises. Nous construisons des
                outils qui simplifient la vie des équipes sans créer de surcoût technique.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: 'Ancré dans le territoire',
                  text: 'Nous savons travailler avec les acteurs du Luxembourg et de la Grande Région.',
                },
                {
                  title: 'Des projets adaptés',
                  text: 'Nos solutions tiennent compte des contraintes budgétaires et des rythmes des structures éducatives.',
                },
                {
                  title: 'Produits et services',
                  text: 'Nous développons aussi nos propres projets, comme Bloom Connect et des outils internes.',
                },
                {
                  title: 'Transparence totale',
                  text: 'Devis clair, besoins cadrés, planning précis. Pas de surprise en fin de projet.',
                },
              ].map((item) => (
                <Card key={item.title} className="border-slate-200">
                  <CardContent>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <p className="mt-3 text-slate-600 leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-950 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Prêt à discuter de votre projet ?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300 leading-8">
              Nous vous envoyons une proposition sous 48h, avec des options tarifaires claires
              et une feuille de route adaptée à votre contexte.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`${basePath}/contact?pole=cavalier-studio`}>Demander un devis</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <Link href={`${basePath}/contact?pole=cavalier-studio&service=sites`}>Contact rapide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
