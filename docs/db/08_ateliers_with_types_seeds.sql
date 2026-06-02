-- Seeds d'ateliers avec colonne type
-- À exécuter après les migrations

-- Atelier Robotique (Workshop classique)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'initiation-robotique',
  'Initiation à la Robotique',
  'Découvrez les bases de la robotique en construisant et programmant votre premier robot. Atelier pratique et ludique pour débutants.',
  ARRAY['Comprendre les composants d''un robot', 'Assembler un robot simple', 'Programmer des mouvements de base', 'Développer l''esprit d''équipe'],
  '8-12 ans',
  3,
  45,
  'Kit robotique éducatif, ordinateur, capteurs',
  'Robotique',
  'workshop',
  1
);

-- Atelier IA (Workshop classique)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'decouverte-ia',
  'Découverte de l''Intelligence Artificielle',
  'Explorez le monde fascinant de l''IA à travers des activités pratiques. Créez votre premier modèle d''apprentissage automatique.',
  ARRAY['Comprendre les bases de l''IA', 'Créer un modèle simple', 'Entraîner un réseau de neurones', 'Applications pratiques de l''IA'],
  '12-16 ans',
  4,
  55,
  'Ordinateur, plateforme de programmation visuelle, datasets',
  'IA',
  'workshop',
  2
);

-- Atelier Programmation (Workshop classique)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'programmation-scratch',
  'Programmation avec Scratch',
  'Apprenez les fondamentaux de la programmation en créant vos propres jeux et animations avec Scratch.',
  ARRAY['Maîtriser les bases de la programmation', 'Créer un jeu interactif', 'Comprendre les boucles et conditions', 'Développer la créativité'],
  '7-11 ans',
  2.5,
  35,
  'Ordinateur, logiciel Scratch',
  'Programmation',
  'workshop',
  3
);

-- Atelier Sciences (Workshop classique)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'physique-forces',
  'Les Forces et le Mouvement',
  'Expérimentez avec les lois de la physique à travers des activités hands-on. Construisez des machines simples et comprenez leur fonctionnement.',
  ARRAY['Comprendre les forces fondamentales', 'Construire des machines simples', 'Expérimenter la friction et l''inertie', 'Appliquer les lois de Newton'],
  '9-13 ans',
  3,
  40,
  'Matériel d''expérimentation, poulies, leviers, plans inclinés',
  'Sciences',
  'workshop',
  4
);

-- Atelier Ingénierie (Workshop classique)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'defi-pont',
  'Défi Ingénierie : Construire un Pont',
  'Relevez le défi de construire le pont le plus solide possible avec des matériaux limités. Apprenez les principes de l''ingénierie structurelle.',
  ARRAY['Comprendre les structures et forces', 'Travailler en équipe', 'Tester et itérer', 'Optimiser les ressources'],
  '10-14 ans',
  3.5,
  50,
  'Matériaux de construction (bâtonnets, colle, ficelle), balance',
  'Ingénierie',
  'workshop',
  5
);

-- Atelier Technologie (Workshop classique)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'circuits-electroniques',
  'Circuits Électroniques pour Débutants',
  'Découvrez l''électronique en créant vos propres circuits. Allumez des LEDs, utilisez des capteurs et créez des projets interactifs.',
  ARRAY['Comprendre les circuits électriques', 'Utiliser une breadboard', 'Programmer un microcontrôleur', 'Créer un projet interactif'],
  '11-15 ans',
  4,
  60,
  'Arduino, breadboard, composants électroniques, LED, capteurs',
  'Technologie',
  'workshop',
  6
);

-- MODULES (Formations longues - durée >= 4h)
-- Module Programmation Python (6h)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'module-python-complet',
  'Module Python Complet',
  'Formation complète sur Python : syntaxe, structures de données, POO, et projets pratiques sur 2 jours.',
  ARRAY['Maîtriser la syntaxe Python', 'Comprendre la POO', 'Manipuler les fichiers', 'Créer des projets complets'],
  '14-18 ans',
  6,
  120,
  'Ordinateur, Python installé, IDE',
  'Programmation',
  'module',
  10
);

-- Module IA Avancée (8h)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'module-ia-avancee',
  'Module Intelligence Artificielle Avancée',
  'Formation intensive sur l''IA : ML, deep learning, transformers, avec cas d''usage réels.',
  ARRAY['Deep learning fundamentals', 'Traiter des datasets', 'Fine-tuner des modèles', 'Déployer en production'],
  '15-20 ans',
  8,
  180,
  'Ordinateur haute performance, GPU optionnel, frameworks ML',
  'IA',
  'module',
  11
);

-- PACKS (Bundles - plusieurs ateliers combinés)
-- Pack Robotique & IA Débutant
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'pack-robotique-ia',
  'Pack Robotique & Intelligence Artificielle',
  'Pack complet combinant robotique basique et introduction à l''IA. Idéal pour explorer les deux domaines.',
  ARRAY['Comprendre la robotique', 'Introduction à l''IA', 'Intégrer IA dans des robots', 'Projet final interdisciplinaire'],
  '10-14 ans',
  7,
  140,
  'Kit robotique, ordinateur, capteurs, frameworks IA',
  'Robotique',
  'pack',
  20
);

-- Pack Formation Numérique Complète (Jeunes)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'pack-numerique-complet',
  'Pack Formation Numérique - Pour les jeunes',
  'Programme complet : programmation, robotique, IA et éthique du numérique. 3 jours intensifs.',
  ARRAY['Programmer en Scratch et Python', 'Robotique appliquée', 'Notions d''IA', 'Éthique et sécurité numérique'],
  '10-16 ans',
  12,
  250,
  'Ordinateurs, robots éducatifs, composants électroniques',
  'Numérique',
  'pack',
  21
);

-- Pack Pour les Écoles (Structures)
INSERT INTO ateliers (slug, titre, description, objectifs, public_cible, duree_heures, tarif_eur, materiel, categorie, type, sequence_order)
VALUES (
  'pack-formation-ecoles',
  'Pack Programme Scolaire - Robotique et Code',
  'Programme personnalisable pour écoles : s''adapte au niveau (primaire, collège, lycée) et au curriculum.',
  ARRAY['S''adapter aux niveaux scolaires', 'Intégration pédagogique', 'Projets pluridisciplinaires', 'Evaluation des apprentissages'],
  'Tous niveaux',
  20,
  2000,
  'Kit complet robotique + électronique + ordinateurs',
  'Robotique',
  'pack',
  22
);

-- Remarques :
-- - Les "workshop" sont des ateliers classiques courts (1-4h)
-- - Les "module" sont des formations longues (4h+) avec progression pédagogique
-- - Les "pack" sont des bundles combinant plusieurs thèmes
-- - sequence_order permet de contrôler l'ordre d'affichage sur le frontend
--   - workshops : 1-9
--   - modules : 10-19
--   - packs : 20-29
