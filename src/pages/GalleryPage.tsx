import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X, ArrowUpRight } from 'lucide-react';
import { galleryItems } from '../data/galleryData';
import { siteConfig } from '../data/siteConfig';
import { FadeUp, EASE_MONARCH } from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Photos' },
    { id: 'lieu', label: 'Le Lieu & Marbre' },
    { id: 'brunch', label: 'Grands Brunchs' },
    { id: 'cuisine', label: 'La Cuisine' },
    { id: 'douceurs', label: 'Café & Douceurs' },
    { id: 'atmosphere', label: 'Atmosphère' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-monarq-paper min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20 text-monarq-ink">
      
      {/* Editorial Header */}
      <section className="max-w-3xl mx-auto px-5 sm:px-6 text-center space-y-3.5 sm:space-y-4 md:space-y-5 mb-8 sm:mb-10 md:mb-12">
        <FadeUp>
          <SectionEyebrow>Galerie</SectionEyebrow>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-monarq-ink uppercase">
            L'Univers MONARQ
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <p className="font-sans text-monarq-ink-soft text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
            L'élégance de notre décor, l'atmosphère de nos salles et la beauté de nos créations en images.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.2} className="pt-1 sm:pt-2">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors pb-1 border-b border-monarq-gold/40 hover:border-monarq-ink group"
          >
            <Instagram className="w-4 h-4 text-monarq-gold" />
            <span>Suivez notre actualité sur Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </FadeUp>
      </section>

      {/* Category Filter Links */}
      <FadeUp delay={0.25} className="max-w-5xl mx-auto px-5 sm:px-6 mb-8 sm:mb-10">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 border-b border-monarq-gold/20 pb-3 sm:pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-xs sm:text-sm uppercase tracking-[0.22em] pb-1.5 transition-all duration-200 ease-monarch font-semibold ${
                activeCategory === cat.id
                  ? 'text-monarq-ink border-b-2 border-monarq-gold'
                  : 'text-monarq-ink-soft hover:text-monarq-ink border-b-2 border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const heightClasses = ['h-64 sm:h-72', 'h-72 sm:h-80', 'h-80 sm:h-96', 'h-72 sm:h-[26rem]'];
              const heightClass = heightClasses[index % heightClasses.length];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="break-inside-avoid mb-4 sm:mb-5"
                >
                  <div
                    onClick={() => setSelectedImage(item.image)}
                    className={`group relative overflow-hidden rounded-2xl bg-monarq-paper-soft cursor-pointer shadow-luxury border border-monarq-gold/20 ${heightClass}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-monarch group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-monarq-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-monarch flex flex-col justify-center items-center text-center p-6 text-white backdrop-blur-[2px]">
                      <p className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-monarq-gold-light mb-2">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-monarq-ink/95 flex items-center justify-center p-4 sm:p-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_MONARCH as unknown as number[] }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Fermer"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              src={selectedImage}
              alt="Vue agrandie"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_MONARCH as unknown as number[] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
