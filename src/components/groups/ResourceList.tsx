'use client';

import { GroupResource } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, Download, Trash2, ExternalLink } from 'lucide-react';
import { deleteGroupResource } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface ResourceListProps {
  resources: GroupResource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) return;
    
    const success = await deleteGroupResource(id);
    if (success) {
      router.refresh();
    } else {
      alert('Erreur lors de la suppression.');
    }
  };

  if (resources.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg border-dashed">
        <p className="text-muted-foreground">Aucune ressource partagée pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <Card key={resource.id} className="overflow-hidden">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0">
                {resource.file_type === 'link' ? (
                  <LinkIcon className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileText className="h-5 w-5 text-orange-500" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-medium truncate">{resource.title}</h4>
                <p className="text-xs text-muted-foreground truncate">
                   {new Date(resource.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="icon" asChild>
                <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                  {resource.file_type === 'link' ? (
                     <ExternalLink className="h-4 w-4" />
                  ) : (
                     <Download className="h-4 w-4" />
                  )}
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => handleDelete(resource.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
