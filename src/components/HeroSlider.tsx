import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE_MONARCH } from './Animations';

export interface SlideData {
  id: number;
  image: string;
  alt: string;
  caption: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: '/images/hero-slide-1.jpg',
    alt: 'Salle verrière et tables en marbre MONARQ Tanger',
    caption: 'La Verrière & Tables Lumineuses',
  },
  {
    id: 2,
    image: '/images/hero-slide-2.jpg',
    alt: 'Grand salon restaurant et comptoir marbre MONARQ Tanger',
    caption: 'Le Grand Salon & Bar en Marbre',
  },
];

interface HeroSliderProps {
  autoPlayInterval?: number; // default 8000ms
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ autoPlayInterval = 8000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduce = useReducedMotion();

  // Automatic slide rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const activeSlide = slides[currentIndex];

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Cross-Fade */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: reduce ? 0.3 : 1.4, ease: EASE_MONARCH as unknown as number[] }
          }}
        >
          <motion.img
            src={activeSlide.image}
            alt={activeSlide.alt}
            className="w-full h-full object-cover object-center"
            initial={reduce ? false : { scale: 1 }}
            animate={reduce ? false : { scale: 1.045 }}
            transition={{
              scale: { duration: 16, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle, soft directional gradient for elegant contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 via-50% to-black/20 pointer-events-none z-[1]" />
      {/* Soft base & top vignette to frame the scene gracefully */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 via-40% to-black/35 pointer-events-none z-[1]" />

      {/* Slider Controls & Slide Indicators (Bottom Right on Desktop / Bottom Center on Mobile) */}
      <div className="absolute bottom-8 right-6 sm:right-8 lg:right-12 z-20 hidden sm:flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 shadow-luxury">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Slide précédent"
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Indicators / Bar */}
        <div className="flex items-center gap-2 px-1">
          {slides.map((slide, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Aller au slide ${idx + 1}`}
                className="group py-1.5 focus:outline-none"
              >
                <div 
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    isActive 
                      ? 'w-7 bg-monarq-gold' 
                      : 'w-3 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Slide Counter */}
        <span className="font-serif text-[11px] uppercase tracking-wider text-monarq-gold-light font-semibold">
          0{currentIndex + 1} / 0{slides.length}
        </span>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Slide suivant"
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile-only minimalistic slide indicator */}
      <div className="sm:hidden absolute top-24 right-6 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-serif text-monarq-gold-light font-semibold">
        <span>0{currentIndex + 1}</span>
        <span className="text-white/40">/</span>
        <span className="text-white/70">0{slides.length}</span>
      </div>
    </div>
  );
};

export default HeroSlider;
