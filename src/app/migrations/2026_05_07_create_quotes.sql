-- migrations/2026_05_07_create_quotes.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Table quotes : métadonnées des devis générés (PDF stocké dans Supabase Storage)
CREATE TABLE IF NOT EXISTS public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  request_id uuid REFERENCES public.company_requests(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  quote_number text,
  offer_title text,
  items jsonb NOT NULL, -- tableau d'items {description, qty, unit_price, line_total}
  subtotal numeric(12,2) NOT NULL,
  tax_rate numeric(5,2) NOT NULL DEFAULT 20,
  tax numeric(12,2) NOT NULL,
  total numeric(12,2) NOT NULL,
  storage_path text NOT NULL, -- chemin dans Supabase Storage, ex: quotes/<uuid>.pdf
  storage_public boolean NOT NULL DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb
);

DROP TRIGGER IF EXISTS set_timestamp_quotes ON public.quotes;
CREATE TRIGGER set_timestamp_quotes
BEFORE UPDATE ON public.quotes
FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();

CREATE INDEX IF NOT EXISTS idx_quotes_request_id ON public.quotes (request_id);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes (created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_company_email ON public.quotes (company_name, email);
CREATE INDEX IF NOT EXISTS idx_quotes_metadata ON public.quotes USING gin (metadata jsonb_path_ops);
