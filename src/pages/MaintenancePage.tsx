import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Instagram,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage, LanguageSwitcher } from '../i18n';

interface MaintenancePageProps {
  onUnlock: () => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ onUnlock }) => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    setError('');
    setIsSubmitting(true);

    const entered = password.trim();
    const correct = siteConfig.maintenance.password;

    if (entered === correct) {
      setIsSuccess(true);
      setError('');
      try {
        localStorage.setItem('monarq_maintenance_unlocked', 'true');
      } catch (e) {
        // Storage fallback
      }
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setShake(true);
      setError(t.maintenancePage.errorWrongPassword);
      setTimeout(() => setShake(false), 500);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-monarq-paper text-monarq-ink relative overflow-hidden flex flex-col justify-between selection:bg-monarq-gold/20 selection:text-monarq-ink">
      {/* Background Decorative Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url(${siteConfig.textures.marblePaper1})` }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-color-burn bg-cover bg-center"
        style={{ backgroundImage: `url(${siteConfig.textures.marbleGold})` }}
      />

      {/* Ambient Radial Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-monarq-gold/15 via-monarq-gold/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[400px] bg-monarq-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-6 md:py-8 max-w-6xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={siteConfig.logos.seal}
            alt={`MONARQ ${t.common.city} Seal`}
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <div className="hidden sm:block">
            <span className="block font-serif text-lg tracking-[0.25em] font-semibold text-monarq-ink leading-tight">
              MONARQ
            </span>
            <span className="block text-[10px] tracking-[0.3em] uppercase text-monarq-gold font-medium">
              {t.common.cityCountry}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-monarq-gold/40 bg-monarq-white/80 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-monarq-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-monarq-gold" />
            </span>
            <span className="text-xs uppercase tracking-[0.18em] font-medium text-monarq-ink-soft">
              {t.maintenancePage.badge}
            </span>
          </div>
          <LanguageSwitcher variant="desktop" />
        </div>
      </header>

      {/* Main Hero & Password Protection Box */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-12 w-full flex flex-col items-center text-center">

        {/* Emblem Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 relative"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-monarq-gold/30 bg-monarq-white/70 backdrop-blur-sm p-4 shadow-luxury flex items-center justify-center">
            <img
              src={siteConfig.logos.dark}
              alt="MONARQ"
              className="w-full h-auto object-contain"
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 border border-dashed border-monarq-gold/25 rounded-full pointer-events-none"
          />
        </motion.div>

        {/* Subtitle / Brand Line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-monarq-gold font-semibold mb-3"
        >
          {t.maintenancePage.subtitle}
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-monarq-ink tracking-[0.02em] font-normal leading-[1.15] mb-5 max-w-2xl"
        >
          {t.maintenancePage.title}
        </motion.h1>

        {/* Description Message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg text-monarq-ink-soft max-w-xl font-normal leading-relaxed mb-10"
        >
          {t.maintenancePage.message}
        </motion.p>

        {/* Password Unlock Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: shake ? [-8, 8, -6, 6, -3, 3, 0] : 0
          }}
          transition={{
            y: { duration: 0.7, delay: 0.4 },
            x: { duration: 0.45 }
          }}
          className="w-full max-w-md bg-monarq-white/85 backdrop-blur-md rounded-2xl border border-monarq-line shadow-luxury-lg p-6 sm:p-8 text-start"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-monarq-gold">
              <KeyRound className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-monarq-ink">
                {t.maintenancePage.privateAccess}
              </span>
            </div>
            <span className="text-[11px] text-monarq-ink-muted">
              {t.maintenancePage.membersOnly}
            </span>
          </div>

          <p className="text-xs text-monarq-ink-soft mb-5 leading-normal">
            {t.maintenancePage.passwordPrompt}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-monarq-ink-muted">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder={t.maintenancePage.passwordPlaceholder}
                disabled={isSubmitting || isSuccess}
                autoFocus
                className={`w-full ps-10 pe-12 py-3 rounded-xl border bg-monarq-paper/60 text-monarq-ink placeholder-monarq-ink-muted/60 text-sm font-sans focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  error
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200/50'
                    : isSuccess
                    ? 'border-emerald-500 focus:ring-emerald-200/50'
                    : 'border-monarq-line hover:border-monarq-gold/50 focus:border-monarq-gold focus:ring-monarq-gold/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-monarq-ink-muted hover:text-monarq-ink transition-colors"
                title={showPassword ? t.maintenancePage.hideTitle : t.maintenancePage.showTitle}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-xs text-red-600 bg-red-50/80 px-3 py-2 rounded-lg border border-red-200"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50/90 px-3 py-2 rounded-lg border border-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>{t.maintenancePage.accessGranted}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess || !password.trim()}
              className="w-full py-3 px-5 rounded-xl bg-monarq-ink text-monarq-paper hover:bg-monarq-ink-soft active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 text-sm font-medium tracking-wide shadow-md group"
            >
              {isSuccess ? (
                <>
                  <Sparkles className="w-4 h-4 text-monarq-gold animate-spin" />
                  <span>{t.maintenancePage.openingInProgress}</span>
                </>
              ) : (
                <>
                  <span>{t.maintenancePage.enterSiteBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 text-monarq-gold" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Quick Contact & Location Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-monarq-ink-soft"
        >
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-monarq-white/70 hover:bg-monarq-white border border-monarq-line/80 transition-all shadow-sm group"
          >
            <MapPin className="w-3.5 h-3.5 text-monarq-gold group-hover:scale-110 transition-transform" />
            <span>{t.common.address}</span>
          </a>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-monarq-white/70 hover:bg-monarq-white border border-monarq-line/80 transition-all shadow-sm group"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span dir="ltr">WhatsApp : {siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-monarq-white/70 hover:bg-monarq-white border border-monarq-line/80 transition-all shadow-sm group"
          >
            <Phone className="w-3.5 h-3.5 text-monarq-gold group-hover:scale-110 transition-transform" />
            <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-monarq-white/70 hover:bg-monarq-white border border-monarq-line/80 transition-all shadow-sm group"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600 group-hover:scale-110 transition-transform" />
            <span dir="ltr">{siteConfig.instagramHandle}</span>
          </a>
        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-6 px-6 text-center border-t border-monarq-line/60">
        <p className="text-xs text-monarq-ink-muted">
          © {new Date().getFullYear()} {siteConfig.name} {t.common.city}. {t.footer.copyright}
        </p>
      </footer>
    </div>
  );
};

export default MaintenancePage;
