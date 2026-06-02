'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Beaker,
  Bot,
  Code,
  Cpu,
  Leaf,
  Lightbulb,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DisciplinesPage() {
  const t = useTranslations('DisciplinesPage');
  const locale = useLocale();

  const disciplines = [
    {
      id: 'sciences_experiences',
      filter: 'sciences',
      icon: Beaker,
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-700',
    },
    {
      id: 'numerique_code',
      filter: 'numerique-code',
      icon: Code,
      bgColor: 'bg-violet-50',
      iconColor: 'text-violet-700',
    },
    {
      id: 'robotique_ia',
      filter: 'robotique-ia',
      icon: Bot,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
    },
    {
      id: 'numerique_responsable',
      filter: 'numerique-responsable',
      icon: Sparkles,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-700',
    },
    {
      id: 'ecologie_sciences_vie',
      filter: 'ecologie-vie',
      icon: Leaf,
      bgColor: 'bg-lime-50',
      iconColor: 'text-lime-700',
    },
    {
      id: 'espace_aeronotique',
      filter: 'espace-aeronautique',
      icon: Rocket,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-700',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-12 md:py-20 bg-slate-950 text-white dark-section-heading overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=2070"
            alt={t('hero_image_alt')}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/75 to-slate-950" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20 text-accent border border-accent/30">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href={`/${locale}/ateliers`}>
                  {t('cta_button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/modules`}>{t('cta_modules')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-headline font-bold">
              {t('grid_title')}
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {t('grid_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((discipline) => {
              const Icon = discipline.icon;
              return (
                <Card
                  key={discipline.id}
                  className="group h-full transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div
                      className={`${discipline.bgColor} mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className={`h-6 w-6 ${discipline.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl font-headline">
                      {t(`${discipline.id}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${discipline.id}.description`)}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link
                        href={`/${locale}/ateliers?category=${discipline.filter}`}
                      >
                        {t('view_workshops')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <CardTitle>{t('modules_card_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  {t('modules_card_desc')}
                </p>
                <Button asChild>
                  <Link href={`/${locale}/modules`}>{t('cta_modules')}</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Rocket className="h-5 w-5" />
                </div>
                <CardTitle>{t('packs_card_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  {t('packs_card_desc')}
                </p>
                <Button asChild variant="outline">
                  <Link href={`/${locale}/packs`}>{t('cta_packs')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section CTA - Prêt à réserver */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-accent/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Prêt à commencer ?
            </h2>
            <p className="text-lg text-white/90">
              Découvrez notre calendrier des événements et réservez votre
              atelier dès maintenant.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg" variant="secondary">
                <Link href={`/${locale}/calendrier`}>
                  Voir le calendrier
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href={`/${locale}/reserver`}>
                  Réserver maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
