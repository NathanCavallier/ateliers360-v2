# 🚀 Ateliers 360 — Roadmap Produit & Plateforme Web

**Statut** : En préparation (Déc 2025)
**Objectif** : Lancer MVP de la plateforme web + premières interventions d'ici Mars 2026
**Propriétaire** : Nathan Imogo (SNEE)

---

## 📋 Vue d'ensemble par Phase

| Phase                             | Période             | Objectif Principal                                | Budget              | Critère de Succès                                       |
| --------------------------------- | ------------------- | ------------------------------------------------- | ------------------- | ------------------------------------------------------- |
| **Phase 1 : Fondations**          | Déc 2025 - Jan 2026 | Infrastructure légale, matériel, landing page MVP | 1 700€              | Site en ligne, RC Pro signée, 1er atelier planifié      |
| **Phase 2 : MVP Web**             | Jan - Fév 2026      | Site complet + réservation + calendrier           | 500-2500€ (dev)     | 5+ réservations, fiche pédagogique générée              |
| **Phase 3 : Pilotes & Collecte**  | Fév - Mar 2026      | Interventions tests dans 5 établissements         | 500€ (déplacements) | 20+ participants, 5+ témoignages collectés              |
| **Phase 4 : Financement & Scale** | Mar - Avr 2026      | Obtenir financement Enactus + expansion           | 5 000€ (subvention) | Dossier Enactus approuvé, 10 établissements partenaires |
| **Phase 5 : Intégration ImuChat** | Avr - Jun 2026      | Intégrer chatbot éducatif à la plateforme         | Inclus dev ImuChat  | Version bêta avec IA accessible                         |

---

## 🎯 Phase 1 : Fondations (Déc 2025 - Jan 2026)

### Tâches Critiques

#### 1.1 – Structuration Légale & Administratif

- [ ] Créer micro-entreprise (statut SNEE confirmé)
- [ ] Souscrire assurance RC Professionnelle (obligatoire pour interventions)
- [ ] Préparer contrats types (intervention école, conditions générales, parental consent si photos/vidéos)
- [ ] Enregistrer Ateliers 360 auprès des autorités fiscales
- **Assigné à** : Nathan
- **Délai** : 1 semaine (13-20 déc)
- **Coût** : 80€ (RC Pro), 50€ (frais administratifs)

#### 1.2 – Matériel Pédagogique Initial

- [ ] Acheter 5 kits robots (mBot ou Arduino + contrôleurs)
- [ ] Acheter kit sciences (chimie simple, électricité, outils)
- [ ] Tester le matériel sur prototype d'atelier
- **Assigné à** : Nathan
- **Délai** : 2 semaines (avant fin jan)
- **Coût** : 700€ (robots + sciences)

#### 1.3 – Domaine & Site Landing Page MVP

- [ ] Réserver domaine `ateliers360.fr` (+ email professionnel)
- [ ] Créer landing page simple (Webflow / Carrd)
  - Hero + CTA "Voir le catalogue" / "Réserver"
  - Section "Pourquoi Ateliers 360" (4 points clés)
  - Section "Ateliers phares" (3 cartes)
  - Footer avec contact
- [ ] Configurer analytics (Matomo ou GA4)
- **Assigné à** : Nathan ou freelancer
- **Délai** : 1-2 semaines
- **Coût** : 150€ (domaine 2 ans + hébergement MVP 6 mois)

#### 1.4 – Catalogue PDF Pro & Matériel Print

- [ ] Designer catalogue PDF 1-page (récapitulatif 10 ateliers)
- [ ] Imprimer 100 flyers A5 (distribution école/MJC)
- [ ] Créer template email de confirmation
- **Assigné à** : Designer / Nathan
- **Délai** : 1 semaine
- **Coût** : 250€ (design + impression)

#### 1.5 – Prospection Locale (Phase Tests)

- [ ] Identifier 5 écoles/MJC cibles dans un rayon 30km
- [ ] Préparer pitch court (2-3 min) + présentation matériel
- [ ] Envoyer dossier par email + appels de suivi
- [ ] Planifier visite de présentation x2
- **Assigné à** : Nathan
- **Délai** : 2 semaines (en parallèle du reste)
- **Coût** : 300€ (carburant + frais)

### Indicateurs Phase 1

- ✅ RC Pro validée
- ✅ Matériel reçu et testé
- ✅ Landing page en ligne (100+ vues)
- ✅ 1-2 établissements intéressés pour pilote

---

## 🌐 Phase 2 : MVP Web Complet (Jan - Fév 2026)

### Architecture Recommandée

**Option 1 (rapide, no-code)** : Webflow + Typeform + Stripe
**Option 2 (scalable, recommandée)** : Next.js + Supabase + Stripe

_On retient Option 2 pour SEO et flexibilité future_.

### Tâches

#### 2.1 – Infrastructure Dev

- [ ] Créer repo GitHub (private)
- [ ] Setup Next.js 14 + TypeScript
- [ ] Setup Supabase (DB + Auth)
- [ ] Configurer variables d'env (Stripe, SendGrid, etc.)
- [ ] Setup Vercel deployment pipeline
- **Assigné à** : Nathan (ou dev contractant)
- **Délai** : 3-4 jours
- **Coût** : Inclus (gratuit pour MVP)

#### 2.2 – Pages Publiques (Frontend)

- [ ] Homepage (complète)
- [ ] /atelier (liste dynamique)
- [ ] /atelier/[slug] (template + contenu BD)
- [ ] /catalogues (présentation des catalogues, aperçu PDF, téléchargement)
- [ ] /constructeur (sélection rapide de packs/modules/ateliers et réservation simplifiée)
- [ ] /stages (page dédiée)
- [ ] /a-propos (équipe + pédagogie)
- [ ] /pour-les-ecoles (pitch + formulaire)
- [ ] /formations-pro (formation continue)
- [ ] /calendrier (événements + ical)
- [ ] /blog (blog simple, articles pédagogiques)
- [ ] /nous-contacter (formulaire + intégration email)
- [ ] /mentions-legales & /politique-confidentialite (RGPD)
- **Assigné à** : Nathan ou dev front
- **Délai** : 2 semaines
- **Coût** : 800-1500€ (dev contractant) ou 0€ (Nathan in-house)

#### 2.3 – Backoffice Admin

- [ ] Authentification (NextAuth.js)
- [ ] Dashboard : vue réservations/demandes
- [ ] CRUD ateliers (créer, éditer, supprimer)
- [ ] Gestion calendrier (créneaux disponibles)
- [ ] Export CSV réservations
- [ ] Support sélection rapide / panier du constructeur
- [ ] Template emails (confirmation, facture, rappel)
- **Assigné à** : Nathan ou dev back
- **Délai** : 1 semaine
- **Coût** : 500-1000€ ou 0€ (Nathan)

#### 2.4 – Paiement & Réservation

- [ ] Intégration Stripe (checkout)
- [ ] Formulaire réservation (nom, email, atelier, date, participants, adresse établissement)
- [ ] Fonctionnalité de réservation groupée depuis le constructeur
- [ ] Webhook Stripe → créer réservation BD
- [ ] Génération PDF facture/ticket
- [ ] Envoi email automatique (SendGrid ou Resend)
- [ ] Gestion des erreurs & retry
- **Assigné à** : Nathan ou dev back
- **Délai** : 1 semaine
- **Coût** : 0€ (services gratuits en MVP)

#### 2.5 – SEO & Performance

- [ ] Meta tags + OpenGraph sur toutes les pages
- [ ] Sitemap XML + robots.txt
- [ ] Canonical URLs
- [ ] Images optimisées (Next Image)
- [ ] PageSpeed Insights > 80
- [ ] Schema.org (Event, LocalBusiness)
- **Assigné à** : Nathan
- **Délai** : 3-4 jours
- **Coût** : 0€

#### 2.6 – RGPD & Légal

- [ ] Modal consentement cookies + localStorage config
- [ ] Politique de confidentialité (générique + custom Ateliers 360)
- [ ] Mentions légales (micro-entrepreneur, RC Pro, ...)
- [ ] Audit CNIL (auto-évaluation simple)
- [ ] Contrat parental consent pour photos/vidéos ateliers
- **Assigné à** : Nathan
- **Délai** : 3-4 jours
- **Coût** : 0€

### Tests Phase 2

- [ ] Tests fonctionnels (réservation end-to-end)
- [ ] Tests page catalogue & téléchargement de documents
- [ ] Tests page constructeur + réservation groupée
- [ ] Tests paiement (Stripe en test mode)
- [ ] Tests email (SendGrid sandbox)
- [ ] Tests RGPD (outils en ligne)
- [ ] Tests sur mobile (responsif)
- **Délai** : 3 jours

### Indicateurs Phase 2

- ✅ Site en ligne (<www.ateliers360.fr>)
- ✅ 5+ réservations de test réussies
- ✅ Emails de confirmation envoyés correctement
- ✅ Admin dashboard fonctionnel
- ✅ Zero erreurs Stripe logs

---

## 🎓 Phase 3 : Pilotes & Collecte (Fév - Mar 2026)

### Interventions Tests

#### 3.1 – Sélection Établissements

- [ ] Finaliser 5 établissements tests (école + MJC/centre de loisirs)
- [ ] Signer convention simple (durée, lieu, tarif, assurance)
- [ ] Valider dates & horaires (au moins 2 créneaux différents)
- **Assigné à** : Nathan
- **Délai** : 1 semaine (avant mi-fév)

#### 3.2 – Préparation Matériel & Livrets

- [ ] Préparer 5 kits robots complets (test avant transport)
- [ ] Créer livret pédagogique par atelier (PDF imprimable)
- [ ] Préparer attestations présence
- [ ] Tester transport sécurisé (cartons + inventaire)
- **Assigné à** : Nathan
- **Délai** : 1 semaine

#### 3.3 – Interventions (5 ateliers)

- [ ] Atelier 1 : Découverte Robotique (école primaire, ~20 enfants)
- [ ] Atelier 2 : Code Fun (collège, ~15 enfants)
- [ ] Atelier 3 : Mini-labo (école, ~20 enfants)
- [ ] Atelier 4 : IA pour jeunes (lycée, ~12 lycéens)
- [ ] Atelier 5 : Robotique avancée (MJC, ~8 enfants)
- **Assigné à** : Nathan
- **Délai** : 3-4 semaines (1 par semaine)
- **Coût** : 500€ (carburant, snacks, frais divers)

---

## 🧭 Roadmap d'implémentation : Inscription multi-type + Dashboard Famille

**Objectif** : suivre l'intégration complète des deux briques fonctionnelles décrites dans `docs/accounts/Inscription-multi-type_Dashboard-Famille.md` et `docs/accounts/Pages_et_flux_par_type_compte.md`.

### Priorités immédiates

- [x] Implémenter la page `src/app/[locale]/inscription/page.tsx` avec sélection de type, formulaire commun et champs spécifiques par type
- [x] Assurer la persistance `account_type` dans Supabase via `supabase.auth.signUp({ options: { data: { account_type } } })`
- [x] Ajouter la vérification `is_verified` pour les comptes pros dans `middleware.ts`
- [x] Créer `src/lib/supabase-accounts.ts` avec fonctions CRUD pour `profiles`, `children`, `authorizations`, `family`
- [x] Créer le dashboard famille `src/app/[locale]/famille/page.tsx`
- [x] Implémenter le dashboard principal `src/app/[locale]/dashboard/page.tsx` avec affichage conditionnel par type d'utilisateur
- [ ] Finaliser les conditions du dashboard pour `AccountType.Family`, `Learner/Student`, `Animator/Admin` et autres rôles

### Phases de suivi

| Phase | Livrable                 | Fichiers clés                                                                            | Statut   | Notes                                                     |
| ----- | ------------------------ | ---------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------- |
| 1     | Inscription multi-type   | `src/app/[locale]/inscription/page.tsx`, `src/components/accounts/AccountTypePicker.tsx` | Terminé  | Choix de profil + formulaire adaptatif                    |
| 2     | Onboarding profils       | `src/app/[locale]/inscription/completer/page.tsx`, `src/lib/supabase-accounts.ts`        | Terminé  | Upsert profil, metadata, `is_verified=false`              |
| 3     | Middleware de validation | `middleware.ts`                                                                          | En cours | Rediriger pros non vérifiés vers `/en-attente-validation` |
| 4     | Dashboard Famille        | `src/app/[locale]/famille/page.tsx`                                                      | Terminé  | Liste enfants, statut complétion, CTA ajout enfant        |
| 5     | Dashboard conditionnel   | `src/app/[locale]/dashboard/page.tsx`, `platform/messages/*.json`                        | En cours | QuickLinks, sidebar et stats adaptés par rôle             |
| 6     | Ajout enfant             | `src/app/[locale]/famille/enfants/nouveau/page.tsx`                                      | Terminé  | Identité + santé + autorisations + notes                  |
| 7     | Fiche autorisations      | `src/app/[locale]/famille/enfants/[id]/autorisations/page.tsx`                           | Terminé  | Consentements RGPD, horodatage, PDF                       |
| 8     | Admin validation         | `src/app/[locale]/admin/verification`                                                    | Terminé  | Liste comptes pros en attente, bouton valider             |
| 9     | Tests & QA               | N/A                                                                                      | À faire  | Scénarios famille, établissement, animateur, apprenant    |

### Détail des fonctionnalités suivies

#### Inscription multi-type

- [ ] Cartes type de compte cliquables + description courte
- [ ] Formulaire commun : email, mot de passe, confirmation
- [ ] Champs spécifiques : établissement / centre / famille / animateur / apprenant / autre
- [ ] Message de confirmation adapté selon compte
- [ ] Paramètre `account_type` dans Supabase metadata
- [ ] Trigger SQL ou upsert automatique dans `profiles`
- [ ] Statut `is_verified=false` pour pros
- [ ] Page `/en-attente-validation` pour les pros non validés

#### Dashboard Famille

- [ ] Vue généraliste avec carte par enfant
- [ ] Indicateur de complétion (vert/orange/rouge)
- [ ] Bannière attention : RGPD expiré, document manquant, atelier imminent
- [ ] Bouton flottant « Ajouter un enfant »
- [ ] Formulaire d'ajout en 3 sections : identité / urgences-santé / notes
- [ ] Multi-sélection allergies + autres allergies libre
- [ ] PAI, contact d'urgence, médecin traitant, autorisation médicaments
- [ ] Génération et stockage PDF de consentement
- [ ] Page autorisations RGPD par enfant
- [ ] Réutilisation des données santé pour tous les ateliers

#### Flux commun et réutilisables

- [ ] `src/lib/supabase-accounts.ts` avec fonctions `getChildrenByFamily`, `addChild`, `saveAuthorization`, etc.
- [ ] `src/components/accounts/AccountTypePicker.tsx` réutilisable
- [ ] `src/components/famille/EnfantCard.tsx` pour récapitulatif enfant
- [ ] `src/components/famille/AllergyBadges.tsx` pour affichage des allergies
- [ ] Page admin simple de validation des comptes pros

### Suivi de statut rapide

- [x] `inscription/page.tsx` : sélection de type + formulaire commun
- [x] `inscription/completer/page.tsx` : onboarding profil avec upsert et account type déjà amélioré
- [x] `middleware.ts` : validation des comptes pros non vérifiés en cours
- [x] `dashboard/page.tsx` : amélioration du dashboard multi-type
- [x] `famille/page.tsx` : dashboard famille développé
- [x] `famille/enfants/nouveau/page.tsx` : formulaire d'ajout enfant implémenté
- [x] `famille/enfants/[id]/autorisations/page.tsx` : RGPD & droit à l'image
- [x] `admin/verification` : validation admin des comptes pros

---

> Ce tableau sert de référence de suivi pour toutes les étapes identifiées dans les deux documents de spécifications. Il peut être synchronisé avec le board de développement ou transformé en issues GitHub par fonctionnalité.

#### 3.4 – Collecte Retours

- [ ] Questionnaire satisfaction enfants (QCM 5 questions)
- [ ] Questionnaire satisfaction enseignant (ouverts)
- [ ] Photos/vidéos (avec consentement parental)
- [ ] Témoignage texte (directeur/enseignant)
- [ ] Métriques : participation, engagement, QCM moyen
- **Assigné à** : Nathan
- **Délai** : Pendant interventions

#### 3.5 – Mise à Jour Site

- [ ] Charger témoignages + photos (5 minimum)
- [ ] Créer section "Nos réalisations" (avant/après)
- [ ] Ajouter 2-3 cas d'études (école X, "20 enfants, taux satisfaction 95%")
- [ ] Blog post "Retours de nos premières interventions"
- **Assigné à** : Nathan
- **Délai** : 1 semaine (après interventions)

### Indicateurs Phase 3

- ✅ 5 ateliers réalisés sans incidents
- ✅ 70+ enfants/jeunes participants
- ✅ Taux satisfaction moyen > 85%
- ✅ 5+ témoignages collectés
- ✅ 20+ photos/vidéos pour marketing

---

## 💰 Phase 4 : Financement & Scale (Mar - Avr 2026)

### Dossier Enactus

#### 4.1 – Préparation Dossier

- [ ] Compiler témoignages + photos phase 3 en PDF
- [ ] Rédiger impact statement (5 pages max)
  - Mission & contexte
  - Modèle économique
  - Résultats pilotes (chiffres)
  - Plan d'expansion (next 12 mois)
  - Demande financement (5 000€) + utilisation détaillée
- [ ] Créer présentation slide Enactus (10 slides)
- [ ] Préparer pitch oral (3 min)
- [ ] Collecter documents (RC Pro, statut SNEE, convention école)
- **Assigné à** : Nathan + mentor Pépite (optionnel)
- **Délai** : 2 semaines (avant date limite appel)

#### 4.2 – Présentation

- [ ] Répéter pitch (avec mentor)
- [ ] Assister présentation (lieu + jury)
- [ ] Répondre aux questions jury
- **Assigné à** : Nathan
- **Délai** : Jour J

#### 4.3 – Plan Utilisation Financement (si obtenu, 5 000€)

Si obtenu, utiliser ainsi :

- 1 500€ : 10 kits robots supplémentaires (total 15)
- 800€ : 5 kits sciences avancées (labo complet)
- 1 000€ : Tablettes/PC pour ateliers code (2-3 machines)
- 700€ : Matériel lourd (table défi, rail électrique, etc.)
- 1 000€ : Déploiement phase 5 (partenaires + marketing)
- **Délai** : Allocation immédiate (si succès)

### Expansion Partenaires

#### 4.4 – Signature Conventions

- [ ] Relancer 5 écoles tests pour contrats officiels (annuels)
- [ ] Prospecter 10 établissements nouveaux (région)
- [ ] Signer au minimum 5 nouvelles conventions
- [ ] Planifier calendrier ateliers T2/T3 2026 (avril-juin)
- **Assigné à** : Nathan
- **Délai** : 4 semaines

#### 4.5 – Marketing & Comms

- [ ] Lancer campagne LinkedIn (posts hebdo + newsletter)
- [ ] Créer 5 posts Instagram (photos + stories ateliers)
- [ ] Ajouter Ateliers 360 sur Google My Business
- [ ] Contacter 5 blogs/médias éducatifs locaux
- [ ] Présence à 2 événements (salon école ou Fête de la Science)
- **Assigné à** : Nathan (+ stagiaire optionnel)
- **Délai** : Ongoing (avril-mai)

### Indicateurs Phase 4

- ✅ Dossier Enactus soumis
- ✅ Financement obtenu (5 000€+)
- ✅ 5+ nouvelles conventions signées
- ✅ Matériel étendu en stock
- ✅ Social media > 500 followers

---

## 🤖 Phase 5 : Intégration ImuChat (Avr - Jun 2026)

### ImuChat Pédagogique

#### 5.1 – Conception Chatbot Éducatif

- [ ] Définir personas (élève 8-12 ans, enseignant, parent)
- [ ] Rédiger 100+ paires Q&A pédagogiques (ateliers + sciences)
- [ ] Entraîner modèle IA (Claude / GPT-4 ou open source)
- [ ] Tester réponses sur accent pédagogique & sécurité
- **Assigné à** : Nathan + partenaire IA (optionnel)
- **Délai** : 2-3 semaines

#### 5.2 – Intégration Technique

- [ ] API ImuChat → site Ateliers 360 (chat widget)
- [ ] Authentification (optionnel pour chat anonyme)
- [ ] Logs & analytics (messages, satisfaction)
- [ ] Modération & feedback loop
- **Assigné à** : Nathan (back-end)
- **Délai** : 1-2 semaines

#### 5.3 – Tester & Itérer

- [ ] Beta test avec 50 enfants/parents (feedback)
- [ ] Améliorer responses (accuracy > 85%)
- [ ] Ajouter fonctionnalité "réserver atelier via chat"
- [ ] Documenter FAQ automatiques
- **Assigné à** : Nathan + testeurs
- **Délai** : 2 semaines

#### 5.4 – Déploiement Officiel

- [ ] Lancer version bêta publique
- [ ] Promouvoir sur site + réseaux
- [ ] Collecte feedback utilisateurs
- [ ] Plan itération futur (V2 : multimedia, avatars)
- **Assigné à** : Nathan
- **Délai** : 1 semaine

### Indicateurs Phase 5

- ✅ Chat live sur <www.ateliers360.fr>
- ✅ 200+ conversations testées
- ✅ Satisfaction chatbot > 80%
- ✅ "Réserver via chat" fonctionnel
- ✅ Article blog "ImuChat est arrivé !"

---

## 📊 KPIs & Succès Global

### KPIs à Tracker

| KPI                            | Cible (Jun 2026)   | Métrique                          |
| ------------------------------ | ------------------ | --------------------------------- |
| **Participants ateliers**      | 200+ enfants       | Cumul interventions               |
| **Établissements partenaires** | 10+                | Conventions signées               |
| **Chiffre d'affaires**         | 10 000€            | Réservations payées + conventions |
| **Satisfaction clients**       | >85%               | Enquêtes + NPS                    |
| **Site web**                   | 2 000+ vues/mois   | Google Analytics                  |
| **Réseaux sociaux**            | 1 000 followers    | LinkedIn + Instagram              |
| **Chat ImuChat**               | 500+ conversations | Analytics                         |
| **Témoignages**                | 20+                | Collectés & publiés               |

### Critères de Succès Global (Jun 2026)

- ✅ Ateliers 360 = marque reconnue localement (région)
- ✅ 10 établissements actifs (écoles, MJC, centres)
- ✅ Modèle économique validé (CA stable, marge positive)
- ✅ ImuChat intégré & fonctionnel
- ✅ Financement Enactus obtenu
- ✅ Prêt bancaire SNEE en place (optionnel pour accélération)
- ✅ Équipe : Nathan + 1-2 animateurs sous-traitants confirmés
- ✅ Pipeline 2026-2027 : 20+ établissements en prospect

---

## 💰 Budget Résumé par Phase

| Phase       | Durée     | Budget             | Sources                                 |
| ----------- | --------- | ------------------ | --------------------------------------- |
| **Phase 1** | Déc - Jan | 1 700€             | Personnel + micro-crédit                |
| **Phase 2** | Jan - Fév | 500-2 500€         | Dev (optionnel)                         |
| **Phase 3** | Fév - Mar | 500€               | Personnel                               |
| **Phase 4** | Mar - Avr | 5 000€             | Enactus (subvention)                    |
| **Phase 5** | Avr - Jun | Inclus Phase 4     | Enactus                                 |
| **TOTAL**   | 6 mois    | **8 200 - 9 700€** | Mix personnel + Enactus + optionnel dev |

**Hypothèse** : Si financement Enactus échoue, phases 4-5 décalées 6 mois mais faisables avec modèle allégé.

---

## 🎯 Checklist Actions Immédiates (Cette Semaine)

- [ ] Valider noms (Ateliers 360 OK ?)
- [ ] Lancer demande RC Pro (assureur)
- [ ] Réserver domaine ateliers360.fr
- [ ] Commander matériel robots (si stock OK)
- [ ] Identifier 5 écoles tests
- [ ] Rédiger premier email prospection
- [ ] Créer GitHub repo privé (si dev Next.js)
- [ ] Sketcher wireframes homepage (Figma)

---

## 📞 Points de Synchronisation (Jalons)

| Date            | Jalon                           | Responsable | Liverable                         |
| --------------- | ------------------------------- | ----------- | --------------------------------- |
| **31 Déc 2025** | RC Pro signée + matériel arrivé | Nathan      | Factures + inventaire             |
| **15 Jan 2026** | Landing page en ligne           | Nathan/Dev  | URL live + 100+ vues              |
| **31 Jan 2026** | Site complet + réservation      | Nathan/Dev  | MVP testé + 5 réservations test   |
| **28 Fév 2026** | 5 ateliers pilotes réalisés     | Nathan      | Photos + témoignages              |
| **31 Mar 2026** | Dossier Enactus soumis          | Nathan      | PDF + slides + pitch              |
| **30 Apr 2026** | 5+ nouvelles conventions        | Nathan      | Contrats signés                   |
| **30 Jun 2026** | ImuChat live + bilan H1         | Nathan      | Chat fonctionnel + rapport impact |

---

## 🚨 Risques & Mitigation

| Risque                            | Probabilité   | Impact   | Mitigation                                 |
| --------------------------------- | ------------- | -------- | ------------------------------------------ |
| Retard dev web                    | Moyenne       | Haut     | Utiliser Webflow (no-code) en backup       |
| Pas assez de demandes ateliers    | Moyenne       | Haut     | Commencer prospection dès phase 1          |
| Budget Enactus insuffisant        | Basse-Moyenne | Haut     | Prêt SNEE en backup, phase allégée         |
| Problème RC Pro (assurance)       | Basse         | Critique | Contacter plusieurs assureurs en parallèle |
| Matériel défectueux               | Basse         | Moyen    | Vérifier avant livraison, SAV garanti      |
| Pas assez de collecte témoignages | Moyenne       | Moyen    | Rappels formels + incentive photos         |

---

## 📚 Documentations & Templates Associées

- [blueprint.md](blueprint.md) — Vision produit & stratégie
- [Packs_Modules_Ateliers 360.md](Packs_Modules_Ateliers 360.md) — Catalogue complet ateliers
- `./contrats-types/` — Convention école (à créer)
- `./contrats-types/` — Parental consent (à créer)
- `./content/` — Textes SEO pré-rédigés (à créer)
- `./design/` — Guides marque & assets (à créer)

---

## 🎬 Démarrage (Semaine du 16 Dec 2025)

**Priority List (top 3)** :

1. Souscrire RC Pro professionnelle
2. Réserver domaine + créer landing MVP
3. Envoyer premiers emails prospection (5 établissements)

Bon courage !
