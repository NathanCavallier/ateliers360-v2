-- migrations/2026_05_07_create_company_requests.sql
-- Prérequis : extension pour UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table company_requests
CREATE TABLE IF NOT EXISTS public.company_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  offer_ref text,
  message text,
  status text NOT NULL DEFAULT 'new', -- new, in_progress, quoted, closed
  assigned_to text,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Triggers pour updated_at
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_company_requests ON public.company_requests;
CREATE TRIGGER set_timestamp_company_requests
BEFORE UPDATE ON public.company_requests
FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_company_requests_email ON public.company_requests (email);
CREATE INDEX IF NOT EXISTS idx_company_requests_status ON public.company_requests (status);
CREATE INDEX IF NOT EXISTS idx_company_requests_created_at ON public.company_requests (created_at);
CREATE INDEX IF NOT EXISTS idx_company_requests_metadata_quote ON public.company_requests USING gin (metadata jsonb_path_ops);
