// ──────────────────────────────────────────────────────────────────────────────
// Acrylic (acrylate) injection systems (basement water ingress). Hand-authored
// selection cards. Values from each product's manufacturer / AU source (cited per
// field). Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Components · Gel / react time · Viscosity ·
// Use · Movement / swelling · Standard · Pump.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Components", "Gel / react time", "Viscosity", "Use", "Movement / swelling", "Standard", "Pump"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const ACRYLIC_INJECTION_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Injection-306",
    shortType: "Acrylic (polyacrylic) injection gel — fine cracks / curtain injection",
    badges: [{ label: "Acrylic gel", tone: "navy" }, { label: "Water-like viscosity", tone: "blue" }, { label: "EN 1504-5", tone: "amber" }],
    appInfo: kp([
      "Acrylic (polyacrylic) injection gel resin",
      "Multi-component, solvent-free (pH 9–10)",
      "Adjustable 10–60 min",
      "Very low — comparable to water (penetrates hairline cracks / fine pores)",
      "Curtain / wall injection, membrane repair, SikaFuko hose, fine cracks <0.3 mm",
      "Permanently elastic; reversibly swells / shrinks with moisture",
      "EN 1504-5 (injection, principle C)",
      "2-component metering pump",
    ]),
    bestFor: [
      "Water-like viscosity penetrates hairline cracks and fine pores that PU foam cannot enter — adjustable 10–60 min gel time",
      "Permanently elastic, moisture-swelling gel for curtain / wall injection and membrane repair in damp / saturated ground; usable in groundwater protection zones",
    ],
    avoidWhere: [
      "High-velocity active water — the gel is displaced before setting; plug the leak or use a fast 2C PU first",
      "Structural restoration (does not restore strength) or large voids (use grout / expanding foam)",
    ],
    warnings: [
      "Requires a 2-component metering pump and a specialist applicator — not a 1C-pump product",
      "Confirm potable-water (AS/NZS 4020) compliance before water-storage / tank applications",
    ],
    advanced: {
      description:
        "Sika Injection-306 is a solvent-free acrylic (polyacrylic) injection resin with a versatile, adjustable reaction time (10–60 min) and very low (water-like) viscosity, usable in groundwater protection zones. It is permanently elastic, absorbs limited movement, and reversibly swells/shrinks with moisture (pH 9–10). Used for curtain (sealing-wall) injection in damp / saturated ground, repair of damaged waterproofing membranes, and injection of SikaFuko hoses at construction joints; its low viscosity suits hairline cracks below 0.3 mm. Requires a 2-component metering pump. EN 1504-5 (injection, principle C).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Acrylic (polyacrylic) injection gel resin", source: "Sika Injection-306 PDS (NZ, Jun 2025, v02.02)" },
        { label: "Reaction time", value: "Adjustable 10–60 min", source: "Sika Injection-306 PDS" },
        { label: "Viscosity", value: "Very low — comparable to water", source: "Sika Injection-306 PDS" },
        { label: "Chemistry", value: "Solvent-free acrylic, pH 9–10; permanently elastic; moisture swelling", source: "Sika Injection-306 PDS" },
        { label: "Use", value: "Curtain / wall injection, membrane repair, SikaFuko hose, fine cracks", source: "Sika Injection-306 PDS" },
        { label: "Standard", value: "EN 1504-5 (injection, principle C)", source: "Sika Injection-306 PDS" },
        { label: "Potable standard", value: "CONFIRM — AS/NZS 4020 status with Sika Australia" },
      ],
    },
  },
  {
    brand: "Master Builders Solutions",
    rangeName: "Master Builders acrylic gel injection — CONFIRM product",
    shortType: "Acrylic gel injection — current product to be confirmed",
    badges: [{ label: "Acrylic gel", tone: "navy" }, { label: "CONFIRM product", tone: "rose" }, { label: "ex-BASF", tone: "slate" }],
    appInfo: kp([
      "Acrylic gel injection resin — CONFIRM current product",
      "Multi-component — CONFIRM (Master Builders TDS)",
      "Adjustable — CONFIRM (Master Builders TDS)",
      "Very low — CONFIRM (Master Builders TDS)",
      "Curtain / wall injection, fine cracks",
      "Elastic / swelling — CONFIRM",
      "EN 1504-5 — CONFIRM",
      "2-component metering pump",
    ]),
    bestFor: [
      "Master Builders Solutions (formerly BASF) alternative acrylic gel injection resin for fine-crack / curtain injection — confirm the current product name",
    ],
    avoidWhere: [
      "High-velocity active water, structural restoration, or large voids — same constraints as any acrylic gel",
    ],
    warnings: [
      "CORRECTION: 'MasterInject 1315' is a low-viscosity EPOXY crack-injection resin (formerly Concresive 1315) — NOT an acrylic gel; it is the wrong product for the acrylic-injection category",
      "Confirm the correct current Master Builders Solutions acrylic gel injection product (and its EN 1504-5 / specs) with Master Builders Solutions Australia",
    ],
    advanced: {
      description:
        "The product previously listed here as 'BASF MasterInject 1315' is incorrect for the acrylic-injection category: MasterInject 1315 (formerly Concresive 1315) is a low-viscosity EPOXY resin for crack injection, not an acrylic gel. Master Builders Solutions (the former BASF Construction Chemicals business) does supply acrylic gel injection resins — confirm the correct current AU product name and its technical data with Master Builders Solutions Australia before specifying as an alternative to Sika Injection-306.",
      designCriteria: "",
      techData: [
        { label: "Correction", value: "MasterInject 1315 = low-viscosity EPOXY crack-injection resin (ex-Concresive 1315), not an acrylic gel", source: "Master Builders Solutions MasterInject 1315 TDS" },
        { label: "Brand", value: "Master Builders Solutions (formerly BASF Construction Chemicals)", source: "master-builders-solutions.com" },
        { label: "Correct acrylic gel product", value: "CONFIRM — confirm current AU acrylic gel injection product with Master Builders Solutions Australia" },
        { label: "All specs", value: "CONFIRM — pending the correct product" },
      ],
    },
  },
];

export const ACRYLIC_INJECTION_SELECTORS = [
  { product_id: "sika_injection_306", category: "acrylic-injection-systems", type: "acrylic_gel", components: "multi", react_time_min: { min: 10, max: 60 }, viscosity: "water_like", use: ["curtain_injection", "membrane_repair", "fine_cracks"], movement: "elastic_swelling", standard: ["EN_1504-5"], pump: "2_component", au_distributor: "Sika Australia", source_tds_url: "https://nzl.sika.com/dam/dms/nz01/...sika_injection-306.pdf", confidence: "confirmed" },
  { product_id: "master_builders_acrylic_gel", category: "acrylic-injection-systems", type: "acrylic_gel", product_name_confirmed: false, note: "listed MasterInject 1315 is epoxy, not acrylic — wrong product", standard: [], au_distributor: "Master Builders Solutions Australia", source_tds_url: "https://www.master-builders-solutions.com/", confidence: "needs_confirmation" },
];
