import routesData from './routes.json';

export const SITE_URL = 'https://monarq.ma';

export interface RouteDef {
  key: string;
  path: string;
  index: boolean;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

// Single source of truth (also read by scripts/prerender.mjs, generate-sitemap.mjs, seo-check.mjs)
export const ROUTES = routesData as RouteDef[];

export const pathFor = (key: string): string => ROUTES.find((r) => r.key === key)?.path ?? '/';

export const keyForPath = (pathname: string): string => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return ROUTES.find((r) => r.path === clean)?.key ?? '';
};
