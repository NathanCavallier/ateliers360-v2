'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkshopDB } from '@/lib/types';
import { Clock, Euro, Users, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiWorkshopSelectorProps {
  ateliers: WorkshopDB[];
  selectedAteliers: number[];
  onSelectionChange: (ids: number[]) => void;
  className?: string;
}

type SortOption = 'name' | 'price' | 'duration';

export function MultiWorkshopSelector({
  ateliers,
  selectedAteliers,
  onSelectionChange,
  className,
}: MultiWorkshopSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const filteredAteliers = ateliers
    .filter((atelier) =>
      atelier.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atelier.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.tarif_eur - b.tarif_eur;
        case 'duration':
          return a.duree_heures - b.duree_heures;
        case 'name':
        default:
          return a.titre.localeCompare(b.titre);
      }
    });

  const handleToggleAtelier = (id: number) => {
    if (selectedAteliers.includes(id)) {
      onSelectionChange(selectedAteliers.filter((atelId) => atelId !== id));
    } else {
      onSelectionChange([...selectedAteliers, id]);
    }
  };

  const getTypeColor = (type?: WorkshopDB['type']) => {
    switch (type) {
      case 'module':
        return 'bg-purple-100 text-purple-800';
      case 'pack':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeLabel = (type?: WorkshopDB['type']) => {
    switch (type) {
      case 'module':
        return 'Module';
      case 'pack':
        return 'Pack';
      default:
        return 'Atelier';
    }
  };

  const selectedDetails = ateliers.filter((a) => selectedAteliers.includes(a.id));
  const totalPrice = selectedDetails.reduce((sum, a) => sum + a.tarif_eur, 0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Résumé des sélections */}
      {selectedAteliers.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedAteliers.length} atelier{selectedAteliers.length > 1 ? 's' : ''} sélectionné{selectedAteliers.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-2xl font-bold text-primary">{totalPrice}€</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectionChange([])}
                  className="text-xs"
                >
                  Réinitialiser
                </Button>
              </div>

              {/* Badges des ateliers sélectionnés */}
              <div className="flex flex-wrap gap-2">
                {selectedDetails.map((atelier) => (
                  <Badge
                    key={atelier.id}
                    variant="secondary"
                    className="flex items-center gap-1.5 pl-2 pr-1.5"
                  >
                    {atelier.titre.substring(0, 20)}
                    {atelier.titre.length > 20 ? '...' : ''}
                    <button
                      onClick={() => handleToggleAtelier(atelier.id)}
                      className="ml-1 hover:bg-black/10 rounded p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sélecteur */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left"
          >
            <span className="text-muted-foreground">
              {selectedAteliers.length === 0
                ? 'Sélectionner des ateliers...'
                : `${selectedAteliers.length} atelier(s) sélectionné(s)`}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Sélectionner des ateliers</SheetTitle>
            <SheetDescription>
              Choisissez un ou plusieurs ateliers pour votre réservation
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            {/* Filtres */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un atelier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="price">Prix (croissant)</SelectItem>
                  <SelectItem value="duration">Durée (croissant)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Liste des ateliers */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredAteliers.map((atelier) => (
                <Card
                  key={atelier.id}
                  className={cn(
                    'cursor-pointer transition-all',
                    selectedAteliers.includes(atelier.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md'
                  )}
                  onClick={() => handleToggleAtelier(atelier.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={selectedAteliers.includes(atelier.id)}
                        onCheckedChange={() => handleToggleAtelier(atelier.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm line-clamp-2">
                              {atelier.titre}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {atelier.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={getTypeColor(atelier.type)}
                          >
                            {getTypeLabel(atelier.type)}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {atelier.duree_heures}h
                          </div>
                          <div className="flex items-center gap-1">
                            <Euro className="h-3 w-3" />
                            {atelier.tarif_eur}€
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {atelier.public_cible}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredAteliers.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Aucun atelier ne correspond à votre recherche
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
