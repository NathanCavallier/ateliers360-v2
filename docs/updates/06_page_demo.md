# Page "Demander une démo" — `/fr/demo`

> **Statut :** Page à créer  
> **Priorité :** Haute — convertit les prospects qualifiés avant le devis  
> **URL :** `ateliers360.fr/fr/demo`  
> **Rattachement :** Transversal (Ateliers 360 + Passerelle Jeunesse + Cavalier Studio)

---

## Meta & SEO

```
Titre : Demander une démo | Ateliers 360 Lab — Metz, Grand Est
Description : Réservez une démonstration gratuite d'un atelier scientifique,
découvrez Passerelle Jeunesse ou demandez une démo de nos solutions numériques.
En présentiel à Metz, en visio ou par vidéo — à votre convenance.
Slug : /fr/demo
```

---

## Hero

```
Titre H1 : Avant de signer, voyez par vous-même

Sous-titre :
Une démo vaut mieux que mille mots.
Choisissez le format qui vous convient — nous nous adaptons à votre agenda.
Gratuit, sans engagement, et personnalisé à votre contexte.
```

---

## Section "Trois formats de démo"

```
Titre H2 : Quel format vous convient ?
```

### Format A — Démo atelier en présentiel (30 min)

```
Icône : 🔬
Titre : Démo atelier en présentiel
Sous-titre : Venez voir un atelier en action dans nos locaux à Metz

Description :
Nous vous accueillons dans nos locaux et vous faisons vivre 20 à 30 minutes
d'un vrai atelier de votre choix — robotique, chimie, code, IA ou escape game.
Vous repartez avec toutes les réponses à vos questions et le devis si vous le souhaitez.

Inclus :
• Démonstration d'une séquence de l'atelier choisi
• Visite des espaces (salle Ateliers, FabLab, salle informatique)
• Échange de 10 min avec Nathan sur les modalités
• Remise du Kit Décideur (PDF) et d'une proposition de devis si souhaité

Durée : 45 min à 1h (démo 30 min + échange + visite)
Lieu : Nos locaux — Metz (adresse communiquée à la confirmation)
Disponibilité : Du lundi au vendredi, 9h-18h — sur rendez-vous

CTA : Réserver une démo présentiel → [formulaire section ci-dessous, type=presentiel]
```

### Format B — Démo en visioconférence (20 min)

```
Icône : 💻
Titre : Démo en visioconférence
Sous-titre : Une démonstration live depuis chez vous, sans déplacement

Description :
Nous vous montrons en partage d'écran les outils, les supports pédagogiques,
des extraits vidéo d'ateliers réels, et nous répondons à toutes vos questions
en temps réel. Idéal pour les décideurs à distance ou les emplois du temps chargés.

Inclus :
• Présentation de 10 min des ateliers Ateliers 360 (ou du pôle concerné)
• Extraits vidéo d'ateliers réels
• Échange personnalisé sur votre contexte
• Envoi du Kit Décideur + devis dans les 24h

Durée : 20 à 30 min
Outil : Google Meet ou Teams selon votre préférence
Disponibilité : Du lundi au vendredi, 8h-19h

CTA : Réserver une visio → [formulaire section ci-dessous, type=visio]
```

### Format C — Kit décideur + vidéo (immédiat)

```
Icône : 📦
Titre : Kit décideur + vidéo
Sous-titre : Tout voir sans prendre rendez-vous — reçu sous 2h

Description :
Vous n'avez pas le temps de prendre rendez-vous maintenant ?
Nous vous envoyons immédiatement notre Kit Décideur (PDF complet)
et une sélection de vidéos d'ateliers réels selon votre niveau cible.
Vous nous recontactez quand vous êtes prêt(e).

Inclus :
• Kit Décideur PDF (7 pages — qui nous sommes, ce que nous faisons,
  logistique, tarifs, FAQ décideur, prochaines étapes)
• 2 à 3 vidéos d'ateliers correspondant à votre niveau cible (2 à 4 min chacune)
• Proposition de devis indicatif dans les 24h si vous le souhaitez

Délai de réception : sous 2h ouvrées
Format : email avec pièces jointes et liens vidéo

CTA : Recevoir le kit maintenant → [formulaire section ci-dessous, type=kit]
```

---

## Section "Formulaire de demande de démo"

```
Titre H2 : Choisissez votre format et dites-nous en plus

⚠️ Note développeur :
Ce formulaire est unique avec un champ de type de démo (radio ou dropdown).
Selon la sélection, afficher dynamiquement les champs supplémentaires pertinents.
Routage email vers ateliers@ateliers360.fr avec tag [DEMO] dans l'objet.
```

### Champs du formulaire

```
CHAMPS COMMUNS (tous les types) :

• Prénom + Nom (obligatoire)
• Email professionnel (obligatoire)
• Téléphone (optionnel)
• Votre structure (obligatoire) :
    - École primaire
    - Collège
    - Lycée
    - Établissement du supérieur (BTS, IUT, Université)
    - Association / Centre de loisirs
    - Collectivité / Mairie
    - Entreprise
    - Autre
• Nom de votre établissement / structure (obligatoire)
• Ville (obligatoire)

• Pôle concerné (obligatoire, radio) :
    ○ Ateliers 360 — Sciences, robotique, IA, numérique
    ○ Passerelle Jeunesse — Périscolaire et loisirs
    ○ Cavalier Studio — Solutions numériques

• Format de démo souhaité (obligatoire, radio) :
    ○ Démo présentiel à Metz (45 min)
    ○ Visioconférence (20-30 min)
    ○ Kit décideur + vidéo (reçu sous 2h, sans RDV)

---

CHAMPS CONDITIONNELS — Si "Démo présentiel" sélectionné :
• Disponibilités souhaitées (3 créneaux) :
    - Créneau 1 : [date] [heure]
    - Créneau 2 : [date] [heure]
    - Créneau 3 : [date] [heure]
• Nombre de personnes qui assisteront à la démo

---

CHAMPS CONDITIONNELS — Si "Visioconférence" sélectionnée :
• Outil de visio préféré (dropdown) :
    - Google Meet
    - Microsoft Teams
    - Zoom
    - Pas de préférence
• Disponibilités souhaitées (2 créneaux)

---

CHAMPS CONDITIONNELS — Si "Kit décideur" sélectionné :
• Niveau(x) cible(s) (multi-select) :
    ☐ Maternelle / Primaire
    ☐ Collège
    ☐ Lycée
    ☐ Supérieur (BTS, IUT, Université)
    ☐ Adultes / Entreprise
• Thématique préférée (dropdown) :
    - Robotique
    - Sciences et chimie
    - Code et programmation
    - Intelligence artificielle
    - Escape game scientifique
    - Impression 3D / FabLab
    - Pas de préférence — vous suggérez

---

CHAMP COMMUN FINAL :
• Message libre / contexte supplémentaire (optionnel)
  Placeholder : "Décrivez brièvement votre contexte, vos contraintes ou vos questions..."
• ✅ J'accepte d'être recontacté(e) par Ateliers 360 Lab (RGPD obligatoire)
• [Envoyer ma demande]
```

### Message de confirmation après envoi

```
Pour "Démo présentiel" ou "Visioconférence" :
"Merci [Prénom] ! Votre demande de démo a bien été reçue.
Nous vous confirmons le créneau dans les 24h ouvrées.
En attendant, voici votre Kit Décideur en téléchargement : [lien PDF]"

Pour "Kit décideur" :
"Merci [Prénom] ! Votre kit est en route.
Vous allez recevoir un email de Nathan dans les 2h avec le Kit Décideur
et une sélection de vidéos adaptées à votre contexte."
```

---

## Section "Ils ont demandé une démo avant de signer"

```
Titre H2 : Ce que nos partenaires ont pensé de la démo

Citation 1 :
"J'étais sceptique sur le format escape game pour mes 5e. La démo nous a convaincus
en 20 minutes. Les élèves ont adoré."
— Professeur de mathématiques, collège Metz

Citation 2 :
"La démo vidéo suffisait à répondre à toutes mes questions. J'ai signé le devis
dans la foulée."
— Directrice école primaire, agglomération messine

Citation 3 :
"Voir l'espace Passerelle Jeunesse en vrai a tout changé pour nous. Notre fils s'y est
tout de suite projeté."
— Parent d'élève, Metz

⚠️ Note rédactionnelle : Remplacer par de vrais témoignages dès les premières démos réalisées.
```

---

## Section "Questions sur la démo"

```
Titre H2 : Questions fréquentes sur la démo

Q : La démo est-elle vraiment gratuite ?
R : Oui, sans condition et sans engagement de commande.
La démo est notre façon de vous montrer concrètement la qualité de nos interventions
avant toute décision.

Q : Puis-je amener des collègues ou des membres de l'équipe de direction ?
R : Oui, et c'est même recommandé. Les décisions d'achat impliquent souvent
plusieurs personnes — autant qu'elles voient toutes la réalité de l'atelier.
Merci de nous préciser le nombre de personnes lors de la demande.

Q : Je suis loin de Metz — la démo présentielle est-elle possible dans mon établissement ?
R : Pour les établissements du Grand Est, nous pouvons nous déplacer pour une démo
sur site dans le cadre d'un projet concret (effectif confirmé, date cible identifiée).
Contactez-nous pour en discuter.

Q : Combien de temps après la démo reçois-je le devis ?
R : Le devis est envoyé dans les 24h suivant la démo, sauf si vous souhaitez
un délai de réflexion. Aucune relance commerciale agressive — nous attendons
que vous reveniez vers nous à votre rythme.

Q : La démo est-elle disponible pour Cavalier Studio aussi ?
R : Oui. Pour les projets numériques, la démo prend la forme d'une présentation
de réalisations similaires et, pour les applications, d'un prototype interactif
ou d'une démo en environnement de staging.
```

---

## Footer de page

```
Vous avez une question avant de demander une démo ?
Écrivez-nous directement : ateliers@ateliers360.fr
Réponse sous 2h ouvrées.

[Revenir à l'accueil] | [Voir le catalogue d'ateliers] | [Voir les tarifs]
```

---

## Notes techniques pour le développement

```
1. Intégration Calendly :
   Pour les formats "présentiel" et "visio", intégrer directement
   un widget Calendly en embed (plan Calendly Basic gratuit suffit au démarrage)
   plutôt qu'un formulaire de créneaux manuels.
   Configurer un agenda "Démo Ateliers 360" et un agenda "Démo Cavalier Studio".

2. Téléchargement du Kit Décideur :
   Héberger le PDF Kit Décideur sur le CDN du site (pas sur Google Drive).
   Lien de téléchargement automatique après envoi du formulaire.
   Tracker les téléchargements dans Google Analytics (événement "kit_decideur_download").

3. Paramètre URL :
   Accepter ?type=presentiel|visio|kit pour pré-sélectionner le format
   depuis les liens des autres pages (ex: le Kit Décideur renvoie vers
   /fr/demo?type=kit).
   Accepter ?pole=a360|pj|cs pour pré-sélectionner le pôle concerné.

4. Notification interne :
   Chaque soumission de formulaire → notification WhatsApp Business ou email
   vers ateliers@ateliers360.fr avec le tag [DEMO PRÉSENTIEL], [DEMO VISIO]
   ou [KIT DEMANDÉ] dans l'objet.
   Objectif : répondre sous 2h pour les kits, sous 24h pour les RDV.

5. Suivi conversions :
   Créer un événement Google Analytics "demo_requested" avec les propriétés :
   - demo_type (presentiel / visio / kit)
   - pole (a360 / pj / cs)
   - structure_type (ecole / collectivite / entreprise / etc.)
   Permet de mesurer quel format convertit le mieux.
```
