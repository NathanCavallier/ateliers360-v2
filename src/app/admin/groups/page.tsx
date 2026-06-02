import Link from 'next/link';
import { getGroups } from '@/lib/supabase';
import { GroupList } from '@/components/groups/GroupList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Groupes</h1>
        <Link href="/admin/groups/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Nouveau Groupe
          </Button>
        </Link>
      </div>

      <GroupList groups={groups} />
    </div>
  );
}
