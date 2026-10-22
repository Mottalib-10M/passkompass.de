import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Démarche : qui, où, quelles pièces. Délais de traitement : aucune statistique officielle uniforme, donc non chiffrés. */
const E = K.P.einb, G = K.P.gebuehr;

export default defineGuide({
  id: 'beantragen', group: 'einb', order: 50,
  tool: 'einb', toolArg: { test: 'ja' },
  related: ['voraussetzungen', 'kosten', 'land-be', 'staatsangehoerigkeitsausweis'],
  sources: ['stag10', 'stag38', 'berlin-lea'],
  de: {
    slug: 'einbuergerung-beantragen',
    nav: 'Antrag stellen', card: 'Zuständige Behörde, Unterlagen, Ablauf bis zur Urkunde',
    title: 'Einbürgerung beantragen 2026: Unterlagen und Ablauf',
    description: 'Einbürgerung beantragen 2026: welche Behörde zuständig ist, welche Unterlagen Sie brauchen, wie der Antrag geprüft wird und wann Sie die Urkunde erhalten.',
    h1: 'Einbürgerung beantragen: so läuft es ab',
    intro: 'Erst prüfen, ob die Frist erfüllt ist; dann Unterlagen sammeln und den Antrag bei der Staatsangehörigkeitsbehörde Ihres Wohnorts stellen.',
    resume: `Den Antrag auf Einbürgerung stellen Sie bei der Staatsangehörigkeitsbehörde Ihres Wohnorts, je nach Bundesland beim Landratsamt, bei der Kreisverwaltung, bei der Stadt oder, in Berlin, beim Landesamt für Einwanderung, das Anträge online annimmt. Eine Frist für die Entscheidung setzt das Gesetz nicht, und die Behörden veröffentlichen keine einheitlichen Bearbeitungszeiten; in großen Städten sind lange Wartezeiten bekannt. Deshalb lohnt es sich, den Antrag vollständig einzureichen, sobald die ${E.jahre} Jahre erreicht sind. Dazu gehören in der Regel der Antrag, ein gültiger Pass, Aufenthaltstitel, Geburts- und gegebenenfalls Heiratsurkunde mit Übersetzung, Nachweise über Einkommen und Wohnung, das Sprachzertifikat ${E.sprache} und die Bescheinigung über den Einbürgerungstest. Die Gebühr beträgt ${G.einbuergerung} € pro Person. Ist alles geprüft, unterschreiben Sie das Bekenntnis zur freiheitlichen demokratischen Grundordnung, und mit der Aushändigung der Einbürgerungsurkunde sind Sie Deutsche oder Deutscher.`,
    faqs: [
      { q: 'Kann ich den Einbürgerungsantrag schon vor Ablauf der fünf Jahre stellen?', a: 'Manche Behörden nehmen Anträge einige Monate vor Fristende an, weil die Bearbeitung ohnehin dauert; einen Anspruch darauf gibt es nicht. Maßgeblich ist, dass alle Voraussetzungen bei der Entscheidung erfüllt sind. Fragen Sie Ihre Behörde, ob sie einen frühen Antrag zulässt, und rechnen Sie den Monat, ab dem die Frist erfüllt ist, mit dem Rechner aus.' },
      { q: 'Ab wann bin ich nach der Einbürgerung deutsch?', a: 'Mit der Aushändigung der Einbürgerungsurkunde, nicht schon mit dem positiven Bescheid oder der Zahlung der Gebühr. Die Urkunde wird persönlich übergeben, oft im Rahmen einer kleinen Feier. Danach beantragen Sie beim Bürgeramt Personalausweis und Reisepass und geben Ihren alten Aufenthaltstitel bei der Ausländerbehörde ab.' },
      { q: 'Was passiert, wenn ich während des Verfahrens umziehe?', a: 'Zuständig ist die Behörde Ihres aktuellen Wohnorts. Nach einem Umzug in einen anderen Kreis oder ein anderes Land geht die Akte in der Regel an die neue Behörde über, was das Verfahren verlängern kann. Melden Sie den Umzug sofort beiden Behörden. Ein bestandener Einbürgerungstest bleibt gültig, auch wenn Sie die Fragen eines anderen Bundeslandes hatten.' },
      { q: 'Muss ich den Einbürgerungsantrag persönlich abgeben?', a: 'Das hängt von der Behörde ab. Berlin nimmt Anträge online an, viele Landratsämter verlangen ein Formular per Post oder einen Termin vor Ort. Spätestens zur Unterschrift unter das Bekenntnis und zur Übergabe der Urkunde müssen Sie persönlich erscheinen. Kopien von Urkunden sollten beglaubigt sein, sofern die Behörde nicht die Originale einsieht.' },
    ],
    body: (h) => `
<h2>Die Schritte bis zur Urkunde</h2>
<p>Das Verfahren ist in allen Ländern ähnlich, auch wenn Formulare und Wege verschieden sind. Die folgende Reihenfolge spart die meiste Zeit.</p>
${h.table(['Schritt', 'Was Sie tun', 'Hinweis'], [
  ['1. Frist prüfen', 'Monat ausrechnen, ab dem die Aufenthaltszeit erfüllt ist', 'Mit dem Rechner auf dieser Seite'],
  ['2. Nachweise besorgen', 'Sprachzertifikat und Einbürgerungstest', 'Beides kann vor Fristende erledigt werden'],
  ['3. Unterlagen sammeln', 'Urkunden, Übersetzungen, Einkommensnachweise', 'Liste unten'],
  ['4. Antrag stellen', 'Bei der Staatsangehörigkeitsbehörde', 'Online, per Post oder vor Ort'],
  ['5. Gebühr zahlen', `${h.eur(G.einbuergerung)} pro Person`, 'Zeitpunkt bestimmt die Behörde'],
  ['6. Prüfung', 'Behörde fragt bei Sicherheitsbehörden und Registern nach', 'Nachforderungen schnell beantworten'],
  ['7. Bekenntnis und Urkunde', 'Unterschrift, Aushändigung der Urkunde', 'Erst damit sind Sie deutsch'],
], 'Ablauf eines Einbürgerungsverfahrens.', ['l', 'l', 'l'])}
<h2>Welche Unterlagen fast überall verlangt werden</h2>
<p>Jede Behörde hat ihre eigene Liste, aber der Kern ist überall gleich. Sie brauchen den ausgefüllten Antrag, einen gültigen Pass oder ein anderes Identitätsdokument, den aktuellen Aufenthaltstitel, die Geburtsurkunde und, wenn Sie verheiratet sind, die Heiratsurkunde, jeweils mit Übersetzung. Für den Lebensunterhalt legen Sie Arbeitsvertrag, Lohnabrechnungen der letzten Monate und den Mietvertrag vor, Selbstständige den letzten Steuerbescheid. Dazu kommen das Zertifikat über Deutsch auf Niveau ${E.sprache} und die Bescheinigung über den Einbürgerungstest. Ein Führungszeugnis müssen Sie meist nicht selbst besorgen; die Behörde fragt das Bundeszentralregister an.</p>
<p>Fehlt Ihnen ein Dokument aus dem Herkunftsland, etwa weil es dort nicht ausgestellt wird, sprechen Sie das offen an. ${h.src('stag10', '§ 10 StAG')} verlangt eine geklärte Identität und Staatsangehörigkeit; wie die nachzuweisen ist, entscheidet die Behörde im Einzelfall.</p>
<h2>Warten und nachfragen</h2>
<p>Die Bearbeitungszeit hängt stark von der Behörde ab. ${h.src('berlin-lea', 'Das Landesamt für Einwanderung in Berlin')} weist selbst auf lange Wartezeiten hin. Einheitliche, amtliche Zahlen für ganz Deutschland gibt es nicht, deshalb nennen wir keine. Wer ohne zureichenden Grund keine Entscheidung erhält, kann nach § 75 der Verwaltungsgerichtsordnung frühestens drei Monate nach dem Antrag eine Untätigkeitsklage erheben; ob das sinnvoll ist, klären Sie besser mit einer Beratungsstelle oder einer Anwältin.</p>
<p>Planen Sie die Reihenfolge so, dass Test und Sprachnachweis fertig sind, wenn die Frist erreicht ist:</p>
${h.mini('einb', { p: ['titel', 'jahr', 'monat', 'deutsch'], c: 'Frist und offene Punkte prüfen' })}
<h2>Was Sie am Ende unterschreiben</h2>
<p>Vor der Aushändigung der Urkunde geben Sie zwei Erklärungen ab: das Bekenntnis zur freiheitlichen demokratischen Grundordnung des Grundgesetzes und das Bekenntnis zur besonderen historischen Verantwortung Deutschlands für das nationalsozialistische Unrecht, zum Schutz jüdischen Lebens und zum Verbot eines Angriffskrieges. Außerdem erklären Sie, keine Bestrebungen gegen diese Ordnung zu verfolgen oder sich von früheren abgewandt zu haben. Eine falsche Erklärung kann noch Jahre später zur Rücknahme der Einbürgerung führen.</p>
<p>Wer Ehepartner oder Kinder mit einbürgern lassen will, stellt die Anträge am besten gemeinsam; siehe ${h.a('ehepartner', 'Einbürgerung als Ehepartner')} und ${h.a('kinder', 'Einbürgerung von Kindern')}.</p>
`,
  },
  en: {
    slug: 'apply-for-german-citizenship',
    nav: 'How to apply', card: 'Which office, which documents, steps to the certificate',
    title: 'Applying for German Citizenship 2026: Documents and Steps',
    description: 'Applying for German citizenship in 2026: which office handles it, the documents you need, how the file is checked and when the naturalisation certificate comes.',
    h1: 'Applying for German citizenship, step by step',
    intro: 'First check that the residence period is met; then gather your documents and apply to the nationality authority where you live.',
    resume: `You apply for naturalisation to the nationality authority where you live: depending on the state, that is the district office (Landratsamt or Kreisverwaltung), the city administration or, in Berlin, the State Office for Immigration (LEA), which takes applications online. The law sets no deadline for a decision, and authorities publish no uniform processing times; long waits are well known in the big cities. It therefore pays to file a complete application as soon as you reach the ${E.jahre} years. It usually includes the form, a valid passport, your residence permit, your birth certificate and, if married, your marriage certificate with translations, proof of income and housing, the ${E.sprache} language certificate and the citizenship test certificate. The fee is €${G.einbuergerung} per person. Once everything has been checked, you sign the commitment to the free democratic basic order, and you become German when the naturalisation certificate is handed to you.`,
    faqs: [
      { q: 'Can I apply for German citizenship before the five years are up?', a: 'Some authorities accept applications a few months early because processing takes time anyway, but there is no right to this. What matters is that every requirement is met when the decision is made. Ask your authority whether it accepts early applications, and work out the month the residence period is met with the calculator.' },
      { q: 'When exactly do I become German?', a: 'When the naturalisation certificate is handed to you, not when the decision is made or the fee is paid. The certificate is handed over in person, often at a small ceremony. Afterwards you apply for an ID card and passport at the citizens’ office and return your residence permit to the foreigners’ authority.' },
      { q: 'What happens if I move during the procedure?', a: 'The authority where you currently live is responsible. After moving to another district or state, the file usually passes to the new authority, which can lengthen the procedure. Tell both authorities straight away. A citizenship test you have passed stays valid, even if you answered another state’s questions.' },
      { q: 'Do I have to hand in the application in person?', a: 'It depends on the authority. Berlin takes applications online; many district offices want a paper form by post or an appointment. You must appear in person at the latest to sign the commitment and to receive the certificate. Copies of documents should be certified unless the authority inspects the originals.' },
    ],
    body: (h) => `
<h2>The steps to the certificate</h2>
<p>The procedure is similar in every state, even if forms and channels differ. This order saves the most time.</p>
${h.table(['Step', 'What you do', 'Note'], [
  ['1. Check the date', 'Work out the month your residence period is met', 'Use the calculator on this page'],
  ['2. Get the proofs', 'Language certificate and citizenship test', 'Both can be done before the date'],
  ['3. Gather documents', 'Certificates, translations, proof of income', 'List below'],
  ['4. Apply', 'At the nationality authority', 'Online, by post or in person'],
  ['5. Pay the fee', `${h.eur(G.einbuergerung)} per person`, 'The authority sets the timing'],
  ['6. Review', 'Authority checks with security agencies and registers', 'Answer requests quickly'],
  ['7. Commitment and certificate', 'Sign, receive the certificate', 'Only then are you German'],
], 'How a naturalisation procedure runs.', ['l', 'l', 'l'])}
<h2>Documents almost every authority asks for</h2>
<p>Each authority has its own list, but the core is the same. You need the completed form, a valid passport or other identity document, your current residence permit, your birth certificate and, if married, your marriage certificate, each with a translation. For your livelihood you provide your employment contract, recent payslips and your tenancy agreement, or your latest tax assessment if self-employed. Add the German certificate at level ${E.sprache} and the citizenship test certificate. You usually do not need to obtain a police certificate yourself; the authority queries the Federal Central Register.</p>
<p>If a document from your country of origin is missing, for instance because it is not issued there, say so openly. ${h.src('stag10', 'Section 10 StAG')} requires your identity and nationality to be clarified; how you prove them is decided case by case.</p>
<h2>Waiting and following up</h2>
<p>Processing times depend heavily on the authority. ${h.src('berlin-lea', 'Berlin’s State Office for Immigration')} itself warns of long waits. There are no uniform official figures for Germany as a whole, so we do not quote any. If there is no decision without good reason, section 75 of the Administrative Court Procedure Code allows an action for failure to act, at the earliest three months after you applied; discuss with an advice centre or a lawyer whether that is wise.</p>
<p>Plan so that the test and the language certificate are done when the residence period is met:</p>
${h.mini('einb', { p: ['titel', 'jahr', 'monat', 'deutsch'], c: 'Check the date and open points' })}
<h2>What you sign at the end</h2>
<p>Before the certificate is handed over you make two declarations: a commitment to the free democratic basic order of the Basic Law, and a commitment to Germany’s particular historical responsibility for Nazi injustice, to protecting Jewish life and to the ban on wars of aggression. You also declare that you pursue no efforts against this order, or that you have turned away from earlier ones. A false declaration can lead to the naturalisation being withdrawn years later.</p>
<p>If your spouse or children are to naturalise with you, file together; see ${h.a('ehepartner', 'citizenship for spouses')} and ${h.a('kinder', 'citizenship for children')}.</p>
`,
  },
});
