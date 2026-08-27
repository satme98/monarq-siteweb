import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Send, 
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { FadeUp, SlideLeft, SlideRight, FadeIn, CurtainReveal } from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';

interface ContactPageProps {
  onOpenReservation: () => void;
}

export default function ContactPage({ onOpenReservation }: ContactPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Renseignement Général',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: "Faut-il obligatoirement réserver pour le brunch ?",
      a: "La réservation n'est pas obligatoire mais fortement conseillée le week-end entre 10h30 et 13h00 pour garantir votre table.",
    },
    {
      q: "Proposez-vous des options végétariennes ?",
      a: "Oui, nous proposons de nombreuses tartines, salades, omelettes, pizzas burrata et brunchs équilibrés 100% végétariens.",
    },
    {
      q: "Quels sont vos horaires de service pour le brunch et le dîner ?",
      a: "Nous servons les petits déjeuners et brunchs signatures dès 08h00, et notre carte complète de cuisine, pâtes fraîches et pizzas au feu de bois jusqu'à minuit.",
    },
    {
      q: "Puis-je organiser un événement privé ou un anniversaire ?",
      a: "Tout à fait. Nous accueillons avec plaisir les groupes et événements privés. Contactez-nous par WhatsApp ou par téléphone pour privatiser un espace.",
    },
  ];

  return (
    <div className="bg-monarq-paper min-h-screen text-monarq-ink pt-24">
      
      {/* 1. Split Layout (Photo / Contact Info) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Atmospheric Photo with Curtain Reveal */}
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden rounded-2xl">
            <CurtainReveal direction="up" duration={0.9} className="w-full h-full">
              <div className="relative w-full h-full group">
                <img 
                  src="/images/staggered-story-1.jpg" 
                  alt="Intérieur MONARQ" 
                  className="w-full h-full object-cover transition-transform duration-500 ease-monarch group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-monarq-ink/35 flex flex-col justify-end p-8 md:p-12">
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mb-3">
                    L'Art de <br /> Recevoir
                  </h1>
                  <p className="font-sans text-white/90 font-light tracking-wide max-w-sm text-sm md:text-base leading-relaxed">
                    Un cadre chic et chaleureux au cœur de Tanger.
                  </p>
                </div>
              </div>
            </CurtainReveal>
          </div>

          {/* Right: Contact Info & Form */}
          <SlideLeft className="space-y-16">
            
            {/* Contact Details List */}
            <div className="space-y-10">
              <div>
                <SectionEyebrow align="left">Informations & Accès</SectionEyebrow>
                <h2 className="font-serif text-3xl sm:text-4xl text-monarq-ink font-semibold mb-8">Coordonnées</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-monarq-gold-deep mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-monarq-gold-deep font-semibold mb-1">Adresse</p>
                      <p className="font-sans text-base sm:text-lg text-monarq-ink font-medium">{siteConfig.fullAddress}</p>
                      <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 mt-2 font-sans text-xs uppercase tracking-widest text-monarq-gold-deep hover:text-monarq-ink transition-colors font-semibold">
                        <span>Itinéraire Google Maps</span>
                        <ArrowUpRight className="w-4 h-4 text-monarq-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-monarq-gold-deep mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-monarq-gold-deep font-semibold mb-1">Téléphone</p>
                      <a href={`tel:${siteConfig.phone}`} className="font-sans text-base sm:text-lg text-monarq-ink hover:text-monarq-gold-deep transition-colors font-medium">
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-5 h-5 text-monarq-gold-deep mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-monarq-gold-deep font-semibold mb-1">WhatsApp Direct</p>
                      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-sans text-base sm:text-lg text-monarq-ink hover:text-monarq-gold-deep transition-colors font-medium">
                        <span>Démarrer une discussion instantanée</span>
                        <ArrowUpRight className="w-4 h-4 text-monarq-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-monarq-gold-deep mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-monarq-gold-deep font-semibold mb-1">Horaires</p>
                      <p className="font-sans text-base sm:text-lg text-monarq-ink font-medium">Lundi — Dimanche : 08h00 — 00h00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Contact Form */}
            <div>
              <SectionEyebrow align="left">Formulaire de Contact</SectionEyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl text-monarq-ink font-semibold mb-8">Nous Écrire</h2>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-monarq-gold" />
                  <p className="font-serif text-2xl text-monarq-ink font-semibold">Message envoyé avec succès</p>
                  <p className="font-sans text-monarq-ink-soft font-normal text-base">Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      required
                      placeholder="Votre Nom"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/60 rounded-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Téléphone ou Email"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base text-monarq-ink focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/60 rounded-none"
                    />
                  </div>
                  
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base focus:outline-none focus:border-monarq-gold transition-colors text-monarq-ink rounded-none appearance-none"
                  >
                    <option value="Renseignement Général">Renseignement Général</option>
                    <option value="Événement Privé / Groupe">Événement Privé / Groupe (10+)</option>
                    <option value="Partenariat / Presse">Partenariat / Presse</option>
                    <option value="Autre Demande">Autre Demande</option>
                  </select>

                  <textarea
                    required
                    rows={2}
                    placeholder="Votre Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3.5 px-0 font-sans text-base focus:outline-none focus:border-monarq-gold transition-colors text-monarq-ink placeholder:text-monarq-ink-soft/60 resize-y min-h-[50px] rounded-none"
                  />

                  <button
                    type="submit"
                    className="group flex items-center gap-3 font-sans text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold text-monarq-ink hover:text-monarq-gold-deep transition-colors mt-8"
                  >
                    <span>Envoyer le message</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </SlideLeft>
        </div>
      </section>

      {/* 2. Minimal FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-monarq-line">
        <FadeUp>
          <SectionEyebrow>Foire Aux Questions</SectionEyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold text-center mb-16">
            Questions Fréquentes
          </h2>
        </FadeUp>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FadeUp key={index} delay={index * 0.1}>
              <div className="border-b border-monarq-line pb-6">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
                >
                  <h3 className="font-serif text-xl sm:text-2xl text-monarq-ink font-semibold group-hover:text-monarq-gold-deep transition-colors">
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-monarq-gold transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="mt-4 pr-12">
                    <p className="font-sans text-base sm:text-lg text-monarq-ink-soft font-normal leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 3. Bottom Reservation CTA Band */}
      <section className="w-full bg-marble-pattern border-t border-monarq-line/50 py-20 md:py-28 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto space-y-4">
          <SectionEyebrow>Réservations</SectionEyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold">
            Une Table Vous Attend
          </h2>
          <p className="font-sans text-base sm:text-lg text-monarq-ink-soft max-w-lg mx-auto leading-relaxed font-light mb-6">
            Pour un moment privilégié à Tanger, réservez votre table en quelques clics.
          </p>
          <button 
            onClick={onOpenReservation}
            className="btn-gold px-9 py-3.5 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury hover:shadow-luxury-lg"
          >
            Réserver
          </button>
        </FadeIn>
      </section>

    </div>
  );
}
