import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useLanguage } from '../i18n';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
      <Seo title={t.notFoundPage.seoTitle} description={t.notFoundPage.seoDescription} path="/404" noindex canonicalPath="/" />
      <h1 className="font-serif text-4xl sm:text-5xl text-monarq-ink font-semibold mb-4">{t.notFoundPage.title}</h1>
      <p className="text-monarq-ink-soft max-w-md mb-8">{t.notFoundPage.description}</p>
      <nav className="flex flex-wrap gap-4 justify-center uppercase tracking-[0.16em] text-sm font-semibold">
        <Link to="/" className="text-monarq-gold-deep hover:text-monarq-gold">{t.nav.accueil}</Link>
        <Link to="/menu" className="text-monarq-gold-deep hover:text-monarq-gold">{t.nav.menu}</Link>
        <Link to="/contact" className="text-monarq-gold-deep hover:text-monarq-gold">{t.nav.contact}</Link>
      </nav>
    </section>
  );
}
