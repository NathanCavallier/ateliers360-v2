'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database } from '@/lib/types';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom du groupe doit contenir au moins 2 caractères.",
  }),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé', 'Mixte']).optional(),
  age_range: z.string().optional(),
  establishment: z.string().optional(),
  main_theme: z.enum(['Robotique', 'Programmation', 'IA & IoT', 'Culture Numérique', 'Généraliste']).optional(),
});

type GroupFormValues = z.infer<typeof formSchema>;

interface GroupFormProps {
  initialData?: Database['public']['Tables']['groups']['Row'];
  onSubmit: (data: GroupFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function GroupForm({ initialData, onSubmit, isSubmitting = false }: GroupFormProps) {
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      level: initialData?.level as GroupFormValues['level'] | undefined,
      age_range: initialData?.age_range || undefined,
      establishment: initialData?.establishment || undefined,
      main_theme: initialData?.main_theme as GroupFormValues['main_theme'] | undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du Groupe</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Club Robotique Mercredi" {...field} />
              </FormControl>
              <FormDescription>
                Le nom affiché sur le planning et les dossiers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Niveau</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Avancé">Avancé</SelectItem>
                      <SelectItem value="Mixte">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Permet de catégoriser le groupe par niveau.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tranche d'âge</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 8-10 ans" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <FormField
            control={form.control}
            name="establishment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Établissement (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: École Pasteur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="main_theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thématique Principale</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une thématique" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Robotique">Robotique</SelectItem>
                      <SelectItem value="Programmation">Programmation</SelectItem>
                      <SelectItem value="IA & IoT">IA & IoT</SelectItem>
                      <SelectItem value="Culture Numérique">Culture Numérique</SelectItem>
                      <SelectItem value="Généraliste">Généraliste</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Thématique principale de ce groupe.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : (initialData ? "Mettre à jour" : "Créer le groupe")}
        </Button>
      </form>
    </Form>
  );
}
