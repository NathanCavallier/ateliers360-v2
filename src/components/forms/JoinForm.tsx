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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Schéma de validation
const joinFormSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 caractères")
    .max(100, "Maximum 100 caractères"),
  email: z
    .string()
    .email("Email invalide")
    .min(5)
    .max(255),
  message: z
    .string()
    .min(20, "Minimum 20 caractères")
    .max(2000, "Maximum 2000 caractères"),
});

type JoinFormValues = z.infer<typeof joinFormSchema>;

export default function JoinForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: JoinFormValues) {
    setStatus("loading");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      setStatus("success");
      toast({
        title: "Succès",
        description: "Votre candidature a été envoyée avec succès. Nous vous remercions!",
      });
      form.reset();

      // Reset success state après 5 secondes
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'envoi du formulaire. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Success Alert */}
        {status === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Merci! Votre candidature a été envoyée. Nous vous contacterons sous peu.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Une erreur s'est produite. Veuillez vérifier vos informations et réessayer.
            </AlertDescription>
          </Alert>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Entrez votre nom"
                  {...field}
                  disabled={status === "loading"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  placeholder="votre.email@exemple.com"
                  {...field}
                  disabled={status === "loading"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parlez-nous de vous et de votre motivation</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre profil et pourquoi vous souhaitez nous rejoindre..."
                  {...field}
                  disabled={status === "loading"}
                  rows={5}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/2000 caractères
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading" || !form.formState.isDirty}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer la candidature"
          )}
        </Button>
      </form>
    </Form>
  );
}
