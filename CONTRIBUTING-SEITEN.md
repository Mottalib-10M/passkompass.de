# Ajouter ou étoffer une page de Passkompass (Einbürgerung)

Notice pour les agents qui prolongent le site. Lisez-la en entier avant d'écrire une ligne, avec `~/Documents/GitHub/RECETTE-SITE.md` : §0, §3, §6, §7, §9.3, §11, §21 et §26.

## Principe

Une page = **un fichier** dans `src/content/guides/<id>.ts`. L'`id` est le nom du fichier : le registre `src/lib/pages.ts` refuse tout écart.

Le fichier porte tout, en allemand (`de`) et en anglais (`en`) :

- slug, titres, description ;
- H1, chapeau, bloc citable, FAQ, corps ;
- sources, mini-simulateur, pages liées.

Seule `voraussetzungen.ts` a aussi une version turque (`tr`) et arabe (`ar`). Ces deux langues ne couvrent que l'accueil et cette page, celles qui pèsent.

Le cœur du site lit ces fichiers seul : routes (`src/i18n/routes.ts`), menus (`src/i18n/nav.ts`), sitemap, hreflang et schémas. **Ne modifiez aucun fichier du cœur pour ajouter une page.**

Les 16 pages des Länder sortent d'un seul fichier, `laender.ts`. La liste des dix questions du Land est générée ; la prose de chaque Land (`TX`) est écrite à la main, et une nouvelle prose ne copie jamais celle d'un autre Land.

## Les données

| Fichier | Contenu | Origine |
|---|---|---|
| `src/data/fragen.json` | 310 questions officielles (300 générales + 10 par Land), 4 réponses, solution `a`, traduction anglaise `e`, description des images `b`/`n` | Gesamtfragenkatalog du BAMF, Stand 07.05.2025 (œuvre officielle, § 5 UrhG). **Les solutions sont établies par Radif Partners** : le BAMF ne publie pas de corrigé |
| `src/data/params-2026.json` | Délais StAG, test (33 questions, 17 pour réussir, 60 min, 25 €), frais § 38 StAG, Niederlassungserlaubnis, Blaue Karte (BBG 2026), **sources** | à la main, chaque valeur relue sur sa source (`retrieved_at`) |
| `src/data/quellen-stand.json` | Empreintes des sources officielles et date de la dernière relecture | **généré** par `scripts/update-data.py` |

Points connus :

- **Questions 72 et 73** (chancelier, groupes du Bundestag) : l'Anlage 1 EinbTestV publiée sur gesetze-im-internet.de est plus ancienne que le PDF du BAMF. Le site reprend le PDF du BAMF, sur lequel on passe l'examen, et le dit sur `/de/einbuergerungstest-fragen/`.
- **Questions à image** (42 marquées `b`) : les images du BAMF ne sont pas reprises. Une phrase dit ce que montre l'image (`n`, ou la mention générique).
- **Non publiés** : les autorités ne publient aucun délai de traitement uniforme, et le prix d'un examen de langue B1 dépend du prestataire (de même que les frais de passeport ou de traduction du pays d'origine). Le site ne les chiffre pas et le dit. Il ne donne que la taxe officielle du test (25 €, EinbTestV) et les frais du § 38 StAG.

## Mise à jour

1. Chaque lundi, `.github/workflows/update-data.yml` lance `python3 scripts/update-data.py` (dépendance : `pip install pypdf`).
2. Si rien n'a changé, le script avance `geprueft_am` et le site est rebâti.
3. Si une source a changé, le script sort avec le code 2 et le workflow ouvre une issue. Lisez alors le nouveau texte et corrigez à la main `fragen.json` ou `params-2026.json`. Relancez `npx vitest run` et tous les contrôles, puis `python3 scripts/update-data.py --init` pour prendre le nouvel état comme référence.
4. Au 1er janvier, créez `params-<année>.json` : nouvelle Beitragsbemessungsgrenze de la DRV pour la Blaue Karte, et frais à relire.

## Le moteur

| Fichier | Rôle |
|---|---|
| `src/lib/engine/einbuergerung.ts` | Date de dépôt possible (5 ans, 3 ans pour le conjoint, absences > 6 mois, conditions du § 10 StAG), Niederlassungserlaubnis, seuils de la Blaue Karte |
| `src/lib/fragen.ts` | Catalogue, liste des Länder, tirage de l'examen blanc (30 + 3, générateur déterministe : même graine, même tirage) |
| `src/lib/tool-specs.ts`, `src/lib/mini-targets.ts` | Champs des simulateurs et mini-simulateurs (4 langues par `T(l, de, en, tr, ar)`) |
| `src/components/calc/Trainer.tsx` | Entraîneur des 310 questions et examen blanc |

Tests : `tests/engine.test.ts` (délais lus dans le StAG, tirage, catalogue : 4 réponses, une seule juste) et `tests/pages.test.ts` (forme des pages : snippets, FAQ de 40 à 90 mots dans chaque langue, unicité).

## Règles propres à ce site

- **Aucune autorité.** Le site ne se présente jamais comme le BAMF ni comme une Einbürgerungsbehörde. Il ne reprend aucun logo, aucune armoirie d'État ni aucune image du BAMF.
- **Pas de conseil juridique individuel**, aucun lien vers un avocat ou une école de langue.
- **Arabe** (`dir="rtl"`) : les champs utilisent des propriétés logiques (`ps-`, `pe-`, `end-`), jamais `pl-`/`pr-`/`right-`. Les chiffres restent latins (`ar-u-nu-latn`).
- **Mots allemands très longs** (`Staatsangehörigkeitsausweis`, `Beitragsbemessungsgrenze`) : laissez `hyphens-auto` et `overflow-wrap:anywhere` sur les cellules et les liens, sinon la page déborde à 360 px.
- **Contrôles hors trame** : `scripts/check-trame.py` porte un ajout local, la reconnaissance du disclaimer turc (« danışmanlık değildir »), absente de `_trame/`.
- **Pages légales** : `gen-legal-pages.py` ne gère que `de` et `en`. Il n'y a pas de pages légales en turc ni en arabe ; le pied de page de ces langues renvoie aux pages allemandes. Les libellés de ces liens sont dans la langue de la page et précisent « (Almanca) » / « (بالألمانية) ». `check-cookies.py` exige des pages légales dans toute langue qui sert 3 pages ou plus : turc et arabe restent donc à 2 pages (accueil + `voraussetzungen.ts`) tant que la trame ne génère pas de pages légales tr/ar.
