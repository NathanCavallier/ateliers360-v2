# TEST PLAN — Ateliers 360

Ce document décrit comment exécuter les tests end-to-end (Playwright) et les prérequis.

## Prérequis

- Avoir le projet démarré en local :

```bash
# depuis le dossier platform
npm install
npm run dev
```

- Avoir un compte de test existant dans Supabase (compte famille) avec email/mdp réglés dans les variables d'environnement :

- `TEST_USER_EMAIL` — email du compte
- `TEST_USER_PASSWORD` — mot de passe
- Optionnel : `APP_URL` si le site n'est pas à `http://localhost:9002`.

## Lancer les tests Playwright (E2E)

1. Exporter les variables d'environnement dans votre shell :

```bash
export TEST_USER_EMAIL=dev+test@example.com
export TEST_USER_PASSWORD=changeme
export APP_URL=http://localhost:9002
```

1. Lancer les tests :

```bash
npm run test:e2e
```

Les tests automatisés parcourent :

- connexion (utilisateur de test)
- ajout d'un enfant via le formulaire
- édition des informations santé
- vérification des badges sur le dashboard

## Lancer les tests unitaires

1. Installer les dépendances (si ce n'est pas déjà fait) :

```bash
npm install
```

2. Lancer les tests unitaires :

```bash
npm run test:unit
```

Les tests unitaires couvrent :

- le rendu des badges d'allergies
- l'affichage du composant `EnfantCard`

## Notes

- Les tests supposent que l'authentification se fait via la page `/fr/login` et que le compte de test est déjà confirmé.
- Si vous préférez, créez un utilisateur via l'interface Supabase et réutilisez ses identifiants.

## Prochaines étapes (améliorations)

- Ajouter des tests pour le flux d'autorisation RGPD et la génération de PDF.
- Ajouter des fixtures Playwright pour nettoyer les enfants de test après exécution.
- Ajouter des tests unitaires (Vitest) pour les composants React.
