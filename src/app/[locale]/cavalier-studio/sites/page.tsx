import Link from 'next/link';
import { BookOpen, Globe, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: 'Sites internet & présences numériques | Cavalier Studio',
    description:
      'Création de sites vitrines, associatifs et plateformes métiers pour les structures du Grand Est.',
    openGraph: {
      title: 'Sites internet & présences numériques | Cavalier Studio',
      description:
        'Création de sites vitrines, associatifs et plateformes métiers pour les structures du Grand Est.',
      url: `https://www.ateliers360.fr/${locale}/cavalier-studio/sites`,
    },
  };
}

export default async function SitesPage({ params }: PageProps) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  return (
    <div className="space-y-16">
      <section className="bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
            Sites & présences numériques
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Votre site internet, enfin à la hauteur de votre projet</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Nous concevons des sites clairs, rapides et bien référencés pour les structures qui veulent exister sur le web sans y passer leur vie.
            Du site vitrine pour une association à la plateforme complexe pour une collectivité, chaque projet est traité avec le même soin.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`${basePath}/contact?pole=cavalier-studio&service=sites`}>Demander un devis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href={`${basePath}/cavalier-studio#tarifs`}>Voir les tarifs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <Globe className="h-5 w-5" />
                <CardTitle className="text-xl">Formule Essentiel</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p className="font-semibold">Associations, micro-structures, indépendants</p>
              <p>800 – 1 500 € HT</p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>5 à 7 pages avec design responsive</li>
                <li>Formulaire de contact sécurisé</li>
                <li>Optimisation SEO de base</li>
                <li>Hébergement offert 1re année</li>
                <li>Formation 1h</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <BookOpen className="h-5 w-5" />
                <CardTitle className="text-xl">Formule Studio</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p className="font-semibold">PME, écoles, structures culturelles, mairies</p>
              <p>1 500 – 3 500 € HT</p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>10 à 20 pages</li>
                <li>CMS et blog intégrés</li>
                <li>Formulaire routé par service</li>
                <li>SEO complet + suivi</li>
                <li>Formation 2h</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <Sparkles className="h-5 w-5" />
                <CardTitle className="text-xl">Formule Signature</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-700">
              <p className="font-semibold">Collectivités, établissements supérieurs, projets ambitieux</p>
              <p>3 500 – 8 000 € HT+</p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>Site entièrement sur mesure</li>
                <li>Direction artistique et fonctionnalités avancées</li>
                <li>Audit accessibilité RGAA</li>
                <li>Performance optimisée</li>
                <li>Support prioritaire 3 mois</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-950 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Maintenance & hébergement</h2>
              <p className="mt-4 text-slate-300 leading-8">
                Un site non maintenu, c’est un site qui ralentit, devient vulnérable et perd du référencement.
                Nos contrats assurent la sécurité, la disponibilité et des mises à jour régulières.
              </p>
            </div>
            <div className="grid gap-4">
              <Card className="border-white/10 bg-slate-900/80">
                <CardContent className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-accent-300">Formule Sérénité</p>
                  <p className="text-2xl font-semibold">80 €/mois HT</p>
                  <ul className="space-y-2 text-sm text-slate-300 pl-4 list-disc">
                    <li>Mises à jour de sécurité</li>
                    <li>Sauvegarde hebdomadaire</li>
                    <li>Surveillance de disponibilité</li>
                    <li>30 min de modifications</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-slate-900/80">
                <CardContent className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-accent-300">Formule Confort</p>
                  <p className="text-2xl font-semibold">150 €/mois HT</p>
                  <ul className="space-y-2 text-sm text-slate-300 pl-4 list-disc">
                    <li>Tout Sérénité +</li>
                    <li>1h30 de modifications</li>
                    <li>Optimisation trimestrielle</li>
                    <li>Rapport de trafic</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Comment ça se passe ?</h2>
              <p className="mt-4 text-slate-700 leading-8">
                De la demande initiale à la mise en ligne, nous organisons chaque étape pour que vous gardiez une vision claire du périmètre, du planning et du budget.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Brief et cadrage',
                'Devis détaillé sous 48h',
                'Développement sur mesure',
                'Recette, corrections et mise en ligne',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
