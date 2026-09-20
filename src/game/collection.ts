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