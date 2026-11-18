import { menuChapters } from './menuData';
import { siteConfig } from './siteConfig';
import { SITE_URL, ROUTES } from '../routes';

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  canonicalPath?: string;
}

export const pageSeo: Record<string, PageSeo> = {
  accueil: {
    title: 'MONARQ Tanger — Brunch, Restaurant & Café de Spécialité',
    description: "Brunch raffiné, cuisine artisanale et café de spécialité au cœur de Tanger. Cadre en marbre, terrasse, ouvert 7j/7 de 9h à minuit. Réservez votre table.",
  },
  menu: {
    title: 'Menu & Carte — Brunch, Pâtes, Grillades | MONARQ Tanger',
    description: "Découvrez la carte MONARQ Tanger : brunchs signatures, petit-déjeuner tangérois, pâtes fraîches, grillades et desserts. Prix en MAD, service continu 9h–00h.",
  },
  galerie: {
    title: 'Galerie Photos — Salle, Terrasse & Plats | MONARQ Tanger',
    description: "Parcourez la galerie MONARQ Tanger : l'architecture en marbre, la terrasse ensoleillée, nos brunchs et nos plats signatures photographiés sur place.",
  },
  apropos: {
    title: 'Notre Histoire — Restaurant & Café à Tanger | MONARQ',
    description: "L'histoire de MONARQ Tanger : un brunch, restaurant et café imaginé comme une adresse d'exception, entre savoir-faire artisanal et hospitalité tangéroise.",
  },
  contact: {
    title: 'Contact, Horaires & Accès — MONARQ Tanger',
    description: "Adresse, plan d'accès, horaires et réservation WhatsApp au 06 25 50 70 37. MONARQ Tanger, en face de La Française, près du Riad Tétouan.",
  },
  evenements: {
    title: 'Événements Privés & Anniversaires à Tanger | MONARQ',
    description: "Organisez votre anniversaire, brunch privé ou événement d'entreprise chez MONARQ Tanger : un cadre d'exception, un service attentionné et une cuisine soignée.",
  },
  atmosphere: {
    title: "L'Atmosphère — Architecture & Terrasse | MONARQ Tanger",
    description: "Marbre de Carrare, verrière végétale et terrasse ensoleillée : découvrez l'atmosphère unique de MONARQ, brunch et restaurant au centre de Tanger.",
  },
  'digital-menu': {
    title: 'Menu Digital | MONARQ Tanger',
    description: 'Consultez et commandez depuis le menu digital de MONARQ Tanger.',
    noindex: true,
    canonicalPath: '/menu',
  },
};

const restaurant = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'CafeOrCoffeeShop'],
  '@id': `${SITE_URL}/#restaurant`,
  name: 'MONARQ Tanger',
  url: `${SITE_URL}/`,
  image: [`${SITE_URL}/website-images/og/monarq-og-default.jpg`],
  logo: `${SITE_URL}${siteConfig.logos.seal}`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: '$$',
  servesCuisine: ['Brunch', 'Méditerranéenne', 'Marocaine', 'Italienne'],
  acceptsReservations: siteConfig.whatsappUrl,
  hasMenu: `${SITE_URL}/menu`,
  address: {
    '@type': 'PostalAddress',
    // TODO: replace with exact street address + postal code (must match Google Business Profile)
    streetAddress: siteConfig.address,
    addressLocality: 'Tanger',
    addressCountry: 'MA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 35.768218, longitude: -5.8042041 },
  hasMap: siteConfig.mapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '23:59',
    },
  ],
  sameAs: [siteConfig.instagram.split('?')[0]],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'MONARQ Tanger',
  url: `${SITE_URL}/`,
  inLanguage: 'fr',
};

const breadcrumb = (key: string) => {
  const route = ROUTES.find((r) => r.key === key)!;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: pageSeo[key].title.split(/ [—|] /)[0], item: SITE_URL + route.path },
    ],
  };
};

const menuSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Carte MONARQ Tanger',
  url: `${SITE_URL}/menu`,
  inLanguage: 'fr',
  hasMenuSection: menuChapters.map((chapter) => ({
    '@type': 'MenuSection',
    name: chapter.title,
    hasMenuSection: chapter.categories
      .filter((c: any) => !c.optionsOnly)
      .map((cat: any) => ({
        '@type': 'MenuSection',
        name: cat.name,
        hasMenuItem: cat.items.map((item: any) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: { '@type': 'Offer', price: String(item.price), priceCurrency: 'MAD' },
        })),
      })),
  })),
});

export function schemaFor(key: string): object[] {
  switch (key) {
    case 'accueil':
      return [restaurant, website];
    case 'menu':
      return [menuSchema(), breadcrumb('menu')];
    case 'contact':
      return [restaurant, breadcrumb('contact')];
    case 'digital-menu':
      return [];
    default:
      return pageSeo[key] ? [breadcrumb(key)] : [];
  }
}
