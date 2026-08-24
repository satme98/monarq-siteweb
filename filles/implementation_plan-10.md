# MONARQ Website Implementation Plan

Build a complete, polished, mobile-first website for **MONARQ** (Brunch, Restaurant & Café in Tangier, Morocco) based on the official brand assets, menu PDF specification, and high-end agency design guidelines.

## User Review Required

> [!IMPORTANT]
> **Brand & Menu Authority:**
> - All logo geometries (`Monarq_logo-png-white-3.png`, `Monarq_logo-png.png`, `Monarq_symbol-png.png`) and local typography (`Perpetua Titling MT Std Light`, `Fontspring Facundo`) are preserved directly from source files without modification.
> - Menu data is 100% extracted from `MONARQ_Menu_A3_Red_Chili_Pasta_Adjusted.pdf`.
> - All unconfirmed owner variables (Phone, WhatsApp, Maps URL, exact coordinates) are managed via centralized configuration (`src/data/siteSettings.ts`) with clear placeholder fallbacks.
> - The drone location video slot `/public/videos/monarq-localisation-drone.mp4` is configured with an elegant Tangier aerial poster fallback.

> [!NOTE]
> **Tech Stack:**
> - **Framework:** React + TypeScript with Vite and React Router v6 for client-side routing with clean URLs and page transitions.
> - **Styling:** Tailwind CSS with custom theme variables, fine borders (`--monarq-line`), double-bezel cards, and typography scale.
> - **Motion:** Lightweight Framer Motion & IntersectionObserver for scroll-triggered entry choreography and cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## Open Questions

None at present. All requirements, menu items, prices, brand rules, colors, and layouts are fully specified.

---

## Proposed Changes

### Component Infrastructure & Design System

#### [NEW] [index.css](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/index.css)
- `@font-face` definitions for Perpetua Titling MT Std Light and Facundo Regular from local `.otf` files.
- Design tokens (`--monarq-paper`, `--monarq-ink`, `--monarq-gold`, `--monarq-chili`, etc.).
- Smooth scrolling with top offset, double-bezel utility classes, custom scrollbars, and reduced motion overrides.

#### [NEW] [siteSettings.ts](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/data/siteSettings.ts)
- Centralized configuration containing contact info, coordinates, opening hours, social links, and media paths.

#### [NEW] [menuData.ts](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/data/menuData.ts)
- Complete structured TypeScript dataset for all 6 menu chapters, categories, item descriptions, prices, spicy markers, and special notes (`Disponible le vendredi`).

#### [NEW] [mediaManifest.ts](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/data/mediaManifest.ts)
- Centralized tracking of placeholder imagery with `replaceWithRealMonarqMedia: true` flags.

---

### Shared Layout & UI Components

#### [NEW] [Header.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/components/Header.tsx)
- Transparent over hero, morphing to translucent warm ivory (`#FDFAF5/90` with subtle blur) on scroll.
- Full mobile overlay drawer with animated hamburger morph, keyboard focus trap, escape listener, and body scroll lock.

#### [NEW] [Footer.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/components/Footer.tsx)
- Circular MONARQ symbol, exact wordmark, quick links, verified address/hours, Instagram link, and legal links.

#### [NEW] [MobileActionBar.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/components/MobileActionBar.tsx)
- Persistent mobile bottom bar with `La carte`, `Itinéraire`, `Réserver`. Auto-hides when footer is in view.

#### [NEW] [DroneLocationSection.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/components/DroneLocationSection.tsx)
- Title: "AU CŒUR DE TANGER". Video player with play/pause controls, muted autoplay, responsive crop (16:9 desktop, 4:5 mobile), poster fallback, and overlaid location info card.

---

### Pages & Routes

#### [NEW] [HomePage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/HomePage.tsx)
- **Sec 1:** Optional first-visit intro seal reveal (`500-700ms`).
- **Sec 2:** Cinematic Hero with exact white logo, background interior photo, overlay, brand line, and CTAs.
- **Sec 3:** 3 MONARQ Moments (Le matin, La cuisine, Douceurs & boissons) with asymmetrical editorial layout.
- **Sec 4:** MONARQ Story panel with circular seal.
- **Sec 5:** Signature Menu Highlights (Le Monarq, Un dimanche à Paris, Monarq crevettes, Filet pur Black Angus, Saint-Sébastien).
- **Sec 6:** Menu Chapters Strip.
- **Sec 7:** Atmosphere Gallery preview.
- **Sec 8:** Drone Location Experience ("AU CŒUR DE TANGER").
- **Sec 9:** Reservation Conversion Band.
- **Sec 10:** Social & Footer.

#### [NEW] [MenuPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/MenuPage.tsx)
- Native HTML menu with hero header, PDF download CTA, dish search bar, sticky chapter navigation tabs, mobile 1-column layout, prices in DH, and approved red chili icons.

#### [NEW] [AboutPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/AboutPage.tsx)
- Brand story, 3 core principles (Générosité, Soin, Atmosphère), day-to-night visual progression, gallery highlights.

#### [NEW] [GalleryPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/GalleryPage.tsx)
- Filterable gallery tabs (Le lieu, Le brunch, La cuisine, Boissons & douceurs, Moments MONARQ) with full-screen accessible lightbox.

#### [NEW] [ReservationPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/ReservationPage.tsx)
- Complete reservation request form with full French inline validation, date/time/guests selectors, privacy consent, and request-only confirmation state.

#### [NEW] [ContactPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/ContactPage.tsx)
- Location overview, Google Maps direct link, phone/WhatsApp triggers, opening hours, parking & accessibility info.

#### [NEW] [LegalPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/LegalPage.tsx) & [PrivacyPage.tsx](file:///c:/Users/user/Desktop/WORK/MONARQ%20WEBSITE/src/pages/PrivacyPage.tsx)
- Terms of service, legal mentions, and privacy policy for GDPR/Moroccan law compliance.

---

## Verification Plan

### Automated Verification
- Run `npm run build` or `npx tsc` to verify zero TypeScript errors and a clean build.
- Run dev server and check for console warnings or errors.

### Manual Verification
- Test all 8 routes (`/`, `/menu`, `/a-propos`, `/galerie`, `/reservation`, `/contact`, `/mentions-legales`, `/politique-de-confidentialite`).
- Test responsiveness at 360px, 390px, 430px, 768px, 1024px, 1440px.
- Test sticky menu tabs, search filtering, and red chili icon positioning on `/menu`.
- Test reservation form submission and success state on `/reservation`.
- Test mobile drawer, keyboard ESC closing, focus traps, and reduced motion overrides.
