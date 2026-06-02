"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { CheckCircle, Download, Home, Mail, Clock, Users, Sparkles, Euro, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getReservationById, getWorkshops } from "@/lib/supabase";
import type { Reservation, WorkshopDB } from "@/lib/types";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


export default function ReservationConfirmationPage() {
    const t = useTranslations("ReservationConfirmation");
    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();

    const sessionId = searchParams.get("session_id");
    const reservationId = searchParams.get("reservation_id");

    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [atelier, setAtelier] = useState<WorkshopDB | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                if (!reservationId) {
                    setError("Numéro de réservation manquant");
                    setLoading(false);
                    return;
                }

                const id = parseInt(reservationId, 10);
                if (isNaN(id)) {
                    setError("Numéro de réservation invalide");
                    setLoading(false);
                    return;
                }

                const reservationData = await getReservationById(id);

                if (!reservationData) {
                    setError("Réservation introuvable");
                    setLoading(false);
                    return;
                }

                // Vérifier que le statut est 'paid' ou 'confirmed'
                if (reservationData.status !== "paid" && reservationData.status !== "confirmed") {
                    setError("Cette réservation n'est pas encore confirmée");
                    setLoading(false);
                    return;
                }

                setReservation(reservationData);

                // Charger les détails de l'atelier
                const ateliers = await getWorkshops();
                const atelierData = ateliers.find(a => a.id === reservationData.atelier_id);
                if (atelierData) {
                    setAtelier(atelierData);
                }
            } catch (err) {
                console.error("Erreur lors du chargement:", err);
                setError("Une erreur est survenue lors du chargement");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [reservationId]);

    const handleDownloadPDF = () => {
        if (!reservation || !atelier) return;

        // Pour l'instant, on crée un PDF simple avec html2pdf
        // En production, utiliser une vraie librairie comme jsPDF ou pdfkit
        const content = `
CONFIRMATION DE RÉSERVATION
==========================

N° de réservation: ${reservation.id}
Date de confirmation: ${new Date().toLocaleDateString('fr-FR')}

ATELIER
-------
${atelier.titre}
Tarif: ${atelier.tarif_eur}€
Durée: ${atelier.duree_heures}h
Date: ${new Date(reservation.date_atelier).toLocaleDateString('fr-FR')}

PARTICIPANT(S)
---------------
Nom: ${reservation.nom}
Email: ${reservation.email}
Nombre de participants: ${reservation.participants_count}
${reservation.etablissement ? `Établissement: ${reservation.etablissement}` : ''}

INFORMATIONS PRATIQUES
----------------------
Statut: ${reservation.status === 'paid' ? 'Payé' : 'Confirmé'}
Un email de confirmation vous a été envoyé.
Veuillez arriver 10 minutes avant le début.

Pour toute question: contact@ateliers360.fr
        `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reservation_${reservation.id}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center">
                        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
                        <Skeleton className="h-8 w-64 mx-auto mb-2" />
                        <Skeleton className="h-4 w-96 mx-auto" />
                    </div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    if (error || !reservation) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <Alert className="border-red-500 bg-red-50 mb-6">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">
                            {error || "Réservation introuvable"}
                        </AlertDescription>
                    </Alert>
                    <Button asChild className="w-full">
                        <Link href="/">Retour à l'accueil</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Success */}
            <section className="w-full py-12 md:py-20 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="container px-4 md:px-6">
                    <div className="max-w-2xl mx-auto text-center space-y-4">
                        <CheckCircle className="h-16 w-16 mx-auto" />
                        <h1 className="text-3xl md:text-4xl font-bold">
                            Réservation Confirmée ! <Sparkles className="h-5 w-5 text-yellow-300 inline-block ml-2" />
                        </h1>
                        <p className="text-lg text-green-50">
                            Votre place est réservée pour l'atelier
                        </p>
                    </div>
                </div>
            </section>

            {/* Contenu Principal */}
            <section className="flex-1 w-full py-12 md:py-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-2xl mx-auto space-y-6">
                        {/* Confirmation Number */}
                        <Card className="border-2 border-green-200 bg-green-50">
                            <CardContent className="pt-6">
                                <div className="text-center space-y-2">
                                    <p className="text-sm text-muted-foreground">N° de réservation</p>
                                    <p className="text-3xl font-bold text-green-700">#{reservation.id}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Conservez ce numéro pour vos références
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Récapitulatif de l'Atelier */}
                        {atelier && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Atelier Réservé</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">{atelier.titre}</h3>
                                        <p className="text-sm text-muted-foreground">{atelier.description}</p>
                                    </div>

                                    <div className="grid gap-3 grid-cols-2">
                                        <div className="flex items-center gap-2 p-3 bg-muted rounded">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Date</p>
                                                <p className="font-semibold text-sm">
                                                    {format(new Date(reservation.date_atelier), 'dd MMMM yyyy', { locale: fr })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-muted rounded">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Durée</p>
                                                <p className="font-semibold text-sm">{atelier.duree_heures} heures</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-muted rounded">
                                            <Users className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Participants</p>
                                                <p className="font-semibold text-sm">{reservation.participants_count}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-muted rounded">
                                            <Euro className="h-5 w-5 text-primary" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Total</p>
                                                <p className="font-semibold text-sm">
                                                    {atelier.tarif_eur * reservation.participants_count}€
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Informations du Participant */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations du Participant</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Nom</p>
                                    <p className="font-semibold">{reservation.nom}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-semibold">{reservation.email}</p>
                                </div>
                                {reservation.etablissement && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Établissement</p>
                                        <p className="font-semibold">{reservation.etablissement}</p>
                                    </div>
                                )}
                                {reservation.adresse && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Adresse</p>
                                        <p className="font-semibold">{reservation.adresse}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Informations Pratiques */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informations Pratiques</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Alert>
                                    <Mail className="h-4 w-4" />
                                    <AlertDescription>
                                        Un email de confirmation a été envoyé à <strong>{reservation.email}</strong>
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-3 text-sm">
                                    <div className="flex gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold">Arrivez 10 minutes avant</p>
                                            <p className="text-muted-foreground">Pour permettre une installation complète</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold">Apportez vos affaires</p>
                                            <p className="text-muted-foreground">{atelier?.materiel || 'Matériel fourni'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold">Questions ?</p>
                                            <p className="text-muted-foreground">Contactez-nous à contact@ateliers360.fr</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statut de Paiement */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Statut du Paiement</p>
                                        <p className="font-semibold text-lg mt-1">
                                            {reservation.status === 'paid' ? 'Paiement reçu' : 'En attente'}
                                            {reservation.status === 'paid' ? (
                                                <Check className="h-5 w-5 text-green-600 inline-block ml-2" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-yellow-600 inline-block ml-2" />
                                            )}
                                        </p>
                                    </div>
                                    <Badge className={reservation.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                        {reservation.status === 'paid' ? 'Paiement reçu' : 'En attente'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={handleDownloadPDF}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Télécharger la confirmation
                            </Button>
                            <Button asChild className="flex items-center gap-2">
                                <Link href="/">
                                    <Home className="h-4 w-4" />
                                    Retour à l'accueil
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
