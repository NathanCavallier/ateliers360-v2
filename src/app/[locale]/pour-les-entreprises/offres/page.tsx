// app/[locale]/pour-les-entreprises/offres/page.tsx
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'CompaniesOffersPage',
  });
  return { title: t('meta_title'), description: t('meta_description') };
}

export default async function CompaniesOffersPage({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'CompaniesOffersPage',
  });

  const offers = [
    {
      id: 'team-building-1d',
      title: t('offer_team_1d_title'),
      tag: t('offer_team_1d_tag'),
      desc: t('offer_team_1d_desc'),
      duration: t('offer_duration_1d'),
      priceHint: t('offer_price_from', { price: 'À partir de 1 500€' }),
    },
    {
      id: 'training-2d',
      title: t('offer_training_2d_title'),
      tag: t('offer_training_2d_tag'),
      desc: t('offer_training_2d_desc'),
      duration: t('offer_duration_2d'),
      priceHint: t('offer_price_from', { price: 'À partir de 3 000€' }),
    },
    {
      id: 'rse-cycle',
      title: t('offer_rse_title'),
      tag: t('offer_rse_tag'),
      desc: t('offer_rse_desc'),
      duration: t('offer_duration_rse'),
      priceHint: t('offer_price_from', { price: 'Sur devis' }),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070"
            alt={t('hero_image_alt')}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
        </div>
        <div className="container relative z-10 px-4 md:px-6 text-center">
          <Badge className="inline-flex items-center bg-accent text-accent-foreground px-3 py-1 rounded-full">
            {t('badge')}
          </Badge>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            {t('hero_title')}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground"
            >
              <Link href={`/${params.locale}/pour-les-entreprises/contact`}>
                {t('cta_contact')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href={`/${params.locale}/pour-les-entreprises/offres#catalogue`}
              >
                {t('cta_catalog')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="catalogue" className="w-full py-16 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{t('catalog_title')}</h2>
            <p className="text-muted-foreground mt-2">
              {t('catalog_subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((o) => (
              <Card key={o.id}>
                <CardHeader>
                  <CardTitle>{o.title}</CardTitle>
                  <CardDescription>{o.tag}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{o.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {o.duration}
                    </div>
                    <div className="text-sm font-semibold">{o.priceHint}</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Link
                        href={`/${params.locale}/pour-les-entreprises/offres/${o.id}`}
                      >
                        {t('view_details')}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-accent text-accent-foreground"
                    >
                      <Link
                        href={`/${params.locale}/pour-les-entreprises/contact?offer=${o.id}`}
                      >
                        {t('request_quote')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h3 className="text-xl font-bold">{t('footer_cta_title')}</h3>
          <p className="mt-2 text-primary-foreground/90">
            {t('footer_cta_subtitle')}
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground"
            >
              <Link href={`/${params.locale}/pour-les-entreprises/contact`}>
                {t('cta_contact')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
