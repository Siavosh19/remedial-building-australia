// ─────────────────────────────────────────────────────────────────────────────
// System Selector — Magnesite flooring deterioration engine
//
// 4-step flow → a 3-stage encapsulation system. Moisture-suppression primer and
// self-levelling underlayment are ALWAYS output; floor patching is conditional on
// the magnesite condition. A structural-damage answer raises a flagged advisory
// (before any stage). Surface-prep / grinding / abrasives are never output.
// Card lists per stage are pulled live from the library data (no invention).
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Question, Demand, SelectorOutput, SelectorCategory, ProductResult, StageResult, Advisory, AiStage1,
} from "./selector-core";
import type { RefCard } from "../../_components/ProductSpecCardV2";
import {
  moisturePrimerCards, moisturePrimerLead,
  floorPatchingCards, floorPatchingLead,
  selfLevellingCards, SELF_LEVELLING_LEAD,
} from "./magnesite-cards";

export const MAG_QUESTIONS: Question[] = [
  {
    key: "magnesite_condition",
    prompt: "What is the condition of the magnesite?",
    help: "Assess the overall floor, not just visible problem areas.",
    options: [
      { value: "full-deterioration", label: "Soft / crumbling throughout", hint: "Widespread deterioration — full encapsulation system required" },
      { value: "localised", label: "Localised deterioration", hint: "Isolated soft or hollow patches — spot repair then overlay" },
      { value: "stable-uneven", label: "Stable but uneven", hint: "Sound magnesite — levelling only, no significant patching" },
    ],
  },
  {
    key: "moisture_level",
    prompt: "What is the moisture level of the substrate?",
    help: "Test with a Tramex or CM meter before specifying primer.",
    options: [
      { value: "high", label: "High moisture", hint: "Elevated RH or active vapour — two-part epoxy DPM primer required" },
      { value: "moderate", label: "Moderate moisture", hint: "Measurable but within standard range" },
      { value: "low", label: "Low / dry", hint: "Within acceptable range for standard primer" },
    ],
  },
  {
    key: "floor_finish",
    prompt: "What is the intended floor finish?",
    help: "The finish affects the required SLC surface tolerance.",
    options: [
      { value: "tiles", label: "Tiles (ceramic, porcelain or stone)", pillLabel: "Tiles", hint: "Tile adhesive bed over SLC" },
      { value: "timber-vinyl-carpet", label: "Timber, vinyl or carpet", pillLabel: "Timber / vinyl / carpet", hint: "Direct fix or floating over SLC" },
      { value: "slc-exposed", label: "Exposed SLC / painted finish", pillLabel: "Exposed SLC", hint: "SLC is the final visible surface" },
    ],
  },
  {
    key: "structural_damage",
    prompt: "Is there structural damage to the concrete slab beneath the magnesite?",
    help: "Lift a test area if condition is unknown.",
    options: [
      { value: "yes", label: "Yes — concrete slab is cracked or damaged", pillLabel: "Slab damaged — engineer required", hint: "Structural repair to concrete required before magnesite treatment — refer to structural engineer" },
      { value: "no", label: "No — concrete slab is sound", pillLabel: "Slab sound", hint: "Magnesite treatment only" },
    ],
  },
];

const EMPTY_STAGE1: AiStage1 = { headers: [], rows: [], json: { category: "", stage1_gates: {} } };

const magCat = (slug: string, displayName: string): SelectorCategory => ({
  slug,
  displayName,
  repairStage: slug,
  href: `/repair-systems/magnesite-flooring-deterioration/${slug}`,
  stage1: EMPTY_STAGE1,
  stage2: {},
});

const magProd = (name: string): ProductResult => ({
  name, id: name, selectable: true, dataStatus: "confirmed", score: 0, matchedGates: [], failedGates: [], source: "AU manufacturer TDS",
});

const stage = (key: string, label: string, category: SelectorCategory, product: ProductResult, cardNote: string, cards: RefCard[]): StageResult => ({
  stage: key,
  label,
  passingCategories: [],
  alternativeCategories: [],
  recommended: { category, product, why: [] },
  options: [],
  cardNote,
  cards,
});

export function runSelectorMag(d: Demand): SelectorOutput {
  const stages: StageResult[] = [];

  // ── STAGE 1 — MOISTURE SUPPRESSION PRIMER (always) ──
  stages.push(stage(
    "moisture-primer",
    "Moisture suppression primer",
    magCat("moisture-suppression-primers", "Moisture Suppression Primers"),
    magProd(moisturePrimerLead(d.moisture_level)),
    "Substrate moisture must be tested (ASTM F2170 or Tramex) before primer selection. Two-part epoxy primers are mandatory on all magnesite substrates regardless of moisture reading.",
    moisturePrimerCards(d.moisture_level),
  ));

  // ── STAGE 2 — FLOOR PATCHING COMPOUND (skip when stable-uneven) ──
  if (d.magnesite_condition === "full-deterioration" || d.magnesite_condition === "localised") {
    stages.push(stage(
      "floor-patching",
      "Floor patching compound",
      magCat("floor-patching-compounds", "Floor Patching Compounds"),
      magProd(floorPatchingLead(d.magnesite_condition)),
      "Apply over moisture primer after primer has fully cured. Do not apply patching compound directly to unprimed magnesite.",
      floorPatchingCards(d.magnesite_condition),
    ));
  }

  // ── STAGE 3 — SELF-LEVELLING UNDERLAYMENT (always, final) ──
  stages.push(stage(
    "self-levelling",
    "Self-levelling underlayment",
    magCat("self-levelling-underlayments", "Self-Levelling Underlayments"),
    magProd(SELF_LEVELLING_LEAD),
    "Do not apply SLC without the correct moisture suppression primer. Confirm minimum primer cure time before pouring.",
    selfLevellingCards,
  ));

  // ── ADVISORY — structural slab damage (rendered before Stage 1) ──
  const advisories: Advisory[] = [];
  if (d.structural_damage === "yes") {
    advisories.push({
      severity: "critical",
      title: "Structural repair required first",
      body: "Cracking or damage to the concrete slab beneath the magnesite must be assessed and repaired by a structural engineer before any magnesite encapsulation or levelling works commence. Applying moisture primer and SLC over a cracked or structurally compromised slab will not address the underlying defect and may fail. Refer to the Concrete Spalling or Concrete Cracking repair systems as appropriate.",
    });
  }

  return { stages, advisories };
}
