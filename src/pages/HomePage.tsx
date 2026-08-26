import React from 'react';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Clock, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import { signatureHighlights } from '../data/menuData';
import { DroneVideoPlayer } from '../components/DroneVideoPlayer';
import {
  FadeUp,
  FadeIn,
  SlideLeft,
  SlideRight,
  ScaleReveal,
  StaggerGroup,
  StaggerItem,
  ParallaxImage,
} from '../components/Animations';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  onOpenReservation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenReservation }) => {
  const goTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          1. HERO — Cinematic, editorial, asymmetric
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex items-end bg-monarq-black overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero-interior.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />

        {/* Content — pinned bottom-left, editorial alignment */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 md:pb-22 pt-32">
          <div className="max-w-3xl">
            <FadeUp delay={0.2}>
              <h1 className="font-serif text-display-xl text-white font-semibold leading-[1.08] mb-6">
                L'élégance à table,<br />
                <span className="font-editorial italic font-normal text-monarq-gold-light">du matin au soir.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-lg sm:text-xl text-gray-200 font-light leading-relaxed mb-10 max-w-xl">
                À Tanger, MONARQ réunit brunchs d'exception, cuisine créative et café de spécialité dans un cadre architectural raffiné.
              </p>
            </FadeUp>

            <FadeUp delay={0.6}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goTo('menu')}
                  className="px-8 py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.22em] font-semibold shadow-luxury hover:shadow-luxury-lg"
                >
                  Découvrir la carte
                </button>
                <button
                  onClick={onOpenReservation}
                  className="group px-8 py-3.5 rounded-full bg-transparent border border-white/40 text-white text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white hover:text-monarq-ink transition-all duration-500"
                >
                  <span className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-monarq-gold-light group-hover:text-monarq-ink transition-colors" />
                    Réserver une table
                  </span>
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Compact info strip */}
          <FadeUp delay={0.8}>
            <div className="mt-16 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm text-gray-300 font-medium tracking-wide">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-monarq-gold-light" />
                Ouvert 7j/7 · 08 h 00 — 00 h 00
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-monarq-gold-light" />
                Avenue Marrakech, Tanger
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 rotate-90 origin-center translate-x-3 font-semibold">scroll</span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-monarq-gold/70 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. CONCEPT — Asymmetric editorial split
          ═══════════════════════════════════════════════════ */}
      <section className="py-28 md:py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Text column — left, narrower */}
            <div className="lg:col-span-5 lg:pt-12">
              <SlideLeft>
                <span className="section-label block mb-4">Le concept</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold leading-tight mb-8">
                  Une parenthèse royale au cœur de la cité du Détroit.
                </h2>
                <div className="space-y-6 text-base sm:text-lg text-monarq-ink-soft leading-relaxed font-normal">
                  <p>
                    Né de l'amour de la haute gastronomie et de l'art de recevoir tangérois, MONARQ réinvente l'expérience du café-restaurant contemporain.
                  </p>
                  <p>
                    Sous une verrière baignée de lumière méditerranéenne, entouré d'un marbre blanc aux veinures d'or, chaque visite devient un moment suspendu entre l'élégance et la convivialité.
                  </p>
                </div>
                <div className="mt-10">
                  <button
                    onClick={() => goTo('atmosphere')}
                    className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-ink hover:text-monarq-gold-deep transition-colors"
                  >
                    <span>Découvrir le lieu</span>
                    <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </div>
              </SlideLeft>
            </div>

            {/* Image composition — right, wider, staggered */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-4">
                <SlideRight className="col-span-7">
                  <div className="rounded-2xl overflow-hidden shadow-luxury-lg">
                    <ParallaxImage
                      src="/images/story-atmosphere.jpg"
                      alt="Atmosphère MONARQ Tanger"
                      className="h-[420px] md:h-[520px]"
                    />
                  </div>
                </SlideRight>
                <SlideRight delay={0.2} className="col-span-5 pt-16">
                  <div className="rounded-2xl overflow-hidden shadow-luxury-lg">
                    <ParallaxImage
                      src="/images/staggered-story-2.jpg"
                      alt="Marbre et végétation"
                      className="h-[320px] md:h-[400px]"
                    />
                  </div>
                  {/* Seal badge */}
                  <FadeUp delay={0.4}>
                    <div className="mt-6 flex items-center gap-3">
                      <img src={siteConfig.logos.seal} alt="" className="w-10 h-10 opacity-75" />
                      <p className="text-xs uppercase tracking-[0.2em] text-monarq-ink font-semibold">
                        Fraîcheur & préparations maison
                      </p>
                    </div>
                  </FadeUp>
                </SlideRight>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. THREE MOMENTS — Ambient Kintsugi Marble & Marginal Framing
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 bg-kintsugi-ambient border-y border-monarq-gold/30 overflow-hidden">
        {/* Subtle decorative gold corner brackets (Marginal Framing) */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center mb-24">
              <span className="section-label block mb-3">Rythme & Saveurs</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-4">
                Trois instants d'exception
              </h2>
              <p className="text-base sm:text-lg text-monarq-ink-soft max-w-lg mx-auto font-light leading-relaxed">
                De la première lueur du jour au dîner sous les étoiles, une partition culinaire pensée pour chaque instant.
              </p>
              <div className="diamond-divider mt-6">
                <span className="text-xs uppercase tracking-[0.25em] text-monarq-gold font-serif font-semibold">MONARQ</span>
              </div>
            </div>
          </FadeUp>

          <div className="space-y-0">
            {/* Moment 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-16 border-b border-monarq-gold/25">
              <ScaleReveal className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group">
                  <img 
                    src="/images/moment-morning.jpg" 
                    alt="Le matin chez MONARQ" 
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-700 ease-monarch group-hover:scale-105" 
                  />
                </div>
              </ScaleReveal>
              <SlideRight className="md:col-span-7">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-semibold">01</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-4 font-semibold">
                  Le Matin & Petits Déjeuners
                </h3>
                <p className="text-base sm:text-[17px] text-monarq-ink-soft leading-relaxed max-w-lg mb-6 font-normal">
                  Viennoiseries dorées, formules tangéroises, jus pressés minute, msemen au miel pur et cafés de spécialité. De 08 h 00 à 12 h 00.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span>Découvrir le matin</span>
                  <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </SlideRight>
            </div>

            {/* Moment 2 — reversed */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-16 border-b border-monarq-gold/25">
              <SlideLeft className="md:col-span-7 md:order-1">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-semibold">02</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-4 font-semibold">
                  Les Grands Brunchs Signatures
                </h3>
                <p className="text-base sm:text-[17px] text-monarq-ink-soft leading-relaxed max-w-lg mb-6 font-normal">
                  Brioches garnies aux crevettes, toasts d'avocat au saumon fumé, œufs pochés, pancakes fondants et plateaux complets. De 08 h 00 à 14 h 00.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span>Explorer les brunchs</span>
                  <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </SlideLeft>
              <ScaleReveal className="md:col-span-5 md:order-2">
                <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group">
                  <img 
                    src="/images/moment-cuisine.jpg" 
                    alt="Les brunchs signatures MONARQ" 
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-700 ease-monarch group-hover:scale-105" 
                  />
                </div>
              </ScaleReveal>
            </div>

            {/* Moment 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-16">
              <ScaleReveal className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group">
                  <img 
                    src="/images/moment-sweet.jpg" 
                    alt="Pâtes et pizzas MONARQ" 
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-700 ease-monarch group-hover:scale-105" 
                  />
                </div>
              </ScaleReveal>
              <SlideRight className="md:col-span-7">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-semibold">03</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-4 font-semibold">
                  Pâtes & Pizzas
                </h3>
                <p className="text-base sm:text-[17px] text-monarq-ink-soft leading-relaxed max-w-lg mb-6 font-normal">
                  Penne Monarq aux crevettes piquantes, risottos onctueux, pizzas artisanales à la burrata fraîche et saveurs méditerranéennes. De 12 h 00 à minuit.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span>Découvrir les pâtes & pizzas</span>
                  <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </SlideRight>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. SIGNATURE DISHES — Haute Gastronomie Editorial Showcase
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 bg-monarq-paper border-b border-monarq-line/60 overflow-hidden">
        {/* MONARQ Side-Bleed Engraving Background Ornaments */}
        {/* 1st Image (Gaufre & Coupe Glacée) on Left (Moved Up) */}
        <img
          src="/images/ornament-waffle.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute top-12 md:top-16 lg:top-20 -left-24 md:-left-32 lg:-left-40 xl:-left-48 w-60 md:w-72 lg:w-96 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />

        {/* 2nd Image (Crêpes & Baies Gourmandes) on Right (Moved Down) */}
        <img
          src="/images/ornament-crepes.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute bottom-12 md:bottom-16 lg:bottom-20 -right-24 md:-right-32 lg:-right-40 xl:-right-48 w-60 md:w-72 lg:w-96 pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Header */}
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="section-label block mb-3">Créations Emblématiques</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold tracking-tight leading-tight mb-4">
                Les Plats Signatures
              </h2>
              <div className="diamond-divider my-5">
                <span className="text-xs uppercase tracking-[0.25em] text-monarq-gold font-serif font-semibold">MONARQ</span>
              </div>
              <p className="text-base sm:text-lg text-monarq-ink-soft leading-relaxed max-w-xl mx-auto font-light">
                Une partition gastronomique pensée comme un hommage aux produits nobles et à l'art culinaire tangérois.
              </p>
            </div>
          </FadeUp>

          {/* 3 Signature Cards Grid — Equal height, fixed 4:3 aspect ratio, line-clamped 3 lines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch relative z-10">
            {signatureHighlights.map((dish, i) => (
              <FadeUp key={i} delay={i * 0.15} className="h-full">
                <div className="group h-full flex flex-col bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-monarq-gold/25 shadow-luxury hover:shadow-luxury-lg hover:border-monarq-gold/50 transition-all duration-300">
                  {/* Image Container — Locked 4:3 Aspect Ratio */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6 bg-monarq-paper-soft border border-monarq-line flex-shrink-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                    />
                    {dish.tag && (
                      <div className="absolute top-3.5 left-3.5 bg-monarq-paper/95 backdrop-blur-md text-monarq-gold-deep text-[10px] uppercase tracking-[0.2em] font-semibold px-3.5 py-1.5 rounded-full border border-monarq-gold/30 shadow-sm">
                        {dish.tag}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-monarq-gold-deep font-semibold block mb-1.5 h-4 flex items-center">
                      {dish.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-monarq-ink font-semibold mb-3 h-9 flex items-center group-hover:text-monarq-gold-deep transition-colors truncate">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-monarq-ink-soft leading-relaxed font-normal line-clamp-3 h-[4.25rem] overflow-hidden">
                      {dish.description}
                    </p>

                    {/* Hairline Divider + "PRÉPARATION MINUTE" pinned to bottom edge */}
                    <div className="mt-auto pt-5 border-t border-monarq-line/50 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-monarq-ink-muted font-medium">
                        Préparation Minute
                      </span>
                      <div className="w-8 h-[1px] bg-monarq-gold/40 group-hover:w-14 group-hover:bg-monarq-gold transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <FadeUp delay={0.4} className="mt-16 text-center">
            <button
              onClick={() => goTo('menu')}
              className="inline-flex items-center gap-3 px-9 py-4 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury hover:shadow-luxury-lg group"
            >
              <span>Consulter la Carte Complète</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. FULL-WIDTH ATMOSPHERE INTERLUDE
          ═══════════════════════════════════════════════════ */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <ParallaxImage
          src="/images/monarq-facade-exterior.jpg"
          alt="Façade extérieure MONARQ Tanger"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
        <FadeUp className="absolute inset-0 flex items-center justify-center text-center px-6">
          <blockquote className="max-w-2xl">
            <p className="font-editorial italic text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-snug mb-6">
              « L'art de recevoir, c'est offrir à chacun le sentiment d'être attendu. »
            </p>
            <cite className="text-xs sm:text-sm uppercase tracking-[0.28em] text-monarq-gold-light not-italic font-semibold">
              L'esprit MONARQ Tanger
            </cite>
          </blockquote>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. DRONE WALKTHROUGH — Immersive Tanger
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        {/* MONARQ Side-Bleed Engraving Background Ornaments */}
        {/* 1st Image (Pizza artisanale & Burger Gourmet) on Left (Moved Up) */}
        <img
          src="/images/ornament-pizza-burger.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute top-12 md:top-16 lg:top-20 -left-28 md:-left-36 lg:-left-44 xl:-left-52 w-64 md:w-80 lg:w-[420px] pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />

        {/* 2nd Image (Pancakes, Tartine & Œuf Poché Brunch) on Right (Moved Down) */}
        <img
          src="/images/ornament-brunch.png"
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute bottom-12 md:bottom-16 lg:bottom-20 -right-28 md:-right-36 lg:-right-44 xl:-right-52 w-64 md:w-80 lg:w-[420px] pointer-events-none select-none z-0 mix-blend-multiply opacity-[0.11] filter grayscale contrast-125 sepia-[0.25]"
        />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 relative z-10">
          <FadeUp>
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="section-label block mb-3">Immersion Virtuelle</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-4">
                Au Cœur de Tanger
              </h2>
              <p className="text-base sm:text-lg text-monarq-ink-soft leading-relaxed font-light">
                Survolez notre verrière, nos tables et découvrez l'atmosphère lumineuse de MONARQ.
              </p>
            </div>
          </FadeUp>

          <ScaleReveal>
            <DroneVideoPlayer
              src={siteConfig.videos.interiorWalkthrough}
              poster="/images/tangier-drone-poster.jpg"
              title="Survol de la salle et verrière"
              subtitle="Visite guidée · MONARQ Tanger"
            />
          </ScaleReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. RESERVATION CTA — Marble band
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-marble-pattern border-y border-monarq-line/50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <FadeUp>
            <img src={siteConfig.logos.seal} alt="" className="w-16 h-16 mx-auto mb-8 opacity-80" />
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-monarq-ink font-semibold mb-6">
              Réservez votre table
            </h2>
            <p className="text-base sm:text-lg text-monarq-ink-soft max-w-lg mx-auto mb-10 leading-relaxed font-light">
              Brunch entre amis, déjeuner d'affaires ou dîner feutré — notre équipe vous réserve le meilleur accueil.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenReservation}
                className="px-9 py-4 rounded-full btn-gold text-xs uppercase tracking-[0.22em] font-semibold shadow-luxury hover:shadow-luxury-lg"
              >
                Réserver une table
              </button>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-9 py-4 rounded-full btn-ghost text-xs uppercase tracking-[0.22em] font-semibold"
              >
                Contacter par WhatsApp
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          8. INSTAGRAM STRIP — Social proof
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-monarq-ink" />
                <span className="text-base font-semibold text-monarq-ink tracking-wide">
                  {siteConfig.instagramHandle}
                </span>
              </div>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors"
              >
                <span>Suivre sur Instagram</span>
                <ArrowUpRight className="w-4 h-4 text-monarq-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {['/images/insta-1.jpg', '/images/insta-2.jpg', '/images/insta-3.jpg', '/images/insta-4.jpg'].map((src, i) => (
              <StaggerItem key={i}>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl overflow-hidden bg-monarq-paper-soft aspect-[4/5] shadow-sm hover:shadow-luxury transition-all duration-500 border border-monarq-gold/20"
                >
                  <img
                    src={src}
                    alt={`MONARQ Instagram ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-monarch group-hover:scale-108"
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  );
};
