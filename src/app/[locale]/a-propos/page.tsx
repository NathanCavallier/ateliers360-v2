import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  CheckCircle,
  Heart,
  Lightbulb,
  Rocket,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'AboutPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AProposPage({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'AboutPage',
  });

  const values = [
    { icon: Target, title: t('value1_title'), desc: t('value1_desc') },
    { icon: Lightbulb, title: t('value2_title'), desc: t('value2_desc') },
    { icon: Users, title: t('value3_title'), desc: t('value3_desc') },
    { icon: Heart, title: t('value4_title'), desc: t('value4_desc') },
  ];

  const stats = [
    { icon: Users, value: '500+', label: t('stat1_label') },
    { icon: Award, value: '20+', label: t('stat2_label') },
    { icon: Rocket, value: '150+', label: t('stat3_label') },
    { icon: Zap, value: '100%', label: t('stat4_label') },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
            alt="À propos"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/90" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              {t('hero_badge') || 'Notre histoire'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
              {t('hero_title')}
            </h1>
            <p className="text-lg text-slate-200 leading-relaxed max-w-2xl">
              {t('hero_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-foreground">
                  {t('mission_title')}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('mission_text')}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-semibold text-lg">{t('approach_title')}</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">1.</span>
                    <span>
                      <strong>{t('approach1_title')}</strong> —{' '}
                      {t('approach1_desc')}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">2.</span>
                    <span>
                      <strong>{t('approach2_title')}</strong> —{' '}
                      {t('approach2_desc')}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">3.</span>
                    <span>
                      <strong>{t('approach3_title')}</strong> —{' '}
                      {t('approach3_desc')}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">4.</span>
                    <span>
                      <strong>{t('approach4_title')}</strong> —{' '}
                      {t('approach4_desc')}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-accent">5.</span>
                    <span>
                      <strong>{t('approach5_title')}</strong> —{' '}
                      {t('approach5_desc')}
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                alt="Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">{t('values_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('values_subtitle') || 'Les principes qui nous guident'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card
                  key={i}
                  className="hover:shadow-lg transition-shadow hover:border-accent/50"
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t('stats_title') || 'Nos résultats'}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="text-center p-6 rounded-lg border border-white/10 hover:border-accent/30 transition-colors group"
                >
                  <div className="h-14 w-14 rounded-lg bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">{t('team_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('team_subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {/* Founder */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:border-accent/50">
              <div className="h-64 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative">
                <Image
                  src="https://orzfuxasrbpkcaqvgvah.supabase.co/storage/v1/object/sign/images/nathan.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzVkYjM4Ni1kN2Q5LTQwZWEtYmE5Mi04MTMwOTRhZjg2YTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvbmF0aGFuLmpwZWciLCJpYXQiOjE3Nzg1OTI3MjAsImV4cCI6MTg3MzIwMDcyMH0.z_84_axZg4noCmW8HY7eZoKvo1hpkWWyCECpPiDxYdk"
                  alt={t('founder_name')}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle>{t('founder_name')}</CardTitle>
                <p className="text-accent font-semibold text-sm mt-1">
                  {t('founder_role')}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('founder_bio')}
                </p>
              </CardContent>
            </Card>

            {/* Future Team Member */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow hover:border-accent/50">
              <div className="h-64 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center relative">
                <Image
                  src=""
                  alt={t('alternant_name')}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle>{t('alternant_name')}</CardTitle>
                <p className="text-accent font-semibold text-sm mt-1">
                  {t('alternant_role')}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t('alternant_bio')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values in Action */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t('impact_title') || 'Notre impact'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('impact_subtitle') ||
                'Comment nous faisons la différence au quotidien'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">
                  {t('impact1_title') || 'Accessibilité'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('impact1_desc') ||
                    'Nous rendons les formations en technologies accessibles à tous, indépendamment du contexte socio-économique.'}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">
                  {t('impact2_title') || 'Qualité'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('impact2_desc') ||
                    'Nos formations sont conçues par des experts et adaptées aux besoins du marché actuel.'}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">
                  {t('impact3_title') || 'Communauté'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t('impact3_desc') ||
                    "Nous construisons une communauté d'apprenants passionnés qui se soutiennent mutuellement."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-accent/10 via-background to-accent/5 border-y border-accent/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">
              {t('vision_title') || "Notre vision pour l'avenir"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('vision_text') ||
                "Nous rêvons d'un avenir où chaque jeune a accès à des formations de qualité en technologie et innovation, indépendamment de son contexte socio-économique."}
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href={`/${params.locale}/ateliers`}>
                  {t('cta_button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/${params.locale}/contact`}>
                  {t('cta_contact') || 'Nous contacter'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
