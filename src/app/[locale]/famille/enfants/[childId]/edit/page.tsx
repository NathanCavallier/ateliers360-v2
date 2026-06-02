'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ChildHealthForm from '@/components/family/ChildHealthForm';
import { getAuthHeaders } from '@/lib/supabase';

export default function EditChildPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params?.childId as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [child, setChild] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!childId) return;
    setLoading(true);

    async function loadChild() {
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`/api/famille/children/${childId}`, {
          headers,
        });
        const json = await response.json();
        setChild(json.child || null);
      } catch (e) {
        setMessage(String(e));
      } finally {
        setLoading(false);
      }
    }

    loadChild();
  }, [childId]);

  async function handleIdentitySave(e: React.FormEvent) {
    e.preventDefault();
    if (!childId || !child) return;
    setSaving(true);
    setMessage(null);
    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch(`/api/famille/children/${childId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({
          first_name: child.first_name,
          last_name: child.last_name,
          birthdate: child.birthdate,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Erreur');
      setMessage('Identité mise à jour');
      router.push(`/${window?.location?.pathname.split('/')[1] || 'fr'}/famille`);
    } catch (err: any) {
      setMessage(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Chargement…</div>;
  if (!child) return <div>Enfant introuvable.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-4">Éditer l’enfant</h1>

      <form onSubmit={handleIdentitySave} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              value={child.first_name || ''}
              onChange={(e) => setChild({ ...child, first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              value={child.last_name || ''}
              onChange={(e) => setChild({ ...child, last_name: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="birthdate">Date de naissance</Label>
            <Input
              id="birthdate"
              type="date"
              value={child.birthdate || ''}
              onChange={(e) => setChild({ ...child, birthdate: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>{saving ? 'Enregistrement…' : 'Sauvegarder identité'}</Button>
          <Button type="button" variant="outline" onClick={() => router.push(`/${window?.location?.pathname.split('/')[1] || 'fr'}/famille`)}>Annuler</Button>
        </div>
      </form>

      <div className="mt-8">
        <ChildHealthForm childId={childId} initial={child} />
      </div>

      {message && <div className="mt-4 rounded-lg border border-border/70 bg-muted p-3">{message}</div>}
    </div>
  );
}
