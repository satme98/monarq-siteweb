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

export const normalizePath = (pathname: string): string => {
  const collapsed = (pathname || '/').replace(/\/{2,}/g, '/');
  const withoutTrailing = collapsed.length > 1 ? collapsed.replace(/\/+$/, '') || '/' : collapsed;
  const withoutIndex = withoutTrailing.replace(/\/index\.html$/i, '') || '/';
  return withoutIndex.toLowerCase();
};

export const keyForPath = (pathname: string): string => {
  const clean = normalizePath(pathname);
  return ROUTES.find((r) => r.path === clean)?.key ?? '';
};
