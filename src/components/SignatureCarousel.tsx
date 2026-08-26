import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { signatureHighlights } from '../data/menuData';

interface SignatureCarouselProps {
  onOpenMenu?: () => void;
}

export const SignatureCarousel: React.FC<SignatureCarouselProps> = ({ onOpenMenu }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Smooth manual navigation
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 360;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' ? currentScroll - cardWidth : currentScroll + cardWidth;
    
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Continuous subtle infinite auto-scroll when not hovered or dragged
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isPaused && !isDragging && container) {
        // Slow luxury drift: ~32px per second
        container.scrollLeft += (delta * 0.032);

        // Infinite loop wrap-around logic
        const maxHalf = container.scrollWidth / 2;
        if (container.scrollLeft >= maxHalf) {
          container.scrollLeft -= maxHalf;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += maxHalf;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Duplicate items to ensure seamless infinite scroll wrap
  const carouselItems = [...signatureHighlights, ...signatureHighlights];

  return (
    <div 
      className="relative w-full overflow-hidden select-none py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
    >
      {/* Top Controls Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-monarq-gold font-serif text-xs uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-monarq-gold" />
          <span>{signatureHighlights.length} Créations d’Exception</span>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            aria-label="Plat précédent"
            className="w-10 h-10 rounded-full border border-monarq-gold/40 bg-white/90 backdrop-blur-sm flex items-center justify-center text-monarq-ink hover:bg-monarq-gold hover:text-white hover:border-monarq-gold transition-all duration-300 shadow-sm hover:shadow-luxury active:scale-95 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Plat suivant"
            className="w-10 h-10 rounded-full border border-monarq-gold/40 bg-white/90 backdrop-blur-sm flex items-center justify-center text-monarq-ink hover:bg-monarq-gold hover:text-white hover:border-monarq-gold transition-all duration-300 shadow-sm hover:shadow-luxury active:scale-95 group"
          >
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className="flex gap-6 sm:gap-7 overflow-x-auto scrollbar-hide px-6 sm:px-8 lg:px-12 cursor-grab active:cursor-grabbing pb-6 pt-1"
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {carouselItems.map((dish, i) => (
          <div
            key={`${dish.name}-${i}`}
            className="w-[290px] sm:w-[330px] md:w-[350px] flex-shrink-0 flex flex-col bg-[#FCFAF6]/95 backdrop-blur-md p-5 sm:p-6 pb-8 sm:pb-9 border border-monarq-gold/30 hover:border-monarq-gold/65 rounded-sm transition-all duration-300 group shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-luxury"
          >
            {/* Image Container — Locked 4:3 Aspect Ratio with Architectural Hairline Frame */}
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden mb-5 bg-monarq-paper-soft border border-monarq-gold/20 flex-shrink-0">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                draggable={false}
              />
              {dish.tag && (
                <div className="absolute top-3 left-3 bg-monarq-paper/95 backdrop-blur-md text-monarq-gold-deep text-[9px] uppercase tracking-[0.22em] font-serif font-semibold px-2.5 py-1 rounded-sm border border-monarq-gold/35">
                  {dish.tag}
                </div>
              )}
            </div>

            {/* Content Container — Tightened vertical rhythm */}
            <div className="flex flex-col flex-grow">
              {/* Category */}
              <div className="mb-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-serif font-bold text-monarq-gold truncate block">
                  {dish.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl text-monarq-ink font-semibold leading-snug mb-2 truncate group-hover:text-monarq-gold-deep transition-colors">
                {dish.name}
              </h3>

              {/* Clamped 3-line Description with natural breathing space */}
              <p className="text-xs sm:text-[13px] text-monarq-ink-soft leading-relaxed line-clamp-3 font-light">
                {dish.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureCarousel;
