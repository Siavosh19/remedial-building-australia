// ──────────────────────────────────────────────────────────────────────────────
// TPO / FPO exposed single-ply sheet membranes — hand-authored cards. Values from
// the CURRENT AUSTRALIAN manufacturer page; empty/unconfirmed facts pruned at
// render. "Class 2 / NCC tested" = documented AU test evidence only.
// appInfo columns: Type · Thickness · Application · Role/exposure · Class 2 / NCC tested · Warranty.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Thickness", "Application", "Role / exposure", "Class 2 / NCC tested", "Warranty"];
const DEFAULTS: Record<number, string> = { 4: "N/A", 5: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "" }));

export const TPO_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 715",
    shortType: "FPO/TPO heat-weldable single-ply (WeldTec) — exposed",
    badges: [{ label: "FPO/TPO heat-weld", tone: "navy" }, { label: "AS 4654.1 (BRANZ)", tone: "blue" }],
    appInfo: kp([
      "FPO/TPO heat-weldable single-ply (WeldTec)",
      "1.5 mm",
      "Heat-weldable; mechanically fixed / adhered",
      "EXPOSED — decks & rooftops (heat / UV / ozone resistant)",
      "AS 4654.1 — BRANZ report (+ AS/NZS 4020 potable)",
    ]),
    bestFor: [
      "Heat-weldable single-ply with excellent ageing resistance to heat, sunlight and ozone — exposed decks and rooftops",
      "BRANZ-tested to AS 4654.1; wind-uplift certified; AS/NZS 4020 potable-water compliant",
    ],
    avoidWhere: [
      "DIY installation — hot-air-welded seams need a competent applicator",
      "Direct tile adhesion / undertile wet-area duty",
    ],
    warnings: [
      "Hot-air-welded laps — specialist installer and seam testing required",
      "Confirm fixing method (mechanical / adhered) and wind-uplift design against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 715 (WeldTec) is a 1.5 mm FPO/TPO heat-weldable single-ply membrane for exposed decks and rooftops, with excellent resistance to ageing from heat, sunlight and ozone and excellent gas impermeability. BRANZ tested to AS 4654.1, wind-uplift certified, and AS/NZS 4020 potable-water compliant. Supplied 1.4 m × 20 m rolls.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "FPO/TPO heat-weldable single-ply (WeldTec)", source: "ardexaustralia.com WPM 715" },
        { label: "Thickness", value: "1.5 mm", source: "ardexaustralia.com WPM 715" },
        { label: "Application", value: "Heat-weldable; mechanically fixed / adhered", source: "ardexaustralia.com WPM 715" },
        { label: "Test evidence", value: "BRANZ AS 4654.1; wind-uplift; AS/NZS 4020 potable", source: "ardexaustralia.com WPM 715" },
        { label: "Roll", value: "1.4 m × 20 m", source: "ardexaustralia.com WPM 715" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 717",
    shortType: "FPO/TPO heat-weldable single-ply (WeldTec) — exposed",
    badges: [{ label: "FPO/TPO heat-weld", tone: "navy" }],
    appInfo: kp([
      "FPO/TPO heat-weldable single-ply (WeldTec)",
      "",
      "Heat-weldable; mechanically fixed / adhered",
      "EXPOSED — decks & rooftops",
    ]),
    bestFor: [
      "Heavier-grade WeldTec FPO/TPO heat-weldable single-ply for exposed decks and rooftops",
    ],
    avoidWhere: [
      "DIY installation — hot-air-welded seams need a competent applicator",
      "Direct tile adhesion / undertile wet-area duty",
    ],
    warnings: [
      "Confirm the grade, thickness and BRANZ AS 4654.1 test report with the current Ardex Australia TDS (sibling WPM 715 is BRANZ-tested)",
      "Hot-air-welded laps — specialist installer required",
    ],
    advanced: {
      description:
        "ARDEX WPM 717 (WeldTec) is an FPO/TPO heat-weldable single-ply membrane for exposed decks and rooftops — the heavier-grade companion to WPM 715. Confirm the exact thickness/grade and its BRANZ AS 4654.1 test report with the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "FPO/TPO heat-weldable single-ply (WeldTec)", source: "ardexaustralia.com WPM 717" },
        { label: "Application", value: "Heat-weldable", source: "ardexaustralia.com WPM 717" },
      ],
    },
  },
];
