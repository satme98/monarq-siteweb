import React from 'react';
import { 
  FadeUp, 
  FadeIn, 
  SlideLeft, 
  SlideRight, 
  ScaleReveal, 
  ParallaxImage, 
  StaggerGroup, 
  StaggerItem 
} from '../components/Animations';
import { SectionEyebrow } from '../components/SectionEyebrow';
import { siteConfig } from '../data/siteConfig';
import { DroneVideoPlayer } from '../components/DroneVideoPlayer';

interface AtmospherePageProps {
  onOpenReservation: () => void;
  setActiveTab: (tab: string) => void;
}

export default function AtmospherePage({ onOpenReservation, setActiveTab }: AtmospherePageProps) {
  return (
    <div className="bg-monarq-paper min-h-screen pt-32 pb-24">
      {/* 1. OPENING */}
      <section className="bg-marble-pattern py-24 md:py-36 px-6 flex flex-col items-center justify-center text-center">
        <FadeUp delay={0.2}>
          <SectionEyebrow>L'Esprit MONARQ</SectionEyebrow>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-monarq-ink mb-8 leading-tight max-w-5xl font-semibold">
            L'art de recevoir <br/> <span className="font-editorial italic font-normal text-monarq-gold-deep">à la tangéroise</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="font-sans text-monarq-ink-soft text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Un havre de paix intemporel où l'élégance se marie à la chaleur de l'hospitalité marocaine, offrant une expérience singulière au cœur de la ville blanche.
          </p>
        </FadeUp>
      </section>

      {/* 2. EDITORIAL SPLIT SECTION */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7">
            <SlideLeft>
              <SectionEyebrow align="left">Architecture & Esprit</SectionEyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold mb-10 leading-tight">L'âme du Palais</h2>
              <div className="font-sans text-monarq-ink-soft text-base sm:text-lg md:text-[19px] leading-[1.8] space-y-6 font-normal">
                <p>
                  Dans les murs de cette demeure d'exception, chaque détail murmure une histoire. Restauré avec une passion dévorante pour le patrimoine, le lieu conserve son cachet d'antan tout en embrassant une modernité subtile et raffinée.
                </p>
                <p>
                  Les boiseries sculptées, les marbres nobles et la grande verrière baignée de lumière composent une symphonie visuelle. Ici, le temps s'étire et invite à la contemplation. Nous avons voulu créer bien plus qu'un restaurant : un véritable sanctuaire dédié aux sens.
                </p>
                <p>
                  Notre vision s'ancre dans le respect des traditions, réinventées pour surprendre et émouvoir. Chaque espace a été pensé pour offrir une intimité rare, que ce soit pour un déjeuner confidentiel ou une célébration mémorable.
                </p>
              </div>
            </SlideLeft>
          </div>
          
          <div className="lg:col-span-5 relative">
            <SlideRight>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-0 group shadow-luxury border border-monarq-gold/25">
                  <img src="/images/staggered-story-1.jpg" alt="Détail architectural" className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-108" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-12 md:mt-16 group shadow-luxury border border-monarq-gold/25">
                  <img src="/images/staggered-story-2.jpg" alt="Ambiance tamisée" className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-108" />
                </div>
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* 3. FULL-WIDTH ATMOSPHERIC IMAGE */}
      <section className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden">
        <ParallaxImage 
          src="/images/interlude-atmosphere.jpg" 
          alt="L'atmosphère du Monarq"
        />
        <div className="absolute inset-0 bg-monarq-black/45 flex items-center justify-center p-6 text-center backdrop-blur-[1px]">
          <FadeIn delay={0.3}>
            <p className="font-editorial italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-monarq-paper max-w-4xl leading-snug font-normal">
              « L'élégance n'est pas de se faire remarquer, mais de s'en souvenir. »
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4. THREE VALUES */}
      <section className="py-28 md:py-44 px-6 max-w-4xl mx-auto">
        <FadeUp>
          <SectionEyebrow>Nos Piliers</SectionEyebrow>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-monarq-ink font-semibold text-center mb-20">Nos Essentiels</h2>
        </FadeUp>
        
        <StaggerGroup className="flex flex-col">
          {[
            {
              num: "01",
              title: "L'Excellence",
              desc: "Une quête perpétuelle de perfection, des produits sourcés avec intransigeance jusqu'au dressage millimétré de chaque assiette."
            },
            {
              num: "02",
              title: "L'Authenticité",
              desc: "Le respect profond de nos racines culinaires, sublimées par des techniques contemporaines sans jamais dénaturer le goût originel."
            },
            {
              num: "03",
              title: "L'Hospitalité",
              desc: "Un service prévenant, discret et chaleureux, pour que chaque hôte se sente privilégié et attendu."
            }
          ].map((value, idx) => (
            <React.Fragment key={value.num}>
              {idx !== 0 && <div className="h-[1px] w-full bg-monarq-gold/30 my-12 md:my-16" />}
              <StaggerItem>
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                  <span className="font-serif text-5xl sm:text-6xl md:text-7xl text-monarq-gold font-semibold leading-none">
                    {value.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-monarq-ink font-semibold mb-4">{value.title}</h3>
                    <p className="font-sans text-monarq-ink-soft text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </React.Fragment>
          ))}
        </StaggerGroup>
      </section>

      {/* 5. DRONE VIDEO */}
      <section className="py-12 md:py-24 px-6 max-w-6xl mx-auto">
        <FadeUp>
          <div className="rounded-2xl overflow-hidden shadow-2xl double-bezel bg-monarq-ink">
            <DroneVideoPlayer 
              src={siteConfig.videos.interiorWalkthrough} 
              poster="/images/hero-interior.jpg"
              title="Visite immersive"
              subtitle="À la découverte de MONARQ Tanger"
            />
          </div>
        </FadeUp>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="py-28 md:py-36 px-6 flex flex-col items-center text-center bg-marble-pattern border-t border-monarq-line/50">
        <ScaleReveal>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-monarq-ink font-semibold mb-8">Vivez l'expérience Monarq</h2>
          <p className="font-sans text-monarq-ink-soft text-base sm:text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Nous serions honorés de vous accueillir pour un moment hors du temps. Réservez votre table et laissez-nous prendre soin de vous.
          </p>
          <button 
            onClick={onOpenReservation}
            className="btn-gold px-12 py-4 text-xs uppercase tracking-[0.22em] font-semibold rounded-full shadow-luxury hover:shadow-luxury-lg"
          >
            Réserver une table
          </button>
        </ScaleReveal>
      </section>
    </div>
  );
}
