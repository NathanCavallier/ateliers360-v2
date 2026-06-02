-- Script SQL pour ajouter des données de test pour les événements
-- À exécuter dans l'éditeur SQL de Supabase

-- Insérer des événements pour les prochaines semaines
-- Note: Assurez-vous que les ateliers avec ces IDs existent déjà

-- Événements de décembre 2025
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(1, '2025-12-18', '14:00', '17:00', 12, '123 Rue de la Science, Paris'),
(2, '2025-12-19', '10:00', '12:00', 8, '123 Rue de la Science, Paris'),
(1, '2025-12-20', '14:00', '17:00', 10, '123 Rue de la Science, Paris'),
(3, '2025-12-21', '09:00', '16:00', 15, '123 Rue de la Science, Paris');

-- Événements entre Noël et Nouvel An
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(2, '2025-12-26', '10:00', '12:00', 6, '123 Rue de la Science, Paris'),
(1, '2025-12-27', '14:00', '17:00', 8, '123 Rue de la Science, Paris'),
(3, '2025-12-28', '09:00', '16:00', 12, '123 Rue de la Science, Paris'),
(2, '2025-12-30', '10:00', '12:00', 10, '123 Rue de la Science, Paris');

-- Événements de janvier 2026
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(1, '2026-01-08', '14:00', '17:00', 15, '123 Rue de la Science, Paris'),
(2, '2026-01-09', '10:00', '12:00', 12, '123 Rue de la Science, Paris'),
(3, '2026-01-10', '09:00', '16:00', 20, '123 Rue de la Science, Paris'),
(1, '2026-01-15', '14:00', '17:00', 10, '123 Rue de la Science, Paris'),
(2, '2026-01-16', '10:00', '12:00', 8, '123 Rue de la Science, Paris'),
(3, '2026-01-17', '09:00', '16:00', 15, '123 Rue de la Science, Paris'),
(1, '2026-01-22', '14:00', '17:00', 12, '123 Rue de la Science, Paris'),
(2, '2026-01-23', '10:00', '12:00', 10, '123 Rue de la Science, Paris');

-- Événements de février 2026
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(3, '2026-02-06', '09:00', '16:00', 18, '123 Rue de la Science, Paris'),
(1, '2026-02-07', '14:00', '17:00', 10, '123 Rue de la Science, Paris'),
(2, '2026-02-13', '10:00', '12:00', 12, '123 Rue de la Science, Paris'),
(3, '2026-02-14', '09:00', '16:00', 15, '123 Rue de la Science, Paris'),
(1, '2026-02-20', '14:00', '17:00', 8, '123 Rue de la Science, Paris'),
(2, '2026-02-21', '10:00', '12:00', 6, '123 Rue de la Science, Paris');

-- Stage vacances d'hiver (plusieurs jours consécutifs)
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(3, '2026-02-23', '09:00', '16:00', 15, '123 Rue de la Science, Paris'),
(3, '2026-02-24', '09:00', '16:00', 15, '123 Rue de la Science, Paris'),
(3, '2026-02-25', '09:00', '16:00', 15, '123 Rue de la Science, Paris'),
(3, '2026-02-26', '09:00', '16:00', 15, '123 Rue de la Science, Paris'),
(3, '2026-02-27', '09:00', '16:00', 15, '123 Rue de la Science, Paris');

-- Événements de mars 2026
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(1, '2026-03-06', '14:00', '17:00', 12, '123 Rue de la Science, Paris'),
(2, '2026-03-07', '10:00', '12:00', 10, '123 Rue de la Science, Paris'),
(3, '2026-03-13', '09:00', '16:00', 20, '123 Rue de la Science, Paris'),
(1, '2026-03-14', '14:00', '17:00', 15, '123 Rue de la Science, Paris'),
(2, '2026-03-20', '10:00', '12:00', 8, '123 Rue de la Science, Paris'),
(3, '2026-03-21', '09:00', '16:00', 15, '123 Rue de la Science, Paris');

-- Quelques événements complets (places_disponibles = 0)
INSERT INTO events (atelier_id, date_event, heure_debut, heure_fin, places_disponibles, adresse) VALUES
(1, '2026-03-27', '14:00', '17:00', 0, '123 Rue de la Science, Paris'),
(2, '2026-03-28', '10:00', '12:00', 0, '123 Rue de la Science, Paris');
