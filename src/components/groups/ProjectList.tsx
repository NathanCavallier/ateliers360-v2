'use client';

import { Project } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, ListChecks } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onAddStep: (project: Project) => void;
}

export default function ProjectList({ projects, onAddStep }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
        <p className="text-muted-foreground mb-4">Aucun projet défini pour ce groupe.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
              <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                {project.status === 'active' ? 'En cours' : 'Archivé'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ListChecks className="w-4 h-4" />
                    <span>{(project as any).project_steps?.length || 0} étapes</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => onAddStep(project)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une étape
                </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
