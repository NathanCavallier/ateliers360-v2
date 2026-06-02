'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ReservationFormAdvanced from '@/components/reservations/ReservationFormAdvanced';
import { getWorkshops } from '@/lib/supabase';
import type { WorkshopDB } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Euro, Lightbulb, Users } from 'lucide-react';

export default function ReserverPage() {
  const t = useTranslations('ReservationForm');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const atelierParam = searchParams.get('atelier');
  const atelierId = atelierParam ? parseInt(atelierParam, 10) : undefined;
  const isValidAtelierId = atelierParam !== null && !Number.isNaN(atelierId);

  const [ateliers, setAteliers] = useState<WorkshopDB[]>([]);
  const [selectedAtelier, setSelectedAtelier] = useState<WorkshopDB | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'workshop' | 'module' | 'pack'>('all');
  const [loadError, setLoadError] = useState('');

  const filteredAteliers = useMemo(() => {
    const term = query.trim().toLowerCase();
    return ateliers.filter((atelier) => {
      const matchesType = selectedType === 'all' || atelier.type === selectedType;
      if (!matchesType) return false;

      if (!term) return true;

      return [atelier.titre, atelier.description, atelier.public_cible]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [ateliers, query, selectedType]);

  useEffect(() => {
    async function loadAteliers() {
      try {
        const data = await getWorkshops();
        setAteliers(data);

        if (isValidAtelierId) {
          const selected = data.find((a) => a.id === atelierId);
          if (selected) {
            setSelectedAtelier(selected);
          }
        }
      } catch (error) {
        console.error('Erreur chargement ateliers:', error);
        setLoadError(
          'Impossible de charger les ateliers pour le moment. Veuillez réessayer plus tard.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadAteliers();
  }, [atelierId, isValidAtelierId]);

  const handleAtelierSelect = (atelier: WorkshopDB) => {
    setSelectedAtelier(atelier);
  };

  const getTypeLabel = (type?: WorkshopDB['type']) => {
    switch (type) {
      case 'module':
        return {
          label: 'Module de Formation',
          color: 'bg-purple-100 text-purple-800',
        };
      case 'pack':
        return { label: 'Pack Groupé', color: 'bg-green-100 text-green-800' };
      default:
        return {
          label: 'Atelier Classique',
          color: 'bg-blue-100 text-blue-800',
        };
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="w-full overflow-hidden bg-slate-950 py-12 text-white sm:py-16">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary via-primary/90 to-slate-900 p-8 md:p-12 shadow-2xl shadow-slate-950/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_35%)]" />
            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                Réservations simplifiées • Multi-ateliers • Dates flexibles
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Réservez un atelier pédagogique avec un parcours clair et professionnel
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
                Découvrez nos ateliers, comparez les formats, choisissez vos dates et finalisez votre réservation en quelques clics.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">Flexibilité</p>
                  <p className="mt-3 text-lg font-semibold text-white">Dates multiples</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">Transparence</p>
                  <p className="mt-3 text-lg font-semibold text-white">Tarifs clairs</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">Accompagnement</p>
                  <p className="mt-3 text-lg font-semibold text-white">Support dédié</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="w-full py-12 md:py-20 flex-1 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 xl:grid-cols-[380px_minmax(0,1fr)]">
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Nos ateliers</p>
                      <p className="mt-1 text-sm text-slate-500">Filtrez et comparez en quelques secondes.</p>
                    </div>
                    <Badge className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                      {ateliers.length} disponibles
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Rechercher un atelier..."
                      className="bg-slate-100"
                    />

                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: 'all', label: 'Tous' },
                        { key: 'workshop', label: 'Atelier' },
                        { key: 'module', label: 'Module' },
                        { key: 'pack', label: 'Pack' },
                      ].map((option) => (
                        <Button
                          key={option.key}
                          variant={selectedType === option.key ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedType(option.key as 'all' | 'workshop' | 'module' | 'pack')}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {loadError ? (
                  <Alert>
                    <AlertDescription>{loadError}</AlertDescription>
                  </Alert>
                ) : loading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <Skeleton key={item} className="h-28 w-full rounded-3xl" />
                    ))}
                  </div>
                ) : filteredAteliers.length === 0 ? (
                  <Alert>
                    <AlertDescription>Aucun atelier ne correspond à votre recherche.</AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2">
                    {filteredAteliers.map((atelier) => (
                      <Card
                        key={atelier.id}
                        className={`cursor-pointer border transition-all duration-200 ${
                          selectedAtelier?.id === atelier.id
                            ? 'border-primary bg-primary/5 shadow-lg'
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                        onClick={() => handleAtelierSelect(atelier)}
                      >
                        <CardHeader className="space-y-3 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <CardTitle className="text-sm font-semibold line-clamp-2">
                                {atelier.titre}
                              </CardTitle>
                              <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                                {atelier.description}
                              </p>
                            </div>
                            <Badge className={`${getTypeLabel(atelier.type).color} rounded-full px-2 py-1 text-xs`}>
                              {getTypeLabel(atelier.type).label.split(' ')[0]}
                            </Badge>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {atelier.duree_heures}h
                            </div>
                            <div className="flex items-center gap-2">
                              <Euro className="h-4 w-4" />
                              {atelier.tarif_eur}€
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {selectedAtelier ? (
                  <>
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h2 className="text-3xl font-semibold text-slate-900">{selectedAtelier.titre}</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {selectedAtelier.description}
                          </p>
                        </div>
                        <Badge className={`${getTypeLabel(selectedAtelier.type).color} rounded-full px-3 py-1 text-sm`}>
                          {getTypeLabel(selectedAtelier.type).label}
                        </Badge>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl bg-slate-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Durée</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">{selectedAtelier.duree_heures}h</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tarif</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">{selectedAtelier.tarif_eur}€</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Public</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">{selectedAtelier.public_cible}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Matériel</p>
                          <p className="mt-2 text-xl font-semibold text-slate-900">{selectedAtelier.materiel ? 'Inclus' : 'À prévoir'}</p>
                        </div>
                      </div>

                      {selectedAtelier.objectifs?.length ? (
                        <div className="mt-6 rounded-3xl bg-slate-50 p-6">
                          <h3 className="text-base font-semibold text-slate-900">Objectifs d'apprentissage</h3>
                          <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            {selectedAtelier.objectifs.map((objectif, index) => (
                              <li key={index} className="flex gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                <span>{objectif}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
                      <h2 className="text-2xl font-semibold text-slate-900">Complétez votre réservation</h2>
                      <p className="mt-3 text-sm text-slate-500">
                        Le formulaire ci-dessous récupère automatiquement l’atelier sélectionné. Ajoutez vos dates, votre groupe et finalisez votre réservation.
                      </p>
                      <div className="mt-6">
                        <ReservationFormAdvanced
                          ateliers={ateliers}
                          defaultAtelierId={selectedAtelier.id}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm shadow-slate-900/5">
                    <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <BookOpen className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-slate-900">Sélectionnez un atelier</h3>
                    <p className="mt-3 text-sm text-slate-500">
                      Choisissez un atelier à gauche pour afficher les détails et lancer la réservation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
