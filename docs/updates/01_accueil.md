# Page d'accueil — `/fr` — Mise à jour

> **Statut :** Mise à jour ciblée  
> **Constat après analyse :** La structure des 3 pôles est déjà en place et bien visible. Les ajustements portent sur l'équité visuelle entre les pôles, le renforcement de certaines sections, et la suppression de contenus résiduels orientés "ancien concept".  
> **Priorité :** Moyenne — la page est fonctionnelle, les corrections sont d'ordre qualitatif et éditorial.

---

## 1. Navigation — Ajout manquant

```
CONSTAT : La navigation affiche bien les 3 pôles mais l'ordre actuel est :
"Nos activités / Passerelle Jeunesse / Cavalier Studio / Le Projet / Catalogues / Tarification / Contact"

PROBLÈME : "Nos activités" renvoie à Ateliers 360 sans le nommer explicitement
dans la navigation principale. Un visiteur qui ne connaît pas le projet 
ne sait pas que "Nos activités" = Ateliers 360 Éducation.

CORRECTION RECOMMANDÉE :
Remplacer "Nos activités" par "Ateliers 360" dans la navigation principale
pour mettre les 3 pôles à égalité de visibilité :

Avant : Nos activités | Passerelle Jeunesse | Cavalier Studio | Le Projet | ...
Après : Ateliers 360  | Passerelle Jeunesse | Cavalier Studio | Le Projet | ...
```

---

## 2. Section "Accès rapides" (bandeau sous le hero)

```
CONSTAT : Le bandeau affiche 4 accès rapides :
[Tarifs] [Réserver] [Modules] [Packs]

PROBLÈME : Ces 4 accès pointent tous vers Ateliers 360. 
Passerelle Jeunesse et Cavalier Studio n'ont aucun accès rapide.

CORRECTION : Remplacer par 3 accès rapides équilibrés (1 par pôle)
puis 1 accès transversal :

┌─────────────────┬──────────────────────┬──────────────────────┬───────────────┐
│ 🔬 Ateliers 360 │ 🏡 Passerelle Jeunesse│ 💻 Cavalier Studio   │ 📋 Tarifs     │
│ Explorer les    │ Inscrire mon enfant  │ Demander un devis    │ Voir les prix │
│ ateliers        │                      │                      │               │
└─────────────────┴──────────────────────┴──────────────────────┴───────────────┘

CTA Ateliers 360 → /fr/ateliers
CTA Passerelle Jeunesse → /fr/passerelle-jeunesse
CTA Cavalier Studio → /fr/contact?pole=cavalier-studio
CTA Tarifs → /fr/tarifs
```

---

## 3. Section "Trois pôles, une vision commune" — Amélioration de l'équité visuelle

```
CONSTAT : Les 3 cartes de pôles existent mais leur contenu est déséquilibré.
Ateliers 360 a 4 bullet points, Passerelle Jeunesse a 4, Cavalier Studio a 4.
L'équilibre textuel est correct. Le problème est ailleurs :

PROBLÈME 1 : Les CTA ne sont pas au même niveau d'appel à l'action.
"Explorer Ateliers 360" (action dynamique) vs "Découvrir Passerelle Jeunesse" 
vs "Découvrir Cavalier Studio" — uniformiser le verbe d'action.

CORRECTION DES CTA :
Ateliers 360 → "Voir les ateliers →"
Passerelle Jeunesse → "Découvrir l'espace →"  
Cavalier Studio → "Voir les services →"

PROBLÈME 2 : Aucune mention de prix/tarif indicatif pour Cavalier Studio
alors qu'Ateliers 360 a ses tarifs sur /fr/tarifs. Ajouter sous la carte CS :
"À partir de 290 € | Devis gratuit sous 48h"

PROBLÈME 3 : Aucune mention de contact/inscription pour Passerelle Jeunesse.
Ajouter sous la carte PJ :
"Sur inscription | Places limitées | contact@ateliers360.fr"
```

---

## 4. Section "Parcours publics" — Réécriture pour les 3 pôles

```
CONSTAT : La section "Trouvez rapidement le bon format" contient 4 parcours,
dont 3 pointent vers Ateliers 360 (disciplines, modules, packs) et 1 vers 
Cavalier Studio. Passerelle Jeunesse est absente.

CORRECTION : Réécrire les 4 parcours pour couvrir les 3 pôles :

Parcours 1 — ATELIERS 360 (conserver)
Titre : "Explorer par discipline"
Texte : Sciences, code, robotique, IA, écologie ou espace : partez d'une 
thématique et trouvez les ateliers associés.
CTA : Voir les disciplines → /fr/disciplines

Parcours 2 — ATELIERS 360 (conserver)
Titre : "Construire une progression"
Texte : Les modules piliers structurent un cycle pédagogique, 
de la découverte au projet final.
CTA : Voir les modules → /fr/modules

Parcours 3 — PASSERELLE JEUNESSE ← MODIFIER
Titre actuel : "Planifier une offre groupée" (pointe vers /fr/packs)
Titre proposé : "Inscrire mon enfant à Passerelle Jeunesse"
Texte proposé : Accueil périscolaire, activités créatives, stages de vacances 
et loisirs éducatifs — découvrez les formules et disponibilités.
CTA proposé : Voir les formules → /fr/passerelle-jeunesse

Parcours 4 — CAVALIER STUDIO (améliorer)
Titre actuel : "Vous êtes une entreprise ou une collectivité ?"
Titre proposé : "Créer ou moderniser votre présence numérique"
Texte proposé : Site internet, application mobile, audit IA ou formation 
numérique — Cavalier Studio propose une offre complète pour les structures 
et entreprises du territoire.
CTA proposé : Découvrir Cavalier Studio → /fr/cavalier-studio
```

---

## 5. Section "Formats flexibles" — Suppression ou refonte

```
CONSTAT : La section "Distanciel, Hybride et Projets Élèves" existe mais
pointe uniquement vers /fr/pour-les-ecoles pour les 3 CTA.
C'est une section Ateliers 360 pur qui n'implique pas les 2 autres pôles.

OPTION A — Supprimer cette section :
Elle ajoute peu de valeur sur la page d'accueil et déséquilibre la 
représentation des pôles. Son contenu appartient mieux à /fr/ateliers.

OPTION B — Remplacer par une section "Qui sommes-nous ?" à 3 entrées :
Une section courte (3 colonnes) qui synthétise l'ancrage territorial :
• Basé à Metz, Grand Est
• 3 pôles complémentaires
• Intervenant au Luxembourg et en Wallonie

RECOMMANDATION : Option A (suppression de la page d'accueil).
```

---

## 6. Section "Pourquoi choisir Ateliers 360 Lab ?" — Enrichir pour les 3 pôles

```
CONSTAT : La section liste 3 arguments tous orientés Ateliers 360 :
• "Apprentissage pratique" → A360
• "Innovation pédagogique" → A360
• "Ancrage local" → Transversal (bien)

CORRECTION : Remplacer par 6 arguments équilibrés (2 par pôle) :

Ateliers 360 :
• "Apprentissage 100% pratique" — Des ateliers hands-on où les élèves 
  expérimentent et créent, du primaire au supérieur.
• "Catalogue progressif" — Ateliers unitaires, modules et packs adaptables 
  à tous les niveaux et tous les budgets.

Passerelle Jeunesse :
• "Un espace bienveillant" — Encadrement qualifié convention ÉCLAT, 
  dans un cadre chaleureux pensé pour l'épanouissement des jeunes.
• "Lien familles et école" — Communication régulière, programme mensuel 
  et lien permanent avec les parents.

Cavalier Studio :
• "Expertise locale et disponible" — Basés à Metz, disponibles pour 
  des RDV en présentiel et un suivi hebdomadaire de votre projet.
• "Tarifs compétitifs" — Qualité agence parisienne, tarifs adaptés 
  aux structures associatives et collectivités locales.
```

---

## 7. Section "Ateliers phares" — Ajouter des vitrines PJ et CS

```
CONSTAT : La section "Nos ateliers phares" pointe uniquement vers 
/fr/ateliers — 100% Ateliers 360.

CORRECTION : Transformer en section "À la une — 3 pôles" avec 3 blocs :

Bloc 1 — ATELIERS 360 (conserver)
"Nos ateliers phares" → /fr/ateliers

Bloc 2 — PASSERELLE JEUNESSE (ajouter)
Titre : "Activités du mois — Passerelle Jeunesse"
Texte : Découvrez le programme périscolaire et les prochains stages 
de vacances disponibles.
CTA : Voir le programme → /fr/passerelle-jeunesse

Bloc 3 — CAVALIER STUDIO (ajouter)
Titre : "Projets récents — Cavalier Studio"
Texte : Sites internet, applications mobiles et intégrations IA 
réalisés pour des structures de la région.
CTA : Voir les réalisations → /fr/cavalier-studio

Note développeur : Le bloc PJ peut afficher le programme du mois 
en dynamique depuis Supabase. Le bloc CS peut pointer vers une 
section /fr/cavalier-studio#realisations à créer.
```

---

## 8. Footer — Correction résiduelle

```
CONSTAT : Le footer affiche dans la description :
"Éduquer, accompagner et innover grâce aux sciences, au numérique 
et à la jeunesse. Trois pôles complémentaires basés à Metz au service 
du Grand Est." ✅ Correct.

MAIS la section footer principale n'a qu'une colonne "Découvrir" qui 
liste tout en vrac sans différencier les pôles.

CORRECTION : Organiser le footer en 3 colonnes par pôle + 1 colonne légale :

Colonne 1 — Ateliers 360
• Nos ateliers
• Modules piliers
• Packs & cycles
• Disciplines
• Pour les écoles
• Catalogues

Colonne 2 — Passerelle Jeunesse
• Présentation
• Programme périscolaire
• Stages vacances
• Inscription
• Contact familles

Colonne 3 — Cavalier Studio
• Présentation
• Sites & apps
• Intelligence artificielle
• Conseil & accompagnement
• Bloom Connect
• Demander un devis

Colonne 4 — Légal (conserver l'existant)
```

---

## 9. Meta & SEO — Mises à jour

```
Titre actuel : "Ateliers 360 Lab"
Titre proposé : "Ateliers 360 Lab | Ateliers STEM, Périscolaire & Numérique — Metz Grand Est"

Description actuelle : (non visible dans le scraping)
Description proposée : 
"Ateliers 360 Lab — 3 pôles complémentaires à Metz : Ateliers 360 
(sciences, robotique, IA pour les écoles), Passerelle Jeunesse 
(périscolaire et loisirs), Cavalier Studio (développement numérique). 
Grand Est · Luxembourg · Wallonie."

Thème couleur : #0d9488 (teal) → conserver
```
