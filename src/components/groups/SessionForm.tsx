'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z
  .object({
    date_session: z.string().min(1, "La date est requise"),
    start_time: z.string().min(1, "L'heure de début est requise"),
    end_time: z.string().min(1, "L'heure de fin est requise"),
    title: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.start_time && values.end_time && values.start_time >= values.end_time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end_time'],
        message: "L'heure de fin doit être après l'heure de début.",
      });
    }
  });

type SessionFormValues = z.infer<typeof formSchema>;

interface SessionFormProps {
  onSubmit: (data: SessionFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function SessionForm({ onSubmit, isSubmitting = false }: SessionFormProps) {
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date_session: '',
      start_time: '',
      end_time: '',
      title: '',
      location: '',
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_session"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre (Optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: TP Électronique" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure de début</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure de fin</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Salle A12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                   <Textarea placeholder="Contenu de la séance..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Création..." : "Planifier la session"}
        </Button>
      </form>
    </Form>
  );
}
