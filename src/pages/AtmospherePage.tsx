import React, { useRef, useEffect } from 'react';
import { ParallaxImage } from '../components/ScrollAnimations';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import {
  FadeUp,
  SlideLeft,
  ScaleReveal,
  ImageReveal,
  StaggerGroup,
  StaggerItem,
  TextReveal,
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { siteConfig } from '../data/siteConfig';
import { DroneVideoPlayer } from '../components/DroneVideoPlayer';
import { useLanguage } from '../i18n';
import { GSAP_EASE_CINEMATIC, DUR, prefersReducedMotion } from '../lib/animation';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AtmospherePageProps {
  onOpenReservation: () => void;
  setActiveTab: (tab: string) => void;
}

export default function AtmospherePage({ onOpenReservation }: AtmospherePageProps) {
  const reduce = useReducedMotion();
  const { lang, t, isRTL } = useLanguage();

  // ── GSAP SplitText hero heading ─────────────────────────────────────────────
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (lang === 'ar') return;
    if (!heroHeadingRef.current) return;

    let cancelled = false;
    const ctx = gsap.context(() => {
      // Wait for fonts before splitting
      document.fonts.ready.then(() => {
        if (cancelled || !heroHeadingRef.current) return;

        const split = SplitText.create(heroHeadingRef.current, {
          type: 'lines',
          linesClass: 'split-line overflow-hidden',
          autoSplit: true,
        });

        gsap.from(split.lines, {
          yPercent: 108,
          opacity: 0,
          stagger: 0.09,
          duration: 1.0,
          ease: GSAP_EASE_CINEMATIC,
          delay: 0.3,
          onComplete: () => {
            split.revert();
          },
        });
      });
    }, heroHeadingRef);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [lang]);

  // ── Pull quote word-by-word reveal ──────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (lang === 'ar') return;
    if (!quoteRef.current) return;

    let cancelled = false;
    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (cancelled || !quoteRef.current) return;

        const split = SplitText.create(quoteRef.current, {
          type: 'words',
          wordsClass: 'split-word inline-block',
          autoSplit: true,
        });

        gsap.from(split.words, {
          opacity: 0,
          y: 14,
          stagger: 0.055,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 78%',
            once: true,
          },
          onComplete: () => {
            split.revert();
          },
        });
      });
    }, quoteRef);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [lang]);

  return (
    <div className="bg-monarq-paper min-h-screen pt-20 sm:pt-24 pb-14 sm:pb-16">

      {/* 1. HERO OPENING */}
      <section className="bg-marble-pattern py-12 sm:py-16 md:py-20 px-5 sm:px-6 flex flex-col items-center justify-center text-center">
        <FadeUp delay={0.15}>
          <SectionEyebrow>{t.atmospherePage.eyebrow}</SectionEyebrow>
        </FadeUp>

        {/* SplitText target — GSAP handles reveal, so no motion wrapper */}
        <h1
          key={lang}
          ref={heroHeadingRef}
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-monarq-ink mb-3 sm:mb-4 leading-tight max-w-4xl font-semibold ${
            reduce ? 'opacity-0 animate-[fadeIn_0.4s_0.3s_ease_forwards]' : ''
          }`}
          style={reduce ? { opacity: 0, animation: 'none' } : {}}
        >
          {t.atmospherePage.titlePart1}{' '}
          <br />
          <span className="font-editorial italic font-normal text-monarq-gold-deep">
            {t.atmospherePage.titlePart2}
          </span>
        </h1>

        {/* Fallback for reduced motion */}
        {reduce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-monarq-ink mb-3 sm:mb-4 leading-tight max-w-4xl font-semibold absolute"
            style={{ pointerEvents: 'none' }}
          />
        )}

        <FadeUp delay={0.55}>
          <p className="font-sans text-monarq-ink-soft text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            {t.atmospherePage.subtitle}
          </p>
        </FadeUp>
      </section>

      {/* 2. NOTRE HISTOIRE */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <SlideLeft>
              <SectionEyebrow align={isRTL ? 'right' : 'left'}>{t.atmospherePage.historyEyebrow}</SectionEyebrow>
              <TextReveal delay={0.08} duration={DUR.slow}>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold mb-3 sm:mb-4 leading-tight">
                  {t.atmospherePage.historyTitle}
                </h2>
              </TextReveal>
              <FadeUp delay={0.18}>
                <div className="font-sans text-monarq-ink-soft text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                  <p>
                    {t.atmospherePage.historyP1}
                  </p>
                  <p>
                    {t.atmospherePage.historyP2}
                  </p>
                </div>
              </FadeUp>
            </SlideLeft>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <ImageReveal delay={0.05} duration={1.0}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-0 group luxury-card-hover border border-monarq-gold/25">
                  <img
                    src="/website-images/interior/staggered-story-1.webp"
                    alt={`MONARQ ${t.common.city}`}
                    loading="lazy" decoding="async" className="object-cover w-full h-full hover-scale-img"
                  />
                </div>
              </ImageReveal>
              <ImageReveal delay={0.25} duration={1.0}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-10 md:mt-12 group luxury-card-hover border border-monarq-gold/25">
                  <img
                    src="/website-images/interior/monarq-lobby-reception.webp"
                    alt={`MONARQ ${t.common.city}`}
                    loading="lazy" decoding="async" className="object-cover w-full h-full hover-scale-img"
                  />
                </div>
              </ImageReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PULL QUOTE — word-by-word reveal + true GSAP parallax */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <ParallaxImage
          src="/website-images/interior/interlude-atmosphere.webp"
          alt={`MONARQ ${t.common.city}`}
          rate={0.28}
          hoverScale={false}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-monarq-black/48 flex items-center justify-center p-6 text-center backdrop-blur-[1px]">
          <p
            key={lang}
            ref={quoteRef}
            className="font-editorial italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-monarq-paper max-w-3xl leading-snug font-normal"
          >
            {t.atmospherePage.pullQuote}
          </p>
        </div>
      </section>

      {/* 4. NOS 3 VALEURS */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 max-w-4xl mx-auto">
        <FadeUp>
          <SectionEyebrow>{t.atmospherePage.pillarsEyebrow}</SectionEyebrow>
          <TextReveal delay={0.1} duration={DUR.slow}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold text-center mb-8 sm:mb-10">
              {t.atmospherePage.pillarsTitle}
            </h2>
          </TextReveal>
        </FadeUp>

        <StaggerGroup className="flex flex-col" staggerDelay={0.1}>
          {t.atmospherePage.pillars.map((value, idx) => (
            <React.Fragment key={value.num}>
              {idx !== 0 && <div className="h-[1px] w-full bg-monarq-gold/30 my-5 sm:my-7" />}
              <StaggerItem>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 md:gap-10">
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-gold font-semibold leading-none">
                    {value.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-monarq-ink font-semibold mb-1">
                      {value.title}
                    </h3>
                    <p className="font-sans text-monarq-ink-soft text-sm sm:text-base leading-relaxed font-normal">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </React.Fragment>
          ))}
        </StaggerGroup>
      </section>

      {/* 5. CINEMATIC DRONE VIDEO */}
      <ScaleReveal delay={0.05}>
        <section className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-hidden bg-monarq-black">
          <DroneVideoPlayer
            src={siteConfig.videos.interiorWalkthrough}
            poster="/website-images/interior/hero-interior.webp"
            className="w-full h-full"
          />
        </section>
      </ScaleReveal>

      {/* 6. CLOSING CTA */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 flex flex-col items-center text-center bg-marble-pattern border-t border-monarq-line/50">
        <ScaleReveal>
          <TextReveal delay={0.05} duration={DUR.slow}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold mb-3 sm:mb-4">
              {t.atmospherePage.closingTitle}
            </h2>
          </TextReveal>
          <FadeUp delay={0.15}>
            <p className="font-sans text-monarq-ink-soft text-sm sm:text-base mb-5 sm:mb-6 max-w-lg mx-auto leading-relaxed font-normal">
              {t.atmospherePage.closingDesc}
            </p>
            <motion.button
              onClick={onOpenReservation}
              className="btn-gold px-8 sm:px-9 py-3 sm:py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury"
              whileTap={reduce ? {} : { scale: 0.96 }}
            >
              {t.atmospherePage.closingBtn}
            </motion.button>
          </FadeUp>
        </ScaleReveal>
      </section>
    </div>
  );
}
