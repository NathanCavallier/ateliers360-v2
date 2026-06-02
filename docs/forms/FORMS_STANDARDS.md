# 📐 Standards et Templates des Formulaires

**Créé**: 26 mai 2026
**Utilisation**: Template de référence pour refactoriser les formulaires

---

## 🏗️ Template Minimal - Formulaire Simple

Utilisez ce template pour les formulaires avec 3-5 champs simples.

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// 1. Définir le schéma de validation
const formSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères').max(100, 'Maximum 100 caractères'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Minimum 10 caractères').max(1000),
});

// 2. Inférer le type du schéma
type FormValues = z.infer<typeof formSchema>;

export default function SimpleForm() {
  // 3. Hooks
  const { toast } = useToast();
  const t = useTranslations('Forms.SimpleForm');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 4. Initialiser le formulaire
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // 5. Fonction de soumission
  async function onSubmit(values: FormValues) {
    setStatus('loading');

    try {
      const response = await fetch('/api/simple-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setStatus('success');
      toast({
        title: t('successTitle'),
        description: t('successMessage'),
      });

      form.reset();

      // Reset success state après 3 secondes
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      toast({
        title: t('errorTitle'),
        description: error instanceof Error ? error.message : t('errorMessage'),
        variant: 'destructive',
      });
    }
  }

  // 6. Render
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {/* Success Alert */}
        {status === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {t('successAlert')}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('errorAlert')}</AlertDescription>
          </Alert>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('namePlaceholder')}
                  {...field}
                  disabled={status === 'loading'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  {...field}
                  disabled={status === 'loading'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('messageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('messagePlaceholder')}
                  {...field}
                  disabled={status === 'loading'}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/1000 {t('characters')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={status === 'loading' || !form.formState.isDirty}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            t('submit')
          )}
        </Button>
      </form>
    </Form>
  );
}
```

---

## 🏗️ Template Avancé - Formulaire Complexe avec Étapes

Pour les formulaires avec 8+ champs ou logique complexe.

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2, CheckCircle } from 'lucide-react';

// Schéma avec étapes (validation partagée)
const fullSchema = z.object({
  // Step 1
  name: z.string().min(2),
  email: z.string().email(),
  // Step 2
  organization: z.string().optional(),
  role: z.enum(['student', 'educator', 'other']),
  // Step 3
  message: z.string().min(20),
  newsletter: z.boolean().optional(),
});

type FormValues = z.infer<typeof fullSchema>;

export default function AdvancedForm() {
  const { toast } = useToast();
  const t = useTranslations('Forms.AdvancedForm');

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    mode: 'onBlur', // Valider au blur pour meilleure UX
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      role: 'student',
      message: '',
      newsletter: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus('loading');
    try {
      const res = await fetch('/api/advanced-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Erreur');

      setStatus('success');
      toast({ title: t('successTitle') });
      form.reset();
    } catch (error) {
      setStatus('idle');
      toast({
        title: t('errorTitle'),
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex justify-between">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded mx-1 ${
                s <= step ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Success */}
        {status === 'success' && (
          <Card className="border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800">{t('successMessage')}</span>
            </div>
          </Card>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nameLabel')}</FormLabel>
                  <FormControl>
                    <input {...field} type="text" className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emailLabel')}</FormLabel>
                  <FormControl>
                    <input {...field} type="email" className="input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('organizationLabel')}</FormLabel>
                  <FormControl>
                    <input {...field} type="text" className="input" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('roleLabel')}</FormLabel>
                  <FormControl>
                    <select {...field} className="input">
                      <option value="student">Student</option>
                      <option value="educator">Educator</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('messageLabel')}</FormLabel>
                  <FormControl>
                    <textarea {...field} className="input" rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            {t('previousButton')}
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep(step + 1)}
            >
              {t('nextButton')}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('submitting')}
                </>
              ) : (
                t('submit')
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
```

---

## 📚 Validations Réutilisables

Créer un fichier `src/lib/validation-schemas.ts`:

```typescript
import * as z from 'zod';

// Patterns
export const PHONE_FR = /^(?:\+33|0)[1-9](?:[0-9]{8})$/;
export const POSTAL_CODE_FR = /^(75|77|78|91|92|93|94|95)\d{3}$/;
export const SIREN = /^\d{9}$/;
export const SIRET = /^\d{14}$/;

// Schémas réutilisables
export const emailSchema = z
  .string()
  .email('Email invalide')
  .min(5)
  .max(255)
  .toLowerCase();

export const nameSchema = z
  .string()
  .min(2, 'Minimum 2 caractères')
  .max(100, 'Maximum 100 caractères')
  .trim();

export const phoneSchema = z
  .string()
  .regex(PHONE_FR, 'Numéro invalide (exemple: 06 12 34 56 78)')
  .optional();

export const messageSchema = z
  .string()
  .min(10, 'Minimum 10 caractères')
  .max(5000, 'Maximum 5000 caractères')
  .trim();

export const postalCodeSchema = z
  .string()
  .regex(POSTAL_CODE_FR, 'Code postal Île-de-France invalide')
  .optional();

export const urlSchema = z
  .string()
  .url('URL invalide')
  .optional();

export const sirenSchema = z
  .string()
  .regex(SIREN, 'SIREN invalide (9 chiffres)');

export const siretSchema = z
  .string()
  .regex(SIRET, 'SIRET invalide (14 chiffres)');

// Schémas composés
export const contactBaseSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

export const organizationSchema = z.object({
  organization: z.string().min(2).max(200),
  type: z.enum(['school', 'company', 'association', 'other']),
});
```

Utilisation:

```typescript
import { contactBaseSchema, messageSchema } from '@/lib/validation-schemas';

const myFormSchema = contactBaseSchema.extend({
  message: messageSchema,
});
```

---

## 🎨 Composants Formulaires Stylisés

### Textarea avec Character Count

```typescript
'use client';

import { Textarea } from '@/components/ui/textarea';
import { FormDescription } from '@/components/ui/form';

interface TextareaWithCountProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder?: string;
}

export function TextareaWithCount({
  value,
  onChange,
  maxLength = 1000,
  placeholder,
}: TextareaWithCountProps) {
  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
      />
      <FormDescription className="text-right">
        {value.length}/{maxLength} caractères
      </FormDescription>
    </div>
  );
}
```

### Input avec Validation Visuelle

```typescript
interface InputWithValidationProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  isInvalid?: boolean;
}

export function InputWithValidation({
  isValid,
  isInvalid,
  ...props
}: InputWithValidationProps) {
  const borderColor = isInvalid
    ? 'border-red-500'
    : isValid
      ? 'border-green-500'
      : 'border-gray-300';

  return (
    <input
      {...props}
      className={`input ${borderColor}`}
    />
  );
}
```

---

## 🧪 Checklist de Code Review

Avant de merger une refactorisation de formulaire:

- [ ] Schéma Zod complet et documenté
- [ ] Tous les champs validés côté client
- [ ] React Hook Form correctement configuré
- [ ] Composants `<Form>` et `<FormField>` utilisés
- [ ] `<FormMessage />` affiche les erreurs
- [ ] Toast notifications pour succès/erreur
- [ ] États de chargement (disabled, spinner)
- [ ] Bouton submit désactivé si invalide
- [ ] Reset formulaire après succès
- [ ] Gestion d'erreurs réseau
- [ ] Messages traduits avec `useTranslations`
- [ ] Labels et aria-* pour accessibilité
- [ ] Responsive sur mobile
- [ ] Focus management correct
- [ ] Test manuel avec données valides/invalides

---

## 📖 Traductions Requises

Pour chaque formulaire refactorisé, ajouter au `messages.json`:

```json
{
  "Forms": {
    "MyForm": {
      "nameLabel": "Nom complet",
      "namePlaceholder": "Entrez votre nom",
      "emailLabel": "Email",
      "emailPlaceholder": "exemple@email.com",
      "messageLabel": "Message",
      "messagePlaceholder": "Votre message ici...",
      "successTitle": "Succès",
      "successMessage": "Formulaire envoyé avec succès",
      "errorTitle": "Erreur",
      "errorMessage": "Erreur lors de l'envoi du formulaire",
      "submit": "Envoyer",
      "submitting": "Envoi en cours...",
      "characters": "caractères"
    }
  }
}
```

---

**Prêt à refactoriser? Commencez par Phase 1! 🚀**
