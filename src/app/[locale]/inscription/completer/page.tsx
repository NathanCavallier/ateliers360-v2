'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import AccountTypePicker from '@/components/accounts/AccountTypePicker';
import { AccountType } from '@/types-accounts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const DEFAULT_FORM = {
  full_name: '',
  phone: '',
  address: '',
  uai_rne: '',
  structure_name: '',
  responsible_name: '',
  center_type: '',
  agrement_number: '',
  organization_name: '',
  school_name: '',
  class_level: '',
  children_count: '',
  emergency_contact: '',
  notes: '',
};

type OnboardingFormState = typeof DEFAULT_FORM;

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  [AccountType.Family]: 'Famille',
  [AccountType.Establishment]: 'Établissement',
  [AccountType.Center]: 'Centre de loisirs',
  [AccountType.Animator]: 'Animateur',
  [AccountType.Learner]: 'Apprenant',
  [AccountType.Student]: 'Apprenant',
  [AccountType.Other]: 'Autre',
};

const ACCOUNT_TYPE_HELPERS: Record<AccountType, string> = {
  [AccountType.Family]:
    'Espace parent : ajoutez vos coordonnées et les informations clés pour vos enfants.',
  [AccountType.Establishment]:
    'Espace établissement : renseignez votre UAI/RNE, le responsable pédagogique et les contacts.',
  [AccountType.Center]:
    'Espace centre de loisirs : précisez le type de centre, l’agrément et vos coordonnées.',
  [AccountType.Animator]:
    'Espace animateur : indiquez votre organisation et vos coordonnées pour être contacté.',
  [AccountType.Learner]:
    'Espace apprenant : renseignez votre établissement et votre niveau scolaire.',
  [AccountType.Student]:
    'Espace apprenant : renseignez votre établissement et votre niveau scolaire.',
  [AccountType.Other]:
    'Espace personnalisé : complétez les informations nécessaires selon votre situation.',
};

export default function InscriptionCompleterPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.Family
  );
  const [formData, setFormData] = useState<OnboardingFormState>(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);

  const selectedAccountType = useMemo(() => {
    const type = searchParams.get('account_type');
    if (
      type === AccountType.Family ||
      type === AccountType.Establishment ||
      type === AccountType.Center ||
      type === AccountType.Animator ||
      type === AccountType.Learner ||
      type === AccountType.Student ||
      type === AccountType.Other
    ) {
      return type === AccountType.Student ? AccountType.Learner : type;
    }
    return AccountType.Family;
  }, [searchParams]);

  useEffect(() => {
    setAccountType(selectedAccountType);
  }, [selectedAccountType]);

  useEffect(() => {
    async function loadProfile() {
      const client = supabase;
      if (!client) {
        setNeedsLogin(true);
        setLoading(false);
        return;
      }

      const { data: authData } = await client.auth.getUser();
      const user = authData?.user;
      if (!user) {
        setNeedsLogin(true);
        setLoading(false);
        return;
      }

      const { data, error } = await client
        .from('profiles')
        .select('full_name, account_type, metadata')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        setMessage('Impossible de charger votre profil. Veuillez réessayer.');
      }

      if (data) {
        setFormData((current) => ({
          ...current,
          full_name: data.full_name || current.full_name,
          ...((data.metadata || {}) as Partial<OnboardingFormState>),
        }));
      }

      const returnedAccountType =
        data?.account_type ||
        ((user.user_metadata as any)?.account_type as string | undefined);

      const normalizedAccountType =
        returnedAccountType === AccountType.Student
          ? AccountType.Learner
          : returnedAccountType;

      if (
        normalizedAccountType === AccountType.Family ||
        normalizedAccountType === AccountType.Establishment ||
        normalizedAccountType === AccountType.Center ||
        normalizedAccountType === AccountType.Animator ||
        normalizedAccountType === AccountType.Learner ||
        normalizedAccountType === AccountType.Other
      ) {
        setAccountType(normalizedAccountType as AccountType);
      }

      setLoading(false);
    }

    loadProfile();
  }, [accountType]);

  const handleChange = (key: keyof OnboardingFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setSaving(true);

    const client = supabase;
    if (!client) {
      setMessage('Le client Supabase n est pas configuré.');
      setSaving(false);
      return;
    }

    const { data: authData } = await client.auth.getUser();
    const user = authData?.user;
    if (!user) {
      setNeedsLogin(true);
      setSaving(false);
      return;
    }

    const metadata = {
      phone: formData.phone || null,
      address: formData.address || null,
      uai_rne: formData.uai_rne || null,
      structure_name: formData.structure_name || null,
      responsible_name: formData.responsible_name || null,
      center_type: formData.center_type || null,
      agrement_number: formData.agrement_number || null,
      organization_name: formData.organization_name || null,
      school_name: formData.school_name || null,
      class_level: formData.class_level || null,
      children_count: formData.children_count || null,
      emergency_contact: formData.emergency_contact || null,
      notes: formData.notes || null,
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await client
        .from('profiles')
        .upsert(
          {
            id: user.id,
            email: user.email,
            full_name: formData.full_name || null,
            account_type: accountType,
            metadata,
            is_verified: false,
          },
          { onConflict: 'id' }
        )
        .select()
        .single();

      if (error) {
        throw error;
      }

      setMessage(
        'Profil enregistré. Vous pouvez accéder à votre tableau de bord.'
      );
      router.push(`/${locale}/dashboard`);
    } catch (err: any) {
      console.error('Error saving onboarding profile:', err);
      setMessage(err?.message || 'Impossible d enregistrer le profil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <Card className="w-full max-w-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Complétez votre inscription
            </div>
            <CardTitle className="text-3xl font-bold">
              Besoin de vous reconnecter
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Pour finaliser votre inscription, vérifiez votre adresse email
              puis connectez-vous à nouveau.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/70 bg-muted p-4 text-sm text-foreground">
              Vous devez être connecté pour continuer la procédure
              d'inscription.
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href={`/${locale}/login`}>
                <Button className="w-full sm:w-auto">Se connecter</Button>
              </Link>
              <Link href={`/${locale}/inscription`}>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Retour à l'inscription
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Étape 2 sur 2
          </div>
          <CardTitle className="text-3xl font-bold">
            Profil {ACCOUNT_TYPE_LABELS[accountType]}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Complétez votre profil pour accéder à votre tableau de bord et
            commencer à réserver des ateliers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-border/70 bg-muted p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-2">
              Profil sélectionné
            </div>
            <div className="text-sm text-foreground">
              {ACCOUNT_TYPE_HELPERS[accountType]}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted p-4">
            <AccountTypePicker value={accountType} onChange={setAccountType} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="full_name">Nom complet</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
            </div>

            {(accountType === AccountType.Establishment ||
              accountType === AccountType.Center) && (
              <div>
                <Label htmlFor="structure_name">Nom de la structure</Label>
                <Input
                  id="structure_name"
                  value={formData.structure_name}
                  onChange={(e) =>
                    handleChange('structure_name', e.target.value)
                  }
                />
              </div>
            )}

            {accountType === AccountType.Establishment && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="uai_rne">UAI / RNE</Label>
                  <Input
                    id="uai_rne"
                    value={formData.uai_rne}
                    onChange={(e) => handleChange('uai_rne', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="responsible_name">
                    Responsable pédagogique
                  </Label>
                  <Input
                    id="responsible_name"
                    value={formData.responsible_name}
                    onChange={(e) =>
                      handleChange('responsible_name', e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {accountType === AccountType.Center && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="center_type">Type de centre</Label>
                  <Input
                    id="center_type"
                    value={formData.center_type}
                    onChange={(e) =>
                      handleChange('center_type', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="agrement_number">
                    Numéro d'agrément Jeunesse
                  </Label>
                  <Input
                    id="agrement_number"
                    value={formData.agrement_number}
                    onChange={(e) =>
                      handleChange('agrement_number', e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {accountType === AccountType.Family && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="children_count">Nombre d'enfants</Label>
                  <Input
                    id="children_count"
                    value={formData.children_count}
                    onChange={(e) =>
                      handleChange('children_count', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="emergency_contact">Contact d'urgence</Label>
                  <Input
                    id="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={(e) =>
                      handleChange('emergency_contact', e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {accountType === AccountType.Animator && (
              <div>
                <Label htmlFor="organization_name">Organisation</Label>
                <Input
                  id="organization_name"
                  value={formData.organization_name}
                  onChange={(e) =>
                    handleChange('organization_name', e.target.value)
                  }
                />
              </div>
            )}

            {accountType === AccountType.Learner && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="school_name">Établissement scolaire</Label>
                  <Input
                    id="school_name"
                    value={formData.school_name}
                    onChange={(e) =>
                      handleChange('school_name', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="class_level">Niveau / classe</Label>
                  <Input
                    id="class_level"
                    value={formData.class_level}
                    onChange={(e) =>
                      handleChange('class_level', e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes complémentaires</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>

            {message && (
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                {message}
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Enregistrer'
                )}
              </Button>
              <Link
                href={`/${locale}/dashboard`}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Passer au dashboard
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
