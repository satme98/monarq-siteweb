import React, { useState, useMemo } from 'react';
import { Search, Download, ArrowRight } from 'lucide-react';
import { menuChapters } from '../data/menuData';
import { siteConfig } from '../data/siteConfig';
import { FadeUp, StaggerGroup, StaggerItem, FadeIn } from '../components/Animations';

export default function MenuPage() {
  const [activeChapter, setActiveChapter] = useState(menuChapters[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(activeFilter === filter ? 'all' : filter);
  };

  const filteredChapters = useMemo(() => {
    if (!searchQuery && activeFilter === 'all') return menuChapters;

    return menuChapters.map(chapter => {
      const filteredCategories = chapter.categories.map(category => {
        const filteredItems = category.items.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
          const matchesFilter = activeFilter === 'all' || 
                                (activeFilter === 'spicy' && item.isSpicy) || 
                                (activeFilter === 'veg' && item.isVegetarian) ||
                                (activeFilter === 'signature' && item.tag);
          
          return matchesSearch && matchesFilter;
        });
        return { ...category, items: filteredItems };
      }).filter(category => category.items.length > 0);

      return { ...chapter, categories: filteredCategories };
    }).filter(chapter => chapter.categories.length > 0);
  }, [searchQuery, activeFilter]);

  // Determine which chapters to show
  const displayChapters = (searchQuery || activeFilter !== 'all') 
    ? filteredChapters 
    : filteredChapters.filter(c => c.id === activeChapter);

  return (
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full py-20 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-monarq-paper bg-marble-pattern">

        <FadeUp className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold tracking-wide uppercase text-monarq-ink">
            Notre Carte
          </h1>
          <p className="font-sans text-monarq-ink-soft text-lg sm:text-xl font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Une exploration culinaire où les traditions marocaines rencontrent l'élégance contemporaine.
          </p>
        </FadeUp>
      </section>

      {/* Sticky Navigation & Filters */}
      <div className="sticky top-20 z-40 bg-monarq-paper/95 backdrop-blur-md border-y border-monarq-line shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Chapter Tabs */}
          <nav className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0">
            {menuChapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapter(chapter.id);
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className={`whitespace-nowrap font-sans text-xs sm:text-sm tracking-[0.22em] uppercase pb-1.5 border-b-2 transition-all duration-300 font-semibold ${
                  activeChapter === chapter.id && !searchQuery && activeFilter === 'all'
                    ? 'border-monarq-gold text-monarq-ink'
                    : 'border-transparent text-monarq-ink-soft hover:text-monarq-ink'
                }`}
              >
                {chapter.title}
              </button>
            ))}
          </nav>

          {/* Search & Filters */}
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                placeholder="Rechercher un plat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-monarq-line py-1.5 pl-7 pr-2 font-sans text-sm sm:text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/60"
              />
              <Search className="absolute left-0 top-2 w-4 h-4 text-monarq-gold-deep" />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleFilterChange('veg')}
                className={`px-3.5 py-1.5 text-xs font-sans font-semibold tracking-wider border rounded-full transition-colors ${
                  activeFilter === 'veg' ? 'bg-monarq-gold text-white border-monarq-gold shadow-sm' : 'border-monarq-line text-monarq-ink-soft hover:border-monarq-gold'
                }`}
              >
                Végétarien
              </button>
              <button 
                onClick={() => handleFilterChange('spicy')}
                className={`px-3.5 py-1.5 text-xs font-sans font-semibold tracking-wider border rounded-full transition-colors flex items-center gap-1.5 ${
                  activeFilter === 'spicy' ? 'bg-monarq-ink text-white border-monarq-ink shadow-sm' : 'border-monarq-line text-monarq-ink-soft hover:border-monarq-ink'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span> Épicé
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {displayChapters.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl sm:text-3xl text-monarq-ink-soft font-semibold">Aucun résultat ne correspond à votre recherche.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-6 inline-flex items-center gap-2 font-sans text-xs sm:text-sm tracking-[0.22em] uppercase text-monarq-ink hover:text-monarq-gold-deep font-semibold transition-colors group"
            >
              <span>Voir toute la carte</span>
              <ArrowRight className="w-4 h-4 text-monarq-gold-deep transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        ) : (
          <StaggerGroup className="space-y-32">
            {displayChapters.map((chapter) => (
              <StaggerItem key={chapter.id} className="space-y-24">
                
                {/* Chapter Header */}
                {(searchQuery || activeFilter !== 'all') && (
                  <div className="text-center border-b border-monarq-line pb-8 mb-12">
                    <h2 className="font-serif text-3xl sm:text-4xl text-monarq-gold-deep mb-2 font-semibold">{chapter.title}</h2>
                    <p className="font-sans text-xs sm:text-sm tracking-widest text-monarq-ink-muted uppercase font-semibold">{chapter.timeSlot}</p>
                  </div>
                )}

                {chapter.categories.map((category) => (
                  <section key={category.id} className="relative">
                    <div className="mb-12">
                      <h3 className="font-serif text-3xl sm:text-4xl text-monarq-ink font-semibold tracking-wide">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-3 font-sans text-monarq-ink-soft max-w-2xl text-base leading-relaxed font-normal">
                          {category.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
                      {category.items.map((item) => (
                        <div key={item.id} className="group">
                          <div className="flex items-baseline justify-between w-full">
                            <h4 className="font-serif text-xl sm:text-2xl text-monarq-ink flex items-center pr-4 bg-monarq-paper relative z-10 font-semibold group-hover:text-monarq-gold-deep transition-colors">
                              {item.name}
                              {item.isSpicy && (
                                <span className="ml-2 w-2 h-2 rounded-full bg-red-600 inline-block" title="Épicé"></span>
                              )}
                            </h4>
                            
                            {/* Dotted Leader */}
                            <div className="flex-grow border-b-2 border-dotted border-monarq-line mx-2 relative top-[-6px]"></div>
                            
                            <span className="font-sans text-base sm:text-lg text-monarq-gold-deep pl-4 bg-monarq-paper relative z-10 font-semibold">
                              {typeof item.price === 'number' ? `${item.price} DH` : item.price}
                            </span>
                          </div>
                          
                          {(item.description || item.tag) && (
                            <div className="mt-2 pr-8">
                              {item.description && (
                                <p className="font-sans text-sm sm:text-[15px] text-monarq-ink-soft font-normal leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                              {item.tag && (
                                <p className="font-serif italic text-monarq-gold-deep mt-1.5 text-sm font-medium">
                                  ✦ {item.tag}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </main>

      {/* Download PDF Link */}
      <FadeIn className="text-center py-12 border-t border-monarq-line max-w-xl mx-auto mt-12">
        <a 
          href="#" 
          className="inline-flex items-center justify-center gap-2.5 font-sans text-xs sm:text-sm tracking-[0.22em] uppercase text-monarq-ink hover:text-monarq-gold-deep font-semibold transition-colors group"
        >
          <Download className="w-4 h-4 text-monarq-gold transition-transform group-hover:-translate-y-1" />
          <span>Télécharger la Carte en PDF</span>
        </a>
      </FadeIn>
    </div>
  );
}
