# Section Components - Documentation

## Overview

Ces composants réutilisables ont été créés pour harmoniser les pages solutions (`pour-les-entreprises`, `pour-les-structures`, `pour-les-ecoles`, `nous-rejoindre`) en réduisant la duplication de code et en assurant une cohérence visuelle et fonctionnelle.

**Créés**: Phase 1 - 9 Mai 2026  
**Statut**: ✅ Complets et prêts pour utilisation

---

## Components

### 1. **SectionHero.tsx**

Hero générique avec fond dégradé, image de background et CTA boutons.

**Props**:

```typescript
interface SectionHeroProps {
  title: string;                    // H1 title
  subtitle: string;                 // Subtitle/description
  badge?: string;                   // Optionnel badge texte
  cta_primary?: { label, href };    // Bouton primaire
  cta_secondary?: { label, href };  // Bouton secondaire
  backgroundImage?: string;         // URL image (default: unsplash)
  variant?: "primary" | "secondary" | "dark"; // Style variant
}
```

**Usage**:

```jsx
<SectionHero
  title="Pour les entreprises"
  subtitle="Développez les compétences STEM..."
  badge="Solutions personnalisées"
  variant="primary"
  cta_primary={{ label: "Nous contacter", href: "/contact" }}
  cta_secondary={{ label: "Voir les offres", href: "/offres" }}
  backgroundImage="https://..."
/>
```

---

### 2. **FeatureCardsGrid.tsx**

Grille de cartes avec titre, description et icône optionnelle.

**Props**:

```typescript
interface FeatureCardsGridProps {
  title: string;                    // Section title
  subtitle?: string;                // Section subtitle
  cards: Array<{
    title: string;
    description: string;
    icon?: LucideIcon;              // Icône LucideReact
  }>;
  columns?: 2 | 3;                  // Nombre de colonnes
  variant?: "card" | "minimal";     // Style des cartes
  withBackground?: boolean;         // Background grisé
}
```

**Usage**:

```jsx
import { Users, Zap, Target } from "lucide-react";
import { FeatureCardsGrid } from "@/components/sections";

<FeatureCardsGrid
  title="Pourquoi nous choisir?"
  subtitle="3 raisons principales"
  columns={3}
  variant="card"
  withBackground={true}
  cards={[
    {
      title: "Expertise",
      description: "Une équipe de pédagogues...",
      icon: Users
    },
    // ...
  ]}
/>
```

---

### 3. **ProcessSteps.tsx**

Affiche les étapes d'un processus (verticalement ou horizontalement).

**Props**:

```typescript
interface ProcessStepsProps {
  title: string;
  subtitle?: string;
  steps: Array<{
    title: string;
    description: string;
    icon?: LucideIcon;
  }>;
  direction?: "vertical" | "horizontal"; // Disposition
  withBackground?: boolean;
}
```

**Usage**:

```jsx
import { FileText, Handshake, Rocket } from "lucide-react";

<ProcessSteps
  title="Comment ça marche?"
  direction="vertical"
  steps={[
    {
      title: "1. Prise de contact",
      description: "Décrivez vos besoins...",
      icon: FileText
    },
    // ...
  ]}
/>
```

---

### 4. **TestimonialSection.tsx**

Affiche des témoignages avec avatar, quote, author, et rating.

**Props**:

```typescript
interface TestimonialSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    image?: string;                // URL avatar
    rating?: number;               // 1-5 stars
  }>;
  variant?: "grid" | "carousel";   // Layout type
  withBackground?: boolean;
}
```

**Usage**:

```jsx
<TestimonialSection
  title="Ce que nos clients disent"
  testimonials={[
    {
      quote: "Excellent service, les enfants ont adoré...",
      author: "Marie Dupont",
      role: "Directrice école primaire",
      image: "https://...",
      rating: 5
    },
    // ...
  ]}
/>
```

---

### 5. **FAQSection.tsx**

Accordion FAQ avec open/close states.

**Props**:

```typescript
interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  withBackground?: boolean;
}
```

**Usage**:

```jsx
<FAQSection
  title="Questions fréquentes"
  faqs={[
    {
      question: "Quel est le format des ateliers?",
      answer: "Les ateliers sont proposés en..."
    },
    // ...
  ]}
/>
```

---

### 6. **CTASection.tsx**

Section Call-to-Action dominante (footer).

**Props**:

```typescript
interface CTASectionProps {
  title: string;
  subtitle?: string;
  cta_label: string;
  cta_href: string;
  variant?: "primary" | "secondary" | "dark";
}
```

**Usage**:

```jsx
<CTASection
  title="Prêt à démarrer?"
  subtitle="Contactez-nous pour discuter de votre projet"
  cta_label="Nous contacter"
  cta_href="/contact"
  variant="primary"
/>
```

---

## Forms Améliorés

### 7. **CompaniesContactForm.tsx** (Amélioré)

- ✅ Labels pour chaque champ
- ✅ Message de succès/erreur dans l'UI (pas d'alert)
- ✅ Validation d'email
- ✅ Disabled state pendant l'envoi
- ✅ Spacing et styling cohérent
- ✅ Accessibilité améliorée

### 8. **StructuresContactForm.tsx** (Amélioré)

Même améliorations que CompaniesContactForm.

### 9. **ApplicationForm.tsx** (Nouveau)

Formulaire de candidature pour "nous-rejoindre":

- Champs: Nom, Email, Téléphone, Position, Expérience, Motivation
- Messages de succès/erreur
- Sélecteur de postes
- Post vers `/api/applications/submit`

---

## Patterns de Design

### Color System

- **Primary**: Deep blue (#005B99)
- **Accent**: Orange (#FFD166)
- **Muted**: Light gray backgrounds
- **Success**: Green (pour validations)
- **Error**: Red (pour erreurs)

### Spacing

- `py-16 md:py-20` — Standard section padding
- `gap-6` — Inter-card spacing
- `space-y-5` — Form field spacing

### Typography

- **Headline**: Poppins (titles)
- **Body**: Roboto (content)
- **h1**: `text-4xl md:text-6xl font-bold`
- **h2**: `text-3xl font-bold`
- **Body**: `text-muted-foreground`

---

## Import Patterns

### Recommended (Using Index Export)

```jsx
import {
  SectionHero,
  FeatureCardsGrid,
  ProcessSteps,
  TestimonialSection,
  FAQSection,
  CTASection,
} from "@/components/sections";
```

### Direct Import

```jsx
import SectionHero from "@/components/sections/SectionHero";
```

---

## i18n Considerations

Tous les composants utilisent **props texte directs** (pas de traductions intégrées). Les traductions doivent être gérées au niveau de la page :

```jsx
// Page.tsx (client component)
"use client";
import { useTranslations } from "next-intl";
import { SectionHero } from "@/components/sections";

export default function Page() {
  const t = useTranslations("CompaniesPage");

  return (
    <SectionHero
      title={t("hero_title")}
      subtitle={t("hero_subtitle")}
      badge={t("badge")}
      // ...
    />
  );
}
```

---

## Next Steps (Phases 2-5)

### Phase 2: pour-les-entreprises

- [ ] Remplacer hero manuel par SectionHero
- [ ] Utiliser FeatureCardsGrid pour "Pourquoi/Services"
- [ ] Ajouter ProcessSteps, TestimonialSection, FAQSection, CTASection
- [ ] Intégrer CompaniesContactForm embarquée

### Phase 3: pour-les-structures

- [ ] Même structure que Phase 2
- [ ] Contenu adapté pour structures

### Phase 4: pour-les-ecoles

- [ ] Harmoniser Hero, Feature cards
- [ ] Garder Packs & Pricing (spécifiques)
- [ ] Améliorer form embarquée + FAQ UI

### Phase 5: nous-rejoindre (Refonte complète)

- [ ] Restructurer avec SectionHero, FeatureCardsGrid
- [ ] Ajouter ProcessSteps (candidature)
- [ ] Intégrer ApplicationForm
- [ ] Ajouter TestimonialSection (équipe)

---

## Checklist QA

Avant d'utiliser en production:

- [ ] Responsive design testé (mobile, tablet, desktop)
- [ ] Dark mode compatible
- [ ] Accessibilité (ARIA labels, keyboard nav, contrast)
- [ ] i18n traductions complètes (FR/EN)
- [ ] Performance (Lighthouse)
- [ ] Icons de LucideReact correctement importées

---

## Fichiers Créés

```
src/components/sections/
├─ SectionHero.tsx
├─ FeatureCardsGrid.tsx
├─ ProcessSteps.tsx
├─ TestimonialSection.tsx
├─ FAQSection.tsx
├─ CTASection.tsx
└─ index.ts

src/components/forms/
├─ CompaniesContactForm.tsx (✅ amélioré)
├─ StructuresContactForm.tsx (✅ amélioré)
└─ ApplicationForm.tsx (✅ nouveau)
```

---

## Version & Status

- **Date**: 9 Mai 2026
- **Status**: ✅ Phase 1 Complète
- **Prochaine**: Phase 2 (pour-les-entreprises)
- **Support**: Tous les composants utilisent Tailwind + next-intl + LucideReact (dépendances existantes)
