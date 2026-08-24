# MONARQ AI Website Builder Prompt

Copy everything between **BEGIN PROMPT** and **END PROMPT** into your preferred AI website-building model. Upload the MONARQ logo, symbol, fonts, latest menu PDF and drone footage with the prompt whenever the builder supports attachments.

---

## BEGIN PROMPT

You are a senior digital art director, restaurant UX designer and production frontend engineer. Design and build a complete, polished, mobile-first website for **MONARQ**, a premium brunch, restaurant and café in Tangier, Morocco.

Do not produce only a mockup or a generic template. Build a responsive, usable website with working navigation, menu browsing, reservation actions, location actions, accessible interactions and refined motion.

The site language is **French**. The tone is elegant, warm, concise and contemporary.

### 1. Primary objective

Create a distinctive digital extension of the MONARQ brand that helps visitors:

1. Understand the restaurant concept within five seconds.
2. Browse the complete menu comfortably on a phone.
3. Discover the restaurant atmosphere.
4. Find the location quickly.
5. Reserve, call or open directions with minimal friction.

The final experience must feel premium without becoming cold, overdecorated or difficult to use.

### 2. Brand identity and attached source files

Use the uploaded MONARQ files as the highest authority:

- `MONARQ_Menu_A3_Red_Chili_Pasta_Adjusted.pdf` — current menu content and visual hierarchy.
- `Monarq_logo-png-white-3(4).png` — exact white MONARQ wordmark.
- `Monarq_symbol-png.png` — exact circular MONARQ seal.
- `Perpetua Titling MT Std Light.otf` — display font.
- `Fontspring-facundo-regular.otf` — supporting brand font.
- Approved MONARQ engraving images, if attached.
- MONARQ drone location footage, if attached.

Rules:

- Preserve the exact logo geometry, custom M and existing Q.
- Never rebuild the wordmark with live text.
- Never add `Le`, `La`, a crown, a fork, a chef hat or another symbol to the logo.
- Use the circular seal only as an approved brand asset, never redraw it.
- The latest menu PDF overrides older spreadsheets, copied text and draft menus.
- If the source files are unavailable, build clean replacement slots and list the missing files in the handoff. Do not invent a new logo or a full fake menu.
- Verify that the supplied Facundo font licence permits web use before public launch. If not, keep the font integration ready and use a close temporary fallback only during development.

### 3. Reference websites

Study these references for interaction principles and experience quality, not for direct copying:

1. `https://alayarestaurants.com/`
2. `https://www.bombayborough.com/dubai.html`
3. `https://tresindstudio.com/`
4. `https://www.rowon45dubai.com/`
5. `https://www.mythosdubai.com/`
6. `https://ilborrotuscanbistro.ae/`
7. `https://www.eatkokoro.xyz/`
8. `https://threebyeva.com/`
9. `https://girlandthegoose.com/`

Translate the strongest ideas into an original MONARQ experience:

- From Alaya: cinematic atmosphere, immediate `Menu / Call / Book / Find` mobile actions and strong experience-led sections.
- From Bombay Borough: clear menu entry points, useful practical information and location-first conversion.
- From Trèsind Studio: restrained editorial pacing, a strong concept statement and concise reservation information.
- From Row on 45: a journey-like narrative, repeated but elegant booking opportunities and useful FAQs.
- From Mythos: warm, image-led hospitality and visible reservation choices.
- From Il Borro: lifestyle storytelling, generous editorial photography and a strong sense of place.
- From Kokoro: intimacy, product focus and minimal visual noise.
- From Three by Eva: emotional heritage storytelling, large editorial type and meaningful simplicity.
- From Girl & the Goose: bold section headlines, story-to-reservation progression and community/social content.

Do not copy their text, logos, images, exact layouts, distinctive illustrations or trade dress. MONARQ must remain visually original.

### 4. Creative direction

Concept: **Editorial Tangier brasserie with contemporary warmth.**

Brand line:

```text
BRUNCH · RESTAURANT · CAFÉ
```

Hero message:

```text
L’élégance à table,
du matin au soir.
```

Supporting copy:

```text
À Tanger, MONARQ réunit brunchs généreux, cuisine de caractère,
café et douceurs dans un cadre raffiné.
```

Visual attributes:

- Refined.
- Warm.
- Contemporary.
- Generous.
- Editorial.
- Premium without pretension.
- Tangier identity without visual clichés.

Avoid:

- Generic black-and-gold luxury templates.
- Heavy gradients.
- Glassmorphism.
- Neon effects.
- Excessive rounded cards.
- Giant empty sections that add no meaning.
- Random animations.
- Dark pages that become difficult to read.
- Green as a website interface colour.
- Emoji icons.
- Fake testimonials, awards, press logos or ratings.

### 5. Colour system

Use a white/ivory-dominant interface with confident black sections and restrained antique-gold details.

```css
:root {
  --monarq-paper: #fdfaf5;
  --monarq-paper-soft: #f7f5ef;
  --monarq-white: #ffffff;
  --monarq-ink: #181512;
  --monarq-black: #0a0a0a;
  --monarq-ink-soft: #554a40;
  --monarq-gold: #a7916c;
  --monarq-gold-deep: #8b6a3d;
  --monarq-line: #d9d5ce;
  --monarq-line-strong: #bdbab5;
  --monarq-chili: #ff1f2d;
  --monarq-error: #b42318;
  --monarq-success: #236341;
  --ease-monarch: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Colour ratio:

- 75-85% warm ivory and white.
- 10-18% black or near-black.
- Maximum 5% antique gold.
- Less than 1% red.

Use red only for the two approved spicy menu markers and critical form errors.

### 6. Typography

Use local font files with `font-display: swap`:

- **Perpetua Titling MT Std Light** for hero titles, page titles and menu chapter headings.
- **Facundo Regular** for dish names, interface labels and supporting copy.
- Use a clean system sans-serif fallback for long body copy only if necessary for readability.

Typography rules:

- Hero title: `clamp(3rem, 10vw, 7rem)`.
- Section titles: `clamp(2.1rem, 6vw, 4.5rem)`.
- Mobile body text: never below `16px`.
- Body line height: `1.55-1.7`.
- Body line length: `45-72ch`.
- Use uppercase only for short labels and headings.
- Preserve all French accents and punctuation.
- Keep letter spacing refined, not extreme.

### 7. Site architecture

Build these routes:

- `/` — Accueil.
- `/menu` — La carte complète.
- `/a-propos` — L’histoire et l’expérience MONARQ.
- `/galerie` — Le lieu, les plats and moments.
- `/reservation` — Reservation journey.
- `/contact` — Location, directions, hours and contact.
- `/mentions-legales`.
- `/politique-de-confidentialite`.

If the builder can only produce one page, use the same order as anchored sections and keep components ready to split into routes later.

### 8. Global header and navigation

Desktop:

- Begin with a transparent header over the hero.
- Use the exact white logo over dark imagery.
- On scroll, transition to a slightly translucent warm-ivory header with subtle blur, a fine bottom border and the correct monochrome logo treatment.
- Navigation: `Accueil`, `La carte`, `À propos`, `Galerie`, `Contact`.
- Primary button: `Réserver une table`.
- Active page/section indicator uses a fine gold line or small diamond.

Mobile:

- Compact exact logo.
- Accessible menu button.
- Full-height navigation sheet with large links, address, Instagram and reservation CTA.
- Animate the sheet with a `320-380ms` transform using `--ease-monarch`.
- Lock background scrolling while open.
- Trap keyboard focus, close with Escape and return focus to the trigger.

Persistent mobile action bar:

- `La carte`
- `Itinéraire`
- `Réserver`

Keep it compact, above the safe-area inset and hidden when the footer is fully visible. Use real icons from a consistent accessible icon library. Do not use emoji.

### 9. Homepage journey

Build the homepage in this exact order so the user journey flows naturally from emotion to information to conversion.

#### Section 1 — Minimal brand intro

- Optional first-visit-only intro lasting no more than `500-700ms`.
- Show the exact circular MONARQ symbol on warm ivory, then fade into the hero.
- Never show a long loading animation.
- Skip entirely for returning visitors and users who prefer reduced motion.

#### Section 2 — Cinematic hero

- Full viewport height with one free placeholder restaurant interior photograph until real MONARQ media is added.
- Use a premium, warm-neutral, black/white restaurant interior with marble and elegant table settings.
- Add a soft dark overlay only where needed for text contrast.
- Do not use a rotating slider.
- Keep the focal point visible on `360px`, `390px` and `430px` screens.

Content:

```text
BRUNCH · RESTAURANT · CAFÉ

L’élégance à table,
du matin au soir.

À Tanger, MONARQ réunit brunchs généreux, cuisine de caractère,
café et douceurs dans un cadre raffiné.

[Découvrir la carte] [Réserver une table]
```

Add a subtle `Découvrir` scroll cue. The scroll cue disappears after the user begins scrolling.

#### Section 3 — The three MONARQ moments

Create three editorial panels, not generic cards:

1. `Le matin` — Petits déjeuners, brunchs, tartines, croques et omelettes.
2. `La cuisine` — Entrées, salades, pâtes, risottos, pizzas, grillades et plats marocains.
3. `Douceurs & boissons` — Cafés, jus, mocktails, desserts, crêpes, gaufres et glaces.

Use an asymmetrical desktop composition and a clean vertical mobile flow. Each panel has one image/engraving, a short description and a link to the correct menu anchor.

#### Section 4 — MONARQ story

Use a warm ivory background, exact circular seal and one vertical lifestyle/interior image.

Copy:

```text
UNE TABLE PENSÉE POUR CHAQUE MOMENT

MONARQ accompagne la journée, du premier café au dîner.
Une carte généreuse, une présentation soignée et une atmosphère
élégante composent une expérience faite pour être partagée.
```

CTA: `Découvrir MONARQ`.

Do not invent a founder or chef biography.

#### Section 5 — Signature menu highlights

Use a refined image-and-text sequence with five approved examples:

- `Le Monarq` — 99 DH.
- `Un dimanche à Paris` — 89 DH.
- `Monarq crevettes` — 98 DH, approved red chili icon.
- `Filet pur Black Angus` — 219 DH.
- `Saint-Sébastien` — 49 DH.

Descriptions must come from the latest menu PDF. Do not invent ingredients.

If a placeholder photograph does not show the exact dish, label the media in code as a placeholder and do not imply that it is the exact plate served by MONARQ.

CTA: `Voir toute la carte`.

#### Section 6 — Menu chapters strip

Create a horizontal editorial navigation strip on desktop and accessible scrollable tabs on mobile:

- Le matin.
- À la carte du matin.
- La cuisine.
- Pizzas & grillades.
- Boissons.
- Douceurs.

Each item opens `/menu` at the correct chapter.

#### Section 7 — Atmosphere gallery

- Use four to six free placeholder photographs with a consistent warm-neutral edit.
- Mix one wide interior, one table detail, two food details, one coffee moment and one dessert moment.
- Use an editorial grid rather than equal repetitive cards.
- On desktop, allow very subtle image depth during scroll.
- On mobile, remove parallax and keep images stable.
- CTA: `Découvrir MONARQ en images`.

#### Section 8 — Drone location experience

This is a major signature section. Title it:

```text
AU CŒUR DE TANGER
```

Supporting copy:

```text
Retrouvez MONARQ avenue Marrakech,
près du Palais Municipal, à Tanger.
```

Video treatment:

- Use the owner-supplied drone footage when attached.
- Expected file slot: `/public/videos/monarq-localisation-drone.mp4`.
- Create a WebM version when possible.
- Use a compressed poster image from the video.
- Desktop aspect ratio: cinematic `16:9` or full-bleed wide frame.
- Mobile aspect ratio: intentional `4:5` crop with the restaurant/location focal point centred.
- Use `object-fit: cover`, never stretch the footage.
- Autoplay only when muted and `playsinline`.
- Start playback only when the video approaches the viewport.
- Pause when off-screen.
- Provide an accessible pause/play control.
- Never autoplay audio.
- Under `prefers-reduced-motion`, show only the poster image.
- If the real drone file is not attached, use a tasteful free aerial Tangier placeholder and mark it clearly in the media manifest for replacement. Never present another city as Tangier.

Composition:

- Let the previous ivory section darken gradually into the cinematic video.
- Reveal the section title before the video reaches full opacity.
- On desktop, overlay a compact ivory information card in a safe corner.
- On mobile, place the information card below the video to protect readability.
- Show address, verified opening hours and three actions: `Ouvrir dans Google Maps`, `Appeler`, `Réserver`.
- Add an optional small static map only below the drone video; do not cover the footage with a large map.

Location values:

```text
MONARQ
Avenue Marrakech, près du Palais Municipal
Tanger, Maroc
```

Keep the Google Maps URL and coordinates as owner-confirmed variables until supplied.

#### Section 9 — Reservation conversion

Use a near-black section with ivory text and restrained gold detail.

```text
VOTRE TABLE VOUS ATTEND

Pour un brunch, un déjeuner, un dîner
ou un moment à partager.

[Réserver une table]
```

If the approved booking service exists, embed or link it. Otherwise route to `/reservation` or a verified WhatsApp URL.

Never display `Réservation confirmée` unless the booking system actually confirms it.

#### Section 10 — Social and footer

- Show a light, restrained Instagram preview only when the feed works reliably.
- Official profile: `https://www.instagram.com/monarq.tanger/`.
- If live Instagram fails, use a curated local image row rather than a broken feed.
- Footer includes exact logo/symbol, navigation, address, hours, phone, WhatsApp, email, Instagram and legal links.
- Keep footer practical and easy to scan on mobile.

### 10. Complete menu page

The main menu must be native HTML. The PDF is a secondary download only.

Header copy:

```text
LA CARTE MONARQ

Du petit déjeuner aux douceurs, découvrez une carte pensée
pour chaque moment de la journée.
```

Sticky menu chapters:

- Tous.
- Le matin.
- À la carte du matin.
- La cuisine.
- Pizzas & grillades.
- Boissons.
- Douceurs.

Exact hierarchy:

- **Le matin:** Petits déjeuners; Brunchs.
- **À la carte du matin:** Tartines; Croques; Omelettes; À la carte; Accompagnements & suppléments.
- **La cuisine:** Entrées froides; Entrées chaudes; Salades; Pâtes; Risottos; Suppléments salés.
- **Pizzas & grillades:** Pizzas; Burgers; Viandes; Ribs; Plats marocains; Suppléments pizzas.
- **Boissons:** Cafés; Thés; Eaux; Jus frais — base au choix; Boissons fraîches; Mojitos; Mocktails; Detox; Ice Coffee; Ice Tea.
- **Douceurs:** Desserts; Crêpes; Gaufres liégeoises; Glaces; Suppléments sucrés.

Menu UX:

- On mobile, use one column only.
- Keep the dish name and price on the same first line whenever possible.
- Put descriptions below at a comfortable line height.
- Keep price visible without horizontal scrolling.
- Use scrollable sticky category tabs with a visible active state.
- Add a search field for dish names.
- Do not add dietary or allergen labels by guessing.
- Preserve `Disponible le vendredi` on the two couscous items.
- Use `DH` consistently.
- Use exact descriptions and prices from the PDF.

Approved chili markers:

- `Monarq crevettes` — 98 DH.
- `Monarq poulet` — 92 DH.

Use the same small red chili asset next to these two items only. Do not use a pepper emoji. Add accessible text `Plat épicé`.

### 11. Other pages

#### À propos

- Editorial hero.
- MONARQ story.
- Three principles: générosité, soin, atmosphère.
- Day-to-night visual sequence.
- Interior gallery.
- Reservation CTA.
- Do not create a fake founder/chef story.

#### Galerie

Filters:

- Le lieu.
- Le brunch.
- La cuisine.
- Boissons & douceurs.
- Moments MONARQ.

Use a responsive editorial grid and accessible lightbox. Keep image proportions stable and colour grading consistent.

#### Réservation

Fields:

- Nom complet.
- Téléphone.
- Date.
- Heure.
- Nombre de personnes.
- Occasion, optional.
- Message, optional.
- Consent checkbox with privacy link.

Use French inline validation, prevent double submission and provide a phone/WhatsApp fallback.

Request-only success message:

```text
Votre demande a bien été envoyée.
L’équipe MONARQ vous contactera pour confirmer la disponibilité.
```

#### Contact

Show only verified values:

- Address.
- Google Maps link.
- Phone.
- WhatsApp.
- Email.
- Opening hours.
- Parking/accessibility information.
- Instagram.
- Drone video preview or poster.

### 12. Smooth transition and motion system

The site must feel fluid between sections but remain fast and comfortable. Use a small, consistent motion vocabulary.

Global principles:

- Prefer native scrolling. Do not use scroll-jacking.
- Do not force scroll snap between full-screen sections.
- Enable `scroll-behavior: smooth` only when reduced motion is not requested.
- Use `scroll-padding-top` so anchored content is never hidden by sticky headers.
- Animate each element once, not repeatedly on every small scroll.
- Reserve image dimensions to prevent layout shift.

Motion tokens:

```css
:root {
  --motion-fast: 180ms;
  --motion-ui: 280ms;
  --motion-section: 600ms;
  --motion-cinematic: 850ms;
  --ease-monarch: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Use only these principal effects:

1. **Editorial text reveal:** opacity `0 → 1`, translateY `18px → 0`, `500-650ms`.
2. **Image reveal:** soft clip/mask or opacity with scale `1.025 → 1`, `700-850ms`.
3. **Theme transition:** ivory-to-black or black-to-ivory background crossfade over `450-650ms`.
4. **Link interaction:** fine underline or arrow movement, `180-240ms`.
5. **Page transition:** short fade plus `8px` vertical movement, `220-320ms`, progressive enhancement only.

Rules:

- Use Intersection Observer or the builder’s efficient viewport animation API.
- Threshold around `0.12-0.2`.
- Stagger children by no more than `60-90ms`.
- Never animate every menu row individually on mobile.
- No large parallax on mobile.
- No horizontal page movement that could create overflow.
- No custom cursor.
- No autoplay audio.
- No animation longer than one second for navigation or essential actions.
- Under `prefers-reduced-motion`, remove transforms, parallax, smooth scrolling and autoplay video; keep immediate opacity changes only.

The drone section should be the most cinematic moment. All other transitions remain quieter so the site does not feel theatrical everywhere.

### 13. Mobile-first requirements

Design mobile before desktop.

Test at:

- 360 × 800.
- 390 × 844.
- 430 × 932.
- 768 × 1024.
- 1280 × 800.
- 1440 × 900.
- 1920 × 1080.

Mobile rules:

- Minimum side padding: `18-20px`.
- Minimum touch target: `44 × 44px`.
- Bottom actions respect `env(safe-area-inset-bottom)`.
- No essential hover-only interaction.
- No two-column menu at narrow widths.
- No clipped logo, title or price.
- Do not place text over busy mobile image crops.
- Keep primary actions reachable with one thumb.
- Use accordions only for secondary details such as FAQs, not for hiding the main menu.
- Keep mobile DOM and image payload light.
- Use a static poster instead of loading the full drone video immediately.

### 14. Free placeholder photography

The owner will replace imagery later. Use only tasteful, free-to-use placeholder photographs from **Unsplash** or **Pexels**.

Do not copy or download images from any reference restaurant website.

Required placeholder slots:

1. Hero — refined modern restaurant interior, white marble, black chairs, warm natural light.
2. Story — elegant restaurant table detail.
3. Morning — premium brunch spread, natural light.
4. Cuisine — refined pasta or plated main dish.
5. Grill — elegant grilled meat plate.
6. Coffee — cappuccino or coffee service.
7. Sweet — plated cheesecake or refined dessert.
8. Gallery — two additional interior/lifestyle images.
9. Location fallback — real aerial photograph/video of Tangier only.

Image handling:

- Download and store locally when the platform permits.
- Use AVIF/WebP plus JPEG fallback.
- Provide mobile and desktop crops.
- Set width and height to avoid CLS.
- Add descriptive French alt text.
- Decorative images use empty alt text.
- Create `/content/media-manifest` or an equivalent central configuration.
- Mark every placeholder with `replaceWithRealMonarqMedia: true`.
- Use semantic filenames such as `placeholder-hero-interior.webp`.
- Never describe a generic placeholder as an exact MONARQ dish.

### 15. Practical content configuration

Create one central editable configuration. Use these current values and placeholders:

```ts
const siteSettings = {
  restaurantName: "MONARQ",
  brandLine: "BRUNCH · RESTAURANT · CAFÉ",
  address: "Avenue Marrakech, près du Palais Municipal, Tanger, Maroc",
  mapsUrl: "{{OWNER_TO_CONFIRM}}",
  mapCoordinates: "{{OWNER_TO_CONFIRM}}",
  phoneDisplay: "{{OWNER_TO_CONFIRM}}",
  phoneHref: "{{OWNER_TO_CONFIRM}}",
  whatsappUrl: "{{OWNER_TO_CONFIRM}}",
  email: "{{OWNER_TO_CONFIRM}}",
  openingHours: "{{OWNER_TO_CONFIRM}}",
  reservationUrl: "{{OWNER_TO_CONFIRM}}",
  instagramUrl: "https://www.instagram.com/monarq.tanger/",
  droneVideo: "/videos/monarq-localisation-drone.mp4",
  dronePoster: "/images/monarq-localisation-drone-poster.webp"
};
```

Do not publish fabricated contact values. Clearly list unresolved owner variables at handoff.

### 16. Preferred implementation

Respect the AI builder’s native production stack. If it supports a modern React stack, prefer:

- Next.js or an equivalent server-rendered framework.
- TypeScript.
- Semantic HTML.
- Tailwind CSS or disciplined component styles.
- Framer Motion only if it is already supported and does not inflate the mobile bundle unnecessarily.
- Native View Transitions API only as progressive enhancement.
- Structured menu data outside UI component files.
- Responsive image optimisation.
- Real form/server action or verified booking provider.

Do not introduce a heavy animation framework for simple fades and reveals.

Recommended component structure:

```text
SiteShell
  Header
  MobileNavigation
  MobileActionBar
  PageTransition
  Main
    Hero
    DaypartPanels
    StorySection
    SignatureMenu
    MenuChapterStrip
    GalleryPreview
    DroneLocationSection
    ReservationBand
  Footer

MenuPage
  MenuHero
  MenuSearch
  StickyChapterTabs
  MenuChapter
    MenuSection
      MenuItemRow
```

### 17. Accessibility

Target WCAG AA:

- Semantic page landmarks.
- One H1 per route.
- Correct heading hierarchy.
- Skip-to-content link.
- Visible keyboard focus.
- Keyboard-operable menus, tabs, lightbox and forms.
- Form labels remain visible.
- Normal text contrast of at least `4.5:1`.
- Menu tabs expose selected state.
- Errors are linked to fields and announced.
- Chili icon includes accessible text.
- Mobile drawer and lightbox trap focus and close with Escape.
- Drone video has a pause control and reduced-motion fallback.

### 18. Performance

Targets on mobile:

- LCP under `2.5s`.
- CLS under `0.1`.
- INP under `200ms` where practical.
- Lighthouse scores `90+` for Performance, Accessibility, Best Practices and SEO on key routes.

Rules:

- Preload only the essential display font and hero asset.
- Lazy-load everything below the first viewport.
- Do not preload the drone video.
- Use `preload="none"` or `metadata` for the drone video until near the viewport.
- Use responsive images and explicit dimensions.
- Avoid loading the entire PDF unless the user requests it.
- Minimise third-party scripts.
- Avoid unreliable live social-feed scripts.

### 19. SEO

Create:

- Unique French title and meta description per route.
- Canonical URLs.
- Open Graph/Twitter preview using exact MONARQ assets.
- XML sitemap.
- Robots configuration.
- Restaurant structured data using verified information only.
- Indexable HTML menu.
- Clean French URL slugs.

Homepage metadata:

```text
Title: MONARQ Tanger — Brunch, Restaurant & Café
Description: Découvrez MONARQ à Tanger : brunchs, cuisine généreuse,
café, boissons et douceurs dans une atmosphère élégante.
```

Do not claim `meilleur`, `n°1`, awards, stars or review scores without verified evidence.

### 20. Functional requirements

All of these must work:

- Desktop and mobile navigation.
- Anchor links with correct sticky-header offset.
- Menu chapter tabs.
- Dish search.
- Reservation CTA.
- Phone link when supplied.
- WhatsApp link when supplied.
- Google Maps link when supplied.
- Instagram link.
- Reservation form validation and honest success state.
- Accessible gallery lightbox.
- Drone video play/pause and fallback poster.
- Legal/privacy routes.

Do not leave dead buttons. If a destination is not supplied, keep the control disabled in preview, label the missing variable in code and report it at handoff.

### 21. Final QA

Before presenting the result:

1. Compare the site against the attached MONARQ logo, menu and fonts.
2. Test every route and link.
3. Test the homepage at all specified mobile widths.
4. Test long French menu names and prices.
5. Check there is no horizontal overflow.
6. Check all images have stable dimensions and good crops.
7. Check the mobile action bar does not cover content.
8. Check the drone video does not harm initial page load.
9. Check keyboard navigation and reduced-motion mode.
10. Check no text, image or layout was copied from the reference websites.
11. Check no fake business information was introduced.
12. List every placeholder image and owner-supplied variable still needing replacement.

### 22. Definition of done

The site is done only when it:

- Feels unmistakably MONARQ rather than a generic restaurant theme.
- Is excellent at `360px` width.
- Has a smooth, coherent journey between sections without scroll-jacking.
- Uses the complete current menu as accessible HTML.
- Makes `Menu`, `Itinéraire` and `Réserver` effortless on mobile.
- Includes the cinematic drone localisation section.
- Uses centralised replaceable free-photo placeholders.
- Contains no copied reference-site content or unverified claims.
- Meets accessibility, performance and SEO expectations.
- Is a working site, not only a visual concept.

At handoff, provide:

1. The completed website.
2. A short list of routes.
3. A short list of remaining owner-confirmed variables.
4. A media replacement list showing every free placeholder and recommended final MONARQ asset.
5. A confirmation that mobile, reduced-motion and navigation checks were completed.

## END PROMPT
