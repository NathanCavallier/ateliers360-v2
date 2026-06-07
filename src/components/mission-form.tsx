'use client';

import { FormEvent, useState } from 'react';
import { Calendar, Mail, MapPin, Send, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function MissionForm() {
  const [status, setStatus] = useState<'idle' | 'ready'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('ready');
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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Nom du responsable</Label>
                      <Input id="guardianName" name="guardianName" required placeholder="Nom et prenom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required placeholder="contact@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telephone</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="06..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youngName">Jeune concerne</Label>
                      <Input id="youngName" name="youngName" required placeholder="Prenom du jeune" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" name="age" type="number" min="6" max="25" required placeholder="14" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dates">Dates souhaitees</Label>
                      <Input id="dates" name="dates" required placeholder="Ex : mercredis de juin, 8h-10h" />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="departure">Depart</Label>
                      <Input id="departure" name="departure" required placeholder="Adresse de depart" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arrival">Arrivee</Label>
                      <Input id="arrival" name="arrival" required placeholder="Adresse d'arrivee" />
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
                    />
                  </div>

                  <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700">
                    <Send className="h-4 w-4" />
                    Preparer la demande
                  </Button>

                  {status === 'ready' && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
                      La demande est prete cote interface. Prochaine etape technique : connecter ce formulaire a une route API, a l'envoi email et au paiement Stripe.
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
