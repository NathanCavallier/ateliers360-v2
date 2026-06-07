'use client';

import { FormEvent, useState, useRef } from 'react';
import { Calendar, Mail, MapPin, Send, ShieldCheck, UserRound, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function MissionForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData(event.currentTarget);
      const missionData = {
        guardianName: formData.get('guardianName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        youngName: formData.get('youngName') as string,
        age: parseInt(formData.get('age') as string),
        dates: formData.get('dates') as string,
        departure: formData.get('departure') as string,
        arrival: formData.get('arrival') as string,
        details: formData.get('details') as string,
      };

      // Valider les données
      if (!missionData.guardianName || !missionData.email || !missionData.phone ||
          !missionData.youngName || !missionData.age || !missionData.dates ||
          !missionData.departure || !missionData.arrival || !missionData.details) {
        setErrorMessage('Tous les champs sont obligatoires.');
        setStatus('error');
        return;
      }

      if (missionData.age < 6 || missionData.age > 25) {
        setErrorMessage('L\'âge doit être entre 6 et 25 ans.');
        setStatus('error');
        return;
      }

      // Créer la mission
      const response = await fetch('/api/missions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(missionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de la mission');
      }

      const result = await response.json();

      setStatus('success');
      setSuccessMessage('✓ Votre demande a été reçue avec succès ! Un email de confirmation a été envoyé. Notre équipe vous contactera dans les 48 heures.');

      // Réinitialiser le formulaire
      if (formRef.current) {
        formRef.current.reset();
      }

      // Redirection vers détails après 3 secondes
      setTimeout(() => {
        window.location.href = `/fr/passerelle-jeunesse?missionId=${result.missionId}`;
      }, 3000);

    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.');
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-col">
      <section className="w-full bg-emerald-950 py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Demander une mission Passerelle Jeunesse
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-emerald-50">
              Decrivez le besoin d'accompagnement : jeune concerne, trajet, dates, contexte et contacts. Cette premiere version prepare la collecte avant branchement API, email et Stripe.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-background py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Informations de mission</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Nom du responsable</Label>
                      <Input
                        id="guardianName"
                        name="guardianName"
                        required
                        placeholder="Nom et prenom"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="contact@example.com"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telephone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="06..."
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youngName">Jeune concerne</Label>
                      <Input
                        id="youngName"
                        name="youngName"
                        required
                        placeholder="Prenom du jeune"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="6"
                        max="25"
                        required
                        placeholder="14"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dates">Dates souhaitees</Label>
                      <Input
                        id="dates"
                        name="dates"
                        required
                        placeholder="Ex : mercredis de juin, 8h-10h"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="departure">Depart</Label>
                      <Input
                        id="departure"
                        name="departure"
                        required
                        placeholder="Adresse de depart"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arrival">Arrivee</Label>
                      <Input
                        id="arrival"
                        name="arrival"
                        required
                        placeholder="Adresse d'arrivee"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Contexte et besoins particuliers</Label>
                    <Textarea
                      id="details"
                      name="details"
                      required
                      rows={6}
                      placeholder="Precisez le contexte, les contraintes horaires, les contacts sur place, les informations medicales utiles ou les documents deja disponibles."
                      disabled={status === 'loading'}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Soumettre la demande
                      </>
                    )}
                  </Button>

                  {status === 'error' && errorMessage && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-950">
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  {status === 'success' && successMessage && (
                    <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
                      <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                      <p>{successMessage}</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {[
                { icon: UserRound, title: 'Mineurs', text: 'Autorisation parentale et contacts responsables requis avant confirmation.' },
                { icon: MapPin, title: 'Trajets', text: 'Le depart, l’arrivee, les horaires et les contacts sur place doivent etre explicites.' },
                { icon: Calendar, title: 'Planning', text: 'Les missions peuvent etre ponctuelles ou regulieres selon disponibilites.' },
                { icon: ShieldCheck, title: 'Cadre', text: 'Les conditions, tarifs et responsabilites sont confirmes avant execution.' },
                { icon: Mail, title: 'Suivi', text: 'La confirmation email sera branchee dans le flux final.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-semibold">{item.title}</h2>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
