-- ============================================================================
-- Realms of Aetheria — Supabase schema
-- Run in: Supabase Dashboard -> SQL Editor (or `supabase db push`)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. PROFILES  (one row per auth user; mirrors the local PlayerProfile shape)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  username         text not null,
  preferred_class  text not null default 'kensei',
  best_score       integer not null default 0,
  best_wave        integer not null default 0,
  total_kills      integer not null default 0,
  runs             integer not null default 0,
  unlocked_classes text[]  not null default '{kensei}',
  created_at       timestamptz not null default now(),
  last_seen        timestamptz not null default now(),
  constraint username_format check (username ~ '^[A-Za-z][A-Za-z0-9_]{2,15}$'),
  constraint preferred_class_valid check (
    preferred_class in ('kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade')
  )
);

-- usernames are unique case-insensitively (Akira == akira)
create unique index if not exists profiles_username_lower_key
  on public.profiles (lower(username));

-- ---------------------------------------------------------------------------
-- 2. MATCH RESULTS  (one row per inscribed run; powers the "Top Runs" tab)
-- ---------------------------------------------------------------------------
create table if not exists public.match_results (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  class_id         text not null,
  score            integer not null check (score >= 0),
  wave             integer not null check (wave >= 0),
  level            integer not null default 1,
  kills            integer not null default 0,
  gold             integer not null default 0,
  duration_seconds integer not null default 0,
  created_at       timestamptz not null default now(),
  constraint class_valid check (
    class_id in ('kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade')
  )
);
create index if not exists match_results_score_idx on public.match_results (score desc);
create index if not exists match_results_class_score_idx
  on public.match_results (class_id, score desc);
create index if not exists match_results_user_idx on public.match_results (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- 3. HERO RECORDS  (one row per user per hero; powers per-hero leaderboard)
-- ---------------------------------------------------------------------------
create table if not exists public.hero_records (
  user_id    uuid not null references auth.users (id) on delete cascade,
  class_id   text not null,
  best_score integer not null default 0,
  best_wave  integer not null default 0,
  runs       integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, class_id),
  constraint hero_class_valid check (
    class_id in ('kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade')
  )
);
create index if not exists hero_records_leaderboard_idx
  on public.hero_records (class_id, best_score desc);

-- ---------------------------------------------------------------------------
-- 4. AUTO-CREATE A PROFILE WHEN AN AUTH USER SIGNS UP
--    The client passes the validated username in signUp metadata.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text := nullif(trim(coalesce(new.raw_user_meta_data ->> 'username', '')), '');
begin
  if v_username is null or v_username !~ '^[A-Za-z][A-Za-z0-9_]{2,15}$' then
    raise exception 'Invalid username';
  end if;

  if exists (select 1 from public.profiles p where lower(p.username) = lower(v_username)) then
    raise exception 'That username is already registered';
  end if;

  insert into public.profiles (id, username)
  values (new.id, v_username);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 5. RECORD A RUN ATOMICALLY  (insert match + update hero record + profile)
--    Called from the game-over screen after authentication.
-- ---------------------------------------------------------------------------
create or replace function public.record_run(
  p_class_id         text,
  p_score            integer,
  p_wave             integer,
  p_level            integer default 1,
  p_kills            integer default 0,
  p_gold             integer default 0,
  p_duration_seconds integer default 0
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_best_wave integer;
begin
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.match_results
    (user_id, class_id, score, wave, level, kills, gold, duration_seconds)
  values
    (v_uid, p_class_id, p_score, p_wave, p_level, p_kills, p_gold, p_duration_seconds);

  insert into public.hero_records (user_id, class_id, best_score, best_wave, runs, updated_at)
  values (v_uid, p_class_id, p_score, p_wave, 1, now())
  on conflict (user_id, class_id) do update
    set best_score = greatest(public.hero_records.best_score, excluded.best_score),
        best_wave  = greatest(public.hero_records.best_wave, excluded.best_wave),
        runs       = public.hero_records.runs + 1,
        updated_at = now();

  -- recompute unlocks from the profile's new global best wave
  select greatest(best_wave, p_wave) into v_best_wave
  from public.profiles where id = v_uid;

  update public.profiles
     set best_score      = greatest(best_score, p_score),
         best_wave       = greatest(best_wave, p_wave),
         total_kills     = total_kills + p_kills,
         runs            = runs + 1,
         preferred_class = p_class_id,
         last_seen       = now(),
         unlocked_classes = coalesce((
           select array_agg(cid order by wave_req)
             from unnest(
               array['kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade'],
               array[0, 8, 15, 25, 40, 60]
             ) as t(cid, wave_req)
            where wave_req <= greatest(best_wave, p_wave)
         ), '{kensei}')
   where id = v_uid;
end;
$$;

-- ---------------------------------------------------------------------------
-- 6. LEADERBOARD QUERIES  (callable with the anon key; read-only)
-- ---------------------------------------------------------------------------
create or replace function public.overall_leaderboard(p_limit integer default 10)
returns table (
  id uuid, username text, preferred_class text,
  best_score integer, best_wave integer, runs integer, total_kills integer
)
language sql
security definer
set search_path = public
as $$
  select p.id, p.username, p.preferred_class,
         p.best_score, p.best_wave, p.runs, p.total_kills
    from public.profiles p
   where p.runs > 0
   order by p.best_score desc, p.best_wave desc, p.total_kills desc
   limit greatest(least(p_limit, 100), 1);
$$;

create or replace function public.hero_leaderboard(p_class_id text, p_limit integer default 10)
returns table (
  id uuid, username text, class_id text,
  best_score integer, best_wave integer, runs integer
)
language sql
security definer
set search_path = public
as $$
  select h.user_id, p.username, h.class_id,
         h.best_score, h.best_wave, h.runs
    from public.hero_records h
    join public.profiles p on p.id = h.user_id
   where h.class_id = p_class_id
   order by h.best_score desc, h.best_wave desc
   limit greatest(least(p_limit, 100), 1);
$$;

-- ---------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY
--    Leaderboards are world-readable; players can only write their own rows.
-- ---------------------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.match_results enable row level security;
alter table public.hero_records  enable row level security;

-- profiles: public read, owner-only direct update (RPC keeps aggregates honest)
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public"
  on public.profiles for select using (true);

drop policy if exists "players update own profile" on public.profiles;
create policy "players update own profile"
  on public.profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);

-- match_results: public read, owner-only insert
drop policy if exists "match results are public" on public.match_results;
create policy "match results are public"
  on public.match_results for select using (true);

drop policy if exists "players insert own matches" on public.match_results;
create policy "players insert own matches"
  on public.match_results for insert
  with check (auth.uid() = user_id);

-- hero_records: public read only; all writes go through record_run()
drop policy if exists "hero records are public" on public.hero_records;
create policy "hero records are public"
  on public.hero_records for select using (true);
