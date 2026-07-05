"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
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
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 caractères")
    .max(100, "Maximum 100 caractères"),
  email: z
    .string()
    .email("Email invalide")
    .min(5)
    .max(255),
  establishment: z
    .string()
    .min(2, "Minimum 2 caractères")
    .max(200),
  role: z
    .string()
    .min(2, "Minimum 2 caractères")
    .max(100),
  message: z
    .string()
    .min(20, "Minimum 20 caractères")
    .max(2000, "Maximum 2000 caractères"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const pole = searchParams.get("pole") ?? undefined;
  const service = searchParams.get("service") ?? undefined;
  const { toast } = useToast();
  const t = useTranslations("ContactPage");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      establishment: "",
      role: "",
      message: "",
    },
    mode: "onBlur", // Valider au blur pour meilleure UX
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");

    const metadata = {
      pole,
      service,
    };

    const extraContext = [
      pole ? `Pôle concerné : ${pole}` : null,
      service ? `Service ciblé : ${service}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          metadata,
          source: service === "demo" ? "DEMO" : undefined,
          message: `${values.message}${extraContext ? `\n\n${extraContext}` : ""}`,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error || t("formErrorMessage"));
      }

      setStatus("success");
      toast({
        title: t("formSuccessTitle"),
        description: t("formSuccessMessage"),
      });
      form.reset();

      // Reset success state après 3 secondes
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      toast({
        title: t("formErrorTitle"),
        description:
          error instanceof Error ? error.message : t("formErrorMessage"),
        variant: "destructive",
      });
    }
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Success Alert */}
        {status === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {t("formSuccessAlert")}
            </AlertDescription>
          </Alert>
        )}

        {/* Prefill context */}
        {(pole || service) && (
          <Alert className="border-slate-200 bg-slate-50 text-slate-800">
            <AlertDescription>
              {pole && <span>{t('selected_pole')} : {pole}</span>}
              {pole && service && <span> · </span>}
              {service && <span>{t('selected_service')} : {service}</span>}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t("formErrorAlert")}</AlertDescription>
          </Alert>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("yourName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("name_placeholder")}
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
              <FormLabel>{t("emailAddress")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email_placeholder")}
                  {...field}
                  disabled={status === "loading"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Two Column Layout for smaller screens */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Establishment Field */}
          <FormField
            control={form.control}
            name="establishment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("establishment")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("establishment_placeholder")}
                    {...field}
                    disabled={status === "loading"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("yourRole")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("role_placeholder")}
                    {...field}
                    disabled={status === "loading"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("message_placeholder")}
                  {...field}
                  disabled={status === "loading"}
                  rows={5}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/2000 {t("characters")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground"
          disabled={status === "loading" || !form.formState.isDirty}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            t("sendMessage")
          )}
        </Button>
      </form>
    </Form>
  );
}
