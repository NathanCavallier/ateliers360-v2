'use client';

import { useState, useEffect } from 'react';
import { GroupMember, Attendance } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { markAttendance } from '@/lib/supabase';
import { Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Make sure cn utility exists, usually does in shadcn

interface AttendanceSheetProps {
  sessionId: number;
  members: GroupMember[];
  initialAttendance?: Attendance[];
}

export function AttendanceSheet({ sessionId, members, initialAttendance = [] }: AttendanceSheetProps) {
  // Map memberId -> status
  const [attendanceState, setAttendanceState] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Initialize state from props
    const initial: Record<number, string> = {};
    initialAttendance.forEach(a => {
      initial[a.member_id] = a.status;
    });
    setAttendanceState(initial);
  }, [initialAttendance]);

  const handleStatusChange = async (memberId: number, status: 'present' | 'absent' | 'late' | 'excused') => {
    // Optimistic update
    setAttendanceState(prev => ({ ...prev, [memberId]: status }));
    setLoading(prev => ({ ...prev, [memberId]: true }));
    setSaved(prev => ({ ...prev, [memberId]: false }));

    try {
      await markAttendance({
        session_id: sessionId,
        member_id: memberId,
        status: status,
      });
      setSaved(prev => ({ ...prev, [memberId]: true }));
      // Hide saved indicator after 2s
      setTimeout(() => {
        setSaved(prev => ({ ...prev, [memberId]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      // Revert on error? Or just show error toast.
      alert('Erreur de sauvegarde');
    } finally {
      setLoading(prev => ({ ...prev, [memberId]: false }));
    }
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      {members.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Aucun membre dans ce groupe.</p>
      ) : (
        members.map(member => (
          <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-card">
            <div className="mb-2 sm:mb-0">
               <span className="font-medium block">Membre #{member.id}</span>
               <span className="text-xs text-muted-foreground">{member.role}</span>
            </div>
            
            <div className="flex items-center gap-2">
                 <RadioGroup 
                    value={attendanceState[member.id] || ''} 
                    onValueChange={(val) => handleStatusChange(member.id, val as any)}
                    className="flex flex-wrap gap-2"
                 >
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="present" id={`m${member.id}-present`} className="text-green-600 border-green-600" />
                        <Label htmlFor={`m${member.id}-present`} className="text-xs">Présent</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="late" id={`m${member.id}-late`} className="text-yellow-600 border-yellow-600" />
                        <Label htmlFor={`m${member.id}-late`} className="text-xs">Retard</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="absent" id={`m${member.id}-absent`} className="text-red-600 border-red-600" />
                        <Label htmlFor={`m${member.id}-absent`} className="text-xs">Absent</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                         <RadioGroupItem value="excused" id={`m${member.id}-excused`} className="text-blue-600 border-blue-600" />
                         <Label htmlFor={`m${member.id}-excused`} className="text-xs">Excusé</Label>
                    </div>
                 </RadioGroup>

                 <div className="w-6 flex justify-center">
                    {loading[member.id] && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    {!loading[member.id] && saved[member.id] && <Check className="h-4 w-4 text-green-600" />}
                 </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
