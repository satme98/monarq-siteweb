import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_MONARCH } from './Animations';

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

  const justifyClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  return (
    <motion.div 
      className={`flex items-center gap-2.5 sm:gap-3 ${justifyClass} mb-4 select-none ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Left Hairline (Draws in from center outward or right-to-left) */}
      <motion.div 
        className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientLeft} flex-shrink-0 origin-right`}
        variants={{
          hidden: reduce ? {} : { scaleX: 0, opacity: 0 },
          visible: { 
            scaleX: 1, 
            opacity: 1, 
            transition: { duration: 0.5, ease: EASE_MONARCH as unknown as number[] } 
          }
        }}
      />

      {/* Left Diamond */}
      <motion.span 
        className={`w-1.5 h-1.5 inline-block ${diamondColor} flex-shrink-0 shadow-[0_0_8px_rgba(158,128,80,0.6)]`}
        style={{ rotate: 45 }}
        variants={{
          hidden: reduce ? {} : { scale: 0, opacity: 0, rotate: 45 },
          visible: { 
            scale: 1, 
            opacity: 1, 
            rotate: 45,
            transition: { duration: 0.35, delay: 0.08, ease: EASE_MONARCH as unknown as number[] } 
          }
        }}
      />

      {/* Label Text (Fades in softly after rule draws) */}
      <motion.span 
        className={`text-[11px] sm:text-xs uppercase tracking-[0.28em] font-serif font-semibold ${textColor} whitespace-nowrap px-1`}
        variants={{
          hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 3 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, delay: 0.14, ease: EASE_MONARCH as unknown as number[] } 
          }
        }}
      >
        {children}
      </motion.span>

      {/* Right Diamond */}
      <motion.span 
        className={`w-1.5 h-1.5 inline-block ${diamondColor} flex-shrink-0 shadow-[0_0_8px_rgba(158,128,80,0.6)]`}
        style={{ rotate: 45 }}
        variants={{
          hidden: reduce ? {} : { scale: 0, opacity: 0, rotate: 45 },
          visible: { 
            scale: 1, 
            opacity: 1, 
            rotate: 45,
            transition: { duration: 0.35, delay: 0.08, ease: EASE_MONARCH as unknown as number[] } 
          }
        }}
      />

      {/* Right Hairline (Draws in from center outward or left-to-right) */}
      <motion.div 
        className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientRight} flex-shrink-0 origin-left`}
        variants={{
          hidden: reduce ? {} : { scaleX: 0, opacity: 0 },
          visible: { 
            scaleX: 1, 
            opacity: 1, 
            transition: { duration: 0.5, ease: EASE_MONARCH as unknown as number[] } 
          }
        }}
      />
    </motion.div>
  );
};

export default SectionEyebrow;
