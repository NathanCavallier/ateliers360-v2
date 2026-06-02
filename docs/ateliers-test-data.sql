-- Données de test pour les ateliers avec catégories
-- À exécuter après avoir appliqué la migration-add-categorie.sql

-- Atelier Robotique
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie)
VALUES (
  'initiation-robotique',
  'Initiation à la Robotique',
  'Découvrez les bases de la robotique en construisant et programmant votre premier robot. Atelier pratique et ludique pour débutants.',
  ARRAY['Comprendre les composants d''un robot', 'Assembler un robot simple', 'Programmer des mouvements de base', 'Développer l''esprit d''équipe'],
  '8-12 ans',
  3,
  45,
  'Kit robotique éducatif, ordinateur, capteurs',
  'Robotique'
);

-- Atelier IA
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie)
VALUES (
  'decouverte-ia',
  'Découverte de l''Intelligence Artificielle',
  'Explorez le monde fascinant de l''IA à travers des activités pratiques. Créez votre premier modèle d''apprentissage automatique.',
  ARRAY['Comprendre les bases de l''IA', 'Créer un modèle simple', 'Entraîner un réseau de neurones', 'Applications pratiques de l''IA'],
  '12-16 ans',
  4,
  55,
  'Ordinateur, plateforme de programmation visuelle, datasets',
  'IA'
);

-- Atelier Programmation
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie)
VALUES (
  'programmation-scratch',
  'Programmation avec Scratch',
  'Apprenez les fondamentaux de la programmation en créant vos propres jeux et animations avec Scratch.',
  ARRAY['Maîtriser les bases de la programmation', 'Créer un jeu interactif', 'Comprendre les boucles et conditions', 'Développer la créativité'],
  '7-11 ans',
  2.5,
  35,
  'Ordinateur, logiciel Scratch',
  'Programmation'
);

-- Atelier Sciences
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie)
VALUES (
  'physique-forces',
  'Les Forces et le Mouvement',
  'Expérimentez avec les lois de la physique à travers des activités hands-on. Construisez des machines simples et comprenez leur fonctionnement.',
  ARRAY['Comprendre les forces fondamentales', 'Construire des machines simples', 'Expérimenter la friction et l''inertie', 'Appliquer les lois de Newton'],
  '9-13 ans',
  3,
  40,
  'Matériel d''expérimentation, poulies, leviers, plans inclinés',
  'Sciences'
);

-- Atelier Ingénierie
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie)
VALUES (
  'defi-pont',
  'Défi Ingénierie : Construire un Pont',
  'Relevez le défi de construire le pont le plus solide possible avec des matériaux limités. Apprenez les principes de l''ingénierie structurelle.',
  ARRAY['Comprendre les structures et forces', 'Travailler en équipe', 'Tester et itérer', 'Optimiser les ressources'],
  '10-14 ans',
  3.5,
  50,
  'Matériaux de construction (bâtonnets, colle, ficelle), balance',
  'Ingénierie'
);

-- Atelier Technologie
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie)
VALUES (
  'circuits-electroniques',
  'Circuits Électroniques pour Débutants',
  'Découvrez l''électronique en créant vos propres circuits. Allumez des LEDs, utilisez des capteurs et créez des projets interactifs.',
  ARRAY['Comprendre les circuits électriques', 'Utiliser une breadboard', 'Programmer un microcontrôleur', 'Créer un projet interactif'],
  '11-15 ans',
  4,
  60,
  'Arduino, breadboard, composants électroniques, LED, capteurs',
  'Technologie'
);
