/**
 * Entraîneur du test « Leben in Deutschland » / Einbürgerungstest.
 *   mode « probe »   : une Probeprüfung comme l'examen (30 questions générales + 3 du Land, 17 bonnes pour réussir).
 *   mode « katalog » : tout le catalogue ou un thème ou un Land, question par question, avec la solution.
 * Le premier rendu est celui du build (graine fixe) ; un nouveau tirage ne se fait qu'au clic (RECETTE §17.5).
 * Les questions restent en allemand, comme à l'examen ; la page anglaise ajoute la traduction.
 */
import { useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { FRAGEN, ALLGEMEIN, LAENDER, THEMEN, landFragen, probetest, type Frage } from '../../lib/fragen';
import P from '../../data/params-2026.json';
import type { Lang } from '../../lib/format';

const L = {
  de: { land: 'Bundesland', neu: 'Neue Probeprüfung', frage: 'Frage', von: 'von', weiter: 'Nächste Frage', zurueck: 'Zurück', richtig: 'Richtig', falsch: 'Falsch, richtig ist', ergebnis: 'Ihr Ergebnis', beantwortet: 'beantwortet', bestanden: 'Bestanden', nicht: 'Noch nicht bestanden', grenze: `Bestanden ab ${P.test.bestehen} von ${P.test.fragen} richtigen Antworten, ${P.test.minuten} Minuten Zeit.`, auswahl: 'Fragen', alle: `Alle ${P.katalog.allgemein} allgemeinen Fragen`, fehler: 'Ihre Fehler', bild: 'Im Test als Bild; hier in Worten beschrieben.', zufall: 'Zufällige Frage', landQ: 'Landesfrage' },
  en: { land: 'Federal state', neu: 'New mock test', frage: 'Question', von: 'of', weiter: 'Next question', zurueck: 'Back', richtig: 'Correct', falsch: 'Wrong, the answer is', ergebnis: 'Your score', beantwortet: 'answered', bestanden: 'Passed', nicht: 'Not passed yet', grenze: `Pass mark: ${P.test.bestehen} of ${P.test.fragen} correct, ${P.test.minuten} minutes.`, auswahl: 'Questions', alle: `All ${P.katalog.allgemein} general questions`, fehler: 'Your mistakes', bild: 'Shown as a picture in the test; described in words here.', zufall: 'Random question', landQ: 'State question' },
  tr: { land: 'Eyalet', neu: 'Yeni deneme sınavı', frage: 'Soru', von: '/', weiter: 'Sonraki soru', zurueck: 'Geri', richtig: 'Doğru', falsch: 'Yanlış, doğru cevap', ergebnis: 'Sonucunuz', beantwortet: 'cevaplandı', bestanden: 'Geçtiniz', nicht: 'Henüz geçmediniz', grenze: `${P.test.fragen} sorudan en az ${P.test.bestehen} doğru gerekir, süre ${P.test.minuten} dakika. Sorular sınavdaki gibi Almanca.`, auswahl: 'Sorular', alle: `${P.katalog.allgemein} genel sorunun tümü`, fehler: 'Hatalarınız', bild: 'Sınavda resim olarak; burada sözle anlatılıyor.', zufall: 'Rastgele soru', landQ: 'Eyalet sorusu' },
  ar: { land: 'الولاية', neu: 'اختبار تجريبي جديد', frage: 'السؤال', von: 'من', weiter: 'السؤال التالي', zurueck: 'رجوع', richtig: 'صحيح', falsch: 'خطأ، الإجابة الصحيحة', ergebnis: 'نتيجتك', beantwortet: 'تمت الإجابة', bestanden: 'ناجح', nicht: 'لم تنجح بعد', grenze: `النجاح بـ ${P.test.bestehen} إجابة صحيحة من ${P.test.fragen} خلال ${P.test.minuten} دقيقة. الأسئلة بالألمانية كما في الامتحان.`, auswahl: 'الأسئلة', alle: `جميع الأسئلة العامة (${P.katalog.allgemein})`, fehler: 'أخطاؤك', bild: 'تظهر صورةً في الامتحان؛ وهنا موصوفة بالكلمات.', zufall: 'سؤال عشوائي', landQ: 'سؤال الولاية' },
};

interface Props { lang: Lang; mode: 'probe' | 'katalog'; land?: string; auswahl?: string; idPrefix?: string }

export default function Trainer({ lang, mode, land: land0 = 'BE', auswahl: aus0, idPrefix = 'q' }: Props) {
  const t = L[lang];
  const [land, setLand] = useState(land0);
  const [seed, setSeed] = useState(1);
  const [aus, setAus] = useState(aus0 ?? 'alle');
  const liste: Frage[] = useMemo(() => {
    if (mode === 'probe') return probetest(land, seed);
    if (aus === 'alle') return ALLGEMEIN;
    if (aus.startsWith('land-')) return landFragen(aus.slice(5));
    const th = THEMEN.find((x) => x.id === aus);
    return th ? ALLGEMEIN.filter((f) => Number(f.id) >= th.von && Number(f.id) <= th.bis) : ALLGEMEIN;
  }, [mode, land, seed, aus]);
  const [idx, setIdx] = useState(0);
  const [antw, setAntw] = useState<Record<string, number>>({});
  const f = liste[Math.min(idx, liste.length - 1)];
  const gewaehlt = antw[f.id];
  const beantwortet = liste.filter((x) => antw[x.id] !== undefined);
  const richtig = beantwortet.filter((x) => antw[x.id] === x.a).length;
  const fertig = mode === 'probe' && beantwortet.length === liste.length;
  const reset = (fn: () => void) => { fn(); setIdx(0); setAntw({}); };
  const auswahlOpts = [{ value: 'alle', label: t.alle }, ...THEMEN.map((x) => ({ value: x.id, label: `${x.von}–${x.bis}: ${lang === 'de' ? x.de : x.en}` })), ...LAENDER.map((x) => ({ value: `land-${x.code}`, label: `${t.landQ}: ${lang === 'de' ? x.de : x.en}` }))];
  const landOpts = LAENDER.map((x) => ({ value: x.code, label: lang === 'de' ? x.de : x.en }));
  const nr = f.l ? `${f.l} ${f.id.split('-')[1]}` : `Nr. ${f.id}`;
  const btn = (i: number) => {
    const done = gewaehlt !== undefined;
    const cls = !done ? 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50' : i === f.a ? 'border-green-700 bg-green-50' : i === gewaehlt ? 'border-red-700 bg-red-50' : 'border-navy-200 bg-white opacity-70';
    return (
      <button key={i} type="button" aria-pressed={gewaehlt === i}
        onClick={() => { if (!done) setAntw((o) => ({ ...o, [f.id]: i })); }}
        className={`flex w-full items-start gap-3 rounded-lg border-2 px-3 py-2.5 text-left text-[0.95rem] text-navy-900 ${cls}`}>
        <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-300 text-xs font-semibold">{'abcd'[i]}</span>
        <span><span lang="de">{f.o[i]}</span>{lang === 'en' && <span className="block text-sm text-navy-600">{f.e[i + 1]}</span>}</span>
      </button>
    );
  };
  const fehler = liste.filter((x) => antw[x.id] !== undefined && antw[x.id] !== x.a);
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div>
          <div className="mb-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            {mode === 'probe'
              ? <SelectField id={`${idPrefix}-land`} label={t.land} value={land} onChange={(x) => reset(() => setLand(String(x)))} options={landOpts} />
              : <SelectField id={`${idPrefix}-aus`} label={t.auswahl} value={aus} onChange={(x) => reset(() => setAus(String(x)))} options={auswahlOpts} />}
            <button type="button" onClick={() => (mode === 'probe' ? reset(() => setSeed((s) => s + 1 + Math.floor(Math.random() * 1e6))) : setIdx(Math.floor(Math.random() * liste.length)))} className="h-12 rounded-lg border border-accent-700 px-4 text-sm font-semibold text-accent-700 hover:bg-accent-50">{mode === 'probe' ? t.neu : t.zufall}</button>
          </div>
          <p className="text-sm font-medium text-navy-600">{t.frage} {idx + 1} {t.von} {liste.length} · {nr}</p>
          <p className="mt-1 text-lg font-semibold leading-snug text-navy-900" lang="de">{f.q}</p>
          {lang === 'en' && <p className="mt-1 text-navy-700">{f.e[0]}</p>}
          {(f.n || f.b) && <p className="mt-1 text-sm italic text-navy-600">{f.n ? (lang === 'de' ? f.n[0] : f.n[1]) : t.bild}</p>}
          <div className="mt-3 grid gap-2">{[0, 1, 2, 3].map(btn)}</div>
          {gewaehlt !== undefined && <p role="status" className={`mt-2 text-sm font-semibold ${gewaehlt === f.a ? 'text-green-800' : 'text-red-800'}`}>{gewaehlt === f.a ? t.richtig : `${t.falsch}: ${'abcd'[f.a]}`}</p>}
          <div className="mt-3 flex gap-2">
            <button type="button" disabled={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))} className="h-11 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-700 disabled:opacity-40">{t.zurueck}</button>
            <button type="button" disabled={idx >= liste.length - 1} onClick={() => setIdx((i) => Math.min(liste.length - 1, i + 1))} className="h-11 flex-1 rounded-lg bg-accent-700 px-4 text-sm font-semibold text-white disabled:opacity-40">{t.weiter}</button>
          </div>
        </div>
        <div data-resultat aria-live="polite" className="h-fit rounded-lg border-t-4 border-accent-500 bg-navy-50 p-4 sm:p-5">
          <p className="text-sm font-medium text-navy-700">{t.ergebnis}</p>
          <p className="tabular-nums mt-1 text-[2.3rem] font-bold leading-tight text-navy-900">{richtig} / {mode === 'probe' ? liste.length : beantwortet.length}</p>
          <p className="mt-1 text-sm text-navy-700">{beantwortet.length} {t.beantwortet}{fertig ? ` · ${richtig >= P.test.bestehen ? t.bestanden : t.nicht}` : ''}</p>
          <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded bg-navy-200"><div className="h-full bg-accent-500" style={{ width: `${(beantwortet.length / liste.length) * 100}%` }} /></div>
          <p className="mt-3 text-xs text-navy-600">{t.grenze}</p>
          {fehler.length > 0 && (
            <details className="mt-3 text-sm"><summary className="cursor-pointer font-medium text-navy-800">{t.fehler} ({fehler.length})</summary>
              <ul className="mt-2 space-y-1">{fehler.map((x) => <li key={x.id}><button type="button" className="text-left underline" onClick={() => setIdx(liste.indexOf(x))}>{x.l ? `${x.l} ${x.id.split('-')[1]}` : x.id}: <span lang="de">{x.o[x.a]}</span></button></li>)}</ul>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
export const FRAGEN_ANZAHL = FRAGEN.length;
