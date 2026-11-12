import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { signatureHighlights } from '../data/menuData';

interface SignatureCarouselProps {
  onOpenMenu?: () => void;
}

export const SignatureCarousel: React.FC<SignatureCarouselProps> = ({ onOpenMenu }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = signatureHighlights.length;

  // ── Scroll to card by index ──────────────────────────────────────────────
  const scrollToIndex = useCallback((idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(idx, total - 1));
    setActiveIndex(clamped);
    const card = container.children[clamped] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
    }
  }, [total]);

  const goLeft  = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);
  const goRight = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);

  // ── Sync active index from scroll position ───────────────────────────────
  const syncIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const sl = container.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - 20 - sl);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    c.addEventListener('scroll', syncIndex, { passive: true });
    return () => c.removeEventListener('scroll', syncIndex);
  }, [syncIndex]);

  // ── Autoplay ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || isDragging) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = prev >= total - 1 ? 0 : prev + 1;
        const c = scrollRef.current;
        if (c) {
          const card = c.children[next] as HTMLElement | undefined;
          if (card) c.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
        }
        return next;
      });
    }, 4500);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [isPaused, isDragging, total]);

  // ── Desktop drag ─────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    startXRef.current = e.pageX;
    startScrollRef.current = scrollRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft = startScrollRef.current + (startXRef.current - e.pageX) * 1.2;
  };
  const onMouseUp = () => { setIsDragging(false); syncIndex(); };

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
    >
      {/* ── Left arrow ──────────────────────────────────────────────────── */}
      <button
        onClick={goLeft}
        disabled={activeIndex === 0}
        aria-label="Plat précédent"
        className="
          hidden sm:flex items-center justify-center
          absolute left-3 z-20
          w-9 h-9 rounded-full
          bg-white/85 backdrop-blur-sm
          border border-monarq-gold/30
          text-monarq-ink shadow-luxury
          hover:bg-monarq-gold hover:text-white hover:border-monarq-gold
          transition-all duration-250 active:scale-95
          disabled:opacity-25 disabled:pointer-events-none
          group
        "
        style={{ top: 'calc(50% - 1.5rem)' }}
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* ── Right arrow ─────────────────────────────────────────────────── */}
      <button
        onClick={goRight}
        disabled={activeIndex === total - 1}
        aria-label="Plat suivant"
        className="
          hidden sm:flex items-center justify-center
          absolute right-3 z-20
          w-9 h-9 rounded-full
          bg-white/85 backdrop-blur-sm
          border border-monarq-gold/30
          text-monarq-ink shadow-luxury
          hover:bg-monarq-gold hover:text-white hover:border-monarq-gold
          transition-all duration-250 active:scale-95
          disabled:opacity-25 disabled:pointer-events-none
          group
        "
        style={{ top: 'calc(50% - 1.5rem)' }}
      >
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* ── Scroll strip ────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => { setIsPaused(false); syncIndex(); }}
        className="
          flex gap-6
          overflow-x-auto
          no-scrollbar scrollbar-hide
          px-5 sm:px-10 lg:px-14
          pb-2 pt-1
          cursor-grab active:cursor-grabbing
          snap-x snap-mandatory
        "
        style={{ WebkitOverflowScrolling: 'touch', scrollPaddingLeft: '1.25rem' }}
      >
        {signatureHighlights.map((dish, i) => (
          <div
            key={`${dish.name}-${i}`}
            className="
              snap-start flex-shrink-0
              w-[calc(76vw-1.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]
              min-w-[190px] max-w-[270px]
              flex flex-col gap-3
              cursor-pointer group
            "
            onClick={onOpenMenu}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onOpenMenu?.()}
            aria-label={`Voir ${dish.name} dans la carte`}
          >
            {/* Photo */}
            <div
              className="w-full overflow-hidden flex-shrink-0"
              style={{ aspectRatio: '4/5', borderRadius: '16px' }}
            >
              <img
                src={dish.image}
                alt={dish.name}
                draggable={false}
                loading="lazy"
                className="
                  w-full h-full object-cover
                  transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-[1.04]
                "
                style={{ objectPosition: dish.objectPosition ?? 'center center' }}
              />
            </div>

            {/* Name */}
            <p
              className="
                text-center truncate
                font-editorial font-semibold
                transition-colors duration-200
                group-hover:text-monarq-gold-deep
              "
              style={{
                fontFamily: '"Cormorant Garamond", "Cormorant SC", Georgia, serif',
                fontSize: '20px',
                color: '#141210',
                lineHeight: 1.3,
              }}
            >
              {dish.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureCarousel;
