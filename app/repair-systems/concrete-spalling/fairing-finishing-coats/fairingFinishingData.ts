// ──────────────────────────────────────────────────────────────────────────────
// Fairing & Finishing Coats — hand-authored selection cards (concrete spalling).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source. These are cosmetic finishing layers — not structural.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Max thickness", "Components", "Finish / overcoat", "Application", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const FAIRING_FINISHING_CARDS: RefCard[] = [
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Renderoc FC",
    shortType: "Cementitious fairing coat (≤3 mm) for a fair-faced finish",
    badges: [],
    appInfo: kp(["Cementitious fairing coat", "≤3 mm per layer", "Pre-bagged (1-part)", "Fair-faced; overcoatable", "Trowel / sponge", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Thin fair-faced fairing (≤3 mm) — fills blowholes and form-face texture over a completed repair",
      "Smooth, overcoatable surface ready for a protective/decorative coating",
      "Part of the Fosroc Renderoc repair system",
    ],
    avoidWhere: [
      "Non-structural — apply only over a sound, completed structural repair",
      "Not for building depth — ≤3 mm per layer",
      "Over an unsound or hollow substrate",
    ],
    warnings: [
      "Cosmetic only — not a repair mortar; do not use to reinstate section",
      "Confirm overcoat compatibility, window and pack size against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Renderoc FC is a cementitious fairing coat applied in thin layers up to 3 mm to produce a fair-faced finish on concrete or masonry — filling blowholes and form-face texture over a completed structural repair before a protective coating. Non-structural. CONFIRM overcoat window and pack size against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious fairing coat", source: "fosroc.com.au TDS" },
        { label: "Max thickness", value: "≤3 mm per layer", source: "fosroc.com.au TDS" },
        { label: "Components", value: "Pre-bagged (1-part)", source: "fosroc.com.au TDS" },
        { label: "Finish / overcoat", value: "Fair-faced; overcoatable", source: "fosroc.com.au TDS" },
        { label: "Application", value: "Trowel / sponge", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapefinish",
    shortType: "Two-component cementitious fairing / finishing coat",
    badges: [],
    appInfo: kp(["2-component cementitious", "CONFIRM (Mapei AU TDS) — thin section", "2-component (A+B)", "Smooth fair-faced; overcoatable", "Trowel / sponge", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Two-component skim — a smooth, fair-faced finish over repaired or sound concrete",
      "Levels and profiles surfaces ahead of a protective/decorative coating",
    ],
    avoidWhere: [
      "Non-structural finishing coat — not a repair mortar",
      "Thin-section only — confirm the maximum thickness per layer",
      "Over an unsound substrate",
    ],
    warnings: [
      "Cosmetic only — over a sound, completed repair",
      "Confirm maximum thickness, overcoat window and pack size against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapefinish is a two-component cementitious fairing / finishing coat for skimming concrete to a smooth, fair-faced finish over a completed repair or sound substrate, ahead of a protective or decorative coating. Non-structural. CONFIRM maximum thickness, overcoat window and pack size against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Two-component cementitious fairing/finishing", source: "mapei.com/au TDS" },
        { label: "Max thickness", value: "CONFIRM (Mapei AU TDS) — thin section", source: "mapei.com/au TDS" },
        { label: "Components", value: "2-component (A powder + B latex)", source: "mapei.com/au TDS" },
        { label: "Finish / overcoat", value: "Smooth fair-faced; overcoatable", source: "mapei.com/au TDS" },
        { label: "Application", value: "Trowel / sponge", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Westox",
    rangeName: "Westox Plastalite Fairing Coat Part A 15kg",
    shortType: "Cementitious fairing coat for surface profiling after repair",
    badges: [],
    appInfo: kp(["Cementitious fairing coat", "Thin-section (bug holes / profiling)", "Part A (15 kg) + modifier — confirm", "Fair-faced", "Trowel / sponge", "15 kg (Part A)"]),
    bestFor: [
      "Australian-made fairing coat — surface profiling and texture restoration after concrete repair",
      "Fills minor surface imperfections to a fair-faced finish",
    ],
    avoidWhere: [
      "Non-structural — cosmetic profiling only, over a sound repair",
      "Confirm whether the Part B modifier is required for the intended use",
      "Over an unsound substrate",
    ],
    warnings: [
      "Cosmetic only — not a repair mortar",
      "Confirm bond strength, maximum thickness, components and overcoat window with Westox technical",
    ],
    advanced: {
      description:
        "Westox Plastalite Fairing Coat is an Australian-made cementitious fairing coat for surface profiling and texture restoration over completed concrete repairs, producing a fair-faced finish. Supplied as Part A (15 kg). Non-structural. CONFIRM bond strength, maximum thickness, component requirement (Part B modifier) and overcoat window against the current Westox TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious fairing coat", source: "westox.com TDS" },
        { label: "Max thickness", value: "Thin-section (bug holes / profiling)", source: "westox.com TDS" },
        { label: "Components", value: "Part A (15 kg) + modifier — confirm", source: "westox.com TDS" },
        { label: "Finish / overcoat", value: "Fair-faced", source: "westox.com TDS" },
        { label: "Application", value: "Trowel / sponge", source: "westox.com TDS" },
        { label: "Pack size", value: "15 kg (Part A)", source: "westox.com TDS" },
      ],
    },
  },
];
