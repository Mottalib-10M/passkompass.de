import { route, hasRoute, type Locale } from './routes';
import { GUIDES, guideById } from '../lib/pages';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  de: { home: 'Einbürgerungstest online', method: 'Methode', about: 'Über uns', widget: 'Rechner einbinden', contact: 'Kontakt', editorial: 'Redaktionsgrundsätze', privacy: 'Datenschutz', terms: 'Impressum', cookies: 'Cookies' },
  en: { home: 'German citizenship test online', method: 'Method', about: 'About', widget: 'Embed the tools', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  tr: { home: 'Vatandaşlık testi', method: 'Yöntem (Almanca)', about: 'Hakkımızda (Almanca)', widget: 'Widget', contact: 'İletişim', editorial: 'Yayın ilkeleri', privacy: 'Gizlilik', terms: 'Künye', cookies: 'Çerezler' },
  ar: { home: 'اختبار الجنسية', method: 'المنهجية (بالألمانية)', about: 'من نحن (بالألمانية)', widget: 'أداة للتضمين', contact: 'اتصل بنا', editorial: 'السياسة التحريرية', privacy: 'الخصوصية', terms: 'بيانات الناشر', cookies: 'ملفات تعريف الارتباط' },
};
export const GROUPS: Array<{ id: Group; label: Record<Locale, string> }> = [
  { id: 'test', label: { de: 'Einbürgerungstest', en: 'Citizenship test', tr: 'Vatandaşlık testi', ar: 'اختبار الجنسية' } },
  { id: 'laender', label: { de: 'Test nach Bundesland', en: 'Test by state', tr: 'Eyaletlere göre test', ar: 'الاختبار حسب الولاية' } },
  { id: 'einb', label: { de: 'Einbürgerung', en: 'Naturalisation', tr: 'Vatandaşlığa geçiş', ar: 'التجنس' } },
  { id: 'aufenthalt', label: { de: 'Aufenthalt', en: 'Residence', tr: 'İkamet', ar: 'الإقامة' } },
];
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? guideById(id)?.[lang]?.nav ?? guideById(id)?.en.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
/** Pages d'un groupe qui existent dans la langue (turc et arabe ne couvrent que quelques pages). */
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g && hasRoute(p.id, lang)).map((p) => link(p.id, lang));
const partial = (lang: Locale) => lang === 'tr' || lang === 'ar';
export function navCategories(lang: Locale): NavCategory[] {
  if (partial(lang)) return [{ label: GROUPS[0].label[lang], links: [link('home', lang), ...GUIDES.filter((p) => hasRoute(p.id, lang)).map((p) => link(p.id, lang))] }];
  return GROUPS.map((g) => ({ label: g.label[lang], links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => (partial(lang) ? [] : [link('method', lang)]);
export const footerColumns = (lang: Locale): NavCategory[] => {
  const site = { label: { de: 'Diese Seite', en: 'This site', tr: 'Bu site', ar: 'هذا الموقع' }[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) };
  if (partial(lang)) return [{ label: GROUPS[0].label[lang], links: GUIDES.filter((p) => hasRoute(p.id, lang)).map((p) => link(p.id, lang)) }, site];
  return [
    { label: GROUPS[0].label[lang], links: inGroup('test', lang) },
    { label: GROUPS[2].label[lang], links: inGroup('einb', lang) },
    { label: GROUPS[3].label[lang], links: inGroup('aufenthalt', lang) },
    site,
  ];
};
/** Les seize Länder, à un clic de toute page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => (partial(lang) ? [] : inGroup('laender', lang));
