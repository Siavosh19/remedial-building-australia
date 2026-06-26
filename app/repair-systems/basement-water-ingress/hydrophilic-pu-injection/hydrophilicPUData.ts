// ──────────────────────────────────────────────────────────────────────────────
// Hydrophilic PU injection (basement water ingress). Hand-authored selection
// cards. Values from each product's manufacturer / AU source (cited per field).
// Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Components · Reaction · Expansion · Use ·
// Standard · Pump · Crack width.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Components", "Reaction", "Expansion", "Use", "Standard", "Pump", "Crack width"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const HYDROPHILIC_PU_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Injection-107",
    shortType: "1-component hydrophilic PU foaming injection resin",
    badges: [{ label: "1-component", tone: "navy" }, { label: "~40× expansion", tone: "blue" }, { label: "EN 1504-5", tone: "amber" }],
    appInfo: kp([
      "Hydrophilic PU foaming injection resin",
      "1-component (water-activated)",
      "Reacts on contact with water — permanently flexible / elastic foam",
      "Free-foam expansion up to ~40× (no shrinkage after cure)",
      "Permanent watertight sealing of active cracks, voids and joints",
      "EN 1504-5 (concrete injection)",
      "1-component injection pump",
      "Active seeping cracks ≥0.2 mm",
    ]),
    bestFor: [
      "1-component, water-activated — no metering; expands up to ~40× to permanently seal active seeping cracks, joints and voids; permanently flexible with no shrinkage",
      "First-choice product for most active basement crack / joint sealing — simple single-component application",
    ],
    avoidWhere: [
      "Hairline cracks below 0.2 mm — the resin cannot penetrate; use acrylic gel injection",
      "High-velocity flow that washes out 1C resin before cure — use a 2C system (101 RC) or pre-manage the water",
    ],
    warnings: [
      "Hydrophilic foam swells with continued water exposure — confirm in confined spaces with the engineer",
      "Not structural — confirm the crack does not need structural repair; confirm AS/NZS 4020 for potable-water tanks",
    ],
    advanced: {
      description:
        "Sika Injection-107 is a ready-to-use 1-component, polyurethane, slightly flexible foaming injection resin for permanent watertight sealing of cracks, voids and interstices in concrete. It reacts only in contact with water, expanding to a permanently flexible, elastic foam with free-foam volume expansion up to ~40× and no shrinkage after curing. Injected via a 1-component pump through drilled packers (typically 150–300 mm spacing). For active seeping cracks; for high-velocity flow use a 2C resin (101 RC). EN 1504-5. Confirm AS/NZS 4020 for potable-water tanks.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component hydrophilic PU foaming injection resin", source: "Sika Injection-107 PDS" },
        { label: "Reaction", value: "Reacts with water; permanently flexible foam", source: "Sika Injection-107 PDS" },
        { label: "Expansion", value: "Free-foam up to ~40×; no shrinkage after cure", source: "Sika Injection-107 PDS" },
        { label: "Use", value: "Permanent sealing of active cracks, voids, joints", source: "Sika Injection-107 PDS" },
        { label: "Standard", value: "EN 1504-5", source: "Sika Injection-107 PDS" },
        { label: "Potable standard", value: "CONFIRM — AS/NZS 4020 status with Sika Australia" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Injection-101 RC",
    shortType: "2-component fast-foaming PU — temporary waterstopping",
    badges: [{ label: "2-component", tone: "navy" }, { label: "Fast foaming", tone: "blue" }, { label: "Temporary waterstop", tone: "rose" }],
    appInfo: kp([
      "PU fast-foaming, water-reactive injection resin",
      "2-component (low viscosity, solvent-free)",
      "Fast foaming on water contact — dense flexible foam, fine cells",
      "Free-foam expansion up to ~40×",
      "TEMPORARY waterstopping of high water intrusions in cracks / joints / cavities",
      "CONFIRM EN 1504-5 (Sika AU PDS)",
      "2-component injection pump",
      "Active high-flow cracks / joints",
    ]),
    bestFor: [
      "2-part, low-viscosity, fast-foaming — for TEMPORARY waterstopping of high-velocity water where a 1C resin would wash out",
      "Short reaction time resists washout; expands up to ~40× to dam strong active flow before permanent sealing",
    ],
    avoidWhere: [
      "As the permanent seal — it is a temporary waterstop; follow with a permanent resin / tanking system",
      "Fine cracks below 0.2 mm",
    ],
    warnings: [
      "Requires a 2-component injection pump and a specialist applicator",
      "Temporary measure only — plan and execute the permanent seal afterwards",
    ],
    advanced: {
      description:
        "Sika Injection-101 RC is a low-viscosity, fast-foaming, solvent-free, 2-part water-reactive polyurethane injection resin that cures to a dense flexible foam with a fine cellular structure, for the TEMPORARY waterstopping of high water intrusions in cracks, joints and cavities in concrete, brickwork and natural stone. Free-foam expansion in contact with water up to ~40×. Its short reaction time resists washout in high-velocity flow. It is a temporary waterstop — follow with a permanent sealing resin or tanking. Requires a 2-component pump. Confirm EN 1504-5 status from the Sika AU PDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-component fast-foaming water-reactive PU resin", source: "Sika Injection-101 RC PDS (NZ, Sep 2023, v03.01)" },
        { label: "Use", value: "Temporary waterstopping of high water intrusions", source: "Sika Injection-101 RC PDS" },
        { label: "Expansion", value: "Free-foam up to ~40×", source: "Sika Injection-101 RC PDS" },
        { label: "Foam", value: "Dense flexible foam, fine cellular structure", source: "Sika Injection-101 RC PDS" },
        { label: "Standard", value: "CONFIRM — EN 1504-5 status on the Sika AU PDS" },
      ],
    },
  },
  {
    brand: "Master Builders Solutions",
    rangeName: "Master Builders MasterInject 1320 (hydrophilic PU)",
    shortType: "1-component hydrophilic PU injection resin",
    badges: [{ label: "1-component", tone: "navy" }, { label: "Hydrophilic", tone: "blue" }, { label: "CONFIRM (page said 1308)", tone: "rose" }],
    appInfo: kp([
      "1-component hydrophilic PU injection resin",
      "1-component (water-activated)",
      "Reacts with water to form a flexible impermeable seal",
      "Expands on water contact — CONFIRM ratio (Master Builders TDS)",
      "Sealing of active cracks in concrete",
      "CONFIRM EN 1504-5 (Master Builders TDS)",
      "1-component injection pump",
      "Active cracks / joints",
    ]),
    bestFor: [
      "Master Builders Solutions (formerly BASF) 1-component hydrophilic PU injection resin — forms a flexible impermeable seal in active cracks",
      "Single-component, water-activated alternative to Sika Injection-107 where Master Builders is the preferred supply chain",
    ],
    avoidWhere: [
      "Hairline cracks below 0.2 mm; high-velocity flow (use a fast 2C resin)",
      "As a structural repair",
    ],
    warnings: [
      "CONFIRM product — the page listed 'MasterInject 1308'; the current Master Builders hydrophilic PU injection resin is MasterInject 1320 — confirm the correct AU product with Master Builders Solutions Australia",
      "Confirm expansion ratio, EN 1504-5 and full specs from the Master Builders TDS",
    ],
    advanced: {
      description:
        "Master Builders Solutions (the former BASF Construction Chemicals business) supplies a single-component hydrophilic PU injection resin — MasterInject 1320 — which reacts with water to form an impermeable flexible seal when injected into cracks in concrete. NOTE: the page listed 'MasterInject 1308'; the current product appears to be MasterInject 1320 — confirm the correct AU product, expansion ratio, EN 1504-5 status and specs with Master Builders Solutions Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-component hydrophilic PU injection resin (flexible impermeable seal)", source: "Master Builders MasterInject 1320" },
        { label: "Brand", value: "Master Builders Solutions (formerly BASF)", source: "master-builders-solutions.basf.com.au" },
        { label: "Product name", value: "CONFIRM — page listed 1308; current is MasterInject 1320" },
        { label: "Expansion / standard / specs", value: "CONFIRM — confirm from the Master Builders TDS" },
      ],
    },
  },
];

export const HYDROPHILIC_PU_SELECTORS = [
  { product_id: "sika_injection_107", category: "hydrophilic-pu-injection", type: "hydrophilic_pu_foam", components: 1, reaction: "water_activated", expansion_x: 40, use: "permanent_seal", standard: ["EN_1504-5"], pump: "1_component", min_crack_mm: 0.2, au_distributor: "Sika Australia", source_tds_url: "https://gcc.sika.com/en/construction/waterproofing/injection/sika-injection-107.html", confidence: "confirmed" },
  { product_id: "sika_injection_101_rc", category: "hydrophilic-pu-injection", type: "pu_fast_foam", components: 2, reaction: "water_reactive_fast", expansion_x: 40, use: "temporary_waterstop", standard: [], pump: "2_component", au_distributor: "Sika Australia", source_tds_url: "https://nzl.sika.com/dam/dms/nz01/h/sika_injection-101rc.pdf", confidence: "confirmed" },
  { product_id: "master_builders_masterinject_1320", category: "hydrophilic-pu-injection", type: "hydrophilic_pu_resin", components: 1, reaction: "water_activated", use: "crack_seal", standard: [], product_name_confirmed: false, note: "page listed 1308; current is 1320", au_distributor: "Master Builders Solutions Australia", source_tds_url: "https://www.master-builders-solutions.basf.com.au/en-au/products/masterinject", confidence: "needs_confirmation" },
];
