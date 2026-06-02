'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { GroupMember, Evaluation } from '@/lib/types';
import { GraduationCap, Loader2 } from 'lucide-react';
import { getEvaluations } from '@/lib/supabase';
import { EvaluationList } from './EvaluationList';
import { AddEvaluationForm } from './AddEvaluationForm';

interface StudentEvaluationSheetProps {
  member: GroupMember;
}

export function StudentEvaluationSheet({ member }: StudentEvaluationSheetProps) {
  const [open, setOpen] = useState(false);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvaluations = async () => {
    setLoading(true);
    try {
        const data = await getEvaluations(member.id);
        setEvaluations(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
        fetchEvaluations();
    }
  }, [open, member.id]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Suivi pédagogique">
            <GraduationCap className="h-4 w-4 text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Suivi : Membre #{member.id}</SheetTitle>
          <SheetDescription>
            Historique des observations et feedbacks.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Historique</h3>
            {loading ? (
                 <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <EvaluationList evaluations={evaluations} />
            )}
            
            <AddEvaluationForm memberId={member.id} onSuccess={fetchEvaluations} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
