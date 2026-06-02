'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import BadgeList from '@/components/rewards/BadgeList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AccountType } from '@/types-accounts';

export default function DashboardBadgesPage() {
  const t = useTranslations('DashboardBadges');
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabase) return;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }
      setUser(user);

      // Check profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('account_type')
        .eq('id', user.id)
        .maybeSingle();
      const profileType =
        (profile as any)?.account_type ||
        (user.user_metadata as any)?.account_type;
      if (
        profileType !== AccountType.Student &&
        profileType !== AccountType.Learner &&
        profileType !== AccountType.Family
      ) {
        router.push(`/${locale}/dashboard`);
        return;
      }

      // Fetch badge issuances
      const { data } = await supabase
        .from('badge_issuances')
        .select('*, badges(*)')
        .eq('student_id', user.id)
        .order('issued_at', { ascending: false });
      setBadges(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mes badges</h1>
          <p className="text-muted-foreground">
            Liste des badges acquis et preuve d'acquisition.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Badges récents</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Chargement...</div>
            ) : (
              <BadgeList
                badges={badges.map((b) => ({
                  id: b.id,
                  name: b.badges?.name || b.name,
                  description: b.badges?.description || '',
                  image_url: b.badges?.image_url,
                }))}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
