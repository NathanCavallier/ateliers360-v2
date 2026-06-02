# 📊 Analyse: Types d'Ateliers et Flux de Réservation

## 1. État Actuel - Colonne `type` Existante ✅

### Infrastructure déjà en place

La colonne `type` **existe déjà** dans la table `ateliers` et est opérationnelle:

```typescript
// src/lib/types.ts - Workshop type
type?: "workshop" | "module" | "pack" | null;

// src/lib/types.ts - WorkshopDB type  
type?: "workshop" | "module" | "pack" | null;
sequence_order?: number | null;
```

### Fonctions de filtrage

```typescript
// src/lib/supabase.ts
export async function getWorkshopsByType(
    type: "workshop" | "module" | "pack"
): Promise<Database["public"]["Tables"]["ateliers"]["Row"][]>
```

### Pages utilisant les types

- `/[locale]/ateliers/page.tsx` → affiche tous les ateliers
- `/[locale]/modules/page.tsx` → appelle `getWorkshopsByType("module")`  
- `/[locale]/stages/page.tsx` → affiche les stages (probablement pack?)
- `/[locale]/packs/page.tsx` → probablement `getWorkshopsByType("pack")`

### État de la base de données

⚠️ **À vérifier**: Les ateliers existants ont-ils déjà une valeur dans la colonne `type`?

- Besoin d'exécuter: `SELECT id, titre, type FROM ateliers;` dans Supabase
- Si `type` est NULL pour tous, il faut une migration

---

## 2. Colonne `categorie` Existante ✅

Migration appliquée: `docs/migration-add-categorie.sql`

```sql
ALTER TABLE ateliers ADD COLUMN IF NOT EXISTS categorie TEXT;
CHECK (categorie IN ('Sciences', 'Robotique', 'Programmation', 'IA', 'Ingénierie', 'Physique', 'Technologie'))
```

**Distinction importante**:

- `type` = Nature de l'atelier (atelier/pack/module)
- `categorie` = Domaine pédagogique (Robotique, IA, etc.)

---

## 3. Table `reservations` - Structure Complète

### Colonnes

```sql
id              BIGINT (PK)
atelier_id      BIGINT (FK → ateliers)
email           TEXT
nom             TEXT
etablissement   TEXT (optional)
adresse         TEXT (optional)
participants_count NUMBER
date_atelier    TEXT (YYYY-MM-DD)
status          TEXT (pending|confirmed|paid|completed)
stripe_session_id TEXT (optional)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Limitation critique

**Une réservation = Un seul atelier**

- Pas de réservations multiples dans une même transaction
- Clients doivent faire N réservations pour N ateliers
- Pas de table junction `reservation_items`

---

## 4. Flux de Réservation Actuel - Vue Complète

### 4.1. Pages d'accueil → Page réservation

```
Homepage (page.tsx)
├─ Lien "Découvrez nos ateliers" → /ateliers
├─ Lien "Nos modules" → /modules
├─ Lien "Nos stages" → /stages
└─ Lien "Nos packs" → /packs
    ↓
Page détails (/ateliers/[slug]/page.tsx)
├─ 3x Bouton "Réserver" → /reserver?atelier={id}
└─ Toutes les pages permettent link vers /reserver?atelier={id}
    ↓
Page réservation (/reserver/page.tsx)
└─ ReservationForm component
```

### 4.2. ReservationForm - Étapes

**Frontend validation** (Zod schema):

```typescript
atelier_id: string (required)
nom: string (min 2 chars)
email: string (valid email)
etablissement: string (optional)
adresse: string (optional)
participants_count: number (1-50)
date_atelier: Date (calendar picker)
message: string (optional)
cgv_accepted: boolean (required)
```

**Étape 1: POST /api/reservations**

- Validation Zod
- Insert dans table `reservations` avec status='pending'
- Retourne: `{ success: true, reservation }`

**Étape 2: POST /api/stripe/checkout**

- Input: `{ reservationId }`
- Output: `{ url }` (checkout session URL)
- **Status: À implémenter** ⚠️

**Étape 3: Redirection Stripe**

- `window.location.href = url` (Stripe checkout page)
- Client paie
- Webhook Stripe appelle callback (à confirmer)

**Étape 4: Post-paiement** ⚠️

- Status reservation devient 'paid'
- Email envoi confirmation client
- Données sauvegardées dans Supabase ✓

---

## 5. Diagnostique du Flux de Réservation

### ✅ Implémenté

1. Frontend: ReservationForm avec validation complète
2. API: POST /api/reservations route
3. Database: Table reservations avec structure appropriée
4. Supabase: createReservation(), updateReservationStatus()
5. Routing: Query params (?atelier={id}) pour pré-remplir

### ⚠️ À implémenter / À vérifier

1. **POST /api/stripe/checkout route** - Créer session Stripe
2. **Webhook Stripe** - Recevoir confirmations paiement
3. **Email templates** - Confirmation/remerciement après paiement
4. **Stripe API keys** - Vérifier .env variables
5. **Récupération prix** - ReservationForm ne récupère pas le tarif de l'atelier

### 🔴 Limitations connues

1. **Pas de réservations multiples** - Une réservation = 1 atelier
2. **Pas de récupération du prix** - Comment le tarif est transmis à Stripe?
3. **Pas de gestion des crédits** - Si paiement échoue, comment gérer?
4. **Données clients minimalistes** - Pas de téléphone, pas de structure détaillée

---

## 6. Recommandations d'Amélioration

### Priority 1 - Critique (Bloquer flux)

1. **Créer `/api/stripe/checkout` route**
   - Récupérer reservation + atelier (pour prix)
   - Créer Stripe CheckoutSession
   - Sauvegarder session ID dans reservations
   - Retourner checkout URL

2. **Implémenter webhook Stripe**
   - Endpoint: `POST /api/stripe/webhook`
   - Événements: `checkout.session.completed`
   - Actions: Mettre status='paid', envoyer email

3. **Ajouter email envoi**
   - Template confirmation après paiement
   - Template rappel 24h avant atelier
   - Utiliser service email (Resend, SendGrid, etc.)

### Priority 2 - Important (UX)

1. **Support réservations multiples**
   - Créer table `reservation_items` (N-1 avec reservations)
   - Modifier ReservationForm pour multi-select
   - Calculer total: Σ(atelier.tarif * participants_count)

2. **Améliorer données client**
   - Ajouter champs: `telephone`, `fonction`, `statut`
   - Rendre établissement requis pour écoles
   - Ajouter optionnel: `date_accueil`, `commentaires`

3. **Dashboard admin**
   - Lister réservations
   - Filtrer par statut/date/atelier
   - Export CSV
   - Voir détails client + paiement

### Priority 3 - Nice-to-have

1. **Panier réservation** - Sauvegarder ateliers sélectionnés côté client
2. **Code promo** - Support réductions/coupons
3. **Notifications email**  - À responsable structure
4. **Analytics** - Suivi conversions, dropoff points

---

## 7. Vérifications Nécessaires

Avant d'avancer, exécuter dans Supabase SQL Editor:

```sql
-- 1. Vérifier colonne type
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ateliers' AND column_name = 'type';

-- 2. Voir état type pour tous les ateliers
SELECT id, titre, type, sequence_order FROM ateliers;

-- 3. Compter par type
SELECT type, COUNT(*) FROM ateliers GROUP BY type;

-- 4. Vérifier colonne categorie
SELECT DISTINCT categorie FROM ateliers;

-- 5. État réservations actuelles
SELECT COUNT(*), status FROM reservations GROUP BY status;
```

---

## 8. Actions Prochaines (Priorisation)

### Immédiat (Session actuelle)

- [ ] Créer migration pour assurer colonne `type` (si NULL actuellement)
- [ ] Vérifier Stripe API keys dans .env
- [ ] Implémenter `/api/stripe/checkout` route
- [ ] Tester flux entier: Form → Reservation → Stripe → Webhook

### Court terme (1-2 jours)

- [ ] Implémenter webhook Stripe
- [ ] Ajouter templates email
- [ ] Dashboard réservations admin basique
- [ ] Tester sur données réelles

### Moyen terme (1 semaine)

- [ ] Support réservations multiples
- [ ] Améliorer champs formulaire
- [ ] Page confirmation post-paiement
- [ ] Analytics tracking

---

## 9. Architecture Recommendation

### Pour réservations multiples (futur)

```sql
-- Nouvelle table
CREATE TABLE reservation_items (
  id BIGINT PRIMARY KEY,
  reservation_id BIGINT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  atelier_id BIGINT NOT NULL REFERENCES ateliers(id),
  participants_count INT NOT NULL,
  price_eur DECIMAL(10, 2) NOT NULL, -- Prix capturé au moment réservation
  created_at TIMESTAMP DEFAULT now()
);

-- Modification reservations
ALTER TABLE reservations 
  DROP COLUMN atelier_id,  -- Supprime l'ancien lien 1-1
  ADD COLUMN total_price_eur DECIMAL(10, 2),
  ADD COLUMN total_participants INT;
```

### Client-side state management

```typescript
type CartItem = {
  atelier_id: number;
  titre: string;
  participants_count: number;
  price_eur: number;
};

const [cart, setCart] = useState<CartItem[]>([]);
const total = cart.reduce((sum, item) => 
  sum + (item.price_eur * item.participants_count), 0
);
```

---

**Dernière mise à jour**: 10 mai 2026
