import { useEffect, useRef } from 'react';

export function useViewportVideo(src: string, shouldPlay = true, eager = false) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    const load = () => { if (video.getAttribute('src') !== src) video.src = src; };
    const sync = () => {
      if (shouldPlay && visible && !document.hidden) {
        load();
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    if (eager) load();
    const nearby = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        load();
        nearby.disconnect();
      }
    }, { rootMargin: '200px' });
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    if (!eager) nearby.observe(video);
    viewport.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => {
      nearby.disconnect();
      viewport.disconnect();
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [src, shouldPlay, eager]);

  return ref;
}
