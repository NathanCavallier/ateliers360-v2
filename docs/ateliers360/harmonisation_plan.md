# Plan: Harmonisation & Complétion des Pages Solutions Ateliers360

**TL;DR** — Créer 7 composants réutilisables pour harmoniser visuellement les 4 pages (`pour-les-entreprises`, `pour-les-structures`, `pour-les-ecoles`, `nous-rejoindre`), ajouter formulaires embarqués, sections FAQ/Process/Testimonials, et refondre complètement `nous-rejoindre` au style corporate.

---

## **Incohérences Actuelles Identifiées**

| Problème | Impact |
|----------|--------|
| **Hero hétérogènes** | `pour-les-ecoles` a gradient différent, pas de Badge, espacements variables |
| **Formulaires dispersés** | Seulement `pour-les-ecoles` a formulaire embarqué; autres → pages séparées |
| **Sections répétitives** | Process/FAQ codés manuellement, pas harmonisés |
| **Manque de visuels** | Pas d'icônes pour clarifier sections, pas de témoignages/social proof |
| **nous-rejoindre isolée** | Structure complètement différente, manque de professionnalisme |

---

## **Composants à Créer** (Phase 1)

| Composant | Usage | Bénéfice |
|-----------|-------|----------|
| **SectionHero.tsx** | Hero unifié pour 4 pages | -60 lignes dupliquées |
| **FeatureCardsGrid.tsx** | "Pourquoi nous", "Services", "Avantages" | Cards harmonisées + optionnel icons |
| **ProcessSteps.tsx** | "Comment ça marche", processus candidature | Visuel + texte structuré |
| **TestimonialSection.tsx** | Témoignages d'écoles, entreprises, équipe | Social proof consistent |
| **FAQSection.tsx** | FAQ harmonisées sur 4 pages | Accordéons unifiés |
| **CTASection.tsx** | Footer CTA (Contactez-nous, Postulez) | CTA dominant et cohérent |
| **EmbeddedFormWrapper** | Améliorer forms existants + new ApplicationForm | Tous les formulaires embarqués |

---

### **Phases d'Implémentation**

#### **Phase 1: Composants Fondamentaux** (Blockers: aucun)

- [ ] Créer 6 composants Section + améliorer 3 formulaires
- [ ] **Durée estimée**: 4-5 heures
- **Outputspécifiques**: Composants testés, prêts pour réutilisation

#### **Phase 2: pour-les-entreprises** (Dépend Phase 1)

- [ ] Refactoriser avec SectionHero, FeatureCardsGrid, ProcessSteps
- [ ] Ajouter TestimonialSection + FAQSection + CTASection
- [ ] Intégrer CompaniesContactForm embarquée
- **Durée**: 1-2 heures | **Impact**: -100 lignes code, +10% UX

#### **Phase 3: pour-les-structures** (Dépend Phase 2)

- [ ] Même structure que Phase 2, contenu adapté
- [ ] Intégrer StructuresContactForm embarquée
- **Durée**: 1 heure

#### **Phase 4: pour-les-ecoles** (Dépend Phase 1)

- [ ] Harmoniser Hero, Feature cards
- [ ] Garder Packs & Pricing (spécifiques), harmoniser FAQ UI
- [ ] Formulaire embarqué déjà existant → améliorer CSS/validation
- [ ] Ajouter TestimonialSection
- **Durée**: 1-1.5 heures

#### **Phase 5: nous-rejoindre (REFONTE COMPLÈTE)** (Dépend Phase 1)

- [ ] Restructurer avec SectionHero, FeatureCardsGrid (Pourquoi/Opportunités)
- [ ] Ajouter ProcessSteps (candidature), TestimonialSection (équipe)
- [ ] Intégrer **ApplicationForm** (nouveau, pour carrière)
- [ ] Ajouter FAQ RH, CTASection
- **Durée**: 2-2.5 heures | **Impact**: Refonte complète → branding pro

#### **Phase 6: Validation & Optimisation** (Dépend Phase 5)

- [ ] Test responsive + i18n (FR/EN) sur 4 pages
- [ ] Accessibility audit (ARIA, contrast, keyboard nav)
- [ ] Optimisation perf (lazy load images, component bundling)
- **Durée**: 1.5 heures

---

### **Fichiers Clés**

**À Créer (7 nouveaux)**:

```
src/components/sections/
  ├─ SectionHero.tsx
  ├─ FeatureCardsGrid.tsx
  ├─ ProcessSteps.tsx
  ├─ TestimonialSection.tsx
  ├─ FAQSection.tsx
  └─ CTASection.tsx
src/components/forms/
  └─ ApplicationForm.tsx
```

**À Modifier (4 pages + 2 forms)**:

```
src/app/[locale]/
  ├─ pour-les-entreprises/page.tsx
  ├─ pour-les-structures/page.tsx
  ├─ pour-les-ecoles/page.tsx
  └─ nous-rejoindre/page.tsx

src/components/forms/
  ├─ CompaniesContactForm.tsx (améliorer)
  ├─ StructuresContactForm.tsx (améliorer)
  └─ ApplicationForm.tsx (créer)

messages/
  ├─ fr.json (+ clés: testimonials, faq, process)
  └─ en.json (+ clés: testimonials, faq, process)
```

---

### **Vérification & Décisions**

✅ **Inclus**:  

- 7 composants réutilisables + icônographie LucideReact  
- 4 pages harmonisées, formulaires embarqués partout  
- Social proof (testimonials), FAQ, Process steps visuels  
- Refonte `nous-rejoindre` → branding corporate  
- Tests responsive + i18n  

❌ **Exclu**:  

- Contenu (photos, testimonials texte) — à fournir par vous  
- Changement du système de couleurs/thème  
- Refactoriser autres pages du site  

---

### **Ressources Nécessaires**

- **Contenu à fournir** (FR + EN):
  - 3-4 témoignages par audience (entreprise/structure/école) + image/avatar
  - FAQ détaillé (3-4 Q&A par page)
  - Process steps texte (3-5 étapes)
  
- **Icônes** → LucideReact (déjà installé)
- **Styling** → Tailwind existing + composants UI existants

---

### **Questions avant Démarrage**

1. ✅ **Avez-vous le contenu** (testimonials, FAQ, process) en FR et EN, ou dois-je proposer un template à remplir ?
2. ✅ **Images/avatars** pour les testimonials — comment souhaiterez-vous les gérer (Unsplash, images custom) ?
3. ✅ **ApplicationForm** (formulaire candidature) — champs spécifiques souhaités (CV upload, expérience, etc.) ?

**→ Approuvez-vous ce plan pour démarrer la Phase 1 immédiatement ?**
