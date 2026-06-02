'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

type PendingProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  account_type: string | null;
  metadata?: Record<string, any> | null;
};

export default function AdminVerificationPage() {
  const [profiles, setProfiles] = useState<PendingProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPendingProfiles() {
      const client = supabase;
      if (!client) {
        setError('Supabase client not configured.');
        setLoading(false);
        return;
      }

      const { data, error } = await client
        .from('profiles')
        .select('id, email, full_name, account_type, metadata')
        .eq('is_verified', false)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setProfiles((data || []) as PendingProfile[]);
      }
      setLoading(false);
    }

    loadPendingProfiles();
  }, []);

  const handleVerify = async (profileId: string) => {
    setSavingId(profileId);
    setError(null);

    const client = supabase;
    if (!client) {
      setError('Supabase client not configured.');
      setSavingId(null);
      return;
    }

    const { error } = await client
      .from('profiles')
      .update({ is_verified: true })
      .eq('id', profileId);

    if (error) {
      setError(error.message);
    } else {
      setProfiles((prev) => prev.filter((profile) => profile.id !== profileId));
    }

    setSavingId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Validation des comptes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    {error}
                  </div>
                )}
                {profiles.length === 0 ? (
                  <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
                    Aucun compte en attente de validation.
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Infos</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>{profile.full_name || '—'}</TableCell>
                          <TableCell>{profile.email || '—'}</TableCell>
                          <TableCell>{profile.account_type || '—'}</TableCell>
                          <TableCell>
                            {profile.metadata?.uai_rne && (
                              <div>UAI/RNE : {profile.metadata.uai_rne}</div>
                            )}
                            {profile.metadata?.structure_name && (
                              <div>
                                Structure : {profile.metadata.structure_name}
                              </div>
                            )}
                            {profile.metadata?.center_type && (
                              <div>Type : {profile.metadata.center_type}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              disabled={savingId === profile.id}
                              onClick={() => handleVerify(profile.id)}
                            >
                              {savingId === profile.id
                                ? 'Validation...'
                                : 'Valider'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
