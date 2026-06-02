"use client";

import { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface ProcessStep {
    title: string;
    description: string;
    icon?: LucideIcon;
}

interface ProcessStepsProps {
    title: string;
    subtitle?: string;
    steps: ProcessStep[];
    direction?: "vertical" | "horizontal";
    withBackground?: boolean;
}

export default function ProcessSteps({
    title,
    subtitle,
    steps,
    direction = "vertical",
    withBackground = true,
}: ProcessStepsProps) {
    return (
        <section
            className={`w-full py-16 md:py-20 ${
                withBackground ? "bg-muted/30" : "bg-background"
            }`}
        >
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    {subtitle && (
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                    )}
                </div>

                {/* Steps */}
                {direction === "vertical"
                    ? (
                        <div className="space-y-6">
                            {steps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex gap-4 items-start"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-accent-foreground font-bold">
                                                {Icon
                                                    ? (
                                                        <Icon className="h-5 w-5" />
                                                    )
                                                    : <span>{idx + 1}</span>}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted-foreground mt-1">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                    : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {steps.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <div key={idx} className="text-center">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold mx-auto mb-4">
                                            {Icon
                                                ? <Icon className="h-6 w-6" />
                                                : <span>{idx + 1}</span>}
                                        </div>
                                        <h3 className="font-bold mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {step.description}
                                        </p>
                                        {idx < steps.length - 1 && (
                                            <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                                                <div className="w-6 h-0.5 bg-accent/30" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
            </div>
        </section>
    );
}
