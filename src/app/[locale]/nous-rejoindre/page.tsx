import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  BookOpen,
  Briefcase,
  Handshake,
  Heart,
  Target,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CTASection,
  FeatureCardsGrid,
  ProcessSteps,
  SectionHero,
  TestimonialSection,
} from '@/components/sections';
import ApplicationForm from '@/components/forms/ApplicationForm';

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'NousRejoindre',
  });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function NousRejoindrePage({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'NousRejoindre',
  });
  const locale = params.locale;

  const whyCards = [
    {
      title: t('why_mission_title'),
      description: t('why_mission_desc'),
      icon: Heart,
    },
    {
      title: t('why_impact_title'),
      description: t('why_impact_desc'),
      icon: Target,
    },
    {
      title: t('why_culture_title'),
      description: t('why_culture_desc'),
      icon: Users,
    },
  ];

  const opportunityCards = [
    {
      title: t('op_internships_title'),
      description: t('op_internships_desc'),
      icon: BookOpen,
    },
    {
      title: t('op_jobs_title'),
      description: t('op_jobs_desc'),
      icon: Briefcase,
    },
    {
      title: t('op_partners_title'),
      description: t('op_partners_desc'),
      icon: Handshake,
    },
  ];

  const processSteps = [
    { title: t('apply_step1') },
    { title: t('apply_step2') },
    { title: t('apply_step3') },
  ];

  const testimonials = [
    {
      quote: t('testimonial_text'),
      author: t('testimonial_author'),
      role: 'Ancien stagiaire',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SectionHero
        title={t('hero_title')}
        subtitle={t('hero_subtitle')}
        badge={t('badge')}
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
        variant="primary"
        cta_primary={{
          label: t('cta_apply'),
          href: `/${locale}/nous-rejoindre/postuler`,
        }}
        cta_secondary={{ label: t('cta_contact'), href: `/${locale}/contact` }}
      />

      <FeatureCardsGrid
        title={t('why_title')}
        subtitle={t('why_subtitle')}
        cards={whyCards}
        columns={3}
        variant="card"
      />

      <FeatureCardsGrid
        title={t('opportunities_title')}
        subtitle={t('opportunities_subtitle')}
        cards={opportunityCards}
        columns={3}
        variant="card"
        withBackground
      />

      {/* Testimonial */}
      <section className="w-full py-16 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <blockquote className="text-lg italic text-muted-foreground">
            “{t('testimonial_text')}”
          </blockquote>
          <p className="mt-4 font-semibold">{t('testimonial_author')}</p>
        </div>
      </section>

      {/* How to apply */}
      <section className="w-full py-16">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            {t('apply_title')}
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>{t('apply_step1')}</li>
            <li>{t('apply_step2')}</li>
            <li>{t('apply_step3')}</li>
          </ol>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground"
            >
              <Link href={`/${params.locale}/nous-rejoindre/postuler`}>
                {t('cta_apply')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${params.locale}/contact`}>{t('cta_contact')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title={t('footer_cta_title')}
        subtitle={t('footer_cta_subtitle')}
        cta_label={t('cta_apply')}
        cta_href={`/${locale}/nous-rejoindre/postuler`}
        variant="primary"
      />
    </div>
  );
}
