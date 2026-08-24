import React, { useState } from 'react';
import { Instagram, X } from 'lucide-react';
import { galleryItems } from '../data/galleryData';
import { siteConfig } from '../data/siteConfig';
import { FadeUp, StaggerGroup, StaggerItem } from '../components/Animations';

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
    <div className="bg-monarq-paper min-h-screen pt-32 pb-24 text-monarq-ink">
      
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8 mb-20">
        <FadeUp>
          <span className="section-label block mb-3">Portfolio Photographique</span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-monarq-ink uppercase">
            Galerie Visuelle
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <p className="font-sans text-monarq-ink-soft text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Plongez dans l'univers de {siteConfig.name}. Un espace où le marbre rencontre la lumière, et où chaque plat est dressé avec une précision artistique.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.2} className="pt-2">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold text-monarq-gold-deep hover:text-monarq-ink transition-colors border-b border-monarq-gold/40 hover:border-monarq-ink pb-1"
          >
            <Instagram className="w-4 h-4 text-monarq-gold" />
            <span>Découvrir {siteConfig.instagramHandle}</span>
          </a>
        </FadeUp>
      </section>

      {/* Category Links */}
      <FadeUp delay={0.3} className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-xs sm:text-sm uppercase tracking-[0.22em] pb-1.5 transition-all duration-300 font-semibold ${
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

      {/* Staggered Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <StaggerGroup className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => {
            // Determine height class to simulate masonry
            const heightClasses = ['h-72', 'h-88', 'h-96', 'h-[30rem]'];
            const heightClass = heightClasses[index % heightClasses.length];
            
            return (
              <StaggerItem key={item.id} className="break-inside-avoid">
                <div
                  onClick={() => setSelectedImage(item.image)}
                  className={`group relative overflow-hidden rounded-2xl bg-monarq-paper-soft cursor-pointer shadow-luxury border border-monarq-gold/20 ${heightClass}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-monarq-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-6 text-white backdrop-blur-[2px]">
                    <p className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-monarq-gold-light mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-monarq-ink/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Vue agrandie"
            className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
