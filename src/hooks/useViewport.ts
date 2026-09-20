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
