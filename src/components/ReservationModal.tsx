import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Phone, Sparkles, MapPin } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EASE_MONARQ, EASE_CINEMATIC, SPRING_SNAP, SPRING_FLUID } from '../lib/animation';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const reduce = useReducedMotion();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message text
    const areaLabel =
      formData.area === 'terrasse'
        ? 'Terrasse ensoleillée'
        : formData.area === 'verriere'
        ? 'Salle Verrière & Marbre'
        : 'Espace Lounge';

    const message = encodeURIComponent(
      `*Demande de Réservation — MONARQ Tanger*\n\n` +
      `👤 *Nom:* ${formData.name}\n` +
      `📞 *Téléphone:* ${formData.phone}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `⏰ *Heure:* ${formData.time}\n` +
      `👥 *Couverts:* ${formData.guests} personne(s)\n` +
      `📍 *Espace souhaité:* ${areaLabel}\n` +
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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_MONARQ }}
          onClick={onClose}
        >
          <motion.div 
            className="relative w-full max-w-lg bg-monarq-paper rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(158,128,80,0.35)] overflow-hidden text-monarq-ink bg-marble-card my-auto"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gold Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-monarq-gold to-transparent" />

            {/* Header — Editorial & Luxury */}
            <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-monarq-gold/20 bg-monarq-paper-soft/95">
              <div className="flex items-center gap-3.5">
                <img 
                  src={siteConfig.logos.badgeSeal} 
                  alt="MONARQ" 
                  className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:rotate-6 transition-transform duration-300" 
                />
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-monarq-ink leading-tight">
                    Réserver une Table
                  </h3>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-monarq-gold-deep font-semibold mt-0.5">
                    MONARQ Tanger · Service Continu
                  </p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-monarq-gold/25 hover:border-monarq-gold hover:bg-monarq-gold/10 text-monarq-ink-soft hover:text-monarq-ink flex items-center justify-center transition-colors"
                aria-label="Fermer"
                whileTap={reduce ? {} : { scale: 0.9 }}
                whileHover={reduce ? {} : { scale: 1.05 }}
                transition={SPRING_SNAP}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 sm:pt-5">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Nom & Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5">
                        Votre Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sarah Bennani"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line/80 bg-white/90 text-xs sm:text-sm text-monarq-ink outline-none transition-all placeholder:text-monarq-ink-muted/50 hover:border-monarq-gold/40 focus:border-monarq-gold focus:bg-white focus:ring-2 focus:ring-monarq-gold/15 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5">
                        Numéro de Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+212 6..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line/80 bg-white/90 text-xs sm:text-sm text-monarq-ink outline-none transition-all placeholder:text-monarq-ink-muted/50 hover:border-monarq-gold/40 focus:border-monarq-gold focus:bg-white focus:ring-2 focus:ring-monarq-gold/15 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Date, Heure & Convives */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-monarq-gold" />
                        <span>Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-monarq-line/80 bg-white/90 text-xs sm:text-sm text-monarq-ink outline-none transition-all hover:border-monarq-gold/40 focus:border-monarq-gold focus:bg-white focus:ring-2 focus:ring-monarq-gold/15 shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-monarq-gold" />
                        <span>Heure *</span>
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-monarq-line/80 bg-white/90 text-xs sm:text-sm text-monarq-ink outline-none transition-all hover:border-monarq-gold/40 focus:border-monarq-gold focus:bg-white focus:ring-2 focus:ring-monarq-gold/15 shadow-sm"
                      >
                        <option value="09:00">09:00 — Brunch Matin</option>
                        <option value="10:30">10:30 — Brunch Matin</option>
                        <option value="12:00">12:00 — Déjeuner</option>
                        <option value="13:30">13:30 — Déjeuner</option>
                        <option value="15:00">15:00 — Café & Douceurs</option>
                        <option value="19:30">19:30 — Dîner Feutré</option>
                        <option value="20:30">20:30 — Dîner Feutré</option>
                        <option value="21:30">21:30 — Dîner Feutré</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-monarq-gold" />
                        <span>Convives *</span>
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-monarq-line/80 bg-white/90 text-xs sm:text-sm text-monarq-ink outline-none transition-all hover:border-monarq-gold/40 focus:border-monarq-gold focus:bg-white focus:ring-2 focus:ring-monarq-gold/15 shadow-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '12+ (Groupe)'].map((n) => (
                          <option key={n} value={n}>{n} personne{typeof n === 'number' && n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Préférence d'Espace */}
                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5">
                      Préférence d'Espace
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {[
                        { id: 'terrasse', label: 'Terrasse' },
                        { id: 'verriere', label: 'Verrière Marbre' },
                        { id: 'lounge', label: 'Lounge' },
                      ].map((option) => {
                        const isSelected = formData.area === option.id;
                        return (
                          <motion.button
                            key={option.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, area: option.id })}
                            className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all relative overflow-hidden ${
                              isSelected
                                ? 'border-monarq-gold bg-gradient-to-br from-monarq-gold/20 via-monarq-gold/10 to-transparent text-monarq-ink shadow-sm ring-1 ring-monarq-gold/50'
                                : 'border-monarq-line/80 bg-white/75 text-monarq-ink-soft hover:bg-white hover:border-monarq-gold/30'
                            }`}
                            whileTap={reduce ? {} : { scale: 0.97 }}
                            whileHover={reduce ? {} : { y: -1 }}
                            transition={SPRING_SNAP}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-monarq-gold inline-block mr-1.5 shadow-[0_0_6px_rgba(158,128,80,0.8)]" />
                            )}
                            <span>{option.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Remarques */}
                  <div>
                    <label className="block text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-monarq-gold-deep mb-1.5">
                      Remarques ou demandes particulières (Optionnel)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Anniversaire, table d'affaires, chaise enfant, intolérances..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line/80 bg-white/90 text-xs sm:text-sm text-monarq-ink outline-none transition-all placeholder:text-monarq-ink-muted/50 hover:border-monarq-gold/40 focus:border-monarq-gold focus:bg-white focus:ring-2 focus:ring-monarq-gold/15 shadow-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      className="w-full py-3.5 sm:py-4 rounded-xl btn-gold text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 shadow-luxury hover:shadow-luxury-lg"
                      whileTap={reduce ? {} : { scale: 0.97 }}
                      whileHover={reduce ? {} : { scale: 1.01 }}
                      transition={SPRING_SNAP}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirmer & Envoyer via WhatsApp</span>
                    </motion.button>
                    
                    <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-monarq-ink-soft">
                      <Sparkles className="w-3.5 h-3.5 text-monarq-gold flex-shrink-0" />
                      <span>Confirmation immédiate et personnalisée par notre équipe de salle.</span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-16 h-16 bg-monarq-gold/15 text-monarq-gold-deep rounded-full flex items-center justify-center mx-auto ring-8 ring-monarq-gold/10 shadow-inner">
                    <CheckCircle2 className="w-8 h-8 text-monarq-gold" />
                  </div>
                  
                  <div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-monarq-ink">
                      Demande Transmise
                    </h4>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-monarq-gold-deep font-semibold mt-1">
                      Maison MONARQ Tanger
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-monarq-ink-soft max-w-sm mx-auto leading-relaxed font-light">
                    Votre demande pour le <strong>{formData.date} à {formData.time}</strong> ({formData.guests} couverts) a été ouverte sur WhatsApp. Notre équipe de salle vous confirmera l'attribution de votre table.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <motion.button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-7 py-3 rounded-full btn-dark text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
                      whileTap={reduce ? {} : { scale: 0.95 }}
                      transition={SPRING_SNAP}
                    >
                      Fermer
                    </motion.button>
                    <motion.a
                      href={`tel:${siteConfig.phone}`}
                      className="w-full sm:w-auto px-7 py-3 rounded-full border border-monarq-gold text-monarq-gold-deep hover:bg-monarq-gold hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
                      whileTap={reduce ? {} : { scale: 0.95 }}
                      transition={SPRING_SNAP}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Appeler le restaurant</span>
                    </motion.a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
