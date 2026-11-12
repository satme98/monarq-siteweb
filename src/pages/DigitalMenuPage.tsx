import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UtensilsCrossed,
} from 'lucide-react';
import { menuChapters } from '../data/menuData';
import { MenuItem, CartItem } from '../types';
import { FadeUp, FadeIn } from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { DishDetailModal } from '../components/digital-menu/DishDetailModal';
import { OrderDrawer } from '../components/digital-menu/OrderDrawer';

interface DigitalMenuPageProps {
  onSwitchToClassicMenu?: () => void;
}

const stripEmojis = (text?: string) =>
  text ? text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '').trim() : '';

export const DigitalMenuPage: React.FC<DigitalMenuPageProps> = ({ onSwitchToClassicMenu }) => {
  // Search query & active category (Glovo-style scroll-spy)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string>('');
  const barRef = useRef<HTMLDivElement>(null);
  const isManualScroll = useRef(false);

  // Detail Modal & Order Drawer states
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('monarq_digital_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('monarq_digital_cart', JSON.stringify(cart));
    } catch {
      // Storage fallback
    }
  }, [cart]);

  // Aggregate all items from all chapters
  const allItems = useMemo(() => {
    const list: MenuItem[] = [];
    menuChapters.forEach((chapter) => {
      chapter.categories.forEach((cat) => {
        cat.items.forEach((item) => {
          list.push({
            ...item,
            chapter: chapter.id,
            category: cat.id,
          });
        });
      });
    });
    return list;
  }, []);

  const isSignature = (item: MenuItem) => {
    const t = (item.tag || '').toLowerCase();
    return (
      !!item.popular ||
      t.includes('signature') ||
      t.includes('incontournable') ||
      t.includes('favori') ||
      t.includes('coup de cœur') ||
      t.includes('prestige') ||
      t.includes('chef')
    );
  };

  // Flat, Glovo-style category list (no chapter hierarchy)
  const sections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const match = (item: MenuItem) =>
      !q ||
      item.name.toLowerCase().includes(q) ||
      !!item.description?.toLowerCase().includes(q) ||
      !!item.tag?.toLowerCase().includes(q);

    const list: { id: string; name: string; description?: string; items: MenuItem[] }[] = [];
    const signatures = allItems.filter((i) => isSignature(i) && match(i));
    if (signatures.length > 0) {
      list.push({
        id: 'signatures',
        name: 'Signatures & Favoris',
        description: 'Nos créations incontournables plébiscitées par nos clients.',
        items: signatures,
      });
    }
    menuChapters.forEach((ch) => {
      ch.categories.forEach((cat) => {
        const items = allItems.filter((i) => i.category === cat.id && match(i));
        if (items.length > 0) {
          list.push({ id: cat.id, name: cat.name, description: cat.description, items });
        }
      });
    });
    return list;
  }, [searchQuery, allItems]);

  const totalMatchingCount = sections.reduce((acc, s) => acc + s.items.length, 0);

  const toTitle = (name: string) => {
    const t = name.toLowerCase();
    return t.charAt(0).toUpperCase() + t.slice(1);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById('menu-section-' + id);
    if (!el) return;
    isManualScroll.current = true;
    setActiveSection(id);
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
    window.setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  // Scroll-spy: highlight the category currently in view
  useEffect(() => {
    const onScroll = () => {
      if (isManualScroll.current) return;
      let current = sections[0]?.id || '';
      for (const s of sections) {
        const el = document.getElementById('menu-section-' + s.id);
        if (el && el.getBoundingClientRect().top <= 165) {
          current = s.id;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  // Keep the active pill centered in the horizontal bar
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !activeSection) return;
    const btn = bar.querySelector<HTMLElement>('[data-cat="' + activeSection + '"]');
    if (btn) {
      bar.scrollTo({
        left: btn.offsetLeft - bar.clientWidth / 2 + btn.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  const scrollBar = (dir: number) => {
    barRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  // Cart helper functions
  const getItemQuantity = (itemId: string): number => {
    const found = cart.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((c) => c.item.id !== itemId));
    } else {
      setCart((prev) => {
        const index = prev.findIndex((c) => c.item.id === itemId);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], quantity: newQty };
          return updated;
        } else {
          const dish = allItems.find((d) => d.id === itemId);
          if (dish) {
            return [...prev, { item: dish, quantity: newQty }];
          }
          return prev;
        }
      });
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-20 sm:pt-24 pb-28">
      {/* ── Hero ─── */}
      <section className="bg-marble-pattern py-10 sm:py-12 md:py-16 px-5 sm:px-6 flex flex-col items-center justify-center text-center border-b border-monarq-line">
        <FadeUp delay={0.1}>
          <SectionEyebrow>Commande en Ligne</SectionEyebrow>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-2.5 leading-tight max-w-3xl">
            Menu Digital
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="font-sans text-monarq-ink-soft text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Sélectionnez vos créations favorites et commandez en livraison ou à emporter directement sur WhatsApp.
          </p>
        </FadeUp>

        {/* Search Input & Classic Menu Switch */}
        <FadeUp delay={0.4} className="w-full max-w-xl mt-6 space-y-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-monarq-gold-deep absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un plat, un ingrédient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-monarq-paper text-monarq-ink placeholder:text-monarq-ink-muted/60 font-sans text-sm shadow-luxury border border-monarq-line-strong/60 focus:outline-none focus:border-monarq-gold transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Effacer la recherche"
                className="absolute right-3.5 p-1 rounded-full hover:bg-monarq-paper-dark text-monarq-ink-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {onSwitchToClassicMenu && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={onSwitchToClassicMenu}
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-monarq-gold-deep hover:text-monarq-ink font-semibold transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Consulter la carte classique</span>
              </button>
            </div>
          )}
        </FadeUp>
      </section>

      {/* ── Sticky Glovo-style Single-Row Category Bar ─────────────────────── */}
      <div className="sticky top-[60px] sm:top-[64px] xl:top-[72px] z-30 bg-monarq-paper/95 backdrop-blur-md border-b border-monarq-line shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBar(-1)}
            aria-label="Défiler à gauche"
            className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full border border-monarq-line bg-monarq-paper hover:border-monarq-gold text-monarq-ink items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <nav
            ref={barRef}
            aria-label="Catégories du menu"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 flex-1 relative"
          >
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  data-cat={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors border ${
                    isActive
                      ? 'bg-monarq-ink text-monarq-paper border-monarq-ink shadow-sm'
                      : 'bg-monarq-paper-soft border-monarq-line text-monarq-ink-soft hover:border-monarq-gold/60 hover:text-monarq-ink'
                  }`}
                >
                  {s.id === 'signatures' && <Sparkles className="w-3.5 h-3.5 text-monarq-gold" />}
                  <span>{toTitle(s.name)}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => scrollBar(1)}
            aria-label="Défiler à droite"
            className="hidden md:flex flex-shrink-0 w-8 h-8 rounded-full border border-monarq-line bg-monarq-paper hover:border-monarq-gold text-monarq-ink items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Main Dish Listing ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12">
        {totalMatchingCount === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center space-y-3 bg-monarq-paper-soft rounded-2xl border border-monarq-line">
            <UtensilsCrossed className="w-8 h-8 text-monarq-gold/60" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-monarq-ink">
              Aucun plat trouvé
            </h3>
            <p className="font-sans text-xs sm:text-sm text-monarq-ink-soft max-w-sm">
              Essayez un autre terme de recherche.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 px-6 py-2.5 rounded-full btn-dark text-xs uppercase tracking-[0.18em] font-semibold"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={'menu-section-' + section.id} className="scroll-mt-36">
                {/* Category Header */}
                <div className="mb-5 sm:mb-6 pb-3 border-b border-monarq-line">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-serif text-2xl sm:text-3xl text-monarq-ink font-bold tracking-wide uppercase flex items-center gap-2.5">
                      {section.id === 'signatures' && <Sparkles className="w-5 h-5 text-monarq-gold flex-shrink-0" />}
                      <span>{section.name}</span>
                    </h2>
                    <span className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink-muted tabular-nums flex-shrink-0">
                      {section.items.length} {section.items.length > 1 ? 'plats' : 'plat'}
                    </span>
                  </div>
                  {section.description && (
                    <p className="mt-1.5 font-sans text-sm text-monarq-ink-soft leading-relaxed max-w-2xl">
                      {section.description}
                    </p>
                  )}
                </div>

                {/* Dish Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                  {section.items.map((item) => {
                    const qty = getItemQuantity(item.id);
                    const cleanTag = stripEmojis(item.tag);

                    return (
                      <div
                        key={section.id + '-' + item.id}
                        className={`group rounded-2xl p-4 sm:p-5 border transition-colors duration-200 flex flex-col justify-between ${
                          qty > 0
                            ? 'bg-monarq-paper-soft border-monarq-gold/65 shadow-luxury'
                            : 'bg-monarq-white/80 hover:bg-monarq-white border-monarq-line/80 hover:border-monarq-gold/40 shadow-sm'
                        }`}
                      >
                        {/* Top Zone: Dish Info + Clean Unobscured Thumbnail */}
                        <div
                          onClick={() => setDetailItem(item)}
                          className="cursor-pointer flex items-start justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-serif text-[18px] sm:text-[20px] text-monarq-ink font-bold group-hover:text-monarq-gold-deep transition-colors leading-snug uppercase tracking-wide">
                                {item.name}
                              </h3>
                              {item.isSpicy && (
                                <span
                                  className="w-2 h-2 rounded-full bg-red-600 inline-block flex-shrink-0"
                                  title="Épicé"
                                />
                              )}
                              {item.isVegetarian && (
                                <span
                                  className="w-2 h-2 rounded-full bg-emerald-600 inline-block flex-shrink-0"
                                  title="Végétarien"
                                />
                              )}
                            </div>

                            {cleanTag && (
                              <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-[0.14em] font-semibold bg-monarq-gold/15 text-monarq-gold-deep border border-monarq-gold/25">
                                {cleanTag}
                              </span>
                            )}

                            {item.description && (
                              <p className="mt-2 font-sans text-[13.5px] sm:text-[14px] text-monarq-ink-soft font-normal leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {item.image && (
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-monarq-line/70 bg-monarq-paper-dark shadow-sm">
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {/* Bottom Zone: Dedicated Footer Bar (Price on Left, Controls on Right — Never Overlapping Image) */}
                        <div className="mt-4 pt-3 border-t border-monarq-line/50 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="font-sans text-[15px] sm:text-base text-monarq-gold-deep font-bold tabular-nums">
                              {typeof item.price === 'number' ? `${item.price} DH` : item.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => setDetailItem(item)}
                              className="font-sans text-[11px] uppercase tracking-[0.14em] text-monarq-ink-muted hover:text-monarq-gold-deep font-semibold transition-colors"
                            >
                              Détails
                            </button>
                          </div>

                          {qty === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="px-4 py-1.5 rounded-full bg-monarq-ink hover:bg-monarq-black active:scale-95 text-monarq-paper font-sans text-[11px] uppercase tracking-[0.16em] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5 text-monarq-gold-light" />
                              <span>Ajouter</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <div className="flex items-center border border-monarq-gold/60 bg-monarq-paper rounded-full p-0.5 shadow-sm">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, qty - 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-monarq-ink hover:bg-monarq-paper-dark transition-colors"
                                  aria-label="Diminuer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center font-sans font-bold text-xs tabular-nums text-monarq-ink">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, qty + 1)}
                                  className="w-7 h-7 rounded-full bg-monarq-gold/20 text-monarq-gold-deep hover:bg-monarq-gold/30 transition-colors flex items-center justify-center"
                                  aria-label="Augmenter"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.id, 0)}
                                title="Retirer de la sélection"
                                aria-label={`Retirer ${item.name} de la sélection`}
                                className="w-7 h-7 rounded-full border border-monarq-line bg-monarq-paper text-monarq-ink-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom ornament ────────────────────── */}
      <FadeIn>
        <div className="flex flex-col items-center gap-3 py-8 sm:py-10 border-t border-monarq-line px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 sm:w-10 bg-monarq-gold/40" />
            <span
              className="w-1.5 h-1.5 bg-monarq-gold/60 inline-block"
              style={{ transform: 'rotate(45deg)' }}
            />
            <span className="block h-px w-8 sm:w-10 bg-monarq-gold/40" />
          </div>
          <p className="font-serif italic text-monarq-ink-soft text-sm sm:text-base text-center leading-relaxed max-w-md font-medium">
            Tous nos plats sont préparés à la commande avec des produits frais et de saison.
          </p>
        </div>
      </FadeIn>

      {/* ── Floating Sticky Cart Bar ──────────────────────────────── */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-4 sm:bottom-6 left-4 right-4 max-w-lg mx-auto z-40"
          >
            <button
              type="button"
              onClick={() => setIsOrderOpen(true)}
              className="w-full py-3.5 px-5 rounded-full bg-monarq-ink text-monarq-paper border border-monarq-gold/50 shadow-2xl flex items-center justify-between backdrop-blur-xl group hover:bg-monarq-black transition-all active:scale-[0.99]"
            >
              {/* Left: Cart badge & count */}
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-monarq-gold text-white flex items-center justify-center shadow-md">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-monarq-paper text-monarq-ink font-sans font-bold text-[10px] border border-monarq-gold flex items-center justify-center shadow-sm tabular-nums">
                    {totalCartCount}
                  </span>
                </div>

                <div className="text-left">
                  <p className="font-serif font-bold text-base uppercase tracking-wider text-white leading-tight">
                    Votre Sélection
                  </p>
                  <p className="font-sans text-[11px] text-monarq-paper/80">
                    {totalCartCount} article{totalCartCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Right: Total & Arrow */}
              <div className="flex items-center gap-2.5">
                <span className="font-sans font-bold text-base text-monarq-gold-light tabular-nums">
                  {totalCartPrice} DH
                </span>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Dish Detail Modal ────────────────────────────────────── */}
      <DishDetailModal
        item={detailItem}
        quantity={detailItem ? getItemQuantity(detailItem.id) : 0}
        onClose={() => setDetailItem(null)}
        onUpdateQuantity={(newQty) => {
          if (detailItem) {
            handleUpdateQuantity(detailItem.id, newQty);
          }
        }}
      />

      {/* ── Order Drawer / WhatsApp Summary ───────────────────────── */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default DigitalMenuPage;
