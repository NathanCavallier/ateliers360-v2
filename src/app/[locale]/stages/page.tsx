import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  Rocket,
  Brain,
  ArrowRight,
  Gift,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'StagesPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function StagesPage({ params }: any) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'StagesPage',
  });

  const camps = [
    {
      period: t('winter_period'),
      season: t('winter_title'),
      icon: Sparkles,
      theme: t('winter_theme'),
      description: t('winter_desc'),
      ages: t('winter_ages'),
      duration: t('winter_duration'),
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      iconColor: 'text-blue-600',
      badgeColor:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    },
    {
      period: t('spring_period'),
      season: t('spring_title'),
      icon: Rocket,
      theme: t('spring_theme'),
      description: t('spring_desc'),
      ages: t('spring_ages'),
      duration: t('spring_duration'),
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      iconColor: 'text-green-600',
      badgeColor:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    {
      period: t('summer_period'),
      season: t('summer_title'),
      icon: Brain,
      theme: t('summer_theme'),
      description: t('summer_desc'),
      ages: t('summer_ages'),
      duration: t('summer_duration'),
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      iconColor: 'text-orange-600',
      badgeColor:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    },
    {
      period: t('autumn_period'),
      season: t('autumn_title'),
      icon: Sparkles,
      theme: t('autumn_theme'),
      description: t('autumn_desc'),
      ages: t('autumn_ages'),
      duration: t('autumn_duration'),
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      iconColor: 'text-amber-600',
      badgeColor:
        'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022"
            alt="Stages de vacances"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/70 to-primary"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <Badge className="w-fit bg-accent text-accent-foreground">
              {t('badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {t('hero_title')}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              {t('hero_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline des stages */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('timeline_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('timeline_subtitle')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {camps.map((camp, index) => {
              const Icon = camp.icon;
              return (
                <div key={index} className="relative">
                  {/* Timeline connector line */}
                  {index < camps.length - 1 && (
                    <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-border -mb-8 hidden md:block" />
                  )}

                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`${camp.bgColor} p-6`}>
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Icon & Period */}
                        <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
                          <div
                            className={`w-16 h-16 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-md`}
                          >
                            <Icon className={`h-8 w-8 ${camp.iconColor}`} />
                          </div>
                          <div className="text-center md:text-left">
                            <Badge className={camp.badgeColor}>
                              {camp.season}
                            </Badge>
                            <p className="text-sm font-medium mt-2 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {camp.period}
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">
                              {camp.theme}
                            </h3>
                            <p className="text-muted-foreground">
                              {camp.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{camp.ages}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{camp.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Autres Formats Intensifs */}
      <section className="w-full py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Autres Formats Intensifs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Au-delà des stages vacances, nous proposons des expériences tech
              immersives pour d'autres occasions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Gift className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                  <CardTitle>Anniversaires Tech</CardTitle>
                  <CardDescription>
                    Une fête inoubliable autour des STEM.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Célébrez un anniversaire avec un défi robotique ou de
                  programmation. Les enfants repartent avec leurs créations et
                  des souvenirs technologiques.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/${params.locale}/contact`}>
                    Réserver un anniversaire
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <CardTitle>Hackathons Scolaires</CardTitle>
                  <CardDescription>
                    Stimulez l'innovation collective.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Une journée ou un week-end intense pour résoudre un défi
                  scientifique ou sociétal en équipe. Idéal pour les écoles et
                  lycées.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/${params.locale}/pour-les-ecoles`}>
                    Offre établissement
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('features_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('features_subtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {t('feature1_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('feature1_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {t('feature2_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('feature2_desc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  {t('feature3_title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('feature3_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold">{t('cta_title')}</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href={`/${params.locale}/reserver`}>
                {t('cta_book')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href={`/${params.locale}/contact`}>{t('cta_contact')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
