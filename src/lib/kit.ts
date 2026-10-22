/**
 * Trousse de rédaction (CONTRIBUTING-SEITEN.md) : tout chiffre écrit dans une page vient d'ici, jamais tapé à la main.
 *   K.P                       paramètres datés (params-2026.json)
 *   K.einbuergerung / K.kosten / K.niederlassung / K.blauSchwellen   moteurs purs (engine/einbuergerung.ts)
 *   K.LAENDER, K.landFragen(code), K.FRAGEN, K.STAND                  catalogue officiel
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 *   K.HEUTE                   mois de lecture des textes (« aujourd'hui » des calculs)
 */
import P from '../data/params-2026.json';
import * as E from './engine/einbuergerung';
import * as Fr from './fragen';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const HEUTE = LAST_UPDATED.slice(0, 7);
export const KIT = { P, ...E, ...Fr, tool: runTool, HEUTE, LESEDATUM: LAST_UPDATED };
export type Kit = typeof KIT;
