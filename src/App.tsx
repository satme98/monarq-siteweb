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

const CHUNK_LOAD_ERROR_RE = /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i;
const CHUNK_RELOAD_KEY = 'monarq_chunk_reload';

interface RouteErrorBoundaryProps {
  resetKey: string;
  retryLabel: string;
  children: React.ReactNode;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

class RouteErrorBoundary extends React.Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (CHUNK_LOAD_ERROR_RE.test(error?.message || '')) {
      try {
        const lastAttempt = sessionStorage.getItem(CHUNK_RELOAD_KEY);
        if (lastAttempt !== this.props.resetKey) {
          sessionStorage.setItem(CHUNK_RELOAD_KEY, this.props.resetKey);
          window.location.reload();
        }
      } catch {
        // Storage unavailable
      }
    }
  }

  componentDidUpdate(prevProps: RouteErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
          <button
            type="button"
            className="px-6 py-3 rounded-full btn-gold text-xs uppercase tracking-[0.18em] font-semibold shadow-sm"
            onClick={() => window.location.reload()}
          >
            {this.props.retryLabel}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ChunkLoadedMarker({ path }: { path: string }) {
  useEffect(() => {
    try {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    } catch {
      // Storage unavailable
    }
  }, [path]);
  return null;
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
    if (target && (location.pathname !== target || location.hash || location.search)) {
      navigate(target, { replace: true });
    }
  }, [isMaintenance, location.pathname, location.hash, location.search, navigate]);

  // Canonicalize trailing slashes, /index.html, or mixed-case paths to route.path
  useEffect(() => {
    if (isMaintenance || !activeTab) return;
    const canonical = pathFor(activeTab);
    if (location.pathname !== canonical) {
      navigate(`${canonical}${location.search}${location.hash}`, { replace: true });
    }
  }, [isMaintenance, activeTab, location.pathname, location.search, location.hash, navigate]);

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
        <RouteErrorBoundary resetKey={location.pathname} retryLabel={t.common.retryBtn}>
          <Suspense fallback={<div className="min-h-[70vh]" />}>
            <ChunkLoadedMarker path={location.pathname} />
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
        </RouteErrorBoundary>
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
