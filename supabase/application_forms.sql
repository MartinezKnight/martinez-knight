-- Martinez Knight public form applications
-- Run once in Supabase SQL Editor. Candidate and training records remain separate
-- from the sales prospect pipeline.

create table if not exists public.candidate_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  field_of_interest text not null,
  consent boolean not null default false,
  form_data jsonb not null default '{}'::jsonb
);

create table if not exists public.training_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  programme text,
  consent boolean not null default false,
  form_data jsonb not null default '{}'::jsonb
);

alter table public.candidate_applications enable row level security;
alter table public.training_applications enable row level security;

drop policy if exists "Public can submit candidate applications" on public.candidate_applications;
create policy "Public can submit candidate applications"
on public.candidate_applications for insert to anon, authenticated
with check (
  consent = true
  and length(trim(full_name)) > 0
  and length(trim(email)) > 3
  and form_data->>'consent' = 'true'
);

drop policy if exists "Admins can read candidate applications" on public.candidate_applications;
create policy "Admins can read candidate applications"
on public.candidate_applications for select to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "Public can submit training applications" on public.training_applications;
create policy "Public can submit training applications"
on public.training_applications for insert to anon, authenticated
with check (
  consent = true
  and length(trim(full_name)) > 0
  and length(trim(email)) > 3
  and form_data->>'consent' = 'true'
);

drop policy if exists "Admins can read training applications" on public.training_applications;
create policy "Admins can read training applications"
on public.training_applications for select to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

create index if not exists candidate_applications_created_at_idx
on public.candidate_applications(created_at desc);
create index if not exists training_applications_created_at_idx
on public.training_applications(created_at desc);
