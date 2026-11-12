/**
 * MONARQ — Premium Animation System
 * Silky, high-velocity, luxury motion primitives for text and sections site-wide.
 *
 * Principles:
 * - 100% GPU-composited (transform + opacity only, zero blur filter churn)
 * - Pure luxury deceleration curve [0.16, 1, 0.3, 1] (no wobbly springs)
 * - Snappy, immediate viewport triggers (no waiting or late content pop-in)
 * - Typography preservation (no clipping of descenders or French accents)
 */

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  EASE_MONARQ,
  EASE_ENTER,
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
 * Clean, instant luxury cross-fade on tab navigation.
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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0 }}
      transition={{
        duration: reduce ? 0.01 : 0.22,
        ease: EASE_MONARQ as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Text Reveal ──────────────────────────────────────────────────────────────

/**
 * Ultra-smooth luxury text reveal: subtle vertical rise with luminous fade.
 * Avoids rigid clipping masks to protect descenders (g, p, y) and French accents.
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
  const tunedDelay = Math.min(delay * 0.4, 0.22);

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.02, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: Math.min(duration, 0.58),
        delay: tunedDelay,
        ease: EASE_MONARQ as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Fade Up (Section & Content Elements) ──────────────────────────────────────

/**
 * Premium silky entrance for paragraphs, cards, badges, and section blocks.
 * Uses fine-tuned cubic-bezier deceleration for effortless fluid scroll.
 */
export const FadeUp: React.FC<RevealProps & { as?: keyof JSX.IntrinsicElements }> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.mid,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const tunedDelay = Math.min(delay * 0.4, 0.22);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.02, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: Math.min(duration, 0.54),
        delay: tunedDelay,
        ease: EASE_MONARQ as unknown as number[],
      }}
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
  const tunedDelay = Math.min(delay * 0.4, 0.18);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.02, margin: '0px 0px -30px 0px' }}
      transition={{
        duration: Math.min(duration, 0.48),
        delay: tunedDelay,
        ease: EASE_MONARQ as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Slide Directions ────────────────────────────────────────────────────────

/**
 * Subtle lateral drift. Degrades cleanly to vertical rise on mobile.
 */
export const SlideLeft: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.mid,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tunedDelay = Math.min(delay * 0.4, 0.2);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={isMobile ? { opacity: 0, y: 14 } : { opacity: 0, x: -16 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.02, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: Math.min(duration, 0.54),
        delay: tunedDelay,
        ease: EASE_MONARQ as unknown as number[],
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
  duration = DUR.mid,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tunedDelay = Math.min(delay * 0.4, 0.2);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={isMobile ? { opacity: 0, y: 14 } : { opacity: 0, x: 16 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.02, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: Math.min(duration, 0.54),
        delay: tunedDelay,
        ease: EASE_MONARQ as unknown as number[],
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
  duration = DUR.mid,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const tunedDelay = Math.min(delay * 0.4, 0.2);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, amount: 0.02, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: Math.min(duration, 0.54),
        delay: tunedDelay,
        ease: EASE_MONARQ as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

// ─── Image Reveal ─────────────────────────────────────────────────────────────

/**
 * Optical clarity image reveal:
 * Smooth, subtle zoom-in settle [1.025 → 1] with clean opacity fade.
 * Zero expensive blur filters to guarantee silky 60fps/120fps scrolling.
 */
export const ImageReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}> = ({
  children,
  className = '',
  delay = 0,
  duration = DUR.slow,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const tunedDelay = Math.min(delay * 0.4, 0.2);

  if (reduce) {
    return <div className={`overflow-hidden relative ${className}`}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        className="w-full h-full transform-gpu will-change-transform"
        initial={{ opacity: 0, scale: 1.025 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once, amount: 0.05, margin: '0px 0px -40px 0px' }}
        transition={{
          duration: Math.min(duration, 0.62),
          delay: tunedDelay,
          ease: EASE_MONARQ as unknown as number[],
        }}
      >
        {children}
      </motion.div>
    </div>
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
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE_MONARQ as unknown as number[],
    },
  },
};

const staggerChildReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}> = ({ children, className = '', staggerDelay = 0.045, once = true }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.02, margin: '0px 0px -40px 0px' }}
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

export const LineReveal: React.FC<{
  className?: string;
  delay?: number;
  duration?: number;
  origin?: 'left' | 'center' | 'right';
  once?: boolean;
}> = ({
  className = 'h-px w-full bg-monarq-gold/30',
  delay = 0,
  duration = 0.55,
  origin = 'left',
  once = true,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`origin-${origin} ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once, amount: 0.05, margin: '0px 0px -30px 0px' }}
      transition={{
        duration: reduce ? 0.01 : duration,
        delay: Math.min(delay * 0.4, 0.15),
        ease: EASE_MONARQ as unknown as number[],
      }}
      style={{
        transformOrigin:
          origin === 'left' ? 'left' : origin === 'right' ? 'right' : 'center',
      }}
    />
  );
};

// ─── Parallax Image (GSAP ScrollTrigger) ─────────────────────────────────────

export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  rate?: number;
  hoverScale?: boolean;
}> = ({ src, alt, className = '', rate = 0.18, hoverScale = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -rate * 25 },
        {
          yPercent: rate * 25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
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
          hoverScale && !reduce ? 'group-hover:scale-[1.035]' : ''
        }`}
        loading="lazy"
        style={{ willChange: reduce ? 'auto' : 'transform' }}
      />
    </div>
  );
};

// ─── Magnetic Button (movement disabled per user preference) ──────────────────

export const MagneticWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className = '' }) => {
  return (
    <div className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

// ─── Animated CTA Button ──────────────────────────────────────────────────────

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
      whileTap={reduce ? {} : { scale: 0.97 }}
      transition={SPRING_SNAP}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};

// ─── Count Up Number ──────────────────────────────────────────────────────────

export const CountUp: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}> = ({ value, suffix = '', prefix = '', className = '', duration = 1.2 }) => {
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
