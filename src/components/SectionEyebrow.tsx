import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_MONARQ, EASE_CINEMATIC } from '../lib/animation';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  align?: 'center' | 'left' | 'right';
  variant?: 'light' | 'dark';
  lineWidth?: string;
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  children,
  className = '',
  align = 'center',
  variant = 'dark',
  lineWidth = 'max-w-[40px] sm:max-w-[60px]',
}) => {
  const reduce = useReducedMotion();
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-monarq-gold-light' : 'text-monarq-gold-deep';
  const diamondColor = 'bg-monarq-gold';

  const lineGradientLeft = isLight
    ? 'from-transparent to-monarq-gold/50'
    : 'from-transparent to-monarq-gold/45';
  const lineGradientRight = isLight
    ? 'from-monarq-gold/50 to-transparent'
    : 'from-monarq-gold/45 to-transparent';

  const justifyClass =
    align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  // Lines and diamonds animate simultaneously from center outward
  const lineVariants = {
    hidden: reduce ? {} : { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: reduce ? 0.01 : 0.65,
        ease: EASE_MONARQ,
      },
    },
  };

  const diamondVariants = {
    hidden: reduce ? {} : { scale: 0, opacity: 0, rotate: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 45,
      transition: {
        duration: reduce ? 0.01 : 0.4,
        delay: reduce ? 0 : 0.15,
        ease: [0.34, 1.56, 0.64, 1], // slight overshoot pop
      },
    },
  };

  return (
    <motion.div
      className={`flex items-center gap-2.5 sm:gap-3 ${justifyClass} mb-4 select-none ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Left hairline — draws from right to left (origin: right) */}
      <motion.div
        className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientLeft} flex-shrink-0`}
        style={{ transformOrigin: 'right' }}
        variants={lineVariants}
      />

      {/* Left diamond */}
      <motion.span
        className={`w-1.5 h-1.5 inline-block ${diamondColor} flex-shrink-0 shadow-[0_0_6px_rgba(158,128,80,0.55)]`}
        variants={diamondVariants}
      />

      {/* Label — clip-mask text reveal */}
      <div className="overflow-hidden px-1">
        <motion.span
          className={`block text-[11px] sm:text-xs uppercase tracking-[0.28em] font-serif font-semibold ${textColor} whitespace-nowrap`}
          variants={{
            hidden: reduce ? { opacity: 0 } : { y: '110%', opacity: 0 },
            visible: {
              y: '0%',
              opacity: 1,
              transition: {
                duration: reduce ? 0.01 : 0.5,
                delay: reduce ? 0 : 0.2,
                ease: EASE_CINEMATIC,
              },
            },
          }}
        >
          {children}
        </motion.span>
      </div>

      {/* Right diamond */}
      <motion.span
        className={`w-1.5 h-1.5 inline-block ${diamondColor} flex-shrink-0 shadow-[0_0_6px_rgba(158,128,80,0.55)]`}
        variants={diamondVariants}
      />

      {/* Right hairline — draws from left to right (origin: left) */}
      <motion.div
        className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientRight} flex-shrink-0`}
        style={{ transformOrigin: 'left' }}
        variants={lineVariants}
      />
    </motion.div>
  );
};

export default SectionEyebrow;
