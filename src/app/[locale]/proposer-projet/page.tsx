"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SchoolsContactForm from "@/components/forms/SchoolsContactForm";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProposerProjetPage() {
  const locale = useLocale();
  const t = useTranslations("Schools");

  const highlights = [
    t("propose_project_highlight1"),
    t("propose_project_highlight2"),
    t("propose_project_highlight3"),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
            alt="Proposer un projet"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent/80 mb-4">
              {t("propose_project_badge")}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {t("propose_project_title")}
            </h1>
            <p className="mt-6 text-lg text-slate-200 max-w-2xl leading-relaxed">
              {t("propose_project_subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={`/${locale}/ateliers`}>
                  {t("propose_project_cta_explore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{t("propose_project_header")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("propose_project_description")}
              </p>
              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <p className="text-base text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle>{t("propose_project_form_title")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <SchoolsContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
