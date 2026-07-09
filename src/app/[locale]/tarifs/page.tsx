"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getWorkshops, getWorkshopsByType } from "@/lib/supabase";
import type { WorkshopDB } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
// importer les icônes nécessaires de lucide-react pour remplacer les emojis
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Euro,
  Gift,
  GraduationCap,
  Lightbulb,
  Package,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

type AtelierType = "workshop" | "module" | "pack";

export default function TarifsPage() {
  const t = useTranslations("TarifsPage");
  const locale = useLocale();

  const [ateliers, setAteliers] = useState<WorkshopDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AtelierType>("workshop");

  useEffect(() => {
    async function loadAteliers() {
      try {
        const data = await getWorkshops();
        setAteliers(data);
      } catch (error) {
        console.error("Erreur chargement ateliers:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAteliers();
  }, []);

  // Grouper par type
  const ateliersByType = {
    workshop: ateliers.filter((a) => !a.type || a.type === "workshop"),
    module: ateliers.filter((a) => a.type === "module"),
    pack: ateliers.filter((a) => a.type === "pack"),
  };

  const typeLabels = {
    workshop: {
      label: t('type_workshop_label'),
      icon: <Lightbulb />,
      color: "bg-blue-50",
    },
    module: {
      label: t('type_module_label'),
      icon: <BookOpen />,
      color: "bg-purple-50",
    },
    pack: { label: t('type_pack_label'), icon: <Gift />, color: "bg-green-50" },
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
            alt="Tarifs"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90">
          </div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <Badge className="w-fit bg-accent text-accent-foreground">
              {t('badge')}
            </Badge>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {t('hero_title')}
            </h1>
            {/*
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              {t('hero_subtitle')}
            </p> */}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                  {t('pole_ateliers_title')}
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  {t('pole_ateliers_price')}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  {t('pole_ateliers_desc')}
                </p>
              </div>
              <div className="rounded-3xl bg-primary p-8 text-white shadow-lg">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/80">
                    Tarifs clés
                  </p>
                  <p className="text-2xl font-semibold">{t('pole_ateliers_price')}</p>
                  <p className="text-sm text-primary-foreground/90">
                    {t('pole_ateliers_desc')}
                  </p>
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={`/${locale}/contact`}>
                      {t('pole_cta')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-accent/10 via-background to-accent/20">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
            <Card className="p-6 border border-accent/20 bg-white/90">
              <CardHeader>
                <CardTitle>{t('modalities_card1_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  {t('modalities_card1_description')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('modalities_card1_subtitle')}
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 border border-primary/20 bg-white/90">
              <CardHeader>
                <CardTitle>{t('modalities_card2_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  {t('modalities_card2_description')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('modalities_card2_subtitle')}
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 border border-primary/20 bg-white/90">
              <CardHeader>
                <CardTitle>{t('modalities_card3_title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  {t('modalities_card3_description')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('modalities_card3_subtitle')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge className="bg-accent text-accent-foreground">
                {t('poles_badge')}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                {t('poles_title')}
              </h2>
              <p className="text-muted-foreground">
                {t('poles_subtitle')}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle>{t('pole_ateliers_title')}</CardTitle>
                  <CardDescription>{t('pole_ateliers_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-semibold text-primary">
                    {t('pole_ateliers_price')}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}/contact`}>{t('pole_cta')}</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle>{t('pole_passerelle_title')}</CardTitle>
                  <CardDescription>{t('pole_passerelle_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-semibold text-primary">
                    {t('pole_passerelle_price')}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}/contact`}>{t('pole_cta')}</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle>{t('pole_cavalier_title')}</CardTitle>
                  <CardDescription>{t('pole_cavalier_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-semibold text-primary">
                    {t('pole_cavalier_price')}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}/contact`}>{t('pole_cta')}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Grille Tarifaire par Type */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Nos Offres</h2>

            {loading
              ? (
                <div className="grid gap-6 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-40 mt-2" />
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Skeleton className="h-32 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
              : (
                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as AtelierType)}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="workshop">
                      <Lightbulb className="w-4 h-4 mr-2" /> Ateliers
                    </TabsTrigger>
                    <TabsTrigger value="module">
                      <BookOpen className="w-4 h-4 mr-2" /> Modules
                    </TabsTrigger>
                    <TabsTrigger value="pack">
                      <Gift className="w-4 h-4 mr-2" /> Packs
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(ateliersByType).map(([type, items]) => (
                    <TabsContent
                      key={type}
                      value={type as AtelierType}
                      className="space-y-6"
                    >
                      <div
                        className={`p-6 rounded-lg ${
                          typeLabels[type as AtelierType].color
                        }`}
                      >
                        <h3 className="text-xl font-bold mb-2">
                          {typeLabels[type as AtelierType].label}
                        </h3>
                        <p className="text-muted-foreground">
                          {type === "workshop" &&
                            t('type_summary_workshop')}
                          {type === "module" &&
                            t('type_summary_module')}
                          {type === "pack" &&
                            t('type_summary_pack')}
                        </p>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-muted-foreground mb-8">
                        {t('pricing_distanciel_note')}
                      </div>

                      {items.length === 0
                        ? (
                          <Card className="text-center py-12">
                            <p className="text-muted-foreground">
                              Aucun {type} disponible pour le moment
                            </p>
                          </Card>
                        )
                        : (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((atelier) => (
                              <Card
                                key={atelier.id}
                                className="hover:shadow-lg transition-shadow overflow-hidden"
                              >
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-lg line-clamp-2">
                                    {atelier.titre}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {atelier.description}
                                  </p>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Euro className="h-4 w-4" />
                                        Tarif
                                      </span>
                                      <span className="text-2xl font-bold text-primary">
                                        {atelier.tarif_eur}€
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Durée
                                      </span>
                                      <span className="text-sm font-medium">
                                        {atelier.duree_heures}h
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        Public
                                      </span>
                                      <span className="text-sm font-medium line-clamp-1">
                                        {atelier.public_cible}
                                      </span>
                                    </div>
                                  </div>

                                  {atelier.objectifs &&
                                    atelier.objectifs.length > 0 && (
                                    <div className="pt-2 border-t">
                                      <p className="text-xs font-semibold mb-2">
                                        Objectifs :
                                      </p>
                                      <ul className="text-xs space-y-1">
                                        {atelier.objectifs.slice(0, 2).map((
                                          obj,
                                          i,
                                        ) => (
                                          <li
                                            key={i}
                                            className="flex items-start gap-1"
                                          >
                                            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                                            <span className="line-clamp-1">
                                              {obj}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  <Button asChild className="w-full mt-4">
                                    <Link
                                      href={`/${locale}/reserver?atelier=${atelier.id}`}
                                    >
                                      Réserver
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="w-full py-12 md:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Pourquoi nous choisir ?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: <CheckCircle className="w-5 h-5" />,
                  title: "Tarifs Transparents",
                  description:
                    "Pas de frais cachés, prix affichés sans surprises",
                },
                {
                  icon: <GraduationCap className="w-5 h-5" />,
                  title: "Formateurs Qualifiés",
                  description: "Nos experts sont reconnus dans leur domaine",
                },
                {
                  icon: <Package className="w-5 h-5" />,
                  title: "Packs Groupés",
                  description: "Réductions pour les groupes et structures",
                },
                {
                  icon: <RefreshCw className="w-5 h-5" />,
                  title: "Flexible",
                  description: "Horaires et formats adaptables à vos besoins",
                },
              ].map((item, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Prêt à commencer ?</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Réservez votre atelier dès maintenant ou contactez-nous pour un
            devis personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href={`/${locale}/reserver`}>
                Réserver un atelier
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-primary-foreground border-primary-foreground bg-inherit hover:bg-primary-foreground/10"
            >
              <Link href={`/${locale}/contact`}>
                Demander un devis
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
