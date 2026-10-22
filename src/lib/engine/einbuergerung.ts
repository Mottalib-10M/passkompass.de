/**
 * Moteur pur de l'Einbürgerung (StAG dans sa version d'octobre 2026) et de la Niederlassungserlaubnis
 * (AufenthG). Aucune constante en dur : tout vient de params-2026.json (P). Les dates sont des mois
 * « AAAA-MM » ; « aujourd'hui » est passé en argument (date de lecture des textes), jamais lu sur l'horloge.
 */
import P from '../../data/params-2026.json';

export type Ym = string; // « 2026-10 »
export const ym = (y: number, m: number): Ym => `${y}-${String(m).padStart(2, '0')}`;
export const ymOf = (iso: string): Ym => iso.slice(0, 7);
export function addMonths(a: Ym, n: number): Ym {
  const [y, m] = a.split('-').map(Number);
  const t = y * 12 + (m - 1) + n;
  return ym(Math.floor(t / 12), (t % 12) + 1);
}
export function monthsBetween(a: Ym, b: Ym): number {
  const [y1, m1] = a.split('-').map(Number), [y2, m2] = b.split('-').map(Number);
  return (y2 - y1) * 12 + (m2 - m1);
}
const maxYm = (...xs: Ym[]) => xs.reduce((a, b) => (a > b ? a : b));

/** Titres de séjour, regroupés comme § 10 Abs. 1 Nr. 2 StAG les traite. */
export type Titel = 'unbefristet' | 'blau' | 'arbeit' | 'familie' | 'schutz' | 'eu' | 'studium' | 'humanitaer' | 'duldung';
/** Titres qui ouvrent la naturalisation (Nr. 2) ; les autres sont exclus par la liste de la loi. */
export const TITEL_OK: Record<Titel, boolean> = {
  unbefristet: true, blau: true, arbeit: true, familie: true, schutz: true, eu: true,
  studium: false, humanitaer: false, duldung: false,
};
export type Deutsch = 'keine' | 'a2' | 'b1' | 'c1';
export type Unterhalt = 'eigen' | 'vollzeit' | 'leistungen';
export type Strafe = 'keine' | 'gering' | 'hoeher';
export type Status = 'ok' | 'offen' | 'nein';

export interface EinbInput {
  /** Début du séjour régulier en Allemagne. */
  seit: Ym;
  titel: Titel;
  /** Marié(e) ou partenaire enregistré(e) d'un Allemand ou d'une Allemande : date du mariage, sinon null. */
  eheMitDeutschem: Ym | null;
  deutsch: Deutsch;
  /** Einbürgerungstest réussi (ou diplôme scolaire allemand qui en dispense, selon l'autorité). */
  test: boolean;
  unterhalt: Unterhalt;
  strafe: Strafe;
  /** Mois de l'ancien séjour crédités par l'autorité après une longue absence (§ 12b Abs. 2, trois ans au plus). */
  angerechnet?: number;
}
export interface Pruefung { id: 'aufenthalt' | 'titel' | 'unterhalt' | 'deutsch' | 'test' | 'strafe' | 'bekenntnis' | 'identitaet'; status: Status; ab?: Ym }
export interface EinbResult {
  weg: 'para10' | 'para9';
  /** Mois à partir duquel la durée de séjour est remplie. */
  fristAb: Ym;
  /** Mois de dépôt possible si tout le reste est rempli ; null si un point bloque sans date. */
  fruehestens: Ym | null;
  jetzt: boolean;
  monateBisFrist: number;
  pruefungen: Pruefung[];
  blockiert: Pruefung['id'][];
}

export function einbuergerung(x: EinbInput, heute: Ym): EinbResult {
  const E = P.einb;
  // § 12b : une absence de plus de six mois interrompt le séjour. Le visiteur saisit alors son retour comme
  // début ; l'autorité peut créditer jusqu'à trois ans de l'ancien séjour (§ 12b Abs. 2), saisis à part.
  const credit = Math.min(E.anrechnungJahre * 12, Math.max(0, Math.round(x.angerechnet ?? 0)));
  const start = x.seit;
  const para10Ab = addMonths(start, E.jahre * 12 - credit);
  let weg: EinbResult['weg'] = 'para10', fristAb = para10Ab;
  if (x.eheMitDeutschem) {
    // § 9 Abs. 1 : trois ans de séjour et deux ans de mariage.
    const p9 = maxYm(addMonths(start, E.ehegatteJahre * 12 - credit), addMonths(x.eheMitDeutschem, E.eheJahre * 12));
    if (p9 < para10Ab) { weg = 'para9'; fristAb = p9; }
  }
  const pr: Pruefung[] = [];
  pr.push({ id: 'aufenthalt', status: fristAb <= heute ? 'ok' : 'offen', ab: fristAb });
  pr.push({ id: 'titel', status: TITEL_OK[x.titel] ? 'ok' : 'nein' });
  pr.push({ id: 'unterhalt', status: x.unterhalt === 'leistungen' ? 'nein' : 'ok' });
  pr.push({ id: 'deutsch', status: x.deutsch === 'b1' || x.deutsch === 'c1' ? 'ok' : 'offen' });
  pr.push({ id: 'test', status: x.test ? 'ok' : 'offen' });
  pr.push({ id: 'strafe', status: x.strafe === 'hoeher' ? 'nein' : 'ok' });
  pr.push({ id: 'bekenntnis', status: 'offen' });
  pr.push({ id: 'identitaet', status: 'offen' });
  const blockiert = pr.filter((p) => p.status === 'nein').map((p) => p.id);
  const fruehestens = blockiert.length ? null : maxYm(fristAb, heute);
  return { weg, fristAb, fruehestens, jetzt: !blockiert.length && fristAb <= heute, monateBisFrist: Math.max(0, monthsBetween(heute, fristAb)), pruefungen: pr, blockiert };
}

/** Frais de la procédure (§ 38 StAG) et du test (§ 2 EinbTestV). */
export interface KostenInput { erwachsene: number; kinderMit: number; kinderEigen: number; tests: number }
export function kosten(x: KostenInput) {
  const G = P.gebuehr;
  const erw = Math.max(0, x.erwachsene) * G.einbuergerung;
  const kinder = Math.max(0, x.kinderMit) * G.kind;
  const eigen = Math.max(0, x.kinderEigen) * G.einbuergerung;
  const test = Math.max(0, x.tests) * P.test.gebuehr;
  return { erw, kinder, eigen, test, gesamt: erw + kinder + eigen + test, personen: x.erwachsene + x.kinderMit + x.kinderEigen };
}

/** Résultat d'une Probeprüfung (§ 1 Abs. 3 EinbTestV). */
export const bestanden = (richtig: number) => richtig >= P.test.bestehen;

/** Niederlassungserlaubnis : durée de titre et cotisations exigées selon la voie. */
export type NeWeg = 'blau' | 'fachkraft' | 'fachkraftInland' | 'schutz' | 'ehegatte' | 'allgemein';
export interface NeInput { weg: NeWeg; monateTitel: number; monateBeitraege: number; deutsch: 'a1' | 'a2' | 'b1' | 'c1' }
export interface NeResult { monateNoetig: number; beitraegeNoetig: number; sprache: 'a1' | 'a2' | 'b1' | 'c1'; fehlenMonate: number; fehlenBeitraege: number; spracheOk: boolean; erfuellt: boolean; gebuehr: number }
const LV = { a1: 1, a2: 2, b1: 3, c1: 4 } as const;
export function niederlassung(x: NeInput): NeResult {
  const N = P.ne;
  let m = N.jahre * 12, b: number = N.beitraege, s: NeResult['sprache'] = 'b1';
  if (x.weg === 'blau') { const b1 = LV[x.deutsch] >= LV.b1; m = b1 ? N.blauMonateB1 : N.blauMonate; b = m; s = b1 ? 'b1' : 'a1'; }
  else if (x.weg === 'fachkraft') { m = N.fachkraftJahre * 12; b = N.fachkraftBeitraege; }
  else if (x.weg === 'fachkraftInland') { m = N.fachkraftInlandJahre * 12; b = N.fachkraftInlandBeitraege; }
  else if (x.weg === 'schutz') {
    const c1 = x.deutsch === 'c1';
    m = (c1 ? N.schutzJahreC1 : N.schutzJahre) * 12; b = 0; s = c1 ? 'c1' : 'a2';
  } else if (x.weg === 'ehegatte') { m = N.ehegatteDeutschJahre * 12; b = 0; }
  const fehlenMonate = Math.max(0, m - x.monateTitel), fehlenBeitraege = Math.max(0, b - x.monateBeitraege);
  const spracheOk = LV[x.deutsch] >= LV[s];
  return { monateNoetig: m, beitraegeNoetig: b, sprache: s, fehlenMonate, fehlenBeitraege, spracheOk, erfuellt: !fehlenMonate && !fehlenBeitraege && spracheOk, gebuehr: N.gebuehrSonst };
}

/** Seuils de salaire de la Blaue Karte (§ 18g AufenthG) : pourcentages de la Beitragsbemessungsgrenze. */
export function blauSchwellen() {
  const B = P.blau;
  const r = (x: number) => Math.round(x * 100) / 100;
  return { regel: r(B.bbg * B.regel), engpass: r(B.bbg * B.engpass), bbg: B.bbg, jahr: B.jahr };
}
