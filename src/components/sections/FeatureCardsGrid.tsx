"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCard {
    title: string;
    description: string;
    icon?: LucideIcon;
}

interface FeatureCardsGridProps {
    title: string;
    subtitle?: string;
    cards: FeatureCard[];
    columns?: 2 | 3;
    variant?: "card" | "minimal";
    withBackground?: boolean;
}

export default function FeatureCardsGrid({
    title,
    subtitle,
    cards,
    columns = 3,
    variant = "card",
    withBackground = false,
}: FeatureCardsGridProps) {
    const gridClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

    return (
        <section
            className={`w-full py-16 md:py-20 ${
                withBackground ? "bg-muted/30" : "bg-background"
            }`}
        >
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    {subtitle && (
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                    )}
                </div>

                {/* Cards Grid */}
                <div
                    className={`grid gap-6 md:grid-cols-${columns} ${gridClass}`}
                >
                    {cards.map((card, idx) => {
                        const Icon = card.icon;

                        if (variant === "minimal") {
                            return (
                                <div
                                    key={idx}
                                    className="p-6 rounded-lg border hover:shadow-lg transition-shadow hover:border-accent/50"
                                >
                                    {Icon && (
                                        <Icon className="h-8 w-8 text-accent mb-4 flex-shrink-0" />
                                    )}
                                    <h3 className="font-bold mb-2 text-lg">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        }

                        // Default variant: "card"
                        return (
                            <Card key={idx} className="h-full">
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        {Icon && (
                                            <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                        )}
                                        <div className="flex-1">
                                            <CardTitle>{card.title}</CardTitle>
                                            <CardDescription className="mt-1">
                                                {card.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
