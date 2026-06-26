// ──────────────────────────────────────────────────────────────────────────────
// Self-levelling underlayments / smoothing compounds — hand-authored cards. System
// components (not membranes) → no Class-2 / warranty field. Values from the AU
// manufacturer page/TDS; empty facts pruned. appInfo columns: Type · Thickness
// range · Set speed · Interior/exterior · Use · Notes.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Thickness range", "Set speed", "Interior / exterior", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SCREED_SL_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX K 301",
    shortType: "Exterior-rated cement self-levelling & smoothing compound",
    badges: [{ label: "Self-levelling", tone: "navy" }, { label: "Exterior-rated", tone: "blue" }],
    appInfo: kp([
      "Cement-based self-levelling & smoothing compound",
      "2–20 mm",
      "",
      "Interior & EXTERIOR (sun, rain, heat/cold, freeze-thaw)",
      "Levelling/smoothing balconies, terraces & floors before the finish",
      "",
    ]),
    bestFor: [
      "Exterior-rated self-leveller — withstands sun, rain, heat/cold and freeze-thaw, so it suits balconies and terraces",
      "Levels and smooths 2–20 mm in one application",
    ],
    avoidWhere: [
      "Below 2 mm feather work or above 20 mm in one pass",
      "As a final wearing surface without a finish (confirm)",
    ],
    warnings: [
      "Confirm the primer and overlay finish against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX K 301 is a robust cement-based self-levelling and smoothing compound for interior and exterior use, engineered to withstand sun, rain, heat, cold and freeze-thaw — making it suitable for balconies and terraces. Usable 2–20 mm before the floor finish.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cement self-levelling/smoothing compound", source: "ardexaustralia.com K 301" },
        { label: "Thickness", value: "2–20 mm", source: "ardexaustralia.com K 301" },
        { label: "Exposure", value: "Interior & exterior (freeze-thaw rated)", source: "ardexaustralia.com K 301" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX LQ 92",
    shortType: "Cement-based self-smoothing undertile levelling underlay",
    badges: [{ label: "Self-smoothing", tone: "navy" }, { label: "Undertile", tone: "blue" }],
    appInfo: kp([
      "Cement-based self-smoothing levelling underlay",
      "Feather edge to 25 mm",
      "",
      "Undertile levelling (interior)",
      "Level uneven concrete floors before tiling",
      "Pourable, free-flowing, self-smoothing",
    ]),
    bestFor: [
      "Pourable, free-flowing self-smoothing underlay — levels uneven concrete from a feather edge to 25 mm before tiling",
    ],
    avoidWhere: [
      "As an exposed wearing surface",
      "Weather-exposed exterior use (use K 301)",
    ],
    warnings: [
      "Confirm the primer and tile-adhesive compatibility against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX LQ 92 is a cement-based undertile levelling underlay — mixed with water it is smooth, pourable, free-flowing and self-smoothing, applied from a feather edge up to 25 mm to level uneven concrete floors prior to tiling.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cement self-smoothing undertile underlay", source: "ardexaustralia.com LQ 92" },
        { label: "Thickness", value: "Feather edge to 25 mm", source: "ardexaustralia.com LQ 92" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX K 15 Microtec",
    shortType: "Rapid-drying interior self-levelling underlayment",
    badges: [{ label: "Self-levelling", tone: "navy" }, { label: "Rapid-dry (Microtec)", tone: "blue" }],
    appInfo: kp([
      "Cement-based self-levelling smoothing underlayment (Microtec)",
      "",
      "Rapid-drying",
      "Interior",
      "Smoothing/levelling before resilient, tile and finishes",
      "",
    ]),
    bestFor: [
      "Microtec rapid-drying interior self-leveller — fast smoothing/levelling before resilient and tile finishes",
    ],
    avoidWhere: [
      "Exterior / weather-exposed balconies (use an exterior-rated SLC such as K 301)",
    ],
    warnings: [
      "Interior underlayment — confirm the thickness range and primer against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX K 15 Microtec is a rapid-drying cement-based interior self-levelling smoothing underlayment (Microtec technology) for smoothing and levelling before resilient, tile and other floor finishes. Confirm the thickness range and primer against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cement self-levelling underlayment (Microtec)", source: "ardexaustralia.com K 15 Microtec" },
        { label: "Use", value: "Interior smoothing/levelling before finishes", source: "ardexaustralia.com K 15 Microtec" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Ultraplan Eco",
    shortType: "Ultra-quick-hardening self-levelling smoothing compound (low-VOC)",
    badges: [{ label: "Self-levelling", tone: "navy" }, { label: "Ultra-quick-hardening", tone: "blue" }],
    appInfo: kp([
      "Self-levelling ultra-quick-hardening smoothing compound",
      "1–15 mm",
      "Ultra quick-hardening",
      "Interior",
      "Smoothing/levelling before resilient, tile and finishes",
      "Low-emission (Eco)",
    ]),
    bestFor: [
      "Ultra-quick-hardening self-leveller (1–15 mm) for fast smoothing before floor finishes",
      "Low-emission (Eco) — suited to occupied buildings",
    ],
    avoidWhere: [
      "Exterior / weather-exposed use",
      "Outside the 1–15 mm range",
    ],
    warnings: [
      "Interior smoothing compound — confirm primer and finish compatibility against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Ultraplan Eco is a self-levelling, ultra-quick-hardening, low-emission smoothing compound for interior thicknesses from 1 to 15 mm, used to smooth and level before resilient, tile and other floor finishes.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Ultra-quick-hardening self-levelling compound", source: "mapei.com/au Ultraplan" },
        { label: "Thickness", value: "1–15 mm", source: "mapei.com/au Ultraplan" },
      ],
    },
  },
];
