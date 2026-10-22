import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Inscription au test : EinbTestV § 1 et § 2 ; rien d'autre n'est chiffré (prix des centres, délais : non publiés de façon uniforme). */
const T = K.P.test;

export default defineGuide({
  id: 'test-anmelden', group: 'test', order: 20,
  tool: 'probe', toolArg: { land: 'HE' },
  related: ['fragenkatalog', 'sprachnachweis', 'voraussetzungen', 'land-he'],
  sources: ['einbtestv', 'stag10', 'bamf-katalog'],
  de: {
    slug: 'einbuergerungstest-anmelden',
    nav: 'Test anmelden', card: `Prüfstelle, Gebühr von ${T.gebuehr} €, Ablauf am Prüfungstag`,
    title: 'Einbürgerungstest anmelden 2026: Termin, Gebühr, Ergebnis',
    description: `Einbürgerungstest anmelden 2026: wo Sie sich anmelden, was die Prüfstelle verlangt, ${T.gebuehr} € Gebühr, Ablauf am Prüfungstag und wie das Ergebnis zu Ihnen kommt.`,
    h1: 'Einbürgerungstest mit Zertifikat: vor Ort statt online',
    intro: `Anmeldung bei einer zugelassenen Prüfstelle, ${T.gebuehr} € Gebühr, ${T.minuten} Minuten für ${T.fragen} Fragen. Vorher hier die Probeprüfung machen.`,
    resume: `Den Einbürgerungstest legen Sie nicht bei der Einbürgerungsbehörde ab, sondern bei einer Prüfstelle, die das Bundesamt für Migration und Flüchtlinge dafür zugelassen hat. Meist ist das eine Volkshochschule oder ein Träger von Integrationskursen. Sie melden sich dort an, zahlen nach § 2 der Einbürgerungstestverordnung eine Gebühr von ${T.gebuehr} € und bekommen einen Termin. Am Prüfungstag zeigen Sie ein gültiges Ausweisdokument, beantworten unter Aufsicht ${T.fragen} Fragen in ${T.minuten} Minuten und kreuzen auf einem Bogen an. Mit mindestens ${T.bestehen} richtigen Antworten ist der Test bestanden. Die Auswertung übernimmt das BAMF, das Ihnen eine Bescheinigung schickt, die Sie dem Einbürgerungsantrag beilegen. Wer nicht besteht, kann den Test so oft wiederholen wie nötig; jede Wiederholung kostet die Gebühr erneut. Eine Probeprüfung vor der Anmeldung zeigt, ob Sie bereit sind.`,
    faqs: [
      { q: 'Wo melde ich mich zum Einbürgerungstest an?', a: 'Bei einer vom BAMF zugelassenen Prüfstelle, häufig einer Volkshochschule oder einem Integrationskursträger in Ihrer Nähe. Die Einbürgerungsbehörde Ihres Wohnorts nennt auf Nachfrage Stellen, und das BAMF führt eine Suche nach Kursträgern auf seiner Website. Fragen Sie bei der Anmeldung nach freien Terminen, denn viele Stellen prüfen nur an wenigen Tagen im Monat.' },
      { q: 'Wie oft darf ich den Einbürgerungstest wiederholen?', a: `Die Verordnung begrenzt die Zahl der Versuche nicht. Sie können sich nach einem nicht bestandenen Test erneut anmelden, zahlen dann aber wieder ${T.gebuehr} €. Sinnvoll ist eine Pause, in der Sie gezielt die Fragen lernen, die beim ersten Versuch falsch waren; die Liste „Ihre Fehler“ in der Probeprüfung hilft dabei.` },
      { q: 'Was muss ich zum Einbürgerungstest mitbringen?', a: 'Ein gültiges amtliches Ausweisdokument mit Lichtbild, etwa Reisepass, Aufenthaltstitel oder Ausweisersatz, und die Anmeldebestätigung, falls die Prüfstelle eine verschickt hat. Handy und Unterlagen bleiben während der Prüfung weggeschlossen. Einen Stift stellt meist die Prüfstelle; fragen Sie bei der Anmeldung nach, was sie im Einzelnen verlangt.' },
      { q: 'Wie lange dauert es bis zum Ergebnis?', a: 'Die Bögen gehen an das BAMF, das sie auswertet und die Bescheinigung per Post verschickt. Eine einheitliche Frist veröffentlicht das BAMF nicht; die Dauer hängt von der Prüfstelle und vom Versand ab. Wenn Ihre Einbürgerungsbehörde auf die Bescheinigung wartet, können Sie den Antrag oft schon stellen und den Nachweis nachreichen.' },
      { q: 'Kann ich den Einbürgerungstest online mit Zertifikat machen?', a: 'Nein. Nach § 1 Abs. 3 der Einbürgerungstestverordnung ist der Test nur bestanden, wenn Sie ihn unter Aufsicht ablegen, und nur dann stellt das BAMF die Bescheinigung aus. Online gibt es Übungstests, auch beim BAMF selbst und auf dieser Seite, aber keiner davon ersetzt die Prüfung vor Ort. Angebote, die ein Zertifikat für einen Online-Test versprechen, bringen Ihnen bei der Behörde nichts.' },
    ],
    body: (h) => `
<h2>Schritt für Schritt zur Prüfung</h2>
<p>Erster Schritt ist die Prüfstelle. Die ${h.src('einbtestv', 'Einbürgerungstestverordnung')} legt fest, dass das BAMF den Test durchführt und dafür Stellen zulässt; welche das in Ihrer Stadt sind, erfahren Sie bei der Volkshochschule, beim Integrationskursträger oder bei der Einbürgerungsbehörde. Die Anmeldung läuft schriftlich oder vor Ort. Sie geben Ihre Daten und das Bundesland an, in dem Sie wohnen, denn danach richten sich ${h.n(T.landFragen)} der ${h.n(T.fragen)} Fragen.</p>
<p>Zweiter Schritt ist die Gebühr. Sie beträgt ${h.eur(T.gebuehr)} und wird bei der Anmeldung fällig. Andere Preise, die man im Netz liest, betreffen meist Vorbereitungskurse, nicht den Test selbst. Ein Kurs ist nach ${h.src('stag10', '§ 10 Abs. 5 StAG')} freiwillig; wer mit den Fragen auf dieser Seite übt, braucht keinen.</p>
${h.table(['Etappe', 'Was passiert', 'Worauf achten'], [
  ['Anmeldung', 'Prüfstelle wählen, Bundesland angeben', 'Termine sind oft Wochen im Voraus belegt'],
  ['Gebühr', h.eur(T.gebuehr), 'Bei jeder Wiederholung erneut fällig'],
  ['Prüfung', `${h.n(T.fragen)} Fragen, ${h.n(T.minuten)} Minuten`, 'Ausweis mit Lichtbild mitbringen'],
  ['Bestanden', `ab ${h.n(T.bestehen)} richtigen Antworten`, 'Falsche Antworten ziehen nichts ab'],
  ['Ergebnis', 'Bescheinigung des BAMF per Post', 'Original zum Einbürgerungsantrag'],
], 'Ablauf des Einbürgerungstests.', ['l', 'l', 'l'])}
<h2>Am Prüfungstag</h2>
<p>Die Prüfung findet in einem Raum mit Aufsicht statt. Jede Person erhält einen eigenen Bogen; die Fragen sind dieselben wie im ${h.a('fragenkatalog', 'amtlichen Fragenkatalog')}, nur zusammengestellt. Sie kreuzen je Frage genau eine Antwort an. Wer schneller fertig ist, darf in der Regel abgeben; ${h.n(T.minuten)} Minuten reichen den meisten Teilnehmenden gut, wenn sie mit dem Wortlaut der Fragen vertraut sind. Hilfsmittel wie Wörterbuch oder Telefon sind nicht erlaubt.</p>
<p>Lassen Sie keine Frage leer. Weil eine falsche Antwort keinen Punkt kostet, ist ein Kreuz immer besser als keines. Bei Bildfragen schauen Sie zuerst auf die vier Antworten und dann auf das Bild: Oft schließen schon die Begriffe zwei Möglichkeiten aus.</p>
<h2>Wer den Test nicht braucht</h2>
<p>Befreit ist, wer die Kenntnisse wegen Krankheit, Behinderung oder Alters nicht erwerben kann (§ 10 Abs. 6 StAG), und wer jünger als 16 ist. Bei Menschen, die nur einfache mündliche Deutschkenntnisse nachweisen müssen, etwa frühere Gastarbeiter, verlangt das Gesetz den Test ebenfalls nicht. Ob ein deutscher Schulabschluss den Test ersetzt, entscheidet die Behörde; klären Sie das vor der Anmeldung. Die Sprachprüfung ist ein eigener Nachweis, siehe ${h.a('sprachnachweis', 'Sprachnachweis B1')}.</p>
<p>Ob der Test Ihr letzter offener Punkt ist, zeigt die Prüfung der Voraussetzungen:</p>
${h.mini('einb', { p: ['titel', 'jahr', 'test'], c: 'Alle Voraussetzungen prüfen' })}
`,
  },
  en: {
    slug: 'book-citizenship-test',
    nav: 'Booking the test', card: `Test centres, the ${T.gebuehr} € fee, what happens on the day`,
    title: 'Booking the German Citizenship Test 2026: Fee and Steps',
    description: `Booking the German citizenship test in 2026: where to register, the €${T.gebuehr} fee, what to bring, how the ${T.minuten}-minute exam runs and how your result reaches you.`,
    h1: 'Booking and sitting the German citizenship test',
    intro: `Register with an approved test centre, pay €${T.gebuehr}, answer ${T.fragen} questions in ${T.minuten} minutes. Take the mock exam here first.`,
    resume: `You do not sit the citizenship test at the naturalisation authority but at a test centre approved by the Federal Office for Migration and Refugees (BAMF), usually an adult education centre (Volkshochschule) or an integration course provider. You register there, pay the fee of €${T.gebuehr} set by section 2 of the Citizenship Test Ordinance and get a date. On the day you show valid ID, answer ${T.fragen} questions under supervision within ${T.minuten} minutes and tick your answers on a sheet. With at least ${T.bestehen} correct answers you pass. BAMF marks the papers and posts you a certificate, which you attach to your naturalisation application. If you fail, you can retake the test as often as you need, paying the fee each time. The exam is only in German, so practise with the German wording; a mock exam before booking shows whether you are ready.`,
    faqs: [
      { q: 'Where do I register for the German citizenship test?', a: 'At a test centre approved by BAMF, often a Volkshochschule or an integration course provider near you. Your naturalisation authority can name centres, and BAMF runs a search for course providers on its website. Ask about available dates when you register, because many centres only hold the test on a few days each month.' },
      { q: 'How many times can I retake the citizenship test?', a: `The ordinance sets no limit on attempts. After a failed test you can register again, but you pay €${T.gebuehr} each time. It makes sense to take a break and work on the questions you got wrong the first time; the “Your mistakes” list in the mock exam helps you find them.` },
      { q: 'What should I bring to the citizenship test?', a: 'Valid official photo ID, such as a passport, residence permit or substitute ID document, and the registration confirmation if the centre sent one. Phones and notes are locked away during the test. The centre usually provides a pen; ask when you register exactly what it requires so you are not turned away on the day.' },
      { q: 'How long does the citizenship test result take?', a: 'The papers go to BAMF, which marks them and posts the certificate. BAMF publishes no standard time frame; it depends on the centre and on the post. If your naturalisation authority is waiting for the certificate, you can often file the application already and send the proof in later.' },
      { q: 'Can I take the citizenship test online and get a certificate?', a: 'No. Under section 1(3) of the Citizenship Test Ordinance, the test only counts if you sit it under supervision, and only then does BAMF issue the certificate. Practice tests exist online, from BAMF itself and on this site, but none of them replaces the exam at a test centre. Offers promising a certificate for an online test are worth nothing to the authority.' },
    ],
    body: (h) => `
<h2>Step by step to the exam</h2>
<p>The first step is the test centre. The ${h.src('einbtestv', 'Citizenship Test Ordinance')} has BAMF run the test through approved centres; to find those in your town, ask the Volkshochschule, an integration course provider or the naturalisation authority. You register in writing or in person, giving your details and the federal state where you live, because ${h.n(T.landFragen)} of the ${h.n(T.fragen)} questions depend on it.</p>
<p>The second step is the fee: ${h.eur(T.gebuehr)}, payable when you register. Higher prices you may see online are usually for preparation courses, not the test itself. Under ${h.src('stag10', 'section 10(5) StAG')} a course is optional; if you practise with the questions on this site, you do not need one.</p>
${h.table(['Stage', 'What happens', 'Watch out for'], [
  ['Registration', 'Choose a centre, state where you live', 'Dates are often booked weeks ahead'],
  ['Fee', h.eur(T.gebuehr), 'Due again for each retake'],
  ['Exam', `${h.n(T.fragen)} questions, ${h.n(T.minuten)} minutes`, 'Bring photo ID'],
  ['Pass', `${h.n(T.bestehen)} correct answers or more`, 'Wrong answers cost nothing'],
  ['Result', 'BAMF certificate by post', 'Original goes with the application'],
], 'How the citizenship test works.', ['l', 'l', 'l'])}
<h2>On the day</h2>
<p>The exam takes place in a supervised room. Everyone gets their own paper; the questions are the same as in the ${h.a('fragenkatalog', 'official question catalogue')}, just selected and arranged. You tick exactly one answer per question. You can usually hand in early, and ${h.n(T.minuten)} minutes is plenty for most people who know the wording. Dictionaries and phones are not allowed, and the paper is in German only.</p>
<p>Never leave a question blank. A wrong answer costs nothing, so a guess always beats an empty box. For picture questions, read the four options before looking at the image: the words often rule out two of them straight away.</p>
<h2>Who does not need the test</h2>
<p>You are exempt if illness, disability or age prevents you from acquiring the knowledge (section 10(6) StAG), and if you are under 16. People who only have to show basic spoken German, such as former guest workers, are not required to take it either. Whether a German school-leaving certificate replaces the test is up to the authority, so check before booking. The language certificate is a separate proof: see ${h.a('sprachnachweis', 'B1 German certificate')}.</p>
<p>To see whether the test is your last open point, run the full requirements check:</p>
${h.mini('einb', { p: ['titel', 'jahr', 'test'], c: 'Check every requirement' })}
`,
  },
});
