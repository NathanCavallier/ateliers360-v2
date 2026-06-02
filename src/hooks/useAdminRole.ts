import { useSession } from 'next-auth/react';
import { AdminRole, AdminUser } from '@/types-admin';

/**
 * Hook pour récupérer les informations de rôle de l'utilisateur admin
 * Actuellement, tous les utilisateurs authentifiés sont des super_admin
 * Cette structure permet d'ajouter ultérieurement un système de rôles granulaires
 */
export function useAdminRole(): {
  user: AdminUser | null;
  role: AdminRole;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isModerator: boolean;
  isViewer: boolean;
} {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  if (!session?.user) {
    return {
      user: null,
      role: AdminRole.Viewer,
      isLoading,
      isSuperAdmin: false,
      isModerator: false,
      isViewer: true,
    };
  }

  // Pour l'instant, tous les utilisateurs authentifiés sont des super_admin
  // À l'avenir, cette logique peut être enrichie avec une table `admin_users` en Supabase
  const adminUser: AdminUser = {
    id: session.user.id || 'admin',
    email: session.user.email || '',
    name: session.user.name || 'Admin',
    role: AdminRole.SuperAdmin, // Pour l'instant, tous les admin sont super_admin
    created_at: new Date().toISOString(),
  };

  return {
    user: adminUser,
    role: adminUser.role,
    isLoading,
    isSuperAdmin: adminUser.role === AdminRole.SuperAdmin,
    isModerator: adminUser.role === AdminRole.Moderator,
    isViewer: adminUser.role === AdminRole.Viewer,
  };
}
