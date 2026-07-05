'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PasserelleJeunesseAccompagnementProps = {
  locale: string;
};

export default function PasserelleJeunesseAccompagnement({ locale }: PasserelleJeunesseAccompagnementProps) {
  const t = useTranslations('PasserelleJeunesseAccompagnementPage');

  const benefits = [
    {
      icon: ShieldCheck,
      title: t('benefits.item1_title'),
      text: t('benefits.item1_text'),
    },
    {
      icon: HeartHandshake,
      title: t('benefits.item2_title'),
      text: t('benefits.item2_text'),
    },
    {
      icon: Compass,
      title: t('benefits.item3_title'),
      text: t('benefits.item3_text'),
    },
    {
      icon: Sparkles,
      title: t('benefits.item4_title'),
      text: t('benefits.item4_text'),
    },
  ];

  const audiences = [
    {
      title: t('audience.item1_title'),
      text: t('audience.item1_text'),
    },
    {
      title: t('audience.item2_title'),
      text: t('audience.item2_text'),
    },
    {
      title: t('audience.item3_title'),
      text: t('audience.item3_text'),
    },
    {
      title: t('audience.item4_title'),
      text: t('audience.item4_text'),
    },
  ];

  const steps = [
    {
      icon: Users,
      title: t('process.step1_title'),
      text: t('process.step1_text'),
    },
    {
      icon: Compass,
      title: t('process.step2_title'),
      text: t('process.step2_text'),
    },
    {
      icon: CalendarCheck,
      title: t('process.step3_title'),
      text: t('process.step3_text'),
    },
    {
      icon: CheckCircle2,
      title: t('process.step4_title'),
      text: t('process.step4_text'),
    },
  ];

  const faqItems = [
    {
      question: t('faq.item1_question'),
      answer: t('faq.item1_answer'),
    },
    {
      question: t('faq.item2_question'),
      answer: t('faq.item2_answer'),
    },
    {
      question: t('faq.item3_question'),
      answer: t('faq.item3_answer'),
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full bg-emerald-950 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge className="mb-4 border-emerald-200/30 bg-emerald-200/15 text-emerald-100">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-emerald-50">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50">
                <Link href={`/${locale}/contact?pole=passerelle-jeunesse&action=accompagnement`}>
                  {t('hero.primary_cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href={`/${locale}/passerelle-jeunesse/accompagnement#faq`}>{t('hero.secondary_cta')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">
              {t('benefits.badge')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">{t('benefits.title')}</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">{t('benefits.subtitle')}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{benefit.text}</p>
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
              <Badge variant="outline" className="mb-3">
                {t('audience.badge')}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">{t('audience.title')}</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">{t('audience.intro')}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {audiences.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="parcours" className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">
              {t('process.badge')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">{t('process.title')}</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">{t('process.intro')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700/10 text-emerald-700">
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
      </section>

      <section id="faq" className="w-full bg-slate-950 py-12 text-white md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-3 border-white/15 bg-white/10 text-slate-100">
              {t('faq.badge')}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">{t('faq.title')}</h2>
            <p className="mt-3 text-slate-300">{t('faq.intro')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-emerald-950">{t('cta.title')}</h2>
            <p className="mt-3 max-w-2xl text-lg text-emerald-900">{t('cta.text')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                <Link href={`/${locale}/contact?pole=passerelle-jeunesse&action=accompagnement`}>
                  {t('cta.button')}
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
