import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Frais : § 38 StAG et § 2 EinbTestV. Les prix des examens de langue et des traductions varient selon le prestataire : non chiffrés. */
const G = K.P.gebuehr, T = K.P.test;
const FAM = [
  { e: 1, k: 0, ke: 0, t: 1 },
  { e: 2, k: 0, ke: 0, t: 2 },
  { e: 2, k: 2, ke: 0, t: 2 },
  { e: 1, k: 1, ke: 1, t: 2 },
].map((x) => ({ ...x, r: K.kosten({ erwachsene: x.e, kinderMit: x.k, kinderEigen: x.ke, tests: x.t }) }));
const rows = (h: Helpers, lab: string[]) => FAM.map((f, i) => [lab[i], h.eur(f.r.erw + f.r.eigen), h.eur(f.r.kinder), h.eur(f.r.test), `<strong>${h.eur(f.r.gesamt)}</strong>`]);

export default defineGuide({
  id: 'kosten', group: 'einb', order: 40,
  tool: 'kosten',
  related: ['voraussetzungen', 'kinder', 'beantragen', 'test-anmelden'],
  sources: ['stag38', 'einbtestv'],
  de: {
    slug: 'einbuergerung-kosten',
    nav: 'Kosten der Einbürgerung', card: `${G.einbuergerung} € pro Person, ${G.kind} € pro Kind, Rechner für die Familie`,
    title: 'Einbürgerung Kosten 2026: Gebühren für die ganze Familie',
    description: `Einbürgerung Kosten 2026: ${G.einbuergerung} € pro Erwachsenem, ${G.kind} € pro Kind ohne Einkommen, ${T.gebuehr} € für den Test. Rechner für die Familie, Ermäßigung, Gebühr bei Ablehnung.`,
    h1: 'Was kostet die Einbürgerung?',
    intro: `Zahl der Erwachsenen, Kinder und Tests eingeben: Der Rechner addiert die gesetzlichen Gebühren für die ganze Familie.`,
    resume: `Die Einbürgerung kostet nach § 38 des Staatsangehörigkeitsgesetzes ${G.einbuergerung} € pro Person. Für ein minderjähriges Kind, das zusammen mit einem Elternteil eingebürgert wird und kein eigenes Einkommen hat, sind es ${G.kind} €. Hinzu kommt für jede Person ab 16 Jahren, die den Einbürgerungstest ablegt, die Prüfungsgebühr von ${T.gebuehr} €. Eine Familie mit zwei Erwachsenen und zwei Kindern zahlt damit ${FAM[2].r.gesamt} € an Gebühren, wenn beide Erwachsenen den Test machen. Nicht gesetzlich festgelegt und deshalb hier nicht beziffert sind die Preise für die Sprachprüfung, für beglaubigte Übersetzungen und für Urkunden aus dem Herkunftsland; sie hängen vom Anbieter und vom Land ab. Die Behörde kann die Gebühr aus Gründen der Billigkeit oder des öffentlichen Interesses ermäßigen oder ganz erlassen. Wird der Antrag abgelehnt oder zurückgenommen, nachdem die Bearbeitung begonnen hat, kann eine Gebühr zwischen ${G.ablehnungMin} € und der vollen Gebühr anfallen.`,
    faqs: [
      { q: 'Wann muss ich die Einbürgerungsgebühr bezahlen?', a: 'Das regelt jede Behörde selbst. Viele verlangen die Gebühr mit dem Antrag oder kurz danach, andere erst vor der Aushändigung der Urkunde. In Berlin wird sie zum Beispiel mit der Antragstellung fällig und bei einer Ablehnung nicht erstattet. Fragen Sie bei Ihrer Behörde nach und heben Sie den Zahlungsbeleg für die Akte auf.' },
      { q: 'Gibt es eine Ermäßigung der Einbürgerungsgebühr bei geringem Einkommen?', a: `§ 38 StAG erlaubt eine Ermäßigung oder Befreiung aus Gründen der Billigkeit oder des öffentlichen Interesses. Das kann etwa Familien mit mehreren Kindern oder Menschen mit sehr geringem Einkommen betreffen. Einen Anspruch darauf gibt es nicht; stellen Sie einen formlosen Antrag mit Belegen über Einkommen und Familiengröße, wenn ${G.einbuergerung} € pro Person für Sie eine Härte sind.` },
      { q: 'Kostet ein Kind mit eigenem Einkommen mehr?', a: `Ja. Die ermäßigte Gebühr von ${G.kind} € gilt nur für minderjährige Kinder ohne eigenes Einkommen, die mit einem Elternteil eingebürgert werden. Ein Kind mit Ausbildungsvergütung oder Minijob zahlt grundsätzlich die volle Gebühr von ${G.einbuergerung} €; im Rechner tragen Sie es unter den weiteren Angaben ein. Volljährige Kinder stellen einen eigenen Antrag.` },
    ],
    body: (h) => `
<h2>Die Gebühren im Gesetz</h2>
<p>${h.src('stag38', '§ 38 StAG')} legt die Gebühren für alle Verfahren der Staatsangehörigkeit fest. Für die Einbürgerung gibt es zwei Beträge: den vollen und den ermäßigten für miteingebürgerte Kinder. Die Feststellung, ob jemand bereits Deutscher ist, kostet ${h.eur(G.feststellung)}; Bescheinigungen liegen zwischen ${h.eur(G.bescheinigungMin)} und ${h.eur(G.bescheinigungMax)}. Der Test ist kein Teil des Verfahrens bei der Behörde; seine Gebühr setzt die ${h.src('einbtestv', 'Einbürgerungstestverordnung')} fest.</p>
${h.table(['Posten', 'Betrag', 'Rechtsgrundlage'], [
  ['Einbürgerung, je Person', h.eur(G.einbuergerung), '§ 38 Abs. 2 StAG'],
  ['Minderjähriges Kind ohne Einkommen, mit Elternteil', h.eur(G.kind), '§ 38 Abs. 2 StAG'],
  ['Feststellung der Staatsangehörigkeit', h.eur(G.feststellung), '§ 38 Abs. 2 StAG'],
  ['Einbürgerungstest, je Versuch', h.eur(T.gebuehr), '§ 2 EinbTestV'],
  ['Ablehnung oder Rücknahme nach Beginn der Bearbeitung', `${h.eur(G.ablehnungMin)} bis volle Gebühr`, '§ 38 StAG mit Gebührenrecht'],
], 'Gesetzliche Gebühren rund um die Einbürgerung.', ['l', 'r', 'l'])}
<h2>Vier Familien, durchgerechnet</h2>
<p>Die Tabelle zeigt die Summe der gesetzlichen Gebühren, wie sie der Rechner ausgibt. Sprachprüfung, Übersetzungen und Urkunden sind nicht enthalten.</p>
${h.table(['Familie', 'Erwachsene', 'Kinder', 'Tests', 'Gesamt'], rows(h, ['Eine Person', 'Paar', 'Paar mit zwei Kindern', 'Elternteil, ein Kind ohne und ein Kind mit Einkommen']), 'Gebühren nach § 38 StAG und § 2 EinbTestV.', ['l', 'r', 'r', 'r', 'r'])}
<p>Bei der letzten Familie zahlt das Kind mit eigenem Einkommen die volle Gebühr und legt, wenn es 16 oder älter ist, auch den Test ab. Kinder unter 16 brauchen keinen Test; zu ihren Sonderregeln siehe ${h.a('kinder', 'Einbürgerung von Kindern')}.</p>
${h.mini('kosten', { p: ['erw', 'kind', 'test'], d: { erw: 2, kind: 1, test: 2 }, t: 'Gebühren für Ihre Familie' })}
<h2>Kosten außerhalb der Gebührenordnung</h2>
<p>Der größte Posten neben der Gebühr ist oft die Sprachprüfung. Ihr Preis hängt vom Anbieter ab, und wer einen Integrationskurs besucht hat, hat den Nachweis womöglich schon; mehr unter ${h.a('sprachnachweis', 'Sprachnachweis B1')}. Dazu kommen Gebühren des Herkunftslandes für Pass, Geburtsurkunde oder Heiratsurkunde und deren Übersetzung durch einen beeidigten Übersetzer. Diese Beträge veröffentlichen wir nicht, weil es keine einheitlichen Werte gibt.</p>
<p>Wer die alte Staatsangehörigkeit freiwillig aufgibt, zahlt dafür im Herkunftsland eigene Gebühren. Pflicht ist das nicht mehr; die Gründe stehen unter ${h.a('doppelte-staatsbuergerschaft', 'doppelte Staatsbürgerschaft')}. Nach der Einbürgerung beantragen Sie einen deutschen Personalausweis und Reisepass beim Bürgeramt; deren Gebühren richten sich nach dem Pass- und Ausweisrecht.</p>
<h2>Wenn der Antrag scheitert</h2>
<p>Die Gebühr deckt die Arbeit der Behörde, nicht den Erfolg. Wird der Antrag abgelehnt oder ziehen Sie ihn zurück, nachdem die Prüfung begonnen hat, setzt die Behörde eine Gebühr fest, die nach unserer Lesung des Gesetzes zwischen ${h.eur(G.ablehnungMin)} und dem vollen Betrag liegt. Wer unsicher ist, ob eine Voraussetzung erfüllt ist, prüft deshalb vorher mit dem ${h.a('voraussetzungen', 'Rechner zu den Voraussetzungen')}, ob der Antrag Aussicht hat.</p>
`,
  },
  en: {
    slug: 'german-citizenship-fees',
    nav: 'Naturalisation fees', card: `€${G.einbuergerung} per person, €${G.kind} per child, family calculator`,
    title: 'Citizenship Fees in Germany 2026: Cost for the Whole Family',
    description: `German citizenship fees 2026: €${G.einbuergerung} per adult, €${G.kind} per child without income, €${T.gebuehr} for the test. Family calculator, fee reductions and the charge if refused.`,
    h1: 'How much does German citizenship cost?',
    intro: 'Enter the number of adults, children and tests: the calculator adds up the statutory fees for your whole family.',
    resume: `Under section 38 of the Nationality Act, naturalisation costs €${G.einbuergerung} per person. For a minor child naturalised together with a parent and without income of its own, the fee is €${G.kind}. On top of that, everyone aged 16 or over who sits the citizenship test pays the exam fee of €${T.gebuehr}. A family of two adults and two children therefore pays €${FAM[2].r.gesamt} in fees if both adults take the test. Prices for the language exam, certified translations and documents from your country of origin are not set by law, so we do not quote them; they depend on the provider and the country. The authority may reduce or waive the fee on grounds of fairness or public interest. If the application is refused or withdrawn after processing has started, a fee between €${G.ablehnungMin} and the full amount may be charged.`,
    faqs: [
      { q: 'When do I pay the naturalisation fee?', a: 'Each authority decides. Many ask for the fee with the application or shortly after, others only before handing over the certificate. In Berlin, for example, it is due when you apply and is not refunded if the application is refused. Ask your authority and keep the payment receipt for your file.' },
      { q: 'Can the naturalisation fee be reduced on a low income?', a: `Section 38 StAG allows a reduction or waiver on grounds of fairness or public interest, which can apply to large families or people on a very low income. There is no right to it; send an informal request with proof of income and family size if €${G.einbuergerung} per person would be a hardship for you.` },
      { q: 'Does a child with its own income pay more?', a: `Yes. The reduced fee of €${G.kind} only applies to minor children without income who are naturalised with a parent. A child earning an apprenticeship wage or from a mini-job generally pays the full €${G.einbuergerung}; enter such a child under the extra fields of the calculator. Adult children file their own application.` },
    ],
    body: (h) => `
<h2>The fees set by law</h2>
<p>${h.src('stag38', 'Section 38 StAG')} sets the fees for all nationality procedures. Naturalisation has two amounts: the full fee and the reduced one for children naturalised with a parent. Confirming whether someone is already German costs ${h.eur(G.feststellung)}, and certificates range from ${h.eur(G.bescheinigungMin)} to ${h.eur(G.bescheinigungMax)}. The test is not part of the authority’s procedure; its fee is set by the ${h.src('einbtestv', 'Citizenship Test Ordinance')}.</p>
${h.table(['Item', 'Amount', 'Legal basis'], [
  ['Naturalisation, per person', h.eur(G.einbuergerung), 'Section 38(2) StAG'],
  ['Minor child without income, with a parent', h.eur(G.kind), 'Section 38(2) StAG'],
  ['Confirmation of nationality', h.eur(G.feststellung), 'Section 38(2) StAG'],
  ['Citizenship test, per attempt', h.eur(T.gebuehr), 'Section 2 EinbTestV'],
  ['Refusal or withdrawal after processing has started', `${h.eur(G.ablehnungMin)} to full fee`, 'Section 38 StAG and fee law'],
], 'Statutory fees around naturalisation.', ['l', 'r', 'l'])}
<h2>Four families, worked out</h2>
<p>The table shows the statutory fees as the calculator returns them. Language exam, translations and documents are not included.</p>
${h.table(['Family', 'Adults', 'Children', 'Tests', 'Total'], rows(h, ['One person', 'Couple', 'Couple with two children', 'Parent, one child without and one with income']), 'Fees under section 38 StAG and section 2 EinbTestV.', ['l', 'r', 'r', 'r', 'r'])}
<p>In the last family, the child with its own income pays the full fee and, if 16 or older, also sits the test. Children under 16 do not take the test; their special rules are on ${h.a('kinder', 'citizenship for children')}.</p>
${h.mini('kosten', { p: ['erw', 'kind', 'test'], d: { erw: 2, kind: 1, test: 2 }, t: 'Fees for your family' })}
<h2>Costs outside the fee schedule</h2>
<p>Apart from the fee, the largest item is often the language exam. Its price depends on the provider, and if you attended an integration course you may already hold the certificate; see ${h.a('sprachnachweis', 'B1 German certificate')}. Add the fees charged by your country of origin for a passport, birth or marriage certificate, and their translation by a sworn translator. We do not publish these amounts because there are no uniform figures.</p>
<p>Giving up your old nationality voluntarily costs whatever your country charges. It is no longer required; the reasons are on ${h.a('doppelte-staatsbuergerschaft', 'dual citizenship')}. After naturalising, you apply for a German ID card and passport at the citizens’ office, with fees set by passport and ID law.</p>
<h2>If the application fails</h2>
<p>The fee pays for the authority’s work, not for the outcome. If the application is refused, or you withdraw it after the review has begun, the authority sets a fee which, on our reading of the law, lies between ${h.eur(G.ablehnungMin)} and the full amount. If you are unsure whether you meet a requirement, check first with the ${h.a('voraussetzungen', 'requirements calculator')} whether the application stands a chance.</p>
`,
  },
});
