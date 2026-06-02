-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  account_type text,
  is_verified boolean default false not null,
  metadata jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles add column if not exists account_type text;
alter table profiles add column if not exists is_verified boolean default false not null;
alter table profiles add column if not exists metadata jsonb;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_account_type_check'
  ) THEN
    ALTER TABLE profiles
      ADD CONSTRAINT profiles_account_type_check
      CHECK (
        account_type IN ('family', 'establishment', 'center', 'animator', 'learner', 'other')
        OR account_type IS NULL
      );
  END IF;
END
$$;

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a reusable function to create a profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, account_type, metadata)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'account_type',
    json_build_object(
      'created_at', timezone('utc'::text, now())
    )
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- OPTIONAL: Backfill existing users (Run this manually if you have existing users)
-- insert into public.profiles (id, email, full_name, avatar_url)
-- select id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url'
-- from auth.users
-- on conflict (id) do nothing;
