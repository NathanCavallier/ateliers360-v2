"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Edit2, RefreshCw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { useLocale, useTranslations } from "next-intl";
import { getAuthHeaders } from '@/lib/supabase';

interface ReservationWithWorkshop {
  id: number;
  atelier_id: number;
  email: string;
  nom: string;
  etablissement?: string;
  adresse?: string;
  participants_count: number;
  date_atelier: string;
  status: "pending" | "confirmed" | "paid" | "completed" | "cancelled";
  stripe_session_id?: string;
  created_at: string;
  ateliers?: {
    id: number;
    titre: string;
    slug: string;
    tarif_eur: number;
    categorie: string;
    type: string;
  };
}

const STATUS_COLORS = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  paid: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-gray-50 text-gray-700 border-gray-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABELS = {
  pending: "En attente",
  confirmed: "Confirmée",
  paid: "Payée",
  completed: "Terminée",
  cancelled: "Annulée",
};

export default function ReservationsPage() {
  const { toast } = useToast();
  const t = useTranslations("ReservationsPage");
  const dashboardT = useTranslations("DashboardPage");
  const locale = useLocale();
  const [reservations, setReservations] = useState<ReservationWithWorkshop[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingStatus, setEditingStatus] = useState<string>("");

  useEffect(() => {
    loadReservations();
  }, [statusFilter]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      let url = "/api/dashboard/reservations";
      if (statusFilter !== "all") {
        url += `?status=${statusFilter}`;
      }

      const headers = await getAuthHeaders();
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error("Erreur de chargement");

      const { data } = await res.json();
      setReservations(data || []);
    } catch (error) {
      console.error("Error loading reservations:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const res = await fetch("/api/dashboard/reservations", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) throw new Error("Erreur de mise à jour");

      toast({
        title: "Succès",
        description: "Statut mis à jour",
      });

      setEditingId(null);
      loadReservations();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const res = await fetch("/api/dashboard/reservations", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Erreur de suppression");

      toast({
        title: "Succès",
        description: "Réservation supprimée",
      });

      loadReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la réservation",
        variant: "destructive",
      });
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Nom",
      "Email",
      "Atelier",
      "Date",
      "Participants",
      "Statut",
      "Tarif",
    ];
    const rows = reservations.map((r) => [
      r.id,
      r.nom,
      r.email,
      r.ateliers?.titre || "-",
      r.date_atelier,
      r.participants_count,
      STATUS_LABELS[r.status],
      (r.ateliers?.tarif_eur || 0) * r.participants_count,
    ]);

    const csv = [headers, ...rows].map((row) =>
      row.map((c) => `"${c}"`).join(",")
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `reservations_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.click();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">
            Chargement des réservations...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
              <p className="text-muted-foreground">
                Liste de toutes les réservations d'ateliers
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadReservations}
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                disabled={reservations.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter CSV
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Réservations ({reservations.length})</CardTitle>
                  <CardDescription>
                    Gérer les demandes de réservation
                  </CardDescription>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmée</SelectItem>
                    <SelectItem value="paid">Payée</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {reservations.length === 0
                ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucune réservation pour le moment.
                  </p>
                )
                : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Atelier</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-mono text-xs">
                              {reservation.id}
                            </TableCell>
                            <TableCell className="font-medium">
                              {reservation.nom}
                            </TableCell>
                            <TableCell className="text-sm">
                              {reservation.email}
                            </TableCell>
                            <TableCell className="text-sm">
                              {reservation.ateliers?.titre || "-"}
                            </TableCell>
                            <TableCell className="text-sm">
                              {format(
                                new Date(reservation.date_atelier),
                                "dd/MM/yyyy",
                                { locale: fr },
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {reservation.participants_count}
                            </TableCell>
                            <TableCell>
                              {editingId === reservation.id
                                ? (
                                  <Select
                                    value={editingStatus}
                                    onValueChange={(newStatus) => {
                                      handleStatusChange(
                                        reservation.id,
                                        newStatus,
                                      );
                                    }}
                                  >
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">
                                        En attente
                                      </SelectItem>
                                      <SelectItem value="confirmed">
                                        Confirmée
                                      </SelectItem>
                                      <SelectItem value="paid">
                                        Payée
                                      </SelectItem>
                                      <SelectItem value="completed">
                                        Terminée
                                      </SelectItem>
                                      <SelectItem value="cancelled">
                                        Annulée
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )
                                : (
                                  <Badge
                                    className={`${
                                      STATUS_COLORS[reservation.status]
                                    } cursor-pointer`}
                                    onClick={() => {
                                      setEditingId(reservation.id);
                                      setEditingStatus(reservation.status);
                                    }}
                                  >
                                    {STATUS_LABELS[reservation.status]}
                                  </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Supprimer la réservation ?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Êtes-vous sûr ? Cette action est
                                        irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Annuler
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDelete(reservation.id)}
                                        className="bg-red-600"
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <RightSidebar
          title={dashboardT("quick_actions")}
          description={dashboardT("quick_actions_desc")}
          actions={[
            {
              label: "Toutes les réservations",
              onClick: () => setStatusFilter(""),
              icon: <RefreshCw className="w-4 h-4" />,
            },
          ]}
          stats={[
            {
              label: "Total",
              value: reservations.length,
              icon: <Edit2 className="w-4 h-4" />,
              variant: "default",
            },
            {
              label: "En attente",
              value: reservations.filter((r) => r.status === "pending").length,
              icon: <Edit2 className="w-4 h-4" />,
              variant: "pending",
            },
            {
              label: "Confirmées",
              value:
                reservations.filter((r) =>
                  r.status === "confirmed" || r.status === "paid"
                ).length,
              icon: <Edit2 className="w-4 h-4" />,
              variant: "success",
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
