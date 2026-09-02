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
import { initLenis } from './lib/animation';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

  // Initialise Lenis smooth scroll once (wired to GSAP ticker)
  // Skipped automatically when prefers-reduced-motion is active
  useEffect(() => {
    const cleanup = initLenis();
    return cleanup;
  }, []);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

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
    </div>
  );
}

export default App;
