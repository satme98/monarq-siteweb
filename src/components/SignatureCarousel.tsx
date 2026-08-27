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

  // Smooth manual step navigation
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 280;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' ? currentScroll - cardWidth : currentScroll + cardWidth;
    
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Continuous subtle infinite auto-scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isPaused && !isDragging && container) {
        // Smooth dynamic drift: ~75px per second
        container.scrollLeft += (delta * 0.075);

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
            className="w-9 h-9 rounded-full border border-monarq-gold/30 bg-white/90 backdrop-blur-sm flex items-center justify-center text-monarq-ink hover:bg-monarq-gold hover:text-white hover:border-monarq-gold transition-all duration-300 shadow-sm hover:shadow-luxury active:scale-95 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Plat suivant"
            className="w-9 h-9 rounded-full border border-monarq-gold/30 bg-white/90 backdrop-blur-sm flex items-center justify-center text-monarq-ink hover:bg-monarq-gold hover:text-white hover:border-monarq-gold transition-all duration-300 shadow-sm hover:shadow-luxury active:scale-95 group"
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
        className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0 px-6 sm:px-8 lg:px-12 cursor-grab active:cursor-grabbing pb-4 pt-1"
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {carouselItems.map((dish, i) => (
          <div
            key={`${dish.name}-${i}`}
            onClick={onOpenMenu}
            className="w-[230px] sm:w-[250px] md:w-[270px] flex-shrink-0 flex flex-col bg-white/90 backdrop-blur-md p-2.5 sm:p-3 pb-3.5 sm:pb-4 border border-monarq-gold/20 hover:border-monarq-gold/50 rounded-2xl transition-all duration-300 ease-monarch hover:-translate-y-1.5 group shadow-sm hover:shadow-luxury cursor-pointer"
          >
            {/* Dominant Image Container — Tall 4:5 Aspect Ratio */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden mb-3 bg-monarq-paper-soft border border-monarq-gold/15 flex-shrink-0">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.04]"
                draggable={false}
              />
              {dish.tag && (
                <div className="absolute top-2.5 left-2.5 bg-monarq-paper/95 backdrop-blur-md text-monarq-gold-deep text-[8.5px] uppercase tracking-[0.2em] font-serif font-semibold px-2 py-0.5 rounded-full border border-monarq-gold/30 shadow-sm">
                  {dish.tag}
                </div>
              )}
            </div>

            {/* Quiet Caption Underneath */}
            <div className="flex flex-col px-1">
              <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] font-serif font-semibold text-monarq-gold truncate mb-0.5">
                {dish.category}
              </span>
              <h3 className="font-serif text-sm sm:text-base text-monarq-ink font-semibold leading-snug truncate group-hover:text-monarq-gold-deep transition-colors">
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
