import { getWorkshopBySlug, getWorkshops } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MarkdownContent } from "@/components/common/MarkdownContent";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Hash,
  Layers,
  PackageCheck,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Image from "next/image";
import type { WorkshopDB } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

function normalizeArray(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string") {
    return raw.split(/[,;]\s*/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function compactUnique(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean))) as string[];
}

function getWorkshopView(workshop: WorkshopDB) {
  const title = workshop.title || workshop.titre;
  const shortDescription = workshop.shortdescription || workshop.description || "";
  const longDescription = workshop.longdescription || workshop.description || shortDescription;
  const category = workshop.category || workshop.categorie || "";
  const targetAudience = workshop.targetaudience || workshop.public_cible || "";
  const ageGroup = workshop.agegroup || "";
  const duration = workshop.duration || (workshop.duree_heures ? `${workshop.duree_heures}h` : "");
  const price = workshop.price ?? workshop.tarif_eur;
  const materials = workshop.materials || workshop.materiel || "";
  const objectives = compactUnique([
    ...normalizeArray(workshop.learningobjectives),
    ...normalizeArray(workshop.objectifs),
  ]);

  return {
    title,
    shortDescription,
    longDescription,
    category,
    targetAudience,
    ageGroup,
    duration,
    price,
    materials,
    objectives,
    tags: normalizeArray(workshop.tags),
    discipline: workshop.discipline || "",
    format: workshop.format || "",
  };
}

function formatDate(date: string | null | undefined, locale: string) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
}

function formatWorkshopFormat(
  rawFormat: string | null | undefined,
  type: WorkshopDB["type"],
  t: Awaited<ReturnType<typeof getTranslations>>,
) {
  const labels = normalizeArray(rawFormat).map((format) => {
    const normalized = format
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalized.includes("cycle")) return t("format_cycle");
    if (normalized.includes("pack")) return t("format_pack");
    if (normalized.includes("module")) return t("format_module");
    if (normalized.includes("sur") || normalized.includes("custom")) {
      return t("format_custom");
    }
    if (normalized.includes("workshop") || normalized.includes("atelier")) {
      return t("format_workshop");
    }

    return format;
  });

  if (labels.length > 0) {
    return compactUnique(labels).join(" / ");
  }

  return type ? t(`type_${type}`) : t("format_group");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const workshop = await getWorkshopBySlug(params.slug);

  if (!workshop) {
    const t = await getTranslations({ locale: params.locale, namespace: "Workshops" });
    return { title: t("not_found") };
  }

  const view = getWorkshopView(workshop);
  const description = view.shortDescription || view.longDescription;

  return {
    title: `${view.title} | Ateliers 360`,
    description: description.substring(0, 160),
    keywords: [
      "atelier STEM",
      "robotique",
      "programmation",
      "sciences",
      view.targetAudience,
      view.category,
      view.discipline,
      ...view.tags,
    ].filter(Boolean),
    openGraph: {
      title: view.title,
      description: description.substring(0, 160),
      type: "website",
      locale: params.locale,
      siteName: "Ateliers 360",
      images: workshop.image_url ? [{ url: workshop.image_url }] : undefined,
    },
    alternates: {
      canonical: `/${params.locale}/ateliers/${workshop.slug}`,
      languages: {
        en: `/en/ateliers/${workshop.slug}`,
        fr: `/fr/ateliers/${workshop.slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  try {
    const workshops = await getWorkshops();
    if (workshops && workshops.length > 0) {
      return workshops.flatMap((workshop) => [
        { locale: "fr", slug: workshop.slug },
        { locale: "en", slug: workshop.slug },
      ]);
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }
  return [];
}

export default async function WorkshopDetailPage(props: Props) {
  const params = await props.params;
  const t = await getTranslations({
    locale: params.locale,
    namespace: "Workshops",
  });
  const workshop = await getWorkshopBySlug(params.slug);

  if (!workshop) {
    notFound();
  }

  const view = getWorkshopView(workshop);
  const updatedAt = formatDate(workshop.updated_at, params.locale);

  const allWorkshops = await getWorkshops();
  const relatedWorkshops = allWorkshops
    .filter((w) => w.id !== workshop.id)
    .sort((a, b) => {
      const aCategory = a.category || a.categorie;
      const bCategory = b.category || b.categorie;
      if (aCategory === view.category && bCategory !== view.category) return -1;
      if (aCategory !== view.category && bCategory === view.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalEvent",
    name: view.title,
    description: view.longDescription,
    image: workshop.image_url || undefined,
    duration: workshop.duree_heures ? `PT${workshop.duree_heures}H` : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    offers: {
      "@type": "Offer",
      price: view.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    organizer: {
      "@type": "Organization",
      name: "Ateliers 360",
      url: "https://ateliers360.fr",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: view.targetAudience,
    },
  };

  const infoItems = [
    {
      icon: Clock,
      label: t("duration"),
      value: view.duration,
    },
    {
      icon: Users,
      label: t("target"),
      value: view.targetAudience,
    },
    {
      icon: DollarSign,
      label: t("price"),
      value: typeof view.price === "number" ? `${view.price}€` : "",
    },
    {
      icon: Layers,
      label: t("format"),
      value: formatWorkshopFormat(view.format, workshop.type, t),
    },
  ].filter((item) => item.value);

  const detailItems = [
    { icon: Tag, label: t("category"), value: view.category },
    { icon: Briefcase, label: t("discipline"), value: view.discipline },
    { icon: GraduationCap, label: t("age_group"), value: view.ageGroup },
    { icon: PackageCheck, label: t("type"), value: workshop.type ? t(`type_${workshop.type}`) : "" },
  ].filter((item) => item.value);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative w-full py-12 md:py-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={workshop.image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"}
            alt={view.title}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950" />
        </div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/20 text-primary-foreground border-primary/30">
                  {workshop.type ? t(`type_${workshop.type}`) : t("stem_workshop_badge")}
                </Badge>
                {view.category && (
                  <Badge variant="outline" className="px-3 py-1 text-primary-foreground border-white/20 uppercase tracking-wider text-[10px]">
                    {view.category}
                  </Badge>
                )}
                {view.discipline && (
                  <Badge variant="outline" className="px-3 py-1 text-primary-foreground border-white/20 uppercase tracking-wider text-[10px]">
                    {view.discipline}
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-headline">
                {view.title}
              </h1>
              {view.shortDescription && (
                <p className="text-xl text-slate-300 max-w-[650px] leading-relaxed">
                  {view.shortDescription}
                </p>
              )}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                  <Link href={`/${params.locale}/reserver?atelier=${workshop.id}`}>
                    {t("book_now")}
                  </Link>
                </Button>
                {view.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {view.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs text-slate-300 bg-slate-900/60 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                {workshop.image_url ? (
                  <>
                    <Image
                      src={workshop.image_url}
                      alt={view.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <span className="absolute top-3 left-3 z-20 bg-black/75 text-white text-[0.70rem] px-2 py-1 rounded shadow font-semibold tracking-wide select-none pointer-events-none">
                      {t('non_contractual_image')}
                    </span>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Zap className="h-20 w-20 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 border-b">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {infoItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex-1 w-full py-12">
        <div className="container px-4 md:px-6">
          <Breadcrumbs
            locale={params.locale}
            items={[
              { label: t("all_workshops"), href: `/${params.locale}/ateliers` },
              {
                label: view.category || t("all_workshops"),
                href: `/${params.locale}/ateliers?category=${encodeURIComponent(view.category)}`,
              },
              { label: view.title },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {view.longDescription && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t("description")}</h2>
                  <MarkdownContent content={view.longDescription} />
                </div>
              )}

              {view.objectives.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t("objectives")}</h2>
                  <ul className="space-y-3">
                    {view.objectives.map((obj, i) => (
                      <li key={`${obj}-${i}`} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {view.materials && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t("material")}</h2>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {view.materials}
                  </p>
                </div>
              )}

              {(detailItems.length > 0 || view.tags.length > 0) && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t("details")}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {detailItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Card key={item.label}>
                          <CardContent className="p-4 flex gap-3">
                            <Icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">{item.label}</p>
                              <p className="font-medium">{item.value}</p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    {view.tags.length > 0 && (
                      <Card className="sm:col-span-2">
                        <CardContent className="p-4 flex gap-3">
                          <Hash className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">{t("tags")}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {view.tags.map((tag) => (
                                <Badge key={tag} variant="outline">#{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              <Separator />
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  {t("upcoming_sessions")}
                </h2>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("sessions_on_demand")}</CardTitle>
                    <CardDescription>
                      {t("sessions_on_demand_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" size="lg">
                      <Link href={`/${params.locale}/reserver?atelier=${workshop.id}`}>
                        {t("book_now")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <Card className="border-accent/50 bg-accent/5 shadow-xl shadow-accent/5 overflow-hidden group">
                  <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                  <CardHeader>
                    <CardTitle className="font-headline">{t("ready")}</CardTitle>
                    <CardDescription>
                      {t("sidebar_book_desc")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20" size="lg">
                      <Link href={`/${params.locale}/reserver?atelier=${workshop.id}`}>
                        {t("book_now")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/${params.locale}/pour-les-ecoles`}>
                        {t("request_quote")}
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full text-muted-foreground hover:text-primary">
                      <Link href={`/${params.locale}/contact`}>
                        {t("ask_question")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-headline">{t("reference")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">{t("reference_id")}:</span> {workshop.id}
                    </p>
                    {updatedAt && (
                      <p>
                        <span className="font-medium text-foreground">{t("updated_at")}:</span> {updatedAt}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {relatedWorkshops.length > 0 && (
                  <Card className="shadow-lg border-none bg-slate-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-headline">{t("related")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedWorkshops.map((w) => {
                        const relatedTitle = w.title || w.titre;
                        const relatedAudience = w.targetaudience || w.public_cible;
                        const relatedDuration = w.duration || (w.duree_heures ? `${w.duree_heures}h` : "");

                        return (
                          <Link
                            key={w.id}
                            href={`/${params.locale}/ateliers/${w.slug}`}
                            className="group block p-3 rounded-xl border bg-white hover:border-primary/30 transition-all duration-300"
                          >
                            <div className="flex gap-3">
                              <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                                {w.image_url ? (
                                  <Image src={w.image_url} alt={relatedTitle} fill className="object-cover" />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center">
                                    <Zap size={16} className="text-slate-300" />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                  {relatedTitle}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {compactUnique([relatedDuration, relatedAudience]).join(" • ")}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
