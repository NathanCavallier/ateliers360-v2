import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  GitBranch,
  Handshake,
  Map,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LeProjetProps = {
  locale: string;
};

const pillars = [
  {
    icon: Sparkles,
    title: 'Explorer',
    text: 'Des ateliers sciences, numerique, robotique et IA pour donner envie de comprendre et de fabriquer.',
  },
  {
    icon: GitBranch,
    title: 'Relier',
    text: 'Une passerelle entre familles, jeunes, structures et territoires quand la mobilite ou l’organisation bloque l’acces.',
  },
  {
    icon: ShieldCheck,
    title: 'Securiser',
    text: 'Un cadre clair pour les mineurs : autorisations, informations essentielles, responsabilites et suivi.',
  },
  {
    icon: BookOpenCheck,
    title: 'Faire grandir',
    text: 'Des parcours qui renforcent la curiosite, l’autonomie et la confiance des jeunes dans la duree.',
  },
];

const roadmap = [
  {
    title: 'Socle commun',
    text: 'Unifier le site, clarifier les deux poles et rendre les demandes lisibles.',
  },
  {
    title: 'Cadre operationnel',
    text: 'Formaliser les documents, conditions, autorisations et flux de demande.',
  },
  {
    title: 'Partenariats',
    text: 'Structurer les liens avec familles, etablissements, associations et collectivites.',
  },
  {
    title: 'Ecosysteme jeunesse',
    text: 'Etendre les formats vers ateliers Passerelle, accueil, stages et experiences immersives.',
  },
];

export default function LeProjet({ locale }: LeProjetProps) {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-slate-950 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl">
            <Badge className="mb-4 border-emerald-300/30 bg-emerald-300/15 text-emerald-100">
              Le Projet
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Construire un ecosysteme educatif qui relie apprentissage, mobilite et autonomie
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-200">
              Ateliers 360 et Passerelle Jeunesse forment un meme projet : rendre les experiences utiles accessibles, puis accompagner les jeunes dans les conditions concretes qui leur permettent d’y participer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-400 text-slate-950 hover:bg-emerald-500">
                <Link href={`/${locale}/nos-activites`}>
                  Voir les activites
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10">
                <Link href={`/${locale}/passerelle-jeunesse`}>Decouvrir Passerelle</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">Vision unifiee</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Deux poles, une architecture commune</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Le site doit presenter clairement les offres existantes, tout en preparant les services jeunesse a venir.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-3">Objectifs</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Ce que le projet doit rendre possible</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                L’ambition n’est pas seulement d’ajouter une page : il faut rendre lisibles les parcours, les responsabilites et les demandes.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: Target, title: 'Clarifier les offres', text: 'Distinguer ateliers, missions mobilite, partenariats et futurs parcours jeunesse.' },
                { icon: Users, title: 'Rassurer les familles', text: 'Expliquer le cadre, les documents attendus et les points de contact.' },
                { icon: Handshake, title: 'Faciliter les partenariats', text: 'Donner aux structures une lecture simple du projet et des modes de collaboration.' },
                { icon: Map, title: 'Preparer le territoire', text: 'Construire une base evolutive pour les services locaux a venir.' },
              ].map((goal) => {
                const Icon = goal.icon;
                return (
                  <div key={goal.title} className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{goal.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">Feuille de route</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Une integration progressive</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {roadmap.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-emerald-950 py-12 text-white md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Passer de la vision a une demande concrete</h2>
              <p className="mt-2 max-w-2xl text-emerald-50">
                Pour une mission mobilite, une intervention educative ou un partenariat, le parcours doit commencer par un besoin clairement formule.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-white text-emerald-950 hover:bg-emerald-50">
                <Link href={`/${locale}/demander-mission`}>
                  Demander une mission
                  <CalendarDays className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10">
                <Link href={`/${locale}/contact`}>
                  Nous contacter
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
