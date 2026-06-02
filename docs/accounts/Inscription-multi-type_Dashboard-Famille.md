Parfait. Voici le plan d'ensemble complet, en texte, pour les deux briques en parallèle.

---

## Brique 1 — Inscription multi-type

### Fichier : `src/app/[locale]/inscription/page.tsx`\*\*

Page publique accessible depuis le bouton "Créer un compte" du header. Elle remplace ou complète la page `/login` existante.

**Étape 1 — Choix du profil (écran unique)**
Six cartes cliquables avec icône, titre et description courte. L'utilisateur clique sur son type et ça déroule le formulaire correspondant en dessous, sans rechargement de page. On stocke le choix dans un state React local.

**Étape 2 — Formulaire commun (tous les types)**
Email, mot de passe, confirmation mot de passe. Ces champs sont identiques pour tout le monde.

**Étape 3 — Formulaire spécifique selon le type**

Pour _Établissement_ : nom de l'école, type (primaire / collège / lycée), ville, code UAI/RNE (optionnel mais encouragé), nom du responsable, nom et email du référent pédagogique pour les ateliers.

Pour _Centre de loisirs_ : nom de la structure, type (ALSH / MJC / périscolaire / club / association), ville, tranche d'âge accueillie, nom et email du responsable, numéro d'agrément Jeunesse (optionnel).

Pour _Famille_ : prénom du parent 1, prénom du parent 2 (optionnel), téléphone mobile. Les enfants seront ajoutés après connexion, pas à l'inscription, pour ne pas alourdir.

Pour _Animateur_ : prénom et nom, ville, compétences principales (multi-select parmi une liste : Arduino, Python, IA, impression 3D, Scratch, électronique…). Le reste du profil se complète ensuite.

Pour _Apprenant_ : prénom, nom, date de naissance, niveau scolaire. Si l'apprenant est mineur, un message l'invite à faire créer le compte par son parent à la place.

**Étape 4 — Confirmation**
Après soumission, appel à `supabase.auth.signUp()` avec `account_type` passé dans `options.data` (les metadata). Le trigger SQL créé plus tôt s'occupe de peupler la table `profiles` automatiquement. Un email de confirmation Supabase est envoyé. L'utilisateur voit un message "Votre demande est en cours de validation" pour les types établissement/centre/animateur, ou "Vérifiez votre email" pour famille et apprenant.

**Validation admin requise** : pour établissement, centre et animateur, `is_verified` reste `false` jusqu'à validation manuelle par l'admin. Tant que c'est `false`, la connexion réussit mais les pages protégées affichent une bannière "Votre compte est en cours de validation, vous serez notifié par email."

**Fichier middleware à modifier : `middleware.ts`**
Ajouter une vérification après l'auth Supabase : si `account_type` est un type professionnel et `is_verified = false`, rediriger vers une page `/en-attente-validation` au lieu du dashboard.

---

## Brique 2 — Dashboard Famille

**Structure des fichiers**

```
src/app/[locale]/famille/
  page.tsx               → Dashboard principal (liste des enfants)
  enfants/
    nouveau/page.tsx     → Ajouter un enfant
    [id]/page.tsx        → Profil complet d'un enfant
    [id]/sante/page.tsx  → Infos santé, allergies, PAI
    [id]/autorisations/page.tsx → RGPD, droit à l'image
  documents/page.tsx     → Documents et conventions
  messages/page.tsx      → Messagerie avec Ateliers 360
```

**`/famille/page.tsx` — Vue d'ensemble**

Après connexion, la famille voit ses enfants sous forme de cartes. Chaque carte affiche : prénom et âge de l'enfant, son niveau scolaire, un badge de complétion du profil (vert/orange/rouge selon ce qui manque), le prochain atelier prévu s'il y en a un, et deux boutons "Voir le profil" et "Gérer les autorisations".

En haut de page, une bannière contextuelle si quelque chose requiert l'attention : autorisation RGPD expirée, document manquant, prochain atelier dans moins de 48h.

Un bouton flottant "Ajouter un enfant" permet d'en inscrire un second ou un troisième sans refaire tout le processus.

**`/famille/enfants/nouveau/page.tsx` — Formulaire d'ajout d'enfant**

Formulaire en deux parties affichées sur la même page, séparées par un séparateur visuel.

Partie 1 — Identité : prénom, nom (optionnel pour la confidentialité), date de naissance (calcul automatique de l'âge), sexe, niveau scolaire, établissement fréquenté (recherche dans la liste des établissements Supabase, ou saisie libre si non référencé).

Partie 2 — Urgences et santé : nom et téléphone du contact d'urgence (obligatoire, différent du parent), lien avec l'enfant, nom et téléphone du médecin traitant. Puis les allergies via un multi-select avec les 14 allergènes majeurs (listés dans les types TypeScript) plus un champ "Autres allergies" en texte libre et un champ "Détails / précisions". Ensuite PAI (oui/non), si oui possibilité d'uploader le document PDF. Médicaments autorisés et modalités. Trois checkboxes : autorisation de sortie seul, autorisation de transport, autorisation médicament d'urgence (type Épipen).

Partie 3 — Notes libres pour l'animateur : champ texte libre où le parent peut noter tout ce qui lui semble pertinent et qui ne rentre pas dans les cases.

**`/famille/enfants/[id]/autorisations/page.tsx` — RGPD et droit à l'image**

Page dédiée avec le contenu de la charte RGPD déjà rédigée dans le fichier `charte_rgpd_participant.docx` du projet. Les consentements sont présentés clairement avec une description courte pour chaque case :

- Photos usage interne (compte-rendu pédagogique, rapport à l'établissement)
- Photos usage public (site web Ateliers 360, réseaux sociaux, dossiers de présentation)
- Vidéos usage interne
- Vidéos usage public
- Données pédagogiques (fiches d'observation, résultats quiz)
- Newsletter et informations Ateliers 360

Chaque case cochée est horodatée. En bas, un bouton "Valider et signer" génère un PDF récapitulatif (via une API route qui utilise la lib `pdf-lib`) et le stocke dans Supabase Storage avec la référence en base. Le parent peut re-télécharger le PDF à tout moment et modifier ses choix, auquel cas un nouveau PDF est généré et l'ancien est archivé.

---

## Ce qui est partagé entre les deux briques

**`src/lib/supabase-accounts.ts`** — Nouveau fichier à créer avec toutes les fonctions CRUD pour les nouvelles tables : `createFamille`, `addEnfant`, `updateEnfant`, `getEnfantsByFamille`, `saveAutorisationRGPD`, `getProfileWithDetails`, etc.

**`src/components/accounts/AccountTypePicker.tsx`** — Composant réutilisable pour la sélection du type de compte, utilisé à l'inscription mais aussi potentiellement dans l'admin quand on crée un compte manuellement.

**`src/components/famille/EnfantCard.tsx`** — Carte résumé d'un enfant avec indicateur de complétion, utilisée dans le dashboard famille et potentiellement dans la vue animateur.

**`src/components/famille/AllergyBadges.tsx`** — Composant qui affiche les allergies d'un enfant sous forme de badges colorés (rouge pour les allergènes majeurs, orange pour les autres). Réutilisé dans la fiche animateur avant chaque séance.

---

## Ordre d'implémentation conseillé

1. Créer le fichier `types-accounts.ts` (à générer)
2. Exécuter le SQL dans Supabase
3. Créer `supabase-accounts.ts` avec les fonctions CRUD de base
4. Coder la page d'inscription avec le sélecteur de type et les formulaires
5. Modifier le middleware pour gérer `is_verified`
6. Coder la page dashboard famille avec la liste des enfants
7. Coder le formulaire d'ajout d'enfant (la partie la plus dense)
8. Coder la page d'autorisations RGPD
9. Coder la page admin de validation des comptes (simple mais critique)

---
