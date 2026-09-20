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