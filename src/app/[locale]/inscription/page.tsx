'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AccountTypePicker from '@/components/accounts/AccountTypePicker';
import { AccountType } from '@/types-accounts';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InscriptionPage() {
  const router = useRouter();
  const locale = useLocale();
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.Family
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirm) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    if (!supabase) {
      setMessage("Le client Supabase n'est pas configuré");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { account_type: accountType },
        },
      } as any);

      if (error) {
        setMessage(error.message);
      } else {
        const session = data?.session;

        if (!session) {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            setMessage(
              'Votre compte est créé. Connectez-vous pour accéder à votre espace.'
            );
            return;
          }
        }

        setMessage(
          'Votre compte est créé. Vous pouvez compléter votre profil et accéder à votre tableau de bord.'
        );
        router.push(`/${locale}/inscription/completer?account_type=${accountType}`);
      }
    } catch (err: any) {
      setMessage(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="space-y-4">
          <div className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Étape 1 sur 2 — Création du compte
          </div>
          <CardTitle className="text-3xl">Créer un compte</CardTitle>
          <CardDescription>
            Choisissez votre profil puis créez votre compte. Vous pourrez
            compléter les informations spécifiques après confirmation de votre
            adresse email.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-2xl border border-border/70 bg-muted p-4">
            <AccountTypePicker value={accountType} onChange={setAccountType} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmer</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? 'En cours…' : 'Créer le compte'}
              </Button>
              <Link
                href={`/${locale}/login`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Vous avez déjà un compte ? Connexion
              </Link>
            </div>
          </form>

          {message ? (
            <div className="rounded-2xl border border-border/70 bg-secondary/10 p-4 text-sm text-secondary-foreground">
              {message}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
