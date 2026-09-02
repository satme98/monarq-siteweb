import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import {
  FadeUp,
  FadeIn,
  SlideLeft,
  SlideRight,
  ScaleReveal,
  ImageReveal,
  ParallaxImage,
  StaggerGroup,
  StaggerItem,
  TextReveal,
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { siteConfig } from '../data/siteConfig';
import { DroneVideoPlayer } from '../components/DroneVideoPlayer';
import { EASE_CINEMATIC, GSAP_EASE_CINEMATIC, DUR, prefersReducedMotion } from '../lib/animation';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AtmospherePageProps {
  onOpenReservation: () => void;
  setActiveTab: (tab: string) => void;
}

export default function AtmospherePage({ onOpenReservation, setActiveTab }: AtmospherePageProps) {
  const reduce = useReducedMotion();

  // ── GSAP SplitText hero heading ─────────────────────────────────────────────
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!heroHeadingRef.current) return;

    const ctx = gsap.context(() => {
      // Wait for fonts before splitting
      document.fonts.ready.then(() => {
        if (!heroHeadingRef.current) return;

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

    return () => ctx.revert();
  }, []);

  // ── Pull quote word-by-word reveal ──────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!quoteRef.current) return;

    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (!quoteRef.current) return;

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

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-monarq-paper min-h-screen pt-32 pb-24">

      {/* 1. HERO OPENING */}
      <section className="bg-marble-pattern py-20 md:py-32 px-6 flex flex-col items-center justify-center text-center">
        <FadeUp delay={0.15}>
          <SectionEyebrow>L'Esprit MONARQ</SectionEyebrow>
        </FadeUp>

        {/* SplitText target — GSAP handles reveal, so no motion wrapper */}
        <h1
          ref={heroHeadingRef}
          className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-monarq-ink mb-6 leading-tight max-w-4xl font-semibold ${
            reduce ? 'opacity-0 animate-[fadeIn_0.4s_0.3s_ease_forwards]' : ''
          }`}
          style={reduce ? { opacity: 0, animation: 'none' } : {}}
        >
          L'art de recevoir,{' '}
          <br />
          <span className="font-editorial italic font-normal text-monarq-gold-deep">
            l'exigence du goût
          </span>
        </h1>

        {/* Fallback for reduced motion */}
        {reduce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-monarq-ink mb-6 leading-tight max-w-4xl font-semibold absolute"
            style={{ pointerEvents: 'none' }}
          />
        )}

        <FadeUp delay={0.55}>
          <p className="font-sans text-monarq-ink-soft text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Un havre gastronomique chic et lumineux au cœur de Tanger, dédié au plaisir des saveurs et du partage.
          </p>
        </FadeUp>
      </section>

      {/* 2. NOTRE HISTOIRE */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <SlideLeft>
              <SectionEyebrow align="left">Notre Histoire</SectionEyebrow>
              <TextReveal delay={0.08} duration={DUR.slow}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-6 leading-tight">
                  Une passion vouée à l'excellence
                </h2>
              </TextReveal>
              <FadeUp delay={0.18}>
                <div className="font-sans text-monarq-ink-soft text-base sm:text-lg leading-relaxed space-y-4 font-light">
                  <p>
                    Né de l'amour de la haute gastronomie et de l'art de recevoir tangérois, MONARQ réinvente l'expérience du café-restaurant contemporain.
                  </p>
                  <p>
                    Sous notre verrière baignée de lumière méditerranéenne, nos équipes marient produits nobles, cuissons maîtrisées et service attentionné pour offrir une expérience inoubliable.
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
                    src="/images/staggered-story-1.jpg"
                    alt="Détail architectural MONARQ"
                    className="object-cover w-full h-full hover-scale-img"
                  />
                </div>
              </ImageReveal>
              <ImageReveal delay={0.25} duration={1.0}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-10 md:mt-12 group luxury-card-hover border border-monarq-gold/25">
                  <img
                    src="/images/staggered-story-2.jpg"
                    alt="Ambiance tamisée MONARQ"
                    className="object-cover w-full h-full hover-scale-img"
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
          src="/images/interlude-atmosphere.jpg"
          alt="L'atmosphère feutrée du Monarq"
          rate={0.28}
          hoverScale={false}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-monarq-black/48 flex items-center justify-center p-6 text-center backdrop-blur-[1px]">
          <p
            ref={quoteRef}
            className="font-editorial italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-monarq-paper max-w-3xl leading-snug font-normal"
          >
            « L'art de sublimer chaque instant. »
          </p>
        </div>
      </section>

      {/* 4. NOS 3 VALEURS */}
      <section className="py-24 md:py-36 px-6 max-w-4xl mx-auto">
        <FadeUp>
          <SectionEyebrow>Nos Piliers</SectionEyebrow>
          <TextReveal delay={0.1} duration={DUR.slow}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold text-center mb-16">
              Nos Engagements
            </h2>
          </TextReveal>
        </FadeUp>

        <StaggerGroup className="flex flex-col" staggerDelay={0.1}>
          {[
            {
              num: '01',
              title: 'Produits Nobles',
              desc: 'Une sélection rigoureuse d\'ingrédients de première qualité pour des saveurs authentiques.',
            },
            {
              num: '02',
              title: 'Maîtrise Culinaire',
              desc: 'Des cuissons précises et des recettes artisanales exécutées avec passion.',
            },
            {
              num: '03',
              title: 'Hospitalité',
              desc: 'Un accueil prévenant et chaleureux dans un cadre chic et confortable.',
            },
          ].map((value, idx) => (
            <React.Fragment key={value.num}>
              {idx !== 0 && <div className="h-[1px] w-full bg-monarq-gold/30 my-8 md:my-12" />}
              <StaggerItem>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                  <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-monarq-gold font-semibold leading-none">
                    {value.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-monarq-ink font-semibold mb-1">
                      {value.title}
                    </h3>
                    <p className="font-sans text-monarq-ink-soft text-base sm:text-lg leading-relaxed font-light">
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
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-monarq-black">
          <DroneVideoPlayer
            src={siteConfig.videos.interiorWalkthrough}
            poster="/images/hero-interior.jpg"
            className="w-full h-full"
          />
        </section>
      </ScaleReveal>

      {/* 6. CLOSING CTA */}
      <section className="py-24 md:py-32 px-6 flex flex-col items-center text-center bg-marble-pattern border-t border-monarq-line/50">
        <ScaleReveal>
          <TextReveal delay={0.05} duration={DUR.slow}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-monarq-ink font-semibold mb-6">
              Rejoignez-nous
            </h2>
          </TextReveal>
          <FadeUp delay={0.15}>
            <p className="font-sans text-monarq-ink-soft text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed font-light">
              Réservez votre table et vivez un moment gastronomique d'exception.
            </p>
            <motion.button
              onClick={onOpenReservation}
              className="btn-gold px-10 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury"
              whileHover={reduce ? {} : { scale: 1.02, y: -1 }}
              whileTap={reduce ? {} : { scale: 0.96 }}
            >
              Réserver une table
            </motion.button>
          </FadeUp>
        </ScaleReveal>
      </section>
    </div>
  );
}
