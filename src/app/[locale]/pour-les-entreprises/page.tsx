'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  BookOpen,
  Briefcase,
  Lightbulb,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CTASection,
  FeatureCardsGrid,
  ProcessSteps,
  SectionHero,
} from '@/components/sections';
import CompaniesContactForm from '@/components/forms/CompaniesContactForm';

export default function CompaniesPage({ params }: any) {
  const t = useTranslations('CompaniesPage');
  const locale = useLocale();

  // Benefits cards
  const benefitCards = [
    {
      title: t('benefit_business_title'),
      description: t('benefit_business_desc'),
      icon: Users,
    },
    {
      title: t('benefit_custom_title'),
      description: t('benefit_custom_desc'),
      icon: Zap,
    },
    {
      title: t('benefit_impact_title'),
      description: t('benefit_impact_desc'),
      icon: TrendingUp,
    },
  ];

  // Services cards
  const serviceCards = [
    {
      title: t('service_team_title'),
      description: t('service_team_desc'),
      icon: Briefcase,
    },
    {
      title: t('service_workshop_title'),
      description: t('service_workshop_desc'),
      icon: BookOpen,
    },
    {
      title: t('service_partnership_title'),
      description: t('service_partnership_desc'),
      icon: Lightbulb,
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
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070"
        variant="primary"
        cta_primary={{
          label: t('cta_contact'),
          href: `/${locale}/pour-les-entreprises/contact`,
        }}
        cta_secondary={{
          label: t('cta_offers'),
          href: `/${locale}/pour-les-entreprises/offres`,
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

      {/* Services */}
      <FeatureCardsGrid
        title={t('services_title')}
        subtitle={t('services_subtitle')}
        cards={serviceCards}
        columns={3}
        variant="card"
        withBackground={false}
      />

      {/* Process */}
      <ProcessSteps
        title={t('process_title')}
        steps={processSteps}
        direction="horizontal"
        withBackground
      />

      {/* Contact form */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{t('contact_title')}</h2>
            <p className="text-muted-foreground mt-2">
              {t('contact_subtitle')}
            </p>
          </div>
          <CompaniesContactForm />
        </div>
      </section>

      {/* Footer CTA */}
      <CTASection
        title={t('footer_cta_title')}
        subtitle={t('footer_cta_subtitle')}
        cta_label={t('cta_contact')}
        cta_href={`/${locale}/pour-les-entreprises/contact`}
        variant="primary"
      />
    </div>
  );
}
