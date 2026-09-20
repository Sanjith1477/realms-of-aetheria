# Realms of Aetheria — Project Bundle

This file contains all the project source code, configuration files, and SQL migrations bundled together.

## File: `package.json`

```json
{
  "name": "react-vite-tailwind",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.109.0",
    "clsx": "2.1.1",
    "react": "19.2.6",
    "react-dom": "19.2.6",
    "tailwind-merge": "3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.17",
    "@types/node": "22.19.17",
    "@types/react": "19.2.7",
    "@types/react-dom": "19.2.3",
    "@vitejs/plugin-react": "5.1.1",
    "tailwindcss": "4.1.17",
    "typescript": "5.9.3",
    "vite": "7.3.2",
    "vite-plugin-singlefile": "2.3.0"
  }
}
```

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "types": ["node"],

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"]
}
```

## File: `vite.config.ts`

```typescript
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

## File: `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
    />
    <meta name="theme-color" content="#0b0f16" />
    <title>Realms of Aetheria — Pocket MMORPG</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap"
      rel="stylesheet"
    />
    <style>
      html { background: #0b0f16; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## File: `.env.example`

```env
# Supabase — copy to .env and fill in from:
# Supabase Dashboard -> Project Settings -> API
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## File: `CONTINUE.md`

```markdown
# Realms of Aetheria — Project Handoff

Read this first, then read only the specific files you need to edit. Do not bulk-read the whole project.

## What this is
A browser action-RPG ("pocket MMORPG") built as a single-page game. Top-down canvas combat, endless waves, 8 playable legends, level-up power drafts, between-wave market, boss fights, local + cloud accounts, leaderboards.

## Stack & run
- Vite + React 19 + TypeScript + Tailwind CSS v4 (utility classes only, theme tokens in `src/index.css`).
- `npm install`, then `npm run dev` (dev) / `npm run build` (prod, single-file output).
- No backend required. Supabase is **optional**: works offline via localStorage; add `.env` with `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` to enable cloud accounts/leaderboards.
- Icons are inline SVG (custom set, `ClassEmblem.tsx`, `PowerIcon.tsx`). Audio is fully procedural WebAudio (`audio.ts`, `music.ts`). No external assets.

## File map
- `src/game/engine.ts` (~3.7k lines) — the whole simulation: player, enemies, AI, bosses, waves, camera, rendering, particles, HUD data bus, rerolls, shop/levelup state machine. Edit with care.
- `src/game/data.ts` — classes, zones, enemy defs, wave composition, powers, shop items, rarity meta.
- `src/game/lore.ts` — per-legend sagas + legacy ability defs.
- `src/game/audio.ts` / `music.ts` — synthesized SFX + zone/boss music.
- `src/game/highscores.ts` — local profiles, SHA-256 password hashing, score ledger, dedupe-per-player logic.
- `src/game/collection.ts` — power/item discovery tracking.
- `src/game/patchnotes.ts` — bundled patch notes (version source of truth, currently 3.2.0).
- `src/lib/supabase.ts` / `api.ts` — cloud client + typed API wrappers.
- `supabase/migrations/0001–0005*.sql` — schema, RLS, boss/discovery/odds migrations. User must run these in the Supabase SQL Editor.
- `src/components/` — React overlays: StartScreen, HUD, TouchControls, LevelUpOverlay, ShopOverlay, LoreCodex ("Sagas"), ProgressionIndex, Leaderboard, HighScoreList, AccountPanel (login/signup), ProfilePanel, SettingsOverlay, PatchNotesOverlay, TutorialOverlay, VolumeControl, RarityOdds, PauseOverlay, GameOverScreen.

## Key systems & numbers
- 8 legends, unlock at waves: kensei 0, shieldthane 8, jaguar 15, sandseer 25, tidecaller 40, riftblade 60, stormwarden 80, drakewarden 100.
- Boss every 5th wave; boss variant + color + special attack per realm (5 realms).
- Power/shop rarities: common/rare/epic/legendary. Powers: legendary unlocks at Lv 5, odds rise per level. Shop: epic at wave 5, legendary at wave 10, odds rise per wave.
- 3 shared rerolls (level-up + market), restored on boss kill. Keys: 1/2/3 choose, R reroll.
- Leaderboard: deduped to best score per player (per hero in storage), ranked by score only.
- Abandoning a run (TITLE from pause or game-over) still banks progress exactly once (guarded by `inscribedKeyRef` in App.tsx).
- Difficulty scales with wave (hp/dmg/speed/elite/cap/spawnGap curves in `difficulty()`).

## Conventions
- Tailwind utility-first; shared UI atoms are CSS classes in `index.css` (`panel`, `panel-gold`, `btn-gold`, `btn-dark`, `clip-notch`, `kbd`, `bar-shell`).
- HUD updates are imperative via a `HudBus` pub/sub (refs + direct DOM writes) to avoid React re-renders during gameplay. Overlays are React.
- Engine exposes a small public API: `start`, `restart`, `setPaused`, `toMenu`, `getStats`, `choosePower`, `rerollPowers/Shop`, `buyShopItem`, `continueFromShop`, `pushWorldEvent`, `unlockAudio`, `setVolumes`.
- `App.tsx` owns React state, auth, saves, and wires engine callbacks to screens.

## If asked to continue
1. Read this file.
2. Read only the files relevant to the request.
3. Keep edits surgical; the engine file is large — prefer targeted edits over rewrites.
```

## File: `supabase/migrations/0001_init.sql`

```sql
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
```

## File: `supabase/migrations/0002_grants.sql`

```sql
-- Extra grants so the browser anon/authenticated keys can call RPCs.
-- Run this in SQL Editor if leaderboard or INSCRIBE returns a permission error.

grant usage on schema public to anon, authenticated;

grant select on table public.profiles to anon, authenticated;
grant update on table public.profiles to authenticated;

grant select on table public.match_results to anon, authenticated;
grant insert on table public.match_results to authenticated;

grant select on table public.hero_records to anon, authenticated;

grant execute on function public.record_run(text, integer, integer, integer, integer, integer, integer) to authenticated;
grant execute on function public.overall_leaderboard(integer) to anon, authenticated;
grant execute on function public.hero_leaderboard(text, integer) to anon, authenticated;
```

## File: `supabase/migrations/0003_live.sql`

```sql
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
```

## File: `supabase/migrations/0004_competitive_unlocks.sql`

```sql
-- Competitive legend progression
-- New requirements: Kensei 0, Shieldthane 8, Jaguar 15,
-- Sandseer 25, Tidecaller 40, Riftblade 60.

-- Recalculate every existing profile from its true best wave.
update public.profiles p
set unlocked_classes = coalesce((
  select array_agg(cid order by wave_req)
  from unnest(
    array['kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade'],
    array[0, 8, 15, 25, 40, 60]
  ) as t(cid, wave_req)
  where wave_req <= p.best_wave
), '{kensei}');

-- Keep future run inscriptions on the same requirements.
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

  update public.profiles
  set best_score       = greatest(best_score, p_score),
      best_wave        = greatest(best_wave, p_wave),
      total_kills      = total_kills + p_kills,
      runs             = runs + 1,
      preferred_class  = p_class_id,
      last_seen        = now(),
      unlocked_classes = coalesce((
        select array_agg(cid order by wave_req)
        from unnest(
          array['kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade'],
          array[0, 8, 15, 25, 40, 60]
        ) as t(cid, wave_req)
        where wave_req <= greatest(public.profiles.best_wave, p_wave)
      ), '{kensei}')
  where id = v_uid;
end;
$$;

grant execute on function public.record_run(text, integer, integer, integer, integer, integer, integer) to authenticated;
```

## File: `supabase/migrations/0005_discovery.sql`

```sql
-- Persist progression-index discoveries across devices.
alter table public.profiles
  add column if not exists discovered_powers text[] not null default '{}',
  add column if not exists discovered_shop_items text[] not null default '{}';
```

## File: `src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## File: `src/index.css`

```css
@import "tailwindcss";

@theme {
  --font-display: "Cinzel", "Georgia", serif;
  --font-body: "Alegreya Sans", "Segoe UI", sans-serif;

  --color-ink: #0b0f16;
  --color-abyss: #070a10;
  --color-panel: #131a27;
  --color-panel2: #0e141f;
  --color-iron: #2a3448;
  --color-gold: #e2b45c;
  --color-goldbright: #ffd97a;
  --color-golddark: #8a6a22;
  --color-parch: #efe3c2;
  --color-faint: #8a94a8;
  --color-blood: #e05252;
  --color-verdant: #46c8a8;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  background: #0b0f16;
  color: var(--color-parch);
  font-family: var(--font-body);
  overflow: hidden;
  overscroll-behavior: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
}

canvas {
  display: block;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0e15;
}
::-webkit-scrollbar-thumb {
  background: #2c3648;
  border-radius: 4px;
}

@layer components {
  .clip-notch {
    clip-path: polygon(
      10px 0,
      100% 0,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      0 100%,
      0 10px
    );
  }
  .clip-notch-sm {
    clip-path: polygon(
      6px 0,
      100% 0,
      100% calc(100% - 6px),
      calc(100% - 6px) 100%,
      0 100%,
      0 6px
    );
  }

  .panel {
    background: linear-gradient(180deg, #161e2d 0%, #10161f 100%);
    border: 1px solid #333d52;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 10px 30px rgba(0, 0, 0, 0.45);
  }
  .panel-gold {
    background: linear-gradient(180deg, #1a2130 0%, #121824 100%);
    border: 1px solid #6b5a33;
    box-shadow:
      inset 0 1px 0 rgba(255, 220, 140, 0.08),
      inset 0 0 24px rgba(226, 180, 92, 0.05),
      0 10px 34px rgba(0, 0, 0, 0.5);
  }

  .btn-gold {
    font-family: var(--font-display);
    letter-spacing: 0.14em;
    background: linear-gradient(180deg, #f7d67f 0%, #dca944 55%, #b9892e 100%);
    color: #241a05;
    border: 1px solid #8a6a22;
    box-shadow:
      0 2px 0 #7c5f1e,
      0 8px 22px rgba(230, 180, 92, 0.28),
      inset 0 1px 0 rgba(255, 255, 255, 0.55);
    transition:
      transform 0.12s ease,
      filter 0.12s ease,
      box-shadow 0.12s ease;
  }
  .btn-gold:hover {
    filter: brightness(1.09);
    transform: translateY(-1px);
    box-shadow:
      0 3px 0 #7c5f1e,
      0 12px 28px rgba(230, 180, 92, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.55);
  }
  .btn-gold:active {
    transform: translateY(2px);
    box-shadow:
      0 0 0 #7c5f1e,
      0 4px 12px rgba(230, 180, 92, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  .btn-dark {
    font-family: var(--font-display);
    letter-spacing: 0.14em;
    background: linear-gradient(180deg, #1d2534 0%, #141b27 100%);
    color: var(--color-parch);
    border: 1px solid #3a4459;
    box-shadow:
      0 2px 0 #0a0e15,
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    transition:
      transform 0.12s ease,
      border-color 0.12s ease,
      color 0.12s ease;
  }
  .btn-dark:hover {
    border-color: #e2b45c;
    color: #ffd97a;
    transform: translateY(-1px);
  }
  .btn-dark:active {
    transform: translateY(1px);
  }

  .kbd {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 10px;
    line-height: 1;
    padding: 3px 5px;
    border-radius: 4px;
    background: #1a2231;
    border: 1px solid #3c4760;
    border-bottom-width: 2px;
    color: #cfd8ea;
    white-space: nowrap;
  }

  .bar-shell {
    background: #080c12;
    border: 1px solid #333d52;
    overflow: hidden;
    position: relative;
  }
  .bar-shell::after {
    content: "";
    position: absolute;
    inset: 0 0 55% 0;
    background: rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }
  .bar-fill {
    height: 100%;
    transition: width 0.15s ease-out;
  }

  .text-emboss {
    text-shadow:
      0 1px 0 rgba(0, 0, 0, 0.7),
      0 2px 2px rgba(0, 0, 0, 0.5),
      0 0 22px rgba(226, 180, 92, 0.35);
  }
  .text-emboss-red {
    text-shadow:
      0 1px 0 rgba(0, 0, 0, 0.7),
      0 2px 2px rgba(0, 0, 0, 0.5),
      0 0 26px rgba(224, 82, 82, 0.5);
  }

  .touchbtn {
    touch-action: none;
  }
}

@keyframes bannerIn {
  0% {
    opacity: 0;
    transform: translateY(-14px) scale(0.92);
    letter-spacing: 0.5em;
  }
  18% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(6px) scale(1.02);
  }
}
.anim-banner {
  animation: bannerIn 2.2s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.anim-fade-up {
  animation: fadeUp 0.45s cubic-bezier(0.2, 0.9, 0.3, 1) both;
}

@keyframes tickerIn {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.anim-ticker {
  animation: tickerIn 4.2s ease both;
}

@keyframes spinSlow {
  to {
    transform: rotate(360deg);
  }
}
.anim-spin-slow {
  animation: spinSlow 14s linear infinite;
}
.anim-spin-slower-rev {
  animation: spinSlow 26s linear infinite reverse;
}

@keyframes pulseGold {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(226, 180, 92, 0.45);
  }
  50% {
    box-shadow: 0 0 22px 4px rgba(226, 180, 92, 0.28);
  }
}
.anim-pulse-gold {
  animation: pulseGold 2.4s ease-in-out infinite;
}

@keyframes lowHpPulse {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.6;
  }
}
.anim-low-hp {
  animation: lowHpPulse 0.9s ease-in-out infinite;
}

@keyframes readyPing {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 217, 122, 0.7);
  }
  100% {
    box-shadow: 0 0 0 14px rgba(255, 217, 122, 0);
  }
}
.anim-ready {
  animation: readyPing 0.5s ease-out 1;
}

@keyframes floaty {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
.anim-floaty {
  animation: floaty 4s ease-in-out infinite;
}

@keyframes codexIn {
  from {
    opacity: 0;
    transform: translateY(calc(var(--dir, 1) * 26px)) scale(0.985);
    filter: blur(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.power-choice,
.shop-offer {
  border-color: #374259;
  transition:
    transform 150ms ease,
    border-color 150ms ease,
    background 150ms ease,
    box-shadow 150ms ease;
}

.power-choice:hover {
  transform: translateY(-5px);
  border-color: var(--power);
  background: linear-gradient(160deg, color-mix(in srgb, var(--power) 12%, #161e2d), #10161f 75%);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.46), 0 0 24px color-mix(in srgb, var(--power) 20%, transparent);
}

.shop-offer:not(:disabled):hover {
  transform: translateY(-3px);
  border-color: var(--offer);
  background: linear-gradient(160deg, color-mix(in srgb, var(--offer) 10%, #161e2d), #10161f 75%);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.42), 0 0 18px color-mix(in srgb, var(--offer) 17%, transparent);
}

.power-choice:focus-visible,
.shop-offer:focus-visible {
  outline: 2px solid #ffd97a;
  outline-offset: 3px;
}

.skill-cooldown[data-ready="1"] {
  color: #9defa4;
  font-size: 8px !important;
  letter-spacing: 0.12em;
  text-shadow: 0 0 7px rgba(157, 239, 164, 0.75);
}
```

## File: `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## File: `src/App.tsx`

```tsx
import { useEffect, useRef, useState } from 'react';
import { Game, type GameStats, type GameState, type HudBus, type LevelUpData, type ShopData } from './game/engine';
import type { PowerId, ShopItemId } from './game/data';
import { discoverPower, discoverShopItem, loadDiscovery, type DiscoveryState } from './game/collection';
import {
  createProfile,
  authenticateByName,
  getActiveProfile,
  loadProfiles,
  loadScores,
  setProfilePassword,
  changeLocalPassword,
  updateProfileProgress,
  updateProfileClass,
  recordProfileRun,
  usernameError,
  passwordError,
  type PlayerProfile,
  type ScoreEntry,
} from './game/highscores';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import {
  changeCloudPassword,
  checkConnection,
  currentProfile,
  signOut,
  fetchCloudState,
  fetchRecentEvents,
  fetchRemotePatchNotes,
  hydrateProfile,
  joinPresence,
  markCloudDiscovery,
  recordRun,
  setPreferredClass,
  signInWithUsername,
  signUpWithUsername,
  subscribeToRuns,
  syncProgress,
  type WorldEvent,
} from './lib/api';
import { PATCH_NOTES, CURRENT_VERSION, lastSeenVersion, markVersionSeen, compareVersions, type PatchNote } from './game/patchnotes';
import { LoreCodex } from './components/LoreCodex';
import { ProfilePanel } from './components/ProfilePanel';
import { SettingsOverlay } from './components/SettingsOverlay';
import { ProgressionIndex } from './components/ProgressionIndex';
import { PatchNotesOverlay } from './components/PatchNotesOverlay';
import { TutorialOverlay } from './components/TutorialOverlay';
import { StartScreen } from './components/StartScreen';
import { HUD } from './components/HUD';
import { TouchControls } from './components/TouchControls';
import { PauseOverlay } from './components/PauseOverlay';
import { GameOverScreen } from './components/GameOverScreen';
import { LevelUpOverlay } from './components/LevelUpOverlay';
import { ShopOverlay } from './components/ShopOverlay';
import { AccountPanel } from './components/AccountPanel';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const busRef = useRef<HudBus>({ listeners: new Set() });
  const [screen, setScreen] = useState<GameState>('menu');
  const [stats, setStats] = useState<GameStats | null>(null);
  const [levelUp, setLevelUp] = useState<LevelUpData | null>(null);
  const [shop, setShop] = useState<ShopData | null>(null);
  const cloud = isSupabaseConfigured;
  const [scores, setScores] = useState<ScoreEntry[]>(() => loadScores());
  const [profiles, setProfiles] = useState<PlayerProfile[]>(() => loadProfiles());
  const [activeProfile, setActiveProfileState] = useState<PlayerProfile | null>(() => (cloud ? null : getActiveProfile()));
  const [accountPanelOpen, setAccountPanelOpen] = useState(() => {
    if (cloud) return true;
    const profile = getActiveProfile();
    return !profile || !profile.passwordHash;
  });
  const [cloudStatus, setCloudStatus] = useState<{ ok: boolean; message: string }>({
    ok: false,
    message: cloud ? 'Checking connection…' : 'No .env — running offline on localStorage only.',
  });
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');
  const inscribedKeyRef = useRef<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [musicOn, setMusicOn] = useState(() => {
    try {
      return localStorage.getItem('aetheria-music') !== 'off';
    } catch {
      return true;
    }
  });
  const [musicVol, setMusicVol] = useState(() => {
    const v = Number(localStorage.getItem('aetheria-music-vol'));
    return Number.isFinite(v) && v > 0 ? Math.min(1, v) : 0.7;
  });
  const [sfxVol, setSfxVol] = useState(() => {
    const v = Number(localStorage.getItem('aetheria-sfx-vol'));
    return Number.isFinite(v) && v > 0 ? Math.min(1, v) : 0.7;
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [indexTab, setIndexTab] = useState<'powers' | 'shop' | null>(null);
  const [discovery, setDiscovery] = useState<DiscoveryState>({ powers: [], shopItems: [] });
  const [codexClass, setCodexClass] = useState<string | null>(null);
  const [patchOpen, setPatchOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [notes, setNotes] = useState<PatchNote[]>(PATCH_NOTES);
  const [seenVersion, setSeenVersion] = useState<string | null>(null);
  const [events, setEvents] = useState<WorldEvent[]>([]);
  const [onlineCount, setOnlineCount] = useState(1);
  const currentVersion = notes[0]?.version ?? CURRENT_VERSION;
  const hasNewPatch = seenVersion === null || compareVersions(currentVersion, seenVersion) > 0;
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window)
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let game: Game;
    game = new Game(canvas, {
      bus: busRef.current,
      onState: (s, st) => {
        setScreen(s);
        if (st) {
          setStats(st);
          if (s === 'over') {
            const progressed = updateProfileProgress(st.profileId, st.wave, st.classId);
            if (progressed) {
              setActiveProfileState(progressed);
              setProfiles(loadProfiles());
            }
            if (isSupabaseConfigured) void syncProgress(st.classId, st.wave);
          }
        }
        if (!isSupabaseConfigured && (s === 'menu' || s === 'over')) setScores(loadScores());
        if (s === 'levelup') setLevelUp(game.getLevelUpData());
        else if (s !== 'paused') setLevelUp(null);
        if (s === 'shop') setShop(game.getShopData());
        else if (s !== 'paused') setShop(null);
      },
    });
    gameRef.current = game;
    return () => {
      game.destroy();
      gameRef.current = null;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    void checkConnection().then((result) => {
      if (!alive) return;
      setCloudStatus(result);
      if (!result.ok) console.warn('[AETHERIA]', result.message);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!cloud || !supabase) return;
    let alive = true;
    const applyCloudUser = async () => {
      const { data } = await currentProfile();
      if (!alive) return;
      if (data) {
        const mapped = await hydrateProfile(data);
        if (!alive) return;
        setActiveProfileState(mapped);
        setAccountPanelOpen(false);
      } else {
        setActiveProfileState(null);
        setAccountPanelOpen(true);
      }
      const board = await fetchCloudState();
      if (!alive) return;
      if (board.error) {
        console.error('[AETHERIA] leaderboard load failed:', board.error);
        return;
      }
      setProfiles(board.profiles);
      setScores(board.scores);
    };
    void applyCloudUser();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void applyCloudUser();
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [cloud]);

  // Browsers block audio until the first gesture — unlock on any interaction.
  useEffect(() => {
    const unlock = () => {
      const g = gameRef.current;
      if (!g) return;
      g.unlockAudio();
      g.setVolumes(musicVol, sfxVol);
      g.setMusicEnabled(musicOn);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // apply persisted audio preferences once the engine exists
  useEffect(() => {
    gameRef.current?.music.setEnabled(musicOn);
  }, [musicOn]);

  useEffect(() => {
    gameRef.current?.setVolumes(musicVol, sfxVol);
    try {
      localStorage.setItem('aetheria-music-vol', String(musicVol));
      localStorage.setItem('aetheria-sfx-vol', String(sfxVol));
    } catch {
      /* ignore */
    }
  }, [musicVol, sfxVol]);

  const changeMusicVol = (v: number) => {
    setMusicVol(v);
    if (v > 0 && !musicOn) {
      setMusicOn(true);
      gameRef.current?.setMusicEnabled(true);
    }
  };
  const changeSfxVol = (v: number) => {
    setSfxVol(v);
    const g = gameRef.current;
    if (!g) return;
    if (v > 0 && g.muted) setMuted(g.toggleMuted());
  };

  // remote patch notes merge (optional table) — newest first, bundled as base
  useEffect(() => {
    if (!cloud) return;
    void fetchRemotePatchNotes().then((remote) => {
      if (!remote.length) return;
      const byVersion = new Map<string, PatchNote>();
      for (const n of PATCH_NOTES) byVersion.set(n.version, n);
      for (const n of remote) byVersion.set(n.version, { ...n, date: n.date || new Date().toISOString().slice(0, 10) });
      setNotes(Array.from(byVersion.values()).sort((a, b) => compareVersions(b.version, a.version)));
    });
  }, [cloud]);

  // per-profile "seen version", tutorial first-run, and auto-open of new patch notes
  useEffect(() => {
    if (!activeProfile) return;
    const local = loadDiscovery(activeProfile.id);
    setDiscovery({
      powers: Array.from(new Set([...local.powers, ...((activeProfile.discoveredPowers ?? []) as PowerId[])])),
      shopItems: Array.from(new Set([...local.shopItems, ...((activeProfile.discoveredShopItems ?? []) as ShopItemId[])])),
    });
    const seen = lastSeenVersion(activeProfile.id);
    setSeenVersion(seen);
    let tutorialDone = false;
    try {
      tutorialDone = localStorage.getItem(`aetheria-tutorial-${activeProfile.id}`) === 'done';
    } catch {
      /* ignore */
    }
    if (!tutorialDone) {
      setTutorialOpen(true);
      // first-ever launch: don't stack the patch notes on top of the tutorial
      if (seen === null) markVersionSeen(activeProfile.id, currentVersion);
    } else if (seen !== null && compareVersions(currentVersion, seen) > 0) {
      setPatchOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile?.id, currentVersion]);

  // live world feed + realm presence
  useEffect(() => {
    if (!cloud || !activeProfile) {
      // offline: derive a feed from local scores so the ticker is never fake
      setEvents(
        scores.slice(0, 10).map((s, i) => ({
          id: `local-${i}-${s.date}`,
          at: s.date,
          color: i === 0 ? '#ffd97a' : '#9fb0c8',
          text: `[Ledger] ${s.userName ?? s.name} reached wave ${s.wave} · ${s.score.toLocaleString()} pts`,
        }))
      );
      setOnlineCount(1);
      return;
    }
    let alive = true;
    void fetchRecentEvents().then((list) => alive && setEvents(list));
    const unsubRuns = subscribeToRuns((fresh) => {
      if (!alive) return;
      setEvents((prev) => [...fresh, ...prev].slice(0, 20));
      for (const ev of fresh) gameRef.current?.pushWorldEvent(ev.text, ev.color);
    });
    const unsubPresence = joinPresence(activeProfile.id, activeProfile.name, (n) => alive && setOnlineCount(n));
    return () => {
      alive = false;
      unsubRuns();
      unsubPresence();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloud, activeProfile?.id]);

  const openPatchNotes = () => {
    setPatchOpen(true);
  };
  const closePatchNotes = () => {
    setPatchOpen(false);
    markVersionSeen(activeProfile?.id, currentVersion);
    setSeenVersion(currentVersion);
  };
  const closeTutorial = () => {
    setTutorialOpen(false);
    try {
      if (activeProfile) localStorage.setItem(`aetheria-tutorial-${activeProfile.id}`, 'done');
    } catch {
      /* ignore */
    }
  };
  const changePassword = async (current: string, next: string, confirm: string) => {
    if (!activeProfile) return 'No adventurer is signed in.';
    const problem = passwordError(next, confirm);
    if (problem) return problem;
    if (cloud) {
      const res = await changeCloudPassword(activeProfile.name, current, next);
      return res.error ?? null;
    }
    const res = await changeLocalPassword(activeProfile.id, current, next, confirm);
    if (!res.profile) return res.error ?? 'Could not change password.';
    setActiveProfileState(res.profile);
    setProfiles(loadProfiles());
    return null;
  };

  const logOut = async () => {
    setProfileOpen(false);
    gameRef.current?.toMenu();
    if (cloud) await signOut();
    setActiveProfileState(null);
    setAccountPanelOpen(true);
  };

  const quitGame = () => {
    setProfileOpen(false);
    gameRef.current?.toMenu();
    window.close();
    // Browsers block close() for tabs the script did not open — show a farewell.
    setTimeout(() => {
      document.body.innerHTML =
        '<div style="height:100%;display:flex;align-items:center;justify-content:center;background:#05070c;color:#e2b45c;font-family:Cinzel,Georgia,serif;text-align:center;padding:24px"><div><div style="font-size:12px;letter-spacing:.5em;opacity:.7">FAREWELL, ADVENTURER</div><div style="font-size:clamp(24px,6vw,44px);font-weight:900;margin-top:10px">THE REALMS AWAIT YOUR RETURN</div><div style="font-size:13px;color:#8a94a8;margin-top:14px;font-family:sans-serif">You may close this tab safely — your progress is saved.</div></div></div>';
    }, 120);
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    gameRef.current?.setMusicEnabled(next);
    try {
      localStorage.setItem('aetheria-music', next ? 'on' : 'off');
    } catch {
      /* ignore */
    }
  };

  // quick-restart hotkeys on overlay screens (never while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (document.activeElement?.tagName ?? '') === 'INPUT';
      if (typing) return;
      const g = gameRef.current;
      if (!g) return;
      if (e.code === 'KeyR' && (screen === 'over' || screen === 'paused')) {
        e.preventDefault();
        g.sfx.ensure();
        g.sfx.play('click');
        g.restart();
      }
      if (e.code === 'Enter' && screen === 'over') {
        e.preventDefault();
        g.sfx.ensure();
        g.sfx.play('click');
        g.restart();
      }
      if (screen === 'levelup' && levelUp) {
        const choice = ['Digit1', 'Digit2', 'Digit3'].indexOf(e.code);
        if (choice >= 0) {
          e.preventDefault();
          g.choosePower(levelUp.choices[choice].id);
        }
        if (e.code === 'KeyR') {
          e.preventDefault();
          g.rerollPowers();
        }
      }
      if (screen === 'shop' && shop) {
        const item = ['Digit1', 'Digit2', 'Digit3', 'Digit4'].indexOf(e.code);
        if (item >= 0) {
          e.preventDefault();
          g.buyShopItem(shop.items[item].item.id);
        }
        // Market closes ONLY via its button — no Enter/Space shortcut.
        if (e.code === 'KeyR') {
          e.preventDefault();
          g.rerollShop();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, levelUp, shop]);

  const startGame = (classId: string) => {
    const g = gameRef.current;
    if (!g || !activeProfile) return;
    g.sfx.ensure();
    g.sfx.play('click');
    inscribedKeyRef.current = null;
    setSaveState('idle');
    setSaveError('');
    g.start(classId, activeProfile.name, activeProfile.id, activeProfile.name);
  };

  const toggleMute = () => {
    const g = gameRef.current;
    if (!g) return;
    setMuted(g.toggleMuted());
  };

  const restart = () => {
    const g = gameRef.current;
    if (!g) return;
    g.sfx.play('click');
    inscribedKeyRef.current = null;
    setSaveState('idle');
    setSaveError('');
    g.restart();
  };

  const toMenu = () => {
    const g = gameRef.current;
    if (!g) return;
    g.sfx.play('click');
    // Abandoning still banks progress: best wave, unlocks, discovery and a
    // ledger entry for the partial run — nothing earned is lost.
    try {
      const live = g.getStats();
      // Skip if this exact run was already inscribed (e.g. TITLE pressed
      // from the game-over screen) so runs/ledger aren't double-counted.
      const key = activeProfile
        ? `${activeProfile.id}|${live.classId}|${live.score}|${live.wave}|${live.timeSec}`
        : null;
      if (live.wave > 0 && activeProfile && key !== inscribedKeyRef.current) {
        inscribedKeyRef.current = key;
        const progressed = updateProfileProgress(live.profileId, live.wave, live.classId);
        if (progressed) {
          setActiveProfileState(progressed);
          setProfiles(loadProfiles());
        }
        if (cloud) {
          void syncProgress(live.classId, live.wave);
          void recordRun({
            classId: live.classId,
            score: live.score,
            wave: live.wave,
            level: live.level,
            kills: live.kills,
            gold: live.gold,
            durationSeconds: live.timeSec,
          }).then(() => {
            void fetchCloudState().then((board) => {
              if (!board.error) {
                setProfiles(board.profiles);
                setScores(board.scores);
              }
            });
          });
        } else {
          const result = recordProfileRun(live.profileId, {
            classId: live.classId,
            score: live.score,
            wave: live.wave,
            level: live.level,
            durationSeconds: live.timeSec,
            date: Date.now(),
            kills: live.kills,
          });
          setScores(result.scores);
          setProfiles(result.profiles);
        }
      }
    } catch (err) {
      console.error('[AETHERIA] abandon-save failed:', err);
    }
    g.toMenu();
  };

  const choosePower = (id: PowerId) => {
    const chosen = gameRef.current?.choosePower(id);
    if (chosen && activeProfile) {
      setDiscovery(discoverPower(activeProfile.id, id));
      if (cloud) void markCloudDiscovery('power', id);
    }
  };

  const buyShopItem = (id: ShopItemId) => {
    const bought = gameRef.current?.buyShopItem(id);
    if (bought && activeProfile) {
      setDiscovery(discoverShopItem(activeProfile.id, id));
      if (cloud) void markCloudDiscovery('shop', id);
    }
  };

  const applyLocalAuth = (profile: PlayerProfile) => {
    setProfiles(loadProfiles());
    setActiveProfileState(profile);
    setAccountPanelOpen(false);
    setScores(loadScores());
  };

  const applyCloudAuth = async (dbProfile: NonNullable<Awaited<ReturnType<typeof currentProfile>>['data']>) => {
    const mapped = await hydrateProfile(dbProfile);
    setActiveProfileState(mapped);
    setAccountPanelOpen(false);
    const board = await fetchCloudState();
    if (!board.error) {
      setProfiles(board.profiles);
      setScores(board.scores);
    }
  };

  const createAccount = async (name: string, password: string, confirmation: string) => {
    const nameProblem = usernameError(name);
    if (nameProblem) return nameProblem;
    const passProblem = passwordError(password, confirmation);
    if (passProblem) return passProblem;
    if (cloud) {
      const result = await signUpWithUsername(name, password);
      if (!result.data) return result.error ?? 'Could not create profile.';
      await applyCloudAuth(result.data);
      return null;
    }
    const result = await createProfile(name, password, confirmation);
    if (!result.profile) return result.error ?? 'Could not create profile.';
    applyLocalAuth(result.profile);
    return null;
  };

  const selectAccount = async (username: string, password: string) => {
    if (cloud) {
      const result = await signInWithUsername(username, password);
      if (!result.data) return result.error ?? 'Login failed.';
      await applyCloudAuth(result.data);
      return null;
    }
    const result = await authenticateByName(username, password);
    if (!result.profile) return result.error ?? 'Login failed.';
    applyLocalAuth(result.profile);
    return null;
  };

  const setPassword = async (id: string, password: string, confirmation: string) => {
    const result = await setProfilePassword(id, password, confirmation);
    if (!result.profile) return result.error ?? 'Could not save password.';
    setProfiles(loadProfiles());
    setActiveProfileState(result.profile);
    setAccountPanelOpen(false);
    return null;
  };

  const rememberClass = (classId: string) => {
    if (!activeProfile) return;
    const updated = updateProfileClass(activeProfile.id, classId);
    if (updated) {
      setActiveProfileState(updated);
      setProfiles(loadProfiles());
    }
    if (cloud) void setPreferredClass(classId);
  };

  const inscribeRun = async (): Promise<string | null> => {
    if (!stats || !activeProfile) return 'No adventurer is signed in.';
    if (cloud) {
      const result = await recordRun({
        classId: stats.classId,
        score: stats.score,
        wave: stats.wave,
        level: stats.level,
        kills: stats.kills,
        gold: stats.gold,
        durationSeconds: stats.timeSec,
      });
      if (result.error) {
        console.error('[AETHERIA] record_run failed:', result.error);
        return result.error;
      }
      recordProfileRun(stats.profileId, {
        classId: stats.classId,
        score: stats.score,
        wave: stats.wave,
        level: stats.level,
        durationSeconds: stats.timeSec,
        date: Date.now(),
        kills: stats.kills,
      });
      if (result.data) setActiveProfileState(await hydrateProfile(result.data));
      const board = await fetchCloudState();
      if (!board.error) {
        setProfiles(board.profiles);
        setScores(board.scores);
      }
      return null;
    }
    const result = recordProfileRun(stats.profileId, {
      classId: stats.classId,
      score: stats.score,
      wave: stats.wave,
      level: stats.level,
      durationSeconds: stats.timeSec,
      date: Date.now(),
      kills: stats.kills,
    });
    setScores(result.scores);
    setProfiles(result.profiles);
    return null;
  };

  // Save every run the instant the game-over screen appears — no manual
  // click required. A ref-guarded key prevents double-saving the same run
  // (e.g. on React StrictMode re-renders or re-opening the same stats).
  useEffect(() => {
    if (screen !== 'over' || !stats || !activeProfile) return;
    const key = `${activeProfile.id}|${stats.classId}|${stats.score}|${stats.wave}|${stats.timeSec}`;
    if (inscribedKeyRef.current === key) return;
    inscribedKeyRef.current = key;
    setSaveState('saving');
    setSaveError('');
    void inscribeRun().then((err) => {
      if (err) {
        console.error('[AETHERIA] run save failed:', err);
        setSaveState('error');
        setSaveError(err);
      } else {
        setSaveState('saved');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, stats, activeProfile]);

  const retrySave = () => {
    if (!stats || !activeProfile) return;
    inscribedKeyRef.current = `${activeProfile.id}|${stats.classId}|${stats.score}|${stats.wave}|${stats.timeSec}`;
    setSaveState('saving');
    setSaveError('');
    void inscribeRun().then((err) => {
      if (err) {
        setSaveState('error');
        setSaveError(err);
      } else {
        setSaveState('saved');
      }
    });
  };

  const pauseStats = screen === 'paused' ? (gameRef.current?.getStats() ?? null) : null;

  return (
    <div className="fixed inset-0 bg-ink overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* ambient vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 52%, rgba(4,6,10,0.6) 100%)' }}
      />

      {screen !== 'menu' && (
        <HUD
          bus={busRef.current}
          isTouch={isTouch}
          onPause={() => gameRef.current?.setPaused(true)}
          onOpenSettings={() => {
            gameRef.current?.setPaused(true);
            setSettingsOpen(true);
          }}
        />
      )}

      {screen === 'playing' && isTouch && <TouchControls gameRef={gameRef} bus={busRef.current} />}

      {screen === 'levelup' && levelUp && (
        <LevelUpOverlay data={levelUp} onChoose={choosePower} onOpenIndex={() => setIndexTab('powers')} onReroll={() => gameRef.current?.rerollPowers()} />
      )}

      {screen === 'shop' && shop && (
        <ShopOverlay data={shop} onBuy={buyShopItem} onOpenIndex={() => setIndexTab('shop')} onReroll={() => gameRef.current?.rerollShop()} onContinue={() => gameRef.current?.continueFromShop()} />
      )}

      {screen === 'menu' && activeProfile && (
        <StartScreen
          scores={scores}
          profiles={profiles}
          activeProfile={activeProfile}
          version={currentVersion}
          hasNewPatch={hasNewPatch}
          onlineCount={onlineCount}
          cloud={cloud}
          events={events}
          onOpenProfile={() => setProfileOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenCodex={(id) => setCodexClass(id)}
          onOpenIndex={() => setIndexTab('powers')}
          onOpenPatchNotes={openPatchNotes}
          onOpenTutorial={() => setTutorialOpen(true)}
          onClassChange={rememberClass}
          onStart={startGame}
        />
      )}

      {settingsOpen && (
        <SettingsOverlay
          musicOn={musicOn}
          muted={muted}
          musicVol={musicVol}
          sfxVol={sfxVol}
          version={currentVersion}
          cloud={cloud}
          onMusicVol={changeMusicVol}
          onSfxVol={changeSfxVol}
          onToggleMusic={toggleMusic}
          onToggleMute={toggleMute}
          onOpenIndex={() => {
            setSettingsOpen(false);
            setIndexTab('powers');
          }}
          {...(screen === 'menu' && activeProfile
            ? {
                onOpenProfile: () => {
                  setSettingsOpen(false);
                  setProfileOpen(true);
                },
                onSwitchAccount: () => {
                  setSettingsOpen(false);
                  setAccountPanelOpen(true);
                },
                onOpenTutorial: () => {
                  setSettingsOpen(false);
                  setTutorialOpen(true);
                },
                onOpenPatchNotes: () => {
                  setSettingsOpen(false);
                  openPatchNotes();
                },
              }
            : {})}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {indexTab && (
        <ProgressionIndex discovery={discovery} initialTab={indexTab} onClose={() => setIndexTab(null)} />
      )}

      {profileOpen && activeProfile && (
        <ProfilePanel
          profile={activeProfile}
          cloud={cloud}
          onlineCount={onlineCount}
          onChangePassword={changePassword}
          onLogout={logOut}
          onQuit={quitGame}
          onClose={() => setProfileOpen(false)}
        />
      )}

      {screen === 'menu' && codexClass && activeProfile && (
        <LoreCodex initialClassId={codexClass} unlocked={activeProfile.unlockedClasses ?? ['kensei']} onClose={() => setCodexClass(null)} />
      )}

      {patchOpen && (screen === 'menu' || screen === 'paused') && (
        <PatchNotesOverlay notes={notes} currentVersion={currentVersion} lastSeen={seenVersion} onClose={closePatchNotes} />
      )}

      {tutorialOpen && screen === 'menu' && activeProfile && !accountPanelOpen && (
        <TutorialOverlay isTouch={isTouch} onClose={closeTutorial} />
      )}

      {screen === 'menu' && accountPanelOpen && (
        <AccountPanel
          profiles={profiles}
          activeProfile={activeProfile}
          cloudStatus={cloudStatus}
          required={!activeProfile}
          onCreate={createAccount}
          onLogin={selectAccount}
          onSetPassword={setPassword}
          onClose={() => setAccountPanelOpen(false)}
        />
      )}

      {screen === 'paused' && pauseStats && (
        <PauseOverlay
          wave={pauseStats.wave}
          score={pauseStats.score}
          scores={scores}
          activeProfileId={activeProfile?.id}
          onOpenSettings={() => setSettingsOpen(true)}
          onResume={() => gameRef.current?.setPaused(false)}
          onRestart={restart}
          onMenu={toMenu}
        />
      )}

      {screen === 'over' && stats && (
        <GameOverScreen
          stats={stats}
          scores={scores}
          profile={activeProfile}
          saveState={saveState}
          saveError={saveError}
          onRestart={restart}
          onMenu={toMenu}
          onRetry={retrySave}
        />
      )}
    </div>
  );
}
```

## File: `src/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## File: `src/hooks/useViewport.ts`

```typescript
import { useEffect, useState } from 'react';

export type DeviceClass = 'compact' | 'medium' | 'wide';

export interface Viewport {
  /** viewport width in CSS px */
  w: number;
  /** viewport height in CSS px */
  h: number;
  device: DeviceClass;
  /** phone-sized or very short window — collapse chrome aggressively */
  compact: boolean;
  /** tight vertical space (landscape phones) — stack less, shrink more */
  shortScreen: boolean;
  landscape: boolean;
  /** touch-first device */
  coarse: boolean;
  /** 0.72 – 1.1 multiplier for on-screen control sizing */
  scale: number;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

function read(): Viewport {
  if (typeof window === 'undefined') {
    return { w: 1280, h: 800, device: 'wide', compact: false, shortScreen: false, landscape: true, coarse: false, scale: 1 };
  }
  const w = window.innerWidth;
  const h = window.innerHeight;
  const landscape = w >= h;
  const shortSide = Math.min(w, h);
  const coarse =
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || 'ontouchstart' in window;
  const device: DeviceClass = w < 700 ? 'compact' : w < 1100 ? 'medium' : 'wide';
  return {
    w,
    h,
    device,
    compact: device === 'compact' || h < 520,
    shortScreen: h < 560,
    landscape,
    coarse,
    scale: clamp(shortSide / 760, 0.72, 1.1),
  };
}

/**
 * Tracks viewport size/orientation so the HUD and touch controls can adapt to
 * phones, tablets, laptops and desktops without hard-coded breakpoints only.
 */
export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(read);

  useEffect(() => {
    let frame = 0;
    const onChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVp(read()));
    };
    window.addEventListener('resize', onChange);
    window.addEventListener('orientationchange', onChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onChange);
      window.removeEventListener('orientationchange', onChange);
    };
  }, []);

  return vp;
}
```

## File: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client.
 *
 * 1. Create a project at https://supabase.com
 * 2. Copy Project URL + anon public key into a `.env` file:
 *      VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
 *      VITE_SUPABASE_ANON_KEY=eyJ...
 * 3. In Auth -> Providers -> Email: DISABLE "Confirm email"
 *    (username/password signup needs immediate sign-in)
 *
 * The anon key is safe to ship in the client; Row Level Security
 * (see supabase/migrations/0001_init.sql) protects every row.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null;

/** Loud startup diagnostics so a missing .env never fails silently. */
if (typeof window !== 'undefined') {
  if (!isSupabaseConfigured) {
    console.warn(
      '%c[AETHERIA] OFFLINE MODE — Supabase not configured.\n' +
        'Nothing will be saved to the cloud.\n\n' +
        'Fix: create a file named ".env" next to package.json containing:\n' +
        '  VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co\n' +
        '  VITE_SUPABASE_ANON_KEY=eyJ...\n' +
        'Then STOP the dev server (Ctrl+C) and run "npm run dev" again.',
      'color:#ff8a8a;font-weight:bold'
    );
  } else {
    console.info('%c[AETHERIA] Cloud mode — Supabase URL: ' + url, 'color:#46c8a8;font-weight:bold');
  }
}

/**
 * Username/password login without collecting an email.
 * Each username maps to a synthetic internal email; Supabase still
 * enforces uniqueness because the email address is derived from it.
 * Change this domain to one you own in production.
 */
const EMAIL_REALM = '@gate.realms-aetheria.com';

export function usernameEmail(username: string): string {
  return `${username.trim().toLowerCase()}${EMAIL_REALM}`;
}

export interface DbProfile {
  id: string;
  username: string;
  preferred_class: string;
  best_score: number;
  best_wave: number;
  total_kills: number;
  runs: number;
  unlocked_classes: string[];
  discovered_powers?: string[];
  discovered_shop_items?: string[];
  created_at: string;
  last_seen: string;
}

export interface DbMatchResult {
  id: string;
  user_id: string;
  class_id: string;
  score: number;
  wave: number;
  level: number;
  kills: number;
  gold: number;
  duration_seconds: number;
  created_at: string;
}

export interface OverallRow {
  id: string;
  username: string;
  preferred_class: string;
  best_score: number;
  best_wave: number;
  runs: number;
  total_kills: number;
}

export interface HeroRow {
  id: string;
  username: string;
  class_id: string;
  best_score: number;
  best_wave: number;
  runs: number;
}
```

## File: `src/lib/api.ts`

```typescript
/**
 * Supabase-backed replacement for src/game/highscores.ts.
 *
 * All functions are async and return `{ data | error }` style results so the
 * existing UI handlers (which already await) can switch over with minimal
 * changes. Keep highscores.ts as the offline fallback / cache layer.
 */
import {
  supabase,
  isSupabaseConfigured,
  usernameEmail,
  type DbProfile,
  type DbMatchResult,
  type OverallRow,
  type HeroRow,
} from './supabase';
import { CLASSES } from '../game/data';
import type { HeroBest, PlayerProfile, ScoreEntry } from '../game/highscores';

interface HeroRecordRow {
  user_id: string;
  class_id: string;
  best_score: number;
  best_wave: number;
  runs: number;
}

export interface RunInput {
  classId: string;
  score: number;
  wave: number;
  level: number;
  kills: number;
  gold: number;
  durationSeconds: number;
}

function unavailable() {
  return {
    data: null,
    error: 'OFFLINE MODE: no .env found. Create .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart npm run dev.',
  } as const;
}

/**
 * Verifies the browser can actually reach the database and that the
 * tables/policies from the migrations exist. Logged on startup.
 */
export async function checkConnection(): Promise<{ ok: boolean; message: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, message: 'No .env — running offline on localStorage only.' };
  }
  const { error } = await supabase.from('profiles').select('id').limit(1);
  if (error) {
    if (/does not exist|schema cache|relation/i.test(error.message)) {
      return { ok: false, message: 'Connected, but tables are missing. Run supabase/migrations/0001_init.sql in the SQL Editor.' };
    }
    if (/permission|denied|rls/i.test(error.message)) {
      return { ok: false, message: 'Connected, but permissions are blocked. Run supabase/migrations/0002_grants.sql.' };
    }
    return { ok: false, message: `Supabase error: ${error.message}` };
  }
  return { ok: true, message: 'Connected to Supabase.' };
}

// ---------------------------------------------------------------------------
// AUTH
// ---------------------------------------------------------------------------

export async function signUpWithUsername(username: string, password: string) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  const { data, error } = await supabase.auth.signUp({
    email: usernameEmail(username),
    password,
    options: { data: { username } }, // read by the handle_new_user() trigger
  });
  if (error) {
    const msg = /already|registered/i.test(error.message)
      ? 'That username is already registered.'
      : error.message;
    return { data: null, error: msg } as const;
  }
  if (!data.session || !data.user) {
    return {
      data: null,
      error: 'Account created but not signed in. In Supabase: Auth → Providers → Email → turn off Confirm email.',
    } as const;
  }
  const profile = await fetchProfile(data.user.id);
  return { data: profile.data, error: profile.error } as const;
}

export async function signInWithUsername(username: string, password: string) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: usernameEmail(username),
    password,
  });
  if (error) {
    const msg = /invalid login|invalid credentials/i.test(error.message)
      ? 'Incorrect username or password.'
      : error.message;
    return { data: null, error: msg } as const;
  }
  const profile = data.user ? await fetchProfile(data.user.id) : { data: null, error: null };
  return { data: profile.data, error: profile.error } as const;
}

export async function signOut() {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.auth.signOut();
}

/**
 * Change the signed-in adventurer's password. Verifies the current password
 * by re-authenticating first, so a walk-up attacker on an open session cannot
 * silently take over the account.
 */
export async function changeCloudPassword(username: string, currentPassword: string, newPassword: string) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  const check = await supabase.auth.signInWithPassword({ email: usernameEmail(username), password: currentPassword });
  if (check.error) return { data: null, error: 'Current password is incorrect.' } as const;
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    const msg = /should be different|same/i.test(error.message) ? 'New password must differ from the old one.' : error.message;
    return { data: null, error: msg } as const;
  }
  return { data: true, error: null } as const;
}

export async function currentProfile(): Promise<{ data: DbProfile | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: null };
  const { data } = await supabase.auth.getSession();
  if (!data.session) return { data: null, error: null };
  return fetchProfile(data.session.user.id);
}

// ---------------------------------------------------------------------------
// PROFILES
// ---------------------------------------------------------------------------

async function fetchProfile(id: string) {
  if (!supabase) return { data: null, error: 'Supabase is not configured.' } as const;
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
  return { data: (data as DbProfile) ?? null, error: error?.message ?? null } as const;
}

export async function setPreferredClass(classId: string) {
  if (!isSupabaseConfigured || !supabase) return;
  const { data } = await supabase.auth.getSession();
  if (!data.session) return;
  await supabase.from('profiles').update({ preferred_class: classId, last_seen: new Date().toISOString() }).eq('id', data.session.user.id);
}

function unlocksForWave(wave: number) {
  return CLASSES.filter((entry) => entry.unlockWave <= wave).map((entry) => entry.id);
}

export function dbProfileToLocal(row: DbProfile, heroBests: Record<string, HeroBest> = {}): PlayerProfile {
  return {
    id: row.id,
    name: row.username,
    createdAt: Date.parse(row.created_at) || Date.now(),
    lastSeen: Date.parse(row.last_seen) || Date.now(),
    preferredClass: row.preferred_class,
    bestScore: row.best_score,
    bestWave: row.best_wave,
    totalKills: row.total_kills,
    runs: row.runs,
    unlockedClasses: unlocksForWave(row.best_wave),
    heroBests,
    discoveredPowers: row.discovered_powers ?? [],
    discoveredShopItems: row.discovered_shop_items ?? [],
  };
}

export async function markCloudDiscovery(kind: 'power' | 'shop', id: string) {
  if (!isSupabaseConfigured || !supabase) return;
  const { data: auth } = await supabase.auth.getSession();
  if (!auth.session) return;
  const column = kind === 'power' ? 'discovered_powers' : 'discovered_shop_items';
  const { data } = await supabase.from('profiles').select(column).eq('id', auth.session.user.id).single();
  const current = ((data as Record<string, string[]> | null)?.[column] ?? []);
  if (current.includes(id)) return;
  await supabase.from('profiles').update({ [column]: [...current, id] }).eq('id', auth.session.user.id);
}

export async function hydrateProfile(row: DbProfile): Promise<PlayerProfile> {
  if (!supabase) return dbProfileToLocal(row);
  const { data } = await supabase.from('hero_records').select('*').eq('user_id', row.id);
  const heroBests: Record<string, HeroBest> = {};
  for (const rec of (data as HeroRecordRow[] | null) ?? []) {
    heroBests[rec.class_id] = { score: rec.best_score, wave: rec.best_wave, runs: rec.runs };
  }
  return dbProfileToLocal(row, heroBests);
}

export async function syncProgress(classId: string, wave: number) {
  if (!isSupabaseConfigured || !supabase) return;
  const { data } = await supabase.auth.getSession();
  if (!data.session) return;
  const { data: row } = await supabase.from('profiles').select('best_wave, unlocked_classes').eq('id', data.session.user.id).single();
  const current = row as { best_wave: number; unlocked_classes: string[] } | null;
  const bestWave = Math.max(current?.best_wave ?? 0, wave);
  const unlocked = unlocksForWave(bestWave);
  await supabase
    .from('profiles')
    .update({
      preferred_class: classId,
      best_wave: bestWave,
      unlocked_classes: unlocked,
      last_seen: new Date().toISOString(),
    })
    .eq('id', data.session.user.id);
}

export async function fetchCloudState(): Promise<{ profiles: PlayerProfile[]; scores: ScoreEntry[]; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return { profiles: [], scores: [], error: 'Supabase is not configured.' };
  }
  const [profilesRes, heroesRes, matchesRes] = await Promise.all([
    supabase.from('profiles').select('*'),
    supabase.from('hero_records').select('*'),
    supabase.from('match_results').select('*').order('score', { ascending: false }).limit(100),
  ]);
  if (profilesRes.error) return { profiles: [], scores: [], error: profilesRes.error.message };

  const heroByUser = new Map<string, Record<string, HeroBest>>();
  for (const rec of (heroesRes.data as HeroRecordRow[] | null) ?? []) {
    const bag = heroByUser.get(rec.user_id) ?? {};
    bag[rec.class_id] = { score: rec.best_score, wave: rec.best_wave, runs: rec.runs };
    heroByUser.set(rec.user_id, bag);
  }

  const profiles = ((profilesRes.data as DbProfile[]) ?? []).map((row) => dbProfileToLocal(row, heroByUser.get(row.id) ?? {}));
  const names = new Map(profiles.map((p) => [p.id, p.name]));
  const scores: ScoreEntry[] = ((matchesRes.data as DbMatchResult[]) ?? []).map((row) => ({
    name: names.get(row.user_id) ?? 'Wanderer',
    userId: row.user_id,
    userName: names.get(row.user_id) ?? 'Wanderer',
    classId: row.class_id,
    score: row.score,
    wave: row.wave,
    level: row.level,
    durationSeconds: row.duration_seconds,
    date: Date.parse(row.created_at) || Date.now(),
  }));
  return { profiles, scores, error: null };
}

// ---------------------------------------------------------------------------
// MATCHES & UNLOCKS
// ---------------------------------------------------------------------------

export async function recordRun(input: RunInput) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  const { data } = await supabase.auth.getSession();
  if (!data.session) return { data: null, error: 'Not signed in.' } as const;
  const { error } = await supabase.rpc('record_run', {
    p_class_id: input.classId,
    p_score: input.score,
    p_wave: input.wave,
    p_level: input.level,
    p_kills: input.kills,
    p_gold: input.gold,
    p_duration_seconds: input.durationSeconds,
  });
  if (error) return { data: null, error: error.message } as const;
  const profile = await fetchProfile(data.session.user.id);
  return { data: profile.data, error: null } as const;
}

// ---------------------------------------------------------------------------
// LIVE WORLD FEED  (real achievements from real adventurers)
// ---------------------------------------------------------------------------

export interface WorldEvent {
  id: string;
  text: string;
  color: string;
  at: number;
}

const UNLOCK_WAVES: [number, string][] = [
  [8, 'Shieldthane'],
  [15, 'Jaguar Knight'],
  [25, 'Sandseer'],
  [40, 'Tidecaller'],
  [60, 'Riftblade'],
];

const BOSS_NAMES = ['Mizuchi', 'Khorzun', 'Isbrekk', "Balam K'in", "Zar'qun"];

/** Turn one match row into 1–3 human-readable achievement lines. */
export function eventsFromRun(
  row: { id: string; user_id: string; class_id: string; score: number; wave: number; created_at: string },
  username: string,
  className: string,
  isRecord: boolean
): WorldEvent[] {
  const at = Date.parse(row.created_at) || Date.now();
  const out: WorldEvent[] = [];
  if (isRecord) {
    out.push({ id: `${row.id}-rec`, at, color: '#ffd97a', text: `[Legend] ${username} set a new realm record: ${row.score.toLocaleString()} as the ${className}!` });
  }
  if (row.wave >= 5 && row.wave % 5 === 0) {
    const boss = BOSS_NAMES[((row.wave / 5 - 1) % BOSS_NAMES.length + BOSS_NAMES.length) % BOSS_NAMES.length];
    out.push({ id: `${row.id}-boss`, at, color: '#ff9a9a', text: `[Realm] ${username} felled ${boss} on wave ${row.wave}!` });
  }
  const unlock = UNLOCK_WAVES.find(([w]) => w === row.wave || (row.wave > w && row.wave < w + 2));
  if (unlock && row.wave >= unlock[0]) {
    out.push({ id: `${row.id}-unlock`, at, color: '#46c8a8', text: `[Realm] ${username} has earned the ${unlock[1]}.` });
  }
  if (out.length === 0) {
    out.push({ id: `${row.id}-run`, at, color: '#9fb0c8', text: `[World] ${username} reached wave ${row.wave} as the ${className} · ${row.score.toLocaleString()} pts` });
  }
  return out;
}

export async function fetchRecentEvents(limit = 14): Promise<WorldEvent[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const [runsRes, profilesRes, topRes] = await Promise.all([
    supabase.from('match_results').select('id,user_id,class_id,score,wave,created_at').order('created_at', { ascending: false }).limit(limit),
    supabase.from('profiles').select('id,username'),
    supabase.from('match_results').select('score').order('score', { ascending: false }).limit(1),
  ]);
  const names = new Map(((profilesRes.data as { id: string; username: string }[]) ?? []).map((p) => [p.id, p.username]));
  const top = ((topRes.data as { score: number }[]) ?? [])[0]?.score ?? 0;
  const out: WorldEvent[] = [];
  for (const row of ((runsRes.data as { id: string; user_id: string; class_id: string; score: number; wave: number; created_at: string }[]) ?? [])) {
    const cls = CLASSES.find((c) => c.id === row.class_id);
    out.push(...eventsFromRun(row, names.get(row.user_id) ?? 'A wanderer', cls?.name ?? row.class_id, row.score >= top && top > 0));
  }
  return out.sort((a, b) => b.at - a.at).slice(0, limit);
}

/** Subscribe to new runs in real time. Returns an unsubscribe function. */
export function subscribeToRuns(onEvents: (events: WorldEvent[]) => void): () => void {
  if (!isSupabaseConfigured || !supabase) return () => {};
  const channel = supabase
    .channel('world-feed')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'match_results' }, async (payload) => {
      const row = payload.new as { id: string; user_id: string; class_id: string; score: number; wave: number; created_at: string };
      const { data } = await supabase!.from('profiles').select('username').eq('id', row.user_id).single();
      const { data: top } = await supabase!.from('match_results').select('score').order('score', { ascending: false }).limit(1);
      const best = ((top as { score: number }[]) ?? [])[0]?.score ?? 0;
      const cls = CLASSES.find((c) => c.id === row.class_id);
      onEvents(eventsFromRun(row, (data as { username: string } | null)?.username ?? 'A wanderer', cls?.name ?? row.class_id, row.score >= best));
    })
    .subscribe();
  return () => {
    supabase!.removeChannel(channel);
  };
}

/** True realm presence: how many adventurers currently have the game open. */
export function joinPresence(profileId: string, username: string, onCount: (n: number) => void): () => void {
  if (!isSupabaseConfigured || !supabase) {
    onCount(1);
    return () => {};
  }
  const channel = supabase.channel('realm-presence', { config: { presence: { key: profileId } } });
  channel
    .on('presence', { event: 'sync' }, () => {
      onCount(Math.max(1, Object.keys(channel.presenceState()).length));
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') await channel.track({ username, at: Date.now() });
    });
  return () => {
    supabase!.removeChannel(channel);
  };
}

// ---------------------------------------------------------------------------
// REMOTE PATCH NOTES (optional — merged with bundled notes)
// ---------------------------------------------------------------------------

export interface RemotePatchNote {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  changes: { kind: 'new' | 'improved' | 'balance' | 'fixed'; text: string }[];
}

export async function fetchRemotePatchNotes(): Promise<RemotePatchNote[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase.from('patch_notes').select('version,date,title,highlights,changes').eq('published', true);
  if (error || !data) return [];
  return (data as RemotePatchNote[]).map((n) => ({ ...n, highlights: n.highlights ?? [], changes: n.changes ?? [] }));
}

// ---------------------------------------------------------------------------
// LEADERBOARDS
// ---------------------------------------------------------------------------

export async function overallLeaderboard(limit = 10) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  const { data, error } = await supabase.rpc('overall_leaderboard', { p_limit: limit });
  return { data: (data as OverallRow[]) ?? [], error: error?.message ?? null } as const;
}

export async function heroLeaderboard(classId: string, limit = 10) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  const { data, error } = await supabase.rpc('hero_leaderboard', { p_class_id: classId, p_limit: limit });
  return { data: (data as HeroRow[]) ?? [], error: error?.message ?? null } as const;
}

export async function recentRuns(classId?: string, limit = 10) {
  if (!isSupabaseConfigured || !supabase) return unavailable();
  let query = supabase
    .from('match_results')
    .select('*, profiles(username)')
    .order('score', { ascending: false })
    .limit(limit);
  if (classId) query = query.eq('class_id', classId);
  const { data, error } = await query;
  return { data: (data as (DbMatchResult & { profiles: { username: string } | null })[]) ?? [], error: error?.message ?? null } as const;
}
```

## File: `src/game/data.ts`

```typescript
export interface ClassDef {
  id: string;
  name: string;
  culture: string;
  epithet: string;
  lore: string;
  weaponName: string;
  color: string; // primary
  color2: string; // secondary
  hp: number;
  speed: number;
  dmg: number;
  atkCd: number;
  range: number;
  arc: number; // swing arc in radians
  crit: number;
  abilityName: string;
  abilityCd: number;
  abilityDesc: string;
  abilityKind: 'petals' | 'nova' | 'bolts' | 'storm' | 'tide' | 'rift' | 'tempest' | 'pyre';
  unlockWave: number;
}

export const CLASSES: ClassDef[] = [
  {
    id: 'kensei',
    name: 'Kensei',
    culture: 'Yamashiro Isles',
    epithet: 'The Petal Storm',
    lore: 'Blade-dancers of the eastern isles, said to cut the rain before it falls.',
    weaponName: 'Moonlit Katana',
    color: '#ff6b6b',
    color2: '#ffd9a0',
    hp: 92,
    speed: 252,
    dmg: 12,
    atkCd: 0.3,
    range: 80,
    arc: 1.85,
    crit: 0.18,
    abilityName: 'Thousand Petals',
    abilityCd: 7,
    abilityDesc: 'Unleash a 360° blade storm that shreds every foe around you.',
    abilityKind: 'petals',
    unlockWave: 0,
  },
  {
    id: 'shieldthane',
    name: 'Shieldthane',
    culture: 'Skaldheim Fjords',
    epithet: 'The Unbroken Wall',
    lore: 'Oath-sworn wardens of the frozen fjords, unbroken as the glacier itself.',
    weaponName: 'Runed Beard Axe',
    color: '#6fb7ff',
    color2: '#dbeeff',
    hp: 135,
    speed: 200,
    dmg: 19,
    atkCd: 0.5,
    range: 86,
    arc: 2.3,
    crit: 0.08,
    abilityName: 'Frostwake Nova',
    abilityCd: 9,
    abilityDesc: 'Shatter the earth in frozen runes — damages and freezes all nearby foes.',
    abilityKind: 'nova',
    unlockWave: 8,
  },
  {
    id: 'jaguar',
    name: 'Jaguar Knight',
    culture: 'Tlanex Sun Empire',
    epithet: 'Claw of the Fifth Sun',
    lore: 'Champions of the sun pyramid, their blood fed by the light of the fifth sun.',
    weaponName: 'Obsidian Macuahuitl',
    color: '#ff9d3c',
    color2: '#8ce07a',
    hp: 105,
    speed: 232,
    dmg: 15,
    atkCd: 0.38,
    range: 82,
    arc: 2.0,
    crit: 0.14,
    abilityName: 'Wrath of the Fifth Sun',
    abilityCd: 8,
    abilityDesc: 'Hurl ten solar bolts in all directions that pierce through enemies.',
    abilityKind: 'bolts',
    unlockWave: 15,
  },
  {
    id: 'sandseer',
    name: 'Sandseer',
    culture: 'Zahraan Dune Sea',
    epithet: 'Voice of the Dunes',
    lore: 'Veiled wanderers of the endless dunes who read the fates of men in sand.',
    weaponName: 'Glass Khopesh',
    color: '#e6c26a',
    color2: '#54c9b4',
    hp: 98,
    speed: 226,
    dmg: 13,
    atkCd: 0.33,
    range: 88,
    arc: 2.0,
    crit: 0.12,
    abilityName: 'Dune Requiem',
    abilityCd: 9,
    abilityDesc: 'Summon a whirling sandstorm that shreds and slows nearby foes for 4s.',
    abilityKind: 'storm',
    unlockWave: 25,
  },
  {
    id: 'tidecaller',
    name: 'Tidecaller',
    culture: 'Nacrean Atolls',
    epithet: 'The Living Undertow',
    lore: 'Pearl-bonded navigators who command moon tides and draw strength from the deep.',
    weaponName: 'Coral Trident',
    color: '#55d9e8',
    color2: '#d7a6ff',
    hp: 116,
    speed: 214,
    dmg: 17,
    atkCd: 0.43,
    range: 96,
    arc: 2.15,
    crit: 0.1,
    abilityName: 'Moonfall Undertow',
    abilityCd: 10,
    abilityDesc: 'Pull nearby enemies into a tidal ring, damaging and weakening them.',
    abilityKind: 'tide',
    unlockWave: 40,
  },
  {
    id: 'riftblade',
    name: 'Riftblade',
    culture: 'The Umbral Reach',
    epithet: 'The Unwritten Edge',
    lore: 'Exiles who step between heartbeats, carrying a weapon forged from a broken star.',
    weaponName: 'Nullglass Glaive',
    color: '#b68cff',
    color2: '#e8d8ff',
    hp: 84,
    speed: 278,
    dmg: 15,
    atkCd: 0.27,
    range: 78,
    arc: 1.72,
    crit: 0.24,
    abilityName: 'Eventide Rift',
    abilityCd: 11,
    abilityDesc: 'Blink through the nearest foes and leave a collapsing void behind you.',
    abilityKind: 'rift',
    unlockWave: 60,
  },
  {
    id: 'stormwarden',
    name: 'Stormwarden',
    culture: 'Voltaic Peaks',
    epithet: 'Voice of the Tempest',
    lore: 'Sky-wardens who chained the First Storm and now speak with thunder in their voice.',
    weaponName: 'Stormforged Maul',
    color: '#6ef3ff',
    color2: '#fff6a8',
    hp: 130,
    speed: 238,
    dmg: 21,
    atkCd: 0.36,
    range: 94,
    arc: 2.25,
    crit: 0.15,
    abilityName: 'Tempest Judgment',
    abilityCd: 10,
    abilityDesc: 'Chain lightning strikes the 7 nearest foes, stunning them briefly.',
    abilityKind: 'tempest',
    unlockWave: 80,
  },
  {
    id: 'drakewarden',
    name: 'Drakewarden',
    culture: 'Ashen Roost',
    epithet: 'Heir of the First Flame',
    lore: 'Dragon-blooded wardens hatched in ash. Where they walk, the old fire follows.',
    weaponName: 'Wyrmfang Greatblade',
    color: '#ff5a3c',
    color2: '#ffc46b',
    hp: 148,
    speed: 218,
    dmg: 24,
    atkCd: 0.42,
    range: 98,
    arc: 2.35,
    crit: 0.12,
    abilityName: 'Wyrmfire Cataclysm',
    abilityCd: 12,
    abilityDesc: 'Breathe a cataclysm of dragonfire: massive radial damage that ignites survivors.',
    abilityKind: 'pyre',
    unlockWave: 100,
  },
];

export interface ZoneDef {
  name: string;
  culture: string;
  color: string;
  boss: string;
  bossColor: string;
  bossTitle: string;
}

export const ZONES: ZoneDef[] = [
  { name: 'The Jade Coast', culture: 'Yamashiro Isles', color: '#3ecf9a', boss: "Mizuchi, the Tide Serpent", bossColor: '#2ee6a8', bossTitle: 'SERPENT OF THE DEEP TIDE' },
  { name: 'The Ember Steppes', culture: 'Khaganate of Ash', color: '#ff8a4a', boss: 'Khorzun, Ashen Khagan', bossColor: '#ff6a2a', bossTitle: 'KHAGAN OF CINDER' },
  { name: 'Frostveil Fjord', culture: 'Skaldheim', color: '#6fb7ff', boss: 'Isbrekk the Hollow King', bossColor: '#9be8ff', bossTitle: 'THE HOLLOW KING' },
  { name: 'Sunspire Jungles', culture: 'Tlanex Empire', color: '#ffd24a', boss: "Balam K'in, Eclipse Priest", bossColor: '#ffe066', bossTitle: 'PRIEST OF THE ECLIPSE' },
  { name: 'The Dune Sea', culture: 'Zahraan Sultanate', color: '#e8b64c', boss: "Zar'qun, Sultan of Glass", bossColor: '#f4c95d', bossTitle: 'SULTAN OF GLASS' },
];

export type EnemyKind = 'husk' | 'skitter' | 'hexer' | 'brute' | 'mage' | 'demon' | 'wraith' | 'golem' | 'dragon' | 'boss';

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  dmg: number;
  r: number;
  xp: number;
  score: number;
  color: string;
}

export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  husk: { kind: 'husk', name: 'Hollow Husk', hp: 26, speed: 92, dmg: 10, r: 15, xp: 12, score: 10, color: '#8fd9a8' },
  skitter: { kind: 'skitter', name: 'Dune Skitterer', hp: 14, speed: 168, dmg: 6, r: 12, xp: 9, score: 15, color: '#ffb36b' },
  hexer: { kind: 'hexer', name: 'Grave Hexer', hp: 32, speed: 74, dmg: 12, r: 15, xp: 24, score: 25, color: '#c58cf0' },
  brute: { kind: 'brute', name: 'Warbrute', hp: 100, speed: 52, dmg: 22, r: 26, xp: 32, score: 30, color: '#ff7d6b' },
  mage: { kind: 'mage', name: 'Ashen Mage', hp: 55, speed: 68, dmg: 16, r: 16, xp: 38, score: 45, color: '#7dd7ff' },
  demon: { kind: 'demon', name: 'Pit Demon', hp: 150, speed: 62, dmg: 26, r: 24, xp: 55, score: 60, color: '#ff4d3d' },
  wraith: { kind: 'wraith', name: 'Veil Wraith', hp: 46, speed: 196, dmg: 15, r: 14, xp: 44, score: 55, color: '#b9a7ff' },
  golem: { kind: 'golem', name: 'Siege Golem', hp: 320, speed: 38, dmg: 34, r: 32, xp: 90, score: 95, color: '#9aa7b8' },
  dragon: { kind: 'dragon', name: 'Cinder Whelp', hp: 240, speed: 84, dmg: 28, r: 28, xp: 120, score: 130, color: '#ff9a2e' },
  boss: { kind: 'boss', name: 'World Boss', hp: 620, speed: 66, dmg: 30, r: 46, xp: 220, score: 250, color: '#ff5d5d' },
};

export function waveComposition(w: number): { kind: EnemyKind; count: number }[] {
  if (w % 5 === 0) {
    const out: { kind: EnemyKind; count: number }[] = [
      { kind: 'boss', count: 1 },
      { kind: 'husk', count: 3 + Math.floor(w * 0.9) },
      { kind: 'skitter', count: Math.max(1, Math.floor(w / 3)) },
    ];
    if (w >= 10) out.push({ kind: 'mage', count: Math.floor(w / 6) });
    if (w >= 15) out.push({ kind: 'demon', count: Math.max(1, Math.floor(w / 10)) });
    if (w >= 20) out.push({ kind: 'wraith', count: Math.max(1, Math.floor(w / 9)) });
    return out;
  }
  const out: { kind: EnemyKind; count: number }[] = [
    { kind: 'husk', count: 5 + Math.min(20, w * 2) + Math.floor(w / 3) },
  ];
  if (w >= 2) out.push({ kind: 'skitter', count: 2 + Math.floor(w * 1.45) });
  if (w >= 3) out.push({ kind: 'hexer', count: Math.max(1, Math.floor((w + 1) / 2)) });
  if (w >= 4) out.push({ kind: 'brute', count: Math.max(1, Math.floor((w - 1) / 2)) });
  if (w >= 6) out.push({ kind: 'mage', count: Math.max(1, Math.floor((w - 3) / 2)) });
  if (w >= 8) out.push({ kind: 'demon', count: Math.max(1, Math.floor((w - 5) / 3)) });
  if (w >= 10) out.push({ kind: 'wraith', count: Math.max(2, Math.floor((w - 6) / 2)) });
  if (w >= 12) out.push({ kind: 'golem', count: Math.max(1, Math.floor((w - 9) / 4)) });
  if (w >= 15) out.push({ kind: 'dragon', count: Math.max(1, Math.floor((w - 12) / 4)) });
  return out;
}

export const FAKE_CHAT: string[] = [
  '[World] Yuki of Yamashiro: WTS Frostwake axe, 400g — port Jade Coast',
  '[Realm] Bjorn Ironjaw reached Lv 42!',
  '[World] Ixchel of Tlanex: LFG Sunspire dungeon, need a shieldthane',
  '[Trade] Zahra al-Raqis: buying moon-silk, pm me',
  '[Guild] <Dawn Oath> recruiting — all realms welcome',
  '[Event] The Eclipse Tide rises in 3 realms…',
  '[World] Kaelen the Grey: any healers for Isbrekk?',
  '[Realm] Mei-Lin looted [Jade Dragon Seal]!',
  '[World] Ragnar: Khorzun down first try. ez',
  '[Realm] Nadia bint-Farouk reached Lv 37!',
  '[Trade] Tlanex market: obsidian prices up 12%',
  '[Guild] <Sand Veil> won the Dune Derby!',
  '[World] Hilde: selling runestones, fair prices at the fjord',
  '[World] Akio: gg on Mizuchi — what a fight',
  '[Event] World boss Zar\u2019qun spawns in the Dune Sea — 10m',
  '[World] Oya: new player, any tips?',
  '[World] Dagny: tip — dash straight through brute charges',
  '[Realm] Imhotep VII looted [Scepter of Glass]!',
];

export const ELITE_NAMES: string[] = [
  'Vargr the Unbroken',
  'Sable Maw',
  'Keth the Rotbound',
  'Yurei of the Mist',
  'Ashen Claw',
  'The Veiled Hunger',
  'Grimjaw',
  'Omen of Tlanex',
  'Dust Wraith',
  'Fenris Spawn',
];

export const HERO_NAMES: Record<string, string[]> = {
  kensei: ['Akio', 'Yuki', 'Ren', 'Hana', 'Jiro', 'Kaede', 'Sora'],
  shieldthane: ['Bjorn', 'Hilda', 'Ragnar', 'Astrid', 'Ulf', 'Sigrid', 'Sten'],
  jaguar: ['Ixchel', 'Balam', 'Citlali', 'Yaotl', 'Xochitl', 'Coatl', 'Itzel'],
  sandseer: ['Zahra', 'Farouk', 'Nadia', 'Imran', 'Layla', 'Qasim', 'Amira'],
  tidecaller: ['Neris', 'Marea', 'Oru', 'Sela', 'Kaio', 'Tavai', 'Luma'],
  riftblade: ['Veyr', 'Noctis', 'Iria', 'Vale', 'Kest', 'Nyx', 'Orin'],
  stormwarden: ['Raijin', 'Sable', 'Volt', 'Kira', 'Thunder', 'Zephyr', 'Gale'],
  drakewarden: ['Pyra', 'Ignis', 'Seara', 'Cinder', 'Blaz', 'Ember', 'Flint'],
};

export const STREAKS: [number, string][] = [
  [5, 'RAMPAGE!'],
  [10, 'UNSTOPPABLE!'],
  [15, 'GODLIKE!'],
  [25, 'AETHERBORN!'],
];

export type PowerId =
  | 'keen_edge'
  | 'ironhide'
  | 'windstep'
  | 'precision'
  | 'longreach'
  | 'siphon'
  | 'quicksilver'
  | 'sunward'
  | 'gilded_hand'
  | 'wardplate'
  | 'battle_tempo'
  | 'titan_blood'
  | 'veteran_reach'
  | 'blood_harvest'
  | 'astral_echo'
  | 'predator_instinct'
  | 'colossus_soul'
  | 'death_dealer'
  | 'chronomancer'
  | 'royal_treasury'
  | 'aetherborn_form'
  | 'undying_legend';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export const RARITY_META: Record<Rarity, { label: string; color: string; weight: number }> = {
  common: { label: 'COMMON', color: '#aab4c5', weight: 1 },
  rare: { label: 'RARE', color: '#61b9ff', weight: 2 },
  epic: { label: 'EPIC', color: '#c184ff', weight: 3 },
  legendary: { label: 'LEGENDARY', color: '#ffd36b', weight: 4 },
};

export interface PowerDef {
  id: PowerId;
  name: string;
  kicker: string;
  desc: string;
  color: string;
  icon: 'blade' | 'heart' | 'boot' | 'eye' | 'reach' | 'drop' | 'bolt' | 'sun' | 'coin' | 'shield';
  rarity: Rarity;
  recommended: string[];
  stacks: string;
}

export const POWERS: PowerDef[] = [
  {
    id: 'keen_edge',
    name: 'Keen Edge',
    kicker: 'OFFENSE',
    desc: '+22% weapon damage. Your attacks cut deeper.',
    color: '#ff907d',
    icon: 'blade',
    rarity: 'common', recommended: ['kensei', 'jaguar', 'riftblade'], stacks: 'Multiplicative · repeatable',
  },
  {
    id: 'ironhide',
    name: 'Ironhide',
    kicker: 'VITALITY',
    desc: '+25 max health and restore 25 health now.',
    color: '#7fc4ff',
    icon: 'heart',
    rarity: 'common', recommended: ['shieldthane', 'tidecaller'], stacks: 'Additive · repeatable',
  },
  {
    id: 'windstep',
    name: 'Windstep',
    kicker: 'MOBILITY',
    desc: '+14% movement speed. Leave danger behind.',
    color: '#78e0d0',
    icon: 'boot',
    rarity: 'common', recommended: ['sandseer', 'riftblade', 'jaguar'], stacks: 'Multiplicative · repeatable',
  },
  {
    id: 'precision',
    name: 'Hunter\'s Eye',
    kicker: 'CRITICAL',
    desc: '+12% critical chance. Crits strike twice as hard.',
    color: '#ffd36b',
    icon: 'eye',
    rarity: 'rare', recommended: ['kensei', 'jaguar', 'riftblade'], stacks: 'Additive · max 85%',
  },
  {
    id: 'longreach',
    name: 'Long Reach',
    kicker: 'TECHNIQUE',
    desc: '+18 weapon reach. Control a wider arc.',
    color: '#d7adff',
    icon: 'reach',
    rarity: 'common', recommended: ['shieldthane', 'tidecaller', 'sandseer'], stacks: 'Additive · repeatable',
  },
  {
    id: 'siphon',
    name: 'Soul Siphon',
    kicker: 'SUSTAIN',
    desc: 'Heal 2 health whenever you defeat an enemy.',
    color: '#9defa4',
    icon: 'drop',
    rarity: 'rare', recommended: ['jaguar', 'riftblade', 'shieldthane'], stacks: 'Additive healing · repeatable',
  },
  {
    id: 'quicksilver',
    name: 'Quicksilver',
    kicker: 'TEMPO',
    desc: '+18% attack speed. Keep the pressure relentless.',
    color: '#9ce9ff',
    icon: 'bolt',
    rarity: 'rare', recommended: ['kensei', 'jaguar', 'riftblade'], stacks: 'Multiplicative · repeatable',
  },
  {
    id: 'sunward',
    name: 'Sunward Focus',
    kicker: 'SIGNATURE',
    desc: 'Signature ability cooldown is 18% shorter.',
    color: '#ffe092',
    icon: 'sun',
    rarity: 'rare', recommended: ['sandseer', 'tidecaller', 'shieldthane'], stacks: 'Affects Signature & Legacy · repeatable',
  },
  {
    id: 'gilded_hand',
    name: 'Gilded Hand',
    kicker: 'FORTUNE',
    desc: '+50% coin value and a wider pickup aura.',
    color: '#ffd24a',
    icon: 'coin',
    rarity: 'common', recommended: ['sandseer', 'tidecaller'], stacks: 'Additive fortune · repeatable',
  },
  {
    id: 'wardplate',
    name: 'Wardplate',
    kicker: 'DEFENSE',
    desc: 'Take 12% less damage from every foe.',
    color: '#b1c5df',
    icon: 'shield',
    rarity: 'rare', recommended: ['shieldthane', 'tidecaller'], stacks: 'Additive · max 65%',
  },
  {
    id: 'battle_tempo', name: 'Battle Tempo', kicker: 'HYBRID',
    desc: '+10% weapon damage and +10% attack speed.', color: '#ffb08f', icon: 'bolt',
    rarity: 'rare', recommended: ['kensei', 'jaguar', 'riftblade'], stacks: 'Multiplicative · repeatable',
  },
  {
    id: 'titan_blood', name: 'Titan Blood', kicker: 'VITALITY',
    desc: '+18% maximum health and restore the amount gained.', color: '#83b8ff', icon: 'heart',
    rarity: 'rare', recommended: ['shieldthane', 'tidecaller'], stacks: 'Multiplicative max health · repeatable',
  },
  {
    id: 'veteran_reach', name: "Veteran's Reach", kicker: 'TECHNIQUE',
    desc: '+26 weapon reach and +12% weapon damage.', color: '#bfa0ff', icon: 'reach',
    rarity: 'rare', recommended: ['shieldthane', 'sandseer', 'tidecaller'], stacks: 'Reach additive, damage multiplicative',
  },
  {
    id: 'blood_harvest', name: 'Blood Harvest', kicker: 'SUSTAIN',
    desc: 'Heal 4 health per kill and gain +10% weapon damage.', color: '#e46f8f', icon: 'drop',
    rarity: 'epic', recommended: ['jaguar', 'riftblade'], stacks: 'Healing additive · damage multiplicative',
  },
  {
    id: 'astral_echo', name: 'Astral Echo', kicker: 'ABILITY',
    desc: 'Signature and Legacy cooldowns are 28% shorter; refresh both now.', color: '#d7adff', icon: 'sun',
    rarity: 'epic', recommended: ['sandseer', 'tidecaller', 'shieldthane'], stacks: 'Multiplicative cooldown · repeatable',
  },
  {
    id: 'predator_instinct', name: 'Predator Instinct', kicker: 'HUNTER',
    desc: '+10% critical chance, +12% speed and +10% damage.', color: '#f0c85f', icon: 'eye',
    rarity: 'epic', recommended: ['jaguar', 'kensei', 'riftblade'], stacks: 'Mixed bonuses · repeatable',
  },
  {
    id: 'colossus_soul', name: 'Colossus Soul', kicker: 'FORTRESS',
    desc: '+45 max health, restore 45 health and take 10% less damage.', color: '#9ab7d6', icon: 'shield',
    rarity: 'epic', recommended: ['shieldthane', 'tidecaller'], stacks: 'Health additive · armor max 65%',
  },
  {
    id: 'death_dealer', name: 'Death Dealer', kicker: 'ANNIHILATION',
    desc: '+32% weapon damage and +8% critical chance.', color: '#ff6d67', icon: 'blade',
    rarity: 'epic', recommended: ['kensei', 'jaguar', 'riftblade'], stacks: 'Damage multiplicative · crit additive',
  },
  {
    id: 'chronomancer', name: 'Chronomancer', kicker: 'TIME',
    desc: 'All ability cooldowns are 38% shorter and dash cooldown is reduced.', color: '#8fe7ff', icon: 'sun',
    rarity: 'legendary', recommended: ['sandseer', 'riftblade', 'tidecaller'], stacks: 'Multiplicative cooldown · repeatable',
  },
  {
    id: 'royal_treasury', name: 'Royal Treasury', kicker: 'FORTUNE',
    desc: 'Double coin value, greatly widen pickup range and gain +16% damage.', color: '#ffd24a', icon: 'coin',
    rarity: 'legendary', recommended: ['sandseer', 'tidecaller'], stacks: 'Fortune additive · damage multiplicative',
  },
  {
    id: 'aetherborn_form', name: 'Aetherborn Form', kicker: 'TRANSCENDENCE',
    desc: '+42% damage, +16% speed, +12% critical chance and +25 max health.', color: '#ffdf8a', icon: 'sun',
    rarity: 'legendary', recommended: ['kensei', 'jaguar', 'riftblade'], stacks: 'All bonuses stack',
  },
  {
    id: 'undying_legend', name: 'Undying Legend', kicker: 'IMMORTALITY',
    desc: '+35 max health, heal 6 per kill and take 15% less damage.', color: '#a8ffd1', icon: 'shield',
    rarity: 'legendary', recommended: ['shieldthane', 'tidecaller', 'jaguar'], stacks: 'Health/lifesteal additive · armor max 65%',
  },
];

export type ShopItemId = 'rations' | 'tonic' | 'steel' | 'boots' | 'ward' | 'sigil' | 'whetstone' | 'hourglass' | 'magnet' | 'elixir' | 'prism' | 'war_banner';

export interface ShopItemDef {
  id: ShopItemId;
  name: string;
  kicker: string;
  desc: string;
  cost: number;
  color: string;
  icon: 'heart' | 'sun' | 'blade' | 'boot' | 'shield' | 'spark';
  rarity: Rarity;
  recommended: string[];
  duration: string;
}

export const SHOP_ITEMS: ShopItemDef[] = [
  {
    id: 'rations',
    name: 'Field Rations',
    kicker: 'ONE USE',
    desc: 'Restore 48 health before the next assault.',
    cost: 10,
    color: '#9defa4',
    icon: 'heart',
    rarity: 'common', recommended: ['shieldthane', 'tidecaller', 'jaguar'], duration: 'Immediate',
  },
  {
    id: 'tonic',
    name: 'Sun Tonic',
    kicker: 'ONE USE',
    desc: 'Gain Empowered for 18 seconds (+50% damage).',
    cost: 18,
    color: '#ffd36b',
    icon: 'sun',
    rarity: 'common', recommended: ['kensei', 'jaguar', 'riftblade'], duration: '18 seconds',
  },
  {
    id: 'steel',
    name: 'Tempered Steel',
    kicker: 'PERMANENT',
    desc: '+14% weapon damage for the rest of this run.',
    cost: 26,
    color: '#ff9e88',
    icon: 'blade',
    rarity: 'rare', recommended: ['kensei', 'jaguar', 'riftblade'], duration: 'Rest of run · stacks',
  },
  {
    id: 'boots',
    name: 'Wayfarer Boots',
    kicker: 'PERMANENT',
    desc: '+10% movement speed for the rest of this run.',
    cost: 22,
    color: '#78e0d0',
    icon: 'boot',
    rarity: 'common', recommended: ['sandseer', 'riftblade', 'jaguar'], duration: 'Rest of run · stacks',
  },
  {
    id: 'ward',
    name: 'Moonward Charm',
    kicker: 'PERMANENT',
    desc: '+18 max health and restore 18 health now.',
    cost: 24,
    color: '#b1c5df',
    icon: 'shield',
    rarity: 'rare', recommended: ['shieldthane', 'tidecaller'], duration: 'Rest of run · stacks',
  },
  {
    id: 'sigil',
    name: 'Astral Sigil',
    kicker: 'ONE USE',
    desc: 'Fully refresh your signature ability now.',
    cost: 16,
    color: '#d7adff',
    icon: 'spark',
    rarity: 'rare', recommended: ['sandseer', 'tidecaller', 'shieldthane'], duration: 'Immediate',
  },
  {
    id: 'whetstone', name: 'Obsidian Whetstone', kicker: 'PERMANENT',
    desc: '+7% critical chance and +8% weapon damage.', cost: 34, color: '#ff907d', icon: 'blade',
    rarity: 'rare', recommended: ['kensei', 'jaguar', 'riftblade'], duration: 'Rest of run · stacks',
  },
  {
    id: 'hourglass', name: 'Chronicle Hourglass', kicker: 'PERMANENT',
    desc: 'Signature and Legacy cooldowns are 14% shorter.', cost: 38, color: '#8fe7ff', icon: 'spark',
    rarity: 'epic', recommended: ['sandseer', 'tidecaller', 'riftblade'], duration: 'Rest of run · stacks',
  },
  {
    id: 'magnet', name: 'Gilded Lodestone', kicker: 'PERMANENT',
    desc: '+50% coin value and +60 pickup range.', cost: 30, color: '#ffd24a', icon: 'spark',
    rarity: 'rare', recommended: ['sandseer', 'tidecaller'], duration: 'Rest of run · stacks',
  },
  {
    id: 'elixir', name: 'Phoenix Elixir', kicker: 'ONE USE',
    desc: 'Fully restore health and gain +20 max health.', cost: 48, color: '#ff856b', icon: 'heart',
    rarity: 'epic', recommended: ['shieldthane', 'jaguar', 'tidecaller'], duration: 'Immediate + permanent health',
  },
  {
    id: 'prism', name: 'Legacy Prism', kicker: 'ONE USE',
    desc: 'Fully refresh both Signature and Legacy abilities.', cost: 42, color: '#d7adff', icon: 'spark',
    rarity: 'epic', recommended: ['sandseer', 'tidecaller', 'riftblade'], duration: 'Immediate',
  },
  {
    id: 'war_banner', name: 'Banner of Six Realms', kicker: 'PERMANENT',
    desc: '+18% damage, +10% movement speed and +15 max health.', cost: 65, color: '#ffd36b', icon: 'sun',
    rarity: 'legendary', recommended: ['kensei', 'shieldthane', 'jaguar', 'sandseer', 'tidecaller', 'riftblade'], duration: 'Rest of run · stacks',
  },
];
```

## File: `src/game/lore.ts`

```typescript
export type LegacyKind = 'stillwater' | 'oathwall' | 'bloodrite' | 'mirage' | 'pearltide' | 'stasis' | 'stormcall' | 'pyreheart';

export interface LegacyDef {
  name: string;
  cd: number;
  desc: string;
  kind: LegacyKind;
  /** one-line explanation of how the story becomes the mechanic */
  origin: string;
}

export interface LegendLore {
  title: string;
  /** narrative paragraphs */
  saga: string[];
  /** why the signature ability exists in the story */
  signatureOrigin: string;
  legacy: LegacyDef;
}

export const LORE: Record<string, LegendLore> = {
  kensei: {
    title: 'The Blade That Cut the Rain',
    saga: [
      'On the Yamashiro Isles a sword is not a weapon but a vow. The Kensei were once temple sweepers who trained beneath the Weeping Falls, where the monks taught that a true cut passes between raindrops without wetting the steel.',
      'When the Tide Serpent Mizuchi drowned the eastern harbors, the sweepers walked into the storm with nothing but their vow. They returned with the storm cut into a thousand petals of light — and the sea has feared the isles since.',
      'A Kensei never rushes. They wait in stillness until the world slows, then move once, perfectly. Every blossom that falls in Aetheria is said to be a stroke they chose not to make.',
    ],
    signatureOrigin:
      'Thousand Petals is the storm-cut itself: the night the sweepers turned Mizuchi\u2019s rain into a spinning ring of blades.',
    legacy: {
      name: 'Still Water',
      cd: 16,
      kind: 'stillwater',
      desc: 'Enter the stillness for 3.5s: every foe slows to a crawl and your next 4 strikes are guaranteed critical hits.',
      origin: 'The Weeping Falls discipline — waiting until the world slows so one cut can be perfect.',
    },
  },
  shieldthane: {
    title: 'The Oath at Glacier\u2019s Edge',
    saga: [
      'In Skaldheim the winter does not end; it only pauses. The Shieldthanes are the pause. Sworn at the lip of the great glacier Isbrekk, each thane carves a rune of their oath into their shield and into their own arm.',
      'When the Hollow King rose from the ice and led the dead down the fjords, three hundred thanes locked shields across the narrows and did not step back for eleven days. Their runes froze the very ground the dead walked upon.',
      'A Shieldthane does not win by striking first. They win by still standing when everything else has fallen — and by making the earth itself refuse their enemy.',
    ],
    signatureOrigin:
      'Frostwake Nova is the glacier\u2019s answer to the oath: the ground shatters and freezes as it did beneath the dead at the narrows.',
    legacy: {
      name: 'Oathwall',
      cd: 18,
      kind: 'oathwall',
      desc: 'Plant your shield for 4.5s: take 70% less damage, mend 3 health every second, and every foe that strikes you is hurled back and wounded.',
      origin: 'Eleven days at the narrows — the wall that does not break, and punishes those who test it.',
    },
  },
  jaguar: {
    title: 'Blood for the Fifth Sun',
    saga: [
      'The Tlanex believe four suns have already died. The fifth burns only because it is fed. Atop the Sunspire pyramid the Jaguar Knights offer their own blood at every dawn so the light will rise once more.',
      'Balam K\u2019in, the Eclipse Priest, tried to starve the sun and rule the dark. The knights answered by opening their veins on the pyramid steps and hurling the sun\u2019s fury back at him in ten burning spears.',
      'To be a Jaguar Knight is to trade flesh for radiance. The more they bleed, the brighter they burn — and the sun always pays its debts.',
    ],
    signatureOrigin:
      'Wrath of the Fifth Sun is the pyramid rite made war: solar spears cast outward exactly as they were against the Eclipse Priest.',
    legacy: {
      name: 'Blood Rite',
      cd: 15,
      kind: 'bloodrite',
      desc: 'Offer 15% of your current health to the sun. For 6s deal 45% more damage, move 25% faster, and drink 4 health from every kill.',
      origin: 'The dawn offering — the sun repays blood with radiance, and radiance with life.',
    },
  },
  sandseer: {
    title: 'The Veil Over the Dune Sea',
    saga: [
      'In the Zahraan wastes the sand remembers every footstep ever taken across it. The Sandseers learned to read those footsteps — and then to write false ones.',
      'When Zar\u2019qun, the Sultan of Glass, sent his mirrored legions across the dunes, the seers did not fight them. They walked ahead of the army leaving phantom trails, and the legions marched into whirling storms chasing seers who were never there.',
      'A Sandseer is never where the enemy believes. The dunes shift, the storm sings its requiem, and by the time the sand settles, the fate written in it has already come true.',
    ],
    signatureOrigin:
      'Dune Requiem is the singing storm the seers led the Glass Legions into — sand that shreds and slows everything it swallows.',
    legacy: {
      name: 'Mirage Step',
      cd: 17,
      kind: 'mirage',
      desc: 'Leave a sand mirage of yourself for 4s. Every foe hunts the mirage instead of you — then it bursts, scouring all around it.',
      origin: 'The false footsteps the seers wrote for the Glass Legions to follow.',
    },
  },
  tidecaller: {
    title: 'The Pearl and the Deep',
    saga: [
      'The Nacrean Atolls have no ground to stand on, only tides to ride. A Tidecaller is bonded at birth to a living pearl set beneath the skin of the wrist, and through it they hear the moon pulling at the sea.',
      'When the drowned fleets rose to reclaim the atolls, the Tidecallers called the moon down. The undertow dragged the dead ships into a single churning ring and broke them upon the reef.',
      'The pearl takes as much as it gives: the same tide that crushes an enemy can, if the caller asks softly, wash their wounds back into the sea.',
    ],
    signatureOrigin:
      'Moonfall Undertow is the moon called down upon the drowned fleets — everything nearby dragged into one crushing ring.',
    legacy: {
      name: 'Pearl Tide',
      cd: 19,
      kind: 'pearltide',
      desc: 'Ask the pearl softly: a wave throws every nearby foe back and slows them, and the sea mends 24% of your health over 3s.',
      origin: 'The gentler tide — the pearl\u2019s gift of returning wounds to the sea.',
    },
  },
  riftblade: {
    title: 'The Edge Between Heartbeats',
    saga: [
      'Nobody is born in the Umbral Reach. People arrive there — exiles, deserters, the erased. They find a fallen star buried in the dark and learn that its shards can cut through the space between two moments.',
      'A Riftblade fights in the gap between heartbeats. To everyone else, they simply vanish and reappear behind the fallen; to the Riftblade, the world merely paused politely while they walked through it.',
      'The star is not free. Each stasis borrows a heartbeat from the future, and the debt returns as an echo — every wound dealt in the stillness strikes once more when time remembers itself.',
    ],
    signatureOrigin:
      'Eventide Rift is the walk between moments: step through the nearest foe and leave the collapsing gap behind you.',
    legacy: {
      name: 'Heartbeat Stasis',
      cd: 20,
      kind: 'stasis',
      desc: 'Stop the world for 2s. Foes and their bolts freeze while you move freely — and when time resumes, every wound you dealt strikes again.',
      origin: 'The borrowed heartbeat, and the echo that repays it.',
    },
  },
  stormwarden: {
    title: 'The Chain That Bound the Sky',
    saga: [
      'Above the Voltaic Peaks the First Storm has raged since before memory — a living tempest that crowned itself king of the sky. The wardens were the shepherds who climbed into it with copper chains and refused to come down.',
      'For nine nights they wrestled lightning with their bare hands until the storm, exhausted and impressed, bent its knee. It poured itself into their mauls and taught them the one law of thunder: judgment falls on the proud first.',
      'A Stormwarden does not chase enemies. They raise their maul, and the sky itself delivers the verdict — sevenfold, inescapable, and utterly without mercy.',
    ],
    signatureOrigin:
      'Tempest Judgment is the storm\u2019s own verdict: lightning that leaps from foe to foe exactly as it did the night the sky was chained.',
    legacy: {
      name: 'Stormcall',
      cd: 18,
      kind: 'stormcall',
      desc: 'Become the storm for 6s: lightning smites random nearby foes every 0.4s and you move 30% faster.',
      origin: 'The wardens\u2019 oldest rite — opening their veins to the tempest and letting it strike through them.',
    },
  },
  drakewarden: {
    title: 'Heir of the First Flame',
    saga: [
      'When the First Flame died atop the Ashen Roost, its last ember fell into an unhatched clutch. The wyrmlings that crawled from those eggs imprinted not on dragons, but on the wardens who kept the vigil — and shared their fire-blood.',
      'A Drakewarden carries a furnace where a heart should be. In the War of Cinders they walked alone into the Hollow vanguard wreathed in wyrmfire, and where they passed, nothing remained but glass footprints in cooling slag.',
      'The flame demands tribute: every breath of the cataclysm scorches the warden as well as the foe. But dragon-blooded flesh knits itself back together in the heat — stronger, harder, and hungrier than before.',
    ],
    signatureOrigin:
      'Wyrmfire Cataclysm is the vigil-fire unleashed: the same breath that turned the Hollow vanguard to glass.',
    legacy: {
      name: 'Pyreheart',
      cd: 22,
      kind: 'pyreheart',
      desc: 'Ignite your dragon heart for 6s: pulsing fire novas scorch all around you while you regenerate health in the flames.',
      origin: 'The furnace-heart — dragon fire that burns the enemy and mends the warden in the same breath.',
    },
  },
};

export function legacyFor(classId: string): LegacyDef {
  return LORE[classId]?.legacy ?? LORE.kensei.legacy;
}
```

## File: `src/game/audio.ts`

```typescript
/* Procedural WebAudio SFX — no assets, all synthesized. */

type SfxName =
  | 'click'
  | 'swing'
  | 'hit'
  | 'crit'
  | 'kill'
  | 'coin'
  | 'potion'
  | 'rune'
  | 'hurt'
  | 'dash'
  | 'petals'
  | 'nova'
  | 'bolts'
  | 'storm'
  | 'shoot'
  | 'levelup'
  | 'wave'
  | 'boss'
  | 'streak'
  | 'death'
  | 'stillwater'
  | 'oathwall'
  | 'bloodrite'
  | 'mirage'
  | 'pearltide'
  | 'stasis'
  | 'stasisEnd'
  | 'tide'
  | 'rift'
  | 'tempest'
  | 'pyre'
  | 'stormcall'
  | 'pyreheart'
  | 'reroll'
  | 'dragonroar';

export class SFX {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  muted = false;
  /** user volume 0..1 */
  private volume = 0.7;

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return;
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.volume;
      this.master.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.5;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    } catch {
      this.ctx = null;
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    this.apply();
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    this.apply();
  }
  getVolume() {
    return this.volume;
  }

  private apply() {
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.02);
    }
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    vol: number,
    slideTo?: number,
    delay = 0
  ) {
    if (!this.ctx || !this.master) return;
    const t0 = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(this.master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  private noise(dur: number, vol: number, filterFreq: number, type: BiquadFilterType = 'bandpass', delay = 0) {
    if (!this.ctx || !this.master || !this.noiseBuf) return;
    const t0 = this.ctx.currentTime + delay;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = filterFreq;
    f.Q.value = 0.9;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f).connect(g).connect(this.master);
    s.start(t0);
    s.stop(t0 + dur + 0.02);
  }

  /** Every legend's weapon has a different material, weight and swing voice. */
  playWeapon(classId: string) {
    if (!this.ctx || this.muted) return;
    switch (classId) {
      case 'kensei':
        // fast steel hiss + bright katana ring
        this.noise(0.085, 0.11, 3600, 'highpass');
        this.tone(980, 0.12, 'sine', 0.07, 680);
        break;
      case 'shieldthane':
        // heavy axe displacement and low iron weight
        this.noise(0.15, 0.15, 720, 'lowpass');
        this.tone(145, 0.16, 'square', 0.1, 82);
        break;
      case 'jaguar':
        // wooden macuahuitl with obsidian teeth
        this.noise(0.11, 0.13, 1450);
        this.tone(360, 0.1, 'triangle', 0.08, 230);
        break;
      case 'sandseer':
        // glass khopesh shimmer through sand
        this.noise(0.12, 0.09, 2200, 'bandpass');
        this.tone(760, 0.16, 'sine', 0.075, 510);
        break;
      case 'tidecaller':
        // coral trident through water
        this.noise(0.16, 0.1, 520, 'lowpass');
        this.tone(420, 0.2, 'sine', 0.08, 690);
        break;
      case 'riftblade':
        // nullglass cuts the space between moments
        this.noise(0.07, 0.12, 5600, 'highpass');
        this.tone(1280, 0.12, 'square', 0.065, 190);
        break;
      case 'stormwarden':
        // crackling maul head dragging ozone
        this.noise(0.12, 0.13, 2800, 'highpass');
        this.tone(220, 0.14, 'sawtooth', 0.09, 660);
        break;
      case 'drakewarden':
        // massive fang blade with a furnace hum
        this.noise(0.16, 0.14, 500, 'lowpass');
        this.tone(98, 0.2, 'sawtooth', 0.11, 196);
        break;
      default:
        this.play('swing');
    }
  }

  play(name: SfxName) {
    if (!this.ctx || this.muted) return;
    switch (name) {
      case 'click':
        this.tone(640, 0.06, 'sine', 0.15, 520);
        break;
      case 'swing':
        this.noise(0.09, 0.1, 1800);
        this.tone(320, 0.07, 'triangle', 0.06, 160);
        break;
      case 'hit':
        this.noise(0.07, 0.18, 900);
        this.tone(190, 0.08, 'square', 0.12, 120);
        break;
      case 'crit':
        this.noise(0.1, 0.22, 2400);
        this.tone(520, 0.12, 'triangle', 0.16, 880);
        break;
      case 'kill':
        this.noise(0.16, 0.2, 500, 'lowpass');
        this.tone(300, 0.18, 'sawtooth', 0.1, 60);
        break;
      case 'coin':
        this.tone(880, 0.07, 'sine', 0.14);
        this.tone(1320, 0.12, 'sine', 0.12, undefined, 0.06);
        break;
      case 'potion':
        this.tone(392, 0.1, 'sine', 0.14);
        this.tone(523, 0.14, 'sine', 0.12, undefined, 0.08);
        break;
      case 'rune':
        this.tone(660, 0.1, 'triangle', 0.13);
        this.tone(990, 0.16, 'triangle', 0.11, undefined, 0.07);
        break;
      case 'hurt':
        this.tone(175, 0.22, 'sawtooth', 0.24, 62);
        this.tone(92, 0.26, 'square', 0.1, 50, 0.025);
        this.noise(0.15, 0.2, 340, 'lowpass');
        break;
      case 'dash':
        this.noise(0.14, 0.12, 3200, 'highpass');
        break;
      case 'petals':
        this.noise(0.3, 0.16, 2600);
        this.tone(740, 0.22, 'triangle', 0.12, 1180);
        break;
      case 'nova':
        this.tone(220, 0.4, 'sine', 0.22, 50);
        this.noise(0.35, 0.2, 4200, 'highpass');
        break;
      case 'bolts':
        this.tone(520, 0.16, 'square', 0.1, 940);
        this.noise(0.12, 0.1, 3000);
        break;
      case 'storm':
        this.noise(0.6, 0.14, 700);
        this.tone(140, 0.5, 'sawtooth', 0.08, 90);
        break;
      case 'shoot':
        this.tone(480, 0.12, 'square', 0.07, 240);
        break;
      case 'levelup':
        this.tone(523, 0.12, 'triangle', 0.16);
        this.tone(659, 0.12, 'triangle', 0.16, undefined, 0.09);
        this.tone(784, 0.12, 'triangle', 0.16, undefined, 0.18);
        this.tone(1047, 0.26, 'triangle', 0.16, undefined, 0.27);
        break;
      case 'wave':
        this.tone(392, 0.14, 'triangle', 0.14);
        this.tone(587, 0.2, 'triangle', 0.13, undefined, 0.11);
        break;
      case 'boss':
        this.tone(70, 0.7, 'sawtooth', 0.24, 38);
        this.noise(0.6, 0.18, 240, 'lowpass');
        this.tone(140, 0.5, 'square', 0.1, 60, 0.15);
        break;
      case 'streak':
        this.tone(659, 0.1, 'square', 0.1);
        this.tone(880, 0.16, 'square', 0.1, undefined, 0.08);
        break;
      case 'death':
        this.tone(300, 0.5, 'sawtooth', 0.16, 60);
        this.tone(150, 0.8, 'triangle', 0.14, 40, 0.15);
        this.noise(0.7, 0.16, 400, 'lowpass');
        break;
      case 'stillwater':
        this.tone(1046, 0.5, 'sine', 0.12, 523);
        this.noise(0.5, 0.06, 6000, 'highpass');
        this.tone(261, 0.9, 'sine', 0.08);
        break;
      case 'oathwall':
        this.noise(0.18, 0.2, 500, 'lowpass');
        this.tone(110, 0.45, 'square', 0.14, 70);
        this.tone(220, 0.3, 'triangle', 0.1, undefined, 0.1);
        break;
      case 'bloodrite':
        this.tone(196, 0.35, 'sawtooth', 0.14, 392);
        this.tone(587, 0.4, 'triangle', 0.12, 784, 0.12);
        this.noise(0.3, 0.1, 1800);
        break;
      case 'mirage':
        this.noise(0.45, 0.12, 900);
        this.tone(440, 0.3, 'triangle', 0.1, 330);
        this.tone(660, 0.25, 'sine', 0.08, undefined, 0.15);
        break;
      case 'pearltide':
        this.tone(330, 0.6, 'sine', 0.12, 660);
        this.tone(495, 0.7, 'sine', 0.1, 990, 0.1);
        this.noise(0.6, 0.1, 700, 'lowpass');
        break;
      case 'stasis':
        this.tone(880, 0.6, 'sine', 0.14, 110);
        this.noise(0.25, 0.12, 5000, 'highpass');
        break;
      case 'stasisEnd':
        this.tone(110, 0.3, 'sawtooth', 0.16, 660);
        this.noise(0.2, 0.18, 2400);
        break;
      case 'tide':
        this.noise(0.7, 0.16, 620, 'lowpass');
        this.tone(196, 0.65, 'sine', 0.14, 784);
        this.tone(392, 0.45, 'triangle', 0.1, 988, 0.14);
        break;
      case 'rift':
        this.noise(0.18, 0.2, 6400, 'highpass');
        this.tone(1500, 0.28, 'square', 0.11, 75);
        this.tone(110, 0.5, 'sawtooth', 0.12, 660, 0.08);
        break;
      case 'tempest':
        this.noise(0.22, 0.22, 5200, 'highpass');
        this.tone(1800, 0.18, 'square', 0.12, 240);
        this.tone(120, 0.4, 'sawtooth', 0.14, 55);
        break;
      case 'pyre':
        this.noise(0.55, 0.18, 900, 'lowpass');
        this.tone(90, 0.6, 'sawtooth', 0.16, 220);
        this.tone(660, 0.3, 'triangle', 0.1, 220, 0.1);
        break;
      case 'stormcall':
        this.noise(0.3, 0.16, 4200, 'highpass');
        this.tone(440, 0.5, 'sawtooth', 0.12, 1760);
        break;
      case 'pyreheart':
        this.noise(0.5, 0.15, 700, 'lowpass');
        this.tone(140, 0.55, 'sawtooth', 0.14, 420);
        this.tone(523, 0.4, 'triangle', 0.1, undefined, 0.12);
        break;
      case 'reroll':
        this.tone(520, 0.09, 'triangle', 0.12);
        this.tone(660, 0.09, 'triangle', 0.12, undefined, 0.07);
        this.tone(880, 0.14, 'triangle', 0.13, undefined, 0.14);
        break;
      case 'dragonroar':
        this.tone(75, 0.7, 'sawtooth', 0.22, 45);
        this.noise(0.6, 0.16, 350, 'lowpass');
        break;
    }
  }
}
```

## File: `src/game/music.ts`

```typescript
/* Procedural realm music — no audio assets.
 *
 * A lookahead scheduler plays culture-flavoured tracks per zone. Unlike a
 * random walk, the melody is locked to the current chord of a repeating
 * progression, which is what makes it sound like a composed tune rather than
 * noodling. Boss waves swap to dedicated battle tracks: faster, minor, with
 * war-drums, driving eighth-note bass and brass-like power stabs.
 */

export type Scene = 'menu' | 'zone';

interface Track {
  root: number; // MIDI root
  scale: number[]; // semitone offsets from root
  /** chord progression as scale degrees (index into scale) */
  prog: number[];
  bpm: number;
  lead: OscillatorType;
  pad: OscillatorType;
  bass: OscillatorType;
  leadDecay: number;
  swing: number;
  /** 0 = none, 1 = light, 2 = driving, 3 = war drums */
  drums: number;
  padLevel: number;
  leadLevel: number;
  bassLevel: number;
  /** chance a 16th slot carries a lead note */
  density: number;
  /** adds a fifth/octave stab layer on downbeats */
  stabs: boolean;
  bright: number; // lowpass cutoff
}

/** Zone tracks — one per realm, in wave order. */
const ZONE_TRACKS: Track[] = [
  // 0 Jade Coast — yo scale, koto plucks, gentle and flowing
  {
    root: 62, scale: [0, 2, 4, 7, 9], prog: [0, 3, 4, 3],
    bpm: 96, lead: 'triangle', pad: 'sine', bass: 'sine',
    leadDecay: 0.6, swing: 0.14, drums: 1,
    padLevel: 0.075, leadLevel: 0.16, bassLevel: 0.11,
    density: 0.62, stabs: false, bright: 3600,
  },
  // 1 Ember Steppes — minor pentatonic, galloping steppe drums
  {
    root: 57, scale: [0, 3, 5, 7, 10], prog: [0, 0, 3, 4],
    bpm: 124, lead: 'sawtooth', pad: 'triangle', bass: 'square',
    leadDecay: 0.3, swing: 0, drums: 2,
    padLevel: 0.05, leadLevel: 0.12, bassLevel: 0.13,
    density: 0.7, stabs: true, bright: 4200,
  },
  // 2 Frostveil Fjord — dorian, slow, wide and airy
  {
    root: 55, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 5, 3, 4],
    bpm: 82, lead: 'sine', pad: 'triangle', bass: 'sine',
    leadDecay: 1.0, swing: 0, drums: 1,
    padLevel: 0.085, leadLevel: 0.14, bassLevel: 0.1,
    density: 0.5, stabs: false, bright: 2800,
  },
  // 3 Sunspire Jungles — major pentatonic, bright marimba pulse
  {
    root: 64, scale: [0, 2, 4, 7, 9], prog: [0, 4, 3, 4],
    bpm: 132, lead: 'triangle', pad: 'sine', bass: 'triangle',
    leadDecay: 0.22, swing: 0.16, drums: 2,
    padLevel: 0.055, leadLevel: 0.15, bassLevel: 0.12,
    density: 0.74, stabs: false, bright: 4800,
  },
  // 4 Dune Sea — phrygian dominant, oud-like and snaking
  {
    root: 59, scale: [0, 1, 4, 5, 7, 8, 10], prog: [0, 0, 4, 3],
    bpm: 104, lead: 'sawtooth', pad: 'triangle', bass: 'square',
    leadDecay: 0.42, swing: 0.1, drums: 2,
    padLevel: 0.06, leadLevel: 0.13, bassLevel: 0.12,
    density: 0.66, stabs: true, bright: 3800,
  },
];

/** Boss battle tracks — one per realm. Heavy, fast, unmistakably a fight. */
const BOSS_TRACKS: Track[] = [
  // Mizuchi — storm-serpent: churning harmonic minor
  {
    root: 50, scale: [0, 2, 3, 5, 7, 8, 11], prog: [0, 0, 5, 4],
    bpm: 152, lead: 'sawtooth', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.24, swing: 0, drums: 3,
    padLevel: 0.075, leadLevel: 0.15, bassLevel: 0.2,
    density: 0.82, stabs: true, bright: 5200,
  },
  // Khorzun — ashen khagan: war gallop
  {
    root: 45, scale: [0, 3, 5, 6, 7, 10], prog: [0, 0, 3, 5],
    bpm: 164, lead: 'square', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.2, swing: 0, drums: 3,
    padLevel: 0.07, leadLevel: 0.14, bassLevel: 0.21,
    density: 0.86, stabs: true, bright: 5400,
  },
  // Isbrekk — hollow king: glacial dread, slower but crushing
  {
    root: 48, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 0, 4],
    bpm: 138, lead: 'sawtooth', pad: 'sawtooth', bass: 'sawtooth',
    leadDecay: 0.34, swing: 0, drums: 3,
    padLevel: 0.085, leadLevel: 0.14, bassLevel: 0.2,
    density: 0.74, stabs: true, bright: 4600,
  },
  // Balam K'in — eclipse priest: ritual polyrhythm
  {
    root: 52, scale: [0, 1, 4, 5, 7, 8, 11], prog: [0, 4, 0, 5],
    bpm: 158, lead: 'square', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.22, swing: 0.06, drums: 3,
    padLevel: 0.07, leadLevel: 0.15, bassLevel: 0.2,
    density: 0.84, stabs: true, bright: 5600,
  },
  // Zar'qun — sultan of glass: shrieking phrygian dominant
  {
    root: 47, scale: [0, 1, 4, 5, 7, 8, 10], prog: [0, 0, 4, 5],
    bpm: 156, lead: 'sawtooth', pad: 'sawtooth', bass: 'square',
    leadDecay: 0.26, swing: 0, drums: 3,
    padLevel: 0.075, leadLevel: 0.15, bassLevel: 0.21,
    density: 0.84, stabs: true, bright: 5600,
  },
];

/** Title screen — slow, mysterious, inviting. */
const MENU_TRACK: Track = {
  root: 53, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 3, 4],
  bpm: 76, lead: 'sine', pad: 'triangle', bass: 'sine',
  leadDecay: 1.2, swing: 0, drums: 0,
  padLevel: 0.09, leadLevel: 0.12, bassLevel: 0.09,
  density: 0.42, stabs: false, bright: 2400,
};

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export class Music {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer = 0;
  private nextTime = 0;
  private step = 0;
  private bar = 0;
  private melIdx = 0;
  private track: Track = MENU_TRACK;
  private boss = false;
  /** user volume 0..1 */
  private volume = 0.7;
  private enabled = true;
  private ducked = false;
  private started = false;

  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      if (!this.started) this.startLoop();
      return;
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.value = 3600;
      this.filter.connect(this.master).connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.5;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.startLoop();
    } catch {
      this.ctx = null;
    }
  }

  setEnabled(v: boolean) {
    this.enabled = v;
    this.applyGain();
  }
  isEnabled() {
    return this.enabled;
  }

  setVolume(v: number) {
    this.volume = clamp01(v);
    this.applyGain();
  }
  getVolume() {
    return this.volume;
  }

  /** Lower volume while paused / overlays are open. */
  duck(v: boolean) {
    this.ducked = v;
    this.applyGain();
  }

  setScene(scene: Scene, zoneIndex = 0, boss = false) {
    const idx = ((zoneIndex % 5) + 5) % 5;
    const next = scene === 'menu' ? MENU_TRACK : boss ? BOSS_TRACKS[idx] : ZONE_TRACKS[idx];
    if (next !== this.track) {
      this.track = next;
      this.step = 0;
      this.bar = 0;
      this.melIdx = 0;
      if (this.filter && this.ctx) {
        this.filter.frequency.setTargetAtTime(next.bright, this.ctx.currentTime, 0.5);
      }
    }
    void scene;
    this.boss = boss;
    this.applyGain();
  }

  private applyGain() {
    if (!this.ctx || !this.master) return;
    // Headroom-aware master: boss tracks sit slightly louder.
    const target = !this.enabled ? 0 : this.volume * (this.ducked ? 0.32 : 1) * (this.boss ? 1.18 : 1);
    this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.35);
  }

  private startLoop() {
    if (this.started || !this.ctx) return;
    this.started = true;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.timer = window.setInterval(() => this.schedule(), 80);
    this.applyGain();
  }

  destroy() {
    window.clearInterval(this.timer);
    this.ctx?.close().catch(() => {});
    this.ctx = null;
  }

  private schedule() {
    if (!this.ctx || !this.enabled) {
      if (this.ctx) this.nextTime = Math.max(this.nextTime, this.ctx.currentTime + 0.05);
      return;
    }
    const lookahead = 0.25;
    const sixteenth = 60 / this.track.bpm / 4;
    while (this.nextTime < this.ctx.currentTime + lookahead) {
      const swing = this.step % 2 === 1 ? sixteenth * this.track.swing : 0;
      this.playStep(this.nextTime + swing, sixteenth);
      this.nextTime += sixteenth;
      this.step++;
      if (this.step % 16 === 0) this.bar++;
    }
  }

  /** current chord root (scale degree) for this bar */
  private chordDeg() {
    const t = this.track;
    return t.prog[this.bar % t.prog.length];
  }

  /** note for a chord tone offset (0=root,1=third,2=fifth) in the current chord */
  private chordTone(i: number, octave = 0) {
    const t = this.track;
    const deg = this.chordDeg() + i * 2; // stack thirds within the scale
    const oct = Math.floor(deg / t.scale.length) + octave;
    return t.root + 12 * oct + t.scale[((deg % t.scale.length) + t.scale.length) % t.scale.length];
  }

  private playStep(t: number, sixteenth: number) {
    const tr = this.track;
    const s = this.step % 16;
    const beat = sixteenth * 4;

    // ---- chord pad on each bar ----
    if (s === 0) {
      const dur = beat * 4 * 0.98;
      this.pad(t, this.chordTone(0, -1), dur, tr.padLevel);
      this.pad(t, this.chordTone(1, -1), dur, tr.padLevel * 0.75);
      this.pad(t, this.chordTone(2, -1), dur, tr.padLevel * 0.8);
      if (this.boss) this.pad(t, this.chordTone(0, -2), dur, tr.padLevel * 1.1, 'sawtooth');
    }

    // ---- bass ----
    if (this.boss) {
      // driving eighths — the engine of a battle theme
      if (s % 2 === 0) {
        const n = s % 8 === 0 ? this.chordTone(0, -2) : s % 4 === 0 ? this.chordTone(2, -3) : this.chordTone(0, -2);
        this.bassNote(t, n, sixteenth * 1.7, tr.bassLevel);
      }
    } else if (tr.drums >= 2) {
      if (s === 0 || s === 6 || s === 10) this.bassNote(t, this.chordTone(0, -2), beat * 0.7, tr.bassLevel);
    } else if (s === 0 || s === 8) {
      this.bassNote(t, this.chordTone(0, -2), beat * 1.4, tr.bassLevel);
    }

    // ---- lead melody, locked to chord tones with passing notes ----
    const onEighth = s % 2 === 0;
    if (onEighth && Math.random() < tr.density) {
      const shape = [0, 2, 1, 2, 0, 1, 2, 1]; // chord-tone contour
      const useChordTone = s % 4 === 0 || Math.random() < 0.65;
      let note: number;
      if (useChordTone) {
        note = this.chordTone(shape[this.melIdx % shape.length], Math.random() < 0.25 ? 1 : 0);
        this.melIdx++;
      } else {
        // passing tone from the scale, near the chord root
        const deg = this.chordDeg() + (Math.random() < 0.5 ? 1 : 3);
        const oct = Math.floor(deg / tr.scale.length);
        note = tr.root + 12 * oct + tr.scale[deg % tr.scale.length];
      }
      const accent = s === 0 ? 1.15 : s % 4 === 0 ? 1 : 0.7;
      this.pluck(t, note, tr.leadDecay, tr.leadLevel * accent, tr.lead);
      // boss leads are doubled an octave up for bite
      if (this.boss && s % 4 === 0) this.pluck(t, note + 12, tr.leadDecay * 0.7, tr.leadLevel * 0.45, 'square');
    }

    // ---- power stabs ----
    if (tr.stabs && (s === 0 || (this.boss && s === 8))) {
      this.stab(t, this.chordTone(0, -1), beat * 0.5, this.boss ? 0.1 : 0.06);
      this.stab(t, this.chordTone(2, -1), beat * 0.5, this.boss ? 0.085 : 0.05);
    }

    // ---- percussion ----
    const d = tr.drums;
    if (d >= 1) {
      if (d === 3) {
        // war drums: heavy 4-on-floor + tom fills
        if (s % 4 === 0) this.kick(t, 0.3);
        if (s === 4 || s === 12) this.snare(t, 0.15);
        if (s % 2 === 1 && Math.random() < 0.6) this.hat(t, 0.035);
        if (s === 14 && this.bar % 4 === 3) {
          this.tom(t, 180, 0.16);
          this.tom(t + sixteenth * 0.5, 140, 0.16);
        }
      } else if (d === 2) {
        if (s === 0 || s === 8) this.kick(t, 0.22);
        if (s === 4 || s === 12) this.snare(t, 0.1);
        if (s % 2 === 1 && Math.random() < 0.45) this.hat(t, 0.025);
      } else {
        if (s === 0) this.kick(t, 0.16);
        if (s === 8 && Math.random() < 0.6) this.hat(t, 0.03);
      }
    }
  }

  /* ----------------------------- instruments ----------------------------- */

  private pluck(t: number, note: number, decay: number, vol: number, type: OscillatorType) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(midi(note), t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    o.connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + decay + 0.05);
  }

  private bassNote(t: number, note: number, dur: number, vol: number) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(this.boss ? 900 : 600, t);
    o.type = this.track.bass;
    o.frequency.setValueAtTime(midi(note), t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private stab(t: number, note: number, dur: number, vol: number) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(midi(note), t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + dur + 0.04);
  }

  private pad(t: number, note: number, dur: number, vol: number, type: OscillatorType = this.track.pad) {
    if (!this.ctx || !this.filter) return;
    const o = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o2.type = type;
    o.frequency.setValueAtTime(midi(note), t);
    o2.frequency.setValueAtTime(midi(note) * 1.005, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.7, dur * 0.25));
    g.gain.setValueAtTime(vol, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    o2.connect(g);
    g.connect(this.filter);
    o.start(t);
    o2.start(t);
    o.stop(t + dur + 0.05);
    o2.stop(t + dur + 0.05);
  }

  private kick(t: number, vol: number) {
    if (!this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(this.boss ? 170 : 150, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    o.connect(g).connect(this.master); // bypass lowpass so it punches
    o.start(t);
    o.stop(t + 0.26);
  }

  private tom(t: number, freq: number, vol: number) {
    if (!this.ctx || !this.master) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 0.55, t + 0.2);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.26);
  }

  private snare(t: number, vol: number) {
    if (!this.ctx || !this.master || !this.noise) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = this.boss ? 2200 : 1800;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    s.connect(f).connect(g).connect(this.master);
    s.start(t);
    s.stop(t + 0.18);
  }

  private hat(t: number, vol: number) {
    if (!this.ctx || !this.master || !this.noise) return;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    const f = this.ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    s.connect(f).connect(g).connect(this.master);
    s.start(t);
    s.stop(t + 0.06);
  }
}
```

## File: `src/game/patchnotes.ts`

```typescript
export interface PatchNote {
  version: string;
  date: string; // ISO date
  title: string;
  highlights: string[];
  changes: { kind: 'new' | 'improved' | 'balance' | 'fixed'; text: string }[];
}

/**
 * Bundled patch notes. The newest entry is the live game version — adding a
 * new entry here bumps the version shown in the title bar and lights the
 * "NEW" badge for every player who has not read it yet.
 */
export const PATCH_NOTES: PatchNote[] = [
  {
    version: '3.2.0',
    date: '2026-05-20',
    title: 'The Aetheria Archive',
    highlights: [
      'Twenty-two rarity-based level-up powers',
      'Twelve-item market catalog with discovery tracking',
      'Score-ranked leaderboards now show completion time',
    ],
    changes: [
      { kind: 'new', text: 'Progression Index documents every attainable power and shop item, including recommendations and stacking behavior.' },
      { kind: 'new', text: 'Discovery tracking darkens powers and items until you use them in a run.' },
      { kind: 'new', text: 'Common, Rare, Epic and Legendary power rarities with higher-tier odds increasing each level.' },
      { kind: 'improved', text: 'Permanent FOES LEFT counter is now visible on every device.' },
      { kind: 'improved', text: 'Leaderboard columns clearly show player, wave, time and score; rank remains score-based.' },
      { kind: 'balance', text: 'Added hybrid, sustain, economy, cooldown and high-tier transformation powers.' },
    ],
  },
  {
    version: '3.1.0',
    date: '2026-05-12',
    title: 'Competitive Ascension',
    highlights: [
      'Live skill cooldown timers and clearer key prompts',
      'Legend unlock milestones raised for long-term competition',
      'Distinct weapon and ability sound identities',
    ],
    changes: [
      { kind: 'new', text: 'Skill slots now show the exact cooldown in seconds, decreasing in real time.' },
      { kind: 'improved', text: 'Q, E and SHIFT prompts are larger, high-contrast, and kept inside their skill frames.' },
      { kind: 'improved', text: 'Threat tier is now a permanent high-contrast badge with six tiers.' },
      { kind: 'improved', text: 'Every legend weapon has a distinct swing sound; Tidecaller and Riftblade have unique signature cues.' },
      { kind: 'balance', text: 'Unlock milestones are now waves 8, 15, 25, 40 and 60.' },
      { kind: 'new', text: 'Tutorial now explains VIT, PWR, SPD and CRIT.' },
    ],
  },
  {
    version: '3.0.0',
    date: '2026-05-04',
    title: 'The Legends Awaken',
    highlights: [
      'Every legend gains a third Legacy ability rooted in their saga',
      'Legend Codex with full backstories',
      'Procedural realm music, live world feed, tutorial & patch notes',
    ],
    changes: [
      { kind: 'new', text: 'Legacy abilities (Q / third sigil): Still Water, Oathwall, Blood Rite, Mirage Step, Pearl Tide, Heartbeat Stasis.' },
      { kind: 'new', text: 'Legend Codex — read each legend\u2019s saga and see how their abilities were born from it.' },
      { kind: 'new', text: 'Realm music that shifts with the zone you are fighting in and rises for world bosses.' },
      { kind: 'new', text: 'World feed now shows real achievements from real adventurers, live.' },
      { kind: 'new', text: 'Online adventurer count is now true realm presence.' },
      { kind: 'new', text: 'Interactive tutorial for new adventurers (replayable from the title screen).' },
      { kind: 'new', text: 'Patch notes screen with automatic "new update" badge.' },
      { kind: 'improved', text: 'Unified skill bar with cooldown sweeps on desktop; third combat sigil on touch.' },
      { kind: 'improved', text: 'Title screen redesigned around the chosen legend.' },
      { kind: 'improved', text: 'Score, coin and chain readouts made far more legible.' },
      { kind: 'balance', text: 'Pause is now a dedicated button on every device.' },
    ],
  },
  {
    version: '2.6.0',
    date: '2026-04-27',
    title: 'Realm Gate',
    highlights: ['Supabase accounts and shared leaderboards', 'Per-hero leaderboard split'],
    changes: [
      { kind: 'new', text: 'Username/password accounts with cloud-saved progress.' },
      { kind: 'new', text: 'Leaderboards split by hero with Adventurers and Top Runs tabs.' },
      { kind: 'improved', text: 'Runs are inscribed automatically the moment you fall.' },
      { kind: 'fixed', text: 'Match and hero records failing to save silently.' },
    ],
  },
  {
    version: '2.5.0',
    date: '2026-04-20',
    title: 'Locked Legends',
    highlights: ['Tidecaller & Riftblade', 'Character unlock progression'],
    changes: [
      { kind: 'new', text: 'Two new legends: Tidecaller (wave 12) and Riftblade (wave 18).' },
      { kind: 'new', text: 'Legends unlock by reaching waves 3 / 5 / 7 / 12 / 18.' },
      { kind: 'balance', text: 'Waves escalate more aggressively; boss reinforcements scale with wave.' },
      { kind: 'improved', text: 'Scenery for all five cultural zones; richer monster and hero silhouettes.' },
    ],
  },
  {
    version: '2.4.1',
    date: '2026-04-12',
    title: 'Traveling Market',
    highlights: ['Between-wave shop', 'Level-up power draft'],
    changes: [
      { kind: 'new', text: 'Traveling Market between waves — spend coins on tonics, steel and charms.' },
      { kind: 'new', text: 'Choose one of three powers on every level up.' },
    ],
  },
];

export const CURRENT_VERSION = PATCH_NOTES[0].version;

const SEEN_KEY = 'aetheria-seen-version';

export function lastSeenVersion(profileId?: string): string | null {
  try {
    return localStorage.getItem(profileId ? `${SEEN_KEY}-${profileId}` : SEEN_KEY);
  } catch {
    return null;
  }
}

export function markVersionSeen(profileId?: string, version = CURRENT_VERSION) {
  try {
    localStorage.setItem(profileId ? `${SEEN_KEY}-${profileId}` : SEEN_KEY, version);
  } catch {
    /* ignore */
  }
}

export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map((n) => parseInt(n, 10) || 0);
  const pb = b.split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}
```

## File: `src/game/highscores.ts`

```typescript
import { CLASSES } from './data';

export interface ScoreEntry {
  name: string;
  userId?: string;
  userName?: string;
  classId: string;
  score: number;
  wave: number;
  level: number;
  durationSeconds?: number;
  date: number;
}

export interface HeroBest {
  score: number;
  wave: number;
  runs: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  createdAt: number;
  lastSeen: number;
  preferredClass: string;
  bestScore: number;
  bestWave: number;
  totalKills: number;
  runs: number;
  passwordHash?: string;
  unlockedClasses?: string[];
  heroBests?: Record<string, HeroBest>;
  discoveredPowers?: string[];
  discoveredShopItems?: string[];
}

const KEY = 'aetheria-highscores-v2';
const LEGACY_KEY = 'aetheria-highscores-v1';
const PROFILES_KEY = 'aetheria-profiles-v1';
const ACTIVE_KEY = 'aetheria-active-profile-v1';
const MAX = 30;

export const USERNAME_PATTERN = /^[A-Za-z][A-Za-z0-9_]{2,15}$/;

export function usernameError(name: string): string | null {
  if (name.length < 3) return 'Username must be at least 3 characters.';
  if (name.length > 16) return 'Username must be 16 characters or fewer.';
  if (!/^[A-Za-z]/.test(name)) return 'Username must begin with a letter.';
  if (!USERNAME_PATTERN.test(name)) return 'Use letters, numbers, and underscores only.';
  return null;
}

export function passwordError(password: string, confirmation?: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (password.length > 32) return 'Password must be 32 characters or fewer.';
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password needs an uppercase letter, lowercase letter, and number.';
  }
  if (confirmation !== undefined && password !== confirmation) return 'Passwords do not match.';
  return null;
}

async function hashPassword(password: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  let hash = 2166136261;
  for (let i = 0; i < password.length; i++) hash = Math.imul(hash ^ password.charCodeAt(i), 16777619);
  return `fallback-${(hash >>> 0).toString(16)}`;
}

function unlockedAtWave(wave: number) {
  return CLASSES.filter((entry) => entry.unlockWave <= wave).map((entry) => entry.id);
}

export interface AuthResult {
  profile: PlayerProfile | null;
  error?: string;
  needsPassword?: boolean;
}

function safeParse<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function loadScores(): ScoreEntry[] {
  const saved = safeParse<ScoreEntry[]>(KEY) ?? safeParse<ScoreEntry[]>(LEGACY_KEY) ?? [];
  if (!Array.isArray(saved)) return [];
  return saved
    .filter((entry) => entry && typeof entry.score === 'number' && typeof entry.name === 'string')
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX);
}

function scoreKey(entry: ScoreEntry): string {
  const who = entry.userId ?? entry.userName?.toLowerCase() ?? entry.name.toLowerCase();
  return `${who}::${entry.classId}`;
}

export function saveScore(entry: ScoreEntry): ScoreEntry[] {
  const list = loadScores();
  // One entry per player per hero: only a better score replaces the old record.
  const key = scoreKey(entry);
  const idx = list.findIndex((e) => scoreKey(e) === key);
  if (idx >= 0) {
    if (entry.score <= list[idx].score) return list.slice(0, MAX);
    list[idx] = entry;
  } else {
    list.push(entry);
  }
  list.sort((a, b) => b.score - a.score);
  const top = list.slice(0, MAX);
  write(KEY, top);
  return top;
}

/** Collapse any score list to one row per player (their best score). */
export function dedupeByPlayer(scores: ScoreEntry[]): ScoreEntry[] {
  const best = new Map<string, ScoreEntry>();
  for (const s of scores) {
    const who = (s.userId ?? s.userName ?? s.name).toLowerCase();
    const prev = best.get(who);
    if (!prev || s.score > prev.score) best.set(who, s);
  }
  return [...best.values()].sort(
    (a, b) => b.score - a.score || (a.durationSeconds ?? Infinity) - (b.durationSeconds ?? Infinity)
  );
}

export function topScore(): number {
  const list = loadScores();
  return list.length ? list[0].score : 0;
}

export function loadProfiles(): PlayerProfile[] {
  const saved = safeParse<PlayerProfile[]>(PROFILES_KEY) ?? [];
  if (!Array.isArray(saved)) return [];
  return saved
    .filter((profile) => profile && typeof profile.id === 'string' && typeof profile.name === 'string')
    .map((profile) => ({
      ...profile,
      unlockedClasses: unlockedAtWave(profile.bestWave),
      heroBests: profile.heroBests ?? {},
      discoveredPowers: profile.discoveredPowers ?? [],
      discoveredShopItems: profile.discoveredShopItems ?? [],
    }))
    .sort((a, b) => b.lastSeen - a.lastSeen);
}

export function getActiveProfile(): PlayerProfile | null {
  const id = safeParse<string>(ACTIVE_KEY);
  if (!id) return null;
  return loadProfiles().find((profile) => profile.id === id) ?? null;
}

export async function createProfile(name: string, password: string, confirmation: string): Promise<AuthResult> {
  const clean = name.trim().replace(/\s+/g, ' ').slice(0, 16);
  const nameProblem = usernameError(clean);
  if (nameProblem) return { profile: null, error: nameProblem };
  const passwordProblem = passwordError(password, confirmation);
  if (passwordProblem) return { profile: null, error: passwordProblem };
  const existing = loadProfiles();
  const duplicate = existing.find((profile) => profile.name.toLowerCase() === clean.toLowerCase());
  if (duplicate) return { profile: null, error: 'That username is already registered in this realm.' };
  const now = Date.now();
  const profile: PlayerProfile = {
    id: `${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: clean,
    createdAt: now,
    lastSeen: now,
    preferredClass: 'kensei',
    bestScore: 0,
    bestWave: 0,
    totalKills: 0,
    runs: 0,
    passwordHash: await hashPassword(password),
    unlockedClasses: ['kensei'],
    heroBests: {},
    discoveredPowers: [],
    discoveredShopItems: [],
  };
  const next = [profile, ...existing];
  write(PROFILES_KEY, next);
  write(ACTIVE_KEY, profile.id);
  return { profile };
}

export async function authenticateProfile(id: string, password: string): Promise<AuthResult> {
  const profile = loadProfiles().find((entry) => entry.id === id);
  if (!profile) return { profile: null, error: 'Choose an adventurer first.' };
  if (!profile.passwordHash) return { profile: null, needsPassword: true, error: 'This legacy profile needs a new password.' };
  if (!password) return { profile: null, error: 'Enter your password.' };
  const valid = profile.passwordHash === (await hashPassword(password));
  if (!valid) return { profile: null, error: 'Incorrect password.' };
  const active = setActiveProfile(id);
  return { profile: active };
}

export async function authenticateByName(name: string, password: string): Promise<AuthResult> {
  const clean = name.trim();
  if (!clean) return { profile: null, error: 'Enter your username.' };
  if (!password) return { profile: null, error: 'Enter your password.' };
  const profile = loadProfiles().find((entry) => entry.name.toLowerCase() === clean.toLowerCase());
  if (!profile) return { profile: null, error: 'No adventurer found with that username.' };
  return authenticateProfile(profile.id, password);
}

export async function changeLocalPassword(
  id: string,
  currentPassword: string,
  password: string,
  confirmation: string
): Promise<AuthResult> {
  const profiles = loadProfiles();
  const profile = profiles.find((entry) => entry.id === id);
  if (!profile) return { profile: null, error: 'Profile not found.' };
  if (profile.passwordHash) {
    if (!currentPassword) return { profile: null, error: 'Enter your current password.' };
    const ok = profile.passwordHash === (await hashPassword(currentPassword));
    if (!ok) return { profile: null, error: 'Current password is incorrect.' };
  }
  const problem = passwordError(password, confirmation);
  if (problem) return { profile: null, error: problem };
  if (profile.passwordHash === (await hashPassword(password))) {
    return { profile: null, error: 'New password must differ from the old one.' };
  }
  return setProfilePassword(id, password, confirmation);
}

export async function setProfilePassword(id: string, password: string, confirmation: string): Promise<AuthResult> {
  const problem = passwordError(password, confirmation);
  if (problem) return { profile: null, error: problem };
  const profiles = loadProfiles();
  const profile = profiles.find((entry) => entry.id === id);
  if (!profile) return { profile: null, error: 'Profile not found.' };
  const passwordHash = await hashPassword(password);
  const next = profiles.map((entry) => entry.id === id ? { ...entry, passwordHash, lastSeen: Date.now() } : entry);
  write(PROFILES_KEY, next);
  write(ACTIVE_KEY, id);
  return { profile: next.find((entry) => entry.id === id) ?? null };
}

export function setActiveProfile(id: string): PlayerProfile | null {
  const profiles = loadProfiles();
  const found = profiles.find((profile) => profile.id === id);
  if (!found) return null;
  const now = Date.now();
  const next = profiles.map((profile) => (profile.id === id ? { ...profile, lastSeen: now } : profile));
  write(PROFILES_KEY, next);
  write(ACTIVE_KEY, id);
  return next.find((profile) => profile.id === id) ?? null;
}

export function updateProfileClass(id: string, preferredClass: string): PlayerProfile | null {
  const profiles = loadProfiles();
  const next = profiles.map((profile) =>
    profile.id === id ? { ...profile, preferredClass, lastSeen: Date.now() } : profile
  );
  const updated = next.find((profile) => profile.id === id) ?? null;
  if (updated) write(PROFILES_KEY, next);
  return updated;
}

export function updateProfileProgress(id: string, wave: number, preferredClass: string): PlayerProfile | null {
  const profiles = loadProfiles();
  const next = profiles.map((profile) => {
    if (profile.id !== id) return profile;
    const bestWave = Math.max(profile.bestWave, wave);
    return {
      ...profile,
      preferredClass,
      bestWave,
      lastSeen: Date.now(),
      unlockedClasses: unlockedAtWave(bestWave),
    };
  });
  const updated = next.find((profile) => profile.id === id) ?? null;
  if (updated) write(PROFILES_KEY, next);
  return updated;
}

export function recordProfileRun(
  profileId: string,
  entry: Omit<ScoreEntry, 'name' | 'userId' | 'userName'> & { kills: number }
): { scores: ScoreEntry[]; profiles: PlayerProfile[] } {
  const profiles = loadProfiles();
  const profile = profiles.find((item) => item.id === profileId);
  const scoreEntry: ScoreEntry = {
    ...entry,
    name: profile?.name ?? 'Wanderer',
    userId: profileId,
    userName: profile?.name ?? 'Wanderer',
  };
  const scores = saveScore(scoreEntry);
  const now = Date.now();
  const nextProfiles = profiles.map((item) => {
    if (item.id !== profileId) return item;
    const prev = item.heroBests?.[entry.classId];
    const heroBests = {
      ...(item.heroBests ?? {}),
      [entry.classId]: {
        score: Math.max(prev?.score ?? 0, entry.score),
        wave: Math.max(prev?.wave ?? 0, entry.wave),
        runs: (prev?.runs ?? 0) + 1,
      },
    };
    return {
      ...item,
      lastSeen: now,
      bestScore: Math.max(item.bestScore, entry.score),
      bestWave: Math.max(item.bestWave, entry.wave),
      totalKills: item.totalKills + entry.kills,
      runs: item.runs + 1,
      heroBests,
      unlockedClasses: unlockedAtWave(Math.max(item.bestWave, entry.wave)),
    };
  });
  write(PROFILES_KEY, nextProfiles);
  return { scores, profiles: nextProfiles };
}

export function profileLeaderboard(profiles = loadProfiles()): PlayerProfile[] {
  return profiles
    .filter((profile) => profile.runs > 0 || profile.bestScore > 0)
    .sort((a, b) => b.bestScore - a.bestScore || b.bestWave - a.bestWave || b.totalKills - a.totalKills)
    .slice(0, 10);
}
```

## File: `src/game/collection.ts`

```typescript
import type { PowerId, ShopItemId } from './data';

export interface DiscoveryState {
  powers: PowerId[];
  shopItems: ShopItemId[];
}

const KEY = 'aetheria-discovery-v1';

function all(): Record<string, DiscoveryState> {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, DiscoveryState>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function loadDiscovery(profileId: string): DiscoveryState {
  const state = all()[profileId];
  return {
    powers: Array.isArray(state?.powers) ? state.powers : [],
    shopItems: Array.isArray(state?.shopItems) ? state.shopItems : [],
  };
}

export function discoverPower(profileId: string, id: PowerId): DiscoveryState {
  const records = all();
  const state = loadDiscovery(profileId);
  if (!state.powers.includes(id)) state.powers.push(id);
  records[profileId] = state;
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent('aetheria-discovery', { detail: { profileId } }));
  } catch {
    /* storage unavailable */
  }
  return state;
}

export function discoverShopItem(profileId: string, id: ShopItemId): DiscoveryState {
  const records = all();
  const state = loadDiscovery(profileId);
  if (!state.shopItems.includes(id)) state.shopItems.push(id);
  records[profileId] = state;
  try {
    localStorage.setItem(KEY, JSON.stringify(records));
    window.dispatchEvent(new CustomEvent('aetheria-discovery', { detail: { profileId } }));
  } catch {
    /* storage unavailable */
  }
  return state;
}
```

## File: `src/game/engine.ts`

```typescript
import {
  CLASSES,
  ZONES,
  ENEMIES,
  waveComposition,
  ELITE_NAMES,
  STREAKS,
  POWERS,
  SHOP_ITEMS,
  type ClassDef,
  type EnemyKind,
  type PowerDef,
  type PowerId,
  type ShopItemDef,
  type ShopItemId,
  type Rarity,
  type ZoneDef,
} from './data';
import { SFX } from './audio';
import { Music } from './music';
import { legacyFor, type LegacyDef } from './lore';

export type GameState = 'menu' | 'playing' | 'paused' | 'levelup' | 'shop' | 'dying' | 'over';

export interface GameStats {
  score: number;
  wave: number;
  level: number;
  kills: number;
  gold: number;
  timeSec: number;
  classId: string;
  className: string;
  playerName: string;
  profileId: string;
  profileName: string;
  killer: string;
}

export interface FeedMsg {
  id: number;
  text: string;
  color: string;
}

export interface HudData {
  hp: number;
  maxHp: number;
  xp: number;
  xpNext: number;
  level: number;
  score: number;
  gold: number;
  kills: number;
  wave: number;
  zoneName: string;
  zoneCulture: string;
  zoneColor: string;
  threat: string;
  foesLeft: number;
  abilityCd: number;
  abilityCdMax: number;
  dashCd: number;
  dashCdMax: number;
  abilityName: string;
  legacyCd: number;
  legacyCdMax: number;
  legacyName: string;
  legacyActive: string;
  buffT: number;
  combo: number;
  bossHp: number;
  bossMax: number;
  bossName: string;
  hurt: number;
  lowHp: boolean;
  feed: FeedMsg[];
  announce: string;
  announceId: number;
  timeStr: string;
  muted: boolean;
  playerName: string;
  classId: string;
  className: string;
  classColor: string;
}

export interface HudBus {
  listeners: Set<(d: HudData) => void>;
}

export interface LevelUpData {
  level: number;
  choices: PowerDef[];
  rarityOdds: Record<Rarity, number>;
  rerollsLeft: number;
}

export interface ShopData {
  wave: number;
  gold: number;
  nextZoneName: string;
  nextZoneColor: string;
  items: { item: ShopItemDef; sold: boolean }[];
  rarityOdds: Record<Rarity, number>;
  rerollsLeft: number;
}

interface Player {
  x: number; y: number; vx: number; vy: number; r: number;
  hp: number; maxHp: number; speed: number; dmgMul: number;
  attackRate: number; abilityRate: number; dashRate: number; critBonus: number; rangeBonus: number;
  lifesteal: number; coinMult: number; pickupRange: number; armor: number;
  atkT: number; swingT: number; swingDur: number; swingAim: number; swingApplied: boolean;
  facing: number; aim: number;
  dashT: number; dashCd: number; dashX: number; dashY: number;
  iFrames: number; abilityCd: number; buffT: number;
  combo: number; comboT: number;
  xp: number; level: number; runT: number; hurtT: number;
  stormT: number; stormTick: number;
  legacyCd: number; focusT: number; sureCrits: number; wardT: number; wardTick: number;
  riteT: number; tideT: number; stasisT: number;
  tempestT: number; tempestTick: number; pyreT: number; pyreTick: number;
  slowT: number;
  dead: boolean;
}

interface Decoy { x: number; y: number; t: number; dur: number }

interface Enemy {
  kind: EnemyKind; x: number; y: number; vx: number; vy: number; r: number;
  hp: number; maxHp: number; speed: number; dmg: number;
  flash: number; frozen: number; slow: number; spawn: number;
  atkCd: number; seed: number; elite: boolean; name: string;
  shootT: number; phase: number; windT: number; lungeT: number;
  minionT: number; faceA: number; telegraphed: boolean; launched: boolean;
  variant: number; dashT: number;
  dead: boolean;
}

interface Shot {
  x: number; y: number; vx: number; vy: number; r: number;
  dmg: number; life: number; color: string; from: 'p' | 'e'; pierce: number;
}

interface Pickup {
  x: number; y: number; vx: number; vy: number;
  kind: 'coin' | 'potion' | 'rune'; val: number; t: number;
}

type PartKind = 'dot' | 'spark' | 'ring' | 'shard' | 'petal';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  t: number; dur: number; size: number; color: string;
  kind: PartKind; grav: number; drag: number; rot: number; vr: number;
}

interface Floater {
  x: number; y: number; t: number; dur: number;
  text: string; size: number; color: string; crit: boolean;
}

interface Slash {
  x: number; y: number; a0: number; a1: number; r: number;
  t: number; dur: number; color: string;
}

interface Ghost { x: number; y: number; a: number }

type SceneryKind =
  | 'bamboo' | 'sakura' | 'torii'
  | 'emberRock' | 'lavaCrack' | 'deadTree'
  | 'pine' | 'iceShard' | 'runestone'
  | 'palm' | 'ruin' | 'vine'
  | 'dune' | 'obelisk' | 'cactus';

interface SceneryProp {
  x: number;
  y: number;
  kind: SceneryKind;
  scale: number;
  seed: number;
}

const ARENA_W = 2400;
const ARENA_H = 1700;
const TAU = Math.PI * 2;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const rgbCache = new Map<string, [number, number, number]>();
function hexRgb(hex: string): [number, number, number] {
  let c = rgbCache.get(hex);
  if (!c) {
    const h = hex.replace('#', '');
    c = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    rgbCache.set(hex, c);
  }
  return c;
}
function mixHex(a: string, b: string, t: number): string {
  const ca = hexRgb(a);
  const cb = hexRgb(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r},${g},${bl})`;
}
function rgba(hex: string, a: number): string {
  const c = hexRgb(hex);
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}
function angDiff(a: number, b: number): number {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return Math.abs(d);
}
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export interface GameOpts {
  onState: (s: GameState, stats?: GameStats) => void;
  bus: HudBus;
}

export class Game {
  sfx = new SFX();
  music = new Music();
  state: GameState = 'menu';
  muted = false;
  private legacy: LegacyDef = legacyFor('kensei');
  private decoy: Decoy | null = null;
  private stasisHits: { e: Enemy; dmg: number }[] = [];

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private opts: GameOpts;
  private raf = 0;
  private last = 0;
  private running = true;
  private viewW = 800;
  private viewH = 600;
  private dpr = 1;
  private zoom = 1;
  private ro: ResizeObserver | null = null;

  private cam = { x: ARENA_W / 2, y: ARENA_H / 2, shake: 0 };
  private time = 0;
  private hitstop = 0;
  private slowmoT = 0;
  private dieT = 0;
  private menuT = 0;

  private p: Player | null = null;
  private classDef: ClassDef = CLASSES[0];
  private playerName = 'Hero';
  private profileId = 'local-hero';
  private profileName = 'Wanderer';
  private enemies: Enemy[] = [];
  private shots: Shot[] = [];
  private pickups: Pickup[] = [];
  private parts: Particle[] = [];
  private floaters: Floater[] = [];
  private slashes: Slash[] = [];
  private ghosts: Ghost[] = [];
  private menuParts: Particle[] = [];

  private wave = 0;
  private queue: EnemyKind[] = [];
  private spawnT = 0;
  private waveBreak = 0;
  private score = 0;
  private gold = 0;
  private kills = 0;
  private elapsed = 0;
  private zone: ZoneDef = ZONES[0];
  private killer = 'the Hollow Husks';
  private pendingLevels = 0;
  private levelChoices: PowerDef[] = [];
  private shopItems: ShopItemDef[] = [];
  private shopSold = new Set<ShopItemId>();
  private rerollsLeft = 3;

  private feed: FeedMsg[] = [];
  private feedId = 0;
  private announce = '';
  private announceId = 0;
  private announceT = 0;
  private hurtFlash = 0;

  private keys = new Set<string>();
  private attackHeld = false;
  private touchMove = false;
  private tmx = 0;
  private tmy = 0;
  private dashQueued = false;
  private abilityQueued = false;
  private legacyQueued = false;

  private specks: { x: number; y: number; a: number }[] = [];
  private blobs: { x: number; y: number; r: number }[] = [];
  private glowCache = new Map<string, HTMLCanvasElement>();
  private glyphs: { a: number; segs: number[] }[] = [];
  private scenery: SceneryProp[][] = [];

  constructor(canvas: HTMLCanvasElement, opts: GameOpts) {
    this.canvas = canvas;
    this.opts = opts;
    this.ctx = canvas.getContext('2d')!;
    for (let i = 0; i < 300; i++) {
      this.specks.push({ x: rand(0, ARENA_W), y: rand(0, ARENA_H), a: rand(0.02, 0.08) });
    }
    for (let i = 0; i < 16; i++) {
      this.blobs.push({ x: rand(100, ARENA_W - 100), y: rand(100, ARENA_H - 100), r: rand(140, 340) });
    }
    for (let i = 0; i < 8; i++) {
      this.glyphs.push({ a: (i / 8) * TAU, segs: [rand(0.3, 1), rand(0.3, 1), rand(0.3, 1)] });
    }
    this.scenery = ZONES.map((_, zoneIndex) => this.makeScenery(zoneIndex));
    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    if (canvas.parentElement) this.ro.observe(canvas.parentElement);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    document.addEventListener('visibilitychange', this.onVis);
    canvas.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    canvas.addEventListener('contextmenu', this.onCtx);
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  destroy() {
    this.running = false;
    this.music.destroy();
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    document.removeEventListener('visibilitychange', this.onVis);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('contextmenu', this.onCtx);
  }

  /* ------------------------------ input ------------------------------ */

  private onKeyDown = (e: KeyboardEvent) => {
    const code = e.code;
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) e.preventDefault();
    this.keys.add(code);
    this.sfx.ensure();
    if (e.repeat) return;
    if (code === 'Space' || code === 'KeyJ') this.attackHeld = true;
    if (code === 'ShiftLeft' || code === 'ShiftRight' || code === 'KeyK') this.dashQueued = true;
    if (code === 'KeyE') this.abilityQueued = true;
    if (code === 'KeyQ' || code === 'KeyL') this.legacyQueued = true;
    if (code === 'KeyM') this.toggleMuted();
    this.music.ensure();
    if ((code === 'Escape' || code === 'KeyP') && (this.state === 'playing' || this.state === 'paused')) {
      this.togglePause();
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
    if (e.code === 'Space' || e.code === 'KeyJ') this.attackHeld = false;
  };

  private onBlur = () => {
    if (this.state === 'playing') this.setPaused(true);
  };
  private onVis = () => {
    if (document.hidden && this.state === 'playing') this.setPaused(true);
  };
  private onMouseDown = (e: MouseEvent) => {
    this.sfx.ensure();
    this.music.ensure();
    if (this.state === 'menu') this.music.setScene('menu');
    if (e.button === 0 && this.state === 'playing') this.attackHeld = true;
  };
  private onMouseUp = () => {
    this.attackHeld = false;
  };
  private onCtx = (e: Event) => {
    e.preventDefault();
    if (this.state === 'playing') this.abilityQueued = true;
  };

  setMove(x: number, y: number) {
    this.touchMove = true;
    this.tmx = x;
    this.tmy = y;
  }
  clearMove() {
    this.touchMove = false;
    this.tmx = 0;
    this.tmy = 0;
  }
  touchAttack(v: boolean) {
    this.attackHeld = v;
  }
  touchDash() {
    this.dashQueued = true;
  }
  touchAbility() {
    this.abilityQueued = true;
  }
  touchLegacy() {
    this.legacyQueued = true;
  }

  /** Inject a live world event (real player achievement) into the in-game feed. */
  pushWorldEvent(text: string, color = '#7d8aa0') {
    if (this.state === 'menu') return;
    this.pushFeed(text, color);
  }

  setMusicEnabled(v: boolean) {
    this.music.ensure();
    this.music.setEnabled(v);
  }
  isMusicEnabled() {
    return this.music.isEnabled();
  }
  setVolumes(music: number, sfx: number) {
    this.music.setVolume(music);
    this.sfx.setVolume(sfx);
  }

  /* --------------------------- public control ------------------------ */

  start(classId: string, name: string, profileId = 'local-hero', profileName = 'Wanderer') {
    const cls = CLASSES.find((c) => c.id === classId) ?? CLASSES[0];
    this.classDef = cls;
    this.playerName = name.trim() || 'Wanderer';
    this.profileId = profileId;
    this.profileName = profileName;
    this.p = {
      x: ARENA_W / 2, y: ARENA_H / 2, vx: 0, vy: 0, r: 16,
      hp: cls.hp, maxHp: cls.hp, speed: cls.speed, dmgMul: 1,
      attackRate: 1, abilityRate: 1, dashRate: 1, critBonus: 0, rangeBonus: 0,
      lifesteal: 0, coinMult: 1, pickupRange: 120, armor: 0,
      atkT: 0, swingT: -1, swingDur: 0.16, swingAim: 0, swingApplied: true,
      facing: 0, aim: 0,
      dashT: 0, dashCd: 0, dashX: 1, dashY: 0,
      iFrames: 0, abilityCd: 0, buffT: 0,
      combo: 0, comboT: 0,
      xp: 0, level: 1, runT: 0, hurtT: 0,
      stormT: 0, stormTick: 0,
      legacyCd: 0, focusT: 0, sureCrits: 0, wardT: 0, wardTick: 0,
      riteT: 0, tideT: 0, stasisT: 0,
      tempestT: 0, tempestTick: 0, pyreT: 0, pyreTick: 0,
      slowT: 0,
      dead: false,
    };
    this.legacy = legacyFor(cls.id);
    this.decoy = null;
    this.stasisHits = [];
    this.legacyQueued = false;
    this.music.ensure();
    this.music.setScene('zone', 0, false);
    this.enemies = [];
    this.shots = [];
    this.pickups = [];
    this.parts = [];
    this.floaters = [];
    this.slashes = [];
    this.ghosts = [];
    this.wave = 0;
    this.queue = [];
    this.spawnT = 0;
    this.waveBreak = 1.6;
    this.score = 0;
    this.gold = 0;
    this.kills = 0;
    this.elapsed = 0;
    this.feed = [];
    this.killer = 'the Hollow Husks';
    this.pendingLevels = 0;
    this.levelChoices = [];
    this.shopItems = [];
    this.shopSold.clear();
    this.rerollsLeft = 3;
    this.hurtFlash = 0;
    this.hitstop = 0;
    this.slowmoT = 0;
    this.dieT = 0;
    this.announce = '';
    this.cam.x = ARENA_W / 2;
    this.cam.y = ARENA_H / 2;
    this.cam.shake = 0;
    this.state = 'playing';
    this.pushFeed(`Welcome to Aetheria, ${this.playerName}. The five realms are watching.`, '#e2b45c');
    this.pushFeed('Hold attack to chain slashes. Dash grants brief immunity.', '#8a94a8');
    this.opts.onState('playing');
  }

  restart() {
    this.start(this.classDef.id, this.playerName, this.profileId, this.profileName);
  }

  setPaused(v: boolean) {
    if (this.state !== 'playing' && this.state !== 'paused') return;
    this.state = v ? 'paused' : 'playing';
    this.music.duck(v);
    this.opts.onState(this.state);
  }
  togglePause() {
    this.setPaused(this.state === 'playing');
  }
  toMenu() {
    this.state = 'menu';
    this.music.duck(false);
    this.music.setScene('menu');
    this.enemies = [];
    this.shots = [];
    this.pickups = [];
    this.floaters = [];
    this.slashes = [];
    this.p = null;
    this.opts.onState('menu');
  }
  toggleMuted(): boolean {
    this.muted = !this.muted;
    this.sfx.ensure();
    this.sfx.setMuted(this.muted);
    return this.muted;
  }

  getStats(): GameStats {
    const p = this.p;
    return {
      score: this.score,
      wave: this.wave,
      level: p?.level ?? 1,
      kills: this.kills,
      gold: this.gold,
      timeSec: Math.floor(this.elapsed),
      classId: this.classDef.id,
      className: this.classDef.name,
      playerName: this.playerName,
      profileId: this.profileId,
      profileName: this.profileName,
      killer: this.killer,
    };
  }

  getLevelUpData(): LevelUpData | null {
    const p = this.p;
    if (!p || this.state !== 'levelup') return null;
    return { level: p.level, choices: this.levelChoices.slice(), rarityOdds: this.rarityOdds(p.level), rerollsLeft: this.rerollsLeft };
  }

  rerollPowers(): boolean {
    const p = this.p;
    if (!p || this.state !== 'levelup' || this.rerollsLeft <= 0) return false;
    this.rerollsLeft--;
    this.levelChoices = this.rollPowers(p.level);
    this.sfx.play('reroll');
    this.pushFeed(`Fates rewoven. ${this.rerollsLeft} reroll${this.rerollsLeft === 1 ? '' : 's'} left — boss kills restore them.`, '#d7adff');
    this.opts.onState('levelup');
    return true;
  }

  rerollShop(): boolean {
    if (this.state !== 'shop' || this.rerollsLeft <= 0) return false;
    this.rerollsLeft--;
    const soldIds = new Set(this.shopSold);
    const keepSold = this.shopItems.filter((item) => soldIds.has(item.id));
    const fresh = this.rollShopOffers(this.wave, soldIds, 4 - keepSold.length);
    this.shopItems = [...keepSold, ...fresh];
    this.sfx.play('reroll');
    this.pushFeed(`Merchant restocks. ${this.rerollsLeft} reroll${this.rerollsLeft === 1 ? '' : 's'} left — boss kills restore them.`, '#d7adff');
    this.opts.onState('shop');
    return true;
  }

  choosePower(id: PowerId): boolean {
    const p = this.p;
    const power = this.levelChoices.find((choice) => choice.id === id);
    if (!p || this.state !== 'levelup' || !power) return false;
    this.applyPower(power.id);
    this.pendingLevels--;
    this.sfx.play('rune');
    this.shake(6);
    this.floater(p.x, p.y - 48, power.name.toUpperCase(), 19, power.color, true);
    this.burst(p.x, p.y, power.color, 18, 260, 'spark');
    this.part(p.x, p.y, 0, 0, 0.65, 32, power.color, 'ring');
    this.pushFeed(`${power.name} attuned. ${power.desc}`, power.color);
    if (this.pendingLevels > 0) {
      this.levelChoices = this.rollPowers(p.level);
      this.opts.onState('levelup');
    } else {
      this.levelChoices = [];
      this.state = 'playing';
      this.opts.onState('playing');
    }
    return true;
  }

  getShopData(): ShopData | null {
    if (this.state !== 'shop') return null;
    const nextZone = ZONES[this.wave % ZONES.length];
    return {
      wave: this.wave,
      gold: this.gold,
      nextZoneName: nextZone.name,
      nextZoneColor: nextZone.color,
      items: this.shopItems.map((item) => ({ item, sold: this.shopSold.has(item.id) })),
      rarityOdds: this.shopRarityOdds(this.wave),
      rerollsLeft: this.rerollsLeft,
    };
  }

  buyShopItem(id: ShopItemId): boolean {
    const p = this.p;
    const item = this.shopItems.find((entry) => entry.id === id);
    if (!p || this.state !== 'shop' || !item || this.shopSold.has(id) || this.gold < item.cost) return false;
    this.gold -= item.cost;
    this.shopSold.add(id);
    switch (id) {
      case 'rations':
        p.hp = Math.min(p.maxHp, p.hp + 48);
        this.sfx.play('potion');
        break;
      case 'tonic':
        p.buffT = Math.max(p.buffT, 18);
        this.sfx.play('rune');
        break;
      case 'steel':
        p.dmgMul *= 1.14;
        this.sfx.play('hit');
        break;
      case 'boots':
        p.speed *= 1.1;
        this.sfx.play('dash');
        break;
      case 'ward':
        p.maxHp += 18;
        p.hp = Math.min(p.maxHp, p.hp + 18);
        this.sfx.play('potion');
        break;
      case 'sigil':
        p.abilityCd = 0;
        this.sfx.play('rune');
        break;
      case 'whetstone':
        p.critBonus = Math.min(0.7, p.critBonus + 0.07);
        p.dmgMul *= 1.08;
        this.sfx.play('crit');
        break;
      case 'hourglass':
        p.abilityRate *= 0.86;
        this.sfx.play('stillwater');
        break;
      case 'magnet':
        p.coinMult += 0.5;
        p.pickupRange += 60;
        this.sfx.play('coin');
        break;
      case 'elixir':
        p.maxHp += 20;
        p.hp = p.maxHp;
        this.sfx.play('potion');
        break;
      case 'prism':
        p.abilityCd = 0;
        p.legacyCd = 0;
        this.sfx.play('rune');
        break;
      case 'war_banner':
        p.dmgMul *= 1.18;
        p.speed *= 1.1;
        p.maxHp += 15;
        p.hp = Math.min(p.maxHp, p.hp + 15);
        this.sfx.play('levelup');
        break;
    }
    this.shake(3);
    this.floater(p.x, p.y - 34, `${item.name.toUpperCase()}!`, 17, item.color, true);
    this.burst(p.x, p.y, item.color, 12, 190, 'spark');
    this.pushFeed(`Market purchase: ${item.name} (-${item.cost} gold)`, item.color);
    this.opts.onState('shop');
    return true;
  }

  continueFromShop() {
    if (this.state !== 'shop') return;
    this.state = 'playing';
    this.startWave(this.wave + 1);
    this.opts.onState('playing');
  }

  private rarityOdds(level: number): Record<Rarity, number> {
    const raw: Record<Rarity, number> = {
      common: Math.max(0.2, 0.72 - Math.max(0, level - 1) * 0.035),
      rare: Math.min(0.4, 0.24 + Math.max(0, level - 1) * 0.009),
      epic: Math.min(0.32, 0.04 + Math.max(0, level - 1) * 0.018),
      legendary: Math.min(0.22, Math.max(0, level - 4) * 0.014),
    };
    const total = raw.common + raw.rare + raw.epic + raw.legendary;
    return {
      common: raw.common / total,
      rare: raw.rare / total,
      epic: raw.epic / total,
      legendary: raw.legendary / total,
    };
  }

  private rollRarity(level: number): Rarity {
    const odds = this.rarityOdds(level);
    let roll = Math.random();
    for (const rarity of ['legendary', 'epic', 'rare', 'common'] as Rarity[]) {
      if (roll < odds[rarity]) return rarity;
      roll -= odds[rarity];
    }
    return 'common';
  }

  private rollPowers(level: number): PowerDef[] {
    const chosen: PowerDef[] = [];
    while (chosen.length < 3) {
      const rarity = this.rollRarity(level);
      let pool = POWERS.filter((power) => power.rarity === rarity && !chosen.some((c) => c.id === power.id));
      if (!pool.length) pool = POWERS.filter((power) => !chosen.some((c) => c.id === power.id));
      chosen.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return chosen;
  }

  private openLevelUp() {
    const p = this.p;
    if (!p) return;
    this.levelChoices = this.rollPowers(p.level);
    this.state = 'levelup';
    this.music.duck(true);
    this.announceSet(`LEVEL ${p.level} · CHOOSE YOUR PATH`);
    this.opts.onState('levelup');
  }

  private applyPower(id: PowerId) {
    const p = this.p!;
    switch (id) {
      case 'keen_edge':
        p.dmgMul *= 1.22;
        break;
      case 'ironhide':
        p.maxHp += 25;
        p.hp = Math.min(p.maxHp, p.hp + 25);
        break;
      case 'windstep':
        p.speed *= 1.14;
        break;
      case 'precision':
        p.critBonus = Math.min(0.7, p.critBonus + 0.12);
        break;
      case 'longreach':
        p.rangeBonus += 18;
        break;
      case 'siphon':
        p.lifesteal += 2;
        break;
      case 'quicksilver':
        p.attackRate *= 0.82;
        break;
      case 'sunward':
        p.abilityRate *= 0.82;
        break;
      case 'gilded_hand':
        p.coinMult += 0.5;
        p.pickupRange += 26;
        break;
      case 'wardplate':
        p.armor = Math.min(0.65, p.armor + 0.12);
        break;
      case 'battle_tempo':
        p.dmgMul *= 1.1;
        p.attackRate *= 0.9;
        break;
      case 'titan_blood': {
        const gained = Math.ceil(p.maxHp * 0.18);
        p.maxHp += gained;
        p.hp = Math.min(p.maxHp, p.hp + gained);
        break;
      }
      case 'veteran_reach':
        p.rangeBonus += 26;
        p.dmgMul *= 1.12;
        break;
      case 'blood_harvest':
        p.lifesteal += 4;
        p.dmgMul *= 1.1;
        break;
      case 'astral_echo':
        p.abilityRate *= 0.72;
        p.abilityCd = 0;
        p.legacyCd = 0;
        break;
      case 'predator_instinct':
        p.critBonus = Math.min(0.7, p.critBonus + 0.1);
        p.speed *= 1.12;
        p.dmgMul *= 1.1;
        break;
      case 'colossus_soul':
        p.maxHp += 45;
        p.hp = Math.min(p.maxHp, p.hp + 45);
        p.armor = Math.min(0.65, p.armor + 0.1);
        break;
      case 'death_dealer':
        p.dmgMul *= 1.32;
        p.critBonus = Math.min(0.7, p.critBonus + 0.08);
        break;
      case 'chronomancer':
        p.abilityRate *= 0.62;
        p.dashRate *= 0.78;
        break;
      case 'royal_treasury':
        p.coinMult += 1;
        p.pickupRange += 70;
        p.dmgMul *= 1.16;
        break;
      case 'aetherborn_form':
        p.dmgMul *= 1.42;
        p.speed *= 1.16;
        p.critBonus = Math.min(0.7, p.critBonus + 0.12);
        p.maxHp += 25;
        p.hp = Math.min(p.maxHp, p.hp + 25);
        break;
      case 'undying_legend':
        p.maxHp += 35;
        p.hp = Math.min(p.maxHp, p.hp + 35);
        p.lifesteal += 6;
        p.armor = Math.min(0.65, p.armor + 0.15);
        break;
    }
  }

  /** Wave-scaled shop odds. Epic unlocks at wave 5, Legendary at wave 10. */
  private shopRarityOdds(wave: number): Record<Rarity, number> {
    const w = Math.max(1, wave);
    const raw: Record<Rarity, number> = {
      common: Math.max(0.3, 0.68 - w * 0.02),
      rare: Math.min(0.34, 0.27 + w * 0.004),
      epic: w < 5 ? 0 : Math.min(0.24, 0.1 + (w - 5) * 0.014),
      legendary: w < 10 ? 0 : Math.min(0.14, 0.04 + (w - 10) * 0.01),
    };
    const total = raw.common + raw.rare + raw.epic + raw.legendary;
    return {
      common: raw.common / total,
      rare: raw.rare / total,
      epic: raw.epic / total,
      legendary: raw.legendary / total,
    };
  }

  private rollShopRarity(wave: number): Rarity {
    const odds = this.shopRarityOdds(wave);
    let roll = Math.random();
    for (const rarity of ['legendary', 'epic', 'rare', 'common'] as Rarity[]) {
      if (roll < odds[rarity]) return rarity;
      roll -= odds[rarity];
    }
    return 'common';
  }

  /** Roll `count` distinct shop offers by rarity weight, skipping `exclude`. */
  private rollShopOffers(wave: number, exclude: Set<ShopItemId>, count: number): ShopItemDef[] {
    const chosen: ShopItemDef[] = [];
    let guard = 0;
    while (chosen.length < count && guard++ < 40) {
      const rarity = this.rollShopRarity(wave);
      let pool = SHOP_ITEMS.filter(
        (item) => item.rarity === rarity && !exclude.has(item.id) && !chosen.some((c) => c.id === item.id)
      );
      if (!pool.length) {
        pool = SHOP_ITEMS.filter((item) => !exclude.has(item.id) && !chosen.some((c) => c.id === item.id));
      }
      if (!pool.length) break;
      chosen.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return chosen;
  }

  private openShop() {
    // Rations are always stocked; the other 3 slots roll by wave-scaled rarity.
    const rations = SHOP_ITEMS.find((item) => item.id === 'rations')!;
    this.shopItems = [rations, ...this.rollShopOffers(this.wave, new Set([rations.id]), 3)];
    this.shopSold.clear();
    this.state = 'shop';
    this.music.duck(true);
    this.announceSet('TRAVELING MARKET · THE NEXT WAVE WAITS');
    this.pushFeed('A traveling merchant has opened camp between the realms.', '#ffd97a');
    this.opts.onState('shop');
  }

  /* ------------------------------ helpers ---------------------------- */

  private pushFeed(text: string, color: string) {
    this.feed.push({ id: ++this.feedId, text, color });
    if (this.feed.length > 5) this.feed.shift();
  }

  private announceSet(text: string) {
    this.announce = text;
    this.announceId++;
    this.announceT = 2.4;
  }

  private shake(v: number) {
    this.cam.shake = Math.min(22, this.cam.shake + v);
  }

  private glow(color: string): HTMLCanvasElement {
    let g = this.glowCache.get(color);
    if (!g) {
      g = document.createElement('canvas');
      g.width = 128;
      g.height = 128;
      const gc = g.getContext('2d')!;
      const grad = gc.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, rgba(color, 0.9));
      grad.addColorStop(0.35, rgba(color, 0.35));
      grad.addColorStop(1, rgba(color, 0));
      gc.fillStyle = grad;
      gc.fillRect(0, 0, 128, 128);
      this.glowCache.set(color, g);
    }
    return g;
  }

  private drawGlow(c: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
    c.globalAlpha = alpha;
    c.drawImage(this.glow(color), x - r, y - r, r * 2, r * 2);
    c.globalAlpha = 1;
  }

  private part(
    x: number, y: number, vx: number, vy: number, dur: number, size: number,
    color: string, kind: PartKind, grav = 0, drag = 1
  ) {
    if (this.parts.length > 420) return;
    this.parts.push({
      x, y, vx, vy, t: 0, dur, size, color, kind, grav, drag,
      rot: rand(0, TAU), vr: rand(-6, 6),
    });
  }

  private burst(x: number, y: number, color: string, n: number, speed: number, kind: PartKind = 'dot') {
    for (let i = 0; i < n; i++) {
      const a = rand(0, TAU);
      const s = rand(speed * 0.3, speed);
      this.part(x, y, Math.cos(a) * s, Math.sin(a) * s, rand(0.3, 0.7), rand(2, 5), color, kind, kind === 'shard' ? 300 : 0, 0.9);
    }
  }

  private floater(x: number, y: number, text: string, size: number, color: string, crit = false) {
    if (this.floaters.length > 60) this.floaters.shift();
    this.floaters.push({ x: x + rand(-8, 8), y, t: 0, dur: crit ? 1.0 : 0.8, text, size, color, crit });
  }

  private xpNeed(level: number) {
    return Math.round(45 * Math.pow(level, 1.35));
  }

  private critChance() {
    const p = this.p!;
    return Math.min(0.85, this.classDef.crit + p.critBonus);
  }

  private difficulty() {
    const progress = Math.max(0, this.wave - 1);
    return {
      hp: 1 + progress * 0.24 + Math.pow(progress, 1.36) * 0.038,
      dmg: 1 + progress * 0.1 + Math.pow(progress, 1.26) * 0.022,
      speed: 1 + Math.min(0.52, progress * 0.028),
      elites: Math.min(0.38, 0.075 + progress * 0.02),
      activeCap: Math.min(34, 13 + Math.floor(this.wave * 1.3)),
      spawnGap: Math.max(0.16, 1.12 - this.wave * 0.06),
    };
  }

  /* ------------------------------- waves ----------------------------- */

  private startWave(n: number) {
    this.wave = n;
    this.zone = ZONES[(n - 1) % ZONES.length];
    const comp = waveComposition(n);
    const q: EnemyKind[] = [];
    for (const g of comp) for (let i = 0; i < g.count; i++) q.push(g.kind);
    // interleave-ish shuffle
    for (let i = q.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [q[i], q[j]] = [q[j], q[i]];
    }
    // bosses lead their wave
    const bi = q.indexOf('boss');
    if (bi > 0) {
      q.splice(bi, 1);
      q.unshift('boss');
    }
    this.queue = q;
    this.spawnT = 1.4;
    this.sfx.play('wave');
    this.music.duck(false);
    this.music.setScene('zone', (n - 1) % ZONES.length, n % 5 === 0);
    if (n % 5 === 0) {
      this.announceSet(`WAVE ${n} · ${this.zone.boss.toUpperCase()}`);
      this.pushFeed(`⚠ World boss approaching: ${this.zone.boss}`, '#ff8a8a');
      this.sfx.play('boss');
      this.shake(7);
    } else {
      this.announceSet(`WAVE ${n} · ${this.zone.name.toUpperCase()}`);
      this.pushFeed(`Quest: cleanse ${this.zone.name} (${this.zone.culture}) — wave ${n}`, '#8a94a8');
    }
    if (n > 1) {
      const threat = n < 4 ? 'Threat rising' : n < 8 ? 'Dangerous incursion' : 'Relentless assault';
      this.pushFeed(`${threat}: denser ranks, stronger foes, and faster spawns.`, '#ffb36b');
    }
  }

  private spawnEnemy(kind: EnemyKind) {
    const def = ENEMIES[kind];
    const p = this.p!;
    const a = rand(0, TAU);
    const dist = rand(460, 640);
    const difficulty = this.difficulty();
    const hpMul = difficulty.hp;
    const dmgMul = difficulty.dmg;
    const elite = kind !== 'boss' && Math.random() < difficulty.elites;
    const zoneIdx = this.wave > 0 ? (this.wave - 1) % ZONES.length : 0;
    const e: Enemy = {
      kind,
      x: clamp(p.x + Math.cos(a) * dist, 50, ARENA_W - 50),
      y: clamp(p.y + Math.sin(a) * dist, 50, ARENA_H - 50),
      vx: 0, vy: 0,
      r: def.r,
      hp: def.hp * hpMul * (elite ? 2.2 : 1),
      maxHp: def.hp * hpMul * (elite ? 2.2 : 1),
      speed: def.speed * difficulty.speed * (elite ? 1.18 : 1),
      dmg: def.dmg * dmgMul * (elite ? 1.4 : 1),
      flash: 0, frozen: 0, slow: 0, spawn: kind === 'boss' ? 0.8 : 0.45,
      atkCd: rand(0.3, 0.9), seed: rand(0, TAU),
      elite,
      name: kind === 'boss' ? this.zone.boss : elite ? ELITE_NAMES[Math.floor(rand(0, ELITE_NAMES.length))] : def.name,
      shootT: rand(1.0, 2.0), phase: rand(0, 5), windT: 0, lungeT: 0,
      minionT: 6, faceA: 0, telegraphed: false, launched: false,
      variant: zoneIdx, dashT: 0,
      dead: false,
    };
    if (kind === 'boss') {
      e.hp = (def.hp + this.wave * 135) * (1 + Math.max(0, this.wave - 5) * 0.09);
      e.maxHp = e.hp;
      e.dmg = def.dmg * dmgMul * (1 + Math.max(0, this.wave - 5) * 0.02);
    }
    if (kind === 'dragon') {
      this.sfx.play('dragonroar');
    }
    this.enemies.push(e);
    const spawnCol = kind === 'boss' ? this.zone.bossColor : def.color;
    this.burst(e.x, e.y, spawnCol, kind === 'boss' ? 26 : 10, kind === 'boss' ? 320 : 160, 'spark');
    this.part(e.x, e.y, 0, 0, 0.5, e.r, spawnCol, 'ring');
    if (kind === 'boss') {
      this.shake(8);
    }
  }

  /* ----------------------------- combat ------------------------------ */

  private aimAssist(): number {
    const p = this.p!;
    let best: Enemy | null = null;
    let bd = 340 * 340;
    for (const e of this.enemies) {
      if (e.spawn > 0) continue;
      const dx = e.x - p.x;
      const dy = e.y - p.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < bd) {
        bd = d2;
        best = e;
      }
    }
    if (best) return Math.atan2(best.y - p.y, best.x - p.x);
    return p.facing;
  }

  private startSwing() {
    const p = this.p!;
    const cls = this.classDef;
    p.atkT = cls.atkCd * p.attackRate * (p.buffT > 0 ? 0.85 : 1);
    p.swingT = 0;
    p.swingDur = 0.16;
    p.swingAim = p.aim;
    p.swingApplied = false;
    p.facing = p.aim;
    this.slashes.push({
      x: p.x, y: p.y,
      a0: p.aim - cls.arc * 0.62, a1: p.aim + cls.arc * 0.62,
      r: (cls.range + p.rangeBonus) * 0.88, t: 0, dur: 0.18, color: cls.color,
    });
    this.sfx.playWeapon(cls.id);
  }

  private applySwing() {
    const p = this.p!;
    const cls = this.classDef;
    let hitAny = false;
    for (const e of this.enemies) {
      if (e.dead || e.spawn > 0) continue;
      const dx = e.x - p.x;
      const dy = e.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d > cls.range + p.rangeBonus + e.r) continue;
      if (angDiff(Math.atan2(dy, dx), p.swingAim) > cls.arc / 2 + 0.18) continue;
      let crit = Math.random() < this.critChance();
      if (p.sureCrits > 0) {
        crit = true;
        p.sureCrits--;
      }
      let dmg = cls.dmg * p.dmgMul * (p.buffT > 0 ? 1.5 : 1) * (p.riteT > 0 ? 1.45 : 1) * rand(0.92, 1.08);
      if (crit) dmg *= 2;
      const heavy = e.kind === 'brute' || e.kind === 'boss' || e.kind === 'golem' || e.kind === 'demon' || e.kind === 'dragon' ? 0.3 : 1;
      this.damageEnemy(e, dmg, dx / (d || 1), dy / (d || 1), crit, (crit ? 420 : 240) * heavy);
      hitAny = true;
    }
    if (hitAny) this.hitstop = Math.max(this.hitstop, 0.025);
  }

  private damageEnemy(e: Enemy, dmg: number, nx: number, ny: number, crit: boolean, knock: number) {
    if (e.dead || e.spawn > 0) return;
    if (this.p && this.p.stasisT > 0) this.stasisHits.push({ e, dmg });
    e.hp -= dmg;
    e.flash = 1;
    e.vx += nx * knock;
    e.vy += ny * knock;
    const def = ENEMIES[e.kind];
    this.burst(e.x, e.y, def.color, crit ? 14 : 7, crit ? 300 : 200, crit ? 'spark' : 'dot');
    this.floater(e.x, e.y - e.r - 6, `${Math.round(dmg)}`, crit ? 22 : 14, crit ? '#ffd97a' : '#f5efdd', crit);
    if (crit) {
      this.sfx.play('crit');
      this.shake(5);
      this.hitstop = Math.max(this.hitstop, 0.055);
    } else {
      this.sfx.play('hit');
      this.shake(2.2);
      this.hitstop = Math.max(this.hitstop, 0.03);
    }
    if (e.hp <= 0) this.killEnemy(e, dmg);
  }

  private killEnemy(e: Enemy, _lastHit: number) {
    e.dead = true;
    const p = this.p!;
    const def = ENEMIES[e.kind];
    this.kills++;
    p.combo++;
    p.comboT = 2.6;
    for (const [n, label] of STREAKS) {
      if (p.combo === n) {
        this.floater(p.x, p.y - 70, label, 26, '#ffd97a', true);
        this.sfx.play('streak');
        this.pushFeed(`${label} — ${p.combo}-kill chain`, '#e2b45c');
      }
    }
    const mult = 1 + Math.min(p.combo, 25) * 0.08;
    const gained = Math.round(def.score * mult * (e.elite ? 3 : 1));
    this.score += gained;
    this.floater(e.x, e.y - e.r - 24, `+${gained}`, 13, '#e2b45c');
    const steal = p.lifesteal + (p.riteT > 0 ? 4 : 0);
    if (steal > 0 && p.hp < p.maxHp) {
      const healed = Math.min(steal, Math.ceil(p.maxHp - p.hp));
      p.hp += healed;
      if (this.kills % 3 === 0 || p.riteT > 0) this.floater(p.x, p.y - 28, `+${healed}`, 12, p.riteT > 0 ? '#ffd24a' : '#9defa4');
    }
    this.gainXp(def.xp * (e.elite ? 2 : 1));
    this.burst(e.x, e.y, def.color, e.kind === 'boss' ? 46 : 16, e.kind === 'boss' ? 460 : 280, 'dot');
    this.burst(e.x, e.y, '#ffffff', 6, 240, 'spark');
    this.part(e.x, e.y, 0, 0, 0.45, e.r * 1.4, def.color, 'ring');
    this.sfx.play('kill');
    this.shake(e.kind === 'boss' ? 14 : 3.5);
    if (e.elite) this.pushFeed(`You slew ${e.name} (+${gained} score)`, '#ffd97a');
    // drops
    const coinChance = e.kind === 'boss' ? 1 : 0.65;
    if (Math.random() < coinChance) {
      const nCoins = e.kind === 'boss' ? 8 : e.elite ? 3 : 1;
      for (let i = 0; i < nCoins; i++) {
        this.pickups.push({
          x: e.x + rand(-14, 14), y: e.y + rand(-14, 14),
          vx: rand(-90, 90), vy: rand(-90, 90),
          kind: 'coin', val: e.kind === 'boss' ? 5 : rand(1, 3) | 0, t: rand(0, TAU),
        });
      }
    }
    if (e.kind !== 'boss' && Math.random() < 0.08 && p.hp < p.maxHp * 0.75) {
      this.pickups.push({ x: e.x, y: e.y, vx: 0, vy: 0, kind: 'potion', val: 30, t: 0 });
    }
    if (Math.random() < (e.kind === 'boss' ? 1 : 0.05)) {
      this.pickups.push({ x: e.x, y: e.y, vx: 0, vy: 0, kind: 'rune', val: 0, t: 0 });
    }
    if (e.kind === 'boss') {
      this.slowmoT = 0.55;
      this.rerollsLeft = 3;
      this.pushFeed(`${this.zone.boss} has fallen! The realm breathes easier.`, '#46c8a8');
      this.pushFeed('The fates smile: rerolls restored to 3.', '#d7adff');
      this.floater(p.x, p.y - 70, 'REROLLS RESTORED', 16, '#d7adff', true);
    }
  }

  private gainXp(amount: number) {
    const p = this.p!;
    p.xp += amount;
    while (p.xp >= this.xpNeed(p.level)) {
      p.xp -= this.xpNeed(p.level);
      p.level++;
      p.maxHp += 10;
      p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.22);
      this.pendingLevels++;
      this.sfx.play('levelup');
      this.shake(6);
      this.floater(p.x, p.y - 46, `LEVEL UP!  Lv ${p.level}`, 22, '#ffd97a', true);
      this.part(p.x, p.y, 0, 0, 0.6, 30, '#ffd97a', 'ring');
      this.part(p.x, p.y, 0, 0, 0.8, 50, '#ffffff', 'ring');
      this.burst(p.x, p.y, '#ffd97a', 22, 260, 'spark');
      this.pushFeed(`You reached Lv ${p.level}! Choose a new power.`, '#46c8a8');
    }
    if (this.pendingLevels > 0 && this.state === 'playing') this.openLevelUp();
  }

  private damagePlayer(dmg: number, src: Enemy) {
    const p = this.p!;
    if (p.dead || p.iFrames > 0) return;
    dmg *= 1 - p.armor;
    if (p.wardT > 0) {
      dmg *= 0.3;
      // Oathwall: strike back and hurl the attacker away
      if (src && typeof src.hp === 'number' && !src.dead) {
        const dx = src.x - p.x;
        const dy = src.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        this.damageEnemy(src, this.classDef.dmg * p.dmgMul * 0.9, dx / d, dy / d, false, 520);
        this.burst(p.x + (dx / d) * 20, p.y + (dy / d) * 20, '#bfe6ff', 8, 220, 'shard');
      }
    }
    p.hp -= dmg;
    p.hurtT = 0.35;
    this.hurtFlash = 1;
    p.iFrames = 0.55;
    p.combo = 0;
    const dx = p.x - src.x;
    const dy = p.y - src.y;
    const d = Math.hypot(dx, dy) || 1;
    p.vx += (dx / d) * 380;
    p.vy += (dy / d) * 380;
    this.floater(p.x, p.y - 30, `-${Math.round(dmg)}`, 18, '#ff6b6b');
    this.burst(p.x, p.y, '#ff6b6b', 10, 260);
    this.sfx.play('hurt');
    this.shake(9);
    this.hitstop = Math.max(this.hitstop, 0.05);
    if (p.hp <= 0) {
      p.hp = 0;
      p.dead = true;
      this.killer = src.elite || src.kind === 'boss' ? src.name : ENEMIES[src.kind].name;
      this.state = 'dying';
      this.dieT = 1.15;
      this.music.duck(true);
      this.sfx.play('death');
      this.shake(16);
      this.burst(p.x, p.y, this.classDef.color, 40, 420, 'dot');
      this.burst(p.x, p.y, '#ffffff', 16, 380, 'spark');
      this.part(p.x, p.y, 0, 0, 0.9, 40, this.classDef.color, 'ring');
      this.opts.onState('dying');
    }
  }

  private tryDash() {
    const p = this.p!;
    if (p.dashCd > 0 || p.dashT > 0 || p.dead) return;
    let mx = 0;
    let my = 0;
    const mv = this.moveVec();
    mx = mv[0];
    my = mv[1];
    if (mx === 0 && my === 0) {
      mx = Math.cos(p.facing);
      my = Math.sin(p.facing);
    }
    const d = Math.hypot(mx, my) || 1;
    p.dashX = mx / d;
    p.dashY = my / d;
    p.dashT = 0.22;
    p.dashCd = 1.6 * p.dashRate;
    p.iFrames = Math.max(p.iFrames, 0.3);
    this.sfx.play('dash');
    this.shake(2);
    this.burst(p.x, p.y, this.classDef.color2, 8, 180, 'spark');
  }

  private tryAbility() {
    const p = this.p!;
    const cls = this.classDef;
    if (p.abilityCd > 0 || p.dead) return;
    p.abilityCd = cls.abilityCd * p.abilityRate;
    const dmgBase = cls.dmg * p.dmgMul * (p.buffT > 0 ? 1.5 : 1);
    switch (cls.abilityKind) {
      case 'petals': {
        this.sfx.play('petals');
        this.shake(6);
        this.part(p.x, p.y, 0, 0, 0.5, 40, cls.color, 'ring');
        for (let i = 0; i < 26; i++) {
          const a = rand(0, TAU);
          this.part(p.x, p.y, Math.cos(a) * rand(120, 320), Math.sin(a) * rand(120, 320), rand(0.5, 0.9), rand(3, 6), '#ffb7c9', 'petal', 60, 0.94);
        }
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const d = Math.hypot(e.x - p.x, e.y - p.y);
          if (d < 155 + e.r) {
            const crit = Math.random() < this.critChance();
            this.damageEnemy(e, dmgBase * 1.6 * (crit ? 2 : 1), (e.x - p.x) / (d || 1), (e.y - p.y) / (d || 1), crit, 360);
          }
        }
        break;
      }
      case 'nova': {
        this.sfx.play('nova');
        this.shake(9);
        this.part(p.x, p.y, 0, 0, 0.6, 60, '#bfe6ff', 'ring');
        this.part(p.x, p.y, 0, 0, 0.8, 90, '#6fb7ff', 'ring');
        this.burst(p.x, p.y, '#bfe6ff', 30, 380, 'shard');
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const d = Math.hypot(e.x - p.x, e.y - p.y);
          if (d < 195 + e.r) {
            e.frozen = 2.2;
            const crit = Math.random() < this.critChance();
            this.damageEnemy(e, dmgBase * 1.4 * (crit ? 2 : 1), (e.x - p.x) / (d || 1), (e.y - p.y) / (d || 1), crit, 260);
          }
        }
        break;
      }
      case 'bolts': {
        this.sfx.play('bolts');
        this.shake(4);
        for (let i = 0; i < 10; i++) {
          const a = p.facing + (i / 10) * TAU;
          this.shots.push({
            x: p.x + Math.cos(a) * 24, y: p.y + Math.sin(a) * 24,
            vx: Math.cos(a) * 360, vy: Math.sin(a) * 360,
            r: 7, dmg: dmgBase * 0.9, life: 1.5, color: '#ffd24a', from: 'p', pierce: 2,
          });
        }
        this.burst(p.x, p.y, '#ffd24a', 16, 300, 'spark');
        break;
      }
      case 'storm': {
        p.stormT = 4;
        p.stormTick = 0;
        this.sfx.play('storm');
        this.shake(4);
        this.floater(p.x, p.y - 46, cls.abilityName.toUpperCase(), 18, '#e6c26a', true);
        break;
      }
      case 'tide': {
        this.sfx.play('tide');
        this.shake(7);
        this.part(p.x, p.y, 0, 0, 0.7, 64, '#55d9e8', 'ring');
        this.part(p.x, p.y, 0, 0, 0.95, 100, '#d7a6ff', 'ring');
        this.burst(p.x, p.y, '#55d9e8', 28, 310, 'dot');
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const dx = p.x - e.x;
          const dy = p.y - e.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 230 + e.r) {
            e.slow = 1.6;
            e.vx += (dx / d) * 320;
            e.vy += (dy / d) * 320;
            this.damageEnemy(e, dmgBase * 1.55, -dx / d, -dy / d, Math.random() < this.critChance(), 170);
          }
        }
        break;
      }
      case 'tempest': {
        this.sfx.play('tempest');
        this.shake(9);
        // chain lightning: strike nearest foes in sequence
        const targets = this.enemies
          .filter((e) => !e.dead && e.spawn <= 0)
          .sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y))
          .slice(0, 7);
        let lx = p.x;
        let ly = p.y;
        targets.forEach((e, i) => {
          const dmg = dmgBase * (1.9 - i * 0.15);
          const dx = e.x - lx;
          const dy = e.y - ly;
          const d = Math.hypot(dx, dy) || 1;
          // lightning bolt visual
          for (let s = 0; s <= 6; s++) {
            const t = s / 6;
            const jx = rand(-14, 14);
            const jy = rand(-14, 14);
            this.part(lx + dx * t + jx, ly + dy * t + jy, 0, 0, 0.25, 3, '#bff6ff', 'spark');
          }
          this.burst(e.x, e.y, '#6ef3ff', 10, 260, 'spark');
          e.slow = Math.max(e.slow, 1.0);
          this.damageEnemy(e, dmg, dx / d, dy / d, Math.random() < this.critChance(), 200);
          lx = e.x;
          ly = e.y;
        });
        this.part(p.x, p.y, 0, 0, 0.6, 50, '#6ef3ff', 'ring');
        break;
      }
      case 'pyre': {
        this.sfx.play('pyre');
        this.shake(12);
        this.part(p.x, p.y, 0, 0, 0.8, 80, '#ff5a3c', 'ring');
        this.part(p.x, p.y, 0, 0, 1.0, 120, '#ffc46b', 'ring');
        this.burst(p.x, p.y, '#ff5a3c', 36, 420, 'dot');
        this.burst(p.x, p.y, '#ffc46b', 20, 340, 'spark');
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const dx = e.x - p.x;
          const dy = e.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 260 + e.r) {
            e.slow = Math.max(e.slow, 2.0);
            this.damageEnemy(e, dmgBase * 2.2, dx / d, dy / d, Math.random() < this.critChance(), 480);
          }
        }
        break;
      }
      case 'rift': {
        this.sfx.play('rift');
        this.shake(8);
        const ox = p.x;
        const oy = p.y;
        const target = this.enemies
          .filter((e) => !e.dead && e.spawn <= 0)
          .sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y))[0];
        const blinkA = target ? Math.atan2(target.y - p.y, target.x - p.x) : p.facing;
        p.x = clamp(p.x + Math.cos(blinkA) * 190, 35, ARENA_W - 35);
        p.y = clamp(p.y + Math.sin(blinkA) * 190, 35, ARENA_H - 35);
        p.iFrames = 0.55;
        this.part(ox, oy, 0, 0, 0.65, 28, '#b68cff', 'ring');
        this.part(p.x, p.y, 0, 0, 0.65, 34, '#e8d8ff', 'ring');
        this.burst(ox, oy, '#b68cff', 18, 280, 'shard');
        this.burst(p.x, p.y, '#e8d8ff', 18, 280, 'spark');
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const dOld = Math.hypot(e.x - ox, e.y - oy);
          const dNew = Math.hypot(e.x - p.x, e.y - p.y);
          if (dOld < 72 + e.r || dNew < 72 + e.r) {
            const dx = e.x - p.x;
            const dy = e.y - p.y;
            const d = Math.hypot(dx, dy) || 1;
            this.damageEnemy(e, dmgBase * 1.8, dx / d, dy / d, Math.random() < this.critChance(), 260);
          }
        }
        break;
      }
    }
  }

  /* --------------------------- legacy abilities ---------------------------- */

  private tryLegacy() {
    const p = this.p!;
    const cls = this.classDef;
    if (p.legacyCd > 0 || p.dead) return;
    const L = this.legacy;
    p.legacyCd = L.cd * p.abilityRate;
    const dmgBase = cls.dmg * p.dmgMul * (p.buffT > 0 ? 1.5 : 1);
    this.floater(p.x, p.y - 52, L.name.toUpperCase(), 19, cls.color2, true);
    switch (L.kind) {
      case 'stillwater': {
        p.focusT = 3.5;
        p.sureCrits = 4;
        this.sfx.play('stillwater');
        this.slowmoT = Math.max(this.slowmoT, 0.25);
        this.part(p.x, p.y, 0, 0, 0.9, 60, '#ffffff', 'ring');
        for (let i = 0; i < 20; i++) {
          const a = rand(0, TAU);
          this.part(p.x + Math.cos(a) * 30, p.y + Math.sin(a) * 30, Math.cos(a) * 40, Math.sin(a) * 40 - 60, rand(0.8, 1.4), rand(2, 4), '#dff4ff', 'dot', 40, 0.98);
        }
        this.pushFeed('Still Water: the world slows around your blade.', cls.color);
        break;
      }
      case 'oathwall': {
        p.wardT = 4.5;
        p.wardTick = 0;
        this.sfx.play('oathwall');
        this.shake(5);
        this.part(p.x, p.y, 0, 0, 0.7, 34, '#bfe6ff', 'ring');
        this.burst(p.x, p.y, '#dbeeff', 14, 200, 'shard');
        this.pushFeed('Oathwall raised: the wall does not break.', cls.color);
        break;
      }
      case 'bloodrite': {
        const cost = Math.max(1, Math.floor(p.hp * 0.15));
        if (p.hp - cost < 1) {
          p.legacyCd = 0.8;
          this.floater(p.x, p.y - 30, 'TOO WEAK TO BLEED', 13, '#ff8a8a');
          return;
        }
        p.hp -= cost;
        p.riteT = 6;
        this.sfx.play('bloodrite');
        this.shake(6);
        this.floater(p.x, p.y - 30, `-${cost}`, 15, '#ff6b6b');
        this.burst(p.x, p.y, '#ff4d4d', 18, 240, 'dot');
        this.part(p.x, p.y, 0, 0, 0.8, 40, '#ffd24a', 'ring');
        this.pushFeed('Blood Rite: the sun repays blood with radiance.', cls.color);
        break;
      }
      case 'mirage': {
        this.decoy = { x: p.x, y: p.y, t: 0, dur: 4 };
        this.sfx.play('mirage');
        this.burst(p.x, p.y, '#e6c26a', 22, 160, 'dot');
        p.iFrames = Math.max(p.iFrames, 0.4);
        this.pushFeed('Mirage Step: they hunt footprints you never left.', cls.color);
        break;
      }
      case 'pearltide': {
        p.tideT = 3;
        this.sfx.play('pearltide');
        this.shake(5);
        this.part(p.x, p.y, 0, 0, 0.8, 70, '#55d9e8', 'ring');
        this.part(p.x, p.y, 0, 0, 1.0, 110, '#d7a6ff', 'ring');
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const dx = e.x - p.x;
          const dy = e.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 240 + e.r) {
            e.slow = 2;
            e.vx += (dx / d) * 520;
            e.vy += (dy / d) * 520;
            this.damageEnemy(e, dmgBase * 0.6, dx / d, dy / d, false, 80);
          }
        }
        this.pushFeed('Pearl Tide: the sea takes back your wounds.', cls.color);
        break;
      }
      case 'stasis': {
        p.stasisT = 2;
        this.stasisHits = [];
        this.sfx.play('stasis');
        this.slowmoT = 0;
        this.part(p.x, p.y, 0, 0, 1.2, 80, '#b68cff', 'ring');
        this.burst(p.x, p.y, '#e8d8ff', 24, 300, 'shard');
        this.pushFeed('Heartbeat Stasis: the world pauses politely.', cls.color);
        break;
      }
      case 'stormcall': {
        p.tempestT = 6;
        p.tempestTick = 0;
        this.sfx.play('stormcall');
        this.shake(6);
        this.part(p.x, p.y, 0, 0, 0.9, 60, '#6ef3ff', 'ring');
        this.burst(p.x, p.y, '#fff6a8', 22, 300, 'spark');
        this.pushFeed('Stormcall: you ARE the storm now.', cls.color);
        break;
      }
      case 'pyreheart': {
        p.pyreT = 6;
        p.pyreTick = 0;
        this.sfx.play('pyreheart');
        this.shake(8);
        this.part(p.x, p.y, 0, 0, 0.9, 70, '#ff5a3c', 'ring');
        this.burst(p.x, p.y, '#ffc46b', 24, 320, 'dot');
        this.pushFeed('Pyreheart ignited: burn them, mend yourself.', cls.color);
        break;
      }
    }
  }

  private endStasis() {
    const p = this.p!;
    p.stasisT = 0;
    this.sfx.play('stasisEnd');
    this.shake(10);
    this.hitstop = Math.max(this.hitstop, 0.06);
    const merged = new Map<Enemy, number>();
    for (const h of this.stasisHits) merged.set(h.e, (merged.get(h.e) ?? 0) + h.dmg);
    this.stasisHits = [];
    for (const [e, dmg] of merged) {
      if (e.dead) continue;
      const dx = e.x - p.x;
      const dy = e.y - p.y;
      const d = Math.hypot(dx, dy) || 1;
      this.part(e.x, e.y, 0, 0, 0.5, e.r * 1.3, '#b68cff', 'ring');
      this.damageEnemy(e, dmg, dx / d, dy / d, false, 200);
    }
  }

  private legacyActiveLabel(): string {
    const p = this.p;
    if (!p) return '';
    if (p.focusT > 0) return `STILL WATER ${p.focusT.toFixed(1)}s · ${p.sureCrits} SURE CRITS`;
    if (p.wardT > 0) return `OATHWALL ${p.wardT.toFixed(1)}s`;
    if (p.riteT > 0) return `BLOOD RITE ${p.riteT.toFixed(1)}s`;
    if (this.decoy) return `MIRAGE ${(this.decoy.dur - this.decoy.t).toFixed(1)}s`;
    if (p.tideT > 0) return `PEARL TIDE ${p.tideT.toFixed(1)}s`;
    if (p.stasisT > 0) return `STASIS ${p.stasisT.toFixed(1)}s`;
    if (p.tempestT > 0) return `STORMCALL ${p.tempestT.toFixed(1)}s`;
    if (p.pyreT > 0) return `PYREHEART ${p.pyreT.toFixed(1)}s`;
    return '';
  }

  private moveVec(): [number, number] {
    let x = 0;
    let y = 0;
    const k = this.keys;
    if (k.has('KeyA') || k.has('ArrowLeft')) x -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) x += 1;
    if (k.has('KeyW') || k.has('ArrowUp')) y -= 1;
    if (k.has('KeyS') || k.has('ArrowDown')) y += 1;
    if (this.touchMove && (this.tmx !== 0 || this.tmy !== 0)) {
      x = this.tmx;
      y = this.tmy;
    }
    const d = Math.hypot(x, y);
    if (d > 1) {
      x /= d;
      y /= d;
    }
    return [x, y];
  }

  /* ------------------------------ update ----------------------------- */

  private frame = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);
    const raw = clamp((now - this.last) / 1000 || 0.016, 0.001, 0.033);
    this.last = now;

    let ts = 1;
    if (this.hitstop > 0) {
      this.hitstop -= raw;
      ts = 0.08;
    } else if (this.state === 'dying') {
      ts = 0.3;
      this.dieT -= raw;
      if (this.dieT <= 0) {
        this.state = 'over';
        this.opts.onState('over', this.getStats());
      }
    } else if (this.slowmoT > 0) {
      this.slowmoT -= raw;
      ts = 0.35;
    }
    const dt = raw * ts;
    this.time += dt;
    this.cam.shake = Math.max(0, this.cam.shake - this.cam.shake * 7 * raw - 2 * raw);

    if (this.state === 'menu') {
      this.menuT += raw;
      this.updateMenuParts(raw);
      this.updateFx(dt);
      this.render();
      return;
    }

    if (this.state === 'playing') {
      this.update(dt, raw);
    } else if (this.state === 'dying' || this.state === 'over') {
      this.updateWorld(dt, false);
    }
    this.updateFx(dt);
    this.render();
    this.pushHud();
  };

  private update(dt: number, raw: number) {
    const p = this.p!;
    this.elapsed += dt;

    // timers
    p.atkT -= dt;
    p.dashCd -= dt;
    p.abilityCd -= dt;
    p.iFrames -= dt;
    p.buffT -= dt;
    p.hurtT -= dt;
    p.slowT -= dt;
    p.comboT -= dt;
    if (p.comboT <= 0) p.combo = 0;

    // legacy timers
    p.legacyCd -= dt;
    if (p.focusT > 0) {
      p.focusT -= dt;
      if (p.focusT <= 0) p.sureCrits = 0;
      if (Math.random() < 0.25) {
        const a = rand(0, TAU);
        this.part(p.x + Math.cos(a) * rand(20, 60), p.y + Math.sin(a) * rand(20, 60), 0, -30, 0.8, rand(1.5, 3), '#dff4ff', 'dot', -20, 0.99);
      }
    }
    if (p.wardT > 0) {
      p.wardT -= dt;
      p.wardTick -= dt;
      if (p.wardTick <= 0) {
        p.wardTick = 1;
        if (p.hp < p.maxHp) {
          p.hp = Math.min(p.maxHp, p.hp + 3);
          this.floater(p.x, p.y - 30, '+3', 12, '#bfe6ff');
        }
      }
    }
    if (p.riteT > 0) {
      p.riteT -= dt;
      if (Math.random() < 0.35) this.part(p.x + rand(-10, 10), p.y + rand(-4, 10), rand(-20, 20), rand(-90, -40), 0.6, rand(2, 3.5), Math.random() < 0.5 ? '#ff4d4d' : '#ffd24a', 'dot', 0, 0.97);
    }
    if (p.tideT > 0) {
      p.tideT -= dt;
      const heal = (p.maxHp * 0.24 / 3) * dt;
      p.hp = Math.min(p.maxHp, p.hp + heal);
      if (Math.random() < 0.3) {
        const a = rand(0, TAU);
        this.part(p.x + Math.cos(a) * 24, p.y + Math.sin(a) * 24, Math.cos(a) * 30, Math.sin(a) * 30 - 50, 0.7, rand(2, 3), '#55d9e8', 'dot', 20, 0.98);
      }
    }
    if (p.stasisT > 0) {
      p.stasisT -= dt;
      if (p.stasisT <= 0) this.endStasis();
    }
    if (p.tempestT > 0) {
      p.tempestT -= dt;
      p.tempestTick -= dt;
      if (Math.random() < 0.5) {
        const a = rand(0, TAU);
        this.part(p.x + Math.cos(a) * rand(20, 50), p.y + Math.sin(a) * rand(20, 50), 0, -60, 0.4, rand(2, 3), '#bff6ff', 'spark', 0, 0.98);
      }
      if (p.tempestTick <= 0) {
        p.tempestTick = 0.4;
        const cls = this.classDef;
        const dmgBase = cls.dmg * p.dmgMul * (p.buffT > 0 ? 1.5 : 1);
        const foes = this.enemies.filter((e) => !e.dead && e.spawn <= 0 && Math.hypot(e.x - p.x, e.y - p.y) < 420);
        if (foes.length) {
          const e = foes[Math.floor(Math.random() * foes.length)];
          for (let s = 0; s <= 5; s++) {
            const t = s / 5;
            this.part(p.x + (e.x - p.x) * t + rand(-12, 12), p.y + (e.y - p.y) * t + rand(-12, 12), 0, 0, 0.22, 3, '#bff6ff', 'spark');
          }
          this.burst(e.x, e.y, '#6ef3ff', 8, 240, 'spark');
          this.sfx.play('tempest');
          const dx = e.x - p.x;
          const dy = e.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          this.damageEnemy(e, dmgBase * 1.5, dx / d, dy / d, Math.random() < this.critChance(), 150);
        }
      }
    }
    if (p.pyreT > 0) {
      p.pyreT -= dt;
      p.pyreTick -= dt;
      p.hp = Math.min(p.maxHp, p.hp + (p.maxHp * 0.03) * dt * 2);
      if (Math.random() < 0.5) {
        const a = rand(0, TAU);
        this.part(p.x + Math.cos(a) * rand(10, 30), p.y + Math.sin(a) * rand(10, 30), rand(-20, 20), rand(-80, -40), 0.6, rand(2, 4), Math.random() < 0.5 ? '#ff5a3c' : '#ffc46b', 'dot', 0, 0.97);
      }
      if (p.pyreTick <= 0) {
        p.pyreTick = 0.55;
        const cls = this.classDef;
        const dmgBase = cls.dmg * p.dmgMul * (p.buffT > 0 ? 1.5 : 1);
        this.part(p.x, p.y, 0, 0, 0.5, 60, '#ff5a3c', 'ring');
        this.sfx.play('pyre');
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const dx = e.x - p.x;
          const dy = e.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 170 + e.r) {
            this.damageEnemy(e, dmgBase * 0.9, dx / d, dy / d, false, 220);
          }
        }
      }
    }
    if (this.decoy) {
      this.decoy.t += dt;
      if (Math.random() < 0.4) {
        const a = rand(0, TAU);
        this.part(this.decoy.x + Math.cos(a) * 18, this.decoy.y + Math.sin(a) * 18, Math.cos(a) * 25, Math.sin(a) * 25 - 20, 0.6, rand(1.5, 3), '#e6c26a', 'dot', 30, 0.97);
      }
      if (this.decoy.t >= this.decoy.dur) {
        const d0 = this.decoy;
        this.decoy = null;
        this.sfx.play('storm');
        this.shake(7);
        this.part(d0.x, d0.y, 0, 0, 0.6, 50, '#e6c26a', 'ring');
        this.burst(d0.x, d0.y, '#e6c26a', 30, 340, 'dot');
        const dmgBase = this.classDef.dmg * p.dmgMul * (p.buffT > 0 ? 1.5 : 1);
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const dx = e.x - d0.x;
          const dy = e.y - d0.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < 150 + e.r) {
            e.slow = 1.2;
            this.damageEnemy(e, dmgBase * 2.0, dx / d, dy / d, Math.random() < this.critChance(), 320);
          }
        }
      }
    }
    if (this.legacyQueued) {
      this.legacyQueued = false;
      this.tryLegacy();
    }

    // movement
    const mv = this.moveVec();
    const speedMul = (p.riteT > 0 ? 1.25 : 1) * (p.tempestT > 0 ? 1.3 : 1) * (p.slowT > 0 ? 0.6 : 1);
    if (p.dashT > 0) {
      p.dashT -= dt;
      p.vx = p.dashX * 760;
      p.vy = p.dashY * 760;
      this.ghosts.push({ x: p.x, y: p.y, a: 0.5 });
      if (this.ghosts.length > 14) this.ghosts.shift();
    } else {
      const k = 1 - Math.pow(0.0001, dt);
      p.vx += (mv[0] * p.speed * speedMul - p.vx) * k;
      p.vy += (mv[1] * p.speed * speedMul - p.vy) * k;
    }
    p.x = clamp(p.x + p.vx * dt, 26, ARENA_W - 26);
    p.y = clamp(p.y + p.vy * dt, 26, ARENA_H - 26);
    if (mv[0] !== 0 || mv[1] !== 0) {
      p.facing = Math.atan2(mv[1], mv[0]);
      p.runT += dt * (Math.hypot(p.vx, p.vy) / p.speed);
    }
    p.aim = this.aimAssist();

    // actions
    if (this.dashQueued) {
      this.dashQueued = false;
      this.tryDash();
    }
    if (this.abilityQueued) {
      this.abilityQueued = false;
      this.tryAbility();
    }
    if ((this.attackHeld) && p.atkT <= 0 && p.dashT <= 0) {
      this.startSwing();
    }

    // swing progression
    if (p.swingT >= 0) {
      p.swingT += dt;
      const prog = p.swingT / p.swingDur;
      if (prog >= 0.35 && !p.swingApplied) {
        p.swingApplied = true;
        this.applySwing();
      }
      if (prog >= 1) p.swingT = -1;
    }

    // sandseer storm
    if (p.stormT > 0) {
      p.stormT -= dt;
      p.stormTick -= dt;
      const cls = this.classDef;
      if (Math.random() < 0.5) {
        const a = rand(0, TAU);
        this.part(p.x + Math.cos(a) * rand(40, 165), p.y + Math.sin(a) * rand(40, 165), Math.cos(a + 1.6) * 120, Math.sin(a + 1.6) * 120, 0.4, rand(2, 4), '#e6c26a', 'dot', 0, 0.96);
      }
      if (p.stormTick <= 0) {
        p.stormTick = 0.28;
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const d = Math.hypot(e.x - p.x, e.y - p.y);
          if (d < 168 + e.r) {
            e.slow = 0.6;
            this.damageEnemy(e, cls.dmg * p.dmgMul * 0.55, (e.x - p.x) / (d || 1), (e.y - p.y) / (d || 1), false, 60);
          }
        }
      }
    }

    this.updateWorld(dt, true);
    if (this.state !== 'playing') return;

    // camera
    const tx = p.x + Math.cos(p.aim) * 50;
    const ty = p.y + Math.sin(p.aim) * 50;
    this.cam.x += (tx - this.cam.x) * Math.min(1, dt * 5);
    this.cam.y += (ty - this.cam.y) * Math.min(1, dt * 5);
    const halfW = this.viewW / 2 / this.zoom;
    const halfH = this.viewH / 2 / this.zoom;
    this.cam.x = halfW * 2 >= ARENA_W ? ARENA_W / 2 : clamp(this.cam.x, halfW, ARENA_W - halfW);
    this.cam.y = halfH * 2 >= ARENA_H ? ARENA_H / 2 : clamp(this.cam.y, halfH, ARENA_H - halfH);

    // wave flow
    if (this.waveBreak > 0) {
      this.waveBreak -= dt;
      if (this.waveBreak <= 0) this.startWave(this.wave + 1);
    } else if (this.queue.length && this.enemies.length < this.difficulty().activeCap) {
      this.spawnT -= dt;
      if (this.spawnT <= 0) {
        this.spawnT = this.difficulty().spawnGap;
        this.spawnEnemy(this.queue.pop()!);
      }
    } else if (!this.queue.length && this.enemies.length === 0) {
      const bonus = 120 + this.wave * 60;
      this.score += bonus;
      this.sfx.play('wave');
      this.pushFeed(`Wave ${this.wave} cleared! +${bonus} score`, '#46c8a8');
      this.announceSet(`WAVE ${this.wave} CLEARED · +${bonus}`);
      this.openShop();
      return;
    }

    this.announceT -= dt;
    this.hurtFlash = Math.max(0, this.hurtFlash - raw * 2.4);
  }

  private updateWorld(dt: number, interact: boolean) {
    const p = this.p;
    // enemies
    for (const e of this.enemies) {
      if (e.spawn > 0) {
        e.spawn -= dt;
        continue;
      }
      e.flash = Math.max(0, e.flash - dt * 5);
      if (!p || p.dead) {
        e.vx *= 1 - Math.min(1, dt * 2);
        e.vy *= 1 - Math.min(1, dt * 2);
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        continue;
      }
      // Heartbeat Stasis: the world is frozen, only the player moves
      if (p.stasisT > 0) continue;
      // Mirage Step: everyone hunts the decoy instead of the player
      const target = this.decoy ?? p;
      const dx = target.x - e.x;
      const dy = target.y - e.y;
      const d = Math.hypot(dx, dy) || 1;
      const ux = dx / d;
      const uy = dy / d;
      e.faceA = Math.atan2(dy, dx);
      let mx = 0;
      let my = 0;
      const focusSlow = p.focusT > 0 ? 0.32 : 1;
      const spd = e.speed * (e.frozen > 0 ? 0 : e.slow > 0 ? 0.55 : 1) * focusSlow;
      if (e.frozen > 0) e.frozen -= dt;
      if (e.slow > 0) e.slow -= dt;
      e.atkCd -= dt;
      switch (e.kind) {
        case 'husk':
          mx = ux; my = uy;
          break;
        case 'skitter': {
          const w = Math.sin(this.time * 6 + e.seed) * 0.85;
          mx = ux - uy * w;
          my = uy + ux * w;
          break;
        }
        case 'hexer': {
          const dir = d > 300 ? 1 : d < 210 ? -1 : 0;
          const strafe = Math.sin(this.time * 1.1 + e.seed) > 0 ? 1 : -1;
          mx = ux * dir - uy * strafe * 0.7;
          my = uy * dir + ux * strafe * 0.7;
          e.shootT -= dt;
          if (e.shootT <= 0 && d < 460) {
            e.shootT = rand(Math.max(1.25, 2.2 - this.wave * 0.06), Math.max(1.7, 3.0 - this.wave * 0.05));
            this.shots.push({
              x: e.x + ux * 20, y: e.y + uy * 20,
              vx: ux * 200, vy: uy * 200,
              r: 6, dmg: e.dmg, life: 3, color: ENEMIES.hexer.color, from: 'e', pierce: 0,
            });
            this.burst(e.x + ux * 22, e.y + uy * 22, ENEMIES.hexer.color, 5, 120, 'spark');
            this.sfx.play('shoot');
          }
          break;
        }
        case 'brute': {
          if (e.lungeT > 0) {
            e.lungeT -= dt;
          } else if (e.windT > 0) {
            e.windT -= dt;
            if (e.windT <= 0) {
              e.vx = ux * 560;
              e.vy = uy * 560;
              e.lungeT = 0.32;
              this.burst(e.x, e.y, '#ff7d6b', 8, 200, 'spark');
            }
          } else {
            mx = ux; my = uy;
            if (d < 130) e.windT = 0.6;
          }
          break;
        }
        case 'mage': {
          // keeps mid-range, strafes, fires 3-bolt bursts
          const dir = d > 360 ? 1 : d < 260 ? -1 : 0;
          const strafe = Math.sin(this.time * 1.6 + e.seed) > 0 ? 1 : -1;
          mx = ux * dir - uy * strafe * 0.8;
          my = uy * dir + ux * strafe * 0.8;
          e.shootT -= dt;
          if (e.shootT <= 0 && d < 520) {
            e.shootT = rand(Math.max(1.1, 2.0 - this.wave * 0.04), Math.max(1.6, 2.6 - this.wave * 0.04));
            for (let i = -1; i <= 1; i++) {
              const a = Math.atan2(uy, ux) + i * 0.22;
              this.shots.push({
                x: e.x + Math.cos(a) * 22, y: e.y + Math.sin(a) * 22,
                vx: Math.cos(a) * 240, vy: Math.sin(a) * 240,
                r: 6, dmg: e.dmg, life: 3, color: ENEMIES.mage.color, from: 'e', pierce: 0,
              });
            }
            this.burst(e.x + ux * 24, e.y + uy * 24, ENEMIES.mage.color, 6, 140, 'spark');
            this.sfx.play('shoot');
          }
          break;
        }
        case 'demon': {
          // relentless bruiser: walks in, then double-slams
          if (e.lungeT > 0) {
            e.lungeT -= dt;
          } else if (e.windT > 0) {
            e.windT -= dt;
            if (e.windT <= 0) {
              e.vx = ux * 480;
              e.vy = uy * 480;
              e.lungeT = 0.4;
              this.burst(e.x, e.y, '#ff4d3d', 10, 220, 'spark');
              this.sfx.play('dash');
            }
          } else {
            mx = ux; my = uy;
            if (d < 150) e.windT = 0.55;
          }
          e.shootT -= dt;
          if (e.shootT <= 0 && d < 420 && d > 120) {
            e.shootT = rand(2.6, 3.6);
            this.shots.push({
              x: e.x + ux * 22, y: e.y + uy * 22,
              vx: ux * 190, vy: uy * 190,
              r: 8, dmg: e.dmg * 0.8, life: 3.2, color: '#ff7a3d', from: 'e', pierce: 0,
            });
            this.sfx.play('shoot');
          }
          break;
        }
        case 'wraith': {
          // blinks: drifts, then sudden dash through the player
          if (e.dashT > 0) {
            e.dashT -= dt;
          } else {
            const w = Math.sin(this.time * 7 + e.seed) * 1.1;
            mx = ux * 0.6 - uy * w;
            my = uy * 0.6 + ux * w;
            e.shootT -= dt;
            if (e.shootT <= 0 && d < 380) {
              e.shootT = rand(1.8, 2.8);
              e.dashT = 0.28;
              e.vx = ux * 620;
              e.vy = uy * 620;
              this.burst(e.x, e.y, '#b9a7ff', 8, 200, 'spark');
            }
          }
          break;
        }
        case 'golem': {
          // siege engine: slow, telegraphed slam with shockwave
          mx = ux * 0.7; my = uy * 0.7;
          if (e.windT > 0) {
            e.windT -= dt;
            mx = 0; my = 0;
            if (e.windT <= 0) {
              this.shake(6);
              this.sfx.play('boss');
              this.part(e.x, e.y, 0, 0, 0.5, e.r, '#c8cfdd', 'ring');
              this.burst(e.x, e.y, '#9aa7b8', 14, 260, 'dot');
              for (let i = 0; i < 8; i++) {
                const a = (i / 8) * TAU;
                this.shots.push({
                  x: e.x + Math.cos(a) * e.r, y: e.y + Math.sin(a) * e.r,
                  vx: Math.cos(a) * 150, vy: Math.sin(a) * 150,
                  r: 7, dmg: e.dmg * 0.6, life: 2, color: '#9aa7b8', from: 'e', pierce: 0,
                });
              }
            }
          } else if (d < e.r + p.r + 70) {
            e.windT = 0.7;
            e.telegraphed = true;
          } else {
            e.telegraphed = false;
          }
          break;
        }
        case 'dragon': {
          // swoops in arcs and breathes 5-fire cones
          const w = Math.sin(this.time * 2.2 + e.seed) * 0.9;
          mx = ux * 0.9 - uy * w;
          my = uy * 0.9 + ux * w;
          e.shootT -= dt;
          if (e.shootT <= 0 && d < 480) {
            e.shootT = rand(2.0, 2.8);
            const base = Math.atan2(uy, ux);
            for (let i = -2; i <= 2; i++) {
              const a = base + i * 0.16;
              this.shots.push({
                x: e.x + Math.cos(a) * 30, y: e.y + Math.sin(a) * 30,
                vx: Math.cos(a) * 230, vy: Math.sin(a) * 230,
                r: 7, dmg: e.dmg * 0.7, life: 2.6, color: '#ff9a2e', from: 'e', pierce: 0,
              });
            }
            this.burst(e.x + ux * 32, e.y + uy * 32, '#ff9a2e', 8, 200, 'spark');
            this.sfx.play('shoot');
          }
          break;
        }
        case 'boss': {
          e.phase += dt;
          e.minionT -= dt;
          const v = e.variant ?? 0;
          if (e.minionT <= 0 && this.enemies.length < this.difficulty().activeCap - 3) {
            e.minionT = Math.max(5.6, 9 - this.wave * 0.22);
            const minionPool: EnemyKind[] = this.wave >= 20
              ? ['husk', 'skitter', 'mage', 'wraith']
              : this.wave >= 10 ? ['husk', 'skitter', 'mage'] : ['husk', 'skitter'];
            for (let i = 0; i < Math.min(5, 2 + Math.floor(this.wave / 4)); i++) {
              const mk = minionPool[Math.floor(Math.random() * minionPool.length)];
              const def = ENEMIES[mk];
              const a = rand(0, TAU);
              const difficulty = this.difficulty();
              this.enemies.push({
                kind: mk,
                x: clamp(e.x + Math.cos(a) * 60, 50, ARENA_W - 50),
                y: clamp(e.y + Math.sin(a) * 60, 50, ARENA_H - 50),
                vx: 0, vy: 0, r: def.r,
                hp: def.hp * difficulty.hp, maxHp: def.hp * difficulty.hp,
                speed: def.speed * difficulty.speed, dmg: def.dmg * difficulty.dmg,
                flash: 0, frozen: 0, slow: 0, spawn: 0.4,
                atkCd: 1, seed: rand(0, TAU), elite: false, name: def.name,
                shootT: 2, phase: 0, windT: 0, lungeT: 0,
                minionT: 99, faceA: 0, telegraphed: false, launched: false,
                variant: 0, dashT: 0, dead: false,
              });
              this.burst(e.x + Math.cos(a) * 60, e.y + Math.sin(a) * 60, def.color, 6, 150, 'spark');
            }
          }
          // variant special attacks on shootT
          e.shootT -= dt;
          const bossCol = ZONES[v % ZONES.length].bossColor;
          if (e.shootT <= 0) {
            if (v === 0) {
              // Mizuchi: tidal ring of 10 bolts
              e.shootT = 3.4;
              for (let i = 0; i < 10; i++) {
                const a = (i / 10) * TAU + this.time;
                this.shots.push({ x: e.x + Math.cos(a) * 50, y: e.y + Math.sin(a) * 50, vx: Math.cos(a) * 170, vy: Math.sin(a) * 170, r: 7, dmg: e.dmg * 0.55, life: 3.4, color: bossCol, from: 'e', pierce: 0 });
              }
              this.sfx.play('tide');
            } else if (v === 1) {
              // Khorzun: triple cinder fans
              e.shootT = 2.8;
              const base = Math.atan2(uy, ux);
              for (let i = -1; i <= 1; i++) {
                const a = base + i * 0.3;
                this.shots.push({ x: e.x + Math.cos(a) * 50, y: e.y + Math.sin(a) * 50, vx: Math.cos(a) * 250, vy: Math.sin(a) * 250, r: 8, dmg: e.dmg * 0.6, life: 3, color: bossCol, from: 'e', pierce: 0 });
              }
              this.sfx.play('shoot');
            } else if (v === 2) {
              // Isbrekk: slowing frost ring
              e.shootT = 3.8;
              for (let i = 0; i < 8; i++) {
                const a = (i / 8) * TAU;
                this.shots.push({ x: e.x + Math.cos(a) * 50, y: e.y + Math.sin(a) * 50, vx: Math.cos(a) * 140, vy: Math.sin(a) * 140, r: 8, dmg: e.dmg * 0.5, life: 4, color: bossCol, from: 'e', pierce: 0 });
              }
              p.slowT = Math.max(p.slowT, 1.2);
              this.sfx.play('nova');
            } else if (v === 3) {
              // Balam: eclipse spiral
              e.shootT = 2.4;
              for (let i = 0; i < 6; i++) {
                const a = e.phase * 2 + (i / 6) * TAU;
                this.shots.push({ x: e.x + Math.cos(a) * 50, y: e.y + Math.sin(a) * 50, vx: Math.cos(a) * 200, vy: Math.sin(a) * 200, r: 6, dmg: e.dmg * 0.55, life: 3, color: bossCol, from: 'e', pierce: 0 });
              }
              this.sfx.play('bolts');
            } else {
              // Zar'qun: glass shard cross
              e.shootT = 3.0;
              for (const [ox, oy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
                this.shots.push({ x: e.x + ox * 50, y: e.y + oy * 50, vx: ox * 260 + ux * 60, vy: oy * 260 + uy * 60, r: 7, dmg: e.dmg * 0.6, life: 3, color: bossCol, from: 'e', pierce: 0 });
              }
              this.sfx.play('shoot');
            }
            this.shake(4);
          }
          const pace = v === 1 ? 4.2 : 5; // Khorzun charges more often
          const cyc = e.phase % pace;
          if (cyc < pace - 2.2) {
            mx = ux; my = uy;
            e.telegraphed = false;
            e.launched = false;
          } else if (cyc < pace - 1.6) {
            if (!e.telegraphed) {
              e.telegraphed = true;
              this.shake(4);
            }
          } else if (cyc < pace - 1.3) {
            if (!e.launched) {
              e.launched = true;
              const lunge = v === 1 ? 760 : 640;
              e.vx = ux * lunge;
              e.vy = uy * lunge;
              this.sfx.play('dash');
              this.shake(5);
            }
          } else {
            mx = ux * 0.3;
            my = uy * 0.3;
          }
          break;
        }
      }
      const heavy = e.kind === 'brute' || e.kind === 'boss' || e.kind === 'golem' || e.kind === 'demon' || e.kind === 'dragon';
      const acc = heavy ? 6 : 10;
      e.vx += (mx * spd - e.vx) * Math.min(1, dt * acc);
      e.vy += (my * spd - e.vy) * Math.min(1, dt * acc);
      e.x = clamp(e.x + e.vx * dt, 30, ARENA_W - 30);
      e.y = clamp(e.y + e.vy * dt, 30, ARENA_H - 30);

      // contact damage (always measured against the real player, not the mirage)
      const dp = Math.hypot(p.x - e.x, p.y - e.y);
      if (interact && dp < e.r + p.r + 2 && e.atkCd <= 0) {
        e.atkCd = Math.max(0.55, 0.9 - this.wave * 0.018);
        this.damagePlayer(e.dmg, e);
      }
    }

    // separation
    const es = this.enemies;
    for (let i = 0; i < es.length; i++) {
      for (let j = i + 1; j < es.length; j++) {
        const a = es[i];
        const b = es[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const rr = a.r + b.r;
        const d2 = dx * dx + dy * dy;
        if (d2 > 0.01 && d2 < rr * rr) {
          const d = Math.sqrt(d2);
          const push = (rr - d) / d * 0.5;
          a.x -= dx * push;
          a.y -= dy * push;
          b.x += dx * push;
          b.y += dy * push;
        }
      }
    }

    // shots (enemy bolts hang in the air during stasis)
    const frozenWorld = !!p && !p.dead && p.stasisT > 0;
    for (const s of this.shots) {
      if (frozenWorld && s.from === 'e') continue;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= dt;
      if (s.from === 'e' && interact && p && !p.dead) {
        const d = Math.hypot(s.x - p.x, s.y - p.y);
        if (d < s.r + p.r) {
          s.life = 0;
          this.damagePlayer(s.dmg, {
            kind: 'hexer', x: s.x - s.vx, y: s.y - s.vy, elite: false, name: 'a hexbolt',
          } as Enemy);
        }
      } else if (s.from === 'p') {
        for (const e of this.enemies) {
          if (e.dead || e.spawn > 0) continue;
          const d = Math.hypot(s.x - e.x, s.y - e.y);
          if (d < s.r + e.r) {
            this.damageEnemy(e, s.dmg, s.vx / 360, s.vy / 360, false, 120);
            s.pierce--;
            if (s.pierce < 0) {
              s.life = 0;
            }
            break;
          }
        }
      }
    }
    this.shots = this.shots.filter((s) => s.life > 0 && s.x > -80 && s.x < ARENA_W + 80 && s.y > -80 && s.y < ARENA_H + 80);

    // pickups
    if (p && !p.dead) {
      for (const pk of this.pickups) {
        pk.t += dt;
        pk.vx *= 1 - Math.min(1, dt * 4);
        pk.vy *= 1 - Math.min(1, dt * 4);
        const dx = p.x - pk.x;
        const dy = p.y - pk.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < p.pickupRange) {
          pk.vx += (dx / d) * 1400 * dt;
          pk.vy += (dy / d) * 1400 * dt;
        }
        pk.x += pk.vx * dt;
        pk.y += pk.vy * dt;
        if (interact && d < 30) {
          pk.t = -999; // consumed flag
          if (pk.kind === 'coin') {
            const collected = Math.ceil(pk.val * p.coinMult);
            this.gold += collected;
            this.score += collected * 5;
            this.sfx.play('coin');
            this.floater(p.x, p.y - 34, `+${collected * 5}`, 13, '#ffd24a');
            this.burst(pk.x, pk.y, '#ffd24a', 5, 140, 'spark');
          } else if (pk.kind === 'potion') {
            p.hp = Math.min(p.maxHp, p.hp + pk.val);
            this.sfx.play('potion');
            this.floater(p.x, p.y - 34, `+${pk.val} HP`, 15, '#7ddb6f');
            this.burst(pk.x, pk.y, '#7ddb6f', 8, 160);
          } else {
            p.buffT = 8;
            this.sfx.play('rune');
            this.floater(p.x, p.y - 40, 'EMPOWERED!', 20, '#ffd97a', true);
            this.pushFeed('You attuned a Sun Rune — +50% damage for 8s.', '#ffd97a');
            this.part(p.x, p.y, 0, 0, 0.6, 34, '#ffd97a', 'ring');
          }
        }
      }
      this.pickups = this.pickups.filter((pk) => pk.t > -900);
    }

    // cull dead enemies
    if (this.enemies.some((e) => e.dead)) {
      this.enemies = this.enemies.filter((e) => !e.dead);
    }
  }

  private updateFx(dt: number) {
    for (const pt of this.parts) {
      pt.t += dt;
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vx *= Math.pow(pt.drag, dt * 60);
      pt.vy *= Math.pow(pt.drag, dt * 60);
      pt.vy += pt.grav * dt;
      pt.rot += pt.vr * dt;
    }
    this.parts = this.parts.filter((pt) => pt.t < pt.dur);
    for (const f of this.floaters) f.t += dt;
    this.floaters = this.floaters.filter((f) => f.t < f.dur);
    for (const s of this.slashes) s.t += dt;
    this.slashes = this.slashes.filter((s) => s.t < s.dur);
    for (const g of this.ghosts) g.a -= dt * 2.4;
    this.ghosts = this.ghosts.filter((g) => g.a > 0);
  }

  private updateMenuParts(raw: number) {
    if (this.menuParts.length < 60 && Math.random() < 0.3) {
      this.menuParts.push({
        x: rand(0, this.viewW), y: this.viewH + 10,
        vx: rand(-12, 12), vy: rand(-70, -26),
        t: 0, dur: rand(4, 9), size: rand(1.5, 4),
        color: Math.random() < 0.7 ? '#e2b45c' : ZONES[Math.floor(this.menuT / 8) % ZONES.length].color,
        kind: 'dot', grav: 0, drag: 1, rot: 0, vr: 0,
      });
    }
    for (const pt of this.menuParts) {
      pt.t += raw;
      pt.x += pt.vx * raw + Math.sin(pt.t * 2 + pt.size) * 0.3;
      pt.y += pt.vy * raw;
    }
    this.menuParts = this.menuParts.filter((pt) => pt.t < pt.dur && pt.y > -20);
  }

  /* ------------------------------- hud ------------------------------- */

  private pushHud() {
    const p = this.p;
    if (!p) return;
    const boss = this.enemies.find((e) => e.kind === 'boss' && e.spawn <= 0);
    const m = Math.floor(this.elapsed / 60);
    const s = Math.floor(this.elapsed % 60);
    const d: HudData = {
      hp: Math.max(0, Math.ceil(p.hp)), maxHp: p.maxHp,
      xp: p.xp, xpNext: this.xpNeed(p.level), level: p.level,
      score: this.score, gold: this.gold, kills: this.kills,
      wave: this.wave, zoneName: this.zone.name, zoneCulture: this.zone.culture, zoneColor: this.zone.color,
      threat:
        this.wave < 5 ? 'THREAT I' :
        this.wave < 10 ? 'THREAT II' :
        this.wave < 20 ? 'THREAT III' :
        this.wave < 35 ? 'THREAT IV' :
        this.wave < 50 ? 'THREAT V' : 'THREAT VI',
      foesLeft: this.queue.length + this.enemies.length,
      abilityCd: Math.max(0, p.abilityCd), abilityCdMax: this.classDef.abilityCd,
      dashCd: Math.max(0, p.dashCd), dashCdMax: 1.6 * p.dashRate,
      abilityName: this.classDef.abilityName,
      legacyCd: Math.max(0, p.legacyCd), legacyCdMax: this.legacy.cd * p.abilityRate,
      legacyName: this.legacy.name, legacyActive: this.legacyActiveLabel(),
      buffT: Math.max(0, p.buffT), combo: p.combo,
      bossHp: boss ? Math.max(0, boss.hp) : 0, bossMax: boss ? boss.maxHp : 0,
      bossName: boss ? boss.name : '',
      hurt: this.hurtFlash, lowHp: p.hp / p.maxHp < 0.3,
      feed: this.feed.slice(),
      announce: this.announce, announceId: this.announceId,
      timeStr: `${m}:${s.toString().padStart(2, '0')}`,
      muted: this.muted,
      playerName: this.playerName, classId: this.classDef.id,
      className: this.classDef.name, classColor: this.classDef.color,
    };
    for (const fn of this.opts.bus.listeners) fn(d);
  }

  /* ------------------------------ render ----------------------------- */

  private resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.viewW = Math.max(1, r.width);
    this.viewH = Math.max(1, r.height);
    this.canvas.width = Math.round(this.viewW * this.dpr);
    this.canvas.height = Math.round(this.viewH * this.dpr);
    this.canvas.style.width = `${this.viewW}px`;
    this.canvas.style.height = `${this.viewH}px`;
    this.zoom = clamp(Math.min(this.viewW, this.viewH) / 760, 0.7, 1.15);
  }

  private render() {
    const c = this.ctx;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.fillStyle = '#070a10';
    c.fillRect(0, 0, this.viewW, this.viewH);

    const shx = (Math.random() * 2 - 1) * this.cam.shake;
    const shy = (Math.random() * 2 - 1) * this.cam.shake;
    c.save();
    c.translate(this.viewW / 2, this.viewH / 2);
    c.scale(this.zoom, this.zoom);
    c.translate(-this.cam.x + shx, -this.cam.y + shy);

    this.drawGround(c);
    if (this.state === 'menu') {
      this.drawMenuRing(c);
    } else {
      for (const pk of this.pickups) this.drawPickup(c, pk);
      for (const e of this.enemies) this.drawEnemy(c, e);
      this.drawPlayer(c);
      for (const s of this.shots) this.drawShot(c, s);
      for (const s of this.slashes) this.drawSlash(c, s);
    }
    this.drawParticles(c);
    if (this.state !== 'menu') {
      for (const f of this.floaters) this.drawFloater(c, f);
    }
    c.restore();

    if (this.state === 'menu') this.drawMenuOverlayFx(c);

    // Heartbeat Stasis: cold violet wash over the frozen world
    if (this.p && this.p.stasisT > 0 && this.state !== 'menu') {
      c.fillStyle = 'rgba(120,80,200,0.14)';
      c.fillRect(0, 0, this.viewW, this.viewH);
    }
    // Still Water: pale, quiet vignette
    if (this.p && this.p.focusT > 0 && this.state !== 'menu') {
      c.fillStyle = 'rgba(200,230,255,0.06)';
      c.fillRect(0, 0, this.viewW, this.viewH);
    }
  }

  /** Unlock/resume audio from any user gesture (touch controls call this). */
  unlockAudio() {
    this.sfx.ensure();
    this.music.ensure();
    if (this.state === 'menu') this.music.setScene('menu');
  }

  private drawGround(c: CanvasRenderingContext2D) {
    const zoneIndex = this.state === 'menu'
      ? Math.floor(this.menuT / 8) % ZONES.length
      : this.wave > 0 ? (this.wave - 1) % ZONES.length : 0;
    const zoneColor = ZONES[zoneIndex].color;
    const halfW = this.viewW / 2 / this.zoom + 60;
    const halfH = this.viewH / 2 / this.zoom + 60;
    const l = this.cam.x - halfW;
    const t = this.cam.y - halfH;
    // arena floor
    c.fillStyle = mixHex('#0e141c', zoneColor, 0.07);
    c.fillRect(Math.max(0, l), Math.max(0, t), Math.min(ARENA_W, l + halfW * 2) - Math.max(0, l), Math.min(ARENA_H, t + halfH * 2) - Math.max(0, t));
    // glow blobs
    for (const b of this.blobs) {
      if (b.x + b.r < l || b.x - b.r > l + halfW * 2 || b.y + b.r < t || b.y - b.r > t + halfH * 2) continue;
      this.drawGlow(c, b.x, b.y, b.r, zoneColor, 0.09);
    }
    this.drawScenery(c, zoneIndex, l, t, l + halfW * 2, t + halfH * 2);
    // grid
    c.strokeStyle = rgba(zoneColor, 0.07);
    c.lineWidth = 1;
    c.beginPath();
    const g = 130;
    for (let x = Math.max(0, Math.floor(l / g) * g); x <= Math.min(ARENA_W, l + halfW * 2); x += g) {
      c.moveTo(x, Math.max(0, t));
      c.lineTo(x, Math.min(ARENA_H, t + halfH * 2));
    }
    for (let y = Math.max(0, Math.floor(t / g) * g); y <= Math.min(ARENA_H, t + halfH * 2); y += g) {
      c.moveTo(Math.max(0, l), y);
      c.lineTo(Math.min(ARENA_W, l + halfW * 2), y);
    }
    c.stroke();
    // specks
    c.fillStyle = '#cfe3d8';
    for (const s of this.specks) {
      if (s.x < l || s.x > l + halfW * 2 || s.y < t || s.y > t + halfH * 2) continue;
      c.globalAlpha = s.a;
      c.fillRect(s.x, s.y, 2, 2);
    }
    c.globalAlpha = 1;
    // border
    c.strokeStyle = 'rgba(226,180,92,0.22)';
    c.lineWidth = 4;
    c.strokeRect(0, 0, ARENA_W, ARENA_H);
    c.strokeStyle = 'rgba(226,180,92,0.08)';
    c.lineWidth = 2;
    c.strokeRect(10, 10, ARENA_W - 20, ARENA_H - 20);
    // corner runes
    c.strokeStyle = 'rgba(226,180,92,0.3)';
    c.lineWidth = 2;
    for (const [cx, cy] of [[70, 70], [ARENA_W - 70, 70], [70, ARENA_H - 70], [ARENA_W - 70, ARENA_H - 70]] as const) {
      c.beginPath();
      c.arc(cx, cy, 26, 0, TAU);
      c.stroke();
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * TAU + this.time * 0.3;
        c.moveTo(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18);
        c.lineTo(cx + Math.cos(a) * 34, cy + Math.sin(a) * 34);
      }
      c.stroke();
    }
  }

  private drawMenuRing(c: CanvasRenderingContext2D) {
    const cx = ARENA_W / 2;
    const cy = ARENA_H / 2;
    c.save();
    c.translate(cx, cy);
    this.drawGlow(c, 0, 0, 320, ZONES[Math.floor(this.menuT / 8) % ZONES.length].color, 0.14);
    c.rotate(this.menuT * 0.12);
    c.strokeStyle = 'rgba(226,180,92,0.35)';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(0, 0, 200, 0, TAU);
    c.stroke();
    c.beginPath();
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * TAU;
      c.moveTo(Math.cos(a) * 190, Math.sin(a) * 190);
      c.lineTo(Math.cos(a) * 210, Math.sin(a) * 210);
    }
    c.stroke();
    for (const gl of this.glyphs) {
      c.save();
      c.rotate(gl.a);
      c.translate(165, 0);
      c.strokeStyle = 'rgba(255,217,122,0.5)';
      c.lineWidth = 2.5;
      c.beginPath();
      c.moveTo(-10, -8 * gl.segs[0]);
      c.lineTo(0, 8 * gl.segs[1]);
      c.lineTo(10, -8 * gl.segs[2]);
      c.moveTo(0, 8 * gl.segs[1]);
      c.lineTo(0, -12);
      c.stroke();
      c.restore();
    }
    c.rotate(-this.menuT * 0.26);
    c.setLineDash([14, 22]);
    c.strokeStyle = 'rgba(226,180,92,0.18)';
    c.beginPath();
    c.arc(0, 0, 250, 0, TAU);
    c.stroke();
    c.setLineDash([]);
    c.restore();
    // orbiting spirit orbs, one per culture-class
    for (let i = 0; i < 4; i++) {
      const a = this.menuT * 0.35 + (i / 4) * TAU;
      const ox = cx + Math.cos(a) * 232;
      const oy = cy + Math.sin(a) * 232;
      this.drawGlow(c, ox, oy, 26, CLASSES[i].color, 0.7);
      c.fillStyle = CLASSES[i].color;
      c.beginPath();
      c.arc(ox, oy, 5, 0, TAU);
      c.fill();
    }
  }

  private drawMenuOverlayFx(c: CanvasRenderingContext2D) {
    // screen-space embers
    c.save();
    c.globalCompositeOperation = 'lighter';
    for (const pt of this.menuParts) {
      const k = pt.t / pt.dur;
      c.globalAlpha = Math.sin(Math.PI * Math.min(1, k)) * 0.7;
      c.fillStyle = pt.color;
      c.beginPath();
      c.arc(pt.x, pt.y, pt.size, 0, TAU);
      c.fill();
    }
    c.restore();
    c.globalAlpha = 1;
  }

  private makeScenery(zoneIndex: number): SceneryProp[] {
    const zones: SceneryKind[][] = [
      ['bamboo', 'bamboo', 'sakura', 'sakura', 'torii'],
      ['emberRock', 'emberRock', 'lavaCrack', 'lavaCrack', 'deadTree'],
      ['pine', 'pine', 'iceShard', 'iceShard', 'runestone'],
      ['palm', 'palm', 'ruin', 'ruin', 'vine'],
      ['dune', 'dune', 'obelisk', 'cactus', 'cactus'],
    ];
    const kinds = zones[zoneIndex];
    const out: SceneryProp[] = [];
    for (let i = 0; i < 34; i++) {
      let x = 0;
      let y = 0;
      do {
        x = rand(65, ARENA_W - 65);
        y = rand(65, ARENA_H - 65);
      } while (Math.hypot(x - ARENA_W / 2, y - ARENA_H / 2) < 270);
      out.push({
        x,
        y,
        kind: kinds[Math.floor(rand(0, kinds.length))],
        scale: rand(0.7, 1.32),
        seed: rand(0, TAU),
      });
    }
    return out;
  }

  private drawScenery(c: CanvasRenderingContext2D, zoneIndex: number, l: number, t: number, r: number, b: number) {
    // Broad environmental washes make every realm read as a place, not an empty arena.
    c.save();
    c.globalAlpha = 0.18;
    if (zoneIndex === 0) {
      c.fillStyle = '#1a5260';
      c.fillRect(0, 0, 98, ARENA_H);
      c.fillStyle = '#2d7890';
      for (let y = 0; y < ARENA_H; y += 46) {
        c.beginPath(); c.arc(44 + Math.sin(y * 0.03 + this.time) * 10, y, 24, 0, TAU); c.fill();
      }
    } else if (zoneIndex === 1) {
      c.fillStyle = '#6f2c21';
      for (let x = 80; x < ARENA_W; x += 340) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 140, 0); c.lineTo(x + 60, 120); c.closePath(); c.fill();
      }
    } else if (zoneIndex === 2) {
      c.fillStyle = '#38637b';
      c.fillRect(0, 0, ARENA_W, 76);
      c.fillRect(0, ARENA_H - 76, ARENA_W, 76);
    } else if (zoneIndex === 3) {
      c.fillStyle = '#244d35';
      c.fillRect(0, 0, 108, ARENA_H);
      c.fillRect(ARENA_W - 108, 0, 108, ARENA_H);
    } else {
      c.fillStyle = '#6b4b24';
      c.fillRect(0, 0, ARENA_W, 70);
      c.fillRect(0, ARENA_H - 70, ARENA_W, 70);
    }
    c.restore();

    for (const prop of this.scenery[zoneIndex]) {
      const reach = 90 * prop.scale;
      if (prop.x + reach < l || prop.x - reach > r || prop.y + reach < t || prop.y - reach > b) continue;
      this.drawSceneryProp(c, prop);
    }
  }

  private drawSceneryProp(c: CanvasRenderingContext2D, prop: SceneryProp) {
    const s = prop.scale;
    const flutter = Math.sin(this.time * 1.5 + prop.seed) * 0.12;
    c.save();
    c.translate(prop.x, prop.y);
    c.scale(s, s);
    c.globalAlpha = 0.72;
    switch (prop.kind) {
      case 'bamboo': {
        c.strokeStyle = '#397455'; c.lineWidth = 5; c.lineCap = 'round';
        for (const dx of [-8, 0, 8]) {
          c.beginPath(); c.moveTo(dx, 17); c.quadraticCurveTo(dx + flutter * 24, 0, dx + flutter * 48, -30); c.stroke();
          c.strokeStyle = '#9bd27a'; c.lineWidth = 1;
          for (let y = 8; y >= -22; y -= 10) { c.beginPath(); c.moveTo(dx - 3, y); c.lineTo(dx + 3, y); c.stroke(); }
          c.strokeStyle = '#397455'; c.lineWidth = 5;
        }
        c.fillStyle = '#74b866';
        for (let i = 0; i < 8; i++) { const a = prop.seed + i * 0.8; c.beginPath(); c.ellipse(Math.cos(a) * 15, -22 + Math.sin(a) * 10, 8, 2.5, a, 0, TAU); c.fill(); }
        break;
      }
      case 'sakura': {
        c.strokeStyle = '#4c2e2d'; c.lineWidth = 6; c.lineCap = 'round';
        c.beginPath(); c.moveTo(0, 20); c.quadraticCurveTo(-2, -2, 5, -26); c.moveTo(1, -2); c.lineTo(-16, -17); c.moveTo(2, -6); c.lineTo(18, -20); c.stroke();
        c.fillStyle = '#f39aab';
        for (let i = 0; i < 14; i++) { const a = prop.seed + i * 0.45; const d = 8 + (i % 4) * 4; c.beginPath(); c.arc(Math.cos(a) * d, -20 + Math.sin(a) * 10, 4, 0, TAU); c.fill(); }
        break;
      }
      case 'torii': {
        c.fillStyle = '#b44b40'; c.fillRect(-22, -21, 5, 43); c.fillRect(17, -21, 5, 43); c.fillRect(-29, -24, 58, 6); c.fillRect(-24, -17, 48, 4);
        c.fillStyle = '#e8bc62'; c.fillRect(-29, -25, 58, 2); c.fillRect(-1.5, -17, 3, 35);
        break;
      }
      case 'emberRock': {
        c.fillStyle = '#56332d'; c.beginPath(); c.moveTo(-22, 18); c.lineTo(-12, -15); c.lineTo(12, -20); c.lineTo(27, 10); c.lineTo(15, 22); c.closePath(); c.fill();
        c.strokeStyle = '#ff834c'; c.globalAlpha = 0.55; c.lineWidth = 2; c.beginPath(); c.moveTo(-10, 12); c.lineTo(2, 0); c.lineTo(12, 13); c.stroke();
        break;
      }
      case 'lavaCrack': {
        c.strokeStyle = '#ed5e36'; c.lineWidth = 3; c.globalAlpha = 0.55;
        c.beginPath(); c.moveTo(-30, 0); c.lineTo(-8, -5); c.lineTo(3, 8); c.lineTo(30, 2); c.moveTo(-8, -5); c.lineTo(-4, -20); c.moveTo(3, 8); c.lineTo(10, 22); c.stroke();
        break;
      }
      case 'deadTree': {
        c.strokeStyle = '#4a3030'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 22); c.lineTo(-2, -18); c.lineTo(-16, -31); c.moveTo(-3, -2); c.lineTo(13, -16); c.moveTo(0, 8); c.lineTo(17, 4); c.stroke();
        c.strokeStyle = '#a04b39'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(1, 18); c.lineTo(-1, -14); c.stroke();
        break;
      }
      case 'pine': {
        c.fillStyle = '#423b31'; c.fillRect(-3, 12, 6, 17);
        c.fillStyle = '#315d55';
        for (const [y, w] of [[-25, 12], [-13, 18], [0, 24], [12, 29]] as const) { c.beginPath(); c.moveTo(0, y - 12); c.lineTo(-w, y + 12); c.lineTo(w, y + 12); c.closePath(); c.fill(); }
        c.strokeStyle = '#9bd0e0'; c.globalAlpha = 0.35; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-20, 11); c.lineTo(0, -35); c.lineTo(20, 11); c.stroke();
        break;
      }
      case 'iceShard': {
        c.fillStyle = '#92d8ef'; c.globalAlpha = 0.5; c.beginPath(); c.moveTo(-14, 20); c.lineTo(-4, -24); c.lineTo(6, 10); c.lineTo(17, -9); c.lineTo(14, 23); c.closePath(); c.fill();
        c.strokeStyle = '#d5fbff'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(-4, -24); c.lineTo(0, 18); c.moveTo(6, 10); c.lineTo(14, 23); c.stroke();
        break;
      }
      case 'runestone': {
        c.fillStyle = '#43515f'; c.beginPath(); c.moveTo(-12, 23); c.lineTo(-10, -18); c.lineTo(0, -27); c.lineTo(11, -18); c.lineTo(13, 23); c.closePath(); c.fill();
        c.strokeStyle = '#7fdfff'; c.globalAlpha = 0.65; c.lineWidth = 2; c.beginPath(); c.moveTo(0, -17); c.lineTo(-4, -7); c.lineTo(4, 0); c.lineTo(-3, 10); c.stroke();
        break;
      }
      case 'palm': {
        c.strokeStyle = '#715635'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 24); c.quadraticCurveTo(-4, -2, 3, -28); c.stroke();
        c.strokeStyle = '#2d7b4d'; c.lineWidth = 5; for (let i = 0; i < 6; i++) { const a = prop.seed + i * TAU / 6; c.beginPath(); c.moveTo(3, -27); c.quadraticCurveTo(Math.cos(a) * 17, -31 + Math.sin(a) * 8, Math.cos(a) * 28, -27 + Math.sin(a) * 16); c.stroke(); }
        break;
      }
      case 'ruin': {
        c.fillStyle = '#5e6a4e'; c.fillRect(-22, 11, 44, 10); c.fillRect(-15, 2, 30, 10); c.fillRect(-9, -8, 18, 10);
        c.fillStyle = '#82906a'; c.fillRect(-17, -28, 9, 22); c.fillRect(8, -28, 9, 22); c.fillRect(-20, -31, 40, 6);
        c.strokeStyle = '#294d37'; c.lineWidth = 2; c.beginPath(); c.moveTo(-16, -20); c.lineTo(-8, -14); c.moveTo(13, -23); c.lineTo(8, -12); c.stroke();
        break;
      }
      case 'vine': {
        c.strokeStyle = '#347146'; c.lineWidth = 4; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, -32); c.bezierCurveTo(-21, -11, 19, 0, -4, 28); c.stroke();
        c.fillStyle = '#67a451'; for (let i = 0; i < 5; i++) { c.beginPath(); c.ellipse(Math.sin(prop.seed + i) * 9, -17 + i * 10, 5, 2.2, prop.seed + i, 0, TAU); c.fill(); }
        break;
      }
      case 'dune': {
        c.strokeStyle = '#c49a52'; c.globalAlpha = 0.48; c.lineWidth = 4; c.beginPath(); c.arc(0, 12, 34, Math.PI * 1.05, Math.PI * 1.92); c.stroke(); c.beginPath(); c.arc(15, 19, 21, Math.PI * 1.05, Math.PI * 1.9); c.stroke();
        break;
      }
      case 'obelisk': {
        c.fillStyle = '#5c513f'; c.beginPath(); c.moveTo(-8, 27); c.lineTo(-6, -25); c.lineTo(6, -25); c.lineTo(9, 27); c.closePath(); c.fill();
        c.strokeStyle = '#e2bd66'; c.globalAlpha = 0.5; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, -18); c.lineTo(-3, -7); c.lineTo(3, 0); c.lineTo(-2, 10); c.stroke();
        break;
      }
      case 'cactus': {
        c.strokeStyle = '#477456'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, 24); c.lineTo(0, -25); c.moveTo(0, -2); c.lineTo(-13, -9); c.lineTo(-13, -18); c.moveTo(0, 8); c.lineTo(12, 2); c.lineTo(12, -8); c.stroke();
        c.strokeStyle = '#b9d172'; c.globalAlpha = 0.6; c.lineWidth = 1; c.beginPath(); c.moveTo(-2, 20); c.lineTo(-2, -20); c.stroke();
        break;
      }
    }
    c.restore();
  }

  private drawPickup(c: CanvasRenderingContext2D, pk: Pickup) {
    const bob = Math.sin(pk.t * 5) * 3;
    const y = pk.y + bob;
    if (pk.kind === 'coin') {
      this.drawGlow(c, pk.x, y, 16, '#ffd24a', 0.45);
      c.fillStyle = '#ffd24a';
      c.beginPath();
      c.ellipse(pk.x, y, 6.5, 7.5, 0, 0, TAU);
      c.fill();
      c.strokeStyle = '#a87b1e';
      c.lineWidth = 1.5;
      c.stroke();
      c.strokeStyle = 'rgba(255,255,255,0.7)';
      c.beginPath();
      c.arc(pk.x, y, 3.5, -2.2, -0.8);
      c.stroke();
    } else if (pk.kind === 'potion') {
      this.drawGlow(c, pk.x, y, 18, '#ff6b8a', 0.5);
      c.fillStyle = '#e05252';
      c.beginPath();
      c.arc(pk.x, y + 2, 7.5, 0, TAU);
      c.fill();
      c.fillStyle = '#b83e3e';
      c.fillRect(pk.x - 3, y - 10, 6, 7);
      c.fillStyle = '#8a5a2a';
      c.fillRect(pk.x - 4, y - 13, 8, 4);
      c.fillStyle = 'rgba(255,255,255,0.6)';
      c.beginPath();
      c.arc(pk.x - 2.5, y, 2, 0, TAU);
      c.fill();
    } else {
      const pulse = 1 + Math.sin(pk.t * 6) * 0.15;
      this.drawGlow(c, pk.x, y, 30 * pulse, '#ffd97a', 0.7);
      c.save();
      c.translate(pk.x, y);
      c.rotate(pk.t * 2);
      c.fillStyle = '#ffd97a';
      c.beginPath();
      c.moveTo(0, -10);
      c.lineTo(7, 0);
      c.lineTo(0, 10);
      c.lineTo(-7, 0);
      c.closePath();
      c.fill();
      c.strokeStyle = '#54c9b4';
      c.lineWidth = 2;
      c.stroke();
      c.restore();
    }
  }

  private drawEnemy(c: CanvasRenderingContext2D, e: Enemy) {
    const def = ENEMIES[e.kind];
    const bossCol = e.kind === 'boss' ? ZONES[(e.variant ?? 0) % ZONES.length].bossColor : def.color;
    let col = e.kind === 'boss' ? bossCol : def.color;
    if (e.frozen > 0) col = mixHex(col, '#bfe6ff', 0.65);
    if (e.flash > 0) col = mixHex(col, '#ffffff', e.flash * 0.85);

    c.save();
    if (e.spawn > 0) {
      const k = 1 - e.spawn / 0.45;
      c.globalAlpha = k * 0.75;
      c.strokeStyle = def.color;
      c.lineWidth = 2;
      c.beginPath();
      c.arc(e.x, e.y, e.r * (2.2 - k * 1.4), 0, TAU);
      c.stroke();
    }
    // shadow
    c.fillStyle = 'rgba(0,0,0,0.4)';
    c.beginPath();
    c.ellipse(e.x, e.y + e.r * 0.85, e.r * 1.05, e.r * 0.38, 0, 0, TAU);
    c.fill();

    if (e.kind === 'boss') this.drawGlow(c, e.x, e.y, e.r * 1.9, bossCol, 0.35);
    if (e.kind === 'dragon') this.drawGlow(c, e.x, e.y, e.r * 1.6, '#ff9a2e', 0.25);
    if (e.kind === 'wraith') this.drawGlow(c, e.x, e.y, e.r * 1.5, '#b9a7ff', 0.3);

    c.translate(e.x, e.y);
    const windUp = e.windT > 0 || (e.kind === 'boss' && e.telegraphed && !e.launched);
    if (windUp) {
      c.strokeStyle = `rgba(255,90,90,${0.4 + Math.sin(this.time * 30) * 0.3})`;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(0, 0, e.r + 8, 0, TAU);
      c.stroke();
    }
    if (e.elite) {
      const halo = 1 + Math.sin(this.time * 5 + e.seed) * 0.08;
      this.drawGlow(c, 0, 0, e.r * 1.65 * halo, '#ffd24a', 0.23);
      c.strokeStyle = 'rgba(255,210,74,0.65)'; c.lineWidth = 1.4; c.setLineDash([3, 3]);
      c.beginPath(); c.arc(0, 0, e.r + 5, 0, TAU); c.stroke(); c.setLineDash([]);
    }

    switch (e.kind) {
      case 'husk': {
        const wob = Math.sin(this.time * 5 + e.seed) * 0.08;
        c.fillStyle = mixHex(def.color, '#15231d', 0.6);
        c.beginPath(); c.moveTo(-e.r * 0.8, e.r * 0.9); c.lineTo(-e.r * 0.7, -e.r * 0.1); c.lineTo(0, -e.r * 0.55); c.lineTo(e.r * 0.8, 0); c.lineTo(e.r * 0.6, e.r); c.closePath(); c.fill();
        c.fillStyle = col;
        c.beginPath();
        c.arc(0, 0, e.r * (1 + wob), 0, TAU);
        c.fill();
        c.strokeStyle = mixHex(def.color, '#d0e6bb', 0.35); c.globalAlpha = 0.55; c.lineWidth = 1.3;
        c.beginPath(); c.moveTo(-e.r * 0.65, e.r * 0.1); c.lineTo(-e.r * 0.1, -e.r * 0.1); c.lineTo(e.r * 0.45, e.r * 0.35); c.moveTo(-e.r * 0.25, e.r * 0.7); c.lineTo(e.r * 0.4, e.r * 0.55); c.stroke(); c.globalAlpha = 1;
        c.fillStyle = '#d9d0a2';
        c.beginPath(); c.moveTo(-e.r * 0.7, -e.r * 0.4); c.lineTo(-e.r * 1.05, -e.r * 0.86); c.lineTo(-e.r * 0.38, -e.r * 0.66); c.closePath(); c.moveTo(e.r * 0.65, -e.r * 0.42); c.lineTo(e.r * 0.98, -e.r * 0.8); c.lineTo(e.r * 0.38, -e.r * 0.62); c.closePath(); c.fill();
        c.fillStyle = mixHex(def.color, '#000000', 0.45);
        c.beginPath();
        c.arc(0, e.r * 0.25, e.r * 0.5, 0.2, Math.PI - 0.2);
        c.fill();
        c.fillStyle = '#ff5d5d';
        c.beginPath();
        c.arc(-e.r * 0.35, -e.r * 0.2, 2.6, 0, TAU);
        c.arc(e.r * 0.35, -e.r * 0.2, 2.6, 0, TAU);
        c.fill();
        break;
      }
      case 'skitter': {
        c.rotate(e.faceA);
        c.strokeStyle = mixHex(def.color, '#000000', 0.3);
        c.lineWidth = 2;
        c.beginPath();
        for (let i = 0; i < 4; i++) {
          const lx = -e.r * 0.3 + (i - 1.5) * e.r * 0.35;
          const sw = Math.sin(this.time * 14 + e.seed + i) * 4;
          c.moveTo(lx, -e.r * 0.5);
          c.lineTo(lx + sw, -e.r * 1.2);
          c.moveTo(lx, e.r * 0.5);
          c.lineTo(lx + sw, e.r * 1.2);
        }
        c.stroke();
        c.fillStyle = col;
        c.beginPath();
        c.moveTo(e.r, 0);
        c.lineTo(-e.r * 0.75, e.r * 0.8);
        c.lineTo(-e.r * 0.75, -e.r * 0.8);
        c.closePath();
        c.fill();
        c.strokeStyle = '#6f3318'; c.lineWidth = 1.6;
        for (let i = 0; i < 3; i++) { const x = -e.r * 0.35 + i * e.r * 0.42; c.beginPath(); c.moveTo(x, -e.r * 0.53); c.lineTo(x, e.r * 0.53); c.stroke(); }
        c.strokeStyle = '#4c2413'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(-e.r * 0.65, 0); c.quadraticCurveTo(-e.r * 1.35, -e.r * 0.7, -e.r * 1.2, -e.r * 1.25); c.stroke();
        c.fillStyle = '#3a1d0a';
        c.beginPath();
        c.arc(e.r * 0.35, 0, 2.4, 0, TAU);
        c.fill();
        break;
      }
      case 'brute': {
        c.fillStyle = '#472222';
        c.beginPath(); c.ellipse(0, 3, e.r * 1.08, e.r * 0.84, 0, 0, TAU); c.fill();
        c.fillStyle = col;
        c.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * TAU + Math.PI / 6;
          if (i === 0) c.moveTo(Math.cos(a) * e.r, Math.sin(a) * e.r);
          else c.lineTo(Math.cos(a) * e.r, Math.sin(a) * e.r);
        }
        c.closePath();
        c.fill();
        c.strokeStyle = mixHex(def.color, '#000000', 0.4);
        c.lineWidth = 3;
        c.stroke();
        c.strokeStyle = '#9f493e'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(-e.r * 0.6, -e.r * 0.05); c.lineTo(e.r * 0.6, -e.r * 0.05); c.moveTo(-e.r * 0.45, e.r * 0.35); c.lineTo(e.r * 0.45, e.r * 0.35); c.stroke();
        // horns
        c.fillStyle = '#e8d9b0';
        c.beginPath();
        c.moveTo(-e.r * 0.7, -e.r * 0.4);
        c.lineTo(-e.r * 1.25, -e.r * 0.95);
        c.lineTo(-e.r * 0.45, -e.r * 0.75);
        c.closePath();
        c.moveTo(e.r * 0.7, -e.r * 0.4);
        c.lineTo(e.r * 1.25, -e.r * 0.95);
        c.lineTo(e.r * 0.45, -e.r * 0.75);
        c.closePath();
        c.fill();
        c.fillStyle = '#ff5d5d';
        c.beginPath();
        c.arc(-e.r * 0.3, -e.r * 0.1, 3, 0, TAU);
        c.arc(e.r * 0.3, -e.r * 0.1, 3, 0, TAU);
        c.fill();
        c.fillStyle = '#2b1616'; c.beginPath(); c.arc(0, e.r * 0.28, e.r * 0.28, 0.2, Math.PI - 0.2); c.fill();
        break;
      }
      case 'hexer': {
        const bobY = Math.sin(this.time * 3 + e.seed) * 2.5;
        c.fillStyle = '#261a34'; c.beginPath(); c.moveTo(-e.r * 0.95, e.r * 0.75); c.lineTo(0, -e.r); c.lineTo(e.r * 0.95, e.r * 0.75); c.closePath(); c.fill();
        c.fillStyle = col;
        c.beginPath();
        c.moveTo(0, -e.r);
        c.lineTo(e.r * 0.8, bobY);
        c.lineTo(0, e.r);
        c.lineTo(-e.r * 0.8, bobY);
        c.closePath();
        c.fill();
        c.strokeStyle = '#e6c2ff'; c.globalAlpha = 0.5; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, -e.r * 0.65); c.lineTo(0, e.r * 0.65); c.moveTo(-e.r * 0.4, e.r * 0.2); c.lineTo(e.r * 0.4, e.r * 0.2); c.stroke(); c.globalAlpha = 1;
        c.fillStyle = '#1c1226';
        c.beginPath();
        c.arc(0, -e.r * 0.25, e.r * 0.45, 0, TAU);
        c.fill();
        c.fillStyle = '#d0b3ff';
        c.beginPath();
        c.arc(-3, -e.r * 0.28, 2, 0, TAU);
        c.arc(3, -e.r * 0.28, 2, 0, TAU);
        c.fill();
        this.drawGlow(c, 0, -e.r - 12 + bobY, 12, def.color, 0.8);
        c.fillStyle = def.color;
        c.beginPath();
        c.arc(0, -e.r - 12 + bobY, 4, 0, TAU);
        c.fill();
        c.strokeStyle = '#6f4b85'; c.lineWidth = 2; c.beginPath(); c.moveTo(-e.r * 0.68, e.r * 0.6); c.lineTo(-e.r * 1.05, -e.r * 0.72 + bobY); c.stroke();
        break;
      }
      case 'mage': {
        const bobY = Math.sin(this.time * 4 + e.seed) * 3;
        // tattered robe
        c.fillStyle = mixHex(def.color, '#0a1420', 0.55);
        c.beginPath(); c.moveTo(-e.r, e.r); c.lineTo(-e.r * 0.3, -e.r * 0.9); c.lineTo(e.r * 0.3, -e.r * 0.9); c.lineTo(e.r, e.r); c.closePath(); c.fill();
        // hood
        c.fillStyle = col;
        c.beginPath(); c.arc(0, -e.r * 0.35 + bobY, e.r * 0.62, 0, TAU); c.fill();
        c.fillStyle = '#0a1420';
        c.beginPath(); c.arc(0, -e.r * 0.3 + bobY, e.r * 0.4, 0, TAU); c.fill();
        // burning eyes
        c.fillStyle = '#dff4ff';
        c.beginPath(); c.arc(-e.r * 0.16, -e.r * 0.32 + bobY, 2.2, 0, TAU); c.arc(e.r * 0.16, -e.r * 0.32 + bobY, 2.2, 0, TAU); c.fill();
        // staff with orb
        c.strokeStyle = '#5a4432'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(e.r * 0.7, e.r * 0.8); c.lineTo(e.r * 1.0, -e.r * 0.9 + bobY); c.stroke();
        this.drawGlow(c, e.r * 1.0, -e.r * 0.95 + bobY, 12, def.color, 0.8);
        c.fillStyle = '#ffffff';
        c.beginPath(); c.arc(e.r * 1.0, -e.r * 0.95 + bobY, 3.6, 0, TAU); c.fill();
        break;
      }
      case 'demon': {
        c.rotate(e.faceA);
        // bulky horned body
        c.fillStyle = mixHex(def.color, '#200808', 0.4);
        c.beginPath(); c.ellipse(0, 2, e.r * 1.05, e.r * 0.9, 0, 0, TAU); c.fill();
        c.fillStyle = col;
        c.beginPath(); c.ellipse(0, 0, e.r * 0.9, e.r * 0.75, 0, 0, TAU); c.fill();
        // curved horns
        c.strokeStyle = '#f2e3c2'; c.lineWidth = 4; c.lineCap = 'round';
        c.beginPath(); c.moveTo(-e.r * 0.5, -e.r * 0.5); c.quadraticCurveTo(-e.r * 1.1, -e.r * 0.9, -e.r * 1.0, -e.r * 1.4); c.stroke();
        c.beginPath(); c.moveTo(e.r * 0.5, -e.r * 0.5); c.quadraticCurveTo(e.r * 1.1, -e.r * 0.9, e.r * 1.0, -e.r * 1.4); c.stroke();
        // molten cracks
        c.strokeStyle = '#ffd24a'; c.lineWidth = 1.6; c.globalAlpha = 0.8;
        c.beginPath(); c.moveTo(-e.r * 0.4, 0); c.lineTo(0, e.r * 0.2); c.lineTo(e.r * 0.35, -e.r * 0.1); c.stroke(); c.globalAlpha = 1;
        // eyes
        c.fillStyle = '#ffe36b';
        c.beginPath(); c.arc(-e.r * 0.28, -e.r * 0.2, 3, 0, TAU); c.arc(e.r * 0.28, -e.r * 0.2, 3, 0, TAU); c.fill();
        break;
      }
      case 'wraith': {
        const flick = 0.55 + Math.sin(this.time * 9 + e.seed) * 0.25;
        c.globalAlpha = flick;
        c.fillStyle = col;
        c.beginPath();
        c.moveTo(0, -e.r * 1.2);
        c.quadraticCurveTo(e.r, -e.r * 0.4, e.r * 0.7, e.r);
        c.lineTo(e.r * 0.3, e.r * 0.6); c.lineTo(0, e.r * 1.05); c.lineTo(-e.r * 0.3, e.r * 0.6); c.lineTo(-e.r * 0.7, e.r);
        c.quadraticCurveTo(-e.r, -e.r * 0.4, 0, -e.r * 1.2);
        c.closePath(); c.fill();
        c.fillStyle = '#0d0a1a';
        c.beginPath(); c.arc(-e.r * 0.22, -e.r * 0.35, e.r * 0.2, 0, TAU); c.arc(e.r * 0.22, -e.r * 0.35, e.r * 0.2, 0, TAU); c.fill();
        c.fillStyle = '#e8e2ff';
        c.beginPath(); c.arc(-e.r * 0.22, -e.r * 0.35, 2, 0, TAU); c.arc(e.r * 0.22, -e.r * 0.35, 2, 0, TAU); c.fill();
        c.globalAlpha = 1;
        break;
      }
      case 'golem': {
        // massive stone slabs
        c.fillStyle = mixHex(def.color, '#1a2029', 0.5);
        c.fillRect(-e.r * 0.9, -e.r * 0.7, e.r * 1.8, e.r * 1.5);
        c.fillStyle = col;
        c.fillRect(-e.r * 0.75, -e.r * 0.55, e.r * 1.5, e.r * 1.2);
        // core
        const pulse = 1 + Math.sin(this.time * 4 + e.seed) * 0.2;
        this.drawGlow(c, 0, 0, 16 * pulse, '#ffb36b', 0.7);
        c.fillStyle = '#ffb36b';
        c.beginPath(); c.arc(0, 0, 6 * pulse, 0, TAU); c.fill();
        // cracks
        c.strokeStyle = mixHex(def.color, '#000000', 0.45); c.lineWidth = 2;
        c.beginPath(); c.moveTo(-e.r * 0.75, -e.r * 0.2); c.lineTo(e.r * 0.75, -e.r * 0.1); c.moveTo(-e.r * 0.4, -e.r * 0.55); c.lineTo(-e.r * 0.3, e.r * 0.65); c.stroke();
        // brow eyes
        c.fillStyle = '#ff5d5d';
        c.beginPath(); c.arc(-e.r * 0.3, -e.r * 0.38, 2.8, 0, TAU); c.arc(e.r * 0.3, -e.r * 0.38, 2.8, 0, TAU); c.fill();
        // telegraphed slam ring
        if (e.windT > 0) {
          c.strokeStyle = `rgba(255,120,80,${0.5 + Math.sin(this.time * 25) * 0.3})`;
          c.lineWidth = 3;
          c.beginPath(); c.arc(0, 0, e.r + 34, 0, TAU); c.stroke();
        }
        break;
      }
      case 'dragon': {
        c.rotate(e.faceA);
        const flap = Math.sin(this.time * 6 + e.seed) * 0.5;
        // wings
        c.fillStyle = mixHex(def.color, '#3d1505', 0.45);
        for (const s of [-1, 1]) {
          c.save();
          c.scale(1, s);
          c.beginPath();
          c.moveTo(0, 0);
          c.quadraticCurveTo(e.r * 0.4, e.r * (1.3 + flap * 0.4), e.r * 1.5, e.r * (0.9 + flap * 0.5));
          c.quadraticCurveTo(e.r * 0.9, e.r * 0.5, e.r * 0.7, 0);
          c.closePath(); c.fill();
          c.restore();
        }
        // serpentine body
        c.fillStyle = col;
        c.beginPath(); c.ellipse(0, 0, e.r * 1.1, e.r * 0.62, 0, 0, TAU); c.fill();
        c.fillStyle = mixHex(def.color, '#fff3c2', 0.45);
        c.beginPath(); c.ellipse(e.r * 0.15, e.r * 0.18, e.r * 0.7, e.r * 0.3, 0, 0, TAU); c.fill();
        // horns + maw glow
        c.fillStyle = '#ffe9c4';
        c.beginPath(); c.moveTo(e.r * 0.7, -e.r * 0.3); c.lineTo(e.r * 1.25, -e.r * 0.6); c.lineTo(e.r * 0.9, -e.r * 0.15); c.closePath(); c.fill();
        this.drawGlow(c, e.r * 1.05, 0, 14, '#ffcf5a', 0.8);
        c.fillStyle = '#fff3c2';
        c.beginPath(); c.arc(e.r * 0.55, -e.r * 0.12, 2.6, 0, TAU); c.fill();
        break;
      }
      case 'boss': {
        const v = e.variant ?? 0;
        c.rotate(Math.sin(this.time * 1.4) * 0.05);
        // crown spikes in boss color
        c.fillStyle = mixHex(bossCol, '#1a0d0d', 0.35);
        const spikes = 8;
        for (let i = 0; i < spikes; i++) {
          const a = (i / spikes) * TAU + this.time * 0.4;
          c.save();
          c.rotate(a);
          c.beginPath();
          c.moveTo(e.r * 0.85, -e.r * 0.22);
          c.lineTo(e.r * 1.35, 0);
          c.lineTo(e.r * 0.85, e.r * 0.22);
          c.closePath();
          c.fill();
          c.restore();
        }
        c.fillStyle = col;
        c.beginPath();
        c.arc(0, 0, e.r, 0, TAU);
        c.fill();
        c.strokeStyle = mixHex(bossCol, '#000000', 0.5);
        c.lineWidth = 4;
        c.stroke();
        // variant sigil ring
        c.strokeStyle = 'rgba(255,255,255,0.45)';
        c.lineWidth = 2;
        c.setLineDash(v % 2 === 0 ? [] : [8, 6]);
        c.beginPath();
        c.arc(0, 0, e.r * 0.62, 0, TAU);
        c.stroke();
        c.setLineDash([]);
        // variant cores: serpent slits / khagan war paint / hollow crown / eclipse eye / glass facets
        if (v === 0) {
          c.strokeStyle = '#0b2b26'; c.lineWidth = 3;
          for (let i = -1; i <= 1; i++) {
            c.beginPath(); c.moveTo(i * 12 - 6, -8); c.lineTo(i * 12 + 6, 10); c.stroke();
          }
          c.fillStyle = '#eafff5';
          c.beginPath(); c.ellipse(-e.r * 0.28, -e.r * 0.2, 6, 3.4, 0.3, 0, TAU); c.ellipse(e.r * 0.28, -e.r * 0.2, 6, 3.4, -0.3, 0, TAU); c.fill();
        } else if (v === 1) {
          c.fillStyle = '#2b0d08';
          c.beginPath(); c.moveTo(-e.r * 0.5, -e.r * 0.25); c.lineTo(e.r * 0.5, -e.r * 0.25); c.lineTo(0, e.r * 0.1); c.closePath(); c.fill();
          c.fillStyle = '#ffd24a';
          c.beginPath(); c.arc(-e.r * 0.25, -e.r * 0.12, 4, 0, TAU); c.arc(e.r * 0.25, -e.r * 0.12, 4, 0, TAU); c.fill();
        } else if (v === 2) {
          c.strokeStyle = '#e8fbff'; c.lineWidth = 2.5;
          c.beginPath(); c.moveTo(-16, -e.r * 0.45); c.lineTo(-8, -e.r * 0.7); c.lineTo(0, -e.r * 0.45); c.lineTo(8, -e.r * 0.7); c.lineTo(16, -e.r * 0.45); c.stroke();
          c.fillStyle = '#0d2433';
          c.beginPath(); c.arc(-e.r * 0.28, 0, 5, 0, TAU); c.arc(e.r * 0.28, 0, 5, 0, TAU); c.fill();
          c.fillStyle = '#bff1ff';
          c.beginPath(); c.arc(-e.r * 0.28, 0, 2.2, 0, TAU); c.arc(e.r * 0.28, 0, 2.2, 0, TAU); c.fill();
        } else if (v === 3) {
          c.fillStyle = '#1d1503';
          c.beginPath(); c.arc(0, -e.r * 0.1, e.r * 0.3, 0, TAU); c.fill();
          c.fillStyle = '#ffe9a8';
          c.beginPath(); c.arc(0, -e.r * 0.1, e.r * 0.3, -0.6, 0.9); c.lineTo(0, -e.r * 0.1); c.closePath(); c.fill();
          c.fillStyle = '#1d1503';
          c.beginPath(); c.arc(-e.r * 0.4, e.r * 0.3, 3, 0, TAU); c.arc(e.r * 0.4, e.r * 0.3, 3, 0, TAU); c.fill();
        } else {
          c.strokeStyle = 'rgba(255,255,255,0.6)'; c.lineWidth = 1.6;
          for (let i = 0; i < 3; i++) {
            const a = (i / 3) * Math.PI;
            c.beginPath(); c.moveTo(Math.cos(a) * -e.r * 0.55, Math.sin(a) * -e.r * 0.55); c.lineTo(Math.cos(a) * e.r * 0.55, Math.sin(a) * e.r * 0.55); c.stroke();
          }
          c.fillStyle = '#3d2c10';
          c.beginPath(); c.arc(-e.r * 0.22, -e.r * 0.15, 4.5, 0, TAU); c.arc(e.r * 0.22, -e.r * 0.15, 4.5, 0, TAU); c.arc(0, e.r * 0.28, 3.4, 0, TAU); c.fill();
        }
        break;
      }
    }
    c.restore();

    // frozen crystals
    if (e.frozen > 0) {
      c.fillStyle = 'rgba(191,230,255,0.85)';
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * TAU + 0.5;
        const fx = e.x + Math.cos(a) * e.r * 0.7;
        const fy = e.y + Math.sin(a) * e.r * 0.7 - 4;
        c.beginPath();
        c.moveTo(fx, fy - 6);
        c.lineTo(fx + 4, fy + 3);
        c.lineTo(fx - 4, fy + 3);
        c.closePath();
        c.fill();
      }
    }

    // hp bar + nameplate
    if (e.spawn <= 0 && e.hp < e.maxHp) {
      const w = e.r * 2;
      const pct = clamp(e.hp / e.maxHp, 0, 1);
      c.fillStyle = 'rgba(0,0,0,0.6)';
      c.fillRect(e.x - w / 2, e.y - e.r - 12, w, 4.5);
      c.fillStyle = pct > 0.5 ? '#7ddb6f' : pct > 0.25 ? '#ffd24a' : '#ff6b5d';
      c.fillRect(e.x - w / 2, e.y - e.r - 12, w * pct, 4.5);
    }
    if (e.elite || e.kind === 'boss') {
      c.font = '700 11px Cinzel, Georgia, serif';
      c.textAlign = 'center';
      c.fillStyle = 'rgba(0,0,0,0.7)';
      c.fillText(e.name, e.x + 1, e.y - e.r - 17);
      c.fillStyle = '#ffd97a';
      c.fillText(e.name, e.x, e.y - e.r - 18);
    }
  }

  private drawPlayer(c: CanvasRenderingContext2D) {
    const p = this.p;
    if (!p) return;
    const cls = this.classDef;
    if (p.dead) return;

    // dash ghosts
    for (const g of this.ghosts) {
      c.globalAlpha = g.a * 0.5;
      c.fillStyle = cls.color;
      c.beginPath();
      c.arc(g.x, g.y, p.r * 0.9, 0, TAU);
      c.fill();
    }
    c.globalAlpha = 1;

    // storm aura
    if (p.stormT > 0) {
      c.save();
      c.strokeStyle = 'rgba(230,194,106,0.35)';
      c.lineWidth = 3;
      c.setLineDash([16, 14]);
      c.lineDashOffset = -this.time * 90;
      c.beginPath();
      c.arc(p.x, p.y, 168, 0, TAU);
      c.stroke();
      c.setLineDash([]);
      this.drawGlow(c, p.x, p.y, 150, '#e6c26a', 0.12);
      c.restore();
    }

    // legacy ability visuals
    if (this.decoy) {
      const d0 = this.decoy;
      const k = d0.t / d0.dur;
      c.save();
      c.globalAlpha = 0.55 + Math.sin(this.time * 9) * 0.15;
      this.drawGlow(c, d0.x, d0.y, 46, '#e6c26a', 0.5);
      c.fillStyle = 'rgba(230,194,106,0.55)';
      c.beginPath();
      c.arc(d0.x, d0.y, p.r, 0, TAU);
      c.fill();
      c.strokeStyle = '#ffe9a8';
      c.lineWidth = 2;
      c.setLineDash([4, 5]);
      c.beginPath();
      c.arc(d0.x, d0.y, p.r + 8 + k * 6, 0, TAU);
      c.stroke();
      c.setLineDash([]);
      c.restore();
    }
    if (p.wardT > 0) {
      c.save();
      c.strokeStyle = `rgba(191,230,255,${0.55 + Math.sin(this.time * 8) * 0.2})`;
      c.lineWidth = 4;
      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU + this.time * 0.8;
        const x = p.x + Math.cos(a) * (p.r + 16);
        const y = p.y + Math.sin(a) * (p.r + 16);
        if (i === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.closePath();
      c.stroke();
      this.drawGlow(c, p.x, p.y, 44, '#6fb7ff', 0.35);
      c.restore();
    }
    if (p.riteT > 0) this.drawGlow(c, p.x, p.y, 48 + Math.sin(this.time * 10) * 5, '#ff6b3c', 0.5);
    if (p.tideT > 0) {
      c.save();
      c.strokeStyle = 'rgba(85,217,232,0.5)';
      c.lineWidth = 2.5;
      c.beginPath();
      c.arc(p.x, p.y, p.r + 12 + Math.sin(this.time * 5) * 3, 0, TAU);
      c.stroke();
      c.restore();
    }
    if (p.focusT > 0) {
      c.save();
      c.strokeStyle = 'rgba(223,244,255,0.75)';
      c.lineWidth = 1.5;
      c.setLineDash([2, 6]);
      c.beginPath();
      c.arc(p.x, p.y, 155, 0, TAU);
      c.stroke();
      c.setLineDash([]);
      c.restore();
    }
    if (p.stasisT > 0) {
      c.save();
      c.strokeStyle = 'rgba(182,140,255,0.6)';
      c.lineWidth = 3;
      c.beginPath();
      c.arc(p.x, p.y, 40 + (2 - p.stasisT) * 900, 0, TAU);
      c.stroke();
      c.restore();
    }
    if (p.tempestT > 0) {
      c.save();
      c.strokeStyle = `rgba(110,243,255,${0.5 + Math.sin(this.time * 14) * 0.25})`;
      c.lineWidth = 2.5;
      c.beginPath();
      c.arc(p.x, p.y, p.r + 14 + Math.sin(this.time * 10) * 4, 0, TAU);
      c.stroke();
      this.drawGlow(c, p.x, p.y, 52, '#6ef3ff', 0.35);
      c.restore();
    }
    if (p.pyreT > 0) {
      this.drawGlow(c, p.x, p.y, 60 + Math.sin(this.time * 9) * 7, '#ff5a3c', 0.5);
      c.save();
      c.strokeStyle = 'rgba(255,196,107,0.6)';
      c.lineWidth = 2.5;
      c.setLineDash([10, 7]);
      c.lineDashOffset = -this.time * 60;
      c.beginPath();
      c.arc(p.x, p.y, 170, 0, TAU);
      c.stroke();
      c.setLineDash([]);
      c.restore();
    }

    // buff aura
    if (p.buffT > 0) {
      const pulse = 1 + Math.sin(this.time * 6) * 0.12;
      this.drawGlow(c, p.x, p.y, 40 * pulse, '#ffd97a', 0.4);
    }

    const moving = Math.hypot(p.vx, p.vy) > 30;
    const bob = moving ? Math.sin(p.runT * 11) * 1.8 : Math.sin(this.time * 2.4) * 0.8;

    // shadow
    c.fillStyle = 'rgba(0,0,0,0.45)';
    c.beginPath();
    c.ellipse(p.x, p.y + p.r * 0.9, p.r * 1.1, p.r * 0.4, 0, 0, TAU);
    c.fill();

    c.save();
    if (p.iFrames > 0 && p.dashT <= 0) {
      c.globalAlpha = 0.55 + 0.45 * Math.sin(this.time * 42);
    }
    c.translate(p.x, p.y + bob);

    // weapon (under body for behind-look on backswing)
    const weaponAng = this.weaponAngle();
    this.drawWeapon(c, weaponAng);

    // Class silhouettes are drawn facing right, then rotated into the hero's direction.
    c.save();
    c.rotate(p.facing);
    const stride = moving ? Math.sin(p.runT * 11) * 2 : 0;
    // A shared trailing cloak gives each hero a readable moving silhouette.
    c.fillStyle = mixHex(cls.color, '#090c13', 0.62);
    c.beginPath();
    c.moveTo(-3, -12);
    c.quadraticCurveTo(-19, -9 + stride, -18, 0);
    c.quadraticCurveTo(-17, 11 - stride, -2, 13);
    c.quadraticCurveTo(-10, 2, -3, -12);
    c.closePath();
    c.fill();

    if (cls.id === 'kensei') {
      // Layered traveling kimono, headband, and topknot.
      c.fillStyle = '#3d1828';
      c.beginPath();
      c.moveTo(-7, -11); c.lineTo(7, -11); c.lineTo(12, 0); c.lineTo(5, 12); c.lineTo(-8, 10); c.closePath();
      c.fill();
      c.fillStyle = cls.color;
      c.beginPath();
      c.moveTo(-3, -12); c.lineTo(8, -10); c.lineTo(11, 0); c.lineTo(4, 10); c.lineTo(-6, 8); c.closePath();
      c.fill();
      c.fillStyle = '#ffd9a0';
      c.fillRect(-2, -10, 4, 19);
      c.fillStyle = '#24111a';
      c.fillRect(-4, -1, 12, 3);
      c.fillStyle = '#f3c494';
      c.beginPath(); c.arc(10, 0, 7, 0, TAU); c.fill();
      c.fillStyle = '#18121c';
      c.beginPath(); c.arc(8, -4, 7, Math.PI * 0.6, Math.PI * 1.72); c.fill();
      c.beginPath(); c.arc(4, -7, 3.4, 0, TAU); c.fill();
      c.strokeStyle = '#ffdfdf'; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(5, -2.5); c.lineTo(14, -2.5); c.stroke();
      c.fillStyle = '#ff6b6b'; c.fillRect(5, -7.5, 10, 2.2);
    } else if (cls.id === 'shieldthane') {
      // Broad rune-plate with a fur mantle and a horned iron helm.
      c.fillStyle = '#5a4432';
      c.beginPath(); c.ellipse(-1, 0, 14, 13, 0, 0, TAU); c.fill();
      c.fillStyle = '#49627d';
      c.beginPath();
      c.moveTo(-7, -12); c.lineTo(7, -12); c.lineTo(13, -5); c.lineTo(11, 8); c.lineTo(-8, 10); c.lineTo(-12, 2); c.closePath();
      c.fill();
      c.strokeStyle = '#b9d8f5'; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(-4, -9); c.lineTo(-4, 8); c.moveTo(2, -10); c.lineTo(2, 9); c.moveTo(8, -7); c.lineTo(8, 6); c.stroke();
      c.fillStyle = '#26384e';
      c.beginPath(); c.arc(10, 0, 8, 0, TAU); c.fill();
      c.strokeStyle = '#dbeeff'; c.lineWidth = 2; c.stroke();
      c.fillStyle = '#dbeeff';
      c.beginPath(); c.moveTo(5, -5); c.lineTo(1, -10); c.lineTo(8, -7); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(13, -6); c.lineTo(17, -11); c.lineTo(17, -4); c.closePath(); c.fill();
      c.fillStyle = '#172331'; c.fillRect(6, -3, 9, 5);
      c.fillStyle = '#6fb7ff'; c.fillRect(11, -2, 2, 1.4);
    } else if (cls.id === 'jaguar') {
      // Feather mantle and a jaguar mask with obsidian spots.
      c.fillStyle = '#1d4b3b';
      for (let i = -2; i <= 2; i++) {
        c.beginPath(); c.ellipse(-7 + i * 3, i * 2.2, 7, 3.8, i * 0.25, 0, TAU); c.fill();
      }
      c.fillStyle = '#c07024';
      c.beginPath();
      c.moveTo(-6, -12); c.lineTo(7, -12); c.lineTo(12, -2); c.lineTo(7, 11); c.lineTo(-8, 9); c.lineTo(-10, -3); c.closePath();
      c.fill();
      c.fillStyle = '#2e281c';
      [[-2, -7], [3, -3], [-4, 2], [2, 6], [7, 2]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 1.8, 0, TAU); c.fill(); });
      c.fillStyle = '#d99b3d';
      c.beginPath(); c.arc(10, 0, 8, 0, TAU); c.fill();
      c.fillStyle = '#2a2418';
      c.beginPath(); c.moveTo(4, -5); c.lineTo(7, -9); c.lineTo(10, -5); c.closePath(); c.moveTo(10, -5); c.lineTo(14, -9); c.lineTo(17, -4); c.closePath(); c.fill();
      c.fillStyle = '#d6ff72'; c.beginPath(); c.arc(11, -2.5, 1.6, 0, TAU); c.arc(15, -2.5, 1.6, 0, TAU); c.fill();
      c.strokeStyle = '#2a2418'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(11, 3); c.lineTo(17, 3); c.stroke();
    } else if (cls.id === 'tidecaller') {
      // Nacre armor, a pearl crown, and a translucent mantle that reads at speed.
      c.fillStyle = '#244f61';
      c.beginPath(); c.moveTo(-8, -11); c.lineTo(6, -12); c.lineTo(12, 5); c.lineTo(4, 12); c.lineTo(-10, 8); c.closePath(); c.fill();
      c.fillStyle = '#55d9e8';
      c.beginPath(); c.moveTo(-4, -10); c.lineTo(8, -8); c.lineTo(9, 7); c.lineTo(-6, 8); c.closePath(); c.fill();
      c.strokeStyle = '#d7a6ff'; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(-3, -8); c.lineTo(3, 6); c.moveTo(4, -8); c.lineTo(-2, 6); c.stroke();
      c.fillStyle = '#d8b8e8'; c.beginPath(); c.arc(10, 0, 7.5, 0, TAU); c.fill();
      c.fillStyle = '#55d9e8'; c.beginPath(); c.arc(8, -8, 3, 0, TAU); c.arc(14, -7, 2.4, 0, TAU); c.fill();
      c.strokeStyle = 'rgba(125,235,245,0.8)'; c.lineWidth = 2; c.beginPath(); c.moveTo(-7, -10); c.quadraticCurveTo(-21, -2, -8, 8); c.stroke();
      c.fillStyle = '#1a7891'; c.beginPath(); c.arc(11, -2, 1.6, 0, TAU); c.arc(15, -2, 1.6, 0, TAU); c.fill();
    } else if (cls.id === 'riftblade') {
      // Angular void leathers and a fractured star-mask.
      c.fillStyle = '#271b45';
      c.beginPath(); c.moveTo(-10, -13); c.lineTo(4, -12); c.lineTo(12, 2); c.lineTo(4, 13); c.lineTo(-12, 8); c.closePath(); c.fill();
      c.strokeStyle = '#b68cff'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-8, -8); c.lineTo(7, 8); c.moveTo(5, -8); c.lineTo(-6, 7); c.stroke();
      c.fillStyle = '#e8d8ff'; c.beginPath(); c.moveTo(4, -10); c.lineTo(16, -4); c.lineTo(12, 7); c.lineTo(3, 4); c.closePath(); c.fill();
      c.fillStyle = '#25183d'; c.beginPath(); c.moveTo(7, -5); c.lineTo(16, -3); c.lineTo(10, 0); c.closePath(); c.fill();
      c.fillStyle = '#b68cff'; c.beginPath(); c.arc(12, -2, 1.8, 0, TAU); c.fill();
      c.strokeStyle = '#d3b5ff'; c.lineWidth = 2; c.beginPath(); c.moveTo(-6, -13); c.lineTo(-1, -19); c.lineTo(3, -12); c.stroke();
    } else if (cls.id === 'stormwarden') {
      // Copper coil plate crackling with stormlight, lightning-crest helm.
      c.fillStyle = '#1d3a44';
      c.beginPath(); c.moveTo(-8, -12); c.lineTo(7, -12); c.lineTo(13, 0); c.lineTo(6, 12); c.lineTo(-9, 10); c.closePath(); c.fill();
      c.strokeStyle = '#6ef3ff'; c.lineWidth = 1.6;
      c.beginPath(); c.moveTo(-5, -9); c.lineTo(-1, -2); c.lineTo(-5, 5); c.moveTo(3, -9); c.lineTo(7, -1); c.lineTo(3, 7); c.stroke();
      c.fillStyle = '#fff6a8';
      c.beginPath(); c.moveTo(8, -13); c.lineTo(12, -19); c.lineTo(15, -11); c.closePath(); c.fill();
      c.fillStyle = '#274b56'; c.beginPath(); c.arc(10, 0, 7.5, 0, TAU); c.fill();
      c.strokeStyle = '#bff6ff'; c.lineWidth = 1.6; c.stroke();
      c.fillStyle = '#bff6ff'; c.beginPath(); c.arc(11, -2.5, 1.7, 0, TAU); c.arc(15, -2.5, 1.7, 0, TAU); c.fill();
      c.strokeStyle = '#fff6a8'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(6, 4); c.lineTo(16, 4); c.stroke();
    } else if (cls.id === 'drakewarden') {
      // Ashen scale-mail with a furnace core and drake-horn helm.
      c.fillStyle = '#4a1a10';
      c.beginPath(); c.moveTo(-9, -12); c.lineTo(6, -13); c.lineTo(13, 2); c.lineTo(5, 13); c.lineTo(-11, 9); c.closePath(); c.fill();
      c.fillStyle = '#7a2b18';
      c.beginPath(); c.moveTo(-4, -10); c.lineTo(8, -9); c.lineTo(9, 8); c.lineTo(-7, 8); c.closePath(); c.fill();
      c.strokeStyle = '#ffc46b'; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(-4, -4); c.lineTo(8, -4); c.moveTo(-4, 2); c.lineTo(8, 2); c.stroke();
      const pulse = 1 + Math.sin(this.time * 5) * 0.2;
      this.drawGlow(c, 2, -1, 9 * pulse, '#ff5a3c', 0.7);
      c.fillStyle = '#ffd9a0'; c.beginPath(); c.arc(2, -1, 2.6 * pulse, 0, TAU); c.fill();
      c.fillStyle = '#2b120b'; c.beginPath(); c.arc(11, 0, 7.5, 0, TAU); c.fill();
      c.fillStyle = '#ffe9c4';
      c.beginPath(); c.moveTo(6, -5); c.lineTo(2, -11); c.lineTo(9, -8); c.closePath(); c.moveTo(14, -6); c.lineTo(18, -12); c.lineTo(18, -4); c.closePath(); c.fill();
      c.fillStyle = '#ff8a3d'; c.beginPath(); c.arc(11, -1.5, 1.8, 0, TAU); c.arc(15, -1.5, 1.8, 0, TAU); c.fill();
    } else {
      // Flowing desert robes, wrapped hood, and a luminous veil jewel.
      c.fillStyle = '#6e5630';
      c.beginPath();
      c.moveTo(-9, -12); c.lineTo(6, -12); c.lineTo(13, 10); c.lineTo(-13, 10); c.closePath(); c.fill();
      c.fillStyle = '#e6c26a';
      c.beginPath();
      c.moveTo(-4, -12); c.lineTo(7, -10); c.lineTo(10, 7); c.lineTo(-9, 7); c.closePath(); c.fill();
      c.fillStyle = '#54c9b4'; c.fillRect(-6, -1, 16, 2.6);
      c.fillStyle = '#c89362'; c.beginPath(); c.arc(10, 0, 7.5, 0, TAU); c.fill();
      c.fillStyle = '#e6c26a'; c.beginPath(); c.arc(9, -2, 8.5, Math.PI * 0.7, Math.PI * 1.9); c.fill();
      c.fillStyle = '#382c25'; c.fillRect(6, -1, 11, 4.5);
      c.fillStyle = '#54c9b4'; c.beginPath(); c.arc(12, -6, 2.2, 0, TAU); c.fill();
      this.drawGlow(c, 12, -6, 7, '#54c9b4', 0.6);
    }
    c.restore();

    // Shieldthane carries a layered round shield that swings independently from their stance.
    if (cls.id === 'shieldthane') {
      const sa = p.facing + 2.5;
      c.save();
      c.translate(Math.cos(sa) * (p.r + 7), Math.sin(sa) * (p.r + 7));
      c.fillStyle = '#2c3d55';
      c.beginPath(); c.arc(0, 0, 12, 0, TAU); c.fill();
      c.strokeStyle = '#cfe6ff'; c.lineWidth = 2; c.stroke();
      c.strokeStyle = '#6fb7ff'; c.lineWidth = 1.4;
      c.beginPath(); c.moveTo(-10, 0); c.lineTo(10, 0); c.moveTo(0, -10); c.lineTo(0, 10); c.stroke();
      c.fillStyle = '#dbeeff'; c.beginPath(); c.arc(0, 0, 3.3, 0, TAU); c.fill();
      c.restore();
    }
    c.restore();

    // hurt ring
    if (p.hurtT > 0) {
      c.strokeStyle = `rgba(255,90,90,${p.hurtT * 2})`;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(p.x, p.y, p.r + 8, 0, TAU);
      c.stroke();
    }
  }

  private weaponAngle(): number {
    const p = this.p!;
    const cls = this.classDef;
    if (p.swingT >= 0) {
      const prog = clamp(p.swingT / p.swingDur, 0, 1);
      const a0 = p.swingAim - cls.arc * 0.62;
      const sweep = cls.arc * 1.24;
      return a0 + sweep * easeOut(prog);
    }
    return p.facing + 0.55 + Math.sin(this.time * 2.4) * 0.06;
  }

  private drawWeapon(c: CanvasRenderingContext2D, ang: number) {
    const cls = this.classDef;
    const L = (cls.range + this.p!.rangeBonus) * 0.9;
    c.save();
    c.rotate(ang);
    c.translate(6, 0);
    switch (cls.id) {
      case 'kensei': {
        c.strokeStyle = 'rgba(255,107,107,0.45)';
        c.lineWidth = 7;
        c.beginPath();
        c.moveTo(8, 0);
        c.lineTo(L, 0);
        c.stroke();
        c.strokeStyle = '#eef3ff';
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(8, 0);
        c.lineTo(L, -3);
        c.stroke();
        c.fillStyle = '#8a6a22';
        c.fillRect(4, -4, 4, 8);
        break;
      }
      case 'shieldthane': {
        c.strokeStyle = '#c8a06a';
        c.lineWidth = 4;
        c.beginPath();
        c.moveTo(6, 0);
        c.lineTo(L * 0.78, 0);
        c.stroke();
        c.fillStyle = '#cfd8ea';
        c.beginPath();
        c.moveTo(L * 0.55, 0);
        c.quadraticCurveTo(L * 1.02, -L * 0.3, L * 0.95, -L * 0.02);
        c.quadraticCurveTo(L * 1.05, L * 0.12, L * 0.55, L * 0.14);
        c.closePath();
        c.fill();
        c.strokeStyle = '#6fb7ff';
        c.lineWidth = 1.5;
        c.stroke();
        break;
      }
      case 'jaguar': {
        c.strokeStyle = '#8a5a2a';
        c.lineWidth = 7;
        c.beginPath();
        c.moveTo(6, 0);
        c.lineTo(L * 0.88, 0);
        c.stroke();
        c.fillStyle = '#16211a';
        for (let i = 0; i < 5; i++) {
          const tx = L * 0.24 + i * L * 0.14;
          c.beginPath();
          c.moveTo(tx, -4.5);
          c.lineTo(tx + 6, -9.5);
          c.lineTo(tx + 10, -4.5);
          c.closePath();
          c.fill();
        }
        c.fillStyle = '#8ce07a';
        c.beginPath();
        c.arc(L * 0.88, 0, 3, 0, TAU);
        c.fill();
        break;
      }
      case 'tidecaller': {
        c.strokeStyle = '#d7a6ff'; c.lineWidth = 4;
        c.beginPath(); c.moveTo(7, 0); c.lineTo(L * 0.72, 0); c.stroke();
        c.strokeStyle = '#55d9e8'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(L * 0.62, 0); c.lineTo(L * 0.95, -10); c.moveTo(L * 0.62, 0); c.lineTo(L * 0.95, 0); c.moveTo(L * 0.62, 0); c.lineTo(L * 0.95, 10); c.stroke();
        c.fillStyle = '#d7a6ff'; c.beginPath(); c.arc(8, 0, 3.5, 0, TAU); c.fill();
        break;
      }
      case 'riftblade': {
        c.strokeStyle = 'rgba(182,140,255,0.42)'; c.lineWidth = 8;
        c.beginPath(); c.moveTo(7, 0); c.lineTo(L, -2); c.stroke();
        c.strokeStyle = '#e8d8ff'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(7, 0); c.lineTo(L, -2); c.stroke();
        c.strokeStyle = '#b68cff'; c.lineWidth = 1.5;
        c.beginPath(); c.moveTo(L * 0.45, -6); c.lineTo(L * 0.66, 4); c.moveTo(L * 0.68, -7); c.lineTo(L * 0.85, 3); c.stroke();
        break;
      }
      case 'stormwarden': {
        c.strokeStyle = '#8a6a4a'; c.lineWidth = 5;
        c.beginPath(); c.moveTo(6, 0); c.lineTo(L * 0.7, 0); c.stroke();
        c.fillStyle = '#3d5a66';
        c.beginPath(); c.moveTo(L * 0.62, -11); c.lineTo(L * 0.98, -11); c.lineTo(L * 0.98, 11); c.lineTo(L * 0.62, 11); c.closePath(); c.fill();
        c.strokeStyle = '#6ef3ff'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(L * 0.7, -11); c.lineTo(L * 0.78, 0); c.lineTo(L * 0.7, 11); c.stroke();
        c.fillStyle = '#fff6a8'; c.beginPath(); c.arc(L * 0.8, 0, 3, 0, TAU); c.fill();
        break;
      }
      case 'drakewarden': {
        c.strokeStyle = 'rgba(255,90,60,0.4)'; c.lineWidth = 9;
        c.beginPath(); c.moveTo(7, 0); c.lineTo(L, 0); c.stroke();
        c.fillStyle = '#c8b08a';
        c.beginPath(); c.moveTo(7, -4); c.lineTo(L * 0.98, -2); c.lineTo(L * 1.06, 0); c.lineTo(L * 0.98, 2); c.lineTo(7, 4); c.closePath(); c.fill();
        c.strokeStyle = '#ff5a3c'; c.lineWidth = 2;
        c.beginPath(); c.moveTo(L * 0.3, 0); c.lineTo(L * 0.95, 0); c.stroke();
        c.fillStyle = '#ffc46b'; c.beginPath(); c.arc(7, 0, 3.6, 0, TAU); c.fill();
        break;
      }
      default: {
        // sandseer khopesh
        c.strokeStyle = 'rgba(84,201,180,0.4)';
        c.lineWidth = 8;
        c.beginPath();
        c.moveTo(8, 0);
        c.quadraticCurveTo(L * 0.7, -4, L, -L * 0.16);
        c.stroke();
        c.strokeStyle = '#ffe9a8';
        c.lineWidth = 4;
        c.beginPath();
        c.moveTo(8, 0);
        c.quadraticCurveTo(L * 0.7, -4, L, -L * 0.16);
        c.stroke();
        c.fillStyle = '#54c9b4';
        c.beginPath();
        c.arc(6, 0, 3.4, 0, TAU);
        c.fill();
      }
    }
    c.restore();
  }

  private drawShot(c: CanvasRenderingContext2D, s: Shot) {
    this.drawGlow(c, s.x, s.y, s.r * 3, s.color, 0.65);
    c.fillStyle = s.color;
    c.beginPath();
    c.arc(s.x, s.y, s.r, 0, TAU);
    c.fill();
    c.fillStyle = 'rgba(255,255,255,0.85)';
    c.beginPath();
    c.arc(s.x, s.y, s.r * 0.45, 0, TAU);
    c.fill();
  }

  private drawSlash(c: CanvasRenderingContext2D, s: Slash) {
    const k = s.t / s.dur;
    const alpha = 1 - k;
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.translate(s.x, s.y);
    c.strokeStyle = rgba(s.color.startsWith('#') ? s.color : '#ffffff', alpha * 0.8);
    c.lineWidth = (1 - k) * 12 + 3;
    c.lineCap = 'round';
    c.beginPath();
    c.arc(0, 0, s.r * (0.8 + k * 0.25), s.a0, s.a0 + (s.a1 - s.a0) * Math.min(1, k * 1.8));
    c.stroke();
    c.strokeStyle = `rgba(255,255,255,${alpha * 0.5})`;
    c.lineWidth = (1 - k) * 5 + 1;
    c.beginPath();
    c.arc(0, 0, s.r * (0.8 + k * 0.25), s.a0, s.a0 + (s.a1 - s.a0) * Math.min(1, k * 1.8));
    c.stroke();
    c.restore();
  }

  private drawParticles(c: CanvasRenderingContext2D) {
    for (const pt of this.parts) {
      const k = pt.t / pt.dur;
      const alpha = 1 - k;
      if (pt.kind === 'dot') {
        c.globalAlpha = alpha;
        c.fillStyle = pt.color;
        c.beginPath();
        c.arc(pt.x, pt.y, pt.size * (1 - k * 0.5), 0, TAU);
        c.fill();
      } else if (pt.kind === 'shard') {
        c.globalAlpha = alpha;
        c.fillStyle = pt.color;
        c.save();
        c.translate(pt.x, pt.y);
        c.rotate(pt.rot);
        c.beginPath();
        c.moveTo(0, -pt.size);
        c.lineTo(pt.size * 0.8, pt.size);
        c.lineTo(-pt.size * 0.8, pt.size);
        c.closePath();
        c.fill();
        c.restore();
      } else if (pt.kind === 'petal') {
        c.globalAlpha = alpha;
        c.fillStyle = pt.color;
        c.save();
        c.translate(pt.x, pt.y);
        c.rotate(pt.rot);
        c.beginPath();
        c.ellipse(0, 0, pt.size, pt.size * 0.5, 0, 0, TAU);
        c.fill();
        c.restore();
      }
    }
    c.globalAlpha = 1;
    c.save();
    c.globalCompositeOperation = 'lighter';
    for (const pt of this.parts) {
      const k = pt.t / pt.dur;
      const alpha = 1 - k;
      if (pt.kind === 'spark') {
        c.globalAlpha = alpha;
        c.strokeStyle = pt.color;
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(pt.x, pt.y);
        c.lineTo(pt.x - pt.vx * 0.035, pt.y - pt.vy * 0.035);
        c.stroke();
      } else if (pt.kind === 'ring') {
        c.globalAlpha = alpha * 0.9;
        c.strokeStyle = pt.color;
        c.lineWidth = (1 - k) * 5 + 1;
        c.beginPath();
        c.arc(pt.x, pt.y, pt.size + k * pt.size * 3.2, 0, TAU);
        c.stroke();
      }
    }
    c.restore();
    c.globalAlpha = 1;
  }

  private drawFloater(c: CanvasRenderingContext2D, f: Floater) {
    const k = f.t / f.dur;
    const alpha = k > 0.6 ? 1 - (k - 0.6) / 0.4 : 1;
    const rise = f.t * 55;
    const scale = f.crit && f.t < 0.12 ? 1 + (0.12 - f.t) * 5 : 1;
    c.save();
    c.globalAlpha = alpha;
    c.translate(f.x, f.y - rise);
    c.scale(scale, scale);
    c.font = f.crit ? `900 ${f.size}px Cinzel, Georgia, serif` : `800 ${f.size}px "Alegreya Sans", sans-serif`;
    c.textAlign = 'center';
    c.lineWidth = 3;
    c.strokeStyle = 'rgba(0,0,0,0.65)';
    c.strokeText(f.text, 0, 0);
    c.fillStyle = f.color;
    c.fillText(f.text, 0, 0);
    c.restore();
  }
}
```

## File: `src/components/ClassEmblem.tsx`

```tsx
interface Props {
  classId: string;
  size?: number;
  className?: string;
}

export function ClassEmblem({ classId, size = 48, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    className,
  };
  switch (classId) {
    case 'kensei':
      return (
        <svg {...common}>
          <circle cx="32" cy="25" r="7" fill="currentColor" opacity="0.35" stroke="none" />
          <path d="M9 20 Q32 11 55 20" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 27 H50" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 27 V53 M44 27 V53" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 27 V37" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 53 H27 M37 53 H52" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        </svg>
      );
    case 'shieldthane':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="21" strokeWidth="3.5" />
          <circle cx="32" cy="32" r="12.5" strokeWidth="2.5" opacity="0.85" />
          <path d="M32 11 V53 M11 32 H53" strokeWidth="2.5" opacity="0.6" />
          <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
          <circle cx="32" cy="14.5" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="32" cy="49.5" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="32" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="49.5" cy="32" r="1.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'jaguar':
      return (
        <svg {...common}>
          <circle cx="32" cy="15" r="5.5" fill="currentColor" opacity="0.4" strokeWidth="2.5" />
          <path d="M32 4 V8 M41.5 7.5 L39.5 10.5 M22.5 7.5 L24.5 10.5 M45 15 H41 M23 15 H19" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 56 V49 H21 V42 H26.5 V35 H37.5 V42 H43 V49 H49 V56 Z" strokeWidth="3" strokeLinejoin="round" />
          <path d="M29 56 V49 H35 V56" strokeWidth="2.5" opacity="0.8" />
        </svg>
      );
    case 'tidecaller':
      return (
        <svg {...common}>
          <path d="M32 4 C25 13 18 19 18 29 A14 14 0 0 0 46 29 C46 19 39 13 32 4Z" strokeWidth="3" />
          <path d="M10 43 Q20 35 32 43 T54 43" strokeWidth="3" strokeLinecap="round" />
          <path d="M17 51 Q25 45 32 51 T47 51" strokeWidth="2.5" opacity="0.7" />
          <circle cx="32" cy="27" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'riftblade':
      return (
        <svg {...common}>
          <path d="M35 5 L27 27 L34 31 L25 58" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 17 L23 25 M50 17 L41 25 M14 47 L23 39 M50 47 L41 39" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <circle cx="32" cy="31" r="7" strokeWidth="2" strokeDasharray="2 3" />
        </svg>
      );
    case 'stormwarden':
      return (
        <svg {...common}>
          <path d="M36 4 L20 34 H30 L26 60 L46 26 H35 L40 4 Z" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="22" strokeWidth="2" opacity="0.4" strokeDasharray="3 5" />
        </svg>
      );
    case 'drakewarden':
      return (
        <svg {...common}>
          <path d="M32 56 C20 44 14 32 18 16 C24 24 28 26 32 26 C36 26 40 24 46 16 C50 32 44 44 32 56 Z" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="32" cy="36" r="5" fill="currentColor" opacity="0.4" stroke="none" />
          <path d="M26 12 L32 4 L38 12" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M44 12 A24 24 0 1 0 44 52 A21 21 0 0 1 44 12 Z" strokeWidth="3" strokeLinejoin="round" />
          <path d="M8 57 Q18 49 30 57 T55 56" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path
            d="M50 18 L52.2 23 L57 25 L52.2 27 L50 32 L47.8 27 L43 25 L47.8 23 Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
  }
}
```

## File: `src/components/PowerIcon.tsx`

```tsx
interface Props {
  icon: string;
  size?: number;
  className?: string;
}

export function PowerIcon({ icon, size = 28, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    className,
  };
  switch (icon) {
    case 'blade':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M4 20 15.8 8.2M14 4.4l5.6 5.6M14.7 5.5l1.1-3 2.2 2.2 3-1.1-1.1 3 2.2 2.2-3 1.1" /><path d="m3 21 3.2-3.2" strokeWidth="3" /></svg>;
    case 'heart':
      return <svg {...common} strokeLinejoin="round"><path d="M20.7 4.8a5.2 5.2 0 0 0-7.4 0L12 6.1l-1.3-1.3a5.2 5.2 0 0 0-7.4 7.4L12 21l8.7-8.8a5.2 5.2 0 0 0 0-7.4Z" /><path d="M12 8.5v6M9 11.5h6" /></svg>;
    case 'boot':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v9.2L4.5 16c-1 1.1-.2 3 1.3 3h12.7c1.2 0 2.1-1 2-2.2-.1-1-1-1.8-2-1.8H14l-2-4.4V3" /><path d="M8 12h6" /></svg>;
    case 'eye':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.6" /></svg>;
    case 'reach':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M3 18 18 3M14 3h4v4M6 21h3v-3" /><path d="M4 10H2M10 4V2M20 14h2M14 20v2" /></svg>;
    case 'drop':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5s6.5 7.1 6.5 12A6.5 6.5 0 1 1 5.5 14.5c0-4.9 6.5-12 6.5-12Z" /><path d="M9 15c.5 1.3 1.5 2 3 2" /></svg>;
    case 'bolt':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M13.6 2 5.2 13h6.2l-.9 9L18.8 11h-6.1L13.6 2Z" /></svg>;
    case 'sun':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
    case 'coin':
      return <svg {...common} strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M14.7 8.4c-.6-.6-1.5-1-2.7-1-1.7 0-2.8.9-2.8 2.2 0 3.2 5.7 1.4 5.7 4.7 0 1.3-1.2 2.3-3 2.3-1.2 0-2.3-.4-3-1.1M12 5.7v12.6" /></svg>;
    case 'shield':
      return <svg {...common} strokeLinejoin="round"><path d="M12 2.5c2.7 2 5.6 2.4 8 2.5v5.7c0 5.1-3.3 8.6-8 10.8-4.7-2.2-8-5.7-8-10.8V5c2.4-.1 5.3-.5 8-2.5Z" /><path d="M12 7v9M8.5 11.5h7" /></svg>;
    default:
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></svg>;
  }
}
```

## File: `src/components/VolumeControl.tsx`

```tsx
interface Props {
  label: string;
  icon: 'music' | 'sfx';
  value: number; // 0..1
  muted?: boolean;
  compact?: boolean;
  onChange: (v: number) => void;
  onToggle: () => void;
}

const STEP = 0.1;

export function VolumeControl({ label, icon, value, muted, compact, onChange, onToggle }: Props) {
  const pct = Math.round(value * 100);
  const off = muted || value <= 0;
  const bars = 5;
  const filled = off ? 0 : Math.ceil(value * bars);

  const btn =
    'panel clip-notch-sm flex items-center justify-center text-parch/80 hover:text-goldbright active:scale-90 transition-all disabled:opacity-30 disabled:hover:text-parch/80';
  const size = compact ? 26 : 30;

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onToggle}
        title={`${label}: ${off ? 'muted' : `${pct}%`}`}
        aria-label={`Toggle ${label}`}
        className={`${btn} shrink-0`}
        style={{ width: size, height: size }}
      >
        {icon === 'music' ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18V5l11-2v13" />
            <circle cx="6.5" cy="18" r="2.6" fill="currentColor" stroke="none" />
            <circle cx="17.5" cy="16" r="2.6" fill="currentColor" stroke="none" />
            {off && <path d="M3 3l18 18" stroke="#e05252" strokeWidth="2.2" />}
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" stroke="none" />
            {off ? <path d="M17 9l5 6M22 9l-5 6" stroke="#e05252" /> : <path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10" />}
          </svg>
        )}
      </button>

      <button
        onClick={() => onChange(Math.max(0, +(value - STEP).toFixed(2)))}
        disabled={value <= 0}
        aria-label={`Lower ${label}`}
        title={`Lower ${label}`}
        className={btn}
        style={{ width: size, height: size }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M5 12h14" />
        </svg>
      </button>

      {/* level meter */}
      <div className="flex items-end gap-[2px] px-1" style={{ height: size }} title={`${label} ${pct}%`}>
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-[1px] transition-all duration-150"
            style={{
              height: `${28 + i * 16}%`,
              background: i < filled ? '#e2b45c' : '#2a3448',
              boxShadow: i < filled ? '0 0 6px rgba(226,180,92,0.5)' : undefined,
            }}
          />
        ))}
      </div>

      <button
        onClick={() => onChange(Math.min(1, +(value + STEP).toFixed(2)))}
        disabled={value >= 1}
        aria-label={`Raise ${label}`}
        title={`Raise ${label}`}
        className={btn}
        style={{ width: size, height: size }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {!compact && <span className="font-display text-[9px] tracking-[0.2em] text-faint w-8 text-right tabular-nums">{off ? 'OFF' : `${pct}%`}</span>}
    </div>
  );
}
```

## File: `src/components/RarityOdds.tsx`

```tsx
import { RARITY_META, type Rarity } from '../game/data';

interface Props {
  odds: Record<Rarity, number>;
  /** label shown when odds are 0, e.g. { epic: 'W5', legendary: 'W10' } */
  lockedLabels?: Partial<Record<Rarity, string>>;
  /** explains when odds improve, e.g. unlock thresholds */
  hint: string;
}

const ORDER: Rarity[] = ['common', 'rare', 'epic', 'legendary'];

export function RarityOdds({ odds, lockedLabels, hint }: Props) {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {ORDER.map((rarity) => {
          const pct = Math.round((odds[rarity] ?? 0) * 100);
          const locked = pct <= 0 && lockedLabels?.[rarity];
          return (
            <span
              key={rarity}
              title={locked ? `Unlocks at ${lockedLabels?.[rarity]}` : `${RARITY_META[rarity].label} drop chance`}
              className="clip-notch-sm border px-2 py-1 text-[9px] font-display font-bold tracking-[0.18em]"
              style={{
                color: locked ? '#5d6a80' : RARITY_META[rarity].color,
                borderColor: locked ? '#2a3448' : `${RARITY_META[rarity].color}55`,
                background: locked ? 'rgba(0,0,0,0.25)' : `${RARITY_META[rarity].color}10`,
              }}
            >
              {locked ? `🔒 ${RARITY_META[rarity].label} ${lockedLabels?.[rarity]}` : `${RARITY_META[rarity].label} ${pct}%`}
            </span>
          );
        })}
      </div>
      <p className="mt-1.5 text-[10px] text-faint text-center">{hint}</p>
    </div>
  );
}
```

## File: `src/components/HUD.tsx`

```tsx
import { useEffect, useRef } from 'react';
import type { HudBus, HudData } from '../game/engine';
import { ClassEmblem } from './ClassEmblem';
import { useViewport } from '../hooks/useViewport';

interface Props {
  bus: HudBus;
  isTouch: boolean;
  onPause: () => void;
  onOpenSettings: () => void;
}

function setFrac(el: HTMLDivElement | null, frac: number) {
  if (!el) return;
  const f = Math.max(0, Math.min(1, frac));
  if (f <= 0) {
    if (el.dataset.on === '1') {
      el.style.background = 'transparent';
      el.dataset.on = '0';
      const btn = el.parentElement;
      if (btn) {
        btn.classList.remove('anim-ready');
        void btn.offsetWidth;
        btn.classList.add('anim-ready');
      }
    }
  } else {
    el.dataset.on = '1';
    el.style.background = `conic-gradient(rgba(4,7,11,0.85) ${f * 360}deg, rgba(4,7,11,0) 0deg)`;
  }
}

function cooldownText(seconds: number) {
  if (seconds <= 0) return 'READY';
  return seconds >= 10 ? `${Math.ceil(seconds)}s` : `${seconds.toFixed(1)}s`;
}

export function HUD({ bus, isTouch, onPause, onOpenSettings }: Props) {
  const vp = useViewport();
  const compact = vp.compact;
  const tiny = vp.w < 420 || vp.h < 430;

  const emblemWrap = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const classRef = useRef<HTMLSpanElement>(null);
  const lvRef = useRef<HTMLSpanElement>(null);
  const hpFill = useRef<HTMLDivElement>(null);
  const hpText = useRef<HTMLSpanElement>(null);
  const xpFill = useRef<HTMLDivElement>(null);
  const buffRef = useRef<HTMLDivElement>(null);
  const zoneName = useRef<HTMLSpanElement>(null);
  const waveText = useRef<HTMLSpanElement>(null);
  const threatRef = useRef<HTMLSpanElement>(null);
  const foesText = useRef<HTMLSpanElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);
  const bossWrap = useRef<HTMLDivElement>(null);
  const bossFill = useRef<HTMLDivElement>(null);
  const bossName = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const comboWrap = useRef<HTMLDivElement>(null);
  const comboText = useRef<HTMLSpanElement>(null);
  const hurtRef = useRef<HTMLDivElement>(null);
  const lowHpRef = useRef<HTMLDivElement>(null);
  const abOv = useRef<HTMLDivElement>(null);
  const dashOv = useRef<HTMLDivElement>(null);
  const legOv = useRef<HTMLDivElement>(null);
  const abCd = useRef<HTMLSpanElement>(null);
  const dashCd = useRef<HTMLSpanElement>(null);
  const legCd = useRef<HTMLSpanElement>(null);
  const legName = useRef<HTMLSpanElement>(null);
  const legActive = useRef<HTMLDivElement>(null);
  const abName = useRef<HTMLSpanElement>(null);
  const feedRows = useRef<(HTMLDivElement | null)[]>([]);
  const lastAnnounce = useRef(0);
  const lastFeed = useRef('');

  // how many feed lines fit on this screen (read inside the rAF-driven update)
  const feedCount = useRef(5);
  feedCount.current = tiny ? 2 : compact ? 3 : 5;

  useEffect(() => {
    const update = (d: HudData) => {
      if (emblemWrap.current) {
        emblemWrap.current.style.color = d.classColor;
        if (emblemWrap.current.dataset.cid !== d.classId) {
          emblemWrap.current.dataset.cid = d.classId;
          for (const child of Array.from(emblemWrap.current.children)) {
            (child as HTMLElement).style.display =
              (child as HTMLElement).dataset.emb === d.classId ? 'flex' : 'none';
          }
        }
      }
      if (nameRef.current) nameRef.current.textContent = d.playerName;
      if (classRef.current) classRef.current.textContent = d.className;
      if (lvRef.current) lvRef.current.textContent = `Lv ${d.level}`;
      if (hpFill.current) hpFill.current.style.width = `${(d.hp / d.maxHp) * 100}%`;
      if (hpText.current) hpText.current.textContent = `${d.hp} / ${d.maxHp}`;
      if (xpFill.current) xpFill.current.style.width = `${(d.xp / d.xpNext) * 100}%`;
      if (buffRef.current) {
        buffRef.current.style.display = d.buffT > 0 ? 'flex' : 'none';
        if (d.buffT > 0) buffRef.current.textContent = `☀ EMPOWERED ${Math.ceil(d.buffT)}s`;
      }
      if (zoneName.current) {
        zoneName.current.textContent = d.zoneName;
        zoneName.current.style.color = d.zoneColor;
      }
      if (waveText.current) waveText.current.textContent = `WAVE ${d.wave}`;
      if (threatRef.current) threatRef.current.textContent = d.threat;
      if (foesText.current)
        foesText.current.textContent = d.foesLeft > 0 ? `${d.foesLeft} FOES LEFT` : 'WAVE CLEAR';
      if (announceRef.current && d.announceId !== lastAnnounce.current) {
        lastAnnounce.current = d.announceId;
        announceRef.current.textContent = d.announce;
        announceRef.current.classList.remove('anim-banner');
        void announceRef.current.offsetWidth;
        announceRef.current.classList.add('anim-banner');
      }
      if (bossWrap.current) bossWrap.current.style.display = d.bossMax > 0 ? 'block' : 'none';
      if (bossFill.current && d.bossMax > 0) bossFill.current.style.width = `${(d.bossHp / d.bossMax) * 100}%`;
      if (bossName.current) bossName.current.textContent = d.bossName;
      if (scoreRef.current) scoreRef.current.textContent = d.score.toLocaleString();
      if (goldRef.current) goldRef.current.textContent = d.gold.toLocaleString();
      if (timeRef.current) timeRef.current.textContent = d.timeStr;
      if (comboWrap.current) comboWrap.current.style.display = d.combo >= 2 ? 'flex' : 'none';
      if (comboText.current) comboText.current.textContent = `×${d.combo}`;
      if (hurtRef.current) hurtRef.current.style.opacity = `${d.hurt * 0.5}`;
      if (lowHpRef.current) lowHpRef.current.style.display = d.lowHp ? 'block' : 'none';
      setFrac(abOv.current, d.abilityCd / d.abilityCdMax);
      setFrac(dashOv.current, d.dashCd / d.dashCdMax);
      setFrac(legOv.current, d.legacyCd / d.legacyCdMax);
      if (abCd.current) {
        abCd.current.textContent = cooldownText(d.abilityCd);
        abCd.current.dataset.ready = d.abilityCd <= 0 ? '1' : '0';
      }
      if (dashCd.current) {
        dashCd.current.textContent = cooldownText(d.dashCd);
        dashCd.current.dataset.ready = d.dashCd <= 0 ? '1' : '0';
      }
      if (legCd.current) {
        legCd.current.textContent = cooldownText(d.legacyCd);
        legCd.current.dataset.ready = d.legacyCd <= 0 ? '1' : '0';
      }
      if (legName.current) legName.current.textContent = d.legacyName;
      if (abName.current) abName.current.textContent = d.abilityName;
      if (legActive.current) {
        legActive.current.style.display = d.legacyActive ? 'block' : 'none';
        legActive.current.textContent = d.legacyActive;
      }

      const rows = feedCount.current;
      const feedKey = `${rows}:${d.feed.map((f) => f.id).join(',')}`;
      if (feedKey !== lastFeed.current) {
        lastFeed.current = feedKey;
        for (let i = 0; i < 5; i++) {
          const row = feedRows.current[i];
          if (!row) continue;
          if (i >= rows) {
            row.style.display = 'none';
            continue;
          }
          const msg = d.feed[d.feed.length - rows + i];
          if (msg && d.feed.length - rows + i >= 0) {
            row.style.display = 'block';
            row.style.color = msg.color;
            row.textContent = msg.text;
            row.style.opacity = `${0.45 + (i / Math.max(1, rows - 1)) * 0.55}`;
          } else {
            row.style.display = 'none';
          }
        }
      }
    };
    bus.listeners.add(update);
    return () => {
      bus.listeners.delete(update);
    };
  }, [bus]);

  const emblemBox = compact ? 'w-7 h-7' : 'w-9 h-9';
  const emblemSize = compact ? 20 : 26;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none">
      {/* hurt + low hp vignettes */}
      <div
        ref={hurtRef}
        className="absolute inset-0"
        style={{ opacity: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(200,30,30,0.55) 100%)' }}
      />
      <div
        ref={lowHpRef}
        className="absolute inset-0 anim-low-hp"
        style={{ display: 'none', boxShadow: 'inset 0 0 120px 30px rgba(190,30,30,0.5)' }}
      />

      {/* top row */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between gap-1.5 sm:gap-2 px-1.5 sm:px-3"
        style={{ paddingTop: 'calc(6px + env(safe-area-inset-top))' }}
      >
        {/* player frame */}
        <div
          className="panel-gold clip-notch shrink-0"
          style={{
            width: compact ? (tiny ? 132 : 158) : 228,
            padding: compact ? '5px 6px' : '8px 10px',
          }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              ref={emblemWrap}
              data-cid="kensei"
              className={`clip-notch-sm ${emblemBox} border border-gold/50 bg-black/50 flex items-center justify-center shrink-0`}
            >
              {['kensei', 'shieldthane', 'jaguar', 'sandseer', 'tidecaller', 'riftblade', 'stormwarden', 'drakewarden'].map((cid) => (
                <span
                  key={cid}
                  data-emb={cid}
                  style={{ display: cid === 'kensei' ? 'flex' : 'none' }}
                  className="items-center justify-center"
                >
                  <ClassEmblem classId={cid} size={emblemSize} />
                </span>
              ))}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span
                  ref={nameRef}
                  className="font-display font-bold text-parch truncate leading-none"
                  style={{ fontSize: compact ? 11 : 13 }}
                />
                {!compact && <span ref={classRef} className="text-[9px] text-faint font-bold tracking-wider truncate" />}
              </div>
              <div className="bar-shell clip-notch-sm relative mt-1" style={{ height: compact ? 11 : 13 }}>
                <div ref={hpFill} className="bar-fill" style={{ width: '100%', background: 'linear-gradient(180deg,#ff8a8a,#c93c3c)' }} />
                <span
                  ref={hpText}
                  className="absolute inset-0 flex items-center justify-center font-bold text-white"
                  style={{ fontSize: compact ? 8 : 9, textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
                />
              </div>
              <div className="bar-shell clip-notch-sm mt-1" style={{ height: compact ? 5 : 6 }}>
                <div ref={xpFill} className="bar-fill" style={{ width: '0%', background: 'linear-gradient(180deg,#7fe8cf,#2fae8f)' }} />
              </div>
            </div>
            <span
              ref={lvRef}
              className="font-display font-black text-goldbright text-emboss shrink-0 text-right"
              style={{ fontSize: compact ? 11 : 14, width: compact ? 30 : 44 }}
            />
          </div>
          <div
            ref={buffRef}
            className="mt-1 items-center justify-center font-bold tracking-[0.15em] text-goldbright border border-gold/50 bg-gold/10 clip-notch-sm py-0.5"
            style={{ display: 'none', fontSize: compact ? 8 : 9 }}
          />
        </div>

        {/* zone / wave / announce / boss */}
        <div className="flex-1 flex flex-col items-center min-w-0">
          <div
            className="panel clip-notch flex items-center gap-2 font-bold tracking-wider"
            style={{ padding: compact ? '3px 8px' : '4px 12px', fontSize: compact ? 9 : 11 }}
          >
            <span ref={zoneName} className="truncate" style={{ maxWidth: compact ? '28vw' : '38vw' }} />
            <span className="w-[1px] h-3 bg-iron" />
            <span ref={waveText} className="text-goldbright font-display whitespace-nowrap" />
            <span
              ref={threatRef}
              className="font-display font-black tracking-[0.12em] whitespace-nowrap px-1.5 py-0.5 clip-notch-sm border border-[#ff7868]/55 bg-[#601f22]/70 text-[#ffb0a2] shadow-[0_0_9px_rgba(255,90,80,0.25)]"
              style={{ fontSize: compact ? 9 : 11 }}
            />
            <span
              ref={foesText}
              className="font-display font-black whitespace-nowrap px-1.5 py-0.5 clip-notch-sm border border-verdant/45 bg-verdant/10 text-verdant"
              style={{ fontSize: compact ? 8 : 10 }}
            />
          </div>
          <div
            ref={announceRef}
            className="font-display font-black text-gold text-emboss tracking-[0.12em] text-center opacity-0 whitespace-nowrap"
            style={{ fontSize: 'clamp(13px, 4.2vw, 34px)', marginTop: compact ? 14 : 24 }}
          />
          <div ref={bossWrap} className="mt-1" style={{ display: 'none', width: compact ? '72vw' : 'min(440px, 66vw)' }}>
            <div className="flex justify-between font-bold tracking-wider mb-0.5 px-0.5" style={{ fontSize: compact ? 9 : 10 }}>
              <span ref={bossName} className="text-[#ff9a9a] truncate" />
              <span className="text-faint shrink-0">WORLD BOSS</span>
            </div>
            <div className="bar-shell clip-notch-sm" style={{ height: compact ? 8 : 10 }}>
              <div ref={bossFill} className="bar-fill" style={{ width: '100%', background: 'linear-gradient(180deg,#ff7d7d,#a92626)' }} />
            </div>
          </div>
        </div>

        {/* score frame + system controls */}
        <div className="flex items-start gap-1.5 shrink-0">
          <div
            className="panel-gold clip-notch text-right"
            style={{ width: compact ? (tiny ? 104 : 124) : 176, padding: compact ? '6px 9px' : '9px 12px' }}
          >
            <div className="font-display tracking-[0.3em] text-faint" style={{ fontSize: compact ? 8 : 9 }}>
              SCORE
            </div>
            <div
              ref={scoreRef}
              className="font-display font-black text-goldbright text-emboss leading-none"
              style={{ fontSize: compact ? 16 : 22 }}
            >
              0
            </div>
            {/* Coins & Timer Badge: higher contrast, bold text, glowing coin icon */}
            <div
              className="flex items-center justify-end gap-2 mt-1.5 px-2 py-0.5 rounded bg-black/45 border border-gold/30 shadow-inner"
              style={{ fontSize: compact ? 11 : 13 }}
            >
              <span className="flex items-center gap-1.5 text-goldbright font-bold">
                <svg
                  width={compact ? 13 : 15}
                  height={compact ? 13 : 15}
                  viewBox="0 0 24 24"
                  fill="#ffd97a"
                  stroke="#8a6a22"
                  strokeWidth="1.5"
                  className="drop-shadow-[0_0_4px_rgba(255,217,122,0.8)]"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" fill="none" stroke="#b9892e" strokeWidth="1.5" />
                </svg>
                <span ref={goldRef} className="tabular-nums drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  0
                </span>
              </span>
              <span className="w-[1px] h-3 bg-gold/30" />
              <span className="flex items-center gap-1 text-parch font-bold tabular-nums">
                <svg
                  width={compact ? 11 : 12}
                  height={compact ? 11 : 12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="opacity-70"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span ref={timeRef} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  0:00
                </span>
              </span>
            </div>
            {/* Chain / Combo Badge: prominent pill with neon green/teal glow */}
            <div
              ref={comboWrap}
              className="mt-1.5 items-center justify-end gap-1.5 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-400/50 shadow-[0_0_12px_rgba(70,200,168,0.35)]"
              style={{ display: 'none' }}
            >
              <span
                className="font-display font-extrabold tracking-[0.22em] text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                style={{ fontSize: compact ? 9 : 10 }}
              >
                CHAIN
              </span>
              <span
                ref={comboText}
                className="font-display font-black text-emerald-300 drop-shadow-[0_0_8px_rgba(70,200,168,0.9)] leading-none tabular-nums"
                style={{ fontSize: compact ? 15 : 18 }}
              />
            </div>
          </div>

          {/* dedicated system cluster: PAUSE is always visible and thumb-sized */}
          <div className="flex flex-col items-center gap-1.5 pointer-events-auto">
            <button
              onClick={onPause}
              aria-label="Pause game"
              title="Pause (Esc)"
              className="panel-gold clip-notch-sm flex items-center justify-center text-goldbright transition-transform duration-100 active:scale-90 hover:border-gold"
              style={{ width: compact ? 42 : 48, height: compact ? 42 : 48 }}
            >
              <svg width={compact ? 17 : 20} height={compact ? 17 : 20} viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4.2" height="16" rx="1.2" />
                <rect x="13.8" y="4" width="4.2" height="16" rx="1.2" />
              </svg>
            </button>
            <button
              onClick={onOpenSettings}
              aria-label="Settings"
              title="Settings"
              className="panel clip-notch-sm flex items-center justify-center text-parch/80 transition-transform duration-100 active:scale-90 hover:text-goldbright group"
              style={{ width: compact ? 42 : 48, height: compact ? 30 : 32 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="transition-transform duration-500 group-hover:rotate-90">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
            </button>
            {!isTouch && !compact && (
              <span className="kbd" style={{ opacity: 0.8 }}>
                ESC
              </span>
            )}
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-1.5 sm:px-3 gap-2"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}
      >
        {/* event feed — shrinks out of the way of touch controls */}
        <div
          className="flex flex-col gap-[3px] min-w-0"
          style={{
            width: isTouch ? (compact ? '46vw' : '38vw') : 'min(400px, 46vw)',
            marginBottom: isTouch ? (compact ? 96 : 116) : 0,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => {
                feedRows.current[i] = el;
              }}
              className="font-bold truncate"
              style={{ display: 'none', fontSize: compact ? 10 : 11, textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
            />
          ))}
        </div>

        {/* desktop skill bar */}
        {!isTouch && (
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div ref={legActive} className="font-display text-[10px] tracking-[0.2em] text-goldbright text-emboss px-2 py-1 panel-gold clip-notch-sm" style={{ display: 'none' }} />
            <div className="flex items-end gap-2.5 panel clip-notch px-3 py-2.5">
              <div className="flex flex-col items-center gap-1">
                <div className="relative panel-gold clip-notch-sm flex items-center justify-center overflow-hidden" style={{ width: 66, height: 66, boxShadow: '0 0 14px rgba(215,173,255,0.25)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7adff" strokeWidth="2" strokeLinejoin="round">
                    <path d="M12 2 20 12 12 22 4 12Z" />
                    <path d="M12 7 15.5 12 12 17 8.5 12Z" fill="#d7adff" opacity="0.6" />
                  </svg>
                  <div ref={legOv} className="absolute inset-0 z-10" style={{ background: 'transparent' }} />
                  <span className="absolute left-1 top-1 z-30 min-w-6 h-5 px-1 flex items-center justify-center rounded-sm border border-goldbright/70 bg-parch text-abyss font-black text-[11px] leading-none shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Q</span>
                  <span ref={legCd} className="skill-cooldown absolute inset-x-0 bottom-1.5 z-30 text-center font-display font-black text-white text-[12px] tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
                </div>
                <span ref={legName} className="text-[10px] font-bold tracking-wider text-parch max-w-[76px] truncate" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="relative panel-gold clip-notch-sm flex items-center justify-center overflow-hidden" style={{ width: 66, height: 66, boxShadow: '0 0 14px rgba(255,217,122,0.25)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffd97a" strokeWidth="2">
                    <path d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 15.8 L6.5 20 L8.5 13 L3 9 L10 9 Z" strokeLinejoin="round" />
                  </svg>
                  <div ref={abOv} className="absolute inset-0 z-10" style={{ background: 'transparent' }} />
                  <span className="absolute left-1 top-1 z-30 min-w-6 h-5 px-1 flex items-center justify-center rounded-sm border border-goldbright/70 bg-parch text-abyss font-black text-[11px] leading-none shadow-[0_1px_4px_rgba(0,0,0,0.8)]">E</span>
                  <span ref={abCd} className="skill-cooldown absolute inset-x-0 bottom-1.5 z-30 text-center font-display font-black text-white text-[12px] tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
                </div>
                <span ref={abName} className="text-[10px] font-bold tracking-wider text-parch max-w-[76px] truncate" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="relative panel-gold clip-notch-sm flex items-center justify-center overflow-hidden" style={{ width: 72, height: 66 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8ce0e8" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M3 12 H14 M10 6 L17 12 L10 18" />
                    <path d="M17 6 H21 M18 18 H21" opacity="0.6" />
                  </svg>
                  <div ref={dashOv} className="absolute inset-0 z-10" style={{ background: 'transparent' }} />
                  <span className="absolute left-1 top-1 z-30 h-5 px-1.5 flex items-center justify-center rounded-sm border border-[#8ce0e8]/80 bg-[#d8f7fa] text-[#102027] font-black text-[9px] leading-none shadow-[0_1px_4px_rgba(0,0,0,0.8)]">SHIFT</span>
                  <span ref={dashCd} className="skill-cooldown absolute inset-x-0 bottom-1.5 z-30 text-center font-display font-black text-white text-[12px] tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-parch">Dash</span>
              </div>
            </div>
            {!compact && (
              <div className="flex items-center gap-1.5 text-[10px] text-faint font-bold">
                <span className="kbd">WASD</span> move · <span className="kbd">SPACE</span> attack · <span className="kbd">ESC</span> pause
              </div>
            )}
          </div>
        )}
        {isTouch && (
          <div ref={legActive} className="absolute left-1/2 -translate-x-1/2 font-display text-[10px] tracking-[0.2em] text-goldbright text-emboss px-2 py-1 panel-gold clip-notch-sm whitespace-nowrap" style={{ display: 'none', bottom: 'calc(150px + env(safe-area-inset-bottom))' }} />
        )}
      </div>
    </div>
  );
}
```

## File: `src/components/TouchControls.tsx`

```tsx
import { useEffect, useRef } from 'react';
import type { Game, HudBus, HudData } from '../game/engine';
import { useViewport } from '../hooks/useViewport';

interface Props {
  gameRef: { current: Game | null };
  bus: HudBus;
}

function setFrac(el: HTMLDivElement | null, frac: number) {
  if (!el) return;
  const f = Math.max(0, Math.min(1, frac));
  if (f <= 0) {
    if (el.dataset.on === '1') {
      el.style.background = 'transparent';
      el.dataset.on = '0';
      const btn = el.parentElement;
      if (btn) {
        btn.classList.remove('anim-ready');
        void btn.offsetWidth;
        btn.classList.add('anim-ready');
      }
    }
  } else {
    el.dataset.on = '1';
    el.style.background = `conic-gradient(rgba(4,7,11,0.85) ${f * 360}deg, rgba(4,7,11,0) 0deg)`;
  }
}

function cooldownText(seconds: number) {
  if (seconds <= 0) return '';
  return seconds >= 10 ? `${Math.ceil(seconds)}s` : `${seconds.toFixed(1)}s`;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

export function TouchControls({ gameRef, bus }: Props) {
  const vp = useViewport();
  const shortSide = Math.min(vp.w, vp.h);

  // Every control scales with the device so phones, phablets and tablets all
  // get comfortable, reachable thumb targets.
  const attackSize = Math.round(clamp(shortSide * 0.21, 78, 116));
  const actionSize = Math.round(clamp(shortSide * 0.135, 52, 74));
  const joyRadius = Math.round(clamp(shortSide * 0.11, 40, 60));
  const edgeX = vp.landscape ? 18 : 12;
  const edgeY = vp.landscape ? 12 : 22;

  const zoneRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const abOv = useRef<HTMLDivElement>(null);
  const dashOv = useRef<HTMLDivElement>(null);
  const legOv = useRef<HTMLDivElement>(null);
  const abCd = useRef<HTMLSpanElement>(null);
  const dashCd = useRef<HTMLSpanElement>(null);
  const legCd = useRef<HTMLSpanElement>(null);
  const attackRef = useRef<HTMLButtonElement>(null);
  const active = useRef<{ id: number; ox: number; oy: number } | null>(null);
  const radiusRef = useRef(joyRadius);
  radiusRef.current = joyRadius;

  useEffect(() => {
    const update = (d: HudData) => {
      setFrac(abOv.current, d.abilityCd / d.abilityCdMax);
      setFrac(dashOv.current, d.dashCd / d.dashCdMax);
      setFrac(legOv.current, d.legacyCd / d.legacyCdMax);
      if (abCd.current) abCd.current.textContent = cooldownText(d.abilityCd);
      if (dashCd.current) dashCd.current.textContent = cooldownText(d.dashCd);
      if (legCd.current) legCd.current.textContent = cooldownText(d.legacyCd);
      if (attackRef.current) {
        attackRef.current.style.boxShadow =
          d.buffT > 0 ? '0 0 26px 6px rgba(255,217,122,0.55), 0 2px 0 #7c5f1e' : '';
      }
    };
    bus.listeners.add(update);
    return () => {
      bus.listeners.delete(update);
    };
  }, [bus]);

  const joyPos = (e: React.PointerEvent) => {
    const zone = zoneRef.current;
    if (!zone) return { cx: 0, cy: 0 };
    const r = zone.getBoundingClientRect();
    return { cx: e.clientX - r.left, cy: e.clientY - r.top };
  };

  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const { cx, cy } = joyPos(e);
    active.current = { id: e.pointerId, ox: cx, oy: cy };
    const base = baseRef.current;
    if (base) {
      base.style.left = `${cx - radiusRef.current}px`;
      base.style.top = `${cy - radiusRef.current}px`;
      base.style.opacity = '1';
    }
    gameRef.current?.setMove(0, 0);
  };

  const onMove = (e: React.PointerEvent) => {
    const a = active.current;
    if (!a || a.id !== e.pointerId) return;
    const { cx, cy } = joyPos(e);
    let dx = cx - a.ox;
    let dy = cy - a.oy;
    const len = Math.hypot(dx, dy);
    const maxR = radiusRef.current;
    if (len > maxR) {
      dx = (dx / len) * maxR;
      dy = (dy / len) * maxR;
    }
    if (thumbRef.current) thumbRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    if (len < 7) gameRef.current?.setMove(0, 0);
    else gameRef.current?.setMove(dx / maxR, dy / maxR);
  };

  const endJoy = (e: React.PointerEvent) => {
    const a = active.current;
    if (!a || a.id !== e.pointerId) return;
    active.current = null;
    if (baseRef.current) baseRef.current.style.opacity = '0';
    if (thumbRef.current) thumbRef.current.style.transform = 'translate(0,0)';
    gameRef.current?.clearMove();
  };

  const btn =
    'relative rounded-full flex items-center justify-center touchbtn pointer-events-auto border transition-transform duration-75 active:scale-90';

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {/* joystick zone (left half, clear of the top HUD) */}
      <div
        ref={zoneRef}
        className="absolute left-0 bottom-0 pointer-events-auto touchbtn"
        style={{ width: '50%', height: vp.landscape ? '78%' : '62%' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={endJoy}
        onPointerCancel={endJoy}
      >
        <div
          ref={baseRef}
          className="absolute rounded-full border-2 border-gold/40 bg-white/5 opacity-0 pointer-events-none"
          style={{ width: joyRadius * 2, height: joyRadius * 2, transition: 'opacity 120ms ease' }}
        >
          <div className="absolute inset-0 rounded-full border border-gold/15 scale-75" />
          <div
            ref={thumbRef}
            className="absolute rounded-full bg-gold/45 border-2 border-goldbright pointer-events-none"
            style={{
              width: joyRadius * 0.86,
              height: joyRadius * 0.86,
              left: '50%',
              top: '50%',
              marginLeft: -joyRadius * 0.43,
              marginTop: -joyRadius * 0.43,
              boxShadow: '0 0 14px rgba(226,180,92,0.5)',
            }}
          />
        </div>
      </div>

      {/* action cluster */}
      <div
        className="absolute flex items-end pointer-events-auto"
        style={{
          right: `calc(${edgeX}px + env(safe-area-inset-right))`,
          bottom: `calc(${edgeY}px + env(safe-area-inset-bottom))`,
          gap: Math.round(actionSize * 0.18),
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: Math.round(actionSize * 0.18) }}>
          <button
            className={`${btn} btn-dark`}
            style={{ width: actionSize * 0.92, height: actionSize * 0.92, boxShadow: '0 0 14px rgba(215,173,255,0.3)' }}
            onPointerDown={(e) => {
              e.preventDefault();
              gameRef.current?.unlockAudio();
              gameRef.current?.touchLegacy();
            }}
            aria-label="Legacy ability"
          >
            <svg width={actionSize * 0.4} height={actionSize * 0.4} viewBox="0 0 24 24" fill="none" stroke="#d7adff" strokeWidth="2" strokeLinejoin="round">
              <path d="M12 2 20 12 12 22 4 12Z" />
              <path d="M12 7 15.5 12 12 17 8.5 12Z" fill="#d7adff" opacity="0.6" />
            </svg>
            <div ref={legOv} className="absolute inset-0 rounded-full" />
            <span ref={legCd} className="absolute inset-0 z-20 flex items-center justify-center font-display font-black text-white text-[12px] drop-shadow-[0_1px_3px_rgba(0,0,0,1)] pointer-events-none" />
          </button>
          <button
            className={`${btn} btn-dark`}
            style={{ width: actionSize, height: actionSize }}
            onPointerDown={(e) => {
              e.preventDefault();
              gameRef.current?.unlockAudio();
              gameRef.current?.touchAbility();
            }}
            aria-label="Signature ability"
          >
            <svg width={actionSize * 0.42} height={actionSize * 0.42} viewBox="0 0 24 24" fill="none" stroke="#ffd97a" strokeWidth="2">
              <path d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 15.8 L6.5 20 L8.5 13 L3 9 L10 9 Z" strokeLinejoin="round" />
            </svg>
            <div ref={abOv} className="absolute inset-0 rounded-full" />
            <span ref={abCd} className="absolute inset-0 z-20 flex items-center justify-center font-display font-black text-white text-[12px] drop-shadow-[0_1px_3px_rgba(0,0,0,1)] pointer-events-none" />
          </button>
          <button
            className={`${btn} btn-dark`}
            style={{ width: actionSize, height: actionSize }}
            onPointerDown={(e) => {
              e.preventDefault();
              gameRef.current?.touchDash();
            }}
            aria-label="Dash"
          >
            <svg width={actionSize * 0.42} height={actionSize * 0.42} viewBox="0 0 24 24" fill="none" stroke="#8ce0e8" strokeWidth="2.4" strokeLinecap="round">
              <path d="M3 12 H14 M10 6 L17 12 L10 18" />
              <path d="M17 6 H21 M18 18 H21" opacity="0.6" />
            </svg>
            <div ref={dashOv} className="absolute inset-0 rounded-full" />
            <span ref={dashCd} className="absolute inset-0 z-20 flex items-center justify-center font-display font-black text-white text-[12px] drop-shadow-[0_1px_3px_rgba(0,0,0,1)] pointer-events-none" />
          </button>
        </div>
        <button
          ref={attackRef}
          className={`${btn} btn-gold`}
          style={{ width: attackSize, height: attackSize }}
          onPointerDown={(e) => {
            e.preventDefault();
            gameRef.current?.unlockAudio();
            gameRef.current?.touchAttack(true);
          }}
          onPointerUp={() => gameRef.current?.touchAttack(false)}
          onPointerCancel={() => gameRef.current?.touchAttack(false)}
          onPointerLeave={() => gameRef.current?.touchAttack(false)}
          aria-label="Attack"
        >
          <svg width={attackSize * 0.42} height={attackSize * 0.42} viewBox="0 0 24 24" fill="none" stroke="#241a05" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 20 L15 9 M13 5 L19 11 M15 9 L19 5 M17.5 2.5 L21.5 6.5" strokeLinejoin="round" />
            <path d="M4 20 L7 17" strokeWidth="3.4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

## File: `src/components/HighScoreList.tsx`

```tsx
import { CLASSES } from '../game/data';
import { dedupeByPlayer, type ScoreEntry } from '../game/highscores';
import { ClassEmblem } from './ClassEmblem';
import { cn } from '../utils/cn';

interface Props {
  scores: ScoreEntry[];
  limit?: number;
  highlightScore?: number;
  activeProfileId?: string;
}

const RANK_COLORS = ['#ffd97a', '#cfd8ea', '#d09a5a'];

function formatTime(seconds?: number) {
  if (seconds === undefined || !Number.isFinite(seconds)) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function HighScoreList({ scores, limit = 8, highlightScore, activeProfileId }: Props) {
  // Rank is always determined by score. Time is display information only.
  // Each player appears once with their best score.
  const list = dedupeByPlayer(scores).slice(0, limit);
  if (list.length === 0) {
    return (
      <div className="text-faint text-sm italic py-3 text-center">
        No legends inscribed yet — be the first.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[3px]">
      <div className="grid grid-cols-[24px_18px_minmax(0,1fr)_66px_66px_78px] items-center gap-2 px-2 py-1 text-[8px] font-display font-bold tracking-[0.18em] text-[#aab4c5] border-b border-iron/80">
        <span>#</span>
        <span />
        <span>PLAYER</span>
        <span className="text-right">WAVE</span>
        <span className="text-right">TIME</span>
        <span className="text-right text-gold">SCORE</span>
      </div>
      {list.map((s, i) => {
        const cls = CLASSES.find((c) => c.id === s.classId);
        const highlighted =
          (highlightScore !== undefined && s.score === highlightScore) ||
          (activeProfileId !== undefined && s.userId === activeProfileId);
        return (
          <div
            key={`${s.name}-${s.score}-${i}`}
            className={cn(
              'grid grid-cols-[24px_18px_minmax(0,1fr)_66px_66px_78px] items-center gap-2 px-2 py-[5px] clip-notch-sm text-sm',
              highlighted ? 'bg-gold/15 border border-gold/50' : 'bg-black/25 border border-transparent'
            )}
          >
            <span
              className="font-display font-bold text-center text-xs"
              style={{ color: i < 3 ? RANK_COLORS[i] : '#5d6a80' }}
            >
              {i + 1}
            </span>
            <span className="shrink-0" style={{ color: cls?.color ?? '#e2b45c' }}>
              <ClassEmblem classId={s.classId} size={16} />
            </span>
            <span className={cn('truncate font-bold', highlighted ? 'text-goldbright' : 'text-parch')}>
              {s.userName ?? s.name}
            </span>
            <span className="text-faint text-[10px] text-right whitespace-nowrap">
              W{s.wave} / L{s.level}
            </span>
            <span className="text-parch/80 text-[10px] font-bold tabular-nums text-right">
              {formatTime(s.durationSeconds)}
            </span>
            <span className="font-display font-black text-goldbright tabular-nums text-right shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {s.score.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
```

## File: `src/components/Leaderboard.tsx`

```tsx
import { useMemo, useState } from 'react';
import type { ScoreEntry } from '../game/highscores';
import { CLASSES } from '../game/data';
import { ClassEmblem } from './ClassEmblem';
import { HighScoreList } from './HighScoreList';

interface Props {
  scores: ScoreEntry[];
  activeProfileId?: string;
  compact?: boolean;
}

export function Leaderboard({ scores, activeProfileId, compact = false }: Props) {
  const [hero, setHero] = useState<string>('all');

  const heroDef = hero === 'all' ? null : CLASSES.find((c) => c.id === hero) ?? null;

  const runs = useMemo(
    () => (hero === 'all' ? scores : scores.filter((s) => s.classId === hero)),
    [scores, hero]
  );

  return (
    <div>
      {/* hero filter rail */}
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        <button
          onClick={() => setHero('all')}
          title="All heroes"
          className={`h-7 px-2 clip-notch-sm font-display text-[9px] tracking-[0.2em] border transition-all duration-150 hover:-translate-y-0.5 ${
            hero === 'all'
              ? 'bg-gold/20 text-goldbright border-gold/60'
              : 'bg-black/30 text-faint border-iron hover:text-parch'
          }`}
        >
          ALL
        </button>
        {CLASSES.map((c) => {
          const active = hero === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setHero(c.id)}
              title={`${c.name} standings`}
              className={`h-7 w-7 clip-notch-sm flex items-center justify-center border transition-all duration-150 hover:-translate-y-0.5 ${
                active ? 'bg-black/50' : 'bg-black/30 border-iron'
              }`}
              style={
                active
                  ? { borderColor: c.color, color: c.color, boxShadow: `0 0 12px ${c.color}55` }
                  : { color: '#5d6a80' }
              }
            >
              <ClassEmblem classId={c.id} size={17} />
            </button>
          );
        })}
        {heroDef && (
          <span
            className="ml-auto text-[9px] font-display font-bold tracking-[0.22em] truncate max-w-[40%]"
            style={{ color: heroDef.color }}
          >
            {heroDef.name.toUpperCase()}
          </span>
        )}
      </div>

      {runs.length === 0 ? (
        <div className="text-faint text-sm italic py-3 text-center">
          {heroDef ? `No runs recorded for the ${heroDef.name} yet.` : 'Complete a run to enter the realm ranking.'}
        </div>
      ) : (
        <HighScoreList scores={runs} limit={compact ? 5 : 10} activeProfileId={activeProfileId} />
      )}
    </div>
  );
}
```

## File: `src/components/LevelUpOverlay.tsx`

```tsx
import type { CSSProperties } from 'react';
import type { LevelUpData } from '../game/engine';
import { RARITY_META, type PowerId } from '../game/data';
import { PowerIcon } from './PowerIcon';
import { RarityOdds } from './RarityOdds';

interface Props {
  data: LevelUpData;
  onChoose: (id: PowerId) => void;
  onOpenIndex: () => void;
  onReroll: () => void;
}

export function LevelUpOverlay({ data, onChoose, onOpenIndex, onReroll }: Props) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-abyss/72 px-3 py-5">
      <div className="w-full max-w-4xl text-center anim-fade-up">
        <div className="font-display text-[10px] font-bold tracking-[0.5em] text-gold">AETHER AWAKENS</div>
        <h2 className="font-display font-black text-[clamp(30px,6vw,52px)] leading-none text-goldbright text-emboss mt-1">
          LEVEL {data.level}
        </h2>
        <p className="text-sm text-parch/80 mt-2">Choose one lasting power before the next blade falls.</p>

        <div className="mt-3">
          <RarityOdds
            odds={data.rarityOdds}
            lockedLabels={{ legendary: 'LV 5' }}
            hint="Odds improve every level · Common shrinks while Rare, Epic & Legendary grow · Legendary unlocks at Lv 5"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-2.5 sm:gap-3 mt-4 sm:mt-5 text-left">
          {data.choices.map((power, index) => (
            <button
              key={power.id}
              onClick={() => onChoose(power.id)}
              className="power-choice clip-notch panel p-3 sm:p-4 min-h-0 sm:min-h-[190px] flex flex-col items-start group"
              style={{ '--power': RARITY_META[power.rarity].color } as CSSProperties}
            >
              <div className="flex w-full items-start justify-between">
                <span className="w-12 h-12 clip-notch-sm bg-black/35 border flex items-center justify-center" style={{ color: power.color, borderColor: `${power.color}77` }}>
                  <PowerIcon icon={power.icon} size={31} />
                </span>
                <span className="kbd group-hover:border-gold/70">{index + 1}</span>
              </div>
              <div className="flex items-center justify-between gap-2 w-full mt-3 sm:mt-4">
                <div className="font-display text-[10px] font-bold tracking-[0.28em]" style={{ color: power.color }}>{power.kicker}</div>
                <span className="font-display text-[8px] font-black tracking-[0.2em]" style={{ color: RARITY_META[power.rarity].color }}>
                  {RARITY_META[power.rarity].label}
                </span>
              </div>
              <div className="font-display font-bold text-lg sm:text-xl text-parch mt-1">{power.name}</div>
              <p className="text-[13px] sm:text-sm leading-tight text-faint mt-1.5 sm:mt-2">{power.desc}</p>
              <p className="text-[10px] text-parch/45 mt-2">{power.stacks}</p>
              <div className="mt-auto pt-3 sm:pt-4 font-display text-[10px] tracking-[0.22em] text-parch/55 group-hover:text-goldbright">ATTUNE POWER</div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-[10px] font-bold tracking-[0.2em] text-faint">PRESS 1, 2, OR 3 TO CHOOSE</span>
          <button
            onClick={onReroll}
            disabled={data.rerollsLeft <= 0}
            title="Reroll all three offers (R). Boss kills restore rerolls."
            className="btn-dark clip-notch-sm px-3 py-1.5 text-[10px] font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M20 11a8 8 0 1 0-2.3 6.3M20 5v6h-6" />
            </svg>
            REROLL · {data.rerollsLeft} LEFT
          </button>
          <button onClick={onOpenIndex} className="btn-dark clip-notch-sm px-3 py-1.5 text-[10px] font-bold">VIEW POWER INDEX</button>
        </div>
        <p className="mt-2 text-[10px] text-faint">Rerolls are shared with the market · defeating a boss restores all 3</p>
      </div>
    </div>
  );
}
```

## File: `src/components/ShopOverlay.tsx`

```tsx
import type { CSSProperties } from 'react';
import type { ShopData } from '../game/engine';
import { RARITY_META, type ShopItemId } from '../game/data';
import { PowerIcon } from './PowerIcon';
import { RarityOdds } from './RarityOdds';

interface Props {
  data: ShopData;
  onBuy: (id: ShopItemId) => void;
  onOpenIndex: () => void;
  onReroll: () => void;
  onContinue: () => void;
}

export function ShopOverlay({ data, onBuy, onOpenIndex, onReroll, onContinue }: Props) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-abyss/72 px-3 py-4">
      <div className="w-full max-w-5xl anim-fade-up">
        <div className="flex items-end justify-between gap-3 border-b border-gold/30 pb-3">
          <div>
            <div className="font-display text-[10px] font-bold tracking-[0.45em] text-gold">BETWEEN THE REALMS</div>
            <h2 className="font-display font-black text-[clamp(24px,5vw,42px)] leading-none text-goldbright text-emboss mt-1">TRAVELING MARKET</h2>
            <p className="text-sm text-parch/75 mt-1">Wave {data.wave} is clear. Spend your spoils before entering <span style={{ color: data.nextZoneColor }}>{data.nextZoneName}</span>.</p>
          </div>
          <div className="panel-gold clip-notch shrink-0 px-3 py-2 text-right">
            <div className="font-display text-[9px] tracking-[0.3em] text-faint">YOUR PURSE</div>
            <div className="font-display font-black text-xl text-goldbright"><span className="text-sm">G</span> {data.gold}</div>
          </div>
        </div>

        <div className="mt-3">
          <RarityOdds
            odds={data.rarityOdds}
            lockedLabels={{ epic: 'WAVE 5', legendary: 'WAVE 10' }}
            hint="Rations always stocked · Epic unlocks Wave 5 · Legendary unlocks Wave 10 · odds improve every wave"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
          {data.items.map(({ item, sold }, index) => {
            const affordable = data.gold >= item.cost;
            return (
              <button
                key={item.id}
                disabled={sold || !affordable}
                onClick={() => onBuy(item.id)}
                className="shop-offer clip-notch panel p-3 text-left flex flex-col min-h-0 sm:min-h-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ '--offer': item.color } as CSSProperties}
              >
                <div className="flex justify-between items-start">
                  <span className="w-10 h-10 clip-notch-sm bg-black/35 border flex items-center justify-center" style={{ color: item.color, borderColor: `${item.color}77` }}>
                    <PowerIcon icon={item.icon} size={26} />
                  </span>
                  <span className="kbd">{index + 1}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-3">
                  <div className="font-display text-[9px] font-bold tracking-[0.25em]" style={{ color: item.color }}>{item.kicker}</div>
                  <span className="font-display text-[8px] font-black tracking-[0.18em]" style={{ color: RARITY_META[item.rarity].color }}>
                    {RARITY_META[item.rarity].label}
                  </span>
                </div>
                <div className="font-display font-bold text-lg leading-tight text-parch mt-1">{item.name}</div>
                <p className="text-[13px] leading-tight text-faint mt-2">{item.desc}</p>
                <div className="mt-auto pt-3 font-display font-black text-sm tracking-[0.16em]" style={{ color: sold ? '#7d8aa0' : affordable ? '#ffd97a' : '#e05252' }}>
                  {sold ? 'SOLD OUT' : affordable ? `BUY · ${item.cost} G` : `${item.cost} G NEEDED`}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <p className="text-[11px] text-faint text-center sm:text-left">Each offering can be bought once. Permanent goods persist for this run.<br />Rerolls shared with level-ups · bosses restore all 3.</p>
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={onOpenIndex} className="btn-dark clip-notch px-4 py-3 shrink-0 text-xs font-bold">MARKET CATALOG</button>
            <button
              onClick={onReroll}
              disabled={data.rerollsLeft <= 0}
              title="Restock unsold offers (R). Boss kills restore rerolls."
              className="btn-dark clip-notch px-4 py-3 shrink-0 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M20 11a8 8 0 1 0-2.3 6.3M20 5v6h-6" />
              </svg>
              REROLL · {data.rerollsLeft}
            </button>
            <button onClick={onContinue} className="btn-gold clip-notch px-6 py-3 shrink-0 text-sm font-black">FACE WAVE {data.wave + 1}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/PauseOverlay.tsx`

```tsx
import type { ScoreEntry } from '../game/highscores';
import { Leaderboard } from './Leaderboard';
import { useViewport } from '../hooks/useViewport';

interface Props {
  wave: number;
  score: number;
  scores: ScoreEntry[];
  activeProfileId?: string;
  onOpenSettings: () => void;
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
}

export function PauseOverlay({ wave, score, scores, activeProfileId, onOpenSettings, onResume, onRestart, onMenu }: Props) {
  const vp = useViewport();
  return (
    <div className="absolute inset-0 z-40 bg-abyss/75 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-md p-4 sm:p-6 anim-fade-up my-auto">
        <div className="text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-faint">THE REALMS WAIT</div>
          <h2 className="font-display font-black text-3xl text-goldbright text-emboss mt-1">PAUSED</h2>
          <div className="text-xs text-parch/70 mt-1 font-bold tracking-wider">
            Wave {wave} · {score.toLocaleString()} score
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <button onClick={onResume} className="btn-gold clip-notch py-3 text-sm font-black">
            ▶ RESUME THE HUNT
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={onRestart} className="btn-dark clip-notch py-2.5 text-xs font-bold">
              ↻ RESTART RUN
            </button>
            <button onClick={onOpenSettings} className="btn-dark clip-notch py-2.5 text-xs font-bold flex items-center justify-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
              SETTINGS
            </button>
          </div>
          <button onClick={onMenu} className="btn-dark clip-notch py-2.5 text-xs font-bold text-blood/90">
            ⌂ ABANDON TO TITLE
          </button>
        </div>

        <div className="mt-5 border-t border-iron pt-3">
          {vp.coarse ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-parch/80">
              <div className="flex items-center gap-1.5">Left side — drag to move</div>
              <div className="flex items-center gap-1.5">Gold circle — attack</div>
              <div className="flex items-center gap-1.5">★ button — signature</div>
              <div className="flex items-center gap-1.5">◈ button — legacy ability</div>
              <div className="flex items-center gap-1.5">➤ button — dash (i-frames)</div>
              <div className="flex items-center gap-1.5 col-span-2">⏸ top-right — pause any time</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-parch/80">
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">WASD</span> move</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">SPACE</span>/<span className="kbd">CLICK</span> attack</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">SHIFT</span> dash · i-frames</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">E</span>/<span className="kbd">R-CLICK</span> signature</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">Q</span> legacy ability</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">ESC</span>/<span className="kbd">P</span> pause</div>
              <div className="flex items-center gap-1.5 flex-wrap"><span className="kbd">M</span> mute</div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="font-display text-[11px] tracking-[0.3em] text-gold mb-1.5">HALL OF LEGENDS</h3>
          <Leaderboard scores={scores} activeProfileId={activeProfileId} compact />
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/GameOverScreen.tsx`

```tsx
import type { GameStats } from '../game/engine';
import type { PlayerProfile, ScoreEntry } from '../game/highscores';
import { CLASSES } from '../game/data';
import { Leaderboard } from './Leaderboard';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface Props {
  stats: GameStats;
  scores: ScoreEntry[];
  profile: PlayerProfile | null;
  saveState: SaveState;
  saveError?: string;
  onRestart: () => void;
  onMenu: () => void;
  onRetry: () => void;
}

function StatCell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="panel clip-notch-sm px-2 py-2 text-center">
      <div className="font-display text-[9px] tracking-[0.28em] text-faint">{label}</div>
      <div className={`font-display font-black text-lg leading-tight ${accent ? 'text-goldbright text-emboss' : 'text-parch'}`}>
        {value}
      </div>
    </div>
  );
}

export function GameOverScreen({ stats, scores, profile, saveState, saveError, onRestart, onMenu, onRetry }: Props) {
  const isRecord = stats.score > 0 && (scores.length === 0 || stats.score >= scores[0].score);
  const cls = CLASSES.find((c) => c.id === stats.classId);
  const m = Math.floor(stats.timeSec / 60);
  const s = stats.timeSec % 60;

  return (
    <div className="absolute inset-0 z-50 bg-abyss/85 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-lg anim-fade-up">
          <div className="text-center">
            <div className="font-display text-[10px] tracking-[0.5em] text-faint">YOUR SAGA ENDS… FOR NOW</div>
            <h2 className="font-display font-black text-blood text-emboss-red text-[clamp(34px,8vw,58px)] leading-none mt-1">
              YOU HAVE FALLEN
            </h2>
            <div className="text-sm text-parch/80 mt-2 font-bold">
              <span style={{ color: cls?.color }}>{stats.playerName}</span>
              <span className="text-faint"> · the {stats.className} · slain by </span>
              <span className="text-[#ff9a9a]">{stats.killer}</span>
            </div>
            {isRecord && (
              <div className="inline-block mt-2 font-display font-bold text-[11px] tracking-[0.3em] text-abyss bg-goldbright px-3 py-1 clip-notch-sm anim-pulse-gold">
                ★ NEW LEGEND — TOP SCORE ★
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <StatCell label="SCORE" value={stats.score.toLocaleString()} accent />
            <StatCell label="WAVE" value={`${stats.wave}`} />
            <StatCell label="LEVEL" value={`${stats.level}`} />
            <StatCell label="KILLS" value={`${stats.kills}`} />
            <StatCell label="GOLD" value={`${stats.gold}`} />
            <StatCell label="TIME" value={`${m}:${s.toString().padStart(2, '0')}`} />
          </div>

          {/* profile-aware leaderboard entry */}
          <div className="panel-gold clip-notch p-3 mt-3">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div>
                <div className="font-display text-[10px] tracking-[0.3em] text-gold">REALM LEDGER</div>
                <div className="text-[11px] text-faint mt-0.5">
                  Hero <span className="text-parch font-bold">{stats.playerName}</span> is recorded under{' '}
                  <span className="text-goldbright font-bold">{profile?.name ?? stats.profileName}</span>.
                </div>
              </div>
              {saveState === 'error' ? (
                <button onClick={onRetry} className="btn-gold clip-notch-sm px-4 py-2 text-xs font-black shrink-0 bg-blood/80">
                  RETRY SAVE
                </button>
              ) : (
                <span
                  className={`clip-notch-sm px-3 py-1.5 text-[10px] font-black tracking-widest shrink-0 flex items-center gap-1.5 ${
                    saveState === 'saved' ? 'text-verdant' : 'text-faint'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      saveState === 'saved' ? 'bg-verdant' : 'bg-gold animate-pulse'
                    }`}
                  />
                  {saveState === 'saved' ? 'INSCRIBED ✓' : 'SAVING…'}
                </span>
              )}
            </div>
            {saveState === 'error' && (
              <p className="text-[11px] text-blood mb-2">
                {saveError || 'Could not save this run.'} Your local progress is safe — press RETRY SAVE to try again.
              </p>
            )}
            <Leaderboard scores={scores} activeProfileId={stats.profileId} compact />
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={onRestart} className="btn-gold clip-notch flex-1 py-3.5 text-sm font-black tracking-[0.15em]">
              ⚔ RISE AGAIN <span className="opacity-60 text-[10px] align-middle">(R)</span>
            </button>
            <button onClick={onMenu} className="btn-dark clip-notch px-5 py-3.5 text-xs font-bold">
              ⌂ TITLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/AccountPanel.tsx`

```tsx
import { useState, type FormEvent, type ReactNode } from 'react';
import type { PlayerProfile } from '../game/highscores';
import { ClassEmblem } from './ClassEmblem';

interface Props {
  profiles: PlayerProfile[];
  activeProfile: PlayerProfile | null;
  cloudStatus?: { ok: boolean; message: string };
  required?: boolean;
  onCreate: (name: string, password: string, confirmation: string) => Promise<string | null>;
  onLogin: (username: string, password: string) => Promise<string | null>;
  onSetPassword: (id: string, password: string, confirmation: string) => Promise<string | null>;
  onClose: () => void;
}

type Mode = 'login' | 'signup' | 'set-password';

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between">
        <span className="font-display text-[10px] tracking-[0.28em] text-gold/90">{label}</span>
        {hint && <span className="text-[10px] text-faint">{hint}</span>}
      </span>
      <div className="mt-1.5 relative">{children}</div>
    </label>
  );
}

const inputClass =
  'w-full bg-[#070b12] border border-[#4a3d24] focus:border-goldbright outline-none rounded-sm px-3.5 py-3 text-parch font-medium tracking-wide shadow-[inset_0_2px_8px_rgba(0,0,0,0.55)] placeholder:text-[#5d6778]';

export function AccountPanel({ profiles, activeProfile, cloudStatus, required = false, onCreate, onLogin, onSetPassword, onClose }: Props) {
  const [mode, setMode] = useState<Mode>(profiles.length ? 'login' : 'signup');
  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem('aetheria-remembered-user') || activeProfile?.name || '';
    } catch {
      return activeProfile?.name ?? '';
    }
  });
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [legacyId, setLegacyId] = useState('');

  const setModeSafe = (next: Mode) => {
    setMode(next);
    setError('');
    setPassword('');
    setConfirmation('');
    setShowPass(false);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    let message: string | null = null;
    if (mode === 'signup') message = await onCreate(username, password, confirmation);
    else if (mode === 'set-password') message = await onSetPassword(legacyId, password, confirmation);
    else message = await onLogin(username, password);
    setBusy(false);
    if (mode === 'login' && remember) {
      try {
        localStorage.setItem('aetheria-remembered-user', username);
      } catch {
        /* ignore */
      }
    }
    if (message) {
      if (/legacy|needs a new password/i.test(message)) {
        const match = profiles.find((p) => p.name.toLowerCase() === username.trim().toLowerCase());
        if (match) {
          setLegacyId(match.id);
          setMode('set-password');
          setError('This older profile needs a password before it can sign in.');
          setPassword('');
          setConfirmation('');
          return;
        }
      }
      setError(message);
    } else {
      setPassword('');
      setConfirmation('');
    }
  };

  const isSignup = mode === 'signup';
  const isSetPw = mode === 'set-password';

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center px-3 py-5 overflow-y-auto">
      {/* full-bleed gate backdrop so the title screen never bleeds through */}
      <div className="absolute inset-0 bg-[#05070c]" />
      <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(226,180,92,0.10) 0%, transparent 58%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.65) 100%)' }} />

      <div className="relative w-full max-w-[430px] anim-fade-up my-auto">
        {/* crest */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-gold mb-2">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
            <ClassEmblem classId="sandseer" size={24} />
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <div className="font-display text-[10px] tracking-[0.5em] text-gold/80">AETHERIA REALM GATE</div>
          <h2 className="font-display font-black text-[clamp(30px,8vw,46px)] leading-none text-goldbright text-emboss mt-1.5">
            {isSignup ? 'CREATE ACCOUNT' : isSetPw ? 'SECURE ACCOUNT' : 'SIGN IN'}
          </h2>
          <p className="text-[12.5px] text-parch/70 mt-2.5 px-4">
            {isSignup
              ? 'Choose the name that will carry your legend on the leaderboard.'
              : isSetPw
                ? 'Set a password for this existing adventurer.'
                : 'Welcome back, adventurer. The realms have missed you.'}
          </p>
        </div>

        <div className="relative panel-gold p-[1px]" style={{ clipPath: 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)' }}>
          <div className="absolute left-2 top-2 w-3 h-3 border-l border-t border-gold/70 z-10" />
          <div className="absolute right-2 top-2 w-3 h-3 border-r border-t border-gold/70 z-10" />
          <div className="absolute left-2 bottom-2 w-3 h-3 border-l border-b border-gold/70 z-10" />
          <div className="absolute right-2 bottom-2 w-3 h-3 border-r border-b border-gold/70 z-10" />

          <div className="bg-[#0d131d] px-5 py-6 sm:px-7">
            <form onSubmit={submit} className="flex flex-col gap-4">
              {!isSetPw && (
                <Field label="USERNAME" hint={isSignup ? '3–16 characters' : undefined}>
                  <input
                    value={username}
                    maxLength={16}
                    autoFocus
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                    placeholder={isSignup ? 'Pick a username' : 'Your username'}
                    className={inputClass}
                  />
                </Field>
              )}

              {isSetPw && (
                <div className="text-[12px] text-parch/75 bg-black/30 border border-gold/20 px-3 py-2 rounded-sm">
                  Protect <span className="text-goldbright font-bold">{username || 'this adventurer'}</span> with a new password.
                </div>
              )}

              <Field label="PASSWORD" hint={mode === 'login' ? undefined : '8+ chars · upper, lower, number'}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  maxLength={32}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'login' ? 'Your password' : 'Create a password'}
                  className={`${inputClass} pr-16`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-wider text-faint hover:text-goldbright px-2 py-1"
                >
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </Field>

              {mode !== 'login' && (
                <Field label="CONFIRM PASSWORD">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={confirmation}
                    maxLength={32}
                    autoComplete="new-password"
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="Repeat password"
                    className={inputClass}
                  />
                </Field>
              )}

              {mode === 'login' && (
                <label className="flex items-center gap-2 text-[12px] text-parch/70 select-none -mt-1">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-[#dca944] w-3.5 h-3.5" />
                  Remember username on this device
                </label>
              )}

              {error && <div className="text-[12px] text-[#ff8a8a] bg-[#3a1518]/70 border border-[#7a2b2b] px-3 py-2 rounded-sm">{error}</div>}

              <button
                type="submit"
                disabled={busy}
                className="btn-gold w-full py-3.5 text-sm font-black tracking-[0.18em] disabled:opacity-50"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                {busy ? 'AUTHENTICATING…' : isSignup ? 'CREATE ACCOUNT' : isSetPw ? 'SAVE PASSWORD' : 'ENTER REALM'}
              </button>
            </form>

            {/* switch link */}
            {!isSetPw && (
              <div className="mt-5 pt-4 border-t border-[#2a3344] text-center">
                <span className="text-[12px] text-faint">{isSignup ? 'Already have an account?' : 'New to Aetheria?'} </span>
                <button
                  onClick={() => setModeSafe(isSignup ? 'login' : 'signup')}
                  className="text-[12px] font-display font-bold tracking-[0.12em] text-goldbright hover:text-gold underline underline-offset-4 decoration-gold/40 ml-1"
                >
                  {isSignup ? 'SIGN IN' : 'SIGN UP'}
                </button>
              </div>
            )}
            {isSetPw && (
              <div className="mt-5 pt-4 border-t border-[#2a3344] text-center">
                <button onClick={() => setModeSafe('login')} className="text-[12px] font-display font-bold tracking-[0.12em] text-goldbright hover:text-gold underline underline-offset-4 decoration-gold/40">
                  ← BACK TO SIGN IN
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[#2a3344] text-[10px] tracking-wider text-faint">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: cloudStatus?.ok ? '#46c8a8' : '#e05252' }} />
                  {cloudStatus?.ok ? 'CLOUD SYNC ACTIVE' : 'OFFLINE MODE'}
                </span>
                <span>{cloudStatus?.ok ? 'SUPABASE' : 'THIS BROWSER ONLY'}</span>
              </div>
              {cloudStatus && !cloudStatus.ok && (
                <p className="mt-2 text-[10px] leading-relaxed text-[#ffb36b] normal-case tracking-normal">{cloudStatus.message}</p>
              )}
            </div>
          </div>
        </div>

        {!required && (
          <button onClick={onClose} className="btn-dark w-full mt-3 py-2.5 text-xs font-bold" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            RETURN TO TITLE
          </button>
        )}
      </div>
    </div>
  );
}
```

## File: `src/components/ProfilePanel.tsx`

```tsx
import { useState, type FormEvent } from 'react';
import { CLASSES } from '../game/data';
import type { PlayerProfile } from '../game/highscores';
import { ClassEmblem } from './ClassEmblem';

interface Props {
  profile: PlayerProfile;
  cloud: boolean;
  onlineCount: number;
  onChangePassword: (current: string, next: string, confirm: string) => Promise<string | null>;
  onLogout: () => void;
  onQuit: () => void;
  onClose: () => void;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="panel clip-notch-sm px-2 py-2.5 text-center">
      <div className="font-display text-[9px] tracking-[0.25em] text-faint">{label}</div>
      <div className={`font-display font-black text-lg leading-tight mt-0.5 ${accent ? 'text-goldbright text-emboss' : 'text-parch'}`}>{value}</div>
    </div>
  );
}

const inputClass =
  'w-full bg-[#070b12] border border-[#4a3d24] focus:border-goldbright outline-none rounded-sm px-3 py-2.5 text-parch font-medium tracking-wide shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] placeholder:text-[#5d6778]';

export function ProfilePanel({ profile, cloud, onlineCount, onChangePassword, onLogout, onQuit, onClose }: Props) {
  const [pwOpen, setPwOpen] = useState(false);
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);

  const cls = CLASSES.find((c) => c.id === profile.preferredClass) ?? CLASSES[0];
  const unlockedCount = profile.unlockedClasses?.length ?? 1;
  const joined = new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const heroBests = Object.entries(profile.heroBests ?? {}).sort((a, b) => b[1].score - a[1].score);

  const submitPw = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const err = await onChangePassword(cur, next, confirm);
    setBusy(false);
    if (err) setMsg({ ok: false, text: err });
    else {
      setMsg({ ok: true, text: 'Password updated.' });
      setCur('');
      setNext('');
      setConfirm('');
      setPwOpen(false);
    }
  };

  return (
    <div className="absolute inset-0 z-[62] flex items-center justify-center bg-abyss/92 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg my-auto anim-fade-up">
        <div className="panel-gold clip-notch p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${cls.color}2e 0%, transparent 65%)` }} />

          <button
            onClick={onClose}
            aria-label="Close profile"
            className="absolute right-3 top-3 z-10 w-9 h-9 clip-notch-sm panel flex items-center justify-center text-faint hover:text-blood hover:border-blood/60 active:scale-90 transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* identity */}
          <div className="flex items-center gap-4 relative pr-10">
            <div className="relative w-[84px] h-[84px] shrink-0">
              <div className="absolute inset-0 rounded-full border border-dashed anim-spin-slow" style={{ borderColor: `${cls.color}88` }} />
              <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${cls.color}30 0%, transparent 65%)` }} />
              <div className="absolute inset-0 flex items-center justify-center" style={{ color: cls.color }}>
                <ClassEmblem classId={cls.id} size={48} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-display text-[10px] tracking-[0.4em] text-gold">ADVENTURER</div>
              <div className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss leading-none truncate">{profile.name}</div>
              <div className="text-[11px] text-faint mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${cloud ? 'bg-verdant' : 'bg-faint'}`} />
                  {cloud ? `Online · ${onlineCount} in realm` : 'Offline · this browser'}
                </span>
                <span className="w-[1px] h-3 bg-iron" />
                <span>Joined {joined}</span>
              </div>
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            <Stat label="BEST SCORE" value={profile.bestScore.toLocaleString()} accent />
            <Stat label="BEST WAVE" value={`${profile.bestWave}`} />
            <Stat label="RUNS" value={`${profile.runs}`} />
            <Stat label="TOTAL KILLS" value={profile.totalKills.toLocaleString()} />
            <Stat label="LEGENDS" value={`${unlockedCount}/${CLASSES.length}`} />
            <Stat label="MAIN" value={cls.name.split(' ')[0]} />
          </div>

          {/* per-hero bests */}
          {heroBests.length > 0 && (
            <div className="mt-4">
              <div className="font-display text-[10px] tracking-[0.3em] text-gold mb-1.5">RECORDS BY LEGEND</div>
              <div className="flex flex-col gap-[3px]">
                {heroBests.map(([id, best]) => {
                  const c = CLASSES.find((x) => x.id === id);
                  return (
                    <div key={id} className="flex items-center gap-2 px-2 py-1 bg-black/25 clip-notch-sm text-sm">
                      <span style={{ color: c?.color ?? '#8a94a8' }}>
                        <ClassEmblem classId={id} size={15} />
                      </span>
                      <span className="text-parch font-bold truncate">{c?.name ?? id}</span>
                      <span className="text-faint text-[10px] ml-auto">W{best.wave} · {best.runs} runs</span>
                      <span className="font-display font-bold text-gold tabular-nums w-[64px] text-right">{best.score.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* security */}
          <div className="mt-5 border-t border-iron pt-4">
            {!pwOpen ? (
              <button onClick={() => { setPwOpen(true); setMsg(null); }} className="btn-dark clip-notch w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2">
                🔑 CHANGE PASSWORD
              </button>
            ) : (
              <form onSubmit={submitPw} className="flex flex-col gap-2.5">
                <div className="font-display text-[10px] tracking-[0.3em] text-gold">CHANGE PASSWORD</div>
                <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} placeholder="Current password" autoComplete="current-password" className={inputClass} />
                <input type="password" value={next} maxLength={32} onChange={(e) => setNext(e.target.value)} placeholder="New password (8+, upper, lower, number)" autoComplete="new-password" className={inputClass} />
                <input type="password" value={confirm} maxLength={32} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" className={inputClass} />
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setPwOpen(false); setMsg(null); }} className="btn-dark clip-notch-sm flex-1 py-2.5 text-xs font-bold">
                    CANCEL
                  </button>
                  <button type="submit" disabled={busy} className="btn-gold clip-notch-sm flex-1 py-2.5 text-xs font-black disabled:opacity-50">
                    {busy ? 'SAVING…' : 'SAVE PASSWORD'}
                  </button>
                </div>
              </form>
            )}
            {msg && (
              <p className={`text-[11px] mt-2 ${msg.ok ? 'text-verdant' : 'text-blood'}`}>{msg.text}</p>
            )}
          </div>

          {/* session */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={onLogout} className="btn-dark clip-notch py-3 text-xs font-bold flex items-center justify-center gap-2 hover:border-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M15 17l5-5-5-5M20 12H9M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
              </svg>
              LOG OUT
            </button>
            {!confirmQuit ? (
              <button onClick={() => setConfirmQuit(true)} className="btn-dark clip-notch py-3 text-xs font-bold flex items-center justify-center gap-2 text-blood/90 hover:border-blood">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 3v9M6.5 6.5a8 8 0 1 0 11 0" />
                </svg>
                QUIT GAME
              </button>
            ) : (
              <button onClick={onQuit} className="btn-gold clip-notch py-3 text-xs font-black bg-blood/80 flex items-center justify-center">
                CONFIRM QUIT
              </button>
            )}
          </div>
          {confirmQuit && <p className="text-[10px] text-faint mt-1.5 text-center">Quitting closes the game window. Your progress is already saved.</p>}
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/SettingsOverlay.tsx`

```tsx
import { useEffect, type ReactNode } from 'react';
import { VolumeControl } from './VolumeControl';

interface Props {
  musicOn: boolean;
  muted: boolean;
  musicVol: number;
  sfxVol: number;
  version: string;
  cloud: boolean;
  /** shown only when opened from the title screen */
  onSwitchAccount?: () => void;
  onOpenProfile?: () => void;
  onOpenTutorial?: () => void;
  onOpenPatchNotes?: () => void;
  onOpenIndex?: () => void;
  onMusicVol: (v: number) => void;
  onSfxVol: (v: number) => void;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel clip-notch px-3.5 py-3">
      <div className="font-display text-[10px] tracking-[0.3em] text-gold mb-2.5">{title}</div>
      {children}
    </section>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="min-w-0">
        <span className="block text-[12.5px] font-bold text-parch">{label}</span>
        {hint && <span className="block text-[10.5px] text-faint mt-0.5">{hint}</span>}
      </span>
      <span className="shrink-0">{children}</span>
    </div>
  );
}

export function SettingsOverlay({
  musicOn, muted, musicVol, sfxVol, version, cloud,
  onSwitchAccount, onOpenProfile, onOpenTutorial, onOpenPatchNotes,
  onOpenIndex,
  onMusicVol, onSfxVol, onToggleMusic, onToggleMute, onClose,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  const linkBtn =
    'btn-dark clip-notch-sm w-full py-2.5 text-[11px] font-bold flex items-center justify-center gap-2';

  return (
    <div className="absolute inset-0 z-[61] flex items-center justify-center bg-abyss/92 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-md my-auto anim-fade-up">
        <div className="panel-gold clip-notch p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close settings"
            title="Close (Esc)"
            className="absolute right-3 top-3 w-9 h-9 clip-notch-sm panel flex items-center justify-center text-faint hover:text-blood hover:border-blood/60 active:scale-90 transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5 pr-10">
            <span className="w-10 h-10 clip-notch-sm bg-black/40 border border-gold/50 flex items-center justify-center text-goldbright shrink-0 anim-spin-slow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="font-display text-[10px] tracking-[0.45em] text-gold">REALM OPTIONS</div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss leading-none">SETTINGS</h2>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mt-5">
            <Section title="AUDIO">
              <Row label="Music" hint="Realm themes & boss battle tracks">
                <VolumeControl label="Music" icon="music" value={musicVol} muted={!musicOn} compact onChange={onMusicVol} onToggle={onToggleMusic} />
              </Row>
              <div className="h-[1px] bg-iron my-1" />
              <Row label="Sound effects" hint="Combat, loot and ability cues">
                <VolumeControl label="Effects" icon="sfx" value={sfxVol} muted={muted} compact onChange={onSfxVol} onToggle={onToggleMute} />
              </Row>
            </Section>

            {(onOpenTutorial || onOpenPatchNotes || onOpenIndex) && (
              <Section title="HELP & INFO">
                <div className="grid grid-cols-2 gap-2">
                  {onOpenIndex && (
                    <button onClick={onOpenIndex} className={linkBtn}>
                      📚 POWER & ITEM INDEX
                    </button>
                  )}
                  {onOpenTutorial && (
                    <button onClick={onOpenTutorial} className={linkBtn}>
                      ? REPLAY TUTORIAL
                    </button>
                  )}
                  {onOpenPatchNotes && (
                    <button onClick={onOpenPatchNotes} className={linkBtn}>
                      🛠 PATCH NOTES
                    </button>
                  )}
                </div>
              </Section>
            )}

            {(onOpenProfile || onSwitchAccount) && (
              <Section title="ACCOUNT">
                <div className="grid grid-cols-2 gap-2">
                  {onOpenProfile && (
                    <button onClick={onOpenProfile} className={linkBtn}>
                      👤 MY PROFILE
                    </button>
                  )}
                  {onSwitchAccount && (
                    <button onClick={onSwitchAccount} className={linkBtn}>
                      ⇄ SWITCH ACCOUNT
                    </button>
                  )}
                </div>
              </Section>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-iron flex items-center justify-between text-[10px] tracking-wider text-faint">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cloud ? '#46c8a8' : '#e05252' }} />
              {cloud ? 'CLOUD SYNC ACTIVE' : 'OFFLINE MODE'}
            </span>
            <span>AETHERIA v{version}</span>
          </div>

          <button onClick={onClose} className="btn-gold clip-notch w-full mt-4 py-3 text-sm font-black tracking-[0.15em]">
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/PatchNotesOverlay.tsx`

```tsx
import type { PatchNote } from '../game/patchnotes';

interface Props {
  notes: PatchNote[];
  currentVersion: string;
  lastSeen: string | null;
  onClose: () => void;
}

const KIND: Record<PatchNote['changes'][number]['kind'], { label: string; color: string }> = {
  new: { label: 'NEW', color: '#46c8a8' },
  improved: { label: 'IMPROVED', color: '#6fb7ff' },
  balance: { label: 'BALANCE', color: '#ffd24a' },
  fixed: { label: 'FIXED', color: '#ff9a9a' },
};

export function PatchNotesOverlay({ notes, currentVersion, lastSeen, onClose }: Props) {
  return (
    <div className="absolute inset-0 z-[55] flex items-center justify-center bg-abyss/88 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl my-auto anim-fade-up">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div>
            <div className="font-display text-[10px] tracking-[0.5em] text-gold">CHRONICLE OF CHANGES</div>
            <h2 className="font-display font-black text-[clamp(24px,5vw,40px)] leading-none text-goldbright text-emboss mt-1">PATCH NOTES</h2>
            <div className="text-[11px] text-faint mt-1">
              You are playing <span className="text-parch font-bold">v{currentVersion}</span>
              {lastSeen && lastSeen !== currentVersion && (
                <>
                  {' '}
                  · updated from <span className="text-parch/80">v{lastSeen}</span>
                </>
              )}
            </div>
          </div>
          <button onClick={onClose} className="btn-dark clip-notch-sm px-3 py-2 text-xs font-bold shrink-0">
            ✕ CLOSE
          </button>
        </div>

        <div className="space-y-3">
          {notes.map((n, i) => {
            const isNew = lastSeen === null ? i === 0 : n.version !== lastSeen && i === 0;
            return (
              <article key={n.version} className={`clip-notch p-4 sm:p-5 ${i === 0 ? 'panel-gold' : 'panel'}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-black text-goldbright text-lg">v{n.version}</span>
                  <span className="font-display text-sm text-parch">— {n.title}</span>
                  <span className="text-[10px] text-faint ml-auto">{new Date(n.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  {isNew && (
                    <span className="text-[9px] font-display font-bold tracking-[0.25em] text-abyss bg-goldbright px-2 py-0.5 clip-notch-sm">LATEST</span>
                  )}
                </div>
                {n.highlights.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {n.highlights.map((h) => (
                      <li key={h} className="text-[11px] text-parch/90 border border-gold/30 bg-gold/10 clip-notch-sm px-2 py-0.5">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-3 space-y-1.5">
                  {n.changes.map((c, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-parch/85">
                      <span
                        className="font-display text-[8px] font-bold tracking-[0.2em] px-1.5 py-[3px] clip-notch-sm shrink-0 mt-[2px] w-[68px] text-center"
                        style={{ color: KIND[c.kind].color, border: `1px solid ${KIND[c.kind].color}55`, background: `${KIND[c.kind].color}14` }}
                      >
                        {KIND[c.kind].label}
                      </span>
                      <span>{c.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/TutorialOverlay.tsx`

```tsx
import { useEffect, useState, type ReactNode } from 'react';
import { ClassEmblem } from './ClassEmblem';
import { PowerIcon } from './PowerIcon';

interface Props {
  isTouch: boolean;
  onClose: () => void;
}

interface Controls {
  /** keyboard + mouse instruction */
  pc?: ReactNode;
  /** touch instruction */
  touch?: ReactNode;
}

interface Step {
  kicker: string;
  title: string;
  body: ReactNode;
  controls?: Controls;
  art: ReactNode;
}

const K = ({ k }: { k: string }) => <span className="kbd mx-0.5">{k}</span>;

const Sigil = ({ color, children, size = 72 }: { color: string; children: ReactNode; size?: number }) => (
  <span
    className="rounded-full flex items-center justify-center border-2 shrink-0"
    style={{ width: size, height: size, borderColor: color, color, boxShadow: `0 0 28px ${color}55`, background: `${color}12` }}
  >
    {children}
  </span>
);

const STEPS: Step[] = [
  {
    kicker: 'WELCOME',
    title: 'Realms of Aetheria',
    body: (
      <>
        Five cultures, one endless tide of monsters. You are a <b className="text-goldbright">legend</b> — survive escalating waves, grow
        stronger, and inscribe your name in the realm ledger. This guide takes about a minute, and you can replay it any time from the
        title screen.
      </>
    ),
    art: (
      <div className="grid grid-cols-3 gap-5 place-items-center">
        {['kensei', 'shieldthane', 'jaguar', 'sandseer', 'tidecaller', 'riftblade'].map((c, i) => (
          <span key={c} className="anim-floaty" style={{ color: ['#ff6b6b', '#6fb7ff', '#ff9d3c', '#e6c26a', '#55d9e8', '#b68cff'][i], animationDelay: `${i * 220}ms` }}>
            <ClassEmblem classId={c} size={40} />
          </span>
        ))}
      </div>
    ),
  },
  {
    kicker: 'LEGEND STATS',
    title: 'Read the four attributes',
    body: (
      <span className="block space-y-2">
        <span className="block">The bars compare each legend with the rest of the roster. A longer bar means a stronger starting attribute.</span>
        <span className="block text-[13px] leading-relaxed">
          <b className="text-[#ff9a9a]">VIT</b> — maximum health and survivability<br />
          <b className="text-goldbright">PWR</b> — weapon and ability damage<br />
          <b className="text-[#78e0d0]">SPD</b> — movement speed around the arena<br />
          <b className="text-[#d7adff]">CRIT</b> — chance for a hit to deal 2× damage
        </span>
        <span className="block text-faint text-[12px]">Level-up powers and market equipment can improve these during a run.</span>
      </span>
    ),
    art: (
      <div className="w-full max-w-[190px] flex flex-col gap-3">
        {[
          ['VIT', '88%', '#ff7d7d'],
          ['PWR', '72%', '#ffd97a'],
          ['SPD', '84%', '#78e0d0'],
          ['CRIT', '48%', '#d7adff'],
        ].map(([label, width, color]) => (
          <div key={label} className="grid grid-cols-[34px_1fr] items-center gap-2">
            <span className="font-display text-[9px] tracking-[0.2em] text-parch">{label}</span>
            <span className="bar-shell clip-notch-sm h-2">
              <span className="bar-fill block" style={{ width, background: `linear-gradient(90deg, ${color}, #efe3c2)` }} />
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    kicker: 'MOVE',
    title: 'Stay moving',
    body: <>Standing still is how legends die. Keep circling — almost every enemy is slower than you.</>,
    controls: {
      pc: (
        <>
          <K k="W" /> <K k="A" /> <K k="S" /> <K k="D" /> or arrow keys
        </>
      ),
      touch: <>Drag anywhere on the <b className="text-goldbright">left half</b> — a joystick appears under your thumb</>,
    },
    art: (
      <div className="relative w-32 h-32 rounded-full border-2 border-gold/40 bg-white/5 flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border border-gold/20" />
        <div className="w-12 h-12 rounded-full bg-gold/45 border-2 border-goldbright anim-floaty" />
      </div>
    ),
  },
  {
    kicker: 'ATTACK',
    title: 'Your blade aims itself',
    body: (
      <>
        Hold to swing continuously. Your weapon automatically turns toward the nearest foe, so you only ever think about{' '}
        <b className="text-goldbright">positioning</b>. Critical hits flash gold.
      </>
    ),
    controls: {
      pc: (
        <>
          Hold <K k="SPACE" /> or <K k="LEFT CLICK" />
        </>
      ),
      touch: <>Hold the big <b className="text-goldbright">gold circle</b> (bottom-right)</>,
    },
    art: (
      <Sigil color="#ffd97a" size={96}>
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M4 20 L15 9 M13 5 L19 11 M15 9 L19 5 M17.5 2.5 L21.5 6.5" strokeLinejoin="round" />
        </svg>
      </Sigil>
    ),
  },
  {
    kicker: 'DASH',
    title: 'Dash through danger',
    body: (
      <>
        You are <b className="text-goldbright">invulnerable</b> for the entire dash. Dash straight <i>through</i> a Warbrute&apos;s charge
        rather than away from it.
      </>
    ),
    controls: {
      pc: (
        <>
          <K k="SHIFT" />
        </>
      ),
      touch: <>The <b className="text-[#8ce0e8]">➤ sigil</b> above the attack button</>,
    },
    art: (
      <Sigil color="#8ce0e8" size={84}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M3 12 H14 M10 6 L17 12 L10 18" />
          <path d="M17 6 H21 M18 18 H21" opacity="0.6" />
        </svg>
      </Sigil>
    ),
  },
  {
    kicker: 'ABILITIES',
    title: 'Two abilities, one story',
    body: (
      <>
        Every legend has a <b className="text-goldbright">Signature</b> and a <b className="text-[#d7adff]">Legacy</b>. Both come straight
        from that legend&apos;s saga — the Kensei&apos;s <i>Still Water</i> slows the world because they trained to strike between
        raindrops. Read every saga in <b>Sagas</b> on the title screen.
      </>
    ),
    controls: {
      pc: (
        <>
          <K k="E" /> signature · <K k="Q" /> legacy
        </>
      ),
      touch: <>The <b className="text-[#ffd97a]">★</b> and <b className="text-[#d7adff]">◈</b> sigils</>,
    },
    art: (
      <div className="flex gap-7">
        <Sigil color="#ffd97a">
          <PowerIcon icon="spark" size={34} />
        </Sigil>
        <Sigil color="#d7adff">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M12 2 20 12 12 22 4 12Z" />
            <path d="M12 7 15.5 12 12 17 8.5 12Z" fill="currentColor" opacity="0.55" />
          </svg>
        </Sigil>
      </div>
    ),
  },
  {
    kicker: 'WAVES',
    title: 'Waves, threat and bosses',
    body: (
      <>
        Each wave is a new realm — Jade Coast, Ember Steppes, Frostveil, Sunspire, Dune Sea — and each is harder than the last. Every{' '}
        <b className="text-goldbright">5th wave</b> summons a world boss with its own battle music. Watch for the red ring: a charge is
        coming.
      </>
    ),
    art: (
      <div className="flex flex-col items-center gap-3">
        <div className="font-display text-goldbright text-emboss text-3xl tracking-widest">WAVE 5</div>
        <div className="bar-shell clip-notch-sm h-3 w-52">
          <div className="bar-fill w-3/4" style={{ background: 'linear-gradient(180deg,#ff7d7d,#a92626)' }} />
        </div>
        <div className="text-[10px] tracking-[0.35em] text-[#ff9a9a]">WORLD BOSS</div>
      </div>
    ),
  },
  {
    kicker: 'GROW',
    title: 'Level up, then shop',
    body: (
      <>
        Kills give XP. On every <b className="text-goldbright">level up</b> the fight pauses and you draft one of three permanent powers.
        Between waves a <b className="text-goldbright">Traveling Market</b> opens — spend looted coins on healing, tonics and permanent
        steel.
      </>
    ),
    controls: {
      pc: (
        <>
          Press <K k="1" /> <K k="2" /> <K k="3" /> to pick instantly
        </>
      ),
      touch: <>Tap a card to choose</>,
    },
    art: (
      <div className="flex gap-5">
        {['blade', 'heart', 'coin'].map((i, n) => (
          <Sigil key={i} color={['#ff907d', '#7fc4ff', '#ffd24a'][n]} size={64}>
            <PowerIcon icon={i} size={30} />
          </Sigil>
        ))}
      </div>
    ),
  },
  {
    kicker: 'LOOT',
    title: 'Coins, potions, runes',
    body: (
      <>
        Walk near loot and it flies to you. <span className="text-[#ffd24a] font-bold">Coins</span> fund the market,{' '}
        <span className="text-[#ff8a8a] font-bold">potions</span> heal, and a rare <span className="text-goldbright font-bold">Sun Rune</span>{' '}
        empowers your damage for eight seconds. Kill streaks build a <span className="text-emerald-300 font-bold">CHAIN</span> that
        multiplies your score.
      </>
    ),
    art: (
      <div className="flex gap-7 items-center">
        <span className="w-8 h-9 rounded-full bg-[#ffd24a] border-2 border-[#a87b1e] anim-floaty" />
        <span className="w-7 h-9 rounded-b-full bg-[#e05252] border-t-4 border-[#8a5a2a] anim-floaty" style={{ animationDelay: '200ms' }} />
        <span className="w-8 h-8 rotate-45 bg-goldbright border-2 border-[#54c9b4] anim-floaty" style={{ animationDelay: '400ms' }} />
      </div>
    ),
  },
  {
    kicker: 'LEGENDS',
    title: 'Unlock eight legends',
    body: (
      <>
        You begin as the <b className="text-goldbright">Kensei</b>. Reach waves 8, 15 and 25 to unlock the Shieldthane, Jaguar Knight and
        Sandseer. The <b className="text-[#55d9e8]">Tidecaller</b> (wave 40) and <b className="text-[#b68cff]">Riftblade</b> (wave 60) are
        for true legends — and beyond them wait the <b className="text-[#6ef3ff]">Stormwarden</b> (wave 80) and{' '}
        <b className="text-[#ff5a3c]">Drakewarden</b> (wave 100). Unlocks save to your account, even if you abandon a run.
      </>
    ),
    art: (
      <div className="flex gap-7">
        <span className="text-[#55d9e8] anim-floaty">
          <ClassEmblem classId="tidecaller" size={58} />
        </span>
        <span className="text-[#b68cff] anim-floaty" style={{ animationDelay: '300ms' }}>
          <ClassEmblem classId="riftblade" size={58} />
        </span>
      </div>
    ),
  },
  {
    kicker: 'REALM',
    title: 'Ledger, feed and pause',
    body: (
      <>
        Every fall is inscribed automatically to the <b className="text-goldbright">Realm Ledger</b> — ranked overall and per hero. The
        world feed shows what other adventurers achieve in real time. Check <b>Patch Notes</b> when the badge lights up.
      </>
    ),
    controls: {
      pc: (
        <>
          <K k="ESC" /> or the ⏸ button (top-right) to pause
        </>
      ),
      touch: <>Tap the <b className="text-goldbright">⏸ button</b> in the top-right corner</>,
    },
    art: (
      <div className="panel-gold clip-notch-sm w-16 h-16 flex items-center justify-center text-goldbright">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4.2" height="16" rx="1.2" />
          <rect x="13.8" y="4" width="4.2" height="16" rx="1.2" />
        </svg>
      </div>
    ),
  },
];

function ControlRow({ controls, isTouch }: { controls: Controls; isTouch: boolean }) {
  const rows: { tag: string; node: ReactNode; primary: boolean }[] = [];
  if (controls.pc) rows.push({ tag: 'KEYBOARD', node: controls.pc, primary: !isTouch });
  if (controls.touch) rows.push({ tag: 'TOUCH', node: controls.touch, primary: isTouch });
  rows.sort((a, b) => Number(b.primary) - Number(a.primary));

  return (
    <div className="mt-4 flex flex-col gap-1.5">
      {rows.map((r) => (
        <div
          key={r.tag}
          className={`flex items-center gap-2.5 px-2.5 py-1.5 clip-notch-sm border text-[12px] ${
            r.primary ? 'border-gold/45 bg-gold/10 text-parch' : 'border-iron bg-black/25 text-parch/65'
          }`}
        >
          <span
            className="font-display text-[8px] font-bold tracking-[0.2em] w-[62px] shrink-0 text-center py-[3px] clip-notch-sm"
            style={{
              color: r.primary ? '#ffd97a' : '#8a94a8',
              border: `1px solid ${r.primary ? '#e2b45c66' : '#2a3448'}`,
            }}
          >
            {r.tag}
          </span>
          <span className="min-w-0">{r.node}</span>
        </div>
      ))}
    </div>
  );
}

export function TutorialOverlay({ isTouch, onClose }: Props) {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowRight' || e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        if (last) onClose();
        else setI((v) => v + 1);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setI((v) => Math.max(0, v - 1));
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [last, onClose]);

  return (
    <div className="absolute inset-0 z-[58] flex items-center justify-center bg-abyss/92 p-3 sm:p-6 overflow-y-auto">
      <div className="panel-gold clip-notch w-full max-w-3xl p-5 sm:p-8 anim-fade-up relative my-auto">
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close tutorial"
          title="Close tutorial (Esc)"
          className="absolute right-3 top-3 z-10 w-9 h-9 clip-notch-sm panel flex items-center justify-center text-faint hover:text-blood hover:border-blood/60 active:scale-90 transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 mb-5 pr-12">
          {STEPS.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              className="h-1.5 flex-1 clip-notch-sm transition-all duration-300"
              style={{ background: n <= i ? '#e2b45c' : '#2a3448', boxShadow: n === i ? '0 0 10px rgba(226,180,92,0.7)' : undefined }}
              aria-label={`Step ${n + 1}`}
            />
          ))}
        </div>

        <div key={i} className="anim-fade-up">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start">
            {/* roomy art stage */}
            <div className="shrink-0 w-full sm:w-52 h-44 flex items-center justify-center panel clip-notch bg-black/25 px-5 py-4">
              {step.art}
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="font-display text-[10px] tracking-[0.45em] text-gold">
                {step.kicker} · {i + 1}/{STEPS.length}
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss leading-tight mt-1.5">{step.title}</h2>
              <p className="text-[15px] leading-relaxed text-parch/90 mt-3">{step.body}</p>
              {step.controls && <ControlRow controls={step.controls} isTouch={isTouch} />}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-7">
          <button onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} className="btn-dark clip-notch-sm px-4 py-2.5 text-xs font-bold disabled:opacity-30">
            ← BACK
          </button>
          <button onClick={onClose} className="btn-dark clip-notch-sm px-4 py-2.5 text-xs font-bold text-faint hover:text-blood">
            SKIP TUTORIAL
          </button>
          <button onClick={() => (last ? onClose() : setI((v) => v + 1))} className="btn-gold clip-notch px-6 py-3 text-sm font-black">
            {last ? '⚔ BEGIN THE HUNT' : 'NEXT →'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/LoreCodex.tsx`

```tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { CLASSES } from '../game/data';
import { LORE } from '../game/lore';
import { ClassEmblem } from './ClassEmblem';
import { cn } from '../utils/cn';

interface Props {
  initialClassId?: string;
  unlocked: string[];
  onClose: () => void;
}

export function LoreCodex({ initialClassId, unlocked, onClose }: Props) {
  const startIdx = Math.max(0, CLASSES.findIndex((c) => c.id === (initialClassId ?? CLASSES[0].id)));
  const [idx, setIdx] = useState(startIdx);
  const [dir, setDir] = useState<1 | -1>(1);
  const wheelLock = useRef(0);
  const touchY = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      const n = ((next % CLASSES.length) + CLASSES.length) % CLASSES.length;
      setIdx((cur) => {
        if (n === cur) return cur;
        setDir(n > cur || (cur === CLASSES.length - 1 && n === 0) ? 1 : -1);
        return n;
      });
    },
    []
  );

  // mouse wheel / trackpad scrolls between legends
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 4) return;
    const now = Date.now();
    if (now < wheelLock.current) return;
    wheelLock.current = now + 260;
    go(idx + (e.deltaY > 0 ? 1 : -1));
  };

  // vertical swipe on touch
  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 48) go(idx + (dy > 0 ? 1 : -1));
    touchY.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
      else if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
        e.preventDefault();
        go(idx + 1);
      } else if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
        e.preventDefault();
        go(idx - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, go, onClose]);

  const cls = CLASSES[idx];
  const lore = LORE[cls.id];
  const isUnlocked = cls.unlockWave === 0 || unlocked.includes(cls.id);

  return (
    <div
      className="absolute inset-0 z-[55] flex items-center justify-center bg-abyss/92 p-3 sm:p-6 overflow-hidden"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ambient realm glow that shifts with the legend */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at 70% 40%, ${cls.color}22 0%, transparent 60%)` }}
      />

      <div className="relative w-full max-w-5xl">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div>
            <div className="font-display text-[10px] tracking-[0.5em] text-gold">LEGEND SAGAS</div>
            <h2 className="font-display font-black text-[clamp(22px,5vw,38px)] leading-none text-goldbright text-emboss mt-1">
              SAGAS OF THE EIGHT
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sagas"
            className="w-10 h-10 clip-notch-sm panel flex items-center justify-center text-faint hover:text-blood hover:border-blood/60 active:scale-90 transition-all shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="grid lg:grid-cols-[210px_1fr] gap-3">
          {/* vertical legend wheel */}
          <div className="relative">
            <div className="hidden lg:flex flex-col gap-1.5 relative">
              {CLASSES.map((c, n) => {
                const sel = n === idx;
                const dist = Math.abs(n - idx);
                const open = c.unlockWave === 0 || unlocked.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => go(n)}
                    className={cn(
                      'clip-notch-sm flex items-center gap-2.5 px-2.5 py-2 text-left border transition-all duration-300 origin-left',
                      sel ? 'panel-gold border-gold/60' : 'panel border-transparent hover:border-gold/40'
                    )}
                    style={{
                      transform: sel ? 'translateX(10px) scale(1.04)' : `translateX(0) scale(${1 - Math.min(dist, 3) * 0.035})`,
                      opacity: sel ? 1 : 1 - Math.min(dist, 3) * 0.16,
                      boxShadow: sel ? `0 0 22px ${c.color}44` : undefined,
                    }}
                  >
                    <span
                      className="w-9 h-9 clip-notch-sm bg-black/40 border border-iron flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ color: open ? c.color : '#5d6a80', borderColor: sel ? `${c.color}88` : undefined }}
                    >
                      <ClassEmblem classId={c.id} size={24} />
                    </span>
                    <span className="min-w-0">
                      <span className={cn('font-display font-bold text-sm block truncate', sel ? 'text-goldbright' : 'text-parch')}>{c.name}</span>
                      <span className="text-[10px] text-faint block truncate">{open ? c.culture : `Locked · wave ${c.unlockWave}`}</span>
                    </span>
                  </button>
                );
              })}
              <div className="mt-2 flex items-center gap-2 text-[9px] tracking-[0.2em] text-faint justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="8" y="3" width="8" height="18" rx="4" />
                  <path d="M12 7v3" strokeLinecap="round" />
                </svg>
                SCROLL TO BROWSE
              </div>
            </div>

            {/* compact horizontal rail on small screens */}
            <div className="lg:hidden flex gap-1.5 overflow-x-auto pb-1">
              {CLASSES.map((c, n) => (
                <button
                  key={c.id}
                  onClick={() => go(n)}
                  className={cn('clip-notch-sm shrink-0 w-12 h-12 flex items-center justify-center border transition-all', n === idx ? 'panel-gold border-gold/60 scale-105' : 'panel border-iron')}
                  style={{ color: c.unlockWave === 0 || unlocked.includes(c.id) ? c.color : '#5d6a80' }}
                >
                  <ClassEmblem classId={c.id} size={26} />
                </button>
              ))}
            </div>
          </div>

          {/* saga page */}
          <div className="panel-gold clip-notch p-4 sm:p-6 relative overflow-hidden min-h-[430px]">
            <div
              className="absolute -right-10 -top-10 w-64 h-64 rounded-full pointer-events-none transition-all duration-700"
              style={{ background: `radial-gradient(circle, ${cls.color}33 0%, transparent 65%)` }}
            />
            <div
              key={cls.id}
              className="relative"
              style={{ animation: `codexIn 420ms cubic-bezier(0.2,0.9,0.3,1) both`, ['--dir' as string]: dir }}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 shrink-0">
                  <div className="absolute inset-0 rounded-full border border-dashed anim-spin-slow" style={{ borderColor: `${cls.color}88` }} />
                  <div className="absolute inset-2 rounded-full border border-dashed anim-spin-slower-rev border-gold/30" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: cls.color }}>
                    <ClassEmblem classId={cls.id} size={48} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.3em]" style={{ color: cls.color }}>
                    {cls.culture.toUpperCase()} · {idx + 1}/{CLASSES.length}
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss leading-none">{cls.name}</div>
                  <div className="text-sm italic text-parch/80 mt-1">“{lore.title}”</div>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-parch/90 max-w-3xl">
                {lore.saga.map((para, i) => (
                  <p
                    key={i}
                    className={i === 0 ? 'first-letter:font-display first-letter:text-4xl first-letter:text-goldbright first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8]' : ''}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-2.5">
                <AbilityCard
                  kicker="WEAPON"
                  name={cls.weaponName}
                  color={cls.color}
                  body={`Reach ${cls.range} · ${Math.round((1 / cls.atkCd) * 10) / 10} strikes/s · ${Math.round(cls.crit * 100)}% critical.`}
                  origin={cls.lore}
                />
                <AbilityCard kicker="SIGNATURE · E" name={cls.abilityName} color={cls.color} body={cls.abilityDesc} origin={lore.signatureOrigin} cd={cls.abilityCd} />
                <AbilityCard kicker="LEGACY · Q" name={lore.legacy.name} color={cls.color2} body={lore.legacy.desc} origin={lore.legacy.origin} cd={lore.legacy.cd} />
              </div>

              {!isUnlocked && (
                <div className="mt-4 text-[11px] font-bold tracking-wider text-[#ffb36b] border border-[#ffb36b]/40 bg-[#ffb36b]/10 clip-notch-sm px-3 py-2 inline-block">
                  Reach wave {cls.unlockWave} with any legend to earn the {cls.name}.
                </div>
              )}
            </div>

            {/* page arrows */}
            <div className="absolute right-3 bottom-3 flex gap-1.5">
              <button onClick={() => go(idx - 1)} aria-label="Previous legend" className="w-9 h-9 clip-notch-sm panel flex items-center justify-center text-faint hover:text-goldbright active:scale-90 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
              <button onClick={() => go(idx + 1)} aria-label="Next legend" className="w-9 h-9 clip-notch-sm panel flex items-center justify-center text-faint hover:text-goldbright active:scale-90 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AbilityCard({ kicker, name, color, body, origin, cd }: { kicker: string; name: string; color: string; body: string; origin: string; cd?: number }) {
  return (
    <div className="panel clip-notch-sm p-3 border-l-2 transition-transform duration-200 hover:-translate-y-0.5" style={{ borderLeftColor: color }}>
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-display text-[9px] tracking-[0.28em]" style={{ color }}>
          {kicker}
        </div>
        {cd !== undefined && <div className="text-[9px] text-faint font-bold">{cd}s</div>}
      </div>
      <div className="font-display font-bold text-parch text-base mt-0.5">{name}</div>
      <p className="text-[12px] leading-snug text-parch/80 mt-1">{body}</p>
      <p className="text-[11px] leading-snug text-faint italic mt-2 border-t border-iron pt-1.5">Origin — {origin}</p>
    </div>
  );
}
```

## File: `src/components/ProgressionIndex.tsx`

```tsx
import { useMemo, useState, type CSSProperties } from 'react';
import { CLASSES, POWERS, RARITY_META, SHOP_ITEMS, type Rarity } from '../game/data';
import type { DiscoveryState } from '../game/collection';
import { ClassEmblem } from './ClassEmblem';
import { PowerIcon } from './PowerIcon';

interface Props {
  discovery: DiscoveryState;
  initialTab?: 'powers' | 'shop';
  onClose: () => void;
}

const rarities: ('all' | Rarity)[] = ['all', 'common', 'rare', 'epic', 'legendary'];

function Recommendations({ ids }: { ids: string[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mt-2">
      <span className="text-[9px] font-display tracking-[0.16em] text-faint mr-1">RECOMMENDED</span>
      {ids.map((id) => {
        const cls = CLASSES.find((c) => c.id === id);
        if (!cls) return null;
        return (
          <span key={id} title={cls.name} className="w-6 h-6 clip-notch-sm bg-black/35 border border-iron flex items-center justify-center" style={{ color: cls.color }}>
            <ClassEmblem classId={id} size={15} />
          </span>
        );
      })}
    </div>
  );
}

export function ProgressionIndex({ discovery, initialTab = 'powers', onClose }: Props) {
  const [tab, setTab] = useState<'powers' | 'shop'>(initialTab);
  const [rarity, setRarity] = useState<'all' | Rarity>('all');
  const [showUnused, setShowUnused] = useState(false);

  const entries = useMemo(() => {
    const list = tab === 'powers' ? POWERS : SHOP_ITEMS;
    return list.filter((entry) => {
      if (rarity !== 'all' && entry.rarity !== rarity) return false;
      if (!showUnused) return true;
      return tab === 'powers'
        ? !discovery.powers.includes(entry.id as (typeof discovery.powers)[number])
        : !discovery.shopItems.includes(entry.id as (typeof discovery.shopItems)[number]);
    });
  }, [tab, rarity, showUnused, discovery]);

  const usedCount = tab === 'powers' ? discovery.powers.length : discovery.shopItems.length;
  const total = tab === 'powers' ? POWERS.length : SHOP_ITEMS.length;

  return (
    <div className="absolute inset-0 z-[64] bg-abyss/94 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto anim-fade-up">
        <div className="flex items-end justify-between gap-3 border-b border-gold/30 pb-3">
          <div>
            <div className="font-display text-[10px] tracking-[0.5em] text-gold">AETHERIA ARCHIVE</div>
            <h2 className="font-display font-black text-[clamp(25px,5vw,42px)] leading-none text-goldbright text-emboss mt-1">PROGRESSION INDEX</h2>
            <p className="text-[12px] text-faint mt-1">
              Used {usedCount}/{total} {tab === 'powers' ? 'powers' : 'market items'} · dark entries have not been used in a run yet.
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 clip-notch-sm panel flex items-center justify-center text-faint hover:text-blood hover:border-blood/60 active:scale-90 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-1.5">
            <button onClick={() => { setTab('powers'); setRarity('all'); }} className={`font-display text-[11px] tracking-[0.22em] px-4 py-2 clip-notch-sm border ${tab === 'powers' ? 'bg-gold/15 text-goldbright border-gold/55' : 'panel text-faint border-iron'}`}>
              LEVEL-UP POWERS
            </button>
            <button onClick={() => { setTab('shop'); setRarity('all'); }} className={`font-display text-[11px] tracking-[0.22em] px-4 py-2 clip-notch-sm border ${tab === 'shop' ? 'bg-gold/15 text-goldbright border-gold/55' : 'panel text-faint border-iron'}`}>
              MARKET CATALOG
            </button>
          </div>
          <label className="flex items-center gap-2 text-[11px] text-faint select-none">
            <input type="checkbox" checked={showUnused} onChange={(e) => setShowUnused(e.target.checked)} className="accent-[#dca944]" />
            Show unused only
          </label>
        </div>

        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {rarities.map((r) => {
            const meta = r === 'all' ? null : RARITY_META[r];
            return (
              <button
                key={r}
                onClick={() => setRarity(r)}
                className="clip-notch-sm border px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.2em] transition-all"
                style={{
                  color: rarity === r ? meta?.color ?? '#ffd97a' : '#8a94a8',
                  borderColor: rarity === r ? `${meta?.color ?? '#e2b45c'}88` : '#2a3448',
                  background: rarity === r ? `${meta?.color ?? '#e2b45c'}15` : 'rgba(0,0,0,.2)',
                }}
              >
                {r.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-4 pb-6">
          {entries.map((entry) => {
            const used = tab === 'powers'
              ? discovery.powers.includes(entry.id as (typeof discovery.powers)[number])
              : discovery.shopItems.includes(entry.id as (typeof discovery.shopItems)[number]);
            const meta = RARITY_META[entry.rarity];
            const power = tab === 'powers' ? entry as (typeof POWERS)[number] : null;
            const shop = tab === 'shop' ? entry as (typeof SHOP_ITEMS)[number] : null;
            return (
              <article
                key={entry.id}
                className={`clip-notch panel p-3.5 relative overflow-hidden transition-all ${used ? '' : 'opacity-50 saturate-[0.35]'}`}
                style={{ '--rarity': meta.color, borderColor: `${meta.color}${used ? '66' : '30'}` } as CSSProperties}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: meta.color, opacity: used ? 1 : 0.35 }} />
                <div className="flex items-start gap-3">
                  <span className="w-12 h-12 clip-notch-sm bg-black/40 border flex items-center justify-center shrink-0" style={{ color: entry.color, borderColor: `${entry.color}66` }}>
                    <PowerIcon icon={entry.icon} size={29} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-[9px] font-black tracking-[0.2em]" style={{ color: meta.color }}>{meta.label}</span>
                      <span className={`text-[9px] font-display tracking-[0.16em] ${used ? 'text-verdant' : 'text-faint'}`}>
                        {used ? 'USED' : 'NOT USED'}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-parch leading-tight mt-0.5">{entry.name}</h3>
                    <div className="text-[9px] font-bold tracking-[0.2em] mt-1" style={{ color: entry.color }}>{entry.kicker}</div>
                  </div>
                </div>
                <p className="text-[13px] leading-snug text-parch/85 mt-3">{entry.desc}</p>
                <div className="mt-2 border-t border-iron pt-2 grid grid-cols-2 gap-2 text-[10px]">
                  {power && <><span className="text-faint">STACKING</span><span className="text-parch text-right">{power.stacks}</span></>}
                  {shop && <>
                    <span className="text-faint">COST</span><span className="text-goldbright font-bold text-right">{shop.cost} G</span>
                    <span className="text-faint">DURATION</span><span className="text-parch text-right">{shop.duration}</span>
                  </>}
                </div>
                <Recommendations ids={entry.recommended} />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

## File: `src/components/StartScreen.tsx`

```tsx
import { useEffect, useState } from 'react';
import { CLASSES } from '../game/data';
import { LORE } from '../game/lore';
import type { PlayerProfile, ScoreEntry } from '../game/highscores';
import type { WorldEvent } from '../lib/api';
import { ClassEmblem } from './ClassEmblem';
import { Leaderboard } from './Leaderboard';
import { cn } from '../utils/cn';

interface Props {
  scores: ScoreEntry[];
  profiles: PlayerProfile[];
  activeProfile: PlayerProfile;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  version: string;
  hasNewPatch: boolean;
  onlineCount: number;
  cloud: boolean;
  events: WorldEvent[];
  onOpenCodex: (classId: string) => void;
  onOpenPatchNotes: () => void;
  onOpenTutorial: () => void;
  onOpenIndex: () => void;
  onClassChange: (classId: string) => void;
  onStart: (classId: string) => void;
}

function StatBar({ label, frac, color }: { label: string; frac: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-display text-[10px] tracking-[0.2em] text-faint w-8">{label}</span>
      <div className="bar-shell clip-notch-sm h-[7px] flex-1">
        <div className="bar-fill" style={{ width: `${Math.round(frac * 100)}%`, background: `linear-gradient(90deg, ${color}, #ffd97a)` }} />
      </div>
    </div>
  );
}

function NavBtn({ onClick, children, badge, title }: { onClick: () => void; children: React.ReactNode; badge?: boolean; title?: string }) {
  return (
    <button onClick={onClick} title={title} className="btn-dark clip-notch-sm px-2.5 py-1.5 relative flex items-center gap-1.5 text-[10px] sm:text-[11px]">
      {children}
      {badge && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blood border border-abyss animate-pulse" />}
    </button>
  );
}

export function StartScreen({
  scores, profiles, activeProfile, version, hasNewPatch, onlineCount, cloud, events,
  onOpenProfile, onOpenSettings, onOpenCodex, onOpenPatchNotes, onOpenTutorial, onOpenIndex, onClassChange, onStart,
}: Props) {
  const initialClass = activeProfile.unlockedClasses?.includes(activeProfile.preferredClass) ? activeProfile.preferredClass : CLASSES[0].id;
  const [classId, setClassId] = useState(initialClass);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const preferred =
      CLASSES.some((entry) => entry.id === activeProfile.preferredClass) && activeProfile.unlockedClasses?.includes(activeProfile.preferredClass)
        ? activeProfile.preferredClass
        : CLASSES[0].id;
    setClassId(preferred);
  }, [activeProfile.id, activeProfile.preferredClass, activeProfile.unlockedClasses]);

  const cls = CLASSES.find((c) => c.id === classId)!;
  const lore = LORE[cls.id];
  const liveEvent = events.length ? events[tick % events.length] : null;
  const runsTotal = profiles.reduce((s, p) => s + p.runs, 0);

  const selectClass = (id: string) => {
    if (!activeProfile.unlockedClasses?.includes(id)) return;
    setClassId(id);
    onClassChange(id);
  };

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-3 sm:px-6 py-3 sm:py-5">
        {/* top nav */}
        <header className="w-full max-w-6xl flex items-center justify-between gap-2 anim-fade-up">
          <div className="flex items-center gap-2 text-gold min-w-0">
            <ClassEmblem classId="sandseer" size={26} />
            <span className="font-display font-bold tracking-[0.3em] text-xs sm:text-sm text-emboss hidden sm:block">AETHERIA</span>
            <button
              onClick={onOpenPatchNotes}
              className="panel clip-notch-sm px-2 py-1 text-[10px] font-bold tracking-wider text-faint hover:text-goldbright relative"
              title="Patch notes"
            >
              v{version}
              {hasNewPatch && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blood border border-abyss animate-pulse" />}
            </button>
          </div>
          <div className="flex items-center justify-end flex-wrap gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider text-faint">
            <span className="panel-gold clip-notch-sm px-2 py-1.5 flex items-center gap-1.5 text-parch" title={cloud ? 'Live realm presence' : 'Offline — only you'}>
              <span className={`w-1.5 h-1.5 rounded-full ${cloud ? 'bg-verdant anim-pulse-gold' : 'bg-faint'}`} />
              {onlineCount.toLocaleString()} ONLINE
              <span className="hidden md:inline text-faint">· {profiles.length} ADVENTURERS · {runsTotal} RUNS</span>
            </span>
            <NavBtn onClick={() => onOpenCodex(classId)} title="Legend Sagas">📜 <span className="hidden sm:inline">SAGAS</span></NavBtn>
            <NavBtn onClick={onOpenPatchNotes} badge={hasNewPatch} title="Patch notes">🛠 <span className="hidden sm:inline">PATCH NOTES</span></NavBtn>
            <NavBtn onClick={onOpenTutorial} title="Tutorial">? <span className="hidden sm:inline">TUTORIAL</span></NavBtn>
            <NavBtn onClick={onOpenIndex} title="Power & Item Index">📚 <span className="hidden sm:inline">POWER & ITEM INDEX</span></NavBtn>
            <NavBtn onClick={onOpenProfile} title="Your profile">
              <span className="w-1.5 h-1.5 rounded-full bg-verdant" />
              <span className="max-w-[72px] truncate">{activeProfile.name}</span>
            </NavBtn>
            <button
              onClick={onOpenSettings}
              title="Settings"
              aria-label="Settings"
              className="btn-dark clip-notch-sm w-[34px] h-[30px] flex items-center justify-center group"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                className="transition-transform duration-500 group-hover:rotate-90"
              >
                <circle cx="12" cy="12" r="3.2" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.04a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03Z" />
              </svg>
            </button>
          </div>
        </header>

        {/* logo */}
        <div className="text-center mt-3 sm:mt-5 anim-fade-up" style={{ animationDelay: '60ms' }}>
          <h1 className="font-display font-black text-gold text-emboss leading-none text-[clamp(30px,7vw,68px)] tracking-[0.06em]">REALMS OF AETHERIA</h1>
          <div className="mt-2 text-[10px] sm:text-xs tracking-[0.42em] text-faint font-bold uppercase">Eight legends · five cultures · endless waves</div>
        </div>

        <main className="w-full max-w-6xl grid lg:grid-cols-[1.04fr_0.96fr] gap-3 sm:gap-4 mt-4 sm:mt-6">
          {/* class select */}
          <section className="anim-fade-up" style={{ animationDelay: '120ms' }}>
            <h2 className="font-display font-bold text-parch text-sm tracking-[0.3em] mb-2 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold inline-block" />
              CHOOSE YOUR LEGEND
              <span className="ml-auto text-[10px] text-faint tracking-wider">{activeProfile.unlockedClasses?.length ?? 1}/{CLASSES.length} EARNED</span>
            </h2>
            <div className="flex flex-col gap-2">
              {CLASSES.map((c) => {
                const sel = c.id === classId;
                const unlocked = c.unlockWave === 0 || activeProfile.unlockedClasses?.includes(c.id);
                return (
                  <button
                    key={c.id}
                    disabled={!unlocked}
                    onClick={() => selectClass(c.id)}
                    className={cn(
                      'clip-notch text-left px-3 py-2.5 flex items-center gap-3 transition-all duration-150 w-full disabled:cursor-not-allowed relative overflow-hidden',
                      sel ? 'panel-gold translate-x-1' : unlocked ? 'panel hover:border-gold/50 hover:translate-x-0.5' : 'panel opacity-55'
                    )}
                  >
                    {sel && <span className="absolute inset-y-0 left-0 w-1" style={{ background: c.color }} />}
                    <span
                      className={cn('shrink-0 clip-notch-sm w-12 h-12 flex items-center justify-center border', sel ? 'bg-black/50 border-gold/60' : 'bg-black/30 border-iron')}
                      style={{ color: unlocked ? (sel ? c.color : '#8a94a8') : '#4d5769', boxShadow: sel ? `0 0 18px ${c.color}55` : undefined }}
                    >
                      {unlocked ? (
                        <ClassEmblem classId={c.id} size={34} />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className={cn('font-display font-bold text-lg leading-tight', sel ? 'text-goldbright' : 'text-parch')}>{c.name}</span>
                        {!unlocked && <span className="text-[9px] font-display font-bold tracking-[0.18em] text-[#ffb36b]">WAVE {c.unlockWave}</span>}
                        <span className="text-[11px] text-faint font-bold tracking-wider truncate">{c.culture}</span>
                      </span>
                      <span className={cn('block text-xs mt-0.5 truncate', sel ? 'text-parch/90' : 'text-faint')}>
                        {unlocked ? c.epithet + ' — ' + c.abilityName + ' · ' + LORE[c.id].legacy.name : `Reach wave ${c.unlockWave} to earn this legend.`}
                      </span>
                    </span>
                    <span className="hidden sm:flex flex-col gap-1 w-20 shrink-0">
                      {([['VIT', c.hp / 148], ['PWR', c.dmg / 24], ['SPD', c.speed / 278]] as [string, number][]).map(([l, f]) => (
                        <span key={l} className="flex items-center gap-1">
                          <span className="text-[8px] font-display text-faint w-6">{l}</span>
                          <span className="bar-shell h-[5px] flex-1 clip-notch-sm">
                            <span className="bar-fill block" style={{ width: `${Math.round(f * 100)}%`, background: sel ? c.color : '#4a5670' }} />
                          </span>
                        </span>
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* hero showcase */}
          <section className="panel-gold clip-notch p-4 sm:p-5 anim-fade-up relative overflow-hidden" style={{ animationDelay: '180ms' }}>
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${cls.color}2e 0%, transparent 65%)` }} />
            <div className="flex items-center gap-4 relative">
              <div className="relative w-[116px] h-[116px] shrink-0 anim-floaty">
                <div className="absolute inset-0 rounded-full border border-dashed anim-spin-slow" style={{ borderColor: `${cls.color}88` }} />
                <div className="absolute inset-2.5 rounded-full border border-dashed anim-spin-slower-rev border-gold/40" />
                <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${cls.color}33 0%, transparent 65%)` }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ color: cls.color }}>
                  <ClassEmblem classId={cls.id} size={72} />
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display font-black text-2xl sm:text-3xl text-goldbright text-emboss leading-none">{cls.name}</div>
                <div className="text-xs italic text-parch/80 mt-1">“{cls.epithet}”</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] px-2 py-1 clip-notch-sm border" style={{ borderColor: `${cls.color}77`, color: cls.color, background: `${cls.color}14` }}>
                    {cls.culture.toUpperCase()}
                  </span>
                  <button onClick={() => onOpenCodex(cls.id)} className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] px-2 py-1 clip-notch-sm border border-gold/40 text-goldbright hover:bg-gold/10">
                    📜 READ THE SAGA
                  </button>
                </div>
              </div>
            </div>

            {/* abilities */}
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              <div className="panel clip-notch-sm p-2.5 border-l-2" style={{ borderLeftColor: cls.color }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[9px] tracking-[0.28em]" style={{ color: cls.color }}>SIGNATURE · E</span>
                  <span className="text-[9px] text-faint font-bold">{cls.abilityCd}s</span>
                </div>
                <div className="font-display font-bold text-sm text-parch mt-0.5">{cls.abilityName}</div>
                <p className="text-[11px] leading-snug text-parch/75 mt-0.5">{cls.abilityDesc}</p>
              </div>
              <div className="panel clip-notch-sm p-2.5 border-l-2" style={{ borderLeftColor: cls.color2 }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[9px] tracking-[0.28em]" style={{ color: cls.color2 }}>LEGACY · Q</span>
                  <span className="text-[9px] text-faint font-bold">{lore.legacy.cd}s</span>
                </div>
                <div className="font-display font-bold text-sm text-parch mt-0.5">{lore.legacy.name}</div>
                <p className="text-[11px] leading-snug text-parch/75 mt-0.5">{lore.legacy.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 mt-3">
              <StatBar label="VIT" frac={cls.hp / 148} color={cls.color} />
              <StatBar label="SPD" frac={cls.speed / 278} color={cls.color} />
              <StatBar label="PWR" frac={cls.dmg / 24} color={cls.color} />
              <StatBar label="CRIT" frac={cls.crit / 0.24} color={cls.color} />
            </div>

            <div className="mt-4 panel clip-notch-sm px-3 py-2.5 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="font-display text-[10px] tracking-[0.3em] text-faint">RANKING IDENTITY</div>
                <div className="font-display font-bold text-lg text-goldbright leading-tight">{activeProfile.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="clip-notch-sm border border-gold/50 bg-gold/10 px-2.5 py-1.5 text-right shadow-[0_0_10px_rgba(226,180,92,0.25)]">
                  <div className="font-display text-[8px] tracking-[0.22em] text-goldbright/80">BEST WAVE</div>
                  <div className="font-display font-black text-goldbright text-emboss leading-none text-base">{activeProfile.bestWave}</div>
                </div>
                <div className="clip-notch-sm border border-gold/50 bg-gold/10 px-2.5 py-1.5 text-right shadow-[0_0_10px_rgba(226,180,92,0.25)]">
                  <div className="font-display text-[8px] tracking-[0.22em] text-goldbright/80">BEST SCORE</div>
                  <div className="font-display font-black text-goldbright text-emboss leading-none text-base">{activeProfile.bestScore.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <button onClick={() => onStart(cls.id)} className="btn-gold clip-notch w-full mt-3 py-4 sm:py-3.5 text-base sm:text-lg font-black tracking-[0.18em]">
              ⚔ ENTER THE REALMS
            </button>
            <div className="text-center text-[10px] text-faint mt-1.5 tracking-wider">The first wave strikes within seconds. Survive it.</div>

            <div className="mt-4">
              <h3 className="font-display text-[11px] tracking-[0.3em] text-gold mb-1.5 flex items-center gap-2">
                REALM LEADERBOARD
                <span className="h-[1px] flex-1 bg-gold/25 inline-block" />
              </h3>
              <Leaderboard scores={scores} activeProfileId={activeProfile.id} compact />
            </div>
          </section>
        </main>

        {/* live world feed */}
        <footer className="w-full max-w-6xl mt-3 sm:mt-4 mb-2">
          <div className="panel clip-notch px-3 py-2 flex items-center gap-2 overflow-hidden">
            <span className="shrink-0 font-display text-[10px] tracking-[0.25em] text-verdant border border-verdant/40 bg-verdant/10 px-1.5 py-0.5 clip-notch-sm flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${cloud ? 'bg-verdant animate-pulse' : 'bg-faint'}`} />
              LIVE
            </span>
            {liveEvent ? (
              <div key={liveEvent.id + tick} className="anim-ticker text-xs truncate" style={{ color: liveEvent.color }}>
                {liveEvent.text}
              </div>
            ) : (
              <div className="text-xs text-faint truncate">
                {cloud ? 'The realm is quiet. Be the first to inscribe a run today.' : 'Offline — connect to Supabase to see live adventurer achievements.'}
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
```

