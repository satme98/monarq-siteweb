import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { PageTransition } from './components/Animations';
import { HomePage } from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AtmospherePage from './pages/AtmospherePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import { initLenis } from './lib/animation';
import { siteConfig } from './data/siteConfig';
import { MaintenancePage } from './pages/MaintenancePage';
import { Lock } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('monarq_maintenance_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const isMaintenance = Boolean(siteConfig.maintenance?.enabled && !isUnlocked);

  const handleLockAgain = () => {
    try {
      localStorage.removeItem('monarq_maintenance_unlocked');
    } catch {
      // Storage fallback
    }
    setIsUnlocked(false);
  };

  // Initialise Lenis smooth scroll once when site is active (wired to GSAP ticker)
  // Skipped automatically when prefers-reduced-motion is active
  useEffect(() => {
    if (isMaintenance) return;
    const cleanup = initLenis();
    return cleanup;
  }, [isMaintenance]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (isMaintenance) {
    return <MaintenancePage onUnlock={() => setIsUnlocked(true)} />;
  }


  return (
    <div className="min-h-screen flex flex-col bg-monarq-paper text-monarq-ink relative">
      {/* Navigation Globale */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Router with Cinematic Multi-layer Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'accueil' && (
            <PageTransition pageKey="accueil">
              <HomePage 
                setActiveTab={setActiveTab} 
                onOpenReservation={() => setIsReservationOpen(true)} 
              />
            </PageTransition>
          )}
          {activeTab === 'menu' && (
            <PageTransition pageKey="menu">
              <MenuPage />
            </PageTransition>
          )}
          {activeTab === 'atmosphere' && (
            <PageTransition pageKey="atmosphere">
              <AtmospherePage 
                onOpenReservation={() => setIsReservationOpen(true)}
                setActiveTab={setActiveTab} 
              />
            </PageTransition>
          )}
          {activeTab === 'galerie' && (
            <PageTransition pageKey="galerie">
              <GalleryPage />
            </PageTransition>
          )}
          {activeTab === 'contact' && (
            <PageTransition pageKey="contact">
              <ContactPage 
                onOpenReservation={() => setIsReservationOpen(true)} 
              />
            </PageTransition>
          )}
          {activeTab === 'apropos' && (
            <PageTransition pageKey="apropos">
              <AboutPage
                onOpenReservation={() => setIsReservationOpen(true)}
                setActiveTab={setActiveTab}
              />
            </PageTransition>
          )}
          {activeTab === 'evenements' && (
            <PageTransition pageKey="evenements">
              <EventsPage
                onOpenReservation={() => setIsReservationOpen(true)}
              />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {/* Modal de Réservation */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />

      {/* Pied de Page */}
      <Footer 
        onOpenReservation={() => setIsReservationOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Floating Maintenance Mode Banner (Visible only when unlocked preview is active) */}
      {siteConfig.maintenance?.enabled && isUnlocked && (
        <aside
          aria-label="Contrôle du mode maintenance"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-3 px-3.5 py-2 rounded-full bg-monarq-ink/90 text-monarq-paper text-xs shadow-luxury-lg border border-monarq-gold/40 backdrop-blur-md transition-all hover:bg-monarq-ink"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-sans text-[11px] text-monarq-paper/90 hidden sm:inline">
            Mode Maintenance Actif · Aperçu Déverrouillé
          </span>
          <button
            onClick={handleLockAgain}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-monarq-gold/20 hover:bg-monarq-gold/30 text-monarq-gold-light hover:text-white transition-colors text-[11px] font-medium"
            title="Reverrouiller le site pour afficher la page de maintenance"
          >
            <Lock className="w-3 h-3" />
            <span>Reverrouiller</span>
          </button>
        </aside>
      )}
    </div>
  );

}

export default App;
