# Dashboard Role-Based Implementation Audit

## Objectif

Mettre en place une gouvernance claire du Dashboard selon le rôle utilisateur : `family`, `establishment`, `center`, `animator`, `learner`, `student`, `other`, et `admin`.

## Fichiers principaux audités

- `src/app/[locale]/dashboard/page.tsx`
- `src/components/dashboard/DashboardLayout.tsx`
- `src/components/dashboard/RightSidebar.tsx`
- `src/types-accounts.ts`
- `messages/fr.json`
- `messages/en.json`

## Résumé de l’implémentation actuelle

### `src/types-accounts.ts`

- Définit les rôles de compte pris en charge : `family`, `establishment`, `center`, `animator`, `learner`, `student`, `other`.
- Inclut aussi `FamilyProfile`, `Child`, `AuthorizationConsent`.

### `src/app/[locale]/dashboard/page.tsx`

- Page principale du dashboard.
- Récupère l’utilisateur, les données de profil et les données métier via Supabase.
- Définit les drapeaux métier suivants :
  - `isFamily`
  - `isLearnerOrStudent`
  - `isAnimator`
  - `isEstablishment`
  - `isCenter`
  - `isEstablishmentOrCenter`
  - `isAnimatorOrAdmin`
  - `canViewRewards`
- Affichage conditionnel de sections :
  - `family` : enfant(s), alertes santé/consentement, espace famille,
  - `learner` / `student` : badges, attestations, portfolio,
  - `animator` : sessions assignées, demandes,
  - `establishment` / `center` : ateliers, réservations, documents,
  - `admin` : accès complet aux statistiques et actions.
- `other` est traité comme un utilisateur générique avec accès minimal.

### `src/components/dashboard/DashboardLayout.tsx`

- Gestion de la barre latérale et du menu.
- Récupère `account_type` en client via Supabase.
- Définit les menus visibles selon le rôle :
  - `admin` : `navigationItems` (toutes les pages)
  - `family` : `familyNavigationItems`
  - `learner` / `student` : `learnerNavigationItems`
  - `animator` : `animatorNavigationItems`
  - `establishment` / `center` : `partnerNavigationItems`
  - `other` : `overview` + `settings`
- Utilise le même pattern pour le menu mobile.

### `src/components/dashboard/RightSidebar.tsx`

- Composant générique de sidebar.
- Reçoit actions et stats en props depuis la page.
- Aucun rôle spécifique intégré ici, ce qui est cohérent.

## Translations existantes

- Les clés de navigation `dashboard_menu.*` existent en français et anglais.
- Les copies spécifiques aux rôles sont présentes dans `DashboardPage` namespace.
- Les libellés de famille, apprenant, animateur, équipe, établissement et centre sont couverts.

## Points d’attention identifiés

### 1. Administration vs Animateur

- `DashboardPage` utilise `isAnimatorOrAdmin` pour certains libellés d’introduction.
- Risque : un administrateur reçoit le message de l’animateur si `user_metadata.role === 'admin'`.
- Recommandation : séparer clairement `admin` et `animator` pour les textes de contexte.

### 2. Rôle `other`

- Le rôle `other` reçoit un affichage par défaut faible.
- Recommandation : définir une expérience dédiée ou mieux guider ce type d’utilisateur via CTA et actions.

### 3. Uniformisation des libellés de statut

- Certains textes comme `children_desc` sont réutilisés dans des contextes différents.
- Recommandation : créer des clés distinctes quand le sens diffère pour éviter les confusions lors des évolutions.

### 4. Cohérence route / navigation

- `DashboardLayout` expose des pages selon rôle.
- À vérifier : toutes les routes affichées existent bien et sont accessibles pour le rôle attendu.
- Routes à valider :
  - `/famille`
  - `/dashboard/badges`
  - `/dashboard/attestations`
  - `/dashboard/portfolio`
  - `/dashboard/ateliers`
  - `/dashboard/reservations`
  - `/dashboard/demandes`
  - `/dashboard/contacts`
  - `/dashboard/settings`

### 5. Réutilisation de la logique de rôle

- Le dashboard contient déjà une logique `profileType` solide, mais elle est dupliquée entre le layout et la page.
- Recommandation : extraire un helper ou un hook `getDashboardRoleFlags(profile)` pour centraliser ces conditions.

## Recommandations d’implémentation

### À prioriser

- [ ] Clarifier `admin` vs `animator` dans `DashboardPage`.
- [ ] Ajouter une version fonctionnelle pour `AccountType.Other`.
- [ ] Vérifier et corriger les routes affichées dans `DashboardLayout` pour chaque rôle.
- [ ] Extraire la logique de rôle vers un utilitaire partagé.
- [ ] Consolider les traductions de statut et de menu.

### Pistes de refactor

- Créer un helper `dashboardRoleConfig.ts` avec :
  - `navItemsByRole`
  - `quickLinksByRole`
  - `statsCardsByRole`
  - `dashboardIntroByRole`
- Remplacer la logique conditionnelle dupliquée dans `page.tsx` et `DashboardLayout.tsx` par ce helper.
- Ajouter des tests de rendu role-based si une suite de tests existe.

## Suggestions de suivi

### Version 1 — audit et documentation

- Documenter l’état actuel de l’implémentation.
- Lister les fichiers touchés et les responsabilités.

### Version 2 — harmonisation

- Normaliser les sections du dashboard par rôle.
- Garantir la cohérence des menus et des CTA.

### Version 3 — approfondissement

- Ajouter des sections dédiées pour :
  - `family` : statut des enfants, alertes, autorisations.
  - `learner` / `student` : progrès, badges, projets.
  - `animator` : sessions à venir, demandes, contacts.
  - `establishment` / `center` : réservations, documents, intervenants.
  - `other` : orientation et support.

## Conclusion

L’implémentation existante est déjà dans une bonne direction, avec une base de rôle bien définie. Le principal travail restant est d’harmoniser la logique entre navigation et contenu, puis d’isoler les conditions de rôle dans un helper réutilisable.
