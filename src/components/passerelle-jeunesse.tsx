import Link from 'next/link';
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, MapPinned, Route, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PasserelleJeunesseProps = {
  locale: string;
};

const services = [
  {
    icon: Route,
    title: 'Accompagnement mobilite',
    text: 'Organisation de trajets encadres pour rejoindre une activite, un stage, un rendez-vous ou une structure partenaire.',
  },
  {
    icon: ShieldCheck,
    title: 'Cadre famille et mineurs',
    text: 'Collecte des informations essentielles, autorisations parentales et consignes de securite avant chaque mission.',
  },
  {
    icon: Users,
    title: 'Coordination locale',
    text: 'Lien entre familles, jeunes, structures d’accueil et partenaires pour limiter les ruptures dans le parcours.',
  },
];

const roadmap = [
  'Phase 1 : missions de mobilite encadrees',
  'Phase 2 : partenariats locaux et documents administratifs',
  'Phase 3 : ateliers Passerelle et activites jeunesse',
  'Phase 4 : accueil, parcours et formats immersifs',
];

export default function PasserelleJeunesse({ locale }: PasserelleJeunesseProps) {
  return (
    <div className="flex flex-col">
      <section className="w-full bg-emerald-950 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge className="mb-4 border-emerald-200/30 bg-emerald-200/15 text-emerald-100">
              Passerelle Jeunesse
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Accompagner les jeunes quand la mobilite devient une condition d'acces
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-emerald-50">
              Passerelle Jeunesse est le pole d'accompagnement d'Ateliers 360. Il commence par des missions de mobilite encadrees et s'etend progressivement vers des parcours jeunesse plus complets.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50">
                <Link href={`/${locale}/demander-mission`}>
                  Demander une mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href={`/${locale}/nos-activites`}>Voir les deux poles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Services disponibles aujourd'hui</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Le premier service est volontairement concret : organiser un accompagnement clair, documente et rassurant.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{service.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-3">Fonctionnement</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Une demande, une verification, une mission</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Chaque accompagnement doit pouvoir etre relu facilement : besoin, trajet, dates, contacts, autorisations et conditions.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: ClipboardList, title: 'Demande structuree', text: 'La famille ou la structure precise le jeune concerne, le trajet, les dates et le contexte.' },
                { icon: CheckCircle2, title: 'Validation du cadre', text: 'Les informations sensibles, autorisations et conditions d’intervention sont confirmees.' },
                { icon: CalendarCheck, title: 'Mission planifiee', text: 'La mission est confirmee avec les horaires, contacts et modalites de paiement.' },
                { icon: MapPinned, title: 'Suivi terrain', text: 'Le trajet et les points de contact restent identifies pour chaque accompagnement.' },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
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
            <h2 className="text-3xl font-bold tracking-tight">Une construction progressive</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {roadmap.map((item, index) => (
              <div key={item} className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-medium leading-relaxed text-emerald-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
