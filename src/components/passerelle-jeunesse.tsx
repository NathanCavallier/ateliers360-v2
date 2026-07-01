import Link from 'next/link';
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, Palette, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PasserelleJeunesseProps = {
  locale: string;
};

const services = [
  {
    icon: Users,
    title: 'Accueil périscolaire',
    text: 'Accueil du matin, du soir et du mercredi dans un cadre bienveillant, structuré et adapté aux rythmes des enfants.',
  },
  {
    icon: Palette,
    title: 'Loisirs éducatifs',
    text: 'Activités créatives, culturelles, scientifiques, cuisine, jeux, sorties et événements pour prolonger l’école autrement.',
  },
  {
    icon: ShieldCheck,
    title: 'Cadre rassurant',
    text: 'Lien familles, informations utiles, règles claires et équipe qualifiée pour accueillir les jeunes de Metz et communes limitrophes.',
  },
];

const roadmap = [
  'Phase 1 : ouverture du local et accueil périscolaire',
  'Phase 2 : stages vacances et ateliers loisirs',
  'Phase 3 : partenariats écoles, CAF et collectivités',
  'Phase 4 : salle VR, studio vidéo et campus éducatif',
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
              Un espace périscolaire et de loisirs éducatifs à Metz
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-emerald-50">
              Passerelle Jeunesse accueille les jeunes dans un cadre bienveillant : périscolaire, mercredis, stages de vacances, activités créatives, culturelles et scientifiques.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50">
                <Link href={`/${locale}/contact?pole=passerelle-jeunesse`}>
                  Demander des informations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href={`/${locale}/nos-activites`}>Voir les trois pôles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Services prévus à l'ouverture</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Une offre construite autour des besoins quotidiens des familles : accueil, activités, vacances et lien régulier avec les parents.
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
              <h2 className="text-3xl font-bold tracking-tight">Un parcours famille clair</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Chaque inscription doit être simple à comprendre : besoin de garde, rythme souhaité, informations enfant, autorisations et modalités pratiques.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: ClipboardList, title: 'Demande structurée', text: 'La famille précise l’âge, les jours souhaités, le rythme et le contexte de l’enfant.' },
                { icon: CheckCircle2, title: 'Validation du dossier', text: 'Les informations utiles, autorisations parentales et conditions d’accueil sont confirmées.' },
                { icon: CalendarCheck, title: 'Planning confirmé', text: 'Les créneaux sont validés avec les horaires, modalités de paiement et contacts référents.' },
                { icon: ShieldCheck, title: 'Lien familles', text: 'Les parents disposent d’un point de contact clair pour suivre l’accueil et les activités.' },
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
