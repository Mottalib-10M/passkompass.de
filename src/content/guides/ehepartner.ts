import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Conjoints : § 9 StAG (conjoint d'Allemand), § 10 Abs. 2 (naturalisation conjointe), § 28 AufenthG (titre). Exemples calculés par le moteur. */
const E = K.P.einb, N = K.P.ne;
const base = { titel: 'familie' as const, deutsch: 'b1' as const, test: true, unterhalt: 'eigen' as const, strafe: 'keine' as const };
const CASES = [
  { seit: '2023-04', ehe: '2023-01' },
  { seit: '2023-04', ehe: '2025-02' },
  { seit: '2021-08', ehe: '2025-06' },
].map((c) => ({ ...c, r: K.einbuergerung({ ...base, seit: c.seit, eheMitDeutschem: c.ehe }, K.HEUTE) }));
const rows = (h: Helpers) => CASES.map((c, i) => [String.fromCharCode(65 + i), h.my(c.seit), h.my(c.ehe), c.r.weg === 'para9' ? '§ 9' : '§ 10', h.my(c.r.fristAb)]);

export default defineGuide({
  id: 'ehepartner', group: 'einb', order: 70,
  tool: 'einb', toolArg: { ehe: 'ja', titel: 'familie', jahr: 2023, ehejahr: 2024 },
  related: ['voraussetzungen', 'kinder', 'niederlassungserlaubnis', 'kosten'],
  sources: ['stag9', 'stag10', 'aufenthg28'],
  de: {
    slug: 'einbuergerung-ehepartner',
    nav: 'Ehepartner von Deutschen', card: `${E.ehegatteJahre} Jahre Aufenthalt und ${E.eheJahre} Jahre Ehe statt ${E.jahre} Jahre`,
    title: 'Einbürgerung Ehepartner 2026: nach 3 Jahren deutsch werden',
    description: `Einbürgerung als Ehepartner 2026: mit deutschem Ehegatten nach ${E.ehegatteJahre} Jahren Aufenthalt und ${E.eheJahre} Jahren Ehe, Miteinbürgerung des Partners, Rechner für den Antragsmonat.`,
    h1: 'Deutsche Staatsbürgerschaft durch Heirat: der Weg für Ehegatten',
    intro: `Mit einem deutschen Ehegatten reichen ${E.ehegatteJahre} Jahre Aufenthalt, wenn die Ehe seit ${E.eheJahre} Jahren besteht. Der Rechner nimmt den späteren der beiden Termine.`,
    resume: `Wer mit einer Deutschen oder einem Deutschen verheiratet ist oder in eingetragener Lebenspartnerschaft lebt, soll nach § 9 StAG schon nach ${E.ehegatteJahre} Jahren rechtmäßigem gewöhnlichem Aufenthalt eingebürgert werden, wenn die Ehe seit mindestens ${E.eheJahre} Jahren besteht. Beide Fristen müssen gleichzeitig erfüllt sein; es zählt also der spätere Termin. Bei einer Ehe von ${E.eheJahreVerkuerzt} Jahren kann die Aufenthaltszeit aus öffentlichem Interesse weiter verkürzt werden. Alle übrigen Bedingungen des § 10 gelten auch hier: Deutsch auf Niveau ${E.sprache}, Einbürgerungstest, Lebensunterhalt ohne Bürgergeld, keine erhebliche Verurteilung und das Bekenntnis zur Grundordnung. Ist der Partner nicht deutsch, sondern wird selbst eingebürgert, kann die Ehefrau oder der Ehemann nach § 10 Abs. 2 miteingebürgert werden, auch ohne eigene ${E.jahre} Jahre. Wer im September 2021 eingereist ist und im Juni 2025 eine Deutsche geheiratet hat, kommt nach § 10 früher ans Ziel als nach § 9; der Rechner wählt den günstigeren Weg selbst.`,
    faqs: [
      { q: 'Zählt die Zeit vor der Hochzeit für die drei Jahre Aufenthalt?', a: `Ja. Die ${E.ehegatteJahre} Jahre Aufenthalt beziehen sich auf jeden rechtmäßigen gewöhnlichen Aufenthalt, nicht nur auf die Zeit als Ehegatte. Wer etwa schon zwei Jahre mit einer Arbeitserlaubnis hier lebt und dann heiratet, braucht noch ein Jahr Aufenthalt, aber zwei volle Ehejahre. Der Termin, an dem beide Bedingungen erfüllt sind, ist der früheste Antragsmonat.` },
      { q: 'Was passiert bei Trennung oder Tod des deutschen Ehegatten?', a: 'Nach § 9 Abs. 2 StAG bleibt der kürzere Weg offen, wenn der Antrag innerhalb eines Jahres nach dem Tod oder nach der rechtskräftigen Scheidung gestellt wird und Sie das Sorgerecht für ein minderjähriges deutsches Kind aus dieser Ehe haben und mit ihm zusammenleben. Ohne gemeinsames Kind gilt nach einer Trennung wieder die allgemeine Frist von fünf Jahren.' },
      { q: 'Brauche ich als Ehepartner auch den Einbürgerungstest?', a: `Ja. § 9 verweist auf die Bedingungen des § 10 Abs. 1, und dazu gehören Kenntnisse der Rechts- und Gesellschaftsordnung. Sie werden in der Regel mit dem Einbürgerungstest nachgewiesen. Auch Deutsch auf Niveau ${E.sprache} ist nötig. Befreit ist nur, wer die Nachweise wegen Krankheit, Behinderung oder Alters nicht erbringen kann.` },
    ],
    body: (h) => `
<h2>Zwei Wege für Paare</h2>
<p>Das Gesetz unterscheidet, ob der Partner schon deutsch ist oder gerade selbst eingebürgert wird. Im ersten Fall gilt ${h.src('stag9', '§ 9 StAG')} mit kürzeren Fristen. Im zweiten Fall erlaubt ${h.src('stag10', '§ 10 Abs. 2 StAG')} die Miteinbürgerung: Ehegatte und minderjährige Kinder können zusammen mit der antragstellenden Person eingebürgert werden, auch wenn sie selbst noch keine ${h.n(E.jahre)} Jahre im Land sind. Wie lange die Behörden dann mindestens verlangen, regeln Verwaltungsvorschriften und die Praxis vor Ort; fragen Sie danach, bevor Sie den gemeinsamen Antrag stellen.</p>
${h.table(['Situation', 'Aufenthalt', 'Ehe', 'Rechtsgrundlage'], [
  ['Ehe mit einer oder einem Deutschen', `${h.n(E.ehegatteJahre)} Jahre`, `${h.n(E.eheJahre)} Jahre`, '§ 9 Abs. 1 StAG'],
  ['Wie oben, Ehe länger', 'kürzer möglich', `${h.n(E.eheJahreVerkuerzt)} Jahre`, '§ 9 Abs. 1 StAG, öffentliches Interesse'],
  ['Partner wird selbst eingebürgert', 'keine eigene Mindestfrist im Gesetz', 'keine', '§ 10 Abs. 2 StAG'],
  ['Allgemeiner Weg', `${h.n(E.jahre)} Jahre`, 'keine', '§ 10 Abs. 1 StAG'],
], 'Fristen für Ehepartner und eingetragene Lebenspartner.', ['l', 'l', 'l', 'l'])}
<h2>Drei Paare, mit dem Rechner gerechnet</h2>
<p>Alle drei Fälle haben B1, Test und eigenes Einkommen. Der Rechner prüft beide Wege und gibt den früheren aus.</p>
${h.table(['Fall', 'In Deutschland seit', 'Heirat', 'Weg', 'Frist erfüllt ab'], rows(h), 'Frühester Monat, ab dem die Aufenthaltszeit erfüllt ist.', ['l', 'l', 'l', 'l', 'l'])}
<p>Fall A hat schon vor der Einreise geheiratet; hier entscheiden die drei Jahre Aufenthalt. Fall B hat nach der Einreise geheiratet, und die zwei Ehejahre laufen länger als die drei Aufenthaltsjahre. Fall C lebt schon lange hier: Die fünf Jahre nach § 10 sind erfüllt, bevor die Ehe zwei Jahre alt ist.</p>
${h.mini('einb', { p: ['ehe', 'jahr', 'ehejahr'], d: { ehe: 'ja', jahr: 2023, ehejahr: 2024 }, t: 'Ihr Antragsmonat als Ehepartner' })}
<h2>Niederlassungserlaubnis für Ehegatten von Deutschen</h2>
<p>Bis zur Einbürgerung leben Sie mit einer Aufenthaltserlaubnis zum Familiennachzug. Nach ${h.src('aufenthg28', '§ 28 AufenthG')} gibt es nach ${h.n(N.ehegatteDeutschJahre)} Jahren in der Regel eine Niederlassungserlaubnis, wenn die familiäre Gemeinschaft fortbesteht und Deutsch auf Niveau B1 vorliegt. Für die Einbürgerung ist das nicht nötig, denn die Aufenthaltserlaubnis zum Familiennachzug ist kein ausgeschlossener Titel. Wer beides anstrebt, kann die Niederlassungserlaubnis überspringen; Vergleich unter ${h.a('niederlassungserlaubnis', 'Niederlassungserlaubnis')}.</p>
<h2>Eingetragene Partnerschaft und Ehe im Ausland</h2>
<p>§ 9 nennt Ehegatten und eingetragene Lebenspartner ausdrücklich nebeneinander; für gleichgeschlechtliche Paare gelten dieselben Fristen. Wurde die Ehe im Ausland geschlossen, muss sie in Deutschland wirksam sein. In der Regel genügt die ausländische Heiratsurkunde mit Übersetzung und, je nach Herkunftsstaat, einer Legalisation oder Apostille; bei Zweifeln prüft das Standesamt die Anerkennung.</p>
<p>Die Behörde prüft bei § 9, ob die Ehe tatsächlich geführt wird. Eine gemeinsame Meldeadresse und gemeinsame Unterlagen helfen. Kinder aus der Ehe sind oft schon mit der Geburt deutsch; mehr unter ${h.a('kinder', 'Einbürgerung von Kindern')}.</p>
`,
  },
  en: {
    slug: 'german-citizenship-spouse',
    nav: 'Spouses of Germans', card: `${E.ehegatteJahre} years’ residence and ${E.eheJahre} years’ marriage instead of ${E.jahre}`,
    title: 'Citizenship for Spouses in Germany 2026: Apply After 3 Years',
    description: `German citizenship through marriage 2026: with a German spouse after ${E.ehegatteJahre} years’ residence and ${E.eheJahre} years’ marriage, joint naturalisation, and a date calculator.`,
    h1: 'German citizenship for spouses and partners',
    intro: `With a German spouse, ${E.ehegatteJahre} years of residence are enough once you have been married for ${E.eheJahre} years. The calculator takes the later of the two dates.`,
    resume: `If you are married to a German or in a registered partnership with one, section 9 of the Nationality Act says you should be naturalised after only ${E.ehegatteJahre} years of lawful habitual residence, provided the marriage has lasted at least ${E.eheJahre} years. Both periods must be met at the same time, so the later date counts. Once the marriage has lasted ${E.eheJahreVerkuerzt} years, the residence period can be shortened further in the public interest. All the other section 10 conditions still apply: German at level ${E.sprache}, the citizenship test, a livelihood without basic income support, no significant conviction and the commitment to the basic order. If your partner is not German but is naturalising, section 10(2) lets you be naturalised together, even without your own ${E.jahre} years. Someone who arrived in September 2021 and married a German in June 2025 reaches the goal sooner under section 10 than under section 9; the calculator picks the faster route by itself.`,
    faqs: [
      { q: 'Does time before the wedding count towards the three years?', a: `Yes. The ${E.ehegatteJahre} years refer to any lawful habitual residence, not just your time as a spouse. If you have lived here for two years on a work permit and then marry, you need one more year of residence but two full years of marriage. The date on which both are met is your earliest month to apply.` },
      { q: 'What happens if the German spouse dies or we divorce?', a: 'Under section 9(2) StAG the shorter route stays open if you apply within a year of the death or of the divorce becoming final, and you have custody of a minor German child from that marriage and live with the child. Without a shared child, the general five-year period applies again after a separation.' },
      { q: 'Do spouses also have to pass the citizenship test?', a: `Yes. Section 9 refers to the conditions of section 10(1), which include knowledge of the legal and social order, normally proven by the citizenship test. German at level ${E.sprache} is also required. Only people who cannot provide these proofs because of illness, disability or age are exempt.` },
    ],
    body: (h) => `
<h2>Two routes for couples</h2>
<p>The law distinguishes between a partner who is already German and one who is naturalising. In the first case ${h.src('stag9', 'section 9 StAG')} applies, with shorter periods. In the second, ${h.src('stag10', 'section 10(2) StAG')} allows joint naturalisation: the spouse and minor children can be naturalised with the applicant even if they have not yet lived here for ${h.n(E.jahre)} years. The minimum the authorities then expect is set by administrative guidelines and local practice; ask before filing the joint application.</p>
${h.table(['Situation', 'Residence', 'Marriage', 'Legal basis'], [
  ['Married to a German', `${h.n(E.ehegatteJahre)} years`, `${h.n(E.eheJahre)} years`, 'Section 9(1) StAG'],
  ['As above, longer marriage', 'can be shorter', `${h.n(E.eheJahreVerkuerzt)} years`, 'Section 9(1) StAG, public interest'],
  ['Partner naturalising', 'no minimum of your own in the Act', 'none', 'Section 10(2) StAG'],
  ['General route', `${h.n(E.jahre)} years`, 'none', 'Section 10(1) StAG'],
], 'Periods for spouses and registered partners.', ['l', 'l', 'l', 'l'])}
<h2>Three couples, run through the calculator</h2>
<p>All three have B1, the test and their own income. The calculator checks both routes and returns the earlier one.</p>
${h.table(['Case', 'In Germany since', 'Married', 'Route', 'Period met from'], rows(h), 'Earliest month from which the residence period is met.', ['l', 'l', 'l', 'l', 'l'])}
<p>Case A married before arriving, so the three years of residence decide. Case B married after arriving, and the two years of marriage run longer than the three years of residence. Case C has lived here a long time: the five years under section 10 are met before the marriage is two years old.</p>
${h.mini('einb', { p: ['ehe', 'jahr', 'ehejahr'], d: { ehe: 'ja', jahr: 2023, ehejahr: 2024 }, t: 'Your month to apply as a spouse' })}
<h2>Your residence permit until then</h2>
<p>Until you naturalise, you live here on a family reunification permit. Under ${h.src('aufenthg28', 'section 28 of the Residence Act')} you normally get a settlement permit after ${h.n(N.ehegatteDeutschJahre)} years if the family unit continues and you have German at B1. You do not need it to naturalise, since the family permit is not an excluded title. If you are aiming for citizenship anyway, you can skip the settlement permit; compare on ${h.a('niederlassungserlaubnis', 'settlement permit')}.</p>
<h2>Registered partnerships and marriages abroad</h2>
<p>Section 9 names spouses and registered partners side by side, and the same periods apply to same-sex couples. A marriage concluded abroad must be valid in Germany. Usually the foreign marriage certificate with a translation and, depending on the country, a legalisation or apostille is enough; if in doubt, the registry office checks recognition.</p>
<p>Under section 9 the authority checks that the marriage is genuine; a shared registered address and joint paperwork help. Children of the marriage are often German from birth; see ${h.a('kinder', 'citizenship for children')}.</p>
`,
  },
});
