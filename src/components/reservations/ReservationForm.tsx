'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

type ReservationFormData = {
  atelier_id: string;
  nom: string;
  email: string;
  etablissement?: string;
  adresse?: string;
  participants_count: number;
  date_atelier: Date;
  message?: string;
  cgv_accepted: boolean;
};

type ReservationFormProps = {
  ateliers?: Array<{
    id: number;
    titre: string;
    slug: string;
  }>;
  defaultAtelierId?: number;
};

export default function ReservationForm({
  ateliers = [],
  defaultAtelierId,
}: ReservationFormProps) {
  const t = useTranslations('ReservationForm');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const reservationSchema = z.object({
    atelier_id: z.string().min(1, t('workshop_placeholder')),
    nom: z.string().min(2, t('name_min_error')),
    email: z.string().email(t('email_error')),
    etablissement: z.string().optional(),
    adresse: z.string().optional(),
    participants_count: z.coerce
      .number()
      .min(1, t('participants_min_error'))
      .max(50, t('participants_max_error')),
    date_atelier: z.date({
      required_error: t('date_error'),
    }),
    message: z.string().optional(),
    cgv_accepted: z.boolean().refine((val) => val === true, {
      message: t('cgv_required'),
    }),
  });

  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      atelier_id: defaultAtelierId?.toString() || '',
      nom: '',
      email: '',
      etablissement: '',
      adresse: '',
      participants_count: 1,
      message: '',
      cgv_accepted: false,
    },
  });

  async function onSubmit(data: ReservationFormData) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Conversion de la date en format YYYY-MM-DD
      const dateStr = format(data.date_atelier, 'yyyy-MM-dd');

      const reservationData = {
        atelier_id: parseInt(data.atelier_id),
        nom: data.nom,
        email: data.email,
        etablissement: data.etablissement || undefined,
        adresse: data.adresse || undefined,
        participants_count: data.participants_count,
        date_atelier: dateStr,
      };

      // Étape 1: Créer la réservation
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Échec de la création de la réservation');
      }

      const { reservation } = await response.json();

      // Étape 2: Créer la session de paiement Stripe
      const checkoutResponse = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationId: reservation.id,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error('Échec de la création de la session de paiement');
      }

      const { url } = await checkoutResponse.json();

      // Rediriger vers la page de paiement Stripe
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('URL de paiement manquante');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {submitStatus === 'success' && (
        <Alert className="mb-6 border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">
            {t('success_title')}
          </AlertTitle>
          <AlertDescription className="text-green-600">
            {t('success_message')}
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="mb-6 border-red-500 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600">{t('error_title')}</AlertTitle>
          <AlertDescription className="text-red-600">
            {errorMessage || t('error_message')}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Sélection de l'atelier */}
          <FormField
            control={form.control}
            name="atelier_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('workshop')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('workshop_placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ateliers.map((atelier) => (
                      <SelectItem
                        key={atelier.id}
                        value={atelier.id.toString()}
                      >
                        {atelier.titre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nom */}
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('name_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('email_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Établissement (optionnel) */}
          <FormField
            control={form.control}
            name="etablissement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('institution')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('institution_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('institution_optional')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Adresse (optionnel) */}
          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('address')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('address_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('address_optional')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nombre de participants */}
          <FormField
            control={form.control}
            name="participants_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('participants')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="1"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('participants_description')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date de l'atelier */}
          <FormField
            control={form.control}
            name="date_atelier"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('date')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: fr })
                        ) : (
                          <span>{t('date_placeholder')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>{t('date_description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message optionnel */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('message')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('message_placeholder')}
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t('message_optional')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Acceptation des CGV */}
          <FormField
            control={form.control}
            name="cgv_accepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                    aria-label={t('cgv_accepted')}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">
                    {t('cgv_accepted')} *
                  </FormLabel>
                  <FormDescription className="text-xs">
                    {t.rich('cgv_accepted_text', {
                      cgvLink: (chunks) => (
                        <a
                          href={`/${locale}/cgv`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary underline hover:text-primary/80"
                        >
                          {chunks}
                        </a>
                      ),
                    })}
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
