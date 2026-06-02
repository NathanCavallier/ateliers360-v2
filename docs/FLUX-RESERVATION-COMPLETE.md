# 📋 Flux de Réservation Complet - Ateliers 360

## 🔄 Vue d'ensemble du flux

```txt
Page d'accueil → Sélection atelier → Page /reserver → Formulaire → API /api/reservations → Supabase (reservations) → Stripe Checkout → Webhook Stripe → Confirmation paiement
```

---

## 📍 Étape 1 : Page d'accueil

**Fichier** : `src/app/[locale]/page.tsx`

- Affiche les ateliers disponibles avec un bouton "Réserver"
- Lien de redirection : `/[locale]/reserver?atelier={id}`

---

## 📍 Étape 2 : Page de réservation (`/reserver`)

**Fichier** : `src/app/[locale]/reserver/page.tsx`

### Action

- Récupère les ateliers disponibles avec `getWorkshops()` (client-side)
- Extrait l'ID de l'atelier depuis les query params (`?atelier={id}`)
- Rend le composant `ReservationForm`

### Variables reçues

```typescript
- atelierId: number (optionnel, depuis query params)
- ateliers: Array<{id, titre, slug}>
```

---

## 📍 Étape 3 : Formulaire de réservation

**Fichier** : `src/components/reservations/ReservationForm.tsx`

### Champs du formulaire

```typescript
{
  atelier_id: string (requis),
  nom: string (requis, min 2 caractères),
  email: string (requis, email valide),
  etablissement: string (optionnel),
  adresse: string (optionnel),
  participants_count: number (requis, 1-50),
  date_atelier: Date (requis),
  message: string (optionnel),
  cgv_accepted: boolean (requis = true)
}
```

### Validation

- Utilise `react-hook-form` + `zod` pour validation côté client
- Vérifie que la date est sélectionnée
- Vérifie que les CGV sont acceptées

### Soumission

1. **Appel API POST `/api/reservations`** avec les données formatées

   ```json
   {
     "atelier_id": 1,
     "nom": "Jean Dupont",
     "email": "jean@example.com",
     "etablissement": "École XYZ",
     "adresse": "123 Rue de Paris",
     "participants_count": 2,
     "date_atelier": "2026-05-20"
   }
   ```

2. **Réponse attendue** :

   ```json
   {
     "success": true,
     "reservation": {
       "id": 42,
       "atelier_id": 1,
       "nom": "Jean Dupont",
       "email": "jean@example.com",
       "status": "pending",
       ...
     }
   }
   ```

3. **Appel API POST `/api/stripe/checkout`** avec l'ID de réservation

   ```json
   {
     "reservationId": 42
   }
   ```

4. **Redirection vers Stripe Checkout** (`window.location.href = url`)

---

## 📍 Étape 4 : API de réservation

**Fichier** : `src/app/api/reservations/route.ts`

### Actions

1. ✅ Reçoit les données POST
2. ✅ Valide avec Zod
3. ✅ Appelle `createReservationServer()` (NEW - depuis `supabase-server-actions.ts`)
4. ✅ Insère dans la table `reservations` avec `supabaseAdmin` (bypass RLS)
5. ✅ Retourne l'ID de réservation

### Corrections apportées

- **Avant** : Utilisait `createReservation()` (client-side avec RLS)
- **Après** : Utilise `createReservationServer()` (server-side avec `supabaseAdmin`)
- **Raison** : Évite les problèmes de RLS et garantit l'insertion

### Gestion des erreurs

- ✅ Validation Zod : 400
- ✅ DB Error : 500 (avec message détaillé)
- ✅ Logs console pour debug

---

## 📍 Étape 5 : API Stripe Checkout

**Fichier** : `src/app/api/stripe/checkout/route.ts`

### Actions

1. Reçoit l'ID de réservation
2. Récupère la réservation et l'atelier associé
3. Crée une session Stripe Checkout
4. Met à jour la réservation avec `stripe_session_id`
5. Retourne l'URL de redirection

### URLs de redirection

- **Success** : `{origin}/fr/reserver/success?session_id={CHECKOUT_SESSION_ID}`
- **Cancel** : `{origin}/fr/reserver?atelier={atelier_id}&canceled=true`

---

## 📍 Étape 6 : Paiement Stripe

**Client-side** : L'utilisateur est redirigé vers Stripe Checkout

### Après le paiement

- ✅ Retour vers `success` ou `cancel`
- ⏳ Webhook Stripe met à jour le statut

---

## 📍 Étape 7 : Webhook Stripe

**Fichier** : `src/app/api/stripe/webhook/route.ts`

### Actions sur `checkout.session.completed`

1. Récupère la session Stripe
2. Met à jour la réservation : `status = "paid"`
3. Envoie email de confirmation au client
4. Envoie notification admin

---

## 📍 Étape 8 : Page de succès

**Fichier** : `src/app/[locale]/reserver/success/page.tsx`

- Affiche message de confirmation
- Récupère les détails de la réservation (optionnel)

---

## 🗄️ Schéma de base de données

### Table : `reservations`

```sql
CREATE TABLE reservations (
  id BIGSERIAL PRIMARY KEY,
  atelier_id BIGINT NOT NULL REFERENCES ateliers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  nom TEXT NOT NULL,
  etablissement TEXT,
  adresse TEXT,
  participants_count INT NOT NULL DEFAULT 1,
  date_atelier DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'completed')),
  stripe_session_id TEXT,
  group_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table : `structure_requests` (Contact)

```sql
CREATE TABLE public.structure_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  structure_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  audience text,
  message text,
  status text NOT NULL DEFAULT 'new',
  metadata jsonb DEFAULT '{}'::jsonb
);
```

---

## ✅ Points de contrôle

### Variables d'environnement requises

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_URL=https://...supabase.co          # Pour server-side
SUPABASE_SERVICE_ROLE_KEY=...                # Pour supabaseAdmin

# Email
FROM_EMAIL=contact@ateliers360.fr
FROM_EMAIL_ADMIN=admin@ateliers360.fr
SEND_CONFIRMATION_EMAIL=true|false

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Autres
ADMIN_EMAIL=admin@ateliers360.fr
```

### Migrations requises

- ✅ `2026_05_07_create_structure_requests.sql` - Table contact
- ✅ `2026_05_07_create_contact_form.sql` - Formulaire contact
- ✅ QUICK-START.md contient création de table `reservations`
- ⏳ Migration colonne `type` sur table `ateliers` (en cours)

### Flux de test

1. Aller sur page d'accueil
2. Cliquer "Réserver" sur un atelier
3. Remplir le formulaire
4. Soumettre → Vérifier console pour réservation créée
5. Redirection Stripe → Tester ou fermer
6. Vérifier Supabase que la réservation existe avec `status = "pending"` ou `"paid"`

---

## 🐛 Problèmes connus et corrections

### ❌ Problème 1 : Réservation non sauvegardée en BD

**Cause** : Utilisait `createReservation()` client-side (problèmes RLS)
**Solution** : ✅ Créé `createReservationServer()` avec `supabaseAdmin`

### ❌ Problème 2 : Contact non sauvegardé

**Cause** : Variables d'env `SUPABASE_SERVICE_ROLE_KEY` manquantes ou erreur dans API
**Solution** : ✅ Ajouté vérification `supabaseAdmin` et meilleure gestion erreurs

### ❌ Problème 3 : Manque de logs pour déboguer

**Cause** : Pas de logs détaillés en cas d'erreur
**Solution** : ✅ Ajouté logs console pour toutes les étapes

---

## 📱 Page de contact

**Fichier** : `src/app/[locale]/contact/page.tsx` + `src/components/contact/ContactForm.tsx`

### Flux

1. Formulaire client-side → POST `/api/contact`
2. API valide et insère dans `structure_requests`
3. Email admin + confirmation client (optionnel)
4. Retour success/error au client

### Corrections apportées

- ✅ Vérification `supabaseAdmin` disponible
- ✅ Meilleure gestion des erreurs

---

## 🔐 Row Level Security (RLS)

### Problème

- Les clients anonymes ne peuvent pas insérer sans RLS policy
- Le client-side `supabase` respecte RLS
- Le server-side `supabaseAdmin` bypass RLS (correct pour API)

### Solution appliquée

- Déplacer les opérations d'insertion vers les API routes
- Utiliser `supabaseAdmin` côté serveur

### Vérifier les policies RLS

```sql
-- Sur Supabase Studio
SELECT * FROM information_schema.columns
WHERE table_name = 'reservations' OR table_name = 'structure_requests';

-- Vérifier les policies
SELECT * FROM pg_policies WHERE tablename IN ('reservations', 'structure_requests');
```

---

## 📊 Architecture résumée

```
CLIENT                          SERVER                      SUPABASE
-----                           ------                      --------
Page d'accueil
    ↓
/reserver page (getWorkshops)                               ← SELECT * FROM ateliers
    ↓
ReservationForm
    ↓ (validation ZOD)
POST /api/reservations ────────→ POST handler
                                 ↓ (validate ZOD)
                                 ↓ (createReservationServer)
                                 ↓ (supabaseAdmin.insert)       → INSERT INTO reservations
                                 ↓ (return data)
    ← JSON response
    ↓
POST /api/stripe/checkout ────→ POST handler
                                 ↓ (getReservation)
                                 ↓ (createCheckoutSession)      → SELECT FROM reservations + ateliers
                                 ↓ (update stripe_session_id)   → UPDATE reservations
    ← Stripe URL
    ↓
Redirect to Stripe.com
    ↓ (payment)
Redirect /reserver/success
                                 ← Webhook: checkout.session.completed
                                 ↓ (update status to 'paid')    → UPDATE reservations
                                 ↓ (sendEmail)
                                 ← Confirmation page
```

---

## 🚀 Prochaines améliorations

1. ⏳ Ajouter colonne `type` aux ateliers (workshop, pack, module)
2. ⏳ Ajouter validation : vérifier que l'atelier existe avant réservation
3. ⏳ Ajouter captcha anti-bot au formulaire
4. ⏳ Implémenter système de confirmation d'email
5. ⏳ Ajouter gestion de disponibilités/places
6. ⏳ Admin panel pour gérer les réservations
