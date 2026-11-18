import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Sparkles, Flame, Leaf, Check } from 'lucide-react';
import { MenuItem, MenuExtra, PastaType } from '../../types';
import { Language } from '../../i18n/types';
import { useLanguage } from '../../i18n';
import { lineTotal, extraLabels, needsPastaType, pastaLabels, pastaTypes } from '../../lib/menuOrder';

interface DishDetailModalProps {
  item: MenuItem;
  lang: Language;
  options: MenuExtra[];
  initialQuantity: number;
  initialPastaType?: PastaType;
  initialExtras: MenuExtra[];
  editing: boolean;
  onClose: () => void;
  onSave: (quantity: number, extras: MenuExtra[], pastaType?: PastaType) => void;
}

const stripEmojis = (text?: string) =>
  text ? text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim() : '';

const choiceSurface =
  'min-h-11 border border-monarq-line bg-monarq-white/80 transition-colors group-hover:border-monarq-gold/60 peer-checked:border-monarq-gold/70 peer-checked:bg-monarq-paper-soft peer-focus-visible:ring-2 peer-focus-visible:ring-monarq-gold-deep peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-monarq-paper';

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  lang, options, initialQuantity, initialPastaType, initialExtras, editing, onClose, onSave,
}) => {
  const { t } = useLanguage();
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const [pastaType, setPastaType] = React.useState(initialPastaType);
  const missingPastaType = needsPastaType({ item, quantity, pastaType });
  const [selected, setSelected] = React.useState(initialExtras.map(({ id }) => id));
  const extras = options.filter(({ id }) => selected.includes(id));
  const cleanTag = stripEmojis(item.tag);
  const labels = extraLabels[lang];

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
                aria-label={t.dishModal.closeAria}
                className="absolute top-3.5 end-3.5 z-20 w-11 h-11 rounded-full bg-monarq-ink/60 hover:bg-monarq-ink text-white backdrop-blur-md flex items-center justify-center transition-colors shadow-md"
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
                    MONARQ · {t.common.city}
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
                      {t.dishModal.vegetarian}
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-[0.14em] font-semibold bg-red-900/10 text-red-700 border border-red-700/20">
                      <Flame className="w-3 h-3" />
                      {t.dishModal.spicy}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-baseline justify-between gap-4">
                <h3 id="dish-detail-title" className="min-w-0 break-words font-serif text-2xl sm:text-3xl text-monarq-ink font-bold uppercase tracking-wide leading-tight">
                  {item.name}
                </h3>
                <span className="font-sans text-lg sm:text-xl font-bold text-monarq-gold-deep tabular-nums whitespace-nowrap flex-shrink-0">
                  {item.price} {t.common.currency}
                </span>
              </div>

              {item.description && (
                <p className="font-sans text-base text-monarq-ink-soft leading-relaxed">{item.description}</p>
              )}
              {item.category === 'pates' && (
                <fieldset className="min-w-0">
                  <legend className="mb-2.5 font-sans text-sm font-semibold text-monarq-ink">{pastaLabels[lang].required}</legend>
                  <div className="grid grid-cols-2 gap-2 min-[460px]:grid-cols-3">
                    {pastaTypes.map((type) => (
                      <label key={type} className="group block min-w-0 cursor-pointer">
                        <input
                          type="radio"
                          name="pasta-type"
                          value={type}
                          className="peer sr-only"
                          checked={pastaType === type}
                          onChange={() => setPastaType(type)}
                          required
                        />
                        <span className={`flex h-full items-center gap-2 rounded-full px-3 py-2 font-sans text-sm font-semibold ${choiceSurface}`}>
                          <span aria-hidden="true" className="grid size-4 shrink-0 place-items-center rounded-full border border-monarq-line-strong group-has-[:checked]:border-monarq-gold-deep">
                            <span className="size-2 rounded-full bg-monarq-gold-deep opacity-0 group-has-[:checked]:opacity-100" />
                          </span>
                          <span className="min-w-0 break-words">{type}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              {options.length > 0 && (
                <div className="border-t border-monarq-line pt-4">
                  <fieldset className="min-w-0">
                    <legend className="mb-2.5 font-sans text-sm font-semibold text-monarq-ink">{labels.optional}</legend>
                    <div className="space-y-2">
                      {options.map((extra) => (
                        <label key={extra.id} className="group block cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={selected.includes(extra.id)}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              setSelected((ids) => checked ? [...ids, extra.id] : ids.filter((id) => id !== extra.id));
                            }}
                          />
                          <span className={`flex items-center gap-2.5 rounded-xl px-3 py-2 font-sans text-sm ${choiceSurface}`}>
                            <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-md border border-monarq-line-strong group-has-[:checked]:border-monarq-gold-deep group-has-[:checked]:bg-monarq-gold-deep">
                              <Check className="size-3.5 text-white opacity-0 group-has-[:checked]:opacity-100" strokeWidth={2.5} />
                            </span>
                            <span className="min-w-0 flex-1 break-words font-medium">{extra.name}</span>
                            <bdi className="shrink-0 whitespace-nowrap rounded-full bg-monarq-paper-dark px-2 py-1 text-xs font-semibold tabular-nums text-monarq-gold-deep">
                              +{extra.price} {t.common.currency}
                            </bdi>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              <div className="pt-3 border-t border-monarq-line">
                <div className="flex items-center gap-2 text-xs text-monarq-ink-soft font-sans">
                  <span
                    className="w-1.5 h-1.5 bg-monarq-gold inline-block flex-shrink-0"
                    style={{ transform: 'rotate(45deg)' }}
                  />
                  <span>{t.dishModal.prepMinuteBadge}</span>
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
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity === 1}
                aria-label={t.dishModal.decreaseAria}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  quantity === 1
                    ? 'text-monarq-ink-muted/40 cursor-not-allowed'
                    : 'text-monarq-ink hover:bg-monarq-paper-dark active:scale-95'
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center sm:w-10 font-sans font-bold text-base tabular-nums text-monarq-ink">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label={t.dishModal.increaseAria}
                className="w-9 h-9 rounded-full bg-monarq-gold/15 text-monarq-gold-deep hover:bg-monarq-gold/25 active:scale-95 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action button */}
            <button
              type="button"
              disabled={missingPastaType}
              onClick={() => onSave(quantity, extras, pastaType)}
              className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-2 gap-y-0.5 rounded-full btn-dark px-3 py-3 text-xs font-semibold uppercase tracking-wider sm:px-5"
            >
              <span className="flex items-center gap-1.5">
                {editing ? (
                  <>
                    <Check className="hidden w-4 h-4 text-monarq-gold-light min-[400px]:block" />
                    <span>{labels.save}</span>
                  </>
                ) : (
                  <span>{labels.add}</span>
                )}
              </span>
              <span className="font-sans font-bold text-monarq-gold-light tabular-nums tracking-normal whitespace-nowrap">
                <span aria-live="polite">{lineTotal({ item, quantity, extras })} {t.common.currency}</span>
              </span>
            </button>

            {editing && (
              <button
                type="button"
                onClick={() => {
                  onSave(0, extras);
                }}
                title={t.dishModal.removeTitle}
                aria-label={t.dishModal.removeTitle}
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
