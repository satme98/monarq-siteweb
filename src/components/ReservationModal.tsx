import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Clock, Users, User, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import './ReservationModal.css';

interface ReservationModalProps { isOpen: boolean; onClose: () => void; }
const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};
const times = ['09:00', '10:30', '12:00', '13:30', '15:00', '19:30', '20:30', '21:30'];

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<'form' | 'handoff'>('form');
  const [formData, setFormData] = useState({ name: '', phone: '', date: localDate(), time: '19:30', guests: '2', notes: '' });
  const update = (key: keyof typeof formData, value: string) => setFormData(data => ({ ...data, [key]: value }));

  useEffect(() => {
    if (!isOpen) return;
    setStep('form');
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => dialog.current?.focus());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const controls = dialog.current?.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href]');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  const message = `*Demande de Réservation — MONARQ Tanger*\n\n` +
    `Nom : ${formData.name.trim()}\nTéléphone : ${formData.phone.trim()}\n` +
    `Date : ${formData.date}\nHeure : ${formData.time}\nConvives : ${formData.guests}\n` +
    (formData.notes.trim() ? `Remarques : ${formData.notes.trim()}\n` : '');
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setStep('handoff');
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && <motion.div className="reservation-backdrop" data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="reservation-title" tabIndex={-1} className="reservation-dialog" initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : 8 }} transition={{ duration: reduce ? 0 : 0.25 }} onClick={event => event.stopPropagation()}>
          <aside className="reservation-photo">
            <img className="reservation-interior" src="/images/reservation-interior.png" alt="La salle du restaurant MONARQ Tanger" />
            <div className="reservation-photo-shade" />
            <img className="reservation-logo" src="/images/reservation-logo-white.png" alt="MONARQ — Brunch, Restaurant, Café" />
            <div className="reservation-address"><p>À proximité du Riad Tétouan, Tanger</p><p>09h00 — 00h00</p></div>
          </aside>
          <section className="reservation-content">
            <button className="reservation-close" type="button" onClick={onClose} aria-label="Fermer la réservation"><X size={24} /></button>
            <h2 id="reservation-title">Réserver une table</h2>
            {step === 'form' ? <form onSubmit={submit}>
              <p className="reservation-eyebrow">Votre venue</p>
              <div className="reservation-visit">
                <div className="reservation-field reservation-date"><label htmlFor="reservation-date">Date</label><input id="reservation-date" type="date" required min={localDate()} value={formData.date} onChange={e => update('date', e.target.value)} /></div>
                <div className="reservation-field"><label htmlFor="reservation-time">Heure</label><div className="reservation-control"><Clock size={18} aria-hidden="true" /><select id="reservation-time" value={formData.time} onChange={e => update('time', e.target.value)}>{times.map(time => <option key={time}>{time}</option>)}</select><ChevronDown className="reservation-chevron" size={14} aria-hidden="true" /></div></div>
                <div className="reservation-field"><label htmlFor="reservation-guests">Convives</label><div className="reservation-control"><Users size={18} aria-hidden="true" /><select id="reservation-guests" value={formData.guests} onChange={e => update('guests', e.target.value)}>{Array.from({ length: 12 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>)}<option value="13+ (groupe)">13+ (groupe)</option></select><ChevronDown className="reservation-chevron" size={14} aria-hidden="true" /></div></div>
              </div>
              <div className="reservation-notes"><label htmlFor="reservation-notes">Remarques ou demandes particulières <span>(Optionnel)</span></label><textarea id="reservation-notes" rows={3} placeholder="Anniversaire, table d’affaires, chaise enfant…" value={formData.notes} onChange={e => update('notes', e.target.value)} /></div>
              <div className="reservation-contact">
                <div className="reservation-field"><label htmlFor="reservation-name">Nom complet</label><div className="reservation-control"><User size={18} aria-hidden="true" /><input id="reservation-name" name="name" autoComplete="name" required placeholder="Votre nom" value={formData.name} onChange={e => update('name', e.target.value)} /></div></div>
                <div className="reservation-field"><label htmlFor="reservation-phone">Téléphone</label><div className="reservation-control"><Phone size={18} aria-hidden="true" /><input id="reservation-phone" name="tel" type="tel" autoComplete="tel" required placeholder="+212 6…" value={formData.phone} onChange={e => update('phone', e.target.value)} /></div></div>
              </div>
              <button type="submit" className="reservation-submit"><MessageCircle size={25} aria-hidden="true" /><span>Continuer sur WhatsApp</span></button>
              <p className="reservation-helper">Votre réservation sera confirmée par notre équipe.</p>
            </form> : <div className="reservation-handoff" role="status">
              <MessageCircle size={38} aria-hidden="true" />
              <h3>Votre demande est prête</h3>
              <p>Envoyez votre message dans WhatsApp pour finaliser votre demande. Notre équipe vous confirmera votre réservation.</p>
              <a className="reservation-submit" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Ouvrir WhatsApp</a>
              <button className="reservation-edit" onClick={() => setStep('form')}>Modifier ma demande</button>
            </div>}
          </section>
        </motion.div>
      </motion.div>}
    </AnimatePresence>, document.body
  );
};
export default ReservationModal;
