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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/15">
          {/* Brand & Seal Column */}
          <div className="space-y-6 lg:col-span-1">
            <img 
              src={siteConfig.logos.white} 
              alt="MONARQ" 
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              L'élégance à table, du matin au soir. Une expérience de brunch d'exception, cuisine créative et café de spécialité au cœur de Tanger.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-200 hover:text-monarq-gold hover:border-monarq-gold transition-colors"
                title="Suivez MONARQ sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-200 hover:text-monarq-gold hover:border-monarq-gold transition-colors"
                title="WhatsApp Direct"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-gray-200 hover:text-monarq-gold hover:border-monarq-gold transition-colors"
                title="Appeler le restaurant"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Horaires d'Ouverture */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold-light font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-monarq-gold" />
              <span>Horaires de Service</span>
            </h4>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-gray-400">Tous les jours</span>
                <span className="font-medium text-white">08h00 — 00h00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-gray-400">Service Brunch</span>
                <span className="font-medium text-white">08h00 — 14h00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-gray-400">Déjeuner & Dîner</span>
                <span className="font-medium text-white">12h00 — 23h30</span>
              </div>
              <p className="text-xs text-monarq-gold-light italic pt-1">
                * Couscous traditionnel disponible chaque vendredi midi.
              </p>
            </div>
          </div>

          {/* Localisation & Accès */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-monarq-gold-light font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-monarq-gold" />
              <span>Adresse à Tanger</span>
            </h4>
            <div className="space-y-3 text-sm text-gray-200">
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
                  className="inline-flex items-center gap-2 text-monarq-gold-light hover:text-white underline underline-offset-4 transition-colors font-medium text-xs uppercase tracking-wider"
                >
                  <span>Ouvrir dans Google Maps</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sceau & Réservation Rapide */}
          <div className="space-y-4 flex flex-col items-start md:items-center text-left md:text-center">
            <img 
              src={siteConfig.logos.seal} 
              alt="Sceau Officiel MONARQ" 
              className="w-20 h-20 opacity-90 hover:opacity-100 transition-opacity"
            />
            <p className="text-xs text-gray-300 font-medium tracking-wide">
              Table d'hôtes & réservations privées
            </p>
            <button
              onClick={onOpenReservation}
              className="w-full py-3 px-6 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
            >
              Réserver votre Table
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
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
              className="flex items-center gap-1.5 text-monarq-gold-light hover:text-white transition-colors"
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
