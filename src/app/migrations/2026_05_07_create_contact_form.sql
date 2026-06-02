-- migrations/2026_05_07_create_contact_form.sql
-- Prérequis : extension pour UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Trigger utilitaire pour updated_at (réutilisable)
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table contact_form : stocke les messages de contact généraux (site / formulaires)
CREATE TABLE IF NOT EXISTS public.contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- données du formulaire
  name text NOT NULL,
  email text NOT NULL,
  establishment text,         -- établissement / organisation (optionnel)
  role text,                  -- rôle de la personne (optionnel)
  message text NOT NULL,
  source text,                -- page / utm / campagne (optionnel)
  ip_address inet,            -- adresse IP (optionnel, utile pour rate-limit / audit)
  user_agent text,            -- user agent (optionnel)

  -- workflow
  status text NOT NULL DEFAULT 'new', -- new, in_progress, closed, spam
  assigned_to text,                    -- identifiant admin assigné (optionnel)

  -- métadonnées libres (ex: form fields, attachments info)
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Trigger pour mettre à jour updated_at automatiquement
DROP TRIGGER IF EXISTS set_timestamp_contact_form ON public.contact_form;
CREATE TRIGGER set_timestamp_contact_form
BEFORE UPDATE ON public.contact_form
FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();

-- Indexes utiles
CREATE INDEX IF NOT EXISTS idx_contact_form_email ON public.contact_form (email);
CREATE INDEX IF NOT EXISTS idx_contact_form_status ON public.contact_form (status);
CREATE INDEX IF NOT EXISTS idx_contact_form_created_at ON public.contact_form (created_at);
CREATE INDEX IF NOT EXISTS idx_contact_form_ip ON public.contact_form (ip_address);
CREATE INDEX IF NOT EXISTS idx_contact_form_metadata_gin ON public.contact_form USING gin (metadata jsonb_path_ops);

-- Optionnel : colonne tsvector pour recherche full-text sur name + message
ALTER TABLE public.contact_form
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Trigger pour maintenir search_vector
CREATE OR REPLACE FUNCTION public.contact_form_search_vector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.message, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contact_form_search_vector_update ON public.contact_form;
CREATE TRIGGER contact_form_search_vector_update
BEFORE INSERT OR UPDATE ON public.contact_form
FOR EACH ROW EXECUTE PROCEDURE public.contact_form_search_vector_trigger();

CREATE INDEX IF NOT EXISTS idx_contact_form_search_vector ON public.contact_form USING gin (search_vector);
