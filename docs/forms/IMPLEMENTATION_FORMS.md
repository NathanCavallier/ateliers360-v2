# 🚀 Plan d'Implémentation Approfondie des Formulaires

**Créé**: 26 mai 2026
**Objectif**: Refactoriser tous les formulaires selon les standards React Hook Form + Zod

---

## 📋 Tableau de Bord des Tâches

### Phase 1 - CRITIQUE (Démarrer immédiatement)

#### Tâche 1.1: ContactForm.tsx - Refactorisation

- **Fichier**: `src/components/contact/ContactForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h
- **Dépendances**: ContactForm est utilisé sur `/contact` (page importante)

**Checklist**:

- [x] Créer schéma Zod pour validation
- [x] Migrer de useFormState vers React Hook Form
- [x] Implémenter `<Form>` shadcn/ui
- [x] Ajouter validation email, nom, message côté client
- [x] Améliorer messages d'erreur
- [x] Tester avec données invalides
- [x] Tester envoi avec succes/erreur
- [x] Vérifier accessibilité

**Status**: ✅ COMPLÉTÉ

---

#### Tâche 1.2: JoinForm.tsx - Refactorisation Complète

- **Fichier**: `src/components/forms/JoinForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h
- **Dépendances**: Utilisé pour rejoindre l'équipe

**Checklist**:

- [x] Remplacer `alert()` par `useToast()`
- [x] Implémenter React Hook Form + Zod
- [x] Ajouter validation email et nom
- [x] Améliorer layout (Form Grid)
- [x] Ajouter caractères counter pour message
- [x] Better error states
- [x] Tester validation complète
- [x] Mobile responsif

**Notes**:

- Message de motivation: min 20 caractères
- Validation email stricte
- Ajouter success message avec prochaines étapes

---

#### Tâche 1.3: ApplicationForm.tsx - Refactorisation

- **Fichier**: `src/components/forms/ApplicationForm.tsx`
- **Complexité**: ⭐⭐⭐ Moyen-Haut
- **Temps estimé**: 3-4h
- **Dépendances**: Formulaire de candidature important

**Checklist**:

- [x] Implémenter React Hook Form + Zod
- [x] Ajouter validation phone (français)
- [x] Ajouter validation position/poste
- [x] Améliorer layout avec sections
- [x] Ajouter Select pour positions
- [x] Ajouter Textarea avec character count pour motivation
- [x] Améliorer feed-back d'erreurs
- [x] Ajouter progress bar (optional)
- [x] Test complet

**Validations**:

```typescript
fullName: z.string().min(3).max(100)
email: z.string().email()
phone: z.string().regex(/^(?:\+33|0)[1-9](?:[0-9]{8})$/)
position: z.enum(['animator', 'coordinator', 'manager', 'developer'])
experience: z.string().min(5).max(1000)
motivation: z.string().min(20).max(3000)
```

---

### Phase 2 - IMPORTANT (Semaine 2-3)

#### Tâche 2.1: SchoolsContactForm.tsx - Refactorisation

- **Fichier**: `src/components/forms/SchoolsContactForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h

**Checklist**:

- [x] React Hook Form + Zod
- [x] Améliorer Select (niveau scolaire)
- [x] Validation institution
- [x] Layout amélioré
- [x] Tester avec niveaux différents

**Select Options**:

```typescript
level: z.enum([
  'maternelle', 'cp-ce1', 'ce2-cm1', 'cm2-6e',
  '5e-4e', '3e', 'seconde', 'premiere', 'terminale'
])
```

---

#### Tâche 2.2: CompaniesContactForm.tsx - Refactorisation

- **Fichier**: `src/components/forms/CompaniesContactForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h

**Checklist**:

- [x] React Hook Form + Zod
- [x] Validation SIRET/SIREN
- [x] Taille entreprise Select
- [x] Secteur d'activité Select
- [x] Better error messages

---

#### Tâche 2.3: StructuresContactForm.tsx - Refactorisation

- **Fichier**: `src/components/forms/StructuresContactForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h

**Notes**: Même pattern que CompaniesContactForm

---

#### Tâche 2.4: ChildConsentForm.tsx - Améliorations

- **Fichier**: `src/components/family/ChildConsentForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h

**Checklist**:

- [x] Ajouter React Hook Form pour cohérence
- [x] Améliorer Checkbox UX
- [x] Ajouter toast notifications
- [x] Better loading state
- [x] Validation: au moins 1 consentement?
- [x] Améliorer message PDF RGPD

**Important**: Vérifier si au moins 1 consentement est requis

---

#### Tâche 2.5: ChildHealthForm.tsx - Améliorations

- **Fichier**: `src/components/family/ChildHealthForm.tsx`
- **Complexité**: ⭐⭐⭐ À évaluer
- **Temps estimé**: 3-4h

**Checklist**:

- [x] Audit approfondi (lire le fichier complet)
- [x] React Hook Form + Zod
- [x] Validation métier (alergies, etc)
- [x] Meilleur UX pour données sensibles
- [x] Toast notifications
- [x] Test de soumission

---

### Phase 3 - À ÉVALUER (Semaine 4+)

#### Tâche 3.1: GroupForm.tsx - Audit & Refactorisation

- **Fichier**: `src/components/groups/GroupForm.tsx`
- **Complexité**: ⭐⭐⭐ À évaluer
- **Temps estimé**: 3-5h
- **Status**: ✅ COMPLÉTÉ

**Steps**:

1. [x] Lire le fichier complet
2. [x] Identifier validations nécessaires
3. [x] Refactoriser avec React Hook Form + Zod
4. [x] Améliorer UX

---

#### Tâche 3.2: SessionForm.tsx - Audit & Refactorisation

- **Fichier**: `src/components/groups/SessionForm.tsx`
- **Complexité**: ⭐⭐⭐ À évaluer
- **Temps estimé**: 3-5h
- **Status**: ✅ COMPLÉTÉ

---

#### Tâche 3.3: AddProjectForm.tsx - Audit & Refactorisation

- **Fichier**: `src/components/groups/AddProjectForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h
- **Status**: ✅ COMPLÉTÉ

---

#### Tâche 3.4: AddEvaluationForm.tsx - Audit & Refactorisation

- **Fichier**: `src/components/groups/AddEvaluationForm.tsx`
- **Complexité**: ⭐⭐ Moyen
- **Temps estimé**: 2-3h
- **Status**: ✅ COMPLÉTÉ

---

## 🔧 Bonnes Pratiques à Implémenter

### 1. Validation Complète

```typescript
// ✅ À faire: Validation stricte côté client
const schema = z.object({
  email: z.string().email('Email invalide').min(5).max(255),
  name: z.string().min(2, 'Minimum 2 caractères').max(100),
  message: z.string().min(10, 'Minimum 10 caractères').max(5000),
});

// ❌ À éviter: Validation minimale ou absente
```

### 2. Gestion d'Erreurs

```typescript
// ✅ À faire: Erreurs spécifiques par champ
<FormMessage /> // affiche l'erreur Zod

// ❌ À éviter: Alert() ou console.error()
```

### 3. Feedback Utilisateur

```typescript
// ✅ À faire: Toast notifications
toast({ title: 'Succès', description: '...' });

// ❌ À éviter: Alert() ou rien du tout
```

### 4. États de Chargement

```typescript
// ✅ À faire: Désactiver input + spinner
<Button disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? <Spinner /> : 'Envoyer'}
</Button>

// ❌ À éviter: Pas d'indication de chargement
```

### 5. Accessibilité

```typescript
// ✅ À faire: Label + aria-describedby
<FormLabel htmlFor="email">Email</FormLabel>
<FormControl>
  <Input id="email" type="email" />
</FormControl>
<FormDescription>email@example.com</FormDescription>
<FormMessage />

// ❌ À éviter: Input sans label
```

---

## 📊 Métriques de Succès

Après refactorisation, chaque formulaire doit avoir:

- [ ] **Validation**: 100% des champs validés côté client
- [ ] **Accessibilité**: WCAG AA minimum (labels, contrast, focus)
- [ ] **UX**: Feedback clair pour success/error/loading
- [ ] **Performance**: < 100ms validation feedback
- [ ] **Mobile**: Fully responsive sur mobile
- [ ] **i18n**: Tous messages traduits
- [ ] **Tests**: Tests d'intégration des formulaires

---

## 🧪 Plan de Test

Pour chaque formulaire refactorisé:

### Tests Manuel

- [ ] Soumettre avec données valides → succès
- [ ] Soumettre avec données invalides → erreurs spécifiques
- [ ] Erreur réseau → message approprié
- [ ] Erreur serveur 500 → gestion gracieuse
- [ ] Navigation pendant chargement → désactiver
- [ ] Focus management (keyboard navigation)

### Tests Automatisés (Optional)

```typescript
// Exemple test avec Vitest
describe('ContactForm', () => {
  it('should show validation error for invalid email', async () => {
    // ...
  });

  it('should submit successfully with valid data', async () => {
    // ...
  });
});
```

---

## 📝 Documentation à Créer

Après Phase 1, créer:

1. **FORMS_STANDARDS.md**
   - Standards d'implémentation
   - Template minimal
   - Exemples complets

2. **FORMS_CHECKLIST.md**
   - Checklist de code review
   - Points à vérifier avant merge

3. **FORMS_GLOSSARY.md**
   - Termes validations courants
   - Patterns de gestion d'erreurs

---

## 📅 Timeline

| Semaine | Tâches | État |
|---------|--------|------|
| Semaine 1 | 1.1, 1.2, 1.3 (3 formulaires) | ⏭️ À démarrer |
| Semaine 2 | 2.1, 2.2, 2.3 (3 formulaires Contact) | ⏭️ Planifié |
| Semaine 3 | 2.4, 2.5 (2 formulaires Family) | ⏭️ Planifié |
| Semaine 4+ | 3.x (Formulaires Groups) | ⏭️ Planifié |

---

## 🎯 Objectif Final

✅ Tous les formulaires:

- Utilisant React Hook Form + Zod
- Avec validation stricte côté client
- Avec feedback utilisateur clair
- Responsive et accessible
- Testés et documentés
- Cohérents dans l'expérience utilisateur

---

**Maintenant prêt à démarrer la Phase 1! 🚀**
