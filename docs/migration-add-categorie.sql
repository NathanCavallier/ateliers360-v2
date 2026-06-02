-- Migration: Ajouter la colonne categorie à la table ateliers
-- Date: 2025-12-14
-- Description: Ajoute une colonne pour stocker la catégorie de chaque atelier

-- Ajouter la colonne categorie
ALTER TABLE ateliers 
ADD COLUMN IF NOT EXISTS categorie TEXT;

-- Définir des valeurs par défaut pour les ateliers existants
UPDATE ateliers 
SET categorie = 'Sciences' 
WHERE categorie IS NULL;

-- Ajouter une contrainte pour limiter les valeurs possibles (optionnel)
ALTER TABLE ateliers 
ADD CONSTRAINT check_categorie 
CHECK (categorie IN ('Sciences', 'Robotique', 'Programmation', 'IA', 'Ingénierie', 'Physique', 'Technologie'));

-- Commentaire de documentation
COMMENT ON COLUMN ateliers.categorie IS 'Catégorie de l''atelier: Sciences, Robotique, Programmation, IA, Ingénierie, Physique, ou Technologie';
