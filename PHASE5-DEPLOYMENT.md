# Phase 5 — Systèmes Backend — Guide Déploiement

## 📋 Checklist de Configuration

### 1️⃣ Supabase — Créer la Table

**Dans Supabase Dashboard → SQL Editor:**

```sql
-- Créer la table mission_requests
CREATE TABLE mission_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guardian_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  young_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 6 AND age <= 25),
  dates TEXT NOT NULL,
  departure TEXT NOT NULL,
  arrival TEXT NOT NULL,
  details TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'completed', 'cancelled')),
  stripe_session_id TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Créer les indexes pour les requêtes fréquentes
CREATE INDEX idx_mission_requests_email ON mission_requests(email);
CREATE INDEX idx_mission_requests_status ON mission_requests(status);
CREATE INDEX idx_mission_requests_created_at ON mission_requests(created_at DESC);

-- Ajouter les permissions RLS (Row Level Security) si nécessaire
ALTER TABLE mission_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Team can view all
CREATE POLICY "Team can view all missions" ON mission_requests
  FOR SELECT USING (true);

-- Policy: Users can view their own
CREATE POLICY "Users can view own missions" ON mission_requests
  FOR SELECT USING (auth.email() = email);

-- Policy: Service role can insert
CREATE POLICY "Service role inserts missions" ON mission_requests
  FOR INSERT WITH CHECK (true);
```

**Exécuter:**
- Copier le SQL
- Coller dans SQL Editor
- Cliquer "Run"
- Vérifier: `SELECT COUNT(*) FROM mission_requests;` → 0

---

### 2️⃣ Stripe — Configurer le Webhook

**Dans Stripe Dashboard:**

1. Allez à **Developers → Webhooks**
2. Cliquez **Add endpoint**
3. **Endpoint URL**: `https://www.ateliers360.fr/api/missions/webhook`
4. **Select events**:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Cliquez **Add endpoint**
6. Cliquez sur l'endpoint créé
7. Copiez le **Signing secret** (commence par `whsec_`)

**Ajouter à `.env.local`:**
```bash
STRIPE_WEBHOOK_SECRET=whsec_xxx...
```

---

### 3️⃣ Resend — Vérifier la Clé API

**Dans Resend Dashboard:**

1. Allez à **API Keys**
2. Copiez la clé (commence par `re_`)
3. Vérifiez dans `.env.local`:
```bash
RESEND_API_KEY=re_xxx...
```

---

### 4️⃣ Environment Variables — `.env.local` Complet

```bash
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhb...

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx...

# Resend Email
RESEND_API_KEY=re_xxx...
FROM_EMAIL=noreply@ateliers360.fr

# Passerelle Jeunesse Config
PASSERELLE_TEAM_EMAIL=contact@ateliers360.fr
NEXT_PUBLIC_APP_URL=https://www.ateliers360.fr

# Next.js
NEXT_PUBLIC_APP_ENV=production
```

---

## 🚀 Déploiement

### Développement Local

```bash
cd /Users/nathanimogo/Dev/ateliers360/_core/platform-v2

# 1. Installer dépendances (si besoin)
npm install

# 2. Vérifier les types
npm run typecheck

# 3. Lancer le serveur
npm run dev

# 4. Tester le formulaire
# Allez à http://localhost:3000/fr/demander-mission
```

### Déploiement Production (AppHosting)

```bash
# 1. Vérifier les builds
npm run build

# 2. Déployer avec Azure AppHosting
azd up

# OU manuellement:
az apphosting service deploy --app-name ateliers360 --service-name platform-v2
```

---

## 🧪 Tests

### Test 1: Soumission Formulaire

1. **Allez à:** `http://localhost:3000/fr/demander-mission`
2. **Remplissez:**
   - Nom responsable: "Test Parent"
   - Email: `votre-email@example.com`
   - Téléphone: "0601020304"
   - Jeune: "Alice"
   - Âge: "14"
   - Dates: "Mercredis juin 2026, 14h-16h"
   - Départ: "Paris 15ème"
   - Arrivée: "Versailles"
   - Détails: "Test mission pour développement"
3. **Cliquez** "Soumettre la demande"
4. **Vérifiez:**
   - ✅ Message de succès s'affiche
   - ✅ Email de confirmation reçu (Resend)
   - ✅ Mission stockée en Supabase:
     ```sql
     SELECT * FROM mission_requests
     WHERE email = 'votre-email@example.com'
     ORDER BY created_at DESC LIMIT 1;
     ```

### Test 2: Vérifier la Table Supabase

```sql
-- Vérifier les colonnes
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'mission_requests';

-- Vérifier une mission
SELECT id, guardian_name, email, young_name, status, created_at
FROM mission_requests
ORDER BY created_at DESC
LIMIT 5;

-- Vérifier les indexes
SELECT indexname FROM pg_indexes
WHERE tablename = 'mission_requests';
```

### Test 3: Vérifier les Emails

**Resend Test:**
```bash
# Allez à https://resend.com/emails
# Vérifiez que les emails s'affichent dans "Emails"
```

**Email Guardian:**
- Subject: "Votre demande de mission Passerelle Jeunesse - Confirmation"
- Contient: Mission details, next steps, CTA

**Email Team:**
- Subject: "[NOUVELLE MISSION] Test Parent - Alice"
- Contient: Tous les détails de la demande

### Test 4: Vérifier l'API (cURL)

```bash
# Test création mission
curl -X POST http://localhost:3000/api/missions/create \
  -H "Content-Type: application/json" \
  -d '{
    "guardianName": "Test",
    "email": "test@example.com",
    "phone": "0601020304",
    "youngName": "Alice",
    "age": 14,
    "dates": "Juin 2026",
    "departure": "Paris",
    "arrival": "Versailles",
    "details": "Test mission"
  }'

# Réponse attendue:
# {
#   "success": true,
#   "missionId": "uuid-xxxx",
#   "message": "Votre demande a été reçue..."
# }
```

---

## 🔍 Troubleshooting

### Email non reçu

**Vérifications:**
- [ ] `RESEND_API_KEY` présent dans `.env.local`
- [ ] `FROM_EMAIL` configuré (`noreply@ateliers360.fr`)
- [ ] Vérifier les logs Resend dashboard
- [ ] Vérifier le dossier spam

### Stripe webhook ne déclenche pas

**Vérifications:**
- [ ] `STRIPE_WEBHOOK_SECRET` correct
- [ ] Endpoint HTTPS (pas HTTP)
- [ ] Vérifier les logs Stripe dashboard → Webhooks → Eventsleur
- [ ] Tester avec Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/missions/webhook
stripe trigger payment_intent.succeeded
```

### Mission non stockée en Supabase

**Vérifications:**
- [ ] Table `mission_requests` existe
- [ ] `SUPABASE_SERVICE_ROLE_KEY` correct
- [ ] Pas d'erreur RLS (Row Level Security)
- [ ] Vérifier les logs: `supabaseAdmin.from('mission_requests').insert(...)`

### Erreur TypeScript

**Solution:**
```bash
npm run typecheck
# Corriger les erreurs affichées
npm run build
```

---

## 📊 Monitoring

### Dashboards

- **Supabase:** https://app.supabase.com → mission_requests table
- **Stripe:** https://dashboard.stripe.com → Payment status
- **Resend:** https://resend.com/emails → Email logs
- **Azure AppHosting:** Azure Portal → Logs

### Logs en Développement

```bash
# Terminal 1: Serveur Next.js
npm run dev

# Terminal 2: Stripe webhook local (optionnel)
stripe listen --forward-to localhost:3000/api/missions/webhook
```

---

## ✅ Checklist Finale

- [ ] Table `mission_requests` créée en Supabase
- [ ] Indexes créés
- [ ] Stripe webhook configuré
- [ ] `.env.local` complété avec tous les secrets
- [ ] Email de test reçu
- [ ] Mission test créée en Supabase
- [ ] Formulaire soumis avec succès
- [ ] Messages de succès/erreur affichés
- [ ] Redirection post-succès fonctionne
- [ ] Build compilation sans erreurs
- [ ] Prêt pour déploiement production

---

## 🎯 Phase 5 Complète ✅

**Statut:** ✅ Implémentation terminée
**Prochaine étape:** Phase 4 (Translations) OU Phase 5b (Analytics)
