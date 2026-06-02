-- migrations/2026_05_07_create_structure_requests.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Reusable trigger function for updated_at
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table structure_requests
CREATE TABLE IF NOT EXISTS public.structure_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  structure_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  audience text,
  message text,
  status text NOT NULL DEFAULT 'new',
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Trigger to update updated_at on update
DROP TRIGGER IF EXISTS set_timestamp_structure_requests ON public.structure_requests;
CREATE TRIGGER set_timestamp_structure_requests
BEFORE UPDATE ON public.structure_requests
FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamp();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_structure_requests_email ON public.structure_requests (email);
CREATE INDEX IF NOT EXISTS idx_structure_requests_status ON public.structure_requests (status);
CREATE INDEX IF NOT EXISTS idx_structure_requests_created_at ON public.structure_requests (created_at);
CREATE INDEX IF NOT EXISTS idx_structure_requests_metadata ON public.structure_requests USING gin (metadata jsonb_path_ops);
