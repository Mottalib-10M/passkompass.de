/** Accueil, dans les quatre langues. Chiffres : params-2026.json et le catalogue, jamais tapés à la main. */
import P from '../data/params-2026.json';
import type { FAQ, Helpers } from '../lib/page-types';
import { formatMoney as eur, displayDate } from '../lib/format';
import { LAST_UPDATED } from '../data/site-config';

const T = P.test, K = P.katalog, G = P.gebuehr, E = P.einb;
interface HomeLang {
  title: string; description: string; h1: string; intro: string; resume: string; valeur: string;
  facts: Array<{ k: string; v: string }>; foldTitle: string; faqs: FAQ[];
  why: (h: Helpers) => string; sections: (h: Helpers) => Array<{ title: string; html: string }>;
}
const kat = (l: string) => displayDate(K.stand, l);

const de: HomeLang = {
  title: 'Einbürgerungstest 2026: alle 310 Fragen und Probetest',
  description: 'Einbürgerungstest 2026 online üben: Probeprüfung mit 33 Fragen wie im Test, alle 310 Fragen mit Lösung, jedes Bundesland, dazu frühester Antrag und Kosten.',
  h1: 'Einbürgerungstest online üben',
  intro: `${T.fragen} Fragen wie in der echten Prüfung, davon ${T.landFragen} zu Ihrem Bundesland. Antwort anklicken, sofort sehen, ob sie stimmt.`,
  resume: `Der Einbürgerungstest, inhaltlich gleich dem Test „Leben in Deutschland“, besteht aus ${T.fragen} Fragen mit je vier Antworten: ${T.fragen - T.landFragen} kommen aus ${K.allgemein} allgemeinen Fragen, ${T.landFragen} aus den ${K.proLand} Fragen Ihres Bundeslandes. Bestanden hat, wer in ${T.minuten} Minuten mindestens ${T.bestehen} richtig beantwortet; so steht es in § 1 der Einbürgerungstestverordnung. Die Probeprüfung oben zieht die Fragen genauso aus dem amtlichen Gesamtkatalog des BAMF (Stand ${kat('de-DE')}), wertet jede Antwort sofort aus und zeigt am Ende Ihre Fehler. Der Test kostet bei der Prüfstelle ${eur(T.gebuehr, 0, 'de')}; die Einbürgerung selbst ${eur(G.einbuergerung, 0, 'de')} pro Erwachsenem und ${eur(G.kind, 0, 'de')} pro miteingebürgertem Kind ohne eigenes Einkommen. Wer seit ${E.jahre} Jahren rechtmäßig in Deutschland lebt, B1 nachweist und seinen Lebensunterhalt ohne Bürgergeld bestreitet, hat in der Regel einen Anspruch; der Rechner weiter unten nennt den frühesten Monat für den Antrag.`,
  valeur: 'Passkompass macht es besser als die ersten Suchtreffer: alle 310 Fragen des amtlichen Katalogs mit Lösung, eine Probeprüfung für jedes der 16 Bundesländer, kostenlos und ohne Konto, mit englischer Übersetzung und Bedienung auf Türkisch und Arabisch, und dazu ein Rechner, der nach dem geltenden Staatsangehörigkeitsrecht ohne die abgeschaffte Einbürgerung nach drei Jahren den frühesten Antragsmonat und die Gebühren ausgibt.',
  facts: [
    { k: 'Fragen im Katalog', v: String(K.fragen) },
    { k: 'Fragen in der Prüfung', v: String(T.fragen) },
    { k: 'Zum Bestehen', v: `${T.bestehen} richtig` },
    { k: 'Gebühr Einbürgerung', v: eur(G.einbuergerung, 0, 'de') },
  ],
  foldTitle: 'Alles zum Test und zum Antrag',
  faqs: [
    { q: 'Wie viele Fragen muss ich im Einbürgerungstest richtig beantworten?', a: `Sie müssen mindestens ${T.bestehen} der ${T.fragen} Fragen richtig beantworten, und zwar unter Aufsicht innerhalb von ${T.minuten} Minuten. Es zählt nur die Zahl der richtigen Antworten; falsche Antworten ziehen nichts ab. Die Bestehensgrenze ist in allen Bundesländern gleich, und die Bescheinigung über den bestandenen Test gilt bundesweit, auch nach einem späteren Umzug.` },
    { q: 'Kommen im Test genau die Fragen aus dem Katalog dran?', a: `Ja. Die Prüfbögen werden aus dem Fragenkatalog in Anlage 1 der Einbürgerungstestverordnung erstellt; die Bögen selbst sind nicht öffentlich. Jede Frage im Test steht also wörtlich im Katalog mit ${K.fragen} Fragen. Wer alle ${K.allgemein} allgemeinen Fragen und die ${K.proLand} Fragen seines Bundeslandes sicher beherrscht, kennt jede mögliche Prüfungsfrage.` },
    { q: 'Welches Bundesland wähle ich für die Probeprüfung?', a: 'Das Bundesland, in dem Sie bei der Prüfung wohnen. Drei der 33 Fragen beziehen sich darauf, etwa auf Wappen, Landeshauptstadt oder Wahlalter bei Kommunalwahlen. Ziehen Sie vor der Prüfung um, lernen Sie die Fragen des neuen Landes. Die Bescheinigung über den bestandenen Test gilt auch nach einem späteren Umzug weiter.' },
    { q: 'Ist der Einbürgerungstest dasselbe wie der Test Leben in Deutschland?', a: 'Beide Tests nutzen denselben Fragenkatalog, haben aber verschiedene Zwecke. Der Test „Leben in Deutschland“ schließt den Orientierungskurs des Integrationskurses ab, der Einbürgerungstest dient dem Nachweis für die Staatsangehörigkeit. Für die Einbürgerung genügt in der Regel auch das Ergebnis des Tests „Leben in Deutschland“ mit mindestens 17 richtigen Antworten; das entscheidet die Einbürgerungsbehörde.' },
    { q: 'Woher stammen die Lösungen auf dieser Seite?', a: 'Das BAMF veröffentlicht den Katalog als PDF ohne Lösungsschlüssel. Radif Partners hat jede Antwort selbst ermittelt, anhand des Grundgesetzes, der Landesverfassungen, der Wahlgesetze und amtlicher Angaben, und zweimal geprüft. Fragen mit Bildern sind in Worten beschrieben. Fällt Ihnen eine falsche Lösung auf, schreiben Sie uns; maßgeblich bleibt der amtliche Katalog.' },
    { q: 'Ab wann kann ich die Einbürgerung beantragen?', a: `Nach ${E.jahre} Jahren rechtmäßigem gewöhnlichem Aufenthalt, als Ehegatte eines Deutschen nach ${E.ehegatteJahre} Jahren Aufenthalt und ${E.eheJahre} Jahren Ehe. Die frühere Einbürgerung nach drei Jahren bei besonderen Integrationsleistungen ist abgeschafft. Der Rechner auf dieser Seite nennt den Monat, ab dem die Frist erfüllt ist, und zeigt, welche weiteren Voraussetzungen noch fehlen.` },
  ],
  why: (h) => `<h2>Wann können Sie den Antrag stellen?</h2>
<p>Der Test ist nur ein Baustein. Für den Anspruch nach ${h.src('stag10', '§ 10 StAG')} brauchen Sie ${h.n(E.jahre)} Jahre rechtmäßigen Aufenthalt, einen passenden Aufenthaltstitel, Deutsch auf Niveau ${E.sprache}, einen Lebensunterhalt ohne Bürgergeld oder Sozialhilfe und keine erhebliche Verurteilung. Geben Sie unten Titel und Einreisemonat ein: Der Rechner nennt den frühesten Antragsmonat und markiert, was noch nachzuweisen ist.</p>
${h.mini('einb', { p: ['titel', 'jahr'], c: 'Alle Voraussetzungen prüfen' })}
<p>Die vollständige Prüfung mit Ehe, Verurteilungen und angerechneten Zeiten steht auf der Seite ${h.a('voraussetzungen', 'Einbürgerung: Voraussetzungen')}; die Gebühren für die ganze Familie rechnet ${h.a('kosten', 'Einbürgerung: Kosten')} aus.</p>`,
  sections: (h) => [
    { title: 'Wie die Probeprüfung funktioniert', html: `<p>Jede Probeprüfung zieht ${h.n(T.fragen - T.landFragen)} der ${h.n(K.allgemein)} allgemeinen Fragen und ${h.n(T.landFragen)} der ${h.n(K.proLand)} Fragen des gewählten Bundeslandes, in zufälliger Reihenfolge, so wie die Prüfbögen der Behörden aufgebaut sind. Nach jedem Klick sehen Sie, ob die Antwort stimmt, und rechts zählt das Ergebnis mit. Sind alle Fragen beantwortet, steht dort „Bestanden“ oder „Noch nicht bestanden“; unter „Ihre Fehler“ springen Sie direkt zu den falsch beantworteten Fragen zurück. Mit „Neue Probeprüfung“ ziehen Sie einen neuen Bogen.</p><p>Gezielt lernen Sie im ${h.a('fragenkatalog', 'Fragenkatalog mit allen Lösungen')}: dort lassen sich die Fragen nach Themenblöcken oder nach Bundesland filtern.</p>` },
    { title: 'Anmeldung und Ablauf der echten Prüfung', html: `<p>Sie melden sich bei einer Prüfstelle an, meist einer Volkshochschule oder einem Sprachschulträger, die das BAMF zugelassen hat; die Einbürgerungsbehörde nennt Ihnen Stellen in Ihrer Nähe. Die Prüfstelle stellt nach ${h.src('einbtestv', '§ 2 EinbTestV')} eine Pauschale von ${h.eur(T.gebuehr)} in Rechnung. Am Prüfungstag zeigen Sie einen amtlichen Ausweis, erhalten einen eigenen Fragebogen und haben ${h.n(T.minuten)} Minuten Zeit. Das Ergebnis kommt per Post als Bescheinigung. Alles zur Anmeldung: ${h.a('test-anmelden', 'Einbürgerungstest anmelden')}.</p>` },
    { title: 'Wer den Test nicht ablegen muss', html: `<p>Die Kenntnisse der Rechts- und Gesellschaftsordnung gelten in der Regel durch den bestandenen Test als nachgewiesen (${h.src('stag10', '§ 10 Abs. 5 StAG')}). Wer sie wegen Krankheit, Behinderung oder Alters nicht erbringen kann, ist befreit (Absatz 6). Viele Behörden erkennen außerdem einen deutschen Schulabschluss an; ob Ihr Abschluss reicht, sagt die Einbürgerungsbehörde vor der Anmeldung. Kinder unter 16 Jahren müssen den Test nicht machen.</p>` },
    { title: 'Woher die Fragen stammen und wie aktuell sie sind', html: `<p>Alle Fragen stammen aus dem ${h.src('bamf-katalog', 'Gesamtfragenkatalog des BAMF')} mit Stand vom ${h.day(K.stand)}. Der Katalog ist Anlage 1 einer Verordnung und damit ein amtliches Werk; er darf wiedergegeben werden. Die auf gesetze-im-internet.de abrufbare Fassung der Anlage nennt bei Frage 72 noch den früheren Bundeskanzler und bei Frage 73 andere Fraktionen; wir folgen dem neueren Katalog des BAMF. Wir prüfen ihn bei jeder Änderung, zuletzt am ${h.day(LAST_UPDATED)}.</p>` },
  ],
};

const en: HomeLang = {
  title: 'Citizenship Test Germany 2026: Mock Exam, All 310 Questions',
  description: 'German citizenship test 2026 practice: a 33-question mock exam like the real one, all 310 questions with answers and English translation, for every state.',
  h1: 'German citizenship test: practise online',
  intro: `${T.fragen} questions as in the real exam, ${T.landFragen} of them about your federal state. Click an answer and see at once whether it is right. Questions stay in German, as in the test, with an English translation.`,
  resume: `The German citizenship test (Einbürgerungstest), identical in content to the “Leben in Deutschland” test, has ${T.fragen} multiple-choice questions with four answers each: ${T.fragen - T.landFragen} drawn from ${K.allgemein} general questions and ${T.landFragen} from the ${K.proLand} questions about the federal state you live in. You pass with at least ${T.bestehen} correct answers within ${T.minuten} minutes, as section 1 of the Citizenship Test Ordinance sets out. The mock exam above draws its questions the same way from BAMF’s official catalogue (dated ${kat('en-GB')}), marks every answer at once and lists your mistakes at the end. The test centre charges ${eur(T.gebuehr, 0, 'en')}; naturalisation itself costs ${eur(G.einbuergerung, 0, 'en')} per adult and ${eur(G.kind, 0, 'en')} per minor child without income naturalised with a parent. After ${E.jahre} years of lawful residence, with German at level ${E.sprache} and a livelihood without basic income support, you are normally entitled to naturalise; the calculator further down gives your earliest month to apply.`,
  valeur: 'Passkompass does better than the top search results: all 310 questions of the official catalogue with answers and an English translation, a mock exam for each of the 16 federal states, free and without an account, with Turkish and Arabic versions of the key pages, plus a calculator that applies the current Nationality Act, without the abolished three-year fast track, to give your earliest month to apply and the fees.',
  facts: [
    { k: 'Questions in the catalogue', v: String(K.fragen) },
    { k: 'Questions in the exam', v: String(T.fragen) },
    { k: 'To pass', v: `${T.bestehen} correct` },
    { k: 'Naturalisation fee', v: eur(G.einbuergerung, 0, 'en') },
  ],
  foldTitle: 'Everything about the test and the application',
  faqs: [
    { q: 'How many questions must I get right to pass the German citizenship test?', a: `At least ${T.bestehen} of the ${T.fragen} questions, answered under supervision within ${T.minuten} minutes. Only correct answers count; a wrong answer costs nothing extra. The pass mark is the same in every federal state, and the certificate you receive stays valid if you move to another state before you apply.` },
    { q: 'Is the test in English?', a: 'No. The exam is only in German, and good German is part of the point: you also need a B1 language certificate to naturalise. This site shows each question in the original German, exactly as it appears on the exam paper, with an English translation underneath so you understand what you are learning. Practise with the German wording, since that is what you will read on the day.' },
    { q: 'Do the exam questions come straight from the catalogue?', a: `Yes. The exam papers are compiled from the catalogue in annex 1 of the Citizenship Test Ordinance and are not published. Every exam question therefore appears word for word among the ${K.fragen} questions in the catalogue, so knowing the ${K.allgemein} general questions and the ${K.proLand} for your state covers everything you can be asked.` },
    { q: 'Which state should I pick for the mock exam?', a: 'The state where you will live on the day of the exam. Three of the 33 questions are about it, such as its coat of arms, capital, flag or the voting age in local elections. If you move before the exam, learn the questions of your new state; a certificate already obtained stays valid after a later move.' },
    { q: 'Who worked out the answers on this site?', a: 'BAMF publishes the catalogue as a PDF without an answer key. Radif Partners worked out every answer from the Basic Law, state constitutions, electoral law and official records, and checked each one twice. Questions that show a picture in the exam are described in words. If you spot a wrong answer, write to us; the official catalogue always prevails.' },
    { q: 'When can I apply for German citizenship?', a: `After ${E.jahre} years of lawful habitual residence, or, as the spouse of a German, after ${E.ehegatteJahre} years of residence and ${E.eheJahre} years of marriage. The former three-year route for exceptional integration has been abolished. The calculator on this page gives the month from which the residence period is met and flags the conditions you still have to prove.` },
  ],
  why: (h) => `<h2>When can you apply?</h2>
<p>The test is one piece. To be entitled under ${h.src('stag10', 'section 10 of the Nationality Act')} you need ${h.n(E.jahre)} years of lawful residence, a qualifying residence title, German at level ${E.sprache}, a livelihood without basic income support or social assistance, and no significant conviction. Enter your title and the month you arrived: the calculator gives your earliest month to apply and flags what is still to prove.</p>
${h.mini('einb', { p: ['titel', 'jahr'], c: 'Check every requirement' })}
<p>The full check, including marriage, convictions and credited time, is on ${h.a('voraussetzungen', 'German citizenship requirements')}; ${h.a('kosten', 'naturalisation fees')} adds up the cost for the whole family.</p>`,
  sections: (h) => [
    { title: 'How the mock exam works', html: `<p>Each mock exam draws ${h.n(T.fragen - T.landFragen)} of the ${h.n(K.allgemein)} general questions and ${h.n(T.landFragen)} of the ${h.n(K.proLand)} questions for the state you pick, in random order, the way the official papers are built. After each click you see whether the answer is right, and the score on the right keeps count. Once every question is answered it says “Passed” or “Not passed yet”, and “Your mistakes” takes you back to the questions you missed. “New mock test” draws a fresh paper.</p><p>For targeted learning, the ${h.a('fragenkatalog', 'question catalogue with all answers')} lets you filter by topic block or by state.</p>` },
    { title: 'Booking and sitting the real exam', html: `<p>You register with a test centre approved by BAMF, usually an adult education centre (Volkshochschule) or a language school; the naturalisation authority can name centres near you. Under ${h.src('einbtestv', 'section 2 of the Citizenship Test Ordinance')} the centre charges ${h.eur(T.gebuehr)}. On the day you show official ID, get your own question paper and have ${h.n(T.minuten)} minutes. The result arrives by post as a certificate. Details: ${h.a('test-anmelden', 'booking the citizenship test')}.</p>` },
    { title: 'Who does not have to take the test', html: `<p>Passing the test normally proves your knowledge of the legal and social order (${h.src('stag10', 'section 10(5) StAG')}). People who cannot meet the requirement because of illness, disability or age are exempt (subsection 6). Many authorities also accept a German school-leaving certificate; ask your naturalisation authority before booking. Children under 16 do not take the test.</p>` },
    { title: 'Where the questions come from', html: `<p>Every question comes from ${h.src('bamf-katalog', 'BAMF’s complete question catalogue')}, dated ${h.day(K.stand)}. The catalogue is annex 1 to an ordinance, an official work that may be reproduced. The version of the annex on gesetze-im-internet.de still names the previous chancellor in question 72 and other parliamentary groups in question 73; we follow BAMF’s newer catalogue and recheck it whenever it changes, most recently on ${h.day(LAST_UPDATED)}.</p>` },
  ],
};

const tr: HomeLang = {
  title: 'Almanya vatandaşlık testi 2026: 33 soruluk deneme sınavı',
  description: 'Almanya vatandaşlık testi 2026 (Einbürgerungstest) için ücretsiz deneme sınavı: sınavdaki gibi 33 soru, her eyalet için, 310 sorunun cevabı ve başvuru tarihi.',
  h1: 'Almanya vatandaşlık testine çalışın',
  intro: `Gerçek sınavdaki gibi ${T.fragen} soru; ${T.landFragen} tanesi oturduğunuz eyaletle ilgili. Sorular sınavda olduğu gibi Almanca, bu sayfanın açıklamaları Türkçe.`,
  resume: `Almanya’da vatandaşlık testi (Einbürgerungstest), içerik olarak „Leben in Deutschland“ testiyle aynıdır ve dört şıklı ${T.fragen} sorudan oluşur: ${T.fragen - T.landFragen} soru ${K.allgemein} genel sorudan, ${T.landFragen} soru ise oturduğunuz eyaletin ${K.proLand} sorusundan gelir. Vatandaşlık Testi Yönetmeliği’nin 1. maddesine göre ${T.minuten} dakika içinde en az ${T.bestehen} doğru cevap veren sınavı geçer. Yukarıdaki deneme sınavı soruları BAMF’ın resmî kataloğundan (${kat('tr-TR')} tarihli) aynı şekilde seçer, her cevabı hemen değerlendirir ve sonunda hatalarınızı gösterir. Sınav merkezi ${eur(T.gebuehr, 0, 'tr')} alır; vatandaşlık harcı yetişkin başına ${eur(G.einbuergerung, 0, 'tr')}, ebeveynle birlikte vatandaş olan ve kendi geliri olmayan çocuk için ${eur(G.kind, 0, 'tr')}’dur. ${E.jahre} yıl yasal ikamet, ${E.sprache} seviyesinde Almanca ve Bürgergeld almadan geçim şartlarını karşılayan kişi kural olarak vatandaşlığa hak kazanır; aşağıdaki hesaplayıcı en erken başvuru ayını gösterir. Türk vatandaşları için önemli bir değişiklik: Alman kanunu artık eski vatandaşlıktan çıkmayı şart koşmuyor.`,
  valeur: 'Passkompass ilk arama sonuçlarından daha iyisini yapar: resmî kataloğun 310 sorusunun tamamı cevaplarıyla, 16 eyaletin her biri için deneme sınavı, ücretsiz ve hesap açmadan, Türkçe açıklamalarla; ayrıca üç yıllık hızlı yolun kaldırılmasından sonraki güncel kanuna göre en erken başvuru ayını ve harçları hesaplayan bir araç.',
  facts: [
    { k: 'Katalogdaki soru', v: String(K.fragen) },
    { k: 'Sınavdaki soru', v: String(T.fragen) },
    { k: 'Geçmek için', v: `${T.bestehen} doğru` },
    { k: 'Vatandaşlık harcı', v: eur(G.einbuergerung, 0, 'tr') },
  ],
  foldTitle: 'Test ve başvuru hakkında',
  faqs: [
    { q: 'Vatandaşlık testini geçmek için kaç doğru cevap gerekir?', a: `${T.fragen} sorudan en az ${T.bestehen} tanesini, gözetim altında ${T.minuten} dakika içinde doğru cevaplamanız gerekir. Yanlış cevaplar puan düşürmez; sadece doğru cevaplar sayılır, bu yüzden hiçbir soruyu boş bırakmayın. Geçme notu bütün eyaletlerde aynıdır ve aldığınız belge başka bir eyalete taşınsanız da geçerliliğini korur.` },
    { q: 'Sınav Türkçe yapılabilir mi?', a: 'Hayır. Vatandaşlık testi yalnızca Almancadır. Bu yüzden deneme sınavındaki sorular da sınav kâğıdındaki Almanca metinle aynıdır; düğmeler, açıklamalar ve sonuç kutusu Türkçedir. Ayrıca vatandaşlık için B1 seviyesinde Almanca belgesi gerekir. Soruları Almanca metinle çalışmanız, sınav günü okuyacağınız metne alışmanızı sağlar.' },
    { q: 'Türk vatandaşlığımı kaybetmem gerekir mi?', a: 'Alman Vatandaşlık Kanunu artık eski vatandaşlıktan çıkmayı şart koşmuyor; çifte vatandaşlıkla ilgili eski kurallar kanundan kaldırıldı. Türk vatandaşlığınızın devam edip etmeyeceğini ise Türk hukuku belirler, Alman makamları bu konuda karar vermez. Başvurudan önce Türk makamlarından bilgi alın; bu site yalnızca Alman tarafındaki kuralları açıklar.' },
    { q: 'Deneme sınavında hangi eyaleti seçmeliyim?', a: 'Sınav günü oturduğunuz eyaleti seçin. 33 sorudan 3’ü o eyaletle ilgilidir: arması, başkenti, bayrağı veya yerel seçimlerde oy kullanma yaşı gibi. Sınavdan önce taşınırsanız yeni eyaletin sorularını çalışın; daha önce alınmış belge taşınmadan sonra da geçerlidir ve yeniden sınava girmeniz gerekmez.' },
    { q: 'Bu sitedeki cevapları kim belirledi?', a: 'BAMF soru kataloğunu cevap anahtarı olmadan PDF olarak yayımlar. Radif Partners her cevabı Anayasa, eyalet anayasaları, seçim kanunları ve resmî kayıtlara dayanarak kendisi belirledi ve iki kez kontrol etti. Sınavda resimli olan sorular burada sözle anlatılıyor. Yanlış bir cevap görürseniz bize yazın; geçerli olan her zaman resmî katalogdur.' },
    { q: 'Vatandaşlığa ne zaman başvurabilirim?', a: `${E.jahre} yıl yasal ve sürekli ikametten sonra; bir Alman vatandaşıyla evliyseniz ${E.ehegatteJahre} yıl ikamet ve ${E.eheJahre} yıl evlilikten sonra. Özel uyum başarısıyla üç yılda vatandaşlık yolu kaldırıldı. Bu sayfadaki hesaplayıcı ikamet süresinin dolduğu ayı ve henüz kanıtlamanız gereken şartları gösterir.` },
  ],
  why: (h) => `<h2>Ne zaman başvurabilirsiniz?</h2>
<p>Test, şartlardan yalnızca biridir. ${h.src('stag10', 'Vatandaşlık Kanunu’nun 10. maddesine')} göre ${h.n(E.jahre)} yıl yasal ikamet, uygun bir oturum belgesi, ${E.sprache} seviyesinde Almanca, Bürgergeld veya sosyal yardım almadan geçim ve önemli bir mahkûmiyetin olmaması gerekir. Oturum belgenizi ve Almanya’ya geldiğiniz yılı girin: hesaplayıcı en erken başvuru ayını gösterir.</p>
${h.mini('einb', { p: ['titel', 'jahr'], c: 'Tüm şartları kontrol edin' })}
<p>Tam kontrol için: ${h.a('voraussetzungen', 'Almanya vatandaşlığı şartları')}.</p>`,
  sections: (h) => [
    { title: 'Deneme sınavı nasıl çalışır?', html: `<p>Her deneme sınavı ${h.n(K.allgemein)} genel sorudan ${h.n(T.fragen - T.landFragen)} tanesini ve seçtiğiniz eyaletin ${h.n(K.proLand)} sorusundan ${h.n(T.landFragen)} tanesini rastgele sırayla seçer; resmî sınav kâğıtları da böyle hazırlanır. Her tıklamadan sonra cevabın doğru olup olmadığını görürsünüz, sağdaki kutu sonucu sayar. Bütün sorular cevaplanınca „Geçtiniz“ veya „Henüz geçmediniz“ yazar; „Hatalarınız“ bölümünden yanlış cevapladığınız sorulara dönersiniz. „Yeni deneme sınavı“ yeni bir kâğıt çeker.</p>` },
    { title: 'Gerçek sınava kayıt', html: `<p>BAMF’ın onayladığı bir sınav merkezine, çoğunlukla bir halk eğitim merkezine (Volkshochschule) veya dil okuluna kaydolursunuz; vatandaşlık makamı size yakın merkezleri söyleyebilir. ${h.src('einbtestv', 'Yönetmeliğin 2. maddesine')} göre ücret ${h.eur(T.gebuehr)}’dur. Sınav günü resmî kimliğinizi gösterirsiniz ve ${h.n(T.minuten)} dakikanız olur. Sonuç posta ile belge olarak gelir.</p>` },
    { title: 'Sorular nereden geliyor?', html: `<p>Bütün sorular ${h.day(K.stand)} tarihli ${h.src('bamf-katalog', 'BAMF soru kataloğundan')} alınmıştır. Katalog bir yönetmeliğin ekidir, yani resmî bir eserdir ve çoğaltılabilir. Kataloğu her değişiklikte kontrol ediyoruz; son kontrol ${h.day(LAST_UPDATED)}.</p>` },
  ],
};

const ar: HomeLang = {
  title: 'اختبار الجنسية الألمانية 2026: اختبار تجريبي من 33 سؤالًا',
  description: 'تدرّب مجانًا على اختبار الجنسية الألمانية 2026 (Einbürgerungstest): 33 سؤالًا كما في الامتحان، لكل ولاية، مع إجابات 310 أسئلة وحاسبة لموعد طلب التجنس.',
  h1: 'تدرّب على اختبار الجنسية الألمانية',
  intro: `${T.fragen} سؤالًا كما في الامتحان الحقيقي، منها ${T.landFragen} عن ولايتك. الأسئلة بالألمانية كما في الامتحان، والشرح بالعربية.`,
  resume: `يتكوّن اختبار الجنسية الألمانية (Einbürgerungstest)، وهو مطابق في محتواه لاختبار „Leben in Deutschland“، من ${T.fragen} سؤالًا لكل منها أربع إجابات: ${T.fragen - T.landFragen} سؤالًا من بين ${K.allgemein} سؤال عام، و${T.landFragen} أسئلة من بين ${K.proLand} أسئلة خاصة بالولاية التي تسكن فيها. ينجح من يجيب إجابة صحيحة عن ${T.bestehen} سؤالًا على الأقل خلال ${T.minuten} دقيقة، كما تنص المادة الأولى من لائحة اختبار التجنس. يختار الاختبار التجريبي أعلاه الأسئلة بالطريقة نفسها من الكتالوج الرسمي لـ BAMF (بتاريخ ${kat('ar')})، ويصحح كل إجابة فورًا، ويعرض أخطاءك في النهاية. يتقاضى مركز الامتحان ${eur(T.gebuehr, 0, 'ar')}، ورسم التجنس ${eur(G.einbuergerung, 0, 'ar')} لكل بالغ و${eur(G.kind, 0, 'ar')} لكل طفل قاصر بلا دخل يتجنس مع أحد والديه. من أقام إقامة قانونية ${E.jahre} سنوات، وأثبت اللغة الألمانية بمستوى ${E.sprache}، وأعال نفسه دون إعانة Bürgergeld، يحق له عادة التجنس؛ والحاسبة أدناه تعطيك أقرب شهر لتقديم الطلب.`,
  valeur: 'يتفوق Passkompass على أولى نتائج البحث: جميع أسئلة الكتالوج الرسمي الـ310 مع إجاباتها، واختبار تجريبي لكل ولاية من الولايات الـ16، مجانًا ودون حساب، مع شرح بالعربية، إضافة إلى حاسبة تطبق قانون الجنسية الحالي بعد إلغاء طريق السنوات الثلاث لتعطيك أقرب شهر للتقديم والرسوم.',
  facts: [
    { k: 'أسئلة الكتالوج', v: String(K.fragen) },
    { k: 'أسئلة الامتحان', v: String(T.fragen) },
    { k: 'للنجاح', v: `${T.bestehen} إجابة صحيحة` },
    { k: 'رسم التجنس', v: eur(G.einbuergerung, 0, 'ar') },
  ],
  foldTitle: 'كل ما يخص الاختبار والطلب',
  faqs: [
    { q: 'كم سؤالًا يجب أن أجيب عنه إجابة صحيحة لأنجح في اختبار الجنسية؟', a: `يجب أن تجيب إجابة صحيحة عن ${T.bestehen} سؤالًا على الأقل من ${T.fragen}، تحت المراقبة وخلال ${T.minuten} دقيقة. لا تُخصم نقاط على الإجابات الخاطئة، بل تُحسب الإجابات الصحيحة فقط. علامة النجاح واحدة في كل الولايات، وتبقى الشهادة صالحة إذا انتقلت إلى ولاية أخرى قبل تقديم الطلب.` },
    { q: 'هل يمكن إجراء الاختبار بالعربية؟', a: 'لا. الاختبار بالألمانية فقط، ولذلك تظهر الأسئلة في الاختبار التجريبي بنصها الألماني كما في ورقة الامتحان، بينما الأزرار والشرح ونتيجتك بالعربية. وتحتاج أيضًا إلى شهادة لغة ألمانية بمستوى B1 للتجنس. التدرب على النص الألماني يعوّدك على ما ستقرؤه يوم الامتحان.' },
    { q: 'هل يجب أن أتخلى عن جنسيتي الأصلية؟', a: 'لم يعد قانون الجنسية الألماني يشترط التخلي عن الجنسية السابقة؛ فقد أُلغيت القواعد القديمة الخاصة بتعدد الجنسيات من القانون. أما بقاء جنسيتك الأصلية فيحدده قانون بلدك. استعلم لدى سلطات بلدك أو قنصليتها قبل تقديم الطلب، فهذا الموقع يشرح القواعد الألمانية فقط ولا يقدم أي استشارة قانونية.' },
    { q: 'أي ولاية أختار في الاختبار التجريبي؟', a: 'اختر الولاية التي ستسكن فيها يوم الامتحان. ثلاثة من الأسئلة الـ33 تخصها، مثل شعارها وعاصمتها وعلمها وسن التصويت في الانتخابات المحلية. إذا انتقلت قبل الامتحان فتعلّم أسئلة الولاية الجديدة؛ أما الشهادة التي حصلت عليها فتبقى صالحة في كل ألمانيا بعد الانتقال.' },
    { q: 'من حدد الإجابات في هذا الموقع؟', a: 'ينشر BAMF الكتالوج بصيغة PDF دون مفتاح إجابات. حددت Radif Partners كل إجابة بنفسها استنادًا إلى القانون الأساسي ودساتير الولايات وقوانين الانتخاب والمصادر الرسمية، وراجعتها مرتين. الأسئلة التي تظهر بصورة في الامتحان موصوفة هنا بالكلمات. إذا وجدت إجابة خاطئة فاكتب إلينا؛ والمرجع دائمًا هو الكتالوج الرسمي.' },
    { q: 'متى يمكنني تقديم طلب التجنس؟', a: `بعد ${E.jahre} سنوات من الإقامة القانونية المعتادة، أو بعد ${E.ehegatteJahre} سنوات إقامة و${E.eheJahre} سنتين من الزواج إذا كنت متزوجًا من ألماني. أُلغي طريق التجنس بعد ثلاث سنوات بسبب إنجازات اندماج خاصة. تعرض الحاسبة في هذه الصفحة الشهر الذي تكتمل فيه مدة الإقامة والشروط التي ما زال عليك إثباتها.` },
  ],
  why: (h) => `<h2>متى يمكنك تقديم الطلب؟</h2>
<p>الاختبار شرط واحد من عدة شروط. وفق ${h.src('stag10', 'المادة 10 من قانون الجنسية')} تحتاج إلى ${h.n(E.jahre)} سنوات من الإقامة القانونية، وتصريح إقامة مناسب، ولغة ألمانية بمستوى ${E.sprache}، وإعالة نفسك دون Bürgergeld أو مساعدة اجتماعية، وألا تكون عليك إدانة جسيمة. أدخل نوع إقامتك وسنة قدومك: تعرض الحاسبة أقرب شهر للتقديم.</p>
${h.mini('einb', { p: ['titel', 'jahr'], c: 'تحقق من جميع الشروط' })}
<p>للتحقق الكامل: ${h.a('voraussetzungen', 'شروط الجنسية الألمانية')}.</p>`,
  sections: (h) => [
    { title: 'كيف يعمل الاختبار التجريبي؟', html: `<p>يختار كل اختبار تجريبي ${h.n(T.fragen - T.landFragen)} سؤالًا من بين ${h.n(K.allgemein)} سؤال عام و${h.n(T.landFragen)} أسئلة من بين ${h.n(K.proLand)} أسئلة الولاية المختارة، بترتيب عشوائي، كما تُعدّ أوراق الامتحان الرسمية. بعد كل نقرة ترى إن كانت الإجابة صحيحة، ويحسب المربع الجانبي النتيجة. عند الانتهاء يظهر „ناجح“ أو „لم تنجح بعد“، ويعيدك قسم „أخطاؤك“ إلى الأسئلة التي أخطأت فيها.</p>` },
    { title: 'التسجيل في الامتحان الحقيقي', html: `<p>تسجّل لدى مركز امتحان معتمد من BAMF، غالبًا مركز تعليم الكبار (Volkshochschule) أو مدرسة لغات؛ ويمكن لسلطة التجنس أن تدلك على مراكز قريبة. وفق ${h.src('einbtestv', 'المادة 2 من اللائحة')} يبلغ الرسم ${h.eur(T.gebuehr)}. يوم الامتحان تقدم هوية رسمية ولديك ${h.n(T.minuten)} دقيقة. تصل النتيجة بالبريد على شكل شهادة.</p>` },
    { title: 'من أين تأتي الأسئلة؟', html: `<p>جميع الأسئلة من ${h.src('bamf-katalog', 'كتالوج أسئلة BAMF')} بتاريخ ${h.day(K.stand)}. الكتالوج ملحق بلائحة رسمية، أي عمل رسمي يجوز نقله. نراجعه عند كل تغيير، وكانت آخر مراجعة في ${h.day(LAST_UPDATED)}.</p>` },
  ],
};

export const HOME = { de, en, tr, ar, sources: ['bamf-katalog', 'einbtestv', 'stag10', 'stag38'] };
