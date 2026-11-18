import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryItems, photoDetails } from '../data/galleryData';
import manifest from '../data/galleryVariants.json';
import { getLocalizedGalleryItems, getLocalizedPhotoDetails, useLanguage } from '../i18n';

type Variant = { stem: string; width: number; height: number; widths: number[] };
const variants: Record<string, Variant> = manifest;
const photo = (id: string) => galleryItems.find(item => item.id === id)!;
const variantUrl = (variant: Variant, width: number, format: string) =>
  '/website-images/responsive/gallery/' + variant.stem + '-' + width + '.' + format;

export function GalleryPicture({ id, sizes, hero, viewer }: { id: string; sizes: string; hero?: boolean; viewer?: boolean }) {
  const { lang, t } = useLanguage();
  const localizedItems = useMemo(() => getLocalizedGalleryItems(lang), [lang]);
  const localizedDetails = useMemo(() => getLocalizedPhotoDetails(lang), [lang]);
  const item = localizedItems.find(entry => entry.id === id) ?? photo(id);
  const variant = variants[item.image];
  const detail = localizedDetails[id] ?? photoDetails[id];
  const srcset = (format: string) => variant?.widths.map(width => variantUrl(variant, width, format) + ' ' + width + 'w').join(', ');
  return <picture style={{ '--gal-pos': detail?.position, '--gal-mobile-pos': detail?.mobile } as React.CSSProperties}>
    {variant && <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />}
    {variant && <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />}
    <img src={item.image} width={variant?.width} height={variant?.height}
      alt={detail?.alt ?? `${item.title}, MONARQ ${t.common.city}`}
      loading={hero || viewer ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : undefined} decoding="async" draggable={false} />
  </picture>;
}

type Point = { x: number; y: number };
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const initialTransform = { scale: 1, x: 0, y: 0 };

function ZoomablePhoto({ id, move }: { id: string; move: (step: number) => void }) {
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef({ start: { x: 0, y: 0 }, pinched: false });
  const [transform, setTransform] = useState(initialTransform);

  return <div className="gal-view-stage"
    onPointerDown={event => {
      if (event.pointerType === 'mouse') return;
      event.currentTarget.setPointerCapture(event.pointerId);
      const point = { x: event.clientX, y: event.clientY };
      if (!pointers.current.size) gesture.current = { start: point, pinched: false };
      pointers.current.set(event.pointerId, point);
      if (pointers.current.size > 1) gesture.current.pinched = true;
    }}
    onPointerMove={event => {
      const previous = pointers.current.get(event.pointerId);
      if (!previous) return;
      const before = [...pointers.current.values()];
      const next = { x: event.clientX, y: event.clientY };
      pointers.current.set(event.pointerId, next);
      const after = [...pointers.current.values()];
      const rect = event.currentTarget.getBoundingClientRect();
      const image = event.currentTarget.querySelector('img');
      const fit = Math.min(rect.width / (image?.naturalWidth || rect.width), rect.height / (image?.naturalHeight || rect.height));
      const width = (image?.naturalWidth || rect.width) * fit;
      const height = (image?.naturalHeight || rect.height) * fit;
      setTransform(current => {
        const pinch = before.length === 2;
        if (!pinch && (before.length !== 1 || current.scale <= 1)) return current;
        const scale = pinch ? Math.max(1, Math.min(4, current.scale * distance(after[0], after[1]) / Math.max(1, distance(before[0], before[1])))) : current.scale;
        if (scale <= 1) return initialTransform;
        const from = pinch ? midpoint(before[0], before[1]) : previous;
        const to = pinch ? midpoint(after[0], after[1]) : next;
        const ratio = scale / current.scale;
        const limitX = Math.max(0, (width * scale - rect.width) / 2);
        const limitY = Math.max(0, (height * scale - rect.height) / 2);
        return {
          scale,
          x: Math.max(-limitX, Math.min(limitX, to.x - from.x + current.x * ratio + (from.x - rect.left - rect.width / 2) * (1 - ratio))),
          y: Math.max(-limitY, Math.min(limitY, to.y - from.y + current.y * ratio + (from.y - rect.top - rect.height / 2) * (1 - ratio))),
        };
      });
    }}
    onPointerUp={event => {
      if (!pointers.current.delete(event.pointerId) || pointers.current.size || gesture.current.pinched || transform.scale > 1) return;
      const dx = event.clientX - gesture.current.start.x;
      const dy = event.clientY - gesture.current.start.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 1 : -1);
    }}
    onLostPointerCapture={event => pointers.current.delete(event.pointerId)}
    onPointerCancel={event => pointers.current.delete(event.pointerId)}
  >
    <div style={{ transform: 'translate(' + transform.x + 'px,' + transform.y + 'px) scale(' + transform.scale + ')' }}>
      <GalleryPicture id={id} viewer sizes="100vw" />
    </div>
  </div>;
}

export function Lightbox({ ids, start, onClose }: { ids: string[]; start: number; onClose: () => void }) {
  const { lang, t } = useLanguage();
  const localizedItems = useMemo(() => getLocalizedGalleryItems(lang), [lang]);
  const localizedPhoto = (photoId: string) => localizedItems.find(entry => entry.id === photoId) ?? photo(photoId);
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const move = (step: number) => setIndex(current => (current + step + ids.length) % ids.length);
  const id = ids[index];

  useLayoutEffect(() => {
    const modal = dialog.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (ids.length < 2) return;
    const preload = window.setTimeout(() => {
      const format = dialog.current?.querySelector('img')?.currentSrc.endsWith('.avif') ? 'avif' : 'webp';
      for (const step of [-1, 1]) {
        const item = photo(ids[(index + step + ids.length) % ids.length]);
        const variant = variants[item.image];
        const target = window.innerWidth * window.devicePixelRatio;
        const width = variant?.widths.find(size => size >= target) ?? variant?.widths.at(-1);
        const image = new Image();
        image.src = variant && width ? variantUrl(variant, width, format) : item.image;
      }
    }, 200);
    return () => window.clearTimeout(preload);
  }, [ids, index]);

  return createPortal(
    <dialog ref={dialog} className="gal-view" aria-label={t.galleryPage.lightboxAria}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowRight' ? 1 : -1);
        }
        if (event.key === 'Tab') {
          const controls = event.currentTarget.querySelectorAll('button');
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}>
      <div className="gal-view-head">
        <span className="gal-kicker">{t.galleryPage.lightboxKicker}</span>
        <button type="button" autoFocus aria-label={t.galleryPage.closeAria} onClick={onClose}><X /></button>
      </div>
      <ZoomablePhoto key={id} id={id} move={move} />
      <div className="gal-view-foot">
        <button type="button" aria-label={t.galleryPage.prevPhotoAria} onClick={() => move(-1)}><ChevronLeft className="rtl:rotate-180" /></button>
        <div aria-live="polite"><span>{index + 1} / {ids.length}</span><p>{localizedPhoto(id).title}</p></div>
        <button type="button" aria-label={t.galleryPage.nextPhotoAria} onClick={() => move(1)}><ChevronRight className="rtl:rotate-180" /></button>
      </div>
    </dialog>,
    document.body,
  );
}
