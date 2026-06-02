# Guide Configuration Tests E2E - ImuLabs

**Date:** 15 décembre 2025  
**Status:** En attente des clés API Stripe et Resend

---

## 🎯 Objectif

Configurer l'environnement pour tester le flow complet :  
**Réservation → Stripe Checkout → Webhook → Email → DB Update**

---

## ✅ État Actuel

### Infrastructure Déjà en Place

1. **✅ API Routes complètes**
   - [src/app/api/reservations/route.ts](../../src/app/api/reservations/route.ts) - Création réservation
   - [src/app/api/stripe/checkout/route.ts](../../src/app/api/stripe/checkout/route.ts) - Session Stripe
   - [src/app/api/stripe/webhook/route.ts](../../src/app/api/stripe/webhook/route.ts) - Webhook handler

2. **✅ Validation Zod**
   - Schema `reservationSchema` valide les données
   - Gestion erreurs 400/404/500 propres

3. **✅ Supabase DB**
   - Table `reservations` avec colonnes `status`, `stripe_session_id`
   - Table `ateliers` pour les détails workshops
   - RLS configuré

4. **✅ Email Templates**
   - [src/lib/email.ts](../../src/lib/email.ts) - `sendReservationConfirmation()` et `sendAdminNotification()`
   - Templates HTML inline avec styling

5. **✅ Frontend Forms**
   - [src/components/reservations/ReservationForm.tsx](../../src/components/reservations/ReservationForm.tsx)
   - Validation react-hook-form + zod

### ❌ Ce qui Manque

1. **❌ Clés Stripe** (Bloquant pour tests)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...`

2. **❌ Clé Resend** (Bloquant pour emails)
   - `RESEND_API_KEY=re_...`
   - `FROM_EMAIL=ImuLabs <noreply@imulabs.fr>`

3. **❌ Stripe CLI** (Pour tester webhook localement)
   - Installation : `brew install stripe/stripe-cli/stripe`
   - Configuration : `stripe login`

---

## 📋 Étapes de Configuration

### 1. Créer Compte Stripe Test

1. **Inscription:** https://dashboard.stripe.com/register
2. **Activer Test Mode:** Toggle en haut à droite "Test mode"
3. **Récupérer API Keys:**
   - Aller dans **Developers → API keys**
   - Copier **Publishable key** (pk_test_...)
   - Révéler et copier **Secret key** (sk_test_...)

4. **Créer Webhook Endpoint:**
   - Aller dans **Developers → Webhooks**
   - Cliquer **Add endpoint**
   - URL (temporaire): `https://votre-ngrok-url.ngrok.io/api/stripe/webhook`
   - Événements à écouter:
     - ✅ `checkout.session.completed`
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed`
   - Copier le **Signing secret** (whsec_...)

### 2. Créer Compte Resend

1. **Inscription:** https://resend.com/signup
2. **Créer API Key:**
   - Aller dans **Settings → API Keys**
   - Cliquer **Create API Key**
   - Nom: "ImuLabs Dev"
   - Copier la clé (re_...)

3. **Configurer Email From:**
   - Option 1: Utiliser `onboarding@resend.dev` (100 emails/jour gratuit)
   - Option 2: Ajouter domaine custom `imulabs.fr` (requires DNS config)

### 3. Mettre à Jour `.env.local`

Ajouter les clés dans `.env.local` :

```bash
# Stripe Configuration (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Qe...
STRIPE_SECRET_KEY=sk_test_51Qe...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Configuration
RESEND_API_KEY=re_...
FROM_EMAIL=ImuLabs <onboarding@resend.dev>

# Existing config (ne pas toucher)
NEXT_PUBLIC_SUPABASE_URL=https://ibkexskorhrwnbgcdcrk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXTAUTH_URL=http://localhost:9002
NEXTAUTH_SECRET=your-super-secret-key...
```

### 4. Installer Stripe CLI (Local Webhook Testing)

```bash
# Installation (macOS)
brew install stripe/stripe-cli/stripe

# Login avec compte Stripe
stripe login

# Forward webhook vers localhost
stripe listen --forward-to localhost:9002/api/stripe/webhook

# Dans un autre terminal, trigger test
stripe trigger checkout.session.completed
```

**Note:** Le Stripe CLI affichera le `STRIPE_WEBHOOK_SECRET` au démarrage. Copier cette valeur dans `.env.local`.

### 5. Restart Serveur Next.js

```bash
# Arrêter le serveur actuel (Ctrl+C)
# Relancer avec nouvelles variables d'environnement
npm run dev
```

---

## 🧪 Tests à Effectuer (Après Configuration)

### Test 1: API Réservation

```bash
curl -X POST http://localhost:9002/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "atelier_id": 1,
    "nom": "Test E2E",
    "email": "test@imulabs.fr",
    "participants_count": 10,
    "date_atelier": "2025-12-20"
  }'
```

**Résultat attendu:** Status 201 avec `reservation.id`

### Test 2: Stripe Checkout

```bash
# Utiliser l'ID de réservation du test 1
curl -X POST http://localhost:9002/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -d '{"reservationId": 1}'
```

**Résultat attendu:** `session.url` vers Stripe Checkout

### Test 3: Paiement Complet (Manuel)

1. Ouvrir `session.url` dans navigateur
2. Entrer carte test: `4242 4242 4242 4242`
3. Expiry: `12/34`, CVC: `123`
4. Cliquer "Payer"
5. Vérifier redirection vers `/fr/reserver/success?session_id=cs_...`
6. Vérifier logs serveur: "Emails de confirmation envoyés"
7. Vérifier Resend dashboard: 2 emails envoyés
8. Vérifier Supabase: `status='paid'` pour réservation

### Test 4: Webhook Stripe CLI

```bash
# Terminal 1: Forward webhook
stripe listen --forward-to localhost:9002/api/stripe/webhook

# Terminal 2: Trigger événement
stripe trigger checkout.session.completed \
  --add checkout_session:metadata.reservation_id=1
```

**Résultat attendu:** Logs montrent "Réservation 1 marquée comme payée"

---

## 🔍 Debugging

### Problème: "Stripe is not defined"

**Cause:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` manquant  
**Solution:** Ajouter dans `.env.local` et restart serveur

### Problème: "Invalid signature"

**Cause:** `STRIPE_WEBHOOK_SECRET` incorrect  
**Solution:** Utiliser le secret du Stripe CLI (affiché au lancement)

### Problème: "Emails not sent"

**Cause:** `RESEND_API_KEY` manquant ou invalide  
**Solution:** Vérifier clé dans Resend dashboard, re-créer si nécessaire

### Problème: "Reservation not found"

**Cause:** ID de réservation inexistant dans DB  
**Solution:** Vérifier Supabase, créer réservation avec Test 1 d'abord

---

## 📊 Checklist Validation

Avant de marquer la tâche comme complète, vérifier :

- [ ] **Clés Stripe configurées** dans `.env.local`
- [ ] **Clé Resend configurée** dans `.env.local`
- [ ] **Stripe CLI installé** et fonctionnel
- [ ] **Test 1 réussi:** Réservation créée en DB
- [ ] **Test 2 réussi:** Session Stripe créée
- [ ] **Test 3 réussi:** Paiement complet E2E fonctionnel
- [ ] **Test 4 réussi:** Webhook reçu et traité
- [ ] **Emails reçus:** Client + Admin dans Resend dashboard
- [ ] **DB updated:** Status passe de `pending` à `paid`
- [ ] **No errors 500:** Console serveur propre

---

## 🎬 Prochaines Étapes

Une fois les tests E2E validés :

1. ✅ **Tâche 2 terminée** - Tests E2E complets
2. 🔜 **Tâche 3** - Design templates email professionnels (react-email)
3. 🔜 **Tâche 4** - Disclaimer mineurs sur formulaire réservation
4. 🔜 **Tâche 5** - Audit Lighthouse (performance, SEO, accessibilité)

---

**Statut:** ⏳ **En attente de configuration Stripe/Resend**  
**Bloquant:** Obtenir les clés API pour débloquer les tests  
**ETA:** 30 min de configuration + 1h de tests complets

---

## 💡 Ressources

- **Stripe Test Cards:** https://stripe.com/docs/testing#cards
- **Stripe CLI Docs:** https://stripe.com/docs/stripe-cli
- **Resend Node.js Docs:** https://resend.com/docs/send-with-nodejs
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Supabase JS Client:** https://supabase.com/docs/reference/javascript/select
