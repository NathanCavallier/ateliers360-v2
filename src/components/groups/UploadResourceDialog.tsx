'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { uploadGroupResource, createLinkResource } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Plus, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';

interface UploadResourceDialogProps {
  groupId: number;
}

export function UploadResourceDialog({ groupId }: UploadResourceDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [fileTitle, setFileTitle] = useState('');

  // Link state
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !fileTitle) return;

    setLoading(true);
    try {
      await uploadGroupResource(file, {
        group_id: groupId,
        title: fileTitle,
        type: 'file',
      });
      setOpen(false);
      setFile(null);
      setFileTitle('');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Erreur lors du téléchargement.');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl || !linkTitle) return;

    setLoading(true);
    try {
      await createLinkResource({
        group_id: groupId,
        title: linkTitle,
        url: linkUrl,
      });
      setOpen(false);
      setLinkUrl('');
      setLinkTitle('');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'ajout du lien.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Ajouter une ressource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une ressource</DialogTitle>
          <DialogDescription>
            Partagez un fichier ou un lien avec le groupe.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Fichier</TabsTrigger>
            <TabsTrigger value="link">Lien</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file">
            <form onSubmit={handleFileUpload} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="file-title">Titre du fichier</Label>
                <Input 
                  id="file-title" 
                  placeholder="Ex: Support de cours PDF" 
                  value={fileTitle}
                  onChange={(e) => setFileTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Fichier</Label>
                <Input 
                  id="file" 
                  type="file" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                 {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                 Télécharger
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="link">
            <form onSubmit={handleLinkSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="link-title">Titre du lien</Label>
                <Input 
                  id="link-title" 
                  placeholder="Ex: Vidéo Youtube" 
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link-url">URL</Label>
                <Input 
                  id="link-url" 
                  type="url"
                  placeholder="https://..." 
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                 {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LinkIcon className="w-4 h-4 mr-2" />}
                 Ajouter le lien
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
