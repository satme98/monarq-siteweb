import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Expand } from 'lucide-react';
import { closingPhoto, featuredIds, galleryChapters, galleryItems, heroPhoto, photoDetails } from '../data/galleryData';
import { GalleryPicture, Lightbox } from '../components/GalleryMedia';
import './GalleryPage.css';

type Chapter = typeof galleryChapters[number];
type OpenPhoto = (id: string) => void;

function ChapterHeader({ chapter }: { chapter: Chapter }) {
  return <header className="gal-chapter-header">
    <span className="gal-kicker gal-number">{chapter.number}</span>
    <h2 id={chapter.id + '-title'}>{chapter.title}</h2>
    <p>{chapter.description}</p>
  </header>;
}

function GalleryImage({ id, index, open, sizes }: { id: string; index: number; open: OpenPhoto; sizes: string }) {
  const reduce = useReducedMotion();
  const details = photoDetails[id];
  const item = galleryItems.find(photo => photo.id === id)!;
  return <motion.button type="button" className="gal-tile" aria-label={'Agrandir : ' + item.title}
    initial={reduce ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : index * 0.08, ease: 'easeOut' }}
    onClick={() => open(id)}>
    <GalleryPicture id={id} sizes={sizes} />
    {details?.name && <span className="gal-caption"><small>{details.label}</small>{details.name}</span>}
  </motion.button>;
}

function BentoGrid({ chapter, open }: { chapter: Chapter; open: OpenPhoto }) {
  return <div className="gal-bento" role="group" aria-label="Les plats en images">
    {chapter.photos.map((id, index) => <GalleryImage key={id} id={id} index={index} open={open}
      sizes={index === 0 ? '(max-width: 767px) 80vw, (max-width: 1320px) 48vw, 620px' : '(max-width: 767px) 80vw, (max-width: 1320px) 24vw, 310px'} />)}
  </div>;
}

function ChapterNav({ active, go, navRef }: { active: string; go: (id: string) => void; navRef: React.RefObject<HTMLElement> }) {
  const activeLink = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  useLayoutEffect(() => {
    const bar = navRef.current?.firstElementChild as HTMLElement | null;
    const link = activeLink.current;
    if (!bar || !link) return;
    const left = link.getBoundingClientRect().left - bar.getBoundingClientRect().left;
    if (left < 0 || left + link.offsetWidth > bar.clientWidth) {
      bar.scrollTo({ left: bar.scrollLeft + left - (bar.clientWidth - link.offsetWidth) / 2, behavior: reduce ? 'instant' : 'smooth' });
    }
  }, [active, navRef, reduce]);

  return <nav ref={navRef} className="gal-nav" aria-label="Chapitres de la galerie">
    <div>{galleryChapters.map(chapter => <a key={chapter.id} href={'#' + chapter.id}
      ref={chapter.id === active ? activeLink : undefined}
      aria-current={chapter.id === active ? 'location' : undefined}
      onClick={event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        go(chapter.id);
      }}>{chapter.label}</a>)}</div>
  </nav>;
}

function PhotoBand({ id, hero, open, children }: React.PropsWithChildren<{ id: string; hero?: boolean; open: OpenPhoto }>) {
  const target = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  return <section ref={target} className={'gal-band ' + (hero ? 'gal-hero' : 'gal-closing')}>
    <motion.div className="gal-band-image" style={reduce ? undefined : { y }}>
      <GalleryPicture id={id} sizes="100vw" hero={hero} />
    </motion.div>
    <div className="gal-band-shade" />
    <button type="button" className="gal-band-open" onClick={() => open(id)}
      aria-label={'Agrandir : ' + galleryItems.find(photo => photo.id === id)!.title}><Expand size={18} /></button>
    {children}
  </section>;
}

export default function GalleryPage({ onOpenReservation, onViewMenu }: { onOpenReservation: () => void; onViewMenu: () => void }) {
  const page = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(galleryChapters[0].id);
  const [viewer, setViewer] = useState<{ ids: string[]; index: number } | null>(null);
  const open: OpenPhoto = id => setViewer({ ids: featuredIds, index: featuredIds.indexOf(id) });

  useLayoutEffect(() => {
    const header = document.querySelector('header.fixed');
    const chapters = galleryChapters.map(chapter => document.getElementById(chapter.id)!);
    let frame = 0;
    const update = () => {
      const height = header?.getBoundingClientRect().height ?? 74;
      page.current?.style.setProperty('--gal-header', height + 'px');
      const offset = height + (nav.current?.offsetHeight ?? 0);
      page.current?.style.setProperty('--gal-offset', offset + 1 + 'px');
      const line = offset + 35;
      const current = [...chapters].reverse().find(chapter => chapter.getBoundingClientRect().top <= line);
      setActive(current?.id ?? chapters[0].id);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    if (header) observer.observe(header);
    if (nav.current) observer.observe(nav.current);
    const visibility = new IntersectionObserver(schedule);
    chapters.forEach(chapter => visibility.observe(chapter));
    window.addEventListener('scroll', schedule, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  const go = (id: string) => {
    const section = document.getElementById(id);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' });
  };

  return <div ref={page} className="gal-page">
    <PhotoBand id={heroPhoto} hero open={open}>
      <div className="gal-band-content">
        <p className="gal-kicker">Galerie</p>
        <h1>L’UNIVERS MONARQ</h1>
        <p>Une promenade entre élégance, gourmandise et instants partagés.</p>
      </div>
      <button className="gal-scroll" onClick={() => go('le-lieu')} aria-label="Découvrir Le Lieu"><ArrowDown size={18} /></button>
    </PhotoBand>
    <ChapterNav active={active} go={go} navRef={nav} />
    <div className="gal-chapters">
      {galleryChapters.map(chapter => {
        const images = chapter.photos.map((id, index) => <GalleryImage key={id} id={id} index={index} open={open}
          sizes={index === 0 && chapter.id !== 'cafe-douceurs'
            ? '(max-width: 767px) 94vw, (max-width: 1320px) 63vw, 820px'
            : '(max-width: 767px) 46vw, (max-width: 1320px) 32vw, 410px'} />);
        return <section key={chapter.id} id={chapter.id} className={'gal-chapter gal-' + chapter.id}
          tabIndex={-1} aria-labelledby={chapter.id + '-title'}>
          <ChapterHeader chapter={chapter} />
          {chapter.id === 'la-cuisine' ? <BentoGrid chapter={chapter} open={open} /> : <div className="gal-layout">{chapter.id === 'les-brunchs' ? <>{images[0]}<div className="gal-brunch-details">{images.slice(1)}</div></> : images}</div>}
        </section>;
      })}
      <button className="gal-button gal-all" onClick={() => setViewer({ ids: [...new Set([...featuredIds, ...galleryItems.map(photo => photo.id)])], index: 0 })}>
        Voir toutes les photos <ArrowUpRight size={16} />
      </button>
    </div>
    <PhotoBand id={closingPhoto} open={open}>
      <div className="gal-band-content">
        <h2>Vivez l’expérience MONARQ</h2>
        <div className="gal-actions">
          <button className="gal-button gal-reserve" onClick={onOpenReservation}>Réserver une table</button>
          <button className="gal-button gal-menu" onClick={onViewMenu}>Voir la carte</button>
        </div>
      </div>
    </PhotoBand>
    {viewer && <Lightbox ids={viewer.ids} start={viewer.index} onClose={() => setViewer(null)} />}
  </div>;
}
