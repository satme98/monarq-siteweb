import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Send, 
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { FadeUp, SlideLeft, SlideRight, FadeIn } from '../components/Animations';

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
      q: "Le couscous marocain est-il servi tous les jours ?",
      a: "Notre couscous traditionnel royal (poulet ou viande avec sept légumes) est préparé et servi exclusivement le vendredi midi.",
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
          
          {/* Left: Atmospheric Photo */}
          <SlideRight className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
            <img 
              src="/images/staggered-story-1.jpg" 
              alt="Intérieur MONARQ" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-monarq-ink/30 flex flex-col justify-end p-8 md:p-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mb-4">
                L'Art de <br /> Recevoir
              </h1>
              <p className="font-sans text-white/90 font-light tracking-wide max-w-md text-sm md:text-base">
                Situé au cœur vibrant de Tanger, {siteConfig.name} vous accueille dans un cadre élégant où chaque détail est pensé pour votre confort.
              </p>
            </div>
          </SlideRight>

          {/* Right: Contact Info & Form */}
          <SlideLeft className="space-y-16">
            
            {/* Contact Details List */}
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-3xl text-monarq-ink mb-8">Coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-monarq-gold mt-1" />
                    <div>
                      <p className="font-sans text-sm tracking-widest text-monarq-ink-soft uppercase mb-1">Adresse</p>
                      <p className="font-sans text-monarq-ink">{siteConfig.fullAddress}</p>
                      <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 font-sans text-xs uppercase tracking-widest text-monarq-ink-soft border-b border-monarq-ink-soft hover:text-monarq-ink hover:border-monarq-ink transition-colors pb-0.5">
                        Itinéraire Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-monarq-gold mt-1" />
                    <div>
                      <p className="font-sans text-sm tracking-widest text-monarq-ink-soft uppercase mb-1">Téléphone</p>
                      <a href={`tel:${siteConfig.phone}`} className="font-sans text-monarq-ink hover:text-monarq-gold transition-colors">
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-5 h-5 text-monarq-gold mt-1" />
                    <div>
                      <p className="font-sans text-sm tracking-widest text-monarq-ink-soft uppercase mb-1">WhatsApp Direct</p>
                      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-monarq-ink hover:text-monarq-gold transition-colors">
                        Démarrer une discussion
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-monarq-gold mt-1" />
                    <div>
                      <p className="font-sans text-sm tracking-widest text-monarq-ink-soft uppercase mb-1">Horaires</p>
                      <p className="font-sans text-monarq-ink">Lundi — Dimanche : 08h00 — 00h00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Contact Form */}
            <div>
              <h2 className="font-serif text-3xl text-monarq-ink mb-8">Nous Écrire</h2>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-monarq-gold" />
                  <p className="font-serif text-xl text-monarq-ink">Message envoyé avec succès</p>
                  <p className="font-sans text-monarq-ink-soft font-light">Notre équipe vous répondra dans les plus brefs délais.</p>
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
                      className="w-full bg-transparent border-b border-monarq-line py-3 px-0 font-sans text-sm focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/60 rounded-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Téléphone ou Email"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-monarq-line py-3 px-0 font-sans text-sm focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/60 rounded-none"
                    />
                  </div>
                  
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3 px-0 font-sans text-sm focus:outline-none focus:border-monarq-gold transition-colors text-monarq-ink rounded-none appearance-none"
                  >
                    <option value="Renseignement Général">Renseignement Général</option>
                    <option value="Événement Privé / Groupe">Événement Privé / Groupe (10+)</option>
                    <option value="Partenariat / Presse">Partenariat / Presse</option>
                    <option value="Autre Demande">Autre Demande</option>
                  </select>

                  <textarea
                    required
                    rows={1}
                    placeholder="Votre Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-monarq-line py-3 px-0 font-sans text-sm focus:outline-none focus:border-monarq-gold transition-colors placeholder:text-monarq-ink-soft/60 resize-y min-h-[40px] rounded-none"
                  />

                  <button
                    type="submit"
                    className="group flex items-center gap-3 font-sans text-sm tracking-[0.2em] uppercase text-monarq-ink hover:text-monarq-gold transition-colors mt-8"
                  >
                    <span>Envoyer</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

          </SlideLeft>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-24">
        <FadeUp className="text-center mb-16">
          <h2 className="font-serif text-4xl text-monarq-ink mb-4">Questions Fréquentes</h2>
          <p className="font-sans text-monarq-ink-soft font-light">Tout ce que vous devez savoir pour préparer votre visite.</p>
        </FadeUp>

        <div className="space-y-0 border-t border-monarq-line">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left py-6 border-b border-monarq-line flex justify-between items-center group"
              >
                <h3 className="font-serif text-xl md:text-2xl text-monarq-ink group-hover:text-monarq-gold transition-colors pr-8">
                  {faq.q}
                </h3>
                <ChevronDown className={`w-5 h-5 text-monarq-ink-soft transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-40 opacity-100 py-6' : 'max-h-0 opacity-0'}`}
              >
                <p className="font-sans text-monarq-ink-soft font-light leading-relaxed pl-4 border-l border-monarq-gold">
                  {faq.a}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 3. Reservation CTA Full Width */}
      <section className="relative py-32 bg-monarq-paper bg-marble-pattern">
        <div className="absolute inset-0 bg-monarq-paper/80"></div>
        <FadeIn className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl text-monarq-ink">
            Réservez Votre Expérience
          </h2>
          <p className="font-sans text-monarq-ink-soft text-lg font-light max-w-xl mx-auto">
            Nous avons hâte de vous accueillir. Assurez-vous une table pour partager un moment unique.
          </p>
          <div className="pt-8">
            <button
              onClick={onOpenReservation}
              className="px-10 py-4 border border-monarq-ink text-monarq-ink hover:bg-monarq-ink hover:text-white transition-colors font-sans text-sm tracking-[0.2em] uppercase"
            >
              Réserver une table
            </button>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
