import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/Animations';
import { siteConfig } from './data/siteConfig';
import { MaintenancePage } from './pages/MaintenancePage';

function split<T extends { default: React.ComponentType<any> }>(importPage: () => Promise<T>) {
  let request: Promise<T> | undefined;
  const load = () => request ??= importPage().catch(error => {
    request = undefined;
    throw error;
  });
  return { load, Component: lazy(load) };
}

const HomePage = split(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const MenuPage = split(() => import('./pages/MenuPage'));
const DigitalMenuPage = split(() => import('./pages/DigitalMenuPage'));
const AtmospherePage = split(() => import('./pages/AtmospherePage'));
const GalleryPage = split(() => import('./pages/GalleryPage'));
const ContactPage = split(() => import('./pages/ContactPage'));
const AboutPage = split(() => import('./pages/AboutPage'));
const EventsPage = split(() => import('./pages/EventsPage'));
const routes = {
  accueil: HomePage,
  menu: MenuPage,
  "digital-menu": DigitalMenuPage,
  atmosphere: AtmospherePage,
  galerie: GalleryPage,
  contact: ContactPage,
  apropos: AboutPage,
  evenements: EventsPage,
};
const ReservationModal = lazy(() => import('./components/ReservationModal').then(m => ({ default: m.ReservationModal })));
type Tab = keyof typeof routes;
function preloadTab(tab: string) {
  if (Object.prototype.hasOwnProperty.call(routes, tab)) {
    void routes[tab as Tab].load().catch(() => {});
  }
}

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
  const [activeTab, commitTab] = useState<string>('');
  const [pending, setPending] = useState(false);
  const [failedTab, setFailedTab] = useState('');
  const sequence = useRef(0);
  const reservationOpened = useRef(false);
  const setActiveTab = React.useCallback((tab: string) => {
    if (!Object.prototype.hasOwnProperty.call(routes, tab)) return;
    const attempt = ++sequence.current;
    setPending(true);
    setFailedTab('');
    routes[tab as Tab].load().then(() => {
      if (attempt !== sequence.current) return;
      React.startTransition(() => commitTab(tab));
      setPending(false);
    }, () => {
      if (attempt !== sequence.current) return;
      setFailedTab(tab);
      setPending(false);
    });
  }, []);
  const openReservation = () => {
    reservationOpened.current = true;
    setIsReservationOpen(true);
  };
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('monarq_maintenance_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const isMaintenance = Boolean(siteConfig.maintenance?.enabled && !isUnlocked);

  useEffect(() => {
    if (!isMaintenance) setActiveTab(getInitialTab());
    return () => { sequence.current++; };
  }, [isMaintenance, setActiveTab]);

  // Synchronise hash navigation and scroll to top when tab changes
  useLayoutEffect(() => {
    if (!activeTab) return;
    window.scrollTo({ top: 0, behavior: 'instant' });

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
        activeTab={activeTab || getInitialTab()}
        preloadTab={preloadTab}
        setActiveTab={setActiveTab}
        onOpenReservation={openReservation}
      />

      {/* Main Content Router with Cinematic Multi-layer Page Transitions */}
      <main className="flex-grow" aria-busy={pending}>
        {failedTab && <button type="button" className="fixed top-24 right-4 z-50 bg-monarq-paper p-4 shadow-lg" onClick={() => setActiveTab(failedTab)}>Réessayer / Retry</button>}
        {!activeTab && <div className="min-h-[70vh]" />}
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          {activeTab === 'accueil' && (
            <PageTransition pageKey="accueil">
              <HomePage.Component
                setActiveTab={setActiveTab}
                onOpenReservation={openReservation}
              />
            </PageTransition>
          )}
          {activeTab === 'menu' && (
            <PageTransition pageKey="menu">
              <MenuPage.Component
                onSwitchToDigitalMenu={() => setActiveTab('digital-menu')}
              />
            </PageTransition>
          )}
          {activeTab === 'digital-menu' && (
            <PageTransition pageKey="digital-menu">
              <DigitalMenuPage.Component
                onSwitchToClassicMenu={() => setActiveTab('menu')}
              />
            </PageTransition>
          )}
          {activeTab === 'atmosphere' && (
            <PageTransition pageKey="atmosphere">
              <AtmospherePage.Component
                onOpenReservation={openReservation}
                setActiveTab={setActiveTab}
              />
            </PageTransition>
          )}
          {activeTab === 'galerie' && (
            <PageTransition pageKey="galerie">
              <GalleryPage.Component onOpenReservation={openReservation} onViewMenu={() => setActiveTab('menu')} />
            </PageTransition>
          )}
          {activeTab === 'contact' && (
            <PageTransition pageKey="contact">
              <ContactPage.Component
                onOpenReservation={openReservation}
              />
            </PageTransition>
          )}
          {activeTab === 'apropos' && (
            <PageTransition pageKey="apropos">
              <AboutPage.Component
                onOpenReservation={openReservation}
                setActiveTab={setActiveTab}
              />
            </PageTransition>
          )}
          {activeTab === 'evenements' && (
            <PageTransition pageKey="evenements">
              <EventsPage.Component
                onOpenReservation={openReservation}
              />
            </PageTransition>
          )}
        </Suspense>
      </main>

      {/* Modal de Réservation */}
      <Suspense fallback={null}>{reservationOpened.current && <ReservationModal isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />}</Suspense>

      {/* Pied de Page */}
      <Footer
        onOpenReservation={openReservation}
        setActiveTab={setActiveTab}
      />

    </div>
  );

}

export default App;
