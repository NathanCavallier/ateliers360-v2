'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Award,
  BookOpen,
  Boxes,
  Calendar,
  ClipboardCheck,
  Compass,
  Euro,
  FileText,
  GitBranch,
  Route,
  School,
  Sparkles,
  Users,
} from 'lucide-react';
import { getWorkshops } from '@/lib/supabase';
import { mapWorkshop } from '@/lib/workshop-normalization';
import type { Workshop } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WorkshopCard from '@/components/workshops/WorkshopCard';
import CatalogCard from '@/components/catalog/CatalogCard';
import Logo from '@/components/common/Logo';
import AteliersLogoBrand from '@/components/home/AteliersLogoBrand';
import { cataloguesLinks } from '@/data/catalogues';

export default function Home() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const [featuredWorkshops, setFeaturedWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const data = await getWorkshops();
        setFeaturedWorkshops((data || []).slice(0, 6).map(mapWorkshop));
      } catch (error) {
        console.error('Error loading featured workshops:', error);
      }
    }

    loadWorkshops();
  }, []);

  const paths = [
    {
      icon: Compass,
      title: t('paths.disciplines.title'),
      description: t('paths.disciplines.description'),
      href: `/${locale}/disciplines`,
      cta: t('paths.disciplines.cta'),
    },
    {
      icon: Route,
      title: t('paths.modules.title'),
      description: t('paths.modules.description'),
      href: `/${locale}/modules`,
      cta: t('paths.modules.cta'),
    },
    {
      icon: Boxes,
      title: t('paths.packs.title'),
      description: t('paths.packs.description'),
      href: `/${locale}/packs`,
      cta: t('paths.packs.cta'),
    },
  ];

  const stats = [
    { icon: Users, value: '500+', label: t('stats.students') },
    { icon: School, value: '20+', label: t('stats.schools') },
    { icon: Award, value: '150+', label: t('stats.workshops') },
  ];

  const proofPoints = [
    {
      icon: ClipboardCheck,
      title: t('whyChoose.feature1.title'),
      description: t('whyChoose.feature1.description'),
    },
    {
      icon: Sparkles,
      title: t('whyChoose.feature2.title'),
      description: t('whyChoose.feature2.description'),
    },
    {
      icon: BookOpen,
      title: t('whyChoose.feature3.title'),
      description: t('whyChoose.feature3.description'),
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-12 md:py-20 bg-slate-950 text-white dark-section-heading overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070"
            alt={t('hero_image_alt')}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/80 to-slate-950" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent/30">
                <Sparkles className="w-3 h-3 mr-1" />
                {t('badge')}
              </Badge>
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {t('title')}
              </h1>
              <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
                {t('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link href={`/${locale}/ateliers`}>
                    {t('explore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Link href={`/${locale}/contact`}>{t('contact')}</Link>
                </Button>
              </div>

              {/* Accès rapides */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60 mb-3 font-semibold">
                  Accès rapides
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Link
                    href={`/${locale}/tarifs`}
                    className="group rounded-lg bg-white/5 hover:bg-white/10 p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">
                          Tarifs
                        </p>
                        <p className="text-xs text-white/60">Voir nos prix</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={`/${locale}/reserver`}
                    className="group rounded-lg bg-white/5 hover:bg-white/10 p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">
                          Réserver
                        </p>
                        <p className="text-xs text-white/60">
                          Réserver maintenant
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={`/${locale}/modules`}
                    className="group rounded-lg bg-white/5 hover:bg-white/10 p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">
                          Modules
                        </p>
                        <p className="text-xs text-white/60">
                          Formations longues
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={`/${locale}/packs`}
                    className="group rounded-lg bg-white/5 hover:bg-white/10 p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">
                          Packs
                        </p>
                        <p className="text-xs text-white/60">Offres groupées</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 max-w-sm">
              {/* Logo/Brand Box */}
              <div className="rounded-lg border border-white/15 bg-white/10 px-5 py-6 backdrop-blur-sm flex items-center justify-center min-h-28">
                <div className="text-center">
                  <Sparkles className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">
                    Ateliers360
                  </p>
                </div>
              </div>

              {/* Stats */}
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-white/15 bg-white/10 px-5 py-6 backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <Icon className="h-8 w-8 text-accent mb-2" />
                      <p className="text-2xl font-bold leading-none text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-300 mt-2">
                        {stat.label}
                      </p>
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
            <Badge variant="outline" className="mb-3">
              Deux pôles, une même mission
            </Badge>
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              Ateliers 360 et Passerelle Jeunesse
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg leading-relaxed">
              Un site unique pour découvrir les ateliers scientifiques et numériques, puis organiser l'accompagnement concret des jeunes quand la mobilité devient un frein.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-primary/20 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Ateliers 360</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  Des formats sciences, robotique, code, IA et projets élèves pour les écoles, familles, structures et entreprises.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Ateliers clés en main', 'Modules progressifs', 'Packs et cycles', 'Interventions sur mesure'].map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
                <Button asChild>
                  <Link href={`/${locale}/ateliers`}>
                    Explorer Ateliers 360
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/30 bg-emerald-50/60 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700">
                  <GitBranch className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl">Passerelle Jeunesse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  Un pôle d'accompagnement pour sécuriser les trajets, soutenir l'autonomie et relier les jeunes aux activités éducatives du territoire.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Accompagnement mobilité', 'Missions encadrées', 'Lien familles et structures', 'Parcours jeunesse à venir'].map((item) => (
                    <div key={item} className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-900">
                      {item}
                    </div>
                  ))}
                </div>
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link href={`/${locale}/demander-mission`}>
                    Demander une mission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">
              {t('paths.badge')}
            </Badge>
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              {t('paths.title')}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg leading-relaxed">
              {t('paths.subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {paths.map((path) => {
              const Icon = path.icon;
              return (
                <Card
                  key={path.title}
                  className="h-full transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-muted-foreground leading-relaxed">
                      {path.description}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={path.href}>
                        {path.cta}
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

      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-accent/5 via-background to-accent/10">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">
              {t('flexibleFormats.badge')}
            </Badge>
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              {t('flexibleFormats.title')}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg leading-relaxed">
              {t('flexibleFormats.subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: t('flexibleFormats.card1_title'),
                description: t('flexibleFormats.card1_description'),
                href: `/${locale}/pour-les-ecoles`,
              },
              {
                title: t('flexibleFormats.card2_title'),
                description: t('flexibleFormats.card2_description'),
                href: `/${locale}/pour-les-ecoles`,
              },
              {
                title: t('flexibleFormats.card3_title'),
                description: t('flexibleFormats.card3_description'),
                href: `/${locale}/pour-les-ecoles`,
              },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>{item.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={item.href}>
                      {t('flexibleFormats.card_cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="workshops" className="w-full py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-3">
                {t('featured')}
              </Badge>
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                {t('ourWorkshops')}
              </h2>
              <p className="mt-3 text-muted-foreground md:text-lg leading-relaxed">
                {t('ourWorkshopsSubtitle')}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/${locale}/ateliers`}>{t('viewAll')}</Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA - Réservation et Calendrier */}
      {/**
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* CTA Calendrier
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">
                    Consulter le calendrier
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Découvrez toutes les dates disponibles pour nos ateliers et
                  trouvez celle qui vous convient.
                </p>
                <Button asChild className="w-full">
                  <Link href={`/${locale}/calendrier`}>
                    Voir le calendrier
                    <Calendar className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* CTA Réservation
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Réserver maintenant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Réservez un ou plusieurs ateliers avec plusieurs dates en
                  quelques clics.
                </p>
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link href={`/${locale}/reserver`}>
                    Commencer une réservation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      <section className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              {t('whyChoose.title')}
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg leading-relaxed">
              {t('whyChoose.subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {/** Logo section */}
            <div className="flex items-center justify-center p-4">
              <Logo />
            </div>
            {proofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <Card key={point.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/*
      {cataloguesLinks.catalogue_ateliers && (
        <section className="w-full py-12 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                  {t('catalog.title')}
                </h2>
                <p className="text-muted-foreground md:text-lg leading-relaxed">
                  {t('catalog.subtitle')}
                </p>
              </div>
              <div className="max-w-xl">
                <CatalogCard
                  title={t('catalog.title')}
                  previewUrl={cataloguesLinks.catalogue_ateliers.preview_link}
                  downloadUrl={cataloguesLinks.catalogue_ateliers.download_link}
                  filename={cataloguesLinks.catalogue_ateliers.filename}
                />
              </div>
            </div>
          </div>
        </section>
      )} */}

      <section className="w-full py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
            alt={t('formations.image_alt')}
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
              {t('formations.title')}
            </h2>
            <p className="text-primary-foreground/90 md:text-xl leading-relaxed">
              {t('formations.subtitle')}
            </p>
            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 p-4"
                >
                  <span className="font-semibold block">
                    {t(`formations.feature${index}`)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link href={`/${locale}/contact`}>
                  {t('formations.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href={`/${locale}/pour-les-ecoles`}>
                  {t('formations.secondary_cta')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
