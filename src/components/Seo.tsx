import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../routes';
import lock from '../lock.json';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  canonicalPath?: string;
  jsonLd?: object | object[];
}

const DEFAULT_IMAGE = '/website-images/og/monarq-og-default.jpg';

export const Seo: React.FC<SeoProps> = ({ title, description, path, image = DEFAULT_IMAGE, noindex: noindexProp = false, canonicalPath, jsonLd }) => {
  const noindex = noindexProp || lock.locked;
  const url = SITE_URL + path;
  const canonical = SITE_URL + (canonicalPath ?? path);
  const img = image.startsWith('http') ? image : SITE_URL + image;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MONARQ Tanger" />
      <meta property="og:locale" content="fr_MA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};
