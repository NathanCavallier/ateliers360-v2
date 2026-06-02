import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

const PLACEHOLDER_OVERVIEW = {
  ok: true,
  totalBadges: 24,
  totalBadgeIssuances: 18,
  totalAttestations: 6,
  topBadges: [
    {
      id: 1,
      name: 'Badge explorateur',
      description: 'Récompense les premiers utilisateurs actifs.',
    },
    {
      id: 2,
      name: 'Badge collaborateur',
      description: 'Attribué aux premiers contributeurs du catalogue.',
    },
    {
      id: 3,
      name: 'Badge mentor',
      description: 'Donné aux formateurs qui aident la communauté.',
    },
    {
      id: 4,
      name: 'Badge ambassadeur',
      description: 'Récompense la promotion des ateliers auprès des pairs.',
    },
  ],
  source: 'placeholder' as const,
};

async function getCount(table: string) {
  const { count, error } = await supabaseAdmin
    .from(table)
    .select('id', { count: 'exact', head: true });

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function GET() {
  try {
    const [totalBadges, totalBadgeIssuances, totalAttestations, topBadges] =
      await Promise.all([
        getCount('badges'),
        getCount('badge_issuances'),
        getCount('attestations'),
        supabaseAdmin
          .from('badges')
          .select('id, name, description')
          .order('created_at', { ascending: false })
          .limit(4)
          .then(({ data, error }) => {
            if (error) throw error;
            return data || [];
          }),
      ]);

    return NextResponse.json({
      ok: true,
      totalBadges,
      totalBadgeIssuances,
      totalAttestations,
      topBadges,
      source: 'live',
    });
  } catch (error: any) {
    console.error('Failed to load rewards overview:', error);
    return NextResponse.json(PLACEHOLDER_OVERVIEW);
  }
}
