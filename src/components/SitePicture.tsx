import type { ImgHTMLAttributes } from 'react';
import manifest from '../data/siteImageVariants.json';

type Variant = { stem: string; width: number; height: number; widths: number[] };
const variants: Record<string, Variant> = manifest;

export function SitePicture({ src, sizes = '(max-width: 768px) 100vw, 50vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const variant = src ? variants[src] : undefined;
  if (!variant) return <img loading="lazy" decoding="async" src={src} {...props} />;
  const srcSet = (format: string) => variant.widths
    .map(width => `/images/site-responsive/${variant.stem}-${width}.${format} ${width}w`)
    .join(', ');

  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img loading="lazy" decoding="async" src={src} width={variant.width} height={variant.height} {...props} />
    </picture>
  );
}
