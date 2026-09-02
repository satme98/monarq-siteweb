import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE_MONARQ, EASE_CINEMATIC, SPRING_SNAP } from '../lib/animation';

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
  autoPlayInterval?: number;
}

type Direction = 1 | -1;

export const HeroSlider: React.FC<HeroSliderProps> = ({ autoPlayInterval = 8000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // reset progress bar
  const reduce = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((dir: Direction = 1) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || reduce) return;
    timerRef.current = setTimeout(() => advance(1), autoPlayInterval);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentIndex, isPaused, autoPlayInterval, advance, reduce]);

  const goTo = (index: number) => {
    const dir = (index > currentIndex ? 1 : -1) as Direction;
    setDirection(dir);
    setCurrentIndex(index);
    setProgressKey((k) => k + 1);
  };

  const activeSlide = slides[currentIndex];

  // Cinematic depth transition variants
  // Outgoing: pushed back (scale up, opacity out)
  // Incoming: pulled forward (scale down from large, opacity in)
  const slideVariants = {
    enter: (dir: Direction) => ({
      opacity: 0,
      scale: reduce ? 1 : dir === 1 ? 1.06 : 0.96,
      x: 0,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        opacity: { duration: reduce ? 0.25 : 1.1, ease: EASE_MONARQ },
        scale: { duration: reduce ? 0.25 : 1.6, ease: EASE_CINEMATIC },
      },
    },
    exit: (dir: Direction) => ({
      opacity: 0,
      scale: reduce ? 1 : dir === 1 ? 0.96 : 1.04,
      x: 0,
      transition: {
        opacity: { duration: reduce ? 0.25 : 0.7, ease: EASE_MONARQ },
        scale: { duration: reduce ? 0.25 : 1.0, ease: EASE_MONARQ },
      },
    }),
  };

  // Caption clip reveal
  const captionVariants = {
    hidden: { y: '105%', opacity: 0.2 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: reduce ? 0.15 : 0.7,
        delay: reduce ? 0 : 0.5,
        ease: EASE_CINEMATIC,
      },
    },
    exit: {
      y: '-20%',
      opacity: 0,
      transition: { duration: 0.25, ease: EASE_MONARQ },
    },
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cinematic depth cross-transition */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0 w-full h-full"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* Ken Burns — slow alternating zoom, offset per slide */}
          <motion.img
            src={activeSlide.image}
            alt={activeSlide.alt}
            className="w-full h-full object-cover object-center"
            initial={reduce ? false : { scale: 1 }}
            animate={reduce ? false : { scale: 1.055 }}
            transition={
              reduce
                ? {}
                : {
                    scale: {
                      duration: 24,
                      ease: 'linear',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    },
                  }
            }
            style={{ willChange: 'transform' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Directional gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/42 via-50% to-black/18 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/18 via-45% to-black/32 pointer-events-none z-[1]" />

      {/* Slide caption reveal — bottom left, clip mask */}
      <div className="absolute bottom-8 left-5 sm:left-8 lg:left-12 z-20 overflow-hidden hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id + '-caption'}
            className="flex items-center gap-2.5"
            variants={captionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-4 h-px bg-monarq-gold/70 flex-shrink-0" />
            <span className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/80 font-semibold">
              {activeSlide.caption}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls + Progress — bottom right desktop */}
      <div className="absolute bottom-8 right-5 sm:right-8 lg:right-12 z-20 hidden sm:flex flex-col items-end gap-3">
        {/* Slide navigation */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/12 shadow-luxury">
          <motion.button
            onClick={() => advance(-1)}
            aria-label="Slide précédent"
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/65 hover:text-white transition-colors"
            whileTap={reduce ? {} : { scale: 0.88 }}
            transition={SPRING_SNAP}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 px-1">
            {slides.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <motion.button
                  key={slide.id}
                  onClick={() => goTo(idx)}
                  aria-label={`Aller au slide ${idx + 1}`}
                  className="group py-1.5 focus:outline-none"
                  whileTap={reduce ? {} : { scale: 0.85 }}
                >
                  <motion.div
                    className={`h-[3px] rounded-full ${
                      isActive ? 'bg-monarq-gold' : 'bg-white/30 group-hover:bg-white/55'
                    }`}
                    animate={{ width: isActive ? 28 : 10 }}
                    transition={
                      reduce
                        ? { duration: 0.01 }
                        : { duration: 0.4, ease: EASE_MONARQ }
                    }
                  />
                </motion.button>
              );
            })}
          </div>

          <span className="font-serif text-[11px] uppercase tracking-wider text-monarq-gold-light font-semibold min-w-[3rem] text-center">
            0{currentIndex + 1} / 0{slides.length}
          </span>

          <motion.button
            onClick={() => advance(1)}
            aria-label="Slide suivant"
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/65 hover:text-white transition-colors"
            whileTap={reduce ? {} : { scale: 0.88 }}
            transition={SPRING_SNAP}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Continuous progress bar — resets on slide change */}
        {!reduce && (
          <div className="w-full max-w-[180px] h-[2px] bg-white/15 rounded-full overflow-hidden">
            <motion.div
              key={progressKey}
              className="h-full bg-monarq-gold rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isPaused ? undefined : 1 }}
              transition={{
                duration: autoPlayInterval / 1000,
                ease: 'linear',
              }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        )}
      </div>

      {/* Mobile — minimal counter top right */}
      <div className="sm:hidden absolute top-24 right-5 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-serif text-monarq-gold-light font-semibold">
        <span>0{currentIndex + 1}</span>
        <span className="text-white/40">/</span>
        <span className="text-white/65">0{slides.length}</span>
      </div>
    </div>
  );
};

export default HeroSlider;
