/**
 * Utilitaires pour filtrer les données par groupe/établissement
 * Utilisés pour les moderators qui ne voient que leurs propres données
 */

import { Database } from '@/lib/types';

type Reservation = Database['public']['Tables']['reservations']['Row'];
type Workshop = Database['public']['Tables']['ateliers']['Row'];

/**
 * Filtre les réservations pour un établissement/groupe spécifique
 * À améliorer: joindre avec une table user_groups ou etablissements
 */
export function filterReservationsByEstablishment(
  reservations: Reservation[],
  _establishmentId?: string | null
): Reservation[] {
  // Pour l'instant, retourner toutes les réservations
  // À améliorer avec une vraie jointure une fois la table etablissements créée
  return reservations;
}

/**
 * Filtre les ateliers pour un établissement/groupe spécifique
 */
export function filterWorkshopsByEstablishment(
  workshops: Workshop[],
  _establishmentId?: string | null
): Workshop[] {
  // Pour l'instant, retourner tous les ateliers
  // À améliorer avec une vraie jointure une fois la table etablissements créée
  return workshops;
}

/**
 * Récupère les permissions disponibles pour un rôle spécifique
 */
export interface RolePermissions {
  canViewDashboard: boolean;
  canViewAllReservations: boolean;
  canViewAllWorkshops: boolean;
  canEditReservations: boolean;
  canEditWorkshops: boolean;
  canDeleteReservations: boolean;
  canDeleteWorkshops: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canViewSettings: boolean;
  canEditSettings: boolean;
}

export function getRolePermissions(role: string): RolePermissions {
  switch (role) {
    case 'super_admin':
      return {
        canViewDashboard: true,
        canViewAllReservations: true,
        canViewAllWorkshops: true,
        canEditReservations: true,
        canEditWorkshops: true,
        canDeleteReservations: true,
        canDeleteWorkshops: true,
        canViewAnalytics: true,
        canManageUsers: true,
        canViewSettings: true,
        canEditSettings: true,
      };
    case 'moderator':
      return {
        canViewDashboard: true,
        canViewAllReservations: false, // Seulement son groupe
        canViewAllWorkshops: false, // Seulement son groupe
        canEditReservations: true,
        canEditWorkshops: true,
        canDeleteReservations: false,
        canDeleteWorkshops: false,
        canViewAnalytics: true,
        canManageUsers: false,
        canViewSettings: false,
        canEditSettings: false,
      };
    case 'viewer':
    default:
      return {
        canViewDashboard: true,
        canViewAllReservations: true,
        canViewAllWorkshops: true,
        canEditReservations: false,
        canEditWorkshops: false,
        canDeleteReservations: false,
        canDeleteWorkshops: false,
        canViewAnalytics: false,
        canManageUsers: false,
        canViewSettings: false,
        canEditSettings: false,
      };
  }
}
