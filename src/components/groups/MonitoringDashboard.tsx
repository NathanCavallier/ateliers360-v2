'use client';

import { GroupMember } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentEvaluationSheet } from './StudentEvaluationSheet';

interface MonitoringDashboardProps {
  members: GroupMember[];
}

export function MonitoringDashboard({ members }: MonitoringDashboardProps) {
  
  if (members.length === 0) {
      return <p className="text-muted-foreground">Aucun élève à suivre.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
            <Card key={member.id} className="flex flex-col justify-between">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between items-start">
                         <span>Membre #{member.id}</span>
                         <StudentEvaluationSheet member={member} />
                    </CardTitle>
                    <CardDescription className="text-xs truncate">
                        User ID: {member.user_id}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Role: {member.role}</span>
                        {/* Could add 'Last evaluation date' here later */}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  );
}
