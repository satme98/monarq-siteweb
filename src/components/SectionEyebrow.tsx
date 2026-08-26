import React from 'react';

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
    <div className={`flex items-center gap-2.5 sm:gap-3 ${justifyClass} mb-4 select-none ${className}`}>
      {/* Left Hairline & Diamond */}
      <div className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientLeft} flex-shrink-0`} />
      <span className={`w-1.5 h-1.5 rotate-45 ${diamondColor} flex-shrink-0`} />

      {/* Label Text */}
      <span className={`text-[11px] sm:text-xs uppercase tracking-[0.28em] font-serif font-semibold ${textColor} whitespace-nowrap px-1`}>
        {children}
      </span>

      {/* Right Diamond & Hairline */}
      <span className={`w-1.5 h-1.5 rotate-45 ${diamondColor} flex-shrink-0`} />
      <div className={`h-[1px] w-8 sm:w-12 ${lineWidth} bg-gradient-to-r ${lineGradientRight} flex-shrink-0`} />
    </div>
  );
};

export default SectionEyebrow;
