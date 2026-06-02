// Types pour les rôles d'administration
export enum AdminRole {
  SuperAdmin = 'super_admin',
  Moderator = 'moderator',
  Viewer = 'viewer',
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  created_at?: string;
  group_id?: string | null; // Pour les moderators (leur groupe assigné)
}

export interface AdminStats {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  totalRevenue: number;
  averageRevenuePerReservation: number;
  totalParticipants: number;
  totalWorkshops: number;
  activeWorkshops: number;
}

export interface RecentActivity {
  id: string | number;
  type: 'reservation' | 'workshop' | 'request';
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
