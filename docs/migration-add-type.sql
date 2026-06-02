-- Migration: Assurer que la colonne 'type' existe et est peuplée
-- Date: 2026-05-10
-- Description: Ajoute la colonne 'type' si elle n'existe pas et peuple les ateliers existants

-- Étape 1: Ajouter la colonne type si elle n'existe pas
ALTER TABLE ateliers 
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'workshop';

-- Étape 2: Ajouter la colonne sequence_order si elle n'existe pas
ALTER TABLE ateliers 
ADD COLUMN IF NOT EXISTS sequence_order INT DEFAULT 0;

-- Étape 3: Ajouter constraint pour limiter les valeurs
ALTER TABLE ateliers
ADD CONSTRAINT check_type 
CHECK (type IN ('workshop', 'module', 'pack'))
DEFERRABLE INITIALLY DEFERRED;

-- Étape 4: Si la colonne type est vide, peupler avec 'workshop' par défaut
UPDATE ateliers 
SET type = 'workshop' 
WHERE type IS NULL;

-- Étape 5: Définir des ateliers spécifiques comme 'module' si nécessaire
-- (À adapter selon votre logique métier)
-- Exemple: Si le titre contient 'Module', marquer comme module
-- UPDATE ateliers 
-- SET type = 'module' 
-- WHERE titre ILIKE '%module%' AND type != 'module';

-- Commentaires de documentation
COMMENT ON COLUMN ateliers.type IS 'Type d''atelier: workshop (atelier classique), module (formation longue), ou pack (bundle)';
COMMENT ON COLUMN ateliers.sequence_order IS 'Ordre d''affichage pour les listes';

-- Étape 6: Créer index pour performances de filtrage
CREATE INDEX IF NOT EXISTS idx_ateliers_type ON ateliers(type);
CREATE INDEX IF NOT EXISTS idx_ateliers_sequence ON ateliers(sequence_order);

-- Étape 7: Vérification finale
-- SELECT id, titre, type, sequence_order FROM ateliers ORDER BY sequence_order;
