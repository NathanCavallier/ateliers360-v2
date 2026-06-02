"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const schoolsSchema = z.object({
    institution: z.string().min(2, "Minimum 2 caractères").max(200),
    contact: z.string().min(2, "Minimum 2 caractères").max(100),
    email: z.string().email("Email invalide").min(5).max(255),
    level: z.enum([
        "maternelle",
        "cp-ce1",
        "ce2-cm1",
        "cm2-6e",
        "5e-4e",
        "3e",
        "seconde",
        "premiere",
        "terminale",
    ]),
    message: z.string().min(20, "Minimum 20 caractères").max(2000),
});

type SchoolsFormValues = z.infer<typeof schoolsSchema>;

const schoolLevelOptions = [
    { value: "maternelle", label: "Maternelle" },
    { value: "cp-ce1", label: "CP - CE1" },
    { value: "ce2-cm1", label: "CE2 - CM1" },
    { value: "cm2-6e", label: "CM2 - 6ème" },
    { value: "5e-4e", label: "5ème - 4ème" },
    { value: "3e", label: "3ème" },
    { value: "seconde", label: "Seconde" },
    { value: "premiere", label: "Première" },
    { value: "terminale", label: "Terminale" },
];

export default function SchoolsContactForm() {
    const t = useTranslations("Schools");
    const { toast } = useToast();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const form = useForm<SchoolsFormValues>({
        resolver: zodResolver(schoolsSchema),
        defaultValues: {
            institution: "",
            contact: "",
            email: "",
            level: "maternelle",
            message: "",
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<SchoolsFormValues> = async (values) => {
        setStatus("loading");

        try {
            const res = await fetch("/api/schools/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json?.error || t("formErrorMessage"));
            }

            setStatus("success");
            toast({ title: t("formSuccessTitle"), description: t("formSuccessMessage") });
            form.reset();
            setTimeout(() => setStatus("idle"), 3000);
        } catch (err) {
            setStatus("error");
            toast({
                title: t("formErrorTitle"),
                description: err instanceof Error ? err.message : t("formErrorMessage"),
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {status === "success" && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">{t("formSuccessAlert")}</AlertDescription>
                    </Alert>
                )}

                {status === "error" && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{t("formErrorAlert")}</AlertDescription>
                    </Alert>
                )}

                <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("form_institution")}</FormLabel>
                            <FormControl>
                                <Input placeholder={t("form_institution_placeholder")} {...field} disabled={status === "loading"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("form_contact")}</FormLabel>
                            <FormControl>
                                <Input placeholder={t("form_contact_placeholder")} {...field} disabled={status === "loading"} />
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
                            <FormLabel>{t("form_email")}</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder={t("form_email_placeholder")} {...field} disabled={status === "loading"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("form_level")}</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="w-full rounded-md border border-input px-3 py-2 bg-background text-sm shadow-sm focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label={t("form_level")}
                                    disabled={status === "loading"}
                                >
                                    <option value="">{t("form_level_placeholder")}</option>
                                    {schoolLevelOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("form_message")}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={t("form_message_placeholder")} {...field} disabled={status === "loading"} rows={4} />
                            </FormControl>
                            <FormDescription>{field.value.length}/2000 {t("characters")}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-accent text-accent-foreground" disabled={status === "loading"}>
                    {status === "loading" ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("sending")}
                        </>
                    ) : (
                        t("form_submit")
                    )}
                </Button>

                <p className="text-xs text-muted-foreground">{t("form_note")}</p>
            </form>
        </Form>
    );
}
