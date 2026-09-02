import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
          src="https://ik.imagekit.io/Gocard/monarq-vid-1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* ── Premium Dark Warm Luxury Overlays (Warm Amber/Espresso & Black) ── */}
        {/* 1. Base warm ambient tint (espresso & deep gold undertones) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#141210]/60 via-[#1e1710]/38 to-[#2a1c0f]/25 pointer-events-none z-[1]" />

        {/* 2. Horizontal text-shield gradient (clarity for title, tagline & buttons on left) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/75 via-[#141210]/42 via-50% to-transparent pointer-events-none z-[2]" />

        {/* 3. Vertical gradient (protects top navbar & bottom info strip) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-black/10 via-45% to-[#141210]/50 pointer-events-none z-[2]" />

        {/* 4. Cinematic subtle edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(14,12,10,0.52)_100%)] pointer-events-none z-[3]" />


        {/* Hero Content — Perfectly Centered on Desktop with Generous Breathing Room */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 sm:pb-24 md:pb-24 lg:pb-28 flex flex-col justify-center my-auto">
          <div className="max-w-2xl flex flex-col space-y-4 sm:space-y-6 md:space-y-7">

            {/* 1. Brand name — clip-mask reveal */}
            <TextReveal delay={0.1} duration={DUR.cinematic}>
              <div>
                <h1 className="font-serif text-[36px] xs:text-[42px] sm:text-5xl md:text-6xl lg:text-[68px] text-white font-semibold leading-[1.05] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
                  MONARQ
                </h1>
                <TextReveal delay={0.2} duration={0.9}>
                  <div className="font-editorial italic font-normal text-monarq-gold-light text-[24px] xs:text-[28px] sm:text-4xl md:text-5xl leading-tight mt-0.5 sm:mt-1">
                    Brunch • Pizza • Pâtes
                  </div>
                </TextReveal>
              </div>
            </TextReveal>

            {/* 2. Logo Badge & Tagline */}
            <FadeUp delay={0.32} duration={DUR.mid}>
              <div className="flex flex-col items-start gap-2.5 sm:gap-3">
                <img
                  src={siteConfig.logos.badgeSeal}
                  alt="MONARQ Restaurant"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] object-contain brightness-0 invert opacity-95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] hover:scale-105 transition-transform duration-500 ease-monarch"
                />
                <p className="text-[13.5px] xs:text-sm sm:text-base md:text-lg text-gray-100 font-light leading-snug sm:leading-relaxed max-w-md drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
                  Des saveurs simples, gourmandes & authentiques.
                </p>
              </div>
            </FadeUp>

            {/* 3. Action Buttons */}
            <FadeUp delay={0.45} duration={DUR.mid}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <MagneticWrapper strength={0.2}>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
                    whileTap={reduce ? {} : { scale: 0.96 }}
                    transition={SPRING_SNAP}
                  >
                    La Carte
                  </motion.button>
                </MagneticWrapper>
                <MagneticWrapper strength={0.2}>
                  <motion.button
                    onClick={onOpenReservation}
                    className="group px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black/35 sm:bg-transparent border border-white/45 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-monarq-ink transition-colors duration-300 backdrop-blur-sm sm:backdrop-blur-none"
                    whileTap={reduce ? {} : { scale: 0.96 }}
                    transition={SPRING_SNAP}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-monarq-gold-light group-hover:text-monarq-ink transition-colors" />
                      Réserver
                    </span>
                  </motion.button>
                </MagneticWrapper>
              </div>
            </FadeUp>

            {/* 4. Info strip */}
            <FadeUp delay={0.58} duration={DUR.mid}>
              <div className="pt-1">
                <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 sm:px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs md:text-sm text-gray-200 font-medium tracking-wide shadow-luxury">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 text-monarq-gold-light flex-shrink-0" />
                    <span>08 h 00 — 00 h 00 · 7j/7</span>
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-monarq-gold/60" />
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <MapPin className="w-3.5 h-3.5 text-monarq-gold-light flex-shrink-0" />
                    <span>Avenue Marrakech · Tanger</span>
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Scroll cue — positioned nicely at the bottom */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
          animate={{ opacity: scrollCueVisible ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/50 font-medium">Découvrir</span>
          <ChevronDown className={`w-4 h-4 text-white/40 ${reduce ? '' : 'animate-scroll-cue'}`} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. À PROPOS
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-marble-pattern border-b border-monarq-line/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <div className="lg:col-span-5">
              <SlideLeft>
                <SectionEyebrow align="left">À Propos</SectionEyebrow>
                <TextReveal delay={0.05} duration={DUR.slow}>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold leading-tight mb-6">
                    Le goût de l'excellence, l'art de recevoir.
                  </h2>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-base sm:text-lg text-monarq-ink-soft leading-relaxed font-light mb-8">
                    MONARQ réunit le raffinement d'un décor en marbre sous verrière et la passion des produits nobles. Un havre chic et chaleureux pensé pour savourer chaque instant.
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <motion.button
                    onClick={() => goTo('atmosphere')}
                    className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-ink hover:text-monarq-gold-deep transition-colors arrow-link"
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
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                  <ImageReveal delay={0.05} duration={1.1}>
                    <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover">
                      <img
                        src="/images/concept-dining.jpg"
                        alt="Salle de restaurant MONARQ Tanger"
                        className="w-full h-80 sm:h-96 md:h-[460px] object-cover hover-scale-img"
                      />
                    </div>
                  </ImageReveal>
                </div>

                <div className="col-span-4 pt-12 sm:pt-20">
                  <ImageReveal delay={0.25} duration={1.0}>
                    <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover">
                      <img
                        src="/images/concept-terrace.jpg"
                        alt="Accueil MONARQ"
                        className="w-full h-48 sm:h-64 md:h-80 object-cover hover-scale-img"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-monarq-paper-soft/80 backdrop-blur-sm rounded-xl border border-monarq-gold/20 hidden sm:block">
                      <p className="font-serif text-xs text-monarq-gold-deep tracking-wider uppercase font-semibold">Tanger</p>
                      <p className="text-[11px] text-monarq-ink-soft mt-0.5 font-normal">Près du Palais Municipal</p>
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
      <section className="relative pt-20 md:pt-28 pb-0 bg-monarq-paper overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center mb-10 md:mb-14">
          <FadeUp>
            <SectionEyebrow>Immersion</SectionEyebrow>
            <TextReveal delay={0.1} duration={DUR.slow}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-3">
                Au Cœur de Tanger
              </h2>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-base text-monarq-ink-soft leading-relaxed font-light max-w-md mx-auto">
                Découvrez notre verrière et l'ambiance du restaurant en vidéo.
              </p>
            </FadeUp>
          </FadeUp>
        </div>

        <ScaleReveal delay={0.05}>
          <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden bg-monarq-black">
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
      <section className="py-24 md:py-36 bg-monarq-paper-soft relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center mb-20">
              <SectionEyebrow>Nos Spécialités</SectionEyebrow>
              <TextReveal delay={0.1} duration={DUR.slow}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-3">
                  Trois moments d'exception
                </h2>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-base sm:text-lg text-monarq-ink-soft max-w-md mx-auto font-light leading-relaxed">
                  Une partition gourmande au rythme de votre journée.
                </p>
              </FadeUp>
            </div>
          </FadeUp>

          <div className="space-y-0">
            {/* Moment 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14 border-b border-monarq-gold/25">
              <div className="md:col-span-5">
                <ImageReveal direction="right" duration={1.0}>
                  <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover">
                    <img
                      src="/images/moment-morning.jpg"
                      alt="Petit déjeuner chez MONARQ"
                      className="w-full h-72 md:h-80 object-cover hover-scale-img"
                    />
                  </div>
                </ImageReveal>
              </div>
              <SlideRight className="md:col-span-7">
                <span className="font-serif text-4xl md:text-5xl font-semibold text-monarq-gold">01</span>
                <TextReveal delay={0.05} duration={DUR.mid}>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-3 font-semibold">
                    Le Matin & Petits Déjeuners
                  </h3>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-5 font-light">
                    Viennoiseries fines, msemens au miel pur, jus d'oranges pressées et cafés de terroir. De 08 h 00 à 12 h 00.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group arrow-link"
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14 border-b border-monarq-gold/25">
              <SlideLeft className="md:col-span-7 md:order-1">
                <span className="font-serif text-4xl md:text-5xl font-semibold text-monarq-gold">02</span>
                <TextReveal delay={0.05} duration={DUR.mid}>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-3 font-semibold">
                    Les Grands Brunchs Signatures
                  </h3>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-5 font-light">
                    Brioches aux crevettes, toasts d'avocat au saumon mariné, œufs pochés et pancakes fondants. De 08 h 00 à 14 h 00.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group arrow-link"
                    whileHover={reduce ? {} : { x: 2 }}
                    transition={SPRING_FLUID}
                  >
                    <span>Explorer les brunchs</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep arrow-icon" />
                  </motion.button>
                </FadeUp>
              </SlideLeft>
              <div className="md:col-span-5 md:order-2">
                <ImageReveal direction="left" duration={1.0}>
                  <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover">
                    <img
                      src="/images/moment-cuisine.jpg"
                      alt="Brunchs MONARQ"
                      className="w-full h-72 md:h-80 object-cover hover-scale-img"
                    />
                  </div>
                </ImageReveal>
              </div>
            </div>

            {/* Moment 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14">
              <div className="md:col-span-5">
                <ImageReveal direction="right" duration={1.0}>
                  <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover">
                    <img
                      src="/images/moment-sweet.jpg"
                      alt="Cuisine MONARQ"
                      className="w-full h-72 md:h-80 object-cover hover-scale-img"
                    />
                  </div>
                </ImageReveal>
              </div>
              <SlideRight className="md:col-span-7">
                <span className="font-serif text-4xl md:text-5xl font-semibold text-monarq-gold">03</span>
                <TextReveal delay={0.05} duration={DUR.mid}>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-3 font-semibold">
                    Pâtes Artisanales, Steaks & Pizzas
                  </h3>
                </TextReveal>
                <FadeUp delay={0.15}>
                  <p className="text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-5 font-light">
                    Penne aux crevettes, risottos au saumon, viandes nobles grillées et pizzas au feu de bois. De midi à minuit.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group arrow-link"
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
      <section className="relative py-24 md:py-32 bg-monarq-paper border-b border-monarq-line/60 overflow-hidden">
        <img
          src="/images/ornament-waffle.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute top-12 md:top-16 lg:top-20 -left-24 md:-left-32 lg:-left-40 xl:-left-48 w-60 md:w-72 lg:w-96 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />
        <img
          src="/images/ornament-crepes.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute bottom-12 md:bottom-16 lg:bottom-20 -right-24 md:-right-32 lg:-right-40 xl:-right-48 w-60 md:w-72 lg:w-96 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionEyebrow>Créations Signatures</SectionEyebrow>
              <TextReveal delay={0.1} duration={DUR.slow}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold tracking-tight leading-tight mb-3">
                  Nos Incontournables
                </h2>
              </TextReveal>
              <FadeUp delay={0.15}>
                <p className="text-base text-monarq-ink-soft leading-relaxed font-light">
                  Des recettes d'exception préparées avec des ingrédients de premier choix.
                </p>
              </FadeUp>
            </div>
          </FadeUp>
        </div>

        <div className="relative z-10">
          <SignatureCarousel onOpenMenu={() => goTo('menu')} />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp delay={0.1} className="mt-10 text-center">
            <MagneticWrapper strength={0.15}>
              <motion.button
                onClick={() => goTo('menu')}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury group arrow-link"
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
      <section className="relative py-24 md:py-36 overflow-hidden bg-marble-pattern border-y border-monarq-line/50">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(158,128,80,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <FadeUp>
            {/* Medallion Seal with gentle rotation float */}
            <div className="relative inline-block mb-6">
              <img
                src={siteConfig.logos.badgeSeal}
                alt="MONARQ"
                aria-hidden="true"
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto opacity-90 drop-shadow-[0_4px_16px_rgba(158,128,80,0.25)] hover:scale-105 transition-transform duration-500 ease-monarch ${
                  reduce ? '' : 'animate-seal-float'
                }`}
              />
            </div>
            <SectionEyebrow>Réservations</SectionEyebrow>
          </FadeUp>

          <TextReveal delay={0.1} duration={DUR.slow}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-monarq-ink font-semibold mb-4 leading-tight">
              Réservez votre table d'exception
            </h2>
          </TextReveal>

          <FadeUp delay={0.2}>
            <p className="text-base sm:text-lg text-monarq-ink-soft max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Déjeuner d'affaires, grand brunch convivial ou dîner feutré : notre équipe de salle prépare votre venue avec une attention sur-mesure.
            </p>
          </FadeUp>

          {/* Quick Info Badges */}
          <FadeUp delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 text-xs sm:text-sm text-monarq-ink-soft font-medium">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-monarq-paper-soft/80 border border-monarq-gold/25 backdrop-blur-sm shadow-sm">
                <Clock className="w-3.5 h-3.5 text-monarq-gold-deep" />
                <span>08h00 — 00h00 · 7j/7</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-monarq-paper-soft/80 border border-monarq-gold/25 backdrop-blur-sm shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-monarq-gold-deep" />
                <span>Avenue Marrakech · Tanger</span>
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticWrapper strength={0.2}>
                <motion.button
                  onClick={onOpenReservation}
                  className="px-9 py-4 rounded-full btn-gold text-xs uppercase tracking-[0.22em] font-semibold shadow-luxury hover:shadow-luxury-lg flex items-center justify-center gap-2.5"
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
                  className="px-8 py-4 rounded-full btn-ghost text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2.5 bg-white/60 backdrop-blur-sm"
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
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-monarq-ink" />
                <span className="text-sm font-semibold text-monarq-ink tracking-wide">
                  {siteConfig.instagramHandle}
                </span>
              </div>
              <motion.a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors arrow-link"
                whileHover={reduce ? {} : { x: 2 }}
                transition={SPRING_FLUID}
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-4 h-4 text-monarq-gold arrow-icon" />
              </motion.a>
            </div>
          </FadeUp>

          {/* Instagram grid — accordion stagger with ImageReveal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {['/images/insta-1.jpg', '/images/insta-2.jpg', '/images/insta-3.jpg', '/images/insta-4.jpg'].map(
              (src, i) => (
                <ImageReveal key={i} delay={i * 0.07} duration={0.9}>
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden bg-monarq-paper-soft aspect-[4/5] luxury-card-hover border border-monarq-gold/20"
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
