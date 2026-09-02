/**
 * MONARQ — Animation Primitives
 * Every reveal, transition, and motion wrapper used site-wide.
 *
 * Design principles applied:
 * - GPU-only: transform + opacity exclusively
 * - Tiered reduced-motion (not a kill-switch)
 * - Spring physics for all interactive states
 * - Premium text masking / clip reveals for headings
 * - True curtain wipe + depth for image reveals
 * - Scroll-triggered parallax via GSAP
 */

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  EASE_MONARQ,
  EASE_CINEMATIC,
  EASE_ENTER,
  SPRING_CONTENT,
  SPRING_SNAP,
  SPRING_FLUID,
  DUR,
  prefersReducedMotion,
} from '../lib/animation';

gsap.registerPlugin(ScrollTrigger);

// Re-export for legacy usage
export const EASE_MONARCH = EASE_MONARQ;

// ─── Types ────────────────────────────────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// ─── Page Transition ──────────────────────────────────────────────────────────

/**
 * Wraps each page with a cinematic entrance + exit.
 * Enter: content lifts from y:16 with opacity. A gold hairline draws across the
 * bottom simultaneously — a signature luxury "underline arrival" effect.
 * Exit: soft fade + slight upward drift.
 */
export const PageTransition: React.FC<{
  children: React.ReactNode;
  pageKey: string;
  className?: string;
}> = ({ children, pageKey, className = '' }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={pageKey}
      className={`relative ${className}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={
        reduce
          ? { duration: 0.15 }
          : {
              duration: DUR.mid,
              ease: EASE_CINEMATIC as unknown as number[],
            }
      }
    >
      {/* Gold hairline entrance underline */}
      {!reduce && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-monarq-gold to-transparent z-50 pointer-events-none"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 1, 0] }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_ENTER as unknown as number[], times: [0, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      )}
      {children}
    </motion.div>
  );
};

// ─── Text Reveal (Clip Mask) ───────────────────────────────────────────────────

/**
 * Premium text reveal: text slides up from behind a clip mask.
 * Standard on Bottega Veneta, Dior, luxury hospitality sites.
 * Wrap individual headings, not entire paragraphs.
 */
export const TextReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.slow,
  once = true,
  as: Tag = 'div',
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: 0.1 }}
        transition={{ duration: 0.15, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        initial={{ y: '102%', opacity: 0.3 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once, amount: 0.05 }}
        transition={{
          duration,
          delay,
          ease: EASE_CINEMATIC as unknown as number[],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── Fade Up ──────────────────────────────────────────────────────────────────

/**
 * Standard entrance reveal with spring physics.
 * Use for body text, labels, secondary elements — not headings (use TextReveal).
 */
export const FadeUp: React.FC<RevealProps & { as?: keyof JSX.IntrinsicElements }> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.slow,
  once = true,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.06 }}
      transition={
        reduce
          ? { duration: 0.15, delay }
          : {
              ...SPRING_CONTENT,
              delay,
              opacity: { duration: duration * 0.8, ease: EASE_ENTER as unknown as number[] },
            }
      }
    >
      {children}
    </motion.div>
  );
};

// ─── Fade In ──────────────────────────────────────────────────────────────────

export const FadeIn: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.mid,
  once = true,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.05 }}
      transition={{
        duration: reduce ? 0.15 : duration,
        delay,
        ease: EASE_ENTER as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Slide Directions ────────────────────────────────────────────────────────

/**
 * Lateral reveal. On mobile, degrades to FadeUp to prevent horizontal shift.
 */
export const SlideLeft: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.slow,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (reduce || isMobile) {
    return (
      <FadeUp className={className} delay={delay} duration={duration} once={once}>
        {children}
      </FadeUp>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.06 }}
      transition={{
        ...SPRING_CONTENT,
        delay,
        opacity: { duration: duration * 0.75, ease: EASE_ENTER as unknown as number[] },
      }}
    >
      {children}
    </motion.div>
  );
};

export const SlideRight: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.slow,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (reduce || isMobile) {
    return (
      <FadeUp className={className} delay={delay} duration={duration} once={once}>
        {children}
      </FadeUp>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.06 }}
      transition={{
        ...SPRING_CONTENT,
        delay,
        opacity: { duration: duration * 0.75, ease: EASE_ENTER as unknown as number[] },
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Scale Reveal ─────────────────────────────────────────────────────────────

export const ScaleReveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.slow,
  once = true,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, amount: 0.06 }}
      transition={
        reduce
          ? { duration: 0.15, delay }
          : {
              ...SPRING_CONTENT,
              delay,
              opacity: { duration: duration * 0.8, ease: EASE_ENTER as unknown as number[] },
            }
      }
    >
      {children}
    </motion.div>
  );
};

// ─── Image Reveal (Curtain Wipe) ──────────────────────────────────────────────

/**
 * Premium image reveal used by luxury agencies:
 * 1. A dark overlay wipes UP (scaleY 1→0, origin: bottom) to expose the image
 * 2. The image simultaneously scales from 1.06→1 (depth push-in)
 *
 * Replaces the old CurtainReveal component. Accepts same `direction` prop for
 * backward compatibility but always does the upward wipe.
 */
export const ImageReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right'; // kept for API compat
  once?: boolean;
}> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.cinematic,
  once = true,
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        className={`overflow-hidden relative ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: 0.05 }}
        transition={{ duration: 0.15, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`overflow-hidden relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.05 }}
    >
      {/* The image content — scales in as the wipe lifts */}
      <motion.div
        variants={{
          hidden: { scale: 1.07 },
          visible: {
            scale: 1,
            transition: {
              duration: duration * 1.1,
              delay: delay + 0.08,
              ease: EASE_MONARQ as unknown as number[],
            },
          },
        }}
      >
        {children}
      </motion.div>

      {/* The wipe overlay — scaleY 1→0, transforms from bottom */}
      <motion.div
        className="absolute inset-0 bg-monarq-ink z-10 origin-bottom"
        variants={{
          hidden: { scaleY: 1 },
          visible: {
            scaleY: 0,
            transition: {
              duration,
              delay,
              ease: EASE_CINEMATIC as unknown as number[],
            },
          },
        }}
        style={{ transformOrigin: 'bottom' }}
      />
    </motion.div>
  );
};

/** Backward-compatible alias */
export const CurtainReveal = ImageReveal;

// ─── Stagger Group + Item ─────────────────────────────────────────────────────

const staggerContainer: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...SPRING_CONTENT,
      opacity: { duration: 0.5, ease: EASE_ENTER as unknown as number[] },
    },
  },
};

const staggerChildReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}> = ({ children, className = '', staggerDelay = 0.07, once = true }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.06 }}
      variants={staggerContainer}
      custom={reduce ? 0 : staggerDelay}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduce ? staggerChildReducedVariants : staggerChildVariants}
    >
      {children}
    </motion.div>
  );
};

// ─── Line Reveal ──────────────────────────────────────────────────────────────

/**
 * Animated hairline — draws scaleX: 0→1 on scroll entry.
 * Used for section separators, decorative rules.
 */
export const LineReveal: React.FC<{
  className?: string;
  delay?: number;
  duration?: number;
  origin?: 'left' | 'center' | 'right';
  once?: boolean;
}> = ({
  className = 'h-px w-full bg-monarq-gold/30',
  delay = 0,
  duration = 0.7,
  origin = 'left',
  once = true,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`origin-${origin} ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once, amount: 0.1 }}
      transition={
        reduce
          ? { duration: 0.01 }
          : {
              duration,
              delay,
              ease: EASE_MONARQ as unknown as number[],
            }
      }
      style={{
        transformOrigin:
          origin === 'left' ? 'left' : origin === 'right' ? 'right' : 'center',
      }}
    />
  );
};

// ─── Parallax Image (GSAP ScrollTrigger) ─────────────────────────────────────

/**
 * True depth parallax: image moves at `rate` × scroll speed while
 * the container is stationary. Creates convincing depth layering.
 *
 * Uses GSAP ScrollTrigger in a useEffect with full cleanup (ctx.revert()).
 * Hover: subtle scale on the inner image for a push-depth feel.
 */
export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  rate?: number;    // 0 = no parallax, 0.3 = gentle, 0.5 = strong
  hoverScale?: boolean;
}> = ({ src, alt, className = '', rate = 0.25, hoverScale = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const containerH = containerRef.current!.offsetHeight;
      const offset = containerH * rate * 1.5;

      gsap.fromTo(
        imageRef.current,
        { yPercent: -rate * 30 },
        {
          yPercent: rate * 30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [rate, reduce]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative group ${className}`}
      style={{ willChange: reduce ? 'auto' : 'transform' }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hoverScale && !reduce ? 'group-hover:scale-[1.04]' : ''
        }`}
        loading="lazy"
        style={{ willChange: reduce ? 'auto' : 'transform' }}
      />
    </div>
  );
};

// ─── Magnetic Button ──────────────────────────────────────────────────────────

/**
 * Subtle magnetic pull toward the cursor.
 * Wraps any element. Uses useMotionValue (no re-render on pointermove).
 * Strength: 0.2–0.4 for refined luxury feel. Not flashy.
 */
export const MagneticWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className = '', strength = 0.25 }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    gsap.to(ref.current, {
      x: dx,
      y: dy,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    });
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// ─── Animated CTA Button ──────────────────────────────────────────────────────

/**
 * Luxury CTA with spring press + hover lift.
 * Replaces raw <button> elements for primary CTAs.
 */
export const MotionButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}> = ({ children, className = '', onClick, disabled = false, type = 'button', ...rest }) => {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      whileHover={reduce ? {} : { y: -2, scale: 1.01 }}
      whileTap={reduce ? {} : { scale: 0.96, y: 0 }}
      transition={SPRING_SNAP}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};

// ─── Count Up Number ──────────────────────────────────────────────────────────

/**
 * Animates a number from 0 to `value` on scroll entry.
 * Premium touch for statistics / awards sections.
 */
export const CountUp: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}> = ({ value, suffix = '', prefix = '', className = '', duration = 1.5 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
          }
        },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [value, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
};
