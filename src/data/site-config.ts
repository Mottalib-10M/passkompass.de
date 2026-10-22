/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://de-einbuergerung.example";
export const SITE_NAMES: Record<string, string> = {"de": "Passkompass", "en": "Passkompass", "tr": "Passkompass", "ar": "Passkompass"};
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE", "tr": "tr-DE", "ar": "ar-DE"};
/** Locale des nombres et des dates : anglais britannique pour la version anglaise (« €255 »), chiffres latins en arabe. */
export const NUM_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-GB", "tr": "tr-TR", "ar": "ar-u-nu-latn"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB", "tr": "tr_TR", "ar": "ar_AR"};
export const LOCALE_TAG = 'de-DE';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-22';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Herausgeber eines unabhängigen Übungstests zum Einbürgerungstest und eines Rechners für den frühesten Einbürgerungsantrag", "en": "Publisher of an independent practice tool for the German citizenship test and naturalisation timeline", "tr": "Alman vatandaşlık testi için bağımsız bir alıştırma aracının ve vatandaşlık başvuru tarihi hesaplayıcısının yayıncısı", "ar": "ناشر أداة تدريب مستقلة على اختبار الجنسية الألمانية وحاسبة لموعد طلب التجنس"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners ist ein unabhängiger Herausgeber. Für Passkompass übernimmt es die 310 Prüfungsfragen aus Anlage 1 der Einbürgerungstestverordnung, ermittelt jede Lösung selbst an Grundgesetz, Landesverfassungen und amtlichen Angaben und rechnet Fristen und Gebühren nach dem Staatsangehörigkeitsgesetz und dem Aufenthaltsgesetz in der Fassung vom Oktober 2026. Radif Partners ist keine Behörde, nimmt keine Anträge an und berät nicht rechtlich.", "en": "Radif Partners is an independent publisher. For Passkompass it takes the 310 test questions from annex 1 of the German citizenship test ordinance, works out every answer from the Basic Law, state constitutions and official records, and computes deadlines and fees from the Nationality Act and the Residence Act as they stand in October 2026. It is not an authority, takes no applications and gives no legal advice.", "tr": "Radif Partners bağımsız bir yayıncıdır. Passkompass için Vatandaşlık Testi Yönetmeliği ek 1’deki 310 soruyu kullanır, her cevabı Anayasa, eyalet anayasaları ve resmî kayıtlardan kendisi belirler ve süreleri ve harçları Ekim 2026 itibarıyla geçerli Vatandaşlık Kanunu ile İkamet Kanunu’na göre hesaplar. Bir makam değildir, başvuru kabul etmez ve hukuki danışmanlık vermez.", "ar": "Radif Partners ناشر مستقل. يعتمد Passkompass على أسئلة الاختبار الـ310 الواردة في الملحق 1 من لائحة اختبار التجنس، ويحدد كل إجابة بنفسه استنادًا إلى القانون الأساسي ودساتير الولايات والمصادر الرسمية، ويحسب المهل والرسوم وفق قانون الجنسية وقانون الإقامة بصيغتهما في أكتوبر 2026. ليس جهة رسمية، ولا يستقبل طلبات، ولا يقدم استشارات قانونية."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Einbürgerungstest und Test „Leben in Deutschland“", "Einbürgerung nach § 10 Staatsangehörigkeitsgesetz", "Einbürgerung von Ehegatten Deutscher nach § 9 StAG", "Niederlassungserlaubnis nach dem Aufenthaltsgesetz", "Gebühren nach § 38 StAG"], "en": ["German citizenship test", "Naturalisation in Germany", "Permanent residence in Germany"], "tr": ["Alman vatandaşlık testi", "Almanya’da vatandaşlığa geçiş"], "ar": ["اختبار الجنسية الألمانية", "التجنس في ألمانيا"]};
export const CONTACT_EMAIL = "kontakt@de-einbuergerung.example";
export const THEME_COLOR = '#8C1D18';
export const LOGO_SYMBOL = 'EB';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = 'db2ef7ecc89fb3dc56588aa764d7dc23';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein (check-legal échoue sinon, contournement signalé)

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
