import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Double nationalité : § 10 Abs. 1 Nr. 4, § 12, § 25 et § 29 StAG sont « weggefallen » (lu sur gesetze-im-internet.de). Le droit étranger n'est pas traité. */
const E = K.P.einb;

export default defineGuide({
  id: 'doppelte-staatsbuergerschaft', group: 'einb', order: 60,
  tool: 'einb',
  related: ['voraussetzungen', 'kinder', 'beantragen', 'staatsangehoerigkeitsausweis'],
  sources: ['stag10', 'stag12', 'stag25', 'stag29', 'stag4'],
  de: {
    slug: 'doppelte-staatsbuergerschaft',
    nav: 'Doppelte Staatsbürgerschaft', card: 'Alte Staatsangehörigkeit behalten: was das deutsche Recht sagt',
    title: 'Doppelte Staatsbürgerschaft 2026: was bei Einbürgerung gilt',
    description: 'Doppelte Staatsbürgerschaft 2026: Bei der Einbürgerung verlangt Deutschland nicht mehr die Aufgabe der alten Staatsangehörigkeit. Was das Herkunftsland regelt.',
    h1: 'Doppelte Staatsbürgerschaft nach der Reform',
    intro: 'Das deutsche Recht verlangt die Aufgabe der alten Staatsangehörigkeit nicht mehr. Ob Sie sie behalten, entscheidet Ihr Herkunftsland.',
    resume: `Seit der Reform des Staatsangehörigkeitsrechts von 2024 nimmt Deutschland Mehrstaatigkeit grundsätzlich hin. Die frühere Bedingung, die bisherige Staatsangehörigkeit aufzugeben oder zu verlieren, ist aus § 10 StAG gestrichen; die Ausnahmen dazu in § 12 sind deshalb ebenfalls weggefallen. Umgekehrt verlieren Deutsche ihre Staatsangehörigkeit nicht mehr automatisch, wenn sie eine ausländische annehmen, denn § 25 ist aufgehoben. Auch die Optionspflicht für in Deutschland geborene Kinder ausländischer Eltern nach § 29 gibt es nicht mehr. Für Sie bedeutet das: Die Einbürgerungsbehörde fragt nicht mehr nach einer Entlassungsurkunde oder Verzichtserklärung. Ob Sie Ihre bisherige Staatsangehörigkeit tatsächlich behalten, regelt aber allein das Recht Ihres Herkunftsstaates. Manche Staaten entziehen sie beim freiwilligen Erwerb einer anderen automatisch, andere verlangen eine Genehmigung oder Meldung. Klären Sie das vor dem Antrag mit dem Konsulat Ihres Landes.`,
    faqs: [
      { q: 'Muss ich meinen alten Pass bei der Einbürgerung abgeben?', a: 'Nach deutschem Recht nicht. Die Bedingung, die bisherige Staatsangehörigkeit aufzugeben, ist aus dem Staatsangehörigkeitsgesetz gestrichen. Ihr ausländischer Pass bleibt ein Dokument Ihres Herkunftsstaates; ob er gültig bleibt, entscheidet dieser Staat. Bei der Einreise nach Deutschland weisen Sie sich nach der Einbürgerung mit dem deutschen Pass oder Personalausweis aus.' },
      { q: 'Haben Doppelstaater in Deutschland andere Rechte?', a: 'Nein. In Deutschland sind Sie mit der Einbürgerung voll deutsch, mit Wahlrecht, Freizügigkeit in der EU und konsularischem Schutz im Ausland. Die zweite Staatsangehörigkeit spielt für deutsche Behörden in der Regel keine Rolle. Im Herkunftsstaat dagegen behandelt man Sie meist als eigenen Staatsangehörigen, auch beim Militärdienst oder bei Steuern.' },
      { q: 'Was gilt für Kinder mit zwei Staatsangehörigkeiten?', a: 'Kinder, die durch Geburt in Deutschland nach § 4 Abs. 3 StAG deutsch werden und von den Eltern eine andere Staatsangehörigkeit erben, behalten beide. Die frühere Pflicht, sich zwischen dem 18. und dem 23. Geburtstag zu entscheiden, ist mit der Aufhebung von § 29 weggefallen. Auch Kinder aus binationalen Ehen behalten beide Staatsangehörigkeiten.' },
    ],
    body: (h) => `
<h2>Was das Gesetz heute sagt</h2>
<p>Drei Vorschriften haben früher die doppelte Staatsbürgerschaft eingeschränkt, alle drei sind heute auf gesetze-im-internet.de als „weggefallen“ markiert. ${h.src('stag10', '§ 10 Abs. 1 Nr. 4 StAG')} verlangte, die alte Staatsangehörigkeit aufzugeben; ${h.src('stag12', '§ 12')} regelte, wann davon abgesehen wurde, etwa für EU-Bürger oder wenn der Herkunftsstaat nicht entließ. ${h.src('stag25', '§ 25')} nahm Deutschen die Staatsangehörigkeit, wenn sie auf Antrag eine fremde erwarben, außer mit Beibehaltungsgenehmigung. ${h.src('stag29', '§ 29')} verpflichtete in Deutschland geborene Kinder ausländischer Eltern, sich unter Umständen für eine Staatsangehörigkeit zu entscheiden.</p>
${h.table(['Regel', 'Früher', 'Heute'], [
  ['Einbürgerung', 'Alte Staatsangehörigkeit aufgeben, mit vielen Ausnahmen', 'Keine Aufgabe nötig'],
  ['Deutsche nehmen fremde Staatsangehörigkeit an', 'Verlust ohne Beibehaltungsgenehmigung', 'Kein Verlust nach deutschem Recht'],
  ['Kinder ausländischer Eltern, in Deutschland geboren', 'Optionspflicht in bestimmten Fällen', 'Beide Staatsangehörigkeiten bleiben'],
], 'Mehrstaatigkeit im deutschen Staatsangehörigkeitsrecht.', ['l', 'l', 'l'])}
<h2>Die andere Seite: das Recht des Herkunftsstaats</h2>
<p>Das deutsche Gesetz entscheidet nur, ob Sie Deutsche oder Deutscher werden. Ob Sie dabei Ihre bisherige Staatsangehörigkeit verlieren, bestimmt der Staat, der sie verliehen hat. Die Regeln sind sehr verschieden: Manche Länder lassen Mehrstaatigkeit ohne Weiteres zu, andere knüpfen den Verlust automatisch an den freiwilligen Erwerb einer fremden Staatsangehörigkeit, wieder andere verlangen vorher eine Genehmigung. Wir geben dazu keine Länderliste, weil sich diese Regeln ändern und hier nicht verlässlich zu prüfen sind. Fragen Sie das Konsulat Ihres Landes schriftlich und bewahren Sie die Antwort auf.</p>
<p>Wer seine alte Staatsangehörigkeit trotzdem aufgeben möchte, etwa um Pflichten im Herkunftsstaat zu beenden, kann das weiterhin tun. Es ist nur keine Voraussetzung mehr, und die Einbürgerungsbehörde stellt dafür keine Einbürgerungszusicherung mehr als Pflichtschritt aus.</p>
<h2>Was bleibt Voraussetzung</h2>
<p>Alle anderen Bedingungen gelten unverändert: ${h.n(E.jahre)} Jahre Aufenthalt, Deutsch ${E.sprache}, Test, Lebensunterhalt und Straffreiheit. Ob Sie die erfüllen und ab wann Sie den Antrag stellen können, zeigt der Rechner:</p>
${h.mini('einb', { p: ['titel', 'jahr'], c: 'Alle Voraussetzungen prüfen' })}
<p>Für Kinder, die in Deutschland geboren werden, gilt eine eigene Regel: Hat ein Elternteil seit fünf Jahren seinen rechtmäßigen gewöhnlichen Aufenthalt hier und ein unbefristetes Aufenthaltsrecht, wird das Kind mit der Geburt deutsch (${h.src('stag4', '§ 4 Abs. 3 StAG')}); mehr unter ${h.a('kinder', 'Einbürgerung von Kindern')}.</p>
`,
  },
  en: {
    slug: 'german-dual-citizenship',
    nav: 'Dual citizenship', card: 'Keeping your old nationality: what German law says',
    title: 'Dual Citizenship in Germany 2026: Keeping Your Nationality',
    description: 'German dual citizenship in 2026: you no longer have to give up your old nationality to naturalise. What German law says now and what your home country decides.',
    h1: 'Dual citizenship after the reform',
    intro: 'German law no longer requires you to give up your old nationality. Whether you keep it is up to your country of origin.',
    resume: `Since the 2024 reform of nationality law, Germany accepts multiple nationality as a rule. The former condition of giving up or losing your previous nationality has been deleted from section 10 StAG, and the exceptions to it in section 12 have gone with it. In the other direction, Germans no longer automatically lose their nationality when they take up a foreign one, because section 25 has been repealed. The duty to choose a nationality for children born in Germany to foreign parents, under section 29, has also been abolished. In practice, the naturalisation authority no longer asks for a release certificate or a renunciation. Whether you actually keep your previous nationality, however, is governed solely by the law of your country of origin. Some countries withdraw it automatically when a person voluntarily acquires another, others require permission or notification. Check with your country’s consulate before you apply.`,
    faqs: [
      { q: 'Do I have to hand in my old passport when I naturalise?', a: 'Not under German law. The condition of giving up your previous nationality has been removed from the Nationality Act. Your foreign passport remains a document of your country of origin, and whether it stays valid is that country’s decision. After naturalising, you use your German passport or ID card when entering Germany.' },
      { q: 'Do dual citizens have different rights in Germany?', a: 'No. Once naturalised you are fully German, with the right to vote, free movement in the EU and consular protection abroad. German authorities generally disregard your second nationality. Your other country, on the other hand, usually treats you as its own national, including for military service or taxes.' },
      { q: 'What about children with two nationalities?', a: 'Children who become German by birth in Germany under section 4(3) StAG and inherit another nationality from their parents keep both. The former duty to choose between the ages of 18 and 23 ended with the repeal of section 29. Children of binational couples also keep both nationalities.' },
    ],
    body: (h) => `
<h2>What the law says today</h2>
<p>Three provisions used to restrict dual citizenship, and all three are now marked “weggefallen” (repealed) on gesetze-im-internet.de. ${h.src('stag10', 'Section 10(1) no. 4 StAG')} required you to give up your old nationality, and ${h.src('stag12', 'section 12')} set out when that was waived, for example for EU citizens or where the other country would not release you. ${h.src('stag25', 'Section 25')} stripped Germans of their nationality if they applied for a foreign one, unless they held a retention permit. ${h.src('stag29', 'Section 29')} obliged some children born in Germany to foreign parents to choose one nationality.</p>
${h.table(['Rule', 'Before', 'Now'], [
  ['Naturalisation', 'Give up old nationality, with many exceptions', 'No renunciation needed'],
  ['Germans acquiring a foreign nationality', 'Loss without a retention permit', 'No loss under German law'],
  ['Children of foreign parents born in Germany', 'Duty to choose in some cases', 'Both nationalities kept'],
], 'Multiple nationality in German nationality law.', ['l', 'l', 'l'])}
<h2>The other side: your country’s law</h2>
<p>German law only decides whether you become German. Whether you lose your previous nationality in the process is decided by the state that granted it. The rules vary widely: some countries accept multiple nationality without conditions, others tie automatic loss to voluntarily acquiring a foreign nationality, others require permission first. We do not give a country list, because these rules change and cannot be verified reliably here. Ask your country’s consulate in writing and keep the reply.</p>
<p>If you still want to give up your old nationality, for example to end obligations in that country, you can. It is simply no longer a requirement, and the naturalisation authority no longer issues an assurance of naturalisation as a mandatory step for it.</p>
<h2>What is still required</h2>
<p>All other conditions are unchanged: ${h.n(E.jahre)} years of residence, German at ${E.sprache}, the test, livelihood and a clean record. Whether you meet them and when you can apply is what the calculator shows:</p>
${h.mini('einb', { p: ['titel', 'jahr'], c: 'Check every requirement' })}
<p>Children born in Germany have their own rule: if one parent has lived here lawfully for five years and holds a permanent right of residence, the child is German from birth (${h.src('stag4', 'section 4(3) StAG')}); see ${h.a('kinder', 'citizenship for children')}.</p>
`,
  },
});
