'use client';

import { AdminStats, AdminRole } from '@/types-admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRolePermissions } from '@/lib/admin-permissions';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Lock,
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color?: 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'emerald';
  restricted?: boolean;
}

function StatsCard({
  title,
  value,
  description,
  icon,
  restricted = false,
}: StatsCardProps) {
  if (restricted) {
    return (
      <Card className="relative opacity-60">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="relative">
            {icon}
            <Lock className="h-3 w-3 absolute -top-1 -right-1 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">---</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

interface RoleBasedStatsProps {
  stats: AdminStats;
  userRole: AdminRole;
}

/**
 * Composant pour afficher les statistiques avec affichage conditionnel par rôle
 */
export function RoleBasedStats({ stats, userRole }: RoleBasedStatsProps) {
  const permissions = getRolePermissions(userRole);
  const isViewer = userRole === AdminRole.Viewer;

  return (
    <div>
      {/* Info banner pour les viewers */}
      {isViewer && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900">Accès en lecture seule</p>
            <p className="text-xs text-blue-800">
              Vous pouvez consulter les données mais pas les modifier.
            </p>
          </div>
        </div>
      )}

      {/* Stats Principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Réservations"
          value={stats.totalReservations}
          description="Toutes les réservations"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          restricted={!permissions.canViewAllReservations}
        />

        <StatsCard
          title="En Attente"
          value={stats.pendingReservations}
          description="À confirmer"
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
          restricted={!permissions.canViewAllReservations}
        />

        <StatsCard
          title="Confirmées"
          value={stats.confirmedReservations}
          description="Réservations validées"
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          restricted={!permissions.canViewAllReservations}
        />

        <StatsCard
          title="Revenu Total"
          value={`${stats.totalRevenue.toLocaleString('fr-FR')}€`}
          description="Réservations payées/complétées"
          icon={<DollarSign className="h-4 w-4 text-green-600" />}
          restricted={!permissions.canViewAnalytics}
        />
      </div>

      {/* Stats Secondaires */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Participants"
          value={stats.totalParticipants}
          description="Total de participants"
          icon={<Users className="h-4 w-4 text-blue-500" />}
          restricted={!permissions.canViewAllReservations}
        />

        <StatsCard
          title="Ateliers"
          value={stats.totalWorkshops}
          description={`${stats.activeWorkshops} actifs`}
          icon={<Calendar className="h-4 w-4 text-purple-500" />}
          restricted={!permissions.canViewAllWorkshops}
        />

        <StatsCard
          title="Complétées"
          value={stats.completedReservations}
          description="Ateliers réalisés"
          icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
          restricted={!permissions.canViewAllReservations}
        />

        <StatsCard
          title="Taux de Complétion"
          value={`${stats.totalReservations > 0 ? Math.round((stats.completedReservations / stats.totalReservations) * 100) : 0}%`}
          description="Parmi les réservations"
          icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
          restricted={!permissions.canViewAllReservations}
        />
      </div>

      {/* Analytics - Super Admin Only */}
      {permissions.canViewAnalytics && (
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Revenu Moyen
              </CardTitle>
              <CardDescription>Par réservation payée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.averageRevenuePerReservation}€
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Taux de Confirmation
              </CardTitle>
              <CardDescription>
                {stats.totalReservations > 0
                  ? `${Math.round(
                      (stats.confirmedReservations / stats.totalReservations) *
                        100
                    )}%`
                  : 'N/A'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.confirmedReservations} / {stats.totalReservations}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role Badge */}
      <div className="flex justify-end mb-8">
        <Badge variant="outline" className="capitalize">
          {userRole === AdminRole.SuperAdmin && 'Super Admin'}
          {userRole === AdminRole.Moderator && 'Modérateur'}
          {userRole === AdminRole.Viewer && 'Lecteur'}
        </Badge>
      </div>
    </div>
  );
}
