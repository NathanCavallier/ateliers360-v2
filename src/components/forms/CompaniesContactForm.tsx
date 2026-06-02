"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const companiesSchema = z.object({
    company: z.string().min(2, "Minimum 2 caractères").max(200),
    contact: z.string().min(2, "Minimum 2 caractères").max(100),
    email: z.string().email("Email invalide").min(5).max(255),
    siret: z.string().regex(/^[0-9]{14}$/, "SIRET invalide").length(14, "Le SIRET doit comporter 14 chiffres"),
    size: z.enum(["1-9", "10-49", "50-249", "250+"], { errorMap: () => ({ message: "Sélectionnez la taille de l'entreprise" }) }),
    sector: z.enum(["education", "technology", "culture", "health", "nonprofit", "other"], { errorMap: () => ({ message: "Sélectionnez un secteur d'activité" }) }),
    phone: z.string().optional(),
    offer: z.string().optional(),
    message: z.string().min(20, "Minimum 20 caractères").max(5000),
});

type CompaniesFormValues = z.infer<typeof companiesSchema>;

const companySizeOptions = [
    { value: "1-9", label: "1-9 salariés" },
    { value: "10-49", label: "10-49 salariés" },
    { value: "50-249", label: "50-249 salariés" },
    { value: "250+", label: "250+ salariés" },
];

const sectorOptions = [
    { value: "education", label: "Éducation" },
    { value: "technology", label: "Technologie" },
    { value: "culture", label: "Culture" },
    { value: "health", label: "Santé" },
    { value: "nonprofit", label: "Associatif / Non lucratif" },
    { value: "other", label: "Autre" },
];

export default function CompaniesContactForm() {
    const t = useTranslations("Companies");
    const { toast } = useToast();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const form = useForm<CompaniesFormValues>({
        resolver: zodResolver(companiesSchema),
        defaultValues: {
            company: "",
            contact: "",
            email: "",
            siret: "",
            size: "1-9",
            sector: "education",
            phone: "",
            offer: "",
            message: "",
        },
        mode: "onBlur",
    });

    async function onSubmit(values: CompaniesFormValues) {
        setStatus("loading");

        try {
            const res = await fetch("/api/companies/contact", {
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
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-2xl mx-auto">
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
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("company_name")}</FormLabel>
                            <FormControl>
                                <Input placeholder={t("company_placeholder")} {...field} disabled={status === "loading"} />
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
                            <FormLabel>{t("contact_name")}</FormLabel>
                            <FormControl>
                                <Input placeholder={t("contact_placeholder")} {...field} disabled={status === "loading"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("email")}</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder={t("email_placeholder")} {...field} disabled={status === "loading"} />
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
                                <FormLabel>{t("phone")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("phone_placeholder")} {...field} disabled={status === "loading"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="siret"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SIRET</FormLabel>
                                <FormControl>
                                    <Input placeholder="00000000000000" {...field} disabled={status === "loading"} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Taille de l'entreprise</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={status === "loading"}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez la taille" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {companySizeOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Secteur d'activité</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} disabled={status === "loading"}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez un secteur" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sectorOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="offer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("offer_reference")}</FormLabel>
                            <FormControl>
                                <Input placeholder={t("offer_placeholder")} {...field} disabled={status === "loading"} />
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
                            <FormLabel>{t("message")}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={t("message_placeholder")} {...field} disabled={status === "loading"} rows={5} />
                            </FormControl>
                            <FormDescription>{field.value.length}/5000 {t("characters")}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={status === "loading"} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {status === "loading" ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("sending")}
                        </>
                    ) : (
                        t("send_request")
                    )}
                </Button>

                <p className="text-xs text-muted-foreground">{t("response_time_companies")}</p>
            </form>
        </Form>
    );
}
