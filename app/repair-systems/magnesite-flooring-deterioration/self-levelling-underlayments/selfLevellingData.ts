// ──────────────────────────────────────────────────────────────────────────────
// Self-Levelling Underlayments — hand-authored cards (magnesite flooring).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated.
// Over magnesite, a moisture-suppression primer / DPM is required first.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Set / dry speed", "Thickness range", "Pumpable", "Over primed magnesite", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const SELF_LEVELLING_CARDS: RefCard[] = [
  {
    brand: "Ardex Australia",
    rangeName: "Ardex K 15 Microtec",
    shortType: "Rapid-drying cementitious self-levelling compound",
    badges: [],
    appInfo: kp(["Cementitious SLC (MICROTEC fibre)", "Rapid-drying", "CONFIRM (Ardex AU TDS)", "Yes", "Yes — over a moisture-suppression primer", "20 kg"]),
    bestFor: [
      "Rapid-drying MICROTEC fibre-reinforced self-leveller — fast return to covering",
      "Smooth, flat substrate for resilient/tiled finishes over a primed magnesite slab",
    ],
    avoidWhere: [
      "Directly over unprimed magnesite — a moisture-suppression primer / DPM is required first",
      "Outside the rated thickness range (build in lifts per the TDS)",
    ],
    warnings: [
      "Over magnesite, prime with a moisture-suppression / DPM primer before levelling",
      "Confirm thickness range, drying time and pack against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex K 15 Microtec is a rapid-drying, MICROTEC fibre-reinforced cementitious self-levelling compound for producing a smooth, flat substrate ahead of floor finishes. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM the thickness range, drying time and pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious SLC (MICROTEC fibre)", source: "ardexaustralia.com TDS" },
        { label: "Set / dry speed", value: "Rapid-drying", source: "ardexaustralia.com TDS" },
        { label: "Pumpable", value: "Yes", source: "ardexaustralia.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "ardexaustralia.com TDS" },
        { label: "Thickness / pack", value: "CONFIRM (Ardex AU TDS) — 20 kg", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex K 301",
    shortType: "Rapid-setting cementitious self-levelling compound (exterior-capable)",
    badges: [],
    appInfo: kp(["Cementitious SLC", "Rapid-setting", "CONFIRM (Ardex AU TDS)", "Yes", "Yes — over a moisture-suppression primer", "20 kg"]),
    bestFor: [
      "Rapid-setting self-leveller rated for exterior / wet-area use (with the correct system)",
      "Higher-duty levelling where K 15 is too light-duty — confirm the application",
    ],
    avoidWhere: [
      "Directly over unprimed magnesite — prime first",
      "Outside the rated thickness range",
    ],
    warnings: [
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
      "Confirm thickness range, exterior suitability and pack against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex K 301 is a rapid-setting cementitious self-levelling compound rated for exterior / wet-area use within the correct system. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM the thickness range, exterior suitability and pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious SLC", source: "ardexaustralia.com TDS" },
        { label: "Set / dry speed", value: "Rapid-setting", source: "ardexaustralia.com TDS" },
        { label: "Pumpable", value: "Yes", source: "ardexaustralia.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "ardexaustralia.com TDS" },
        { label: "Thickness / pack", value: "CONFIRM (Ardex AU TDS) — 20 kg", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex K 55",
    shortType: "Rapid-drying cementitious self-levelling & smoothing compound",
    badges: [],
    appInfo: kp(["Cementitious SLC / smoothing", "Rapid-drying", "CONFIRM (Ardex AU TDS)", "Yes", "Yes — over a moisture-suppression primer", "CONFIRM (Ardex AU TDS)"]),
    bestFor: [
      "Rapid-drying self-levelling and smoothing for fast-track floor programmes",
      "Smooth substrate over a primed magnesite slab before resilient finishes",
    ],
    avoidWhere: [
      "Directly over unprimed magnesite — prime first",
      "Outside the rated thickness range",
    ],
    warnings: [
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
      "Confirm thickness range, drying time and pack against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex K 55 is a rapid-drying cementitious self-levelling and smoothing compound for fast-track floor programmes, producing a smooth substrate ahead of floor finishes. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM thickness range, drying time and pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious SLC / smoothing", source: "ardexaustralia.com TDS" },
        { label: "Set / dry speed", value: "Rapid-drying", source: "ardexaustralia.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "ardexaustralia.com TDS" },
        { label: "Thickness / pack", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sikafloor Level TOP",
    shortType: "Cementitious self-levelling underlayment",
    badges: [],
    appInfo: kp(["Cementitious SLC", "CONFIRM (Sika AU TDS)", "CONFIRM (Sika AU TDS)", "Yes", "Yes — over a moisture-suppression primer", "20 kg"]),
    bestFor: [
      "Cementitious self-levelling underlayment for a smooth, flat finish substrate",
      "Pumpable for larger floor areas",
    ],
    avoidWhere: [
      "Directly over unprimed magnesite — prime first",
      "Outside the rated thickness range",
    ],
    warnings: [
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
      "Confirm set/dry speed, thickness range and pack against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sikafloor Level TOP is a cementitious self-levelling underlayment producing a smooth, flat substrate ahead of floor finishes. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM set/dry speed, thickness range and pack against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious SLC", source: "aus.sika.com TDS" },
        { label: "Pumpable", value: "Yes", source: "aus.sika.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "aus.sika.com TDS" },
        { label: "Set/dry, thickness, pack", value: "CONFIRM (Sika AU TDS) — 20 kg", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Ultraplan Eco",
    shortType: "Low-dust cementitious self-levelling underlayment",
    badges: [],
    appInfo: kp(["Cementitious SLC (low-dust)", "Rapid-drying (confirm)", "CONFIRM (Mapei AU TDS)", "Yes", "Yes — over a moisture-suppression primer", "23 kg (confirm)"]),
    bestFor: [
      "Low-dust self-leveller — cleaner mixing/placing for occupied-building work",
      "Smooth, flat finish substrate over a primed magnesite slab",
    ],
    avoidWhere: [
      "Directly over unprimed magnesite — prime first",
      "Outside the rated thickness range",
    ],
    warnings: [
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
      "Confirm thickness range, drying time and pack against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Ultraplan Eco is a low-dust cementitious self-levelling underlayment for a smooth, flat finish substrate, suited to cleaner placement in occupied buildings. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM thickness range, drying time and pack against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious SLC (low-dust)", source: "mapei.com/au TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "mapei.com/au TDS" },
        { label: "Drying, thickness, pack", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Parchem",
    rangeName: "Parchem Durafloor Leveltop Rapid",
    shortType: "Rapid self-smoothing floor levelling underlayment",
    badges: [],
    appInfo: kp(["Cementitious SLC", "Rapid", "CONFIRM (Parchem TDS)", "Yes", "Yes — over a moisture-suppression primer", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Rapid trowellable / self-smoothing leveller for fast-track floor programmes",
      "Smooth substrate over a primed magnesite slab",
    ],
    avoidWhere: [
      "Directly over unprimed magnesite — prime first",
      "Outside the rated thickness range",
    ],
    warnings: [
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
      "Confirm thickness range, drying time and pack against the current Parchem TDS",
    ],
    advanced: {
      description:
        "Parchem Durafloor Leveltop Rapid is a rapid trowellable / self-smoothing cementitious floor levelling underlayment for fast-track programmes. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM thickness range, drying time and pack against the current Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious SLC", source: "parchem.com.au TDS" },
        { label: "Set / dry speed", value: "Rapid", source: "parchem.com.au TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "parchem.com.au TDS" },
        { label: "Thickness / pack", value: "CONFIRM (Parchem TDS)", source: "parchem.com.au TDS" },
      ],
    },
  },
];
