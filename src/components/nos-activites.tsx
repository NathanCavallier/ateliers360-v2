import Link from 'next/link';
import { ArrowRight, CalendarCheck, FlaskConical, GitBranch, Route, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type NosActivitesProps = {
  locale: string;
};

const ateliersItems = [
  'Sciences expérimentales',
  'Robotique et programmation',
  'Intelligence artificielle',
  'Packs, modules et cycles',
];

const passerelleItems = [
  'Accompagnement mobilité',
  'Missions ponctuelles ou régulières',
  'Coordination familles et structures',
  'Parcours autonomie à construire',
];

export default function NosActivites({ locale }: NosActivitesProps) {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-slate-950 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge className="mb-4 border-emerald-300/30 bg-emerald-300/15 text-emerald-100">
              Nos activites
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Deux pôles pour accompagner la curiosité et l'autonomie des jeunes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-200">
              Ateliers 360 porte les expériences sciences et technologies. Passerelle Jeunesse complète l'écosystème avec un accompagnement mobilité et un cadre de confiance pour les familles.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Ateliers 360</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Des ateliers pratiques pour expérimenter, fabriquer, coder et comprendre les sciences par l'action.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ateliersItems.map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium">
                      {item}
                    </div>
                  ))}
                </div>
                <Button asChild>
                  <Link href={`/${locale}/ateliers`}>
                    Voir les ateliers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/30 bg-emerald-50/70">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                  <GitBranch className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Passerelle Jeunesse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Un service d'accompagnement qui aide les jeunes à rejoindre leurs activités, rendez-vous ou lieux de stage avec un cadre clair.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {passerelleItems.map((item) => (
                    <div key={item} className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-950">
                      {item}
                    </div>
                  ))}
                </div>
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link href={`/${locale}/passerelle-jeunesse`}>
                    Decouvrir Passerelle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Une logique commune</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Les deux pôles partagent la même exigence : rendre les parcours jeunesse plus concrets, plus accessibles et plus sécurisés.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: FlaskConical, title: 'Apprendre', text: 'Des situations pratiques et engageantes.' },
              { icon: Route, title: 'Relier', text: 'Des trajets et parcours mieux coordonnés.' },
              { icon: ShieldCheck, title: 'Sécuriser', text: 'Un cadre clair pour les familles et partenaires.' },
              { icon: CalendarCheck, title: 'Organiser', text: 'Des demandes structurées et suivies.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Vous avez une demande précise ?</h2>
              <p className="mt-2 text-muted-foreground">
                Décrivez le besoin : atelier, mission mobilité, partenariat ou question administrative.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href={`/${locale}/contact`}>
                Contacter l'equipe
                <Users className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
