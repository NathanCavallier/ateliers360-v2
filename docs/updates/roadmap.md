# Roadmap de mise a jour du site Ateliers 360

> Document de pilotage pour mettre a jour `ateliers360.fr` selon les contenus fournis dans `docs/updates`.
> Cette roadmap concerne la refonte du site vitrine et des parcours publics, pas la roadmap produit globale de la plateforme.

---

## Objectif

Faire evoluer le site actuel vers le positionnement cible :

- Ateliers 360 SAS, basee a Metz, Grand Est.
- Trois poles lisibles : Ateliers 360, Passerelle Jeunesse, Cavalier Studio.
- Passerelle Jeunesse repositionnee sur le periscolaire, les loisirs educatifs et les stages.
- Cavalier Studio cree comme pole Solutions Numeriques, avec ses pages commerciales.
- Pages legales, formulaires, SEO, RGPD et navigation mis en coherence avant ouverture.

---

## Sources documentaires

| Fichier | Perimetre |
|---|---|
| `00_recapitulatif_site.md` | Synthese, priorites, plan d'action global |
| `01_accueil.md` | Accueil `/fr` |
| `02_presentation_poles.md` | Nos activites, Le Projet, Passerelle Jeunesse |
| `03_ateliers_catalogues_tarifs.md` | Ateliers, catalogues, modules, packs, disciplines, tarifs |
| `04_pages_fonctionnelles.md` | Ecoles, FAQ, contact, reservation, mission, recompenses |
| `05_pages_legales.md` | Mentions legales, CGV, confidentialite, conditions d'utilisation |
| `06_page_demo.md` | Nouvelle page demo `/fr/demo` |
| `cavalier_Studio/CS_*.md` | Hub Cavalier Studio et sous-pages |

---

## Etat des routes

### Routes deja presentes dans le projet

Ces routes existent deja dans `src/app/[locale]` et doivent etre mises a jour :

- `/fr`
- `/fr/nos-activites`
- `/fr/le-projet`
- `/fr/passerelle-jeunesse`
- `/fr/ateliers`
- `/fr/catalogues`
- `/fr/modules`
- `/fr/packs`
- `/fr/disciplines`
- `/fr/tarifs`
- `/fr/pour-les-ecoles`
- `/fr/faq`
- `/fr/contact`
- `/fr/demander-mission`
- `/fr/reserver`
- `/fr/recompenses`
- `/fr/mentions-legales`
- `/fr/cgv`
- `/fr/politique-confidentialite`
- `/fr/conditions-utilisation`

### Routes a creer

Routes prioritaires :

- `/fr/cavalier-studio` ✅
- `/fr/cavalier-studio/sites` ✅
- `/fr/cavalier-studio/bloom-connect` ✅
- `/fr/demo` ✅

Routes a creer en second temps :

- `/fr/cavalier-studio/applications` ✅
- `/fr/cavalier-studio/conseil` ✅
- `/fr/cavalier-studio/intelligence-artificielle` ✅
- `/fr/inscription-passerelle`
- `/fr/programme-passerelle`

Routes optionnelles ou a confirmer :

- `/fr/bloom-connect` : conserver seulement si la page doit vivre hors arborescence Cavalier Studio. Sinon preferer `/fr/cavalier-studio/bloom-connect`.
- `/fr/actualites` : le projet contient deja `/fr/blog`; arbitrer entre renommer, rediriger ou conserver `blog`.

---

## Phase 0 - Cadrage avant integration

**Objectif :** verrouiller les decisions qui bloquent les contenus juridiques, tarifs et formulaires.

### Taches

- Confirmer le nom public : `Ateliers 360 Lab`.
- Confirmer l'adresse exacte du local a Metz.
- Confirmer SIRET, RCS, capital social, TVA, APE/NAF apres immatriculation.
- Confirmer les emails par pole :
  - `ateliers@ateliers360.fr`
  - `passerelle@ateliers360.fr`
  - `cavalierstudio@ateliers360.fr` ou `numerique@ateliers360.fr`
- Confirmer les tarifs definitifs Ateliers 360, Passerelle Jeunesse et Cavalier Studio.
- Choisir la strategie Bloom Connect : (page sous Cavalier Studio pour l'instant).
  - page sous Cavalier Studio uniquement ;
  - ou page globale avec redirection/canonique.
- Decider du sort de `/fr/recompenses` : conserver comme programme partenaires ou masquer temporairement.

### Sortie attendue

- Liste des champs `[A completer]` valides.
- Decisions de navigation validees.
- Tableau de tarifs pret a integrer.

---

## Phase 1 - Mise en conformite critique avant ouverture

**Priorite : haute.**
Ces pages conditionnent la credibilite, la conformite et la coherence immediate du site.

### 1. Pages legales

Routes :

- `/fr/mentions-legales`
- `/fr/cgv`
- `/fr/politique-confidentialite`
- `/fr/conditions-utilisation`

Taches :

- Remplacer le statut micro-entreprise par SAS.
- Ajouter siege social a Metz, SIRET, RCS, TVA, capital, responsable de publication.
- Couvrir les trois poles dans les CGV.
- Integrer les traitements RGPD lies aux mineurs pour Passerelle Jeunesse.
- Ajouter les obligations de consentement sur les formulaires.
- Faire relire CGV et politique de confidentialite par un juriste ou DPO avant mise en ligne.

Critere de sortie :

- Aucune mention juridique obsolete.
- Aucune zone `[A completer]` visible en production.

### 2. Accueil et positionnement global

Route :

- `/fr`

Taches :

- Remplacer le positionnement deux poles par trois poles.
- Ajouter Cavalier Studio dans le hero, les cartes, les CTA et le footer.
- Repositionner Passerelle Jeunesse sur periscolaire, loisirs, stages et vie educative.
- Mettre a jour l'ancrage geographique : Metz, Grand Est.
- Mettre a jour title, meta description et Open Graph.

Critere de sortie :

- Le visiteur comprend en moins de 10 secondes les trois poles et la zone d'intervention.

### 3. Pages de presentation des poles

Routes :

- `/fr/nos-activites`
- `/fr/passerelle-jeunesse`
- `/fr/cavalier-studio`

Taches :

- Ajouter la carte Cavalier Studio dans `/fr/nos-activites`.
- Refonte complete de Passerelle Jeunesse : supprimer toute logique de trajet/mobilite.
- Creer le hub Cavalier Studio avec offres, tarifs, projets internes et CTA devis.
- Ajouter les liens de navigation entre les trois poles.

Critere de sortie :

- Chaque pole dispose d'une page claire, autonome et connectee au parcours de contact.

### 4. FAQ et tarifs

Routes :

- `/fr/faq`
- `/fr/tarifs`

Taches :

- Refonte FAQ par sections : general, Ateliers 360, Passerelle Jeunesse, Cavalier Studio, paiement.
- Ajouter grilles tarifaires Ateliers 360, Passerelle Jeunesse et Cavalier Studio.
- Supprimer toute tarification liee a l'ancien concept de mobilite.
- Ajouter les conditions d'annulation, acompte, paiement et devis sous 48h.

Critere de sortie :

- Les objections principales des familles, ecoles, collectivites et entreprises sont traitees.

---

## Phase 2 - Parcours de conversion et pages commerciales

**Priorite : haute a moyenne.**
Objectif : transformer les visiteurs en demandes qualifiees.

### 1. Contact

Route :

- `/fr/contact`

Taches :

- Enrichir le formulaire : profil, pole concerné, telephone, message minimum, piece jointe optionnelle.
- Ajouter opt-in RGPD obligatoire.
- Ajouter contacts directs par pole.
- Gerer les parametres URL :
  - `?pole=cavalier-studio`
  - `?service=sites`
  - `?service=applications`
  - `?service=audit-ia`
  - `?service=bloom-connect-b2b`
- Router les demandes vers le bon email ou ajouter un tag clair dans l'objet.
- Pour l'instant, toutes les réservations et tous les formulaires de contact doivent déclencher un email immédiat, sans aucun traitement backoffice.
- Implémenter le pré-remplissage du formulaire et l'envoi de métadonnées pour `pole` / `service`.

Critere de sortie :

- Une demande entrante indique toujours le pole, le profil du demandeur et le contexte.

### 2. Demo

Route a creer :

- `/fr/demo` ✅

Taches :

- Creer la page avec trois formats : demo presentiel, visio, kit decideur.
- Construire un formulaire dynamique selon le format choisi.
- Ajouter messages de confirmation differencies.
- Ajouter tag email `[DEMO]`.
- Ajouter lien vers le kit decideur quand il sera disponible.

Critere de sortie :

- Un prospect peut demander une demo sans passer par un devis complet.

> Note chantier : la page démo est créée et le flux envoie `source: DEMO` dans les métadonnées. La mise en place d'un tag email explicite pour le routage reste à finaliser.

### 3. Reservation et demande de mission

Routes :

- `/fr/reserver`
- `/fr/demander-mission`

Taches :

- Ajouter le champ de choix du pole.
- Remplacer le vocabulaire "mission de mobilite" ou "trajet" par "intervention", "atelier" ou "prestation".
- Afficher delai de reponse sous 48h.
- Afficher annulation gratuite jusqu'a 7 jours avant intervention.
- Ajouter acompte de 30 % pour commandes superieures a 500 euros.
- Envoyer un email de confirmation automatique avec recapitulatif.

Critere de sortie :

- Les parcours ne font plus reference a l'ancien service de mobilite.

### 4. Pour les ecoles

Route :

- `/fr/pour-les-ecoles`

Taches :

- Renforcer l'argumentaire decideur : programmes scolaires, commande publique, financement.
- Ajouter l'etape "compte-rendu pedagogique".
- Ajouter section documents : devis normalise, RIB, RC Pro, assurance.
- Ajouter section financement : credits pedagogiques, mairies, PEDT, associations de parents.

Critere de sortie :

- Un directeur, enseignant ou elu dispose des informations necessaires pour demander un devis.

---

## Phase 3 - Catalogue, offres et SEO de contenu

**Priorite : moyenne.**
Objectif : enrichir l'offre et ameliorer la lisibilite commerciale.

### 1. Ateliers

Route :

- `/fr/ateliers`

Taches :

- Mettre a jour le hero pour cibler ecoles, associations, entreprises et collectivites.
- Ajouter categories : IA, cybersecurite, ecologie numerique, FabLab, astronomie.
- Uniformiser les fiches ateliers : categorie, public, duree, niveau, competences, materiel, deplacement.
- Ajouter ateliers :
  - Comment l'IA apprend-elle ?
  - Proteger ses donnees
  - De l'idee a l'objet
  - L'empreinte carbone du numerique

### 2. Modules, packs, disciplines

Routes :

- `/fr/modules`
- `/fr/packs`
- `/fr/disciplines`

Taches :

- Ajouter module IA & Robotique.
- Ajouter module Eco-numerique.
- Ajouter pack Decouverte Ateliers 360 + Passerelle Jeunesse.
- Ajouter disciplines IA, cybersecurite, eco-numerique.
- Verifier les prix, la zone Grand Est et les delais de reservation.

### 3. Le Projet

Route :

- `/fr/le-projet`

Taches :

- Integrer vision SAS, trois poles et ancrage Metz.
- Remplacer les objectifs par : porte d'entree unique, familles rassurees, territoire, synergies internes.
- Mettre a jour la feuille de route : lancement 2026, structuration an 1-2, ancrage an 2-3, expansion an 3+.
- Ajouter section "Base a Metz, rayonnant sur le Grand Est".

---

## Phase 4 - Extension Cavalier Studio

**Priorite : moyenne apres lancement du hub.**
Objectif : transformer Cavalier Studio en vraie arborescence commerciale.

### Pages a creer

- `/fr/cavalier-studio/sites`
- `/fr/cavalier-studio/applications`
- `/fr/cavalier-studio/conseil`
- `/fr/cavalier-studio/intelligence-artificielle`
- `/fr/cavalier-studio/bloom-connect`

### Ordre recommande

1. `/fr/cavalier-studio/sites`
2. `/fr/cavalier-studio/bloom-connect`
3. `/fr/cavalier-studio/applications`
4. `/fr/cavalier-studio/conseil`
5. `/fr/cavalier-studio/intelligence-artificielle`

### Taches transversales

- Ajouter sous-menu Cavalier Studio dans la navigation.
- Ajouter liens footer vers Cavalier Studio et Bloom Connect.
- Creer ou integrer les visuels : logo, hero, icones, visuel Bloom Connect.
- Ajouter SEO cible :
  - agence web Metz Grand Est ;
  - developpement application Metz Luxembourg ;
  - audit IA PME Grand Est ;
  - mobilite Nancy Metz Luxembourg.
- Adapter formulaire contact via parametres `pole` et `service`.

---

## Phase 5 - Passerelle Jeunesse avancee

**Priorite : moyenne a basse selon ouverture du local.**

### Pages a creer

- `/fr/inscription-passerelle`
- `/fr/programme-passerelle`

### Taches

- Creer formulaire d'inscription enfant.
- Ajouter programme par periode : matin, soir, mercredi, vacances.
- Integrer contraintes RGPD donnees mineurs.
- Ajouter consentements parentaux, autorisations, contacts urgence si le formulaire collecte ces donnees.
- Ne pas publier de promesse tarifaire ferme tant que CAF/DDETS n'est pas valide.

---

## Phase 6 - Qualite, conformite et mise en ligne

**Objectif :** verifier que la refonte est prete a etre publiee.

### Checklist contenu

- Plus aucune mention de micro-entreprise.
- Plus aucune mention de Cote d'Azur, PACA ou Nice hors historique volontaire.
- Plus aucune mention de Passerelle Jeunesse comme service de trajet.
- Tous les CTA pointent vers une route existante.
- Les pages nouvelles sont reliees depuis navigation, footer ou pages parentes.
- Les titles et meta descriptions sont uniques.
- Les Open Graph sont renseignes pour les pages principales.

### Checklist formulaires

- Opt-in RGPD obligatoire sur chaque formulaire.
- Lien vers la politique de confidentialite.
- Message de confirmation clair avec delai de reponse.
- Routage ou tag email selon le pole.
- Aucun cookie analytics charge avant consentement.
- Refus cookies aussi simple que l'acceptation.

### Checklist accessibilite et performance

- Navigation clavier possible.
- Contrastes suffisants.
- Images avec textes alternatifs.
- Aucun texte important uniquement dans une image.
- Images optimisees en WebP ou equivalent.
- Lazy loading sur les images non critiques.
- Score Lighthouse cible : au moins 85/100 sur les pages principales.

### Checklist juridique

- Mentions legales, CGV et confidentialite relues avant publication.
- Donnees mineurs traitees explicitement.
- Finalites, durees de conservation et droits utilisateurs indiques.
- Coordonnees de contact RGPD visibles.

---

## Backlog optionnel

- Transformer `/fr/recompenses` en programme partenaires.
- Creer `/fr/actualites` ou aligner avec `/fr/blog`.
- Ajouter version anglaise ou allemande pour les cibles Luxembourg et Grande Region.
- Ajouter kit decideur PDF telechargeable.
- Ajouter temoignages ecoles et partenaires.
- Ajouter schema.org `LocalBusiness`, `EducationalOrganization` et `FAQPage`.
- Ajouter redirections si des slugs sont renommes.

---

## Planning recommande

| Periode | Objectif | Livrables |
|---|---|---|
| Semaine 1 | Cadrage et conformite | Decisions juridiques, tarifs, emails, navigation |
| Semaine 2 | Socle public critique | Accueil, pages legales, nos activites, Passerelle Jeunesse |
| Semaine 3 | Conversion | Contact, FAQ, tarifs, reserver, demander mission, demo |
| Semaine 4 | Catalogue | Ateliers, modules, packs, disciplines, pour les ecoles |
| Semaine 5 | Cavalier Studio | Hub, sites, Bloom Connect, navigation et footer |
| Semaine 6 | QA et mise en ligne | SEO, RGPD, accessibilite, Lighthouse, corrections |

---

## Definition of Done globale

La mise a jour est terminee lorsque :

- Les trois poles sont visibles et coherents sur l'accueil, la navigation et le footer.
- Les pages prioritaires ne contiennent plus d'ancien positionnement.
- Les formulaires collectent les informations utiles avec consentement RGPD.
- Les pages legales sont completes et relues.
- Les nouvelles routes prioritaires fonctionnent.
- Les tests manuels de navigation mobile et desktop sont valides.
- Les pages principales atteignent le niveau de performance et d'accessibilite cible.
