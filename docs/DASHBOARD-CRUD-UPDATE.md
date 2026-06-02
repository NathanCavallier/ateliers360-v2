# Dashboard CRUD - Mise à jour Complète

## Vue d'ensemble

Cette mise à jour complète le système CRUD du dashboard pour gérer :

- ✅ Réservations (lecture, mise à jour de statut, suppression)
- ✅ Demandes unifiées (contact, structures, entreprises, devis)
- ✅ Contacts (migration côté client avec API unifiée)

## APIs Créées

### 1. `/api/dashboard/reservations` (GET, PATCH, DELETE)

**GET** - Récupérer les réservations avec données jointes (ateliers)

```bash
GET /api/dashboard/reservations?status=pending&limit=100&offset=0
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "Jean Dupont",
      "email": "jean@example.com",
      "atelier_id": 5,
      "date_atelier": "2025-05-15T10:00:00Z",
      "participants_count": 2,
      "status": "pending",
      "ateliers": {
        "id": 5,
        "titre": "Robotique Avancée",
        "tarif_eur": 50
      }
    }
  ],
  "count": 1
}
```

**PATCH** - Mettre à jour le statut d'une réservation

```bash
PATCH /api/dashboard/reservations
Content-Type: application/json

{
  "id": 1,
  "status": "confirmed"
}
```

**DELETE** - Supprimer une réservation

```bash
DELETE /api/dashboard/reservations
Content-Type: application/json

{
  "id": 1
}
```

### 2. `/api/dashboard/demandes` (GET)

**Demandes unifiées** - Support 4 types de demandes

```bash
GET /api/dashboard/demandes?type=contact_form&status=new&limit=100&offset=0
```

**Types supportés:**

- `contact_form` - Formulaires de contact généraux
- `structure_requests` - Demandes de structures (écoles, associations)
- `company_requests` - Demandes d'entreprises
- `quotes` - Devis

**Response:**

```json
{
  "success": true,
  "type": "contact_form",
  "data": [
    {
      "id": "uuid",
      "name": "Marie Durand",
      "email": "marie@example.com",
      "message": "Intéressé par vos formations...",
      "status": "new",
      "created_at": "2025-05-20T14:00:00Z"
    }
  ],
  "count": 5,
  "total": 12
}
```

### 3. `/api/dashboard/demandes/[id]` (GET, PATCH, DELETE)

**GET** - Récupérer une demande spécifique

```bash
GET /api/dashboard/demandes/uuid-123?type=contact_form
```

**PATCH** - Mettre à jour une demande

```bash
PATCH /api/dashboard/demandes/uuid-123
Content-Type: application/json

{
  "type": "contact_form",
  "status": "responded",
  "metadata": { "priority": "high" }
}
```

**DELETE** - Supprimer une demande

```bash
DELETE /api/dashboard/demandes/uuid-123
Content-Type: application/json

{
  "type": "contact_form"
}
```

### 4. `/api/dashboard/ateliers/[id]/reservations` (GET)

Vérifie si un atelier a des réservations avant suppression.

```bash
GET /api/dashboard/ateliers/5/reservations
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nom": "Jean Dupont",
      "email": "jean@example.com",
      "status": "pending"
    }
  ],
  "hasReservations": true
}
```

## Pages Dashboard Mises à Jour

### 1. `/dashboard/reservations` (Page)

- ✅ Chargement avec API `/api/dashboard/reservations`
- ✅ Filtre par statut (dropdown)
- ✅ Inline status editor (clic sur badge = sélecteur)
- ✅ Suppression avec confirmation
- ✅ Export CSV avec tarifs calculés
- ✅ Actualisation manuelle
- ✅ Client-side avec notifications

**Features:**

- Affichage du montant (tarif × participants)
- Formatage des dates (dd/MM/yyyy)
- Gestion des erreurs avec toast notifications

### 2. `/dashboard/contacts` (Page) - MIGRATION COMPLÈTE

- ✅ Conversion côté serveur → côté client ('use client')
- ✅ API unifiée `/api/dashboard/demandes?type=contact_form`
- ✅ Filtre par statut
- ✅ Inline status editor
- ✅ Suppression avec confirmation
- ✅ Export CSV
- ✅ Actualisation manuelle
- ✅ Mailto links pour les emails

**Avant:**

- Page serveur (`async function`)
- Requête directe Supabase côté serveur
- Pas de CRUD interactif

**Après:**

- Page client (`'use client'`)
- Utilise API dashboard unifiée
- CRUD complet (lecture, mise à jour de statut, suppression)

### 3. `/dashboard/demandes` (NEW Page)

- ✅ Page unifiée pour toutes les demandes
- ✅ Tabs pour changer de type (contact, structures, entreprises, devis)
- ✅ Filtre par statut dans chaque onglet
- ✅ Inline status editor
- ✅ Suppression avec confirmation
- ✅ Export CSV
- ✅ Actualisation manuelle

**Types de demandes affichés:**

1. **Contact Form** - Messages généraux
2. **Structure Requests** - Écoles, associations, collectivités
3. **Company Requests** - Formations professionnelles
4. **Quotes** - Devis personnalisés

## Statuts Supportés

```typescript
type RequestStatus = 'new' | 'in_progress' | 'closed' | 'spam' | 'responded';
type ReservationStatus = 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
```

**Colors:**

- `new` / `pending` - 🔵 Bleu
- `in_progress` - 🟡 Jaune
- `responded` / `confirmed` - 🟢 Vert
- `paid` - 🔵 Bleu
- `completed` - ⚫ Gris
- `cancelled` / `closed` / `spam` - 🔴 Rouge

## Architecture

### Client ↔ Server Communication

```
Client Page (React)
    ↓
  fetch() API
    ↓
API Route (Next.js)
    ↓
supabaseAdmin (Server-side)
    ↓
Database (Supabase)
```

**Avantages:**

- ✅ RLS policies contournées côté serveur avec `supabaseAdmin`
- ✅ Pas d'exposition des clés de service au client
- ✅ Validation centralisée côté serveur
- ✅ Logs et audit trail possibles
- ✅ Gestion d'erreurs cohérente

### File Structure

```
src/
  app/
    api/
      dashboard/
        reservations/
          route.ts              # GET/PATCH/DELETE reservations
        demandes/
          route.ts              # GET all requests by type
          [id]/
            route.ts            # GET/PATCH/DELETE single request
        ateliers/
          [id]/
            reservations/
              route.ts          # GET reservations for atelier
    [locale]/
      dashboard/
        reservations/
          page.tsx              # Updated with new API
        contacts/
          page.tsx              # Migrated to client-side
        demandes/
          page.tsx              # NEW - unified requests page
```

## Fonctionnalités CRUD

### Create (C)

- ❌ Les pages ne créent pas de demandes/réservations
- ✅ La création se fait via formulaires publics (`/reservation`, `/contact`)
- ✅ Ces formulaires POST à `/api/reservations` ou `/api/contact`

### Read (R)

- ✅ GET `/api/dashboard/reservations`
- ✅ GET `/api/dashboard/demandes?type=...`
- ✅ GET `/api/dashboard/demandes/[id]`
- ✅ GET `/api/dashboard/ateliers/[id]/reservations`

### Update (U)

- ✅ PATCH `/api/dashboard/reservations` - changer status
- ✅ PATCH `/api/dashboard/demandes/[id]` - changer status + metadata
- ✅ Inline editors (clic sur badge = dropdown de statut)

### Delete (D)

- ✅ DELETE `/api/dashboard/reservations`
- ✅ DELETE `/api/dashboard/demandes/[id]`
- ✅ Confirmation dialog avant suppression
- ✅ Vérification de réservations avant suppression d'atelier

## Migration Guide

### Pour les développeurs

1. **Test des APIs** (avec Postman/curl)

   ```bash
   # Test GET reservations
   curl "http://localhost:3000/api/dashboard/reservations"
   
   # Test GET demandes (contacts)
   curl "http://localhost:3000/api/dashboard/demandes?type=contact_form"
   
   # Test PATCH reservation status
   curl -X PATCH "http://localhost:3000/api/dashboard/reservations" \
     -H "Content-Type: application/json" \
     -d '{"id": 1, "status": "confirmed"}'
   ```

2. **Vérification des variables d'environnement**

   ```bash
   # Vérifier que SUPABASE_SERVICE_ROLE_KEY est bien set
   echo $SUPABASE_SERVICE_ROLE_KEY
   ```

3. **Tests dans le Dashboard**
   - Aller à `/dashboard/reservations`
   - Vérifier que les réservations se chargent
   - Tester : filtre, inline edit, suppression, export
   - Aller à `/dashboard/contacts`
   - Tester : filtre, inline edit, suppression, export
   - Aller à `/dashboard/demandes`
   - Naviguer entre les tabs
   - Tester chaque type de demande

## Performance

### Optimisations appliquées

1. **Pagination** (future)
   - `?limit=100&offset=0` supporté mais optionnel
   - Frontend peut implémenter pagination progressive

2. **Filtrage côté serveur**
   - `?status=pending` réduit la bande passante
   - Joins optimisés pour réservations

3. **Exports**
   - CSV généré côté client (pas de backend heavylifting)
   - Nom fichier avec date `reservations_2025-05-20.csv`

4. **Caching** (future)
   - Pourrait ajouter `revalidateTag()` pour invalidation intelligente
   - SWR sur frontend pour refetch automatique

## Erreurs et Gestion

### Cas d'erreur gérés

1. **supabaseAdmin === null**
   - ❌ Retour 500 avec message explicite
   - 💡 Vérifier `SUPABASE_SERVICE_ROLE_KEY` dans .env

2. **Invalid request body**
   - ❌ Retour 400 avec détails Zod
   - 💡 Vérifier les paramètres requis

3. **Row not found**
   - ❌ Retour 404 "Not found"
   - 💡 Vérifier l'ID existe

4. **Duplicate key violation**
   - ❌ Retour 409 "Conflict"
   - 💡 Vérifier les contraintes uniques

## Prochaines Étapes

### To-Do

1. **Tests end-to-end**
   - [ ] Créer une réservation via formulaire public
   - [ ] La voir dans `/dashboard/reservations`
   - [ ] Modifier son statut
   - [ ] La supprimer
   - [ ] Vérifier export CSV

2. **Ajouts futurs**
   - [ ] Pagination frontend avec "Load more"
   - [ ] Recherche en temps réel (ILIKE)
   - [ ] Tri par colonnes (click header)
   - [ ] Bulk actions (sélection multi)
   - [ ] Webhooks Supabase pour real-time updates
   - [ ] Email notifications sur changement de statut

3. **Documentation**
   - [ ] Mettre à jour les commentaires API
   - [ ] Ajouter des exemples cURL complets
   - [ ] Créer guide pour ajouter nouveau type de demande

## Fichiers Modifiés

### Créés ✨

- `/src/app/api/dashboard/reservations/route.ts` (GET/PATCH/DELETE)
- `/src/app/api/dashboard/demandes/route.ts` (GET)
- `/src/app/api/dashboard/demandes/[id]/route.ts` (GET/PATCH/DELETE)
- `/src/app/api/dashboard/ateliers/[id]/reservations/route.ts` (GET)
- `/src/app/[locale]/dashboard/demandes/page.tsx` (NEW page)
- `/docs/DASHBOARD-CRUD-UPDATE.md` (this file)

### Modifiés 🔄

- `/src/app/[locale]/dashboard/reservations/page.tsx`
  - Converti en client-side (était mélange serveur)
  - Utilise nouvelle API `/api/dashboard/reservations`
  - Ajouté: filtre, inline edit, suppression, export
  
- `/src/app/[locale]/dashboard/contacts/page.tsx`
  - Converti en client-side (était serveur)
  - Utilise API unifiée `/api/dashboard/demandes?type=contact_form`
  - Ajouté: CRUD complet, filtres, export

## Validation

✅ Toutes les APIs respectent:

- Zod validation des inputs
- Error handling cohérent
- Response types typées
- Documentation JSDoc
- Logs pour debugging
