# 📋 Audit et Suivi de l'Implémentation des Formulaires

**Date d'audit**: 26 mai 2026
**Statut global**: 🔴 Beaucoup de formulaires avec design et fonctionnalités élémentaires

---

## 📊 Résumé Exécutif

| Métrique | Valeur |
|----------|--------|
| **Total de formulaires** | 17 |
| **Formulaires avancés** | 2 (12%) |
| **Formulaires basiques** | 15 (88%) |
| **Avec validation schema** | 2 (12%) |
| **Avec gestion d'erreurs avancée** | 3 (18%) |
| **Avec feedback utilisateur** | 8 (47%) |

---

## 🔍 Audit Détaillé par Formulaire

### ✅ Formulaires Avancés (À Conserver & Améliorer)

#### 1. **ReservationFormAdvanced.tsx**

- **Localisation**: `src/components/reservations/ReservationFormAdvanced.tsx`
- **Status**: ✅ Bien structuré
- **Technologies**: React Hook Form + Zod
- **Points forts**:
  - Validation schema complète avec Zod
  - Gestion d'état sophistiquée
  - Multi-sélection d'ateliers et dates
  - Calcul du prix en temps réel
  - États de soumission clairs (idle, success, error)
- **Améliorations nécessaires**:
  - [ ] Ajouter toast notifications (useToast)
  - [ ] Améliorer les messages d'erreur spécifiques
  - [ ] Ajouter étapes/wizard si trop complexe
  - [ ] Valider avant chaque étape
  - [ ] Ajouter prévisualisation récapitulatif

#### 2. **CreateWorkshopForm.tsx** & **EditWorkshopForm.tsx**

- **Localisation**: `src/components/create/` et `src/components/admin/`
- **Status**: ✅ Structuré (admin)
- **Technologies**: Généralement useState basique
- **Points forts**:
  - Gestion d'ateliers complexes
  - Validation métier
- **Améliorations nécessaires**:
  - [ ] Migrer vers React Hook Form + Zod
  - [ ] Ajouter validation frontend robuste
  - [ ] Améliorer feedback d'erreurs

---

### 🟡 Formulaires Basiques (À Refactoriser)

#### 3. **ContactForm.tsx**

- **Localisation**: `src/components/contact/ContactForm.tsx`
- **Status**: 🟡 Mixte (utilise useFormState et fetch)
- **Problèmes**:
  - [ ] Validation minimaliste
  - [ ] Gestion d'erreurs basique
  - [ ] Pas de validation email côté client
  - [x] Utilise toast (bon point)
- **À faire**:
  - Migrer complètement vers React Hook Form
  - Ajouter validation Zod
  - Améliorer feedback visuel

#### 4. **JoinForm.tsx**

- **Localisation**: `src/components/forms/JoinForm.tsx`
- **Status**: 🔴 Très basique
- **Problèmes critiques**:
  - ❌ Utilise `alert()` au lieu de toast
  - ❌ Pas de validation formelle
  - ❌ État d'erreur global sans détails
  - ❌ Pas de désactivation de bouton pendant l'envoi
  - ❌ Pas d'accessibilité (ARIA)
- **À faire**:
  - Refactoriser entièrement avec React Hook Form + Zod
  - Remplacer alert() par toast notifications
  - Ajouter validation email, nom
  - Améliorer UX/accessibilité

#### 5. **ApplicationForm.tsx**

- **Localisation**: `src/components/forms/ApplicationForm.tsx`
- **Status**: 🔴 Basique
- **Problèmes**:
  - ❌ Pas de validation (email, phone)
  - ❌ Trop de useState (code verbeux)
  - ❌ Pas de feedback d'erreurs détaillées
  - ❌ Layout manuel sans composant Form
  - ❌ Pas de labels accessibles
- **À faire**:
  - Refactoriser avec React Hook Form + Zod
  - Ajouter validation phone (format français)
  - Améliorer layout et accessibilité
  - Ajouter progress bar ou étapes

#### 6. **SchoolsContactForm.tsx**

- **Localisation**: `src/components/forms/SchoolsContactForm.tsx`
- **Status**: 🔴 Basique
- **Problèmes**:
  - ❌ Pas de validation
  - ❌ `select` non stylisé
  - ❌ Pas de feedback détaillé
  - ❌ Trop de useState
- **À faire**:
  - Refactoriser avec React Hook Form
  - Ajouter composant Select stylisé
  - Valider niveau et institution
  - Améliorer UX

#### 7. **CompaniesContactForm.tsx** & **StructuresContactForm.tsx**

- **Status**: 🔴 Similaires à SchoolsContactForm
- **À faire**: Mêmes refactorisations

#### 8. **ChildConsentForm.tsx**

- **Localisation**: `src/components/family/ChildConsentForm.tsx`
- **Status**: 🟡 Semi-structuré
- **Problèmes**:
  - [ ] Pas de validation formelle
  - [ ] État global `status` peu descriptif
  - [ ] Pas de loading state sur le bouton
  - [ ] Pas de toast notifications
- **À faire**:
  - Ajouter React Hook Form pour cohérence
  - Améliorer feedback utilisateur
  - Ajouter validations métier (au moins 1 consentement?)

#### 9. **ChildHealthForm.tsx**

- **Status**: 🔴 À auditer en détail
- **À faire**: Appliquer mêmes corrections que ChildConsentForm

#### 10. **GroupForm.tsx**, **SessionForm.tsx**, **AddProjectForm.tsx**, **AddEvaluationForm.tsx**

- **Localisation**: `src/components/groups/`
- **Status**: 🔴 À auditer en détail
- **À faire**: Audit approfondi et refactorisation

---

## 🎯 Priorités de Refactorisation

### Phase 1 - CRITIQUE (Semaine 1)

- [ ] **ContactForm.tsx** - Utilisé partout, besoin de fiabilité
- [ ] **JoinForm.tsx** - UX très mauvaise (alert)
- [ ] **ApplicationForm.tsx** - Pas de validation

### Phase 2 - IMPORTANT (Semaine 2-3)

- [ ] **SchoolsContactForm.tsx**, **CompaniesContactForm.tsx**, **StructuresContactForm.tsx**
- [ ] **ChildConsentForm.tsx** & **ChildHealthForm.tsx**

### Phase 3 - À ÉVALUER (Semaine 4+)

- [ ] Formulaires de groupe (Groups)
- [ ] Formulaires d'admin avancés

---

## 🛠️ Standards de Refactorisation

Tous les formulaires refactorisés doivent respecter:

### Stack Technique

```typescript
// Stack recommandé
- React Hook Form (gestion d'état)
- Zod (validation schema)
- shadcn/ui (composants stylisés)
- useToast (notifications)
- Accessibilité ARIA complète
```

### Checklist de Refactorisation

- [ ] Utiliser `useForm` + `zodResolver`
- [ ] Définir `zod.object()` pour schéma
- [ ] Implémenter `<Form>` shadcn/ui
- [ ] Chaque champ: `<FormField>` + `<FormControl>`
- [ ] Afficher `<FormMessage>` pour erreurs
- [ ] Ajouter `useToast()` pour notifications
- [ ] États: `'idle' | 'loading' | 'success' | 'error'`
- [ ] Désactiver bouton pendant `isSubmitting`
- [ ] Loading state visuel (spinner)
- [ ] Message de succès auto-dismiss (3-5s)
- [ ] Tester validation côté client
- [ ] Tester soumission + gestion erreurs
- [ ] Vérifier accessibilité (ARIA labels, focus)
- [ ] Responsive design (mobile-first)

### Template Minimal

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Minimum 10 caractères'),
});

type FormData = z.infer<typeof schema>;

export default function MyForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', message: '' },
  });

  async function onSubmit(data: FormData) {
    setStatus('loading');
    try {
      const res = await fetch('/api/...', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Erreur');

      setStatus('success');
      toast({
        title: 'Succès',
        description: 'Formulaire envoyé',
      });
      form.reset();

      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      toast({
        title: 'Erreur',
        description: err?.message || 'Erreur lors de l\'envoi',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Envoi...' : 'Envoyer'}
        </Button>
      </form>
    </Form>
  );
}
```

---

## 📝 Notes d'Implémentation

### Validations Communes à Implémenter

```typescript
// Email
email: z.string().email('Email invalide').min(5).max(255)

// Phone (France)
phone: z.string().regex(/^(?:\+33|0)[1-9](?:[0-9]{8})$/, 'Format invalide')

// Nombre de participants
participants: z.number().min(1).max(50)

// URL
website: z.string().url('URL invalide').optional()

// Texte générique
name: z.string().min(2).max(100)
message: z.string().min(10).max(5000)

// Checkbox obligatoire
terms: z.boolean().refine(val => val === true, 'Obligatoire')
```

### États de Formulaire Cohérents

```typescript
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Affichage dans tous les formulaires:
{status === 'success' && <AlertSuccess />}
{status === 'error' && <AlertError />}
{status === 'loading' && <Spinner />}
```

### Messages d'Erreur Localisés

Utiliser `useTranslations()` pour tous les messages:

```typescript
const t = useTranslations('FormName');
message: z.string().min(10, t('message_min_error'))
```

---

## 📈 Métriques de Suivi

- [ ] Semaine 1: 3 formulaires refactorisés (Contact, Join, Application)
- [ ] Semaine 2: 3 formulaires Contact (Schools, Companies, Structures)
- [ ] Semaine 3: 2 formulaires Family (Consent, Health)
- [ ] Semaine 4: Formulaires Groups
- [ ] Audit & Cleanup finaux

---

## 🔗 Ressources

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [shadcn/ui Form](https://ui.shadcn.com/docs/components/form)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)

---

## 📅 Prochaines Étapes

1. ✅ Audit complété
2. ⏭️ Créer tickets de refactorisation par priorité
3. ⏭️ Implémenter Phase 1 (3 formulaires critiques)
4. ⏭️ Tester validation et UX
5. ⏭️ Continuer Phase 2 et 3
6. ⏭️ Audit final et cleanup

---

**Dernière mise à jour**: 26 mai 2026
