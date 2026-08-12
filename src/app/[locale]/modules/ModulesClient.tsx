'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  Route,
  Sparkles,
  Target,
} from 'lucide-react';
import { getWorkshopsByType } from '@/lib/supabase';
import { mapWorkshop } from '@/lib/workshop-normalization';
import type { Workshop } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import WorkshopCard from '@/components/workshops/WorkshopCard';

export default function ModulesClient() {
  const t = useTranslations('ModulesPage');
  const locale = useLocale();
  const [modules, setModules] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModules() {
      try {
        const data = await getWorkshopsByType('module');
        setModules(data.map(mapWorkshop));
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setLoading(false);
      }
    }

    loadModules();
  }, []);

  const usageFormats = [
    {
      icon: Target,
      title: t('format_single_title'),
      description: t('format_single_desc'),
    },
    {
      icon: CalendarDays,
      title: t('format_trimester_title'),
      description: t('format_trimester_desc'),
    },
    {
      icon: Route,
      title: t('format_long_cycle_title'),
      description: t('format_long_cycle_desc'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-12 md:py-20 bg-slate-950 text-white dark-section-heading overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
            alt={t('hero_image_alt')}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/75 to-slate-950" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="w-fit bg-primary/20 text-primary-foreground border-primary/30">
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
              <Button asChild size="lg">
                <Link href="#modules">
                  {t('cta_discover')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/contact`}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t('cta_contact')}
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
            <h2 className="text-3xl font-headline font-bold">{t('how_it_works_title')}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {usageFormats.map((format) => {
              const Icon = format.icon;
              return (
                <Card key={format.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{format.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{format.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="modules" className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-headline font-bold">{t('modules_title')}</h2>
              <p className="text-muted-foreground mt-2">{t('modules_subtitle')}</p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/${locale}/ateliers?format=module`}>
                {t('view_all_modules')}
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[300px] w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <div key={module.id} className="relative">
                  <div className="absolute left-3 top-3 z-20 rounded-md bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-sm">
                    P{index + 1}
                  </div>
                  <WorkshopCard workshop={module} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">{t('final_cta_title')}</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">{t('final_cta_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`/${locale}/reserver`}>{t('cta_book_cycle')}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={`/${locale}/pour-les-ecoles`}>{t('cta_school_offer')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link href={`/${locale}/contact`}>{t('cta_advice')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
