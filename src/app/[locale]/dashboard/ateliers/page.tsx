"use client";

// [locale]/dashboard/ateliers/page.tsx (liste des ateliers)
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getWorkshops } from "@/lib/supabase";
import { WorkshopDB } from "@/lib/types";
import { Copy, Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import { DeleteWorkshopButton } from "@/components/admin/DeleteWorkshopButton";
import { DuplicateWorkshopButton } from "@/components/admin/DuplicateWorkshopButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RightSidebar } from "@/components/dashboard/RightSidebar";

export default function AteliersPage() {
  const t = useTranslations("AteliersPage");
  const dashboardT = useTranslations("DashboardPage");
  const locale = useLocale();
  const [workshops, setWorkshops] = useState<WorkshopDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error("Failed to load workshops:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkshops();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(workshops.map((w) => w.categorie).filter(Boolean)),
    );
    return ["all", ...cats];
  }, [workshops]);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter((w) => {
      const matchesSearch =
        w.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" ||
        w.categorie === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [workshops, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">{t("loading")}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-headline">
                {t("manage_workshops")}
              </h1>
              <p className="text-muted-foreground">{t("subtitle")}</p>
            </div>
            <Link href={`/${locale}/dashboard/ateliers/nouveau`}>
              <Button className="shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-4 w-4" />
                {t("new_workshop")}
              </Button>
            </Link>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search_placeholder")}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder={t("select_category")} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat as string}>
                      {cat === "all" ? t("all_categories") : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Workshops List */}
          <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("workshops_list")}</CardTitle>
                  <CardDescription>
                    {t("workshops_found_count", {
                      count: filteredWorkshops.length,
                    })}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredWorkshops.length === 0
                ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{t("no_workshops")}</p>
                    {workshops.length > 0 && (
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                      >
                        {t("clear_filters")}
                      </Button>
                    )}
                  </div>
                )
                : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">
                            {t("order")}
                          </TableHead>
                          <TableHead>{t("workshop_name")}</TableHead>
                          <TableHead>{t("workshop_type")}</TableHead>
                          <TableHead>
                            {t("workshop_duration_audiance")}
                          </TableHead>
                          <TableHead>{t("workshop_price")}</TableHead>
                          <TableHead className="text-right">
                            {t("workshop_action")}
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWorkshops.map((workshop) => (
                          <TableRow key={workshop.id} className="group">
                            <TableCell className="font-mono text-xs text-muted-foreground">
                              {workshop.sequence_order || "-"}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold group-hover:text-primary transition-colors">
                                  {workshop.titre}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {workshop.slug}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1 flex-wrap">
                                {workshop.type && (
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px] uppercase"
                                  >
                                    {workshop.type}
                                  </Badge>
                                )}
                                {workshop.categorie && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] uppercase"
                                  >
                                    {workshop.categorie}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col text-sm">
                                <span>{workshop.public_cible}</span>
                                <span className="text-muted-foreground text-xs">
                                  {workshop.duree_heures}h
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {workshop.tarif_eur}€
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Link
                                  href={`/${locale}/ateliers/${workshop.slug}`}
                                  target="_blank"
                                >
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    title={`${t("view")}`}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <DuplicateWorkshopButton
                                  workshopId={workshop.id}
                                  workshopTitle={workshop.titre}
                                />
                                <Link
                                  href={`/${locale}/dashboard/ateliers/${workshop.id}/modifier`}
                                >
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    title={`${t("edit")}`}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <DeleteWorkshopButton workshop={workshop} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <RightSidebar
          title={dashboardT("quick_actions")}
          description={dashboardT("quick_actions_desc")}
          actions={[
            {
              label: dashboardT("create_workshop"),
              href: `/${locale}/dashboard/ateliers/nouveau`,
              icon: <Plus className="w-4 h-4" />,
            },
          ]}
          stats={[
            {
              label: "Total des ateliers",
              value: workshops.length,
              icon: <Filter className="w-4 h-4" />,
              variant: "default",
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
