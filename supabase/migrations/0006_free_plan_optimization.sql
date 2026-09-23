-- ============================================================================
-- Realms of Aetheria - Free Plan optimization
-- Run after 0001_init.sql through 0005_discovery.sql.
--
-- This migration is additive and preserves existing rows. match_results is the
-- canonical run history; hero_records is retained for old data but no longer
-- receives new writes.
-- ============================================================================

create or replace function public.overall_leaderboard(p_limit integer default 10)
returns table (
  id uuid, username text, preferred_class text,
  best_score integer, best_wave integer, runs integer, total_kills integer
)
language sql security definer set search_path = public
as $$
  with ranked_runs as (
    select m.user_id, m.class_id, m.score,
           row_number() over (
             partition by m.user_id
             order by m.score desc, m.wave desc, m.created_at asc
           ) as rank
      from public.match_results m
  ), aggregates as (
    select m.user_id,
           max(m.wave)::integer as best_wave,
           count(*)::integer as runs,
           coalesce(sum(m.kills), 0)::integer as total_kills
      from public.match_results m
     group by m.user_id
  )
  select r.user_id, p.username, r.class_id,
         r.score, a.best_wave, a.runs, a.total_kills
    from ranked_runs r
    join aggregates a on a.user_id = r.user_id
    join public.profiles p on p.id = r.user_id
   where r.rank = 1
   order by r.score desc, a.best_wave desc, a.total_kills desc
   limit greatest(least(p_limit, 100), 1);
$$;

create or replace function public.hero_leaderboard(p_class_id text, p_limit integer default 10)
returns table (
  id uuid, username text, class_id text,
  best_score integer, best_wave integer, runs integer
)
language sql security definer set search_path = public
as $$
  select m.user_id, p.username, m.class_id,
         max(m.score)::integer, max(m.wave)::integer, count(*)::integer
    from public.match_results m
    join public.profiles p on p.id = m.user_id
   where m.class_id = p_class_id
   group by m.user_id, p.username, m.class_id
   order by max(m.score) desc, max(m.wave) desc
   limit greatest(least(p_limit, 100), 1);
$$;

create or replace function public.my_hero_records()
returns table (
  user_id uuid, class_id text, best_score integer, best_wave integer, runs integer
)
language sql security definer set search_path = public
as $$
  select m.user_id, m.class_id,
         max(m.score)::integer, max(m.wave)::integer, count(*)::integer
    from public.match_results m
   where m.user_id = auth.uid()
   group by m.user_id, m.class_id;
$$;

create or replace function public.record_run(
  p_class_id text,
  p_score integer,
  p_wave integer,
  p_level integer default 1,
  p_kills integer default 0,
  p_gold integer default 0,
  p_duration_seconds integer default 0
)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'Not authenticated'; end if;

  insert into public.match_results
    (user_id, class_id, score, wave, level, kills, gold, duration_seconds)
  values
    (v_uid, p_class_id, p_score, p_wave, p_level, p_kills, p_gold, p_duration_seconds);

  update public.profiles
     set best_score = greatest(best_score, p_score),
         best_wave = greatest(best_wave, p_wave),
         total_kills = total_kills + p_kills,
         runs = runs + 1,
         preferred_class = p_class_id,
         last_seen = now(),
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

create or replace function public.record_discovery(p_kind text, p_id text)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null or p_kind not in ('power', 'shop') or p_id is null or length(p_id) = 0 then
    raise exception 'Invalid discovery request';
  end if;
  if p_kind = 'power' then
    update public.profiles
       set discovered_powers = case when p_id = any(discovered_powers)
                                    then discovered_powers
                                    else array_append(discovered_powers, p_id) end
     where id = auth.uid();
  else
    update public.profiles
       set discovered_shop_items = case when p_id = any(discovered_shop_items)
                                       then discovered_shop_items
                                       else array_append(discovered_shop_items, p_id) end
     where id = auth.uid();
  end if;
end;
$$;

create or replace function public.set_preferred_class(p_class_id text)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;
  update public.profiles
     set preferred_class = p_class_id, last_seen = now()
   where id = auth.uid();
end;
$$;

drop policy if exists "players update own profile" on public.profiles;
revoke update on table public.profiles from authenticated;
revoke insert on table public.match_results from authenticated;

grant execute on function public.my_hero_records() to authenticated;
grant execute on function public.record_discovery(text, text) to authenticated;
grant execute on function public.set_preferred_class(text) to authenticated;
grant execute on function public.record_run(text, integer, integer, integer, integer, integer, integer) to authenticated;

-- hero_records is deliberately retained so existing data is not destroyed.
-- New code reads match_results, which is the canonical run history.