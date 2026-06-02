-- Invitations table for family linking
create table if not exists family_invitations (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references auth.users(id) on delete cascade,
  child_id uuid references children(id) on delete cascade,
  token text unique not null,
  email text,
  created_at timestamptz default timezone('utc'::text, now()),
  expires_at timestamptz
);

alter table family_invitations enable row level security;
create policy "Public create invites" on family_invitations for insert with check (true);
create policy "Owner can read invites" on family_invitations for select using (
  family_invitations.family_id = auth.uid()
);
