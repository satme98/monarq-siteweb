import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Clock, Instagram, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { DroneVideoPlayer } from '../components/DroneVideoPlayer';
import {
  FadeUp,
  FadeIn,
  SlideLeft,
  SlideRight,
  ScaleReveal,
  ImageReveal,
  StaggerGroup,
  StaggerItem,
  ParallaxImage,
  TextReveal,
  LineReveal,
  MagneticWrapper,
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { SignatureCarousel } from '../components/SignatureCarousel';
// HeroSlider replaced by video background
import { EASE_CINEMATIC, SPRING_SNAP, SPRING_FLUID, DUR } from '../lib/animation';

// ─── Hero Cycling Label — Brunch / Restaurant / Café ─────────────────────────
const LABELS = ['Brunch', 'Restaurant', 'Café'] as const;

interface HeroCyclingLabelProps {
  reduce: boolean;
}

const HeroCyclingLabel: React.FC<HeroCyclingLabelProps> = ({ reduce }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LABELS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const variants = {
    enter: {
      y: 40,
      opacity: 0,
      scale: 0.85,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 0.9, 0.36, 1.0],
      },
    },
    exit: {
      y: -40,
      opacity: 0,
      scale: 0.85,
      transition: {
        duration: 0.35,
        ease: [0.55, 0, 0.8, 0.2],
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-3 sm:gap-4 mt-1 mb-5 sm:mb-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 0.9, 0.36, 1.0] }}
    >
      {/* Left ornament: line + diamond */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
        <div className="h-[1px] w-6 sm:w-10 md:w-14 bg-gradient-to-r from-transparent to-monarq-gold/45" />
        <span className="w-1.5 h-1.5 inline-block bg-monarq-gold shadow-[0_0_6px_rgba(158,128,80,0.55)]" style={{ transform: 'rotate(45deg)' }} />
      </div>

      {/* Flip slot */}
      <div className="relative" style={{ height: '3.4rem', minWidth: '14rem' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={LABELS[index]}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center font-editorial italic font-normal text-white/90 whitespace-nowrap drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', lineHeight: 1 }}
          >
            {LABELS[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Right ornament: diamond + line */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 inline-block bg-monarq-gold shadow-[0_0_6px_rgba(158,128,80,0.55)]" style={{ transform: 'rotate(45deg)' }} />
        <div className="h-[1px] w-6 sm:w-10 md:w-14 bg-gradient-to-r from-monarq-gold/45 to-transparent" />
      </div>
    </motion.div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenReservation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenReservation }) => {
  const reduce = useReducedMotion();
  const [scrollCueVisible, setScrollCueVisible] = useState(true);
  const { scrollY } = useScroll();

  // Hide scroll cue once user scrolls
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      if (v > 80) setScrollCueVisible(false);
    });
    return unsub;
  }, [scrollY]);

  const goTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          1. HERO — Cinematic, editorial
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center bg-monarq-black overflow-hidden">
        {/* Full-width cinematic video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="https://ik.imagekit.io/yascode/data/Video-Hero-002.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* ── Premium Dark Overlays — Strong center darkening for text ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e0c0a]/70 via-[#1a1510]/50 to-[#2a1c0f]/35 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/90 via-[#0e0c0a]/30 via-50% to-[#0e0c0a]/60 pointer-events-none z-[2]" />
        {/* Center-focused radial darken so text always pops */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_48%,rgba(10,8,6,0.55)_0%,rgba(10,8,6,0.35)_60%,rgba(10,8,6,0.65)_100%)] pointer-events-none z-[3]" />

        {/* ── Hero Content — Centered ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center my-auto">

          {/* Badge seal */}
          <FadeUp delay={0.05} duration={DUR.mid}>
            <img
              src={siteConfig.logos.badgeSeal}
              alt="MONARQ"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] object-contain brightness-0 invert opacity-90 drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] mb-5 sm:mb-6"
            />
          </FadeUp>

          {/* Brand name */}
          <TextReveal delay={0.12} duration={DUR.cinematic}>
            <h1 className="font-serif text-[44px] xs:text-[54px] sm:text-6xl md:text-7xl lg:text-[82px] text-white font-semibold leading-[1.0] tracking-tight drop-shadow-[0_3px_20px_rgba(0,0,0,0.85)] mb-1 sm:mb-2">
              MONARQ
            </h1>
          </TextReveal>

          {/* Animated cycling label: Brunch → Restaurant → Café */}
          <HeroCyclingLabel reduce={!!reduce} />

          {/* Action Buttons */}
          <FadeUp delay={0.55} duration={DUR.mid}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <MagneticWrapper strength={0.2}>
                <motion.button
                  onClick={() => goTo('menu')}
                  className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.22em] font-semibold shadow-[0_4px_24px_rgba(197,164,103,0.35)]"
                  whileTap={reduce ? {} : { scale: 0.96 }}
                  transition={SPRING_SNAP}
                >
                  La Carte
                </motion.button>
              </MagneticWrapper>
              <MagneticWrapper strength={0.2}>
                <motion.button
                  onClick={onOpenReservation}
                  className="group px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-white/10 border border-white/50 text-white text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white hover:text-monarq-ink transition-colors duration-300 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                  whileTap={reduce ? {} : { scale: 0.96 }}
                  transition={SPRING_SNAP}
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-monarq-gold-light group-hover:text-monarq-ink transition-colors" />
                    Réserver
                  </span>
                </motion.button>
              </MagneticWrapper>
            </div>
          </FadeUp>

          {/* Location pill */}
          <FadeUp delay={0.78} duration={DUR.mid}>
            <div className="mt-5 sm:mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs text-white/85 font-medium tracking-wide">
                <MapPin className="w-3 h-3 text-[#c5a467] flex-shrink-0" />
                <span>Avenue Marrakech, Tanger</span>
              </div>
            </div>
          </FadeUp>

        </div>

        {/* Scroll cue — bottom center */}
        <motion.div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 pointer-events-none"
          animate={{ opacity: scrollCueVisible ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/50 font-medium">Découvrir</span>
          <ChevronDown className={`w-3.5 h-3.5 text-white/40 ${reduce ? '' : 'animate-scroll-cue'}`} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. À PROPOS
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-marble-pattern border-b border-monarq-line/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
            {/* Text column */}
            <div className="lg:col-span-5">
              <SlideLeft>
                <SectionEyebrow align="left">À Propos</SectionEyebrow>
                <TextReveal delay={0.05} duration={DUR.slow}>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-monarq-ink font-semibold leading-tight mb-3 sm:mb-4">
                    Le goût de l'excellence, l'art de recevoir.
                  </h2>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-light mb-5 sm:mb-6">
                    MONARQ réunit le raffinement d'un décor en marbre sous verrière et la passion des produits nobles. Un havre chic et chaleureux pensé pour savourer chaque instant.
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <motion.button
                    onClick={() => goTo('atmosphere')}
                    className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-ink hover:text-monarq-gold-deep transition-colors arrow-link"
                    whileHover={reduce ? {} : { x: 2 }}
                    transition={SPRING_FLUID}
                  >
                    <span>Découvrir le lieu</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep arrow-icon" />
                  </motion.button>
                </FadeUp>
              </SlideLeft>
            </div>

            {/* Asymmetric image composition */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-3 sm:gap-4">
                <div className="col-span-8">
                  <ImageReveal delay={0.05} duration={1.1}>
                    <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover shadow-luxury">
                      <img
                        src="/images/concept-dining.jpg"
                        alt="Salle de restaurant MONARQ Tanger"
                        className="w-full h-64 sm:h-80 md:h-[380px] lg:h-[420px] object-cover hover-scale-img"
                      />
                    </div>
                  </ImageReveal>
                </div>

                <div className="col-span-4 pt-6 sm:pt-8 md:pt-12">
                  <ImageReveal delay={0.25} duration={1.0}>
                    <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover shadow-luxury">
                      <img
                        src="/images/concept-terrace.jpg"
                        alt="Accueil MONARQ"
                        className="w-full h-40 sm:h-52 md:h-64 lg:h-72 object-cover hover-scale-img"
                      />
                    </div>
                    <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 bg-monarq-paper-soft/80 backdrop-blur-sm rounded-xl border border-monarq-gold/20 hidden sm:block">
                      <p className="font-serif text-[11px] sm:text-xs text-monarq-gold-deep tracking-wider uppercase font-semibold">Tanger</p>
                      <p className="text-[10.5px] sm:text-[11px] text-monarq-ink-soft mt-0.5 font-normal">À proximité du Riad Tétouan</p>
                    </div>
                  </ImageReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. CINEMATIC VIDEO INTERLUDE
          ═══════════════════════════════════════════════════ */}
      <section className="relative pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-0 bg-monarq-paper overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 text-center mb-6 sm:mb-8 md:mb-10">
          <FadeUp>
            <SectionEyebrow>Immersion</SectionEyebrow>
            <TextReveal delay={0.1} duration={DUR.slow}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold mb-2 sm:mb-2.5">
                Au Cœur de Tanger
              </h2>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-light max-w-md mx-auto">
                Découvrez notre verrière et l'ambiance du restaurant en vidéo.
              </p>
            </FadeUp>
          </FadeUp>
        </div>

        <ScaleReveal delay={0.05}>
          <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] overflow-hidden bg-monarq-black">
            <DroneVideoPlayer
              src={siteConfig.videos.interiorWalkthrough}
              poster="/images/tangier-drone-poster.jpg"
              className="w-full h-full"
            />
          </div>
        </ScaleReveal>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. SPÉCIALITÉS — 3 Instants
          ═══════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-monarq-paper-soft relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <SectionEyebrow>Nos Spécialités</SectionEyebrow>
              <TextReveal delay={0.1} duration={DUR.slow}>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-monarq-ink font-semibold mb-2">
                  Trois moments d'exception
                </h2>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-sm sm:text-base text-monarq-ink-soft max-w-md mx-auto font-light leading-relaxed">
                  Une partition gourmande au rythme de votre journée.
                </p>
              </FadeUp>
            </div>
          </FadeUp>

          <div className="space-y-0">
            {/* Moment 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center py-6 sm:py-8 md:py-10 border-b border-monarq-gold/25">
              <div className="md:col-span-5">
                <ImageReveal direction="right" duration={1.0}>
                  <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover shadow-luxury">
                    <img
                      src="/images/moment-morning.jpg"
                      alt="Petit déjeuner chez MONARQ"
                      className="w-full h-52 sm:h-60 md:h-72 lg:h-76 object-cover hover-scale-img"
                    />
                  </div>
                </ImageReveal>
              </div>
              <SlideRight className="md:col-span-7">
                <span className="font-serif text-3xl sm:text-4xl text-monarq-gold font-semibold leading-none">01</span>
                <TextReveal delay={0.05} duration={DUR.mid}>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-monarq-ink mt-1.5 mb-2 sm:mb-2.5 font-semibold">
                    Le Matin & Petits Déjeuners
                  </h3>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-sm sm:text-[15px] text-monarq-ink-soft leading-relaxed max-w-lg mb-3.5 sm:mb-4 font-light">
                    Viennoiseries fines, msemens au miel pur, jus d'oranges pressées et cafés de terroir. De 09 h 00 à 12 h 00.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2 group arrow-link"
                    whileHover={reduce ? {} : { x: 2 }}
                    transition={SPRING_FLUID}
                  >
                    <span>Découvrir</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep arrow-icon" />
                  </motion.button>
                </FadeUp>
              </SlideRight>
            </div>

            {/* Moment 2 — reversed */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center py-6 sm:py-8 md:py-10 border-b border-monarq-gold/25">
              <SlideLeft className="md:col-span-7 order-2 md:order-1">
                <span className="font-serif text-3xl sm:text-4xl text-monarq-gold font-semibold leading-none">02</span>
                <TextReveal delay={0.05} duration={DUR.mid}>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-monarq-ink mt-1.5 mb-2 sm:mb-2.5 font-semibold">
                    Les Grands Brunchs Signatures
                  </h3>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-sm sm:text-[15px] text-monarq-ink-soft leading-relaxed max-w-lg mb-3.5 sm:mb-4 font-light">
                    Brioches aux crevettes, toasts d'avocat au saumon mariné, œufs pochés et pancakes fondants. De 09 h 00 à 14 h 00.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2 group arrow-link"
                    whileHover={reduce ? {} : { x: 2 }}
                    transition={SPRING_FLUID}
                  >
                    <span>Explorer les brunchs</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep arrow-icon" />
                  </motion.button>
                </FadeUp>
              </SlideLeft>
              <div className="md:col-span-5 order-1 md:order-2">
                <ImageReveal direction="left" duration={1.0}>
                  <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover shadow-luxury">
                    <img
                      src="/images/moment-cuisine.jpg"
                      alt="Brunchs MONARQ"
                      className="w-full h-52 sm:h-60 md:h-72 lg:h-76 object-cover hover-scale-img"
                    />
                  </div>
                </ImageReveal>
              </div>
            </div>

            {/* Moment 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center py-6 sm:py-8 md:py-10">
              <div className="md:col-span-5">
                <ImageReveal direction="right" duration={1.0}>
                  <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover shadow-luxury">
                    <img
                      src="/images/moment-sweet.jpg"
                      alt="Cuisine MONARQ"
                      className="w-full h-52 sm:h-60 md:h-72 lg:h-76 object-cover hover-scale-img"
                    />
                  </div>
                </ImageReveal>
              </div>
              <SlideRight className="md:col-span-7">
                <span className="font-serif text-3xl sm:text-4xl text-monarq-gold font-semibold leading-none">03</span>
                <TextReveal delay={0.05} duration={DUR.mid}>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-monarq-ink mt-1.5 mb-2 sm:mb-2.5 font-semibold">
                    Pâtes Artisanales, Steaks & Pizzas
                  </h3>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-sm sm:text-[15px] text-monarq-ink-soft leading-relaxed max-w-lg mb-3.5 sm:mb-4 font-light">
                    Penne aux crevettes, risottos au saumon, viandes nobles grillées et pizzas au feu de bois. De midi à minuit.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2 group arrow-link"
                    whileHover={reduce ? {} : { x: 2 }}
                    transition={SPRING_FLUID}
                  >
                    <span>Découvrir la cuisine</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep arrow-icon" />
                  </motion.button>
                </FadeUp>
              </SlideRight>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. PLATS SIGNATURES CAROUSEL
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-monarq-paper border-b border-monarq-line/60 overflow-hidden">
        <img
          src="/images/ornament-waffle.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute top-8 md:top-12 lg:top-16 -left-24 md:-left-32 lg:-left-40 xl:-left-48 w-60 md:w-72 lg:w-96 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />
        <img
          src="/images/ornament-crepes.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute bottom-8 md:bottom-12 lg:bottom-16 -right-24 md:-right-32 lg:-right-40 xl:-right-48 w-60 md:w-72 lg:w-96 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <SectionEyebrow>Créations Signatures</SectionEyebrow>
              <TextReveal delay={0.1} duration={DUR.slow}>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold tracking-tight leading-tight mb-2">
                  Nos Incontournables
                </h2>
              </TextReveal>
              <FadeUp delay={0.15}>
                <p className="text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-light">
                  Des recettes d'exception préparées avec des ingrédients de premier choix.
                </p>
              </FadeUp>
            </div>
          </FadeUp>
        </div>

        <div className="relative z-10">
          <SignatureCarousel onOpenMenu={() => goTo('menu')} />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <FadeUp delay={0.1} className="mt-6 sm:mt-8 text-center">
            <MagneticWrapper strength={0.15}>
              <motion.button
                onClick={() => goTo('menu')}
                className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury group arrow-link"
                whileTap={reduce ? {} : { scale: 0.96 }}
                transition={SPRING_SNAP}
              >
                <span>Consulter la Carte Complète</span>
                <ArrowRight className="w-4 h-4 text-white arrow-icon" />
              </motion.button>
            </MagneticWrapper>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. RÉSERVATIONS — Luxury Invitation
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-marble-pattern border-y border-monarq-line/50">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,128,80,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10">
          <FadeUp>
            {/* Medallion Seal with gentle rotation float */}
            <div className="relative inline-block mb-2.5 sm:mb-3">
              <img
                src={siteConfig.logos.badgeSeal}
                alt="MONARQ"
                aria-hidden="true"
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto opacity-90 drop-shadow-[0_4px_16px_rgba(158,128,80,0.25)] hover:scale-105 transition-transform duration-500 ease-monarch ${
                  reduce ? '' : 'animate-seal-float'
                }`}
              />
            </div>
            <SectionEyebrow>Réservations</SectionEyebrow>
          </FadeUp>

          <TextReveal delay={0.1} duration={DUR.slow}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-monarq-ink font-semibold mb-2.5 sm:mb-3 leading-tight">
              Réservez votre table d'exception
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-monarq-ink-soft max-w-lg mx-auto mb-6 sm:mb-7 leading-relaxed font-light">
              Déjeuner d'affaires, grand brunch convivial ou dîner feutré : notre équipe de salle prépare votre venue avec une attention sur-mesure.
            </p>
          </FadeUp>

          {/* Quick Info Badges */}
          <FadeUp delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-7 text-xs sm:text-sm text-monarq-ink-soft font-medium">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-monarq-paper-soft/80 border border-monarq-gold/25 backdrop-blur-sm shadow-sm text-xs">
                <Clock className="w-3.5 h-3.5 text-monarq-gold-deep" />
                <span>09h00 — 00h00 · 7j/7</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-monarq-paper-soft/80 border border-monarq-gold/25 backdrop-blur-sm shadow-sm text-xs">
                <MapPin className="w-3.5 h-3.5 text-monarq-gold-deep" />
                <span>Avenue Marrakech, Tanger</span>
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5">
              <MagneticWrapper strength={0.2}>
                <motion.button
                  onClick={onOpenReservation}
                  className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.22em] font-semibold shadow-luxury hover:shadow-luxury-lg flex items-center justify-center gap-2"
                  whileTap={reduce ? {} : { scale: 0.96 }}
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  transition={SPRING_SNAP}
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Réserver en ligne</span>
                </motion.button>
              </MagneticWrapper>
              
              <MagneticWrapper strength={0.15}>
                <motion.a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full btn-ghost text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm"
                  whileHover={reduce ? {} : { y: -2, scale: 1.01 }}
                  whileTap={reduce ? {} : { scale: 0.96 }}
                  transition={SPRING_SNAP}
                >
                  <span>WhatsApp Direct</span>
                  <ArrowUpRight className="w-4 h-4 text-monarq-gold" />
                </motion.a>
              </MagneticWrapper>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. INSTAGRAM GRID
          ═══════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-monarq-ink" />
                <span className="text-xs sm:text-sm font-semibold text-monarq-ink tracking-wide">
                  {siteConfig.instagramHandle}
                </span>
              </div>
              <motion.a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors arrow-link"
                whileHover={reduce ? {} : { x: 2 }}
                transition={SPRING_FLUID}
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-monarq-gold arrow-icon" />
              </motion.a>
            </div>
          </FadeUp>

          {/* Instagram grid — accordion stagger with ImageReveal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {['/images/insta-1.jpg', '/images/insta-2.jpg', '/images/insta-3.jpg', '/images/insta-4.jpg'].map(
              (src, i) => (
                <ImageReveal key={i} delay={i * 0.07} duration={0.9}>
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden bg-monarq-paper-soft aspect-[4/5] luxury-card-hover border border-monarq-gold/20 shadow-luxury"
                  >
                    <img
                      src={src}
                      alt={`MONARQ Tanger Instagram ${i + 1}`}
                      className="w-full h-full object-cover hover-scale-img"
                    />
                  </a>
                </ImageReveal>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
