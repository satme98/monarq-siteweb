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

const milestones = [
  {
    year: '2019',
    label: 'Ouverture',
    text: 'MONARQ ouvre ses portes sur l\'Avenue Marrakech. Un lieu, une vision : offrir à Tanger une adresse gastronomique qui lui ressemble.',
  },
  {
    year: '2020',
    label: 'La Carte Signature',
    text: 'Naissance de notre brunch signatures — huit compositions inédites qui deviennent la marque de fabrique de la maison.',
  },
  {
    year: '2022',
    label: 'Le Four à Bois',
    text: 'Installation du four à bois artisanal et lancement de la carte Pizze & Pasta — un engagement envers la tradition et le feu.',
  },
  {
    year: '2024',
    label: 'Ancrage & Rayonnement',
    text: 'MONARQ s\'impose comme rendez-vous incontournable de Tanger. La terrasse, les privatisations et le bar à café d\'auteur complètent l\'expérience.',
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
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-24">

      {/* ── 1. Hero — Split Screen ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — image */}
          <SlideLeft className="relative h-[65vh] lg:h-[80vh] w-full overflow-hidden rounded-2xl order-2 lg:order-1">
            <div className="relative w-full h-full group">
              <img
                src="/images/staggered-story-2.jpg"
                alt="La salle du restaurant MONARQ Tanger"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-monarq-ink/50 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <span
                    className="w-1.5 h-1.5 bg-monarq-gold rounded-full flex-shrink-0"
                    style={{ boxShadow: '0 0 8px rgba(158,128,80,0.7)' }}
                  />
                  <span className="text-white text-[11px] uppercase tracking-[0.25em] font-medium">
                    Tanger · Maroc · Depuis 2019
                  </span>
                </div>
              </div>
            </div>
          </SlideLeft>

          {/* Right — text */}
          <SlideRight className="space-y-10 order-1 lg:order-2">
            <div>
              <SectionEyebrow align="left">Notre Histoire</SectionEyebrow>
              <h1
                ref={heroHeadingRef}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-monarq-ink font-light leading-[1.1] mb-6"
              >
                Une Maison de Gastronomie au Cœur de Tanger
              </h1>
              <p className="font-sans text-base sm:text-lg text-monarq-ink-soft font-light leading-relaxed max-w-[56ch]">
                MONARQ est né d'une conviction simple : Tanger méritait une adresse où l'art de recevoir se conjugue avec la passion de la cuisine. Un lieu vivant, chaleureux, exigeant sur les produits et généreux dans l'accueil.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <p className="font-sans text-base text-monarq-ink-soft font-light leading-relaxed">
                Depuis notre ouverture en 2019, nous avons construit une maison autour d'une table — celle où se rencontrent les habitués du quartier et les voyageurs curieux, les familles du dimanche et les noctambules du vendredi soir.
              </p>
              <p className="font-sans text-base text-monarq-ink-soft font-light leading-relaxed">
                Notre cuisine mêle influences méditerranéennes et inflexions marocaines : pâtes fraîches faites chaque matin, pizzas au feu de bois, brunchs signatures et carte du soir pensée comme un voyage.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                onClick={onOpenReservation}
                className="btn-gold flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
                whileHover={reduce ? {} : { y: -1, scale: 1.01 }}
                whileTap={reduce ? {} : { scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Réserver une Table</span>
              </motion.button>
              <button
                onClick={() => setActiveTab('atmosphere')}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full border border-monarq-gold/50 text-monarq-gold-deep text-xs uppercase tracking-[0.2em] font-semibold hover:border-monarq-gold hover:bg-monarq-gold/5 transition-colors duration-300"
              >
                <span>Découvrir le Lieu</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </SlideRight>
        </div>
      </section>

      {/* ── 2. Philosophy Quote — Full Width ───────────────────────────────── */}
      <section className="border-t border-monarq-line py-20 md:py-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn>
            <blockquote className="text-center space-y-6">
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-light leading-[1.25] italic">
                &ldquo;Ici, chaque repas est une cérémonie — célébrée avec les meilleurs produits, un service sincère et la lumière de Tanger.&rdquo;
              </p>
              <footer className="flex items-center justify-center gap-3 pt-4">
                <span className="w-8 h-[1px] bg-monarq-gold/50" />
                <cite className="font-sans text-xs uppercase tracking-[0.28em] text-monarq-gold-deep font-semibold not-italic">
                  La Direction · MONARQ Tanger
                </cite>
                <span className="w-8 h-[1px] bg-monarq-gold/50" />
              </footer>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. Values — 2×2 Grid with Images ──────────────────────────────── */}
      <section className="border-t border-monarq-line py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
              Ce Qui Nous Définit
            </h2>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <motion.div
                    className="group p-8 lg:p-10 border border-monarq-line rounded-2xl hover:border-monarq-gold/40 transition-colors duration-500 bg-white/30 hover:bg-white/60 space-y-5"
                    whileHover={reduce ? {} : { y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-monarq-gold/10 flex items-center justify-center border border-monarq-gold/20 group-hover:bg-monarq-gold/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-monarq-gold-deep" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-serif text-xl sm:text-2xl text-monarq-ink font-semibold">
                        {value.title}
                      </h3>
                      <p className="font-sans text-base text-monarq-ink-soft font-light leading-relaxed">
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

      {/* ── 4. Story Timeline ──────────────────────────────────────────────── */}
      <section className="border-t border-monarq-line py-20 md:py-28 bg-monarq-black text-white relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#A7916C_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <FadeUp className="text-center mb-16">
            <SectionEyebrow variant="light">Chronologie</SectionEyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold mt-4">
              L'Histoire de la Maison
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-monarq-gold/25 md:-translate-x-px hidden sm:block" />

            <div className="space-y-12 sm:space-y-0">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeUp key={m.year} delay={i * 0.1} className="relative sm:grid sm:grid-cols-2 sm:gap-12 sm:items-center sm:py-10">
                    {/* Year badge — on the line */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 sm:top-1/2 sm:-translate-y-1/2 hidden sm:flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-monarq-black border-2 border-monarq-gold/60 flex items-center justify-center">
                        <span
                          className="w-2 h-2 rounded-full bg-monarq-gold"
                          style={{ boxShadow: '0 0 10px rgba(158,128,80,0.6)' }}
                        />
                      </div>
                    </div>

                    {/* Content left/right */}
                    <div
                      className={`pl-16 sm:pl-0 ${
                        isLeft ? 'sm:text-right sm:pr-12' : 'sm:col-start-2 sm:pl-12'
                      }`}
                    >
                      <span className="font-serif text-4xl sm:text-5xl text-monarq-gold font-light block mb-1">
                        {m.year}
                      </span>
                      <h3 className="font-sans text-xs uppercase tracking-[0.24em] text-monarq-gold-light font-semibold mb-3">
                        {m.label}
                      </h3>
                      <p className="font-sans text-sm text-gray-300 font-light leading-relaxed max-w-xs sm:max-w-none">
                        {m.text}
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
      <section className="border-t border-monarq-line py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
              L'Esprit des Lieux
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { src: '/images/gallery-1.jpg', label: 'La Salle', ratio: 'aspect-[4/5]' },
              { src: '/images/gallery-2.jpg', label: 'La Terrasse', ratio: 'aspect-[3/4]' },
              { src: '/images/gallery-3.jpg', label: 'Le Café', ratio: 'aspect-[4/5]' },
            ].map(({ src, label, ratio }, i) => (
              <FadeUp key={label} delay={i * 0.12}>
                <div className={`relative ${ratio} overflow-hidden rounded-2xl group`}>
                  <img
                    src={src}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-monarq-ink/60 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 font-sans text-xs uppercase tracking-[0.24em] text-white font-medium">
                    {label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Band ────────────────────────────────────────────────────── */}
      <section className="w-full bg-marble-pattern border-t border-monarq-line/50 py-20 md:py-28 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-5">
          <SectionEyebrow>Rejoignez-Nous</SectionEyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
            Vivez l'Expérience MONARQ
          </h2>
          <p className="font-sans text-base sm:text-lg text-monarq-ink-soft max-w-lg mx-auto leading-relaxed font-light">
            Brunch, déjeuner, dîner ou café — chaque moment mérite d'être vécu à notre table.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenReservation}
              className="btn-gold px-9 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury hover:shadow-luxury-lg"
            >
              Réserver
            </button>
            <button
              onClick={() => setActiveTab('evenements')}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full border border-monarq-gold/50 text-monarq-gold-deep text-xs uppercase tracking-[0.2em] font-semibold hover:border-monarq-gold transition-colors duration-300"
            >
              <span>Événements Privés</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
