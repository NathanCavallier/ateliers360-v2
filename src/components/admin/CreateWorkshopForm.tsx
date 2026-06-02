'use client';

// src/components/admin/CreateWorkshopForm.tsx (formulaire de création d'atelier)
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Plus, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getAuthHeaders } from '@/lib/supabase';

interface CreateWorkshopFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateWorkshopForm({ onSuccess, onCancel }: CreateWorkshopFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [objectifs, setObjectifs] = useState<string[]>(['']);

  const [formData, setFormData] = useState({
    titre: '',
    slug: '',
    description: '',
    public_cible: '',
    duree_heures: 2,
    tarif_eur: 0,
    materiel: '',
    categorie: 'Sciences',
    type: 'workshop' as 'workshop' | 'module' | 'pack',
    sequence_order: 0,
    image_url: '',
  });

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleObjectifChange = (index: number, value: string) => {
    const newObjectifs = [...objectifs];
    newObjectifs[index] = value;
    setObjectifs(newObjectifs);
  };

  const addObjectif = () => {
    setObjectifs([...objectifs, '']);
  };

  const removeObjectif = (index: number) => {
    setObjectifs(objectifs.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitreChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      titre: value,
      slug: generateSlug(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Valider les données
      if (!formData.titre || !formData.slug || !formData.description) {
        setError('Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      const validObjectifs = objectifs.filter(obj => obj.trim() !== '');
      if (validObjectifs.length === 0) {
        setError('Ajoutez au moins un objectif d\'apprentissage');
        setLoading(false);
        return;
      }

      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const res = await fetch('/api/dashboard/ateliers', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          objectifs: validObjectifs,
          tags,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || 'Erreur lors de la création de l\'atelier');
      }

      // Succès
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/${locale}/dashboard/ateliers`);
        router.refresh();
      }
    } catch (err: any) {
      console.error('Failed to create workshop:', err);
      setError(err.message || 'Erreur lors de la création de l\'atelier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Créer un nouvel atelier</CardTitle>
          <CardDescription>Remplissez les informations de l&apos;atelier</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Titre et Slug */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre *</Label>
              <Input
                id="titre"
                value={formData.titre}
                onChange={(e) => handleTitreChange(e.target.value)}
                placeholder="Robotique pour débutants"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="robotique-debutants"
                required
              />
            </div>
          </div>

          {/* Type and Sequence Order */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">Atelier Individuel</SelectItem>
                  <SelectItem value="module">Module Pilier</SelectItem>
                  <SelectItem value="pack">Pack / Cycle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sequence_order">Ordre d'affichage (séquence)</Label>
              <Input
                id="sequence_order"
                type="number"
                value={formData.sequence_order}
                onChange={(e) => setFormData({ ...formData, sequence_order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image_url">URL de l'image</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée de l'atelier..."
              rows={4}
              required
            />
          </div>

          {/* Objectifs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Objectifs d&apos;apprentissage *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addObjectif}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {objectifs.map((objectif, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={objectif}
                    onChange={(e) => handleObjectifChange(index, e.target.value)}
                    placeholder={`Objectif ${index + 1}`}
                  />
                  {objectifs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeObjectif(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Public cible et Catégorie */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="public_cible">Public cible *</Label>
              <Input
                id="public_cible"
                value={formData.public_cible}
                onChange={(e) => setFormData({ ...formData, public_cible: e.target.value })}
                placeholder="8-12 ans"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categorie">Catégorie</Label>
              <Select
                value={formData.categorie}
                onValueChange={(value) => setFormData({ ...formData, categorie: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sciences">Sciences</SelectItem>
                  <SelectItem value="Robotique">Robotique</SelectItem>
                  <SelectItem value="Programmation">Programmation</SelectItem>
                  <SelectItem value="IA">Intelligence Artificielle</SelectItem>
                  <SelectItem value="Ingénierie">Ingénierie</SelectItem>
                  <SelectItem value="Physique">Physique</SelectItem>
                  <SelectItem value="Technologie">Technologie</SelectItem>
                  <SelectItem value="Astronomie">Astronomie</SelectItem>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                  <SelectItem value="Chimie">Chimie</SelectItem>
                  <SelectItem value="Impression 3D">Impression 3D</SelectItem>
                  <SelectItem value="Arts Tech">Arts Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Ajouter un tag..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeTag(tag)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Durée et Tarif */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="duree_heures">Durée (heures) *</Label>
              <Input
                id="duree_heures"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.duree_heures}
                onChange={(e) => setFormData({ ...formData, duree_heures: parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tarif_eur">Tarif (€) *</Label>
              <Input
                id="tarif_eur"
                type="number"
                min="0"
                step="5"
                value={formData.tarif_eur}
                onChange={(e) => setFormData({ ...formData, tarif_eur: parseFloat(e.target.value) })}
                required
              />
            </div>
          </div>

          {/* Matériel */}
          <div className="space-y-2">
            <Label htmlFor="materiel">Matériel fourni</Label>
            <Textarea
              id="materiel"
              value={formData.materiel}
              onChange={(e) => setFormData({ ...formData, materiel: e.target.value })}
              placeholder="Liste du matériel fourni..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Création...' : 'Créer l\'atelier'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
