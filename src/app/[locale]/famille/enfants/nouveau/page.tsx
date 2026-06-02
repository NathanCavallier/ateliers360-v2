'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getAuthHeaders } from '@/lib/supabase';

const initialFormState = {
  first_name: '',
  last_name: '',
  birthdate: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  doctor_name: '',
  other_allergies: '',
  meds_authorized: '',
  pai_required: false,
  notes: '',
};

export default function NewChildPage() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'fr';

  function handleChange(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/famille/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Erreur');

      setMessage('Enfant ajouté');
      setForm(initialFormState);
      router.push(`/${locale}/famille`);
    } catch (err: any) {
      setMessage(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Ajouter un enfant</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Renseignez le profil et les informations santé pour préparer l’accueil de l’enfant.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              value={form.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              value={form.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="birthdate">Date de naissance</Label>
            <Input
              id="birthdate"
              type="date"
              value={form.birthdate}
              onChange={(e) => handleChange('birthdate', e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_name">Contact d’urgence</Label>
            <Input
              id="emergency_contact_name"
              value={form.emergency_contact_name}
              onChange={(e) => handleChange('emergency_contact_name', e.target.value)}
              placeholder="Nom"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency_contact_phone">Téléphone d’urgence</Label>
            <Input
              id="emergency_contact_phone"
              value={form.emergency_contact_phone}
              onChange={(e) => handleChange('emergency_contact_phone', e.target.value)}
              placeholder="Téléphone"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="doctor_name">Médecin traitant</Label>
            <Input
              id="doctor_name"
              value={form.doctor_name}
              onChange={(e) => handleChange('doctor_name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="other_allergies">Allergies / restrictions</Label>
            <Input
              id="other_allergies"
              value={form.other_allergies}
              onChange={(e) => handleChange('other_allergies', e.target.value)}
              placeholder="Ex : arachides, gluten, latex..."
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="meds_authorized">Médicaments autorisés</Label>
            <Input
              id="meds_authorized"
              value={form.meds_authorized}
              onChange={(e) => handleChange('meds_authorized', e.target.value)}
              placeholder="Ex : Epipen, Ventoline..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes santé / accueil</Label>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Précisions sur l’accueil, besoins ou remarques"
            rows={4}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="pai_required"
            type="checkbox"
            checked={form.pai_required}
            onChange={(e) => handleChange('pai_required', e.target.checked)}
            aria-label="PAI requis"
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="pai_required" className="cursor-pointer">
            PAI (Projet d&apos;Accueil Individualisé) requis
          </Label>
        </div>

        {message && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
            {message}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={loading}>
            {loading ? 'Enregistrement…' : 'Ajouter l’enfant'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/famille`)}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
