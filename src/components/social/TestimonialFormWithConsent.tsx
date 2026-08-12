'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ImageConsentForm, Testimonial } from '@/lib/types';

interface TestimonialFormProps {
  workshopId?: number;
  onSuccess?: () => void;
}

export function TestimonialFormWithConsent({ workshopId, onSuccess }: TestimonialFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<'testimonial' | 'consent'>('testimonial');
  const [loading, setLoading] = useState(false);

  // Testimonial form state
  const [testimonialData, setTestimonialData] = useState({
    author_name: '',
    author_role: '',
    author_establishment: '',
    quote: '',
    rating: 5,
    involves_minor: false,
  });

  // Consent form state
  const [consentData, setConsentData] = useState<Partial<ImageConsentForm>>({
    full_name: '',
    email: '',
    phone: '',
    relationship_to_minor: 'parent',
    minor_full_name: '',
    minor_age: undefined,
    usage_scope: 'website',
    usage_duration: 'permanent',
    allows_photo: true,
    allows_video: false,
    allows_name_publication: true,
    signature_method: 'digital',
  });

  const handleTestimonialChange = (
    field: keyof typeof testimonialData,
    value: any
  ) => {
    setTestimonialData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConsentChange = (field: keyof typeof consentData, value: any) => {
    setConsentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!testimonialData.author_name || !testimonialData.quote) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    if (testimonialData.involves_minor) {
      setStep('consent');
    } else {
      await submitTestimonial(testimonialData, null);
    }
  };

  const handleSubmitConsent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !consentData.full_name ||
      !consentData.email ||
      !consentData.minor_full_name ||
      !consentData.minor_age
    ) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    await submitTestimonial(testimonialData, consentData as ImageConsentForm);
  };

  const submitTestimonial = async (
    testimonial: typeof testimonialData,
    consent: ImageConsentForm | null
  ) => {
    setLoading(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testimonial: {
            ...testimonial,
            workshop_id: workshopId,
            published: false, // moderation needed
          },
          consent,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du témoignage');
      }

      toast({
        title: 'Succès !',
        description: 'Votre témoignage a été envoyé. Merci !',
      });

      // Reset form
      setTestimonialData({
        author_name: '',
        author_role: '',
        author_establishment: '',
        quote: '',
        rating: 5,
        involves_minor: false,
      });
      setConsentData({
        full_name: '',
        email: '',
        phone: '',
        relationship_to_minor: 'parent',
        minor_full_name: '',
        minor_age: undefined,
        usage_scope: 'website',
        usage_duration: 'permanent',
        allows_photo: true,
        allows_video: false,
        allows_name_publication: true,
        signature_method: 'digital',
      });
      setStep('testimonial');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi de votre témoignage.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step === 'testimonial' ? (
        <Card>
          <CardHeader>
            <CardTitle>Partager votre témoignage</CardTitle>
            <CardDescription>
              Nous aimerions connaître votre expérience avec cet atelier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTestimonial} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="author_name">Votre nom *</Label>
                <Input
                  id="author_name"
                  placeholder="Jean Dupont"
                  value={testimonialData.author_name}
                  onChange={(e) =>
                    handleTestimonialChange('author_name', e.target.value)
                  }
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="author_role">Votre rôle *</Label>
                <Select
                  value={testimonialData.author_role}
                  onValueChange={(value) =>
                    handleTestimonialChange('author_role', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enseignant">Enseignant</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Responsable établissement">
                      Responsable d'établissement
                    </SelectItem>
                    <SelectItem value="Animateur">Animateur</SelectItem>
                    <SelectItem value="Élève">Élève</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Establishment */}
              <div className="space-y-2">
                <Label htmlFor="author_establishment">
                  Établissement/Structure
                </Label>
                <Input
                  id="author_establishment"
                  placeholder="Collège X, École Y, etc."
                  value={testimonialData.author_establishment}
                  onChange={(e) =>
                    handleTestimonialChange('author_establishment', e.target.value)
                  }
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Note (sur 5 étoiles)</Label>
                <RadioGroup
                  value={testimonialData.rating.toString()}
                  onValueChange={(value) =>
                    handleTestimonialChange('rating', parseInt(value))
                  }
                >
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <div key={rate} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={rate.toString()}
                        id={`rating-${rate}`}
                      />
                      <Label htmlFor={`rating-${rate}`} className="cursor-pointer">
                        {'⭐'.repeat(rate)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quote */}
              <div className="space-y-2">
                <Label htmlFor="quote">Votre témoignage *</Label>
                <Textarea
                  id="quote"
                  placeholder="Partagez votre expérience avec cet atelier..."
                  rows={4}
                  value={testimonialData.quote}
                  onChange={(e) =>
                    handleTestimonialChange('quote', e.target.value)
                  }
                />
              </div>

              {/* Involves Minor */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <Checkbox
                  id="involves_minor"
                  checked={testimonialData.involves_minor}
                  onCheckedChange={(checked) =>
                    handleTestimonialChange('involves_minor', checked)
                  }
                />
                <div className="flex-1 space-y-2">
                  <Label
                    htmlFor="involves_minor"
                    className="font-normal cursor-pointer"
                  >
                    Ce témoignage concerne un ou plusieurs mineurs (enfants,
                    élèves)
                  </Label>
                  <p className="text-sm text-gray-600">
                    Si vous avez mentionné ou souhaitez montrer des photos de
                    mineurs, nous devrons obtenir une autorisation de droit à
                    l'image.
                  </p>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {testimonialData.involves_minor
                  ? 'Continuer vers autorisation droit à l\'image'
                  : 'Envoyer mon témoignage'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Autorisation de droit à l'image</CardTitle>
            <CardDescription>
              Pour publier des photos ou des vidéos d'enfants, nous avons besoin
              d'une autorisation de ses représentants légaux.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitConsent} className="space-y-6">
              {/* Parent/Guardian Info */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Informations du représentant légal</h3>

                <div className="space-y-2">
                  <Label htmlFor="full_name">Nom complet *</Label>
                  <Input
                    id="full_name"
                    value={consentData.full_name}
                    onChange={(e) =>
                      handleConsentChange('full_name', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={consentData.email}
                    onChange={(e) => handleConsentChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={consentData.phone || ''}
                    onChange={(e) => handleConsentChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Lien avec l'enfant *</Label>
                  <Select
                    value={consentData.relationship_to_minor}
                    onValueChange={(value) =>
                      handleConsentChange('relationship_to_minor', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="guardian">Tuteur légal</SelectItem>
                      <SelectItem value="teacher">Enseignant</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Child Info */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Informations de l'enfant</h3>

                <div className="space-y-2">
                  <Label htmlFor="minor_full_name">Nom de l'enfant *</Label>
                  <Input
                    id="minor_full_name"
                    value={consentData.minor_full_name}
                    onChange={(e) =>
                      handleConsentChange('minor_full_name', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minor_age">Âge de l'enfant *</Label>
                  <Input
                    id="minor_age"
                    type="number"
                    min="0"
                    max="18"
                    value={consentData.minor_age || ''}
                    onChange={(e) =>
                      handleConsentChange('minor_age', parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              {/* Scope & Duration */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Utilisation de l'image</h3>

                <div className="space-y-2">
                  <Label htmlFor="usage_scope">Où sera utilisée l'image ? *</Label>
                  <Select
                    value={consentData.usage_scope}
                    onValueChange={(value) =>
                      handleConsentChange('usage_scope', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Site web uniquement</SelectItem>
                      <SelectItem value="social_media">Réseaux sociaux uniquement</SelectItem>
                      <SelectItem value="advertising">Publicités/campagnes payantes</SelectItem>
                      <SelectItem value="all">Tous les usages ci-dessus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usage_duration">Durée d'utilisation *</Label>
                  <Select
                    value={consentData.usage_duration || ''}
                    onValueChange={(value) =>
                      handleConsentChange('usage_duration', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">
                        Permanent (illimité)
                      </SelectItem>
                      <SelectItem value="1_year">1 an</SelectItem>
                      <SelectItem value="2_years">2 ans</SelectItem>
                      <SelectItem value="until_withdrawal">
                        Jusqu'à révocation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Autorisations</h3>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="allows_photo"
                    checked={consentData.allows_photo}
                    onCheckedChange={(checked) =>
                      handleConsentChange('allows_photo', checked)
                    }
                  />
                  <Label
                    htmlFor="allows_photo"
                    className="font-normal cursor-pointer flex-1"
                  >
                    J'autorise la publication de photos de l'enfant
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="allows_video"
                    checked={consentData.allows_video}
                    onCheckedChange={(checked) =>
                      handleConsentChange('allows_video', checked)
                    }
                  />
                  <Label
                    htmlFor="allows_video"
                    className="font-normal cursor-pointer flex-1"
                  >
                    J'autorise la publication de vidéos de l'enfant
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="allows_name_publication"
                    checked={consentData.allows_name_publication}
                    onCheckedChange={(checked) =>
                      handleConsentChange('allows_name_publication', checked)
                    }
                  />
                  <Label
                    htmlFor="allows_name_publication"
                    className="font-normal cursor-pointer flex-1"
                  >
                    J'autorise la publication du nom de l'enfant
                  </Label>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  ⚠️ <strong>Important :</strong> En signant ce formulaire, vous
                  confirmez que vous êtes le représentant légal de l'enfant et que
                  vous avez l'autorité pour donner ce consentement. Ateliers 360
                  respectera ce consentement et pourra révoquer l'utilisation de
                  l'image sur demande.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('testimonial')}
                  disabled={loading}
                  className="flex-1"
                >
                  Précédent
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Envoi...' : 'Confirmer et envoyer'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
