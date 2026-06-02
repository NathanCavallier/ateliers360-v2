'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  FileText,
  CalendarDays,
  Layers,
  Clock,
  Handshake,
  ShieldCheck,
} from 'lucide-react';

const contractTypes = [
  {
    icon: FileText,
    titleKey: 'contract_type_single_workshop_title',
    descriptionKey: 'contract_type_single_workshop_description',
  },
  {
    icon: Layers,
    titleKey: 'contract_type_package_title',
    descriptionKey: 'contract_type_package_description',
  },
  {
    icon: CalendarDays,
    titleKey: 'contract_type_annual_agreement_title',
    descriptionKey: 'contract_type_annual_agreement_description',
  },
];

const processSteps = [
  {
    step: '1',
    titleKey: 'process_step_1_title',
    descriptionKey: 'process_step_1_description',
  },
  {
    step: '2',
    titleKey: 'process_step_2_title',
    descriptionKey: 'process_step_2_description',
  },
  {
    step: '3',
    titleKey: 'process_step_3_title',
    descriptionKey: 'process_step_3_description',
  },
  {
    step: '4',
    titleKey: 'process_step_4_title',
    descriptionKey: 'process_step_4_description',
  },
];

const contractBenefits = [
  {
    titleKey: 'benefit_billing_title',
    descriptionKey: 'benefit_billing_description',
  },
  {
    titleKey: 'benefit_pedagogical_followup_title',
    descriptionKey: 'benefit_pedagogical_followup_description',
  },
  {
    titleKey: 'benefit_validated_conventions_title',
    descriptionKey: 'benefit_validated_conventions_description',
  },
  {
    titleKey: 'benefit_flexible_scheduling_title',
    descriptionKey: 'benefit_flexible_scheduling_description',
  },
];

export default function ContratsPage() {
  const locale = useLocale();
  const t = useTranslations('ContractPage');

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070"
            alt={t('hero_image_alt')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/80 to-slate-950/95" />
        </div>

        <div className="container relative z-10 px-4 py-24 sm:px-6 md:py-32">
          <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/85 p-10 shadow-2xl backdrop-blur-xl">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30">
              {t('badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('hero_title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 leading-8">
              {t('hero_subtitle')}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="bg-primary text-white shadow-lg shadow-primary/20">
                <Link href={`/${locale}/contact`}>
                  {t('contact_cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/tarifs`}>{t('pricing_cta')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
          <div>
            <div className="mb-8 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                {t('section_label')}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {t('section_title')}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                {t('contract_detail_text')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {contractTypes.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.titleKey}
                    className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="mt-5 text-xl font-semibold">
                        {t(item.titleKey)}
                      </CardTitle>
                      <CardDescription className="mt-3 text-sm text-muted-foreground leading-6">
                        {t(item.descriptionKey)}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              {t('journey_title')}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              {t('journey_subtitle')}
            </h3>
            <div className="mt-8 space-y-4">
              {processSteps.map((step) => (
                <div key={step.step} className="flex gap-4 rounded-3xl border border-border/70 bg-white p-5 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-semibold">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-slate-950">{t(step.titleKey)}</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-6">
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="container px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-10 shadow-sm sm:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                {t('benefits_label')}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                {t('benefits_title')}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                {t('benefits_subtitle')}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {contractBenefits.map((item) => (
                  <div key={item.titleKey} className="rounded-[1.75rem] border border-border/70 bg-white p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-950">{t(item.titleKey)}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-6">
                      {t(item.descriptionKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white p-8 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?auto=format&fit=crop&w=1200&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA=="
                alt={t('security_image_alt')}
                width={760}
                height={520}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                <div>
                  <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                    {t('security_label')}
                  </span>
                  <h3 className="mt-5 text-3xl font-semibold text-white">
                    {t('security_text')}
                  </h3>
                  <p className="mt-4 max-w-md text-sm text-slate-300 leading-7">
                    {t('security_callout')}
                  </p>
                </div>
                <Button asChild className="w-full bg-white text-slate-950">
                  <Link href={`/${locale}/contact`}>
                    {t('quote_cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
