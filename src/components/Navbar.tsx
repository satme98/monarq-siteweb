import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Phone, Instagram, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EASE_MONARCH } from './Animations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'menu', label: 'La Carte' },
    { id: 'atmosphere', label: 'Le Lieu & Esprit' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'contact', label: 'Accès & Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only the home page hero uses transparent header when not scrolled
  const isTransparent = activeTab === 'accueil' && !isScrolled;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
            : 'bg-monarq-paper/95 backdrop-blur-md py-3.5 border-b border-monarq-gold/20 shadow-luxury text-monarq-ink'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <img 
              src={isTransparent ? siteConfig.logos.white : siteConfig.logos.dark} 
              alt="MONARQ Tanger" 
              className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 relative py-1 ${
                    isTransparent
                      ? isActive 
                        ? 'text-monarq-gold font-semibold' 
                        : 'text-white/90 hover:text-white'
                      : isActive 
                        ? 'text-monarq-gold-deep font-semibold' 
                        : 'text-monarq-ink hover:text-monarq-gold'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-monarq-gold rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                isTransparent
                  ? 'text-white/80 hover:text-white'
                  : 'text-monarq-ink-soft hover:text-monarq-gold'
              }`}
              title="Instagram @monarq.tanger"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenReservation}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                isTransparent
                  ? 'bg-white/10 text-white hover:bg-white hover:text-monarq-ink border border-white/30 backdrop-blur-sm'
                  : 'btn-gold shadow-sm'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenReservation}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold ${
                isTransparent 
                  ? 'bg-white text-monarq-ink shadow-sm' 
                  : 'btn-gold shadow-sm'
              }`}
            >
              Réserver
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-monarq-ink hover:bg-monarq-paper-dark'
              }`}
              aria-label="Ouvrir le menu"
            >
              <Menu className={`w-6 h-6 ${isTransparent ? 'text-white' : 'text-monarq-ink'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Standalone Opaque Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 z-50 flex flex-col justify-between p-5 sm:p-6 text-white min-h-[100dvh]"
            style={{ backgroundColor: '#141210' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE_MONARCH as unknown as number[] }}
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
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
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-white text-monarq-ink shadow-sm"
                >
                  Réserver
                </button>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Middle Nav Items */}
            <div className="py-4 flex flex-col justify-center space-y-2.5 flex-grow">
              <div className="text-center pb-3 mb-1">
                <img 
                  src={siteConfig.logos.seal} 
                  alt="MONARQ" 
                  className="w-12 h-12 mx-auto mb-1.5 opacity-90 brightness-125 invert"
                />
                <p className="text-[10px] uppercase tracking-[0.25em] text-monarq-gold-light font-semibold">
                  Tanger · Maroc
                </p>
              </div>

              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-xl text-left text-sm uppercase tracking-[0.2em] transition-all duration-200 ${
                      isActive 
                        ? 'bg-monarq-gold/30 text-monarq-gold-light font-bold border border-monarq-gold/50 shadow-md' 
                        : 'text-white/90 hover:text-white hover:bg-white/10 font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-monarq-gold-light shadow-sm"></span>}
                  </button>
                );
              })}
            </div>

            {/* Bottom Bar inside Overlay */}
            <div className="space-y-3.5 pt-4 border-t border-white/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3.5 rounded-xl btn-gold flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une table</span>
              </button>

              <div className="flex items-center justify-around pt-1 text-xs text-white/75 font-medium">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-monarq-gold-light transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Appeler</span>
                </a>
                <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-monarq-gold-light transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Plan d'accès</span>
                </a>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-monarq-gold-light transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
