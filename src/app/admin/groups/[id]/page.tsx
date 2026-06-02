import Link from 'next/link';
import { getGroupById, getGroups, getGroupMembers, getGroupSessions, getGroupResources } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Users, Calendar, BarChart, FileText } from 'lucide-react';
import { GroupMember, GroupSession, GroupResource } from '@/lib/types';
import { AddMemberDialog } from '@/components/groups/AddMemberDialog';
import { AddSessionDialog } from '@/components/groups/AddSessionDialog';
import { ManageAttendanceDialog } from '@/components/groups/ManageAttendanceDialog';
import { ResourceList } from '@/components/groups/ResourceList';
import { UploadResourceDialog } from '@/components/groups/UploadResourceDialog';
import { GroupMembersList } from '@/components/groups/GroupMembersList';
import { MonitoringDashboard } from '@/components/groups/MonitoringDashboard';
import ProjectsTab from '@/components/groups/ProjectsTab';

export const dynamic = 'force-dynamic';

export default async function GroupDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const group = await getGroupById(Number(id));
  const members = await getGroupMembers(Number(id));
  const sessions = await getGroupSessions(Number(id));
  const resources = await getGroupResources(Number(id));

  if (!group) {
    return <div>Groupe non trouvé.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{group.name}</h1>
          <p className="text-muted-foreground">
            {group.level} • {group.age_range} • {group.establishment}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/groups/${id}/edit`}>
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" /> Modifier
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Membres ({members.length})</TabsTrigger>
          <TabsTrigger value="planning">Planning ({sessions.length})</TabsTrigger>
          <TabsTrigger value="resources">Ressources ({resources.length})</TabsTrigger>
          <TabsTrigger value="projects">Projets (Fil Rouge)</TabsTrigger>
          <TabsTrigger value="monitoring">Suivi Pédagogique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Apprenants</CardTitle>
                    <CardDescription>Gérez les élèves et les formateurs de ce groupe.</CardDescription>
                </CardHeader>
                <CardContent>
                    <GroupMembersList members={members} groupId={Number(id)} />
                    <div className="mt-4">
                        <AddMemberDialog groupId={Number(id)} />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="planning" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sessions à venir</CardTitle>
                </CardHeader>
                <CardContent>
                     {sessions.length === 0 ? (
                        <p className="text-muted-foreground">Aucune session planifiée.</p>
                    ) : (
                        <ul className="space-y-2">
                            {sessions.map((session: GroupSession) => (
                                <li key={session.id} className="p-3 border rounded flex justify-between items-center">
                                    <div>
                                        <div className="font-semibold">{session.date_session} - {session.start_time}</div>
                                        <div>{session.title || 'Session standard'}</div>
                                    </div>
                                    <ManageAttendanceDialog session={session} members={members} />
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-4">
                        <AddSessionDialog groupId={Number(id)} />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ressources du groupe</CardTitle>
                    <CardDescription>Documents et liens partagés avec les apprenants.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResourceList resources={resources} />
                    <div className="mt-4">
                        <UploadResourceDialog groupId={Number(id)} />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Projets Fil Rouge</CardTitle>
                    <CardDescription>Gérez les projets à long terme et leurs étapes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectsTab groupId={Number(id)} />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Suivi Pédagogique</CardTitle>
                    <CardDescription>Cliquez sur l'icône "Chapeau" d'un élève pour voir/ajouter des notes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MonitoringDashboard members={members} />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
