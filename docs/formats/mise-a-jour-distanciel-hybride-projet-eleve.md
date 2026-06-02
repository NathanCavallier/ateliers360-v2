# Audit et suivi de la mise à jour Distanciel / Hybride / Projet Élève

## Contexte

Le document source propose d’ajouter des contenus commerciaux et web autour de :

- `Distanciel` autonome
- `Hybride` présentiel + distanciel
- `Projet Élève` / mentorat de projet

L’objectif est de mettre à jour le site et le dossier présentation avec ces nouvelles modalités, en particulier sur :

- la page `/pour-les-ecoles`
- la page `/ateliers`
- la page `/tarifs`
- le modèle `WorkshopDB` pour supporter les tags

## Audit actuel

### 1. Page `/pour-les-ecoles`

Fichier inspecté : `src/app/[locale]/pour-les-ecoles/page.tsx`

Ce qui est déjà présent :

- un hero avec CTA contact et lien vers les ateliers
- une section "Nos formats d'intervention"
- une section "Nos packs"
- une section FAQ

Manque actuellement :

- une section explicite "Nos modalités d'intervention" avec tableau Présentiel / Distanciel / Hybride / Projet Élève
- des éléments concrets "Distanciel disponible" ou "Projet Élève"
- le formulaire "Je propose un projet" attendu par le brief

### 2. Page `/ateliers`

Fichier inspecté : `src/app/[locale]/ateliers/page.tsx`

Ce qui est déjà présent :

- affichage de la liste des ateliers via `WorkshopList`
- filtres par catégorie, recherche, durée, prix, format
- tri et navigation vers la réservation

Manque actuellement :

- badge ou signe visuel "Distanciel disponible" pour des ateliers sélectionnés
- filtre / tag dédié `distanciel` ou `projet-élève`
- mise en valeur des 6 ateliers cités dans le document joint

### 3. Page `/tarifs`

Fichier inspecté : `src/app/[locale]/tarifs/page.tsx`

Ce qui est déjà présent :

- affichage des offres par type (`workshop`, `module`, `pack`)
- tarification automatique basée sur les ateliers Supabase

Manque actuellement :

- ligne explicite "Format distanciel" dans la grille tarifaire
- pack hybride clair dans la présentation des offres
- mention des tarifs conseillés du document joint

### 4. Modèle `WorkshopDB`

Fichier inspecté : `src/lib/types.ts`

Ce que l’on a déjà :

- `tags?: string[] | null` sur `WorkshopDB`

Conclusion :

- la structure de données supporte déjà la nouvelle taxonomie `distanciel` / `projet-élève`
- il n’y a pas de migration obligatoire côté code pour ajouter ces tags

### 5. Composant d’affichage des ateliers

Fichier inspecté : `src/components/workshops/WorkshopCard.tsx`

Ce qui existe :

- badge catégorie
- image, titre, description, prix, durée
- CTA vers la page atelier et la réservation

Manque :

- affichage de badges métiers / tags (`distanciel`, `projet-élève`, `hybride`)
- section descriptive spécifique au format `distanciel` ou `hybride`

## Recommandations de mise en œuvre

### A. Contenu page `/pour-les-ecoles`

1. Ajouter une section "Nos modalités d'intervention" avec un tableau :
   - Présentiel
   - Distanciel
   - Hybride
   - Projet Élève
2. Ajouter un bloc "Ateliers distanciels autonomes" avec les 6 ateliers recommandés.
3. Ajouter un CTA secondaire "Je propose un projet" qui renvoie vers un formulaire ou un email.
4. S’assurer que les traductions `Schools` incluent les nouveaux textes.

### B. Contenu page `/ateliers`

1. Ajouter dans `WorkshopCard` un rendu de badges tags lorsque `workshop.tags` contient :
   - `distanciel`
   - `hybride`
   - `projet-élève`
2. Ajouter un filtre de sélection sur la page `/ateliers` pour `distanciel` et `projet-élève`.
3. Mettre en avant les 6 ateliers identifiés du document joint avec badge `Distanciel disponible`.
4. Si besoin, ajouter une section "Nos ateliers distanciels" en haut de page.

### C. Contenu page `/tarifs`

1. Ajouter une ligne ou un encart "Format distanciel" dans la grille tarifaire.
2. Ajouter une mention "Pack hybride" dans la description des offres de packs.
3. Mettre à jour le texte pour préciser que le distanciel reste tarifié au plus à -15% du présentiel.

### D. Données et administration

1. Ajouter les tags `distanciel` et `projet-élève` dans les ateliers concernés via Supabase.
2. Vérifier les composants admin de création / édition d’atelier :
   - `src/components/admin/CreateWorkshopForm.tsx`
   - `src/components/admin/EditWorkshopForm.tsx`
3. Si souhaité, proposer un article par défaut ou un contenu rédactionnel riche pour les 6 ateliers distanciels.

### E. Nouvelle page / formulaire projet élève

1. Créer une page simple `src/app/[locale]/proposer-projet/page.tsx` ou un formulaire intégré qui collecte :
   - titre du projet
   - description
   - niveau
   - matériel disponible
   - résultat attendu
2. Liaison possible via CTA depuis `/pour-les-ecoles` et `/ateliers`.
3. Si la solution doit être rapide, un simple CTA mailto `contact@ateliers360.fr` peut être mis en place en attendant l’implémentation formelle.

## Priorités de suivi

1. Audit et contenu du site web : `pour-les-ecoles`, `ateliers`, `tarifs`
2. Support tags dans `WorkshopDB` et affichage de badges
3. Mise à jour des ateliers en base avec `distanciel` / `projet-élève`
4. Création du formulaire "Je propose un projet"
5. Vérification des traductions et des CTA

## Actions réalisées

- Analyse des pages existantes dans `src/app/[locale]`
- Vérification du modèle `WorkshopDB`
- Vérification du composant `WorkshopCard`
- Définition d’un plan d’implémentation

## Fichiers clés à modifier

- `src/app/[locale]/pour-les-ecoles/page.tsx`
- `src/app/[locale]/ateliers/page.tsx`
- `src/app/[locale]/tarifs/page.tsx`
- `src/components/workshops/WorkshopCard.tsx`
- `src/components/workshops/WorkshopList.tsx`
- `src/lib/types.ts`
- `src/components/admin/CreateWorkshopForm.tsx`
- `src/components/admin/EditWorkshopForm.tsx`
- `src/app/[locale]/proposer-projet/page.tsx` (nouveau, optionnel)

## Notes importantes

- Le site utilise déjà la route `/pour-les-ecoles` et `/ateliers`.
- La page `/tarifs` est déjà dynamique et alimente les prix depuis Supabase.
- Les nouveaux tags peuvent être ajoutés sans migration serveur si la colonne `tags` existe déjà.
- La `sitemap.ts` inclut déjà `/pour-les-ecoles`, donc les ajouts sont indexables.
