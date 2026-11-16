import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Sparkles, Flame, Leaf, Check } from 'lucide-react';
import { MenuItem } from '../../types';

interface DishDetailModalProps {
  item: MenuItem | null;
  quantity: number;
  onClose: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const stripEmojis = (text?: string) =>
  text ? text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim() : '';

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  quantity,
  onClose,
  onUpdateQuantity,
}) => {
  if (!item) return null;

  const currentQty = quantity > 0 ? quantity : 1;
  const cleanTag = stripEmojis(item.tag);

  const handleIncrement = () => {
    onUpdateQuantity(quantity === 0 ? 1 : quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      onUpdateQuantity(0);
    } else {
      onUpdateQuantity(quantity - 1);
    }
  };

  const handleAddOrSave = () => {
    if (quantity === 0) {
      onUpdateQuantity(1);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-monarq-black/35 backdrop-blur-sm"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-detail-title"
          className="relative z-10 w-full max-w-lg bg-monarq-paper rounded-t-2xl sm:rounded-2xl shadow-luxury-xl border border-monarq-line overflow-hidden h-[92dvh] sm:h-auto sm:max-h-[92dvh] flex flex-col text-monarq-ink"
        >
          <div aria-hidden="true" className="flex shrink-0 justify-center py-2.5 sm:hidden">
            <div className="h-1 w-9 rounded-full bg-monarq-ink/25" />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="relative">
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute top-3.5 right-3.5 z-20 w-11 h-11 rounded-full bg-monarq-ink/60 hover:bg-monarq-ink text-white backdrop-blur-md flex items-center justify-center transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Dish Image (if available) */}
              {item.image ? (
                <div className="relative w-full aspect-square bg-monarq-paper-dark overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-[center_40%]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-monarq-paper to-transparent" />
                </div>
              ) : (
                <div className="pt-8 px-6 bg-marble-pattern border-b border-monarq-line pb-4">
                  <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-monarq-gold-deep font-bold block">
                    MONARQ · Tanger
                  </span>
                </div>
              )}
            </div>

            {/* Body Content */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Badges */}
              {(item.popular || cleanTag || item.isVegetarian || item.isSpicy) && (
                <div className="flex flex-wrap gap-2">
                  {cleanTag && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-semibold bg-monarq-gold/15 text-monarq-gold-deep border border-monarq-gold/30">
                      <Sparkles className="w-3 h-3" />
                      {cleanTag}
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-semibold bg-emerald-900/10 text-emerald-800 border border-emerald-800/20">
                      <Leaf className="w-3 h-3" />
                      Végétarien
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-semibold bg-red-900/10 text-red-700 border border-red-700/20">
                      <Flame className="w-3 h-3" />
                      Épicé
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-baseline justify-between gap-4">
                <h3 id="dish-detail-title" className="min-w-0 break-words font-serif text-2xl sm:text-3xl text-monarq-ink font-bold uppercase tracking-wide leading-tight">
                  {item.name}
                </h3>
                <span className="font-sans text-lg sm:text-xl font-bold text-monarq-gold-deep tabular-nums whitespace-nowrap flex-shrink-0">
                  {item.price} DH
                </span>
              </div>

              {item.description ? (
                <p className="font-sans text-base text-monarq-ink-soft font-normal leading-relaxed">
                  {item.description}
                </p>
              ) : (
                <p className="font-sans text-base leading-relaxed text-monarq-ink-muted italic">
                  Préparé à la commande avec des ingrédients frais et de saison.
                </p>
              )}

              <div className="pt-3 border-t border-monarq-line">
                <div className="flex items-center gap-2 text-xs text-monarq-ink-soft font-sans">
                  <span
                    className="w-1.5 h-1.5 bg-monarq-gold inline-block flex-shrink-0"
                    style={{ transform: 'rotate(45deg)' }}
                  />
                  <span>Préparation minute · Produits frais</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Stepper & Add Button */}
          <div className="sticky bottom-0 flex shrink-0 items-center gap-2 border-t border-monarq-line bg-monarq-paper-soft px-3 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:gap-3 sm:px-5 sm:pt-5">
            {/* Stepper */}
            <div className="flex items-center border border-monarq-line bg-monarq-paper rounded-full p-1 shadow-sm">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity === 0}
                aria-label="Diminuer la quantité"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  quantity === 0
                    ? 'text-monarq-ink-muted/40 cursor-not-allowed'
                    : 'text-monarq-ink hover:bg-monarq-paper-dark active:scale-95'
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center sm:w-10 font-sans font-bold text-base tabular-nums text-monarq-ink">
                {currentQty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Augmenter la quantité"
                className="w-9 h-9 rounded-full bg-monarq-gold/15 text-monarq-gold-deep hover:bg-monarq-gold/25 active:scale-95 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={handleAddOrSave}
              className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-2 gap-y-0.5 rounded-full btn-dark px-3 py-3 text-xs font-semibold uppercase tracking-wider sm:px-5"
            >
              <span className="flex items-center gap-1.5">
                {quantity > 0 ? (
                  <>
                    <Check className="hidden w-4 h-4 text-monarq-gold-light min-[400px]:block" />
                    <span>Mettre à jour</span>
                  </>
                ) : (
                  <span>Ajouter</span>
                )}
              </span>
              <span className="font-sans font-bold text-monarq-gold-light tabular-nums tracking-normal whitespace-nowrap">
                {item.price * currentQty} DH
              </span>
            </button>

            {quantity > 0 && (
              <button
                type="button"
                onClick={() => {
                  onUpdateQuantity(0);
                  onClose();
                }}
                title="Retirer de la sélection"
                aria-label="Retirer de la sélection"
                className="w-11 h-11 rounded-full border border-monarq-line bg-monarq-paper text-monarq-ink-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
