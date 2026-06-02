'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectDeliverable } from '@/lib/types';
import { getGroupProjects, getStudentDeliverables, addDeliverable, supabase } from '@/lib/supabase'; // Access supabase directly for upload
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface StudentProjectViewProps {
  groupId: number;
  memberId: number;
}

export default function StudentProjectView({ groupId, memberId }: StudentProjectViewProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [deliverables, setDeliverables] = useState<ProjectDeliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Upload state
  const [uploading, setUploading] = useState(false);
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [pData, dData] = await Promise.all([
        getGroupProjects(groupId),
        getStudentDeliverables(memberId)
    ]);
    setProjects(pData || []);
    setDeliverables(dData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [groupId, memberId]);

  const handleUpload = async () => {
      if (!selectedStep || !file || !supabase) return;
      
      setUploading(true);
      try {
          // 1. Upload file
          const fileExt = file.name.split('.').pop();
          const fileName = `${memberId}/${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('project-deliverables')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          // 2. Add record
          const { data: { publicUrl } } = supabase.storage
            .from('project-deliverables')
            .getPublicUrl(fileName);

          await addDeliverable({
              step_id: selectedStep.id,
              member_id: memberId,
              content: comment,
              file_url: publicUrl
          });

          toast({
              title: "Livrable envoyé",
              description: "Votre travail a été enregistré.",
          });
          
          setIsDialogOpen(false);
          setComment('');
          setFile(null);
          fetchData(); // Refresh

      } catch (error) {
          console.error('Upload error', error);
          toast({
              title: "Erreur",
              description: "Impossible d'envoyer le fichier.",
              variant: "destructive"
          });
      } finally {
          setUploading(false);
      }
  };

  if (loading) return <div>Chargement...</div>;

  if (projects.length === 0) {
      return (
          <div className="text-center py-10">
              <p className="text-muted-foreground">Aucun projet actif pour le moment.</p>
          </div>
      );
  }

  // Focus on the first active project for MVP
  const activeProject = projects[0];

  return (
    <div className="space-y-6">
       <div className="border-b pb-4">
           <h2 className="text-2xl font-bold">{activeProject.title}</h2>
           <p className="text-muted-foreground">{activeProject.description}</p>
       </div>

       <div className="space-y-4">
           {activeProject.project_steps?.sort((a: any, b: any) => a.step_order - b.step_order).map((step: any) => {
               const deliverable = deliverables.find(d => d.step_id === step.id);
               const isDone = !!deliverable;

               return (
                   <Card key={step.id} className={isDone ? "border-green-200 bg-green-50/20" : ""}>
                       <CardHeader className="pb-3">
                           <div className="flex justify-between items-start">
                               <div>
                                   <Badge variant="outline" className="mb-2">Étape {step.step_order}</Badge>
                                   <CardTitle className="text-lg">{step.title}</CardTitle>
                                   <CardDescription>{step.description}</CardDescription>
                               </div>
                               {isDone ? (
                                   <Badge className="bg-green-600 hover:bg-green-700">Validé</Badge>
                               ) : (
                                   <Badge variant="secondary">À faire</Badge>
                               )}
                           </div>
                       </CardHeader>
                       <CardContent>
                           {isDone ? (
                               <div className="flex items-center gap-2 text-green-700 text-sm">
                                   <CheckCircle className="w-4 h-4" />
                                   <span>Livrable envoyé le {new Date(deliverable.created_at).toLocaleDateString()}</span>
                                   {deliverable.file_url && (
                                       <a href={deliverable.file_url} target="_blank" rel="noopener noreferrer" className="ml-2 underline">
                                           Voir le fichier
                                       </a>
                                   )}
                               </div>
                           ) : (
                               <Dialog open={isDialogOpen && selectedStep?.id === step.id} onOpenChange={(open) => {
                                   setIsDialogOpen(open);
                                   if (open) setSelectedStep(step);
                               }}>
                                   <DialogTrigger asChild>
                                       <Button>
                                           <Upload className="w-4 h-4 mr-2" />
                                           Déposer mon travail
                                       </Button>
                                   </DialogTrigger>
                                   <DialogContent>
                                       <DialogHeader>
                                           <DialogTitle>Déposer un livrable : {step.title}</DialogTitle>
                                           <DialogDescription>
                                               Partagez une photo ou un fichier pour valider cette étape.
                                           </DialogDescription>
                                       </DialogHeader>
                                       <div className="space-y-4 mt-4">
                                           <div className="space-y-2">
                                               <Label>Fichier / Photo</Label>
                                               <Input 
                                                   type="file" 
                                                   onChange={(e) => setFile(e.target.files?.[0] || null)}
                                               />
                                           </div>
                                           <div className="space-y-2">
                                               <Label>Commentaire (optionnel)</Label>
                                               <Textarea 
                                                    placeholder="J'ai terminé la conception..." 
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                               />
                                           </div>
                                           <Button 
                                                onClick={handleUpload} 
                                                disabled={!file || uploading} 
                                                className="w-full"
                                           >
                                               {uploading ? "Envoi..." : "Envoyer"}
                                           </Button>
                                       </div>
                                   </DialogContent>
                               </Dialog>
                           )}
                       </CardContent>
                   </Card>
               );
           })}
       </div>
    </div>
  );
}
