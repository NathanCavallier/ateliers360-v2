-- Script SQL pour ajouter des articles de blog de test
-- À exécuter dans l'éditeur SQL de Supabase

-- Insérer des articles de blog avec métadonnées enrichies
INSERT INTO blog_articles (slug, titre, excerpt, contenu, published_at) VALUES
(
  'initiation-programmation-enfants',
  'L''importance de l''initiation à la programmation dès le plus jeune âge',
  'Découvrez pourquoi il est essentiel d''introduire les concepts de programmation aux enfants et comment cela développe leur pensée critique.',
  'La programmation n''est plus seulement une compétence technique réservée aux informaticiens. C''est devenu un langage universel qui permet de comprendre et façonner le monde numérique qui nous entoure.

## Développement de la pensée logique

Apprendre à programmer développe naturellement la pensée logique et la résolution de problèmes. Les enfants apprennent à décomposer des problèmes complexes en étapes simples et à penser de manière structurée.

Cette compétence est transférable à de nombreux domaines de la vie quotidienne, de la résolution de problèmes mathématiques à la planification de projets complexes.

## Créativité et innovation

La programmation offre un espace infini pour la créativité. Les enfants peuvent créer leurs propres jeux, animations, et applications, transformant leurs idées en réalité numérique.

Cette liberté créative stimule l''imagination et encourage les jeunes à explorer de nouvelles possibilités, développant ainsi leur confiance en leurs capacités d''innovation.

## Préparation pour l''avenir

Dans un monde de plus en plus numérique, comprendre les bases de la programmation devient une compétence fondamentale, au même titre que la lecture et l''écriture.

Les métiers du futur exigeront de plus en plus de compétences numériques, et commencer tôt donne aux enfants un avantage considérable.',
  '2025-12-01'
),
(
  'robotique-educative',
  'La robotique éducative : apprendre en construisant',
  'Comment la robotique permet aux jeunes de développer des compétences pratiques tout en s''amusant.',
  'La robotique éducative combine apprentissage pratique et théorique de manière ludique et engageante.

## Apprentissage par la pratique

En construisant et programmant des robots, les jeunes développent des compétences en mécanique, électronique et programmation de manière concrète et tangible.

Cette approche hands-on rend l''apprentissage plus mémorable et engage les élèves d''une manière que les méthodes traditionnelles ne peuvent pas.

## Travail d''équipe

La robotique encourage naturellement la collaboration. Les projets de robotique nécessitent souvent plusieurs personnes avec des compétences complémentaires, enseignant ainsi le travail d''équipe et la communication.

## Résolution de problèmes réels

Les défis de robotique présentent des problèmes authentiques qui nécessitent des solutions créatives. Les élèves apprennent à itérer, tester et améliorer leurs créations, développant ainsi la résilience et la pensée critique.',
  '2025-11-15'
),
(
  'impression-3d-ecoles',
  'L''impression 3D révolutionne l''apprentissage en classe',
  'Comment l''impression 3D permet aux élèves de concrétiser leurs idées et de comprendre des concepts abstraits.',
  'L''impression 3D transforme radicalement la façon dont nous enseignons et apprenons en classe.

## Visualiser l''invisible

L''impression 3D permet de rendre tangibles des concepts abstraits. En biologie, les élèves peuvent imprimer des modèles de cellules. En géométrie, des formes complexes deviennent manipulables.

## Encourager l''innovation

Quand les élèves peuvent créer des objets physiques à partir de leurs designs numériques, cela ouvre un monde de possibilités créatives et encourage l''esprit d''entreprise.

## Du design à la réalité

Le processus de conception, modélisation 3D et fabrication enseigne une méthodologie complète de création, du concept initial au produit final.',
  '2025-11-01'
),
(
  'scratch-pour-debuter',
  'Scratch : le meilleur outil pour débuter en programmation',
  'Pourquoi Scratch est l''outil idéal pour initier les jeunes à la logique de programmation de manière ludique.',
  'Scratch a révolutionné l''enseignement de la programmation aux enfants grâce à son interface visuelle et intuitive.

## Interface visuelle

Plutôt que de taper du code, les élèves assemblent des blocs de commandes comme des briques de Lego. Cette approche visuelle rend la programmation accessible dès 8 ans.

## Communauté active

Scratch dispose d''une immense communauté mondiale où les jeunes peuvent partager leurs créations, s''inspirer des autres et apprendre ensemble.

## Concepts fondamentaux

Malgré sa simplicité apparente, Scratch enseigne tous les concepts essentiels de la programmation : boucles, conditions, variables, événements, et plus encore.',
  '2025-10-20'
),
(
  'arduino-premiers-pas',
  'Arduino : créer ses premiers projets électroniques',
  'Guide pour découvrir Arduino et réaliser des projets électroniques simples mais captivants.',
  'Arduino est une plateforme idéale pour s''initier à l''électronique et au prototypage rapide.

## Qu''est-ce qu''Arduino ?

Arduino est une carte électronique programmable open-source qui permet de créer facilement des objets interactifs. Avec quelques composants simples, on peut faire clignoter des LEDs, lire des capteurs, ou contrôler des moteurs.

## Premiers projets

Les débutants peuvent commencer par des projets simples comme faire clignoter une LED, puis progresser vers des systèmes plus complexes comme des stations météo ou des robots.

## Écosystème riche

La communauté Arduino est immense, avec des milliers de tutoriels, de bibliothèques de code et de projets partagés gratuitement.',
  '2025-10-05'
),
(
  'intelligence-artificielle-enfants',
  'Initier les enfants à l''intelligence artificielle',
  'Comment expliquer l''IA aux plus jeunes et les préparer aux technologies de demain.',
  'L''intelligence artificielle n''est plus de la science-fiction, elle fait partie de notre quotidien.

## Démystifier l''IA

Il est important d''expliquer aux enfants ce qu''est vraiment l''IA : des programmes qui apprennent à partir de données, et non des robots conscients comme dans les films.

## Outils pédagogiques

Des plateformes comme Teachable Machine ou ML4Kids permettent aux enfants de créer leurs propres modèles d''IA de manière ludique, sans connaissance technique préalable.

## Éthique et responsabilité

Enseigner l''IA aux enfants, c''est aussi les sensibiliser aux questions éthiques : biais algorithmiques, respect de la vie privée, et utilisation responsable de la technologie.',
  '2025-09-28'
);
