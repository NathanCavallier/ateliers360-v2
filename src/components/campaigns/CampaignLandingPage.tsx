'use client';

import { Campaign } from '@/data/campaigns';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowRight } from 'lucide-react';
import { ShareButtons } from '@/components/social/ShareButtons';
import { TestimonialFormWithConsent } from '@/components/social/TestimonialFormWithConsent';
import { Testimonials } from '@/components/social/Testimonials';
import { useState, useEffect } from 'react';
import type { Testimonial } from '@/lib/types';

interface CampaignLandingPageProps {
  campaign: Campaign;
  url: string;
}

export function CampaignLandingPage({
  campaign,
  url,
}: CampaignLandingPageProps) {
  const locale = useLocale();
  const t = useTranslations('CampaignPage');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);

  useEffect(() => {
    // Fetch testimonials for this campaign
    async function loadTestimonials() {
      try {
        // In a real app, this would filter by campaign
        // For now, it's a placeholder
        const response = await fetch('/api/testimonials?published=true&limit=3');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data || []);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    }

    loadTestimonials();
  }, []);

  const utmParams = new URLSearchParams({
    utm_source: 'organic',
    utm_medium: 'landing_page',
    utm_campaign: campaign.utm_campaign,
  });

  const reservationUrl = `${url.split('campagnes')[0]}reserver?${utmParams}`;
  const contactUrl = `${url.split('campagnes')[0]}contact?${utmParams}&campaign=${campaign.slug}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation minimale */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-bold text-lg">
            Ateliers 360
          </Link>
          <Button
            asChild
            className="gap-2"
          >
            <Link href={
              campaign.formType === 'reservation' ? reservationUrl : contactUrl
            }>
              {campaign.callToAction}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                  {t('newOffer', 'Nouvelle offre')}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  {campaign.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {campaign.subtitle}
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {campaign.description}
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 py-6">
                {campaign.keyBenefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <Check className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 text-base py-6"
                >
                  <Link href={
                    campaign.formType === 'reservation' ? reservationUrl : contactUrl
                  }>
                    {campaign.callToAction}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="text-base py-6"
                >
                  <Link href={`/${locale}/contact`}>
                    {t('contactUs', 'Nous contacter')}
                  </Link>
                </Button>
              </div>

              {/* Share Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <ShareButtons
                  url={url}
                  title={campaign.title}
                  description={campaign.description}
                  variant="outline"
                  showLabel
                />
              </div>
            </div>

            {/* Right: Hero Image */}
            {campaign.heroImage && (
              <div className="relative h-96 rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src={campaign.heroImage}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                {t('whatOthersAreAdded', 'Ce que disent les autres')}
              </h2>
              <p className="text-gray-600 mt-2">
                {t('testimonialSubtitle', 'Découvrez les expériences positives de nos utilisateurs')}
              </p>
            </div>
            <Testimonials testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Form Section */}
      {!showTestimonialForm && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-teal-50 rounded-lg p-8 border border-teal-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {campaign.formType === 'reservation'
                ? t('readyToReserve', 'Prêt à réserver ?')
                : t('learnMore', 'En savoir plus ?')}
            </h2>
            <p className="text-gray-700 mb-6">
              {campaign.formType === 'reservation'
                ? t('reservationDescription', 'Choisissez vos dates et votre groupe.')
                : t('inquiryDescription', 'Posez vos questions à notre équipe. Nous vous répondrons dans les 24h.')}
            </p>
            <Button
              asChild
              size="lg"
              className="gap-2 text-base py-6"
            >
              <Link href={
                campaign.formType === 'reservation' ? reservationUrl : contactUrl
              }>
                {campaign.callToAction}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Testimonial Form Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('shareYourExperience', 'Partagez votre expérience')}
            </h2>
            <p className="text-gray-600 mt-2">
              {t('testimonialFormDescription', 'Vous avez participé à l\'un de nos ateliers ? Partagez votre avis !')}
            </p>
          </div>
          {showTestimonialForm ? (
            <TestimonialFormWithConsent
              onSuccess={() => setShowTestimonialForm(false)}
            />
          ) : (
            <div className="text-center">
              <Button
                onClick={() => setShowTestimonialForm(true)}
                size="lg"
                variant="outline"
                className="text-base py-6"
              >
                {t('writeTestimonial', 'Écrire un témoignage')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-teal-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t('dontMissOut', 'Ne ratez pas cette occasion !')}
          </h2>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            {t('footerCtaDescription', 'Rejoignez les centaines d\'enseignants et de familles qui ont déjà découvert Ateliers 360.')}
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 text-base py-6"
          >
            <Link href={
              campaign.formType === 'reservation' ? reservationUrl : contactUrl
            }>
              {campaign.callToAction}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
