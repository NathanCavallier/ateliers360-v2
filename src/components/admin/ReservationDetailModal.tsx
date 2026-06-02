"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Mail, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import type { Reservation, WorkshopDB } from "@/lib/types";

interface ReservationDetailModalProps {
  reservation: Reservation;
  workshop?: WorkshopDB;
  onUpdate?: () => void;
}

export function ReservationDetailModal({
  reservation,
  workshop,
  onUpdate,
}: ReservationDetailModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(reservation.status || "pending");

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "En attente", class: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      confirmed: { label: "Confirmée", class: "bg-green-50 text-green-700 border-green-200" },
      paid: { label: "Payée", class: "bg-blue-50 text-blue-700 border-blue-200" },
      completed: { label: "Terminée", class: "bg-gray-50 text-gray-700 border-gray-200" },
    };
    const config = statusMap[status as keyof typeof statusMap] || { label: status, class: "" };
    return (
      <Badge variant="outline" className={config.class}>
        {config.label}
      </Badge>
    );
  };

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error("Supabase client non initialisé");
      }

      const { error: updateError } = await supabase
        .from("reservations")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        } as never)
        .eq("id", reservation.id!);

      if (updateError) throw updateError;

      setSelectedStatus(newStatus as "pending" | "confirmed" | "paid" | "completed");
      if (onUpdate) {
        onUpdate();
      }
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!supabase) {
        throw new Error("Supabase client non initialisé");
      }

      const { error: deleteError } = await supabase
        .from("reservations")
        .delete()
        .eq("id", reservation.id!);

      if (deleteError) throw deleteError;

      setOpen(false);
      setDeleteDialogOpen(false);
      if (onUpdate) {
        onUpdate();
      }
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = () => {
    // Ouvrir le client email avec les infos pré-remplies
    const subject = `Réservation #${reservation.id} - ${workshop?.titre || "Atelier"}`;
    const body = `Bonjour ${reservation.nom},\n\nConcernant votre réservation pour l'atelier "${workshop?.titre || ""}" le ${new Date(reservation.date_atelier).toLocaleDateString("fr-FR")}...\n\nCordialement,\nL'équipe Ateliers 360`;
    
    window.location.href = `mailto:${reservation.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" title="Voir les détails">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de la réservation #{reservation.id}</DialogTitle>
            <DialogDescription>
              Informations complètes et actions disponibles
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Statut */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Statut actuel :</span>
                {getStatusBadge(selectedStatus)}
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="status-select" className="text-sm">
                  Changer :
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={handleStatusChange}
                  disabled={loading}
                >
                  <SelectTrigger id="status-select" className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmée</SelectItem>
                    <SelectItem value="paid">Payée</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Informations client */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Informations client</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{reservation.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{reservation.email}</p>
                </div>
                {reservation.etablissement && (
                  <div>
                    <p className="text-sm text-muted-foreground">Établissement</p>
                    <p className="font-medium">{reservation.etablissement}</p>
                  </div>
                )}
                {reservation.adresse && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">{reservation.adresse}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Détails de l'atelier */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Détails de l&apos;atelier</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Atelier</p>
                  <p className="font-medium">
                    {workshop?.titre || `ID: ${reservation.atelier_id}`}
                  </p>
                  {workshop?.categorie && (
                    <Badge variant="outline" className="mt-1">
                      {workshop.categorie}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date souhaitée</p>
                  <p className="font-medium">
                    {new Date(reservation.date_atelier).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nombre de participants</p>
                  <p className="font-medium">{reservation.participants_count} personne(s)</p>
                </div>
                {workshop && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Durée</p>
                      <p className="font-medium">{workshop.duree_heures}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tarif unitaire</p>
                      <p className="font-medium">{workshop.tarif_eur}€</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Montant total estimé</p>
                      <p className="font-medium text-lg text-primary">
                        {(workshop.tarif_eur * reservation.participants_count).toFixed(2)}€
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Informations système */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Informations système</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date de création</p>
                  <p>
                    {reservation.created_at
                      ? new Date(reservation.created_at).toLocaleString("fr-FR")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dernière modification</p>
                  <p>
                    {reservation.updated_at
                      ? new Date(reservation.updated_at).toLocaleString("fr-FR")
                      : "N/A"}
                  </p>
                </div>
                {reservation.stripe_session_id && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Stripe Session ID</p>
                    <p className="font-mono text-xs break-all">
                      {reservation.stripe_session_id}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-between">
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Envoyer un email
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Fermer
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la réservation ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la réservation de{" "}
              <strong>{reservation.nom}</strong> pour l&apos;atelier du{" "}
              <strong>
                {new Date(reservation.date_atelier).toLocaleDateString("fr-FR")}
              </strong>{" "}
              ?
              <br />
              <br />
              <span className="text-destructive font-medium">
                ⚠️ Cette action est irréversible.
              </span>
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
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
