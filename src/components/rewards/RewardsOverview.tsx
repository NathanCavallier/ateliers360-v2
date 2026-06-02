'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

type RewardOverviewResponse = {
  ok: boolean;
  totalBadges: number;
  totalBadgeIssuances: number;
  totalAttestations: number;
  topBadges: Array<{ id: number; name: string; description?: string | null }>;
  source?: 'live' | 'placeholder';
};

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}k`;
  }
  return value.toString();
}

export default function RewardsOverview() {
  const [overview, setOverview] = useState<RewardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/rewards/overview');
        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || 'Impossible de charger les récompenses');
        }

        setOverview(data);
      } catch (err: any) {
        setError(err?.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: 'Badges disponibles',
        value: overview ? formatCount(overview.totalBadges) : '…',
      },
      {
        label: 'Badges attribués',
        value: overview ? formatCount(overview.totalBadgeIssuances) : '…',
      },
      {
        label: 'Attestations émises',
        value: overview ? formatCount(overview.totalAttestations) : '…',
      },
    ],
    [overview]
  );

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm"
          >
            <div className="text-4xl font-semibold text-slate-900">{stat.value}</div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          <Sparkles className="h-4 w-4" />
          Données réelles de récompenses
        </div>
        <div className="mt-4 text-sm text-slate-700">
          {loading && (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" /> Chargement des indicateurs...
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {overview && !error && (
            <>
              <p className="text-sm text-muted-foreground">
                {overview.source === 'placeholder'
                  ? 'Données de démonstration en attendant la configuration de la base de données.'
                  : 'Basé sur les récompenses et attestations réellement stockées dans la base.'}
              </p>
              <div className="mt-4 space-y-3">
                {overview.topBadges.length ? (
                  overview.topBadges.map((badge) => (
                    <div key={badge.id} className="rounded-2xl bg-muted p-4">
                      <div className="font-semibold">{badge.name}</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {badge.description || 'Badge enregistré dans le catalogue.'}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun badge encore défini.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
