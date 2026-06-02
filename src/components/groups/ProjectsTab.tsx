'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { getGroupProjects, addProjectStep } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import AddProjectForm from './AddProjectForm';
import ProjectList from './ProjectList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

interface ProjectsTabProps {
  groupId: number;
}

export default function ProjectsTab({ groupId }: ProjectsTabProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newStepTitle, setNewStepTitle] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const fetchProjects = async () => {
    const data = await getGroupProjects(groupId);
    setProjects(data as Project[]);
  };

  useEffect(() => {
    fetchProjects();
  }, [groupId]);

  const handleAddStep = async () => {
      if (!selectedProject || !newStepTitle) return;
      try {
          await addProjectStep({
              project_id: selectedProject.id,
              title: newStepTitle,
              step_order: ((selectedProject as any).project_steps?.length || 0) + 1
          });
          toast({
              title: "Étape ajoutée",
              description: `L'étape "${newStepTitle}" a été ajoutée.`,
          });
          setNewStepTitle('');
          fetchProjects(); // Refresh to show new count/step
          router.refresh();
      } catch (e) {
          toast({
              title: "Erreur",
              description: "Erreur lors de l'ajout de l'étape",
              variant: "destructive",
          });
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Projets & Fil Rouge</h3>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Projet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau projet</DialogTitle>
              <DialogDescription>
                Définissez un projet fil rouge pour ce groupe.
              </DialogDescription>
            </DialogHeader>
            <AddProjectForm 
                groupId={groupId} 
                onSuccess={() => {
                    setIsCreateOpen(false);
                    fetchProjects();
                }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProjectList 
        projects={projects} 
        onAddStep={(project) => setSelectedProject(project)}
      />

      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Gérer les étapes ({selectedProject?.title})</SheetTitle>
                <SheetDescription>Ajoutez des jalons pour ce projet.</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
                <div className="space-y-2">
                    <Label>Nouvelle étape</Label>
                    <div className="flex gap-2">
                        <Input 
                            value={newStepTitle} 
                            onChange={(e) => setNewStepTitle(e.target.value)}
                            placeholder="Ex: Conception 3D"
                        />
                        <Button onClick={handleAddStep}>Ajouter</Button>
                    </div>
                </div>
                
                <div className="mt-8">
                    <h4 className="text-sm font-medium mb-4">Étapes existantes</h4>
                    <div className="space-y-2">
                        {((selectedProject as any)?.project_steps || []).map((step: any) => (
                            <div key={step.id} className="p-3 border rounded-md text-sm flex justify-between">
                                <span>{step.step_order}. {step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
