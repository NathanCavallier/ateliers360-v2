'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AttendanceSheet } from './AttendanceSheet';
import { GroupMember, Attendance } from '@/lib/types';
import { ClipboardCheck, Loader2 } from 'lucide-react';
import { getAttendanceForSession } from '@/lib/supabase';

interface ManageAttendanceDialogProps {
  session: { id: number; title?: string | null; date_session: string };
  members: GroupMember[];
}

export function ManageAttendanceDialog({ session, members }: ManageAttendanceDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      getAttendanceForSession(session.id)
        .then((data) => {
          setAttendanceData(data);
        })
        .catch((err) => console.error('Failed to load attendance', err))
        .finally(() => setLoading(false));
    }
  }, [open, session.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Faire l'appel">
          <ClipboardCheck className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Feuille d'appel : {session.date_session}</DialogTitle>
          <DialogDescription>
            {session.title || 'Session sans titre'}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
            <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ) : (
            <AttendanceSheet sessionId={session.id} members={members} initialAttendance={attendanceData} />
        )}
      </DialogContent>
    </Dialog>
  );
}
