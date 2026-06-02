"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { getAuthHeaders } from '@/lib/supabase';

const childHealthSchema = z.object({
  emergency_contact_name: z.string().min(2, 'Minimum 2 caractères'),
  emergency_contact_phone: z
    .string()
    .regex(/^(?:\+33|0)[1-9](?:[0-9]{8})$/, 'Numéro invalide (ex: 06 12 34 56 78)'),
  doctor_name: z.string().min(2, 'Minimum 2 caractères'),
  allergies: z.string().max(1000, 'Maximum 1000 caractères').optional(),
  pai_required: z.boolean(),
  meds_authorized: z.string().max(1000, 'Maximum 1000 caractères').optional(),
  notes: z.string().max(1000, 'Maximum 1000 caractères').optional(),
});

type ChildHealthFormValues = z.infer<typeof childHealthSchema>;

interface Props {
  childId: string;
  initial?: any;
}

export default function ChildHealthForm({ childId, initial }: Props) {
  const router = useRouter();
  const form = useForm<ChildHealthFormValues>({
    resolver: zodResolver(childHealthSchema),
    defaultValues: {
      emergency_contact_name: initial?.emergency_contact_name || '',
      emergency_contact_phone: initial?.emergency_contact_phone || '',
      doctor_name: initial?.doctor_name || '',
      allergies: Array.isArray(initial?.allergies) ? initial.allergies.join(', ') : initial?.allergies || '',
      pai_required: Boolean(initial?.pai_required),
      meds_authorized: initial?.meds_authorized || '',
      notes: initial?.notes || '',
    },
    mode: 'onBlur',
  });
  const { control, handleSubmit, formState, reset } = form;

  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(values: ChildHealthFormValues) {
    setSaving(true);
    setStatus(null);

    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch(`/api/famille/children/${childId}/health`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(values),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Erreur lors de la sauvegarde.');

      setStatus('Enregistré');
      reset(values);
      router.refresh();
    } catch (err: any) {
      setStatus(err?.message || String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="rounded-lg border bg-card shadow-sm">
      <CardHeader>
        <CardTitle>Infos santé & contacts d'urgence</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={control}
                name="emergency_contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact d'urgence - Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom" {...field} disabled={saving} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="emergency_contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact d'urgence - Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="06 12 34 56 78" {...field} disabled={saving} />
                    </FormControl>
                    <FormDescription>Format: 06 12 34 56 78 ou +33 6 12 34 56 78</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="doctor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Médecin traitant</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du médecin" {...field} disabled={saving} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: gluten, arachides, latex..." {...field} disabled={saving} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="meds_authorized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Médicaments autorisés / notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: autorisation Epipen, Ventoline..." {...field} disabled={saving} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informations complémentaires</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notes complémentaires" {...field} disabled={saving} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="pai_required"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={saving} />
                    </FormControl>
                    <span>PAI (Projet d'Accueil Individualisé) requis</span>
                  </FormLabel>
                  <FormDescription>Indiquez si un PAI est nécessaire pour l'enfant.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {status && (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                {status}
              </div>
            )}

            <div className="flex gap-3 flex-wrap">
              <Button type="submit" disabled={saving}>
                {saving ? 'Enregistrement…' : 'Sauvegarder'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Retour
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
