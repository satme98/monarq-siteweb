import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, MapPin, Phone, Clock, ArrowUp, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EASE_MONARQ, EASE_CINEMATIC, SPRING_SNAP, SPRING_FLUID } from '../lib/animation';

interface FooterProps {
  onOpenReservation: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, setActiveTab }) => {
  const reduce = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const colVariants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.15 : 0.7,
        delay: reduce ? 0 : i * 0.09,
        ease: EASE_CINEMATIC,
      },
    }),
  };

  const headerBandVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };

  const lineVariants = {
    hidden: reduce ? { opacity: 0 } : { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: reduce ? 0.01 : 0.65, ease: EASE_MONARQ },
    },
  };

  const diamondVariants = {
    hidden: reduce ? { opacity: 0 } : { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: reduce ? 0.01 : 0.35, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  const labelVariants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: '110%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { duration: reduce ? 0.01 : 0.5, ease: EASE_CINEMATIC },
    },
  };

  return (
    <footer className="bg-monarq-black text-white relative overflow-hidden pt-24 pb-20 border-t border-monarq-gold/30">
      {/* Decorative subtle dot pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#A7916C_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Animated header band — center-outward reveal */}
        <motion.div
          className="flex items-center justify-center gap-5 pb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerBandVariants}
        >
          <motion.div
            className="h-[1px] flex-1 max-w-[160px] bg-gradient-to-r from-transparent to-monarq-gold/50"
            style={{ transformOrigin: 'right' }}
            variants={lineVariants}
          />
          <motion.span
            className="w-1.5 h-1.5 inline-block bg-monarq-gold flex-shrink-0 shadow-[0_0_8px_rgba(158,128,80,0.6)]"
            style={{ rotate: 45 }}
            variants={diamondVariants}
          />
          <div className="overflow-hidden">
            <motion.span
              className="block text-xs uppercase tracking-[0.32em] font-serif text-monarq-gold-light font-semibold text-center"
              variants={labelVariants}
            >
              Maison de Gastronomie · Tanger
            </motion.span>
          </div>
          <motion.span
            className="w-1.5 h-1.5 inline-block bg-monarq-gold flex-shrink-0 shadow-[0_0_8px_rgba(158,128,80,0.6)]"
            style={{ rotate: 45 }}
            variants={diamondVariants}
          />
          <motion.div
            className="h-[1px] flex-1 max-w-[160px] bg-gradient-to-l from-transparent to-monarq-gold/50"
            style={{ transformOrigin: 'left' }}
            variants={lineVariants}
          />
        </motion.div>

        {/* 4-column grid — staggered FadeUp per column */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 pb-20 border-b border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Column 1: Brand & Social */}
          <motion.div className="space-y-6 lg:col-span-4 lg:pr-6" custom={0} variants={colVariants}>
            <img src={siteConfig.logos.white} alt="MONARQ" className="h-10 w-auto" />
            <p className="text-sm text-gray-300 font-light leading-relaxed max-w-sm">
              L'art de recevoir et la passion du goût à Tanger. Grands brunchs, cuisine raffinée et café d'auteur.
            </p>
            <div className="flex items-center gap-3.5 pt-2">
              <motion.a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-200 hover:text-monarq-gold hover:border-monarq-gold transition-colors duration-300 group"
                title="Suivez MONARQ sur Instagram"
                whileHover={reduce ? {} : { scale: 1.08 }}
                whileTap={reduce ? {} : { scale: 0.9 }}
                transition={SPRING_SNAP}
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-200 hover:text-monarq-gold hover:border-monarq-gold transition-colors duration-300 group"
                title="WhatsApp Direct"
                whileHover={reduce ? {} : { scale: 1.08 }}
                whileTap={reduce ? {} : { scale: 0.9 }}
                transition={SPRING_SNAP}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </motion.a>
              <motion.a
                href={`tel:${siteConfig.phone}`}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-200 hover:text-monarq-gold hover:border-monarq-gold transition-colors duration-300 group"
                title="Appeler le restaurant"
                whileHover={reduce ? {} : { scale: 1.08 }}
                whileTap={reduce ? {} : { scale: 0.9 }}
                transition={SPRING_SNAP}
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2: Hours */}
          <motion.div className="space-y-5 lg:col-span-3" custom={1} variants={colVariants}>
            <div className="flex items-center gap-2.5 mb-5">
              <Clock className="w-4 h-4 text-monarq-gold flex-shrink-0" />
              <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold-light font-semibold font-serif">
                Horaires de Service
              </h4>
            </div>
            <div className="space-y-3.5 text-sm text-gray-200">
              {[
                { label: 'Tous les jours', time: '08h00 — 00h00' },
                { label: 'Service Brunch', time: '08h00 — 14h00' },
                { label: 'Déjeuner & Dîner', time: '12h00 — 23h30' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="font-medium text-white">{row.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Address */}
          <motion.div className="space-y-5 lg:col-span-3" custom={2} variants={colVariants}>
            <div className="flex items-center gap-2.5 mb-5">
              <MapPin className="w-4 h-4 text-monarq-gold flex-shrink-0" />
              <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold-light font-semibold font-serif">
                Adresse à Tanger
              </h4>
            </div>
            <div className="space-y-3.5 text-sm text-gray-200">
              <p className="leading-relaxed">
                {siteConfig.fullAddress}
                <br />
                <span className="text-gray-400 text-xs block mt-1">(À proximité immédiate du Palais Municipal)</span>
              </p>
              <div className="pt-3">
                <motion.a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-monarq-gold-light hover:text-white transition-colors font-semibold text-xs uppercase tracking-[0.22em]"
                  whileHover={reduce ? {} : { x: 2 }}
                  transition={SPRING_FLUID}
                >
                  <span>Ouvrir dans Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 text-monarq-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Reservations CTA */}
          <motion.div className="space-y-5 lg:col-span-2 flex flex-col justify-between" custom={3} variants={colVariants}>
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Sparkles className="w-4 h-4 text-monarq-gold flex-shrink-0" />
                <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold-light font-semibold font-serif">
                  Réservations
                </h4>
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                Table d'hôtes, déjeuners d'affaires & réceptions privées.
              </p>
            </div>
            <motion.button
              onClick={onOpenReservation}
              className="w-full py-3.5 px-5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury text-center"
              whileHover={reduce ? {} : { scale: 1.02, y: -1 }}
              whileTap={reduce ? {} : { scale: 0.96, y: 0 }}
              transition={SPRING_SNAP}
            >
              Réserver votre Table
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 inline-block bg-monarq-gold flex-shrink-0 shadow-[0_0_8px_rgba(158,128,80,0.6)]"
              style={{ transform: 'rotate(45deg)' }}
            />
            <p>© {new Date().getFullYear()} MONARQ Tanger. Tous droits réservés.</p>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => { setActiveTab('menu'); scrollToTop(); }}
              className="hover:text-monarq-gold transition-colors uppercase tracking-[0.18em] font-medium link-underline-expand"
            >
              La Carte
            </button>
            <button
              onClick={() => { setActiveTab('contact'); scrollToTop(); }}
              className="hover:text-monarq-gold transition-colors uppercase tracking-[0.18em] font-medium link-underline-expand"
            >
              Contact
            </button>
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-monarq-gold-light hover:text-white transition-colors group uppercase tracking-[0.18em] font-medium"
              whileHover={reduce ? {} : { y: -2 }}
              whileTap={reduce ? {} : { scale: 0.92 }}
              transition={SPRING_SNAP}
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
