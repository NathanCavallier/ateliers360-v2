// src/app/[locale]/dashboard/contacts/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
} from '@/components/ui/alert-dialog';
import { Download, Trash2, RefreshCw, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { getAuthHeaders } from '@/lib/supabase';

interface ContactForm {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'in_progress' | 'responded' | 'closed' | 'spam';
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  responded: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
  spam: 'bg-red-100 text-red-800',
};

const STATUS_LABELS = {
  new: 'Nouveau',
  in_progress: 'En cours',
  responded: 'Répondu',
  closed: 'Fermé',
  spam: 'Spam',
};

export default function ContactsDashboardPage() {
    const { toast } = useToast();
    const [contacts, setContacts] = useState<ContactForm[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingStatus, setEditingStatus] = useState<string>('');

    useEffect(() => {
        loadContacts();
    }, [statusFilter]);

    const loadContacts = async () => {
        setLoading(true);
        try {
            let url = '/api/dashboard/demandes?type=contact_form';
            if (statusFilter !== 'all') {
                url += `&status=${statusFilter}`;
            }

            const headers = await getAuthHeaders();
            const res = await fetch(url, { headers });
            if (!res.ok) throw new Error('Erreur de chargement');

            const { data } = await res.json();
            setContacts(data || []);
        } catch (error) {
            console.error('Error loading contacts:', error);
            toast({
                title: 'Erreur',
                description: 'Impossible de charger les contacts',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const headers = await getAuthHeaders();
            headers['Content-Type'] = 'application/json';
            const res = await fetch(`/api/dashboard/demandes/${id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ type: 'contact_form', status: newStatus }),
            });

            if (!res.ok) throw new Error('Erreur de mise à jour');

            toast({
                title: 'Succès',
                description: 'Statut mis à jour',
            });

            setEditingId(null);
            loadContacts();
        } catch (error) {
            console.error('Error updating status:', error);
            toast({
                title: 'Erreur',
                description: 'Impossible de mettre à jour le statut',
                variant: 'destructive',
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const headers = await getAuthHeaders();
            headers['Content-Type'] = 'application/json';
            const res = await fetch(`/api/dashboard/demandes/${id}`, {
                method: 'DELETE',
                headers,
                body: JSON.stringify({ type: 'contact_form' }),
            });

            if (!res.ok) throw new Error('Erreur de suppression');

            toast({
                title: 'Succès',
                description: 'Contact supprimé',
            });

            loadContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast({
                title: 'Erreur',
                description: 'Impossible de supprimer',
                variant: 'destructive',
            });
        }
    };

    const handleExportCSV = () => {
        const headers = ['Nom', 'Email', 'Message', 'Statut', 'Date'];
        const rows = contacts.map((c) => [
            c.name,
            c.email,
            c.message.substring(0, 100),
            STATUS_LABELS[c.status],
            format(new Date(c.created_at), 'dd/MM/yyyy HH:mm', { locale: fr }),
        ]);

        const csv = [headers, ...rows].map((r) => r.map((cell) => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`);
        link.click();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Chargement des contacts...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">Gestion des Contacts</h1>
                    <p className="text-muted-foreground">Messages de formulaires de contact</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={loadContacts}
                        disabled={loading}
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Actualiser
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportCSV}
                        disabled={contacts.length === 0}
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
                            <CardTitle>Messages ({contacts.length})</CardTitle>
                            <CardDescription>Tous les messages de contact</CardDescription>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Tous les statuts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="new">Nouveau</SelectItem>
                                <SelectItem value="in_progress">En cours</SelectItem>
                                <SelectItem value="responded">Répondu</SelectItem>
                                <SelectItem value="closed">Fermé</SelectItem>
                                <SelectItem value="spam">Spam</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    {contacts.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            Aucun contact pour le moment.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="w-24">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell className="font-medium">{contact.name}</TableCell>
                                            <TableCell className="text-sm">
                                                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                                    {contact.email}
                                                </a>
                                            </TableCell>
                                            <TableCell className="text-sm max-w-xs truncate">
                                                {contact.message}
                                            </TableCell>
                                            <TableCell>
                                                {editingId === contact.id ? (
                                                    <Select
                                                        value={editingStatus}
                                                        onValueChange={(newStatus) => {
                                                            handleStatusChange(contact.id, newStatus);
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-40">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="new">Nouveau</SelectItem>
                                                            <SelectItem value="in_progress">En cours</SelectItem>
                                                            <SelectItem value="responded">Répondu</SelectItem>
                                                            <SelectItem value="closed">Fermé</SelectItem>
                                                            <SelectItem value="spam">Spam</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Badge
                                                        className={`${STATUS_COLORS[contact.status]} cursor-pointer`}
                                                        onClick={() => {
                                                            setEditingId(contact.id);
                                                            setEditingStatus(contact.status);
                                                        }}
                                                    >
                                                        {STATUS_LABELS[contact.status]}
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {format(new Date(contact.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                                            </TableCell>
                                            <TableCell>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="w-4 h-4 text-red-600" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Supprimer ce contact ?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Êtes-vous sûr ? Cette action est irréversible.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(contact.id)}
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
        </div>
    );
}
