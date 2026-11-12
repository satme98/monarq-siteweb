import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Bike,
  Clock,
  MapPin,
} from 'lucide-react';
import { CartItem } from '../../types';
import { siteConfig } from '../../data/siteConfig';
import {
  DeliveryLocationPicker,
  DeliveryLocationData,
} from './DeliveryLocationPicker';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onClearCart,
}) => {
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    const lines = [
      'Bonjour MONARQ Tanger,',
      '',
      'Je souhaite passer la commande suivante via le Menu Digital :',
      '',
    ];

    // Service Mode Details
    if (serviceMode === 'delivery') {
      lines.push('*Mode : LIVRAISON*');
      if (deliveryData.addressText) {
        lines.push(`*Adresse :* ${deliveryData.addressText.trim()}`);
      }
      if (deliveryData.additionalDetails) {
        lines.push(`*Complément :* ${deliveryData.additionalDetails.trim()}`);
      }
      if (deliveryData.latitude !== null && deliveryData.longitude !== null) {
        lines.push(`*Position GPS (Google Maps) :* https://maps.google.com/?q=${deliveryData.latitude},${deliveryData.longitude}`);
        if (deliveryData.distanceKm !== null) {
          const zoneStatus = deliveryData.isWithinZone ? 'Éligible' : 'Hors zone standard';
          lines.push(`*Distance estimée :* ~${deliveryData.distanceKm} km (${zoneStatus})`);
        }
      }
    } else {
      lines.push('*Mode : À EMPORTER*');
      const timeLabel =
        pickupTime === 'asap'
          ? 'Dès que possible (~20 min)'
          : pickupTime === '30min'
          ? 'Dans 30 minutes'
          : pickupTime === '45min'
          ? 'Dans 45 minutes'
          : 'Dans 1 heure';
      lines.push(`*Heure de retrait :* ${timeLabel}`);
      lines.push(`*Lieu de retrait :* MONARQ Tanger`);
    }

    lines.push('');
    lines.push('*Articles :*');

    items.forEach((ci) => {
      const linePrice = ci.item.price * ci.quantity;
      lines.push(`- ${ci.quantity}x ${ci.item.name} — ${linePrice} DH`);
    });

    lines.push('');
    lines.push(`*Total : ${totalPrice} DH*`);

    if (customerName.trim()) {
      lines.push(`*Nom :* ${customerName.trim()}`);
    }

    if (customerPhone.trim()) {
      lines.push(`*Téléphone :* ${customerPhone.trim()}`);
    }

    if (notes.trim()) {
      lines.push(`*Instructions :* ${notes.trim()}`);
    }

    lines.push('');
    lines.push('Merci de me confirmer la prise en charge de ma commande.');

    return lines.join('\n');
  };

  const cleanPhone = siteConfig.whatsapp.replace(/\D/g, '');
  const rawMessage = generateWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rawMessage)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-monarq-black/60 backdrop-blur-md"
        />

        {/* Drawer container */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg bg-monarq-paper rounded-t-2xl sm:rounded-2xl shadow-luxury-xl border border-monarq-line overflow-hidden max-h-[92vh] flex flex-col text-monarq-ink"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-monarq-line bg-marble-pattern flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-monarq-gold/15 border border-monarq-gold/30 text-monarq-gold-deep flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-monarq-ink leading-tight">
                  Votre Sélection
                </h3>
                <p className="font-sans text-xs text-monarq-ink-muted">
                  {totalItemsCount} {totalItemsCount > 1 ? 'articles' : 'article'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="px-2.5 py-1 text-monarq-ink-muted hover:text-red-700 transition-colors rounded-full hover:bg-red-50 font-sans text-xs flex items-center gap-1"
                  title="Vider la sélection"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Vider</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="w-8 h-8 rounded-full bg-monarq-paper hover:bg-monarq-paper-dark text-monarq-ink border border-monarq-line flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-monarq-paper-soft border border-monarq-line flex items-center justify-center text-monarq-gold">
                  <ShoppingBag className="w-6 h-6 opacity-50" />
                </div>
                <h4 className="font-serif text-xl text-monarq-ink font-semibold uppercase tracking-wide">
                  Votre sélection est vide
                </h4>
                <p className="font-sans text-xs sm:text-sm text-monarq-ink-soft max-w-xs leading-relaxed">
                  Parcourez la carte et ajoutez vos plats favoris pour composer votre commande.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-full btn-dark text-xs font-semibold uppercase tracking-[0.18em]"
                >
                  Découvrir la carte
                </button>
              </div>
            ) : submitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-monarq-gold/15 border border-monarq-gold/30 text-monarq-gold-deep flex items-center justify-center mb-1">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-monarq-ink font-bold uppercase tracking-wide">
                  Votre demande est prête
                </h4>
                <p className="font-sans text-xs sm:text-sm text-monarq-ink-soft max-w-xs leading-relaxed">
                  Envoyez votre récapitulatif dans WhatsApp pour finaliser votre commande auprès de notre équipe.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full btn-gold text-xs uppercase tracking-[0.16em] font-semibold text-center"
                  >
                    Ouvrir WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-4 rounded-full bg-monarq-paper border border-monarq-line text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink hover:bg-monarq-paper-soft transition-colors"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            ) : (
              <form id="whatsapp-order-form" onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Fulfillment Mode Selector: Livraison / À emporter */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-monarq-paper-soft rounded-xl border border-monarq-line">
                  <button
                    type="button"
                    onClick={() => setServiceMode('delivery')}
                    className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all ${
                      serviceMode === 'delivery'
                        ? 'bg-monarq-ink text-monarq-paper shadow-sm'
                        : 'text-monarq-ink-soft hover:text-monarq-ink'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-monarq-gold" />
                    <span>Livraison</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceMode('pickup')}
                    className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all ${
                      serviceMode === 'pickup'
                        ? 'bg-monarq-ink text-monarq-paper shadow-sm'
                        : 'text-monarq-ink-soft hover:text-monarq-ink'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-monarq-gold" />
                    <span>À emporter</span>
                  </button>
                </div>

                {/* 2. Step: Customer Name & Phone */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="block font-sans text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink mb-1.5"
                    >
                      Nom complet <span className="text-monarq-gold">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line bg-monarq-paper text-monarq-ink placeholder:text-monarq-ink-muted/50 font-sans text-xs sm:text-sm focus:outline-none focus:border-monarq-gold transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="block font-sans text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink mb-1.5"
                    >
                      Téléphone <span className="text-monarq-gold">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      placeholder="Votre numéro de téléphone (ex: 06...)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line bg-monarq-paper text-monarq-ink placeholder:text-monarq-ink-muted/50 font-sans text-xs sm:text-sm focus:outline-none focus:border-monarq-gold transition-all"
                    />
                  </div>
                </div>

                {/* 3. Step: Delivery Location or Pick-up Details */}
                {serviceMode === 'delivery' ? (
                  <DeliveryLocationPicker
                    locationData={deliveryData}
                    onChange={setDeliveryData}
                  />
                ) : (
                  <div className="space-y-2.5 p-3.5 rounded-xl bg-monarq-paper-soft/70 border border-monarq-line">
                    <div className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] font-bold text-monarq-ink">
                      <MapPin className="w-3.5 h-3.5 text-monarq-gold" />
                      <span>Retrait au restaurant</span>
                    </div>
                    <p className="font-sans text-xs text-monarq-ink-soft leading-relaxed">
                      {siteConfig.fullAddress}
                    </p>

                    <div className="pt-1">
                      <label className="font-sans text-xs font-semibold text-monarq-ink-soft mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-monarq-gold" />
                        <span>Créneau de retrait</span>
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {[
                          { id: 'asap', label: 'Dès que possible (~20 min)' },
                          { id: '30min', label: 'Dans 30 min' },
                          { id: '45min', label: 'Dans 45 min' },
                          { id: '1hour', label: 'Dans 1h' },
                        ].map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setPickupTime(slot.id)}
                            className={`py-2 px-2.5 rounded-lg border text-center font-sans text-xs transition-all ${
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

                {/* 4. Step: Notes */}
                <div className="pt-1">
                  <label
                    htmlFor="order-notes"
                    className="block font-sans text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink mb-1.5"
                  >
                    Remarques ou instructions <span className="text-monarq-ink-muted font-normal lowercase tracking-normal">(optionnel)</span>
                  </label>
                  <input
                    id="order-notes"
                    type="text"
                    placeholder="Précisions sur la préparation ou la livraison…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line bg-monarq-paper text-monarq-ink placeholder:text-monarq-ink-muted/50 font-sans text-xs sm:text-sm focus:outline-none focus:border-monarq-gold transition-all"
                  />
                </div>

                {/* 5. Step: Articles list */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <div className="font-sans text-xs uppercase tracking-[0.16em] font-bold text-monarq-ink">
                      Articles ({totalItemsCount})
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-sans text-[11px] uppercase tracking-[0.12em] font-semibold text-monarq-gold-deep hover:text-monarq-ink flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Ajouter un plat</span>
                    </button>
                  </div>
                  <div className="divide-y divide-monarq-line rounded-xl bg-monarq-paper-soft/50 border border-monarq-line overflow-hidden">
                    {items.map((cartItem) => {
                      const itemTotal = cartItem.item.price * cartItem.quantity;
                      return (
                        <div
                          key={cartItem.item.id}
                          className="p-3 flex items-center justify-between gap-2.5"
                        >
                          {/* Product name & unit price */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-serif font-bold text-base text-monarq-ink uppercase tracking-wide truncate">
                              {cartItem.item.name}
                            </h5>
                            <p className="font-sans text-xs text-monarq-gold-deep font-semibold tabular-nums">
                              {cartItem.item.price} DH
                            </p>
                          </div>

                          {/* Quantity stepper + total + remove X */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="flex items-center border border-monarq-line bg-monarq-paper rounded-full p-0.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-monarq-ink hover:bg-monarq-paper-dark transition-colors"
                                aria-label="Diminuer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-sans font-bold text-xs tabular-nums">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-monarq-gold/15 text-monarq-gold-deep hover:bg-monarq-gold/25 transition-colors flex items-center justify-center"
                                aria-label="Augmenter"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-sans font-bold text-xs sm:text-sm text-monarq-ink tabular-nums w-14 text-right">
                              {itemTotal} DH
                            </span>

                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(cartItem.item.id, 0)}
                              title="Retirer cet article"
                              aria-label={`Retirer ${cartItem.item.name}`}
                              className="w-6 h-6 rounded-full text-monarq-ink-muted hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors ml-0.5"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Step: Price Box */}
                <div className="pt-3 border-t border-monarq-line space-y-1.5 font-sans text-xs">
                  <div className="flex justify-between items-center text-monarq-ink-soft">
                    <span>Sous-total</span>
                    <span className="tabular-nums font-semibold text-monarq-ink">{totalPrice} DH</span>
                  </div>
                  <div className="flex justify-between items-center text-monarq-ink-soft">
                    <span>{serviceMode === 'delivery' ? 'Livraison' : 'Retrait au restaurant'}</span>
                    <span className="text-monarq-gold-deep font-semibold">Offerte</span>
                  </div>
                  <div className="pt-2 border-t border-monarq-line flex justify-between items-baseline font-bold text-base text-monarq-ink">
                    <span className="font-serif uppercase tracking-wide text-lg">Total</span>
                    <span className="font-sans text-monarq-gold-deep tabular-nums text-lg sm:text-xl">
                      {totalPrice} DH
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Sticky Action Button */}
          {items.length > 0 && !submitted && (
            <div className="p-4 bg-monarq-paper-soft border-t border-monarq-line">
              <button
                type="submit"
                form="whatsapp-order-form"
                className="w-full py-3.5 px-6 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander sur WhatsApp</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
