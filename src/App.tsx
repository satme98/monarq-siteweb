import React, { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/Animations';
import { siteConfig } from './data/siteConfig';
import { MaintenancePage } from './pages/MaintenancePage';
import { useLocation, useNavigate } from 'react-router-dom';
import { keyForPath, pathFor } from './routes';
import NotFoundPage from './pages/NotFoundPage';
import { Seo } from './components/Seo';
import { pageSeo, schemaFor } from './data/seoContent';
import { useLanguage } from './i18n';

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

const legacyTarget = (): string | null => {
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  if (hash.includes('digital-menu') || hash.includes('menu-digital') || search.includes('digital-menu') || search.includes('menu-digital')) return '/menu-digital';
  if (hash === '#menu' || search.includes('tab=menu')) return '/menu';
  return null;
};

export function App() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = keyForPath(location.pathname);
  const isNotFound = !activeTab;
  const reservationOpened = useRef(false);
  const [pending, setPending] = useState(false);
  const [failedTab, setFailedTab] = useState('');
  const sequence = useRef(0);

  const setActiveTab = React.useCallback((tab: string) => {
    if (!Object.prototype.hasOwnProperty.call(routes, tab)) return;
    const attempt = ++sequence.current;
    setPending(true);
    setFailedTab('');
    routes[tab as Tab].load().then(() => {
      if (attempt !== sequence.current) return;
      setPending(false);
      navigate(pathFor(tab));
    }, () => {
      if (attempt !== sequence.current) return;
      setFailedTab(tab);
      setPending(false);
    });
  }, [navigate]);

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

  // Legacy QR/hash links (/#digital-menu, /#menu, ?tab=menu) -> real URLs
  useEffect(() => {
    if (isMaintenance) return;
    const target = legacyTarget();
    if (target) navigate(target, { replace: true });
  }, [isMaintenance, location.hash, location.search, navigate]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => () => { sequence.current++; }, []);
  if (isMaintenance) {
    return <MaintenancePage onUnlock={() => setIsUnlocked(true)} />;
  }


  return (
    <div className="min-h-screen flex flex-col bg-monarq-paper text-monarq-ink relative">
      {/* Navigation Globale */}
      <Navbar
        activeTab={activeTab}
        preloadTab={preloadTab}
        setActiveTab={setActiveTab}
        onOpenReservation={openReservation}
      />

      {/* Main Content Router with Cinematic Multi-layer Page Transitions */}
      <main className="flex-grow" aria-busy={pending}>
        {failedTab && <button type="button" className="fixed top-24 right-4 z-50 bg-monarq-paper p-4 shadow-lg" onClick={() => setActiveTab(failedTab)}>{t.common.retryBtn}</button>}
        {activeTab && pageSeo[activeTab] && <Seo {...pageSeo[activeTab]} path={pathFor(activeTab)} jsonLd={schemaFor(activeTab)} />}
        {isNotFound && <NotFoundPage />}
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
