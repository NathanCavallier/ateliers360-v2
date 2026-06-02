import { CategoriesColors, type Workshop, type WorkshopDB } from "@/lib/types";

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeArray(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string") {
    return raw.split(/[,;]\s*/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function getCategoryColor(cat: string): CategoriesColors {
  const category = normalizeText(cat);

  if (category.includes("robot") || category.includes("ia")) {
    return CategoriesColors.robotiqueIa;
  }
  if (category.includes("numerique-responsable")) {
    return CategoriesColors.numeriqueResponsable;
  }
  if (
    category.includes("numerique") ||
    category.includes("code") ||
    category.includes("informatique") ||
    category.includes("digital")
  ) {
    return CategoriesColors.numeriqueCode;
  }
  if (
    category.includes("ecologie") ||
    category.includes("vie") ||
    category.includes("environnement")
  ) {
    return CategoriesColors.ecologieVie;
  }
  if (
    category.includes("espace") ||
    category.includes("aeronautique") ||
    category.includes("astro")
  ) {
    return CategoriesColors.espaceAeronautique;
  }
  if (
    category.includes("science") ||
    category.includes("physique") ||
    category.includes("chimie") ||
    category.includes("biologie")
  ) {
    return CategoriesColors.sciences;
  }

  return CategoriesColors.all;
}

export function normalizeFormat(
  raw: string | null | undefined,
  type?: Workshop["type"],
) {
  const format = normalizeText(raw || type || "workshop");
  if (format.includes("sur-mesure") || format.includes("custom")) {
    return "sur-mesure";
  }
  if (format.includes("cycle")) return "cycle";
  if (format.includes("pack")) return "pack";
  if (format.includes("module")) return "module";
  return "workshop";
}

export function mapWorkshop(w: WorkshopDB): Workshop {
  const title = w.title || w.titre || "";
  const description = w.description || "";
  const shortDescription = w.shortdescription || description;
  const longDescription = w.longdescription || description;
  const targetAudience = w.targetaudience || w.public_cible || "";
  const ageGroup = w.agegroup || targetAudience;
  const numericDuration = w.duree_heures || 0;
  const duration = w.duration || (numericDuration ? `${numericDuration}h` : "");
  const price = w.price ?? w.tarif_eur ?? 0;
  const enrichedObjectives = normalizeArray(w.learningobjectives);
  const legacyObjectives = normalizeArray(w.objectifs);
  const category = w.category || w.categorie || "Sciences";
  const categoryColor = w.categorycolor || getCategoryColor(category);

  return {
    id: w.id,
    slug: w.slug,
    title,
    titre: w.titre || title,
    shortDescription,
    description,
    longDescription,
    targetAudience,
    public_cible: w.public_cible || targetAudience,
    ageGroup,
    duration,
    duree_heures: numericDuration,
    price,
    tarif_eur: w.tarif_eur ?? price,
    learningObjectives: enrichedObjectives.length > 0
      ? enrichedObjectives
      : legacyObjectives,
    objectives: legacyObjectives,
    category,
    categoryColor,
    discipline: w.discipline || category,
    format: normalizeFormat(w.format, w.type),
    materials: w.materials || w.materiel || "",
    tags: normalizeArray(w.tags),
    type: w.type,
    image: {
      imageUrl: w.image_url ||
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: title,
      imageHint: "Workshop image",
      id: String(w.id),
    },
  };
}

export function extractAgeRange(workshop: Workshop) {
  const source = `${workshop.ageGroup || ""} ${workshop.targetAudience || ""}`;
  const rangeMatch = source.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    return [Number(rangeMatch[1]), Number(rangeMatch[2])] as const;
  }
  const singleMatch = source.match(/(\d+)\s*(?:ans|years|\+)/i);
  if (singleMatch) {
    const age = Number(singleMatch[1]);
    return [age, 99] as const;
  }
  return null;
}

export function matchesCategory(workshop: Workshop, selectedCategory: string) {
  const selected = normalizeText(selectedCategory);
  const haystack = [
    workshop.category,
    workshop.discipline,
    workshop.title,
    workshop.description,
  ].map((value) => normalizeText(value || ""));

  if (selected === "numerique-code") {
    return haystack.some((value) =>
      value.includes("numerique") ||
      value.includes("code") ||
      value.includes("informatique")
    ) && !haystack.some((value) => value.includes("responsable"));
  }

  if (selected === "robotique-ia") {
    return haystack.some((value) =>
      value.includes("robot") || value.includes("ia")
    );
  }

  if (selected === "ecologie-vie") {
    return haystack.some((value) =>
      value.includes("ecologie") ||
      value.includes("vie") ||
      value.includes("environnement")
    );
  }

  if (selected === "espace-aeronautique") {
    return haystack.some((value) =>
      value.includes("espace") ||
      value.includes("aeronautique") ||
      value.includes("astro")
    );
  }

  return haystack.some((value) => value.includes(selected));
}
