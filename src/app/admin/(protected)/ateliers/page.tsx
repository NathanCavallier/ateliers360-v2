'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getWorkshops } from '@/lib/supabase';
import { WorkshopDB } from '@/lib/types';
import { Edit, Trash2, Plus, Eye, Copy, Search, Filter } from 'lucide-react';
import { DeleteWorkshopButton } from '@/components/admin/DeleteWorkshopButton';
import { DuplicateWorkshopButton } from '@/components/admin/DuplicateWorkshopButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AteliersPage() {
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
        console.error('Failed to load workshops:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkshops();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(workshops.map(w => w.categorie).filter(Boolean)));
    return ["all", ...cats];
  }, [workshops]);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(w => {
      const matchesSearch = w.titre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           w.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || w.categorie === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [workshops, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Chargement des ateliers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Gestion des Ateliers</h1>
          <p className="text-muted-foreground">Créez, modifiez et gérez votre catalogue d&apos;ateliers</p>
        </div>
        <Link href="/admin/ateliers/nouveau">
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Atelier
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher par titre ou slug..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Toutes les catégories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat as string}>
                  {cat === "all" ? "Toutes les catégories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des Ateliers</CardTitle>
              <CardDescription>
                {filteredWorkshops.length} atelier(s) trouvé(s)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredWorkshops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun atelier ne correspond à vos critères.</p>
              {workshops.length > 0 && (
                <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                  Effacer les filtres
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Ordre</TableHead>
                    <TableHead>Atelier</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Public / Durée</TableHead>
                    <TableHead>Tarif</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkshops.map((workshop) => (
                    <TableRow key={workshop.id} className="group">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {workshop.sequence_order || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold group-hover:text-primary transition-colors">{workshop.titre}</span>
                          <span className="text-xs text-muted-foreground font-mono">{workshop.slug}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {workshop.type && (
                            <Badge variant="secondary" className="text-[10px] uppercase">
                              {workshop.type}
                            </Badge>
                          )}
                          {workshop.categorie && (
                            <Badge variant="outline" className="text-[10px] uppercase">
                              {workshop.categorie}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <span>{workshop.public_cible}</span>
                          <span className="text-muted-foreground text-xs">{workshop.duree_heures}h</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{workshop.tarif_eur}€</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Link href={`/fr/ateliers/${workshop.slug}`} target="_blank">
                            <Button size="sm" variant="ghost" title="Aperçu public">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DuplicateWorkshopButton 
                            workshopId={workshop.id} 
                            workshopTitle={workshop.titre} 
                          />
                          <Link href={`/admin/ateliers/${workshop.id}/modifier`}>
                            <Button size="sm" variant="ghost" title="Modifier">
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
  );
}
