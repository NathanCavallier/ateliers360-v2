import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type PageParams = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CgvPage' });

  return {
    title: t('title'),
  };
}

export default async function CgvPage({ params }: { params: PageParams }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CgvPage' });

  const sections = [
    { title: t('article1'), content: t('article1_desc') },
    { title: t('article2'), content: t('article2_desc') },
    { title: t('article3'), content: t('article3_desc') },
    { title: t('article4'), content: t('article4_desc') },
    { title: t('article5'), content: t('article5_desc') },
    { title: t('article6'), content: t('article6_desc') },
    { title: t('article7'), content: t('article7_desc') },
    { title: t('article8'), content: t('article8_desc') },
    { title: t('article9'), content: t('article9_desc') },
    { title: t('article10'), content: t('article10_desc') },
    { title: t('article11'), content: t('article11_desc') },
    { title: t('article12'), content: t('article12_desc') },
    { title: t('article13'), content: t('article13_desc') },
    { title: t('article14'), content: t('article14_desc') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-900">
      <section className="w-full bg-primary text-primary-foreground py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-accent text-accent-foreground border border-white/10">
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
          <div className="grid gap-10 xl:grid-cols-[1fr_0.45fr]">
            <div className="space-y-6">
              {sections.map((section, index) => (
                <Card key={index} className="border border-slate-200 shadow-sm">
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
                <h2 className="text-xl font-semibold mb-3">{t('summary_title') || 'Résumé rapide'}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('summary_text') || 'Nos conditions générales expliquent les règles de réservation, de paiement et d’organisation des ateliers.'}</p>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">{t('need_help_title') || 'Besoin d’aide ?'}</h2>
                <p className="text-sm leading-7 text-slate-600">{t('need_help_text') || 'Contactez notre équipe si vous avez des questions sur vos droits ou conditions de service.'}</p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
