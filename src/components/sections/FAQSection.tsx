"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title: string;
    subtitle?: string;
    faqs: FAQItem[];
    withBackground?: boolean;
}

export default function FAQSection({
    title,
    subtitle,
    faqs,
    withBackground = false,
}: FAQSectionProps) {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section
            className={`w-full py-16 md:py-20 ${
                withBackground ? "bg-muted/30" : "bg-background"
            }`}
        >
            <div className="container px-4 md:px-6 max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    {subtitle && (
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                    )}
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border rounded-lg overflow-hidden transition-all"
                        >
                            <button
                                onClick={() =>
                                    setOpenIdx(openIdx === idx ? null : idx)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-semibold text-left">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 text-accent flex-shrink-0 transition-transform ${
                                        openIdx === idx
                                            ? "transform rotate-180"
                                            : ""
                                    }`}
                                />
                            </button>

                            {/* Answer */}
                            {openIdx === idx && (
                                <div className="px-6 py-4 bg-muted/30 border-t">
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
