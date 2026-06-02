'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserSearch } from './UserSearch';
import { addGroupMember } from '@/lib/supabase';
import { Profile } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddMemberDialogProps {
  groupId: number;
}

export function AddMemberDialog({ groupId }: AddMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [role, setRole] = useState<'apprenant' | 'animateur'>('apprenant');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddMember = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await addGroupMember({
        group_id: groupId,
        user_id: selectedUser.id,
        role: role,
        joined_at: new Date().toISOString(),
      });
      setOpen(false);
      setSelectedUser(null);
      router.refresh();
      // Optional: Add toast notification here
    } catch (error) {
      console.error('Failed to add member:', error);
      alert('Erreur: Impossible d\'ajouter le membre. Vérifiez s\'il n\'est pas déjà dans le groupe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Ajouter un membre
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un membre</DialogTitle>
          <DialogDescription>
            Recherchez un utilisateur par nom ou email pour l'ajouter au groupe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
             <label className="text-sm font-medium">Rechercher</label>
             <UserSearch onSelect={setSelectedUser} selectedUserId={selectedUser?.id} />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Rôle</label>
            <Select value={role} onValueChange={(val: any) => setRole(val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apprenant">Apprenant</SelectItem>
                <SelectItem value="animateur">Animateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleAddMember} disabled={!selectedUser || loading}>
            {loading ? 'Ajout...' : 'Ajouter au groupe'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
