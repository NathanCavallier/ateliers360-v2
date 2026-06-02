"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SectionHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
    cta_primary?: {
        label: string;
        href: string;
    };
    cta_secondary?: {
        label: string;
        href: string;
    };
    backgroundImage?: string;
    variant?: "primary" | "secondary" | "dark";
}

export default function SectionHero({
    title,
    subtitle,
    badge,
    cta_primary,
    cta_secondary,
    backgroundImage =
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
    variant = "primary",
}: SectionHeroProps) {
    const variantClasses = {
        primary:
            "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground",
        secondary:
            "bg-gradient-to-br from-secondary to-secondary/80 text-primary-foreground",
        dark: "bg-slate-950 text-white",
    };

    return (
        <section
            className={`w-full py-20 relative overflow-hidden ${
                variantClasses[variant]
            } ${variant === 'dark' ? 'dark-section-heading' : ''}`}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Hero background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div
                    className={`absolute inset-0 ${
                        variant === "dark"
                            ? "bg-gradient-to-b from-slate-950/70 via-slate-950/75 to-slate-950"
                            : "bg-gradient-to-b from-primary/70 to-primary/90"
                    }`}
                />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 md:px-6 text-center">
                {badge && (
                    <Badge className="inline-flex items-center bg-accent text-accent-foreground px-3 py-1 rounded-full">
                        {badge}
                    </Badge>
                )}
                <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
                    {title}
                </h1>
                <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                    {subtitle}
                </p>

                {/* CTA Buttons */}
                {(cta_primary || cta_secondary) && (
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        {cta_primary && (
                            <Button
                                asChild
                                size="lg"
                                className="bg-accent text-accent-foreground"
                            >
                                <Link href={cta_primary.href}>
                                    {cta_primary.label}
                                </Link>
                            </Button>
                        )}
                        {cta_secondary && (
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className={variant === "dark"
                                    ? "bg-white/5 border-white/20 text-white hover:bg-white/10"
                                    : ""}
                            >
                                <Link href={cta_secondary.href}>
                                    {cta_secondary.label}
                                </Link>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
