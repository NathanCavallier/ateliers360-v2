// app/[locale]/pour-les-entreprises/contact/page.tsx
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import CompaniesContactForm from '@/components/forms/CompaniesContactForm';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'CompaniesContactPage',
  });
  return { title: t('meta_title'), description: t('meta_description') };
}

export default async function CompaniesContactPage({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'CompaniesContactPage',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-20 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground relative overflow-hidden">
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
        </div>
      </section>

      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{t('form_title')}</h2>
            <p className="text-muted-foreground mt-2">{t('form_subtitle')}</p>
          </div>

          <CompaniesContactForm />
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">{t('note_after_submit')}</p>
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/pour-les-entreprises/offres`}>
                {t('back_to_offers')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
