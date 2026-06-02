# Pages et flux par type de compte

**Inscription différenciée**

À la création de compte, un écran "Qui êtes-vous ?" permet de choisir son type. Selon le choix, le formulaire d'onboarding change : un établissement remplit son UAI/RNE, son responsable et son référent pédagogique ; une famille renseigne ses coordonnées puis ajoute ses enfants un par un avec les infos santé et allergies ; un centre de loisirs indique son type (ALSH, MJC, périscolaire…) et son agrément Jeunesse. L'admin reçoit une notification et valide le compte (`is_verified = true`) avant que la structure puisse accéder à toutes les fonctionnalités.

---

**Dashboard Famille — le plus riche**

C'est le compte qui centralise le plus d'informations critiques. Après connexion, le parent voit ses enfants sous forme de cartes avec un indicateur visuel (vert = tout est rempli, orange = documents manquants, rouge = autorisation expirée). Pour chaque enfant, il peut :

- Remplir ou modifier le profil santé (allergies, PAI, médicaments, contact d'urgence)
- Signer les autorisations RGPD par case à cocher avec horodatage, le tout généré en PDF archivé
- Consulter le planning des séances à venir et les présences passées
- Télécharger les livrables et les rapports pédagogiques de l'animateur
- Payer en ligne si l'atelier est à la charge de la famille

L'idée clé : le parent ne remplit les infos santé **qu'une seule fois**, et elles sont automatiquement disponibles pour tous les ateliers auxquels l'enfant est inscrit, quelle que soit la structure.

---

**Dashboard Établissement / Centre de loisirs**

Ces deux comptes sont très similaires. Ils voient leurs groupes, le planning des interventions Ateliers 360, et ont accès à un espace documentaire partagé avec l'équipe. Ils peuvent :

- Télécharger et signer les conventions de partenariat directement depuis leur espace (signature électronique simple ou téléchargement/scan)
- Consulter et valider les devis
- Voir les rapports d'impact post-atelier envoyés par l'équipe
- Gérer une liste de leurs élèves/participants sans avoir à tout ressaisir à chaque atelier
- Envoyer des messages directement à l'équipe Ateliers 360

La différence principale : l'établissement a un champ UAI/RNE et peut être lié aux enfants via `etablissement_id` dans leur profil, ce qui permet de savoir quels enfants viennent de quelle école sans le redemander.

---

**Dashboard Animateur**

Plus opérationnel. L'animateur voit uniquement ses groupes assignés. Il a accès en lecture aux profils santé des enfants de ses groupes (allergies, PAI) pour préparer ses séances, mais ne peut pas les modifier. Il peut faire l'appel, ajouter des notes pédagogiques, partager des ressources avec le groupe, et rédiger le compte-rendu post-atelier qui sera automatiquement envoyé à la structure partenaire.

---

## Flux documentaire clé — les autorisations

C'est probablement la fonctionnalité la plus importante à bien implémenter. Le flux recommandé :

1. La structure (établissement ou centre) crée un groupe et y inscrit ses élèves
2. Ateliers 360 envoie automatiquement un email aux familles avec un lien d'invitation
3. La famille crée son compte, retrouve son enfant pré-inscrit, et complète son profil santé + autorisations
4. L'animateur, avant chaque séance, peut consulter une fiche récapitulative par enfant : allergies connues, autorisations valides, contact d'urgence
5. Si une autorisation expire ou est retirée, une alerte remonte dans le dashboard admin et animateur

Ça évite complètement la corvée des feuilles papier perdues ou mal remplies.

---

## Ce qu'il faut coder en priorité

Dans l'ordre logique de valeur business :

**1. L'inscription multi-type** avec le formulaire d'onboarding adapté selon le choix. Le trigger Supabase `handle_new_user` est déjà dans le SQL fourni, il faut juste passer `account_type` dans les métadonnées lors du `signUp`.

**2. Le profil Famille + Enfants** avec le formulaire santé/allergies. C'est ce qui crée le plus de valeur immédiatement pour les familles et rassure les structures partenaires.

**3. Les autorisations RGPD numériques** avec génération PDF. La charte RGPD papier que tu as déjà dans les fichiers du projet peut servir de base pour le template PDF.

**4. La page admin de validation des comptes** — une simple liste avec les comptes en attente (`is_verified = false`), leurs infos et un bouton "Valider".

**5. Le dashboard Établissement/Centre** avec l'espace documentaire partagé.

---

## Points d'attention techniques

**Sécurité des données santé** — Les allergies et PAI sont des données sensibles au sens RGPD. Il faut s'assurer que les RLS Supabase sont bien en place (le SQL fourni les couvre) et que seuls l'animateur du groupe concerné et l'admin y ont accès, pas n'importe quel animateur de la plateforme.

**Invitation des familles** — Plutôt que de laisser les familles s'inscrire librement et chercher leur enfant, le meilleur UX est un système d'invitation par email avec un token pré-rempli qui lie directement au bon enfant. Ça évite les doublons et les erreurs de saisie.

**Expiration des autorisations** — Il faut un cron job (via `pg_cron` dans Supabase ou un edge function planifiée) qui vérifie chaque semaine si des autorisations arrivent à expiration et envoie une relance automatique à la famille.

**Multi-enfants** — Une famille peut avoir plusieurs enfants dans des structures différentes. L'UI doit rendre ça simple avec un sélecteur d'enfant clair et des indicateurs de complétude par enfant.

---
