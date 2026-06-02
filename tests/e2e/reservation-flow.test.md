# Test E2E - Flow Réservation Complet

**Date:** 15 décembre 2025  
**Objectif:** Tester l'intégralité du flow de réservation, du formulaire au paiement Stripe et confirmation email.

---

## ✅ Checklist des Tests

### 1. Formulaire de Réservation

- [ ] **Accès formulaire**: `/fr/reserver?atelier=1` affiche le formulaire correctement
- [ ] **Validation frontend**: Champs requis bloquent la soumission si vides
- [ ] **Validation email**: Format email vérifié (ex: `test@example.com`)
- [ ] **Sélection atelier**: Dropdown affiche tous les ateliers actifs
- [ ] **Date picker**: Calendrier fonctionne (format YYYY-MM-DD)
- [ ] **Nombre participants**: Input number positif uniquement

### 2. API `/api/reservations` (POST)

- [ ] **Création réservation**: Body JSON valide crée l'entrée DB
- [ ] **Validation Zod**: Données invalides retournent 400 avec détails
- [ ] **Status initial**: Réservation créée avec `status='pending'`
- [ ] **Retour JSON**: Response inclut `reservation_id` pour Stripe

**Test manuel:**

```bash
curl -X POST http://localhost:9002/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "atelier_id": 1,
    "nom": "Test User",
    "email": "test@imulabs.fr",
    "participants_count": 10,
    "date_atelier": "2025-12-20",
    "etablissement": "École Test",
    "adresse": "123 Rue Test"
  }'
```

**Résultat attendu:**

```json
{
  "success": true,
  "reservation": {
    "id": 123,
    "status": "pending",
    "...": "..."
  },
  "message": "Réservation créée avec succès"
}
```

### 3. API `/api/stripe/checkout` (POST)

- [ ] **Session Stripe**: POST avec `reservationId` crée session Stripe
- [ ] **Récupération atelier**: Joint `ateliers` table pour titre et tarif
- [ ] **URL génération**: `session.url` redirige vers Stripe Checkout
- [ ] **Update DB**: `stripe_session_id` sauvegardé dans réservation
- [ ] **Gestion erreurs**: Réservation inexistante retourne 404

**Test manuel:**

```bash
curl -X POST http://localhost:9002/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -d '{"reservationId": 123}'
```

**Résultat attendu:**

```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### 4. Stripe Checkout (Manuel)

- [ ] **Redirection**: Clic "Payer" redirige vers Stripe
- [ ] **Formulaire Stripe**: Carte test `4242 4242 4242 4242` (expiry futur, CVC 123)
- [ ] **Success URL**: Après paiement, retour `/fr/reserver/success?session_id=...`
- [ ] **Cancel URL**: Bouton annuler retourne `/fr/reserver?canceled=true`

**Cartes test Stripe:**

- ✅ Succès: `4242 4242 4242 4242`
- ❌ Échec: `4000 0000 0000 0002`
- ⏳ 3D Secure: `4000 0027 6000 3184`

### 5. Webhook Stripe `/api/stripe/webhook`

- [ ] **Événement reçu**: `checkout.session.completed` déclenche le webhook
- [ ] **Signature validation**: Header `stripe-signature` vérifié
- [ ] **Update status DB**: Réservation passe à `status='paid'`
- [ ] **Metadata**: `reservation_id` récupéré depuis `session.metadata`

**Tester avec Stripe CLI:**

```bash
# Installation Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhook vers localhost
stripe listen --forward-to localhost:9002/api/stripe/webhook

# Trigger événement test
stripe trigger checkout.session.completed
```

### 6. Envoi Emails (Resend)

- [ ] **Email client**: `sendReservationConfirmation()` envoyé à `reservation.email`
- [ ] **Email admin**: `sendAdminNotification()` envoyé à `nathan@imulabs.fr`
- [ ] **Template HTML**: Emails contiennent logo, détails atelier, date, participants
- [ ] **Logs**: Console affiche "Emails de confirmation envoyés"

**Vérifier `.env.local`:**

```bash
RESEND_API_KEY=re_...  # Doit être défini
FROM_EMAIL=ImuLabs <noreply@imulabs.fr>
```

**Tester Resend (optionnel):**

- Dashboard: <https://resend.com/emails>
- Vérifier emails apparaissent dans logs

### 7. Page Success `/fr/reserver/success`

- [ ] **Affichage**: Message "Réservation confirmée !" visible
- [ ] **Session ID**: Query param `?session_id=cs_...` présent
- [ ] **CTA**: Boutons "Retour accueil" et "Voir calendrier" fonctionnent

---

## 🔄 Flow Complet (Scénario Idéal)

1. **User visite** `/fr/reserver?atelier=1`
2. **User remplit** formulaire (nom, email, participants, date)
3. **Submit** → POST `/api/reservations` → Réservation créée (`status='pending'`, `id=123`)
4. **Frontend** → POST `/api/stripe/checkout` avec `reservationId=123`
5. **Backend** → Stripe API crée session → Retour `session.url`
6. **Redirect** → User sur Stripe Checkout
7. **User paie** carte test `4242...` → Paiement réussi
8. **Stripe webhook** → POST `/api/stripe/webhook` avec `checkout.session.completed`
9. **Backend** vérifie signature → Update DB `status='paid'` → Envoie 2 emails
10. **User redirigé** → `/fr/reserver/success?session_id=cs_...`
11. **Admin reçoit** email notification
12. **Client reçoit** email confirmation

---

## ⚠️ Prérequis Configuration

### Variables d'environnement (.env.local)

```bash
# ✅ OK
NEXT_PUBLIC_SUPABASE_URL=https://ibkexskorhrwnbgcdcrk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# ❌ MANQUANT - À ajouter
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
FROM_EMAIL=ImuLabs <noreply@imulabs.fr>
```

### Stripe Test Mode

1. Créer compte: <https://dashboard.stripe.com/register>
2. Mode Test: Toggle "Test mode" activé
3. API Keys: Developers → API keys → Reveal test key
4. Webhook: Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/stripe/webhook` (ou ngrok pour local)
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

### Resend

1. Créer compte: <https://resend.com/signup>
2. API Key: Settings → API Keys → Create
3. Domain (optionnel): Ajouter `imulabs.fr` pour emails depuis domaine custom

---

## 📊 Résultats Attendus

### Success (Tout fonctionne)

- ✅ Réservation créée DB avec `id=123`, `status='pending'`
- ✅ Stripe session créée, `stripe_session_id` sauvegardé
- ✅ User redirigé vers Stripe Checkout
- ✅ Paiement test réussi avec `4242...`
- ✅ Webhook déclenché, `status='paid'` updaté
- ✅ 2 emails envoyés (client + admin)
- ✅ User redirigé vers `/fr/reserver/success`

### Erreurs Possibles

- ❌ **400 Bad Request**: Validation Zod échoue (données invalides)
- ❌ **404 Not Found**: Réservation ou atelier inexistant
- ❌ **500 Server Error**: Supabase/Stripe/Resend API down
- ❌ **Webhook fail**: Signature invalide ou `STRIPE_WEBHOOK_SECRET` manquant
- ❌ **Email non envoyé**: `RESEND_API_KEY` manquant ou invalide

---

## 🛠️ Actions Immédiates

1. **[ ] Ajouter clés Stripe dans `.env.local`**
2. **[ ] Ajouter clé Resend dans `.env.local`**
3. **[ ] Tester POST `/api/reservations` avec curl**
4. **[ ] Tester POST `/api/stripe/checkout` avec curl**
5. **[ ] Installer Stripe CLI et forward webhook**
6. **[ ] Effectuer paiement test E2E complet**
7. **[ ] Vérifier emails reçus dans Resend dashboard**

---

## 📝 Notes de Test

### Test #1 - [Date: **/**]

- **Status:** ⏳ En attente / ✅ Réussi / ❌ Échec

- **Observations:**
  -

- **Erreurs rencontrées:**
  -

- **Actions correctives:**
  -

### Test #2 - [Date: **/**]

- **Status:**
- **Observations:**
- **Erreurs:**
- **Actions:**

---

## 🎯 Critères de Succès

Le flow E2E est considéré comme **VALIDÉ** si:

1. ✅ Réservation créée en DB (`status='pending'`)
2. ✅ Session Stripe créée et user redirigé
3. ✅ Paiement test réussi sur Stripe
4. ✅ Webhook reçu et signature validée
5. ✅ Status DB updaté à `paid`
6. ✅ 2 emails envoyés et reçus
7. ✅ User redirigé vers page success
8. ✅ Aucune erreur 500 dans logs serveur
9. ✅ Build production passe sans warnings

---

**Dernière mise à jour:** 15 décembre 2025  
**Responsable:** Nathan Imogo  
**Prochain test:** Ajouter clés API et effectuer test complet
