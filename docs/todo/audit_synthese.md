# 📋 SYNTHÈSE & PLAN D'ACTION — Audit Ateliers 360

**Date** : Avril 2026 | **Version** : 1.0

> Document de synthèse des trois audits : Frontend, Backend, Conformité réglementaire.
> Destiné à prioriser les actions correctives et à planifier la mise en conformité.

---

## 1. VUE D'ENSEMBLE DU PROJET

### État actuel

| Dimension | Score | Verdict |
|-----------|-------|---------|
| **Frontend UX** | 72% | 🟡 Bon socle, quelques trous fonctionnels |
| **Backend / API** | 58% | 🟡 Architecture solide, failles de sécurité critiques |
| **Infrastructure** | 65% | 🟡 Well-structured, configs à sécuriser |
| **Conformité légale** | 37% | 🔴 Insuffisant pour une activité commerciale |
| **RGPD** | 40% | 🔴 Risque important, sous-traitants non déclarés |
| **Secteur éducatif** | 45% | 🟡 Partiel, déclaration formation manquante |

### Points forts globaux

- Architecture Next.js 15 / App Router moderne et bien structurée
- Intégration Stripe complète (checkout + webhook + emails)
- Système de gestion des groupes/apprenants avancé pour un MVP
- SEO technique bien pensé (JSON-LD, sitemap, robots, generateMetadata)
- i18n EN/FR cohérent sur 22 namespaces
- UI/UX soignée avec shadcn/ui + Tailwind

### Blocages à lever avant mise en production commerciale

1. Mot de passe admin en clair dans le code source
2. Formulaire contact ne transmet rien
3. CGV absentes du site
4. Mentions légales non alignees avec un lancement en micro-entreprise
5. Données de contact (imulabs.fr ≠ ateliers360.fr)

### Cadre de lancement recommande

- Phase de lancement : entrepreneur individuel au regime micro-entreprise
- Objectif 0-6 mois : tester le marche, signer les premiers ateliers, limiter les charges fixes
- Prerequis juridiques immediats : SIRET, adresse, RC Pro, devis/factures propres, CGV publiees
- Intervention en etablissements : compatible avec une micro-entreprise si RC Pro, devis/factures et posture professionnelle sont en place
- Point d'attention : ne pas afficher de SASU ou de capital social tant que cette structure n'existe pas
- Evolution cible : bascule possible vers une SASU apres validation commerciale et revenus reguliers

---

## 2. PLAN D'ACTION PRIORISÉ

### 🔴 SPRINT 0 — Sécurité & Légal critique (Avant tout atelier facturé)

**Durée estimée : 1 semaine**

| # | Tâche | Fichier(s) | Effort | Responsable |
|---|-------|-----------|--------|-------------|
| S0-1 | Corriger l'auth : utiliser `bcrypt.compare(password, hash)` | `src/lib/auth.ts` | 1h | Dev |
| S0-2 | Générer un vrai `NEXTAUTH_SECRET` (32+ chars) | `.env.local` + `src/lib/auth.ts` | 30min | Dev |
| S0-3 | Supprimer le hint "admin123" de la page login | `src/app/admin/login/page.tsx` | 15min | Dev |
| S0-4 | Corriger les mentions legales pour la micro-entreprise : identite EI, SIRET, adresse, RC Pro, TVA si applicable | `messages/fr.json` + `messages/en.json` (LegalPage) | 1h | Nathan |
| S0-5 | Publier les CGV : créer `/src/app/[locale]/cgv/page.tsx` | Nouveau fichier + `messages/` | 3h | Dev + Nathan |
| S0-6 | Ajouter lien CGV dans Footer | `src/components/common/Footer.tsx` | 15min | Dev |
| S0-7 | Ajouter case "J'accepte les CGV" dans ReservationForm | `src/components/reservations/ReservationForm.tsx` | 1h | Dev |
| S0-8 | Corriger les emails templates : `imulabs.fr` → `ateliers360.fr` | `src/lib/email.ts` | 30min | Dev |
| S0-9 | Supprimer logos partenaires fictifs de packs | `src/app/[locale]/packs/page.tsx` | 15min | Dev |
| S0-10 | Résoudre le conflit entre les deux fichiers middleware | `middleware.ts` (racine) + `src/middleware.ts` | 1h | Dev |
| S0-11 | Finaliser les modeles de devis/facture simples pour la micro-entreprise | Templates docs + mentions legales | 1h | Nathan |

---

### 🟠 SPRINT 1 — Fonctionnalités manquantes critiques (Semaine 2-3)

**Durée estimée : 2 semaines**

| # | Tâche | Fichier(s) | Effort | Responsable |
|---|-------|-----------|--------|-------------|
| S1-1 | Connecter le Server Action contact : email via Resend + save DB | `src/lib/actions.ts` + nouvelle table `contact_requests` | 4h | Dev |
| S1-2 | Corriger le formulaire `/pour-les-ecoles` : Server Action ou email | `src/app/[locale]/pour-les-ecoles/page.tsx` | 3h | Dev |
| S1-3 | Intégrer consentement parental dans ReservationForm si public = mineurs | `src/components/reservations/ReservationForm.tsx` | 4h | Dev |
| S1-4 | Déclarer les sous-traitants dans la politique de confidentialité | `messages/fr.json` + `messages/en.json` (PrivacyPage) | 2h | Nathan + Dev |
| S1-5 | Corriger `sitemap.ts` et `robots.ts` : `imulabs.fr` → `ateliers360.fr` | `src/app/sitemap.ts` + `src/app/robots.ts` | 30min | Dev |
| S1-6 | Activer locale par défaut FR | `src/i18n/routing.ts` | 15min | Dev |
| S1-7 | Clarifier le regime TVA dans le calculateur tarifaire et les pages de vente | `src/app/[locale]/tarifs/page.tsx` + i18n | 1h | Dev |
| S1-8 | Supprimer `ignoreTypeScriptErrors` et corriger les erreurs TS | `next.config.ts` + fichiers concernés | 4h | Dev |
| S1-9 | Corriger bug `getGroupMembers` double `.select()` | `src/lib/supabase.ts` | 30min | Dev |
| S1-10 | Créer `.env.example` documenté | `.env.example` | 30min | Dev |
| S1-11 | Corriger stats hardcodées (accueil + à propos) : marquer "objectifs" | `messages/fr.json` + `messages/en.json` | 1h | Nathan |
| S1-12 | Ajouter `DisciplinesPage` namespace dans `en.json` | `messages/en.json` | 30min | Dev |
| S1-13 | Rendre le bouton "Explorer les Ateliers" dans disciplines fonctionnel | `src/app/[locale]/disciplines/page.tsx` | 15min | Dev |
| S1-14 | Vérifier et placer le logo `/public/images/logo.png` | `public/images/logo.png` | 1h | Nathan |

---

### 🟡 SPRINT 2 — RGPD & Qualité (Mois 2)

**Durée estimée : 2-3 semaines**

| # | Tâche | Fichier(s) | Effort |
|---|-------|-----------|--------|
| S2-1 | Structurer politique confidentialité par base légale | `messages/` | 3h |
| S2-2 | Ajouter durées de conservation pour chaque catégorie de données | `messages/` | 2h |
| S2-3 | Créer registre des traitements (document interne) | Document `.md` ou Notion | 4h |
| S2-4 | Signer DPA avec Supabase, Stripe, Resend, Vercel | Démarches externes | 1 semaine |
| S2-5 | Implémenter idempotence dans le webhook Stripe | `src/app/api/stripe/webhook/route.ts` | 2h |
| S2-6 | Gérer `payment_intent.payment_failed` : update statut + email admin | `src/app/api/stripe/webhook/route.ts` | 1h |
| S2-7 | Ajouter rate limiting sur `/api/reservations` | `src/app/api/reservations/route.ts` | 2h |
| S2-8 | Créer interface admin Blog (liste + CRUD articles) | `src/app/admin/(protected)/blog/` | 2 jours |
| S2-9 | Créer interface admin Événements (CRUD + calendrier) | `src/app/admin/(protected)/evenements/` | 2 jours |
| S2-10 | Ajouter pagination serveur sur `getWorkshops` | `src/lib/supabase.ts` + API | 3h |
| S2-11 | Intégrer la charte RGPD dans le flow réservation (formulaire signable) | Nouveau composant | 1 jour |
| S2-12 | Implémenter génération de rappels automatiques (cron Vercel) | `src/app/api/cron/reminders/route.ts` | 3h |

---

### 🟢 SPRINT 3 — Fonctionnalités avancées (Mois 3-4)

**Durée estimée : 4 semaines**

| # | Tâche | Priorité |
|---|-------|----------|
| S3-1 | Génération PDF devis (depuis l'admin) | Haute |
| S3-2 | Génération PDF factures (post-paiement Stripe) | Haute |
| S3-3 | Génération PDF bilan pédagogique | Haute |
| S3-4 | Dashboard admin avec graphiques recharts (CA, réservations, satisfaction) | Moyenne |
| S3-5 | Interface génération image IA dans l'admin workshops | Moyenne |
| S3-6 | Page de suppression de compte apprenant (RGPD Art. 17) | Haute |
| S3-7 | Parser Markdown complet pour les articles de blog | Moyenne |
| S3-8 | Filtres Supabase côté serveur (au lieu de useMemo client) | Moyenne |
| S3-9 | Tests E2E Playwright (formulaire, réservation, paiement) | Haute |
| S3-10 | Sentry ou Axiom pour le monitoring/logging | Haute |
| S3-11 | Déclaration de prestataire de formation au DREETS | Haute — Démarche externe |
| S3-12 | Audit RGAA accessibilité sur les 5 pages principales | Haute |
| S3-13 | Reevaluer le passage en SASU si l'activite depasse ~2 500-3 000 EUR/mois de facon reguliere | Haute |

---

## 3. MATRICE IMPACT × EFFORT

```
EFFORT FAIBLE ←————————————→ EFFORT ÉLEVÉ
         │
IMPACT   │  ✅ QUICK WINS    │  📋 À PLANIFIER
ÉLEVÉ    │  S0-3, S0-8       │  S0-5, S1-1
         │  S0-9, S0-10      │  S1-3, S2-8
         │  S1-5, S1-6       │  S2-9, S3-1
         │  S1-12, S1-13     │  S3-6, S3-11
         │                   │
─────────┼───────────────────┼──────────────
         │                   │
IMPACT   │  💤 SECONDAIRE    │  ⚠️ À ÉVITER
FAIBLE   │  S2-10, S3-7      │  (Aucun)
         │  S1-14            │
```

---

## 4. RISQUES & DÉPENDANCES

### Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|------------|--------|-----------|
| Faille sécurité admin (mot de passe en clair) | Haute (code exposé sur git) | Critique | Sprint 0 — Priorité absolue |
| Amende CNIL pour données mineurs | Moyenne | Élevé | Sprint 1-2 — Consentement parental |
| Invalidation contrats (CGV absentes) | Haute (premier client) | Élevé | Sprint 0 |
| Perte de leads (formulaires non fonctionnels) | Haute (déjà en cours) | Moyen | Sprint 1 |
| Conflit middleware neutralisant auth admin | Moyenne | Critique | Sprint 0 |
| Image logo manquante (page vierge) | Haute | Moyen | Sprint 1 |
| Mentions legales incoherentes avec le statut reel | Haute | Eleve | Sprint 0 — aligner le site sur la micro-entreprise |

### Dépendances externes critiques

| Action | Dépend de | Délai estimé |
|--------|-----------|-------------|
| Numéro SIRET complet | Immatriculation micro-entreprise finalisee via URSSAF/INPI | 24h a 72h selon le scenario cible |
| Numéro déclaration formation | DREETS | 2-3 semaines |
| DPA Supabase/Stripe/Resend | Démarches entreprises | 1-2 semaines |
| Référencement DANE | Contact académie | 1-3 mois |
| RC Pro attestation | Compagnie d'assurance | Immédiat si souscrit |

---

## 5. FICHIERS AUDITÉS — INDEX COMPLET

### Frontend

| Fichier | Statut global | Priorité corrections |
|---------|--------------|---------------------|
| `src/app/[locale]/page.tsx` | 🟡 Bon | Faible |
| `src/app/[locale]/atelier/page.tsx` | ✅ Excellent | Nulle |
| `src/app/[locale]/atelier/[slug]/page.tsx` | ✅ Très bon | Nulle |
| `src/app/[locale]/reserver/page.tsx` | 🟡 Partiel | Haute (CGV) |
| `src/app/[locale]/reserver/success/page.tsx` | ✅ Bon | Faible |
| `src/app/[locale]/a-propos/page.tsx` | 🟡 Partiel | Faible |
| `src/app/[locale]/pour-les-ecoles/page.tsx` | ❌ Critique | Haute (formulaire) |
| `src/app/[locale]/formations/page.tsx` | ✅ Bon | Faible |
| `src/app/[locale]/formations-pro/page.tsx` | ✅ Bon | Moyenne |
| `src/app/[locale]/contact/page.tsx` | ⚠️ À corriger | Haute (identité) |
| `src/app/[locale]/blog/page.tsx` | 🟡 Partiel | Faible |
| `src/app/[locale]/blog/[slug]/page.tsx` | 🟡 Partiel | Faible |
| `src/app/[locale]/calendrier/page.tsx` | 🟡 Sans données | Faible |
| `src/app/[locale]/tarifs/page.tsx` | 🟡 Partiel | Faible (TVA) |
| `src/app/[locale]/mentions-legales/page.tsx` | ❌ Critique | Haute (SIRET) |
| `src/app/[locale]/politique-confidentialite/page.tsx` | ⚠️ À corriger | Haute (sous-traitants) |
| `src/app/[locale]/conditions-utilisation/page.tsx` | ⚠️ Insuffisant | Haute (CGV manquantes) |
| `src/app/[locale]/modules/page.tsx` | ✅ Bon | Nulle |
| `src/app/[locale]/packs/page.tsx` | ⚠️ À corriger | Haute (logos fictifs) |
| `src/app/[locale]/disciplines/page.tsx` | ⚠️ Bouton cassé | Faible |
| `src/app/[locale]/stages/page.tsx` | 🟡 Partiel | Faible |
| `src/app/[locale]/dashboard/page.tsx` | 🟡 Partiel | Faible |
| `src/app/[locale]/login/page.tsx` | 🟡 MVP | Faible |

### Backend

| Fichier | Statut global | Priorité corrections |
|---------|--------------|---------------------|
| `src/app/api/reservations/route.ts` | ✅ Bon | Moyenne |
| `src/app/api/stripe/checkout/route.ts` | ✅ Bon | Faible |
| `src/app/api/stripe/webhook/route.ts` | 🟡 Partiel | Moyenne (idempotence) |
| `src/app/api/auth/[...nextauth]/route.ts` | ✅ OK | Nulle |
| `src/lib/supabase.ts` | 🟡 Bug + cast | Haute |
| `src/lib/stripe.ts` | ✅ Bon | Faible |
| `src/lib/email.ts` | ⚠️ Mauvaise marque | Haute |
| `src/lib/auth.ts` | ❌ Critique | Critique (bcrypt) |
| `src/lib/actions.ts` | ❌ Critique | Critique (contact vide) |
| `src/lib/types.ts` | 🟡 Duplication | Faible |
| `src/lib/csv-export.ts` | ✅ Bon | Nulle |
| `src/ai/flows/generate-workshop-description.ts` | ✅ Bon | Nulle |
| `src/ai/flows/generate-workshop-image.ts` | 🟡 Pas de persistance | Moyenne |
| `next.config.ts` | ⚠️ TS ignoré | Haute |
| `middleware.ts` (racine) + `src/middleware.ts` | ❌ Conflit | Critique |
| `src/i18n/routing.ts` | ⚠️ Locale EN par défaut | Faible |

### Admin

| Fichier | Statut global | Priorité corrections |
|---------|--------------|---------------------|
| `src/app/admin/(protected)/page.tsx` | 🟡 Partiel | Faible |
| `src/app/admin/(protected)/ateliers/page.tsx` | ✅ Bon | Nulle |
| `src/app/admin/(protected)/ateliers/nouveau/page.tsx` | ✅ Bon | Nulle |
| `src/app/admin/(protected)/ateliers/[id]/modifier/page.tsx` | ✅ Bon | Nulle |
| `src/app/admin/(protected)/reservations/page.tsx` | 🟡 Partiel | Faible |
| `src/app/admin/(protected)/layout.tsx` | 🟡 Liens morts | Faible |
| `src/app/admin/login/page.tsx` | ❌ Critique | Critique |
| `src/app/admin/groups/` (ensemble) | ✅ Complet | Faible |

---

## 6. CHECKLIST DE LIVRAISON PRODUCTION

Avant de considérer le site prêt pour une activité commerciale réelle :

### Sécurité

- [ ] Mot de passe admin via `bcrypt.compare`
- [ ] `NEXTAUTH_SECRET` sécurisé (32+ chars aléatoires)
- [ ] Identifiants admin supprimés de l'interface
- [ ] Conflit middleware résolu
- [ ] `.env.local` non commité dans git (vérifier `.gitignore`)
- [ ] Variables d'env de production configurées sur Vercel

### Légal

- [ ] Mentions legales alignees avec une micro-entreprise : identite EI, SIRET, adresse, RC Pro, TVA si applicable
- [ ] CGV publiées et accessibles depuis le footer
- [ ] CGV acceptées dans le formulaire de réservation
- [ ] Politique de confidentialité avec sous-traitants listés
- [ ] Consentement parental pour les participants mineurs

### Fonctionnel

- [ ] Formulaire contact envoie bien un email
- [ ] Formulaire "pour les écoles" envoie bien un email
- [ ] Logo `ateliers360.fr` chargé correctement
- [ ] Tous les liens de footer fonctionnels
- [ ] Emails avec domaine `ateliers360.fr` (et non `imulabs.fr`)

### Contenu

- [ ] Statistiques marketing réelles ou clairement "objectifs"
- [ ] Aucun logo partenaire fictif
- [ ] SIRET cohérent dans toutes les pages (mentions légales, CGV, devis, factures)

### SEO & Infrastructure

- [ ] `sitemap.ts` pointe sur `ateliers360.fr`
- [ ] `robots.ts` pointe sur `ateliers360.fr`
- [ ] Locale par défaut = `fr`

---

## 7. RESSOURCES RECOMMANDÉES

### Outils de mise en conformité

- **Iubenda** : Générateur de politique de confidentialité + CGV conforme RGPD
- **CookieBot** ou **Axeptio** : Gestion consentement cookies avancée
- **Sentry** : Monitoring et alertes d'erreurs
- **Mailchimp/Brevo** : Gestion newsletters avec double opt-in conforme

### Documentation officielle

- [CNIL — Guide RGPD pour les développeurs](https://www.cnil.fr/fr/guide-rgpd-du-developpeur)
- [CNIL — Registre des traitements](https://www.cnil.fr/fr/RGPD-le-registre-des-activites-de-traitement)
- [Service-public.fr — Déclaration organisme de formation](https://www.service-public.fr/professionnels-entreprises/vosdroits/F23556)
- [Stripe — DPA et conformité RGPD](https://stripe.com/fr/legal/dpa)
- [Supabase — DPA](https://supabase.com/privacy)

### Contacts clés

- **DREETS Grand Est** : Déclaration prestataire de formation (Nancy)
- **DANE Nancy-Metz** : Référencement académique
- **BGE Grand Est** : Accompagnement entrepreneurial (mentionné dans le guide de lancement)
- **CNIL** : [www.cnil.fr](https://www.cnil.fr) — Pour les questions RGPD

---

*Document généré le 24 avril 2026 — À réviser après chaque sprint de correction.*
