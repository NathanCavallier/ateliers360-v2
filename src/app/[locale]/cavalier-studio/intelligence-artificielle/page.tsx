import Link from 'next/link';
import { Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return {
    title: 'Intelligence artificielle appliquée | Cavalier Studio',
    description:
      'Audit IA, intégration d’agents intelligents et formation pour les structures éducatives, associatives et territoriales.',
    openGraph: {
      title: 'Intelligence artificielle appliquée | Cavalier Studio',
      description:
        'Audit IA, intégration d’agents intelligents et formation pour les structures éducatives, associatives et territoriales.',
      url: `https://www.ateliers360.fr/${locale}/cavalier-studio/intelligence-artificielle`,
    },
  };
}

export default async function IAIntelligencePage({ params }: PageProps) {
  const { locale } = await params;
  const basePath = `/${locale}`;

  return (
    <div className="space-y-16">
      <section className="bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
            Intelligence artificielle appliquée
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">L'intelligence artificielle concrète, sans le jargon</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Nous aidons les structures à identifier où l’IA crée un gain réel, à l’intégrer sans complexité inutile et à former les équipes à son utilisation.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`${basePath}/contact?pole=cavalier-studio&service=audit-ia`}>Demander un audit IA</Link>
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
                <CardTitle className="text-xl">Audit IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Identification des usages pertinents, analyse des processus et feuille de route priorisée.</p>
              <p className="font-semibold">490 – 890 € HT</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <Cpu className="h-5 w-5" />
                <CardTitle className="text-xl">Intégration d'agents IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Chatbot, assistant de rédaction, classification automatique, reporting et excellence opérationnelle.</p>
              <p className="font-semibold">1 500 – 8 000 € HT</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-accent-foreground">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle className="text-xl">Formation IA</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>Accompagnement des équipes pour utiliser l’IA au quotidien, en présentiel ou à distance.</p>
              <p className="font-semibold">490 € à 790 € HT</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
            <h2 className="text-3xl font-bold">Notre approche de l'IA</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {[
                {
                  title: 'Pragmatique avant tout',
                  description:
                    'Si un tableur suffit, nous vous le dirons. L’IA ne doit pas être une fin en soi.',
                },
                {
                  title: 'Ancrage éducatif',
                  description:
                    'Nos ateliers et formations nous permettent de vulgariser l’IA pour tous les publics.',
                },
                {
                  title: 'Données protégées',
                  description:
                    'Nous privilégions les modèles européens et la sécurité des données pour les structures sensibles.',
                },
                {
                  title: 'Suivi dans le temps',
                  description:
                    'Nous vous accompagnons sur un plan de mise à jour et de veille annuelle.',
                },
              ].map((item) => (
                <Card key={item.title} className="border-slate-200">
                  <CardContent>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <p className="mt-2 text-slate-700 leading-7">{item.description}</p>
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
              <h2 className="text-3xl font-bold">Prêt à explorer l'IA pour votre structure ?</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Nous commençons par un audit mesurable, puis nous intégrons l’IA uniquement lorsque cela apporte un gain réel.
              </p>
            </div>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`${basePath}/contact?pole=cavalier-studio&service=audit-ia`}>
                  Demander un audit IA
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
