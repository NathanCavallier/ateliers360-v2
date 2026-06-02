'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Users,
  ShieldCheck,
  BookOpen,
  Heart,
  CheckCircle,
  ClipboardCheck,
} from 'lucide-react';

const familySteps = [
  {
    icon: Users,
    titleKey: 'family_step_invitation_title',
    descriptionKey: 'family_step_invitation_description',
  },
  {
    icon: BookOpen,
    titleKey: 'family_step_participation_title',
    descriptionKey: 'family_step_participation_description',
  },
  {
    icon: Heart,
    titleKey: 'family_step_feedback_title',
    descriptionKey: 'family_step_feedback_description',
  },
];

const authorizations = [
  {
    icon: CheckCircle,
    titleKey: 'authorization_participation_title',
    descriptionKey: 'authorization_participation_description',
  },
  {
    icon: ClipboardCheck,
    titleKey: 'authorization_gdpr_title',
    descriptionKey: 'authorization_gdpr_description',
  },
  {
    icon: ShieldCheck,
    titleKey: 'authorization_travel_title',
    descriptionKey: 'authorization_travel_description',
  },
];

const familyFeatures = [
  {
    icon: ClipboardCheck,
    titleKey: 'family_feature_manage_title',
    descriptionKey: 'family_feature_manage_description',
  },
  {
    icon: ShieldCheck,
    titleKey: 'family_feature_update_title',
    descriptionKey: 'family_feature_update_description',
  },
  {
    icon: Heart,
    titleKey: 'family_feature_notify_title',
    descriptionKey: 'family_feature_notify_description',
  },
];

export default function FamillesPage() {
  const locale = useLocale();
  const t = useTranslations('FamilyPage');

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1752650735682-5d5981bae57d?auto=format&fit=crop&w=2070&q=80"
            alt="Famille en atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/95" />
        </div>

        <div className="container relative z-10 px-4 py-24 sm:px-6 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-emerald-500/15 text-emerald-400 border-emerald-400/30">
              {t('badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('hero_title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 leading-8">
              {t('hero_subtitle')}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-500 text-white">
                <Link href={`/${locale}/inscription`}>
                  {t('cta_register')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/contact`}>{t('cta_contact')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {t('why_label')}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {t('why_title')}
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-7">
              {t('why_description')}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {familySteps.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.titleKey}
                    className="border-border/70 shadow-sm"
                  >
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="mt-4 text-lg">
                        {t(item.titleKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-6">
                        {t(item.descriptionKey)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1752650735682-5d5981bae57d?q=80&w=1200"
              alt="Famille participative à un atelier"
              width={760}
              height={520}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-white p-10 shadow-sm sm:p-14">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-500">
                {t('authorization_label')}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {t('authorization_title')}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                {t('authorization_description')}
              </p>
            </div>

            <div className="space-y-4">
              {authorizations.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.titleKey}
                    className="flex gap-4 rounded-3xl border border-border/70 bg-slate-50 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t(item.titleKey)}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-6">
                        {t(item.descriptionKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 p-10 text-white shadow-lg sm:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                {t('family_space_label')}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {t('family_space_title')}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                {t('family_space_description')}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {familyFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.titleKey}
                    className="rounded-3xl border border-emerald-500/10 bg-slate-950/80 p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {t(item.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {t(item.descriptionKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 p-10 text-white shadow-lg sm:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                {t('summary_label')}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {t('summary_title')}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-200">
                {t('summary_description')}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-emerald-500 text-white">
                  <Link href={`/${locale}/inscription`}>
                    {t('summary_register_button')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Link href={`/${locale}/famille`}>
                    {t('summary_family_space_button')}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
                <p className="font-semibold">{t('security_trust_title')}</p>
              </div>
              <p className="mt-4 text-slate-100 leading-7">
                {t('security_trust_description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
