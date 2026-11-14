-- Martinez Knight Prospect Pipeline
-- Run in Supabase SQL Editor. Create the first admin user in Authentication,
-- then insert that user's UUID into public.admin_users.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.prospects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  contact_name text,
  email text,
  phone text,
  industry text,
  location text,
  source text default 'Website discovery form',
  stage text not null default 'Form received',
  priority text not null default 'Unassessed',
  estimated_value numeric,
  next_action text,
  follow_up_date date,
  form_data jsonb not null default '{}'::jsonb,
  assessment jsonb not null default '{}'::jsonb,
  notes text
);

alter table public.admin_users enable row level security;
alter table public.prospects enable row level security;

drop policy if exists "Admins can view admin list" on public.admin_users;
create policy "Admins can view admin list" on public.admin_users
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Public can submit discovery forms" on public.prospects;
create policy "Public can submit discovery forms" on public.prospects
for insert to anon, authenticated
with check (
  business_name is not null and length(trim(business_name)) > 0
  and form_data->>'consent' = 'yes'
);

drop policy if exists "Admins can read prospects" on public.prospects;
create policy "Admins can read prospects" on public.prospects
for select to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Admins can update prospects" on public.prospects;
create policy "Admins can update prospects" on public.prospects
for update to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Admins can insert prospects" on public.prospects;
create policy "Admins can insert prospects" on public.prospects
for insert to authenticated
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

create index if not exists prospects_created_at_idx on public.prospects(created_at desc);
create index if not exists prospects_stage_idx on public.prospects(stage);
create index if not exists prospects_follow_up_idx on public.prospects(follow_up_date);
