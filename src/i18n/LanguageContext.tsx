import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES } from './types';
import { uiTranslations, UITranslations } from './uiTranslations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: UITranslations;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'monarq_lang';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'fr';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && ['fr', 'en', 'ar', 'nl'].includes(saved)) {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'fr';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore storage errors
    }
  };

  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang, dir]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: uiTranslations[lang],
    isRTL,
    dir,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};

interface LanguageSwitcherProps {
  isTransparent?: boolean;
  variant?: 'desktop' | 'mobile-compact' | 'mobile-overlay';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  isTransparent = false,
  variant = 'desktop',
  className = '',
}) => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  if (variant === 'mobile-overlay') {
    return (
      <div
        className={`inline-flex items-center gap-1 p-1 rounded-full bg-white/8 border border-white/20 ${className}`}
        role="group"
        aria-label="Language selector"
      >
        {LANGUAGES.map((option) => {
          const active = lang === option.code;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => setLang(option.code)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-sans uppercase tracking-[0.14em] font-bold transition-all ${
                active
                  ? 'bg-monarq-gold text-white shadow-sm'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
              title={option.nativeName}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'mobile-compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`px-2.5 py-1.5 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider border transition-colors flex items-center gap-1 ${
            isTransparent
              ? 'bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20'
              : 'bg-monarq-paper-soft text-monarq-ink border-monarq-gold/35 hover:border-monarq-gold'
          }`}
          aria-label="Select language"
          aria-expanded={open}
        >
          <span>{lang.toUpperCase()}</span>
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute end-0 mt-2 z-50 py-1.5 w-32 rounded-2xl bg-monarq-paper border border-monarq-gold/40 shadow-luxury-lg text-monarq-ink overflow-hidden">
              {LANGUAGES.map((option) => {
                const active = lang === option.code;
                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      setLang(option.code);
                      setOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-start font-sans text-xs flex items-center justify-between transition-colors ${
                      active
                        ? 'bg-monarq-gold/15 text-monarq-gold-deep font-bold'
                        : 'text-monarq-ink hover:bg-monarq-paper-soft font-medium'
                    }`}
                  >
                    <span>{option.nativeName}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-75 font-bold">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop inline segmented pill (FR / EN / AR / NL)
  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full border transition-colors ${
        isTransparent
          ? 'bg-black/25 border-white/25 backdrop-blur-sm'
          : 'bg-monarq-paper-soft/90 border-monarq-gold/30'
      } ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {LANGUAGES.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            title={option.nativeName}
            className={`px-2 xl:px-2.5 py-1 rounded-full text-[10px] xl:text-[11px] font-sans uppercase tracking-[0.08em] font-bold transition-all ${
              active
                ? 'bg-monarq-gold text-white shadow-sm'
                : isTransparent
                ? 'text-white/80 hover:text-white'
                : 'text-monarq-ink-soft hover:text-monarq-ink'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
