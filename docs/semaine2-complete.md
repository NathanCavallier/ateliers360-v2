# 📦 Semaine 2 — Détails Ateliers, Paiement Stripe & Emails

**Date** : 14 Déc 2025  
**Propriétaire** : Nathan Imogo  
**Statut** : ✅ **COMPLÉTÉE**

---

## 🎯 Objectifs de la Semaine 2

- ✅ Finaliser la page de détail des ateliers
- ✅ Intégrer le système de paiement Stripe
- ✅ Configurer l'envoi d'emails automatiques
- ✅ Optimiser le SEO avec métadonnées et schema.org

---

## 📋 Réalisations

### 1. Page de Détail Atelier (`/atelier/[slug]`)

**Fichier** : `/src/app/[locale]/atelier/[slug]/page.tsx`

#### Fonctionnalités implémentées :
- ✅ Affichage complet des informations de l'atelier (titre, description, objectifs, matériel)
- ✅ Section "Prochaines sessions" avec CTA de réservation
- ✅ Sidebar avec CTA multiples (réservation, devis, contact)
- ✅ Section "Vous aimerez peut-être aussi" avec ateliers similaires
- ✅ Métadonnées SEO enrichies (OpenGraph, Twitter Cards)
- ✅ Données structurées JSON-LD (schema.org) pour le référencement
- ✅ Support multilingue (FR/EN)

#### SEO & Métadonnées :
```typescript
// Métadonnées enrichies
{
  title: `${workshop.titre} | Ateliers 360`,
  title: `${workshop.titre} | Ateliers 360`,
  description: workshop.description.substring(0, 160),
  keywords: ['atelier STEM', 'robotique', ...],
  openGraph: { ... },
  twitter: { ... },
  alternates: { canonical, languages: { en, fr } }
}

// JSON-LD Schema.org
{
  '@type': 'EducationalEvent',
  name, description, duration, offers, organizer, audience
}
```

---

### 2. API Routes & Réservations

#### 2.1 API Réservations (`/api/reservations/route.ts`)

**Méthode** : `POST`

**Validation** : Zod schema

**Fonctionnalités** :
- ✅ Création de réservation dans Supabase
- ✅ Validation des données (email, nom, date, participants)
- ✅ Retour de l'ID de réservation pour le paiement

**Exemple de payload** :
```json
{
  "atelier_id": 1,
  "nom": "Jean Dupont",
  "email": "jean@example.com",
  "etablissement": "Collège Victor Hugo",
  "participants_count": 25,
  "date_atelier": "2025-01-15"
}
```

---

### 3. Intégration Stripe

#### 3.1 Configuration Stripe (`/src/lib/stripe.ts`)

**Fonctions créées** :
- `createCheckoutSession()` : Crée une session de paiement Stripe
- `getCheckoutSession()` : Récupère une session existante
- `constructWebhookEvent()` : Vérifie les webhooks Stripe

**Paramètres requis** :
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 3.2 API Checkout (`/api/stripe/checkout/route.ts`)

**Méthode** : `POST`

**Flux** :
1. Récupère la réservation depuis Supabase
2. Crée une session Stripe Checkout
3. Met à jour la réservation avec l'ID de session
4. Retourne l'URL de paiement

**Exemple de réponse** :
```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

#### 3.3 Webhook Stripe (`/api/stripe/webhook/route.ts`)

**Événements gérés** :
- `checkout.session.completed` : Marque la réservation comme payée
- `payment_intent.succeeded` : Confirmation du paiement
- `payment_intent.payment_failed` : Échec du paiement

**Actions après paiement** :
1. Mise à jour du statut de la réservation (`status = 'paid'`)
2. Envoi d'email de confirmation au client
3. Envoi de notification à l'admin

---

### 4. Système d'Emails

#### 4.1 Configuration Email (`/src/lib/email.ts`)

**Service utilisé** : Resend (recommandé) ou SendGrid

**Paramètres requis** :
```env
RESEND_API_KEY=re_...
FROM_EMAIL=Ateliers 360 <noreply@ateliers360.fr>
ADMIN_EMAIL=nathan@ateliers360.fr
```

#### 4.2 Templates d'Emails

**Email de confirmation client** :
- Template HTML responsive
- Détails de la réservation (atelier, date, participants)
- Prochaines étapes
- Coordonnées de contact

**Email de notification admin** :
- Alerte de nouvelle réservation
- Informations du client
- Détails de la réservation
- Action requise (contacter sous 48h)

#### 4.3 Fonctions créées :
- `sendEmail()` : Envoi générique via Resend
- `sendReservationConfirmation()` : Confirmation au client
- `sendAdminNotification()` : Notification admin
- `getReservationConfirmationEmail()` : Template client
- `getAdminNotificationEmail()` : Template admin

---

### 5. Formulaire de Réservation

#### Mise à jour (`/src/components/reservations/ReservationForm.tsx`)

**Nouveau flux** :
1. Validation du formulaire (Zod + react-hook-form)
2. Création de la réservation (`POST /api/reservations`)
3. Création de la session Stripe (`POST /api/stripe/checkout`)
4. Redirection vers la page de paiement Stripe
5. Après paiement → Redirection vers `/reserver/success`

**Gestion des erreurs** :
- Validation en temps réel
- Messages d'erreur traduits
- État de chargement pendant la soumission

---

### 6. Page de Succès

**Fichier** : `/src/app/[locale]/reserver/success/page.tsx`

**Fonctionnalités** :
- ✅ Message de confirmation avec icône de succès
- ✅ Affichage des prochaines étapes
- ✅ Référence de paiement (session ID)
- ✅ CTA vers autres ateliers ou accueil

---

### 7. Optimisations SEO

#### 7.1 Sitemap Dynamique (`/src/app/sitemap.ts`)

**Pages incluses** :
- Pages statiques (accueil, contact, tarifs, etc.)
- Pages d'ateliers dynamiques (depuis Supabase)
- Articles de blog (depuis Supabase)
- Versions EN et FR de toutes les pages

**Fréquence de mise à jour** :
- Accueil : weekly
- Ateliers : monthly
- Blog : monthly

#### 7.2 Robots.txt (`/src/app/robots.ts`)

**Configuration** :
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /reserver/success
Sitemap: https://ateliers360.fr/sitemap.xml
```

---

## 🔧 Configuration Requise

### Variables d'Environnement (`.env.local`)

```env
# Supabase (déjà configuré)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Stripe (nouveau)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (nouveau)
RESEND_API_KEY=re_...
FROM_EMAIL=Ateliers 360 <noreply@ateliers360.fr>
ADMIN_EMAIL=nathan@ateliers360.fr
```

### Dépendances Installées

```bash
npm install stripe zod @hookform/resolvers
```

---

## 🚀 Comment Tester

### 1. Configuration Stripe (Mode Test)

1. Créer un compte Stripe : https://dashboard.stripe.com
2. Aller dans **Developers → API keys**
3. Copier les clés de test (pk_test_... et sk_test_...)
4. Ajouter dans `.env.local`

### 2. Configuration Webhook Stripe

**Option A : Stripe CLI (développement local)**
```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Connecter
stripe login

# Écouter les webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copier le webhook secret (whsec_...) dans .env.local
```

**Option B : Ngrok (alternative)**
```bash
ngrok http 3000
# Copier l'URL https://xxx.ngrok.io
# Créer un webhook dans Stripe Dashboard pointant vers https://xxx.ngrok.io/api/stripe/webhook
```

### 3. Configuration Resend

1. Créer un compte : https://resend.com
2. Générer une API key
3. Ajouter dans `.env.local`

### 4. Test de Réservation End-to-End

```bash
# Démarrer le serveur
npm run dev

# Ouvrir http://localhost:3000/fr

# 1. Aller sur un atelier
# 2. Cliquer "Réserver cet atelier"
# 3. Remplir le formulaire
# 4. Utiliser carte de test Stripe : 4242 4242 4242 4242
# 5. Date : n'importe quelle date future
# 6. CVC : 123
# 7. Valider → Redirection vers page de succès
# 8. Vérifier emails reçus (si Resend configuré)
```

### Cartes de Test Stripe

| Carte | Résultat |
|-------|----------|
| `4242 4242 4242 4242` | Paiement réussi |
| `4000 0000 0000 0002` | Échec (carte refusée) |
| `4000 0000 0000 9995` | Paiement insuffisant |

---

## 📊 Statistiques du Build

```
Build réussi : ✅
Routes créées : 26
Taille totale : ~102 kB (shared JS)
Pages dynamiques : 3
  - /[locale]/atelier/[slug]
  - /[locale]/blog/[slug]
  - /[locale]/reserver

Fichiers API : 3
  - POST /api/reservations
  - POST /api/stripe/checkout
  - POST /api/stripe/webhook
```

---

## 🐛 Problèmes Résolus

1. **Build Error** : Import de Stripe causant des erreurs sans .env
   - **Solution** : Import conditionnel dans le webhook

2. **Conflit de routes** : `/app/page.tsx` vs `localePrefix: 'always'`
   - **Solution** : Suppression de `/app/page.tsx`

3. **TypeScript Errors** : Types Supabase manquants
   - **Solution** : Ajout de `as any` pour les champs `updated_at`

---

## 📈 Prochaines Étapes (Semaine 3)

- [ ] Créer le backoffice admin (`/admin`)
- [ ] Dashboard avec statistiques
- [ ] Liste des réservations avec filtres
- [ ] CRUD des ateliers
- [ ] Export CSV des réservations
- [ ] Gestion des événements/créneaux

---

## 📝 Notes Importantes

### Sécurité
- ⚠️ Ne jamais commiter `.env.local` dans Git
- ✅ Utiliser `.env.example` comme template
- ✅ Valider toutes les entrées avec Zod
- ✅ Vérifier les signatures Stripe webhooks

### Performance
- Images optimisées avec Next.js Image component
- Pages statiques générées au build
- Lazy loading des composants

### Conformité RGPD
- Emails conformes (lien désinscription)
- Données chiffrées en transit (HTTPS)
- Politique de confidentialité créée
- Consentement parental pour mineurs

---

**Temps total** : ~6 heures  
**Status final** : ✅ **SEMAINE 2 COMPLÉTÉE**
