"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAuthHeaders } from '@/lib/supabase';
import type { ConsentType } from '@/types-accounts';

const CONSENT_LABELS: Record<ConsentType, string> = {
  photos_internal: 'Photos internes (usage interne Ateliers 360)',
  photos_public: 'Photos publiques (site web / communication)',
  videos_internal: 'Vidéos internes',
  videos_public: 'Vidéos publiques',
  pedagogical_data: 'Données pédagogiques',
  newsletter: 'Newsletter',
};

const childConsentSchema = z
  .object({
    photos_internal: z.boolean(),
    photos_public: z.boolean(),
    videos_internal: z.boolean(),
    videos_public: z.boolean(),
    pedagogical_data: z.boolean(),
    newsletter: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!Object.values(data).some(Boolean)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['photos_internal'],
        message: 'Au moins une autorisation doit être cochée.',
      });
    }
  });

type ChildConsentValues = z.infer<typeof childConsentSchema>;

interface ChildConsentFormProps {
  childId: string;
  childName: string;
  initialConsents: Array<{ consent: ConsentType; granted: boolean }>;
  consentPdfPath?: string;
  pdfGeneratedAt?: string;
}

export default function ChildConsentForm({
  childId,
  childName,
  initialConsents,
  consentPdfPath,
  pdfGeneratedAt,
}: ChildConsentFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues: ChildConsentValues = {
    photos_internal: false,
    photos_public: false,
    videos_internal: false,
    videos_public: false,
    pedagogical_data: false,
    newsletter: false,
  };

  initialConsents.forEach((item) => {
    defaultValues[item.consent] = item.granted;
  });

  const form = useForm<ChildConsentValues>({
    resolver: zodResolver(childConsentSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const PdfStatusMessage = consentPdfPath
    ? `PDF RGPD déjà généré. Dernière génération : ${pdfGeneratedAt ? new Date(pdfGeneratedAt).toLocaleDateString('fr-FR') : 'date inconnue'}`
    : 'Aucun PDF RGPD généré pour le moment. Vous pouvez en générer un après avoir sauvegardé les autorisations.';

  async function onSubmit(values: ChildConsentValues) {
    setIsSaving(true);
    setStatus(null);

    const payload = {
      child_id: childId,
      consents: Object.entries(values).map(([type, granted]) => ({
        type,
        granted,
      })),
    };

    try {
      const authHeaders = await getAuthHeaders();
      const response = await fetch('/api/famille/authorizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Impossible de sauvegarder les autorisations.');
      }

      setStatus('Autorisation enregistrée.');
      toast({ title: 'Autorisation enregistrée', description: 'Les autorisations ont été sauvegardées.' });
      router.refresh();
    } catch (error: any) {
      setStatus(error?.message ?? 'Erreur inconnue');
      toast({ title: 'Erreur', description: error?.message ?? 'Erreur inconnue', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  }

  async function downloadStoredPdf() {
    setStatus(null);

    try {
      const authHeaders = await getAuthHeaders();
      const response = await fetch(`/api/famille/children/${childId}/consents/pdf`, {
        method: 'GET',
        headers: authHeaders,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Impossible de récupérer le PDF.');
      }

      window.open(result.url, '_blank');
      toast({ title: 'Téléchargement', description: "Le PDF s'ouvre dans un nouvel onglet." });
    } catch (error: any) {
      setStatus(error?.message ?? 'Erreur lors du téléchargement du PDF');
      toast({ title: 'Erreur', description: error?.message ?? 'Erreur lors du téléchargement du PDF', variant: 'destructive' });
    }
  }

  async function generateAndDownloadPdf() {
    setStatus(null);

    try {
      const authHeaders = await getAuthHeaders();
      const response = await fetch(`/api/famille/children/${childId}/consents/pdf`, {
        method: 'POST',
        headers: authHeaders,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Impossible de générer le PDF.');
      }

      window.open(result.url, '_blank');
      setStatus('PDF généré et stocké avec succès.');
      toast({ title: 'PDF généré', description: "Le PDF a été généré et s'ouvre dans un nouvel onglet." });
    } catch (error: any) {
      setStatus(error?.message ?? 'Erreur lors de la génération du PDF');
      toast({ title: 'Erreur', description: error?.message ?? 'Erreur lors de la génération du PDF', variant: 'destructive' });
    }
  }

  return (
    <Card className="rounded-lg border bg-card shadow-sm">
      <CardHeader>
        <CardTitle>Autorisation RGPD pour {childName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(CONSENT_LABELS) as ConsentType[]).map((consentType) => (
                <FormField
                  key={consentType}
                  control={form.control}
                  name={consentType}
                  render={({ field }) => (
                    <FormItem className="rounded-lg border p-4 hover:border-primary">
                      <FormLabel className="flex items-start gap-3 cursor-pointer">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} aria-label={CONSENT_LABELS[consentType]} />
                        </FormControl>
                        <div>
                          <span className="font-medium">{CONSENT_LABELS[consentType]}</span>
                          <p className="text-sm text-muted-foreground">
                            Autorise {childName} à bénéficier de cette utilisation.
                          </p>
                        </div>
                      </FormLabel>
                      {consentType === 'photos_internal' && <FormMessage />}
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormDescription className="text-sm text-muted-foreground">
              Cochez au moins une autorisation pour que le consentement soit valide.
            </FormDescription>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
              {PdfStatusMessage}
            </div>

            {status && (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                {status}
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-3">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Enregistrement…' : 'Sauvegarder les autorisations'}
              </Button>
              <Button type="button" variant="secondary" onClick={downloadStoredPdf} disabled={!consentPdfPath}>
                {consentPdfPath ? 'Télécharger le PDF stocké' : 'Aucun PDF disponible'}
              </Button>
              <Button type="button" variant="secondary" onClick={generateAndDownloadPdf}>
                Générer et télécharger le PDF
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
