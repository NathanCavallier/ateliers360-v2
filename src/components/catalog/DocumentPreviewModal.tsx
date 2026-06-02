// src/components/DocumentPreviewModal.tsx
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    src: string; // url du PDF
    title?: string;
};

export default function DocumentPreviewModal(
    { open, onClose, src, title }: Props,
) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <div className="relative z-10 w-full max-w-5xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b">
                    <h3 className="text-lg font-semibold">
                        {title || "Aperçu du document"}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" onClick={onClose}>
                            Fermer
                        </Button>
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <Button variant="outline">
                                Ouvrir dans un nouvel onglet
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="w-full h-full">
                    {/* iframe/object fallback : certains navigateurs affichent le PDF nativement */}
                    <iframe
                        src={src}
                        title={title || "Document preview"}
                        className="w-full h-full"
                        style={{ border: "none" }}
                    />
                </div>
            </div>
        </div>
    );
}
