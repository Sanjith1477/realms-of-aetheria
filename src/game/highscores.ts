import { unlockedClassIdsAtWave } from './data';

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

/** Collapse any score list to one row per player and legend (their best score). */
export function dedupeByPlayer(scores: ScoreEntry[]): ScoreEntry[] {
  const best = new Map<string, ScoreEntry>();
  for (const s of scores) {
    const who = (s.userId ?? s.userName ?? s.name).toLowerCase();
    const key = `${who}::${s.classId}`;
    const prev = best.get(key);
    if (!prev || s.score > prev.score) best.set(key, s);
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
      unlockedClasses: unlockedClassIdsAtWave(profile.bestWave),
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
      unlockedClasses: unlockedClassIdsAtWave(bestWave),
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
      unlockedClasses: unlockedClassIdsAtWave(Math.max(item.bestWave, entry.wave)),
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
