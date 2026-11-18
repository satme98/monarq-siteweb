import { Minus, Plus, X } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface QuantityControlsProps {
  name: string;
  quantity: number;
  onChange: (quantity: number) => void;
}

export function QuantityControls({ name, quantity, onChange }: QuantityControlsProps) {
  const { t } = useLanguage();
  const { decreaseAria, increaseAria, removeTitle } = t.digitalMenu;

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <div className="flex items-center rounded-full border border-monarq-gold/60 bg-monarq-paper p-0.5 shadow-sm">
        <button
          type="button"
          onClick={() => onChange(quantity - 1)}
          className="flex size-11 items-center justify-center rounded-full text-monarq-ink transition-colors hover:bg-monarq-paper-dark"
          aria-label={decreaseAria}
        >
          <Minus className="size-3" />
        </button>
        <span className="min-w-7 px-0.5 text-center font-sans text-xs font-bold tabular-nums text-monarq-ink">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => onChange(quantity + 1)}
          className="flex size-11 items-center justify-center rounded-full bg-monarq-gold/20 text-monarq-gold-deep transition-colors hover:bg-monarq-gold/30"
          aria-label={increaseAria}
        >
          <Plus className="size-3" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => onChange(0)}
        title={removeTitle}
        aria-label={`${removeTitle} — ${name}`}
        className="flex size-11 items-center justify-center rounded-full border border-monarq-line bg-monarq-paper text-monarq-ink-muted shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
