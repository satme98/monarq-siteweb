import React from 'react';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Clock, Instagram } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { DroneVideoPlayer } from '../components/DroneVideoPlayer';
import {
  FadeUp,
  SlideLeft,
  SlideRight,
  ScaleReveal,
  CurtainReveal,
  StaggerGroup,
  StaggerItem,
  ParallaxImage,
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { SignatureCarousel } from '../components/SignatureCarousel';
import { HeroSlider } from '../components/HeroSlider';

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
          1. HERO — Cinematic, editorial, minimal
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center md:justify-end bg-monarq-black overflow-hidden">
        {/* Full-width 2-Slide Background Slider */}
        <HeroSlider autoPlayInterval={8000} />

        {/* Content — perfectly centered in available height on mobile, pinned bottom-left on desktop */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 md:pt-36 pb-6 sm:pb-10 md:pb-24 flex flex-col justify-center flex-grow md:flex-grow-0">
          <div className="max-w-2xl flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
            {/* 1 & 2: Headline + Tagline */}
            <FadeUp delay={0.1} duration={0.7}>
              <div>
                <h1 className="font-serif text-[34px] xs:text-[38px] sm:text-5xl md:text-6xl lg:text-[64px] text-white font-semibold leading-[1.05] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
                  MONARQ
                </h1>
                <div className="font-editorial italic font-normal text-monarq-gold-light text-[24px] xs:text-[27px] sm:text-4xl md:text-5xl leading-tight mt-0.5 sm:mt-1">
                  Brunch • Pizza • Pâtes
                </div>
              </div>
            </FadeUp>

            {/* 3: Subtext */}
            <FadeUp delay={0.2} duration={0.65}>
              <p className="text-[13px] xs:text-sm sm:text-base md:text-lg text-gray-100 font-light leading-snug sm:leading-relaxed max-w-md drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
                Des saveurs simples, gourmandes & authentiques.
              </p>
            </FadeUp>

            {/* 4: Action Buttons */}
            <FadeUp delay={0.3} duration={0.6}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-0.5 sm:pt-1">
                <button
                  onClick={() => goTo('menu')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury hover:shadow-luxury-lg"
                >
                  La Carte
                </button>
                <button
                  onClick={onOpenReservation}
                  className="group px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-black/30 sm:bg-transparent border border-white/40 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white hover:text-monarq-ink transition-all duration-300 backdrop-blur-sm sm:backdrop-blur-none"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-monarq-gold-light group-hover:text-monarq-ink transition-colors" />
                    Réserver
                  </span>
                </button>
              </div>
            </FadeUp>

            {/* 5: Dedicated glassmorphic info strip */}
            <FadeUp delay={0.4} duration={0.6}>
              <div className="pt-0.5 sm:pt-1">
                <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs md:text-sm text-gray-200 font-medium tracking-wide shadow-luxury">
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
      </section>

      {/* ═══════════════════════════════════════════════════
          2. À PROPOS — Clean, concise
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-marble-pattern border-b border-monarq-line/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Text column — left */}
            <div className="lg:col-span-5">
              <SlideLeft>
                <SectionEyebrow align="left">À Propos</SectionEyebrow>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold leading-tight mb-6">
                  Le goût de l'excellence, l'art de recevoir.
                </h2>
                <p className="text-base sm:text-lg text-monarq-ink-soft leading-relaxed font-light mb-8">
                  MONARQ réunit le raffinement d'un décor en marbre sous verrière et la passion des produits nobles. Un havre chic et chaleureux pensé pour savourer chaque instant.
                </p>
                <div>
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

            {/* Image composition — right */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-4">
                {/* Large main image */}
                <div className="col-span-8">
                  <CurtainReveal direction="up" duration={0.85}>
                    <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group luxury-card-hover">
                      <img
                        src="/images/concept-dining.jpg"
                        alt="Salle de restaurant MONARQ Tanger"
                        className="w-full h-80 sm:h-96 md:h-[460px] object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]"
                      />
                    </div>
                  </CurtainReveal>
                </div>

                {/* Secondary overlapping detail image */}
                <div className="col-span-4 pt-12 sm:pt-20">
                  <CurtainReveal direction="up" delay={0.2} duration={0.85}>
                    <div className="rounded-2xl overflow-hidden shadow-luxury border border-monarq-gold/25 group luxury-card-hover">
                      <img
                        src="/images/concept-terrace.jpg"
                        alt="Accueil MONARQ"
                        className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-monarq-paper-soft/80 backdrop-blur-sm rounded-xl border border-monarq-gold/20 hidden sm:block">
                      <p className="font-serif text-xs text-monarq-gold-deep tracking-wider uppercase font-semibold">Tanger</p>
                      <p className="text-[11px] text-monarq-ink-soft mt-0.5 font-normal">Près du Palais Municipal</p>
                    </div>
                  </CurtainReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. CINEMATIC FULL-WIDTH VIDEO INTERLUDE
          ═══════════════════════════════════════════════════ */}
      <section className="relative pt-20 md:pt-28 pb-0 bg-monarq-paper overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center mb-10 md:mb-14">
          <FadeUp>
            <SectionEyebrow>Immersion</SectionEyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-3">
              Au Cœur de Tanger
            </h2>
            <p className="text-base text-monarq-ink-soft leading-relaxed font-light max-w-md mx-auto">
              Découvrez notre verrière et l'ambiance du restaurant en vidéo.
            </p>
          </FadeUp>
        </div>

        <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden bg-monarq-black">
          <DroneVideoPlayer
            src={siteConfig.videos.interiorWalkthrough}
            poster="/images/tangier-drone-poster.jpg"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. SPÉCIALITÉS — 3 Instants
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-36 bg-monarq-paper-soft relative overflow-hidden">
        {/* Subtle corner decorative accents */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center mb-20">
              <SectionEyebrow>Nos Spécialités</SectionEyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-3">
                Trois moments d'exception
              </h2>
              <p className="text-base sm:text-lg text-monarq-ink-soft max-w-md mx-auto font-light leading-relaxed">
                Une partition gourmande au rythme de votre journée.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-0">
            {/* Moment 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14 border-b border-monarq-gold/25">
              <div className="md:col-span-5">
                <CurtainReveal direction="right" duration={0.85}>
                  <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group luxury-card-hover">
                    <img 
                      src="/images/moment-morning.jpg" 
                      alt="Petit déjeuner chez MONARQ" 
                      className="w-full h-72 md:h-80 object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]" 
                    />
                  </div>
                </CurtainReveal>
              </div>
              <SlideRight className="md:col-span-7">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-semibold">01</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-3 font-semibold">
                  Le Matin & Petits Déjeuners
                </h3>
                <p className="text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-5 font-light">
                  Viennoiseries fines, msemens au miel pur, jus d'oranges pressées et cafés de terroir. De 08 h 00 à 12 h 00.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </SlideRight>
            </div>

            {/* Moment 2 — reversed */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14 border-b border-monarq-gold/25">
              <SlideLeft className="md:col-span-7 md:order-1">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-semibold">02</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-3 font-semibold">
                  Les Grands Brunchs Signatures
                </h3>
                <p className="text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-5 font-light">
                  Brioches aux crevettes, toasts d'avocat au saumon mariné, œufs pochés et pancakes fondants. De 08 h 00 à 14 h 00.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span>Explorer les brunchs</span>
                  <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </SlideLeft>
              <div className="md:col-span-5 md:order-2">
                <CurtainReveal direction="left" duration={0.85}>
                  <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group luxury-card-hover">
                    <img 
                      src="/images/moment-cuisine.jpg" 
                      alt="Brunchs MONARQ" 
                      className="w-full h-72 md:h-80 object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]" 
                    />
                  </div>
                </CurtainReveal>
              </div>
            </div>

            {/* Moment 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14">
              <div className="md:col-span-5">
                <CurtainReveal direction="right" duration={0.85}>
                  <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group luxury-card-hover">
                    <img 
                      src="/images/moment-sweet.jpg" 
                      alt="Cuisine MONARQ" 
                      className="w-full h-72 md:h-80 object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]" 
                    />
                  </div>
                </CurtainReveal>
              </div>
              <SlideRight className="md:col-span-7">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-semibold">03</span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink mt-2 mb-3 font-semibold">
                  Pâtes Artisanales, Steaks & Pizzas
                </h3>
                <p className="text-base text-monarq-ink-soft leading-relaxed max-w-lg mb-5 font-light">
                  Penne aux crevettes, risottos au saumon, viandes nobles grillées et pizzas au feu de bois. De midi à minuit.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-2.5 group"
                >
                  <span>Découvrir la cuisine</span>
                  <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </SlideRight>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. PLATS SIGNATURES
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-monarq-paper border-b border-monarq-line/60 overflow-hidden">
        {/* Ornaments */}
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
          {/* Header */}
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionEyebrow>Créations Signatures</SectionEyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold tracking-tight leading-tight mb-3">
                Nos Incontournables
              </h2>
              <p className="text-base text-monarq-ink-soft leading-relaxed font-light">
                Des recettes d'exception préparées avec des ingrédients de premier choix.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* 12 Cards Carousel */}
        <div className="relative z-10">
          <SignatureCarousel onOpenMenu={() => goTo('menu')} />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Bottom Call to Action */}
          <FadeUp delay={0.2} className="mt-10 text-center">
            <button
              onClick={() => goTo('menu')}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury hover:shadow-luxury-lg group"
            >
              <span>Consulter la Carte Complète</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </FadeUp>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════
          5. RÉSERVATIONS
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-marble-pattern border-y border-monarq-line/50">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <FadeUp>
            <img src={siteConfig.logos.seal} alt="" className="w-14 h-14 mx-auto mb-5 opacity-80" />
            <SectionEyebrow>Réservations</SectionEyebrow>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2 className="font-serif text-4xl sm:text-5xl text-monarq-ink font-semibold mb-4">
              Réservez votre table
            </h2>
            <p className="text-base text-monarq-ink-soft max-w-md mx-auto mb-8 leading-relaxed font-light">
              Repas d'affaires, brunch convivial ou dîner feutré : nous préparons votre venue avec soin.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenReservation}
                className="px-8 py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.22em] font-semibold shadow-luxury hover:shadow-luxury-lg"
              >
                Réserver en ligne
              </button>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full btn-ghost text-xs uppercase tracking-[0.22em] font-semibold"
              >
                WhatsApp Direct
              </a>
            </div>
          </FadeUp>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════
          8. INSTAGRAM
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
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors"
              >
                <span>Instagram</span>
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
                  className="group block rounded-2xl overflow-hidden bg-monarq-paper-soft aspect-[4/5] shadow-sm hover:shadow-luxury transition-all duration-300 border border-monarq-gold/20"
                >
                  <img
                    src={src}
                    alt={`MONARQ Tanger Instagram ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 ease-monarch group-hover:scale-[1.03]"
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
