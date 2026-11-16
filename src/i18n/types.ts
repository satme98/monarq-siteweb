export type Language = 'fr' | 'en' | 'ar' | 'nl';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'fr', label: 'FR', nativeName: 'Français', dir: 'ltr' },
  { code: 'en', label: 'EN', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', label: 'AR', nativeName: 'العربية', dir: 'rtl' },
  { code: 'nl', label: 'NL', nativeName: 'Nederlands', dir: 'ltr' },
];
