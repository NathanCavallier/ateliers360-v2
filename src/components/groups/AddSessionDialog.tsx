'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SessionForm } from './SessionForm';
import { createGroupSession } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

interface AddSessionDialogProps {
  groupId: number;
}

export function AddSessionDialog({ groupId }: AddSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateSession = async (data: any) => {
    setLoading(true);
    try {
      await createGroupSession({
        ...data,
        group_id: groupId,
      });
      setOpen(false);
      router.refresh();
      // Optional: Add toast
    } catch (error) {
      console.error('Failed to create session:', error);
      alert('Erreur lors de la planification de la session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Planifier une session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Session</DialogTitle>
          <DialogDescription>
            Ajoutez une séance au planning de ce groupe.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
            <SessionForm onSubmit={handleCreateSession} isSubmitting={loading} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
