// ──────────────────────────────────────────────────────────────────────────────
// Polyurethane Joint / Crack Sealants — hand-authored cards (concrete cracking).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated.
// Key discriminators: movement capacity, trafficability and potable-water rating.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Cure", "Movement capacity", "Trafficable", "Potable-water (AS 4020)", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const SEALANT_PU_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikaflex-11FC",
    shortType: "1-component PU gun-grade sealant & adhesive for joints and cracks",
    badges: [],
    appInfo: kp(["1-component polyurethane", "Moisture-cure", "Elastic (confirm % movement)", "Pedestrian (confirm)", "CONFIRM (Sika AU TDS)", "300 mL / 600 mL"]),
    bestFor: [
      "Versatile gun-grade PU — seals and bonds movement cracks and joints in one product",
      "Elastic, paint-overable cure for general remedial joint/crack sealing",
    ],
    avoidWhere: [
      "High-movement structural expansion joints needing a rated Class (confirm capacity)",
      "Permanent water immersion / potable contact without confirming the rating",
    ],
    warnings: [
      "Confirm movement capacity and joint design (width:depth) against the current Sika AU TDS",
      "Prime per the substrate; tool within skin time",
    ],
    advanced: {
      description:
        "Sika Sikaflex-11FC is a one-component, moisture-curing, gun-grade polyurethane sealant and adhesive for sealing and bonding movement cracks and joints in concrete. Elastic and overpaintable. CONFIRM the movement capacity, primer requirement and joint design against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component polyurethane (sealant + adhesive)", source: "aus.sika.com TDS" },
        { label: "Cure", value: "Moisture-cure", source: "aus.sika.com TDS" },
        { label: "Movement capacity", value: "Elastic — CONFIRM % (Sika AU TDS)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "300 mL / 600 mL", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex RA 040",
    shortType: "1-component polyurethane joint sealant",
    badges: [],
    appInfo: kp(["1-component polyurethane", "Moisture-cure", "Elastic (confirm % movement)", "CONFIRM (Ardex AU TDS)", "CONFIRM (Ardex AU TDS)", "CONFIRM (Ardex AU TDS)"]),
    bestFor: [
      "Single-component PU joint sealant for movement joints and cracks in concrete",
      "Elastic moisture-cure for general remedial sealing",
    ],
    avoidWhere: [
      "High-movement / trafficked joints needing a rated Class (confirm capacity)",
      "Potable-water or immersion without confirming the rating",
    ],
    warnings: [
      "Confirm movement capacity, trafficability and joint design against the current Ardex AU TDS",
      "Prime per the substrate; observe skin/cure times",
    ],
    advanced: {
      description:
        "Ardex RA 040 is a one-component, moisture-curing polyurethane joint sealant for movement joints and cracks in concrete. CONFIRM the movement capacity, trafficability, primer requirement and pack size against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component polyurethane", source: "ardexaustralia.com TDS" },
        { label: "Cure", value: "Moisture-cure", source: "ardexaustralia.com TDS" },
        { label: "Movement capacity", value: "Elastic — CONFIRM % (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
        { label: "Pack size", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitoseal PU400",
    shortType: "1-component trafficable PU expansion-joint sealant (AS 4020)",
    badges: [],
    appInfo: kp(["1-component polyurethane", "Moisture-cure", "Expansion-joint movement (confirm %)", "Yes — trafficable", "AS 4020 potable-water (confirm)", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Trafficable expansion-joint sealant — rated for vehicle/foot traffic across the joint",
      "AS 4020 potable-water contact (confirm) — suits water-retaining structures",
      "Durable PU for movement / expansion joints in decks and tanks",
    ],
    avoidWhere: [
      "Where a higher-movement or chemical-specific sealant is required (confirm exposure)",
      "Without confirming the movement Class for the joint design",
    ],
    warnings: [
      "Confirm the movement capacity, potable-water (AS 4020) scope and joint design against the current Fosroc / Parchem TDS",
      "Prime per the substrate; respect the joint width:depth ratio",
    ],
    advanced: {
      description:
        "Fosroc Nitoseal PU400 is a one-component, trafficable polyurethane expansion-joint sealant suited to movement and expansion joints in trafficked decks and water-retaining structures, with AS 4020 potable-water contact (confirm). CONFIRM the movement capacity, potable-water scope and joint design against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component polyurethane", source: "fosroc.com.au TDS" },
        { label: "Cure", value: "Moisture-cure", source: "fosroc.com.au TDS" },
        { label: "Trafficable", value: "Yes", source: "fosroc.com.au TDS" },
        { label: "Potable-water (AS 4020)", value: "Yes — confirm scope", source: "fosroc.com.au TDS" },
        { label: "Movement / pack", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
];
