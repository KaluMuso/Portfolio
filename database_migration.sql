-- ─────────────────────────────────────────────────────────────────────────────
-- Vergeo Group — Supabase schema bootstrap.
--
-- Idempotent: safe to re-run. Designed to fix the original "RLS not enabled,
-- waitlist PII readable by anyone with the anon key" issue.
--
-- Run this whole file in: Supabase Dashboard → SQL Editor → New Query.
-- After it succeeds, run the verification block at the bottom and confirm:
--   - waitlist.rowsecurity = true
--   - site_settings.rowsecurity = true
--   - The "anon read leak test" returns NO ROWS for the anon role.
-- ─────────────────────────────────────────────────────────────────────────────

-- ───────────────────────────────────────────────────────── waitlist table ──
create table if not exists public.waitlist (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  company_name  text,
  industry      text,
  email         text not null,
  phone         text,
  whatsapp      text,
  district      text,
  other_business_type text,
  created_at    timestamptz not null default now()
);

-- Email is unique-ish — repeat signups get caught by the API and treated as success.
do $$
begin
  if not exists (select 1 from pg_indexes where indexname = 'waitlist_email_key') then
    create unique index waitlist_email_key on public.waitlist (lower(email));
  end if;
end $$;

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_district_idx   on public.waitlist (district);

-- Add columns added in earlier patches, in case the table existed pre-bootstrap.
alter table public.waitlist
  add column if not exists phone text,
  add column if not exists whatsapp text,
  add column if not exists other_business_type text;

-- ─────────────────────────────────────────────────── site_settings table ──
-- Single-row table (id=1) holding mutable site config edited from /admin/settings.
create table if not exists public.site_settings (
  id                       int primary key default 1 check (id = 1),
  available_for_projects   boolean      not null default true,
  response_time            text         not null default 'Within 2 hours',
  whatsapp_number          text         not null default '+260 761 359 005',
  contact_email            text         not null default 'info@vergeo.company',
  calendly_url             text         not null default '',
  availability_message     text         not null default 'Available for projects',
  updated_at               timestamptz  not null default now()
);

insert into public.site_settings (id) values (1)
  on conflict (id) do nothing;

-- Patch pre-existing tables: ensure updated_at exists (older versions of this
-- table didn't have it, which makes the touch_site_settings trigger fail with
-- 'record "new" has no field "updated_at"').
alter table public.site_settings
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.touch_site_settings()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_site_settings();

-- ────────────────────────────────────────────────────────────── RLS lockdown ──
-- This is the security fix. Without RLS enabled, anyone holding the anon key
-- (which is bundled into the public JS) could SELECT waitlist.* and scrape
-- emails, phone numbers, WhatsApp, and districts.
alter table public.waitlist      enable row level security;
alter table public.site_settings enable row level security;

-- Drop any pre-existing policies so this script is idempotent.
do $$
declare r record;
begin
  for r in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('waitlist', 'site_settings')
  loop
    execute format('drop policy if exists %I on %I.%I',
                   r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

-- waitlist:
--   • anon may INSERT (public signup form) — but not SELECT / UPDATE / DELETE.
--   • authenticated users (admin) may SELECT — for the admin UI.
--   • service_role bypasses RLS automatically; nothing to grant.
create policy "anon can insert waitlist signups"
  on public.waitlist for insert
  to anon
  with check (true);

create policy "authenticated can read waitlist"
  on public.waitlist for select
  to authenticated
  using (true);

-- site_settings:
--   • anyone (anon + authenticated) may SELECT — these values render on the
--     public marketing site (availability pill, contact info, etc).
--   • only authenticated may UPDATE — server actions go through service_role
--     anyway, but keeping a sane default here.
create policy "public can read site_settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "authenticated can update site_settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

-- ──────────────────────────────────────────────── chat_leads + chat_messages ──
-- These tables back the "Vergeo Chat Webhook Pipeline" in n8n. The portfolio
-- fires fire-and-forget webhooks to n8n for every chat turn and every
-- qualified lead; n8n writes a row here via service_role.

create table if not exists public.chat_leads (
  id            uuid primary key default gen_random_uuid(),
  session_id    text,
  name          text,
  email         text not null,
  source        text,              -- e.g. "speedo-chat"
  site_url      text,
  occurred_at   timestamptz not null default now(),
  created_at    timestamptz not null default now()
);
create unique index if not exists chat_leads_session_email_key
  on public.chat_leads (session_id, lower(email));
create index if not exists chat_leads_occurred_at_idx
  on public.chat_leads (occurred_at desc);

create table if not exists public.chat_messages (
  id               uuid primary key default gen_random_uuid(),
  session_id       text,
  lead_name        text,
  lead_email       text,
  user_message     text,
  assistant_reply  text,
  provider         text,            -- "openrouter" | "kimi"
  occurred_at      timestamptz not null default now(),
  created_at       timestamptz not null default now()
);
create index if not exists chat_messages_session_idx
  on public.chat_messages (session_id, occurred_at);
create index if not exists chat_messages_occurred_at_idx
  on public.chat_messages (occurred_at desc);

-- Lock these tables down the same way as waitlist: only service_role writes
-- (n8n uses it), authenticated admin reads them, anon touches nothing.
alter table public.chat_leads    enable row level security;
alter table public.chat_messages enable row level security;

do $$
declare r record;
begin
  for r in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in ('chat_leads', 'chat_messages')
  loop
    execute format('drop policy if exists %I on %I.%I',
                   r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

create policy "authenticated can read chat_leads"
  on public.chat_leads for select
  to authenticated
  using (true);

create policy "authenticated can read chat_messages"
  on public.chat_messages for select
  to authenticated
  using (true);
-- No anon policies by design — anon has zero access.

-- ─────────────────────────────────────────────────── grants (RLS-aware) ──
grant usage  on schema public to anon, authenticated;
grant insert on public.waitlist to anon;
grant select on public.waitlist to authenticated;
grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;
grant select on public.chat_leads, public.chat_messages to authenticated;

-- ────────────────────────────────────────────────────── verification ──
-- After the script runs, execute these queries (separately) to confirm.
--
-- 1) RLS is on:
--    select tablename, rowsecurity
--    from pg_tables
--    where schemaname = 'public' and tablename in ('waitlist','site_settings');
--
-- 2) The anon role CANNOT read the waitlist (the original PII leak test):
--    set role anon;
--    select count(*) from public.waitlist;   -- should error or return 0 rows
--    reset role;
--
-- 3) Insert as anon still works (so the public form keeps working):
--    set role anon;
--    insert into public.waitlist (name, email, phone)
--      values ('Test', 'test@example.com', '+260000000000');
--    reset role;
--    delete from public.waitlist where email = 'test@example.com';
