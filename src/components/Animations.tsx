import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   MONARQ — High-End Editorial Motion & Transition System
   
   - Signature Luxury Bezier: [0.16, 1, 0.3, 1]
   - 100% Reliable Cross-Browser Viewport Intersection (amount: 0.05)
   - Silky Scale & Opacity Reveals
   - Silky Multi-layer Page Transitions
   - Unified Micro-interactions (200-300ms)
   - Full reduced-motion accessibility
   ═══════════════════════════════════════════════════════ */

export const EASE_MONARCH = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/** Page-Level Silky Transition Wrapper */
export const PageTransition: React.FC<{
  children: React.ReactNode;
  pageKey: string;
  className?: string;
}> = ({ children, pageKey, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key={pageKey}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{
        duration: reduce ? 0.2 : 0.4,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Fade up with elegant vertical displacement */
export const FadeUp: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Pure Opacity Fade */
export const FadeIn: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
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
        duration: reduce ? 0.2 : duration,
        delay,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Lateral Slide Left */
export const SlideLeft: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Lateral Slide Right */
export const SlideRight: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Scale Reveal with soft elevation */
export const ScaleReveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once, amount: 0.05 }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Luxury Image Reveal (Safe, robust cross-browser scale & fade) */
export const CurtainReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.75,
  direction = 'up',
}) => {
  const reduce = useReducedMotion();

  const getOffset = () => {
    switch (direction) {
      case 'left':
        return { x: -20, y: 0 };
      case 'right':
        return { x: 20, y: 0 };
      case 'down':
        return { x: 0, y: -20 };
      case 'up':
      default:
        return { x: 0, y: 20 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      className={`overflow-hidden relative ${className}`}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.96, ...offset }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay,
        ease: EASE_MONARCH as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
};

/** Stagger Container */
export const StaggerGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/** Stagger Item */
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduce ? 0.2 : 0.6,
            ease: EASE_MONARCH as unknown as number[],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/** Parallax Image with Smooth In-View Entrance */
export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const reduce = useReducedMotion();
  
  return (
    <div className={`overflow-hidden relative group ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: reduce ? 0.2 : 0.8, ease: EASE_MONARCH as unknown as number[] }}
        loading="lazy"
      />
    </div>
  );
};
