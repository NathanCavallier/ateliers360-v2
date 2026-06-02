'use client';

import { useState, useEffect } from 'react';
import { getReservations, getWorkshops } from '@/lib/supabase';
import { calculateDashboardStats, getRecentActivity } from '@/lib/admin-utils';
import { useAdminRole } from '@/hooks/useAdminRole';
import { AdminStats, RecentActivity } from '@/types-admin';
import { RecentActivityList } from '@/components/admin/RecentActivityList';
import { RoleBasedStats } from '@/components/admin/RoleBasedStats';
import { AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { user, role, isLoading: roleLoading } = useAdminRole();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const [reservations, workshops] = await Promise.all([
          getReservations(),
          getWorkshops(),
        ]);

        // Calculer les statistiques réelles
        const calculatedStats = await calculateDashboardStats(
          reservations,
          workshops
        );
        setStats(calculatedStats);

        // Récupérer l'activité récente
        const activities = getRecentActivity(reservations, workshops);
        setRecentActivities(activities);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError(
          'Erreur lors du chargement des données du tableau de bord'
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (roleLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Chargement du tableau de bord...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">
          Aucune donnée disponible
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Vue d&apos;ensemble de l&apos;activité Ateliers 360
        </p>
        {user && (
          <p className="text-xs text-muted-foreground mt-2">
            Connecté en tant que: <span className="font-medium">{user.name}</span> ({role})
          </p>
        )}
      </div>

      {/* Role-Based Stats Display */}
      <RoleBasedStats stats={stats} userRole={role} />

      {/* Recent Activity */}
      <RecentActivityList
        activities={recentActivities}
        maxItems={8}
        userRole={role}
      />
    </div>
  );
}
