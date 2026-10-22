import type { Locale } from './routes';
const de = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionsgrundsätze', contactLabel: 'Kontakt', reviewedBy: 'Erstellt von',
  skipToContent: 'Zum Inhalt springen', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumen', breadcrumbHome: 'Start', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Weiter mit', sourcesTitle: 'Amtliche Quellen dieser Seite', writtenBy: 'Erstellt von',
  asOf: 'Stand', lastUpdated: 'Gesetze und Fragenkatalog geprüft am', footerValidated: 'Quellen: Fragenkatalog des BAMF (Stand 7. Mai 2025), Staatsangehörigkeitsgesetz und Aufenthaltsgesetz auf gesetze-im-internet.de',
  footerBrowser: 'Alles läuft in Ihrem Browser · kein Konto, keine E-Mail, keine Anmeldung',
  footerDisclaimer: 'Unabhängige Seite von Radif Partners, ohne Verbindung zum BAMF, zu einer Einbürgerungsbehörde oder einer anderen Stelle. Die Lösungen hat Radif Partners ermittelt; maßgeblich sind der amtliche Fragenkatalog und die Entscheidung der Behörde. Die Seite ersetzt keine Rechtsberatung.',
  footerPopular: 'Einbürgerungstest nach Bundesland',
  notFound: 'Unter dieser Adresse gibt es keine Seite. Auf der Startseite finden Sie die Probeprüfung mit 33 Fragen und den Rechner für den frühesten Einbürgerungsantrag.',
  readMore: 'Weiterlesen',
  moreOptions: 'Weitere Angaben', copyLink: 'Link kopieren', copied: 'Link kopiert', print: 'Drucken', howComputed: 'So wird gerechnet', openFull: 'Zum vollständigen Rechner',
};
const en: typeof de = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Prepared by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Keep going', sourcesTitle: 'Official sources for this page', writtenBy: 'Prepared by',
  asOf: 'As of', lastUpdated: 'laws and question catalogue checked on', footerValidated: 'Sources: BAMF question catalogue (7 May 2025), Nationality Act and Residence Act on gesetze-im-internet.de',
  footerBrowser: 'Everything runs in your browser · no account, no email, no sign-up',
  footerDisclaimer: 'Independent site published by Radif Partners, not affiliated with BAMF, any naturalisation authority or any other public body. Answers were worked out by Radif Partners; the official catalogue and the authority’s decision prevail. Not legal advice.',
  footerPopular: 'Citizenship test by federal state',
  notFound: 'Nothing lives at this address. The home page has the 33-question mock test and the calculator for your earliest naturalisation application.',
  readMore: 'Read more',
  moreOptions: 'More details', copyLink: 'Copy share link', copied: 'Link copied', print: 'Print', howComputed: 'How this is computed', openFull: 'Open the full calculator',
};
const tr: typeof de = {
  updatedOn: 'Kontrol tarihi', editorialPolicy: 'Yayın ilkeleri (Almanca)', contactLabel: 'İletişim (Almanca)', reviewedBy: 'Hazırlayan',
  skipToContent: 'İçeriğe geç', mainNav: 'Ana menü', breadcrumbLabel: 'Sayfa yolu', breadcrumbHome: 'Ana sayfa', menuOpen: 'Menüyü aç',
  faqTitle: 'Sık sorulan sorular', relatedCalculators: 'Devam edin', sourcesTitle: 'Bu sayfanın resmî kaynakları', writtenBy: 'Hazırlayan',
  asOf: 'Durum', lastUpdated: 'kanunlar ve soru kataloğu kontrol tarihi', footerValidated: 'Kaynaklar: BAMF soru kataloğu (7 Mayıs 2025), gesetze-im-internet.de’deki Vatandaşlık Kanunu ve İkamet Kanunu',
  footerBrowser: 'Her şey tarayıcınızda çalışır · hesap yok, e-posta yok, kayıt yok',
  footerDisclaimer: 'Radif Partners tarafından yayımlanan bağımsız site; BAMF, vatandaşlık makamları veya başka bir resmî kurumla bağlantısı yoktur. Cevapları Radif Partners belirlemiştir; geçerli olan resmî katalog ve makamın kararıdır. Hukuki danışmanlık değildir.',
  footerPopular: 'Eyaletlere göre vatandaşlık testi',
  notFound: 'Bu adreste sayfa yok. Ana sayfada 33 soruluk deneme sınavı ve en erken vatandaşlık başvuru tarihini hesaplayan araç var.',
  readMore: 'Devamını oku',
  moreOptions: 'Diğer bilgiler', copyLink: 'Bağlantıyı kopyala', copied: 'Bağlantı kopyalandı', print: 'Yazdır', howComputed: 'Hesaplama yöntemi', openFull: 'Tam hesaplayıcıyı aç',
};
const ar: typeof de = {
  updatedOn: 'تاريخ المراجعة', editorialPolicy: 'السياسة التحريرية (بالألمانية)', contactLabel: 'اتصل بنا (بالألمانية)', reviewedBy: 'إعداد',
  skipToContent: 'انتقل إلى المحتوى', mainNav: 'القائمة الرئيسية', breadcrumbLabel: 'مسار الصفحة', breadcrumbHome: 'الرئيسية', menuOpen: 'فتح القائمة',
  faqTitle: 'أسئلة شائعة', relatedCalculators: 'تابع', sourcesTitle: 'المصادر الرسمية لهذه الصفحة', writtenBy: 'إعداد',
  asOf: 'الوضع في', lastUpdated: 'تمت مراجعة القوانين وكتالوج الأسئلة في', footerValidated: 'المصادر: كتالوج أسئلة BAMF (7 مايو 2025)، وقانون الجنسية وقانون الإقامة على gesetze-im-internet.de',
  footerBrowser: 'كل شيء يعمل في متصفحك · بلا حساب ولا بريد إلكتروني ولا تسجيل',
  footerDisclaimer: 'موقع مستقل تنشره Radif Partners، لا صلة له بـ BAMF ولا بأي سلطة تجنس أو جهة رسمية أخرى. حددت Radif Partners الإجابات؛ والمرجع هو الكتالوج الرسمي وقرار السلطة. المعلومات إرشادية وليست استشارة قانونية.',
  footerPopular: 'اختبار الجنسية حسب الولاية',
  notFound: 'لا توجد صفحة بهذا العنوان. في الصفحة الرئيسية تجد الاختبار التجريبي من 33 سؤالًا وحاسبة أقرب موعد لطلب التجنس.',
  readMore: 'اقرأ المزيد',
  moreOptions: 'معلومات إضافية', copyLink: 'نسخ الرابط', copied: 'تم نسخ الرابط', print: 'طباعة', howComputed: 'طريقة الحساب', openFull: 'افتح الحاسبة الكاملة',
};
const ALL = { de, en, tr, ar };
export function t(lang: Locale) { return ALL[lang] ?? de; }
