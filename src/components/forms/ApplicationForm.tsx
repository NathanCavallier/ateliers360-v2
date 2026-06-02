"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Schéma de validation
const applicationFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(100, "Maximum 100 caractères"),
  email: z
    .string()
    .email("Email invalide")
    .min(5)
    .max(255),
  phone: z
    .string()
    .regex(
      /^(?:\+33|0)[1-9](?:[0-9]{8})$/,
      "Numéro invalide (format: 06 12 34 56 78 ou +33 6 12 34 56 78)"
    ),
  position: z
    .enum(
      ["animator", "trainer", "developer", "sales", "pedagogical_manager", "other"],
      { errorMap: () => ({ message: "Sélectionnez un poste" }) }
    ),
  experience: z
    .string()
    .min(20, "Minimum 20 caractères")
    .max(2000, "Maximum 2000 caractères"),
  motivation: z
    .string()
    .min(20, "Minimum 20 caractères")
    .max(3000, "Maximum 3000 caractères"),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const positionOptions = [
  { value: "animator", label: "Animateur/Animatrice d'ateliers" },
  { value: "trainer", label: "Formateur/Formatrice" },
  { value: "developer", label: "Développeur(euse)" },
  { value: "sales", label: "Commercial(e)" },
  { value: "pedagogical_manager", label: "Responsable pédagogique" },
  { value: "other", label: "Autre" },
];

export default function ApplicationForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: undefined,
      experience: "",
      motivation: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: ApplicationFormValues) {
    setStatus("loading");

    try {
      const response = await fetch("/api/applications/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la candidature");
      }

      setStatus("success");
      toast({
        title: "Candidature reçue!",
        description: "Merci de votre intérêt. Nous examinerons votre dossier et vous contacterons bientôt.",
      });
      form.reset();

      // Reset success state après 5 secondes
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      toast({
        title: "Erreur lors de l'envoi",
        description:
          error instanceof Error
            ? error.message
            : "Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        {/* Success Alert */}
        {status === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Candidature reçue! Merci de votre intérêt. Nous examinerons votre dossier et vous contacterons bientôt.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erreur lors de l'envoi. Veuillez réessayer plus tard.
            </AlertDescription>
          </Alert>
        )}

        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Jean Dupont"
                  {...field}
                  disabled={status === "loading"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="vous@example.com"
                    {...field}
                    disabled={status === "loading"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="06 12 34 56 78"
                    {...field}
                    disabled={status === "loading"}
                  />
                </FormControl>
                <FormDescription>
                  Format: 06 12 34 56 78 ou +33 6 12 34 56 78
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Position Field */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poste recherché</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={status === "loading"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Sélectionnez un poste --" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience Field */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expérience pertinente</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre expérience en éducation, animation ou domaines STEM..."
                  {...field}
                  disabled={status === "loading"}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/2000 caractères
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Motivation Field */}
        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivation</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Pourquoi souhaitez-vous rejoindre Ateliers 360? Qu'est-ce qui vous attire chez nous?"
                  {...field}
                  disabled={status === "loading"}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/3000 caractères
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={status === "loading" || !form.formState.isDirty}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer ma candidature"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Nous nous engageons à répondre à toutes les candidatures.
        </p>
      </form>
    </Form>
  );
}
