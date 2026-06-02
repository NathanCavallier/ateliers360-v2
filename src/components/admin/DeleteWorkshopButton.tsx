"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthHeaders } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Database } from "@/lib/types";

type Workshop = Database['public']['Tables']['ateliers']['Row'];

interface DeleteWorkshopButtonProps {
  workshop: Workshop;
}

export function DeleteWorkshopButton({ workshop }: DeleteWorkshopButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {

      // Check if there are any reservations for this workshop (via l'API)
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/dashboard/ateliers/${workshop.id}/reservations`, { headers });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la vérification des réservations");
      }
      const reservations = await response.json();

      if (reservations && reservations.length > 0) {
        throw new Error(
          `Impossible de supprimer cet atelier : ${reservations.length} réservation(s) existe(nt). Supprimez d'abord les réservations associées.`
        );
      }

      // Check if there are any events for this workshop (via l'API)
      const eventsResponse = await fetch(`/api/dashboard/ateliers/${workshop.id}/events`, { headers });
      if (!eventsResponse.ok) {
        const errorData = await eventsResponse.json();
        throw new Error(errorData.error || "Erreur lors de la vérification des événements");
      }
      const events = await eventsResponse.json();

      if (events && events.length > 0) {
        throw new Error(
          `Impossible de supprimer cet atelier : ${events.length} événement(s) existe(nt). Supprimez d'abord les événements associés.`
        );
      }

      // Delete the workshop via l'API
      const deleteResponse = await fetch(`/api/dashboard/ateliers/${workshop.id}`, {
        method: "DELETE",
        headers,
      });
      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.error || "Erreur lors de la suppression de l'atelier");
      }

      // Success - refresh the page
      router.refresh();
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer l&apos;atelier ?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Êtes-vous sûr de vouloir supprimer l&apos;atelier{" "}
              <strong>&quot;{workshop.titre}&quot;</strong> ?
            </p>
            <p className="text-destructive font-medium">
              Cette action est irréversible.
            </p>
            <p className="text-sm">
              Note : La suppression sera bloquée s&apos;il existe des réservations ou
              des événements associés à cet atelier.
            </p>
            {error && (
              <p className="text-destructive text-sm font-medium mt-2">
                {error}
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
