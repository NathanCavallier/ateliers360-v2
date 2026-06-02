"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAuthHeaders } from '@/lib/supabase';

interface DuplicateWorkshopButtonProps {
  workshopId: number;
  workshopTitle: string;
}

export function DuplicateWorkshopButton({ workshopId, workshopTitle }: DuplicateWorkshopButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDuplicate = async () => {
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const response = await fetch("/api/dashboard/ateliers", {
        method: "POST",
        headers,
        body: JSON.stringify({
          action: "duplicate",
          id: workshopId,
        }),
      });

      const newWorkshop = response.ok ? await response.json() : null;

      if (newWorkshop) {
        toast({
          title: "Succès",
          description: `Atelier "${workshopTitle}" dupliqué avec succès`,
        });
        router.refresh();
        window.location.reload();
      } else {
        const errorData = await response.json().catch(() => null);
        toast({
          title: "Erreur",
          description: errorData?.error || "Échec de la duplication",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Duplication error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la duplication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleDuplicate}
      disabled={loading}
      title="Dupliquer"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
