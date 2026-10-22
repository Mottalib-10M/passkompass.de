import { makeRouter, type RouteDef } from './routes-core';
import { GUIDES } from '../lib/pages';
/** Allemand d'abord, anglais partout ; turc et arabe sur les pages qui pèsent (routes partielles, hreflang
 *  limité aux paires réelles). */
export const LOCALES = ['de', 'en', 'tr', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';
const R = (id: string, de: string, en: string, noindex = false) => ({ id, paths: { de: `/de/${de}/`, en: `/en/${en}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { de: '/de/', en: '/en/', tr: '/tr/', ar: '/ar/' } },
  R('method', 'methode', 'method'),
  R('about', 'ueber-uns', 'about'),
  R('widget', 'widget', 'widget', true),
  R('contact', 'kontakt', 'contact', true),
  R('editorial', 'redaktionsgrundsaetze', 'editorial-policy', true),
  R('privacy', 'datenschutz', 'privacy', true),
  R('terms', 'impressum', 'legal-notice', true),
  R('cookies', 'cookies', 'cookies', true),
];
const G = (g: (typeof GUIDES)[number]): RouteDef<Locale> => ({ id: g.id, paths: { de: `/de/${g.de.slug}/`, en: `/en/${g.en.slug}/`, ...(g.tr ? { tr: `/tr/${g.tr.slug}/` } : {}), ...(g.ar ? { ar: `/ar/${g.ar.slug}/` } : {}) } });
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...GUIDES.map(G), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, hasRoute, altPaths } = makeRouter(LOCALES, ROUTES);
