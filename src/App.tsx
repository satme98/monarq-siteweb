import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileDock } from './components/MobileDock';
import { ReservationModal } from './components/ReservationModal';
import { HomePage } from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AtmospherePage from './pages/AtmospherePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('accueil');
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

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

      {/* Main Content Router */}
      <main className="flex-grow">
        {activeTab === 'accueil' && (
          <HomePage 
            setActiveTab={setActiveTab} 
            onOpenReservation={() => setIsReservationOpen(true)} 
          />
        )}
        {activeTab === 'menu' && (
          <MenuPage />
        )}
        {activeTab === 'atmosphere' && (
          <AtmospherePage 
            onOpenReservation={() => setIsReservationOpen(true)}
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'galerie' && (
          <GalleryPage />
        )}
        {activeTab === 'contact' && (
          <ContactPage 
            onOpenReservation={() => setIsReservationOpen(true)} 
          />
        )}
      </main>

      {/* Dock Tactile Mobile Fixe */}
      <MobileDock 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Modal de Réservation */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />

      {/* Pied de Page de Prestige */}
      <Footer 
        onOpenReservation={() => setIsReservationOpen(true)}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default App;
