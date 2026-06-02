'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addEvaluation } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, Send } from 'lucide-react';

interface AddEvaluationFormProps {
  memberId: number;
  onSuccess?: () => void;
}

const evaluationSchema = z.object({
  type: z.enum(['observation', 'feedback', 'grade']),
  content: z.string().min(5, 'Le contenu doit faire au moins 5 caractères').max(2000, 'Maximum 2000 caractères'),
});

type AddEvaluationFormValues = z.infer<typeof evaluationSchema>;

export function AddEvaluationForm({ memberId, onSuccess }: AddEvaluationFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddEvaluationFormValues>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      type: 'observation',
      content: '',
    },
    mode: 'onBlur',
  });

  const { handleSubmit, formState, control, reset } = form;

  async function onSubmit(values: AddEvaluationFormValues) {
    try {
      await addEvaluation({
        member_id: memberId,
        content: values.content,
        type: values.type,
      });
      reset();
      router.refresh();
      if (onSuccess) onSuccess();
      toast({ title: 'Note ajoutée', description: 'Votre évaluation a été enregistrée.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Erreur', description: 'Erreur lors de l\'ajout de la note.', variant: 'destructive' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded-lg bg-card mt-4">
        <h4 className="text-sm font-medium">Ajouter une note</h4>

        <div className="grid gap-4 md:grid-cols-[200px_1fr] items-end">
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="observation">Observation</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="grade">Note</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={formState.isSubmitting} size="sm">
            {formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>

        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Rédigez votre observation ou feedback ici..."
                  {...field}
                  className="min-h-[80px]"
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
