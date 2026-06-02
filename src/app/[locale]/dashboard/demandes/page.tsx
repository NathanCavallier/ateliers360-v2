// src/app/[locale]/dashboard/demandes/page.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertCircle,
    Archive,
    CheckCircle,
    Clock,
    Download,
    Filter,
    RefreshCw,
    Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
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
import { useToast } from "@/hooks/use-toast";
import { getAuthHeaders } from '@/lib/supabase';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { useLocale, useTranslations } from "next-intl";

type RequestType =
    | "contact_form"
    | "structure_requests"
    | "company_requests"
    | "quotes";
type RequestStatus = "new" | "in_progress" | "closed" | "spam" | "responded";

interface DemandItem {
    id: string;
    created_at: string;
    updated_at: string;
    name?: string;
    email?: string;
    structure_name?: string;
    contact_name?: string;
    company_name?: string;
    message?: string;
    status: RequestStatus;
    [key: string]: any;
}

const REQUEST_TYPES: {
    type: RequestType;
    label: string;
    description: string;
}[] = [
    {
        type: "contact_form",
        label: "Demandes de Contact",
        description: "Messages généraux",
    },
    {
        type: "structure_requests",
        label: "Demandes Structures",
        description: "Écoles, associations, etc.",
    },
    {
        type: "company_requests",
        label: "Demandes Entreprises",
        description: "Formations professionnelles",
    },
    { type: "quotes", label: "Devis", description: "Demandes de devis" },
];

const STATUS_CONFIG = {
    new: {
        label: "Nouveau",
        color: "bg-blue-100 text-blue-800",
        icon: AlertCircle,
    },
    in_progress: {
        label: "En cours",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
    },
    responded: {
        label: "Répondu",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
    },
    closed: {
        label: "Fermé",
        color: "bg-gray-100 text-gray-800",
        icon: Archive,
    },
    spam: {
        label: "Spam",
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
    },
};

export default function DemandesPage() {
    const { toast } = useToast();
    const t = useTranslations("DemandesPage");
    const dashboardT = useTranslations("DashboardPage");
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<RequestType>("contact_form");
    const [demandes, setDemandes] = useState<DemandItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        responded: 0,
        closed: 0,
    });

    // Charger les demandes
    const loadDemandes = async (type: RequestType, status?: string) => {
        setLoading(true);
        try {
            let url = `/api/dashboard/demandes?type=${type}`;
            if (status) {
                url += `&status=${status}`;
            }

            const headers = await getAuthHeaders();
            const res = await fetch(url, { headers });
            if (!res.ok) throw new Error("Erreur de chargement");

            const { data, total } = await res.json();
            setDemandes(data || []);
            setStats((prev) => ({ ...prev, total }));
        } catch (error) {
            console.error("Error loading demandes:", error);
            toast({
                title: "Erreur",
                description: "Impossible de charger les demandes",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Charger au montage et au changement d'onglet
    useEffect(() => {
        loadDemandes(activeTab);
    }, [activeTab]);

    // Mettre à jour le statut
    const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
        try {
            const headers = await getAuthHeaders();
            headers['Content-Type'] = 'application/json';
            const res = await fetch(`/api/dashboard/demandes/${id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify({ type: activeTab, status: newStatus }),
            });

            if (!res.ok) throw new Error("Erreur de mise à jour");

            toast({
                title: "Succès",
                description: "Statut mis à jour",
            });

            // Recharger
            loadDemandes(activeTab);
        } catch (error) {
            console.error("Error updating status:", error);
            toast({
                title: "Erreur",
                description: "Impossible de mettre à jour le statut",
                variant: "destructive",
            });
        }
    };

    // Supprimer une demande
    const handleDelete = async (id: string) => {
        try {
            const headers = await getAuthHeaders();
            headers['Content-Type'] = 'application/json';
            const res = await fetch(`/api/dashboard/demandes/${id}`, {
                method: "DELETE",
                headers,
                body: JSON.stringify({ type: activeTab }),
            });

            if (!res.ok) throw new Error("Erreur de suppression");

            toast({
                title: "Succès",
                description: "Demande supprimée",
            });

            loadDemandes(activeTab);
        } catch (error) {
            console.error("Error deleting demande:", error);
            toast({
                title: "Erreur",
                description: "Impossible de supprimer",
                variant: "destructive",
            });
        }
    };

    // Exporter en CSV
    const handleExport = () => {
        // Simple CSV export
        const headers = ["ID", "Nom", "Email", "Message", "Statut", "Date"];
        const rows = demandes.map((d) => [
            d.id,
            d.name || d.contact_name || d.company_name || "-",
            d.email || "-",
            (d.message || "").substring(0, 100),
            d.status,
            format(new Date(d.created_at), "dd/MM/yyyy"),
        ]);

        const csv = [headers, ...rows].map((r) =>
            r.map((c) => `"${c}"`).join(",")
        ).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activeTab}_${
            new Date().toISOString().split("T")[0]
        }.csv`;
        a.click();
    };

    const getContactName = (item: DemandItem) => {
        return item.name || item.contact_name || item.company_name || "N/A";
    };

    const getEmail = (item: DemandItem) => {
        return item.email || "N/A";
    };

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* MAIN CONTENT */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Gestion des Demandes
                            </h1>
                            <p className="text-muted-foreground">
                                Contact, structures, entreprises, devis
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => loadDemandes(activeTab)}
                                disabled={loading}
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Actualiser
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleExport}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Exporter
                            </Button>
                        </div>
                    </div>

                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => setActiveTab(v as RequestType)}
                    >
                        <TabsList className="grid w-full grid-cols-4">
                            {REQUEST_TYPES.map(({ type, label }) => (
                                <TabsTrigger key={type} value={type}>
                                    {label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {REQUEST_TYPES.map(({ type }) => (
                            <TabsContent key={type} value={type}>
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>
                                                    Demandes ({demandes.length})
                                                </CardTitle>
                                                <CardDescription>
                                                    Liste complète des demandes
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {loading
                                            ? (
                                                <div className="flex justify-center py-8">
                                                    <p className="text-muted-foreground">
                                                        Chargement...
                                                    </p>
                                                </div>
                                            )
                                            : demandes.length === 0
                                            ? (
                                                <div className="flex justify-center py-8">
                                                    <p className="text-muted-foreground">
                                                        Aucune demande
                                                    </p>
                                                </div>
                                            )
                                            : (
                                                <div className="overflow-x-auto">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>
                                                                    Contact
                                                                </TableHead>
                                                                <TableHead>
                                                                    Email
                                                                </TableHead>
                                                                <TableHead>
                                                                    Message
                                                                </TableHead>
                                                                <TableHead>
                                                                    Statut
                                                                </TableHead>
                                                                <TableHead>
                                                                    Date
                                                                </TableHead>
                                                                <TableHead className="w-20">
                                                                    Actions
                                                                </TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {demandes.map((
                                                                demande,
                                                            ) => (
                                                                <TableRow
                                                                    key={demande
                                                                        .id}
                                                                >
                                                                    <TableCell className="font-medium">
                                                                        {getContactName(
                                                                            demande,
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell className="text-sm">
                                                                        {getEmail(
                                                                            demande,
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell className="text-sm max-w-xs truncate">
                                                                        {demande
                                                                            .message ||
                                                                            "-"}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="flex gap-2">
                                                                            <Badge
                                                                                className={STATUS_CONFIG[
                                                                                    demande
                                                                                        .status
                                                                                ]?.color ||
                                                                                    "bg-gray-100"}
                                                                            >
                                                                                {STATUS_CONFIG[
                                                                                    demande
                                                                                        .status
                                                                                ]?.label ||
                                                                                    demande
                                                                                        .status}
                                                                            </Badge>
                                                                            <button
                                                                                className="text-xs underline text-blue-600"
                                                                                onClick={() => {
                                                                                    const statuses:
                                                                                        RequestStatus[] =
                                                                                            [
                                                                                                "new",
                                                                                                "in_progress",
                                                                                                "responded",
                                                                                                "closed",
                                                                                            ];
                                                                                    const nextStatus =
                                                                                        statuses[
                                                                                            (statuses
                                                                                                .indexOf(
                                                                                                    demande
                                                                                                        .status,
                                                                                                ) +
                                                                                                1) %
                                                                                            statuses
                                                                                                .length
                                                                                        ];
                                                                                    handleStatusChange(
                                                                                        demande
                                                                                            .id,
                                                                                        nextStatus,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Suivant
                                                                            </button>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell className="text-sm text-muted-foreground">
                                                                        {format(
                                                                            new Date(
                                                                                demande
                                                                                    .created_at,
                                                                            ),
                                                                            "dd/MM/yyyy HH:mm",
                                                                            {
                                                                                locale:
                                                                                    fr,
                                                                            },
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <AlertDialog>
                                                                            <AlertDialogTrigger
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                >
                                                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                                                </Button>
                                                                            </AlertDialogTrigger>
                                                                            <AlertDialogContent>
                                                                                <AlertDialogHeader>
                                                                                    <AlertDialogTitle>
                                                                                        Supprimer
                                                                                        ?
                                                                                    </AlertDialogTitle>
                                                                                    <AlertDialogDescription>
                                                                                        Êtes-vous
                                                                                        sûr
                                                                                        ?
                                                                                        Cette
                                                                                        action
                                                                                        est
                                                                                        irréversible.
                                                                                    </AlertDialogDescription>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogCancel>
                                                                                        Annuler
                                                                                    </AlertDialogCancel>
                                                                                    <AlertDialogAction
                                                                                        onClick={() =>
                                                                                            handleDelete(
                                                                                                demande
                                                                                                    .id,
                                                                                            )}
                                                                                        className="bg-red-600"
                                                                                    >
                                                                                        Supprimer
                                                                                    </AlertDialogAction>
                                                                                </AlertDialogFooter>
                                                                            </AlertDialogContent>
                                                                        </AlertDialog>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                {/* RIGHT SIDEBAR */}
                <RightSidebar
                    title={dashboardT("quick_actions")}
                    description={dashboardT("quick_actions_desc")}
                    actions={[
                        {
                            label: "Toutes les demandes",
                            onClick: () => setActiveTab("contact_form"),
                            icon: <RefreshCw className="w-4 h-4" />,
                        },
                    ]}
                    stats={[
                        {
                            label: "Total",
                            value: demandes.length,
                            icon: <Filter className="w-4 h-4" />,
                            variant: "default",
                        },
                        {
                            label: "Nouvelles",
                            value:
                                demandes.filter((d) => d.status === "new")
                                    .length,
                            icon: <AlertCircle className="w-4 h-4" />,
                            variant: "pending",
                        },
                        {
                            label: "Répondues",
                            value:
                                demandes.filter((d) => d.status === "responded")
                                    .length,
                            icon: <CheckCircle className="w-4 h-4" />,
                            variant: "success",
                        },
                    ]}
                />
            </div>
        </DashboardLayout>
    );
}
