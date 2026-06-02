import { AdminStats, RecentActivity } from '@/types-admin';
import { Database } from '@/lib/types';

type Reservation = Database['public']['Tables']['reservations']['Row'];
type Workshop = Database['public']['Tables']['ateliers']['Row'];

/**
 * Calcule les statistiques du dashboard à partir des réservations réelles
 */
export async function calculateDashboardStats(
  reservations: Reservation[],
  workshops: Workshop[]
): Promise<AdminStats> {
  const pending = reservations.filter((r) => r.status === 'pending').length;
  const confirmed = reservations.filter((r) => r.status === 'confirmed').length;
  const paid = reservations.filter((r) => r.status === 'paid').length;
  const completed = reservations.filter((r) => r.status === 'completed').length;

  // Calculer le revenu réel (uniquement pour les réservations payées/complétées)
  const paidReservations = reservations.filter(
    (r) => r.status === 'paid' || r.status === 'completed'
  );

  // On suppose que les tarifs sont disponibles via les ateliers
  // Pour cette implémentation, on fait une estimation basée sur le nombre de participants
  // À améliorer: Joindre avec la table ateliers pour obtenir les vrais tarifs
  let totalRevenue = 0;
  let totalParticipants = 0;

  for (const reservation of paidReservations) {
    const participants = reservation.participants_count || 1;
    totalParticipants += participants;
    // Estimation: 150€ par participant pour les réservations payées
    // À remplacer par le tarif réel depuis la table ateliers
    totalRevenue += participants * 150;
  }

  const activeWorkshops = workshops.filter((w) => w.sequence_order !== null).length;

  return {
    totalReservations: reservations.length,
    pendingReservations: pending,
    confirmedReservations: confirmed + paid,
    completedReservations: completed,
    cancelledReservations: 0, // Pas de statut 'cancelled' dans le système actuel
    totalRevenue,
    averageRevenuePerReservation:
      paidReservations.length > 0
        ? Math.round(totalRevenue / paidReservations.length)
        : 0,
    totalParticipants,
    totalWorkshops: workshops.length,
    activeWorkshops,
  };
}

/**
 * Récupère l'activité récente (dernières réservations, ateliers créés, etc.)
 */
export function getRecentActivity(
  reservations: Reservation[],
  workshops: Workshop[]
): RecentActivity[] {
  const activities: RecentActivity[] = [];

  // Ajouter les 5 dernières réservations
  const recentReservations = reservations.slice(0, 5);
  for (const reservation of recentReservations) {
    activities.push({
      id: reservation.id,
      type: 'reservation',
      action: `Réservation ${reservation.status}`,
      description: `${reservation.nom || 'N/A'} - ${reservation.participants_count || 0} participant(s)`,
      timestamp: reservation.created_at,
      metadata: {
        email: reservation.email,
        status: reservation.status,
        participants: reservation.participants_count,
      },
    });
  }

  // Ajouter les 3 derniers ateliers créés
  const recentWorkshops = workshops.slice(0, 3);
  for (const workshop of recentWorkshops) {
    activities.push({
      id: workshop.id,
      type: 'workshop',
      action: 'Atelier créé',
      description: workshop.titre,
      timestamp: workshop.created_at,
      metadata: {
        slug: workshop.slug,
        category: workshop.categorie,
      },
    });
  }

  // Trier par timestamp (plus récent d'abord)
  return activities.sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

/**
 * Formate une date pour l'affichage
 */
export function formatActivityTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} minute(s)`;
  if (diffHours < 24) return `Il y a ${diffHours} heure(s)`;
  if (diffDays < 7) return `Il y a ${diffDays} jour(s)`;

  return date.toLocaleDateString('fr-FR');
}

/**
 * Filtre les statistiques selon le rôle de l'utilisateur
 * - SuperAdmin: Voit tout
 * - Moderator: Voit seulement son groupe
 * - Viewer: Accès en lecture seule à tout
 */
export function filterStatsByRole(
  stats: AdminStats,
  role: string,
  _groupId?: string
): AdminStats {
  // Pour l'instant, tous les rôles voient les mêmes statistiques
  // À améliorer: filtrer par groupe_id pour les Moderator
  return stats;
}
