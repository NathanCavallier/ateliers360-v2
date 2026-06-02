# 📋 Ateliers 360 Web — Checklist de Développement

**Statut Global** : Semaine 1 - DÉMARRAGE ✅  
**Date Mise à Jour** : 13 Déc 2025  
**Cible MVP** : 19 Jan 2026

---

## ✅ Semaine 1 : Fondations (16-22 Déc)

### Tâches Critiques

#### 1.1 – Base de Données Supabase
- [x] Créer compte Supabase
- [ ] Créer schéma `ateliers` (id, slug, titre, description, public, durée, tarif, etc.)
- [ ] Créer schéma `reservations` (id, email, atelier_id, date, participants, status)
- [ ] Créer schéma `blog_articles` (id, slug, titre, contenu, published_at)
- [ ] Implémenter RLS policies
- **Status** : À faire
- **Assigné** : Nathan

#### 1.2 – Configuration Env & Secrets
- [x] Installer dépendances (@supabase/supabase-js, stripe, zod)
- [x] Créer `.env.example` (template)
- [ ] Remplir `.env.local` avec clés Supabase/Stripe (test mode)
- [ ] Vérifier loading des variables d'env
- **Status** : 50% (dépendances OK, env template OK)
- **Assigné** : Nathan

#### 1.3 – Structure Fichiers Web
- [x] Créer dossiers `/atelier`, `/admin`, `/a-propos`, `/pour-les-ecoles`
- [x] Créer dossiers `/api`
- [x] Mettre à jour `types.ts` avec interfaces
- [ ] Créer `lib/supabase.ts` (client)
- [ ] Créer `lib/supabase-admin.ts` (server, optionnel)
- [ ] Créer `lib/stripe.ts`
- [ ] Créer `lib/email.ts`
- **Status** : 50%
- **Assigné** : Nathan

#### 1.4 – Contenus & Données
- [x] Créer/mettre à jour `lib/data.ts` avec 10 ateliers
- [ ] Vérifier slug, titre, description, objectifs
- [ ] Ajouter images placeholders
- **Status** : ✅ DONE (data.ts existant utilisé)
- **Assigné** : Nathan

#### 1.5 – Build & Tests
- [x] `npm run build` sans erreurs critiques
- [x] `npm run dev` pour tester localement
- [ ] Tests réservation form validation
- **Status** : ✅ Build OK
- **Assigné** : Nathan

### ✅ Fin Semaine 1 (Exit Criteria)
- [x] Dépendances installées
- [x] Fichiers structure créés
- [ ] Supabase schéma peuplé
- [x] `npm run build` OK
- [ ] Env configuré (test mode)

**Prochaine étape** : Supabase config + pages principales

---

## 📄 Semaine 2 : Pages Principales (23-29 Déc)

### 2.1 – Pages Ateliers
- [x] `/atelier` (liste) — DONE
  - Affichage cartes ateliers
  - Filtres par catégorie
  - CTA "Voir détails"
- [x] `/atelier/[slug]` (détail) — DONE
  - Titre, description, objectifs
  - Info clés (durée, public, tarif)
  - CTA réservation
  - Ateliers liés
- **Status** : ✅ DONE
- **Assigné** : Nathan

### 2.2 – Pages Statiques
- [x] `/a-propos` — DONE
  - Mission, valeurs
  - Équipe (Nathan)
  - Stats
- [x] `/pour-les-ecoles` — DONE
  - Pitch écoles
  - Formulaire demande intervention
  - Tarifs
  - FAQ
- [ ] `/formations-pro` (versions courtes, faire après)
- [ ] `/tarifs` (page dédiée, optionnel)
- **Status** : 50% (a-propos + ecoles OK)
- **Assigné** : Nathan

### 2.3 – Formulaire Réservation
- [ ] Page `/reserver` ou modal
  - Select atelier (dropdown)
  - Date picker (react-day-picker)
  - Nombre participants
  - Email, établissement, adresse
  - Validation Zod
- [ ] Submit → POST `/api/reservations`
- [ ] Message succès
- **Status** : À faire
- **Assigné** : Nathan

### 2.4 – API Routes
- [ ] `POST /api/reservations` — créer réservation
- [ ] `GET /api/ateliers` — lister ateliers (optionnel pour stat)
- **Status** : À faire
- **Assigné** : Nathan

### 2.5 – SEO Basique
- [x] Meta tags sur pages existantes
- [ ] Vérifier sur toutes les pages /atelier, /a-propos, /pour-les-ecoles
- [ ] Schema.org Event (atelier detail)
- **Status** : Partiellement
- **Assigné** : Nathan

### ✅ Fin Semaine 2 (Exit Criteria)
- [ ] 5 pages live (atelier, détail, a-propos, ecoles, reserver)
- [ ] Formulaire réservation fonctionnel
- [ ] API POST réservation OK
- [ ] Emails confirmation envoyés (optionnel)
- [ ] SEO basique sur toutes les pages

---

## 📆 Semaine 3 : Pages Complémentaires & Admin (30 Déc - 5 Jan)

### 3.1 – Pages Complémentaires
- [ ] `/calendrier` — événements + ical
- [ ] `/blog` + `/blog/[slug]` — articles pédagogiques
- [ ] `/mentions-legales` — RGPD, SIRET, RC
- [ ] `/politique-confidentialite` — traitement données
- **Status** : À faire
- **Assigné** : Nathan

### 3.2 – Admin Dashboard
- [ ] `/admin` — layout + authentification
- [ ] Liste réservations (tableau)
- [ ] Filtres, export CSV
- [ ] CRUD ateliers (create, edit, delete)
- [ ] Gestion événements/créneaux
- **Status** : À faire
- **Assigné** : Nathan

### 3.3 – API Complémentaires
- [ ] `GET /api/reservations` — lister (admin)
- [ ] `PATCH /api/reservations/[id]` — update status
- [ ] `POST /api/ateliers` — créer atelier (admin)
- [ ] `DELETE /api/ateliers/[id]` — delete
- **Status** : À faire
- **Assigné** : Nathan

### ✅ Fin Semaine 3 (Exit Criteria)
- [ ] 9 pages au total (5 + 4 nouvelles)
- [ ] Admin 70% fonctionnel
- [ ] Export CSV réservations
- [ ] API routes complètes
- [ ] Aucune erreur logs

---

## 💳 Semaine 4 : Paiement, Email & Polish (6-12 Jan)

### 4.1 – Stripe Integration
- [ ] Setup Stripe keys (test mode)
- [ ] Page checkout `/checkout`
- [ ] Stripe Checkout embed
- [ ] Webhook `/api/stripe/webhook`
- [ ] Update réservation status (pending → paid)
- **Status** : À faire
- **Assigné** : Nathan

### 4.2 – Email Automation
- [ ] Confirmation réservation (SendGrid/Resend)
- [ ] Rappel 48h avant
- [ ] Feedback post-atelier
- [ ] Email admin (nouvelle réserv)
- **Status** : À faire
- **Assigné** : Nathan

### 4.3 – SEO & Performance
- [ ] All pages: meta, OG, canonical
- [ ] Sitemap.xml, robots.txt
- [ ] Images optimisées (Next Image)
- [ ] Lighthouse > 80 sur chaque page
- [ ] Schema.org Event, LocalBusiness
- **Status** : À faire
- **Assigné** : Nathan

### 4.4 – RGPD & Cookies
- [ ] Modal consent cookies
- [ ] Audit CNIL (self-check)
- [ ] Disclaimer mineurs
- **Status** : À faire
- **Assigné** : Nathan

### 4.5 – Tests End-to-End
- [ ] E2E form → paiement → confirmation
- [ ] Mobile responsiveness
- [ ] Validation tous formulaires
- [ ] Gestion erreurs 404, 500
- **Status** : À faire
- **Assigné** : Nathan

### ✅ Fin Semaine 4 (Exit Criteria)
- [ ] Paiement Stripe fonctionnel (test mode)
- [ ] Emails automatisés envoyés
- [ ] SEO 95%+ sur toutes les pages
- [ ] RGPD compliant
- [ ] 0 erreurs critiques en logs
- [ ] MVP 95% fonctionnel

---

## 🚀 Semaine 5 : Déploiement & Monitoring (13-19 Jan)

### 5.1 – Production Setup
- [ ] Config production Supabase (RLS strict)
- [ ] Stripe prod keys (live mode)
- [ ] Domaine ateliers360.fr (ou DNS)
- [ ] Déployer Vercel (main branch)
- [ ] Vérifier secrets en prod
- **Status** : À faire
- **Assigné** : Nathan

### 5.2 – Analytics & Monitoring
- [ ] Google Analytics 4
- [ ] Sentry (optional)
- [ ] Dashboards actifs
- **Status** : À faire
- **Assigné** : Nathan

### 5.3 – Documentation
- [ ] README.md (setup dev, deploy, secrets)
- [ ] Docs API (routes, payloads)
- [ ] Guide admin
- [ ] Troubleshooting
- **Status** : À faire
- **Assigné** : Nathan

### 5.4 – Incidents & Optimisations
- [ ] Monitor logs prod
- [ ] Fix bugs découverts
- [ ] Optimiser perf
- **Status** : Ongoing
- **Assigné** : Nathan

### ✅ Fin Semaine 5 (Exit Criteria = MVP DONE)
- [ ] Site live sur ateliers360.fr
- [ ] Réservations fonctionnelles
- [ ] Paiement Stripe live
- [ ] Emails OK
- [ ] Admin opérationnel
- [ ] 0 erreurs critiques
- [ ] Prêt pour interventions pilotes

---

## 🎯 Métriques de Succès (MVP)

| Métrique | Cible | Statut |
|----------|-------|--------|
| **Build sans erreurs** | ✅ | DONE |
| **Pages créées** | 9/11 | 2/9 |
| **API routes** | 6+ | 0/6 |
| **Lighthouse Score** | >80 | À mesurer |
| **Réservations testées** | 5+ | À faire |
| **Temps de réponse API** | <200ms | À faire |
| **RGPD compliant** | ✅ | À faire |
| **Stripe tests réussis** | ✅ | À faire |
| **Emails testés** | 5+ | À faire |
| **Mobile responsive** | ✅ | À tester |

---

## 📝 Notes de Développement

### Supabase Schema (À créer)
```sql
-- Copy-paste dans SQL editor Supabase

CREATE TABLE ateliers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT NOT NULL,
  objectifs TEXT[] NOT NULL,
  public_cible TEXT NOT NULL,
  duree_heures NUMERIC NOT NULL,
  tarif_eur NUMERIC NOT NULL,
  materiel TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reservations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  atelier_id BIGINT REFERENCES ateliers(id),
  email TEXT NOT NULL,
  nom TEXT NOT NULL,
  etablissement TEXT,
  adresse TEXT,
  participants_count INT NOT NULL,
  date_atelier DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE blog_articles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  excerpt TEXT,
  contenu TEXT NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### .env.local (À remplir)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

SENDGRID_API_KEY=SG...
```

### Fichiers Déjà Créés
- ✅ `src/lib/supabase.ts` (client)
- ✅ `src/lib/types.ts` (interfaces étendues)
- ✅ `src/app/atelier/page.tsx` (liste)
- ✅ `src/app/atelier/[slug]/page.tsx` (détail)
- ✅ `src/app/a-propos/page.tsx`
- ✅ `src/app/pour-les-ecoles/page.tsx`
- ✅ `.env.example`
- ✅ `/docs/web-dev-plan.md` (plan complet)

### Stack Confirmé
- **Frontend** : Next.js 15 + TypeScript + Tailwind + Radix UI
- **Backend** : Next.js API routes
- **BD** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth (optionnel pour admin)
- **Paiement** : Stripe
- **Email** : SendGrid ou Resend
- **Hébergement** : Vercel (auto-deploy from GitHub)

---

## 🔗 Prochaines Actions Immédiates

**Cette semaine (avant 20 Déc)** :
1. [ ] Créer projet Supabase
2. [ ] Copier schéma SQL dans Supabase
3. [ ] Récupérer URL + Anon key
4. [ ] Remplir `.env.local`
5. [ ] Tester `npm run dev` localement
6. [ ] Push vers GitHub (branch dev)

**La semaine suivante (23-26 Déc)** :
1. [ ] Formulaire réservation `/reserver`
2. [ ] API POST `/api/reservations`
3. [ ] Intégration SendGrid/Resend (emails test)
4. [ ] Test E2E form → email

---

## 🎉 MVP Timeline

| Phase | Durée | Fin Prévue |
|-------|-------|-----------|
| Semaine 1 (Fondations) | 1 sem | 22 Déc |
| Semaine 2 (Pages) | 1 sem | 29 Déc |
| Semaine 3 (Admin) | 1 sem | 5 Jan |
| Semaine 4 (Paiement) | 1 sem | 12 Jan |
| Semaine 5 (Deploy) | 1 sem | 19 Jan |
| **TOTAL MVP** | **5 sem** | **19 Jan 2026** |

Après cette date → Interventions pilotes + prospection écoles ! 🚀
