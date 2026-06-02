"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { getWorkshops } from "@/lib/supabase";
import WorkshopCard from "@/components/workshops/WorkshopCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { Workshop } from "@/lib/types";
import {
  extractAgeRange,
  mapWorkshop,
  matchesCategory,
  normalizeText,
} from "@/lib/workshop-normalization";

type WorkshopListProps = {
  searchQuery?: string;
  selectedCategory?: string;
  ageRange?: [number, number];
  durationRange?: [number, number];
  priceRange?: [number, number];
  selectedFormats?: string[];
  sortBy?: string;
};

export default function WorkshopList({
  searchQuery = "",
  selectedCategory = "all",
  ageRange = [6, 18],
  durationRange = [1, 8],
  priceRange = [0, 3500],
  selectedFormats = [],
  sortBy = "popular",
}: WorkshopListProps) {
  const t = useTranslations("Workshops");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const supabaseWorkshops = await getWorkshops();
        setWorkshops((supabaseWorkshops || []).map(mapWorkshop));
      } catch (err: any) {
        console.error("Failed to load workshops:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkshops();
  }, []);

  const filteredWorkshops = useMemo(() => {
    let filtered = [...workshops];

    if (searchQuery.trim()) {
      const query = normalizeText(searchQuery);
      filtered = filtered.filter((workshop) => {
        const text = [
          workshop.title,
          workshop.titre,
          workshop.shortDescription,
          workshop.description,
          workshop.longDescription,
          workshop.category,
          workshop.discipline,
          workshop.targetAudience,
          workshop.ageGroup,
          workshop.materials,
          ...workshop.learningObjectives,
          ...workshop.objectives,
        ].join(" ");
        return normalizeText(text).includes(query);
      });
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((workshop) =>
        matchesCategory(workshop, selectedCategory)
      );
    }

    if (ageRange) {
      filtered = filtered.filter((workshop) => {
        const parsedRange = extractAgeRange(workshop);
        if (!parsedRange) return true;
        return parsedRange[0] <= ageRange[1] && parsedRange[1] >= ageRange[0];
      });
    }

    if (durationRange) {
      filtered = filtered.filter((workshop) => {
        const duration = workshop.duree_heures ||
          (workshop.duration ? parseFloat(workshop.duration) : 0);
        if (!duration) return true;
        return duration >= durationRange[0] && duration <= durationRange[1];
      });
    }

    if (priceRange) {
      filtered = filtered.filter((workshop) => {
        const price = workshop.price ?? workshop.tarif_eur ?? 0;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    if (selectedFormats && selectedFormats.length > 0) {
      filtered = filtered.filter((workshop) => {
        const format = normalizeText(workshop.format || workshop.type || "");
        const type = normalizeText(workshop.type || "");
        const tags = (workshop.tags || []).map(normalizeText);

        const matchesTagFormat = (selected: string) => {
          if (selected === "sur-mesure") {
            return format.includes("sur-mesure") || format.includes("custom");
          }
          if (selected === "projet-eleve") {
            return tags.some((tag) => tag.includes("projet"));
          }
          return tags.some((tag) => tag.includes(selected));
        };

        return selectedFormats.some((selectedFormat) => {
          const selected = normalizeText(selectedFormat);
          if (selected === "sur-mesure") {
            return format.includes("sur-mesure") || format.includes("custom");
          }
          if (selected === "distanciel" || selected === "hybride" || selected === "projet-eleve") {
            return matchesTagFormat(selected);
          }
          return format.includes(selected) || type.includes(selected);
        });
      });
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price_asc":
            return (a.price ?? a.tarif_eur ?? 0) - (b.price ?? b.tarif_eur ?? 0);
          case "price_desc":
            return (b.price ?? b.tarif_eur ?? 0) - (a.price ?? a.tarif_eur ?? 0);
          case "duration_asc":
            return (a.duree_heures || 0) - (b.duree_heures || 0);
          case "newest":
            return (typeof b.id === "number" ? b.id : 0) -
              (typeof a.id === "number" ? a.id : 0);
          case "popular":
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [
    workshops,
    searchQuery,
    selectedCategory,
    ageRange,
    durationRange,
    priceRange,
    selectedFormats,
    sortBy,
  ]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertDescription>
            {t("load_error", { error })}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>

      {filteredWorkshops.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {t("empty_title")}
          </h3>
          <p className="text-muted-foreground">
            {t("empty_description")}
          </p>
        </div>
      )}
    </div>
  );
}
