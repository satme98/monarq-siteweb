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
      <section className="bg-marble-pattern py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center">
        <FadeUp delay={0.2}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-monarq-ink mb-8 leading-tight max-w-5xl">
            L'art de recevoir <br/> <span className="italic">à la tangéroise</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="font-sans text-monarq-ink-soft text-lg md:text-xl max-w-2xl mx-auto tracking-wide">
            Un havre de paix intemporel où l'élégance se marie à la chaleur de l'hospitalité marocaine, offrant une expérience singulière au cœur de la ville blanche.
          </p>
        </FadeUp>
      </section>

      {/* 2. EDITORIAL SPLIT SECTION */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7">
            <SlideLeft>
              <h2 className="font-serif text-4xl md:text-5xl text-monarq-ink mb-10">L'âme du Palais</h2>
              <div className="font-sans text-monarq-ink-soft text-lg leading-relaxed space-y-6">
                <p>
                  Dans les murs de cette demeure historique, chaque détail murmure une histoire. Restauré avec une passion dévorante pour le patrimoine, le lieu conserve son cachet d'antan tout en embrassant une modernité subtile et raffinée.
                </p>
                <p>
                  Les boiseries sculptées, les zelliges patinés par le temps et les patios baignés de lumière composent une symphonie visuelle. Ici, le temps s'étire et invite à la contemplation. Nous avons voulu créer bien plus qu'un restaurant : un véritable sanctuaire dédié aux sens.
                </p>
                <p>
                  Notre vision s'ancre dans le respect des traditions, réinventées pour surprendre et émouvoir. Chaque espace a été pensé pour offrir une intimité rare, que ce soit pour un dîner confidentiel ou une célébration mémorable.
                </p>
              </div>
            </SlideLeft>
          </div>
          
          <div className="lg:col-span-5 relative">
            <SlideRight>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-0">
                  <img src="/images/staggered-story-1.jpg" alt="Détail architectural" className="object-cover w-full h-full" />
                </div>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden mt-12 md:mt-16">
                  <img src="/images/staggered-story-2.jpg" alt="Ambiance tamisée" className="object-cover w-full h-full" />
                </div>
              </div>
            </SlideRight>
          </div>
        </div>
      </section>

      {/* 3. FULL-WIDTH ATMOSPHERIC IMAGE */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <ParallaxImage 
          src="/images/interlude-atmosphere.jpg" 
          alt="L'atmosphère du Monarq"
        />
        <div className="absolute inset-0 bg-monarq-black/40 flex items-center justify-center p-6 text-center">
          <FadeIn delay={0.3}>
            <p className="font-serif italic text-3xl md:text-5xl text-monarq-paper max-w-3xl leading-snug">
              "L'élégance n'est pas de se faire remarquer, mais de s'en souvenir."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4. THREE VALUES */}
      <section className="py-24 md:py-40 px-6 max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-serif text-3xl md:text-4xl text-monarq-ink text-center mb-20">Nos Essentiels</h2>
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
              {idx !== 0 && <div className="h-[1px] w-full bg-monarq-gold/30 my-10 md:my-16" />}
              <StaggerItem>
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16">
                  <span className="font-serif text-5xl md:text-7xl text-monarq-gold font-light leading-none">
                    {value.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-monarq-ink mb-4">{value.title}</h3>
                    <p className="font-sans text-monarq-ink-soft text-lg md:text-xl leading-relaxed">
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
          <div className="rounded-lg overflow-hidden shadow-2xl double-bezel bg-monarq-ink">
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
      <section className="py-24 md:py-32 px-6 flex flex-col items-center text-center bg-monarq-paper-soft">
        <ScaleReveal>
          <h2 className="font-serif text-4xl md:text-5xl text-monarq-ink mb-8">Vivez l'expérience Monarq</h2>
          <p className="font-sans text-monarq-ink-soft text-lg mb-12 max-w-xl mx-auto">
            Nous serions honorés de vous accueillir pour un moment hors du temps. Réservez votre table et laissez-nous prendre soin de vous.
          </p>
          <button 
            onClick={onOpenReservation}
            className="btn-gold px-12 py-4 text-lg"
          >
            Réserver une table
          </button>
        </ScaleReveal>
      </section>
    </div>
  );
}
