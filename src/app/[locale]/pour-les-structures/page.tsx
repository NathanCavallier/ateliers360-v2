'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Briefcase, Settings, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CTASection,
  FeatureCardsGrid,
  ProcessSteps,
  SectionHero,
} from '@/components/sections';
import StructuresContactForm from '@/components/forms/StructuresContactForm';

export default function StructuresPage({ params }: any) {
  const t = useTranslations('StructuresPage');
  const locale = useLocale();

  // Benefits
  const benefitCards = [
    {
      title: t('benefit_custom_title'),
      description: t('benefit_custom_desc'),
      icon: Settings,
    },
    {
      title: t('benefit_scalable_title'),
      description: t('benefit_scalable_desc'),
      icon: Zap,
    },
    {
      title: t('benefit_support_title'),
      description: t('benefit_support_desc'),
      icon: Users,
    },
  ];

  // Process steps
  const processSteps = [
    { title: t('process_step1'), description: '' },
    { title: t('process_step2'), description: '' },
    { title: t('process_step3'), description: '' },
    { title: t('process_step4'), description: '' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <SectionHero
        title={t('hero_title')}
        subtitle={t('hero_subtitle')}
        badge={t('badge')}
        backgroundImage="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2070"
        variant="primary"
        cta_primary={{
          label: t('cta_contact'),
          href: `/${locale}/pour-les-structures/contact`,
        }}
        cta_secondary={{
          label: t('cta_offers'),
          href: `/${locale}/pour-les-structures/offres`,
        }}
      />

      {/* Benefits */}
      <FeatureCardsGrid
        title={t('why_title')}
        subtitle={t('why_subtitle')}
        cards={benefitCards}
        columns={3}
        variant="card"
      />

      {/* Programs */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{t('programs_title')}</h2>
            <p className="text-muted-foreground mt-2">
              {t('programs_subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t('program_workshops_title')}</CardTitle>
                <CardDescription>{t('program_workshops_tag')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('program_workshops_desc')}
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${locale}/stages`}>{t('program_view')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('program_cycles_title')}</CardTitle>
                <CardDescription>{t('program_cycles_tag')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('program_cycles_desc')}
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${locale}/packs`}>{t('program_view')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('program_custom_title')}</CardTitle>
                <CardDescription>{t('program_custom_tag')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('program_custom_desc')}
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${locale}/pour-les-structures/contact`}>
                      {t('program_contact')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-muted/40">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">{t('partnership_title') || 'Un cadre de collaboration simple et rassurant'}</h2>
                <p className="text-sm leading-7 text-slate-600">
                  {t('partnership_desc') || "Nous vous accompagnons de la première demande jusqu'au bilan final, avec un devis clair, une convention adaptée et un suivi opérationnel."}
                </p>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{t('partnership_item1') || 'Diagnostic de besoin et proposition de format'}</li>
                <li className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{t('partnership_item2') || 'Convention, planning et logistique définis ensemble'}</li>
                <li className="rounded-2xl border border-slate-200 bg-slate-50 p-3">{t('partnership_item3') || 'Bilan pédagogique et pistes d’évolution'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps
        title={t('process_title')}
        steps={processSteps}
        direction="vertical"
        withBackground
      />

      {/* Contact form section */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{t('contact_title')}</h2>
            <p className="text-muted-foreground mt-2">
              {t('contact_subtitle')}
            </p>
          </div>
          <StructuresContactForm />
        </div>
      </section>

      {/* Footer CTA */}
      <CTASection
        title={t('footer_cta_title')}
        subtitle={t('footer_cta_subtitle')}
        cta_label={t('cta_contact')}
        cta_href={`/${locale}/pour-les-structures/contact`}
        variant="primary"
      />
    </div>
  );
}
