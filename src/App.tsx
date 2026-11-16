import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { PageTransition } from './components/Animations';
import { HomePage } from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import DigitalMenuPage from './pages/DigitalMenuPage';
import AtmospherePage from './pages/AtmospherePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import { initLenis } from './lib/animation';
import { siteConfig } from './data/siteConfig';
import { MaintenancePage } from './pages/MaintenancePage';

const getInitialTab = (): string => {
  if (typeof window === 'undefined') return 'accueil';
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  if (
    hash.includes('digital-menu') ||
    hash.includes('menu-digital') ||
    pathname.includes('digital-menu') ||
    pathname.includes('menu-digital') ||
    search.includes('digital-menu') ||
    search.includes('menu-digital')
  ) {
    return 'digital-menu';
  }

  if (hash === '#menu' || search.includes('tab=menu')) {
    return 'menu';
  }

  return 'accueil';
};

export function App() {
  const [activeTab, setActiveTab] = useState<string>(getInitialTab);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('monarq_maintenance_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const isMaintenance = Boolean(siteConfig.maintenance?.enabled && !isUnlocked);

  // Lenis smooth scroll intentionally disabled — native browser scroll is used instead.

  // Synchronise hash navigation and scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (activeTab === 'digital-menu') {
      if (window.location.hash !== '#digital-menu') {
        window.history.replaceState(null, '', '#digital-menu');
      }
    } else if (activeTab === 'accueil') {
      if (window.location.hash.includes('digital-menu')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [activeTab]);

  // Listen to hash changes (e.g. user clicks a QR link or browser history navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('digital-menu') || hash.includes('menu-digital')) {
        setActiveTab('digital-menu');
      } else if (hash === '#menu') {
        setActiveTab('menu');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
              <MenuPage 
                onSwitchToDigitalMenu={() => setActiveTab('digital-menu')} 
              />
            </PageTransition>
          )}
          {activeTab === 'digital-menu' && (
            <PageTransition pageKey="digital-menu">
              <DigitalMenuPage 
                onSwitchToClassicMenu={() => setActiveTab('menu')} 
              />
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
              <GalleryPage onOpenReservation={() => setIsReservationOpen(true)} onViewMenu={() => setActiveTab('menu')} />
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

    </div>
  );

}

export default App;
