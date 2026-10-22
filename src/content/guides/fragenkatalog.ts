import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Le catalogue complet : 300 questions générales, en blocs (THEMEN), solution marquée. Les questions des Länder sont sur leurs pages. */
const T = K.P.test, KA = K.P.katalog;
const ids = (von: number, bis: number) => K.ALLGEMEIN.filter((f) => Number(f.id) >= von && Number(f.id) <= bis).map((f) => f.id);
const bilder = K.ALLGEMEIN.filter((f) => f.b).length;
const block = (h: Helpers, i: number, de: string, en: string) => {
  const th = K.THEMEN[i];
  return `<h2 id="${th.id}">${h.lang === 'de' ? `Fragen ${th.von} bis ${th.bis}: ${th.de}` : `Questions ${th.von} to ${th.bis}: ${th.en}`}</h2>
<p>${h.lang === 'de' ? de : en}</p>
${h.fragen(ids(th.von, th.bis))}`;
};

export default defineGuide({
  id: 'fragenkatalog', group: 'test', order: 10,
  tool: 'katalog', toolArg: { auswahl: 'alle' },
  related: ['test-anmelden', 'land-be', 'land-nw', 'voraussetzungen'],
  sources: ['bamf-katalog', 'einbtestv'],
  de: {
    slug: 'einbuergerungstest-fragen',
    nav: 'Alle Fragen mit Lösung', card: `Die ${KA.allgemein} allgemeinen Fragen, nach Themen, mit Lösung`,
    title: 'Einbürgerungstest Fragen 2026: alle 300 mit Lösungen',
    description: 'Einbürgerungstest Fragen 2026: alle 300 allgemeinen Fragen des BAMF-Katalogs mit richtiger Antwort, nach Themen geordnet, mit Übungsmodus Frage für Frage.',
    h1: 'Alle Fragen des Einbürgerungstests mit Lösung',
    intro: `Die ${KA.allgemein} allgemeinen Fragen aus dem amtlichen Katalog, Stand ${K.STAND.split('-').reverse().join('.')}. Oben Frage für Frage üben, unten alle auf einen Blick, die richtige Antwort markiert.`,
    resume: `Der amtliche Gesamtkatalog des BAMF umfasst ${KA.fragen} Fragen: ${KA.allgemein} allgemeine, die in jedem Bundesland gelten, und ${KA.proLand} Fragen für jedes der 16 Länder. Im Einbürgerungstest kommen ${T.fragen - T.landFragen} allgemeine Fragen und ${T.landFragen} Landesfragen dran, jede mit vier Antworten, von denen genau eine richtig ist. Diese Seite zeigt alle ${KA.allgemein} allgemeinen Fragen im Wortlaut des Katalogs, in fünf Blöcken nach der Reihenfolge des Katalogs, und markiert die richtige Antwort. ${bilder} Fragen zeigen in der Prüfung ein Bild, etwa ein Wappen, ein Plakat oder einen Stimmzettel; wir geben das Bild in Worten wieder, weil die Abbildungen des Katalogs nicht frei verwendet werden dürfen. Der Übungsmodus oben stellt die Fragen einzeln, nach Block, nach Bundesland oder zufällig, und zählt Ihre richtigen Antworten mit. Die Lösungen hat Radif Partners selbst ermittelt, denn das BAMF veröffentlicht den Katalog ohne Schlüssel.`,
    faqs: [
      { q: 'Wie lange braucht man, um alle Fragen des Einbürgerungstests zu lernen?', a: 'Das hängt vor allem vom Deutschniveau ab. Wer B1 sicher beherrscht, kennt viele Antworten aus dem Alltag und braucht für die Geschichte, die Verfassungsorgane und das eigene Bundesland oft zwei bis vier Wochen mit täglicher Übung. Schätzen Sie Ihren Stand mit einer Probeprüfung ein und lernen Sie danach gezielt die Blöcke, in denen Sie Fehler machen.' },
      { q: 'Ändert sich der Fragenkatalog?', a: 'Ja, das BAMF passt einzelne Fragen an, wenn sich die Wirklichkeit ändert, zuletzt nach der Bundestagswahl 2025 bei den Fragen nach dem Bundeskanzler und den größten Fraktionen. Der Katalog auf dieser Seite trägt das Datum des BAMF-Stands. Unser Prüfskript vergleicht die Datei des BAMF regelmäßig und meldet jede neue Fassung.' },
      { q: 'Muss ich die Antworten auswendig lernen oder verstehen?', a: 'Beides hilft. Die Fragen kommen im Test wörtlich vor, deshalb wirkt Auswendiglernen. Viele Fragen prüfen aber Grundsätze wie Meinungsfreiheit, Gleichberechtigung oder Gewaltenteilung, die in abgewandelter Form mehrfach auftauchen. Wer das Prinzip verstanden hat, erkennt die richtige Antwort auch dann, wenn die vier Möglichkeiten anders angeordnet sind als beim Üben.' },
      { q: 'Werden die Antworten in der Prüfung gemischt?', a: 'Der Wortlaut der Fragen und Antworten stammt aus dem Katalog. Die Prüfbögen sind nicht öffentlich, deshalb lässt sich nicht sicher sagen, ob die Reihenfolge der Antworten dort immer dieselbe ist. Lernen Sie deshalb die richtige Antwort selbst und nicht ihren Buchstaben. Unser Übungsmodus zeigt die Antworten in der Reihenfolge des Katalogs.' },
    ],
    body: (h) => `
<h2>So ist der Katalog aufgebaut</h2>
<p>Die Fragen sind im Katalog fortlaufend nummeriert und grob nach Themen geordnet: zuerst Grundrechte und Staatsaufbau, dann Verfassungsorgane, Wahlen und Gerichte, danach Geschichte, Europa und zum Schluss Alltag, Familie, Arbeit und Zuwanderung. Die Überschriften der fünf Blöcke unten stammen von uns, nicht vom BAMF; sie folgen den Nummern des Katalogs, damit Sie jede Frage unter ihrer amtlichen Nummer wiederfinden. Die ${h.n(KA.proLand)} Fragen jedes Bundeslandes stehen auf eigenen Seiten, etwa ${h.a('land-by', 'Einbürgerungstest Bayern')} oder ${h.a('land-nw', 'Einbürgerungstest NRW')}.</p>
<p>Die richtige Antwort ist grün hinterlegt. Bei Bildfragen steht unter der Frage, was das Bild zeigt. Rechtlich ist der Katalog ein amtliches Werk: Er ist Anlage 1 der ${h.src('einbtestv', 'Einbürgerungstestverordnung')} und darf nach § 5 des Urheberrechtsgesetzes frei wiedergegeben werden. Die Fassung bei gesetze-im-internet.de ist bei den Fragen 72 und 73 älter als die ${h.src('bamf-katalog', 'Datei des BAMF')}; wir geben die Fassung des BAMF wieder, nach der heute geprüft wird.</p>
${block(h, 0, 'Der erste Block fragt nach den Freiheiten des Grundgesetzes und danach, was ein Rechtsstaat ist. Typisch sind Fragen, warum etwas in Deutschland erlaubt oder verboten ist: Die Antwort nennt fast immer ein Grundrecht, etwa Meinungs-, Religions- oder Pressefreiheit, oder die Bindung des Staates an Recht und Gesetz.', '')}
${block(h, 1, 'Der längste Block behandelt Bundestag, Bundesrat, Bundespräsident, Bundesregierung und Bundesverfassungsgericht, dazu das Wahlrecht und die Parteien. Hier stehen auch die Fragen, die sich mit der Politik ändern: Frage 72 nach dem Bundeskanzler und Frage 73 nach den größten Fraktionen im Bundestag.', '')}
${block(h, 2, 'Der Geschichtsblock reicht vom Nationalsozialismus über die Gründung der beiden deutschen Staaten, den Mauerbau und den Aufstand vom 17. Juni 1953 bis zur friedlichen Revolution und zur Wiedervereinigung. Wer die Reihenfolge der Ereignisse kennt, kann viele falsche Antworten schon an der Jahreszahl erkennen.', '')}
${block(h, 3, 'Dieser Block fragt nach der Europäischen Union: Gründungsstaaten, Organe, Euro, Reisefreiheit und die Nachbarländer Deutschlands. Er ist kurz, aber die Fragen kommen oft vor, weil sie sich nicht auf ein Land beschränken.', '')}
${block(h, 4, 'Der letzte Block ist der praktischste. Er stellt Situationen aus dem Alltag vor, etwa Elterngeld, Mietvertrag, Kündigung, Schulpflicht oder Ehrenamt, und fragt nach dem richtigen Weg. Dazu kommen Fragen zu Religion, Gleichberechtigung und zur Geschichte der Zuwanderung.', '')}
<h2>Testen statt nur lesen</h2>
<p>Lesen allein reicht selten. Machen Sie nach jedem Block eine Probeprüfung mit ${h.n(T.fragen)} Fragen und schauen Sie, wie viele Sie richtig haben. Liegen Sie mehrmals deutlich über ${h.n(T.bestehen)}, sind Sie für die echte Prüfung gut vorbereitet. Wo und wie Sie sich anmelden, steht unter ${h.a('test-anmelden', 'Einbürgerungstest anmelden')}.</p>
${h.mini('probe', { d: { land: 'BE' } })}
`,
  },
  en: {
    slug: 'citizenship-test-questions',
    nav: 'All questions with answers', card: `The ${KA.allgemein} general questions, by topic, with answers`,
    title: 'Citizenship Test Questions Germany 2026: All 300 Answered',
    description: 'German citizenship test questions 2026: all 300 general questions from the BAMF catalogue with the correct answer and an English translation, sorted by topic.',
    h1: 'All German citizenship test questions with answers',
    intro: `The ${KA.allgemein} general questions from the official catalogue, in the original German with an English translation. Practise one by one above, or read them all below with the right answer marked.`,
    resume: `BAMF’s official catalogue has ${KA.fragen} questions: ${KA.allgemein} general ones that apply everywhere and ${KA.proLand} for each of the 16 federal states. The citizenship test draws ${T.fragen - T.landFragen} general questions and ${T.landFragen} state questions, each with four possible answers of which exactly one is right. This page lists all ${KA.allgemein} general questions in the catalogue’s German wording, with our English translation below each one, in five blocks that follow the catalogue’s numbering, and marks the correct answer. ${bilder} questions show a picture in the exam, such as a coat of arms, a poster or a ballot paper; we describe the picture in words, because the catalogue’s images may not be reused freely. The practice mode at the top asks the questions one at a time, by block, by state or at random, and counts your correct answers. Radif Partners worked out the answers itself, because BAMF publishes the catalogue without a key.`,
    faqs: [
      { q: 'How long does it take to learn all the citizenship test questions?', a: 'It depends mostly on your German. With solid B1 you will know many answers from daily life, and the history, the constitutional bodies and your own state often take two to four weeks of daily practice. Take a mock exam first to see where you stand, then work on the blocks where you make mistakes.' },
      { q: 'Does the question catalogue change?', a: 'Yes. BAMF updates individual questions when facts change, most recently after the 2025 federal election for the questions on the chancellor and the largest parliamentary groups. The catalogue on this page carries the date of the BAMF version, and our check script compares BAMF’s file regularly and flags any new version.' },
      { q: 'Should I memorise the answers or understand them?', a: 'Both help. The questions appear word for word in the exam, so memorising works. Many questions, though, test principles such as free speech, equality or the separation of powers, which come back in different forms. If you understand the principle, you will spot the right answer even when the options are arranged differently from your practice.' },
      { q: 'Can I take the test with the English translation?', a: 'No. The exam paper is only in German. The translation on this page is there so that you understand what you are learning; read the German line first and use the English one to check your understanding. Practising with the German wording also prepares you for the B1 language certificate you need for naturalisation.' },
    ],
    body: (h) => `
<h2>How the catalogue is organised</h2>
<p>The questions are numbered in sequence and loosely grouped by topic: basic rights and the structure of the state first, then the constitutional bodies, elections and courts, then history, Europe, and finally everyday life, family, work and migration. The headings of the five blocks below are ours, not BAMF’s; they follow the catalogue numbers so you can find every question under its official number. The ${h.n(KA.proLand)} questions for each state are on separate pages, such as ${h.a('land-by', 'citizenship test Bavaria')} or ${h.a('land-nw', 'citizenship test NRW')}.</p>
<p>The correct answer is highlighted in green, with our translation in brackets. For picture questions, a line under the question says what the image shows. Legally, the catalogue is an official work: it is annex 1 to the ${h.src('einbtestv', 'Citizenship Test Ordinance')} and may be reproduced under section 5 of the German Copyright Act. The version on gesetze-im-internet.de is older than ${h.src('bamf-katalog', 'BAMF’s file')} for questions 72 and 73; we reproduce BAMF’s version, which is what the exam uses today.</p>
${block(h, 0, '', 'The first block asks about the freedoms in the Basic Law and what the rule of law means. A typical question asks why something is allowed or forbidden in Germany, and the answer almost always names a basic right, such as freedom of opinion, religion or the press, or the state’s duty to follow the law.')}
${block(h, 1, '', 'The longest block covers the Bundestag, the Bundesrat, the Federal President, the federal government and the Federal Constitutional Court, plus voting rules and political parties. It also holds the questions that change with politics: question 72 on the chancellor and question 73 on the largest groups in the Bundestag.')}
${block(h, 2, '', 'The history block runs from the Nazi era through the founding of the two German states, the building of the Wall and the uprising of 17 June 1953, to the peaceful revolution and reunification. If you know the order of events, you can rule out many wrong options by their dates alone.')}
${block(h, 3, '', 'This block is about the European Union: founding members, institutions, the euro, free movement and Germany’s neighbours. It is short, but its questions come up often because they are not tied to any one state.')}
${block(h, 4, '', 'The last block is the most practical. It describes everyday situations, such as parental allowance, a tenancy, being dismissed, compulsory schooling or volunteering, and asks for the right step. It also covers religion, equality between men and women and the history of immigration.')}
<h2>Test yourself, do not just read</h2>
<p>Reading alone is rarely enough. After each block, take a ${h.n(T.fragen)}-question mock exam and see how many you get right. If you score well above ${h.n(T.bestehen)} several times in a row, you are ready for the real thing. Where and how to book it: ${h.a('test-anmelden', 'booking the citizenship test')}.</p>
${h.mini('probe', { d: { land: 'BE' } })}
`,
  },
});
