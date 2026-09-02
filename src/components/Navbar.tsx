import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Menu, X, Calendar, Phone, Instagram, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EASE_MONARQ, EASE_CINEMATIC, DUR, SPRING_SNAP, SPRING_FLUID } from '../lib/animation';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenReservation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  // Smooth scroll progress — used to interpolate navbar opacity instead of a boolean toggle
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.97]);
  const borderOpacity = useTransform(scrollY, [20, 70], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.95]);
  const py = useTransform(scrollY, [0, 60], [20, 14]); // px values for padding

  // Boolean for color scheme (transparent vs filled)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setIsScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close mobile menu on large viewport
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'menu', label: 'La Carte' },
    { id: 'atmosphere', label: 'Le Lieu & Esprit' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'apropos', label: 'À Propos' },
    { id: 'evenements', label: 'Événements' },
    { id: 'contact', label: 'Accès & Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparent = activeTab === 'accueil' && !isScrolled;

  // Mobile overlay stagger variants
  const overlayVariants = {
    hidden: { clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)', opacity: 0 },
    visible: {
      clipPath: 'circle(160% at calc(100% - 3.5rem) 3.5rem)',
      opacity: 1,
      transition: {
        clipPath: {
          duration: reduce ? 0.15 : 0.55,
          ease: EASE_CINEMATIC,
        },
        opacity: { duration: 0.15 },
      },
    },
    exit: {
      clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)',
      opacity: 0,
      transition: {
        clipPath: {
          duration: reduce ? 0.15 : 0.4,
          ease: EASE_MONARQ,
        },
        opacity: { duration: 0.2, delay: 0.15 },
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: 0.28 + i * 0.045,
        ease: EASE_CINEMATIC,
      },
    }),
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* ── Desktop / Scrolled Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 ${
          isTransparent ? 'text-white' : 'text-monarq-ink'
        }`}
        style={{
          paddingTop: reduce ? (isScrolled ? '14px' : '20px') : undefined,
          paddingBottom: reduce ? (isScrolled ? '14px' : '20px') : undefined,
        }}
      >
        {/* Smooth glass background — driven by scroll progress */}
        {!isTransparent && (
          <motion.div
            className="absolute inset-0 bg-monarq-paper backdrop-blur-md"
            style={{
              opacity: reduce ? 1 : bgOpacity,
            }}
          />
        )}

        {/* Hero transparent gradient */}
        {isTransparent && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-transparent pointer-events-none" />
        )}

        {/* Bottom border — fades in with scroll */}
        {!isTransparent && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-monarq-gold/20"
            style={{ opacity: reduce ? 1 : borderOpacity }}
          />
        )}

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10"
          style={{
            paddingTop: isScrolled ? '14px' : '20px',
            paddingBottom: isScrolled ? '14px' : '20px',
            transition: 'padding 350ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-3 text-left focus:outline-none"
            style={{ scale: reduce ? 1 : logoScale }}
            whileHover={{ scale: 1.02 }}
            transition={SPRING_FLUID}
          >
            <img
              src={isTransparent ? siteConfig.logos.white : siteConfig.logos.dark}
              alt="MONARQ Tanger"
              className="h-9 md:h-11 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation">
            {/* Active indicator pill — slides between items */}
            <div className="relative flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-250 relative py-1.5 focus:outline-none ${
                      isTransparent
                        ? isActive
                          ? 'text-monarq-gold'
                          : 'text-white/85 hover:text-white'
                        : isActive
                        ? 'text-monarq-gold-deep'
                        : 'text-monarq-ink hover:text-monarq-gold'
                    }`}
                  >
                    {item.label}

                    {/* Animated underline — layoutId moves between items */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-line"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-monarq-gold rounded-full"
                        transition={
                          reduce
                            ? { duration: 0.01 }
                            : { ...SPRING_FLUID, duration: 0.35 }
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-monarq-ink-soft hover:text-monarq-gold'
              }`}
              whileHover={reduce ? {} : { scale: 1.1 }}
              whileTap={reduce ? {} : { scale: 0.92 }}
              transition={SPRING_SNAP}
              title="Instagram @monarq.tanger"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>

            <motion.button
              onClick={onOpenReservation}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium ${
                isTransparent
                  ? 'bg-white/10 text-white hover:bg-white hover:text-monarq-ink border border-white/30 backdrop-blur-sm transition-colors duration-300'
                  : 'btn-gold shadow-sm'
              }`}
              whileHover={reduce ? {} : { y: -1, scale: 1.01 }}
              whileTap={reduce ? {} : { scale: 0.96, y: 0 }}
              transition={SPRING_SNAP}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver</span>
            </motion.button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <motion.button
              onClick={onOpenReservation}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold ${
                isTransparent
                  ? 'bg-white text-monarq-ink shadow-sm'
                  : 'btn-gold shadow-sm'
              }`}
              whileTap={reduce ? {} : { scale: 0.94 }}
              transition={SPRING_SNAP}
            >
              Réserver
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-monarq-ink hover:bg-monarq-paper-dark'
              }`}
              aria-label="Ouvrir le menu"
              whileTap={reduce ? {} : { scale: 0.9 }}
              transition={SPRING_SNAP}
            >
              <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-monarq-ink'}`} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Overlay — Radial Reveal ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 flex flex-col justify-between p-5 sm:p-6 text-white min-h-[100dvh]"
            style={{ backgroundColor: '#141210' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top Bar */}
            <motion.div
              className="flex items-center justify-between pb-4 border-b border-white/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.3 }}
            >
              <button
                onClick={() => handleNavClick('accueil')}
                className="flex items-center gap-3 text-left focus:outline-none"
              >
                <img
                  src={siteConfig.logos.white}
                  alt="MONARQ Tanger"
                  className="h-9 w-auto"
                />
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
                  className="px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-white text-monarq-ink shadow-sm"
                >
                  Réserver
                </button>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                  aria-label="Fermer le menu"
                  whileTap={reduce ? {} : { scale: 0.88, rotate: 90 }}
                  transition={SPRING_SNAP}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </motion.div>

            {/* Nav Items — staggered in */}
            <div className="py-4 flex flex-col justify-center space-y-1 flex-grow">
              {/* Logo seal */}
              <motion.div
                className="text-center pb-6 mb-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.32 }}
              >
                <img
                  src={siteConfig.logos.seal}
                  alt="MONARQ"
                  className="w-12 h-12 mx-auto mb-2 opacity-90 brightness-125 invert"
                />
                <p className="text-[10px] uppercase tracking-[0.28em] text-monarq-gold-light font-semibold">
                  Tanger · Maroc
                </p>
              </motion.div>

              {navItems.map((item, i) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-xl text-left text-sm uppercase tracking-[0.2em] transition-colors duration-200 ${
                      isActive
                        ? 'bg-monarq-gold/25 text-monarq-gold-light font-bold border border-monarq-gold/45'
                        : 'text-white/85 hover:text-white hover:bg-white/8 font-medium'
                    }`}
                    custom={i}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileTap={reduce ? {} : { scale: 0.97 }}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        className="w-2 h-2 rounded-full bg-monarq-gold-light"
                        layoutId="mobile-active-dot"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Bar */}
            <motion.div
              className="space-y-3.5 pt-4 border-t border-white/15"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
                className="w-full py-3.5 rounded-xl btn-gold flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une table</span>
              </button>

              <div className="flex items-center justify-around pt-1 text-xs text-white/70 font-medium">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-1.5 hover:text-monarq-gold-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Appeler</span>
                </a>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-monarq-gold-light transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Plan d'accès</span>
                </a>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-monarq-gold-light transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
