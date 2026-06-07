# 🚀 Roadmap d'intégration Passerelle Jeunesse

**Date de création :** 2026-06-06
**Dernière révision :** 2026-06-06
**Objectif :** Refactoriser le site Ateliers 360 (platform-v2) pour intégrer Passerelle Jeunesse comme pôle d'activité complémentaire
**Approche :** ✅ Site unique avec deux pôles (Ateliers 360 + Passerelle Jeunesse), plutôt que deux sites séparés
**Statut global :** 🟡 Implémentation démarrée

---

## 📋 Tableau de synthèse

| Catégorie | Tâche | Priorité | Statut | Assigné | Deadline |
|-----------|-------|----------|--------|---------|----------|
| **Architecture Site** | Refactoriser navigation (Ateliers 360 + Passerelle) | 🔴 Haute | 🟡 En cours | - | - |
| **Pages Web** | Page "Nos activités" (2 pôles) | 🔴 Haute | ✅ Fait | - | - |
| **Pages Web** | Page "Passerelle Jeunesse" détaillée | 🔴 Haute | ✅ Fait | - | - |
| **Pages Web** | Page "Le Projet" (vision unifiée) | 🔴 Haute | ✅ Fait | - | - |
| **Pages Web** | Page "Demander une mission" (formulaire) | 🔴 Haute | 🟡 En cours | - | - |
| **Pages Web** | Page "FAQ" Passerelle + Ateliers | 🟠 Moyenne | ⚪ À faire | - | - |
| **Traductions** | Audit des contenus à traduire (site unifié) | 🟠 Moyenne | ⚪ À faire | - | - |
| **Traductions** | Implémentation i18n (next-intl) | 🟠 Moyenne | ⚪ À faire | - | - |
| **Documents légaux** | CGV mise à jour (2 pôles) | 🔴 Haute | ✅ Fait | - | - |
| **Documents légaux** | Mentions légales mises à jour | 🔴 Haute | ✅ Fait | - | - |
| **Documents légaux** | Politique de confidentialité | 🟠 Moyenne | ✅ Fait | - | - |
| **Documents administratifs** | Contrat d'accompagnement Passerelle | 🔴 Haute | ⚪ À faire | - | - |
| **Documents administratifs** | Autorisation parentale | 🔴 Haute | ⚪ À faire | - | - |
| **Documents administratifs** | Fiche de renseignements jeune | 🔴 Haute | ⚪ À faire | - | - |
| **Branding** | Logo Passerelle Jeunesse | 🔴 Haute | ⚪ À faire | - | - |
| **Branding** | Intégration visuelle Passerelle sur site | 🟠 Moyenne | ⚪ À faire | - | - |
| **Réseaux sociaux** | Profils Facebook/Instagram Passerelle | 🟠 Moyenne | ⚪ À faire | - | - |
| **Intégration Stripe** | Setup paiement missions Passerelle | 🔴 Haute | ⚪ À faire | - | - |

---

## 🎯 Phase 1 : Refactorisation architecture site (0–1 mois)

### Analyse & Planification

- [ ] **Audit du site Ateliers 360 actuel**
  - Structure des pages existantes
  - Composants réutilisables
  - Routes actuelles
  - Système de navigation
  - Localisation : `/platform-v2/src/`

- [ ] **Design système pour dual branding**
  - Deux pôles distincts : "Ateliers 360" + "Passerelle Jeunesse"
  - Palette couleur pour chaque pôle
  - Icônes/symboles distinctifs
  - Patterns de présentation

- [ ] **Logo Passerelle Jeunesse**
  - Créer ou adapter le logo
  - Format SVG pour responsive
  - Variantes (couleur, monochrome, favicon)
  - Stockage : `/platform-v2/public/assets/logos/`

### Refactorisation Navigation

- [x] **Header/Navigation refactorisée**
  - Intégrer menu Ateliers 360 (ateliers, tarifs, contact)
  - Intégrer section Passerelle Jeunesse (présentation, services, demander une mission)
  - Options de sélection entre les deux pôles (onglets ou dropdown)
  - Localisation : `src/components/header.tsx` (platform-v2)

- [x] **Footer mis à jour**
  - Liens pour les deux pôles
  - CGV, mentions légales, politique confidentiel
  - Réseaux sociaux (Ateliers + Passerelle)
  - Localisation : `src/components/footer.tsx` (platform-v2)

- [x] **Homepage refactorisée**
  - Présentation des deux pôles
  - CTAs distincts : "Explorer Ateliers 360" + "Demander une mission Passerelle Jeunesse"
  - Section "Notre vision" (écosystème unifié)
  - Localisation : `src/app/page.tsx` (platform-v2)

---

## 📄 Phase 2 : Documents légaux et administratifs (Semaine 1–2)

### CGV (Conditions Générales de Vente)

- [x] **CGV - Mise à jour**
  - Fichier existant : `src/components/cgv.tsx` (platform-v2)
  - Ajouter sections Passerelle Jeunesse (accompagnement mobilité)
  - Clarifier les deux pôles d'activité distincts
  - Tarifs explicites pour accompagnement mobilité + ateliers
  - Conditions d'annulation différenciées (par pôle)
  - Assurance RC Pro mentionnée
  - Autorisation parentale requise pour missions Passerelle
  - Page accessible : `ateliers360.fr/cgv`

### Mentions Légales

- [x] **Mentions légales - Mise à jour**
  - Fichier existant : `src/components/mentions-legales.tsx` (platform-v2)
  - Ajouter entreprise Ateliers 360 comme entité légale unique
  - Clarifier les deux marques/pôles (Ateliers 360 + Passerelle Jeunesse)
  - Numéro SIRET + Statut micro-entrepreneur
  - RCS (si applicable)
  - Coordonnées complètes (email, téléphone)
  - Hébergeur du site
  - Responsable éditorial
  - Page accessible : `ateliers360.fr/mentions-legales`

### Politique de confidentialité

- [x] **Politique de confidentialité**
  - Nouveau composant : `src/components/politique-confidentialite.tsx` (platform-v2)
  - Route : `src/app/politique-confidentialite/page.tsx` (platform-v2)
  - Conformité RGPD
  - Données collectées via formulaires (contact, demande de mission, ateliers)
  - Utilisation des données (Stripe, email, analytics)
  - Distinction données mineurs (Passerelle) vs autres
  - Droits des utilisateurs (accès, suppression, oubli)
  - Cookies & Analytics
  - Contact DPO
  - Page accessible : `ateliers360.fr/politique-confidentialite`

### Documents administratifs (PDF/modèles)

- [ ] **Contrat d'accompagnement Passerelle Jeunesse**
  - Lieu : `/platform-v2/public/documents/templates/`
  - Format : Word + PDF
  - Champs : jeune, responsables légaux, dates, trajets, tarifs
  - Signature digitale ou physique
  - Téléchargeable depuis le site

- [ ] **Autorisation parentale**
  - Lieu : `/platform-v2/public/documents/templates/`
  - Format : Word + PDF
  - Autorisations : photographie, traitement médical urgence, diffusion info
  - À compléter avant mission

- [ ] **Fiche de renseignements jeune**
  - Lieu : `/platform-v2/public/documents/templates/`
  - Champs : identité, contact urgence, infos médicales, allergies
  - À renouveler annuellement
  - Confidentiel

- [ ] **Conditions générales d'accompagnement**
  - Tarifs clairs
  - Durée des services (horaires, jours)
  - Modalités de paiement (Stripe, virement)
  - Conditions d'annulation et remboursement
  - Responsabilité de chacun

---

## 🌐 Phase 3 : Pages web et contenu (Semaine 2–4)

### Pages web Ateliers 360 (refactorisées)

- [x] **Page "Nos activités"**
  - Présentation des deux pôles côte à côte
  - Section 1 : Ateliers 360 (sciences, numérique, robotique)
  - Section 2 : Passerelle Jeunesse (accompagnement, mobilité, futurs ateliers)
  - Localisation : `src/app/nos-activites/page.tsx` (platform-v2)
  - Composant : `src/components/nos-activites.tsx`

- [x] **Page "Passerelle Jeunesse"**
  - Présentation détaillée du pôle
  - Services disponibles aujourd'hui (accompagnement mobilité)
  - Vision à long terme (ateliers, accueil, escape games)
  - Feuille de route (4 phases)
  - Localisation : `src/app/passerelle-jeunesse/page.tsx` (platform-v2)
  - Composant : `src/components/passerelle-jeunesse.tsx`

- [x] **Page "Le Projet"**
  - Vision unifiée Ateliers 360 + Passerelle Jeunesse
  - Valeurs communes
  - Objectifs long terme
  - Écosystème éducatif et jeunesse
  - Localisation : `src/app/le-projet/page.tsx` (platform-v2)
  - Composant : `src/components/le-projet.tsx`

### Pages web formulaires & contact

- [ ] **Page "Demander une mission" (Passerelle)**
  - [x] Route et formulaire front-end initial
  - [ ] Intégration API, email et Stripe
  - Formulaire enrichi pour demande d'accompagnement
  - Champs : nom jeune, âge, dates souhaitées, trajets, nombre jeunes
  - Intégration avec Stripe (acompte/paiement)
  - Validation et confirmation email
  - Localisation : `src/app/demander-mission/page.tsx` (platform-v2)
  - Composant : `src/components/mission-form.tsx`

- [ ] **Page "Contact"**
  - Formulaire contact unifié
  - Distinction entre : demande atelier / demande mission / autre
  - Email de confirmation
  - Localisation : `src/app/contact/page.tsx` (platform-v2)
  - Composant : `src/components/contact-form.tsx`

- [ ] **Page "FAQ"**
  - Questions sur Ateliers 360 (tarifs, inscription, ateliers)
  - Questions sur Passerelle Jeunesse (missions, tarifs, sécurité)
  - Questions communes (assurance, confidentialité)
  - Localisation : `src/app/faq/page.tsx` (platform-v2)
  - Composant : `src/components/faq.tsx`

### Pages web complémentaires

- [ ] **Page "Tarifs & Offres"** (mise à jour)
  - Section Ateliers 360 (tarifs par atelier)
  - Section Passerelle Jeunesse (tarifs accompagnement mobilité)
  - Calculateur de devis
  - Localisation : `src/app/tarifs/page.tsx` (platform-v2)
  - Composant : `src/components/pricing.tsx`

- [ ] **Page "À propos"**
  - Histoire d'Ateliers 360
  - Vision Passerelle Jeunesse
  - L'équipe
  - Valeurs et engagement
  - Localisation : `src/app/a-propos/page.tsx` (platform-v2)
  - Composant : `src/components/a-propos.tsx`

- [ ] **Page "Partenaires"**
  - Liste mairies, associations, structures partenaires
  - Logos + descriptions courtes
  - CTA "Devenir partenaire"
  - Localisation : `src/app/partenaires/page.tsx` (platform-v2)
  - Composant : `src/components/partenaires.tsx`

---

## 🌍 Phase 4 : Traductions et multilingue (Semaine 3–5)

### Audit des contenus

- [ ] **Audit des contenus à traduire**
  - Inventaire des pages/textes site unifié (platform-v2)
  - Estimation coûts traduction
  - Priorisation : FR (100%), EN (80%), autres (selon demande)
  - Focus : pages principales + documents légaux + formulaires

### Implémentation i18n

- [ ] **Configuration i18n (next-intl) sur platform-v2**
  - Installer dépendance : `next-intl`
  - Fichiers de traduction : `src/messages/{locale}/*.json` (platform-v2)
  - Configuration middleware : `src/middleware.ts` (platform-v2)
  - Layout racine multilingue pour Ateliers 360

- [ ] **Traduction contenu site (EN)**
  - Pages principales (Ateliers 360 + Passerelle Jeunesse)
  - Formulaires (contact, demande mission, ateliers)
  - Mentions légales, CGV, politique confidentiel
  - FAQ
  - Navigation

- [ ] **Sélecteur de langue**
  - Composant header : Drapeau (FR/EN) + Sélecteur
  - Persistence préférence utilisateur (localStorage)
  - Localisation URL : `ateliers360.fr/fr/...` et `ateliers360.fr/en/...`
  - Redirection intelligent par navigateur

---

## 🔗 Phase 5 : Intégration Stripe et systèmes transversaux (Semaine 4–6)

### Paiement & Stripe

- [ ] **Setup Stripe pour missions Passerelle**
  - Intégration paiement formulaire "Demander une mission"
  - Acompte de sécurité (ex: 20% du tarif)
  - Paiement complet possible en ligne
  - Confirmation email post-paiement
  - Dashboard Stripe pour suivi

- [ ] **Setup Stripe pour ateliers (si applicable)**
  - Paiement inscription ateliers scolaires
  - Facture automatique générée

### Systèmes transversaux

- [ ] **Email de confirmation**
  - Template transactionnel (Resend ou nodemailer)
  - Confirmation demande de mission + détails
  - Signature : Ateliers 360 / Passerelle Jeunesse
  - Info pratiques : tarifs, conditions annulation, contact

- [ ] **Analytics & Tracking**
  - Setup Google Analytics / Matomo
  - Track conversions : demandes d'ateliers + missions
  - Segmentation : utilisateurs Ateliers vs Passerelle
  - Heatmaps pour UX optimization

- [ ] **Sitemap & SEO**
  - Mise à jour `sitemap.xml` (platform-v2)
  - Toutes les pages (FR + EN)
  - Meta descriptions cohérentes (2 pôles)
  - Structured data (JSON-LD) : Organisation, Service, LocalBusiness

- [ ] **Email newsletters (optionnel)**
  - Abonnement optionnel au lancement
  - Templates pour annonces Ateliers 360 + Passerelle Jeunesse

---

## 📱 Phase 6 : Réseaux sociaux et communication (Semaine 5–7)

### Profils sociaux Passerelle Jeunesse

- [ ] **Facebook Passerelle Jeunesse**
  - Création profil officiel (distinct d'Ateliers 360)
  - Bio + description complète
  - Lien vers site principal (ateliers360.fr/passerelle-jeunesse)
  - Photo profil (logo Passerelle)
  - Couverture (bannière avec vision)
  - Lien vers site ateliers360.fr

- [ ] **Instagram Passerelle Jeunesse**
  - Création profil officiel
  - Bio + lien en bio (linktree ou page d'accueil)
  - Stories & Reels plan (futur)
  - Hashtags : #PasserelleJeunesse #Ateliers360 #MetzJeunesse #Mobilité

- [ ] **LinkedIn Ateliers 360** (optionnel)
  - Page organisation unifiée
  - Actualités partenariats (ateliers + missions)
  - Job postings (animateurs vacataires, intervenants)

### Mise à jour réseaux existants

- [ ] **Profils Ateliers 360 existants**
  - Ajouter mention Passerelle Jeunesse dans bios
  - Lier les deux profils
  - Partager contenu des deux pôles

### Stratégie de contenu

- [ ] **Calendrier editorial**
  - Postes de lancement site refactorisé
  - Annonces missions Passerelle Jeunesse
  - Ateliers proposés (Ateliers 360)
  - Témoignages jeunes / familles (avec consentement)
  - Actualités partenaires
  - Fréquence : 2–3x par semaine par pôle

---

## ✅ Phase 7 : QA, Tests et Lancement (Semaine 6–8)

### Tests techniques

- [ ] **Tests de régression site refactorisé**
  - Responsive design (mobile, tablet, desktop)
  - Tous les formulaires (contact, mission, ateliers)
  - Intégration Stripe (paiement test)
  - Liens internes / externes (tous les pôles)
  - Navigation bilingue FR/EN
  - URLs correctes (avec /fr/ et /en/)

- [ ] **SEO & Performance**
  - Audit Lighthouse (85+ score)
  - Meta tags complets (titre, description, OG)
  - Canonical URLs correctes (pas de duplicates)
  - Images optimisées (WebP, lazy loading)
  - Sitemap soumis à Google Search Console

- [ ] **Conformité légale**
  - Cookies consent (si Google Analytics)
  - RGPD compliance (formulaires)
  - Mentions légales visibles (footer)
  - CGV accessible
  - Politique confidentialité accessible

### Tests UX

- [ ] **Relecture contenu**
  - Pas de typos/erreurs (FR + EN)
  - Cohérence ton/style (2 pôles distincts mais cohésifs)
  - Clarté des CTAs ("Demander mission" vs "Découvrir ateliers")
  - Accessibilité (alt text, contraste WCAG AA, keyboard nav)

- [ ] **Tests par utilisateurs**
  - Représentants familles (Passerelle)
  - Directeurs d'établissement (Ateliers 360)
  - Structures partenaires (mairies, associations)
  - Retours sur : clarté, prix, démarche, UX

### Lancement production

- [ ] **Déploiement production**
  - Backup données existantes (sur platform-v2)
  - Tests finals sur staging
  - Déploiement (Vercel ou autre)
  - Vérification tous les liens/formulaires
  - Monitoring alertes activé

- [ ] **Annonce lancement**
  - Email announcement partenaires (Ateliers 360 + Passerelle)
  - Posts réseaux sociaux (Ateliers 360 + Passerelle)
  - Communiqué de presse (optionnel, si partenaires importants)
  - Notification à la base de données existante

---

## 📊 Dépendances et blocages

| Dépendance | Bloquage ? | Notes |
|------------|-----------|-------|
| Logo Passerelle Jeunesse | ✅ Critique | Nécessaire pour tous les visuels du site |
| Refactorisation navigation site | ✅ Critique | Bloc pour toutes les pages web |
| Contrats légaux + CGV | ✅ Critique | Requis avant accepter missions officielles |
| Setup Stripe | ✅ Critique | Nécessaire pour paiements missions |
| Données existantes Ateliers 360 | ✅ Critique | Audit structure avant refacto |
| Traductions EN | 🟡 Moyen | Important mais peut attendre phase 2 si FR d'abord |
| Réseaux sociaux Passerelle | 🟡 Moyen | Communication mais pas bloquer lancement site |
| Intégration analytics | 🟢 Faible | Nice-to-have pour v1 |

---

## 📂 Structure de fichiers clés (site unifié - platform-v2)

```
platform-v2/
├── src/
│   ├── app/
│   │   ├── page.tsx                          [✏️ À mettre à jour - Accueil unifié]
│   │   ├── nos-activites/
│   │   │   └── page.tsx                      [🆕 À créer - 2 pôles]
│   │   ├── passerelle-jeunesse/
│   │   │   └── page.tsx                      [🆕 À créer - Pôle Passerelle]
│   │   ├── le-projet/
│   │   │   └── page.tsx                      [🆕 À créer - Vision unifiée]
│   │   ├── demander-mission/
│   │   │   └── page.tsx                      [🆕 À créer - Formulaire mission]
│   │   ├── cgv/
│   │   │   └── page.tsx                      [✏️ À mettre à jour]
│   │   ├── mentions-legales/
│   │   │   └── page.tsx                      [✏️ À mettre à jour]
│   │   ├── politique-confidentialite/
│   │   │   └── page.tsx                      [🆕 À créer]
│   │   ├── tarifs/
│   │   │   └── page.tsx                      [✏️ À mettre à jour]
│   │   ├── contact/
│   │   │   └── page.tsx                      [✏️ À adapter]
│   │   ├── faq/
│   │   │   └── page.tsx                      [🆕 À créer]
│   │   ├── a-propos/
│   │   │   └── page.tsx                      [🆕 À créer]
│   │   ├── partenaires/
│   │   │   └── page.tsx                      [🆕 À créer]
│   │   └── [locale]/ (si i18n)
│   │       ├── fr/
│   │       └── en/
│   ├── components/
│   │   ├── cgv.tsx                           [✏️ À mettre à jour]
│   │   ├── mentions-legales.tsx              [✏️ À mettre à jour]
│   │   ├── politique-confidentialite.tsx     [🆕 À créer]
│   │   ├── nos-activites.tsx                 [🆕 À créer]
│   │   ├── passerelle-jeunesse.tsx           [🆕 À créer]
│   │   ├── le-projet.tsx                     [🆕 À créer]
│   │   ├── mission-form.tsx                  [🆕 À créer]
│   │   ├── pricing.tsx                       [✏️ À mettre à jour]
│   │   ├── contact-form.tsx                  [✏️ À adapter]
│   │   ├── faq.tsx                           [🆕 À créer]
│   │   ├── a-propos.tsx                      [🆕 À créer]
│   │   ├── partenaires.tsx                   [🆕 À créer]
│   │   ├── header.tsx                        [✏️ À adapter - navigation 2 pôles]
│   │   └── footer.tsx                        [✏️ À adapter - nouveaux liens]
│   └── middleware.ts                         [🆕 i18n - À créer si multilingue]
├── public/
│   ├── assets/
│   │   ├── logos/
│   │   │   ├── ateliers360-logo.svg          [Existant]
│   │   │   ├── passerelle-logo.svg           [🆕 À créer]
│   │   │   └── dual-brand.svg                [🆕 À créer - pour header]
│   │   └── images/                           [À compléter]
│   ├── documents/
│   │   └── templates/
│   │       ├── contrat-accompagnement.docx   [🆕 À créer]
│   │       ├── contrat-accompagnement.pdf    [🆕 À créer]
│   │       ├── autorisation-parentale.docx   [🆕 À créer]
│   │       ├── autorisation-parentale.pdf    [🆕 À créer]
│   │       ├── fiche-renseignements.docx     [🆕 À créer]
│   │       └── fiche-renseignements.pdf      [🆕 À créer]
│   └── messages/ (si i18n)
│       ├── fr.json
│       └── en.json
└── docs/
    └── passrelle_jeunesse/
        └── ROADMAP_INTEGRATION.md            [📍 Ce fichier]
```

---

## 🎯 Métriques de succès

- ✅ Site refactorisé responsive 100% testé (mobile, tablet, desktop)
- ✅ Navigation unifiée claire (2 pôles distincts)
- ✅ CGV + mentions légales + politique confidentialité complètes et légales
- ✅ Formulaires fonctionnels (contact, mission, ateliers)
- ✅ Paiement Stripe intégré et testé (missions Passerelle)
- ✅ Documents administratifs (contrats, autorisations) téléchargeables
- ✅ Site multilingue FR/EN (si prioritaire)
- ✅ SEO optimisé (85+ Lighthouse score)
- ✅ Traçabilité analytique (Google Analytics ou Matomo)
- ✅ 10+ missions d'accompagnement première année
- ✅ Partenariats établis (mairies, MJC, associations)
- ✅ 50+ followers réseaux sociaux (Passerelle) dans les 3 mois
- ✅ Organic traffic visible dans 6 mois

---

## 📅 Timeline proposée

| Phase | Durée | Start | End | Description |
|-------|-------|-------|-----|-------------|
| Phase 1 : Refactorisation architecture | 1 mois | 2026-06 | 2026-07 | Audit + navigation unifiée + accueil |
| Phase 2 : Documents légaux | 2 semaines | 2026-07 | 2026-07 | CGV, mentions légales, contrats, modèles |
| Phase 3 : Pages web & contenu | 2 semaines | 2026-07 | 2026-08 | Pages Passerelle, formulaires, FAQ |
| Phase 4 : Traductions i18n | 2 semaines | 2026-08 | 2026-08 | Setup i18n, traductions FR→EN |
| Phase 5 : Stripe & systèmes | 2 semaines | 2026-08 | 2026-09 | Paiement, email, analytics, SEO |
| Phase 6 : Réseaux sociaux | 2 semaines | 2026-08 | 2026-09 | Créer profils, calendrier édito |
| Phase 7 : QA & Lancement | 2 semaines | 2026-09 | 2026-09 | Tests, validation, déploiement production |
| **TOTAL** | **≈ 12 semaines** | **2026-06** | **2026-09** | Site unifié Ateliers 360 + Passerelle Jeunesse live |

---

## 🔄 Processus de mise à jour

Ce document doit être mis à jour :

- ✅ Hebdomadairement : Statuts des tâches (🟡 En cours → ✅ Complété)
- ✅ Lors de changements prioritaires dans le scope
- ✅ Lors de découverte de nouveaux blocages
- ✅ Après chaque phase complétée (retro & leçons apprises)
- ✅ Lors de changements technologiques ou contexte

**Responsable mise à jour :** [À définir]
**Dernière révision :** 2026-06-06
**Prochaine révision :** Hebdomadaire à partir du lancement Phase 1

**Note :** Cette roadmap s'aligne avec les documents stratégiques :
- `fusion_ateliers360_passerelle_jeunesse.md` (approche intégration)
- `Integration_Passerelle_Jeunesse.md` (vision dual branding)

---

## 📞 Contacts & Escalade

| Rôle | Personne | Email | Téléphone |
|------|----------|-------|-----------|
| Product Owner | [À définir] | - | - |
| Tech Lead (platform-v2) | [À définir] | - | - |
| Responsable Contenus | [À définir] | - | - |

---

## 🎯 Vision finale (après Phase 7)

**Site ateliers360.fr unifié présentant :**

✅ **Pôle Ateliers 360**
- Ateliers scientifiques & numérique
- Programmation (Scratch, Python, IA)
- Robotique & électronique
- Détails + tarifs + contact

✅ **Pôle Passerelle Jeunesse**
- Accompagnement mobilité local & national
- Vision futur : ateliers jeunesse, escape games, accueil
- Formulaire "Demander une mission"
- Paiement Stripe intégré

✅ **Infrastructure commune**
- Navigation unifiée (2 pôles)
- Documents légaux (CGV, mentions légales, politique confidentiel)
- Formulaires (contact, ateliers, missions)
- Multilingue FR/EN
- Analytics & SEO optimisé
- Réseaux sociaux (Ateliers 360 + Passerelle Jeunesse)

**Résultat :** Un site unique représentant l'écosystème éducatif et jeunesse complet, au service des écoles, familles, jeunes et partenaires locaux.

---

**Bonne chance avec la refactorisation ! 🚀**
