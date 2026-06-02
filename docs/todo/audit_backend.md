# 🔍 AUDIT BACKEND — Ateliers 360

**Date** : Avril 2026 | **Périmètre** : `src/app/api/` + `src/lib/` + `src/ai/` + Config + Admin

---

## Légende des statuts

| Icône | Statut | Signification |
|-------|--------|---------------|
| ✅ | **FAIT** | Implémenté et fonctionnel |
| 🟡 | **PARTIEL** | Existe mais incomplet ou à améliorer |
| ❌ | **MANQUANT** | Attendu dans la vision, non implémenté |
| ⚠️ | **À AJUSTER** | Existe mais non conforme à la vision ou aux contraintes réglementaires |

---

## 1. API ROUTES (`src/app/api/`)

### 1.1 Réservations — `/api/reservations/route.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| `POST` — Création réservation | ✅ | Validation Zod, insertion Supabase |
| Schéma Zod complet | ✅ | 8 champs validés avec messages FR |
| Retour JSON normalisé `{success, reservation, message}` | ✅ | |
| Gestion erreurs Zod → 400 | ✅ | |
| Gestion erreurs Supabase → 500 | ✅ | |
| `GET` — Liste réservations | ⚠️ | Retourne 404 intentionnel — Pas d'endpoint admin REST pour les réservations (OK si tout passe par Supabase direct) |
| **Sécurité** : Pas d'authentification sur le POST | ⚠️ | Tout le monde peut créer une réservation — OK pour le flow public mais susceptible de spam/abus |
| **Sécurité** : Rate limiting | ❌ | Pas de protection contre les soumissions massives |
| **Conformité** : Validation de l'`atelier_id` existant | ❌ | On insère sans vérifier que l'atelier existe en Supabase (FK contrainte doit gérer ça, mais pas de message d'erreur clair) |
| **Conformité** : Date atelier dans le futur | ❌ | Pas de validation que `date_atelier` ≥ aujourd'hui au niveau API |

---

### 1.2 Stripe Checkout — `/api/stripe/checkout/route.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| `POST` — Création session Checkout | ✅ | |
| Validation Zod `reservationId` | ✅ | |
| Récupération réservation + atelier | ✅ | JOIN via Supabase |
| Vérification statut "déjà payé" | ✅ | Retourne 400 si `paid` ou `confirmed` |
| Sauvegarde `stripe_session_id` | ✅ | |
| URLs success/cancel dynamiques | ✅ | `origin` depuis headers |
| **Sécurité** : Pas d'auth sur cette route | ⚠️ | Quelqu'un connaissant un `reservationId` peut créer une session Stripe pour un autre. À sécuriser |
| **Sécurité** : `stripe` peut être `null` | ✅ | `ensureStripe()` throw explicitement |
| **Manque** : Acompte 30% vs paiement total | ❌ | Les CGV prévoient un acompte 30% — Actuellement le paiement est `tarif_eur` complet |
| **Manque** : Métadonnées étendues (nom, email) | 🟡 | Seul `reservation_id` dans les métadonnées — Utile d'avoir plus pour le support Stripe |

---

### 1.3 Stripe Webhook — `/api/stripe/webhook/route.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Vérification signature Stripe | ✅ | `constructWebhookEvent` |
| Gestion `checkout.session.completed` | ✅ | Update DB + emails |
| Récupération réservation avec atelier | ✅ | JOIN Supabase |
| Update `status='paid'` | ✅ | |
| Envoi email confirmation client | ✅ | `sendReservationConfirmation` |
| Envoi email notification admin | ✅ | `sendAdminNotification` |
| Gestion `payment_intent.succeeded` | 🟡 | Loggé mais aucune action |
| Gestion `payment_intent.payment_failed` | 🟡 | Loggé mais aucune action — L'admin n'est pas notifié |
| **Sécurité** : `payload` lu avec `request.text()` | ✅ | Requis pour Stripe signature |
| **Manque** : Idempotence | ❌ | Si le webhook est reçu 2 fois, l'email est envoyé 2 fois et le statut écrasé 2 fois — Vérifier si déjà `paid` |
| **Manque** : Update statut en cas d'échec paiement | ❌ | `payment_intent.payment_failed` devrait mettre `status='cancelled'` |
| **Conformité** : Logs structurés | ⚠️ | `console.log/error` uniquement — Pas de logging persistant |

---

### 1.4 Auth NextAuth — `/api/auth/[...nextauth]/route.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Export `GET` et `POST` | ✅ | Handler standard |
| Credentials provider | ✅ | Email + mot de passe |
| **Sécurité** : Mot de passe hardcodé `"admin123"` | ❌ | **CRITIQUE** — Comparaison en clair dans le code source `if (credentials.password === "admin123")`. Même si le hash bcrypt est là, la vérification est bypassée |
| **Sécurité** : Utilisateurs hardcodés dans `auth.ts` | ⚠️ | `ADMIN_USERS` array en dur — OK pour MVP mais ne scale pas |
| **Sécurité** : Credentials visibles dans page login | ⚠️ | `MVP - Identifiants : nathan@imulabs.fr / admin123` affiché dans l'UI |
| `NEXTAUTH_SECRET` | 🟡 | Valeur par défaut `"your-secret-key-change-in-production"` — Doit impérativement être changé |

---

## 2. BIBLIOTHÈQUE — `src/lib/`

### 2.1 Supabase Client — `supabase.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Client Supabase conditionnel (null si pas de clés) | ✅ | Évite les crashs en build |
| **Ateliers** : CRUD complet | ✅ | `getWorkshops`, `getWorkshopBySlug`, `getWorkshopById`, `duplicateWorkshop` |
| **Réservations** : CRUD complet | ✅ | Create, Read (all + byId), Update status |
| **Blog** : Read + bySlug | ✅ | |
| **Events** : Read + byDateRange + byDate | ✅ | |
| **Groups** : CRUD complet | ✅ | |
| **GroupMembers** : Add, Get, Remove | 🟡 | `getGroupMembers` a un bug de double `.select()` — La première sélection avec JOIN est écrasée |
| **GroupSessions** : Create + Get | ✅ | |
| **Attendance** : Upsert + GetForSession | ✅ | |
| **Resources** : Upload, Create link, Get, Delete | ✅ | |
| **Evaluations** : Add + Get | ✅ | |
| **Projects / Steps / Deliverables** | ✅ | CRUD basique |
| **Users/Profiles** : Search | ✅ | Recherche par email ou full_name |
| **Type safety** : Cast `as any` fréquents | ⚠️ | Nombreux `as any` pour contourner TypeScript — Symptôme d'un schéma de types DB non parfaitement aligné |
| **Gestion erreurs** : try/catch systématique | ✅ | Toutes les fonctions ont un try/catch |
| **Bug** : `getGroupMembers` double select | ❌ | `.select('*, user:user_id(email)')` puis `.select('*')` — Le JOIN est perdu |
| **Manque** : Pagination sur `getWorkshops` | ❌ | Retourne TOUS les ateliers sans limite — Problème de performance à l'échelle |
| **Manque** : Filtres Supabase côté serveur | ❌ | Tous les filtres se font en mémoire avec `useMemo` côté client — Inefficace |

---

### 2.2 Stripe — `stripe.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Client Stripe conditionnel (null si pas de clé) | ✅ | |
| `createCheckoutSession` | ✅ | Paramètres clairs |
| `getCheckoutSession` | ✅ | |
| `constructWebhookEvent` | ✅ | |
| API version `2025-11-17.clover` | ✅ | Récente |
| **Sécurité** : `ensureStripe()` throw si null | ✅ | |
| **Manque** : Gestion des remboursements | ❌ | Pas de helper `refundPayment` — Nécessaire selon les CGV |
| **Manque** : Gestion devis/facturation Stripe | ❌ | Les CGV mentionnent des factures — Stripe Invoice non configuré |

---

### 2.3 Email — `email.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| `sendEmail` via Resend API | ✅ | Fetch direct vers `api.resend.com` |
| Template confirmation réservation | ✅ | HTML inline, design soigné |
| Template notification admin | ✅ | Avec liens mailto et lien admin |
| Template rappel 48h/24h | ✅ | Avec checklist "À prévoir" |
| Helpers `sendReservationConfirmation`, `sendAdminNotification`, `sendReminderEmail` | ✅ | |
| **Cohérence** : Emails pointent vers `imulabs.fr` | ⚠️ | `contact@imulabs.fr`, `www.imulabs.fr` dans les templates — **Doit être `ateliers360.fr`** |
| **Manque** : Email rappel déclenché automatiquement | ❌ | `sendReminderEmail` existe mais n'est appelé nulle part — Pas de cron job |
| **Manque** : Email de confirmation devis | ❌ | Pas de template pour les demandes de devis |
| **Manque** : Email annulation | ❌ | Pas de template pour les annulations |
| **Conformité** : `FROM_EMAIL` configurable | ✅ | Via env var |
| **RGPD** : Les données personnelles (nom, email) sont dans le template | ⚠️ | Normal pour les emails transactionnels mais à documenter dans la politique de confidentialité |

---

### 2.4 Auth — `auth.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| NextAuth v5 avec Credentials | ✅ | |
| JWT strategy | ✅ | |
| Callbacks `authorized` et `session` | ✅ | |
| **Sécurité CRITIQUE** : `if (credentials.password === "admin123")` | ❌ | Le hash bcrypt `passwordHash` est défini mais **jamais utilisé** — Comparaison en clair |
| **Sécurité** : Un seul utilisateur admin hardcodé | ⚠️ | Nathan Imogo uniquement — Pas de gestion des rôles ou multi-admin |
| `NEXTAUTH_SECRET` par défaut | ❌ | `"your-secret-key-change-in-production"` ne doit PAS être en production |
| Pages custom `/admin/login` | ✅ | |

---

### 2.5 CSV Export — `csv-export.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Export réservations | ✅ | 12 colonnes |
| Échappement CSV sécurisé | ✅ | Guillemets, virgules, retours ligne |
| BOM UTF-8 pour Excel | ✅ | `'\ufeff'` |
| Téléchargement client | ✅ | `createObjectURL` |
| Export enrichi avec nom atelier | ✅ | `exportReservationsWithWorkshops` |
| **Manque** : Export côté serveur (API) | ❌ | Tout se passe côté client — Les données passent par le navigateur |

---

### 2.6 Types — `types.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Types Supabase (Workshop, Reservation, Blog, Event…) | ✅ | |
| Types Groups, Members, Sessions, Attendance | ✅ | |
| Types Projects, Steps, Deliverables | ✅ | |
| Type `Database` complet pour `createClient<Database>` | ✅ | |
| **Cohérence** : Type `Workshop` (front) vs `WorkshopDB` (back) duplique des champs | ⚠️ | `titre`/`title`, `duree_heures`/`duration` — Mapping redondant et source d'erreurs |
| **Manque** : Types pour les emails/templates | ❌ | Les paramètres des templates email ne sont pas typés dans `types.ts` |

---

### 2.7 Actions Server — `actions.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| `submitContactForm` — Validation Zod | ✅ | |
| `submitContactForm` — Action réelle | ❌ | **CRITIQUE** : `console.log` uniquement, aucune persistance ni envoi d'email |
| `generateWorkshopContent` — IA description + image | ✅ | Appel Genkit + Gemini |
| Gestion erreurs | ✅ | |
| **Manque** : `submitContactForm` doit sauvegarder en DB ou envoyer un email | ❌ | La direction commerciale ne reçoit aucune demande de contact |

---

### 2.8 Placeholder Images — `placeholder-images.ts` + `.json`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| 6 images Unsplash avec hints | ✅ | |
| **Pertinence** : Utilisé uniquement dans la génération IA | 🟡 | Le catalogue Supabase utilise ses propres `image_url` — Ce fichier est un vestige du MVP initial |

---

## 3. IA — `src/ai/`

### 3.1 Génération Description — `flows/generate-workshop-description.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Flow Genkit avec schéma Zod | ✅ | |
| Modèle `gemini-2.5-flash` | ✅ | |
| Prompt clair avec 5 variables | ✅ | |
| Export `generateWorkshopDescription` | ✅ | |
| **Usage** : Uniquement depuis la page `/create` admin | 🟡 | Pas intégré dans l'admin workshop creation form standard |

---

### 3.2 Génération Image — `flows/generate-workshop-image.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Modèle `imagen-4.0-fast-generate-001` | ✅ | |
| Retourne data URI | ✅ | |
| **Manque** : Sauvegarde dans Supabase Storage | ❌ | L'image générée est une data URI temporaire — Non persistée en dehors de la session |
| **Coût** : Imagen est payant | ⚠️ | À surveiller — Pas de limite de génération implementée |

---

### 3.3 Configuration — `genkit.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Plugin Google AI | ✅ | |
| Modèle par défaut `gemini-2.5-flash` | ✅ | |
| **Sécurité** : Clé API Google non exposée | ✅ | Via env var gérée par Genkit |

---

## 4. ADMINISTRATION (`src/app/admin/`)

### 4.1 Dashboard — `(protected)/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| 4 KPIs (réservations total, en attente, confirmées, CA estimé) | ✅ | |
| CA estimé (150€ × participants) | ⚠️ | **Calcul arbitraire** — Le vrai CA dépend du tarif de l'atelier, pas d'un forfait 150€ |
| Section activité récente | ⚠️ | **Placeholder** — "Aucune activité récente" hardcodé |
| **Manque** : Graphiques de progression | ❌ | Pas de recharts dans le dashboard admin |
| **Manque** : KPI taux de satisfaction | ❌ | Mentionné dans le guide de lancement mais absent |

---

### 4.2 Gestion Ateliers — `(protected)/ateliers/`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Liste avec recherche + filtre catégorie | ✅ | |
| Actions : Aperçu, Dupliquer, Modifier, Supprimer | ✅ | |
| Formulaire création (`CreateWorkshopForm`) | ✅ | |
| Formulaire modification (`EditWorkshopForm`) | ✅ | Tabs "Général / Contenu / Logistique" |
| Génération slug auto | ✅ | Diacritiques normalisés |
| **UX** : Génération image IA dans le form standard | ❌ | Uniquement dans la page `/create` publique — L'admin doit saisir l'URL manuellement |
| **Manque** : Preview de la fiche avant publication | ❌ | Bouton "Voir sur le site" redirige vers la page live, pas de preview draft |
| **Manque** : Statut publié/brouillon | ❌ | Tous les ateliers sont publics dès création |

---

### 4.3 Gestion Réservations — `(protected)/reservations/page.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Table avec 8 colonnes | ✅ | |
| Modal détail réservation | ✅ | `ReservationDetailModal` |
| Changement statut en live | ✅ | Select + Supabase update |
| Envoi email depuis modal | ✅ | `mailto:` link |
| Suppression avec confirmation | ✅ | `AlertDialog` |
| Export CSV | ✅ | Avec nom de l'atelier |
| **Manque** : Filtres par statut/date | ❌ | Tout est affiché, impossible de filtrer "en attente" |
| **Manque** : Notifications nouvelles réservations | ❌ | L'admin doit rafraîchir manuellement |
| **Manque** : Envoi de rappel email depuis l'admin | ❌ | `sendReminderEmail` existe mais n'est pas exposé dans l'interface |

---

### 4.4 Gestion Groupes — `admin/groups/`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Liste + CRUD groupes | ✅ | |
| Ajout/suppression membres | ✅ | |
| Planning sessions + appel | ✅ | |
| Ressources (upload fichiers + liens) | ✅ | |
| Projets fil rouge | ✅ | Étapes + livrables |
| Suivi pédagogique (évaluations) | ✅ | Observations, feedbacks, notes |
| Assiduité (Radio par statut) | ✅ | Upsert optimiste |
| **Manque** : Export bilan pédagogique | ❌ | Mentionné dans le guide de lancement ("bilan sous 5 jours") mais non implémenté |
| **Manque** : Portfolio apprenant exportable | ❌ | Mentionné dans la roadmap |

---

### 4.5 Layout Admin — `(protected)/layout.tsx`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Auth check côté serveur | ✅ | `auth()` + redirect |
| Sidebar avec navigation | ✅ | |
| Info utilisateur connecté | ✅ | |
| Bouton déconnexion | ✅ | |
| **Manque** : Lien vers "Utilisateurs" dans sidebar | 🟡 | Lien présent mais page `/admin/users` non implémentée |
| **Manque** : Lien vers "Paramètres" | 🟡 | Lien présent mais page `/admin/settings` non implémentée |
| **Manque** : Blog admin (CRUD articles) | ❌ | La table `blog_articles` existe mais aucune interface admin pour gérer les articles |
| **Manque** : Événements admin (CRUD events) | ❌ | La table `events` existe mais aucune interface pour ajouter des événements au calendrier |

---

## 5. CONFIGURATION & INFRASTRUCTURE

### 5.1 Next.js — `next.config.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| next-intl plugin | ✅ | |
| `ignoreBuildErrors: true` | ⚠️ | **Masque les erreurs TypeScript en production** — À désactiver ou corriger les erreurs |
| `ignoreDuringBuilds: true` (ESLint) | ⚠️ | **Masque les erreurs ESLint** — Même constat |
| Image domains : placehold.co, unsplash, picsum | ✅ | |
| Formats AVIF/WebP | ✅ | |
| Cache TTL 60s | ✅ | |

---

### 5.2 Middleware — `middleware.ts` (root) + `src/middleware.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| **Conflit** : Deux fichiers middleware | ❌ | `middleware.ts` à la racine (admin + i18n) et `src/middleware.ts` (i18n uniquement) — **Comportement imprévisible en Next.js** |
| Auth admin (route protection) | ✅ | Dans le middleware racine |
| Redirect si connecté sur `/admin/login` | ✅ | |
| i18n routing | ✅ | |
| **Sécurité** : Pages admin non protégées par middleware SI conflit | ⚠️ | Si `src/middleware.ts` gagne, la protection admin disparaît |

---

### 5.3 Routing i18n — `src/i18n/routing.ts` + `src/i18n.ts`

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Locales `['en', 'fr']` | ✅ | |
| Locale par défaut `'en'` | 🟡 | **Incohérent** — L'activité est en France (académie Nancy-Metz), la locale par défaut devrait être `'fr'` |
| `localePrefix: 'always'` | ✅ | URLs propres `/en/` et `/fr/` |
| Fallback vers `defaultLocale` si locale invalide | ✅ | |
| **Doublon** : `i18n.ts` racine vs `src/i18n.ts` | ⚠️ | Deux fichiers de configuration i18n — Le racine `i18n.ts` semble être un vestige |

---

### 5.4 Variables d'environnement (`.env.local` attendu)

| Variable | Statut | Criticité |
|----------|--------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Requise |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Requise |
| `STRIPE_SECRET_KEY` | 🟡 | Requise pour les paiements |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ | Non utilisée côté client actuellement |
| `STRIPE_WEBHOOK_SECRET` | 🟡 | Requise pour les webhooks |
| `RESEND_API_KEY` | 🟡 | Requise pour les emails |
| `FROM_EMAIL` | 🟡 | Optionnel (valeur par défaut) |
| `ADMIN_EMAIL` | 🟡 | Admin notification email |
| `NEXTAUTH_SECRET` | ❌ | **Valeur par défaut non sécurisée hardcodée dans `auth.ts`** |
| `NEXTAUTH_URL` | 🟡 | Requis en production |
| `GOOGLE_GENAI_API_KEY` | 🟡 | Requis pour les fonctionnalités IA |
| **Manque** : `.env.example` documenté | ❌ | Pas de fichier `.env.example` dans le repo |

---

### 5.5 SEO Infrastructure

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| `sitemap.ts` dynamique | ✅ | Pages statiques + ateliers + blog |
| `robots.ts` | ✅ | Exclut `/admin/`, `/api/`, `/reserver/success` |
| `sitemap.ts` pointe sur `imulabs.fr` | ⚠️ | Devrait pointer sur `ateliers360.fr` |
| `robots.ts` pointe sur `imulabs.fr` | ⚠️ | Même constat |
| Canonicals dans les pages ateliers | ✅ | `/atelier/${slug}` |
| Alternates EN/FR dans les pages ateliers | ✅ | |
| **Manque** : Canonical pour les pages sans `generateMetadata` | ❌ | Pages blog (client components) n'ont pas de canonical |

---

### 5.6 Base de données Supabase (schéma attendu)

| Table | Statut | Commentaire |
|-------|--------|-------------|
| `ateliers` | ✅ | Avec `type`, `categorie`, `sequence_order`, `tags`, `image_url` |
| `reservations` | ✅ | Avec `stripe_session_id`, `status` |
| `blog_articles` | ✅ | Avec `published_at`, `read_time`, `tags` |
| `events` | ✅ | Avec `places_disponibles` |
| `groups` | ✅ | |
| `group_members` | ✅ | |
| `group_sessions` | ✅ | |
| `attendance` | ✅ | |
| `profiles` | ✅ | Extension auth.users |
| `group_resources` | ✅ | |
| `evaluations` | ✅ | |
| `projects` | ✅ | |
| `project_steps` | ✅ | |
| `project_deliverables` | ✅ | |
| **RLS** : Politiques sur toutes les tables | 🟡 | Configurées dans QUICK-START mais pas auditables ici — À vérifier en Supabase |
| **Manque** : Table `contact_requests` | ❌ | Les demandes de contact ne sont stockées nulle part |
| **Manque** : Table `devis` | ❌ | Les demandes de devis ne sont pas persistées |
| **Manque** : Table `notifications` | ❌ | Pour les alertes admin temps réel |

---

### 5.7 Tests

| Élément | Statut | Commentaire |
|---------|--------|-------------|
| Script SQL test réservation | ✅ | `tests/insert-test-reservation.sql` |
| Documentation tests E2E | ✅ | `tests/e2e/reservation-flow.test.md` |
| Documentation configuration E2E | ✅ | `tests/CONFIGURATION-E2E.md` |
| **Tests automatisés** (Jest, Playwright, Cypress) | ❌ | **Aucun test automatisé** — Tout est manuel |
| **CI/CD** : Pipeline de tests | ❌ | Pas de `.github/workflows/` |

---

## 6. DOCUMENTS MÉTIER VS IMPLÉMENTATION

Comparaison entre les documents produits (`/mnt/project/`) et ce qui est implémenté :

| Document | Contenu prévu | Statut dans l'app |
|----------|--------------|-------------------|
| `conditions_generales_vente.docx` | 14 articles CGV complets | ❌ **Absentes du site web** |
| `charte_rgpd_participant.docx` | Formulaire consentement RGPD + droit image | ❌ **Non intégré dans le flow atelier** |
| `modele_devis.docx` | Modèle de devis normalisé | ❌ **Pas de génération de devis dans l'app** |
| `modele_facture.docx` | Modèle facture avec mentions légales | ❌ **Pas de génération de factures dans l'app** |
| `offre_commerciale.docx` | Grille tarifaire + packages | 🟡 **Partiellement** — Tarifs affichés mais pas la grille complète |
| `modeles_ateliers.docx` | 8 modèles de fiches (animateur, participant, présence, évaluation…) | 🟡 **Partiellement** — Les évaluations/groupes existent mais pas les fiches téléchargeables |
| `Liste_Ateliers.docx` | 24 fiches ateliers détaillées | 🟡 **Structure en DB** — Les ateliers sont en Supabase mais les 24 fiches ne semblent pas encore importées |
| `dossier_presentation_Ateliers360.docx` | Dossier de présentation académie Nancy-Metz | ❌ **Non intégré** — Le dossier n'est pas téléchargeable depuis le site |
| `guide_lancement.docx` | Stratégie de lancement + KPIs | ❌ **Non intégré** — Document interne, non lié à l'app |
| `signature_email_contact.html` | Signature email HTML | ✅ **Fichier présent** — À configurer dans le client email |
| `liste_materiel_financement.docx` | Liste matériel + stratégies financement | ❌ **Document interne** — Pas d'interface app |

---

## 7. SYNTHÈSE BACKEND

### Points forts

- Architecture API routes propre et cohérente
- Intégration Stripe (checkout + webhook) fonctionnelle
- Supabase bien structuré avec 14 tables
- Système de groupes/suivi pédagogique complet
- Templates emails HTML soignés
- Génération IA de descriptions d'ateliers

### Problèmes critiques (🔴 Bloquants)

1. **`auth.ts`** : Mot de passe `"admin123"` comparé en clair — bcrypt hash jamais utilisé
2. **`actions.ts`** : `submitContactForm` fait uniquement `console.log` — Aucune données de contact reçue
3. **Deux fichiers middleware** en conflit — Peut neutraliser la protection admin
4. **`NEXTAUTH_SECRET`** : Valeur par défaut non sécurisée hardcodée
5. **Emails pointant vers `imulabs.fr`** — Mauvaise identité de marque
6. **CGV non publiées sur le site** — Obligation légale (Art. L111-1 Code de la conso.)
7. **Table `contact_requests` manquante** — Toutes les demandes sont perdues

### Problèmes importants (🟠 À corriger)

1. Webhook Stripe non idempotent — Doublon d'emails possible
2. `payment_intent.payment_failed` sans action — Admin non notifié d'un échec de paiement
3. Pagination manquante sur `getWorkshops` — Problème de performance à l'échelle
4. Bug `getGroupMembers` — Double `.select()` efface le JOIN
5. `ignoreTypeScriptErrors: true` et `ignoreESLint: true` masquent des problèmes
6. Locale par défaut `'en'` incohérente avec la cible française
7. `sitemap.ts` et `robots.ts` pointent sur `imulabs.fr`
8. `ImageUrl` générée par IA non persistée en Supabase Storage
9. Pas de rappel email automatique (cron)
10. CA estimé dans le dashboard calculé à 150€/participant arbitraire

### Manques fonctionnels (🟡 Roadmap)

1. Interface admin Blog (CRUD articles)
2. Interface admin Événements (calendrier)
3. Génération PDF devis/factures (document templates existants)
4. Bilan pédagogique exportable
5. Tests automatisés (Jest/Playwright)
6. `.env.example` documenté
7. Rate limiting sur les API publiques
8. Monitoring/alerting (Sentry, logs structurés)
