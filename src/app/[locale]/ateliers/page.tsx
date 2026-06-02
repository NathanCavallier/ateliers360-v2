'use client';

import * as React from 'react';
import WorkshopList from '@/components/workshops/WorkshopList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Clock,
  Euro,
  Filter,
  Route,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Note: metadata is not available in client components
// If you need metadata, wrap this in a server component

// Props pour afficher les ateliers par catégorie en venant de la page de disciplines (ex: https://www.ateliers360.fr/fr/ateliers?category=sciences: "sciences")
interface AtelierListPageProps {
  searchParams: {
    category?: string;
  };
}

export default function AtelierListPage({
  searchParams = { category: 'all' },
}: any) {
  const t = useTranslations('Workshops');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ageRange, setAgeRange] = useState<[number, number]>([6, 18]);
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 8]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchParams.category) {
      setSelectedCategory(searchParams.category);
    }
  }, [searchParams.category]);

  const categories = [
    { id: 'all', label: t('all_workshops'), color: 'default' },
    { id: 'sciences', label: 'Sciences & Expériences', color: '#0097b2' },
    { id: 'numerique-code', label: 'Numérique & Code', color: '#4910bc' },
    { id: 'robotique-ia', label: 'Robotique & IA', color: '#0a714e' },
    {
      id: 'numerique-responsable',
      label: 'Numérique responsable',
      color: '#e96b1f',
    },
    {
      id: 'ecologie-vie',
      label: 'Écologie & Sciences de la vie',
      color: '#4ca626',
    },
    {
      id: 'espace-aeronautique',
      label: 'Espace & Aéronautique',
      color: '#004aad',
    },
  ];

  const formats = [
    { id: 'workshop', label: t('format_workshop') },
    { id: 'module', label: t('format_module') },
    { id: 'pack', label: t('format_pack') },
    { id: 'cycle', label: t('format_cycle') },
    { id: 'sur-mesure', label: t('format_custom') },
    { id: 'distanciel', label: t('format_distanciel') },
    { id: 'hybride', label: t('format_hybride') },
    { id: 'projet-eleve', label: t('format_projet_eleve') },
  ];

  const toggleFormat = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((f) => f !== formatId)
        : [...prev, formatId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setAgeRange([6, 18]);
    setDurationRange([1, 8]);
    setPriceRange([0, 3500]);
    setSelectedFormats([]);
    setSortBy('popular');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (ageRange[0] !== 6 || ageRange[1] !== 18 ? 1 : 0) +
    (durationRange[0] !== 1 || durationRange[1] !== 8 ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 3500 ? 1 : 0) +
    (selectedFormats.length > 0 ? 1 : 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="w-full py-14 md:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
            alt="Catalogue ateliers"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {t('title')}
              </h1>
              <p className="mt-4 text-lg text-slate-200/90 max-w-2xl leading-relaxed">
                {t('hero_subtitle')}
              </p>
              {/* Future search bar - For now we rely on filters
              <div className="mt-8 relative max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-14 rounded-3xl bg-white/95 text-slate-900 shadow-sm border border-slate-200 focus:border-accent"
                />
              </div>*/}
            </div>
          </div>
      </section>

      <section className="w-full py-10 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: t('format_distanciel'),
                  description: t('highlight_distanciel_description'),
                },
                {
                  title: t('format_hybride'),
                  description: t('highlight_hybride_description'),
                },
                {
                  title: t('format_projet_eleve'),
                  description: t('highlight_projet_eleve_description'),
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full py-6 border-b bg-muted/50 sticky top-0 z-20 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          {/* Quick filters - Desktop */}
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {t('filter_by')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">{t('sort_popular')}</SelectItem>
                    <SelectItem value="newest">{t('sort_newest')}</SelectItem>
                    <SelectItem value="price_asc">
                      {t('sort_price_asc')}
                    </SelectItem>
                    <SelectItem value="price_desc">
                      {t('sort_price_desc')}
                    </SelectItem>
                    <SelectItem value="duration_asc">
                      {t('sort_duration_asc')}
                    </SelectItem>
                  </SelectContent>
                </Select>

                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    {t('clear_filters')} ({activeFiltersCount})
                  </Button>
                )}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? 'shadow-sm' : ''}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Advanced filters row */}
            <div className="grid grid-cols-4 gap-4">
              {/* Age range */}
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {t('age_range')}
                </Label>
                <div className="px-2">
                  <Slider
                    value={ageRange}
                    onValueChange={(value) =>
                      setAgeRange(value as [number, number])
                    }
                    min={6}
                    max={18}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {ageRange[0]} - {ageRange[1]} {t('years')}
                  </p>
                </div>
              </div>

              {/* Duration range */}
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {t('duration')}
                </Label>
                <div className="px-2">
                  <Slider
                    value={durationRange}
                    onValueChange={(value) =>
                      setDurationRange(value as [number, number])
                    }
                    min={1}
                    max={8}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {durationRange[0]} - {durationRange[1]} {t('hours')}
                  </p>
                </div>
              </div>

              {/* Price range */}
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-1">
                  <Euro className="h-3 w-3" />
                  {t('price_range')}
                </Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    min={0}
                    max={3500}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {priceRange[0]}€ - {priceRange[1]}€
                  </p>
                </div>
              </div>

              {/* Format */}
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-1">
                  <Route className="h-3 w-3" />
                  {t('format')}
                </Label>
                <Select
                  value={selectedFormats.length > 0 ? selectedFormats[0] : 'all'}
                  onValueChange={(value) => {
                    if (value === 'all') {
                      setSelectedFormats([]);
                    } else if (selectedFormats.includes(value)) {
                      toggleFormat(value);
                    } else {
                      // Clear previous and set new
                      selectedFormats.forEach((f) => {
                        if (f !== value) toggleFormat(f);
                      });
                      toggleFormat(value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder={t('format')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t('format')} - Tous
                    </SelectItem>
                    {formats.map((format) => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    {t('filters')}
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>{t('filters')}</SheetTitle>
                    <SheetDescription>
                      {t('filter_description')}
                    </SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* Sort */}
                    <div className="space-y-2">
                      <Label>{t('sort_by')}</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">
                            {t('sort_popular')}
                          </SelectItem>
                          <SelectItem value="newest">
                            {t('sort_newest')}
                          </SelectItem>
                          <SelectItem value="price_asc">
                            {t('sort_price_asc')}
                          </SelectItem>
                          <SelectItem value="price_desc">
                            {t('sort_price_desc')}
                          </SelectItem>
                          <SelectItem value="duration_asc">
                            {t('sort_duration_asc')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                      <Label>{t('category')}</Label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <Button
                            key={cat.id}
                            variant={
                              selectedCategory === cat.id
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => setSelectedCategory(cat.id)}
                          >
                            {cat.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <Label>{t('age_range')}</Label>
                      <div className="px-2">
                        <Slider
                          value={ageRange}
                          onValueChange={(value) =>
                            setAgeRange(value as [number, number])
                          }
                          min={6}
                          max={18}
                          step={1}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {ageRange[0]} - {ageRange[1]} {t('years')}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <Label>{t('duration')}</Label>
                      <div className="px-2">
                        <Slider
                          value={durationRange}
                          onValueChange={(value) =>
                            setDurationRange(value as [number, number])
                          }
                          min={1}
                          max={8}
                          step={1}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {durationRange[0]} - {durationRange[1]} {t('hours')}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label>{t('price_range')}</Label>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={(value) =>
                            setPriceRange(value as [number, number])
                          }
                          min={0}
                          max={3500}
                          step={10}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {priceRange[0]}€ - {priceRange[1]}€
                        </p>
                      </div>
                    </div>

                    {/* Format */}
                    <div className="space-y-3">
                      <Label>{t('format')}</Label>
                      {formats.map((format) => (
                        <div
                          key={format.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={format.id}
                            checked={selectedFormats.includes(format.id)}
                            onCheckedChange={() => toggleFormat(format.id)}
                          />
                          <label
                            htmlFor={format.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {format.label}
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Clear button */}
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearFilters}
                      >
                        <X className="h-4 w-4 mr-2" />
                        {t('clear_filters')}
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t('sort_popular')}</SelectItem>
                  <SelectItem value="newest">{t('sort_newest')}</SelectItem>
                  <SelectItem value="price_asc">
                    {t('sort_price_asc')}
                  </SelectItem>
                  <SelectItem value="price_desc">
                    {t('sort_price_desc')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid - Now loading from Supabase */}
      <section className="flex-1 w-full py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <WorkshopList
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            ageRange={ageRange}
            durationRange={durationRange}
            priceRange={priceRange}
            selectedFormats={selectedFormats}
            sortBy={sortBy}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-bold sm:text-4xl">
              {t('ready')}
            </h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              {t('ready_text')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
              >
                <Link href="/reserver">{t('book_workshop')}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
              >
                <Link href="/contact">{t('get_info')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
