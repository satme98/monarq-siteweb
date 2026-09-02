import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { signatureHighlights } from '../data/menuData';

interface SignatureCarouselProps {
  onOpenMenu?: () => void;
}

export const SignatureCarousel: React.FC<SignatureCarouselProps> = ({ onOpenMenu }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Smooth manual step navigation
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 280;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' ? currentScroll - cardWidth : currentScroll + cardWidth;
    
    posRef.current = targetScroll;
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Continuous buttery-smooth high-speed auto-scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initialize posRef with current scroll position
    posRef.current = container.scrollLeft;

    let animationFrameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      // Guard against frame jump after tab switch or long idle
      const delta = Math.min(now - lastTime, 64);
      lastTime = now;

      if (!isPaused && !isDragging && container) {
        // Balanced, ultra-fluid drift (~120px/s)
        posRef.current += delta * 0.12;

        // Seamless infinite loop wrap-around logic
        const maxHalf = container.scrollWidth / 2;
        if (maxHalf > 0) {
          if (posRef.current >= maxHalf) {
            posRef.current -= maxHalf;
          } else if (posRef.current <= 0) {
            posRef.current += maxHalf;
          }
        }

        container.scrollLeft = posRef.current;
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
    posRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    posRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      posRef.current = scrollRef.current.scrollLeft;
    }
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
        if (scrollRef.current) {
          posRef.current = scrollRef.current.scrollLeft;
        }
      }}
    >
      {/* Top Controls Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-monarq-gold font-serif text-xs uppercase tracking-[0.25em] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-monarq-gold" />
          <span>{signatureHighlights.length} Créations d’Exception</span>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scroll('left')}
            aria-label="Plat précédent"
            className="w-9 h-9 rounded-full border border-monarq-gold/35 bg-monarq-paper/90 backdrop-blur-sm flex items-center justify-center text-monarq-ink hover:bg-monarq-gold hover:text-white hover:border-monarq-gold transition-all duration-300 active:scale-95 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Plat suivant"
            className="w-9 h-9 rounded-full border border-monarq-gold/35 bg-monarq-paper/90 backdrop-blur-sm flex items-center justify-center text-monarq-ink hover:bg-monarq-gold hover:text-white hover:border-monarq-gold transition-all duration-300 active:scale-95 group"
          >
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Gallery Strip Container with NO visible scrollbar */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 px-6 sm:px-8 lg:px-12 cursor-grab active:cursor-grabbing pb-3 pt-1 will-change-scroll"
        style={{ scrollBehavior: 'auto' }}
      >
        {carouselItems.map((dish, i) => (
          <div
            key={`${dish.name}-${i}`}
            onClick={onOpenMenu}
            className="w-[235px] sm:w-[255px] md:w-[275px] flex-shrink-0 flex flex-col bg-monarq-paper/40 hover:bg-monarq-paper/80 border border-monarq-gold/30 hover:border-monarq-gold/75 rounded-none sm:rounded-[2px] p-2.5 sm:p-3 transition-colors duration-300 ease-monarch cursor-pointer group"
          >
            {/* Dominant Image Container — Locked 4:5 Aspect Ratio & Hairline Inset Frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-monarq-paper-soft border border-monarq-gold/20 group-hover:border-monarq-gold/45 transition-colors duration-500 rounded-none sm:rounded-[1px] flex-shrink-0">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-monarch group-hover:scale-[1.035] filter contrast-[1.02] brightness-[0.99] saturate-[1.03]"
                draggable={false}
                loading="lazy"
              />
            </div>

            {/* Quiet Caption Directly Underneath — Tight Spacing */}
            <div className="flex flex-col pt-2.5 sm:pt-3 px-0.5">
              <span className="font-serif text-[10px] sm:text-[10.5px] uppercase tracking-[0.24em] font-medium text-monarq-gold-deep truncate leading-none mb-1">
                {dish.category}
              </span>
              <h3 className="font-serif text-[14.5px] sm:text-base text-monarq-ink font-semibold leading-tight tracking-wide truncate group-hover:text-monarq-gold-deep transition-colors">
                {dish.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignatureCarousel;
