import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Instagram, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-monarq-paper/95 backdrop-blur-md py-3.5 border-b border-monarq-gold/20 shadow-luxury' 
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <img 
            src={isScrolled ? siteConfig.logos.dark : siteConfig.logos.white} 
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
                  isScrolled
                    ? isActive 
                      ? 'text-monarq-gold-deep font-semibold' 
                      : 'text-monarq-ink hover:text-monarq-gold'
                    : isActive 
                      ? 'text-monarq-gold font-semibold' 
                      : 'text-white/90 hover:text-white'
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
              isScrolled ? 'text-monarq-ink-soft hover:text-monarq-gold' : 'text-white/80 hover:text-white'
            }`}
            title="Instagram @monarq.tanger"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenReservation}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
              isScrolled
                ? 'btn-gold shadow-sm'
                : 'bg-white/10 text-white hover:bg-white hover:text-monarq-ink border border-white/30 backdrop-blur-sm'
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
            className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium ${
              isScrolled ? 'btn-gold' : 'bg-white text-monarq-ink font-semibold'
            }`}
          >
            Réserver
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-monarq-ink hover:bg-monarq-paper-dark' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-monarq-paper/98 backdrop-blur-xl z-40 flex flex-col justify-between p-6 border-t border-monarq-gold/20 animate-fade-in text-monarq-ink">
          <div className="space-y-6 pt-4">
            <div className="text-center pb-4 border-b border-monarq-line">
              <img 
                src={siteConfig.logos.seal} 
                alt="MONARQ" 
                className="w-14 h-14 mx-auto mb-2 opacity-90"
              />
              <p className="text-[10px] uppercase tracking-[0.25em] text-monarq-gold-deep">
                Tanger · Maroc
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm uppercase tracking-[0.18em] transition-colors ${
                      isActive 
                        ? 'bg-monarq-gold/15 text-monarq-gold-deep font-semibold' 
                        : 'text-monarq-ink hover:bg-monarq-paper-dark'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-monarq-gold"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-monarq-line">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 rounded-xl btn-gold flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold"
            >
              <Calendar className="w-4 h-4" />
              <span>Réserver une table</span>
            </button>

            <div className="flex items-center justify-around pt-2 text-xs text-monarq-ink-soft">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-monarq-gold">
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
              <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-monarq-gold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Plan d'accès</span>
              </a>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-monarq-gold">
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
