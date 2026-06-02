"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
    title: string;
    subtitle?: string;
    cta_label: string;
    cta_href: string;
    variant?: "primary" | "secondary" | "dark";
}

export default function CTASection({
    title,
    subtitle,
    cta_label,
    cta_href,
    variant = "primary",
}: CTASectionProps) {
    const variantClasses = {
        primary:
            "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground",
        secondary:
            "bg-gradient-to-br from-secondary to-secondary/80 text-primary-foreground",
        dark: "bg-slate-950 text-white",
    };

    return (
        <section className={`w-full py-16 md:py-20 ${variantClasses[variant]}`}>
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
                    {subtitle && (
                        <p className="text-lg text-primary-foreground/90 leading-relaxed">
                            {subtitle}
                        </p>
                    )}

                    {/* CTA Button */}
                    <Button
                        asChild
                        size="lg"
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                        <Link href={cta_href}>{cta_label}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
