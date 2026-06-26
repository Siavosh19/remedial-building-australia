// ──────────────────────────────────────────────────────────────────────────────
// Floor Patching Compounds — hand-authored cards (magnesite flooring).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated.
// Over magnesite, a moisture-suppression primer / DPM is required first.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Set / dry speed", "Thickness / feather", "Use", "Over primed magnesite", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const FLOOR_PATCHING_CARDS: RefCard[] = [
  {
    brand: "Ardex Australia",
    rangeName: "Ardex Feather Finish",
    shortType: "Polymer-modified feather-edge patching / smoothing compound",
    badges: [],
    appInfo: kp(["Polymer-modified cementitious", "Fast-setting", "Feather-edge to ~3 mm", "Feather/skim patching & smoothing", "Yes — over a moisture-suppression primer", "CONFIRM (Ardex AU TDS)"]),
    bestFor: [
      "True feather-edge — skims from zero, the finest patch/smoothing compound here",
      "Fast-setting for quick spot-patching and smoothing before a leveller or finish",
    ],
    avoidWhere: [
      "Structural or deep reinstatement (use a structural repair mortar)",
      "Directly over unprimed magnesite — prime first",
    ],
    warnings: [
      "Thin-section patch/smoothing only — not a structural mortar",
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
    ],
    advanced: {
      description:
        "Ardex Feather Finish is a fast-setting, polymer-modified cementitious feather-edge patching and smoothing compound that skims from a feather edge up to ~3 mm, for spot-patching and smoothing ahead of a leveller or finish. Non-structural. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Polymer-modified cementitious (feather-edge)", source: "ardexaustralia.com TDS" },
        { label: "Set / dry speed", value: "Fast-setting", source: "ardexaustralia.com TDS" },
        { label: "Thickness / feather", value: "Feather-edge to ~3 mm", source: "ardexaustralia.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "ardexaustralia.com TDS" },
        { label: "Pack size", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex A 45",
    shortType: "Rapid hardening & drying floor repair mortar",
    badges: [],
    appInfo: kp(["Cementitious floor repair mortar", "Rapid hardening & drying", "CONFIRM (Ardex AU TDS)", "Spot floor repair / ramping", "Yes — over a moisture-suppression primer", "CONFIRM (Ardex AU TDS)"]),
    bestFor: [
      "Rapid hardening AND drying — fast return to overlaying/trafficking for floor repairs",
      "Ramping, filling and reinstating localised floor damage",
    ],
    avoidWhere: [
      "Feather-edging (use Feather Finish)",
      "Directly over unprimed magnesite — prime first",
    ],
    warnings: [
      "Confirm minimum/maximum thickness and overlay time against the current Ardex Australia TDS",
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
    ],
    advanced: {
      description:
        "Ardex A 45 is a rapid-hardening and rapid-drying cementitious floor repair mortar for ramping, filling and reinstating localised floor damage with a fast return to overlaying. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM thickness range, overlay time and pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious floor repair mortar", source: "ardexaustralia.com TDS" },
        { label: "Set / dry speed", value: "Rapid hardening & drying", source: "ardexaustralia.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "ardexaustralia.com TDS" },
        { label: "Thickness / pack", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex A 38",
    shortType: "Rapid-set cementitious patching / screed mortar",
    badges: [],
    appInfo: kp(["Cementitious patching / screed", "Rapid-set", "CONFIRM (Ardex AU TDS)", "Patching & rapid screeds", "Yes — over a moisture-suppression primer", "CONFIRM (Ardex AU TDS)"]),
    bestFor: [
      "Rapid-set patching and screeding — fast-track localised floor reinstatement",
      "Builds section where a feather compound is too thin",
    ],
    avoidWhere: [
      "Feather-edging (use Feather Finish)",
      "Directly over unprimed magnesite — prime first",
    ],
    warnings: [
      "Confirm thickness range and overlay time against the current Ardex Australia TDS",
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
    ],
    advanced: {
      description:
        "Ardex A 38 is a rapid-set cementitious patching / screed mortar for fast-track localised floor reinstatement and building section ahead of a finish. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM thickness range, overlay time and pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious patching / screed", source: "ardexaustralia.com TDS" },
        { label: "Set / dry speed", value: "Rapid-set", source: "ardexaustralia.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "ardexaustralia.com TDS" },
        { label: "Thickness / pack", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Planitop Fast 330",
    shortType: "Rapid-set fibre-reinforced floor repair / smoothing mortar",
    badges: [],
    appInfo: kp(["Fibre-reinforced cementitious", "Rapid-set", "3–30 mm (confirm)", "Floor repair & smoothing", "Yes — over a moisture-suppression primer", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Rapid-set fibre-reinforced — repairs and smooths floors in 3–30 mm with fast overlay",
      "Wall and floor use; quick return to service",
    ],
    avoidWhere: [
      "True feather-edge (use a feather compound)",
      "Directly over unprimed magnesite — prime first",
    ],
    warnings: [
      "Confirm minimum/maximum thickness and overlay time against the current Mapei Australia TDS",
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
    ],
    advanced: {
      description:
        "Mapei Planitop Fast 330 is a rapid-set, fibre-reinforced cementitious mortar for repairing and smoothing floors (and walls) typically from 3 to 30 mm with a fast return to overlaying. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM thickness range, strength, overlay time and pack against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Fibre-reinforced cementitious", source: "mapei.com/au TDS" },
        { label: "Set / dry speed", value: "Rapid-set", source: "mapei.com/au TDS" },
        { label: "Thickness", value: "3–30 mm (confirm)", source: "mapei.com/au TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika MonoTop-412 NFG",
    shortType: "R4 structural repair mortar — for deeper floor reinstatement",
    badges: [],
    appInfo: kp(["Polymer-modified cementitious (EN 1504-3 R4)", "Normal-set", "≥10 mm (structural patch)", "Deeper / structural floor reinstatement", "Yes — over a moisture-suppression primer", "20 kg"]),
    bestFor: [
      "Structural-grade (R4) reinstatement of deeper floor losses beyond a thin patch compound",
      "Fibre-reinforced with an integral corrosion inhibitor",
    ],
    avoidWhere: [
      "Thin feather/smoothing (use a feather or rapid floor compound)",
      "Directly over unprimed magnesite — prime first",
    ],
    warnings: [
      "Confirm maximum layer and tested @28d strength against the current Sika Australia TDS",
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
    ],
    advanced: {
      description:
        "Sika MonoTop-412 NFG is a one-component, polymer-modified, fibre-reinforced EN 1504-3 R4 structural repair mortar (with corrosion inhibitor) used here for deeper / structural floor reinstatement beyond what a thin patch compound can do. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM maximum layer and @28d strength against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Polymer-modified cementitious (EN 1504-3 R4)", source: "aus.sika.com TDS" },
        { label: "Strength", value: "≥45 MPa (R4 min) — tested CONFIRM", source: "aus.sika.com TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "20 kg", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Renderoc HB40",
    shortType: "R3 high-build repair mortar — for deeper floor edge / ramp reinstatement",
    badges: [],
    appInfo: kp(["Polymer-modified cementitious (EN 1504-3 R3)", "Normal-set", "To 40 mm", "Deeper floor edge / ramp reinstatement", "Yes — over a moisture-suppression primer", "20 kg"]),
    bestFor: [
      "EN 1504-3 R3 high-build (~45 MPa) for deeper floor-edge / ramp reinstatement",
      "Where a structural-grade build beyond a thin patch is needed",
    ],
    avoidWhere: [
      "Thin feather/smoothing (use a feather or rapid floor compound)",
      "Directly over unprimed magnesite — prime first",
    ],
    warnings: [
      "Primer required (Nitobond) — confirm from the current Fosroc / Parchem TDS",
      "Over magnesite, prime with a moisture-suppression / DPM primer first",
    ],
    advanced: {
      description:
        "Fosroc Renderoc HB40 is a polymer-modified, fibre-reinforced EN 1504-3 R3 high-build repair mortar (~45 MPa, to 40 mm) used here for deeper floor-edge / ramp reinstatement beyond a thin patch compound. Over a magnesite slab it must be applied over a moisture-suppression primer / DPM. CONFIRM strengths and primer against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Polymer-modified cementitious (EN 1504-3 R3)", source: "fosroc.com.au TDS" },
        { label: "Compressive @28d", value: "~45 MPa", source: "fosroc.com.au TDS" },
        { label: "Max build", value: "To 40 mm", source: "fosroc.com.au TDS" },
        { label: "Over primed magnesite", value: "Yes — over a moisture-suppression primer", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "20 kg", source: "fosroc.com.au TDS" },
      ],
    },
  },
];
