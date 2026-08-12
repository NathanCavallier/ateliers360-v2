'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  Calendar,
  Gift,
  Handshake,
  Layers,
  Percent,
  Rocket,
  ShieldCheck,
  Trophy,
} from 'lucide-react';
import { getWorkshopsByType } from '@/lib/supabase';
import { mapWorkshop } from '@/lib/workshop-normalization';
import type { Workshop } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import WorkshopCard from '@/components/workshops/WorkshopCard';

export default function PacksClient() {
  const t = useTranslations('PacksPage');
  const locale = useLocale();
  const [packs, setPacks] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPacks() {
      try {
        const data = await getWorkshopsByType('pack');
        setPacks(data.map(mapWorkshop));
      } catch (error) {
        console.error('Error loading packs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPacks();
  }, []);

  const intensiveFormats = [
    {
      id: 'stages',
      title: t('format_stages'),
      desc: t('format_stages_desc'),
      icon: Calendar,
      href: `/${locale}/stages`,
    },
    {
      id: 'anniversaires',
      title: t('format_anniversaires'),
      desc: t('format_anniversaires_desc'),
      icon: Gift,
      href: `/${locale}/contact`,
    },
    {
      id: 'hackathons',
      title: t('format_hackathons'),
      desc: t('format_hackathons_desc'),
      icon: Trophy,
      href: `/${locale}/pour-les-ecoles`,
    },
  ];

  const packagedFormats = [
    {
      title: t('pack_trimester_title'),
      desc: t('pack_trimester_desc'),
    },
    {
      title: t('pack_semester_title'),
      desc: t('pack_semester_desc'),
    },
    {
      title: t('pack_annual_title'),
      desc: t('pack_annual_desc'),
    },
  ];

  const commercialPoints = [
    { icon: Percent, text: t('condition_discount') },
    { icon: Handshake, text: t('condition_annual') },
    { icon: ShieldCheck, text: t('condition_deposit') },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-12 md:py-20 bg-slate-950 text-white dark-section-heading overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070"
            alt={t('hero_image_alt')}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/75 to-slate-950" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="w-fit bg-accent/20 text-accent-foreground border-accent-foreground/30">
              <Rocket className="w-3 h-3 mr-1" />
              {t('badge')}
            </Badge>
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#cycles">
                  {t('cta_explore_cycles')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/pour-les-ecoles`}>
                  {t('cta_institutional_offer')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-14 bg-background">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">
              {t('intro_title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-headline font-bold">
              {t('packaged_formats_title')}
            </h2>
            <p className="text-muted-foreground mt-2">
              {t('packaged_formats_subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packagedFormats.map((format) => (
              <Card key={format.title}>
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Layers className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{format.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{format.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cycles" className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-headline font-bold">{t('cycles_title')}</h2>
              <p className="text-muted-foreground mt-2">{t('cycles_subtitle')}</p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/${locale}/ateliers?format=pack`}>
                {t('view_all_packs')}
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packs.map((pack) => (
                <WorkshopCard key={pack.id} workshop={pack} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-headline font-bold">{t('intensifs_title')}</h2>
            <p className="text-muted-foreground mt-2">{t('intensifs_subtitle')}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {intensiveFormats.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} className="h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-headline">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-5">
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={item.href}>
                        {t('learn_more')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-gradient-to-r from-primary to-accent/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t('final_cta_title')}</h2>
            <p className="text-lg text-white/90">{t('final_cta_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg" variant="secondary">
                <Link href={`/${locale}/calendrier`}>
                  {t('cta_calendar')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href={`/${locale}/reserver`}>
                  {t('cta_reserve_now')}
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
