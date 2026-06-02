'use client';

import { GroupMember } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { removeGroupMember } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface GroupMembersListProps {
  members: GroupMember[];
  groupId: number;
}

export function GroupMembersList({ members, groupId }: GroupMembersListProps) {
  const router = useRouter();

  const handleRemove = async (userId: string) => {
    if (!confirm('Voulez-vous vraiment retirer ce membre du groupe ?')) return;

    const success = await removeGroupMember(groupId, userId);
    if (success) {
      router.refresh();
    } else {
      alert('Erreur lors de la suppression du membre.');
    }
  };

  if (members.length === 0) {
    return <p className="text-muted-foreground">Aucun membre dans ce groupe.</p>;
  }

  return (
    <ul className="space-y-2">
      {members.map((member) => (
        <li key={member.id} className="p-2 border rounded flex justify-between items-center bg-card">
          <div className="flex flex-col">
            <span className="font-medium">Membre #{member.id}</span>
            <span className="text-xs text-muted-foreground">User ID: {member.user_id}</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-sm bg-secondary px-2 py-1 rounded">{member.role}</span>
             <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                onClick={() => handleRemove(member.user_id)}
                title="Retirer du groupe"
             >
                <Trash2 className="h-4 w-4" />
             </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
