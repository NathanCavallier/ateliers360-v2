'use client';

import * as React from 'react';
import WorkshopList from '@/components/workshops/WorkshopList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import { getWorkshops } from '@/lib/supabase';
import { Workshop } from '@/lib/types';

interface AtelierListPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function AtelierListClient({ searchParams }: AtelierListPageProps) {
  const t = useTranslations('Workshops');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ageRange, setAgeRange] = useState<[number, number]>([6, 18]);
  const [durationRange, setDurationRange] = useState<[number, number]>([1, 8]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  const resolvedSearchParams = React.use(searchParams) as { category?: string };
  const categoryFromSearchParams = resolvedSearchParams?.category;

  useEffect(() => {
    if (categoryFromSearchParams) {
      setSelectedCategory(categoryFromSearchParams);
    }
  }, [categoryFromSearchParams]);

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const data = await getWorkshops();
        setWorkshops((data || []).slice(0, 6).map((item) => item));
      } catch (error) {
        console.error('Error loading featured workshops:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkshops();
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-14 md:py-24 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
            alt={t('hero_image_alt')}
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-10 shadow-2xl">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-4 text-lg text-slate-200/90 max-w-2xl leading-relaxed">
              {t('hero_subtitle')}
            </p>
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

      <section className="w-full py-6 border-b bg-muted/50 sticky top-0 z-20 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
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
                    <SelectItem value="price_asc">{t('sort_price_asc')}</SelectItem>
                    <SelectItem value="price_desc">{t('sort_price_desc')}</SelectItem>
                    <SelectItem value="duration_asc">{t('sort_duration_asc')}</SelectItem>
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

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {t('age_range')}
                </Label>
                <Slider
                  value={ageRange}
                  onValueChange={setAgeRange}
                  min={6}
                  max={18}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t('duration')}</Label>
                <Slider
                  value={durationRange}
                  onValueChange={setDurationRange}
                  min={1}
                  max={8}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t('price')}</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={3500}
                  step={50}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">{t('formats')}</Label>
                <div className="grid gap-2">
                  {formats.map((format) => (
                    <Button
                      key={format.id}
                      variant={selectedFormats.includes(format.id) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleFormat(format.id)}
                    >
                      {format.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {t('filters')}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {showFilters && (
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t('category')}</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>{t('select_category')}</SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all_workshops')}</SelectItem>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t('sort_by')}</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>{t('sort_by')}</SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('sort_newest')}</SelectItem>
                      <SelectItem value="oldest">{t('sort_oldest')}</SelectItem>
                      <SelectItem value="popular">{t('sort_popular')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-[300px] rounded-xl bg-slate-200 animate-pulse" />
                  <div className="h-6 w-3/4 rounded bg-slate-200 animate-pulse" />
                  <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
                </div>
              ))
            ) : (
              workshops.map((workshop) => (
                <WorkshopList key={workshop.id} workshop={workshop} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
