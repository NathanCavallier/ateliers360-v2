import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'TermsPage',
  });

  return {
    title: t('title'),
  };
}

export default async function TermsPage({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'TermsPage',
  });

  const sections = [
    { title: t('section1'), content: t('section1_desc') },
    { title: t('section2'), content: t('section2_desc') },
    { title: t('section3'), content: t('section3_desc') },
    { title: t('section4'), content: t('section4_desc') },
    { title: t('section5'), content: t('section5_desc') },
    { title: t('section6'), content: t('section6_desc') },
    { title: t('section7'), content: t('section7_desc') },
    { title: t('section8'), content: t('section8_desc') },
    { title: t('section9'), content: t('section9_desc') },
    { title: t('section10'), content: t('section10_desc') },
    { title: t('section11'), content: t('section11_desc') },
    { title: t('section12'), content: t('section12_desc') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-900">
      <section className="w-full bg-primary text-primary-foreground py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-accent text-accent-foreground">
              {t('last_update')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="max-w-3xl text-primary-foreground/90 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-14">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.5fr]">
            <div className="space-y-6">
              {sections.map((section, i) => (
                <Card key={i} className="border border-slate-200 shadow-sm">
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                    <p className="text-sm leading-7 text-slate-600 whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <aside className="space-y-6">
              <Card className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <h2 className="text-xl font-semibold mb-3">{t('contact_section')}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('contact_desc')}</p>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">{t('help_title') || 'Besoin d’aide ?'}</h2>
                <p className="text-sm leading-7 text-slate-600">{t('help_desc') || 'Contactez notre équipe si vous avez des questions sur vos droits ou conditions de service.'}</p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
