"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Layers,
  type LucideIcon,
  PackageCheck,
  Rocket,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import ReservationFormAdvanced from "@/components/reservations/ReservationFormAdvanced";
import { getWorkshops } from "@/lib/supabase";
import type { WorkshopDB } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Preset = {
  id: string;
  title: string;
  description: string;
  ids: number[];
  icon: LucideIcon;
};

function pickWorkshops(
  workshops: WorkshopDB[],
  predicate: (workshop: WorkshopDB) => boolean,
  count: number,
) {
  return workshops.filter(predicate).slice(0, count).map((workshop) => workshop.id);
}

export default function ConstructeurPage() {
  const locale = useLocale();
  const [workshops, setWorkshops] = useState<WorkshopDB[]>([]);
  const [selectedPresetIds, setSelectedPresetIds] = useState<number[]>([]);
  const [activePreset, setActivePreset] = useState<string>("custom");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error("Erreur chargement constructeur:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkshops();
  }, []);

  const presets = useMemo<Preset[]>(() => {
    const packs = pickWorkshops(workshops, (workshop) => workshop.type === "pack", 1);
    const modules = pickWorkshops(workshops, (workshop) => workshop.type === "module", 3);
    const discovery = pickWorkshops(
      workshops,
      (workshop) => workshop.type === "workshop" || !workshop.type,
      3,
    );
    const mixed = [
      ...pickWorkshops(workshops, (workshop) => workshop.type === "module", 2),
      ...pickWorkshops(workshops, (workshop) => workshop.type === "workshop" || !workshop.type, 2),
    ];

    return [
      {
        id: "cycle",
        title: "Cycle clé en main",
        description: "Un pack ou un module long pour sécuriser une progression complète.",
        ids: packs.length > 0 ? packs : modules,
        icon: PackageCheck,
      },
      {
        id: "trimestre",
        title: "Trimestre découverte",
        description: "Trois interventions complémentaires pour lancer un parcours STEM.",
        ids: discovery.length > 0 ? discovery : workshops.slice(0, 3).map((workshop) => workshop.id),
        icon: CalendarDays,
      },
      {
        id: "sur-mesure",
        title: "Pack sur mesure",
        description: "Un mix modules + ateliers pour préparer un devis adapté au public.",
        ids: mixed.length > 0 ? mixed : workshops.slice(0, 4).map((workshop) => workshop.id),
        icon: SlidersHorizontal,
      },
    ];
  }, [workshops]);

  const selectedWorkshops = useMemo(
    () => workshops.filter((workshop) => selectedPresetIds.includes(workshop.id)),
    [selectedPresetIds, workshops],
  );

  const totalHours = selectedWorkshops.reduce(
    (sum, workshop) => sum + (workshop.duree_heures || 0),
    0,
  );
  const totalPrice = selectedWorkshops.reduce(
    (sum, workshop) => sum + (workshop.tarif_eur || 0),
    0,
  );

  function applyPreset(preset: Preset) {
    setActivePreset(preset.id);
    setSelectedPresetIds(preset.ids);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative w-full overflow-hidden bg-slate-950 py-12 text-white md:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            alt="Construction d'un parcours pédagogique"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/75 to-slate-950" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <Badge className="w-fit border-white/20 bg-white/10 text-white">
              <Rocket className="mr-1 h-3 w-3" />
              Constructeur de packs
            </Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Composez votre programme d'ateliers
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-slate-200">
              Sélectionnez plusieurs ateliers, choisissez une ou plusieurs dates,
              puis réservez avec paiement immédiat ou demande de validation
              selon le format.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#constructeur">
                  Construire mon pack
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/catalogues`}>Voir les catalogues</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{workshops.length}</p>
                  <p className="text-sm text-muted-foreground">Ateliers disponibles</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1 à 50</p>
                  <p className="text-sm text-muted-foreground">Participants par réservation</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Multi-dates</p>
                  <p className="text-sm text-muted-foreground">Réservation groupée intégrée</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="constructeur" className="w-full bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Démarrer depuis un parcours rapide
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground md:text-lg">
              Les suggestions ci-dessous pré-sélectionnent des ateliers du
              catalogue. Vous pouvez ensuite modifier la sélection dans le
              formulaire.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-44 rounded-xl" />
              ))}
            </div>
          ) : workshops.length === 0 ? (
            <Alert>
              <AlertDescription>
                Aucun atelier n'est disponible pour le constructeur. Vérifiez la
                configuration Supabase ou ajoutez des ateliers depuis
                l'administration.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {presets.map((preset) => {
                const Icon = preset.icon;
                const disabled = preset.ids.length === 0;

                return (
                  <Card
                    key={preset.id}
                    className={cn(
                      "h-full transition-all",
                      activePreset === preset.id && "border-primary shadow-md",
                    )}
                  >
                    <CardHeader>
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">{preset.title}</CardTitle>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {preset.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{preset.ids.length} ateliers</Badge>
                      </div>
                      <Button
                        type="button"
                        variant={activePreset === preset.id ? "default" : "outline"}
                        className="w-full"
                        disabled={disabled}
                        onClick={() => applyPreset(preset)}
                      >
                        Pré-sélectionner
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif du pack</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Ce résumé concerne le parcours rapide sélectionné. Le
                    formulaire reste modifiable avant envoi.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground">Ateliers</p>
                      <p className="text-2xl font-bold text-primary">
                        {selectedWorkshops.length}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-sm text-muted-foreground">Durée cumulée</p>
                      <p className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <Clock className="h-5 w-5" />
                        {totalHours}h
                      </p>
                    </div>
                  </div>

                  {selectedWorkshops.length > 0 ? (
                    <div className="space-y-3">
                      {selectedWorkshops.map((workshop) => (
                        <div key={workshop.id} className="rounded-lg border p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium leading-tight">
                                {workshop.titre}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {workshop.public_cible}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {workshop.type || "atelier"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <p className="text-sm text-green-800">Budget indicatif</p>
                        <p className="text-2xl font-bold text-green-700">
                          {totalPrice}€
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Alert>
                      <AlertDescription>
                        Sélectionnez un parcours rapide ou choisissez les
                        ateliers directement dans le formulaire.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </aside>

            <Card>
              <CardHeader>
                <CardTitle>Finaliser la réservation groupée</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ajoutez les dates, les participants et les informations de
                  contact. Les packs, modules et réservations multi-dates peuvent
                  être validés sans paiement immédiat.
                </p>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-14 rounded-lg" />
                    <Skeleton className="h-14 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                  </div>
                ) : (
                  <ReservationFormAdvanced
                    ateliers={workshops}
                    defaultAtelierIds={selectedPresetIds}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
