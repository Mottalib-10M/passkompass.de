/** Outils d'écriture (`Helpers`) passés au corps de chaque page, dans sa langue. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers, MiniOpts } from './page-types';
import { formatNumber, formatMoney, displayDate, type Lang } from './format';
import { KIT } from './kit';
import P from '../data/params-2026.json';
import { PLANNED_IDS } from './planned';
import { FRAGEN, landByCode } from './fragen';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
type Src = { url: string; label: { de: string; en: string } };
const RAW = (P as unknown as { sources: Record<string, Src> }).sources;
const lab = (v: Src, lang: Lang) => (lang === 'de' ? v.label.de : v.label.en);
export const SOURCES = (lang: Lang): Record<string, { url: string; label: string }> =>
  Object.fromEntries(Object.entries(RAW).map(([k, v]) => [k, { url: v.url, label: lab(v, lang) }]));
export const sourceList = (keys: string[], lang: Lang) => { const S = SOURCES(lang); return keys.map((k) => ({ name: S[k].label, url: S[k].url })); };
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Lang = 'de') {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
export function link(id: string, text: string, lang: Lang) {
  if (!ROUTES.some((r) => r.id === id)) { if (process.env.VITEST && !PLANNED_IDS.has(id)) throw new Error(`Unknown page id in link: ${id}`); return text; }
  return `<a href="${route(id, lang)}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, arg?: MiniOpts) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export const srcLink = (key: string, lang: Lang, text?: string) => { const s = SOURCES(lang)[key]; if (!s) throw new Error(`Unknown source ${key}`); return ext(s.url, text ?? s.label); };
const MONTHS: Record<Lang, string> = { de: 'de-DE', en: 'en-GB', tr: 'tr-TR', ar: 'ar-u-nu-latn' };
export const monthYear = (ym: string, lang: Lang) => new Date(`${ym}-15T00:00:00Z`).toLocaleDateString(MONTHS[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' });
/** Questions du catalogue en liste ordonnée, la bonne réponse marquée ; en anglais, la traduction sous le texte allemand. */
export function fragenListe(ids: string[], lang: Lang, opts: { uebersetzung?: boolean } = {}) {
  const tr = opts.uebersetzung ?? lang === 'en';
  const items = ids.map((id) => {
    const f = FRAGEN.find((x) => x.id === id); if (!f) throw new Error(`Frage ${id} unbekannt`);
    const num = f.l ? `${landByCode(f.l).de} ${id.split('-')[1]}` : id;
    const opt = f.o.map((o, i) => `<li${i === f.a ? ' class="richtig"' : ''}>${esc(o)}${tr ? ` <span class="ue" lang="en">(${esc(f.e[i + 1])})</span>` : ''}${i === f.a ? ` <span class="sr-only">${lang === 'de' ? '(richtige Antwort)' : '(correct answer)'}</span>` : ''}</li>`).join('');
    const note = f.n ? `<p class="frage-note">${esc(lang === 'de' ? f.n[0] : f.n[1])}</p>` : f.b ? `<p class="frage-note">${lang === 'de' ? 'Im Test als Bild; hier in Worten beschrieben.' : 'Shown as a picture in the test; described in words here.'}</p>` : '';
    return `<li class="frage" id="frage-${id}"><p class="frage-q"><span class="frage-nr">${num}</span> <span lang="de">${esc(f.q)}</span>${tr ? `<span class="ue" lang="en">${esc(f.e[0])}</span>` : ''}</p>${note}<ol class="frage-o" type="a">${opt}</ol></li>`;
  }).join('');
  return `<div data-chrome class="not-prose"><ol class="fragenliste">${items}</ol></div>`;
}
export function helpers(lang: Lang): Helpers {
  return {
    ...KIT, lang, a: (id, text) => link(id, text, lang),
    table: (hd, rows, cap, al) => table(hd, rows, cap, al, lang),
    src: (key, text) => srcLink(key, lang, text), ext, box, mini,
    n: (x, d = 0) => formatNumber(x, d, lang), eur: (x, d = 0) => formatMoney(x, d, lang),
    day: (iso) => displayDate(iso, MONTHS[lang]), my: (ym) => monthYear(ym, lang),
    fragen: (ids, o) => fragenListe(ids, lang, o),
  };
}
