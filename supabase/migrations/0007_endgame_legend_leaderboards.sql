-- ============================================================================
-- Realms of Aetheria - Stormwarden and Drakewarden leaderboard fix
-- Run after 0006_free_plan_optimization.sql.
--
-- The application already submits the canonical IDs stormwarden and
-- drakewarden. The original constraints only allowed the first six legends,
-- causing record_run to fail before inserting match_results.
-- ============================================================================

alter table public.profiles
  drop constraint if exists preferred_class_valid;

alter table public.profiles
  add constraint preferred_class_valid check (
    preferred_class in (
      'kensei','shieldthane','jaguar','sandseer',
      'tidecaller','riftblade','stormwarden','drakewarden'
    )
  );

alter table public.match_results
  drop constraint if exists class_valid;

alter table public.match_results
  add constraint class_valid check (
    class_id in (
      'kensei','shieldthane','jaguar','sandseer',
      'tidecaller','riftblade','stormwarden','drakewarden'
    )
  );

alter table public.hero_records
  drop constraint if exists hero_class_valid;

alter table public.hero_records
  add constraint hero_class_valid check (
    class_id in (
      'kensei','shieldthane','jaguar','sandseer',
      'tidecaller','riftblade','stormwarden','drakewarden'
    )
  );

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
               array['kensei','shieldthane','jaguar','sandseer','tidecaller','riftblade','stormwarden','drakewarden'],
               array[0, 8, 15, 25, 40, 60, 80, 100]
             ) as t(cid, wave_req)
            where wave_req <= greatest(public.profiles.best_wave, p_wave)
         ), '{kensei}')
   where id = v_uid;
end;
$$;

grant execute on function public.record_run(text, integer, integer, integer, integer, integer, integer) to authenticated;