// src/components/dashboard/ContactRowActions.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAuthHeaders } from '@/lib/supabase';

type Props = {
  id: string;
  status: string;
  onUpdated?: (newStatus: string) => void;
  onDeleted?: () => void;
  locale?: string;
};

export default function ContactRowActions({ id, status, onUpdated, onDeleted, locale = "fr" }: Props) {
  const { toast } = useToast();
  const [loadingMark, setLoadingMark] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  async function handleMarkAsRead() {
    if (loadingMark) return;
    setLoadingMark(true);
    try {
      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const res = await fetch(`/api/dashboard/contacts/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: "in_progress" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erreur lors de la mise à jour");
      toast({ title: "Statut mis à jour", description: "La demande a été marquée comme prise en charge." });
      onUpdated?.("in_progress");
    } catch (err: any) {
      console.error("Mark as read error:", err);
      toast({ title: "Erreur", description: err?.message || "Impossible de mettre à jour.", variant: "destructive" });
    } finally {
      setLoadingMark(false);
    }
  }

  async function handleDelete() {
    if (loadingDelete) return;
    if (!confirm("Supprimer définitivement cette demande ?")) return;
    setLoadingDelete(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/dashboard/contacts/${id}`, {
        method: "DELETE",
        headers,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erreur lors de la suppression");
      toast({ title: "Supprimé", description: "La demande a été supprimée." });
      onDeleted?.();
    } catch (err: any) {
      console.error("Delete contact error:", err);
      toast({ title: "Erreur", description: err?.message || "Impossible de supprimer.", variant: "destructive" });
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={status === "in_progress" ? "ghost" : "outline"}
        onClick={handleMarkAsRead}
        disabled={loadingMark || status === "in_progress"}
        className="flex items-center gap-2"
      >
        <Check className="w-4 h-4" />
        {status === "in_progress" ? "Pris en charge" : "Marquer comme lu"}
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={handleDelete}
        disabled={loadingDelete}
        className="flex items-center gap-2"
      >
        <Trash className="w-4 h-4" />
        Supprimer
      </Button>
    </div>
  );
}
