import React from 'react';
import { ArrowRight, Calendar, MapPin, Clock, Instagram } from 'lucide-react';
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
          <div className="max-w-2xl">
            <FadeUp delay={0.2}>
              <h1 className="font-serif text-display-xl text-white font-bold leading-[1.05] mb-6">
                L'élégance à table,<br />
                <span className="italic font-normal text-monarq-gold-light">du matin au soir.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.6}>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-10 max-w-lg">
                À Tanger, MONARQ réunit brunchs généreux, cuisine de caractère et café de spécialité dans un cadre raffiné.
              </p>
            </FadeUp>

            <FadeUp delay={0.8}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goTo('menu')}
                  className="px-7 py-3 rounded-full btn-gold text-[11px] uppercase tracking-[0.2em] font-semibold"
                >
                  Découvrir la carte
                </button>
                <button
                  onClick={onOpenReservation}
                  className="group px-7 py-3 rounded-full bg-transparent border border-white/30 text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-monarq-ink transition-all duration-500"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Réserver une table
                  </span>
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Compact info strip */}
          <FadeUp delay={1}>
            <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-gray-400 tracking-wide">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-monarq-gold" />
                Ouvert 7j/7 · 08 h 00 — 00 h 00
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-monarq-gold" />
                Avenue Marrakech, Tanger
              </span>
            </div>
          </FadeUp>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-8 hidden md:flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 rotate-90 origin-center translate-x-3">scroll</span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-monarq-gold/60 to-transparent"
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
                <span className="section-label block mb-6">Le concept</span>
                <h2 className="font-serif text-display-md text-monarq-ink mb-8">
                  Une parenthèse royale au cœur de la cité du Détroit.
                </h2>
                <div className="space-y-5 text-sm text-monarq-ink-soft leading-[1.75]">
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
                    className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-monarq-ink hover:text-monarq-gold transition-colors"
                  >
                    Découvrir le lieu
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                      <img src={siteConfig.logos.seal} alt="" className="w-10 h-10 opacity-70" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-monarq-ink-muted">
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
      <section className="relative py-28 md:py-36 bg-kintsugi-ambient border-y border-monarq-gold/30 overflow-hidden">
        {/* Subtle decorative gold corner brackets (Marginal Framing) */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute top-8 right-8 w-10 h-10 border-t border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-monarq-gold/40 pointer-events-none hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-monarq-gold/40 pointer-events-none hidden lg:block" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <FadeUp>
            <div className="text-center mb-20">
              <span className="section-label block mb-3">Rythme & Saveurs</span>
              <h2 className="font-serif text-display-md text-monarq-ink mb-4">
                Trois instants d'exception
              </h2>
              <p className="text-sm text-monarq-ink-soft max-w-md mx-auto">
                De la première lueur du jour au dîner sous les étoiles, une partition culinaire pensée pour chaque instant.
              </p>
              <div className="diamond-divider mt-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-monarq-gold font-serif">MONARQ</span>
              </div>
            </div>
          </FadeUp>

          <div className="space-y-0">
            {/* Moment 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14 border-b border-monarq-gold/20">
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
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-bold">01</span>
                <h3 className="font-serif text-2xl md:text-3xl text-monarq-ink mt-2 mb-3 font-semibold">
                  Le Matin & Grands Brunchs
                </h3>
                <p className="text-sm text-monarq-ink-soft leading-relaxed max-w-md mb-6">
                  Pancakes fondants, œufs pochés à la truffe, jus pressés minute, msemen au miel pur et thés parfumés. De 08 h 00 à 14 h 00.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-[11px] uppercase tracking-[0.2em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Explorer les brunchs</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </SlideRight>
            </div>

            {/* Moment 2 — reversed */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14 border-b border-monarq-gold/20">
              <SlideLeft className="md:col-span-7 md:order-1">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-bold">02</span>
                <h3 className="font-serif text-2xl md:text-3xl text-monarq-ink mt-2 mb-3 font-semibold">
                  La Cuisine & Pâtes Fraîches
                </h3>
                <p className="text-sm text-monarq-ink-soft leading-relaxed max-w-md mb-6">
                  Penne Monarq aux crevettes piquantes, risottos onctueux au saumon, salades fraîches et carpaccios raffinés. De 12 h 00 à minuit.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-[11px] uppercase tracking-[0.2em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Découvrir la cuisine</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </SlideLeft>
              <ScaleReveal className="md:col-span-5 md:order-2">
                <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group">
                  <img 
                    src="/images/moment-cuisine.jpg" 
                    alt="La cuisine MONARQ" 
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-700 ease-monarch group-hover:scale-105" 
                  />
                </div>
              </ScaleReveal>
            </div>

            {/* Moment 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center py-14">
              <ScaleReveal className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-luxury-lg border border-monarq-gold/25 group">
                  <img 
                    src="/images/moment-sweet.jpg" 
                    alt="Le soir chez MONARQ" 
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-700 ease-monarch group-hover:scale-105" 
                  />
                </div>
              </ScaleReveal>
              <SlideRight className="md:col-span-7">
                <span className="text-monarq-gold font-serif text-4xl md:text-5xl font-bold">03</span>
                <h3 className="font-serif text-2xl md:text-3xl text-monarq-ink mt-2 mb-3 font-semibold">
                  Dîners, Pizzas & Grillades
                </h3>
                <p className="text-sm text-monarq-ink-soft leading-relaxed max-w-md mb-6">
                  Pizzas au feu de bois, filet pur Black Angus, tajines traditionnels et cocktails signature dans une ambiance feutrée. De 19 h 00 à minuit.
                </p>
                <button
                  onClick={() => goTo('menu')}
                  className="text-[11px] uppercase tracking-[0.2em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Voir les grillades</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </SlideRight>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. SIGNATURE DISHES — Horizontal scroll strip
          ═══════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <span className="section-label block mb-3">Sélection spéciale</span>
                <h2 className="font-serif text-display-md text-monarq-ink">
                  Les plats signatures
                </h2>
              </div>
              <button
                onClick={() => goTo('menu')}
                className="text-[11px] uppercase tracking-[0.2em] font-semibold text-monarq-ink-soft hover:text-monarq-gold transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
              >
                Carte complète <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeUp>

          {/* Horizontal scroll on mobile, 3-column grid on desktop */}
          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
            {signatureHighlights.map((dish, i) => (
              <FadeUp key={i} delay={i * 0.1} className="min-w-[280px] md:min-w-0 snap-start">
                <div className="group">
                  <div className="relative rounded-2xl overflow-hidden mb-4 h-56 md:h-64 bg-monarq-paper-soft">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-monarch group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-monarq-black/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {dish.price}
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-monarq-gold-deep font-medium mb-1">
                    {dish.category}
                  </p>
                  <h3 className="font-serif text-lg text-monarq-ink font-semibold mb-1.5">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-monarq-ink-soft leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. FULL-WIDTH ATMOSPHERE INTERLUDE
          ═══════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <ParallaxImage
          src="/images/interlude-atmosphere.jpg"
          alt="Atmosphère MONARQ Tanger"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/50" />
        <FadeUp className="absolute inset-0 flex items-center justify-center text-center px-6">
          <blockquote className="max-w-xl">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white italic font-normal leading-snug mb-4">
              « L'art de recevoir, c'est offrir à chacun le sentiment d'être attendu. »
            </p>
            <cite className="text-[11px] uppercase tracking-[0.25em] text-monarq-gold-light not-italic font-medium">
              L'esprit MONARQ
            </cite>
          </blockquote>
        </FadeUp>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. DRONE WALKTHROUGH — Immersive Tanger
          ═══════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <FadeUp>
            <div className="text-center max-w-lg mx-auto mb-4">
              <span className="section-label block mb-3">Immersion virtuelle</span>
              <h2 className="font-serif text-display-md text-monarq-ink mb-3">
                Au cœur de Tanger
              </h2>
              <p className="text-sm text-monarq-ink-soft">
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
      <section className="relative py-24 md:py-32 overflow-hidden bg-marble-pattern border-y border-monarq-line/50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <FadeUp>
            <img src={siteConfig.logos.seal} alt="" className="w-16 h-16 mx-auto mb-8 opacity-70" />
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2 className="font-serif text-display-lg text-monarq-ink mb-6">
              Réservez votre table
            </h2>
            <p className="text-sm text-monarq-ink-soft max-w-md mx-auto mb-10">
              Brunch entre amis, déjeuner d'affaires ou dîner feutré — notre équipe vous réserve le meilleur accueil.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenReservation}
                className="px-8 py-3.5 rounded-full btn-gold text-[11px] uppercase tracking-[0.2em] font-semibold shadow-lg"
              >
                Réserver une table
              </button>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full btn-ghost text-[11px] uppercase tracking-[0.2em] font-semibold"
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
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-monarq-ink" />
                <span className="text-sm font-medium text-monarq-ink">
                  {siteConfig.instagramHandle}
                </span>
              </div>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.2em] font-semibold text-monarq-ink-soft hover:text-monarq-gold transition-colors"
              >
                Suivre sur Instagram
              </a>
            </div>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/images/insta-1.jpg', '/images/insta-2.jpg', '/images/insta-3.jpg', '/images/insta-4.jpg'].map((src, i) => (
              <StaggerItem key={i}>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden bg-monarq-paper-soft aspect-[4/5] shadow-sm hover:shadow-luxury transition-all duration-500 border border-monarq-gold/15"
                >
                  <img
                    src={src}
                    alt={`MONARQ Instagram ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-monarch group-hover:scale-105"
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
