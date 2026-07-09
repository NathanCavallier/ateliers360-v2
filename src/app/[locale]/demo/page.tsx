import Link from 'next/link';
import { ArrowRight, Box, Camera, Monitor, Sparkles } from 'lucide-react';
import DemoRequestForm from '@/components/demo/DemoRequestForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return {
    title: 'Demander une démo | Ateliers 360 Lab — Metz, Grand Est',
    description:
      'Réservez une démonstration gratuite d’un atelier scientifique avec Ateliers 360. Présentiel, visio ou kit décideur sur mesure pour votre établissement.',
    openGraph: {
      title: 'Demander une démo | Ateliers 360 Lab — Metz, Grand Est',
      description:
        'Réservez une démonstration gratuite d’un atelier scientifique avec Ateliers 360. Présentiel, visio ou kit décideur sur mesure pour votre établissement.',
      url: `https://www.ateliers360.fr/${locale}/demo`,
    },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="space-y-16">
      <section className="bg-slate-950 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
            Démo sur mesure
          </Badge>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Avant de signer, voyez par vous-même.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Une démo vaut mieux que mille mots. Choisissez le format qui vous convient — nous nous adaptons à votre agenda.
              Gratuit, sans engagement, et personnalisé à votre contexte.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`/${locale}/demo#formulaire`}>Réserver une démo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href={`/${locale}/contact?service=demo`}>Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold">Quel format vous convient ?</h2>
              <p className="mt-4 text-slate-700 leading-8">
                Démo atelier en présentiel, visioconférence ou kit décideur : choisissez le format le plus simple pour vous.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  title: 'Démo atelier en présentiel',
                  subtitle: 'Venez voir un atelier en action dans nos locaux à Metz',
                  icon: Camera,
                  description:
                    'Une séquence de 20 à 30 minutes, visite de l’espace et échange personnalisé pour répondre à toutes vos questions.',
                },
                {
                  title: 'Démo en visioconférence',
                  subtitle: 'Une démonstration live depuis chez vous',
                  icon: Monitor,
                  description:
                    'Partage d’écran, extraits vidéo et présentation des contenus pédagogiques pour prendre une décision en toute confiance.',
                },
                {
                  title: 'Kit décideur + vidéo',
                  subtitle: 'Tout voir sans prendre rendez-vous',
                  icon: Box,
                  description:
                    'Recevez notre Kit Décideur et une sélection de vidéos d’ateliers réels en moins de 2 heures pour avancer rapidement.',
                },
              ].map((item) => (
                <Card key={item.title} className="border-slate-200">
                  <CardHeader className="flex items-start gap-4">
                    <div className="rounded-3xl bg-slate-950 p-4 text-white">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <p className="text-sm text-slate-500">{item.subtitle}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-slate-700">{item.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-xl">
            <h3 className="text-xl font-semibold">Ce que vous obtenez</h3>
            <ul className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-accent-foreground" />
                <span>Réponse rapide et sans engagement.</span>
              </li>
              <li className="flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-accent-foreground" />
                <span>Proposition claire adaptée à votre contexte.</span>
              </li>
              <li className="flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-accent-foreground" />
                <span>Un aperçu concret des ateliers Ateliers 360 et de nos formats pédagogiques.</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link href={`/${locale}/demo#formulaire`} className="inline-flex items-center gap-2 text-accent-foreground hover:underline">
                Cliquer pour réserver votre démo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  'J’étais sceptique sur le format escape game pour mes 5e. La démo nous a convaincus en 20 minutes.',
                author: 'Professeur de mathématiques, collège Metz',
              },
              {
                quote:
                  'La démo vidéo suffisait à répondre à toutes mes questions. J’ai signé le devis dans la foulée.',
                author: 'Directrice d’école primaire, agglomération messine',
              },
              {
                quote:
                  'La démo nous a permis de valider rapidement le format et le contenu pédagogique.',
                author: 'Parent d’élève, Metz',
              },
            ].map((item) => (
              <Card key={item.author} className="border-slate-200">
                <CardContent>
                  <p className="text-lg font-semibold text-slate-900">“{item.quote}”</p>
                  <p className="mt-4 text-sm text-slate-600">— {item.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6" id="formulaire">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Formulaire de demande de démo</h2>
            <p className="text-slate-700 leading-8">
              Choisissez votre format et donnez-nous des précisions pour que notre proposition soit prête dès le premier contact.
            </p>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Champs communs</h3>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>Prénom + Nom</li>
                <li>Email professionnel</li>
                <li>Téléphone (optionnel)</li>
                <li>Votre structure</li>
                <li>Nom de l’établissement et ville</li>
                <li>Pôle concerné : Ateliers 360</li>
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <DemoRequestForm />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16">
        <Separator />
        <div className="mt-10 space-y-4">
          <h2 className="text-3xl font-bold">Questions fréquentes</h2>
          <div className="space-y-6 text-slate-700">
            <div>
              <h3 className="font-semibold">La démo est-elle gratuite ?</h3>
              <p className="mt-2">Oui, sans condition et sans engagement de commande. C’est notre façon de vous montrer concrètement la qualité de nos interventions.</p>
            </div>
            <div>
              <h3 className="font-semibold">Puis-je amener des collègues ?</h3>
              <p className="mt-2">Oui, et c’est recommandé. Précisez le nombre de personnes pour que nous adaptions la présentation.</p>
            </div>
            <div>
              <h3 className="font-semibold">Combien de temps avant de recevoir le kit décideur ?</h3>
              <p className="mt-2">Nous l’envoyons sous 2 heures ouvrées après votre demande, avec un ensemble de vidéos et ressources utiles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
