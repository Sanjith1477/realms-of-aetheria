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
        detectSessionInUrl: true,
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
