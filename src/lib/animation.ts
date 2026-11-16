/** Primary luxury easing — fast-out, silky settle */
export const EASE_MONARQ = [0.16, 1, 0.3, 1] as const;

/** Cinematic — smooth, elegant deceleration */
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

/** UI enter — sharp, decisive, silky */
export const EASE_ENTER = [0.16, 1, 0.3, 1] as const;

/** UI exit — fast, efficient */
export const EASE_EXIT = [0.4, 0, 1, 1] as const;

/** Between two visible states */
export const EASE_INOUT = [0.4, 0, 0.2, 1] as const;

/** Legacy alias (used in existing components) */
export const EASE_MONARCH = EASE_MONARQ;

/** GSAP string equivalents */
export const GSAP_EASE_MONARQ = 'power3.out';
export const GSAP_EASE_CINEMATIC = 'power4.out';
export const GSAP_EASE_SCRUB = 'none';

// ─── Duration Scale ────────────────────────────────────────────────────────────

export const DUR = {
  instant: 0.01,
  fast: 0.18,
  quick: 0.28,
  mid: 0.45,
  slow: 0.58,
  cinematic: 0.7,
  epic: 0.9,
} as const;

// ─── Spring Presets ────────────────────────────────────────────────────────────

/** Snappy UI button press */
export const SPRING_SNAP = { type: 'spring', stiffness: 500, damping: 35 } as const;

/** Fluid UI hover */
export const SPRING_FLUID = { type: 'spring', stiffness: 350, damping: 28 } as const;

/** Silky smooth content entrance — no heavy rubbery wobble */
export const SPRING_CONTENT = {
  duration: 0.52,
  ease: [0.16, 1, 0.3, 1],
} as const;

/** Gentle float */
export const SPRING_GENTLE = { type: 'spring', stiffness: 100, damping: 20 } as const;

// ─── Reduced Motion ────────────────────────────────────────────────────────────

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.(REDUCED_QUERY).matches ?? false;
}

/** Subscribe to live OS setting changes (no page reload required) */
export function onReducedMotionChange(cb: (isReduced: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(REDUCED_QUERY);
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}
