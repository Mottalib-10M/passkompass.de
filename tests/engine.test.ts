import { describe, expect, it } from 'vitest';
import { einbuergerung, kosten, niederlassung, blauSchwellen, addMonths, monthsBetween, bestanden, type EinbInput } from '../src/lib/engine/einbuergerung';
import F from '../src/data/fragen.json';
import { probetest, LAENDER } from '../src/lib/fragen';

const base: EinbInput = { seit: '2021-03', titel: 'arbeit', eheMitDeutschem: null, deutsch: 'b1', test: true, unterhalt: 'eigen', strafe: 'keine' };

describe('dates', () => {
  it('ajoute des mois au-delà de décembre', () => { expect(addMonths('2021-11', 3)).toBe('2022-02'); expect(addMonths('2021-01', -1)).toBe('2020-12'); });
  it('compte les mois', () => { expect(monthsBetween('2021-03', '2026-03')).toBe(60); });
});

describe('§ 10 StAG', () => {
  it('cinq ans après le début du séjour', () => {
    const r = einbuergerung(base, '2026-10');
    expect(r.fristAb).toBe('2026-03'); expect(r.jetzt).toBe(true); expect(r.fruehestens).toBe('2026-10');
  });
  it('pas encore cinq ans : date future', () => {
    const r = einbuergerung({ ...base, seit: '2023-06' }, '2026-10');
    expect(r.fristAb).toBe('2028-06'); expect(r.jetzt).toBe(false); expect(r.monateBisFrist).toBe(20);
  });
  it('titre d’études exclu', () => { expect(einbuergerung({ ...base, titel: 'studium' }, '2026-10').blockiert).toContain('titel'); });
  it('Bürgergeld bloque, sauf plein temps 20 mois sur 24', () => {
    expect(einbuergerung({ ...base, unterhalt: 'leistungen' }, '2026-10').fruehestens).toBeNull();
    expect(einbuergerung({ ...base, unterhalt: 'vollzeit' }, '2026-10').fruehestens).toBe('2026-10');
  });
  it('allemand A2 : point ouvert, pas bloquant', () => { const r = einbuergerung({ ...base, deutsch: 'a2' }, '2026-10'); expect(r.pruefungen.find((p) => p.id === 'deutsch')?.status).toBe('offen'); expect(r.fruehestens).toBe('2026-10'); });
  it('après une longue absence : retour comme début, ancien séjour crédité trois ans au plus', () => {
    expect(einbuergerung({ ...base, seit: '2025-01', angerechnet: 48 }, '2026-10').fristAb).toBe('2027-01');
  });
});

describe('§ 9 StAG', () => {
  it('trois ans de séjour et deux ans de mariage', () => {
    const r = einbuergerung({ ...base, seit: '2023-01', eheMitDeutschem: '2024-06' }, '2026-10');
    expect(r.weg).toBe('para9'); expect(r.fristAb).toBe('2026-06');
  });
  it('mariage récent : § 10 arrive avant les deux ans de mariage', () => {
    const r = einbuergerung({ ...base, seit: '2022-01', eheMitDeutschem: '2026-01' }, '2026-10');
    expect(r.weg).toBe('para10'); expect(r.fristAb).toBe('2027-01');
  });
});

describe('§ 38 StAG', () => {
  it('255 € par adulte, 51 € par enfant sans revenu, 25 € par test', () => {
    const k = kosten({ erwachsene: 2, kinderMit: 2, kinderEigen: 0, tests: 2 });
    expect(k.gesamt).toBe(2 * 255 + 2 * 51 + 2 * 25);
  });
});

describe('Niederlassungserlaubnis', () => {
  it('Blaue Karte : 27 mois, 21 avec B1', () => {
    expect(niederlassung({ weg: 'blau', monateTitel: 22, monateBeitraege: 22, deutsch: 'b1' }).erfuellt).toBe(true);
    expect(niederlassung({ weg: 'blau', monateTitel: 22, monateBeitraege: 22, deutsch: 'a1' }).fehlenMonate).toBe(5);
  });
  it('voie générale : 60 mois et 60 mois de cotisations', () => {
    const r = niederlassung({ weg: 'allgemein', monateTitel: 60, monateBeitraege: 48, deutsch: 'b1' });
    expect(r.fehlenBeitraege).toBe(12); expect(r.gebuehr).toBe(113);
  });
  it('réfugiés : trois ans avec C1', () => { expect(niederlassung({ weg: 'schutz', monateTitel: 36, monateBeitraege: 0, deutsch: 'c1' }).erfuellt).toBe(true); });
});

describe('Blaue Karte 2026', () => {
  it('50 % et 45,3 % de 101 400 €', () => { const s = blauSchwellen(); expect(s.regel).toBe(50700); expect(s.engpass).toBe(45934.2); });
});

describe('catalogue', () => {
  it('310 questions par Land : 300 générales et 10 par Land, quatre réponses, une bonne', () => {
    expect(F.fragen.filter((f) => !f.l)).toHaveLength(300);
    for (const l of LAENDER) expect(F.fragen.filter((f) => f.l === l.code)).toHaveLength(10);
    for (const f of F.fragen) { expect(f.o).toHaveLength(4); expect(f.e).toHaveLength(5); expect(f.a).toBeGreaterThanOrEqual(0); expect(f.a).toBeLessThan(4); }
  });
  it('Probetest : 30 générales + 3 du Land, sans doublon, reproductible', () => {
    const t = probetest('BY', 7);
    expect(t).toHaveLength(33); expect(new Set(t.map((f) => f.id)).size).toBe(33);
    expect(t.filter((f) => f.l === 'BY')).toHaveLength(3); expect(t.filter((f) => f.l && f.l !== 'BY')).toHaveLength(0);
    expect(probetest('BY', 7).map((f) => f.id)).toEqual(t.map((f) => f.id));
  });
  it('17 bonnes réponses suffisent', () => { expect(bestanden(17)).toBe(true); expect(bestanden(16)).toBe(false); });
});
