import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { menuChapters } from '../data/menuData';
import { FadeUp, FadeIn, StaggerGroup, StaggerItem } from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { EASE_CINEMATIC } from '../lib/animation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MenuPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const reduce = useReducedMotion();

  const chapter = menuChapters[activeIdx];

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  const goPrev = () => activeIdx > 0 && goTo(activeIdx - 1);
  const goNext = () => activeIdx < menuChapters.length - 1 && goTo(activeIdx + 1);

  const pageVariants = {
    enter: (dir: number) => ({
      x: reduce ? 0 : dir * 48,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: reduce ? 0.15 : 0.55,
        ease: EASE_CINEMATIC,
      },
    },
    exit: (dir: number) => ({
      x: reduce ? 0 : dir * -48,
      opacity: 0,
      transition: {
        duration: reduce ? 0.10 : 0.3,
        ease: EASE_CINEMATIC,
      },
    }),
  };

  return (
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-20 sm:pt-24 pb-14 sm:pb-16 md:pb-20">

      {/* ── Hero — matches AtmospherePage / GalleryPage pattern ─── */}
      <section className="bg-marble-pattern py-10 sm:py-12 md:py-16 px-5 sm:px-6 flex flex-col items-center justify-center text-center border-b border-monarq-line">
        <FadeUp delay={0.1}>
          <SectionEyebrow>La Carte</SectionEyebrow>
        </FadeUp>
        <FadeUp delay={0.25}>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-2.5 leading-tight max-w-3xl">
            Notre Menu
          </h1>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="font-sans text-monarq-ink-soft text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Une sélection de créations signatures et de mets préparés avec des ingrédients de premier choix.
          </p>
        </FadeUp>
      </section>

      {/* ── Chapter Tab Nav ──────────────────────────────────────── */}
      <div className="bg-monarq-paper/95 backdrop-blur-md border-b border-monarq-line shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <nav
            className="flex flex-wrap items-end justify-center"
            aria-label="Chapitres du menu"
          >
            {menuChapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => goTo(idx)}
                className={`
                  relative px-3.5 sm:px-5 py-2.5 sm:py-3.5
                  font-sans text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold
                  transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-monarq-gold
                  ${
                    activeIdx === idx
                      ? 'text-monarq-ink'
                      : 'text-monarq-ink-muted hover:text-monarq-ink'
                  }
                `}
              >
                {ch.title}
                {activeIdx === idx && (
                  <motion.span
                    layoutId="menu-tab-underline"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-monarq-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Paginated Chapter Content ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={chapter.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Chapter header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-monarq-gold font-semibold mb-2.5">
                {chapter.timeSlot}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold tracking-wide uppercase mb-2 sm:mb-3">
                {chapter.title}
              </h2>
              {chapter.subtitle && (
                <p className="font-sans text-monarq-ink-soft text-xs sm:text-sm font-light tracking-wide max-w-lg mx-auto leading-relaxed">
                  {chapter.subtitle}
                </p>
              )}
              {/* Ornament */}
              <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5">
                <span className="block h-px flex-1 max-w-[80px] bg-monarq-line" />
                <span
                  className="w-1.5 h-1.5 bg-monarq-gold inline-block flex-shrink-0 shadow-[0_0_6px_rgba(158,128,80,0.5)]"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <span className="block h-px flex-1 max-w-[80px] bg-monarq-line" />
              </div>
            </div>

            {/* Categories */}
            {/* Categories */}
            <StaggerGroup className="space-y-10 sm:space-y-14">
              {chapter.categories.map((category, catIdx) => (
                <StaggerItem key={category.id}>
                  <section className="relative">

                    {/* Category heading */}
                    <div className="mb-6 sm:mb-8">
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-monarq-ink font-semibold tracking-wide">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-2 font-sans text-xs sm:text-sm text-monarq-ink-soft font-light leading-relaxed max-w-2xl">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-3.5 sm:mt-4 h-px bg-monarq-line" />
                    </div>

                    {/* Items grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-5 sm:gap-y-6">
                      {category.items.map(item => (
                        <div key={item.id} className="group flex flex-col">
                          <div className="flex items-baseline gap-3">
                            <h4 className="font-serif text-base sm:text-lg text-monarq-ink font-semibold group-hover:text-monarq-gold-deep transition-colors duration-200 leading-snug flex-1 min-w-0">
                              {item.name}
                              {item.isSpicy && (
                                <span
                                  className="ml-2 w-2 h-2 rounded-full bg-red-600 inline-block align-middle"
                                  title="Épicé"
                                />
                              )}
                            </h4>
                            <span className="hidden sm:block flex-shrink-0 border-b border-dotted border-monarq-line/80 flex-1 min-w-[20px] relative top-[-4px]" />
                            <span className="font-sans text-xs sm:text-sm text-monarq-gold-deep font-semibold whitespace-nowrap flex-shrink-0 tabular-nums">
                              {typeof item.price === 'number' ? `${item.price} DH` : item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="mt-1 font-sans text-xs text-monarq-ink-muted font-normal leading-relaxed pr-2">
                              {item.description}
                            </p>
                          )}

                        </div>
                      ))}
                    </div>

                    {/* Category separator */}
                    {catIdx < chapter.categories.length - 1 && (
                      <div className="mt-10 sm:mt-12 flex items-center gap-3">
                        <span className="block h-px flex-1 bg-monarq-line" />
                        <span
                          className="w-1 h-1 bg-monarq-line-strong inline-block"
                          style={{ transform: 'rotate(45deg)' }}
                        />
                        <span className="block h-px flex-1 bg-monarq-line" />
                      </div>
                    )}
                  </section>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Prev / Next chapter navigation */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-monarq-line flex items-center justify-between">
              <button
                onClick={goPrev}
                disabled={activeIdx === 0}
                className={`flex items-center gap-2 font-sans text-xs tracking-[0.22em] uppercase font-semibold transition-colors duration-200 group
                  ${activeIdx === 0 ? 'opacity-25 pointer-events-none' : 'text-monarq-ink-soft hover:text-monarq-ink'}`}
              >
                <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                {activeIdx > 0 ? menuChapters[activeIdx - 1].title : ''}
              </button>

              {/* Page dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {menuChapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`transition-all duration-300 rounded-full focus:outline-none ${
                      i === activeIdx
                        ? 'w-4 h-1.5 bg-monarq-gold'
                        : 'w-1.5 h-1.5 bg-monarq-line-strong hover:bg-monarq-gold/50'
                    }`}
                    aria-label={menuChapters[i].title}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={activeIdx === menuChapters.length - 1}
                className={`flex items-center gap-2 font-sans text-xs tracking-[0.22em] uppercase font-semibold transition-colors duration-200 group
                  ${activeIdx === menuChapters.length - 1 ? 'opacity-25 pointer-events-none' : 'text-monarq-ink-soft hover:text-monarq-ink'}`}
              >
                {activeIdx < menuChapters.length - 1 ? menuChapters[activeIdx + 1].title : ''}
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom ornament ──────────────────────────────────────── */}
      <FadeIn>
        <div className="flex flex-col items-center gap-3 py-8 sm:py-10 border-t border-monarq-line px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 sm:w-10 bg-monarq-gold/40" />
            <span
              className="w-1.5 h-1.5 bg-monarq-gold/60 inline-block"
              style={{ transform: 'rotate(45deg)' }}
            />
            <span className="block h-px w-8 sm:w-10 bg-monarq-gold/40" />
          </div>
          <p className="font-serif italic text-monarq-ink-muted text-xs sm:text-sm text-center leading-relaxed max-w-md">
            Tous nos plats sont préparés à la commande avec des produits frais et de saison.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
