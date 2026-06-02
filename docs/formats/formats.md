# Pourquoi ça fait sens

**Distanciel :** couverture simultanée Nice + Nancy-Metz sans frais de déplacement, suivi entre deux sessions en présentiel, et certains ateliers sont *naturellement* adaptés à distance (code, IA, esprit critique) — aucune perte pédagogique réelle.

**Projets proposés par les élèves :** c'est exactement ce que les établissements cherchent pour les dispositifs "Parcours Avenir", AP, ou heures libres en lycée. Tu passes d'animateur à *mentor*, ce qui justifie des cycles plus longs et fidélise les partenariats.

**Risque principal à anticiper :** ne pas diluer le positionnement. Le distanciel doit rester une *extension* de l'offre présentielle, pas un substitut low-cost.

---

## Structure concrète à intégrer

### Tier 1 — Ateliers distanciels autonomes

Ateliers qui fonctionnent à 100% à distance, sans matériel :

| Atelier | Public | Durée | Tarif suggéré |
| --- | --- | --- | --- |
| Python / Scratch | Lycée / Collège | 1h-2h | 120-160€ HT |
| IA expliquée | Tout public | 1h30 | 130€ HT |
| Fake news & esprit critique | Collège/Lycée | 1h30 | 120€ HT |
| Création de chatbot (no-code) | Lycée | 2h | 150€ HT |
| Numérique responsable | Adultes / Structures | 1h30 | 130€ HT |
| Data for Good | Lycée/Étudiants | 2h | 160€ HT |

**Outil recommandé :** Teams (déjà dans les établissements scolaires), avec partage d'écran + Scratch/Replit/Thonny en ligne. Zéro friction côté école.

---

### Tier 2 — Format hybride (présentiel + distanciel filé)

Un atelier de lancement en présentiel (1 séance), suivi de 2-4 séances à distance pour ancrer les acquis. C'est le format le plus valorisable :

- **Pack Hybride Scratch** : 1 séance présentielle + 3 distancielles → 420€ HT
- **Pack Hybride Python** : 1 présentielle + 4 distancielles → 520€ HT
- **Pack Hybride IA** : 2 présentielles + 2 distancielles → 480€ HT

Avantage côté établissement : ils obtiennent un suivi réel sans monopoliser la salle, et côté toi : tu optimises les déplacements.

---

### Tier 3 — "Projets Élèves" : l'offre mentorat

C'est le plus différenciant. Voici le cadre concret :

**Concept :** les élèves/étudiants soumettent une idée de projet (une page, via un formulaire sur le site). Ateliers 360 évalue la faisabilité, propose un accompagnement sur 6 à 10 séances.

**Exemples de projets typiques :**

- Une app de vote pour la vie scolaire (Python/web)
- Un robot qui fait le tour de la cour pour compter les déchets (et sensibiliser au tri)
- Un quiz interactif pour réviser une matière
- Une station météo connectée pour le jardin de l'école
- Un jeu Scratch sur l'histoire locale

**Structure du format :**

1. Session 0 (1h, distancielle gratuite) : brief, faisabilité, cadrage
2. Séances 1-6 (présentiel ou hybride) : développement encadré
3. Séance finale (présentiel si possible) : démonstration devant la classe/jury

**Tarif :** forfait 6 séances à 750-900€ HT, ou intégré dans un partenariat annuel.

**Ce qu'il faut mettre en place côté plateforme :** un formulaire "Je propose un projet" sur le site, avec champs : titre, description, niveau, matériel disponible, résultat attendu. Tu peux le créer dans Supabase + page dédiée en 2-3h.

---

## Ce que je déconseille à court terme

**Ne pas ouvrir les propositions élèves avant d'avoir 3-5 partenariats présentiel solides.** La crédibilité vient d'abord de la preuve par l'exemple. Un projet élève mal encadré peut nuire à la réputation auprès des enseignants.

**Ne pas brader le distanciel.** La tentation est de le tarifer 30-40% moins cher parce que "tu ne te déplaces pas". Erreur : la valeur est dans la préparation, l'animation et le suivi, pas dans le trajet. Maximum -15% sur le présentiel équivalent.

---

## Intégration dans les documents existants

Trois choses à mettre à jour maintenant :

**1. Offre commerciale** — ajouter une ligne "Format distanciel" dans la grille tarifaire, et un pack hybride dans les packages thématiques.

**2. Dossier de présentation** — ajouter une section "Nos modalités d'intervention" avec un tableau Présentiel / Distanciel / Hybride / Projet élève.

**3. Site web** — la page `/pour-les-ecoles` et `/ateliers` peuvent déjà afficher les ateliers avec un badge "Distanciel disponible" sur les 6 ateliers listés ci-dessus. Dans `WorkshopDB`, le champ `tags` peut accueillir `"distanciel"` et `"projet-élève"` sans migration.
