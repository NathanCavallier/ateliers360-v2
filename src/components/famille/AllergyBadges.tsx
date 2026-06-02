import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Props {
  allergies?: string[] | null;
  otherAllergies?: string | null;
}

export default function AllergyBadges({ allergies, otherAllergies }: Props) {
  const list: string[] = [];

  if (Array.isArray(allergies)) {
    list.push(...allergies.filter(Boolean));
  }

  if (otherAllergies && otherAllergies.trim()) {
    // split by comma/semicolon and trim
    const parts = otherAllergies
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    list.push(...parts);
  }

  if (list.length === 0) {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Aucune allergie</Badge>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((a, i) => (
        <Badge key={`${a}-${i}`} variant="outline">
          {a}
        </Badge>
      ))}
    </div>
  );
}
