// ──────────────────────────────────────────────────────────────────────────────
// Micro-Concrete — hand-authored selection cards (concrete spalling).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["EN 1504-3 class", "Compressive @28d", "Section thickness", "Consistency", "Shrinkage", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const MICRO_CONCRETE_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika MonoTop-436N",
    shortType: "Pourable self-compacting R4 micro-concrete repair mortar",
    badges: [],
    appInfo: kp(["R4", "≥45 MPa (R4 minimum) — tested value CONFIRM", "20–300 mm (one pour, formwork)", "Pourable, self-compacting (no vibration)", "Low-shrink (confirm)", "20 kg"]),
    bestFor: [
      "Deep-section reinstatement 20–300 mm placed in a single formed pour (columns, beams, large patches)",
      "Self-compacting — flows into congested reinforcement without vibration",
      "EN 1504-3 R4 structural, low-permeability repair",
    ],
    avoidWhere: [
      "Thin or feather-edge sections — needs a minimum section and formwork",
      "Hand-trowelled vertical/overhead work without formwork (use a thixotropic mortar)",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Requires formwork for the pour — confirm minimum section and formwork detail per the TDS",
      "Cure per AS 3600 / the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika MonoTop-436N is a one-component, pourable, self-compacting EN 1504-3 R4 micro-concrete for deep-section reinstatement (20–300 mm in a single pour into formwork) that flows into congested reinforcement without vibration. R4 implies a ≥45 MPa minimum; CONFIRM the tested @28d compressive strength against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "R4", source: "aus.sika.com TDS" },
        { label: "Compressive @28d", value: "≥45 MPa (R4 minimum) — tested value CONFIRM", source: "aus.sika.com TDS" },
        { label: "Section thickness", value: "20–300 mm in one pour (formwork)", source: "aus.sika.com TDS" },
        { label: "Consistency", value: "Pourable, self-compacting (no vibration)", source: "aus.sika.com TDS" },
        { label: "Shrinkage", value: "Low-shrink (confirm class)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "20 kg", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapefill MC 06",
    shortType: "Shrinkage-compensated super-flow micro-concrete (75 MPa)",
    badges: [],
    appInfo: kp(["R4 (confirm class)", "75 MPa", "50–250 mm (formed)", "Super-flow / self-compacting (no vibration)", "Shrinkage-compensated", "25 kg"]),
    bestFor: [
      "High strength — 75 MPa @28d, the strongest micro-concrete in this group",
      "Deep-section grouting / reinstatement 50–250 mm placed by formed pour",
      "Shrinkage-compensated super-flow — full contact and load transfer without vibration",
    ],
    avoidWhere: [
      "Thin sections below ~50 mm — use a trowel-grade mortar",
      "Hand-applied vertical/overhead work without formwork",
      "Not over active or moving cracks",
    ],
    warnings: [
      "Pot life ~60 minutes — mix only what can be placed in that time",
      "Confirm EN 1504-3 class and water ratio against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapefill MC 06 is a shrinkage-compensated, super-flow micro-concrete for filling and reinstating sections from 50 to 250 mm, achieving ~75 MPa compressive strength at 28 days with a ~60 minute pot life. Self-compacting (no vibration) with high adhesion to existing concrete. CONFIRM the EN 1504-3 class and water ratio against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "EN 1504-3 class", value: "R4 (confirm class on AU TDS)", source: "mapei.com/au TDS" },
        { label: "Compressive @28d", value: "75 MPa", source: "mapei.com/au TDS" },
        { label: "Section thickness", value: "50–250 mm (formed)", source: "mapei.com/au TDS" },
        { label: "Consistency", value: "Super-flow / self-compacting (no vibration)", source: "mapei.com/au TDS" },
        { label: "Shrinkage", value: "Shrinkage-compensated", source: "mapei.com/au TDS" },
        { label: "Pot life", value: "~60 min", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "25 kg", source: "mapei.com/au TDS" },
      ],
    },
  },
];
