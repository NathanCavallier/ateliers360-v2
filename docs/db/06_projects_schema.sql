-- Create projects table
create table if not exists projects (
  id bigint primary key generated always as identity,
  group_id bigint references groups(id) not null,
  title text not null,
  description text,
  status text check (status in ('active', 'archived')) default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create project_steps table
create table if not exists project_steps (
  id bigint primary key generated always as identity,
  project_id bigint references projects(id) on delete cascade not null,
  title text not null,
  description text,
  step_order int not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create project_deliverables table
create table if not exists project_deliverables (
  id bigint primary key generated always as identity,
  step_id bigint references project_steps(id) on delete cascade not null,
  member_id bigint references group_members(id) on delete cascade not null,
  content text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table projects enable row level security;
alter table project_steps enable row level security;
alter table project_deliverables enable row level security;

-- RLS Policies (Simplified for consistency with current dev mode)

-- Projects: Everyone can read, Admins/Animateurs can write
create policy "Projects are viewable by everyone" on projects
  for select using (true);

create policy "Projects are insertable by authenticated users" on projects
  for insert with check (true);

create policy "Projects are updatable by authenticated users" on projects
  for update using (true);

create policy "Projects are deletable by authenticated users" on projects
  for delete using (true);

-- Steps: Same as Projects
create policy "Steps are viewable by everyone" on project_steps
  for select using (true);

create policy "Steps are insertable by authenticated users" on project_steps
  for insert with check (true);

create policy "Steps are updatable by authenticated users" on project_steps
  for update using (true);

create policy "Steps are deletable by authenticated users" on project_steps
  for delete using (true);

-- Deliverables: Viewable by everyone (for now), Insertable by authenticated users (Students)
create policy "Deliverables are viewable by everyone" on project_deliverables
  for select using (true);

create policy "Deliverables are insertable by authenticated users" on project_deliverables
  for insert with check (true);

create policy "Deliverables are updatable by authenticated users" on project_deliverables
  for update using (true);

create policy "Deliverables are deletable by authenticated users" on project_deliverables
  for delete using (true);
