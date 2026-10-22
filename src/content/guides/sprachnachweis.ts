import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Langue : § 10 Abs. 4, 4a et 6 StAG. Les prix des examens (telc, Goethe, ÖSD, DTZ) varient selon le centre : non chiffrés. */
const E = K.P.einb;

export default defineGuide({
  id: 'sprachnachweis', group: 'einb', order: 90,
  tool: 'einb', toolArg: { deutsch: 'a2' },
  related: ['test-anmelden', 'voraussetzungen', 'kinder', 'niederlassungserlaubnis'],
  sources: ['stag10'],
  de: {
    slug: 'sprachnachweis-b1-einbuergerung',
    nav: 'Sprachnachweis B1', card: 'Welche Zertifikate zählen, wer befreit ist',
    title: 'Sprachnachweis B1 Einbürgerung 2026: welche Zertifikate',
    description: 'Sprachnachweis B1 für die Einbürgerung 2026: welche Prüfungen zählen, wann ein Schulabschluss reicht, Härtefälle, Ausnahmen für Kinder und frühere Gastarbeiter.',
    h1: 'Deutsch B1 für die Einbürgerung nachweisen',
    intro: `Das Gesetz verlangt Deutsch auf Niveau ${E.sprache} des Europäischen Referenzrahmens, nachgewiesen durch eine Sprachprüfung. Es gibt Ausnahmen.`,
    resume: `Für die Einbürgerung verlangt § 10 Abs. 4 StAG ausreichende Deutschkenntnisse: Sie liegen vor, wenn Sie die Anforderungen einer Sprachprüfung der Stufe ${E.sprache} des Gemeinsamen Europäischen Referenzrahmens erfüllen, und zwar mündlich und schriftlich. Üblich ist ein Zertifikat einer anerkannten Prüfung, etwa der Deutsch-Test für Zuwanderer mit dem Ergebnis B1 am Ende des Integrationskurses, telc Deutsch B1, das Goethe-Zertifikat B1 oder eine ÖSD-Prüfung auf diesem Niveau. Ein höheres Zertifikat wie B2 oder C1 genügt natürlich auch. Viele Behörden erkennen außerdem einen deutschen Schulabschluss, eine Berufsausbildung oder ein Studium in deutscher Sprache an. Kinder unter 16 Jahren brauchen nur eine altersgemäße Sprachentwicklung. Frühere Gastarbeiter und Vertragsarbeiter sowie ihre Ehegatten müssen sich nur mündlich im Alltag verständigen können. Wer trotz ernsthafter Bemühungen B1 nicht erreichen kann, für den kann die Behörde die Anforderung ebenfalls auf den Alltag begrenzen; Krankheit, Behinderung oder Alter befreien ganz.`,
    faqs: [
      { q: 'Reicht der Deutsch-Test für Zuwanderer für die Einbürgerung?', a: 'Ja, wenn das Ergebnis B1 lautet. Der Test am Ende des Integrationskurses bescheinigt entweder A2 oder B1. Nur mit B1 ist die Voraussetzung erfüllt. Wer mit A2 abgeschlossen hat, kann die Prüfung wiederholen oder eine andere anerkannte B1-Prüfung ablegen, etwa telc oder Goethe.' },
      { q: 'Wie alt darf das Sprachzertifikat sein?', a: 'Das Gesetz nennt kein Ablaufdatum. Ein B1-Zertifikat bleibt grundsätzlich gültig, auch wenn es einige Jahre alt ist. Die Behörde kann aber nachfragen, wenn im Gespräch klar wird, dass die Kenntnisse deutlich unter B1 liegen. Bewahren Sie das Original gut auf, denn Ersatzurkunden stellen nicht alle Prüfungsanbieter aus.' },
      { q: 'Muss ich auch schreiben können?', a: 'Ja, beim allgemeinen Nachweis zählt die Sprachprüfung als Ganzes, mit Hören, Lesen, Schreiben und Sprechen. Nur in den Sonderfällen des Gesetzes, also bei früheren Gastarbeitern und deren Ehegatten oder in Härtefällen, genügt die mündliche Verständigung im Alltag. Den Einbürgerungstest brauchen diese Gruppen dann ebenfalls nicht.' },
    ],
    body: (h) => `
<h2>Was als Nachweis zählt</h2>
<p>${h.src('stag10', '§ 10 Abs. 4 StAG')} stellt auf das Niveau ab, nicht auf eine bestimmte Prüfung. In der Praxis legen die meisten ein Zertifikat vor. Die folgende Übersicht zeigt die üblichen Wege; ob ein Schul- oder Berufsabschluss reicht, entscheidet die Behörde.</p>
${h.table(['Nachweis', 'Reicht für die Einbürgerung?', 'Hinweis'], [
  ['Deutsch-Test für Zuwanderer, Ergebnis B1', 'ja', 'Abschluss des Integrationskurses'],
  ['Deutsch-Test für Zuwanderer, Ergebnis A2', 'nein', 'Wiederholen oder andere B1-Prüfung'],
  ['telc Deutsch B1, Goethe-Zertifikat B1, ÖSD B1', 'ja', 'Bei anerkannten Prüfzentren'],
  ['Zertifikat B2, C1 oder C2', 'ja', 'Höheres Niveau schließt B1 ein'],
  ['Deutscher Schulabschluss, Ausbildung oder Studium', 'meist ja', 'Entscheidung der Behörde'],
  ['Kinder unter 16', 'altersgemäße Entwicklung', 'Kita- oder Schulberichte'],
], 'Sprachnachweis nach § 10 Abs. 4 StAG.', ['l', 'l', 'l'])}
<h2>Die Ausnahmen im Gesetz</h2>
<p>Absatz 4 Satz 3 erleichtert den Nachweis für eine bestimmte Gruppe: Wer aufgrund eines Anwerbeabkommens bis zum 30. Juni 1974 in die Bundesrepublik oder als Vertragsarbeitnehmer bis zum 13. Juni 1990 in die DDR gekommen ist, muss sich nur ohne nennenswerte Probleme im Alltag mündlich verständigen können; das gilt auch für die Ehegatten. Absatz 4a öffnet den Weg für Härtefälle, wenn das Erlernen trotz ernsthafter und nachhaltiger Bemühungen nicht möglich oder dauerhaft wesentlich erschwert ist. In beiden Fällen entfällt auch der Einbürgerungstest. Absatz 6 befreit ganz von Sprach- und Wissensnachweis, wenn eine Krankheit, eine Behinderung oder das Alter ihn unmöglich macht; ein ärztliches Attest ist dann üblich.</p>
<h2>Was eine B1-Prüfung verlangt</h2>
<p>Auf B1 verstehen Sie die Hauptpunkte, wenn klar über vertraute Dinge aus Arbeit, Schule oder Freizeit gesprochen wird, kommen in den meisten Alltagssituationen zurecht, schreiben einfache zusammenhängende Texte und können Erfahrungen, Pläne und Meinungen kurz begründen. Die Prüfungen bestehen meist aus Hören, Lesen, Schreiben und einem mündlichen Teil, oft mit einer Partnerin oder einem Partner. Die Preise legen die Prüfzentren fest; sie sind nicht einheitlich, deshalb nennen wir keinen Betrag.</p>
<p>Wer nicht weiß, ob der Sprachnachweis der letzte offene Punkt ist, gibt sein Niveau im Rechner an:</p>
${h.mini('einb', { p: ['deutsch', 'titel', 'jahr'], d: { deutsch: 'a2' }, c: 'Alle Voraussetzungen prüfen' })}
<p>Für den Einbürgerungstest ist B1 kein formaler Zugang, aber eine große Hilfe: Die Fragen stehen nur auf Deutsch im Bogen. Wer mit dem ${h.a('fragenkatalog', 'Fragenkatalog')} übt, lernt nebenbei den Wortschatz, den viele Sprachprüfungen im Bereich Gesellschaft abfragen.</p>
`,
  },
  en: {
    slug: 'german-b1-certificate-citizenship',
    nav: 'B1 German certificate', card: 'Which certificates count, who is exempt',
    title: 'B1 German Certificate for Citizenship 2026: What Counts',
    description: 'B1 German certificate for citizenship in 2026: which exams count, when a German school certificate is enough, hardship cases and exemptions for children.',
    h1: 'Proving B1 German for citizenship',
    intro: `The law requires German at level ${E.sprache} of the Common European Framework, proven by a language exam. There are exceptions.`,
    resume: `For naturalisation, section 10(4) StAG requires sufficient German: you have it if you meet the requirements of a language exam at level ${E.sprache} of the Common European Framework of Reference, spoken and written. The usual proof is a certificate from a recognised exam, such as the German Test for Immigrants (DTZ) with a B1 result at the end of the integration course, telc Deutsch B1, the Goethe-Zertifikat B1 or an ÖSD exam at that level. A higher certificate such as B2 or C1 obviously also counts. Many authorities also accept a German school-leaving certificate, vocational training or a degree completed in German. Children under 16 only need age-appropriate language development. Former guest workers and contract workers and their spouses only have to communicate orally in everyday life. If someone cannot reach B1 despite serious efforts, the authority can also limit the requirement to everyday German; illness, disability or age exempt you entirely.`,
    faqs: [
      { q: 'Is the German Test for Immigrants (DTZ) enough for citizenship?', a: 'Yes, if the result is B1. The test at the end of the integration course certifies either A2 or B1, and only B1 meets the requirement. If you finished with A2, you can retake it or sit another recognised B1 exam, such as telc or Goethe.' },
      { q: 'How old can my language certificate be?', a: 'The law sets no expiry date, so a B1 certificate generally remains valid even after several years. The authority may still ask questions if it becomes clear in conversation that your German is well below B1. Keep the original safe, as not every exam provider issues replacements.' },
      { q: 'Do I also need to be able to write German?', a: 'Yes. For the standard proof, the exam counts as a whole: listening, reading, writing and speaking. Only in the special cases of the law, meaning former guest workers and their spouses or hardship cases, is everyday spoken German enough, and those groups then do not need the citizenship test either.' },
    ],
    body: (h) => `
<h2>What counts as proof</h2>
<p>${h.src('stag10', 'Section 10(4) StAG')} refers to the level, not to a specific exam. In practice most people submit a certificate. The overview shows the usual routes; whether a school or vocational qualification is enough is up to the authority.</p>
${h.table(['Proof', 'Enough for citizenship?', 'Note'], [
  ['German Test for Immigrants, result B1', 'yes', 'End of the integration course'],
  ['German Test for Immigrants, result A2', 'no', 'Retake or another B1 exam'],
  ['telc Deutsch B1, Goethe-Zertifikat B1, ÖSD B1', 'yes', 'At recognised exam centres'],
  ['B2, C1 or C2 certificate', 'yes', 'A higher level includes B1'],
  ['German school certificate, training or degree', 'usually', 'The authority decides'],
  ['Children under 16', 'age-appropriate development', 'Nursery or school reports'],
], 'Language proof under section 10(4) StAG.', ['l', 'l', 'l'])}
<h2>The exceptions in the law</h2>
<p>Subsection 4, third sentence, eases the proof for one group: people who came to West Germany under a recruitment agreement by 30 June 1974 or to East Germany as contract workers by 13 June 1990 only need to communicate orally in everyday life without significant problems, and the same applies to their spouses. Subsection 4a opens a route for hardship cases, where learning is impossible or permanently much harder despite serious and sustained effort. In both cases the citizenship test is also waived. Subsection 6 exempts people entirely from the language and knowledge proofs if illness, disability or age makes them impossible; a medical certificate is then usual.</p>
<h2>What a B1 exam asks of you</h2>
<p>At B1 you understand the main points of clear speech on familiar matters from work, school or leisure, cope with most everyday situations, write simple connected texts and can briefly explain experiences, plans and opinions. Exams usually have listening, reading, writing and a speaking part, often with a partner. Exam centres set their own prices, which vary, so we do not quote a figure.</p>
<p>If you are not sure whether the language proof is your last open point, enter your level in the calculator:</p>
${h.mini('einb', { p: ['deutsch', 'titel', 'jahr'], d: { deutsch: 'a2' }, c: 'Check every requirement' })}
<p>B1 is not a formal entry condition for the citizenship test, but it helps a lot, because the paper is in German only. Practising with the ${h.a('fragenkatalog', 'question catalogue')} also builds the vocabulary that many language exams test on society topics.</p>
`,
  },
});
