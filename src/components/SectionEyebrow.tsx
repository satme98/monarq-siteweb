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

  // Lines and diamonds animate smoothly from center outward
  const lineVariants = {
    hidden: reduce ? {} : { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: reduce ? 0.01 : 0.5,
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
        duration: reduce ? 0.01 : 0.35,
        delay: reduce ? 0 : 0.06,
        ease: EASE_MONARQ,
      },
    },
  };

  return (
    <motion.div
      className={`flex items-center gap-2.5 sm:gap-3 ${justifyClass} mb-4 select-none ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.02, margin: '0px 0px -30px 0px' }}
    >
      {/* Left hairline — draws from right to left (origin: right) */}
      <motion.div
        className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientLeft} flex-shrink-0`}
        style={{ transformOrigin: 'right' }}
        variants={lineVariants}
      />

      {/* Left diamond */}
      <motion.span
        className={`w-1.5 h-1.5 inline-block ${diamondColor} flex-shrink-0`}
        variants={diamondVariants}
      />

      {/* Label — silky text reveal */}
      <div className="px-1">
        <motion.span
          className={`block text-sm sm:text-[15px] uppercase tracking-[0.16em] font-serif font-bold ${textColor} whitespace-nowrap`}
          variants={{
            hidden: reduce ? { opacity: 0 } : { y: 6, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: reduce ? 0.01 : 0.45,
                delay: reduce ? 0 : 0.08,
                ease: EASE_MONARQ,
              },
            },
          }}
        >
          {children}
        </motion.span>
      </div>

      {/* Right diamond */}
      <motion.span
        className={`w-1.5 h-1.5 inline-block ${diamondColor} flex-shrink-0`}
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
