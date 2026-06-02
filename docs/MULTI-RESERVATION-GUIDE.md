# Amélioration du flux de réservation - Documentation

## 📋 Résumé des changements

Cette mise à jour améliore significativement le flux de réservation en ajoutant la capacité de :

1. **Sélectionner plusieurs ateliers** dans une même réservation
2. **Sélectionner plusieurs dates** pour chaque atelier
3. **Rendu professionnel** avec calendrier multi-sélection
4. **Accès visible** vers la réservation et le calendrier sur tout le site

---

## 🎯 Nouveaux composants

### 1. **MultiDatePicker** (`src/components/reservations/MultiDatePicker.tsx`)

Composant de sélection de dates multiples avec calendrier professionnel.

**Caractéristiques:**

- Sélection de plusieurs dates simultanément
- Affichage des dates sélectionnées en badges
- Calendrier intégré avec support français
- Possibilité de désactiver certaines dates
- Interface intuitive avec validations

**Utilisation:**

```tsx
import { MultiDatePicker } from '@/components/reservations/MultiDatePicker';

<MultiDatePicker
  selectedDates={dates}
  onDatesChange={setDates}
  minDate={new Date()}
  placeholder="Sélectionner des dates..."
/>
```

### 2. **MultiWorkshopSelector** (`src/components/reservations/MultiWorkshopSelector.tsx`)

Composant de sélection multiple d'ateliers avec recherche et tri.

**Caractéristiques:**

- Sélection de plusieurs ateliers
- Recherche et filtrage en temps réel
- Tri par nom, prix ou durée
- Affichage du prix total
- Interface sheet/modal avec icônes Lucide

**Utilisation:**

```tsx
import { MultiWorkshopSelector } from '@/components/reservations/MultiWorkshopSelector';

<MultiWorkshopSelector
  ateliers={ateliers}
  selectedAteliers={selectedIds}
  onSelectionChange={setSelectedIds}
/>
```

### 3. **ReservationFormAdvanced** (`src/components/reservations/ReservationFormAdvanced.tsx`)

Nouveau formulaire de réservation avancé intégrant les sélections multiples.

**Caractéristiques:**

- Utilise MultiDatePicker et MultiWorkshopSelector
- Affiche un récapitulatif en temps réel (nombre de réservations, prix total)
- Validation Zod complète
- Support des réservations groupées
- Gère la création de réservations batch

**Utilisation:**

```tsx
import ReservationFormAdvanced from '@/components/reservations/ReservationFormAdvanced';

<ReservationFormAdvanced
  ateliers={ateliers}
  defaultAtelierId={id}
/>
```

---

## 📊 Nouveaux types de données

### `ReservationGroup`

Groupe de réservations liées (plusieurs ateliers/dates sous un même paiement).

```typescript
export type ReservationGroup = {
  id: string;
  email: string;
  nom: string;
  etablissement?: string | null;
  adresse?: string | null;
  participants_count: number;
  total_price: number;
  status: "pending" | "confirmed" | "paid" | "completed";
  stripe_session_id?: string | null;
  reservations: Reservation[];
  created_at: string;
  updated_at: string;
};
```

### `MultiReservationFormData`

Type pour les données du formulaire multi-réservations.

```typescript
export type MultiReservationFormData = {
  atelier_ids: number[];
  dates: string[];
  email: string;
  nom: string;
  etablissement?: string;
  adresse?: string;
  participants_count: number;
  message?: string;
  cgv_accepted: boolean;
};
```

---

## 🔗 Pages modifiées

### 1. **Homepage** (`src/app/[locale]/page.tsx`)

Ajout d'une section CTA avec deux cartes:

- Consultation du calendrier
- Réservation rapide

Cette section apparaît après les ateliers en vedette.

### 2. **Page Disciplines** (`src/app/[locale]/disciplines/page.tsx`)

Ajout d'une section CTA "Prêt à commencer ?" avec:

- Lien vers le calendrier
- Lien vers la réservation

### 3. **Page Réservation** (`src/app/[locale]/reserver/page.tsx`)

Remplacement du `ReservationForm` par `ReservationFormAdvanced`.

Permet maintenant:

- Sélection de plusieurs ateliers
- Sélection de plusieurs dates
- Affichage du récapitulatif en temps réel

---

## 🌐 Liens ajoutés

| Page | Destination | Description |
|------|-------------|-------------|
| Homepage | `/calendrier` | Section CTA calendrier |
| Homepage | `/reserver` | Section CTA réservation |
| Disciplines | `/calendrier` | Bouton CTA bas de page |
| Disciplines | `/reserver` | Bouton CTA bas de page |
| Header rapides | `/reserver` | Déjà existant |

---

## 🔧 Implémentation backend requise

### 1. Endpoint `/api/reservations/batch` (À créer)

Crée plusieurs réservations en une seule requête et les relie à un groupe.

**Payload:**

```json
{
  "reservations": [
    {
      "atelier_id": 1,
      "nom": "John",
      "email": "john@example.com",
      "participants_count": 1,
      "date_atelier": "2026-05-20",
      "etablissement": "École X",
      "adresse": "123 Rue..."
    }
  ]
}
```

**Response:**

```json
{
  "groupId": "group_12345",
  "reservations": [...],
  "totalPrice": 150
}
```

### 2. Modification de `/api/stripe/checkout` (À adapter)

Supporter la création d'une session de paiement pour un groupe de réservations.

**Payload accepté:**

```json
{
  "groupId": "group_12345"  // Au lieu de reservationId
}
```

### 3. Fonction `createReservationBatch` (`lib/supabase.ts`)

Nouvelle fonction pour créer plusieurs réservations et les grouper.

```typescript
export async function createReservationBatch(
  reservations: Reservation[],
  groupId: string
): Promise<{ groupId: string; reservations: Reservation[] } | null>
```

---

## 📝 Workflow de réservation multiple

```
1. Utilisateur arrive sur /reserver
   ↓
2. Sélectionne plusieurs ateliers via MultiWorkshopSelector
   ↓
3. Sélectionne plusieurs dates via MultiDatePicker
   ↓
4. Remplit les informations personnelles
   ↓
5. Valide le formulaire
   ↓
6. Crée N réservations (atelier × dates)
   ↓
7. Relie les réservations à un groupId
   ↓
8. Crée une session de paiement Stripe
   ↓
9. Paiement Stripe
   ↓
10. Confirmation (page `/reservation-confirmation`)
```

---

## 💰 Calcul du prix total

```
Prix total = Somme(tarif_eur de chaque atelier sélectionné) × nombre_de_dates × participants_count

Exemple:
- Atelier A: 20€
- Atelier B: 30€
- Dates sélectionnées: 3
- Participants: 2

Prix total = (20 + 30) × 3 × 2 = 300€
```

---

## 🎨 UX/UI Highlights

- **Calendrier professionnel** avec sélection multi-date
- **Recherche et tri** des ateliers
- **Badges** pour voir les sélections rapidement
- **Récapitulatif en temps réel** du nombre de réservations et prix
- **CTA visibles** sur plusieurs pages
- **Responsive design** (mobile-friendly)

---

## 🚀 Prochaines étapes

1. **Implémentation backend:**
   - Créer l'endpoint `/api/reservations/batch`
   - Adapter `/api/stripe/checkout` pour les groupes
   - Créer la table `reservation_groups` si nécessaire

2. **Tests:**
   - Test E2E du flux de réservation multiple
   - Test des validations du formulaire
   - Test du paiement Stripe

3. **Optimisations possibles:**
   - Sauvegarde du brouillon de réservation
   - Historique des réservations
   - Reminders email avant l'atelier

---

## 📞 Support et questions

Pour toute question sur l'implémentation, consultez:

- Types: `src/lib/types.ts`
- Composants: `src/components/reservations/`
- Page: `src/app/[locale]/reserver/page.tsx`
