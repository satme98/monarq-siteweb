/**
 * MONARQ — Animation Engine
 * Single source of truth for all motion: easings, durations,
 * Lenis smooth scroll (wired to GSAP ticker), and reduced-motion utilities.
 *
 * Architecture:
 *  - Framer Motion: UI micro-interactions, page transitions, AnimatePresence
 *  - GSAP + ScrollTrigger: scroll-driven reveals, parallax, SplitText
 *  - Lenis: smooth scroll, driven by GSAP ticker (canonical sync)
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ─── Easing Tokens ────────────────────────────────────────────────────────────

/** Primary luxury easing — fast-out, silky settle */
export const EASE_MONARQ = [0.16, 1, 0.3, 1] as const;

/** Cinematic — slow start, dramatic arrival */
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

/** UI enter — sharp, decisive */
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
  fast: 0.2,
  quick: 0.35,
  mid: 0.55,
  slow: 0.85,
  cinematic: 1.2,
  epic: 1.8,
} as const;

// ─── Spring Presets ────────────────────────────────────────────────────────────

/** Snappy UI button press */
export const SPRING_SNAP = { type: 'spring', stiffness: 500, damping: 35 } as const;

/** Fluid UI hover */
export const SPRING_FLUID = { type: 'spring', stiffness: 300, damping: 28 } as const;

/** Weighty content entrance */
export const SPRING_CONTENT = { type: 'spring', stiffness: 60, damping: 18 } as const;

/** Gentle float */
export const SPRING_GENTLE = { type: 'spring', stiffness: 80, damping: 22 } as const;

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

// ─── Lenis Smooth Scroll ──────────────────────────────────────────────────────

let lenisInstance: Lenis | null = null;

/**
 * Initialise Lenis smooth scroll, driven by GSAP's ticker.
 * - Skipped entirely when prefers-reduced-motion is active (Tier 1 removal)
 * - Call once at App root; returns a cleanup function
 */
export function initLenis(): () => void {
  if (prefersReducedMotion()) return () => {};
  if (lenisInstance) return () => {};

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    lerp: 0.09,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.5,
    infinite: false,
  });

  lenisInstance = lenis;

  // Canonical sync: drive Lenis from GSAP ticker, update ScrollTrigger on each scroll event
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000)); // seconds → milliseconds
  gsap.ticker.lagSmoothing(0); // prevent catch-up jitter on heavy frames

  return () => {
    gsap.ticker.remove((time) => lenis.raf(time * 1000));
    lenis.destroy();
    lenisInstance = null;
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

/** Get the current Lenis instance (if active) */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

// ─── GSAP Scroll Reveal Helper ─────────────────────────────────────────────────

/**
 * Batch-register scroll reveal for a set of elements.
 * More performant than one ScrollTrigger per element.
 */
export function batchReveal(
  selector: string,
  fromVars: gsap.TweenVars = { y: 32, opacity: 0 },
  toVars: gsap.TweenVars = {},
  options: ScrollTrigger.BatchVars = {}
) {
  if (prefersReducedMotion()) {
    gsap.set(selector, { opacity: 1, y: 0, x: 0, scale: 1 });
    return;
  }
  ScrollTrigger.batch(selector, {
    onEnter: (batch) =>
      gsap.fromTo(batch, fromVars, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.07,
        duration: DUR.slow,
        ease: GSAP_EASE_MONARQ,
        ...toVars,
      }),
    start: 'top 88%',
    once: true,
    ...options,
  });
}
