"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image?: string;
    rating?: number;
}

interface TestimonialSectionProps {
    title: string;
    subtitle?: string;
    testimonials: Testimonial[];
    variant?: "grid" | "carousel";
    withBackground?: boolean;
}

export default function TestimonialSection({
    title,
    subtitle,
    testimonials,
    variant = "grid",
    withBackground = false,
}: TestimonialSectionProps) {
    const gridClass = testimonials.length === 2
        ? "md:grid-cols-2"
        : testimonials.length === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2";

    return (
        <section
            className={`w-full py-16 md:py-20 ${
                withBackground ? "bg-muted/30" : "bg-background"
            }`}
        >
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    {subtitle && (
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                    )}
                </div>

                {/* Testimonials Grid */}
                <div className={`grid gap-6 ${gridClass}`}>
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                        >
                            {/* Rating */}
                            {testimonial.rating && (
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((
                                        _,
                                        i,
                                    ) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-accent text-accent"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Quote */}
                            <p className="text-muted-foreground italic mb-4">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t">
                                {testimonial.image && (
                                    <div className="relative h-10 w-10 flex-shrink-0">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold text-sm">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
