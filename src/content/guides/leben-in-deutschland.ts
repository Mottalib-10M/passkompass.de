import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Test « Leben in Deutschland » (de + en ; tr/ar écartés tant que la trame n'a pas de pages légales tr/ar, car check-cookies
   exige ces pages dès qu'une langue sert 3 pages) : § 17 IntV (abschlusstest du cours d'orientation, coût pris en charge une fois, valeur pour la
   naturalisation à 17 bonnes réponses, § 2 Abs. 1 Satz 2 EinbTestV écarté) ; page BAMF « Abschlussprüfung » (33 questions,
   60 minutes, 15 pour réussir, 17 pour la naturalisation) et fiche d'information BAMF de février 2026 (déroulement), lues le 2026-10-22. */
const T = K.P.test, KA = K.P.katalog;
const bis = (h: Helpers) => (h.lang === 'de' ? 'bis' : 'to');
const stufen = (h: Helpers, lab: [string, string, string], txt: [string, string, string]) => h.table(lab, [
  [`0 ${bis(h)} ${h.n(T.lidBestehen - 1)}`, txt[0], 'IntV § 17 Abs. 2'],
  [`${h.n(T.lidBestehen)} ${bis(h)} ${h.n(T.bestehen - 1)}`, txt[1], 'IntV § 17 Abs. 2'],
  [`${h.n(T.bestehen)} ${bis(h)} ${h.n(T.fragen)}`, txt[2], 'IntV § 17 Abs. 5'],
], undefined, ['l', 'l', 'l']);

export default defineGuide({
  id: 'leben-in-deutschland', group: 'test', order: 25,
  tool: 'probe', toolArg: { land: 'NW', lid: 1 },
  related: ['fragenkatalog', 'test-anmelden', 'sprachnachweis', 'niederlassungserlaubnis'],
  sources: ['bamf-lid', 'bamf-lid-info', 'intv17', 'einbtestv', 'bamf-katalog'],
  de: {
    slug: 'leben-in-deutschland-test',
    nav: 'Test Leben in Deutschland', card: `Abschlusstest des Integrationskurses: ${T.lidBestehen} oder ${T.bestehen} von ${T.fragen} Punkten`,
    title: 'Leben in Deutschland Test 2026: 33 Fragen online üben',
    description: `Test „Leben in Deutschland“ 2026: ${T.fragen} Fragen in ${T.minuten} Minuten, bestanden ab ${T.lidBestehen}, ab ${T.bestehen} auch für die Einbürgerung. Kostenlose Probeprüfung mit allen Lösungen.`,
    h1: 'Test „Leben in Deutschland“ online üben',
    intro: `Bundesland wählen und ${T.fragen} Fragen beantworten: Die Probeprüfung zeigt, ob Ihr Ergebnis für den Orientierungskurs (${T.lidBestehen}) oder auch für die Einbürgerung (${T.bestehen}) reicht.`,
    resume: `Der Test „Leben in Deutschland“ ist der Abschlusstest des Orientierungskurses im Integrationskurs (§ 17 der Integrationskursverordnung). Er besteht aus ${T.fragen} Fragen mit je vier Antworten, für die Sie ${T.minuten} Minuten Zeit haben, und stammt aus demselben Gesamtfragenkatalog des BAMF wie der Einbürgerungstest: ${KA.allgemein} allgemeine Fragen und ${KA.proLand} Fragen je Bundesland. Mit mindestens ${T.lidBestehen} richtigen Antworten haben Sie den Orientierungskurs bestanden. Mit mindestens ${T.bestehen} richtigen Antworten gilt der Test nach § 17 Abs. 5 IntV zugleich als Nachweis der Kenntnisse der Rechts- und Gesellschaftsordnung für die Einbürgerung, und ein eigener Einbürgerungstest entfällt. Wer dazu die Sprachprüfung DTZ auf Niveau B1 besteht, erhält das Zertifikat Integrationskurs, das nur auf Papier ausgestellt wird. Die Kosten der einmaligen Teilnahme trägt nach § 17 Abs. 3 IntV das BAMF; die Pauschale von ${T.gebuehr} € des Einbürgerungstests gilt hier nicht. Der Test findet nach dem Kurs an einem eigenen Termin statt. Die Probeprüfung oben zählt beide Schwellen mit.`,
    faqs: [
      { q: 'Ist der Test „Leben in Deutschland“ dasselbe wie der Einbürgerungstest?', a: `Fast. Beide nutzen denselben Fragenkatalog, haben ${T.fragen} Fragen und ${T.minuten} Minuten. Der Test „Leben in Deutschland“ gehört aber zum Integrationskurs und ist schon ab ${T.lidBestehen} richtigen Antworten bestanden. Der Einbürgerungstest steht jedem offen, kostet ${T.gebuehr} € und verlangt ${T.bestehen}. Wer im Kurstest ${T.bestehen} oder mehr erreicht, legt für die Einbürgerung keinen zweiten Test ab.` },
      { q: 'Wo finde ich Termine für den Test „Leben in Deutschland“ in meiner Nähe?', a: 'Der Test gehört zum Integrationskurs, deshalb laufen Termin und Anmeldung über den Kursträger, bei dem Sie den Orientierungskurs besuchen. Er findet an einem eigenen Tag nach dem Kurs statt. Wer keinen Integrationskurs besucht und nur den Nachweis für die Einbürgerung braucht, meldet sich stattdessen bei einer Prüfstelle zum Einbürgerungstest an, etwa bei einer Volkshochschule.' },
      { q: 'Was kostet der Test „Leben in Deutschland“?', a: `Für Teilnehmende am Integrationskurs trägt das BAMF nach § 17 Abs. 3 IntV die Kosten der einmaligen Teilnahme an den Abschlusstests. Die Pauschale von ${T.gebuehr} € aus der Einbürgerungstestverordnung gilt für diesen Test ausdrücklich nicht. Für den Kurs selbst kann ein eigener Kostenbeitrag anfallen; dessen Höhe erfahren Sie beim Kursträger, wir nennen ihn hier nicht.` },
      { q: 'Gibt es den Test „Leben in Deutschland“ als PDF?', a: `Das BAMF veröffentlicht den Gesamtfragenkatalog mit allen ${KA.fragen} Fragen als PDF und dazu einen Musterfragebogen, der zeigt, wie der Bogen in der Prüfung aussieht. Die echten Prüfbögen sind nicht öffentlich. Auf dieser Seite üben Sie mit denselben Fragen, sehen sofort die Lösung und am Ende, ob Ihr Ergebnis für den Kurs oder auch für die Einbürgerung reicht.` },
    ],
    body: (h) => `
<h2>Zwei Schwellen in einem Test</h2>
<p>Anders als beim Einbürgerungstest zählt Ihr Ergebnis hier doppelt. ${h.src('intv17', '§ 17 der Integrationskursverordnung')} verlangt für das Bestehen des Orientierungskurses eine Mindestpunktzahl; das ${h.src('bamf-lid', 'BAMF')} nennt dafür ${h.n(T.lidBestehen)} von ${h.n(T.fragen)} Fragen. Absatz 5 derselben Vorschrift erlaubt es, mit dem Test auch die Kenntnisse nachzuweisen, die das Staatsangehörigkeitsgesetz für die Einbürgerung verlangt, und dafür gilt die Schwelle der ${h.src('einbtestv', 'Einbürgerungstestverordnung')}: ${h.n(T.bestehen)} richtige Antworten.</p>
${stufen(h, ['Richtige Antworten', 'Was das Ergebnis bedeutet', 'Grundlage'], ['Orientierungskurs nicht bestanden', 'Orientierungskurs bestanden, für die Einbürgerung noch kein Nachweis', 'Bestanden und zugleich Nachweis für die Einbürgerung'])}
<p>Wer zwischen ${h.n(T.lidBestehen)} und ${h.n(T.bestehen - 1)} Punkten landet, hat den Kurs geschafft, muss aber vor der Einbürgerung noch den ${h.a('test-anmelden', 'Einbürgerungstest ablegen')}. Zwei Punkte mehr ersparen also einen zweiten Prüfungstag und die Gebühr. Deshalb lohnt es sich, nicht auf ${h.n(T.lidBestehen)}, sondern auf ${h.n(T.bestehen)} hin zu lernen.</p>
<h2>So läuft der Prüfungstag ab</h2>
<p>Nach dem ${h.src('bamf-lid-info', 'Informationsblatt des BAMF')} weisen Sie sich mit einem gültigen amtlichen Ausweis mit Lichtbild aus und legen ihn sichtbar auf den Tisch. Handy, Smartwatch und Tablet geben Sie der Aufsicht, Jacke und Tasche bleiben außer Reichweite, und persönliche Notizen sind nicht erlaubt. Geschrieben wird nur mit blauem oder schwarzem Kugelschreiber. Prüfen Sie zuerst Ihre Daten auf dem Deckblatt. Vor der Abgabe gehören Unterschrift und Datum auf die letzte Seite; wer den Raum nach dem Ende verlässt, darf ihn nicht wieder betreten.</p>
<p>Jede Frage hat genau eine richtige Antwort. Wer täuscht, unerlaubte Hilfsmittel dabeihat oder den Ablauf stört, wird ausgeschlossen, und der Bogen wird nicht bewertet.</p>
<h2>Gezielt lernen</h2>
<p>Die Probeprüfung oben zieht wie die Verordnung ${h.n(T.fragen - T.landFragen)} allgemeine Fragen und ${h.n(T.landFragen)} Fragen zu Ihrem Bundesland. Alle allgemeinen Fragen mit Lösung stehen unter ${h.a('fragenkatalog', 'Einbürgerungstest Fragen')}, die Landesfragen auf den Seiten der Länder, etwa ${h.a('land-nw', 'Einbürgerungstest NRW')}. Der erfolgreiche Orientierungskurs belegt laut BAMF auch die Grundkenntnisse, die für die ${h.a('niederlassungserlaubnis', 'Niederlassungserlaubnis')} verlangt werden. Zum Zertifikat Integrationskurs fehlt dann nur noch die Sprachprüfung auf Niveau B1, siehe ${h.a('sprachnachweis', 'Sprachnachweis B1')}.</p>
<p>Ob nach dem Kurs nur noch die Aufenthaltszeit fehlt, zeigt die Prüfung der Voraussetzungen:</p>
${h.mini('einb', { p: ['jahr', 'deutsch', 'test'], d: { test: 'ja' }, c: 'Weg zur Einbürgerung prüfen' })}
`,
  },
  en: {
    slug: 'life-in-germany-test',
    nav: 'Leben in Deutschland test', card: `Integration course final test: ${T.lidBestehen} or ${T.bestehen} out of ${T.fragen} points`,
    title: 'Leben in Deutschland Test 2026: Practise the 33 Questions',
    description: `The “Leben in Deutschland” test in 2026: ${T.fragen} questions in ${T.minuten} minutes, pass at ${T.lidBestehen}, and ${T.bestehen} also counts for citizenship. Free mock exam with every answer.`,
    h1: 'Practise the “Leben in Deutschland” test',
    intro: `Pick your federal state and answer ${T.fragen} questions: the mock exam shows whether your score is enough for the orientation course (${T.lidBestehen}) or for citizenship too (${T.bestehen}).`,
    resume: `The “Leben in Deutschland” (Life in Germany) test is the final test of the orientation course within the integration course, under section 17 of the Integration Course Ordinance (IntV). It has ${T.fragen} questions with four answers each, you get ${T.minuten} minutes, and the questions come from the same BAMF catalogue as the citizenship test: ${KA.allgemein} general questions plus ${KA.proLand} for each federal state. With at least ${T.lidBestehen} correct answers you pass the orientation course. With at least ${T.bestehen}, section 17(5) IntV lets the result also prove the knowledge of the legal and social order required for naturalisation, so you do not need a separate citizenship test. If you also pass the DTZ language exam at B1, you receive the integration course certificate, issued on paper only. Under section 17(3) IntV, BAMF pays for taking the final tests once; the €${T.gebuehr} flat fee of the citizenship test does not apply. The test is held on its own date after the course. The mock exam above tracks both thresholds.`,
    faqs: [
      { q: 'Is the Leben in Deutschland test the same as the citizenship test?', a: `Almost. Both use the same question catalogue, with ${T.fragen} questions and ${T.minuten} minutes. The Leben in Deutschland test, though, is part of the integration course and you pass it with ${T.lidBestehen} correct answers. The citizenship test is open to anyone, costs €${T.gebuehr} and needs ${T.bestehen}. Score ${T.bestehen} or more in the course test and you need no second test for naturalisation.` },
      { q: 'How do I find a Leben in Deutschland test date near me?', a: 'The test belongs to the integration course, so the date and registration go through the course provider where you attend the orientation course. It takes place on a separate day after the course. If you are not on an integration course and only need proof for naturalisation, register for the citizenship test at a test centre instead, for example a Volkshochschule.' },
      { q: 'What does the Leben in Deutschland test cost?', a: `For integration course participants, section 17(3) IntV has BAMF pay for taking the final tests once. The €${T.gebuehr} flat fee in the Citizenship Test Ordinance expressly does not apply to this test. The course itself may involve a separate contribution; your course provider can tell you the amount, which we do not quote here.` },
      { q: 'Is there a PDF of the Leben in Deutschland test?', a: `BAMF publishes the full catalogue of all ${KA.fragen} questions as a PDF, along with a sample answer sheet that shows what the paper looks like on the day. The real exam papers are not public. On this page you practise with the same questions, see the answer at once and find out at the end whether your score is enough for the course or for citizenship too.` },
    ],
    body: (h) => `
<h2>Two thresholds in one test</h2>
<p>Unlike the citizenship test, your score counts twice here. ${h.src('intv17', 'Section 17 of the Integration Course Ordinance')} requires a minimum score to pass the orientation course, which ${h.src('bamf-lid', 'BAMF')} sets at ${h.n(T.lidBestehen)} of ${h.n(T.fragen)} questions. Subsection 5 of the same provision lets the test also prove the knowledge the Nationality Act requires for naturalisation, and for that the threshold of the ${h.src('einbtestv', 'Citizenship Test Ordinance')} applies: ${h.n(T.bestehen)} correct answers.</p>
${stufen(h, ['Correct answers', 'What the score means', 'Legal basis'], ['Orientation course not passed', 'Orientation course passed, no proof for citizenship yet', 'Passed, and proof for citizenship as well'])}
<p>If you land between ${h.n(T.lidBestehen)} and ${h.n(T.bestehen - 1)} points, you have passed the course but still have to ${h.a('test-anmelden', 'sit the citizenship test')} before you naturalise. Two more points save a second exam day and the fee, so aim for ${h.n(T.bestehen)} rather than ${h.n(T.lidBestehen)} when you study.</p>
<h2>What happens on the day</h2>
<p>According to the ${h.src('bamf-lid-info', 'BAMF information sheet')}, you identify yourself with valid official photo ID and leave it visible on the desk. Your phone, smartwatch and tablet go to the invigilator, your coat and bag stay out of reach, and personal notes are not allowed. Only blue or black ballpoint pens may be used. Check your details on the cover page first. Before handing in, sign and date the last page; once you leave the room after finishing, you cannot come back in.</p>
<p>Every question has exactly one correct answer. Anyone who cheats, carries unauthorised aids or disrupts the exam is excluded, and the paper is not marked. The paper is in German, so practise with the German wording.</p>
<h2>Studying with a plan</h2>
<p>The mock exam above draws ${h.n(T.fragen - T.landFragen)} general questions and ${h.n(T.landFragen)} about your state, as the ordinance does. All general questions with answers are under ${h.a('fragenkatalog', 'citizenship test questions')}, and the state questions are on the state pages, such as ${h.a('land-nw', 'citizenship test NRW')}. BAMF notes that passing the orientation course also proves the basic knowledge required for a ${h.a('niederlassungserlaubnis', 'settlement permit')}. For the integration course certificate you then only need the B1 language exam: see ${h.a('sprachnachweis', 'B1 German certificate')}.</p>
<p>To see whether only the residence period is left after the course, check the requirements:</p>
${h.mini('einb', { p: ['jahr', 'deutsch', 'test'], d: { test: 'ja' }, c: 'Check your path to citizenship' })}
`,
  },
});
