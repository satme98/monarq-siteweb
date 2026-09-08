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
  ImageReveal,
  StaggerGroup,
  StaggerItem,
  TextReveal,
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { siteConfig } from '../data/siteConfig';
import { EASE_CINEMATIC, GSAP_EASE_CINEMATIC, DUR, prefersReducedMotion } from '../lib/animation';
import { ArrowUpRight, Calendar, Sparkles, Star, Leaf, Flame, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AboutPageProps {
  onOpenReservation: () => void;
  setActiveTab: (tab: string) => void;
}

const values = [
  {
    icon: Coffee,
    title: 'L\'Art du Goût',
    description:
      'Chaque assiette est une invitation. Du brunch tangérois à la carte du soir, nos créations sont nées d\'une obsession pour les produits frais et les alliances inédites.',
  },
  {
    icon: Leaf,
    title: 'Terroir & Authenticité',
    description:
      'Les épices du souk, les huiles d\'argan d\'Essaouira, les herbes fraîches cueillies le matin. Le Maroc est dans chaque recette.',
  },
  {
    icon: Flame,
    title: 'Feu de Bois & Artisanat',
    description:
      'Nos pizzas cuites au feu de bois, nos pâtes fraîches pétries chaque jour, et notre pain maison sont le cœur battant de notre cuisine.',
  },
  {
    icon: Star,
    title: 'Hospitalité à la Marocaine',
    description:
      'Ici, recevoir est un art. Notre équipe vous accueille comme des invités rares — avec chaleur, attention et une générosité sincère.',
  },
];

const signatures = [
  {
    number: '01',
    category: 'PASTA ITALIENNES',
    tagline: 'L’ITALIE DANS L’ASSIETTE',
    description: 'Des pâtes généreuses, des sauces travaillées et des recettes inspirées de la cuisine italienne.',
  },
  {
    number: '02',
    category: 'VIANDES & RIBS',
    tagline: 'GÉNÉREUX, TENDRES, GOURMANDS',
    description: 'Des viandes soigneusement préparées, avec nos ribs parmi les signatures incontournables de la maison.',
  },
  {
    number: '03',
    category: 'BRUNCHS SIGNATURES',
    tagline: 'LE BRUNCH VERSION MONARQ',
    description: 'Des compositions généreuses et raffinées, pensées pour transformer le brunch en véritable moment de plaisir.',
  },
  {
    number: '04',
    category: 'PIZZAS AU FEU DE BOIS',
    tagline: 'LA FLAMME, LA PÂTE, LE GOÛT',
    description: 'Une pâte travaillée, une cuisson au feu de bois et des ingrédients sélectionnés pour une pizza pleine de caractère.',
  },
];

export default function AboutPage({ onOpenReservation, setActiveTab }: AboutPageProps) {
  const reduce = useReducedMotion();
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!heroHeadingRef.current) return;

    const ctx = gsap.context(() => {
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
          onComplete: () => { split.revert(); },
        });
      });
    }, heroHeadingRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-20 sm:pt-24">

      {/* ── 1. Hero — Split Screen ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left — image */}
          <SlideLeft className="relative h-[45vh] sm:h-[55vh] lg:h-[65vh] w-full overflow-hidden rounded-2xl order-2 lg:order-1">
            <div className="relative w-full h-full group">
              <img
                src="/images/staggered-story-2.jpg"
                alt="La salle du restaurant MONARQ Tanger"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-monarq-ink/50 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5">
                  <span
                    className="w-1.5 h-1.5 bg-monarq-gold rounded-full flex-shrink-0"
                    style={{ boxShadow: '0 0 8px rgba(158,128,80,0.7)' }}
                  />
                  <span className="text-white text-[10.5px] uppercase tracking-[0.25em] font-medium">
                    Tanger · Maroc · Maison Gastronomique
                  </span>
                </div>
              </div>
            </div>
          </SlideLeft>

          {/* Right — text */}
          <SlideRight className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div>
              <SectionEyebrow align="left">Notre Histoire</SectionEyebrow>
              <h1
                ref={heroHeadingRef}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-monarq-ink font-semibold leading-tight mb-3 sm:mb-4"
              >
                Une Table Pensée Comme un Refuge
              </h1>
              <p className="font-sans text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-light mb-4 sm:mb-5">
                Au cœur de Tanger, MONARQ est né d'un désir simple : créer un lieu où la beauté des matières — marbre, bois chaud, dorures discrètes — s'accorde à la franchise d'une assiette généreuse.
              </p>
              <p className="font-sans text-sm sm:text-base text-monarq-ink-soft leading-relaxed font-light">
                Du premier espresso du matin aux pâtes fraîches du dîner, chaque instant y est traité avec le même soin, dans une atmosphère lumineuse le jour et feutrée le soir.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <motion.button
                onClick={onOpenReservation}
                className="btn-gold flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
                whileHover={reduce ? {} : { y: -1, scale: 1.01 }}
                whileTap={reduce ? {} : { scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Réserver une Table</span>
              </motion.button>
              <button
                onClick={() => setActiveTab('atmosphere')}
                className="group flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full border border-monarq-gold/50 text-monarq-gold-deep text-xs uppercase tracking-[0.2em] font-semibold hover:border-monarq-gold hover:bg-monarq-gold/5 transition-colors duration-300"
              >
                <span>Découvrir le Lieu</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </SlideRight>
        </div>
      </section>

      {/* ── 2. Philosophy Quote — Full Width ───────────────────────────────── */}
      <section className="border-t border-monarq-line py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <blockquote className="text-center space-y-4 sm:space-y-5">
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-light leading-[1.3] italic">
                &ldquo;Ici, chaque repas est une cérémonie — célébrée avec les meilleurs produits, un service sincère et la lumière de Tanger.&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-3 pt-2">
                <span className="w-8 h-[1px] bg-monarq-gold/50" />
                <cite className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.28em] text-monarq-gold-deep font-semibold not-italic">
                  La Direction · MONARQ Tanger
                </cite>
                <span className="w-8 h-[1px] bg-monarq-gold/50" />
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. Values — 2×2 Grid with Images ──────────────────────────────── */}
      <section className="border-t border-monarq-line py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp className="text-center mb-8 sm:mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold">
              Ce Qui Nous Définit
            </h2>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <motion.div
                    className="group p-6 sm:p-7 lg:p-8 border border-monarq-line rounded-2xl hover:border-monarq-gold/40 transition-colors duration-500 bg-white/30 hover:bg-white/60 space-y-3.5"
                    whileHover={reduce ? {} : { y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-monarq-gold/10 flex items-center justify-center border border-monarq-gold/20 group-hover:bg-monarq-gold/20 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-monarq-gold-deep" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-lg sm:text-xl text-monarq-ink font-semibold">
                        {value.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-monarq-ink-soft font-light leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ── 4. Nos Signatures — Le Goût MONARQ ─────────────────────────────── */}
      <section className="border-t border-monarq-line py-12 sm:py-16 md:py-20 lg:py-24 bg-monarq-black text-white relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#A7916C_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <FadeUp className="text-center mb-10 sm:mb-12 md:mb-14">
            <SectionEyebrow variant="light">Nos Signatures</SectionEyebrow>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-semibold mt-2.5 sm:mt-3 tracking-wide uppercase">
              Le Goût MONARQ
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Vertical hairline: left-5 sm:left-6 on mobile, centered at 50% on md+ */}
            <div className="absolute left-5 sm:left-6 md:left-1/2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-monarq-gold/30 to-transparent md:-translate-x-px" />

            <div className="space-y-8 sm:space-y-10 md:space-y-0">
              {signatures.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeUp
                    key={item.number}
                    delay={i * 0.1}
                    className="relative md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center md:py-7 lg:py-9"
                  >
                    {/* Node marker on the line */}
                    <div className="absolute left-5 sm:left-6 md:left-1/2 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center z-10">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-monarq-black border-2 border-monarq-gold/60 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                        <span
                          className="w-2 h-2 rounded-full bg-monarq-gold"
                          style={{ boxShadow: '0 0 10px rgba(158,128,80,0.7)' }}
                        />
                      </div>
                    </div>

                    {/* Content left/right */}
                    <div
                      className={`pl-12 sm:pl-14 md:pl-0 ${
                        isLeft
                          ? 'md:text-right md:pr-10 lg:pr-14 md:col-start-1'
                          : 'md:text-left md:col-start-2 md:pl-10 lg:pl-14'
                      }`}
                    >
                      <div
                        className={`font-serif text-xl sm:text-2xl md:text-3xl text-monarq-gold font-light tracking-wide mb-1 flex items-baseline gap-2.5 ${
                          isLeft ? 'justify-start md:justify-end' : 'justify-start'
                        }`}
                      >
                        <span className="text-monarq-gold-light font-normal">{item.number}</span>
                        <span className="text-monarq-gold/40 text-base font-sans font-light">—</span>
                        <span className="tracking-wider uppercase text-lg sm:text-xl md:text-2xl text-monarq-gold">{item.category}</span>
                      </div>
                      <h3 className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] text-monarq-gold-light font-semibold mb-2 sm:mb-2.5">
                        {item.tagline}
                      </h3>
                      <p
                        className={`font-sans text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-sm sm:max-w-md ${
                          isLeft ? 'md:ml-auto' : 'md:mr-auto'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Ambiance — Three Stacked Photos ─────────────────────────────── */}
      <section className="border-t border-monarq-line py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <FadeUp className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold">
              L'Esprit des Lieux
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              { src: '/images/monarq-dining-room.png', label: 'La Salle', ratio: 'aspect-[4/5]' },
              { src: '/images/IMG_8949.jpg', label: 'La Terrasse', ratio: 'aspect-[4/5]' },
              { src: '/images/gallery-coffee-4.jpg', label: 'Le Café', ratio: 'aspect-[4/5]' },
            ].map(({ src, label, ratio }, i) => (
              <FadeUp key={label} delay={i * 0.12}>
                <div className={`relative ${ratio} overflow-hidden rounded-2xl group`}>
                  <img
                    src={src}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-monarq-ink/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 font-sans text-xs uppercase tracking-[0.24em] text-white font-medium">
                    {label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Band ────────────────────────────────────────────────────── */}
      <section className="w-full bg-marble-pattern border-t border-monarq-line/50 py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-8 text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4 md:space-y-5">
          <SectionEyebrow>Rejoignez-Nous</SectionEyebrow>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold">
            Vivez l'Expérience MONARQ
          </h2>
          <p className="font-sans text-sm sm:text-base text-monarq-ink-soft max-w-lg mx-auto leading-relaxed font-light">
            Brunch, déjeuner, dîner ou café — chaque moment mérite d'être vécu à notre table.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-3">
            <button
              onClick={onOpenReservation}
              className="btn-gold px-8 sm:px-9 py-3 sm:py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury hover:shadow-luxury-lg"
            >
              Réserver
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-monarq-gold/50 text-monarq-gold-deep text-xs uppercase tracking-[0.2em] font-semibold hover:border-monarq-gold transition-colors duration-300"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
