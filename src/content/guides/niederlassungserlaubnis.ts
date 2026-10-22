import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Niederlassungserlaubnis : § 9, § 18c, § 26 Abs. 3, § 28 Abs. 2 AufenthG ; frais § 44 AufenthV. Durées et cotisations par voie, du moteur. */
const N = K.P.ne, E = K.P.einb;
const WEGE = (['allgemein', 'fachkraft', 'fachkraftInland', 'blau', 'schutz', 'ehegatte'] as const).map((w) => ({ w, r: K.niederlassung({ weg: w, monateTitel: 0, monateBeitraege: 0, deutsch: w === 'schutz' ? 'a2' : 'b1' }) }));
const LAB: Record<string, [string, string, string]> = {
  allgemein: ['Allgemeiner Weg', 'General route', '§ 9'],
  fachkraft: ['Fachkraft', 'Skilled worker', '§ 18c Abs. 1'],
  fachkraftInland: ['Fachkraft mit deutschem Abschluss', 'Skilled worker with a German qualification', '§ 18c Abs. 1'],
  blau: ['Blaue Karte EU, mit B1', 'EU Blue Card, with B1', '§ 18c Abs. 2'],
  schutz: ['Asyl- oder Flüchtlingsschutz', 'Asylum or refugee status', '§ 26 Abs. 3'],
  ehegatte: ['Ehegatte einer oder eines Deutschen', 'Spouse of a German', '§ 28 Abs. 2'],
};
const rows = (h: Helpers) => WEGE.map(({ w, r }) => [h.lang === 'de' ? LAB[w][0] : LAB[w][1], h.n(r.monateNoetig), r.beitraegeNoetig ? h.n(r.beitraegeNoetig) : (h.lang === 'de' ? 'keine feste Zahl' : 'no fixed number'), r.sprache.toUpperCase(), LAB[w][2]]);
const ex = K.niederlassung({ weg: 'allgemein', monateTitel: 50, monateBeitraege: 44, deutsch: 'b1' });

export default defineGuide({
  id: 'niederlassungserlaubnis', group: 'aufenthalt', order: 110,
  tool: 'ne',
  related: ['blaue-karte', 'voraussetzungen', 'ehepartner', 'sprachnachweis'],
  sources: ['aufenthg9', 'aufenthg18c', 'aufenthg26', 'aufenthg28', 'aufenthv44', 'aufenthg78', 'stag10'],
  de: {
    slug: 'niederlassungserlaubnis',
    nav: 'Niederlassungserlaubnis', card: 'Fristen je Weg, Rentenbeiträge, Vergleich mit der Einbürgerung',
    title: 'Niederlassungserlaubnis 2026: Voraussetzungen und Antrag',
    description: 'Niederlassungserlaubnis 2026: Fristen und Rentenbeiträge für Fachkräfte, Blaue Karte, Flüchtlinge und Ehegatten, Gebühr, und ob Sie sie vor dem Pass brauchen.',
    h1: 'Unbefristete Niederlassungserlaubnis beantragen: Bedeutung, Verlängerung',
    intro: 'Weg wählen, Monate mit Titel und mit Rentenbeiträgen eingeben: Der Rechner zeigt, was bis zum unbefristeten Aufenthalt fehlt.',
    resume: `Die Niederlassungserlaubnis ist der unbefristete Aufenthaltstitel des deutschen Rechts. Auf dem allgemeinen Weg nach § 9 AufenthG verlangt sie ${N.jahre} Jahre Aufenthaltserlaubnis, ${N.beitraege} Monate Pflichtbeiträge zur Rentenversicherung, Deutsch auf Niveau B1, Grundkenntnisse der Rechts- und Gesellschaftsordnung und einen gesicherten Lebensunterhalt. Schneller geht es für Fachkräfte nach § 18c: ${N.fachkraftJahre} Jahre und ${N.fachkraftBeitraege} Beitragsmonate, mit deutschem Abschluss ${N.fachkraftInlandJahre} Jahre und ${N.fachkraftInlandBeitraege} Monate. Inhaber der Blauen Karte EU brauchen ${N.blauMonate} Monate mit A1 oder ${N.blauMonateB1} Monate mit B1. Anerkannte Flüchtlinge erhalten sie nach § 26 Abs. 3 nach ${N.schutzJahre} Jahren mit A2 oder nach ${N.schutzJahreC1} Jahren mit C1, Ehegatten von Deutschen nach § 28 nach ${N.ehegatteDeutschJahre} Jahren. Die Gebühr liegt nach § 44 AufenthV zwischen ${N.gebuehrSonst} € und ${N.gebuehrHq} €. Für die Einbürgerung ist sie nicht nötig: Nach ${E.jahre} Jahren reicht meist auch eine befristete Erlaubnis.`,
    faqs: [
      { q: 'Brauche ich eine Niederlassungserlaubnis, bevor ich mich einbürgern lasse?', a: 'Nein. § 10 StAG verlangt ein unbefristetes Aufenthaltsrecht oder eine Aufenthaltserlaubnis, die nicht auf der Ausschlussliste steht. Eine Erlaubnis für Arbeit, eine Blaue Karte oder eine Erlaubnis zum Familiennachzug reichen. Wer ohnehin die Einbürgerung anstrebt und die fünf Jahre bald erfüllt, kann die Niederlassungserlaubnis überspringen und Zeit und Gebühren sparen.' },
      { q: 'Zählen Monate mit Minijob als Rentenbeiträge?', a: 'Nur wenn Pflichtbeiträge gezahlt wurden. Bei einem Minijob sind Sie grundsätzlich rentenversicherungspflichtig, können sich aber befreien lassen; dann fehlen die Monate. Zeiten der Kindererziehung oder Pflege können nach dem Gesetz ebenfalls zählen. Ihren Versicherungsverlauf erhalten Sie kostenlos bei der Deutschen Rentenversicherung; er zeigt jeden Beitragsmonat.' },
      { q: 'Wie viel kostet die Niederlassungserlaubnis?', a: `Nach § 44 der Aufenthaltsverordnung ${N.gebuehrHq} € für Hochqualifizierte, ${N.gebuehrSelbst} € für Selbstständige und ${N.gebuehrSonst} € in den übrigen Fällen. Die Verordnung sieht für einige Gruppen Befreiungen oder Ermäßigungen vor, die Ausländerbehörde prüft das im Einzelfall. Fragen Sie bei der Antragstellung danach und legen Sie Nachweise über Ihre Lage gleich bei.` },
      { q: 'Muss ich die Niederlassungserlaubnis verlängern?', a: 'Den Titel selbst nicht, denn er ist unbefristet. Erneuern müssen Sie nur die Karte des elektronischen Aufenthaltstitels, wenn deren Gültigkeit endet oder wenn Sie einen neuen Pass bekommen. Die neue Karte beantragen Sie rechtzeitig bei der Ausländerbehörde; bringen Sie Pass und ein aktuelles biometrisches Foto mit. Verloren geht der Titel dagegen nach einem Auslandsaufenthalt von mehr als sechs Monaten ohne Erlaubnis.' },
    ],
    body: (h) => `
<h2>Die Fristen je Weg</h2>
<p>Die Tabelle zeigt, was der Rechner je Weg ansetzt. Daneben gelten überall weitere Bedingungen wie ein gesicherter Lebensunterhalt, ausreichender Wohnraum und keine Ausweisungsinteressen; die Einzelheiten stehen in ${h.src('aufenthg9', '§ 9 AufenthG')} und den besonderen Vorschriften.</p>
${h.table(['Weg', 'Monate mit Titel', 'Monate Rentenbeiträge', 'Deutsch', 'Vorschrift'], rows(h), 'Mindestzeiten für die Niederlassungserlaubnis, wie der Rechner sie ansetzt.', ['l', 'r', 'r', 'l', 'l'])}
<p>Bei Fachkräften nach ${h.src('aufenthg18c', '§ 18c AufenthG')} zählt die Zeit mit einem Titel als Fachkraft; wer einen deutschen Hochschulabschluss oder eine deutsche Berufsausbildung hat, kommt nach zwei Jahren ans Ziel. Für Schutzberechtigte nach ${h.src('aufenthg26', '§ 26 Abs. 3')} wird die Zeit des Asylverfahrens angerechnet, und der Lebensunterhalt muss beim Fünfjahresweg nur überwiegend, beim Dreijahresweg weitgehend gesichert sein. Für Ehegatten von Deutschen nach ${h.src('aufenthg28', '§ 28 Abs. 2')} kommt es auf die fortbestehende familiäre Gemeinschaft an.</p>
<h2>Ein Beispiel</h2>
<p>Eine Arbeitnehmerin ohne besonderen Fachkräftetitel hat ${h.n(50)} Monate eine Aufenthaltserlaubnis und ${h.n(44)} Beitragsmonate. Auf dem allgemeinen Weg fehlen ihr ${h.n(ex.fehlenMonate)} Monate Aufenthalt und ${h.n(ex.fehlenBeitraege)} Beitragsmonate. Sie wird deshalb frühestens in ${h.n(Math.max(ex.fehlenMonate, ex.fehlenBeitraege))} Monaten antragsberechtigt, wenn sie durchgehend arbeitet. Zu diesem Zeitpunkt hat sie auch die ${h.n(E.jahre)} Jahre für die Einbürgerung erreicht; ob die Niederlassungserlaubnis dann noch lohnt, hängt davon ab, ob sie deutsch werden möchte.</p>
${h.mini('ne', { p: ['weg', 'mt', 'mb'], d: { mt: 30, mb: 30 }, t: 'Ihre Monate bis zur Niederlassungserlaubnis' })}
<h2>Niederlassungserlaubnis oder gleich Einbürgerung?</h2>
<p>Beides ist unbefristet, aber nur die Einbürgerung bringt Wahlrecht, einen deutschen Pass und Schutz vor Ausweisung. Die Niederlassungserlaubnis erlischt, wenn Sie länger als sechs Monate ins Ausland gehen, sofern die Behörde keine längere Frist erlaubt hat. Ihr Vorteil: Sie kommt für Fachkräfte und Blaue-Karte-Inhaber oft Jahre vor der Einbürgerung. Wer früher Sicherheit braucht, etwa für einen Kredit oder einen Arbeitgeberwechsel, nimmt sie mit; wer bald die ${h.n(E.jahre)} Jahre erfüllt, prüft lieber direkt die ${h.a('voraussetzungen', 'Voraussetzungen der Einbürgerung')}.</p>
<p>Die Gebühren nach ${h.src('aufenthv44', '§ 44 AufenthV')}: ${h.eur(N.gebuehrHq)} für Hochqualifizierte, ${h.eur(N.gebuehrSelbst)} für Selbstständige, ${h.eur(N.gebuehrSonst)} sonst. Zum Vergleich kostet die Einbürgerung ${h.eur(K.P.gebuehr.einbuergerung)}.</p>
<h2>Bedeutung, Antrag und Verlängerung der Karte</h2>
<p>Was die Niederlassungserlaubnis bedeutet, sagt ${h.src('aufenthg9', '§ 9 Abs. 1 AufenthG')} in einem Satz: Sie ist ein unbefristeter Aufenthaltstitel, und Nebenbestimmungen sind nur in den Fällen erlaubt, die das Gesetz ausdrücklich zulässt. Sie dürfen damit jede Arbeit aufnehmen und den Arbeitgeber wechseln, ohne die Ausländerbehörde zu fragen.</p>
<p>Den Antrag stellen Sie bei der Ausländerbehörde Ihres Wohnorts, je nach Stadt mit einem Formular, online oder bei einem Termin. Ein bundesweit einheitliches Antragsformular gibt es nicht. Fast überall verlangt werden der Pass, ein biometrisches Foto, der Versicherungsverlauf der Rentenversicherung, Nachweise über Einkommen und Wohnung, das Sprachzertifikat und ein Nachweis der Grundkenntnisse. Für Letzteres reicht nach § 9 Abs. 2 Satz 2 ein erfolgreich abgeschlossener Integrationskurs, also bestandene Sprachprüfung und bestandener ${h.a('leben-in-deutschland', 'Test „Leben in Deutschland“')}.</p>
<p>Verlängern müssen Sie die Niederlassungserlaubnis selbst nie. Verlängert wird nur die Karte, auf der sie steht: Der elektronische Aufenthaltstitel trägt nach ${h.src('aufenthg78', '§ 78 AufenthG')} eine Gültigkeitsdauer, bei unbefristeten Titeln die technische Nutzungsdauer der Karte. Läuft sie ab oder bekommen Sie einen neuen Pass, beantragen Sie bei der Ausländerbehörde eine neue Karte; Ihr Recht zu bleiben ändert sich dadurch nicht.</p>
`,
  },
  en: {
    slug: 'german-settlement-permit',
    nav: 'Settlement permit', card: 'Periods by route, pension months, compared with citizenship',
    title: 'Settlement Permit Germany 2026: Periods by Route, Calculator',
    description: 'German settlement permit 2026: periods and pension months for skilled workers, Blue Card holders, refugees and spouses, the fees, and if you need it first.',
    h1: 'Settlement permit: when you can get it',
    intro: 'Choose your route and enter your months on a permit and of pension contributions: the calculator shows what is left until permanent residence.',
    resume: `The settlement permit (Niederlassungserlaubnis) is Germany’s permanent residence title. On the general route under section 9 of the Residence Act it requires ${N.jahre} years on a residence permit, ${N.beitraege} months of compulsory pension contributions, German at B1, basic knowledge of the legal and social order and a secure livelihood. Skilled workers get there faster under section 18c: ${N.fachkraftJahre} years and ${N.fachkraftBeitraege} contribution months, or ${N.fachkraftInlandJahre} years and ${N.fachkraftInlandBeitraege} months with a German qualification. EU Blue Card holders need ${N.blauMonate} months with A1 German or ${N.blauMonateB1} months with B1. Recognised refugees receive it under section 26(3) after ${N.schutzJahre} years with A2 or ${N.schutzJahreC1} years with C1, spouses of Germans under section 28 after ${N.ehegatteDeutschJahre} years. The fee under section 44 of the Residence Ordinance is between €${N.gebuehrSonst} and €${N.gebuehrHq}. You do not need it to naturalise: after ${E.jahre} years a temporary permit is usually enough.`,
    faqs: [
      { q: 'Do I need a settlement permit before applying for citizenship?', a: 'No. Section 10 StAG requires either a permanent right of residence or a residence permit not on the excluded list. A work permit, a Blue Card or a family permit is enough. If you are aiming for citizenship anyway and will soon reach five years, you can skip the settlement permit and save both time and fees.' },
      { q: 'Do mini-job months count as pension contributions?', a: 'Only if compulsory contributions were paid. A mini-job is in principle subject to pension insurance, but you can opt out, and then the months are missing. Periods of child-raising or caring can also count under the law. The German Pension Insurance sends your insurance record free of charge; it lists every contribution month.' },
      { q: 'How much does the settlement permit cost?', a: `Under section 44 of the Residence Ordinance, €${N.gebuehrHq} for highly qualified people, €${N.gebuehrSelbst} for the self-employed and €${N.gebuehrSonst} in other cases. The ordinance provides exemptions or reductions for some groups, which the foreigners’ authority checks case by case. Ask when you apply and include proof of your situation straight away.` },
      { q: 'Do I have to renew my settlement permit?', a: 'Not the title itself, because it is permanent. You only renew the electronic residence card when its validity ends or when you get a new passport. Apply for the new card at the foreigners’ authority in good time, bringing your passport and a recent biometric photo. The title is lost, however, if you stay abroad for more than six months without permission.' },
    ],
    body: (h) => `
<h2>Periods by route</h2>
<p>The table shows what the calculator applies for each route. Further conditions apply everywhere, such as a secure livelihood, adequate housing and no grounds for expulsion; the details are in ${h.src('aufenthg9', 'section 9 of the Residence Act')} and the specific provisions.</p>
${h.table(['Route', 'Months on permit', 'Pension months', 'German', 'Provision'], rows(h), 'Minimum periods for the settlement permit, as the calculator applies them.', ['l', 'r', 'r', 'l', 'l'])}
<p>For skilled workers under ${h.src('aufenthg18c', 'section 18c')}, time on a skilled-worker title counts; with a German degree or vocational qualification you get there after two years. For protected persons under ${h.src('aufenthg26', 'section 26(3)')}, time in the asylum procedure is credited, and the livelihood only has to be mostly secured on the five-year route and very largely secured on the three-year route. For spouses of Germans under ${h.src('aufenthg28', 'section 28(2)')}, the family unit must continue.</p>
<h2>An example</h2>
<p>An employee without a specific skilled-worker title has held a residence permit for ${h.n(50)} months and has ${h.n(44)} contribution months. On the general route she is ${h.n(ex.fehlenMonate)} months of residence and ${h.n(ex.fehlenBeitraege)} contribution months short, so she can apply in ${h.n(Math.max(ex.fehlenMonate, ex.fehlenBeitraege))} months at the earliest if she keeps working. By then she will also have the ${h.n(E.jahre)} years for citizenship; whether the settlement permit is still worth it depends on whether she wants to become German.</p>
${h.mini('ne', { p: ['weg', 'mt', 'mb'], d: { mt: 30, mb: 30 }, t: 'Your months to a settlement permit' })}
<h2>Settlement permit or straight to citizenship?</h2>
<p>Both are permanent, but only citizenship brings the vote, a German passport and protection from expulsion. A settlement permit lapses if you leave Germany for more than six months unless the authority has allowed longer. Its advantage is timing: for skilled workers and Blue Card holders it often comes years before citizenship. If you need certainty sooner, for a loan or a change of employer, take it; if you will soon reach ${h.n(E.jahre)} years, check the ${h.a('voraussetzungen', 'citizenship requirements')} directly.</p>
<p>Fees under ${h.src('aufenthv44', 'section 44 of the Residence Ordinance')}: ${h.eur(N.gebuehrHq)} for highly qualified people, ${h.eur(N.gebuehrSelbst)} for the self-employed, ${h.eur(N.gebuehrSonst)} otherwise. Naturalisation costs ${h.eur(K.P.gebuehr.einbuergerung)} by comparison.</p>
<h2>What it means, applying and renewing the card</h2>
<p>${h.src('aufenthg9', 'Section 9(1) of the Residence Act')} defines it in one sentence: the settlement permit is a permanent residence title, and conditions may only be attached where the Act expressly allows them. You can take any job and change employer without asking the foreigners’ authority.</p>
<p>You apply to the foreigners’ authority where you live, using a form, an online service or an appointment depending on the city. There is no single national application form. Almost everywhere you need your passport, a biometric photo, your pension insurance record, proof of income and housing, the language certificate and proof of basic knowledge. For the last point, section 9(2) says a successfully completed integration course is enough, meaning a passed language exam and a passed ${h.a('leben-in-deutschland', 'Leben in Deutschland test')}.</p>
<p>You never renew the settlement permit itself. Only the card it is printed on is renewed: under ${h.src('aufenthg78', 'section 78 of the Residence Act')} the electronic residence card shows a period of validity, for permanent titles the technical life of the card. When it expires, or when you get a new passport, ask the authority for a new card; your right to stay does not change.</p>
`,
  },
});
