/** Toutes les pages prévues (id = nom du fichier de src/content/guides, ou id d'une page du tableau laender.ts).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction ; « toutes les pages existent » échoue tant qu'il en manque. */
export const LAND_IDS = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'].map((c) => `land-${c.toLowerCase()}`);
export const PLANNED_GUIDES = [
  'fragenkatalog', 'test-anmelden', 'leben-in-deutschland',
  ...LAND_IDS,
  'voraussetzungen', 'kosten', 'beantragen', 'doppelte-staatsbuergerschaft', 'ehepartner', 'kinder', 'sprachnachweis', 'staatsangehoerigkeitsausweis',
  'niederlassungserlaubnis', 'blaue-karte',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
