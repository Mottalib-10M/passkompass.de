/**
 * Le catalogue officiel (src/data/fragen.json, BAMF, état du 7 mai 2025) et ce qu'on en tire :
 * liste des Länder, tirage d'une Probeprüfung (30 questions générales + 3 du Land, § 1 EinbTestV).
 * Les solutions sont établies par Radif Partners (le BAMF ne publie pas de corrigé en PDF).
 */
import F from '../data/fragen.json';
import P from '../data/params-2026.json';

export interface Frage { id: string; l: string | null; q: string; o: string[]; a: number; e: string[]; b?: string; n?: string[] }
export const FRAGEN = F.fragen as Frage[];
export const STAND = F.stand;
export const ALLGEMEIN = FRAGEN.filter((f) => !f.l);

export interface Land { code: string; de: string; en: string; slugDe: string; slugEn: string; hauptstadt: string; stadtstaat: boolean }
export const LAENDER: Land[] = [
  { code: 'BW', de: 'Baden-Württemberg', en: 'Baden-Württemberg', slugDe: 'baden-wuerttemberg', slugEn: 'baden-wuerttemberg', hauptstadt: 'Stuttgart', stadtstaat: false },
  { code: 'BY', de: 'Bayern', en: 'Bavaria', slugDe: 'bayern', slugEn: 'bavaria', hauptstadt: 'München', stadtstaat: false },
  { code: 'BE', de: 'Berlin', en: 'Berlin', slugDe: 'berlin', slugEn: 'berlin', hauptstadt: 'Berlin', stadtstaat: true },
  { code: 'BB', de: 'Brandenburg', en: 'Brandenburg', slugDe: 'brandenburg', slugEn: 'brandenburg', hauptstadt: 'Potsdam', stadtstaat: false },
  { code: 'HB', de: 'Bremen', en: 'Bremen', slugDe: 'bremen', slugEn: 'bremen', hauptstadt: 'Bremen', stadtstaat: true },
  { code: 'HH', de: 'Hamburg', en: 'Hamburg', slugDe: 'hamburg', slugEn: 'hamburg', hauptstadt: 'Hamburg', stadtstaat: true },
  { code: 'HE', de: 'Hessen', en: 'Hesse', slugDe: 'hessen', slugEn: 'hesse', hauptstadt: 'Wiesbaden', stadtstaat: false },
  { code: 'MV', de: 'Mecklenburg-Vorpommern', en: 'Mecklenburg-Western Pomerania', slugDe: 'mecklenburg-vorpommern', slugEn: 'mecklenburg-western-pomerania', hauptstadt: 'Schwerin', stadtstaat: false },
  { code: 'NI', de: 'Niedersachsen', en: 'Lower Saxony', slugDe: 'niedersachsen', slugEn: 'lower-saxony', hauptstadt: 'Hannover', stadtstaat: false },
  { code: 'NW', de: 'Nordrhein-Westfalen', en: 'North Rhine-Westphalia', slugDe: 'nrw', slugEn: 'nrw', hauptstadt: 'Düsseldorf', stadtstaat: false },
  { code: 'RP', de: 'Rheinland-Pfalz', en: 'Rhineland-Palatinate', slugDe: 'rheinland-pfalz', slugEn: 'rhineland-palatinate', hauptstadt: 'Mainz', stadtstaat: false },
  { code: 'SL', de: 'Saarland', en: 'Saarland', slugDe: 'saarland', slugEn: 'saarland', hauptstadt: 'Saarbrücken', stadtstaat: false },
  { code: 'SN', de: 'Sachsen', en: 'Saxony', slugDe: 'sachsen', slugEn: 'saxony', hauptstadt: 'Dresden', stadtstaat: false },
  { code: 'ST', de: 'Sachsen-Anhalt', en: 'Saxony-Anhalt', slugDe: 'sachsen-anhalt', slugEn: 'saxony-anhalt', hauptstadt: 'Magdeburg', stadtstaat: false },
  { code: 'SH', de: 'Schleswig-Holstein', en: 'Schleswig-Holstein', slugDe: 'schleswig-holstein', slugEn: 'schleswig-holstein', hauptstadt: 'Kiel', stadtstaat: false },
  { code: 'TH', de: 'Thüringen', en: 'Thuringia', slugDe: 'thueringen', slugEn: 'thuringia', hauptstadt: 'Erfurt', stadtstaat: false },
];
export const landByCode = (c: string) => LAENDER.find((l) => l.code === c)!;
export const landFragen = (code: string) => FRAGEN.filter((f) => f.l === code);
export const frageById = (id: string) => FRAGEN.find((f) => f.id === id);

/** Générateur pseudo-aléatoire déterministe (mulberry32) : même graine, même tirage (tests, lien partagé). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function pick<T>(xs: T[], n: number, r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, n);
}
/** Une Probeprüfung comme l'examen : 30 questions générales et 3 du Land, mélangées. */
export function probetest(land: string, seed: number): Frage[] {
  const r = rng(seed);
  const n = P.test.fragen - P.test.landFragen;
  return pick([...pick(ALLGEMEIN, n, r), ...pick(landFragen(land), P.test.landFragen, r)], P.test.fragen, r);
}

/** Thèmes du catalogue, par blocs de numéros (ordre du catalogue officiel). */
export const THEMEN: Array<{ id: string; von: number; bis: number; de: string; en: string }> = [
  { id: 'grundrechte', von: 1, bis: 54, de: 'Grundrechte, Rechtsstaat, Staatsaufbau', en: 'Basic rights, rule of law, structure of the state' },
  { id: 'organe', von: 55, bis: 150, de: 'Verfassungsorgane, Wahlen, Parteien, Gerichte', en: 'Constitutional bodies, elections, parties, courts' },
  { id: 'geschichte', von: 151, bis: 211, de: 'Geschichte: NS-Zeit, Teilung, Wiedervereinigung', en: 'History: Nazi era, division, reunification' },
  { id: 'europa', von: 212, bis: 240, de: 'Deutschland in Europa', en: 'Germany in Europe' },
  { id: 'alltag', von: 241, bis: 300, de: 'Alltag, Familie, Arbeit, Religion, Migration', en: 'Everyday life, family, work, religion, migration' },
];
