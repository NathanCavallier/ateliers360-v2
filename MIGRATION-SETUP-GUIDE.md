# 🚀 Guide d'Exécution - Flux de Réservation & Colonne Type

## 📋 Table des matières

1. [Migrations à exécuter](#migrations)
2. [Variables d'environnement](#env)
3. [Vérification de la base de données](#bd)
4. [Test du flux complet](#test)
5. [Troubleshooting](#troubleshooting)

---

## <a name="migrations"></a>1️⃣ Migrations à exécuter

### Étape 1 : Exécuter les migrations dans Supabase

Connectez-vous à **Supabase Studio** et exécutez ces migrations **dans cet ordre** :

#### A. Créer la colonne `type` et la peupler

**Fichier** : `src/app/migrations/2026_05_12_populate_atelier_types.sql`

Copier-coller tout le fichier dans Supabase SQL Editor et exécuter.

```sql
-- Résumé des actions :
-- 1. Ajoute colonne 'type' avec DEFAULT 'workshop'
-- 2. Ajoute colonne 'sequence_order' pour l'ordre d'affichage
-- 3. Ajoute constraint CHECK (type IN ('workshop', 'module', 'pack'))
-- 4. Peuple les ateliers existants
-- 5. Crée des indexes pour optimiser les requêtes
```

**Vérifier l'exécution** :

```sql
SELECT id, titre, type, sequence_order FROM ateliers LIMIT 10;
-- Devrait afficher : type = 'workshop' pour tous
```

#### B. Créer les migrations pour les formulaires (si pas déjà fait)

Exécuter dans cet ordre :

1. `src/app/migrations/2026_05_07_create_structure_requests.sql` - Formulaire contact
2. `src/app/migrations/2026_05_07_create_contact_form.sql` - Table contact alternative

#### C. Insérer les données de test (OPTIONNEL)

**Fichier** : `docs/db/08_ateliers_with_types_seeds.sql`

Copier-coller pour ajouter :

- 6 workshops (ateliers classiques)
- 2 modules (formations longues)
- 3 packs (bundles)

```sql
-- Cela va INSÉRER de nouveaux ateliers, ne remplace pas les existants
INSERT INTO ateliers (...) VALUES (...);
```

**Vérifier l'insertion** :

```sql
SELECT type, COUNT(*) as count FROM ateliers GROUP BY type;
-- Résultat attendu :
-- workshop | X
-- module   | Y
-- pack     | Z
```

---

## <a name="env"></a>2️⃣ Variables d'environnement requises

### Fichier : `.env.local` (à créer à la racine du projet)

```bash
# ===========================
# SUPABASE (Client-side)
# ===========================
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===========================
# SUPABASE (Server-side)
# ===========================
# Récupérez ces valeurs de Supabase Settings → API
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # ⚠️ SECRET - À SÉCURISER

# ===========================
# EMAIL (Optional mais recommandé pour confirmations)
# ===========================
FROM_EMAIL=noreply@ateliers360.fr
FROM_EMAIL_ADMIN=admin@ateliers360.fr
ADMIN_EMAIL=admin@ateliers360.fr

# Optional : dedicated routing addresses for contact/request types
CAVALIER_STUDIO_EMAIL=cavalierstudio@ateliers360.fr
DEMO_EMAIL=demo@ateliers360.fr
BUSINESS_INQUIRY_EMAIL=entreprises@ateliers360.fr
SCHOOLS_EMAIL=ecoles@ateliers360.fr
STRUCTURES_EMAIL=structures@ateliers360.fr
RESERVATIONS_EMAIL=reservations@ateliers360.fr
QUOTES_EMAIL=devis@ateliers360.fr
PASSERELLE_JEUNESSE_EMAIL=passerelle@ateliers360.fr
ATELIERS_EMAIL=ateliers@ateliers360.fr

# Optionnel : envoyer email de confirmation au client
SEND_CONFIRMATION_EMAIL=true

# Email provider (par défaut: Resend)
RESEND_API_KEY=re_XXXXX

# ===========================
# STRIPE (Paiement)
# ===========================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ===========================
# ADMIN
# ===========================
ADMIN_EMAIL=admin@ateliers360.fr

# ===========================
# ANALYTICS (Optionnel)
# ===========================
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXX
```

### ⚠️ Sécurité

**NE JAMAIS commit les variables secrets !**

```bash
# .gitignore (vérifier que c'est inclus)
.env
.env.local
.env.*.local
```

### Comment récupérer les clés Supabase ?

1. Aller sur **Supabase Studio** → **Settings** → **API**
2. Copier :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️

---

## <a name="bd"></a>3️⃣ Vérification de la base de données

### Vérifier que les tables existent

```sql
-- Exécuter dans Supabase SQL Editor

-- 1. Table ateliers
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'ateliers'
ORDER BY ordinal_position;
-- Devrait inclure : id, titre, type, sequence_order, categorie, ...

-- 2. Table reservations
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'reservations'
ORDER BY ordinal_position;
-- Devrait inclure : id, atelier_id, email, nom, status, stripe_session_id, ...

-- 3. Table structure_requests
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'structure_requests'
ORDER BY ordinal_position;
-- Devrait inclure : id, structure_name, contact_name, email, message, status, ...

-- 4. Vérifier les indexes
SELECT indexname FROM pg_indexes
WHERE tablename IN ('ateliers', 'reservations', 'structure_requests')
ORDER BY indexname;
```

### Vérifier les données d'exemple

```sql
-- Ateliers
SELECT COUNT(*) as total,
       COUNT(CASE WHEN type='workshop' THEN 1 END) as workshops,
       COUNT(CASE WHEN type='module' THEN 1 END) as modules,
       COUNT(CASE WHEN type='pack' THEN 1 END) as packs
FROM ateliers;

-- Réservations (devrait être vide au début)
SELECT COUNT(*) FROM reservations;

-- Requêtes de contact (devrait être vide au début)
SELECT COUNT(*) FROM structure_requests;
```

---

## <a name="test"></a>4️⃣ Test du flux complet

### 🧪 Test 1 : Formulaire de Contact

1. **Aller à** : `http://localhost:3000/fr/contact`
2. **Remplir le formulaire** :
   - Nom : "Jean Dupont"
   - Email : "<jean@example.com>"
   - Établissement : "École XYZ"
   - Rôle : "Directeur"
   - Message : "Nous aimerions organiser un atelier"
3. **Soumettre**
4. **Vérifier** :
   - Toast de succès devrait s'afficher
   - Console browser : pas d'erreur
   - Terminal du serveur : logs indiquant l'insertion

**Vérifier en BD** :

```sql
SELECT * FROM structure_requests ORDER BY created_at DESC LIMIT 1;
-- Devrait voir l'enregistrement avec status='new'
```

### 🧪 Test 2 : Flux de Réservation

#### Étape 1 : Page d'accueil

```bash
http://localhost:3000/fr
```

- Voir les ateliers listés
- Cliquer sur "Réserver" d'un atelier

#### Étape 2 : Page de réservation

```bash
http://localhost:3000/fr/reserver?atelier=1
```

**Console browser** :

- Vérifier que les ateliers se chargent (pas d'erreur)
- Voir les options dans le dropdown

#### Étape 3 : Remplir le formulaire

```
Atelier : [Sélectionner un atelier]
Nom : Jean Dupont
Email : jean@example.com
Établissement : École XYZ (optionnel)
Adresse : 123 Rue de Paris (optionnel)
Participants : 2
Date : [Sélectionner une date]
Message : [Optionnel]
✓ J'accepte les CGV
```

#### Étape 4 : Soumettre

1. Cliquer "Réserver"
2. **Terminal du serveur** : Vous devriez voir :

   ```
   Reservation created successfully: { id: 42, atelier_id: 1, nom: "Jean Dupont", status: "pending", ... }
   ```

3. **Redirect vers Stripe** (ou écran Stripe de test)
4. **Supabase BD** : Vérifier l'insertion

   ```sql
   SELECT * FROM reservations ORDER BY created_at DESC LIMIT 1;
   -- Devrait voir : status='pending', stripe_session_id=null (tant que pas payé)
   ```

#### Étape 5 : Annuler le paiement Stripe

- Cliquer "Cancel" sur Stripe
- Devrait retourner à `/fr/reserver?atelier=1&canceled=true`
- Voir un message d'erreur ou d'annulation

**Vérifier en BD** : La réservation devrait rester avec `status='pending'`

#### Étape 6 : Simuler un paiement complet (optionnel, hors scope)

- Utiliser les cartes de test Stripe : `4242 4242 4242 4242`
- Simuler le webhook Stripe pour confirmer le paiement

---

## <a name="troubleshooting"></a>5️⃣ Troubleshooting

### ❌ Problème : "Supabase client not initialized"

**Cause** : Variables d'env `NEXT_PUBLIC_SUPABASE_URL` ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` manquantes

**Solution** :

```bash
# Vérifier le .env.local
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Redémarrer le serveur
# Ctrl+C dans le terminal
npm run dev
```

### ❌ Problème : "Supabase admin client not initialized"

**Cause** : Variables d'env server-side manquantes (`SUPABASE_SERVICE_ROLE_KEY`)

**Solution** :

```bash
# Vérifier le .env.local
echo $SUPABASE_SERVICE_ROLE_KEY

# Doit être défini ET différent de ANON_KEY
# Redémarrer le serveur
```

### ❌ Problème : "Database error" lors de la réservation

**Cause** :

- RLS policies bloquent l'insertion
- Colonne `type` manquante
- Autre erreur de schéma

**Solution** :

```bash
# 1. Vérifier le terminal du serveur pour logs détaillés
# 2. Exécuter la migration populate_atelier_types
# 3. Vérifier que supabaseAdmin est bien initialisé
# 4. Vérifier les RLS policies en Supabase
```

### ❌ Problème : Formulaire de contact ne sauvegarde pas

**Cause** : `SUPABASE_SERVICE_ROLE_KEY` manquante ou table `structure_requests` n'existe pas

**Solution** :

```bash
# 1. Exécuter la migration create_structure_requests.sql
# 2. Vérifier que SUPABASE_SERVICE_ROLE_KEY est défini
# 3. Redémarrer le serveur
```

### ✅ Problème : Voir les logs détaillés

```bash
# Terminal 1 : Démarrer le serveur en debug
DEBUG=* npm run dev

# Terminal 2 : Consulter les logs
tail -f .next/server.log
```

---

## 📊 Checklist de fin de setup

- [ ] Migrations SQL exécutées dans Supabase
- [ ] Variables d'env dans `.env.local`
- [ ] Redémarrage du serveur de développement
- [ ] Test formulaire contact : entrée enregistrée en BD
- [ ] Test réservation : atelier sélectionné, formulaire rempli
- [ ] Vérification BD : réservation créée avec `status='pending'`
- [ ] Console browser : pas d'erreurs
- [ ] Terminal serveur : logs d'insertion réussis
- [ ] Pages `/modules` et `/packs` affichent les bons types

---

## 🚀 Production - Points importants

1. **Sécurité** :
   - Jamais commit `.env.local`
   - Stocker `SUPABASE_SERVICE_ROLE_KEY` comme secret dans CI/CD

2. **Base de données** :
   - Sauvegarder avant migration
   - Tester migrations sur branche dev d'abord

3. **Emails** :
   - Configurer provider d'email (Resend, SendGrid, etc.)
   - Tester envoi avant go live

4. **Stripe** :
   - Passer en mode production (clés Live)
   - Configurer les webhooks en production

5. **Monitoring** :
   - Surveiller les erreurs API
   - Monitoring erreurs base de données
   - Logs d'audit pour les réservations

---

## 📞 Support & Debug

### Logs détaillés à vérifier

**Client-side** (Browser Console) :

```javascript
// F12 → Console
// Rechercher les erreurs rouges
```

**Server-side** (Terminal) :

```bash
# Rechercher les logs d'API
console.log('Reservation created successfully...')
console.error('Error creating reservation...')
```

**Base de données** (Supabase) :

```sql
-- Vérifier les insertions
SELECT * FROM reservations ORDER BY created_at DESC;
SELECT * FROM structure_requests ORDER BY created_at DESC;
SELECT * FROM ateliers WHERE type='workshop' LIMIT 5;
```

---

## ✨ Résultat attendu

Après avoir suivi ce guide, vous devriez avoir :

✅ Colonnes `type` et `sequence_order` ajoutées à `ateliers`
✅ Formulaire de contact qui sauvegarde les données
✅ Flux de réservation complet (du formulaire au Stripe)
✅ Pages `/modules` et `/packs` qui affichent les bons types
✅ BD proprement structurée avec indexes et constraints
✅ Logs détaillés pour déboguer

**Prochaines étapes** :

- Ajouter validation côté client pour améliorer UX
- Implémenter système de confirmation d'email
- Ajouter gestion des disponibilités/places
- Créer admin panel pour gérer les réservations
