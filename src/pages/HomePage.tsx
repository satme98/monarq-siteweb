import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Clock, Instagram, ChevronDown, Volume2, VolumeX, Leaf, Coffee } from 'lucide-react';
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

// ─── Immersion Portrait Video Section ────────────────────────────────────────
interface ImmersionSectionProps {
  onOpenReservation: () => void;
}

const IMMERSION_HIGHLIGHTS = [
  {
    icon: Leaf,
    label: 'La verrière :',
    text: 'lumière naturelle toute la journée',
  },
  {
    icon: Coffee,
    label: 'Du matin à minuit :',
    text: 'brunch, déjeuner, dîner',
  },
  {
    icon: MapPin,
    label: 'Avenue Marrakech :',
    text: 'à deux pas du Riad Tétouan',
  },
] as const;

function ImmersionSection({ onOpenReservation }: ImmersionSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const reduce = useReducedMotion();

  // IntersectionObserver: play when visible, pause when off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-monarq-paper relative overflow-hidden border-b border-monarq-line/50">
      <div
        className="mx-auto px-5 sm:px-8 lg:px-12"
        style={{ maxWidth: '1180px' }}
      >
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT — aligned with video */}
          <div className="lg:col-span-7 text-left">
            <FadeUp>
              <SectionEyebrow align="left">IMMERSION</SectionEyebrow>
            </FadeUp>

            <FadeUp delay={0.08}>
              <TextReveal delay={0.1} duration={DUR.slow}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-monarq-ink font-semibold mb-4 leading-tight">
                  Au Cœur de Tanger
                </h2>
              </TextReveal>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p
                className="font-sans leading-relaxed font-normal max-w-xl text-monarq-ink-soft mb-6 sm:mb-7"
                style={{ fontSize: '1.0625rem' }}
              >
                Sous notre verrière, la lumière de Tanger inonde le marbre et les plantes. Du premier café au dîner, chaque moment est pensé pour se poser, se retrouver et savourer.
              </p>
            </FadeUp>

            {/* Three short highlights with gold icons */}
            <FadeUp delay={0.22}>
              <ul className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8">
                {IMMERSION_HIGHLIGHTS.map(({ icon: Icon, label, text }) => (
                  <li key={label} className="flex items-start sm:items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-monarq-gold/12 border border-monarq-gold/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-4 h-4 text-monarq-gold-deep" />
                    </span>
                    <span className="font-sans text-sm sm:text-[15px] text-monarq-ink-soft leading-snug">
                      <strong className="font-semibold text-monarq-ink">{label}</strong>{' '}
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Two CTA buttons */}
            <FadeUp delay={0.28}>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                <MagneticWrapper strength={0.18}>
                  <motion.button
                    onClick={onOpenReservation}
                    className="px-7 sm:px-8 py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury inline-flex items-center gap-2.5"
                    whileTap={reduce ? {} : { scale: 0.96 }}
                    transition={SPRING_SNAP}
                  >
                    <Calendar className="w-3.5 h-3.5 text-white" />
                    <span>Réserver une table</span>
                  </motion.button>
                </MagneticWrapper>

                <MagneticWrapper strength={0.15}>
                  <motion.a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-7 py-3.5 rounded-full btn-ghost text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-2"
                    whileTap={reduce ? {} : { scale: 0.96 }}
                    transition={SPRING_SNAP}
                  >
                    <span>Voir l'itinéraire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-monarq-gold-deep" />
                  </motion.a>
                </MagneticWrapper>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — phone-ratio video + soft gold frame + floating info card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <FadeUp delay={0.15}>
              <div className="relative flex flex-col items-center">
                {/* Video + Soft Gold Frame wrapper */}
                <div className="relative">
                  {/* Soft ambient gold halo */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-[34px] bg-gradient-to-tr from-monarq-gold/25 via-monarq-gold/10 to-transparent blur-xl pointer-events-none"
                  />

                  {/* Soft gold architectural frame behind the video */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-[26px] border border-monarq-gold/45 bg-gradient-to-br from-monarq-gold/18 via-monarq-gold/8 to-monarq-paper-soft/60 shadow-gold-glow pointer-events-none"
                  />

                  {/* Phone-ratio video container */}
                  <div
                    ref={wrapperRef}
                    className="relative z-10 flex-shrink-0 overflow-hidden bg-monarq-black"
                    style={{
                      width: 'min(80vw, 330px)',
                      aspectRatio: '9 / 16',
                      borderRadius: '24px',
                      border: '1px solid rgba(158, 128, 80, 0.65)',
                      boxShadow: '0 22px 60px -15px rgba(24,21,18,0.22), 0 4px 16px rgba(24,21,18,0.08)',
                    }}
                  >
                    <video
                      ref={videoRef}
                      src="/videos/Localisation-monarq.mp4"
                      poster="/images/localisation-monarq-poster.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />

                    {/* Subtle corner mute button inside video */}
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                      className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                      style={{
                        background: 'rgba(20,18,16,0.55)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(154,123,79,0.5)',
                        color: '#D4C29E',
                      }}
                    >
                      {isMuted
                        ? <VolumeX className="w-4 h-4" />
                        : <Volume2 className="w-4 h-4" />
                      }
                    </button>
                  </div>

                  {/* Floating info card */}
                  <div className="absolute left-3 right-3 sm:right-auto sm:-left-6 bottom-5 sm:bottom-8 z-20 bg-monarq-paper/95 backdrop-blur-md border border-monarq-gold/40 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-luxury-lg flex items-center gap-3 sm:max-w-[260px]">
                    <div className="w-9 h-9 rounded-xl bg-monarq-gold/15 border border-monarq-gold/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-monarq-gold-deep" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] text-monarq-gold-deep font-bold whitespace-nowrap">
                          Ouvert 7j/7 · 09h–00h
                        </p>
                      </div>
                      <p className="font-sans text-xs text-monarq-ink font-medium mt-0.5 leading-snug truncate">
                        Av. Marrakech · Riad Tétouan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Small "Son activé / coupé" toggle under the video */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-monarq-paper-soft border border-monarq-gold/35 hover:border-monarq-gold text-xs font-medium text-monarq-ink-soft hover:text-monarq-ink transition-colors shadow-sm"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-monarq-gold-deep" />
                      <span>Son coupé · Activer le son</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-monarq-gold-deep" />
                      <span>Son activé · Couper le son</span>
                    </>
                  )}
                </button>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

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
      <div className="relative h-[2.6rem] sm:h-[3.4rem] min-w-[10.5rem] sm:min-w-[14rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={LABELS[index]}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center font-editorial italic font-normal text-white/90 whitespace-nowrap drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]"
            style={{ fontSize: 'clamp(1.65rem, 4.5vw, 3rem)', lineHeight: 1 }}
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
          <FadeUp delay={0.15} duration={DUR.mid}>
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
          <FadeUp delay={0.22} duration={DUR.mid}>
            <div className="mt-5 sm:mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-xs sm:text-[13px] text-white font-medium tracking-wide">
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
                  <p className="text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-normal mb-5 sm:mb-6">
                    MONARQ réunit le raffinement d'un décor en marbre sous verrière et la passion des produits nobles. Un havre chic et chaleureux pensé pour savourer chaque instant.
                  </p>
                </FadeUp>

                {/* 3 Key Figures */}
                <FadeUp delay={0.2}>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4 py-4 sm:py-5 mb-5 sm:mb-6 border-y border-monarq-gold/25">
                    <div>
                      <p className="font-serif text-xl sm:text-2xl xl:text-3xl text-monarq-gold-deep font-semibold leading-none whitespace-nowrap">
                        7j/7
                      </p>
                      <p className="font-sans text-[11px] sm:text-xs text-monarq-ink-soft mt-1.5 font-medium">
                        Service continu
                      </p>
                    </div>
                    <div className="border-l border-monarq-gold/20 pl-2.5 sm:pl-4">
                      <p className="font-serif text-xl sm:text-2xl xl:text-3xl text-monarq-gold-deep font-semibold leading-none whitespace-nowrap">
                        09h–00h
                      </p>
                      <p className="font-sans text-[11px] sm:text-xs text-monarq-ink-soft mt-1.5 font-medium">
                        Du matin à minuit
                      </p>
                    </div>
                    <div className="border-l border-monarq-gold/20 pl-2.5 sm:pl-4">
                      <p className="font-serif text-xl sm:text-2xl xl:text-3xl text-monarq-gold-deep font-semibold leading-none whitespace-nowrap">
                        +80
                      </p>
                      <p className="font-sans text-[11px] sm:text-xs text-monarq-ink-soft mt-1.5 font-medium">
                        Plats signature
                      </p>
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <motion.button
                    onClick={() => goTo('atmosphere')}
                    className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-ink hover:text-monarq-gold-deep transition-colors arrow-link"
                    transition={SPRING_FLUID}
                  >
                    <span>Découvrir le lieu</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep arrow-icon" />
                  </motion.button>
                </FadeUp>
              </SlideLeft>
            </div>

            {/* Equal-height image composition */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-3 sm:gap-4 items-stretch">
                <div className="col-span-7">
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

                <div className="col-span-5">
                  <ImageReveal delay={0.2} duration={1.0}>
                    <div className="rounded-2xl overflow-hidden border border-monarq-gold/25 group luxury-card-hover shadow-luxury">
                      <img
                        src="/images/concept-terrace.jpg"
                        alt="Accueil MONARQ"
                        className="w-full h-64 sm:h-80 md:h-[380px] lg:h-[420px] object-cover hover-scale-img"
                      />
                    </div>
                  </ImageReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. IMMERSION — Portrait Video + Text
          ═══════════════════════════════════════════════════ */}
      <ImmersionSection onOpenReservation={onOpenReservation} />

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
                <p className="text-sm sm:text-base text-monarq-ink-soft max-w-md mx-auto font-normal leading-relaxed">
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
                  <p className="text-[14.5px] sm:text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-3.5 sm:mb-4 font-normal">
                    Viennoiseries fines, msemens au miel pur, jus d'oranges pressées et cafés de terroir. De 09 h 00 à 12 h 00.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2 group arrow-link"
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
                  <p className="text-[14.5px] sm:text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-3.5 sm:mb-4 font-normal">
                    Brioches aux crevettes, toasts d'avocat au saumon mariné, œufs pochés et pancakes fondants. De 09 h 00 à 14 h 00.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2 group arrow-link"
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
                  <p className="text-[14.5px] sm:text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-3.5 sm:mb-4 font-normal">
                    Penne aux crevettes, risottos au saumon, viandes nobles grillées et pizzas au feu de bois. De midi à minuit.
                  </p>
                  <motion.button
                    onClick={() => goTo('menu')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2 group arrow-link"
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
        {/* Decorative sketches — fully inside section bounds, never cropped */}
        <img
          src="/images/ornament-waffle.png"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute top-6 left-6 w-32 xl:w-40 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.08] filter grayscale contrast-125 sepia-[0.25]"
        />
        <img
          src="/images/ornament-crepes.png"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute bottom-6 right-6 w-32 xl:w-40 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.08] filter grayscale contrast-125 sepia-[0.25]"
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
                <p className="text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-normal">
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
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto opacity-90 drop-shadow-[0_4px_16px_rgba(158,128,80,0.25)] hover:scale-105 transition-transform duration-500 ease-monarch ${reduce ? '' : 'animate-seal-float'
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
            <p className="text-sm sm:text-base text-monarq-ink-soft max-w-lg mx-auto mb-6 sm:mb-7 leading-relaxed font-normal">
              Déjeuner d'affaires, grand brunch convivial ou dîner feutré : notre équipe de salle prépare votre venue avec une attention sur-mesure.
            </p>
          </FadeUp>

          {/* Quick Info Badges */}
          <FadeUp delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-7 text-xs sm:text-[13px] text-monarq-ink font-semibold">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-monarq-paper-soft border border-monarq-gold/35 backdrop-blur-sm shadow-sm">
                <Clock className="w-4 h-4 text-monarq-gold-deep" />
                <span>09h00 — 00h00 · 7j/7</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-monarq-paper-soft border border-monarq-gold/35 backdrop-blur-sm shadow-sm">
                <MapPin className="w-4 h-4 text-monarq-gold-deep" />
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
                transition={SPRING_FLUID}
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-monarq-gold arrow-icon" />
              </motion.a>
            </div>
          </FadeUp>

          {/* Instagram grid — accordion stagger with ImageReveal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {[
              '/images/photographer/_DSC6976.jpg',
              '/images/photographer/_DSC7015.jpg',
              '/images/photographer/_DSC7124.jpg',
              '/images/photographer/_DSC6971-Modifier.jpg',
            ].map(
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
