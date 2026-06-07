'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function PolitiqueConfidentialitePage() {
  const t = useTranslations('PrivacyPage');

  const personalData = [
    { label: t('data1'), value: t('data1_details') },
    { label: t('data2'), value: t('data2_details') },
    { label: t('data3'), value: t('data3_details') },
    { label: t('data4'), value: t('data4_details') },
    { label: t('data5'), value: t('data5_details') },
    { label: t('data6'), value: t('data6_details') },
    { label: t('data7'), value: t('data7_details') },
    { label: t('data8'), value: t('data8_details') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-900">
      <section className="w-full bg-gradient-to-br from-primary to-slate-950 text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-white/10 text-white border border-white/20">
              {t('last_update')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-lg leading-8 text-slate-200 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-14">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_0.65fr]">
            <div className="space-y-8">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('section1')}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  {t('section1_desc')}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('section2')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
                  <p>{t('section2_intro')}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {personalData.map((item, index) => (
                      <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-sm text-slate-700">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('section4')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
                  <p>{t('section4_desc')}</p>
                  <p className="font-semibold text-primary">{t('section4_note')}</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('section6')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
                  <p>{t('section6_intro')}</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>{t('right1_desc')}</li>
                    <li>{t('right2_desc')}</li>
                    <li>{t('right3_desc')}</li>
                    <li>{t('right4_desc')}</li>
                    <li>{t('right5_desc')}</li>
                    <li>{t('right6_desc')}</li>
                    <li>{t('right7_desc')}</li>
                    <li>{t('right8_desc')}</li>
                  </ul>
                  <p className="font-semibold">{t('section6_contact')}</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('section7')}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-7 text-slate-600">
                  {t('section7_desc')}
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <h2 className="text-xl font-semibold mb-3">{t('section3')}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('section3_desc')}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <h2 className="text-xl font-semibold mb-3">{t('section5')}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('section5_desc')}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">{t('dpo_section')}</h2>
                <p className="text-sm leading-7 text-slate-600">{t('dpo_contact')}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
