import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Feststellung : § 30 StAG, frais § 38 (51 €). Aucune durée de traitement publiée de façon uniforme. */
const G = K.P.gebuehr, E = K.P.einb;

export default defineGuide({
  id: 'staatsangehoerigkeitsausweis', group: 'einb', order: 100,
  tool: 'einb', toolArg: { titel: 'unbefristet' },
  related: ['kinder', 'doppelte-staatsbuergerschaft', 'beantragen', 'kosten'],
  sources: ['stag30', 'stag38', 'stag4'],
  de: {
    slug: 'staatsangehoerigkeitsausweis',
    nav: 'Staatsangehörigkeitsausweis', card: `Feststellen lassen, ob Sie schon deutsch sind, für ${G.feststellung} €`,
    title: 'Staatsangehörigkeitsausweis 2026: Feststellung und Kosten',
    description: `Staatsangehörigkeitsausweis 2026: wann Sie feststellen lassen, ob Sie deutsch sind, welche Unterlagen nötig sind, ${G.feststellung} € Gebühr, Unterschied zur Einbürgerung.`,
    h1: 'Staatsangehörigkeitsausweis: sind Sie schon deutsch?',
    intro: `Manche Menschen sind längst deutsch, ohne es sicher zu wissen. Das Feststellungsverfahren klärt es verbindlich, für ${G.feststellung} €.`,
    resume: `Der Staatsangehörigkeitsausweis ist das einzige Dokument, das die deutsche Staatsangehörigkeit verbindlich beweist. Reisepass und Personalausweis begründen nur eine Vermutung. Ausgestellt wird er nach § 30 StAG in einem Feststellungsverfahren: Die Staatsangehörigkeitsbehörde prüft auf Antrag, ob jemand deutsch ist, wenn ein berechtigtes Interesse besteht, und die Feststellung gilt dann für alle Behörden. Gefragt ist das vor allem bei Menschen, die von deutschen Eltern oder Großeltern im Ausland abstammen, bei Kindern, deren Erwerb durch Geburt in Deutschland unklar ist, und bei Zweifeln nach langen Auslandsaufenthalten. Nachzuweisen ist mit Urkunden und Registerauszügen, dass die Staatsangehörigkeit mit hinreichender Wahrscheinlichkeit erworben und später nicht verloren wurde. Die Gebühr beträgt nach § 38 StAG ${G.feststellung} €. Wer dagegen nie deutsch war, braucht keine Feststellung, sondern eine Einbürgerung mit ${E.jahre} Jahren Aufenthalt, B1 und Test.`,
    faqs: [
      { q: 'Wer braucht einen Staatsangehörigkeitsausweis?', a: 'Niemand muss ihn haben, solange Pass oder Personalausweis genügen. Verlangt wird er manchmal bei Bewerbungen für den öffentlichen Dienst, bei Erbschaften im Ausland oder wenn eine Behörde Zweifel an der Staatsangehörigkeit hat. Sinnvoll ist er auch für Nachfahren deutscher Auswanderer, die nie einen deutschen Pass hatten, aber durch Abstammung deutsch sein könnten.' },
      { q: 'Wo beantrage ich die Feststellung der Staatsangehörigkeit?', a: 'Im Inland bei der Staatsangehörigkeitsbehörde Ihres Wohnorts, also derselben Stelle, die auch Einbürgerungen bearbeitet. Wer im Ausland lebt, wendet sich an das Bundesverwaltungsamt in Köln, meist über die deutsche Auslandsvertretung. Dem Antrag liegen Geburts- und Heiratsurkunden der Vorfahren bei, über die Sie die Staatsangehörigkeit ableiten.' },
      { q: 'Ist die Feststellung billiger als die Einbürgerung?', a: `Ja, ${G.feststellung} € statt ${G.einbuergerung} €. Sie ist aber kein Ersatz: Die Feststellung bestätigt nur eine Staatsangehörigkeit, die schon besteht. Wer nicht über Abstammung, Geburt oder ein anderes Erwerbsereignis deutsch geworden ist, erhält einen ablehnenden Bescheid und muss den Weg der Einbürgerung gehen.` },
    ],
    body: (h) => `
<h2>Feststellung oder Einbürgerung?</h2>
<p>Die beiden Verfahren werden oft verwechselt, weil dieselbe Behörde sie bearbeitet. Die Einbürgerung verleiht die Staatsangehörigkeit neu. Die Feststellung nach ${h.src('stag30', '§ 30 StAG')} klärt, ob sie schon besteht, und wirkt dann für alle Behörden verbindlich. Die Behörde kann eine Feststellung auch von sich aus treffen, wenn ein öffentliches Interesse besteht.</p>
${h.table(['', 'Feststellung', 'Einbürgerung'], [
  ['Frage', 'Bin ich schon deutsch?', 'Kann ich deutsch werden?'],
  ['Ergebnis', 'Staatsangehörigkeitsausweis', 'Einbürgerungsurkunde'],
  ['Gebühr', h.eur(G.feststellung), h.eur(G.einbuergerung)],
  ['Aufenthalt, Sprache, Test', 'nicht verlangt', `${h.n(E.jahre)} Jahre, ${E.sprache}, Test`],
  ['Rechtsgrundlage', '§ 30 StAG', '§§ 8 bis 10 StAG'],
], 'Feststellung und Einbürgerung im Vergleich.', ['l', 'l', 'l'])}
<h2>Wie man die Abstammung belegt</h2>
<p>Das Gesetz verlangt, dass Urkunden, Registerauszüge oder andere schriftliche Belege den Erwerb und den fortbestehenden Besitz der Staatsangehörigkeit mit hinreichender Wahrscheinlichkeit zeigen. Praktisch heißt das: eine lückenlose Kette von Geburts- und Heiratsurkunden bis zu einer Person, deren Staatsangehörigkeit feststeht, etwa durch einen alten Pass, einen Einbürgerungsnachweis oder einen Eintrag im Melderegister. Je weiter die Kette zurückreicht, desto wichtiger sind Fragen, die nach dem damaligen Recht zu beantworten sind, zum Beispiel ob ein Kind die Staatsangehörigkeit auch über die Mutter erwerben konnte oder ob ein Vorfahr sie durch Einbürgerung in einem anderen Land verloren hat.</p>
<p>Für in Deutschland geborene Kinder ist die Lage meist einfacher. Hatte ein Elternteil bei der Geburt die Voraussetzungen des ${h.src('stag4', '§ 4 Abs. 3 StAG')}, ist das Kind deutsch; der Ausweis kann das bestätigen, wenn das Standesamt den Erwerb nicht eingetragen hat. Mehr unter ${h.a('kinder', 'Einbürgerung von Kindern')}.</p>
<h2>Unterlagen vorbereiten</h2>
<p>Die Behörde braucht Urkunden im Original oder in beglaubigter Kopie, ausländische Dokumente mit Übersetzung. Sammeln Sie zuerst, was die Familie selbst hat: alte Pässe, Heimatscheine, Einbürgerungsurkunden, Wehrpässe, Meldekarten. Fehlende Einträge lassen sich oft bei Standesämtern, Stadtarchiven oder dem Bundesarchiv anfragen. Ein Stammbaum mit Geburts- und Heiratsdaten jeder Generation erleichtert der Behörde die Prüfung erheblich.</p>
<h2>Wenn die Feststellung negativ ausfällt</h2>
<p>Ergibt die Prüfung, dass Sie nicht deutsch sind, bleibt die Einbürgerung. Ob Sie deren Bedingungen erfüllen, zeigt der Rechner:</p>
${h.mini('einb', { p: ['titel', 'jahr', 'deutsch'], c: 'Voraussetzungen der Einbürgerung prüfen' })}
<p>Die Gebühr von ${h.eur(G.feststellung)} nach ${h.src('stag38', '§ 38 StAG')} fällt für die Prüfung an, nicht für ein positives Ergebnis. Wer zusätzlich eine Bescheinigung über das Nichtbestehen der deutschen Staatsangehörigkeit braucht, etwa für ein anderes Land, kann sie auf Antrag erhalten.</p>
`,
  },
  en: {
    slug: 'german-certificate-of-nationality',
    nav: 'Certificate of nationality', card: `Confirm whether you are already German, for €${G.feststellung}`,
    title: 'Certificate of Nationality Germany 2026: Proof and Fee',
    description: `German certificate of nationality 2026: when to confirm that you are already German, which documents you need, the €${G.feststellung} fee and how it differs from naturalising.`,
    h1: 'Certificate of nationality: are you already German?',
    intro: `Some people have been German for years without knowing it for sure. The determination procedure settles it bindingly, for €${G.feststellung}.`,
    resume: `The certificate of nationality (Staatsangehörigkeitsausweis) is the only document that bindingly proves German nationality; a passport or ID card only creates a presumption. It is issued under section 30 StAG through a determination procedure: on application, and where there is a legitimate interest, the nationality authority checks whether someone is German, and its finding then binds every authority. It is mostly needed by descendants of German parents or grandparents born abroad, by children whose acquisition by birth in Germany is unclear, and when there are doubts after long stays abroad. You must show with documents and register extracts that German nationality was acquired with sufficient probability and not lost later. The fee under section 38 StAG is €${G.feststellung}. If you were never German, a determination will not help; you need naturalisation, with ${E.jahre} years of residence, B1 German and the test.`,
    faqs: [
      { q: 'Who needs a German certificate of nationality?', a: 'Nobody is required to hold one as long as a passport or ID card is enough. It is sometimes requested for public service jobs, for inheritance matters abroad or when an authority doubts your nationality. It is also useful for descendants of German emigrants who never had a German passport but may be German by descent.' },
      { q: 'Where do I apply for a determination of nationality?', a: 'In Germany, at the nationality authority where you live, the same office that handles naturalisation. If you live abroad, apply to the Federal Office of Administration (Bundesverwaltungsamt) in Cologne, usually through the German embassy or consulate. Attach the birth and marriage certificates of the ancestors through whom you claim nationality.' },
      { q: 'Is a determination cheaper than naturalisation?', a: `Yes, €${G.feststellung} instead of €${G.einbuergerung}. But it is not a substitute: a determination only confirms a nationality that already exists. If you did not become German by descent, birth or another acquiring event, you receive a negative decision and must go down the naturalisation route.` },
    ],
    body: (h) => `
<h2>Determination or naturalisation?</h2>
<p>The two procedures are often confused because the same office handles both. Naturalisation grants nationality anew. A determination under ${h.src('stag30', 'section 30 StAG')} establishes whether it already exists and then binds all authorities. The authority can also make a determination of its own motion where there is a public interest.</p>
${h.table(['', 'Determination', 'Naturalisation'], [
  ['Question', 'Am I already German?', 'Can I become German?'],
  ['Result', 'Certificate of nationality', 'Naturalisation certificate'],
  ['Fee', h.eur(G.feststellung), h.eur(G.einbuergerung)],
  ['Residence, language, test', 'not required', `${h.n(E.jahre)} years, ${E.sprache}, test`],
  ['Legal basis', 'Section 30 StAG', 'Sections 8 to 10 StAG'],
], 'Determination and naturalisation compared.', ['l', 'l', 'l'])}
<h2>How to prove descent</h2>
<p>The law requires documents, register extracts or other written evidence showing with sufficient probability that nationality was acquired and is still held. In practice that means an unbroken chain of birth and marriage certificates back to someone whose nationality is established, for example by an old passport, a naturalisation record or a population register entry. The further back the chain goes, the more it turns on the law of the time, such as whether a child could acquire nationality through the mother, or whether an ancestor lost it by naturalising elsewhere.</p>
<p>For children born in Germany it is usually simpler. If a parent met the conditions of ${h.src('stag4', 'section 4(3) StAG')} at the birth, the child is German, and the certificate can confirm it if the registry office did not record the acquisition. See ${h.a('kinder', 'citizenship for children')}.</p>
<h2>Preparing the documents</h2>
<p>The authority needs certificates as originals or certified copies, and foreign documents with a translation. Start with what the family already holds: old passports, certificates of nationality, naturalisation certificates, military papers, registration cards. Missing entries can often be requested from registry offices, city archives or the Federal Archives. A family tree with the birth and marriage dates of each generation makes the review much easier.</p>
<h2>If the answer is no</h2>
<p>If the check finds you are not German, naturalisation remains. The calculator shows whether you meet its conditions:</p>
${h.mini('einb', { p: ['titel', 'jahr', 'deutsch'], c: 'Check the naturalisation requirements' })}
<p>The ${h.eur(G.feststellung)} fee under ${h.src('stag38', 'section 38 StAG')} is for the check, not for a positive result. If you also need a certificate that you do not hold German nationality, for example for another country, you can get one on request.</p>
`,
  },
});
