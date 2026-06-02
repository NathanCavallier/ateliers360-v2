'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import PortfolioGallery from '@/components/rewards/PortfolioGallery';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DashboardPortfolioPage() {
  const locale = useLocale();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
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

      const { data: membership } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('user_id', user.id)
        .single();
      const groupId = (membership as any)?.group_id;
      if (!groupId) {
        setProjects([]);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });
      setProjects(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mon portfolio</h1>
          <p className="text-muted-foreground">Projets et réalisations.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projets</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Chargement...</div>
            ) : (
              <PortfolioGallery projects={projects} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
