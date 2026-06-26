// ──────────────────────────────────────────────────────────────────────────────
// Hydraulic cement plugging (basement water ingress). Hand-authored selection
// cards. Values from each product's manufacturer / AU source (cited per field).
// Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Chemistry · Initial set · Mix ratio · Use ·
// Standard · Format · Role.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Chemistry", "Initial set", "Mix ratio", "Use", "Standard", "Format", "Role"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const HYDRAULIC_CEMENT_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Plug",
    shortType: "Fast-setting hydraulic cement waterstop",
    badges: [{ label: "~60–90 s set", tone: "navy" }, { label: "Hydraulic plug", tone: "blue" }, { label: "Running water", tone: "amber" }],
    appInfo: kp([
      "Fast-setting hydraulic cement waterstop",
      "Portland-cement based",
      "~60–90 seconds",
      "1 part water : 4 parts powder",
      "Plug active running-water leaks in cracks / joints / holes",
      "CONFIRM standard (Sika AU PDS)",
      "Ready-to-use powder + water",
      "First-stage 'stop the flow' before injection / tanking",
    ]),
    bestFor: [
      "Very fast set (~60–90 s) Portland-cement waterstop — excellent bond to concrete and masonry; plugs active running-water leaks by hand",
      "Stops the flow so subsequent injection / crystalline / tanking can be carried out in dry conditions",
    ],
    avoidWhere: [
      "As a standalone waterproofing measure — it is a preparatory plug; combine with a permanent system",
      "Very high hydrostatic pressure without an engineering assessment of plug adequacy",
    ],
    warnings: [
      "Very short working time (~60–90 s) — mix only what can be placed in one operation; hold under hand pressure until set",
      "Pre-form irregular voids to a clean conical shape and work from the edges of the leak inward",
    ],
    advanced: {
      description:
        "Sika Plug is a versatile, fast-setting Portland-cement waterstop for sealing active leaks in concrete and masonry — basements, sumps, pools, tunnels, sewers. Approximate set 60–90 seconds; mix 1 part clean water to 4 parts powder to the required consistency (do not over-wet or re-temper). Plug minor leaks first, working from the edges, pressing the mortar firmly into the crack / hole and holding under hand pressure until set. It is a preparatory 'stop the flow' product — combine with a permanent injection / crystalline / tanking system.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Fast-setting Portland-cement waterstop", source: "Sika Plug PDS (AU, Dec 2025, v01.03)" },
        { label: "Initial set", value: "~60–90 seconds", source: "Sika Plug PDS" },
        { label: "Mix ratio", value: "1 part water : 4 parts powder", source: "Sika Plug PDS" },
        { label: "Bond", value: "Excellent bond to concrete and masonry", source: "Sika Plug PDS" },
        { label: "Role", value: "Preparatory plug before permanent waterproofing", source: "page" },
        { label: "Standard", value: "CONFIRM — classification on the Sika AU PDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Renderoc Plug (1 / 20)",
    shortType: "Rapid-setting cementitious water-stopping mortar",
    badges: [{ label: "EN 1504 R1", tone: "navy" }, { label: "1 min / 20 min", tone: "blue" }, { label: "Water-stop", tone: "amber" }],
    appInfo: kp([
      "Rapid-setting cementitious water-stopping mortar (Plug 1 / Plug 20)",
      "Cement-based, ready-to-use powder",
      "Plug 1 ~1 min; Plug 20 ~20 min (at 20 °C)",
      "1 part water : 3 parts product (by volume)",
      "Plug / patch active leaks; chambers, basements, tunnels, sewers",
      "BS EN 1504 Class R1",
      "Ready-to-use powder + water",
      "First-stage 'stop the flow'",
    ]),
    bestFor: [
      "Two set grades — Renderoc Plug 1 (~1 min) for active running water; Plug 20 (~20 min) for larger patches needing more working time — EN 1504 R1",
      "Applies to horizontal, vertical or overhead surfaces at a wide range of thicknesses",
    ],
    avoidWhere: [
      "As a standalone waterproofing system",
      "Very high hydrostatic pressure without an engineering assessment",
    ],
    warnings: [
      "Choose the grade for the flow — Plug 1 for gushing water, Plug 20 where more working time is needed; hold under pressure until set",
      "Mix 1 water : 3 product by volume to a stiff consistency; confirm current AU grade availability with Parchem",
    ],
    advanced: {
      description:
        "Fosroc Renderoc Plug is a rapid-setting, cement-based water-stopping mortar (EN 1504 Class R1) for horizontal, vertical or overhead surfaces, used to plug / patch active leaks in concrete and brick — tunnel linings, sewers, below-ground chambers, basements and foundations. Two grades: Renderoc Plug 1 (~1 min initial set) and Renderoc Plug 20 (~20 min) at 20 °C. Supplied as a dry powder requiring only clean water — mix 1 part water to 3 parts product by volume to a stiff consistency. Confirm current AU grade availability with Parchem.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Rapid-setting cementitious water-stopping mortar", source: "Fosroc Renderoc Plug (fosroc.com)" },
        { label: "Initial set", value: "Plug 1 ~1 min; Plug 20 ~20 min (20 °C)", source: "Fosroc Renderoc Plug" },
        { label: "Mix ratio", value: "1 part water : 3 parts product (by volume)", source: "Fosroc Renderoc Plug" },
        { label: "Standard", value: "BS EN 1504 Class R1", source: "Fosroc Renderoc Plug" },
        { label: "AU availability", value: "CONFIRM — current AU grade with Parchem" },
      ],
    },
  },
  {
    brand: "Master Builders Solutions",
    rangeName: "Master Builders rapid hydraulic plug (MasterSeal 590) — CONFIRM",
    shortType: "Rapid hydraulic plug — correct product to be confirmed",
    badges: [{ label: "Hydraulic plug", tone: "navy" }, { label: "CONFIRM product", tone: "rose" }, { label: "ex-BASF", tone: "slate" }],
    appInfo: kp([
      "Rapid-setting hydraulic plugging mortar — CONFIRM product",
      "Cement-based — CONFIRM (Master Builders TDS)",
      "Rapid (seconds–minutes) — CONFIRM (Master Builders TDS)",
      "CONFIRM mix ratio (Master Builders TDS)",
      "Plug active leaks before permanent repair",
      "CONFIRM standard (Master Builders TDS)",
      "Powder + water",
      "First-stage 'stop the flow'",
    ]),
    bestFor: [
      "Master Builders Solutions (formerly BASF) rapid hydraulic plug for stopping active leaks before permanent repair — confirm the correct product",
    ],
    avoidWhere: [
      "As a standalone waterproofing measure — same constraints as any hydraulic plug",
    ],
    warnings: [
      "CORRECTION: 'MasterEmaco S 488' is a structural REPAIR MORTAR, not a hydraulic water-stop plug — the Master Builders rapid plug is MasterSeal 590 (formerly Waterplug)",
      "Confirm the correct AU rapid plug product and its set time / specs with Master Builders Solutions Australia",
    ],
    advanced: {
      description:
        "The product previously listed here as 'BASF MasterEmaco S 488' is incorrect for hydraulic plugging: the MasterEmaco S range is structural repair mortar, not a rapid water-stop plug. The Master Builders Solutions (former BASF) rapid hydraulic water-stop plug is MasterSeal 590 (formerly known as Waterplug). Confirm the correct current AU product, set time, mix ratio and specs with Master Builders Solutions Australia.",
      designCriteria: "",
      techData: [
        { label: "Correction", value: "MasterEmaco S 488 = structural repair mortar, not a hydraulic plug", source: "Master Builders Solutions product range" },
        { label: "Correct product", value: "MasterSeal 590 (formerly Waterplug) — CONFIRM AU availability", source: "master-builders-solutions.basf.com.au" },
        { label: "Set / mix / specs", value: "CONFIRM — confirm from the Master Builders TDS" },
      ],
    },
  },
];

export const HYDRAULIC_CEMENT_SELECTORS = [
  { product_id: "sika_plug", category: "hydraulic-cement-plugging", type: "hydraulic_cement_plug", chemistry: "portland_cement", initial_set_s: { min: 60, max: 90 }, mix_water_powder: "1:4", use: "active_leak_plug", role: "preparatory", au_distributor: "Sika Australia", source_tds_url: "https://aus.sika.com/dms/getdocument.get/...sika_plug.pdf", confidence: "confirmed" },
  { product_id: "fosroc_renderoc_plug", category: "hydraulic-cement-plugging", type: "hydraulic_cement_plug", chemistry: "cementitious", initial_set_min: { plug1: 1, plug20: 20 }, mix_water_product: "1:3", standard: ["EN_1504_R1"], use: "active_leak_plug", role: "preparatory", au_distributor: "Parchem (Fosroc)", source_tds_url: "https://www.fosroc.com/product/show/renderoc-plug", confidence: "confirmed" },
  { product_id: "master_builders_masterseal_590", category: "hydraulic-cement-plugging", type: "hydraulic_cement_plug", product_name_confirmed: false, note: "page listed MasterEmaco S 488 (repair mortar, wrong); correct plug is MasterSeal 590", au_distributor: "Master Builders Solutions Australia", source_tds_url: "https://www.master-builders-solutions.basf.com.au/", confidence: "needs_confirmation" },
];
