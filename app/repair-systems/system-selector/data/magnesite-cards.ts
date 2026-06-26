// ─────────────────────────────────────────────────────────────────────────────
// System Selector — magnesite card assembly.
//
// Pulls the EXACT library card arrays for the three magnesite stages and returns
// them ordered for display (confirmed leading product first per the answers).
// Unconfirmed primers get a visible "CONFIRM TDS" badge — on display copies only,
// the shared reference data file is left untouched.
// ─────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";
import { MS_CARDS } from "../../magnesite-flooring-deterioration/moisture-suppression-primers/moistureSuppressionData";
import { FLOOR_PATCHING_CARDS } from "../../magnesite-flooring-deterioration/floor-patching-compounds/floorPatchingData";
import { SELF_LEVELLING_CARDS } from "../../magnesite-flooring-deterioration/self-levelling-underlayments/selfLevellingData";

// Primers without a confirmed AU TDS — flagged in the carousel, never leading.
const UNCONFIRMED_PRIMERS = new Set(["Mapei Mapeproof Primer", "Mapei Triblock P", "Ardex WPM 300"]);
const withConfirmBadge = (c: RefCard): RefCard =>
  UNCONFIRMED_PRIMERS.has(c.rangeName)
    ? { ...c, badges: [{ label: "CONFIRM TDS", tone: "navy" as const }, ...c.badges] }
    : c;

// Move the named card to the front, preserving the order of the remaining cards.
function lead(cards: RefCard[], leadName: string): RefCard[] {
  const i = cards.findIndex((c) => c.rangeName === leadName);
  if (i < 0) return cards;
  return [cards[i], ...cards.slice(0, i), ...cards.slice(i + 1)];
}

// STAGE 1 — moisture-suppression primers. Confirmed product leads by moisture;
// the three unconfirmed primers follow with a CONFIRM TDS badge.
export function moisturePrimerLead(moisture_level: string): string {
  return moisture_level === "high" ? "Ardex MC Rapid" : "Sika Primer MB";
}
export function moisturePrimerCards(moisture_level: string): RefCard[] {
  return lead(MS_CARDS.map(withConfirmBadge), moisturePrimerLead(moisture_level));
}

// STAGE 2 — floor patching compounds. Lead by condition:
//   localised        → Ardex A 45 (heavy-bodied — fills isolated deeper voids/craters)
//   full / widespread → Ardex Feather Finish (feather-edge skim for widespread surface prep)
//   stable-uneven    → Ardex Feather Finish (else branch)
export function floorPatchingLead(magnesite_condition: string): string {
  return magnesite_condition === "localised" ? "Ardex A 45" : "Ardex Feather Finish";
}
export function floorPatchingCards(magnesite_condition: string): RefCard[] {
  return lead(FLOOR_PATCHING_CARDS, floorPatchingLead(magnesite_condition));
}

// STAGE 3 — self-levelling underlayments. Fixed order (K 15 Microtec leads).
export const SELF_LEVELLING_LEAD = "Ardex K 15 Microtec";
export const selfLevellingCards: RefCard[] = SELF_LEVELLING_CARDS;
