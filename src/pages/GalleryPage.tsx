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
          <h1 className="font-serif text-5xl md:text-6xl font-light tracking-wide text-monarq-ink uppercase">
            Galerie Visuelle
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <p className="font-sans text-monarq-ink-soft text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Plongez dans l'univers de {siteConfig.name}. Un espace où le marbre rencontre la lumière, et où chaque plat est dressé avec précision.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.2} className="pt-4">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-monarq-ink-soft hover:text-monarq-gold transition-colors border-b border-transparent hover:border-monarq-gold pb-1"
          >
            <Instagram className="w-4 h-4" />
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
              className={`font-sans text-xs sm:text-sm uppercase tracking-widest pb-1 transition-all duration-300 ${
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
            const heightClasses = ['h-64', 'h-80', 'h-96', 'h-[28rem]'];
            const heightClass = heightClasses[index % heightClasses.length];
            
            return (
              <StaggerItem key={item.id} className="break-inside-avoid">
                <div
                  onClick={() => setSelectedImage(item.image)}
                  className={`group relative overflow-hidden bg-monarq-paper-soft cursor-pointer ${heightClass}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-monarq-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-6 text-white backdrop-blur-[2px]">
                    <p className="text-xs uppercase tracking-[0.2em] font-sans text-monarq-gold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
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
