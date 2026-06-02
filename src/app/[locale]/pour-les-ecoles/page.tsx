"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Lightbulb,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SchoolsContactForm from "@/components/forms/SchoolsContactForm";

export default function PouraLesEcolesPage() {
  const t = useTranslations("Schools");
  const locale = useLocale();

  const benefits = [
    {
      icon: CheckCircle,
      title: t("why_item1"),
      desc: t("benefits_item1_description"),
    },
    {
      icon: Lightbulb,
      title: t("why_item2"),
      desc: t("benefits_item2_description"),
    },
    {
      icon: Users,
      title: t("why_item3"),
      desc: t("benefits_item3_description"),
    },
    { icon: Award, title: t("why_item4"), desc: t("benefits_item4_description") },
    {
      icon: Rocket,
      title: t("why_item5"),
      desc: t("benefits_item5_description"),
    },
    {
      icon: TrendingUp,
      title: t("why_item6"),
      desc: t("benefits_item6_description"),
    },
  ];

  const formats = [
    {
      icon: Zap,
      title: t("format1"),
      description: t("formats_item1_description"),
    },
    {
      icon: BookOpen,
      title: t("format2"),
      description: t("formats_item2_description"),
    },
    {
      icon: Users,
      title: t("format3"),
      description: t("formats_item3_description"),
    },
    {
      icon: Lightbulb,
      title: t("format4"),
      description: t("formats_item4_description"),
    },
  ];

  const modalities = [
    {
      title: t("modalities_item0_title"),
      description: t("modalities_item0_description"),
      badge: t("format_presentiel"),
    },
    {
      title: t("modalities_item1_title"),
      description: t("modalities_item1_description"),
      badge: t("format_distanciel"),
    },
    {
      title: t("modalities_item2_title"),
      description: t("modalities_item2_description"),
      badge: t("format_hybride"),
    },
    {
      title: t("modalities_item3_title"),
      description: t("modalities_item3_description"),
      badge: t("format_projet_eleve"),
    },
  ];

  const distancielWorkshops = [
    {
      title: t("modalities_project1_title"),
      description: t("modalities_project1_description"),
    },
    {
      title: t("modalities_project2_title"),
      description: t("modalities_project2_description"),
    },
    {
      title: t("modalities_project3_title"),
      description: t("modalities_project3_description"),
    },
  ];

  const packs = [
    {
      title: t("packs_a_title"),
      ageGroup: t("packs_a_age_group"),
      description: t("packs_a_description"),
      color: "blue",
    },
    {
      title: t("packs_b_title"),
      ageGroup: t("packs_b_age_group"),
      description: t("packs_b_description"),
      color: "cyan",
    },
    {
      title: t("packs_c_title"),
      ageGroup: t("packs_c_age_group"),
      description: t("packs_c_description"),
      color: "purple",
    },
  ];

  const faqs = [
    { question: t("faq_q1"), answer: t("faq_a1") },
    { question: t("faq_q2"), answer: t("faq_a2") },
    { question: t("faq_q3"), answer: t("faq_a3") },
    { question: t("faq_q4"), answer: t("faq_a4") },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-slate-950 text-white dark-section-heading overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070"
            alt="Pour les écoles"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/60" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              {t("hero_badge") || "Partenaires éducatifs"}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {t("hero_title")}
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed max-w-2xl">
              {t("hero_subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href={`/${locale}/contact`}>
                  {t("cta_contact") || "Nous contacter"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/ateliers`}>
                  {t("explore_workshops") || "Voir les ateliers"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t("why") || "Pourquoi nous choisir ?"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("why_subtitle") || "Nos avantages pour votre établissement"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={i}
                  className="hover:shadow-lg transition-shadow hover:border-accent/50"
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t("formats") || "Nos formats d'intervention"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("formats_subtitle") || "Flexibilité adaptée à vos besoins"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {formats.map((fmt, i) => {
              const Icon = fmt.icon;
              return (
                <Card
                  key={i}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="items-center">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-base">{fmt.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {fmt.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-white/80">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-3">
              {t('modalities_badge')}
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              {t('modalities_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('modalities_subtitle')}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4 mb-12">
            {modalities.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="secondary">{item.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {distancielWorkshops.map((workshop) => (
              <div key={workshop.title} className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
                <p className="text-muted-foreground">{workshop.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-10">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={`/${locale}/proposer-projet`}>
                {t('modalities_cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Packs Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t('packs_title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('packs_subtitle')}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {packs.map((pack, i) => {
              const colorClasses = {
                blue:
                  "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50 text-blue-800 dark:text-blue-300 text-blue-600 dark:text-blue-400",
                cyan:
                  "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-900/50 text-cyan-800 dark:text-cyan-300 text-cyan-600 dark:text-cyan-400",
                purple:
                  "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/50 text-purple-800 dark:text-purple-300 text-purple-600 dark:text-purple-400",
              };
              const colors =
                colorClasses[pack.color as keyof typeof colorClasses];

              return (
                <div key={i} className={`p-6 rounded-xl border ${colors}`}>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      {pack.ageGroup}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{pack.title}</h3>
                      <p className="text-sm opacity-90">{pack.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button asChild variant="outline">
              <Link href={`/${locale}/packs`}>
                {t('packs_see_details')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <div className="bg-background p-8 rounded-lg border">
            <h2 className="text-3xl font-bold mb-2 text-center">
              {t("form_title") || "Parlons de votre projet"}
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              {t("form_subtitle") ||
                "Remplissez ce formulaire pour que notre équipe vous recontacte rapidement"}
            </p>
            <SchoolsContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t("faq_title") || "Questions fréquentes"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("faq_subtitle") || "Trouvez les réponses à vos questions"}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-accent/10 via-background to-accent/5 border-y border-accent/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">
              {t("final_cta_title") ||
                "Prêt à transformer l'éducation technologique ?"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("final_cta_subtitle") ||
                "Rejoignez les 20+ écoles qui ont déjà fait confiance à Ateliers360"}
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href={`/${locale}/contact`}>
                  {t("final_cta_button") || "Demander un devis"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/${locale}/ateliers`}>
                  {t("explore_workshops") || "Voir les ateliers"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
