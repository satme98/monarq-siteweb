import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  FadeUp,
  FadeIn,
  SlideLeft,
  SlideRight,
  StaggerGroup,
  StaggerItem,
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { siteConfig } from '../data/siteConfig';
import { SPRING_SNAP, SPRING_FLUID, EASE_CINEMATIC } from '../lib/animation';
import {
  Users,
  Crown,
  Mic2,
  GlassWater,
  Sparkles,
  Calendar,
  Phone,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Send,
  ChevronDown,
} from 'lucide-react';

interface EventsPageProps {
  onOpenReservation: () => void;
}

const eventTypes = [
  {
    icon: Crown,
    title: 'Anniversaires & Célébrations',
    description:
      'Transformez votre occasion spéciale en souvenir inoubliable. Décoration sur mesure, menu dédié et service attentionné pour vos proches.',
    capacity: "Jusqu\u2019\u00e0 80 personnes",
  },
  {
    icon: Users,
    title: 'Déjeuners d\'Affaires',
    description:
      'Un cadre élégant et discret pour vos rendez-vous professionnels. Menus express ou gastronomiques, connexion disponible, espace privatisable.',
    capacity: 'De 4 à 40 personnes',
  },
  {
    icon: Mic2,
    title: 'Lancements & Réceptions',
    description:
      'Inaugurations de marque, vernissages, présentations presse — nous co-concevons avec vous chaque détail de l\'événement.',
    capacity: "Jusqu\u2019\u00e0 100 personnes en cocktail",
  },
  {
    icon: GlassWater,
    title: 'Cocktails & Apéritifs',
    description:
      'Formules cocktails debout sur notre terrasse ou en salle. Sélection de vins, jus pressés, mocktails signatures et petites bouchées.',
    capacity: 'De 15 à 60 personnes',
  },
];

const spaces = [
  {
    name: 'La Salle Principale',
    capacity: '60 personnes',
    note: 'Cadre haut de plafond, tables longues, verrière végétale',
    src: '/images/staggered-story-1.jpg',
  },
  {
    name: 'La Terrasse',
    capacity: '40 personnes',
    note: 'Vue sur l\'avenue, air libre, ambiance feutrée le soir',
    src: '/images/atmosphere-exterior.jpg',
  },
  {
    name: 'Le Salon Privé',
    capacity: '20 personnes',
    note: 'Intimité absolue, décoration premium, entrée dédiée',
    src: '/images/gallery-2.jpg',
  },
];

const inclusions = [
  'Coordination et accueil dédiés',
  'Menus personnalisables (végétarien, halal)',
  'Décoration florale sur demande',
  'Service de traiteur et animation culinaire',
  'Carte boissons complète (alcool-free)',
  'Sono & éclairage d\'ambiance',
  'Devis personnalisé sous 24h',
];

export default function EventsPage({ onOpenReservation }: EventsPageProps) {
  const reduce = useReducedMotion();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    eventType: 'Anniversaire / Célébration',
    guests: '',
    date: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'Quel est le délai de réservation recommandé pour un événement ?',
      a: 'Nous recommandons de nous contacter au moins 2 à 3 semaines à l\'avance pour un événement jusqu\'à 30 personnes, et 4 à 6 semaines pour les événements de plus grande envergure.',
    },
    {
      q: 'Proposez-vous des menus personnalisés ?',
      a: 'Absolument. Notre chef travaille avec vous pour composer un menu adapté à vos préférences, convictions alimentaires et budget. Nous proposons des formules brunch, déjeuner, cocktail ou dîner.',
    },
    {
      q: 'La privatisation inclut-elle la boisson ?',
      a: 'Nos formules de privatisation incluent l\'accès à notre carte boissons complète (jus frais, eaux, mocktails signatures, thés et cafés d\'auteur). Les boissons alcoolisées ne font pas partie de notre offre.',
    },
    {
      q: 'Puis-je apporter ma propre décoration ?',
      a: 'Oui, bien entendu. Nous accueillons vos décorations personnelles avec plaisir. Notre équipe peut également vous recommander des partenaires locaux pour la décoration florale ou thématique.',
    },
  ];

  return (
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-24">

      {/* ── 1. Hero — Full-Width Dark Band ─────────────────────────────────── */}
      <section className="bg-monarq-black text-white relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#A7916C_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <FadeUp className="space-y-8">
              <SectionEyebrow className="text-monarq-gold-light">Événements & Privatisation</SectionEyebrow>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.1]">
                Votre Occasion. Notre Maison.
              </h1>
              <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-[52ch]">
                De l'anniversaire intime à la réception professionnelle, MONARQ met son cadre d'exception, sa cuisine et son équipe à votre service pour des événements mémorables.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full btn-gold text-xs uppercase tracking-[0.2em] font-semibold shadow-luxury"
                  whileHover={reduce ? {} : { y: -1, scale: 1.01 }}
                  whileTap={reduce ? {} : { scale: 0.96 }}
                  transition={SPRING_SNAP}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contacter par WhatsApp</span>
                </motion.a>
                <a
                  href="#demande"
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white text-xs uppercase tracking-[0.2em] font-semibold hover:border-monarq-gold/60 hover:text-monarq-gold-light transition-colors duration-300"
                >
                  <span>Soumettre une Demande</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </FadeUp>

            {/* Right — image */}
            <SlideLeft className="relative h-[50vh] lg:h-[70vh] w-full overflow-hidden rounded-2xl">
              <img
                src="/images/staggered-story-2.jpg"
                alt="Espace événementiel MONARQ Tanger"
                className="w-full h-full object-cover"
              />
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                {[
                  { value: '100+', label: 'Invités max' },
                  { value: '3', label: 'Espaces' },
                  { value: '24h', label: 'Devis' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 bg-black/40 backdrop-blur-sm border border-white/15 rounded-xl p-3.5 text-center"
                  >
                    <span className="block font-serif text-2xl text-monarq-gold font-light">{s.value}</span>
                    <span className="block font-sans text-[10px] uppercase tracking-[0.22em] text-white/70 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </SlideLeft>
          </div>
        </div>
      </section>

      {/* ── 2. Event Types ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-monarq-line">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
              Quels Événements Organisons-Nous ?
            </h2>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {eventTypes.map((ev) => {
              const Icon = ev.icon;
              return (
                <StaggerItem key={ev.title}>
                  <motion.div
                    className="group p-8 border border-monarq-line rounded-2xl hover:border-monarq-gold/40 transition-colors duration-500 bg-white/20 hover:bg-white/50 space-y-5 h-full"
                    whileHover={reduce ? {} : { y: -2 }}
                    transition={SPRING_FLUID}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-monarq-gold/10 flex items-center justify-center border border-monarq-gold/20 group-hover:bg-monarq-gold/20 transition-colors duration-300 flex-shrink-0">
                        <Icon className="w-5 h-5 text-monarq-gold-deep" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-monarq-ink font-semibold leading-snug">
                          {ev.title}
                        </h3>
                        <span className="inline-block font-sans text-[10px] uppercase tracking-[0.22em] text-monarq-gold-deep font-semibold">
                          {ev.capacity}
                        </span>
                      </div>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-monarq-ink-soft font-light leading-relaxed">
                      {ev.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ── 3. Spaces ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-monarq-line">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
              Nos Espaces Privatisables
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spaces.map((space, i) => (
              <FadeUp key={space.name} delay={i * 0.1}>
                <div className="group space-y-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <img
                      src={space.src}
                      alt={space.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-monarq-ink/55 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="inline-flex items-center gap-1.5 bg-monarq-gold/90 backdrop-blur-sm rounded-full px-3.5 py-1.5">
                        <Users className="w-3 h-3 text-monarq-ink" />
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-monarq-ink font-bold">
                          {space.capacity}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5 px-1">
                    <h3 className="font-serif text-xl text-monarq-ink font-semibold">{space.name}</h3>
                    <p className="font-sans text-sm text-monarq-ink-soft font-light">{space.note}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Inclusions list ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-monarq-line">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp className="space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold leading-snug">
                Ce Que Comprend Chaque Événement
              </h2>
              <p className="font-sans text-base text-monarq-ink-soft font-light leading-relaxed">
                Notre équipe prend en charge chaque détail pour que vous puissiez profiter pleinement du moment.
              </p>
              <motion.a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.22em] text-monarq-gold-deep font-semibold hover:text-monarq-ink transition-colors"
                whileHover={reduce ? {} : { x: 2 }}
                transition={SPRING_FLUID}
              >
                <span>Demander un devis personnalisé</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </FadeUp>

            <StaggerGroup className="space-y-3.5">
              {inclusions.map((item, i) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3.5 py-3 border-b border-monarq-line last:border-0">
                    <CheckCircle2 className="w-4.5 h-4.5 text-monarq-gold-deep flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm sm:text-base text-monarq-ink font-normal leading-snug">
                      {item}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* ── 5. Request Form ────────────────────────────────────────────────── */}
      <section id="demande" className="py-20 md:py-28 border-b border-monarq-line">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>Demande de Privatisation</SectionEyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mt-4">
              Déposez Votre Demande
            </h2>
            <p className="font-sans text-base text-monarq-ink-soft max-w-lg mx-auto mt-4 leading-relaxed font-light">
              Renseignez le formulaire ci-dessous et notre équipe vous contacte dans les 24 heures pour construire votre événement ensemble.
            </p>
          </FadeUp>

          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-14 space-y-5"
              >
                <CheckCircle2 className="w-14 h-14 text-monarq-gold" />
                <p className="font-serif text-2xl sm:text-3xl text-monarq-ink font-semibold">
                  Demande envoyée avec succès
                </p>
                <p className="font-sans text-base text-monarq-ink-soft font-light">
                  Notre équipe vous contactera sous 24 heures pour affiner les détails de votre événement.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    required
                    placeholder="Votre Nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/55 rounded-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Téléphone ou Email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/55 rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base focus:outline-none focus:border-monarq-gold transition-colors text-monarq-ink rounded-none appearance-none"
                  >
                    <option>Anniversaire / Célébration</option>
                    <option>Déjeuner d'Affaires</option>
                    <option>Lancement / Réception</option>
                    <option>Cocktail / Apéritif</option>
                    <option>Autre Événement</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre d'invités estimé"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/55 rounded-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Date souhaitée ou période envisagée"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/55 rounded-none"
                />

                <textarea
                  rows={3}
                  placeholder="Décrivez votre événement, vos souhaits, vos contraintes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base focus:outline-none focus:border-monarq-gold transition-colors text-monarq-ink placeholder:text-monarq-ink-soft/55 resize-y min-h-[60px] rounded-none"
                />

                <button
                  type="submit"
                  className="group flex items-center gap-3 font-sans text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold text-monarq-ink hover:text-monarq-gold-deep transition-colors mt-6"
                >
                  <span>Envoyer la Demande</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 6. FAQ Accordion ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-monarq-line">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
              Questions Fréquentes
            </h2>
          </FadeUp>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeUp key={index} delay={index * 0.08}>
                <div className="border-b border-monarq-line pb-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
                  >
                    <h3 className="font-serif text-lg sm:text-xl text-monarq-ink font-semibold group-hover:text-monarq-gold-deep transition-colors pr-8">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-monarq-gold transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_CINEMATIC as unknown as number[] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-base text-monarq-ink-soft font-light leading-relaxed mt-4 pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="w-full bg-marble-pattern border-t border-monarq-line/50 py-20 md:py-28 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-5">
          <Sparkles className="w-8 h-8 text-monarq-gold mx-auto mb-2" />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
            Faisons de Votre Événement un Souvenir
          </h2>
          <p className="font-sans text-base sm:text-lg text-monarq-ink-soft max-w-lg mx-auto leading-relaxed font-light">
            Appelez-nous directement pour discuter de votre projet en quelques minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <motion.button
              onClick={onOpenReservation}
              className="btn-gold px-9 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury"
              whileHover={reduce ? {} : { y: -1, scale: 1.01 }}
              whileTap={reduce ? {} : { scale: 0.96 }}
              transition={SPRING_SNAP}
            >
              Réserver
            </motion.button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full border border-monarq-gold/50 text-monarq-gold-deep text-xs uppercase tracking-[0.2em] font-semibold hover:border-monarq-gold transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Appeler le Restaurant</span>
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
