'use client';

import { Evaluation } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EvaluationListProps {
  evaluations: Evaluation[];
}

export function EvaluationList({ evaluations }: EvaluationListProps) {
  if (evaluations.length === 0) {
    return <p className="text-muted-foreground text-center py-4">Aucune note pour le moment.</p>;
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'observation': return 'Observation';
      case 'feedback': return 'Feedback';
      case 'grade': return 'Note';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'observation': return 'secondary';
      case 'feedback': return 'outline';
      case 'grade': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {evaluations.map((evaluation) => (
        <Card key={evaluation.id} className="bg-muted/50">
          <CardContent className="p-3 space-y-2">
             <div className="flex justify-between items-start">
                <Badge variant={getTypeColor(evaluation.type) as any}>
                    {getTypeLabel(evaluation.type)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                    {new Date(evaluation.created_at).toLocaleDateString()}
                </span>
             </div>
             <p className="text-sm whitespace-pre-wrap">{evaluation.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
