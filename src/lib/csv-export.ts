import { Reservation } from './types';

export function exportReservationsToCSV(reservations: Reservation[]): string {
    // En-têtes CSV
    const headers = [
        'ID',
        'Nom',
        'Email',
        'Établissement',
        'Adresse',
        'Atelier',
        'Date Atelier',
        'Participants',
        'Statut',
        'Stripe Session',
        'Date Création',
        'Date MAJ'
    ];

    // Convertir les réservations en lignes CSV
    const rows = reservations.map(reservation => {
        return [
            reservation.id?.toString(),
            escapeCSV(reservation.nom || ''),
            escapeCSV(reservation.email || ''),
            escapeCSV(reservation.etablissement || ''),
            escapeCSV(reservation.adresse || ''),
            reservation.atelier_id.toString(),
            reservation.date_atelier || '',
            reservation.participants_count?.toString() || '0',
            reservation.status || 'pending',
            escapeCSV(reservation.stripe_session_id || ''),
            formatDate(reservation.created_at),
            formatDate(reservation.updated_at)
        ].join(',');
    });

    // Combiner en-têtes et lignes
    const csv = [headers.join(','), ...rows].join('\n');
    return csv;
}

// Échapper les valeurs CSV (guillemets, virgules, retours à la ligne)
function escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

// Formater une date ISO en format lisible
function formatDate(dateString?: string): string {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
}

// Télécharger le fichier CSV
export function downloadCSV(csv: string, filename: string = 'reservations.csv'): void {
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

// Export avec enrichissement (nom des ateliers)
export async function exportReservationsWithWorkshops(
    reservations: Reservation[],
    workshops: { id: number | string; title?: string; titre?: string }[]
): Promise<string> {
    const headers = [
        'ID',
        'Nom',
        'Email',
        'Établissement',
        'Adresse',
        'Atelier ID',
        'Nom Atelier',
        'Date Atelier',
        'Participants',
        'Statut',
        'Stripe Session',
        'Date Création',
        'Date MAJ'
    ];

    const rows = reservations.map(reservation => {
        const workshop = workshops.find(w =>
            w.id.toString() === reservation.atelier_id.toString()
        );
        const workshopName = workshop?.title || workshop?.titre || 'Atelier inconnu';

        return [
            reservation.id?.toString(),
            escapeCSV(reservation.nom || ''),
            escapeCSV(reservation.email || ''),
            escapeCSV(reservation.etablissement || ''),
            escapeCSV(reservation.adresse || ''),
            reservation.atelier_id.toString(),
            escapeCSV(workshopName),
            reservation.date_atelier || '',
            reservation.participants_count?.toString() || '0',
            reservation.status || 'pending',
            escapeCSV(reservation.stripe_session_id || ''),
            formatDate(reservation.created_at),
            formatDate(reservation.updated_at)
        ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
}
