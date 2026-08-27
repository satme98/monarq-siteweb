import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EASE_MONARCH } from './Animations';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:30',
    guests: '2',
    area: 'terrasse',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message text
    const message = encodeURIComponent(
      `*Demande de Réservation — MONARQ Tanger*\n\n` +
      `👤 *Nom:* ${formData.name}\n` +
      `📞 *Téléphone:* ${formData.phone}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `⏰ *Heure:* ${formData.time}\n` +
      `👥 *Couverts:* ${formData.guests} personne(s)\n` +
      `📍 *Espace:* ${formData.area === 'terrasse' ? 'Terrasse ensoleillée' : formData.area === 'verriere' ? 'Salle Verrière & Marbre' : 'Espace Lounge'}\n` +
      (formData.notes ? `📝 *Précisions:* ${formData.notes}\n` : '') +
      `\n_Envoyé depuis le site officiel monarq.ma_`
    );

    const whatsappUrl = `https://wa.me/212661000000?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_MONARCH as unknown as number[] }}
      onClick={onClose}
    >
      <motion.div 
        className="relative w-full max-w-lg bg-monarq-paper rounded-2xl shadow-2xl border border-monarq-gold/30 overflow-hidden text-monarq-ink bg-marble-card my-auto"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.28, ease: EASE_MONARCH as unknown as number[] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — Sleek & Compact */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-4.5 border-b border-monarq-line bg-monarq-paper-soft/90">
          <div className="flex items-center gap-3">
            <img src={siteConfig.logos.seal} alt="MONARQ" className="w-8 h-8 opacity-90" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-monarq-ink">
                Réserver une Table
              </h3>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-monarq-gold-deep font-semibold">
                MONARQ Tanger · Service Continu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-monarq-paper-dark text-monarq-ink-soft hover:text-monarq-ink transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sarah Bennani"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-monarq-line bg-white/95 focus:border-monarq-gold focus:ring-1 focus:ring-monarq-gold text-xs sm:text-sm text-monarq-ink outline-none transition-all placeholder:text-monarq-ink-soft/50"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 6..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-monarq-line bg-white/95 focus:border-monarq-gold focus:ring-1 focus:ring-monarq-gold text-xs sm:text-sm text-monarq-ink outline-none transition-all placeholder:text-monarq-ink-soft/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-monarq-gold-deep" />
                    <span>Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-lg border border-monarq-line bg-white/95 focus:border-monarq-gold text-xs sm:text-sm text-monarq-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-monarq-gold-deep" />
                    <span>Heure *</span>
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-lg border border-monarq-line bg-white/95 focus:border-monarq-gold text-xs sm:text-sm text-monarq-ink outline-none"
                  >
                    <option value="09:00">09:00 — Brunch Matin</option>
                    <option value="10:30">10:30 — Brunch Matin</option>
                    <option value="12:00">12:00 — Déjeuner</option>
                    <option value="13:30">13:30 — Déjeuner</option>
                    <option value="15:00">15:00 — Après-midi Café</option>
                    <option value="19:30">19:30 — Dîner</option>
                    <option value="20:30">20:30 — Dîner</option>
                    <option value="21:30">21:30 — Dîner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-monarq-gold-deep" />
                    <span>Convives *</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-lg border border-monarq-line bg-white/95 focus:border-monarq-gold text-xs sm:text-sm text-monarq-ink outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '12+ (Groupe)'].map((n) => (
                      <option key={n} value={n}>{n} personne{typeof n === 'number' && n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1">
                  Préférence d'Espace
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'terrasse', label: 'Terrasse' },
                    { id: 'verriere', label: 'Verrière Marbre' },
                    { id: 'lounge', label: 'Lounge' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, area: option.id })}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        formData.area === option.id
                          ? 'border-monarq-gold bg-monarq-gold/15 text-monarq-gold-deep font-semibold shadow-sm'
                          : 'border-monarq-line bg-white/80 text-monarq-ink-soft hover:bg-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-monarq-ink-soft mb-1">
                  Remarques ou demandes particulières (Optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversaire, chaise bébé, intolérances alimentaires..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-monarq-line bg-white/95 focus:border-monarq-gold text-xs sm:text-sm text-monarq-ink outline-none placeholder:text-monarq-ink-soft/50"
                />
              </div>

              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl btn-gold text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 shadow-luxury hover:shadow-luxury-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirmer & Envoyer via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-monarq-ink-soft mt-2 font-normal">
                  ⚡ Confirmation rapide par notre équipe de salle.
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-semibold text-monarq-ink">
                Demande Transmise avec Succès !
              </h4>
              <p className="text-xs sm:text-sm text-monarq-ink-soft max-w-sm mx-auto leading-relaxed font-light">
                Votre demande a été transmise au service réservation de <strong>MONARQ Tanger</strong>. Notre équipe vous répondra par WhatsApp ou par téléphone dans les meilleurs délais.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full btn-dark text-xs uppercase tracking-[0.18em] font-semibold"
                >
                  Fermer
                </button>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-monarq-gold text-monarq-gold-deep hover:bg-monarq-gold hover:text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Appeler le restaurant</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReservationModal;
