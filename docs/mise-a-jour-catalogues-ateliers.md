# Mise a jour du site a partir des catalogues Ateliers 360

Date : 2026-05-02  
Sources analysees :

- `Catalogue d'Ateliers.pdf` : catalogue operationnel 2026-2027, 26 ateliers immediatement realisables, 6 thematiques.
- `Catalogue Thematique.pdf` : reserve de thematiques et projets interdisciplinaires, a mobiliser selon les besoins des etablissements.

## Objectif

Mettre le site en coherence avec l'offre reelle d'Ateliers 360 :

- presenter une offre d'ateliers, animations et interventions pedagogiques ;
- retirer ou masquer tout ce qui presente Ateliers 360 comme organisme de formation directe ;
- eviter les formulations liees a la formation professionnelle, aux certifications, au CPF, aux OPCO, a Qualiopi ou aux attestations de formation ;
- distinguer clairement le catalogue operationnel, immediatement vendable, du catalogue thematique, utile pour le sur-mesure.

## Positionnement editorial a appliquer

Formulation recommandee :

- "ateliers pedagogiques"
- "animations scientifiques et numeriques"
- "interventions en etablissement"
- "cycles d'ateliers"
- "projets thematiques sur mesure"
- "sensibilisation"
- "initiation"
- "decouverte"
- "accompagnement pedagogique"

Formulations a retirer ou a masquer :

- "formation"
- "formations pro"
- "module de formation"
- "plan de formation"
- "attestation de formation"
- "competences acquises"
- "financable CPF"
- "OPCO"
- "Qualiopi"
- "certification"
- "cours professionnel"

Cas acceptable :

- "formation technique personnelle de l'intervenant" dans la page a propos, si cela decrit le parcours de Nathan.
- "se former" dans un sens non commercial doit etre evite si une formulation atelier peut le remplacer.

## Synthese du catalogue operationnel

Le catalogue operationnel doit devenir la base principale du site. Il presente une offre concrete, comprehensible et commercialisable.

### Structure generale

6 thematiques principales :

1. Sciences & Experiences
2. Numerique & Code
3. Robotique & IA
4. Numerique Responsable
5. Ecologie & Sciences de la Vie
6. Espace & Aeronautique

Promesse centrale :

- rendre la technologie accessible et concrete ;
- ateliers interactifs, pratiques et innovants ;
- publics du primaire aux adultes, avec adaptation du niveau ;
- intervention en academie Nancy-Metz / zone B.

### Ateliers operationnels visibles dans l'extraction PDF

Sciences & Experiences :

- Chimie amusante
- Electricite & circuits
- Physique en action

Numerique & Code :

- Scratch & programmation visuelle
- Python & algorithmes
- Creation web HTML/CSS

Robotique & IA :

- Initiation a la robotique
- Intelligence artificielle
- Projets robotiques avances

Numerique Responsable :

- Atelier cyber-citoyennete
- Atelier securite numerique
- Atelier eco-numerique

Ecologie & Sciences de la Vie :

- Biodiversite locale
- Developpement durable
- Jardinage scientifique

Espace & Aeronautique :

- Fusees a eau
- Systeme solaire
- Mission spatiale

Note : le catalogue annonce 26 ateliers au total. L'integration finale devra reprendre les 26 entrees completes depuis le catalogue source ou depuis la base interne, pas seulement les ateliers listables par extraction texte.

### Formats et tarifs a reprendre

Formats :

- Atelier decouverte : 1h30
- Atelier standard : 2h
- Atelier approfondi : 3h
- Journee complete : 6h
- Cycles ou programmes sur mesure

Tarifs indicatifs :

- 1h30 : a partir de 150 euros HT, groupe de 15 participants maximum
- 2h : 200 euros HT
- 3h : 280 euros HT
- 6h : 480 euros HT
- Devis personnalise pour projets specifiques

Remises / conditions :

- -10% a partir de 3 ateliers reserves
- -15% pour les etablissements partenaires
- -20% pour un programme annuel
- deplacement gratuit dans un rayon de 30 km
- 0,50 euro/km au-dela
- materiel pedagogique inclus

### Processus commercial a afficher

1. Contact initial
2. Atelier decouverte
3. Co-construction du programme
4. Convention, realisation des ateliers, bilan

Important : remplacer "evaluation des acquis" par une formulation moins formation professionnelle, par exemple :

- "bilan pedagogique"
- "retour d'experience"
- "recommandations pour poursuivre"

## Synthese du catalogue thematique

Le catalogue thematique doit etre presente comme une reserve d'idees et de projets adaptables, pas comme une liste d'ateliers garantis immediatement disponibles.

Positionnement recommande :

- "Une banque de thematiques pour construire des interventions sur mesure."
- "Les projets sont adaptes selon l'age, le niveau, le temps disponible, le materiel et les objectifs de l'etablissement."
- "Certains projets avances necessitent une phase de preparation ou une adaptation simplifiee."

### Thematiques transversales identifiees

Thematiques du catalogue :

- Ecologie & Environnement
- Espace & Aeronautique
- Mobilite & Transport
- Architecture & Urbanisme
- Robotique & Automatismes
- Informatique & Algorithmique
- Biologie & Medecine
- Physique & Energie
- Chimie & Materiaux
- Cybersecurite & Reseaux
- Art, Design & Creation
- Societe, Economie & Donnees
- Securite & Urgences
- Jeu & Gamification

Le PDF annonce 15 thematiques transversales, mais l'extraction identifie 14 familles nommees. A verifier dans le fichier source avant affichage public.

### Usage recommande sur le site

Ne pas afficher le catalogue thematique comme un catalogue de produits reservables directement.

L'utiliser pour :

- une page "Thematiques sur mesure" ;
- des cartes de domaines ;
- des exemples de projets ;
- une section "Vous avez un besoin specifique ?" ;
- alimenter la page contact et les formulaires de demande.

## Pages et sections du site concernees

### Navigation principale

Fichier : `src/components/common/Header.tsx`

Etat actuel :

- le groupe "solutions" contient `/formations`.

Action :

- retirer le lien "Formations" ;
- remplacer par un lien vers une page "Thematiques" ou "Ateliers sur mesure".

Proposition :

- `Ateliers`
- `Thematiques`
- `Pour les ecoles`
- `Tarifs`
- `A propos`
- `Contact`

### Footer

Fichier : `src/components/common/Footer.tsx`

Etat actuel :

- lien vers `/formations-pro`.

Action :

- supprimer `/formations-pro` ;
- remplacer par `/pour-les-ecoles`, `/tarifs` ou une future page `/thematiques`.

### Page d'accueil

Fichier : `src/app/[locale]/page.tsx`

Section a modifier :

- bloc "Formations Awareness Section"
- clefs `HomePage.formations.*` dans `messages/fr.json` et `messages/en.json`

Action :

- remplacer cette section par "Ateliers sur mesure pour etablissements".

Contenu recommande :

- titre : "Des ateliers adaptes a votre public"
- texte : "Choisissez un atelier operationnel ou construisons une intervention a partir de nos thematiques transversales."
- 3 piliers :
  - Catalogue operationnel : 26 ateliers prets a animer
  - Thematiques sur mesure : projets adaptes aux objectifs pedagogiques
  - Formats flexibles : 1h30, 2h, 3h, journee ou cycle
- CTA : "Construire un atelier" vers `/contact` ou `/pour-les-ecoles`

### Page Ateliers

Fichier : `src/app/[locale]/atelier/page.tsx`

Actions :

- remplacer les categories actuelles par les 6 thematiques operationnelles :
  - Sciences & Experiences
  - Numerique & Code
  - Robotique & IA
  - Numerique Responsable
  - Ecologie & Sciences de la Vie
  - Espace & Aeronautique
- adapter le texte hero pour annoncer "26 ateliers" ;
- retirer les categories generiques non alignees : "ingenierie", "technologie" si elles ne correspondent pas aux familles du catalogue operationnel ;
- verifier les filtres prix : le prix maximum actuel semble limite a 200 euros alors que les formats vont jusqu'a 480 euros HT.

### Donnees Supabase des ateliers

Etat actuel :

- les donnees de demarrage mentionnent 6 ateliers de test dans `QUICK-START.md`.

Action :

- remplacer les donnees de test par les 26 ateliers operationnels ;
- ajouter une colonne ou convention claire pour distinguer :
  - atelier operationnel reservable ;
  - projet thematique sur mesure non reservable directement ;
  - pack/cycle.

Champs recommandes par atelier :

- slug
- titre
- thematique
- courte description
- public cible
- duree recommandee
- format : decouverte, standard, approfondi, journee, cycle
- objectifs pedagogiques
- materiel requis
- livrable ou production finale
- niveau : primaire, college, lycee, adultes, mixte
- statut : `ready`, `custom`, `hidden`

### Page Pour les ecoles

Fichier : `src/app/[locale]/pour-les-ecoles/page.tsx`

Action :

- aligner la page avec le processus du catalogue operationnel :
  - contact initial ;
  - atelier decouverte ;
  - co-construction ;
  - convention et bilan ;
- mettre en avant les formats et remises ;
- remplacer toute mention "programme de formation" par "programme d'ateliers".

### Page Tarifs

Fichier : `src/app/[locale]/tarifs/page.tsx`

Action :

- reprendre la grille tarifaire operationnelle :
  - 150 euros HT / 1h30 ;
  - 200 euros HT / 2h ;
  - 280 euros HT / 3h ;
  - 480 euros HT / 6h ;
  - remises et frais de deplacement ;
- preciser "tarifs indicatifs, devis personnalise selon contexte, materiel, effectif et deplacement".

### Pages Formations

Fichiers :

- `src/app/[locale]/formations/page.tsx`
- `src/app/[locale]/formations-pro/page.tsx`

Action recommandee :

- masquer ces pages dans la navigation et le sitemap ;
- soit les rediriger vers `/atelier` ou `/pour-les-ecoles` ;
- soit les transformer plus tard en pages "Ateliers adultes" et "Interventions professionnelles", sans utiliser le vocabulaire de la formation professionnelle.

Decision conseillee pour la premiere version :

- redirection `/formations` -> `/pour-les-ecoles`
- redirection `/formations-pro` -> `/pour-les-ecoles`

### Page Modules

Fichier : `src/app/[locale]/modules/page.tsx`

Action :

- verifier que "module" ne designe pas un module de formation ;
- repositionner comme "modules d'ateliers" ou "formats d'intervention" ;
- si ambigu, masquer temporairement.

### Page Packs

Fichier : `src/app/[locale]/packs/page.tsx`

Action :

- garder si la page parle de cycles d'ateliers ;
- remplacer "parcours" trop proche de formation par "cycle thematique" si necessaire ;
- relier aux programmes annuels et remises du catalogue.

### Page Disciplines / future Thematiques

Fichiers possibles :

- `src/app/[locale]/disciplines/page.tsx`
- future route `src/app/[locale]/thematiques/page.tsx`

Action :

- utiliser le catalogue thematique ici ;
- afficher les familles transversales comme source d'inspiration ;
- ne pas rendre ces projets reservables en un clic ;
- CTA principal : "Construire une intervention sur mesure".

### Page Contact / Reservation

Fichiers :

- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/reserver/page.tsx`
- `src/components/reservations/ReservationForm.tsx`

Action :

- distinguer deux demandes :
  - reserver un atelier operationnel ;
  - demander une intervention sur mesure ;
- ajouter un champ "Thematique souhaitee" ou "Objectif pedagogique".

### Sitemap

Fichier : `src/app/sitemap.ts`

Action :

- retirer `/formations-pro` ;
- retirer ou rediriger `/formations` ;
- ajouter `/thematiques` si la page est creee.

### Textes legaux et CGV

Fichiers / traductions :

- `messages/fr.json`
- `messages/en.json`
- pages CGV / conditions / mentions

Action :

- remplacer "formations" par "interventions pedagogiques" ou "ateliers" ;
- supprimer les phrases qui pourraient laisser penser a un organisme de formation certifie ;
- conserver une formulation commerciale simple : ateliers, animations, cycles, prestations pedagogiques.

## Clefs de traduction a traiter en priorite

Fichier : `messages/fr.json`

Clefs a modifier ou supprimer :

- `HomePage.formations.*`
- `Navigation.formations`
- `Navigation.formations_pro`
- `FormationsPage.*`
- `FormationsProPage.*`
- mentions dans les FAQ qui parlent de Qualiopi, CPF, OPCO, attestation de formation
- `TermsPage.services_desc` ou equivalent, qui mentionne "formations"

Fichier : `messages/en.json`

Meme nettoyage cote anglais :

- remplacer "training" par "workshops", "educational workshops", "custom interventions" ou "awareness sessions".

## Proposition de nouvelle architecture publique

Version courte pour la premiere mise a jour :

- `/fr` : accueil
- `/fr/atelier` : catalogue operationnel des 26 ateliers
- `/fr/thematiques` ou `/fr/disciplines` : catalogue thematique sur mesure
- `/fr/pour-les-ecoles` : offre etablissements et processus
- `/fr/tarifs` : grille tarifaire
- `/fr/contact` : demande de devis / prise de contact
- `/fr/a-propos` : presentation du projet

Pages a masquer temporairement :

- `/fr/formations`
- `/fr/formations-pro`
- eventuellement `/fr/modules` si le vocabulaire reste ambigu

## Plan de mise en oeuvre recommande

### Etape 1 - Nettoyage commercial urgent

- retirer les liens Formations / Formations Pro de la navigation et du footer ;
- retirer la section formations de la home ;
- retirer les pages formations du sitemap ;
- ajouter des redirections vers `/pour-les-ecoles`.

### Etape 2 - Mise a jour du catalogue ateliers

- creer ou importer les 26 ateliers operationnels dans Supabase ;
- aligner les categories et filtres de `/atelier` sur les 6 thematiques ;
- mettre a jour les textes hero et CTA.

### Etape 3 - Page thematiques sur mesure

- creer une page dediee aux thematiques transversales ;
- afficher les familles du catalogue thematique ;
- ajouter des exemples courts par famille ;
- CTA vers contact, pas reservation directe.

### Etape 4 - Tarifs et processus

- mettre a jour `/tarifs` avec la grille du catalogue ;
- mettre a jour `/pour-les-ecoles` avec le processus en 4 etapes ;
- ajouter les remises et frais de deplacement.

### Etape 5 - Nettoyage legal et linguistique

- relire toutes les traductions ;
- supprimer les mentions CPF, OPCO, Qualiopi, attestation ;
- harmoniser le vocabulaire : atelier, intervention, animation, cycle.

## Recommandation finale

Pour la premiere version publique, le site doit vendre une offre simple :

"Ateliers 360 anime des ateliers scientifiques, numeriques et technologiques pour les etablissements, associations et groupes. Un catalogue de 26 ateliers est disponible immediatement, et des interventions sur mesure peuvent etre construites a partir de thematiques transversales."

Cette formulation est plus juste que "formation" et evite les implications administratives ou certificatives liees a la formation professionnelle.
