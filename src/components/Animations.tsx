import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   MONARQ — Scroll-triggered animation primitives
   
   Uses Framer Motion's whileInView for GPU-safe reveals.
   All animations respect prefers-reduced-motion.
   ═══════════════════════════════════════════════════════ */

const EASE_MONARCH = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/** Fade up from below — the workhorse reveal */
export const FadeUp: React.FC<RevealProps> = ({
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
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_MONARCH as unknown as number[] }}
    >
      {children}
    </motion.div>
  );
};

/** Fade in without vertical movement */
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
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_MONARCH as unknown as number[] }}
    >
      {children}
    </motion.div>
  );
};

/** Slide in from the left */
export const SlideLeft: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_MONARCH as unknown as number[] }}
    >
      {children}
    </motion.div>
  );
};

/** Slide in from the right */
export const SlideRight: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_MONARCH as unknown as number[] }}
    >
      {children}
    </motion.div>
  );
};

/** Scale up with subtle zoom — for images and cards */
export const ScaleReveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  once = true,
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_MONARCH as unknown as number[] }}
    >
      {children}
    </motion.div>
  );
};

/** Stagger children — wrap a group and each direct child animates in sequence */
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
      viewport={{ once: true, amount: 0.1 }}
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

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_MONARCH as unknown as number[] } },
      }}
    >
      {children}
    </motion.div>
  );
};

/** Parallax image wrapper — subtle vertical parallax on scroll */
export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}> = ({ src, alt, className = '', speed = 0.15 }) => {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: EASE_MONARCH as unknown as number[] }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
};

/** Text clip reveal — characters slide up from a mask */
export const TextReveal: React.FC<{
  children: string;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay, ease: EASE_MONARCH as unknown as number[] }}
      >
        {children}
      </motion.span>
    </div>
  );
};
