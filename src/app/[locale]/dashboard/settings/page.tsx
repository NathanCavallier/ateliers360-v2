'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AccountType } from '@/types-accounts';

const ACCOUNT_TYPE_NONE = 'none';

const profileSchema = z.object({
  full_name: z.string().min(2, {
    message: 'Le nom complet doit contenir au moins 2 caractères.',
  }),
  account_type: z.string().optional(),
});

type DashboardSettingsFormValues = z.infer<typeof profileSchema>;

export default function DashboardSettingsPage() {
  const t = useTranslations('DashboardSettingsPage');
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const form = useForm<DashboardSettingsFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      account_type: ACCOUNT_TYPE_NONE,
    },
  });

  useEffect(() => {
    async function loadProfile() {
      const client = supabase;
      if (!client) {
        router.push(`/${locale}/login`);
        return;
      }

      const { data: authData } = await client.auth.getUser();
      const user = authData?.user;

      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }

      setEmail(user.email || '');

      const { data, error } = await client
        .from('profiles')
        .select('full_name, account_type')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        setStatusMessage(t('error_message'));
      } else if (data) {
        form.reset({
          full_name: data.full_name || '',
          account_type: data.account_type ?? ACCOUNT_TYPE_NONE,
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, [form, locale, router, t]);

  async function onSubmit(values: DashboardSettingsFormValues) {
    setIsSubmitting(true);
    setStatusMessage(null);

    const client = supabase;
    if (!client) {
      router.push(`/${locale}/login`);
      return;
    }

    const { data: authData } = await client.auth.getUser();
    const user = authData?.user;

    if (!user) {
      router.push(`/${locale}/login`);
      return;
    }

    try {
      const { error } = await client
        .from('profiles')
        .update({
          full_name: values.full_name,
          account_type:
            values.account_type === ACCOUNT_TYPE_NONE
              ? null
              : (values.account_type as AccountType),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setStatusMessage(t('success_message'));
    } catch (error) {
      console.error('Error saving profile:', error);
      setStatusMessage(t('error_message'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            {t('profile_settings_title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('profile_settings_subtitle')}
          </p>
        </div>

        <Card className="rounded-lg border bg-card shadow-sm">
          <CardContent className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <span className="text-muted-foreground">{t('saving')}</span>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('full_name_label')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('full_name_label')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="account_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('account_type_label')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ACCOUNT_TYPE_NONE}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t('account_type_placeholder')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={ACCOUNT_TYPE_NONE}>
                              {t('account_type_placeholder')}
                            </SelectItem>
                            <SelectItem value={AccountType.Family}>
                              Famille
                            </SelectItem>
                            <SelectItem value={AccountType.Establishment}>
                              Établissement
                            </SelectItem>
                            <SelectItem value={AccountType.Center}>
                              Centre de loisirs
                            </SelectItem>
                            <SelectItem value={AccountType.Animator}>
                              Animateur
                            </SelectItem>
                            <SelectItem value={AccountType.Learner}>
                              Apprenant
                            </SelectItem>
                            <SelectItem value={AccountType.Other}>
                              Autre
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>{t('email_label')}</FormLabel>
                    <FormControl>
                      <Input value={email} disabled />
                    </FormControl>
                  </FormItem>

                  {statusMessage && (
                    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                      {statusMessage}
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('saving') : t('save_button')}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
