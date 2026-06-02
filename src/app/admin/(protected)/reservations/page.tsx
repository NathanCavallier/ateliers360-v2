'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getReservations, getWorkshops } from '@/lib/supabase';
import { Reservation, WorkshopDB } from '@/lib/types';
import { Eye, Mail, Check, X, Download, Trash2 } from 'lucide-react';
import { exportReservationsWithWorkshops, downloadCSV } from '@/lib/csv-export';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ReservationDetailModal } from '@/components/admin/ReservationDetailModal';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [workshops, setWorkshops] = useState<WorkshopDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [reservationsData, workshopsData] = await Promise.all([
          getReservations(),
          getWorkshops()
        ]);
        setReservations(reservationsData);
        setWorkshops(workshopsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleDataUpdate = async () => {
    try {
      const reservationsData = await getReservations();
      setReservations(reservationsData);
    } catch (error) {
      console.error('Failed to reload reservations:', error);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const csv = await exportReservationsWithWorkshops(reservations, workshops);
      const filename = `reservations_${new Date().toISOString().split('T')[0]}.csv`;
      downloadCSV(csv, filename);
    } catch (error) {
      console.error('Failed to export CSV:', error);
      alert('Erreur lors de l\'export CSV');
    } finally {
      setExporting(false);
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En attente</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmée</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Payée</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Terminée</Badge>;
      default:
        return <Badge variant="outline">{status || 'N/A'}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Chargement des réservations...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
        <p className="text-muted-foreground">Liste de toutes les réservations d&apos;ateliers</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Réservations ({reservations.length})</CardTitle>
              <CardDescription>Gérer les demandes de réservation</CardDescription>
            </div>
            <Button 
              onClick={handleExportCSV} 
              disabled={exporting || reservations.length === 0}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              {exporting ? 'Export en cours...' : 'Exporter CSV'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {reservations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Aucune réservation pour le moment.
            </p>
          ) : (
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-mono text-xs">{reservation.id}</TableCell>
                      <TableCell className="font-medium">{reservation.nom}</TableCell>
                      <TableCell>{reservation.email}</TableCell>
                      <TableCell>{reservation.atelier_id}</TableCell>
                      <TableCell>{new Date(reservation.date_atelier).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{reservation.participants_count}</TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell>
                        <ReservationDetailModal
                          reservation={reservation}
                          workshop={workshops.find(w => w.id === reservation.atelier_id)}
                          onUpdate={handleDataUpdate}
                        />
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
  );
}
