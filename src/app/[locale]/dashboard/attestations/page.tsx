'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CertificateViewer from '@/components/rewards/CertificateViewer';
import { AccountType } from '@/types-accounts';

export default function DashboardAttestationsPage() {
  const locale = useLocale();
  const router = useRouter();
  const [attestations, setAttestations] = useState<any[]>([]);
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

      const { data } = await supabase
        .from('attestations')
        .select('*')
        .eq('student_id', user.id)
        .order('issued_at', { ascending: false });
      setAttestations(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mes attestations</h1>
          <p className="text-muted-foreground">
            Téléchargez ou partagez vos attestations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attestations</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Chargement...</div>
            ) : attestations.length === 0 ? (
              <div>Aucune attestation</div>
            ) : (
              <ul className="space-y-4">
                {attestations.map((a) => (
                  <li key={a.id} className="rounded border p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">
                          {a.workshop_title || a.workshop}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(a.issued_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={a.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm underline"
                        >
                          Télécharger
                        </a>
                        <button className="btn">Partager</button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <CertificateViewer pdfUrl={a.pdf_url} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
