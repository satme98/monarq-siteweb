import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/animation';

gsap.registerPlugin(ScrollTrigger);

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
