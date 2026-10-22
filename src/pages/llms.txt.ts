/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route, hasRoute } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const P = K.P;
  const lines = [
    `# ${SITE_NAMES.de}`, '',
    `> German citizenship test (Einbürgerungstest / Leben in Deutschland) and naturalisation in Germany, in German and English, with Turkish and Arabic versions of the key pages. All ${P.katalog.fragen} questions of BAMF's official catalogue (version of ${P.katalog.stand}) with answers worked out by the publisher (BAMF publishes no key) and an English translation; a ${P.test.fragen}-question mock exam for each of the 16 federal states (${P.test.bestehen} correct to pass); a calculator for the earliest month to apply under section 10 or 9 of the Nationality Act (StAG) as in force on ${P.retrieved_at}, after the repeal of the three-year route; fees under section 38 StAG (${P.gebuehr.einbuergerung} EUR per adult, ${P.gebuehr.kind} EUR per child); settlement permit periods and EU Blue Card salary thresholds ${P.blau.jahr}. Images of the catalogue are described in words, not reproduced. Independent site published by Radif Partners, not affiliated with BAMF; not legal advice. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.de}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.de.nav}](${SITE_URL}${route(p.id, 'de')}): ${p.de.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
      ...(['tr', 'ar'] as const).filter((l) => p[l] && hasRoute(p.id, l)).map((l) => `- [${p[l]!.nav}](${SITE_URL}${route(p.id, l)}): ${p[l]!.card}`),
    ]), '']),
    '## About', `- [Methode](${SITE_URL}${route('method', 'de')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Über uns](${SITE_URL}${route('about', 'de')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
