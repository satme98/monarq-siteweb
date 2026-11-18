import lock from '../lock.json';
export const siteConfig = {
  name: 'MONARQ',
  brandLine: 'BRUNCH · RESTAURANT · CAFÉ',
  city: 'Tanger',
  country: 'Maroc',
  address: 'En face de La Française, à proximité du Riad Tétouan',
  fullAddress: 'En face de la boulangerie-pâtisserie La Française, à proximité du Riad Tétouan, Tanger, Maroc',
  phone: '+212625507037',
  phoneDisplay: '06 25 50 70 37',
  whatsapp: '+212625507037',
  whatsappUrl: 'https://wa.me/212625507037?text=Bonjour%20MONARQ%20Tanger,%20je%20souhaite%20r%C3%A9server%20une%20table.',
  email: 'monarq.tanger@gmail.com',
  instagram: 'https://www.instagram.com/monarq.tanger/?hl=en',
  instagramHandle: '@monarq.tanger',
  mapsUrl: 'https://maps.app.goo.gl/xrn8792TuDMeojBo9',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.38!2d-5.8042041!3d35.768218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b81877a4e3dc5%3A0x20398447b41ad260!2sMonarq%20Tanger!5e0!3m2!1sfr!2sma!4v1710000000000!5m2!1sfr!2sma',
  openingHours: [
    { days: 'Tous les jours', hours: '09h00 — 00h00', note: 'Service continu' },
    { days: 'Service Brunch', hours: '09h00 — 14h00', note: 'Tous les matins' },
    { days: 'Déjeuner & Carte', hours: '12h00 — 18h00', note: 'Cuisine continue' },
    { days: 'Dîner & Grillades', hours: '19h00 — 00h00', note: 'Ambiance feutrée' },
  ],
  features: [
    { title: "Cadre d'Exception", description: "Architecture contemporaine, marbre de Carrare et verrière végétale lumineuse." },
    { title: "Cuisine Artisanale", description: "Produits frais d'excellence, pâtes fraîches maison et créations de caractère." },
    { title: "Brunchs Royaux", description: "Du petit-déjeuner tangérois traditionnel aux compositions brunchs cosmopolites." },
    { title: "Hospitalité & Confort", description: "Service attentionné, terrasse ensoleillée et ambiance élégante." },
  ],
  logos: {
    white: '/website-images/brand/monarq-logo-white-hd.webp',
    dark: '/website-images/brand/monarq-logo-dark-hd.webp',
    seal: '/website-images/brand/monarq-seal-hd.png',
    badgeSeal: '/website-images/brand/monarq-badge-seal.webp',
  },
  videos: {
    interiorWalkthrough: 'https://ik.imagekit.io/yascode/data/Video-Localisation-003.mp4',
    droneLocation: '/videos/monarq-drone-location.mp4',
  },
  textures: {
    marbleGold: '/website-images/textures/marble-gold-vein.webp',
    marblePaper1: '/website-images/textures/marble-bg-1.webp',
  },
  maintenance: {
    enabled: lock.locked,
    password: 'monarq123456',
    title: 'Bientôt Disponible',
    subtitle: 'BRUNCH · RESTAURANT · CAFÉ — TANGER',
    message: "Notre site officiel prépare son ouverture imminente. En attendant de vous accueillir en ligne, retrouvez-nous au cœur de Tanger ou contactez-nous directement.",
    badge: 'Ouverture Très Prochaine',
  }
};

