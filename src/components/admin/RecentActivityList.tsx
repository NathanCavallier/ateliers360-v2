'use client';

import { RecentActivity, AdminRole } from '@/types-admin';
import { formatActivityTime } from '@/lib/admin-utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Users } from 'lucide-react';

interface RecentActivityListProps {
  activities: RecentActivity[];
  maxItems?: number;
  userRole?: AdminRole;
}

export function RecentActivityList({
  activities,
  maxItems = 8,
  userRole = AdminRole.SuperAdmin,
}: RecentActivityListProps) {
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
          <CardDescription>Dernières réservations, ateliers et demandes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucune activité récente à afficher.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayedActivities = activities.slice(0, maxItems);
  const getTypeIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'reservation':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'workshop':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'request':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (type: RecentActivity['type'], metadata?: Record<string, any>) => {
    if (type === 'reservation') {
      const status = metadata?.status;
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'confirmed':
          return 'bg-blue-100 text-blue-800';
        case 'paid':
          return 'bg-green-100 text-green-800';
        case 'completed':
          return 'bg-emerald-100 text-emerald-800';
        case 'cancelled':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité Récente</CardTitle>
        <CardDescription>Dernières réservations, ateliers et demandes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.map((activity) => (
            <div
              key={`${activity.type}-${activity.id}`}
              className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0"
            >
              <div className="mt-1">{getTypeIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">{activity.action}</p>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getStatusBadgeColor(
                      activity.type,
                      activity.metadata
                    )}`}
                  >
                    {activity.metadata?.status || activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatActivityTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
