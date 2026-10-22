import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Blaue Karte 2026 : § 18g AufenthG, seuils = 50 % / 45,3 % de la Beitragsbemessungsgrenze RV 2026 (DRV), puis § 18c Abs. 2 et § 10 StAG. */
const S = K.blauSchwellen(), N = K.P.ne, E = K.P.einb, B = K.P.blau;
const pct = (x: number, l: string) => `${String(Math.round(x * 1000) / 10).replace('.', l === 'de' ? ',' : '.')}${l === 'de' ? ' %' : '%'}`;
const SAMPLE = [48000, 52000];

export default defineGuide({
  id: 'blaue-karte', group: 'aufenthalt', order: 120,
  tool: 'blau',
  related: ['niederlassungserlaubnis', 'voraussetzungen', 'ehepartner', 'kosten'],
  sources: ['aufenthg18g', 'drv-bbg', 'aufenthg18c', 'stag10'],
  de: {
    slug: 'blaue-karte-gehalt',
    nav: 'Blaue Karte EU', card: `Mindestgehalt ${B.jahr}: ${S.regel.toLocaleString('de-DE')} € oder ${S.engpass.toLocaleString('de-DE')} €`,
    title: 'Blaue Karte Mindestgehalt 2026: Grenzen und Weg zum Pass',
    description: `Blaue Karte EU 2026: Mindestgehalt ${S.regel.toLocaleString('de-DE')} € oder ${S.engpass.toLocaleString('de-DE', { minimumFractionDigits: 2 })} € in Engpassberufen und für Berufseinsteiger, Rechner, dann Niederlassungserlaubnis nach 21 Monaten.`,
    h1: 'Blaue Karte EU: Mindestgehalt und Weg zur Einbürgerung',
    intro: 'Bruttojahresgehalt eingeben: Der Rechner vergleicht es mit beiden Gehaltsgrenzen und zeigt den Weg zur Niederlassungserlaubnis und zur Einbürgerung.',
    resume: `Für die Blaue Karte EU verlangt § 18g AufenthG ein Bruttojahresgehalt von mindestens 50 Prozent der Beitragsbemessungsgrenze der allgemeinen Rentenversicherung. Diese Grenze beträgt ${B.jahr} nach den Rechengrößen der Deutschen Rentenversicherung ${S.bbg.toLocaleString('de-DE')} €, die Gehaltsgrenze also ${S.regel.toLocaleString('de-DE')} €. In Engpassberufen, etwa in der Medizin, im Ingenieurwesen oder in der Informatik, und für Berufsanfänger, deren Hochschulabschluss höchstens drei Jahre zurückliegt, gilt die niedrigere Grenze von 45,3 Prozent, also ${S.engpass.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €. Wer mit der Blauen Karte arbeitet, bekommt nach § 18c Abs. 2 die Niederlassungserlaubnis nach ${N.blauMonate} Monaten, mit Deutsch auf Niveau B1 schon nach ${N.blauMonateB1} Monaten. Für die Einbürgerung gilt dagegen keine Abkürzung: Auch Inhaber der Blauen Karte brauchen ${E.jahre} Jahre Aufenthalt, B1 und den Test. Die Blaue Karte selbst ist kein ausgeschlossener Titel, die Niederlassungserlaubnis ist also kein Muss davor. Die Werte für ${B.jahr + 1} sind noch nicht veröffentlicht.`,
    faqs: [
      { q: 'Zählt Bonus oder Weihnachtsgeld zum Gehalt für die Blaue Karte?', a: 'Gezählt wird das im Arbeitsvertrag vereinbarte Bruttojahresgehalt. Feste Bestandteile wie ein vertraglich zugesichertes dreizehntes Gehalt zählen in der Regel mit, variable Boni ohne Zusage meist nicht. Entscheidend ist, was die Ausländerbehörde und die Bundesagentur für Arbeit dem Vertrag entnehmen; lassen Sie feste Bestandteile im Vertrag ausdrücklich als garantiert ausweisen.' },
      { q: 'Steigt die Gehaltsgrenze jedes Jahr?', a: 'Ja, weil sie an die Beitragsbemessungsgrenze der Rentenversicherung gekoppelt ist, die jährlich neu festgesetzt wird. Wer eine Blaue Karte schon hat, muss bei einer Verlängerung in der Regel die dann geltende Grenze erfüllen. Unser Rechner nutzt die Werte für 2026 und wird umgestellt, sobald die Werte für das Folgejahr veröffentlicht sind.' },
      { q: 'Werde ich mit der Blauen Karte schneller eingebürgert?', a: `Nein. Die kürzeren Fristen gelten nur für die Niederlassungserlaubnis. Für die Einbürgerung brauchen Inhaber der Blauen Karte wie alle anderen ${E.jahre} Jahre rechtmäßigen Aufenthalt, Deutsch auf Niveau B1 und den bestandenen Einbürgerungstest. Die frühere Einbürgerung nach drei Jahren bei besonderen Integrationsleistungen ist abgeschafft.` },
    ],
    body: (h) => `
<h2>Die beiden Gehaltsgrenzen ${h.n(B.jahr)}</h2>
<p>${h.src('aufenthg18g', '§ 18g AufenthG')} nennt keine festen Euro-Beträge, sondern Anteile der Beitragsbemessungsgrenze. Wir rechnen sie mit dem Wert aus den ${h.src('drv-bbg', 'Rechengrößen der Deutschen Rentenversicherung')} aus.</p>
${h.table(['Fall', 'Anteil', 'Bruttojahresgehalt ' + B.jahr, 'pro Monat'], [
  ['Regelfall', pct(B.regel, 'de'), h.eur(S.regel), h.eur(S.regel / 12)],
  ['Engpassberuf oder Abschluss vor höchstens drei Jahren', pct(B.engpass, 'de'), h.eur(S.engpass, 2), h.eur(S.engpass / 12, 2)],
  ['Beitragsbemessungsgrenze (Rentenversicherung)', '100 %', h.eur(S.bbg), h.eur(S.bbg / 12)],
], 'Gehaltsgrenzen der Blauen Karte EU, berechnet aus der Beitragsbemessungsgrenze.', ['l', 'r', 'r', 'r'])}
<p>Ein Angebot von ${h.eur(SAMPLE[0])} reicht also nur in einem Engpassberuf oder für Berufseinsteiger, eines von ${h.eur(SAMPLE[1])} in jedem Fall. In Engpassberufen prüft die Bundesagentur für Arbeit zusätzlich, ob die Arbeitsbedingungen denen vergleichbarer deutscher Beschäftigter entsprechen.</p>
${h.mini('blau', { p: ['g', 'eng'], d: { g: SAMPLE[0] }, t: 'Reicht Ihr Gehalt?' })}
<h2>Von der Blauen Karte zum deutschen Pass</h2>
<p>Die Blaue Karte wird für die Dauer des Arbeitsvertrags plus drei Monate erteilt, höchstens für vier Jahre. Danach führen zwei Wege weiter. Die Niederlassungserlaubnis nach ${h.src('aufenthg18c', '§ 18c Abs. 2 AufenthG')} kommt nach ${h.n(N.blauMonate)} Monaten Beschäftigung mit Blauer Karte und einfachen Deutschkenntnissen, mit B1 nach ${h.n(N.blauMonateB1)} Monaten; Einzelheiten unter ${h.a('niederlassungserlaubnis', 'Niederlassungserlaubnis')}. Die Einbürgerung nach ${h.src('stag10', '§ 10 StAG')} ist nach ${h.n(E.jahre)} Jahren möglich, und die Blaue Karte zählt dabei als zulässiger Titel.</p>
<p>Ein typischer Verlauf: Einreise mit Blauer Karte, Deutschkurs bis B1 im ersten Jahr, Niederlassungserlaubnis nach ${h.n(N.blauMonateB1)} Monaten, Einbürgerungstest im vierten Jahr, Antrag auf Einbürgerung nach ${h.n(E.jahre)} Jahren. Den Antragsmonat für Ihren Fall nennt der ${h.a('voraussetzungen', 'Rechner zu den Voraussetzungen')}.</p>
<h2>Was der Rechner nicht prüft</h2>
<p>Er vergleicht nur das Gehalt. Für die Blaue Karte brauchen Sie außerdem einen deutschen, einen anerkannten oder einen vergleichbaren ausländischen Hochschulabschluss und ein konkretes Arbeitsangebot, das zu Ihrer Qualifikation passt. Ob ein ausländischer Abschluss vergleichbar ist, lässt sich in der Datenbank anabin der Kultusministerkonferenz nachsehen oder bei der Zentralstelle für ausländisches Bildungswesen prüfen. Für IT-Fachkräfte sieht das Gesetz Sonderregeln vor, die hier nicht berechnet werden.</p>
<h2>Familie</h2>
<p>Ehegatten von Inhabern der Blauen Karte dürfen ohne Deutschnachweis nachziehen und in Deutschland arbeiten. Für ihre eigene Einbürgerung gelten später die allgemeinen Regeln, oder sie werden zusammen mit dem Partner eingebürgert; siehe ${h.a('ehepartner', 'Einbürgerung als Ehepartner')}.</p>
`,
  },
  en: {
    slug: 'eu-blue-card-germany-salary',
    nav: 'EU Blue Card', card: `Minimum salary ${B.jahr}: €${S.regel.toLocaleString('en-GB')} or €${S.engpass.toLocaleString('en-GB')}`,
    title: 'EU Blue Card Germany Salary 2026: Thresholds and Path',
    description: `EU Blue Card Germany 2026: minimum salary €${S.regel.toLocaleString('en-GB')}, or €${S.engpass.toLocaleString('en-GB', { minimumFractionDigits: 2 })} in shortage jobs and for new graduates, a salary check, then settlement after 21 months.`,
    h1: 'EU Blue Card Germany: minimum salary and the path to citizenship',
    intro: 'Enter your gross annual salary: the calculator compares it with both thresholds and shows the route to a settlement permit and to citizenship.',
    resume: `For an EU Blue Card, section 18g of the Residence Act requires a gross annual salary of at least 50 percent of the contribution ceiling of the statutory pension insurance. According to the German Pension Insurance’s reference values, that ceiling is €${S.bbg.toLocaleString('en-GB')} in ${B.jahr}, so the threshold is €${S.regel.toLocaleString('en-GB')}. In shortage occupations, such as medicine, engineering or IT, and for graduates whose degree is at most three years old, the lower threshold of 45.3 percent applies: €${S.engpass.toLocaleString('en-GB', { minimumFractionDigits: 2 })}. Blue Card holders get a settlement permit under section 18c(2) after ${N.blauMonate} months, or after ${N.blauMonateB1} months with B1 German. There is no shortcut to citizenship, though: Blue Card holders also need ${E.jahre} years of residence, B1 and the test. The Blue Card is not an excluded title, so the settlement permit is not a must beforehand. The ${B.jahr + 1} values have not been published yet.`,
    faqs: [
      { q: 'Does a bonus count towards the Blue Card salary?', a: 'What counts is the gross annual salary agreed in the employment contract. Fixed components, such as a thirteenth month promised in the contract, usually count; discretionary bonuses usually do not. It comes down to what the foreigners’ authority and the Federal Employment Agency read in the contract, so make sure fixed components are written into it as such.' },
      { q: 'Does the Blue Card salary threshold rise every year?', a: 'Yes, because it is tied to the pension contribution ceiling, which is reset each year. If you already hold a Blue Card, an extension normally has to meet the threshold in force at that time. Our calculator uses the 2026 values and will switch as soon as next year’s values are published.' },
      { q: 'Does the Blue Card speed up citizenship?', a: `No. The shorter periods only apply to the settlement permit. To naturalise, Blue Card holders need ${E.jahre} years of lawful residence like everyone else, plus B1 German and a passed citizenship test. The former three-year route for exceptional integration has been abolished.` },
    ],
    body: (h) => `
<h2>The two salary thresholds in ${h.n(B.jahr)}</h2>
<p>${h.src('aufenthg18g', 'Section 18g of the Residence Act')} sets no fixed euro amounts, only shares of the contribution ceiling. We calculate them from the figure in the ${h.src('drv-bbg', 'German Pension Insurance’s reference values')}.</p>
${h.table(['Case', 'Share', 'Gross annual salary ' + B.jahr, 'Per month'], [
  ['Standard', pct(B.regel, 'en'), h.eur(S.regel), h.eur(S.regel / 12)],
  ['Shortage occupation or degree at most three years old', pct(B.engpass, 'en'), h.eur(S.engpass, 2), h.eur(S.engpass / 12, 2)],
  ['Contribution ceiling (pension insurance)', '100%', h.eur(S.bbg), h.eur(S.bbg / 12)],
], 'EU Blue Card salary thresholds, derived from the contribution ceiling.', ['l', 'r', 'r', 'r'])}
<p>An offer of ${h.eur(SAMPLE[0])} is therefore only enough in a shortage occupation or for recent graduates, while ${h.eur(SAMPLE[1])} is enough in any case. In shortage occupations the Federal Employment Agency also checks that working conditions match those of comparable German employees.</p>
${h.mini('blau', { p: ['g', 'eng'], d: { g: SAMPLE[0] }, t: 'Is your salary enough?' })}
<h2>From Blue Card to German passport</h2>
<p>The Blue Card is issued for the length of the employment contract plus three months, up to four years. Two routes lead on from there. The settlement permit under ${h.src('aufenthg18c', 'section 18c(2)')} comes after ${h.n(N.blauMonate)} months of Blue Card employment with basic German, or ${h.n(N.blauMonateB1)} months with B1; see ${h.a('niederlassungserlaubnis', 'settlement permit')}. Naturalisation under ${h.src('stag10', 'section 10 StAG')} is possible after ${h.n(E.jahre)} years, and the Blue Card counts as a qualifying title.</p>
<p>A typical path: arrive on a Blue Card, reach B1 in the first year, settlement permit after ${h.n(N.blauMonateB1)} months, citizenship test in year four, citizenship application after ${h.n(E.jahre)} years. The ${h.a('voraussetzungen', 'requirements calculator')} gives your own month to apply.</p>
<h2>What the calculator does not check</h2>
<p>It only compares the salary. For a Blue Card you also need a German, a recognised or a comparable foreign university degree, and a concrete job offer that matches your qualification. Whether a foreign degree is comparable can be looked up in the anabin database of the Standing Conference of Education Ministers or checked by the Central Office for Foreign Education. The law has special rules for IT specialists, which are not calculated here.</p>
<h2>Family</h2>
<p>Spouses of Blue Card holders may join without proof of German and may work in Germany. For their own naturalisation the general rules apply later, or they naturalise together with their partner; see ${h.a('ehepartner', 'citizenship for spouses')}.</p>
`,
  },
});
