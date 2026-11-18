import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Clock, Users, User, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../i18n';
import './ReservationModal.css';

interface ReservationModalProps { isOpen: boolean; onClose: () => void; }
const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};
const times = ['09:00', '10:30', '12:00', '13:30', '15:00', '19:30', '20:30', '21:30'];

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
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

  const message = `${t.reservationModal.waHeader}\n\n` +
    `${t.reservationModal.waName} : ${formData.name.trim()}\n${t.reservationModal.waPhone} : ${formData.phone.trim()}\n` +
    `${t.reservationModal.waDate} : ${formData.date}\n${t.reservationModal.waTime} : ${formData.time}\n${t.reservationModal.waGuests} : ${formData.guests}\n` +
    (formData.notes.trim() ? `${t.reservationModal.waNotes} : ${formData.notes.trim()}\n` : '');
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
            <img className="reservation-interior" src="/website-images/interior/reservation-interior.webp" alt="La salle du restaurant MONARQ Tanger" loading="lazy" decoding="async" />
            <div className="reservation-photo-shade" />
            <img className="reservation-logo" src="/website-images/brand/reservation-logo-white.webp" alt="MONARQ — Brunch, Restaurant, Café" loading="lazy" decoding="async" />
            <div className="reservation-address"><p>{t.reservationModal.locationLine}</p><p>09:00 — 00:00</p></div>
          </aside>
          <section className="reservation-content">
            <button className="reservation-close" type="button" onClick={onClose} aria-label={t.reservationModal.closeAria}><X size={24} /></button>
            <h2 id="reservation-title">{t.reservationModal.title}</h2>
            {step === 'form' ? <form onSubmit={submit}>
              <p className="reservation-eyebrow">{t.reservationModal.eyebrow}</p>
              <div className="reservation-visit">
                <div className="reservation-field reservation-date"><label htmlFor="reservation-date">{t.reservationModal.dateLabel}</label><input id="reservation-date" type="date" required min={localDate()} value={formData.date} onChange={e => update('date', e.target.value)} /></div>
                <div className="reservation-field"><label htmlFor="reservation-time">{t.reservationModal.timeLabel}</label><div className="reservation-control"><Clock size={18} aria-hidden="true" /><select id="reservation-time" value={formData.time} onChange={e => update('time', e.target.value)}>{times.map(time => <option key={time}>{time}</option>)}</select><ChevronDown className="reservation-chevron" size={14} aria-hidden="true" /></div></div>
                <div className="reservation-field"><label htmlFor="reservation-guests">{t.reservationModal.guestsLabel}</label><div className="reservation-control"><Users size={18} aria-hidden="true" /><select id="reservation-guests" value={formData.guests} onChange={e => update('guests', e.target.value)}>{Array.from({ length: 12 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n > 1 ? t.reservationModal.personPlural : t.reservationModal.personSingular}</option>)}<option value={t.reservationModal.groupOption}>{t.reservationModal.groupOption}</option></select><ChevronDown className="reservation-chevron" size={14} aria-hidden="true" /></div></div>
              </div>
              <div className="reservation-notes"><label htmlFor="reservation-notes">{t.reservationModal.notesLabel} <span>{t.reservationModal.optionalLabel}</span></label><textarea id="reservation-notes" rows={3} placeholder={t.reservationModal.notesPlaceholder} value={formData.notes} onChange={e => update('notes', e.target.value)} /></div>
              <div className="reservation-contact">
                <div className="reservation-field"><label htmlFor="reservation-name">{t.reservationModal.fullNameLabel}</label><div className="reservation-control"><User size={18} aria-hidden="true" /><input id="reservation-name" name="name" autoComplete="name" required placeholder={t.reservationModal.fullNamePlaceholder} value={formData.name} onChange={e => update('name', e.target.value)} /></div></div>
                <div className="reservation-field"><label htmlFor="reservation-phone">{t.reservationModal.phoneLabel}</label><div className="reservation-control"><Phone size={18} aria-hidden="true" /><input id="reservation-phone" name="tel" type="tel" autoComplete="tel" required placeholder={t.reservationModal.phonePlaceholder} value={formData.phone} onChange={e => update('phone', e.target.value)} /></div></div>
              </div>
              <button type="submit" className="reservation-submit"><MessageCircle size={25} aria-hidden="true" /><span>{t.reservationModal.continueWhatsappBtn}</span></button>
              <p className="reservation-helper">{t.reservationModal.helperText}</p>
            </form> : <div className="reservation-handoff" role="status">
              <MessageCircle size={38} aria-hidden="true" />
              <h3>{t.reservationModal.readyTitle}</h3>
              <p>{t.reservationModal.readyDesc}</p>
              <a className="reservation-submit" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t.reservationModal.openWhatsappBtn}</a>
              <button className="reservation-edit" onClick={() => setStep('form')}>{t.reservationModal.editBtn}</button>
            </div>}
          </section>
        </motion.div>
      </motion.div>}
    </AnimatePresence>, document.body
  );
};
export default ReservationModal;
