-- Migration: Ajouter et peupler la colonne 'type' aux ateliers
-- Date: 2026-05-12
-- Description: 
--   1. Crée la colonne 'type' (si elle n'existe pas) avec DEFAULT 'workshop'
--   2. Ajoute une contrainte CHECK pour limiter les valeurs
--   3. Peuple les ateliers existants avec des types appropriés
--   4. Ajoute documentations et indexes

-- Étape 1: Ajouter la colonne type si elle n'existe pas
ALTER TABLE ateliers 
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'workshop';

-- Étape 2: Ajouter la colonne sequence_order pour l'affichage
ALTER TABLE ateliers 
ADD COLUMN IF NOT EXISTS sequence_order INT DEFAULT 0;

-- Étape 3: Ajouter constraint pour limiter les valeurs (DEFERRABLE pour migrations)
ALTER TABLE ateliers
DROP CONSTRAINT IF EXISTS check_type;

ALTER TABLE ateliers
ADD CONSTRAINT check_type 
CHECK (type IN ('workshop', 'module', 'pack'))
DEFERRABLE INITIALLY DEFERRED;

-- Étape 4: Peupler avec 'workshop' par défaut pour tous les ateliers
UPDATE ateliers 
SET type = 'workshop' 
WHERE type IS NULL;

-- Étape 5: Identifier et marquer les modules (formations longues)
-- Critères : durée >= 4 heures ou contient 'Module' dans le titre
UPDATE ateliers 
SET type = 'module' 
WHERE (duree_heures >= 4 OR titre ILIKE '%module%') 
  AND type = 'workshop';

-- Étape 6: Identifier et marquer les packs (bundles/formations combinées)
-- Critères : contient 'Pack', 'Bundle', 'Formation', 'Programme' dans le titre
UPDATE ateliers 
SET type = 'pack' 
WHERE (titre ILIKE '%pack%' OR titre ILIKE '%bundle%' 
   OR titre ILIKE '%formation%' OR titre ILIKE '%programme%')
  AND type = 'workshop';

-- Étape 7: Ajouter indexes pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_ateliers_type ON ateliers (type);
CREATE INDEX IF NOT EXISTS idx_ateliers_type_sequence ON ateliers (type, sequence_order);

-- Étape 8: Commentaires de documentation
COMMENT ON COLUMN ateliers.type IS 'Type d''atelier: workshop (atelier classique), module (formation longue), ou pack (bundle de formations)';
COMMENT ON COLUMN ateliers.sequence_order IS 'Ordre d''affichage pour les listes (peut être modifié par l''admin)';

-- Optionnel : Imprimer un résumé des types
-- SELECT type, COUNT(*) as count FROM ateliers GROUP BY type;
