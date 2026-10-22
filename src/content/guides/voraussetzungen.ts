import { defineGuide, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

/* Conditions du § 10 StAG (version en vigueur, lue le jour de LESEDATUM) et exemples calculés par le moteur. */
const E = K.P.einb, G = K.P.gebuehr;
const base = { titel: 'arbeit' as const, eheMitDeutschem: null, deutsch: 'b1' as const, test: true, unterhalt: 'eigen' as const, strafe: 'keine' as const };
const FAELLE = [
  { seit: '2021-09', x: {} },
  { seit: '2023-02', x: {} },
  { seit: '2023-05', x: { eheMitDeutschem: '2024-03' } },
  { seit: '2022-04', x: { titel: 'humanitaer' as const } },
].map((f) => ({ ...f, r: K.einbuergerung({ ...base, ...f.x, seit: f.seit } as Parameters<typeof K.einbuergerung>[0], K.HEUTE) }));
const [A, B, C, D] = FAELLE;
const turbo = E.turbo;
/* Les résumés sont des chaînes : dates formatées ici, dans leur langue. */
const TAG = { de: 'de-DE', en: 'en-GB', tr: 'tr-TR', ar: 'ar-u-nu-latn' } as const;
const fm = (t: string) => ({ my: (m: string) => new Date(`${m}-15T00:00:00Z`).toLocaleDateString(t, { month: 'long', year: 'numeric', timeZone: 'UTC' }), day: (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString(t, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) });
const h0 = fm(TAG.de), h0e = fm(TAG.en), h0t = fm(TAG.tr), h0a = fm(TAG.ar);

function rows(h: Helpers) {
  const de = h.lang === 'de';
  const desc = [de ? 'Arbeit, keine Ehe mit Deutschen' : 'Work permit, not married to a German', de ? 'Arbeit, keine Ehe mit Deutschen' : 'Work permit, not married to a German', de ? 'Ehe mit einer Deutschen seit März 2024' : 'Married to a German since March 2024', de ? 'Abschiebungsverbot (§ 25 Abs. 3 AufenthG)' : 'Ban on deportation (s. 25(3) AufenthG)'];
  return FAELLE.map((f, i) => [String.fromCharCode(65 + i), h.my(f.seit), desc[i], f.r.weg === 'para9' ? '§ 9' : '§ 10', f.r.fruehestens ? h.my(f.r.fruehestens) : de ? 'Titel schließt aus' : 'Title excludes']);
}

export default defineGuide({
  id: 'voraussetzungen', group: 'einb', order: 30,
  tool: 'einb',
  related: ['kosten', 'beantragen', 'sprachnachweis', 'ehepartner', 'niederlassungserlaubnis'],
  sources: ['stag10', 'stag9', 'stag12a', 'stag12b', 'stag11', 'freising'],
  de: {
    slug: 'einbuergerung-voraussetzungen',
    nav: 'Voraussetzungen und Rechner', card: 'Frühester Antragsmonat und was noch fehlt',
    title: 'Einbürgerung Voraussetzungen 2026: Rechner für den Antrag',
    description: `Einbürgerung Voraussetzungen 2026: ${E.jahre} Jahre Aufenthalt, B1, Test, Lebensunterhalt nach § 10 StAG. Der Rechner nennt den frühesten Antragsmonat und was fehlt.`,
    h1: 'Einbürgerung: Voraussetzungen prüfen',
    intro: `Aufenthaltstitel und Einreisemonat eingeben: Der Rechner zeigt, ab wann die ${E.jahre} Jahre erfüllt sind und welche Nachweise noch fehlen.`,
    resume: `Einen Anspruch auf Einbürgerung nach § 10 des Staatsangehörigkeitsgesetzes hat, wer seit ${E.jahre} Jahren rechtmäßig seinen gewöhnlichen Aufenthalt in Deutschland hat und dazu sieben Bedingungen erfüllt: ein Bekenntnis zur freiheitlichen demokratischen Grundordnung und zur historischen Verantwortung Deutschlands, ein passender Aufenthaltstitel, ein Lebensunterhalt ohne Bürgergeld oder Sozialhilfe, keine Verurteilung über den Grenzen des § 12a, Deutsch auf Niveau ${E.sprache}, ein bestandener Einbürgerungstest und eine geklärte Identität. Ehegatten von Deutschen können nach § 9 schon nach ${E.ehegatteJahre} Jahren Aufenthalt und ${E.eheJahre} Jahren Ehe eingebürgert werden. Die Einbürgerung nach ${turbo.jahre} Jahren bei besonderen Integrationsleistungen gibt es seit dem ${K.P.einb.turbo.aufgehoben.split('-').reverse().join('.')} nicht mehr. Die Aufgabe der bisherigen Staatsangehörigkeit verlangt das Gesetz nicht mehr. Wer zum Beispiel im September 2021 mit einer Arbeitserlaubnis eingereist ist, B1 und den Test hat und von seinem Lohn lebt, kann den Antrag seit ${h0.my(A.r.fristAb)} stellen.`,
    faqs: [
      { q: 'Zählt die Zeit als Student für die fünf Jahre Aufenthalt?', a: 'Ja. Die fünf Jahre beziehen sich auf den rechtmäßigen gewöhnlichen Aufenthalt, nicht auf einen bestimmten Titel. Zeiten mit einer Aufenthaltserlaubnis zum Studium zählen mit. Im Moment des Antrags darf man aber keinen Studientitel mehr haben, weil das Gesetz diesen Titel für die Einbürgerung ausschließt; nötig ist dann etwa eine Erlaubnis für Arbeit oder eine Niederlassungserlaubnis.' },
      { q: 'Darf ich während der fünf Jahre ins Ausland reisen?', a: `Ja. Nach § 12b StAG unterbricht ein Aufenthalt im Ausland bis zu ${E.abwesenheitMonate} Monaten den gewöhnlichen Aufenthalt nicht. Wer länger weg war, beginnt grundsätzlich neu zu zählen; die Behörde kann frühere Aufenthaltszeiten aber bis zu ${E.anrechnungJahre} Jahre anrechnen. Geben Sie im Rechner dann das Rückkehrdatum ein und die angerechneten Monate in den weiteren Angaben.` },
      { q: 'Verhindert eine Geldstrafe die Einbürgerung?', a: `Nicht immer. Nach § 12a StAG bleiben Geldstrafen bis ${E.geldstrafeTagessaetze} Tagessätze und Freiheitsstrafen bis ${E.bewaehrungMonate} Monate, die zur Bewährung ausgesetzt und erlassen wurden, außer Betracht; mehrere Strafen werden zusammengezählt. Das gilt nicht, wenn das Urteil ein antisemitisches, rassistisches oder sonst menschenverachtendes Motiv festgestellt hat. Dann steht schon eine kleine Strafe der Einbürgerung entgegen.` },
      { q: 'Was gilt beim Bezug von Bürgergeld?', a: `Wer Bürgergeld oder Sozialhilfe bezieht, erfüllt die Voraussetzung in der Regel nicht. Ausnahmen gibt es für frühere Gastarbeiter und Vertragsarbeiter, für Menschen, die in den letzten ${E.vollzeitVon} Monaten mindestens ${E.vollzeitMonate} Monate in Vollzeit gearbeitet haben, und für deren Ehegatten, die mit ihnen und einem minderjährigen Kind zusammenleben. Wohngeld und Kindergeld zählen nicht zu diesen Leistungen.` },
    ],
    body: (h) => `
<h2>Die Voraussetzungen im Überblick</h2>
<p>${h.src('stag10', '§ 10 StAG')} zählt die Bedingungen auf, die für den Anspruch zusammenkommen müssen. Ist eine nicht erfüllt, bleibt die Ermessenseinbürgerung nach § 8, die aber an strengere Maßstäbe gebunden ist. Die Tabelle zeigt jede Bedingung mit dem Nachweis, den die Behörde üblicherweise sehen will.</p>
${h.table(['Voraussetzung', 'Was das Gesetz verlangt', 'Üblicher Nachweis'], [
  ['Aufenthalt', `${h.n(E.jahre)} Jahre rechtmäßig, gewöhnlich`, 'Meldebescheinigung, Titel der letzten Jahre'],
  ['Aufenthaltstitel', 'unbefristet oder ein nicht ausgeschlossener befristeter Titel', 'Aktueller Aufenthaltstitel'],
  ['Lebensunterhalt', 'ohne SGB II oder XII, Ausnahmen in Nr. 3', 'Arbeitsvertrag, Lohnabrechnungen, Mietvertrag'],
  ['Straffreiheit', 'keine Verurteilung über § 12a hinaus', 'Auskunft holt die Behörde selbst ein'],
  ['Deutsch', `Niveau ${E.sprache}`, 'Zertifikat einer Sprachprüfung'],
  ['Einbürgerungstest', 'Kenntnisse der Rechts- und Gesellschaftsordnung', 'Bescheinigung des BAMF'],
  ['Bekenntnis', 'Grundordnung und historische Verantwortung', 'Unterschrift bei der Behörde'],
  ['Identität', 'geklärte Identität und Staatsangehörigkeit', 'Reisepass, Geburtsurkunde'],
], 'Anspruchseinbürgerung nach § 10 StAG, Stand der Gesetzesfassung bei unserer Lesung.', ['l', 'l', 'l'])}
<h2>Vier Fälle, mit dem Rechner gerechnet</h2>
<p>Die Zeilen unten hat derselbe Rechner ausgegeben, mit Stand ${h.my(K.HEUTE)}. In allen Fällen sind B1, Test und eigener Lebensunterhalt angenommen; es geht also nur um die Frist und den Titel.</p>
${h.table(['Fall', 'In Deutschland seit', 'Situation', 'Weg', 'Antrag ab'], rows(h), 'Frühester Antragsmonat, wenn alle übrigen Voraussetzungen erfüllt sind.', ['l', 'l', 'l', 'l', 'l'])}
<p>Fall B ist erst seit ${h.my(B.seit)} im Land und muss noch ${h.n(B.r.monateBisFrist)} Monate warten. Bis dahin lässt sich alles andere vorbereiten: Sprachzertifikat, Test, Unterlagen. Fall C ist mit einer Deutschen verheiratet. Hier greift ${h.src('stag9', '§ 9 StAG')}: drei Jahre Aufenthalt, zwei Jahre Ehe, beides muss erfüllt sein, und der spätere der beiden Termine zählt. Fall D hat eine Aufenthaltserlaubnis wegen eines Abschiebungsverbots. Dieser Titel steht in der Liste der ausgeschlossenen Titel, solange er nicht in eine Niederlassungserlaubnis übergeht; mehr dazu unter ${h.a('niederlassungserlaubnis', 'Niederlassungserlaubnis')}.</p>
${h.mini('einb', { p: ['titel', 'jahr', 'monat'], d: { jahr: 2023, monat: '2' }, t: 'Ihr frühester Antragsmonat' })}
<h2>Welche Titel ausgeschlossen sind</h2>
<p>Das Gesetz nennt die befristeten Titel, die nicht reichen. Dazu gehören die Titel für Studium, Ausbildung, Sprachkurse und Schulbesuch, die Suche nach einem Studien- oder Arbeitsplatz einschließlich Chancenkarte, die ICT-Karte für konzernintern Versetzte, die Aufnahme aus dem Ausland, Härtefälle, vorübergehender Schutz, das Chancen-Aufenthaltsrecht und die Erlaubnisse nach § 25 Abs. 3 bis 5 AufenthG, etwa bei einem Abschiebungsverbot. Mit Asylberechtigung, Flüchtlingsanerkennung oder subsidiärem Schutz nach § 25 Abs. 1 oder 2 ist die Einbürgerung dagegen möglich. Wer eine Duldung oder eine Aufenthaltsgestattung hat, besitzt keinen Aufenthaltstitel und erfüllt die Bedingung nicht.</p>
<h2>Was seit der Reform anders ist</h2>
<p>Mit der Reform von 2024 sank die Frist von acht auf fünf Jahre, und das Gesetz verlangt nicht mehr, die alte Staatsangehörigkeit aufzugeben; siehe ${h.a('doppelte-staatsbuergerschaft', 'doppelte Staatsbürgerschaft')}. Eingeführt wurde damals auch eine Einbürgerung nach drei Jahren bei besonderen Integrationsleistungen. Diese Abkürzung ist wieder gestrichen; ${h.src('freising', 'das Merkblatt des Landratsamts Freising')} nennt den ${h.day(turbo.aufgehoben)} als Stichtag. Neu ist außerdem das ausdrückliche Bekenntnis zur Verantwortung für die Folgen des Nationalsozialismus und zum Schutz jüdischen Lebens.</p>
<p>Die Gebühr beträgt ${h.eur(G.einbuergerung)} pro Person, ${h.eur(G.kind)} für ein miteingebürgertes Kind ohne eigenes Einkommen; die Summe für Ihre Familie rechnet ${h.a('kosten', 'Einbürgerung: Kosten')} aus.</p>
`,
  },
  en: {
    slug: 'german-citizenship-requirements',
    nav: 'Requirements and calculator', card: 'Earliest month to apply and what is still missing',
    title: 'Citizenship Requirements Germany 2026: When You Can Apply',
    description: `German citizenship requirements 2026: ${E.jahre} years’ residence, B1 German, the test, livelihood. Get your earliest month to apply and see what is still missing.`,
    h1: 'German citizenship: check the requirements',
    intro: `Enter your residence title and the month you arrived: the calculator shows when the ${E.jahre} years are met and which proofs are still missing.`,
    resume: `You are entitled to naturalise under section 10 of the Nationality Act (StAG) after ${E.jahre} years of lawful habitual residence in Germany, provided you meet seven further conditions: a commitment to the free democratic basic order and to Germany’s historical responsibility, a qualifying residence title, a livelihood without basic income support or social assistance, no conviction beyond the limits of section 12a, German at level ${E.sprache}, a passed citizenship test and a clarified identity. Spouses of Germans can naturalise under section 9 after ${E.ehegatteJahre} years of residence and ${E.eheJahre} years of marriage. The three-year route for exceptional integration was abolished on ${h0e.day(turbo.aufgehoben)}. You no longer have to give up your previous nationality. Someone who arrived in September 2021 on a work permit, has B1 and the test and lives on their own income has been able to apply since ${h0e.my(A.r.fristAb)}.`,
    faqs: [
      { q: 'Does time as a student count towards the five years?', a: 'Yes. The five years refer to lawful habitual residence, not to a particular permit, so years on a student permit count. At the moment you apply, though, you cannot still hold a student permit, because the law excludes that title from naturalisation; you need, for example, a work permit or a settlement permit by then.' },
      { q: 'Can I travel abroad during the five years?', a: `Yes. Under section 12b StAG, a stay abroad of up to ${E.abwesenheitMonate} months does not interrupt habitual residence. After a longer absence the count generally starts again, but the authority can credit up to ${E.anrechnungJahre} years of earlier residence. In the calculator, enter your return date and put any credited months in the extra fields.` },
      { q: 'Does a fine stop me from becoming German?', a: `Not necessarily. Under section 12a StAG, fines of up to ${E.geldstrafeTagessaetze} day-rates and prison sentences of up to ${E.bewaehrungMonate} months that were suspended and then remitted are disregarded; several sentences are added together. This does not apply if the judgment found an antisemitic, racist or otherwise inhumane motive, in which case even a small sentence blocks naturalisation.` },
      { q: 'Can I naturalise while receiving Bürgergeld?', a: `Normally not. People receiving basic income support or social assistance do not meet the livelihood condition. Exceptions cover former guest workers and contract workers, people who worked full time for at least ${E.vollzeitMonate} of the last ${E.vollzeitVon} months, and their spouses living with them and a minor child. Housing benefit and child benefit are not counted as such benefits.` },
    ],
    body: (h) => `
<h2>The requirements at a glance</h2>
<p>${h.src('stag10', 'Section 10 StAG')} lists the conditions that must all be met for an entitlement. If one is missing, discretionary naturalisation under section 8 remains possible, with stricter standards. The table shows each condition and the proof authorities usually ask for.</p>
${h.table(['Requirement', 'What the law asks', 'Usual proof'], [
  ['Residence', `${h.n(E.jahre)} years, lawful and habitual`, 'Registration certificate, permits of recent years'],
  ['Residence title', 'permanent, or a temporary title not on the excluded list', 'Current residence permit'],
  ['Livelihood', 'without SGB II or XII benefits, exceptions in no. 3', 'Contract, payslips, tenancy agreement'],
  ['Criminal record', 'no conviction beyond section 12a', 'The authority checks the register'],
  ['German', `level ${E.sprache}`, 'Language exam certificate'],
  ['Citizenship test', 'knowledge of the legal and social order', 'BAMF certificate'],
  ['Commitment', 'basic order and historical responsibility', 'Signed declaration at the authority'],
  ['Identity', 'identity and nationality clarified', 'Passport, birth certificate'],
], 'Naturalisation by entitlement under section 10 StAG, as worded when we last read it.', ['l', 'l', 'l'])}
<h2>Four cases, run through the calculator</h2>
<p>The rows below come from the same calculator, as of ${h.my(K.HEUTE)}. Each assumes B1, the test and an own income, so only the waiting period and the title matter.</p>
${h.table(['Case', 'In Germany since', 'Situation', 'Route', 'Apply from'], rows(h), 'Earliest month to apply if every other requirement is met.', ['l', 'l', 'l', 'l', 'l'])}
<p>Case B has only been in Germany since ${h.my(B.seit)} and has ${h.n(B.r.monateBisFrist)} months to go. Everything else can be prepared meanwhile: the language certificate, the test and the documents. Case C is married to a German, so ${h.src('stag9', 'section 9 StAG')} applies: three years of residence and two years of marriage, both required, and the later of the two dates counts. Case D holds a permit based on a ban on deportation. That title is on the excluded list until it turns into a settlement permit; see ${h.a('niederlassungserlaubnis', 'settlement permit')}.</p>
${h.mini('einb', { p: ['titel', 'jahr', 'monat'], d: { jahr: 2023, monat: '2' }, t: 'Your earliest month to apply' })}
<h2>Which residence titles are excluded</h2>
<p>The law names the temporary titles that do not qualify. They include titles for study, vocational training, language courses and school, for seeking a study place or a job including the Opportunity Card, the ICT card for intra-company transfers, admission from abroad, hardship cases, temporary protection, the opportunity residence right and the permits under section 25(3) to (5) of the Residence Act, such as for a ban on deportation. People with asylum, refugee status or subsidiary protection under section 25(1) or (2) can naturalise. A Duldung or an asylum-seeker permit is not a residence title, so it does not meet the condition.</p>
<h2>What changed with the reform</h2>
<p>The 2024 reform cut the waiting period from eight to five years and dropped the requirement to give up your old nationality; see ${h.a('doppelte-staatsbuergerschaft', 'dual citizenship')}. It also introduced a three-year route for exceptional integration. That shortcut has since been scrapped; ${h.src('freising', 'the Freising district office’s fact sheet')} gives ${h.day(turbo.aufgehoben)} as the cut-off. The reform also added an explicit commitment to Germany’s responsibility for the consequences of Nazi rule and to protecting Jewish life.</p>
<p>The fee is ${h.eur(G.einbuergerung)} per person and ${h.eur(G.kind)} for a child without income naturalised with a parent; ${h.a('kosten', 'naturalisation fees')} adds up the total for your family.</p>
`,
  },
  tr: {
    slug: 'almanya-vatandasligi-sartlari',
    nav: 'Vatandaşlık şartları', card: 'En erken başvuru ayı ve eksik belgeler',
    title: 'Almanya vatandaşlığı şartları 2026: başvuru hesaplayıcı',
    description: `Almanya vatandaşlığı şartları 2026: ${E.jahre} yıl ikamet, B1 Almanca, vatandaşlık testi, geçim. Hesaplayıcı en erken başvuru ayınızı ve eksik kalan şartları gösterir.`,
    h1: 'Almanya vatandaşlığı: şartları kontrol edin',
    intro: `Oturum belgenizi ve Almanya’ya geldiğiniz ayı girin: hesaplayıcı ${E.jahre} yılın ne zaman dolduğunu ve hangi belgelerin eksik olduğunu gösterir.`,
    resume: `Alman Vatandaşlık Kanunu’nun (StAG) 10. maddesine göre Almanya’da ${E.jahre} yıl yasal ve sürekli ikamet eden kişi, yedi şartı daha karşılıyorsa vatandaşlığa hak kazanır: özgür demokratik düzene ve Almanya’nın tarihsel sorumluluğuna bağlılık beyanı, uygun bir oturum belgesi, Bürgergeld veya sosyal yardım almadan geçim, 12a. maddedeki sınırları aşan bir mahkûmiyetin olmaması, ${E.sprache} seviyesinde Almanca, geçilmiş vatandaşlık testi ve açıklığa kavuşmuş kimlik. Bir Alman vatandaşıyla evli olanlar 9. maddeye göre ${E.ehegatteJahre} yıl ikamet ve ${E.eheJahre} yıl evlilikten sonra başvurabilir. Özel uyum başarısıyla üç yılda vatandaşlık yolu ${h0t.day(turbo.aufgehoben)} tarihinde kaldırıldı. Kanun artık eski vatandaşlıktan çıkmayı şart koşmuyor. Örneğin Eylül 2021’de çalışma izniyle gelen, B1 belgesi ve testi olan ve maaşıyla geçinen biri ${h0t.my(A.r.fristAb)} ayından beri başvurabilir. Hesaplayıcı bu tarihi sizin için hesaplar ve eksik kalan belgeleri tek tek gösterir.`,
    faqs: [
      { q: 'Öğrencilik yılları beş yıla sayılır mı?', a: 'Evet. Beş yıl, belirli bir oturum türüne değil yasal ve sürekli ikamete bağlıdır; öğrenci oturumuyla geçen yıllar da sayılır. Ancak başvuru anında hâlâ öğrenci oturumunuz olmamalıdır, çünkü kanun bu oturum türünü vatandaşlık için hariç tutar. O zamana kadar örneğin çalışma oturumuna veya süresiz oturuma geçmeniz gerekir.' },
      { q: 'Beş yıl içinde yurt dışına gidebilir miyim?', a: `Evet. StAG 12b. maddeye göre ${E.abwesenheitMonate} aya kadar yurt dışında kalmak sürekli ikameti kesmez. Daha uzun bir yokluktan sonra süre kural olarak yeniden başlar, ancak makam önceki ikametin ${E.anrechnungJahre} yılına kadarını sayabilir. Hesaplayıcıya o zaman dönüş tarihinizi ve sayılan ayları girin.` },
      { q: 'Bürgergeld alırken vatandaş olabilir miyim?', a: `Kural olarak hayır. Bürgergeld veya sosyal yardım alan kişi geçim şartını karşılamaz. İstisnalar: eski misafir işçiler ve sözleşmeli işçiler, son ${E.vollzeitVon} ayın en az ${E.vollzeitMonate} ayında tam zamanlı çalışmış olanlar ve bunlarla ve reşit olmayan bir çocukla birlikte yaşayan eşleri. Konut yardımı (Wohngeld) ve çocuk parası (Kindergeld) bu yardımlardan sayılmaz.` },
    ],
    body: (h) => `
<h2>Şartlara genel bakış</h2>
<p>${h.src('stag10', 'StAG 10. madde')} hak doğuran vatandaşlık için birlikte karşılanması gereken şartları sayar. Biri eksikse, daha sıkı ölçütlere bağlı takdire dayalı vatandaşlık (8. madde) kalır. Tablo her şartı ve makamın genellikle istediği belgeyi gösterir.</p>
${h.table(['Şart', 'Kanun ne istiyor', 'Genel belge'], [
  ['İkamet', `${h.n(E.jahre)} yıl yasal ve sürekli`, 'Adres kaydı (Meldebescheinigung), oturum belgeleri'],
  ['Oturum belgesi', 'süresiz veya hariç tutulmamış süreli belge', 'Güncel oturum kartı'],
  ['Geçim', 'SGB II veya XII yardımı olmadan', 'İş sözleşmesi, maaş bordroları, kira sözleşmesi'],
  ['Sabıka', '12a. maddeyi aşan mahkûmiyet yok', 'Makam kendisi sorgular'],
  ['Almanca', `${E.sprache} seviyesi`, 'Dil sınavı sertifikası'],
  ['Vatandaşlık testi', 'hukuk ve toplum düzeni bilgisi', 'BAMF belgesi'],
  ['Bağlılık beyanı', 'temel düzen ve tarihsel sorumluluk', 'Makamda imzalanır'],
  ['Kimlik', 'kimlik ve vatandaşlık açık', 'Pasaport, doğum belgesi'],
], 'StAG 10. maddeye göre hak doğuran vatandaşlık.', ['l', 'l', 'l'])}
<h2>Hesaplayıcıyla dört örnek</h2>
<p>Aşağıdaki satırları aynı hesaplayıcı ${h.my(K.HEUTE)} itibarıyla hesapladı. Her örnekte B1, test ve kendi geliri varsayıldı; yalnızca süre ve oturum türü farklıdır.</p>
${h.table(['Örnek', 'Almanya’da', 'Durum', 'Madde', 'Başvuru'], rows(h).map((r) => [r[0], r[1], ['Çalışma oturumu', 'Çalışma oturumu', 'Mart 2024’ten beri bir Almanla evli', 'Sınır dışı etme yasağı (§ 25 fıkra 3)'][r[0].charCodeAt(0) - 65], r[3], r[4] === 'Title excludes' ? 'belge engel' : r[4]]), 'Diğer bütün şartlar karşılanıyorsa en erken başvuru ayı.', ['l', 'l', 'l', 'l', 'l'])}
<p>B örneği ${h.my(B.seit)} tarihinden beri Almanya’da ve ${h.n(B.r.monateBisFrist)} ay daha beklemesi gerekiyor; bu sürede dil sertifikası, test ve belgeler hazırlanabilir. C örneği bir Almanla evli: ${h.src('stag9', '9. madde')} uygulanır, üç yıl ikamet ve iki yıl evlilik gerekir, iki tarihten geç olanı esas alınır. D örneğinde sınır dışı etme yasağına dayanan bir oturum var; bu belge süresiz oturuma dönüşene kadar hariç tutulanlar listesindedir.</p>
${h.mini('einb', { p: ['titel', 'jahr', 'monat'], d: { jahr: 2023, monat: '2' }, t: 'En erken başvuru ayınız' })}
<h2>Reformla ne değişti?</h2>
<p>2024 reformu bekleme süresini sekiz yıldan beş yıla indirdi ve eski vatandaşlıktan çıkma şartını kaldırdı. Türk vatandaşlığınızın devam edip etmeyeceğini Türk hukuku belirler; başvurudan önce Türk makamlarına danışın. Reformla gelen üç yıllık hızlı yol ise yeniden kaldırıldı. Harç kişi başına ${h.eur(G.einbuergerung)}, birlikte vatandaş olan ve geliri olmayan çocuk için ${h.eur(G.kind)}’dur.</p>
`,
  },
  ar: {
    slug: 'shurut-al-jinsiya-al-almaniya',
    nav: 'شروط الجنسية', card: 'أقرب شهر للتقديم وما ينقصك',
    title: 'شروط الجنسية الألمانية 2026: حاسبة موعد تقديم الطلب',
    description: `شروط الجنسية الألمانية 2026: إقامة ${E.jahre} سنوات، ألمانية B1، اختبار الجنسية، الإعالة. تعرض الحاسبة المجانية أقرب شهر لتقديم طلبك والشروط التي ما زالت ناقصة لديك.`,
    h1: 'الجنسية الألمانية: تحقق من الشروط',
    intro: `أدخل نوع إقامتك وشهر قدومك إلى ألمانيا: تعرض الحاسبة متى تكتمل السنوات ${E.jahre} وما الوثائق التي ما زالت ناقصة.`,
    resume: `وفق المادة 10 من قانون الجنسية الألماني (StAG) يحق التجنس لمن أقام في ألمانيا إقامة قانونية معتادة مدة ${E.jahre} سنوات، إذا استوفى سبعة شروط أخرى: الالتزام بالنظام الديمقراطي الحر وبالمسؤولية التاريخية لألمانيا، وتصريح إقامة مناسب، وإعالة النفس دون Bürgergeld أو مساعدة اجتماعية، وعدم وجود إدانة تتجاوز حدود المادة 12a، ولغة ألمانية بمستوى ${E.sprache}، واجتياز اختبار التجنس، وهوية واضحة. ويمكن لأزواج المواطنين الألمان التجنس وفق المادة 9 بعد ${E.ehegatteJahre} سنوات إقامة و${E.eheJahre} سنتين من الزواج. أُلغي طريق التجنس بعد ثلاث سنوات بسبب إنجازات اندماج خاصة في ${h0a.day(turbo.aufgehoben)}. ولم يعد القانون يشترط التخلي عن الجنسية السابقة. فمن قدم مثلًا في سبتمبر 2021 بتصريح عمل، ولديه B1 والاختبار، ويعيش من راتبه، يمكنه التقديم منذ ${h0a.my(A.r.fristAb)}. وتحسب الحاسبة هذا التاريخ لحالتك وتعرض الوثائق التي ما زالت ناقصة واحدة تلو الأخرى.`,
    faqs: [
      { q: 'هل تُحتسب سنوات الدراسة ضمن السنوات الخمس؟', a: 'نعم. ترتبط السنوات الخمس بالإقامة القانونية المعتادة لا بنوع معين من التصاريح، لذلك تُحتسب سنوات الإقامة الدراسية. لكن عند تقديم الطلب يجب ألا تكون ما زلت تحمل إقامة دراسة، لأن القانون يستثني هذا النوع من التجنس؛ وتحتاج حينها مثلًا إلى إقامة عمل أو إقامة دائمة.' },
      { q: 'هل يمكنني السفر إلى الخارج خلال السنوات الخمس؟', a: `نعم. وفق المادة 12b لا يقطع البقاء في الخارج حتى ${E.abwesenheitMonate} أشهر الإقامة المعتادة. بعد غياب أطول يبدأ العد عادة من جديد، لكن يجوز للسلطة احتساب ما يصل إلى ${E.anrechnungJahre} سنوات من الإقامة السابقة. أدخل في الحاسبة حينها تاريخ عودتك والأشهر المحتسبة.` },
      { q: 'هل يمكنني التجنس وأنا أتلقى Bürgergeld؟', a: `عادةً لا. من يتلقى Bürgergeld أو مساعدة اجتماعية لا يستوفي شرط الإعالة. الاستثناءات: العمال الضيوف والعمال المتعاقدون سابقًا، ومن عمل بدوام كامل ${E.vollzeitMonate} شهرًا على الأقل من آخر ${E.vollzeitVon} شهرًا، وأزواجهم الذين يعيشون معهم ومع طفل قاصر. ولا تُعد إعانة السكن (Wohngeld) ولا إعانة الأطفال (Kindergeld) من هذه المساعدات.` },
    ],
    body: (h) => `
<h2>الشروط باختصار</h2>
<p>تعدد ${h.src('stag10', 'المادة 10 من قانون الجنسية')} الشروط التي يجب أن تجتمع كلها ليثبت الحق في التجنس. إذا نقص أحدها يبقى التجنس التقديري وفق المادة 8، وهو أصعب. يبين الجدول كل شرط والوثيقة التي تطلبها السلطة عادةً.</p>
${h.table(['الشرط', 'ما يطلبه القانون', 'الوثيقة المعتادة'], [
  ['الإقامة', `${h.n(E.jahre)} سنوات قانونية ومعتادة`, 'شهادة تسجيل السكن، تصاريح الإقامة'],
  ['تصريح الإقامة', 'دائم أو مؤقت غير مستثنى', 'تصريح الإقامة الحالي'],
  ['الإعالة', 'دون مساعدات SGB II أو XII', 'عقد العمل، كشوف الراتب، عقد الإيجار'],
  ['السجل الجنائي', 'لا إدانة تتجاوز المادة 12a', 'تستعلم السلطة بنفسها'],
  ['الألمانية', `مستوى ${E.sprache}`, 'شهادة امتحان لغة'],
  ['اختبار التجنس', 'معرفة النظام القانوني والاجتماعي', 'شهادة BAMF'],
  ['الالتزام', 'النظام الأساسي والمسؤولية التاريخية', 'توقيع لدى السلطة'],
  ['الهوية', 'هوية وجنسية واضحتان', 'جواز السفر، شهادة الميلاد'],
], 'التجنس بحكم الحق وفق المادة 10 من قانون الجنسية.', ['l', 'l', 'l'])}
<h2>أربع حالات محسوبة بالحاسبة</h2>
<p>حسبت الحاسبة نفسها الأسطر التالية بتاريخ ${h.my(K.HEUTE)}. افترضنا في كل حالة وجود B1 والاختبار ودخل خاص، فلا يختلف إلا الموعد ونوع الإقامة.</p>
${h.table(['الحالة', 'في ألمانيا منذ', 'الوضع', 'المادة', 'التقديم من'], rows(h).map((r) => [r[0], r[1], ['إقامة عمل', 'إقامة عمل', 'متزوج من ألمانية منذ مارس 2024', 'حظر الترحيل (§ 25 فقرة 3)'][r[0].charCodeAt(0) - 65], r[3], r[4] === 'Title excludes' ? 'الإقامة عائق' : r[4]]), 'أقرب شهر للتقديم إذا استوفيت بقية الشروط.', ['l', 'l', 'l', 'l', 'l'])}
<p>الحالة B في ألمانيا منذ ${h.my(B.seit)} وعليها الانتظار ${h.n(B.r.monateBisFrist)} شهرًا؛ ويمكن خلالها تحضير شهادة اللغة والاختبار والوثائق. الحالة C متزوجة من ألمانية، فتنطبق ${h.src('stag9', 'المادة 9')}: ثلاث سنوات إقامة وسنتان من الزواج، ويُعتمد التاريخ الأبعد منهما. الحالة D لديها إقامة بسبب حظر الترحيل، وهي في قائمة الإقامات المستثناة حتى تتحول إلى إقامة دائمة.</p>
${h.mini('einb', { p: ['titel', 'jahr', 'monat'], d: { jahr: 2023, monat: '2' }, t: 'أقرب شهر لتقديم طلبك' })}
<h2>ما الذي تغيّر بعد الإصلاح؟</h2>
<p>خفّض إصلاح 2024 مدة الانتظار من ثماني سنوات إلى خمس، وألغى شرط التخلي عن الجنسية السابقة. أما بقاء جنسيتك الأصلية فيحدده قانون بلدك. وأُلغي لاحقًا طريق السنوات الثلاث الذي جاء به الإصلاح. يبلغ الرسم ${h.eur(G.einbuergerung)} لكل شخص و${h.eur(G.kind)} لكل طفل بلا دخل يتجنس مع أحد والديه.</p>
`,
  },
});

