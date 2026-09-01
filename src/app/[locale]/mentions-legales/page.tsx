'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale, useTranslations } from 'next-intl';

export default function MentionsLegalesPage() {
  const t = useTranslations('LegalPage');
  const locale = useLocale();

  const details = [
    { label: t('editor_name'), value: t('editor_type') },
    { label: 'SIREN', value: t('editor_siret') },
    { label: 'Code APE', value: t('editor_code') },
    { label: t('editor_fiscal'), value: t('editor_fiscal') },
    { label: t('editor_location'), value: t('editor_location') },
    { label: t('editor_zones'), value: t('editor_zones') },
    { label: t('editor_contact_label'), value: t('editor_contact') },
    { label: t('editor_email'), value: t('editor_email') },
    { label: t('editor_phone'), value: t('editor_phone') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-900">
      <section className="w-full bg-slate-950 text-white py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-accent text-accent-foreground border border-white/10">
              {t('last_update')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('title')}
            </h1>
            <p className="text-lg leading-8 text-slate-300 max-w-2xl">
              {t('presentation_desc')}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-14">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-8">
              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('editor')}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {details.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {item.label}
                      </span>
                      <span className="text-sm text-slate-700">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('partnership')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>{t('partnership_desc')}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t('partnership_item1')}</li>
                    <li>{t('partnership_item2')}</li>
                    <li>{t('partnership_item3')}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('grand_est')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>{t('grand_est_desc')}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t('grand_est_item1')}</li>
                    <li>{t('grand_est_item2')}</li>
                  </ul>
                  <p>{t('grand_est_disclaimer')}</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('hosting')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-600">
                  <p>{t('hosting_name')}</p>
                  <p>{t('hosting_tech')}</p>
                  <p>{t('hosting_policy')}</p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>{t('intellectual_property')}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  <p>{t('ip_desc')}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <h2 className="text-xl font-semibold mb-3">{t('responsibility')}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('responsibility_desc')}</p>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <h2 className="text-xl font-semibold mb-3">{t('links')}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('links_desc')}</p>
              </Card>
              <Card className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
                <h2 className="text-xl font-semibold mb-3">{t('law')}</h2>
                <p className="text-sm leading-7 text-slate-300">{t('law_desc')}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 py-10">
        <div className="container px-4 md:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{t('contact_legal')}</h2>
            <p className="text-sm text-slate-600 mb-3">{t('contact_email')}</p>
            <p className="text-sm text-slate-600 mb-6">{t('contact_phone')}</p>
            <p className="text-xs text-slate-500">{t('version')}</p>
            <div className="mt-6">
              <Link href={`/${locale}/contact`} className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                {t('contact_button') || 'Nous contacter'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
