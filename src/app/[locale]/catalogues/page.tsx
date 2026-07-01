"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  BookOpenCheck,
  Download,
  FileText,
  Layers,
  PackageCheck,
  SlidersHorizontal,
} from "lucide-react";
import { cataloguesLinks } from "@/data/catalogues";
import CatalogCard from "@/components/catalog/CatalogCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const catalogEntries = [
  {
    id: "ateliers",
    title: "Catalogue ateliers unitaires",
    description:
      "Une version complète et à jour des ateliers prêts à animer, avec les détails de chaque séance.",
    document: cataloguesLinks.catalogue_ateliers,
    icon: BookOpenCheck,
  },
  {
    id: "thematiques",
    title: "Catalogue thématique",
    description:
      "Une version par disciplines et parcours transversaux.",
    document: cataloguesLinks.catalogue_thematiques,
    icon: Layers,
  },
];

const quickLinks = [
  {
    title: "Ateliers unitaires",
    description: "Comparer les ateliers prêts à animer par discipline.",
    href: "/ateliers",
    icon: FileText,
  },
  {
    title: "Modules piliers",
    description: "Assembler une progression pédagogique sur plusieurs séances.",
    href: "/modules",
    icon: Layers,
  },
  {
    title: "Packs & cycles",
    description: "Découvrir les formats groupés pour établissements et structures.",
    href: "/packs",
    icon: PackageCheck,
  },
  {
    title: "Constructeur",
    description: "Composer un pack d'ateliers et réserver plusieurs dates.",
    href: "/constructeur",
    icon: SlidersHorizontal,
  },
];

export default function CataloguesPage() {
  const locale = useLocale();
  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative w-full overflow-hidden bg-slate-950 py-16 md:py-20 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073"
            alt="Documents pédagogiques Ateliers 360 Éducation"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/85 to-slate-950/95" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                  <FileText className="mr-2 h-3 w-3" />
                  Ressources commerciales
                </Badge>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                  Documents pédagogiques</span>
              </div>
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Catalogues Ateliers 360 Éducation
              </h1>
              <p className="text-lg leading-8 text-slate-200 max-w-3xl">
                Retrouvez les documents à partager avec une école, une MJC, une collectivité ou une entreprise avant de construire une proposition.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="#documents">
                    Consulter les catalogues
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {cataloguesLinks.catalogue_ateliers?.download_link && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <a
                      href={cataloguesLinks.catalogue_ateliers.download_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le PDF
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Explorer l'offre en ligne
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Les pages publiques restent la source vivante du catalogue :
              elles reflètent les ateliers, modules et packs publiés dans
              Supabase.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.href} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={withLocale(item.href)}>
                        Ouvrir
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="documents" className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Documents disponibles
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground md:text-lg">
              Les aperçus s'ouvrent directement dans la page. Les téléchargements
              pointent vers le stockage public Supabase configuré pour le MVP.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {catalogEntries.map((entry) => {
              const Icon = entry.icon;

              return (
                <Card key={entry.id} className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{entry.title}</CardTitle>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {entry.document ? (
                      <CatalogCard
                        title={entry.title}
                        previewUrl={entry.document.preview_link}
                        downloadUrl={entry.document.download_link}
                        filename={entry.document.filename}
                      />
                    ) : (
                      <Alert>
                        <AlertDescription>
                          Ce document n'est pas encore publié. Utilisez le
                          catalogue ateliers ou le constructeur pour préparer
                          une proposition sur mesure.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
