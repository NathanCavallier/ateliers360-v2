-- FIX RLS POLICIES FOR DEV / MVP (Allowing Anon/Public access)
-- Since the current Admin uses NextAuth (not Supabase Auth), the client is "Anonymous".
-- We need to allow public/anon access for CRUD operations.

-- GROUPS
drop policy if exists "Authenticated insert" on groups;
drop policy if exists "Authenticated update" on groups;
drop policy if exists "Authenticated delete" on groups;

create policy "Public insert" on groups for insert with check (true);
create policy "Public update" on groups for update using (true);
create policy "Public delete" on groups for delete using (true);

-- GROUP MEMBERS
drop policy if exists "Authenticated all" on group_members;
create policy "Public all" on group_members for all using (true);

-- GROUP SESSIONS
drop policy if exists "Authenticated all" on group_sessions;
create policy "Public all" on group_sessions for all using (true);

-- ATTENDANCE
drop policy if exists "Authenticated all" on attendance;
create policy "Public all" on attendance for all using (true);

-- GROUP RESOURCES
drop policy if exists "Authenticated users can upload resources" on group_resources;
drop policy if exists "Users can delete their own resources or admins" on group_resources;

create policy "Public insert" on group_resources for insert with check (true);
create policy "Public delete" on group_resources for delete using (true);

-- STORAGE (Bucket 'group-resources')
-- Note: You might need to update this in the Dashboard GUI if policies are complex
drop policy if exists "Allow authenticated uploads to group-resources" on storage.objects;
drop policy if exists "Allow internal deletions" on storage.objects;

create policy "Allow public uploads to group-resources"
  on storage.objects for insert
  with check ( bucket_id = 'group-resources' );

create policy "Allow public deletions"
  on storage.objects for delete
  using ( bucket_id = 'group-resources' );
