'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateWorkshopContent, AIFormState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Loader2, AlertCircle, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const initialState: AIFormState = undefined;

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-5 w-5" />
      )}
      Generate Content
    </Button>
  );
}

export default function CreateWorkshopForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(generateWorkshopContent, initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveToCatalog = async () => {
    if (!state?.description || !state?.imageUrl || !supabase) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // Parse duration (e.g., "3 hours" -> 3)
      const durationMatch = state.userInput?.duration?.match(/(\d+(\.\d+)?)/);
      const duration = durationMatch ? parseFloat(durationMatch[0]) : 2;

      // Parse objectives (comma separated string -> array)
      const objectives = state.userInput?.learningObjectives
        ? state.userInput.learningObjectives.split(',').map((o: string) => o.trim())
        : [];

      // Generate slug
      const slug = state.userInput?.title
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || `ai-workshop-${Date.now()}`;

      const { data, error } = await (supabase
        .from('ateliers') as any)
        .insert({
          titre: state.userInput?.title || "AI Workshop",
          slug: slug,
          description: state.description,
          public_cible: state.userInput?.targetAudience || "Général",
          duree_heures: duration,
          tarif_eur: 45, // Default price
          objectifs: objectives,
          image_url: state.imageUrl,
          type: 'workshop',
          categorie: 'Sciences',
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setSaveSuccess(true);
      // Wait bit then refresh
      setTimeout(() => {
        router.push('/admin/ateliers');
        router.refresh();
      }, 2000);

    } catch (err: any) {
      console.error('Save error:', err);
      setSaveError(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Workshop Idea</CardTitle>
          <CardDescription>Fill in the details below to generate your workshop content.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Workshop Title</Label>
              <Input id="title" name="title" placeholder="e.g., Mars Rover Challenge" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input id="targetAudience" name="targetAudience" placeholder="e.g., Ages 10-14" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Workshop Duration</Label>
                <Input id="duration" name="duration" placeholder="e.g., 3 hours" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionOutline">Description Outline</Label>
              <Textarea
                id="descriptionOutline"
                name="descriptionOutline"
                placeholder="A brief outline of what the workshop will cover. e.g., Learn about Mars, design a rover, build it with a kit, and complete a navigation mission."
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningObjectives">Learning Objectives</Label>
              <Textarea
                id="learningObjectives"
                name="learningObjectives"
                placeholder="List what students will learn, separated by commas. e.g., Engineering design process, basics of robotics, teamwork, problem-solving."
                className="min-h-[100px]"
                required
              />
            </div>
            <GenerateButton />
          </form>
        </CardContent>
      </Card>

      {state?.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.description && state?.imageUrl && (
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Sparkles className="text-yellow-500" />
              Generated Content
            </CardTitle>
            <CardDescription>Here is the AI-generated content for your workshop.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-lg font-semibold">Generated Image</Label>
              <div className="mt-2 relative w-full aspect-video rounded-lg border bg-muted overflow-hidden">
                {state.imageUrl ? (
                   <Image src={state.imageUrl} alt="Generated workshop image" fill objectFit="cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ImageIcon className="h-10 w-10"/>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label className="text-lg font-semibold">Generated Description</Label>
              <div className="mt-2 p-4 border rounded-lg bg-gray-50 text-sm whitespace-pre-wrap font-body">
                {state.description}
              </div>
            </div>

            {/* Save Actions */}
            <div className="pt-4 border-t space-y-4">
              {saveError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{saveError}</AlertDescription>
                </Alert>
              )}
              {saveSuccess && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>Atelier enregistré avec succès ! Redirection...</AlertDescription>
                </Alert>
              )}
              <Button
                onClick={handleSaveToCatalog}
                disabled={isSaving || saveSuccess}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Save className="mr-2 h-5 w-5" />
                )}
                Enregistrer dans le Catalogue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
