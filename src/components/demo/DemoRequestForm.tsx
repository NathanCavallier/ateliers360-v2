"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const demoFormSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères").max(100, "Maximum 100 caractères"),
  email: z.string().email("Email invalide").min(5).max(255),
  phone: z.string().optional(),
  structure: z.string().min(2, "Minimum 2 caractères").max(200, "Maximum 200 caractères"),
  city: z.string().min(2, "Minimum 2 caractères").max(100, "Maximum 100 caractères"),
  structureType: z.string().min(2, "Minimum 2 caractères").max(100, "Maximum 100 caractères"),
  pole: z.enum(["Ateliers 360"]),
  demoFormat: z.enum(["presentiel", "visio", "kit"]),
  availability: z.string().optional(),
  attendees: z.string().optional(),
  preferredTool: z.string().optional(),
  targetAudience: z.string().optional(),
  message: z.string().min(20, "Minimum 20 caractères").max(2000, "Maximum 2000 caractères"),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

export default function DemoRequestForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      structure: "",
      city: "",
      structureType: "École primaire",
      pole: "Ateliers 360",
      demoFormat: "presentiel",
      availability: "",
      attendees: "",
      preferredTool: "Google Meet",
      targetAudience: "Collège",
      message: "",
    },
    mode: "onBlur",
  });

  const demoFormat = form.watch("demoFormat");

  async function onSubmit(values: DemoFormValues) {
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          establishment: values.structure,
          role: values.structureType,
          message: `${values.message}\n\nDemo demandé : ${values.demoFormat}\nPôle : ${values.pole}\nDisponibilités : ${values.availability || "Non précisées"}\nNombre de participants : ${values.attendees || "Non précisé"}\nOutil de visio préféré : ${values.preferredTool || "N/A"}\nNiveau cible : ${values.targetAudience}`,
          source: "DEMO",
          metadata: {
            demoFormat: values.demoFormat,
            pole: values.pole,
            structureType: values.structureType,
            city: values.city,
            availability: values.availability,
            attendees: values.attendees,
            preferredTool: values.preferredTool,
            targetAudience: values.targetAudience,
          },
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Une erreur est survenue lors de l'envoi du formulaire.");
      }

      setStatus("success");
      toast({
        title: "Demande reçue",
        description: "Nous vous recontactons rapidement pour organiser votre démo.",
      });
      form.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      toast({
        title: "Erreur lors de l'envoi",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {status === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>Merci ! Votre demande de démo a bien été reçue.</AlertDescription>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Une erreur est survenue. Veuillez réessayer.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom + Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} disabled={status === "loading"} />
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
                <FormLabel>Email professionnel</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@exemple.com" {...field} disabled={status === "loading"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="structure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de votre structure</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'école, de l'association, de l'entreprise" {...field} disabled={status === "loading"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Luxembourg" {...field} disabled={status === "loading"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="structureType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre structure</FormLabel>
                <FormControl>
                  <Input placeholder="École primaire, association, collectivité..." {...field} disabled={status === "loading"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="06 00 00 00 00" {...field} disabled={status === "loading"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="pole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pôle concerné</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} disabled={status === "loading"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez un pôle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ateliers 360">Ateliers 360</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="demoFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Format de démo souhaité</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {[
                    { value: 'presentiel', label: 'Démo présentiel au Luxembourg' },
                    { value: 'visio', label: 'Visioconférence' },
                    { value: 'kit', label: 'Kit décideur + vidéo' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 rounded-2xl border border-slate-300 p-4 transition hover:border-accent">
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <span>{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {demoFormat === 'presentiel' && (
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilités souhaitées</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex. 15/06 14h-16h, 17/06 10h-12h" {...field} disabled={status === 'loading'} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de personnes</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 3" {...field} disabled={status === 'loading'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {demoFormat === 'visio' && (
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="preferredTool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outil de visio préféré</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={status === "loading"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un outil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Google Meet">Google Meet</SelectItem>
                        <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                        <SelectItem value="Zoom">Zoom</SelectItem>
                        <SelectItem value="Pas de préférence">Pas de préférence</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilités souhaitées</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex. Lundi 10h-11h, Mardi 14h-15h" {...field} disabled={status === 'loading'} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {demoFormat === 'kit' && (
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau cible</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={status === "loading"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Maternelle / Primaire">Maternelle / Primaire</SelectItem>
                        <SelectItem value="Collège">Collège</SelectItem>
                        <SelectItem value="Lycée">Lycée</SelectItem>
                        <SelectItem value="Supérieur">Supérieur</SelectItem>
                        <SelectItem value="Adultes / Entreprise">Adultes / Entreprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Message libre</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez votre contexte ou vos questions" {...field} disabled={status === 'loading'} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {demoFormat !== 'kit' && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message libre / contexte supplémentaire</FormLabel>
                <FormControl>
                  <Textarea placeholder="Décrivez brièvement votre projet, vos contraintes ou vos questions..." {...field} disabled={status === 'loading'} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full bg-accent text-accent-foreground" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi...
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>
      </form>
    </Form>
  );
}
