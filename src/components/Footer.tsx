import React from 'react';
import { Instagram, MapPin, Phone, Clock, MessageSquare, ArrowUp, Heart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface FooterProps {
  onOpenReservation: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-monarq-black text-white relative overflow-hidden pt-20 pb-28 md:pb-16 border-t border-monarq-gold/30">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#A7916C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand & Seal Column */}
          <div className="space-y-6 lg:col-span-1">
            <img 
              src={siteConfig.logos.white} 
              alt="MONARQ" 
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              L'élégance à table, du matin au soir. Une expérience de brunch d'exception, cuisine créative et café de spécialité au cœur de Tanger.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-300 hover:text-monarq-gold hover:border-monarq-gold transition-colors"
                title="Suivez MONARQ sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-300 hover:text-monarq-gold hover:border-monarq-gold transition-colors"
                title="Appeler le restaurant"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Horaires d'Ouverture */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold font-semibold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Horaires de Service</span>
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Tous les jours</span>
                <span className="font-medium text-white">08h00 — 00h00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Service Brunch</span>
                <span className="font-medium text-white">08h00 — 14h00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Déjeuner & Dîner</span>
                <span className="font-medium text-white">12h00 — 23h30</span>
              </div>
              <p className="text-[11px] text-monarq-gold-light italic pt-1">
                * Couscous traditionnel disponible chaque vendredi midi.
              </p>
            </div>
          </div>

          {/* Localisation & Accès */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold font-semibold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Adresse à Tanger</span>
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <p className="leading-relaxed">
                {siteConfig.fullAddress}
                <br />
                <span className="text-gray-400">(À proximité immédiate du Palais Municipal)</span>
              </p>
              <div className="pt-2">
                <a 
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-monarq-gold hover:text-white underline underline-offset-4 transition-colors"
                >
                  <span>Ouvrir dans Google Maps</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sceau & Réservation Rapide */}
          <div className="space-y-4 flex flex-col items-start md:items-center text-left md:text-center">
            <img 
              src={siteConfig.logos.seal} 
              alt="Sceau Officiel MONARQ" 
              className="w-20 h-20 opacity-85 hover:opacity-100 transition-opacity"
            />
            <p className="text-xs text-gray-400 font-light">
              Table d'hôtes & réservations privées
            </p>
            <button
              onClick={onOpenReservation}
              className="w-full py-2.5 px-4 rounded-full btn-gold text-xs uppercase tracking-wider font-semibold"
            >
              Réserver votre Table
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MONARQ Tanger. Tous droits réservés.</p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { setActiveTab('menu'); scrollToTop(); }}
              className="hover:text-monarq-gold transition-colors"
            >
              La Carte
            </button>
            <button 
              onClick={() => { setActiveTab('contact'); scrollToTop(); }}
              className="hover:text-monarq-gold transition-colors"
            >
              Contact
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-monarq-gold hover:text-white transition-colors"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
