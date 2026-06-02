-- Create children table with health fields
create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  birth_date date,
  emergency_contact_name text,
  emergency_contact_phone text,
  doctor_name text,
  allergies text[],
  other_allergies text,
  pai_required boolean default false,
  pai_url text,
  consent_pdf_path text,
  meds_authorized text,
  notes text,
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- Basic RLS: only family owner or supabase service role
alter table children enable row level security;

create policy "Family owner can select" on children for select
  using (
    children.family_id = auth.uid()
  );

create policy "Family owner can update" on children for update
  using (
    children.family_id = auth.uid()
  )
  with check (
    children.family_id = auth.uid()
  );
