'use client';

import Link from 'next/link';
import { Group } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, ArrowRight, Pencil, Trash2 } from 'lucide-react';

interface GroupListProps {
  groups: Group[];
  onDelete?: (id: number) => void;
}

export function GroupList({ groups, onDelete }: GroupListProps) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">Aucun groupe trouvé.</p>
        <Link href="/admin/groups/new">
          <Button>Créer un premier groupe</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <Card key={group.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex justify-between items-start">
              <span>{group.name}</span>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {group.level || 'Niveau non défini'}
              </span>
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {group.age_range || 'Âge non défini'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {group.establishment ? `📍 ${group.establishment}` : 'Aucun établissement'}
            </p>
            {group.main_theme && (
              <p className="text-sm text-muted-foreground mt-1">
                🎨 {group.main_theme}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex gap-2">
               <Link href={`/admin/groups/${group.id}/edit`}>
                <Button variant="ghost" size="icon" title="Modifier">
                  <Pencil className="w-4 h-4" />
                </Button>
               </Link>
               {onDelete && (
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90" onClick={() => onDelete(group.id)} title="Supprimer">
                  <Trash2 className="w-4 h-4" />
                </Button>
               )}
            </div>
            <Link href={`/admin/groups/${group.id}`}>
              <Button size="sm" className="gap-2">
                Gérer <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
