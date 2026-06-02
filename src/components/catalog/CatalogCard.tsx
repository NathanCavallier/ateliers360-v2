// src/components/CatalogCard.tsx
"use client";

import React, { useState } from "react";
import DocumentPreviewModal from "./DocumentPreviewModal";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

type Props = {
  title: string;
  previewUrl: string; // url pour iframe preview
  downloadUrl?: string; // url pour téléchargement
  filename?: string;
};

export default function CatalogCard({ title, previewUrl, downloadUrl, filename }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center gap-4">
        {/* Miniature simple : iframe réduit (fallback icône si navigateur bloque) */}
        <div className="w-full h-40 bg-muted/10 rounded overflow-hidden border">
          <iframe
            src={previewUrl}
            title={`${title} preview`}
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        <div className="w-full text-left">
          <h4 className="text-lg font-semibold">{title}</h4>
          {filename && <div className="text-sm text-muted-foreground">{filename}</div>}
        </div>

        <div className="w-full flex gap-2">
          <Button className="flex-1" onClick={() => setOpen(true)}>
            <Eye className="mr-2 h-4 w-4" /> Aperçu
          </Button>

          {downloadUrl ? (
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Télécharger
              </Button>
            </a>
          ) : (
            <Button variant="outline" disabled className="w-full">
              <Download className="mr-2 h-4 w-4" /> Télécharger
            </Button>
          )}
        </div>
      </div>

      <DocumentPreviewModal open={open} onClose={() => setOpen(false)} src={previewUrl} title={title} />
    </>
  );
}
