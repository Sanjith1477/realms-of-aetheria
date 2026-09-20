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
