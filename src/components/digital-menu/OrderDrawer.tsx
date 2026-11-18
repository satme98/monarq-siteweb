import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  MessageCircle,
  ShoppingBag,
  Bike,
  Clock,
  MapPin,
} from 'lucide-react';
import { cartLineKey, lineTotal, unitPrice, extraLabels, needsPastaType, pastaLabels } from '../../lib/menuOrder';
import { useLanguage } from '../../i18n';
import { CartItem } from '../../types';
import { siteConfig } from '../../data/siteConfig';
import {
  DeliveryLocationPicker,
  DeliveryLocationData,
} from './DeliveryLocationPicker';
import { QuantityControls } from './QuantityControls';
import './OrderDrawer.css';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onClearCart: () => void;
  onEdit: (line: CartItem) => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
  onEdit,
}) => {
  const { lang, t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Service mode: Delivery or Pick-up
  const [serviceMode, setServiceMode] = useState<'delivery' | 'pickup'>('delivery');
  const [pickupTime, setPickupTime] = useState<string>('asap');

  // Delivery location & GPS data
  const [deliveryData, setDeliveryData] = useState<DeliveryLocationData>({
    latitude: null,
    longitude: null,
    addressText: '',
    neighborhood: '',
    additionalDetails: '',
    distanceKm: null,
    isWithinZone: null,
  });

  const [customerName, setCustomerName] = useState(() => {
    try {
      return localStorage.getItem('monarq_customer_name') || '';
    } catch {
      return '';
    }
  });

  const [customerPhone, setCustomerPhone] = useState(() => {
    try {
      return localStorage.getItem('monarq_customer_phone') || '';
    } catch {
      return '';
    }
  });

  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync customer name & phone with localStorage
  useEffect(() => {
    try {
      if (customerName) {
        localStorage.setItem('monarq_customer_name', customerName);
      }
      if (customerPhone) {
        localStorage.setItem('monarq_customer_phone', customerPhone);
      }
    } catch {
      // Storage fallback
    }
  }, [customerName, customerPhone]);

  useEffect(() => {
    if (isOpen) setSubmitted(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const dialog = dialogRef.current;
    if (!overlay || !dialog) return;

    const previousFocus = document.activeElement;
    dialog.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab') return;

      const controls = dialog.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href]');
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement;
      const outsideControls = active === dialog || !dialog.contains(active);

      if (outsideControls || active === (event.shiftKey ? first : last)) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Mobile browsers may overlay the keyboard without resizing the layout viewport.
    const viewport = window.visualViewport;
    const fitViewport = () => {
      const fit = viewport && viewport.scale === 1;
      overlay.style.height = fit ? `${viewport.height}px` : '';
      overlay.style.top = fit ? `${viewport.offsetTop}px` : '';
    };
    fitViewport();
    viewport?.addEventListener('resize', fitViewport);
    viewport?.addEventListener('scroll', fitViewport);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      viewport?.removeEventListener('resize', fitViewport);
      viewport?.removeEventListener('scroll', fitViewport);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose]);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + lineTotal(item), 0);

  const generateWhatsAppMessage = () => {
    const wa = t.orderDrawer.wa;
    const lines = [
      wa.greeting,
      '',
      wa.intro,
      '',
    ];

    // Service Mode Details
    if (serviceMode === 'delivery') {
      lines.push(wa.modeDelivery);
      if (deliveryData.addressText) {
        lines.push(`${wa.address} ${deliveryData.addressText.trim()}`);
      }
      if (deliveryData.additionalDetails) {
        lines.push(`${wa.complement} ${deliveryData.additionalDetails.trim()}`);
      }
      if (deliveryData.latitude !== null && deliveryData.longitude !== null) {
        lines.push(`${wa.gps} https://maps.google.com/?q=${deliveryData.latitude},${deliveryData.longitude}`);
        if (deliveryData.distanceKm !== null) {
          const zoneStatus = deliveryData.isWithinZone ? wa.eligible : wa.outOfZone;
          lines.push(`${wa.distance} ~${deliveryData.distanceKm} km (${zoneStatus})`);
        }
      }
    } else {
      lines.push(wa.modePickup);
      const slots = t.orderDrawer.slots;
      const timeLabel =
        pickupTime === 'asap'
          ? slots.asap
          : pickupTime === '30min'
          ? slots['30min']
          : pickupTime === '45min'
          ? slots['45min']
          : slots['1hour'];
      lines.push(`${wa.pickupTime} ${timeLabel}`);
      lines.push(wa.pickupLocation);
    }

    lines.push('');
    lines.push(wa.items);

    items.forEach((ci) => {
      const linePrice = lineTotal(ci);
      lines.push(`- ${ci.quantity}x ${ci.item.name} — ${linePrice} ${t.common.currency}`);
      if (ci.pastaType) lines.push(`  • ${ci.pastaType}`);
      ci.extras?.forEach((extra) => lines.push(`  + ${extra.name} (+${extra.price} ${t.common.currency})`));
    });

    lines.push('');
    lines.push(`${wa.total} ${totalPrice} ${t.common.currency}*`);

    if (customerName.trim()) {
      lines.push(`${wa.name} ${customerName.trim()}`);
    }

    if (customerPhone.trim()) {
      lines.push(`${wa.phone} ${customerPhone.trim()}`);
    }

    if (notes.trim()) {
      lines.push(`${wa.instructions} ${notes.trim()}`);
    }

    lines.push('');
    lines.push(wa.thanks);

    return lines.join('\n');
  };

  const cleanPhone = siteConfig.whatsapp.replace(/\D/g, '');
  const rawMessage = generateWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rawMessage)}`;

  const missingPastaType = items.some(needsPastaType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missingPastaType) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div ref={overlayRef} className="fixed inset-x-0 top-0 z-50 flex h-dvh items-end justify-center pt-[env(safe-area-inset-top)] sm:items-center sm:p-6">
        {/* Backdrop */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-monarq-black/60 backdrop-blur-md"
        />

        {/* Drawer container */}
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-drawer-title"
          tabIndex={-1}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 flex w-full max-w-screen-sm max-h-full flex-col overflow-hidden rounded-t-2xl border border-monarq-line bg-monarq-paper text-monarq-ink shadow-luxury-xl focus:outline-none sm:rounded-2xl"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-monarq-line bg-marble-pattern px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-monarq-gold/30 bg-monarq-gold/15 text-monarq-gold-deep">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 id="order-drawer-title" className="break-words font-serif text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl">
                  {t.orderDrawer.yourSelection}
                </h3>
                <p className="font-sans text-sm text-monarq-ink-muted">
                  {totalItemsCount} {totalItemsCount > 1 ? t.orderDrawer.itemPlural : t.orderDrawer.itemSingular}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-full px-2.5 font-sans text-sm text-monarq-ink-muted transition-colors hover:bg-red-50 hover:text-red-700"
                  title={t.orderDrawer.clearCartTitle}
                  aria-label={t.orderDrawer.clearCartTitle}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.orderDrawer.clearCartLabel}</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label={t.orderDrawer.closeAria}
                className="flex size-11 items-center justify-center rounded-full border border-monarq-line bg-monarq-paper transition-colors hover:bg-monarq-paper-dark"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
            {items.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-monarq-paper-soft border border-monarq-line flex items-center justify-center text-monarq-gold">
                  <ShoppingBag className="w-6 h-6 opacity-50" />
                </div>
                <h4 className="font-serif text-xl text-monarq-ink font-semibold uppercase tracking-wide">
                  {t.orderDrawer.emptyTitle}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-monarq-ink-soft max-w-xs leading-relaxed">
                  {t.orderDrawer.emptyDesc}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-full btn-dark text-xs font-semibold uppercase tracking-[0.18em]"
                >
                  {t.orderDrawer.discoverMenuBtn}
                </button>
              </div>
            ) : submitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-monarq-gold/15 border border-monarq-gold/30 text-monarq-gold-deep flex items-center justify-center mb-1">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-monarq-ink font-bold uppercase tracking-wide">
                  {t.orderDrawer.readyTitle}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-monarq-ink-soft max-w-xs leading-relaxed">
                  {t.orderDrawer.readyDesc}
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full btn-gold text-xs uppercase tracking-[0.16em] font-semibold text-center"
                  >
                    {t.orderDrawer.openWhatsappBtn}
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-4 rounded-full bg-monarq-paper border border-monarq-line text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink hover:bg-monarq-paper-soft transition-colors"
                  >
                    {t.orderDrawer.editBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form id="whatsapp-order-form" onSubmit={handleSubmit} className="space-y-6">
                <section aria-labelledby="order-items-title" className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-x-3">
                    <h4 id="order-items-title" className="font-sans text-sm font-semibold text-monarq-ink">
                      {t.orderDrawer.itemsHeader} ({totalItemsCount})
                    </h4>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex min-h-11 items-center gap-1.5 rounded-lg font-sans text-sm font-semibold text-monarq-gold-deep transition-colors hover:text-monarq-ink"
                    >
                      <Plus className="size-4 shrink-0" />
                      <span>{t.orderDrawer.addDishBtn}</span>
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {items.map((cartItem) => {
                      const { item, quantity, pastaType, extras } = cartItem;
                      const lineKey = cartLineKey(cartItem);

                      return (
                        <li key={lineKey} className="rounded-2xl border border-monarq-line bg-monarq-paper-soft p-3 shadow-sm min-[375px]:p-4">
                          <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1">
                              <h5 className="break-words font-sans text-base font-semibold leading-snug sm:text-lg">
                                {item.name}
                              </h5>
                              <div className="flex flex-wrap items-center gap-x-3 font-sans text-sm text-monarq-gold-deep">
                                <bdi className="whitespace-nowrap font-semibold tabular-nums">{unitPrice(cartItem)} {t.common.currency}</bdi>
                                <button
                                  type="button"
                                  onClick={() => onEdit(cartItem)}
                                  className="min-h-11 rounded-lg font-semibold underline decoration-monarq-gold/60 underline-offset-4 transition-colors hover:text-monarq-ink"
                                >
                                  {extraLabels[lang].edit}
                                </button>
                              </div>
                              <div className="space-y-0.5 break-words font-sans text-sm text-monarq-ink-soft">
                                {pastaType && <p>{pastaType}</p>}
                                {needsPastaType(cartItem) && (
                                  <p className="font-semibold text-monarq-gold-deep">{pastaLabels[lang].missing}</p>
                                )}
                                {extras?.map((extra) => (
                                  <p key={extra.id}>{extra.name} <bdi className="whitespace-nowrap">(+{extra.price} {t.common.currency})</bdi></p>
                                ))}
                              </div>
                            </div>
                            {item.image && (
                              <img
                                src={item.image}
                                alt=""
                                loading="lazy"
                                className="size-14 shrink-0 rounded-xl border border-monarq-line bg-monarq-paper-dark object-cover sm:size-16"
                              />
                            )}
                          </div>
                          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-t border-monarq-line pt-2.5">
                            <QuantityControls
                              name={item.name}
                              quantity={quantity}
                              onChange={(nextQuantity) => onUpdateQuantity(lineKey, nextQuantity)}
                            />
                            <bdi className="ms-auto whitespace-nowrap font-sans text-base font-bold tabular-nums">
                              {lineTotal(cartItem)} {t.common.currency}
                            </bdi>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-monarq-line bg-monarq-paper-soft p-1">
                  <button
                    type="button"
                    onClick={() => setServiceMode('delivery')}
                    aria-pressed={serviceMode === 'delivery'}
                    className={`flex min-h-11 min-w-0 flex-wrap items-center justify-center gap-x-2 rounded-lg px-2 py-2 text-center font-sans text-sm font-semibold transition-colors ${
                      serviceMode === 'delivery'
                        ? 'bg-monarq-ink text-monarq-paper shadow-sm'
                        : 'text-monarq-ink-soft hover:text-monarq-ink'
                    }`}
                  >
                    <Bike className={`size-4 shrink-0 ${serviceMode === 'delivery' ? 'text-monarq-gold-light' : 'text-monarq-gold-deep'}`} />
                    <span>{t.orderDrawer.deliveryMode}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceMode('pickup')}
                    aria-pressed={serviceMode === 'pickup'}
                    className={`flex min-h-11 min-w-0 flex-wrap items-center justify-center gap-x-2 rounded-lg px-2 py-2 text-center font-sans text-sm font-semibold transition-colors ${
                      serviceMode === 'pickup'
                        ? 'bg-monarq-ink text-monarq-paper shadow-sm'
                        : 'text-monarq-ink-soft hover:text-monarq-ink'
                    }`}
                  >
                    <ShoppingBag className={`size-4 shrink-0 ${serviceMode === 'pickup' ? 'text-monarq-gold-light' : 'text-monarq-gold-deep'}`} />
                    <span>{t.orderDrawer.pickupMode}</span>
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="order-field-label"
                    >
                      {t.orderDrawer.fullNameLabel} <span className="text-monarq-gold">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      placeholder={t.orderDrawer.fullNamePlaceholder}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="order-field"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="order-field-label"
                    >
                      {t.orderDrawer.phoneLabel} <span className="text-monarq-gold">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      placeholder={t.orderDrawer.phonePlaceholder}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="order-field"
                    />
                  </div>
                </div>

                {serviceMode === 'delivery' ? (
                  <DeliveryLocationPicker
                    locationData={deliveryData}
                    onChange={setDeliveryData}
                  />
                ) : (
                  <div className="space-y-3 rounded-2xl border border-monarq-line bg-monarq-paper-soft p-4">
                    <div className="flex items-center gap-2 font-sans text-sm font-semibold text-monarq-ink">
                      <MapPin className="w-3.5 h-3.5 text-monarq-gold" />
                      <span>{t.orderDrawer.pickupAtRestaurant}</span>
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-monarq-ink-soft">
                      {t.common.fullAddress}
                    </p>

                    <div className="pt-1">
                      <p className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold text-monarq-ink-soft">
                        <Clock className="w-3.5 h-3.5 text-monarq-gold" />
                        <span>{t.orderDrawer.pickupTimeSlot}</span>
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'asap', label: t.orderDrawer.slots.asap },
                          { id: '30min', label: t.orderDrawer.slots['30min'] },
                          { id: '45min', label: t.orderDrawer.slots['45min'] },
                          { id: '1hour', label: t.orderDrawer.slots['1hour'] },
                        ].map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setPickupTime(slot.id)}
                            aria-pressed={pickupTime === slot.id}
                            className={`min-h-11 rounded-lg border px-2.5 py-2 text-center font-sans text-sm transition-colors ${
                              pickupTime === slot.id
                                ? 'bg-monarq-ink text-white border-monarq-ink font-semibold'
                                : 'bg-monarq-paper border-monarq-line text-monarq-ink-soft hover:bg-monarq-paper-dark'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="order-notes"
                    className="order-field-label"
                  >
                    {t.orderDrawer.notesLabel} <span className="text-monarq-ink-muted font-normal lowercase tracking-normal">{t.orderDrawer.optionalLabel}</span>
                  </label>
                  <input
                    id="order-notes"
                    type="text"
                    placeholder={t.orderDrawer.notesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="order-field"
                  />
                </div>

                {/* Price summary */}
                <div className="space-y-2 border-t border-monarq-line pt-4 font-sans text-sm">
                  <div className="flex items-center justify-between gap-3 text-monarq-ink-soft">
                    <span>{t.orderDrawer.subtotal}</span>
                    <bdi className="whitespace-nowrap font-semibold tabular-nums text-monarq-ink">{totalPrice} {t.common.currency}</bdi>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-monarq-ink-soft">
                    <span>{serviceMode === 'delivery' ? t.orderDrawer.deliveryFeeLabel : t.orderDrawer.pickupFeeLabel}</span>
                    <span className="text-monarq-gold-deep font-semibold">{t.orderDrawer.freeLabel}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-t border-monarq-line pt-3 font-bold">
                    <span className="font-serif text-xl uppercase tracking-wide">{t.orderDrawer.totalLabel}</span>
                    <bdi className="whitespace-nowrap font-sans text-xl tabular-nums text-monarq-gold-deep sm:text-2xl">
                      {totalPrice} {t.common.currency}
                    </bdi>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Sticky Action Button */}
          {items.length > 0 && !submitted && (
            <div className="shrink-0 border-t border-monarq-line bg-monarq-paper-soft px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:px-6">
              <button
                type="submit"
                form="whatsapp-order-form"
                disabled={missingPastaType}
                className="btn-gold flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-4 py-2.5 text-center font-sans text-sm shadow-luxury disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span className="whitespace-normal font-semibold tracking-normal">{t.orderDrawer.orderOnWhatsappBtn}</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
