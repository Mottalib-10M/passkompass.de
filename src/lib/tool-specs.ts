/**
 * Les simulateurs du site. Chaque chiffre vient de params-2026.json et du moteur pur engine/einbuergerung.ts.
 * Une spec liste ses champs (visibles d'abord, `adv` repliés) et une fonction `run` qui rend la carte de résultat.
 * « Aujourd'hui » = mois de lecture des textes (HEUTE), jamais l'horloge du visiteur : même résultat partout.
 */
import type { ToolSpec, V, ToolOut } from './tool-types';
import { resolve } from './tool-types';
import { formatMoney, formatNumber, type Lang } from './format';
import { einbuergerung, kosten, niederlassung, blauSchwellen, ym, monthsBetween, type Titel, type Deutsch, type Unterhalt, type Strafe, type NeWeg } from './engine/einbuergerung';
import P from '../data/params-2026.json';
import { LAST_UPDATED } from '../data/site-config';

export type Args = Record<string, number | string>;
const HEUTE = LAST_UPDATED.slice(0, 7);
/** Texte dans la langue ; le turc et l'arabe retombent sur l'anglais quand ils ne sont pas donnés. */
const T = (l: Lang, de: string, en: string, tr?: string, ar?: string) => (l === 'de' ? de : l === 'tr' ? tr ?? en : l === 'ar' ? ar ?? en : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const eur = (x: number, l: Lang, d = 0) => formatMoney(x, d, l);
const num = (x: number, l: Lang, d = 0) => formatNumber(x, d, l);
const TAGS: Record<Lang, string> = { de: 'de-DE', en: 'en-GB', tr: 'tr-TR', ar: 'ar-u-nu-latn' };
const my = (m: string, l: Lang) => new Date(`${m}-15T00:00:00Z`).toLocaleDateString(TAGS[l], { month: 'long', year: 'numeric', timeZone: 'UTC' });
const months = (l: Lang) => Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(Date.UTC(2026, i, 15)).toLocaleDateString(TAGS[l], { month: 'long', timeZone: 'UTC' }) }));
const yn = (l: Lang) => [{ value: 'ja', label: T(l, 'Ja', 'Yes', 'Evet', 'نعم') }, { value: 'nein', label: T(l, 'Nein', 'No', 'Hayır', 'لا') }];

const TITEL = (l: Lang): Array<{ value: Titel; label: string }> => [
  { value: 'arbeit', label: T(l, 'Aufenthaltserlaubnis für Arbeit oder Fachkräfte', 'Residence permit for work or skilled workers', 'Çalışma veya nitelikli işgücü oturumu', 'إقامة للعمل أو للكفاءات') },
  { value: 'familie', label: T(l, 'Aufenthaltserlaubnis aus familiären Gründen', 'Residence permit for family reasons', 'Aile birleşimi oturumu', 'إقامة لأسباب عائلية') },
  { value: 'unbefristet', label: T(l, 'Niederlassungserlaubnis oder Daueraufenthalt-EU', 'Settlement permit or EU long-term residence', 'Süresiz oturum (Niederlassungserlaubnis)', 'إقامة دائمة (Niederlassungserlaubnis)') },
  { value: 'blau', label: T(l, 'Blaue Karte EU', 'EU Blue Card', 'AB Mavi Kart', 'البطاقة الزرقاء الأوروبية') },
  { value: 'schutz', label: T(l, 'Asyl, Flüchtlingsschutz oder subsidiärer Schutz (§ 25 Abs. 1 oder 2)', 'Asylum, refugee status or subsidiary protection (s. 25(1) or (2))', 'İltica, mülteci veya ikincil koruma (§ 25 fıkra 1 veya 2)', 'لجوء أو حماية لاجئ أو حماية فرعية (§ 25 فقرة 1 أو 2)') },
  { value: 'eu', label: T(l, 'Staatsangehörigkeit eines EU-Staats oder der Schweiz', 'Citizen of an EU country or Switzerland', 'AB ülkesi veya İsviçre vatandaşı', 'مواطن دولة في الاتحاد الأوروبي أو سويسرا') },
  { value: 'studium', label: T(l, 'Studium, Ausbildung oder Sprachkurs', 'Studies, vocational training or language course', 'Öğrenim, meslek eğitimi veya dil kursu', 'دراسة أو تدريب مهني أو دورة لغة') },
  { value: 'humanitaer', label: T(l, 'Abschiebungsverbot oder andere Erlaubnis nach § 25 Abs. 3 bis 5', 'Ban on deportation or other permit under s. 25(3) to (5)', 'Sınır dışı etme yasağı veya § 25 fıkra 3 ila 5', 'حظر الترحيل أو إقامة وفق § 25 فقرة 3 إلى 5') },
  { value: 'duldung', label: T(l, 'Duldung oder Aufenthaltsgestattung', 'Toleration (Duldung) or asylum-seeker permit', 'Duldung veya sığınma başvurusu belgesi', 'Duldung أو تصريح إقامة طالب لجوء') },
];
const DEUTSCH = (l: Lang): Array<{ value: Deutsch; label: string }> => [
  { value: 'b1', label: T(l, 'B1 oder besser (Zertifikat)', 'B1 or higher (certificate)', 'B1 veya üstü (sertifika)', 'B1 أو أعلى (شهادة)') },
  { value: 'c1', label: T(l, 'C1 oder Muttersprache', 'C1 or native', 'C1 veya ana dil', 'C1 أو لغة أم') },
  { value: 'a2', label: T(l, 'A2', 'A2', 'A2', 'A2') },
  { value: 'keine', label: T(l, 'Unter A2 oder kein Nachweis', 'Below A2 or no proof', 'A2 altı veya belge yok', 'أقل من A2 أو بلا شهادة') },
];
const UNTERHALT = (l: Lang): Array<{ value: Unterhalt; label: string }> => [
  { value: 'eigen', label: T(l, 'Eigenes Einkommen, kein Bürgergeld', 'Own income, no basic income support', 'Kendi geliri, Bürgergeld yok', 'دخل خاص دون إعانة Bürgergeld') },
  { value: 'vollzeit', label: T(l, 'Aufstockend, aber 20 der letzten 24 Monate Vollzeit', 'Topping up, but full-time 20 of the last 24 months', 'Ek yardım alıyor ama son 24 ayın 20’sinde tam zamanlı', 'إعانة تكميلية مع دوام كامل 20 شهرًا من آخر 24') },
  { value: 'leistungen', label: T(l, 'Bürgergeld oder Sozialhilfe (SGB II/XII)', 'Basic income support or social assistance (SGB II/XII)', 'Bürgergeld veya sosyal yardım (SGB II/XII)', 'Bürgergeld أو مساعدة اجتماعية (SGB II/XII)') },
];
const STRAFE = (l: Lang): Array<{ value: Strafe; label: string }> => [
  { value: 'keine', label: T(l, 'Keine Verurteilung', 'No conviction', 'Mahkûmiyet yok', 'لا إدانة') },
  { value: 'gering', label: T(l, 'Bis 90 Tagessätze oder 3 Monate auf Bewährung', 'Up to 90 day-fines or 3 months suspended', '90 günlük para cezasına veya 3 ay ertelemeye kadar', 'حتى 90 غرامة يومية أو 3 أشهر موقوفة') },
  { value: 'hoeher', label: T(l, 'Höhere Strafe oder Tat mit menschenverachtendem Motiv', 'Higher sentence, or a hate-motivated offence', 'Daha ağır ceza veya nefret saikli suç', 'عقوبة أشد أو جريمة بدافع الكراهية') },
];

const PRUEF: Record<string, (l: Lang) => string> = {
  aufenthalt: (l) => T(l, 'Aufenthaltsdauer', 'Length of residence', 'İkamet süresi', 'مدة الإقامة'),
  titel: (l) => T(l, 'Aufenthaltstitel', 'Residence title', 'Oturum belgesi', 'تصريح الإقامة'),
  unterhalt: (l) => T(l, 'Lebensunterhalt', 'Livelihood', 'Geçim', 'إعالة النفس'),
  deutsch: (l) => T(l, 'Deutsch B1', 'German B1', 'Almanca B1', 'الألمانية B1'),
  test: (l) => T(l, 'Einbürgerungstest', 'Citizenship test', 'Vatandaşlık testi', 'اختبار الجنسية'),
  strafe: (l) => T(l, 'Straffreiheit', 'Criminal record', 'Sabıka', 'السجل الجنائي'),
};
const MARK = (st: string, l: Lang) => (st === 'ok' ? T(l, 'erfüllt', 'met', 'karşılanıyor', 'مستوفى') : st === 'nein' ? T(l, 'steht entgegen', 'blocks the application', 'engel', 'عائق') : T(l, 'noch nachzuweisen', 'still to prove', 'kanıtlanmalı', 'يجب إثباته'));

function einb(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'titel', label: T(l, 'Ihr Aufenthaltstitel heute', 'Your residence title today', 'Bugünkü oturum belgeniz', 'تصريح إقامتك الحالي'), def: String(arg?.titel ?? 'arbeit'), options: TITEL(l), wide: true },
      { id: 'jahr', label: T(l, 'Seit wann leben Sie in Deutschland? Jahr', 'Living in Germany since: year', 'Almanya’da hangi yıldan beri', 'تعيش في ألمانيا منذ: السنة'), def: Number(arg?.jahr ?? 2022), max: 2026, help: T(l, 'Beginn des erlaubten Aufenthalts', 'Start of lawful stay', 'Yasal ikametin başlangıcı', 'بداية الإقامة القانونية') },
      { kind: 'select', id: 'monat', label: T(l, 'Monat', 'Month', 'Ay', 'الشهر'), def: String(arg?.monat ?? '1'), options: months(l), help: T(l, 'Nach über 6 Monaten im Ausland: Rückkehr', 'After 6+ months abroad: your return', '6 aydan uzun yurt dışı sonrası: dönüş', 'بعد غياب أكثر من 6 أشهر: العودة') },
      { kind: 'select', id: 'deutsch', label: T(l, 'Deutschkenntnisse', 'German level', 'Almanca seviyesi', 'مستوى الألمانية'), def: String(arg?.deutsch ?? 'b1'), options: DEUTSCH(l) },
      { kind: 'select', id: 'unterhalt', label: T(l, 'Lebensunterhalt', 'Livelihood', 'Geçim', 'الإعالة'), def: String(arg?.unterhalt ?? 'eigen'), options: UNTERHALT(l), wide: true },
      { kind: 'choice', id: 'test', label: T(l, 'Einbürgerungstest bestanden?', 'Citizenship test passed?', 'Vatandaşlık testi geçildi mi?', 'هل نجحت في اختبار الجنسية؟'), def: String(arg?.test ?? 'nein'), options: yn(l) },
      { kind: 'choice', id: 'ehe', label: T(l, 'Verheiratet mit einem deutschen Staatsangehörigen?', 'Married to a German citizen?', 'Bir Alman vatandaşıyla evli misiniz?', 'متزوج من مواطن ألماني؟'), def: String(arg?.ehe ?? 'nein'), options: yn(l) },
      { id: 'ehejahr', label: T(l, 'Heirat im Jahr', 'Year of marriage', 'Evlilik yılı', 'سنة الزواج'), def: Number(arg?.ehejahr ?? 2024), max: 2026, adv: true, help: T(l, 'Nur bei Ehe mit einem Deutschen (§ 9 StAG)', 'Only if married to a German (s. 9 StAG)', 'Sadece bir Almanla evlilikte (§ 9 StAG)', 'فقط عند الزواج من ألماني (§ 9 StAG)') },
      { kind: 'select', id: 'strafe', label: T(l, 'Verurteilungen', 'Convictions', 'Mahkûmiyetler', 'الإدانات'), def: String(arg?.strafe ?? 'keine'), options: STRAFE(l), adv: true },
      { id: 'anger', label: T(l, 'Angerechnete frühere Monate', 'Earlier months credited', 'Sayılan önceki aylar', 'الأشهر السابقة المحتسبة'), def: Number(arg?.anger ?? 0), max: 36, unit: T(l, 'Monate', 'months', 'ay', 'شهرًا'), adv: true, help: T(l, 'Nur wenn die Behörde früheren Aufenthalt anrechnet (§ 12b Abs. 2, höchstens 36)', 'Only if the authority credits an earlier stay (s. 12b(2), 36 at most)', 'Sadece makam önceki ikameti sayarsa (§ 12b, en çok 36)', 'فقط إذا احتسبت السلطة إقامة سابقة (§ 12b، 36 كحد أقصى)') },
    ],
    run: (v) => {
      const y = Math.max(1950, Math.min(2026, Math.round(n(v, 'jahr')) || 2026));
      const seit = ym(y, Math.min(12, Math.max(1, n(v, 'monat') || 1)));
      const ehe = s(v, 'ehe') === 'ja' ? ym(Math.max(1950, Math.min(2026, Math.round(n(v, 'ehejahr')) || 2026)), 1) : null;
      const r = einbuergerung({ seit, titel: s(v, 'titel') as Titel, eheMitDeutschem: ehe, deutsch: s(v, 'deutsch') as Deutsch, test: s(v, 'test') === 'ja', unterhalt: s(v, 'unterhalt') as Unterhalt, strafe: s(v, 'strafe') as Strafe, angerechnet: n(v, 'anger') }, HEUTE);
      const rows: ToolOut['rows'] = [];
      const jahre = r.weg === 'para9' ? P.einb.ehegatteJahre : P.einb.jahre;
      rows.push([T(l, r.weg === 'para9' ? `Frist (§ 9 StAG: ${jahre} Jahre Aufenthalt, ${P.einb.eheJahre} Jahre Ehe)` : `Frist (§ 10 StAG: ${jahre} Jahre Aufenthalt)`, r.weg === 'para9' ? `Deadline (s. 9 StAG: ${jahre} years’ residence, ${P.einb.eheJahre} years’ marriage)` : `Deadline (s. 10 StAG: ${jahre} years’ residence)`, r.weg === 'para9' ? `Süre (§ 9 StAG: ${jahre} yıl ikamet, ${P.einb.eheJahre} yıl evlilik)` : `Süre (§ 10 StAG: ${jahre} yıl ikamet)`, r.weg === 'para9' ? `المهلة (§ 9: ${jahre} سنوات إقامة و${P.einb.eheJahre} سنتان زواج)` : `المهلة (§ 10: ${jahre} سنوات إقامة)`), my(r.fristAb, l)]);
      for (const p of r.pruefungen) if (PRUEF[p.id]) rows.push([PRUEF[p.id](l), p.id === 'aufenthalt' && p.status !== 'ok' ? T(l, `ab ${my(p.ab!, l)}`, `from ${my(p.ab!, l)}`, `${my(p.ab!, l)} itibarıyla`, `ابتداءً من ${my(p.ab!, l)}`) : MARK(p.status, l)]);
      rows.push([T(l, 'Gebühr pro Person', 'Fee per person', 'Kişi başı harç', 'الرسم للشخص'), eur(P.gebuehr.einbuergerung, l)]);
      let label: string, value: string, sub: string;
      if (r.fruehestens === null) {
        label = T(l, 'Einbürgerungsantrag', 'Naturalisation application', 'Vatandaşlık başvurusu', 'طلب التجنس');
        value = T(l, 'Derzeit nicht möglich', 'Not possible for now', 'Şu an mümkün değil', 'غير ممكن حاليًا');
        sub = r.blockiert.map((id) => PRUEF[id](l)).join(', ') + T(l, ': diese Voraussetzung fehlt nach Ihren Angaben.', ': this condition is not met on your answers.', ': bu şart cevaplarınıza göre karşılanmıyor.', ': هذا الشرط غير مستوفى حسب إجاباتك.');
      } else if (r.jetzt) {
        label = T(l, 'Antrag möglich ab', 'You can apply from', 'Başvuru tarihi', 'يمكنك التقديم ابتداءً من');
        value = T(l, 'sofort', 'now', 'hemen', 'الآن');
        sub = T(l, `Die Aufenthaltsdauer ist seit ${my(r.fristAb, l)} erfüllt.`, `The residence period has been met since ${my(r.fristAb, l)}.`, `İkamet süresi ${my(r.fristAb, l)} itibarıyla doldu.`, `اكتملت مدة الإقامة منذ ${my(r.fristAb, l)}.`);
      } else {
        label = T(l, 'Antrag frühestens', 'Earliest application', 'En erken başvuru', 'أقرب موعد للتقديم');
        value = my(r.fruehestens, l);
        sub = T(l, `Noch ${num(r.monateBisFrist, l)} Monate, gerechnet ab ${my(HEUTE, l)}.`, `${num(r.monateBisFrist, l)} months to go, counted from ${my(HEUTE, l)}.`, `${my(HEUTE, l)} itibarıyla ${num(r.monateBisFrist, l)} ay kaldı.`, `بقي ${num(r.monateBisFrist, l)} شهرًا اعتبارًا من ${my(HEUTE, l)}.`);
      }
      return {
        label, value, sub, rows,
        note: T(l, 'Bekenntnis zum Grundgesetz, geklärte Identität und Staatsangehörigkeit prüft die Behörde zusätzlich. Die frühere Einbürgerung nach drei Jahren gibt es nicht mehr. Schätzung nach dem Gesetz, keine Rechtsberatung.', 'The authority also checks your declaration of commitment to the Basic Law and that your identity and nationality are clear. Naturalisation after three years no longer exists. An estimate from the law, not legal advice.', 'Makam ayrıca Anayasa’ya bağlılık beyanını, kimlik ve vatandaşlığın netliğini kontrol eder. Üç yıl sonra vatandaşlık artık yok. Kanuna göre tahmin, hukuki danışmanlık değildir.', 'تتحقق السلطة أيضًا من إعلان الالتزام بالقانون الأساسي ومن وضوح الهوية والجنسية. لم يعد التجنس بعد ثلاث سنوات ممكنًا. تقدير وفق القانون وليس استشارة قانونية.'),
      };
    },
  };
}

function kostenSpec(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { id: 'erw', label: T(l, 'Erwachsene, die sich einbürgern lassen', 'Adults applying', 'Başvuran yetişkin', 'البالغون المتقدمون'), def: Number(arg?.erw ?? 2), max: 10 },
      { id: 'kind', label: T(l, 'Minderjährige Kinder ohne eigenes Einkommen', 'Minor children without own income', 'Kendi geliri olmayan reşit olmayan çocuklar', 'أطفال قاصرون بلا دخل'), def: Number(arg?.kind ?? 2), max: 10 },
      { id: 'test', label: T(l, 'Einbürgerungstests', 'Citizenship tests to book', 'Vatandaşlık testi sayısı', 'عدد اختبارات الجنسية'), def: Number(arg?.test ?? 2), max: 10, help: T(l, 'Ab 16 Jahren nötig, sofern kein deutscher Schulabschluss', 'Needed from age 16 unless a German school certificate exempts you', '16 yaşından itibaren gerekli', 'مطلوب ابتداءً من 16 عامًا') },
      { id: 'kindE', label: T(l, 'Minderjährige mit eigenem Einkommen', 'Minors with their own income', 'Kendi geliri olan reşit olmayanlar', 'قاصرون لهم دخل'), def: Number(arg?.kindE ?? 0), max: 10, adv: true },
    ],
    run: (v) => {
      const k = kosten({ erwachsene: n(v, 'erw'), kinderMit: n(v, 'kind'), kinderEigen: n(v, 'kindE'), tests: n(v, 'test') });
      return {
        label: T(l, 'Gebühren und Test zusammen', 'Fees and tests together', 'Harçlar ve test toplamı', 'مجموع الرسوم والاختبار'), value: eur(k.gesamt, l),
        sub: T(l, `${num(k.personen, l)} Personen, Gebühren nach § 38 StAG und Testpauschale nach § 2 EinbTestV`, `${num(k.personen, l)} people, fees under s. 38 StAG and the test charge under s. 2 EinbTestV`),
        rows: [
          [T(l, `Erwachsene × ${eur(P.gebuehr.einbuergerung, l)}`, `Adults × ${eur(P.gebuehr.einbuergerung, l)}`), eur(k.erw, l), k.erw],
          [T(l, `Kinder ohne Einkommen × ${eur(P.gebuehr.kind, l)}`, `Children without income × ${eur(P.gebuehr.kind, l)}`), eur(k.kinder, l), k.kinder],
          [T(l, `Kinder mit Einkommen × ${eur(P.gebuehr.einbuergerung, l)}`, `Children with income × ${eur(P.gebuehr.einbuergerung, l)}`), eur(k.eigen, l), k.eigen],
          [T(l, `Einbürgerungstest × ${eur(P.test.gebuehr, l)}`, `Citizenship test × ${eur(P.test.gebuehr, l)}`), eur(k.test, l), k.test],
        ],
        note: T(l, 'Nicht enthalten: Sprachprüfung, Übersetzungen, Urkunden und Gebühren des Herkunftsstaats, deren Höhe je nach Anbieter und Land verschieden ist. Bei Ablehnung oder Rücknahme nach Beginn der Bearbeitung fallen mindestens 25 € an, höchstens die volle Gebühr.', 'Not included: the language exam, translations, certificates and fees charged by your country of origin, which vary by provider and country. A refusal or withdrawal after processing has started costs at least €25 and at most the full fee.'),
      };
    },
  };
}

const NEWEG = (l: Lang): Array<{ value: NeWeg; label: string }> => [
  { value: 'allgemein', label: T(l, 'Allgemein (§ 9 AufenthG)', 'General rule (s. 9 AufenthG)') },
  { value: 'blau', label: T(l, 'Blaue Karte EU (§ 18c Abs. 2)', 'EU Blue Card (s. 18c(2))') },
  { value: 'fachkraft', label: T(l, 'Fachkraft (§ 18c Abs. 1)', 'Skilled worker (s. 18c(1))') },
  { value: 'fachkraftInland', label: T(l, 'Fachkraft mit deutschem Abschluss', 'Skilled worker with a German degree or training') },
  { value: 'schutz', label: T(l, 'Asyl oder Flüchtlingsschutz (§ 26 Abs. 3)', 'Asylum or refugee status (s. 26(3))') },
  { value: 'ehegatte', label: T(l, 'Ehegatte eines Deutschen (§ 28 Abs. 2)', 'Spouse of a German (s. 28(2))') },
];
const LEVEL = (l: Lang) => [{ value: 'a1', label: 'A1' }, { value: 'a2', label: 'A2' }, { value: 'b1', label: T(l, 'B1 oder B2', 'B1 or B2') }, { value: 'c1', label: 'C1' }];
function ne(l: Lang, arg?: Args): ToolSpec {
  return {
    inputs: [
      { kind: 'select', id: 'weg', label: T(l, 'Ihr Weg zur Niederlassungserlaubnis', 'Your route to a settlement permit'), def: String(arg?.weg ?? 'allgemein'), options: NEWEG(l), wide: true },
      { id: 'mt', label: T(l, 'Monate mit Aufenthaltstitel', 'Months holding your permit'), def: Number(arg?.mt ?? 40), max: 240, unit: T(l, 'Monate', 'months') },
      { id: 'mb', label: T(l, 'Monate mit Rentenbeiträgen', 'Months of pension contributions'), def: Number(arg?.mb ?? 40), max: 600, unit: T(l, 'Monate', 'months') },
      { kind: 'select', id: 'sp', label: T(l, 'Deutschkenntnisse', 'German level'), def: String(arg?.sp ?? 'b1'), options: LEVEL(l) },
    ],
    run: (v) => {
      const r = niederlassung({ weg: s(v, 'weg') as NeWeg, monateTitel: n(v, 'mt'), monateBeitraege: n(v, 'mb'), deutsch: s(v, 'sp') as 'a1' });
      const rest = Math.max(r.fehlenMonate, r.fehlenBeitraege);
      const rows: ToolOut['rows'] = [
        [T(l, 'Zeit mit Titel: nötig', 'Time holding a permit: required'), `${num(r.monateNoetig, l)} ${T(l, 'Monate', 'months')}`],
        [T(l, 'Rentenbeiträge: nötig', 'Pension contributions: required'), r.beitraegeNoetig ? `${num(r.beitraegeNoetig, l)} ${T(l, 'Monate', 'months')}` : T(l, 'keine feste Zahl', 'no fixed number')],
        [T(l, 'Sprachniveau: nötig', 'Language level: required'), r.sprache.toUpperCase() + (r.spracheOk ? ` · ${T(l, 'erfüllt', 'met')}` : ` · ${T(l, 'fehlt', 'missing')}`)],
        [T(l, 'Gebühr (§ 44 AufenthV)', 'Fee (s. 44 AufenthV)'), eur(r.gebuehr, l)],
      ];
      return {
        label: T(l, 'Niederlassungserlaubnis', 'Settlement permit'),
        value: r.erfuellt ? T(l, 'Fristen erfüllt', 'Periods met') : rest ? T(l, `noch ${num(rest, l)} Monate`, `${num(rest, l)} months to go`) : T(l, 'Sprachnachweis fehlt', 'Language proof missing'),
        sub: rest ? T(l, `Ab heute gerechnet: ${my(addM(HEUTE, rest), l)}`, `Counted from today: ${my(addM(HEUTE, rest), l)}`) : T(l, 'Weitere Bedingungen: gesicherter Lebensunterhalt, Wohnraum, Kenntnisse der Rechts- und Gesellschaftsordnung.', 'Other conditions: secure livelihood, adequate housing, knowledge of the legal and social order.'),
        rows,
        note: T(l, 'Die Fristen stehen im Aufenthaltsgesetz; über den Antrag entscheidet die Ausländerbehörde. Bei Schutzberechtigten zählt die Zeit des Asylverfahrens mit.', 'The periods are set by the Residence Act; the foreigners authority decides. For protected persons the time of the asylum procedure counts.'),
      };
    },
  };
}
const addM = (a: string, k: number) => { const [y, m] = a.split('-').map(Number); const t = y * 12 + m - 1 + k; return ym(Math.floor(t / 12), (t % 12) + 1); };

function blau(l: Lang, arg?: Args): ToolSpec {
  const S = blauSchwellen();
  return {
    inputs: [
      { id: 'g', label: T(l, 'Bruttojahresgehalt laut Vertrag', 'Gross annual salary in the contract'), def: Number(arg?.g ?? 52000), max: 1000000, unit: '€' },
      { kind: 'choice', id: 'eng', label: T(l, 'Engpassberuf oder Abschluss vor höchstens 3 Jahren?', 'Shortage occupation or degree at most 3 years old?'), def: String(arg?.eng ?? 'nein'), options: [{ value: 'ja', label: T(l, 'Ja', 'Yes') }, { value: 'nein', label: T(l, 'Nein', 'No') }] },
    ],
    run: (v) => {
      const g = n(v, 'g'), eng = s(v, 'eng') === 'ja', grenze = eng ? S.engpass : S.regel, diff = g - grenze;
      return {
        label: T(l, `Gehaltsgrenze ${S.jahr}`, `Salary threshold ${S.jahr}`), value: eur(grenze, l, eng ? 2 : 0),
        sub: diff >= 0 ? T(l, `Ihr Gehalt liegt ${eur(diff, l)} darüber.`, `Your salary is ${eur(diff, l)} above it.`) : T(l, `Es fehlen ${eur(-diff, l)} im Jahr.`, `You are ${eur(-diff, l)} a year short.`),
        rows: [
          [T(l, 'Regelgrenze (50 % der Beitragsbemessungsgrenze)', 'Standard threshold (50% of the contribution ceiling)'), eur(S.regel, l)],
          [T(l, 'Engpass und Berufseinsteiger (45,3 %)', 'Shortage and recent graduates (45.3%)'), eur(S.engpass, l, 2)],
          [T(l, 'Pro Monat bei 12 Gehältern', 'Per month over 12 salaries'), eur(grenze / 12, l, 2)],
          [T(l, 'Niederlassungserlaubnis nach', 'Settlement permit after'), T(l, `${num(P.ne.blauMonate, l)} Monaten, mit B1 nach ${num(P.ne.blauMonateB1, l)}`, `${num(P.ne.blauMonate, l)} months, ${num(P.ne.blauMonateB1, l)} with B1`)],
        ],
        note: T(l, `Berechnet nach § 18g AufenthG aus der Beitragsbemessungsgrenze ${S.jahr} der Rentenversicherung (${eur(S.bbg, l)}). Mit der niedrigeren Grenze muss die Bundesagentur für Arbeit zustimmen. Die Werte für ${S.jahr + 1} sind noch nicht veröffentlicht.`, `Computed under s. 18g AufenthG from the ${S.jahr} pension contribution ceiling (${eur(S.bbg, l)}). The lower threshold needs the Federal Employment Agency’s approval. Values for ${S.jahr + 1}: not yet published.`),
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { einb, kosten: kostenSpec, ne, blau };
export const TOOL_KINDS = [...Object.keys(SPECS), 'probe', 'katalog'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, arg);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { monthsBetween };
