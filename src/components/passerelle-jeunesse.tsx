import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, Compass, GraduationCap, Palette, ShieldCheck, Sparkles, Users, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PasserelleJeunesseProps = {
  locale: string;
};

export default function PasserelleJeunesse({ locale }: PasserelleJeunesseProps) {
  const t = useTranslations('PasserelleJeunessePage');

  const services = [
    { icon: Users, title: t('services.service1_title'), text: t('services.service1_text') },
    { icon: Palette, title: t('services.service2_title'), text: t('services.service2_text') },
    { icon: Sparkles, title: t('services.service3_title'), text: t('services.service3_text') },
    { icon: Utensils, title: t('services.service4_title'), text: t('services.service4_text') },
    { icon: Compass, title: t('services.service5_title'), text: t('services.service5_text') },
    { icon: GraduationCap, title: t('services.service6_title'), text: t('services.service6_text') },
  ];

  const steps = [
    { icon: ClipboardList, title: t('process.step1_title'), text: t('process.step1_text') },
    { icon: CheckCircle2, title: t('process.step2_title'), text: t('process.step2_text') },
    { icon: CalendarCheck, title: t('process.step3_title'), text: t('process.step3_text') },
    { icon: ShieldCheck, title: t('process.step4_title'), text: t('process.step4_text') },
  ];

  const roadmap = [
    t('roadmap.item1'),
    t('roadmap.item2'),
    t('roadmap.item3'),
    t('roadmap.item4'),
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full bg-emerald-950 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge className="mb-4 border-emerald-200/30 bg-emerald-200/15 text-emerald-100">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-emerald-50">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50">
                <Link href={`/${locale}/contact?pole=passerelle-jeunesse&action=inscription`}>
                  {t('hero.primary_cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                <Link href={`/${locale}/contact?pole=passerelle-jeunesse&action=inscription#programme`}>{t('hero.secondary_cta')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="programme" className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">{t('services_title')}</h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              {t('services_subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{service.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-emerald-50/70 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="rounded-2xl border border-emerald-200 bg-white p-8 md:p-10">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-3 border-emerald-200 text-emerald-700">
                {t('accompagnement_banner.badge')}
              </Badge>
              <h3 className="text-2xl font-semibold tracking-tight">{t('accompagnement_banner.title')}</h3>
              <p className="mt-3 text-muted-foreground md:text-lg">{t('accompagnement_banner.text')}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                <Link href={`/${locale}/passerelle-jeunesse/accompagnement`}>
                  {t('accompagnement_banner.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-3">{t('process.badge')}</Badge>
              <h2 className="text-3xl font-bold tracking-tight">{t('process.title')}</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {t('process.intro')}
              </p>
            </div>
            <div className="grid gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-3">{t('roadmap.badge')}</Badge>
            <h2 className="text-3xl font-bold tracking-tight">{t('roadmap.title')}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {roadmap.map((item, index) => (
              <div key={item} className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm font-medium leading-relaxed text-emerald-950">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-950 py-12 text-white md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">{t('team.title')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('team.text')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[t('team.badge1'), t('team.badge2'), t('team.badge3'), t('team.badge4'), t('team.badge5')].map((badge) => (
                <span key={badge} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-100">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
