"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Plus,
  Trash2,
  AlertCircle,
  X,
  RefreshCw,
  Eye
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { Database } from "@/lib/types";
import { useLocale } from "next-intl";

type Workshop = Database['public']['Tables']['ateliers']['Row'];

interface EditWorkshopFormProps {
  workshop: Workshop;
  onSuccess?: () => void;
  onCancel?: () => void;
  successUrl?: string;
  cancelUrl?: string;
}

import { useRouter } from "next/navigation";
import { getAuthHeaders } from '@/lib/supabase';

export function EditWorkshopForm({ workshop, onSuccess, onCancel, successUrl, cancelUrl }: EditWorkshopFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  // Form fields
  const [titre, setTitre] = useState(workshop.titre || "");
  const [slug, setSlug] = useState(workshop.slug || "");
  const [description, setDescription] = useState(workshop.description || "");
  const [objectifs, setObjectifs] = useState<string[]>(
    Array.isArray(workshop.objectifs) ? workshop.objectifs : []
  );
  const [publicCible, setPublicCible] = useState(workshop.public_cible || "");
  const [dureeHeures, setDureeHeures] = useState(workshop.duree_heures?.toString() || "");
  const [tarifEur, setTarifEur] = useState(workshop.tarif_eur?.toString() || "");
  const [materiel, setMateriel] = useState(workshop.materiel || "");
  const [categorie, setCategorie] = useState(workshop.categorie || "");
  const [type, setType] = useState(workshop.type || "workshop");
  const [sequenceOrder, setSequenceOrder] = useState(workshop.sequence_order?.toString() || "0");
  const [imageUrl, setImageUrl] = useState(workshop.image_url || "");
  const [tags, setTags] = useState<string[]>(
    Array.isArray(workshop.tags) ? workshop.tags : []
  );
  const [currentTag, setCurrentTag] = useState("");

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  useEffect(() => {
    if (titre && !slug) {
      setSlug(generateSlug(titre));
    }
  }, [titre, slug]);

  // Add/Remove objectif
  const addObjectif = () => {
    setObjectifs([...objectifs, ""]);
  };

  const removeObjectif = (index: number) => {
    setObjectifs(objectifs.filter((_, i) => i !== index));
  };

  const updateObjectif = (index: number, value: string) => {
    const newObjectifs = [...objectifs];
    newObjectifs[index] = value;
    setObjectifs(newObjectifs);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validation
      if (!titre.trim()) {
        throw new Error("Le titre est requis");
      }
      if (!slug.trim()) {
        throw new Error("Le slug est requis");
      }
      if (!description.trim()) {
        throw new Error("La description est requise");
      }
      if (objectifs.filter(obj => obj.trim()).length === 0) {
        throw new Error("Au moins un objectif est requis");
      }
      if (!publicCible.trim()) {
        throw new Error("Le public cible est requis");
      }
      if (!dureeHeures || parseFloat(dureeHeures) <= 0) {
        throw new Error("La durée doit être supérieure à 0");
      }
      if (!tarifEur || parseFloat(tarifEur) < 0) {
        throw new Error("Le tarif doit être supérieur ou égal à 0");
      }

      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';
      const response = await fetch(`/api/dashboard/ateliers/${workshop.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          titre: titre.trim(),
          slug: slug.trim(),
          description: description.trim(),
          objectifs: objectifs.filter(obj => obj.trim()),
          public_cible: publicCible.trim(),
          duree_heures: parseFloat(dureeHeures),
          tarif_eur: parseFloat(tarifEur),
          materiel: materiel.trim() || null,
          categorie: categorie || null,
          type: type,
          sequence_order: parseInt(sequenceOrder) || 0,
          image_url: imageUrl.trim() || null,
          tags: tags,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Erreur lors de la mise à jour");
      }

      // Success callback
      if (onSuccess) {
        onSuccess();
      } else if (successUrl) {
        router.push(successUrl);
        router.refresh();
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Modification : {workshop.titre}</CardTitle>
          <CardDescription>
            ID: <span className="font-mono text-xs">{workshop.id}</span> • Slug: <span className="font-mono text-xs">{workshop.slug}</span>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:flex"
          >
            <a href={`/${locale}/ateliers/${workshop.slug}`} target="_blank" rel="noopener noreferrer">
              <Eye className="mr-2 h-4 w-4" />
              Voir sur le site
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="general">Informations Générales</TabsTrigger>
              <TabsTrigger value="content">Contenu Pédagogique</TabsTrigger>
              <TabsTrigger value="logistics">Logistique & Tarifs</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Titre */}
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre de l&apos;atelier *</Label>
                  <Input
                    id="titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    placeholder="Ex: Robotique avec LEGO Mindstorms"
                    className="focus:ring-primary"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="Ex: robotique-lego-mindstorms"
                      className="font-mono text-sm"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setSlug(generateSlug(titre))}
                      title="Régénérer"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={type} onValueChange={(val) => setType(val as any)}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Atelier Individuel</SelectItem>
                      <SelectItem value="module">Module Pilier</SelectItem>
                      <SelectItem value="pack">Pack / Cycle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Catégorie */}
                <div className="space-y-2">
                  <Label htmlFor="categorie">Catégorie</Label>
                  <Select value={categorie || ""} onValueChange={setCategorie}>
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sciences">Sciences</SelectItem>
                      <SelectItem value="Robotique">Robotique</SelectItem>
                      <SelectItem value="Programmation">Programmation</SelectItem>
                      <SelectItem value="IA">Intelligence Artificielle</SelectItem>
                      <SelectItem value="Ingénierie">Ingénierie</SelectItem>
                      <SelectItem value="Physique">Physique</SelectItem>
                      <SelectItem value="Technologie">Technologie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sequence Order */}
                <div className="space-y-2">
                  <Label htmlFor="sequenceOrder">Ordre d'affichage</Label>
                  <Input
                    id="sequenceOrder"
                    type="number"
                    value={sequenceOrder}
                    onChange={(e) => setSequenceOrder(e.target.value)}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image</Label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-1">
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                    />
                    <p className="text-xs text-muted-foreground italic">Laissez vide pour utiliser l'image par défaut.</p>
                  </div>
                  {imageUrl && (
                    <div className="h-10 w-20 rounded border overflow-hidden bg-muted">
                      <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description complète de l'atelier..."
                  rows={6}
                  required
                />
              </div>

              {/* Tags */}
              <div className="space-y-3 pt-2">
                <Label>Mots-clés (Tags)</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Nouveau tag..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" variant="secondary" onClick={addTag}>
                    Ajouter
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.length === 0 && <span className="text-sm text-muted-foreground italic">Aucun tag pour le moment.</span>}
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 flex items-center gap-1 group"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer opacity-50 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6 animate-in fade-in-50 duration-500">
              {/* Objectifs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Objectifs pédagogiques *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addObjectif}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un objectif
                  </Button>
                </div>
                <div className="space-y-3">
                  {objectifs.map((objectif, index) => (
                    <div key={index} className="flex gap-3 group animate-in slide-in-from-left-2 duration-300">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-xs font-bold border shrink-0">
                        {index + 1}
                      </div>
                      <Input
                        value={objectif}
                        onChange={(e) => updateObjectif(index, e.target.value)}
                        placeholder={`Décrivez l'objectif ${index + 1}...`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                        onClick={() => removeObjectif(index)}
                        disabled={objectifs.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                {/* Matériel */}
                <div className="space-y-2">
                  <Label htmlFor="materiel" className="text-base font-semibold">Matériel nécessaire</Label>
                  <Textarea
                    id="materiel"
                    value={materiel}
                    onChange={(e) => setMateriel(e.target.value)}
                    placeholder="Liste du matériel fourni (ex: kits robotiques, PC) ou nécessaire de la part du client..."
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logistics" className="space-y-6 animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Public cible */}
                <div className="space-y-2">
                  <Label htmlFor="publicCible" className="font-semibold">Public cible *</Label>
                  <Input
                    id="publicCible"
                    value={publicCible}
                    onChange={(e) => setPublicCible(e.target.value)}
                    placeholder="Ex: 8-12 ans, collégiens, lycéens..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">Ex: "6-12 ans" ou "De la 6ème à la 3ème"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Durée */}
                  <div className="space-y-2">
                    <Label htmlFor="dureeHeures" className="font-semibold">Durée (heures) *</Label>
                    <Input
                      id="dureeHeures"
                      type="number"
                      step="0.5"
                      min="0.5"
                      value={dureeHeures}
                      onChange={(e) => setDureeHeures(e.target.value)}
                      placeholder="2"
                      required
                    />
                  </div>
                  {/* Tarif */}
                  <div className="space-y-2">
                    <Label htmlFor="tarifEur" className="font-semibold">Tarif (€) *</Label>
                    <Input
                      id="tarifEur"
                      type="number"
                      step="0.01"
                      min="0"
                      value={tarifEur}
                      onChange={(e) => setTarifEur(e.target.value)}
                      placeholder="45.00"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/10 mt-8">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Note sur les tarifs
                </h4>
                <p className="text-sm text-primary/80">
                  Le tarif indiqué est le tarif par défaut affiché sur le site. Pour les cycles ou interventions sur mesure, assurez-vous de l'expliquer également dans la description.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Form Actions Footer */}
          <div className="flex gap-3 justify-end pt-8 border-t">
            {(onCancel || cancelUrl) && (
              <Button type="button" variant="ghost" onClick={() => {
                if (onCancel) onCancel();
                else if (cancelUrl) router.push(cancelUrl);
              }}>
                Annuler
              </Button>
            )}
            <Button type="submit" disabled={loading} size="lg" className="min-w-[200px] shadow-lg shadow-primary/20">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer l'atelier"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
