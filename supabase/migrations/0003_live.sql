-- ============================================================================
-- Live world feed + remote patch notes
-- Run in Supabase -> SQL Editor after 0001 and 0002.
-- ============================================================================

-- 1. Broadcast new match rows to connected clients (world achievement feed).
alter publication supabase_realtime add table public.match_results;

-- 2. Optional remote patch notes so you can post an update without redeploying.
create table if not exists public.patch_notes (
  version    text primary key,
  date       date not null default current_date,
  title      text not null,
  highlights text[] not null default '{}',
  changes    jsonb  not null default '[]', -- [{ "kind": "new|improved|balance|fixed", "text": "..." }]
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.patch_notes enable row level security;

drop policy if exists "patch notes are public" on public.patch_notes;
create policy "patch notes are public"
  on public.patch_notes for select using (published = true);

grant select on table public.patch_notes to anon, authenticated;

-- Example (optional):
-- insert into public.patch_notes (version, title, highlights, changes) values
--   ('3.0.1', 'Hotfix', array['Fixed Oathwall reflect on bosses'],
--    '[{"kind":"fixed","text":"Oathwall now correctly reflects boss charges."}]');
