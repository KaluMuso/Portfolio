-- Fix for admin Settings save error:
-- 'record "new" has no field "updated_at"'
--
-- Cause: site_settings table pre-dated the bootstrap migration, so
-- CREATE TABLE IF NOT EXISTS skipped it. The touch_site_settings trigger
-- then references a non-existent column.
--
-- Run this once in the Supabase SQL Editor.

alter table public.site_settings
  add column if not exists updated_at timestamptz not null default now();

-- Verify:
--   select column_name from information_schema.columns
--   where table_schema='public' and table_name='site_settings';
