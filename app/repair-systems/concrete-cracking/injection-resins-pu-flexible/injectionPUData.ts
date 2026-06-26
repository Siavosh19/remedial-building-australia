// ──────────────────────────────────────────────────────────────────────────────
// Flexible PU Crack-Injection Resins — hand-authored cards (concrete cracking).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated.
// Key discriminators: hydrophobic vs hydrophilic, foam vs gel, and the crack
// condition (wet / actively-leaking vs dormant-damp).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Reactivity", "Foam / gel", "Crack condition", "Components", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const INJECTION_PU_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Injection-111 (+ Injection-111C)",
    shortType: "1-component hydrophobic water-reactive PU foam injection resin",
    badges: [],
    appInfo: kp(["1-component hydrophobic MDI PU", "Water-reactive (foams on water contact)", "Foam (closed-cell)", "Wet / actively-leaking cracks", "1-part + Injection-111C accelerator", "CONFIRM (Sika AU TDS)"]),
    bestFor: [
      "Rapid water cut-off — foams on contact with water to seal actively leaking cracks",
      "Hydrophobic closed-cell foam — durable seal that resists re-wetting/shrinkage better than hydrophilic gels",
      "Reaction speed tunable with the Injection-111C accelerator",
    ],
    avoidWhere: [
      "Structural load transfer across the crack (use a rigid epoxy)",
      "Bone-dry dormant cracks where foam won't activate (introduce water, or use epoxy)",
    ],
    warnings: [
      "Foaming volume/pressure must be controlled — over-injection can damage the section",
      "Confirm the accelerator dose and pack sizes against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika Injection-111 is a one-component, hydrophobic, MDI-based water-reactive polyurethane that foams on contact with water to a durable closed-cell foam, sealing actively leaking cracks. Reaction speed is adjusted with the Injection-111C accelerator. It seals water — it does not restore structural load transfer (use a rigid epoxy for that). CONFIRM accelerator dose and pack sizes against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component hydrophobic MDI PU", source: "aus.sika.com TDS" },
        { label: "Reactivity", value: "Water-reactive (foams on water contact)", source: "aus.sika.com TDS" },
        { label: "Foam / gel", value: "Closed-cell foam", source: "aus.sika.com TDS" },
        { label: "Crack condition", value: "Wet / actively-leaking", source: "aus.sika.com TDS" },
        { label: "Components", value: "1-part + Injection-111C accelerator", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitofill PU130",
    shortType: "Hydrophobic semi-flexible PU injection resin",
    badges: [],
    appInfo: kp(["Hydrophobic semi-flexible PU", "Water-reactive", "Foam / semi-flexible", "Wet / leaking cracks", "CONFIRM (Parchem TDS)", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Hydrophobic semi-flexible seal for actively leaking cracks — tolerates minor movement",
      "Water cut-off in concrete and masonry within the Fosroc Nitofill system",
    ],
    avoidWhere: [
      "Structural load transfer (use a rigid epoxy)",
      "Bone-dry dormant cracks",
    ],
    warnings: [
      "Control foaming pressure/volume during injection",
      "Confirm components, mix and pack sizes against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitofill PU130 is a hydrophobic, semi-flexible water-reactive polyurethane injection resin for sealing actively leaking cracks in concrete and masonry, tolerating minor movement. It seals water rather than restoring structural load transfer. CONFIRM components, mix ratio and pack sizes against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Hydrophobic semi-flexible PU", source: "fosroc.com.au TDS" },
        { label: "Reactivity", value: "Water-reactive", source: "fosroc.com.au TDS" },
        { label: "Foam / gel", value: "Foam / semi-flexible", source: "fosroc.com.au TDS" },
        { label: "Crack condition", value: "Wet / leaking", source: "fosroc.com.au TDS" },
        { label: "Components / pack", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Resfoam 1KM",
    shortType: "1-component water-reactive foaming PU injection resin",
    badges: [],
    appInfo: kp(["1-component PU foam", "Water-reactive (foaming)", "Foam (rapid expansion)", "Wet / actively-leaking cracks & voids", "1-part (+ accelerator — confirm)", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Rapid foaming water cut-off in wet, actively-leaking cracks and voids",
      "Single-component for fast site use",
    ],
    avoidWhere: [
      "Structural load transfer (use a rigid epoxy)",
      "Dry dormant cracks where foam won't activate",
    ],
    warnings: [
      "Rapid expansion — control injection volume/pressure to avoid section damage",
      "Confirm accelerator use and pack sizes against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Resfoam 1KM is a one-component, water-reactive foaming polyurethane injection resin that expands rapidly on contact with water to cut off flow in wet, actively-leaking cracks and voids. It seals water rather than restoring structural load transfer. CONFIRM accelerator use and pack sizes against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component PU foam", source: "mapei.com/au TDS" },
        { label: "Reactivity", value: "Water-reactive (foaming)", source: "mapei.com/au TDS" },
        { label: "Foam / gel", value: "Foam (rapid expansion)", source: "mapei.com/au TDS" },
        { label: "Crack condition", value: "Wet / actively-leaking cracks & voids", source: "mapei.com/au TDS" },
        { label: "Components / pack", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Other / Generic",
    rangeName: "Hydrophilic PU water-stop resin (generic)",
    shortType: "Single-component hydrophilic PU — water-swelling gel seal",
    badges: [],
    appInfo: kp(["Hydrophilic PU (water-swelling)", "Water-reactive (swells / gels)", "Flexible gel", "Permanently/intermittently wet cracks & joints", "1-part (confirm by brand)", "Confirm by brand"]),
    bestFor: [
      "Flexible hydrophilic gel — swells with water to seal moving / intermittently-wet cracks and construction joints",
      "Accommodates more movement than a rigid foam",
    ],
    avoidWhere: [
      "Cracks that dry out fully — a hydrophilic gel can shrink/lose seal on drying (use a hydrophobic foam)",
      "Structural load transfer (use a rigid epoxy)",
    ],
    warnings: [
      "Hydrophilic gels can shrink if the crack dries — confirm suitability for the wet/dry cycle",
      "This is a generic type — confirm the specific proprietary product and its TDS",
    ],
    advanced: {
      description:
        "A hydrophilic polyurethane water-stop resin is a single-component, water-reactive resin that swells/gels on contact with water to seal moving or intermittently-wet cracks and construction joints, accommodating more movement than a rigid foam. Hydrophilic gels can shrink if the crack dries fully — confirm suitability for the wet/dry cycle. This is a generic type; confirm the specific proprietary product and its TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Hydrophilic PU (water-swelling)", source: "generic type — confirm proprietary product" },
        { label: "Reactivity", value: "Water-reactive (swells / gels)", source: "generic type — confirm proprietary product" },
        { label: "Foam / gel", value: "Flexible gel", source: "generic type — confirm proprietary product" },
        { label: "Crack condition", value: "Permanently/intermittently wet cracks & joints", source: "generic type — confirm proprietary product" },
      ],
    },
  },
];
