// ──────────────────────────────────────────────────────────────────────────────
// Chemical DPC injection — siloxane / silane LIQUID (rising damp). Hand-authored
// selection cards. Values from each product's manufacturer / AU-distributor TDS
// (cited per field). EU-origin products cite the manufacturer TDS with the AU
// distributor noted. Any value not stated on the cited source is written
// "CONFIRM — <field> not stated on <url>" — never guessed or copied from a sibling.
//
// Selection schema (shared with the silane-cream category, liquid-specific):
//   active_chemistry · form/dilution · application_method · hole_pattern ·
//   substrate_porosity · standard · consumption · pack · requires_replaster.
//
// appInfo comparison columns: Active chemistry · Form / dilution · Application ·
// Hole pattern · Substrate porosity · Standard · Consumption · Pack.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Active chemistry", "Form / dilution", "Application", "Hole pattern", "Substrate porosity", "Standard", "Consumption", "Pack"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SILOXANE_LIQUID_DPC_CARDS: RefCard[] = [
  {
    brand: "Remmers Australia",
    rangeName: "Remmers Kiesol",
    shortType: "Silicification concentrate (liquid) DPC — dense / low-porosity masonry",
    badges: [{ label: "1-component concentrate", tone: "navy" }, { label: "WTA 2-6-99", tone: "amber" }, { label: "Dense masonry", tone: "blue" }],
    appInfo: kp([
      "Silane / silicification concentrate (1-component, solvent-free)",
      "Concentrate — diluted per use (priming ~1:1 with water)",
      "Low-pressure / injection-pump into boreholes",
      "12–30 mm holes @ 100–125 mm centres, ~45°, to ~50 mm of far end",
      "Porous AND dense / low-porosity masonry",
      "WTA 2-6-99",
      "CONFIRM — injection rate not stated on Remmers Kiesol TDS",
      "CONFIRM — AU pack size not stated on Remmers Kiesol TDS",
    ]),
    bestFor: [
      "Benchmark liquid silicification concentrate — low viscosity penetrates dense / low-porosity masonry where cream may not reach full wall depth",
      "WTA-referenced Remmers system — pairs with Remmers SP renovation plasters (and Kiesol C cream for open joints)",
    ],
    avoidWhere: [
      "Open / raked joints or holes that cannot be sealed — a cream (Kiesol C) holds in the hole better",
      "Standalone use — strip salt-contaminated plaster and replaster with salt-resistant renovation plaster",
    ],
    warnings: [
      "Drill angle / depth (≈45°, to ~50 mm of the far face) per the Remmers TDS — under-penetration leaves an incomplete barrier",
      "Confirm dilution and injection rate for the specific substrate from the Remmers AU TDS",
    ],
    advanced: {
      description:
        "Remmers Kiesol is a single-component, solvent-free silicification (silane) concentrate for liquid DPC injection, in Remmers' WTA-referenced rising-damp system. The low-viscosity liquid is introduced into boreholes — 12–30 mm diameter at 100–125 mm centres, drilled at ~45° to within ~50 mm of the far end — and lines the masonry capillaries to form a hydrophobic barrier; it penetrates dense / low-porosity masonry where a cream may not reach full wall depth. For priming it is diluted ~1:1 with water. Use within the WTA system with Remmers SP renovation plasters. CONFIRM injection rate and current AU pack from Remmers Australia.",
      designCriteria: "",
      techData: [
        { label: "Active chemistry", value: "Silane / silicification concentrate (1-component, solvent-free)", source: "Remmers Kiesol TDS (AU: Remmers Australia)" },
        { label: "Hole diameter", value: "12–30 mm", source: "Remmers Kiesol TDS" },
        { label: "Hole spacing", value: "100–125 mm centres", source: "Remmers Kiesol TDS" },
        { label: "Hole angle / depth", value: "~45°, to ~50 mm of far end", source: "Remmers Kiesol TDS" },
        { label: "Priming dilution", value: "~1:1 with water (~0.1–0.3 kg/m²)", source: "Remmers Kiesol TDS" },
        { label: "Standard", value: "WTA 2-6-99 (WTA-referenced)", source: "Remmers Kiesol TDS" },
        { label: "Substrate", value: "Porous and dense / low-porosity masonry", source: "page" },
        { label: "Injection rate", value: "CONFIRM — not stated on Remmers Kiesol TDS" },
        { label: "Pack size", value: "CONFIRM — AU pack not stated on Remmers Kiesol TDS" },
        { label: "AU distributor", value: "Remmers Australia", source: "remmers.com.au" },
      ],
    },
  },
  {
    brand: "Safeguard Europe / Wykamol",
    rangeName: "Wykamol Microtech PIF (siloxane pressure-injection fluid)",
    shortType: "Siloxane micro-emulsion concentrate — pressure injection",
    badges: [{ label: "Siloxane micro-emulsion", tone: "navy" }, { label: "Pressure injection", tone: "blue" }, { label: "CONFIRM AU name", tone: "rose" }],
    appInfo: kp([
      "Siloxane / silicone micro-emulsion concentrate (self-emulsifying, ~50 nm)",
      "Concentrate — dilutes to 25 L ready-to-use",
      "Pressure injection (low surface tension — fast)",
      "CONFIRM — hole pattern not stated on Wykamol Microtech PIF datasheet",
      "Dense and low-porosity masonry (deep penetration)",
      "BBA certified",
      "≈3.5 L per m run of 225 mm (9\") wall",
      "Concentrate (makes 25 L) — CONFIRM AU pack",
    ]),
    bestFor: [
      "Silicone micro-emulsion (~50 nm) with low surface tension — fast injection and deep penetration into dense / low-porosity masonry",
      "Concentrate dilutes to 25 L ready-to-use — economical on larger pressure-injection works",
    ],
    avoidWhere: [
      "Standard porous masonry / small jobs without a pump — a cream is more practical",
      "Standalone use without salt-resistant renovation plaster",
    ],
    warnings: [
      "CONFIRM the current AU product name — 'Basecourse DPC Fluid' was not found; Wykamol's current siloxane pressure-injection fluid is Microtech PIF — confirm AU supply with Wykamol Australia",
      "Pressure injection requires a pump and sealed / packered holes — confirm the drilling spec from the Wykamol TDS",
    ],
    advanced: {
      description:
        "Wykamol Microtech PIF is a self-emulsifying silicone / siloxane blended concentrate that forms a silicone micro-emulsion (~50 nm particle size) on dilution with water, for pressure-injection chemical DPC against rising damp above ground. The low surface tension gives fast injection rates and deep penetration suited to dense / low-porosity masonry. The concentrate dilutes to 25 L of ready-to-use fluid; approximately 3.5 L of ready-to-use fluid per metre run of 225 mm (9\") wall, depending on substrate porosity. BBA certified. NOTE: the page name 'Basecourse DPC Fluid' was not located — confirm the current Wykamol AU siloxane injection fluid (Microtech PIF) with Wykamol Australia.",
      designCriteria: "",
      techData: [
        { label: "Active chemistry", value: "Siloxane / silicone micro-emulsion concentrate (self-emulsifying, ~50 nm)", source: "Wykamol Microtech PIF datasheet (AU dist. Wykamol Australia)" },
        { label: "Dilution", value: "Concentrate — dilutes to 25 L ready-to-use", source: "Wykamol Microtech PIF datasheet" },
        { label: "Application", value: "Pressure injection (low surface tension — fast)", source: "Wykamol Microtech PIF datasheet" },
        { label: "Consumption", value: "≈3.5 L per m run of 225 mm (9\") wall", source: "Wykamol Microtech PIF datasheet" },
        { label: "Certification", value: "BBA certified", source: "Wykamol — BBA Microtech Pressure Injection DPC System" },
        { label: "Substrate", value: "Dense and low-porosity masonry", source: "page" },
        { label: "AU product name", value: "CONFIRM — 'Basecourse DPC Fluid' not found; current product is Microtech PIF (confirm with Wykamol Australia)" },
        { label: "Hole pattern", value: "CONFIRM — not stated on Wykamol Microtech PIF datasheet" },
        { label: "AU distributor", value: "Wykamol Australia", source: "wykamol.com.au" },
      ],
    },
  },
];

// ── Machine-readable selector variables (typed) ───────────────────────────────
export const SILOXANE_LIQUID_DPC_SELECTORS = [
  {
    product_id: "remmers_kiesol",
    category: "chemical-dpc-injection-siloxane-liquid",
    active_chemistry: "silane_silicification_concentrate",
    form: "liquid_concentrate",
    application_method: "low_pressure_injection",
    substrate_porosity: "both",
    hole_diameter_mm: { min: 12, max: 30 },
    hole_spacing_mm: { min: 100, max: 125 },
    hole_angle_deg: 45,
    hole_depth: "to ~50 mm of far end",
    priming_dilution: "~1:1 with water",
    standard: ["WTA_2-6-99"],
    consumption: null,
    pack_size: null,
    requires_replaster: true,
    coordinated_system: "remmers_sp",
    au_distributor: "Remmers Australia",
    source_tds_url: "https://www.remmers.co.uk/en_GB/constructionflooring/waterproofing-and-damp-proofing/waterproofing-of-old-buildings/basement-waterproofing/kiesol/p/000000000000181001",
    confidence: "confirmed",
  },
  {
    product_id: "wykamol_microtech_pif",
    category: "chemical-dpc-injection-siloxane-liquid",
    active_chemistry: "siloxane_micro_emulsion",
    form: "liquid_concentrate",
    application_method: "pressure_injection",
    substrate_porosity: "dense",
    hole_diameter_mm: null,
    hole_spacing_mm: null,
    hole_depth: null,
    dilution: "concentrate makes 25 L ready-to-use",
    standard: ["BBA"],
    consumption: "≈3.5 L/m of 225 mm wall",
    pack_size: null,
    requires_replaster: true,
    coordinated_system: null,
    au_distributor: "Wykamol Australia",
    au_product_name_confirmed: false,
    source_tds_url: "https://wykamol.com/uploads/files/MICROTECH-PIF-DataSheet.pdf",
    confidence: "needs_confirmation",
  },
];
