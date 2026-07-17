'use client';

import { useEffect, useMemo, useState } from 'react';
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
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { MultiDatePicker } from './MultiDatePicker';
import { MultiWorkshopSelector } from './MultiWorkshopSelector';
import { WorkshopDB } from '@/lib/types';
import { cn } from '@/lib/utils';

type ReservationFormDataAdvanced = {
  atelier_ids: number[];
  dates: Date[];
  nom: string;
  email: string;
  etablissement?: string;
  adresse?: string;
  participants_count: number;
  message?: string;
  cgv_accepted: boolean;
  paymentMode: 'payment' | 'reserve';
};

type ReservationFormAdvancedProps = {
  ateliers: WorkshopDB[];
  defaultAtelierId?: number;
  defaultAtelierIds?: number[];
};

export default function ReservationFormAdvanced({
  ateliers,
  defaultAtelierId,
  defaultAtelierIds,
}: ReservationFormAdvancedProps) {
  const t = useTranslations('ReservationForm');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const initialAtelierIds = useMemo(() => {
    if (defaultAtelierIds?.length) return defaultAtelierIds;
    if (defaultAtelierId) return [defaultAtelierId];
    return [];
  }, [defaultAtelierId, defaultAtelierIds]);

  const reservationSchema = z.object({
    atelier_ids: z.array(z.number()).min(1, 'Sélectionnez au moins un atelier'),
    dates: z.array(z.date()).min(1, 'Sélectionnez au moins une date'),
    nom: z.string().min(2, t('name_min_error')),
    email: z.string().email(t('email_error')),
    etablissement: z.string().optional(),
    adresse: z.string().optional(),
    participants_count: z.coerce
      .number()
      .min(1, t('participants_min_error'))
      .max(50, t('participants_max_error')),
    message: z.string().optional(),
    cgv_accepted: z.boolean().refine((val) => val === true, {
      message: t('cgv_required'),
    }),
    paymentMode: z.enum(['payment', 'reserve']),
  });

  const form = useForm<ReservationFormDataAdvanced>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      atelier_ids: initialAtelierIds,
      dates: [],
      nom: '',
      email: '',
      etablissement: '',
      adresse: '',
      participants_count: 1,
      message: '',
      cgv_accepted: false,
      paymentMode: 'payment',
    },
  });

  useEffect(() => {
    if (initialAtelierIds.length > 0) {
      form.setValue('atelier_ids', initialAtelierIds, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [form, initialAtelierIds]);

  const selectedAteliers = form.watch('atelier_ids');
  const selectedDates = form.watch('dates');
  const selectedAtelierDetails = ateliers.filter((a) =>
    selectedAteliers.includes(a.id)
  );
  const totalPrice = selectedAtelierDetails.reduce((sum, a) => sum + a.tarif_eur, 0);
  const totalReservations = selectedAteliers.length * selectedDates.length;
  const canReserveWithoutPayment = selectedAtelierDetails.some((atelier) =>
    atelier.type === 'pack' ||
    atelier.type === 'module' ||
    /trimestriel|annuel|semestriel/i.test(atelier.format || '') ||
    selectedDates.length > 1,
  );
  const paymentFlowEnabled = false;

  async function onSubmit(data: ReservationFormDataAdvanced) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Créer les réservations individuelles
      const reservations = [];
      for (const atelierId of data.atelier_ids) {
        for (const date of data.dates) {
          reservations.push({
            atelier_id: atelierId,
            nom: data.nom,
            email: data.email,
            etablissement: data.etablissement || undefined,
            adresse: data.adresse || undefined,
            participants_count: data.participants_count,
            date_atelier: format(date, 'yyyy-MM-dd'),
          });
        }
      }

      // Étape 1: Créer les réservations
      const response = await fetch('/api/reservations/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservations,
          paymentMode: data.paymentMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Échec de la création des réservations'
        );
      }

      const { groupId, paymentMode } = await response.json();

      setSubmitStatus('success');
      setIsSubmitting(false);
      return;
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
    <div className="w-full space-y-6">
      {submitStatus === 'success' && (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">
            Réservation bien reçue
          </AlertTitle>
          <AlertDescription className="text-green-600">
            <div className="space-y-2">
              <p>
                Votre demande de réservation a bien été enregistrée. Un e-mail de confirmation a été envoyé à votre adresse et une copie a été transmise à notre équipe Ateliers 360.
              </p>
              <p>
                Nous reviendrons vers vous rapidement pour valider les détails de votre réservation et vous accompagner dans la suite du processus.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="border-red-500 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600">{t('error_title')}</AlertTitle>
          <AlertDescription className="text-red-600">
            {errorMessage || t('error_message')}
          </AlertDescription>
        </Alert>
      )}

      {/* Résumé */}
      {(selectedAteliers.length > 0 || selectedDates.length > 0) && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Récapitulatif de votre réservation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-muted-foreground">Ateliers</p>
                <p className="text-2xl font-bold text-primary">
                  {selectedAteliers.length}
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-muted-foreground">Dates</p>
                <p className="text-2xl font-bold text-primary">
                  {selectedDates.length}
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-muted-foreground">Total à réserver</p>
                <p className="text-2xl font-bold text-primary">
                  {totalReservations}
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-muted-foreground">Prix total</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalPrice}€
                </p>
              </div>
            </div>

            {selectedAtelierDetails.length > 0 && (
              <div className="grid gap-3">
                {selectedAtelierDetails.map((atelier) => (
                  <div
                    key={atelier.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {atelier.titre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {atelier.duree_heures}h • {atelier.public_cible}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {atelier.tarif_eur}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalReservations > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Vous réservez {totalReservations} place{totalReservations > 1 ? 's' : ''}
                  ({selectedAteliers.length} atelier{selectedAteliers.length > 1 ? 's' : ''} ×{' '}
                  {selectedDates.length} date{selectedDates.length > 1 ? 's' : ''})
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Sélection des ateliers */}
          <FormField
            control={form.control}
            name="atelier_ids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ateliers</FormLabel>
                <FormControl>
                  <MultiWorkshopSelector
                    ateliers={ateliers}
                    selectedAteliers={field.value}
                    onSelectionChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Sélectionnez un ou plusieurs ateliers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sélection des dates */}
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dates</FormLabel>
                <FormControl>
                  <MultiDatePicker
                    selectedDates={field.value}
                    onDatesChange={field.onChange}
                    placeholder="Sélectionnez une ou plusieurs dates..."
                  />
                </FormControl>
                <FormDescription>
                  Sélectionnez une ou plusieurs dates pour votre réservation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {paymentFlowEnabled && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold">Mode de réservation</h3>
              <p className="text-sm text-muted-foreground">
                {canReserveWithoutPayment
                  ? 'Pour ce type de réservation, vous pouvez soit payer maintenant, soit réserver sans paiement immédiat.'
                  : 'Le paiement immédiat est requis pour valider cette réservation.'}
              </p>

              <div className="grid gap-3 md:grid-cols-2 mt-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-primary/80">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="payment"
                    checked={form.watch('paymentMode') === 'payment'}
                    onChange={() => form.setValue('paymentMode', 'payment')}
                    className="h-4 w-4"
                  />
                  <div>
                    <div className="font-semibold">Payer maintenant</div>
                    <div className="text-sm text-muted-foreground">Validation immédiate par Stripe.</div>
                  </div>
                </label>

                <label className={"flex cursor-pointer items-center gap-3 rounded-lg border p-3 " + (canReserveWithoutPayment ? 'hover:border-primary/80' : 'cursor-not-allowed opacity-50')}>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="reserve"
                    checked={form.watch('paymentMode') === 'reserve'}
                    onChange={() => canReserveWithoutPayment && form.setValue('paymentMode', 'reserve')}
                    disabled={!canReserveWithoutPayment}
                    className="h-4 w-4"
                  />
                  <div>
                    <div className="font-semibold">Réserver sans paiement immédiat</div>
                    <div className="text-sm text-muted-foreground">Réservation validée maintenant, paiement différé ou devis ultérieur.</div>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informations personnelles</h3>

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
                    Nombre de participants pour chaque atelier
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Des questions ou des remarques particulières..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* CGV */}
          <FormField
            control={form.control}
            name="cgv_accepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    J&apos;accepte les{' '}
                    <a
                      href="/cgv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      conditions générales de vente
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={
              isSubmitting || selectedAteliers.length === 0 || selectedDates.length === 0
            }
            className="w-full"
            size="lg"
          >
            {isSubmitting
              ? 'Traitement...'
              : 'Envoyer la réservation'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
