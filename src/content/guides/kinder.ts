import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Enfants : § 4 Abs. 1 et 3 StAG (naissance), § 10 Abs. 1 Satz 2, Abs. 2 et Abs. 4 (naturalisation), § 38 (51 €). */
const E = K.P.einb, G = K.P.gebuehr;

export default defineGuide({
  id: 'kinder', group: 'einb', order: 80,
  tool: 'kosten', toolArg: { erw: 1, kind: 2, test: 1 },
  related: ['ehepartner', 'kosten', 'doppelte-staatsbuergerschaft', 'staatsangehoerigkeitsausweis'],
  sources: ['stag4', 'stag10', 'stag38'],
  de: {
    slug: 'einbuergerung-kinder',
    nav: 'Kinder', card: `Geburt in Deutschland, Miteinbürgerung für ${G.kind} €, kein Test unter 16`,
    title: 'Einbürgerung Kinder 2026: Geburt, Miteinbürgerung, Kosten',
    description: `Einbürgerung von Kindern 2026: deutsch durch Geburt in Deutschland, Miteinbürgerung mit den Eltern für ${G.kind} €, kein Test unter 16 Jahren, Rechner für die Familie.`,
    h1: 'Wie Kinder deutsch werden',
    intro: `Viele Kinder sind schon mit der Geburt deutsch. Die anderen werden meist zusammen mit einem Elternteil eingebürgert, für ${G.kind} € statt ${G.einbuergerung} €.`,
    resume: `Ein Kind wird auf drei Wegen deutsch. Erstens durch Abstammung: Ist ein Elternteil bei der Geburt deutsch, ist es auch das Kind (§ 4 Abs. 1 StAG). Zweitens durch Geburt in Deutschland: Hat ein ausländischer Elternteil seit ${E.jahre} Jahren seinen rechtmäßigen gewöhnlichen Aufenthalt hier und ein unbefristetes Aufenthaltsrecht, wird das Kind mit der Geburt deutsch (§ 4 Abs. 3); das Standesamt trägt das im Geburtenregister ein. Drittens durch Miteinbürgerung: Minderjährige Kinder können nach § 10 Abs. 2 zusammen mit einem Elternteil eingebürgert werden, auch ohne eigene ${E.jahre} Jahre Aufenthalt. Kinder unter 16 Jahren brauchen keinen Einbürgerungstest und kein B1-Zertifikat; bei ihnen genügt eine altersgemäße Sprachentwicklung. Die Gebühr beträgt ${G.kind} € für ein Kind ohne eigenes Einkommen, das mit einem Elternteil eingebürgert wird; sonst ${G.einbuergerung} €. In allen drei Fällen dürfen die Kinder eine weitere Staatsangehörigkeit behalten, soweit das andere Land es zulässt.`,
    faqs: [
      { q: 'Ist mein in Deutschland geborenes Kind automatisch deutsch?', a: `Nur unter Bedingungen. Ist ein Elternteil deutsch, ja. Sind beide Eltern ausländisch, muss mindestens einer bei der Geburt seit ${E.jahre} Jahren rechtmäßig hier leben und ein unbefristetes Aufenthaltsrecht haben, etwa eine Niederlassungserlaubnis. Das Standesamt prüft das bei der Beurkundung der Geburt. Fehlt eine Bedingung, kann das Kind später mit den Eltern eingebürgert werden.` },
      { q: 'Ab welchem Alter braucht ein Kind den Einbürgerungstest?', a: 'Ab 16 Jahren. Für Jüngere gelten die Bedingungen des Bekenntnisses und der Kenntnisse der Rechts- und Gesellschaftsordnung nicht, weil sie nach dem Gesetz noch nicht selbst handlungsfähig sind. Ein Kind, das in Deutschland zur Schule geht, kann den Test oft durch einen Schulabschluss ersetzen; ob das gilt, entscheidet die Behörde im Einzelfall.' },
      { q: 'Kann ein Jugendlicher den Antrag selbst stellen?', a: 'Ab 16 Jahren können Jugendliche den Antrag selbst stellen und unterschreiben. Jüngere Kinder vertreten die Eltern oder der Vormund. Wer volljährig wird, während das Verfahren läuft, muss alle Bedingungen eines Erwachsenen erfüllen; stellen Sie den gemeinsamen Antrag deshalb rechtzeitig, wenn ein Kind kurz vor dem 18. Geburtstag steht.' },
    ],
    body: (h) => `
<h2>Die drei Wege im Vergleich</h2>
${h.table(['Weg', 'Bedingung', 'Gebühr', 'Rechtsgrundlage'], [
  ['Abstammung', 'Ein Elternteil ist bei der Geburt deutsch', 'keine', '§ 4 Abs. 1 StAG'],
  ['Geburt in Deutschland', `Ein Elternteil: ${h.n(E.jahre)} Jahre Aufenthalt und unbefristetes Aufenthaltsrecht`, 'keine', '§ 4 Abs. 3 StAG'],
  ['Miteinbürgerung', 'Minderjährig, mit einem Elternteil', `${h.eur(G.kind)} ohne eigenes Einkommen`, '§ 10 Abs. 2, § 38 StAG'],
  ['Eigener Antrag', 'Die Bedingungen des § 10 selbst erfüllen', h.eur(G.einbuergerung), '§ 10 Abs. 1 StAG'],
], 'Wie ein minderjähriges Kind die deutsche Staatsangehörigkeit erwirbt.', ['l', 'l', 'r', 'l'])}
<h2>Geburt in Deutschland: was das Standesamt prüft</h2>
<p>Der Erwerb durch Geburt nach ${h.src('stag4', '§ 4 Abs. 3 StAG')} geschieht kraft Gesetzes, ohne Antrag und ohne Gebühr. Das Standesamt, das die Geburt beurkundet, prüft den Aufenthalt der Eltern und trägt den Erwerb ein. Entscheidend ist der Stand am Tag der Geburt: Bekommt der Elternteil die Niederlassungserlaubnis erst ein paar Wochen später, reicht das nicht. Die Frist beträgt seit der Reform ${h.n(E.jahre)} statt acht Jahre, und die frühere Optionspflicht ist aufgehoben.</p>
<p>Wer nicht sicher ist, ob das Kind deutsch ist, etwa weil die Unterlagen der Eltern lückenhaft sind, kann das mit einem ${h.a('staatsangehoerigkeitsausweis', 'Staatsangehörigkeitsausweis')} verbindlich feststellen lassen.</p>
<h2>Miteinbürgerung: was Kinder brauchen</h2>
<p>Kinder unter 16 müssen weder das Bekenntnis abgeben noch den Test machen (${h.src('stag10', '§ 10 Abs. 1 Satz 2 StAG')}). Für die Sprache verlangt Absatz 4 bei ihnen eine altersgemäße Sprachentwicklung, die meist durch Kita- oder Schulberichte belegt wird. Jugendliche ab 16 werden dagegen wie Erwachsene behandelt: Test, Bekenntnis und Deutsch auf Niveau ${E.sprache}. Ein Schulzeugnis kann hier vieles ersetzen.</p>
<p>Die ermäßigte Gebühr gilt nur bei gemeinsamer Einbürgerung und nur, wenn das Kind kein eigenes Einkommen hat. Der Rechner oben addiert die Gebühren für Ihre Familie; die Gebühr des Tests fällt nur für Personen ab 16 an.</p>
${h.mini('kosten', { p: ['erw', 'kind', 'test'], d: { erw: 2, kind: 3, test: 2 }, t: 'Gebühren mit Kindern' })}
<h2>Volljährige Kinder und Geburtstage im Verfahren</h2>
<p>Die Miteinbürgerung gilt nur für Minderjährige. Ein Kind, das schon 18 ist, stellt einen eigenen Antrag und muss alle Bedingungen selbst erfüllen: Aufenthalt, Sprache, Test und Lebensunterhalt, wobei Auszubildende und Studierende oft noch von den Eltern unterstützt werden dürfen. Wird ein Kind während des Verfahrens 16, kommen Bekenntnis und Test hinzu; die Behörde sagt dann, welche Nachweise sie nachfordert.</p>
<p>Lebt die Familie noch nicht lange genug hier, lohnt sich ein Blick auf den frühesten Antragsmonat der Eltern unter ${h.a('voraussetzungen', 'Einbürgerung: Voraussetzungen')}; der Antrag der Kinder hängt an diesem Termin.</p>
`,
  },
  en: {
    slug: 'german-citizenship-children',
    nav: 'Children', card: `Birth in Germany, joint naturalisation for €${G.kind}, no test under 16`,
    title: 'Citizenship for Children in Germany 2026: Birth and Fees',
    description: `German citizenship for children in 2026: birth in Germany, joint naturalisation with a parent for €${G.kind}, no citizenship test under 16, and a family fee tool.`,
    h1: 'How children become German',
    intro: `Many children are German from birth. Most others are naturalised together with a parent, for €${G.kind} instead of €${G.einbuergerung}.`,
    resume: `A child becomes German in one of three ways. First by descent: if a parent is German at the time of birth, so is the child (section 4(1) StAG). Second by birth in Germany: if a foreign parent has lived here lawfully for ${E.jahre} years and holds a permanent right of residence, the child is German from birth (section 4(3)), and the registry office records it in the birth register. Third by joint naturalisation: minor children can be naturalised with a parent under section 10(2), even without ${E.jahre} years of residence of their own. Children under 16 need neither the citizenship test nor a B1 certificate; age-appropriate language development is enough. The fee is €${G.kind} for a child without income naturalised with a parent, otherwise €${G.einbuergerung}. In all three cases children may keep another nationality, as far as the other country allows.`,
    faqs: [
      { q: 'Is my child born in Germany automatically German?', a: `Only under conditions. If a parent is German, yes. If both parents are foreign, at least one must have lived here lawfully for ${E.jahre} years at the time of the birth and hold a permanent right of residence, such as a settlement permit. The registry office checks this when it registers the birth. If a condition is missing, the child can later naturalise with the parents.` },
      { q: 'From what age does a child need the citizenship test?', a: 'From 16. For younger children, the commitment and the knowledge of the legal and social order do not apply, because the law does not yet treat them as able to act for themselves. A child at school in Germany can often replace the test with a school certificate; the authority decides case by case.' },
      { q: 'Can a teenager apply on their own?', a: 'From 16, young people can file and sign the application themselves. Parents or a guardian act for younger children. A child who turns 18 while the procedure is running must meet all adult requirements, so file the joint application in good time when a child is close to their eighteenth birthday.' },
    ],
    body: (h) => `
<h2>The three routes compared</h2>
${h.table(['Route', 'Condition', 'Fee', 'Legal basis'], [
  ['Descent', 'A parent is German at birth', 'none', 'Section 4(1) StAG'],
  ['Birth in Germany', `A parent: ${h.n(E.jahre)} years’ residence and permanent right of residence`, 'none', 'Section 4(3) StAG'],
  ['Joint naturalisation', 'Minor, with a parent', `${h.eur(G.kind)} without own income`, 'Sections 10(2) and 38 StAG'],
  ['Own application', 'Meets section 10 conditions personally', h.eur(G.einbuergerung), 'Section 10(1) StAG'],
], 'How a minor acquires German nationality.', ['l', 'l', 'r', 'l'])}
<h2>Birth in Germany: what the registry office checks</h2>
<p>Acquisition by birth under ${h.src('stag4', 'section 4(3) StAG')} happens by law, with no application and no fee. The registry office that records the birth checks the parents’ residence and enters the acquisition. What counts is the situation on the day of birth: if the parent only receives the settlement permit a few weeks later, that is too late. Since the reform the period is ${h.n(E.jahre)} years instead of eight, and the former duty to choose a nationality has been abolished.</p>
<p>If you are not sure whether your child is German, for example because the parents’ records are incomplete, you can have it established bindingly with a ${h.a('staatsangehoerigkeitsausweis', 'certificate of nationality')}.</p>
<h2>Joint naturalisation: what children need</h2>
<p>Children under 16 neither sign the commitment nor take the test (${h.src('stag10', 'section 10(1), second sentence, StAG')}). For language, subsection 4 requires age-appropriate development, usually shown through nursery or school reports. Young people from 16 are treated like adults: test, commitment and German at level ${E.sprache}, although a school certificate can replace a lot.</p>
<p>The reduced fee only applies to joint naturalisation and only if the child has no income of its own. The calculator above adds up the fees for your family; the test fee only applies to people aged 16 or over.</p>
${h.mini('kosten', { p: ['erw', 'kind', 'test'], d: { erw: 2, kind: 3, test: 2 }, t: 'Fees with children' })}
<h2>Adult children and birthdays during the procedure</h2>
<p>Joint naturalisation only covers minors. A child who is already 18 files their own application and must meet every condition personally: residence, language, test and livelihood, although trainees and students may often still be supported by their parents. If a child turns 16 during the procedure, the commitment and the test are added; the authority will tell you which proofs it needs.</p>
<p>If the family has not been here long enough yet, check the parents’ earliest month to apply on ${h.a('voraussetzungen', 'German citizenship requirements')}; the children’s application depends on that date.</p>
`,
  },
});
