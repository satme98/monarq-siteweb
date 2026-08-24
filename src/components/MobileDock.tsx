import React from 'react';
import { Utensils, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface MobileDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReservation: () => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({ activeTab, setActiveTab, onOpenReservation }) => {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div className="bg-monarq-black/95 backdrop-blur-xl border border-monarq-gold/40 rounded-full p-1.5 shadow-2xl flex items-center justify-between text-white">
        {/* Bouton Menu */}
        <button
          onClick={() => {
            setActiveTab('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-medium transition-all ${
            activeTab === 'menu'
              ? 'bg-white/20 text-monarq-gold'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>La Carte</span>
        </button>

        {/* Bouton Itinéraire Maps */}
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-medium text-gray-300 hover:text-white transition-all"
        >
          <MapPin className="w-3.5 h-3.5 text-monarq-gold" />
          <span>GPS</span>
        </a>

        {/* Bouton Réserver Principal */}
        <button
          onClick={onOpenReservation}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full btn-gold text-xs font-semibold uppercase tracking-wider shadow-md"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Réserver</span>
        </button>
      </div>
    </div>
  );
};
