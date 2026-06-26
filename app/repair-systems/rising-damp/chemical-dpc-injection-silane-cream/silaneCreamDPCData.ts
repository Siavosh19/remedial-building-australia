// ──────────────────────────────────────────────────────────────────────────────
// Chemical DPC injection — silane cream (rising damp). Hand-authored selection
// cards. Values from each product's manufacturer / AU-distributor TDS (cited per
// field, with version/date where stated). EU-origin products (Dryzone, Kiesol C)
// cite the manufacturer TDS with the AU distributor noted. Any value not stated
// on the cited source is written "CONFIRM — <field> not stated on <url>" — never
// guessed, rounded, or copied from a sibling product.
//
// Selection schema (canonical field set for this category):
//   active_chemistry · active_content_pct · form · application_method ·
//   max_moisture_saturation_pct · substrate_porosity · hole_diameter_mm ·
//   hole_spacing_mm · hole_depth · injection_level · consumption · standard ·
//   requires_replaster (+coordinated_system) · voc_odour · pack_size ·
//   shelf_life · au_distributor.
//
// appInfo comparison columns: Active chemistry · Active content · Application ·
// Max wall saturation · Substrate porosity · Hole pattern · Standard · Consumption.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Active chemistry", "Active content", "Application", "Max wall saturation", "Substrate porosity", "Hole pattern", "Standard", "Consumption"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SILANE_CREAM_DPC_CARDS: RefCard[] = [
  {
    brand: "Safeguard Europe / Wykamol",
    rangeName: "Dryzone Damp-Proofing Cream",
    shortType: "Silane/siloxane (silicone) cream DPC — porous masonry",
    badges: [{ label: ">60% active", tone: "navy" }, { label: "No-pressure", tone: "blue" }, { label: "BS 6576", tone: "amber" }],
    appInfo: kp([
      "Silane/siloxane (silicone) cream",
      ">60% active",
      "Cartridge gun — no pressure equipment",
      "CONFIRM — not stated (Safeguard TDS)",
      "Porous masonry (not dense)",
      "12 mm holes @ 120 mm centres, ~90% wall depth, ≥150 mm above ground",
      "BS 6576",
      "Per coverage tables (wall thickness × length)",
    ]),
    bestFor: [
      "Most widely specified silane cream — >60% active, BS 6576 — the default AU benchmark for porous brick / blockwork / sandstone",
      "Cream stays in the hole during cure — no pressure rig; works in irregular pores, raked / open joints and holes that cannot be sealed",
    ],
    avoidWhere: [
      "Dense engineering brick, dense concrete or non-porous masonry — silane needs an open pore structure to penetrate",
      "As a standalone fix — injection without stripping and salt-resistant replastering will fail",
    ],
    warnings: [
      "Strip old plaster to ≥300 mm above the salt tide mark before replastering — salt damage extends beyond the visible staining",
      "Drill level / spacing / depth per the Dryzone guide; allow 6–12 months drying before non-breathable redecoration",
    ],
    advanced: {
      description:
        "Dryzone Damp-Proofing Cream (Safeguard Europe, AU distribution via Wykamol) is a water-based silicone cream containing over 60% active. It is injected into 12 mm holes drilled at 120 mm centres, ~90% through the wall, along the first continuous mortar course at least 150 mm above ground; the active reacts with masonry alkalinity to line the pores with a hydrophobic barrier. Cream consistency keeps it in the hole during cure — no pressure equipment. Injection is one step only: strip salt-contaminated plaster to ≥300 mm above the tide mark and replaster with salt-resistant renovation plaster.",
      designCriteria: "",
      techData: [
        { label: "Active chemistry", value: "Silane/siloxane (silicone) cream", source: "Safeguard Europe — Dryzone datasheet (AU dist. Wykamol)" },
        { label: "Active content", value: ">60% active", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Application", value: "Cartridge gun — no pressure equipment", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Hole diameter", value: "12 mm", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Hole spacing", value: "120 mm centres", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Hole depth", value: "~90% of wall width", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Injection level", value: "First continuous mortar course ≥150 mm above ground", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Standard", value: "BS 6576", source: "Safeguard Europe — Dryzone datasheet" },
        { label: "Max wall saturation", value: "CONFIRM — max moisture saturation not stated on Safeguard Dryzone datasheet" },
        { label: "Consumption", value: "Per coverage tables — CONFIRM mL/hole not stated on Safeguard Dryzone datasheet" },
        { label: "Pack size", value: "310 ml / 600 ml cartridge", source: "Safeguard Europe / Wykamol" },
        { label: "AU distributor", value: "Wykamol Australia", source: "wykamol.com.au" },
        { label: "Replaster", value: "Mandatory — salt-resistant renovation plaster", source: "page" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika SikaMur InjectoCream-100",
    shortType: "1-component silane cream DPC injection",
    badges: [{ label: "Silane cream", tone: "navy" }, { label: "No-pressure", tone: "blue" }, { label: "Sika system", tone: "amber" }],
    appInfo: kp([
      "1-component silane cream",
      "CONFIRM — not stated (Sika PDS)",
      "Cartridge gun — no pressure equipment",
      "CONFIRM — not stated (Sika PDS)",
      "Porous masonry — brick, blockwork",
      "12 mm holes @ ≤120 mm centres, drilled to 40 mm of the far face",
      "CONFIRM — not stated (Sika PDS)",
      "300 ml cartridge — CONFIRM rate (Sika PDS)",
    ]),
    bestFor: [
      "Sika-backed DPC for larger strata remediation — national AU technical support, accredited applicators and system documentation for warranty / compliance",
      "Defined drill spec — 12 mm holes ≤120 mm apart, drilled to within 40 mm of the far face (Sika PDS)",
    ],
    avoidWhere: [
      "Non-porous masonry or dense concrete — silane penetration requires an open pore structure",
      "Standalone use — combine with plaster removal and salt-resistant renovation plaster",
    ],
    warnings: [
      "Confirm BS 6576 classification, active content and coverage from the Sika AU PDS before specifying",
      "Post-treatment drying required before non-breathable redecoration — confirm with Sika",
    ],
    advanced: {
      description:
        "Sika SikaMur InjectoCream-100 is a one-component silane cream chemical DPC for rising damp in masonry. Supplied in a 300 ml cartridge for a standard sealant gun (no pressure equipment); the silane forms a hydrophobic barrier across the wall when injected into 12 mm holes spaced no more than 120 mm apart and drilled to within 40 mm of the far face. Sika's national AU technical support, accredited applicators and documentation suit larger strata remediation with warranty / compliance needs. As with all chemical DPC, injection is one part of the system — strip salt-contaminated plaster and replaster with salt-resistant renovation plaster.",
      designCriteria: "",
      techData: [
        { label: "Active chemistry", value: "1-component silane cream", source: "Sika SikaMur InjectoCream-100 PDS (v02.01, Aug 2025; AU: aus.sika.com)" },
        { label: "Application", value: "Cartridge gun — no pressure equipment", source: "Sika SikaMur InjectoCream-100 PDS" },
        { label: "Hole diameter", value: "12 mm", source: "Sika SikaMur InjectoCream-100 PDS" },
        { label: "Hole spacing", value: "≤120 mm apart", source: "Sika SikaMur InjectoCream-100 PDS" },
        { label: "Hole depth", value: "To within 40 mm of the far face", source: "Sika SikaMur InjectoCream-100 PDS" },
        { label: "Pack size", value: "300 ml cartridge", source: "Sika SikaMur InjectoCream-100 PDS" },
        { label: "Active content", value: "CONFIRM — active % not stated on Sika SikaMur InjectoCream-100 PDS" },
        { label: "Max wall saturation", value: "CONFIRM — not stated on Sika SikaMur InjectoCream-100 PDS" },
        { label: "Standard", value: "CONFIRM — BS 6576 classification not stated on Sika SikaMur InjectoCream-100 PDS" },
        { label: "Consumption", value: "CONFIRM — rate not stated on Sika SikaMur InjectoCream-100 PDS" },
        { label: "AU distributor", value: "Sika Australia", source: "aus.sika.com" },
        { label: "Replaster", value: "Mandatory — salt-resistant renovation plaster", source: "page" },
      ],
    },
  },
  {
    brand: "Remmers Australia",
    rangeName: "Remmers Kiesol C",
    shortType: "80% active silane cream DPC — WTA system; severely saturated / dense masonry",
    badges: [{ label: "80% active", tone: "navy" }, { label: "WTA ≤95% saturation", tone: "amber" }, { label: "Dense masonry", tone: "blue" }],
    appInfo: kp([
      "Silane cream (aqueous, solvent-free)",
      "80% active",
      "Cartridge / gravity — no pressure equipment",
      "≤95% moisture saturation (WTA-approved)",
      "Porous AND lower-porosity / dense masonry",
      "12 mm holes, mortar joint ~150 mm above ground; spacing CONFIRM (Remmers TDS)",
      "WTA 2-6-99",
      "5 L ≈ 50 m single-skin (110 mm) / 25 m double-skin (220 mm)",
    ]),
    bestFor: [
      "80% active silane — among the highest active content in this comparison (Remmers TDS)",
      "WTA-approved for walls up to 95% moisture saturation — suits severely saturated and denser masonry where lower-active creams under-perform",
      "Single-brand WTA system — Kiesol C injection + Remmers SP renovation plasters, coordinated documentation",
    ],
    avoidWhere: [
      "Non-porous or dense concrete substrates",
      "Standalone injection — follow with Remmers SP renovation plasters",
    ],
    warnings: [
      "Confirm hole spacing / depth from the Remmers AU TDS — not stated on the cited source",
      "Confirm the correct Kiesol product (C cream vs liquid) for the substrate, and the drying period, with Remmers Australia",
    ],
    advanced: {
      description:
        "Remmers Kiesol C is an aqueous, solvent-free silane injection cream with 80% active content, in Remmers' WTA-referenced rising-damp system. It is introduced into 12 mm boreholes in the mortar joint ~150 mm above ground under gravity (no pressure) and forms a hydrophobic barrier across the wall. It is WTA-approved for walls with moisture saturation up to 95% — a key advantage for severely saturated and denser masonry. 5 L covers approximately 50 linear metres of single-skin (110 mm) or 25 linear metres of double-skin (220 mm) brickwork. Remmers recommends the complete WTA system with Remmers SP renovation plasters.",
      designCriteria: "",
      techData: [
        { label: "Active chemistry", value: "Silane cream (aqueous, solvent-free)", source: "Remmers Kiesol C TDS TM 0727 (AU: Remmers Australia)" },
        { label: "Active content", value: "80% active", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Max wall saturation", value: "≤95% moisture saturation (WTA-approved)", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Application", value: "Cartridge / gravity — no pressure", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Hole diameter", value: "12 mm", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Injection level", value: "Mortar joint ~150 mm above ground", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Standard", value: "WTA 2-6-99 (WTA-approved)", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Consumption", value: "5 L ≈ 50 m single-skin (110 mm) / 25 m double-skin (220 mm)", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Pack size", value: "5 L / 10 × 310 ml kit", source: "Remmers Kiesol C TDS TM 0727" },
        { label: "Coordinated replaster", value: "Remmers SP renovation plasters (WTA system)", source: "page" },
        { label: "Hole spacing", value: "CONFIRM — not stated on Remmers Kiesol C TDS TM 0727" },
        { label: "Hole depth", value: "CONFIRM — not stated on Remmers Kiesol C TDS TM 0727" },
        { label: "AU distributor", value: "Remmers Australia", source: "remmers.com.au" },
      ],
    },
  },
  {
    brand: "Westox",
    rangeName: "Westox 50 Low Odour",
    shortType: "Low-odour silane cream DPC — occupied buildings (AU)",
    badges: [{ label: "Low odour", tone: "blue" }, { label: "Low-pressure injection", tone: "navy" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Low-odour silane cream — active CONFIRM (westox.com)",
      "CONFIRM — not stated (westox.com)",
      "Low-pressure injection (Westox CDC system)",
      "CONFIRM — not stated (westox.com)",
      "Porous masonry — brick, blockwork",
      "CONFIRM hole pattern (westox.com)",
      "CONFIRM — not stated (westox.com)",
      "By approved Westox applicator — CONFIRM rate",
    ]),
    bestFor: [
      "Low-odour formulation — for occupied buildings where standard silane creams cause odour complaints during application",
      "Australian supplier (Westox / Westlegate) with applicator training and accreditation for the Westox CDC system",
    ],
    avoidWhere: [
      "Dense / low-porosity substrates — confirm suitability with Westox",
      "Standalone injection — combine with plaster removal and salt-resistant replaster",
    ],
    warnings: [
      "Approved-applicator-only product — drilling spec, coverage and active content are confirmed by an approved Westox applicator, not published on the product page",
      "Confirm chemistry, active %, hole diameter / spacing and coverage from the Westox TDS before specifying",
    ],
    advanced: {
      description:
        "Westox 50 Low Odour is a low-odour silane injection cream for chemical damp-proof course installation in brick, blockwork and porous masonry, used within the Westox Chemical Injection (low-pressure) system. The low-odour formulation suits occupied buildings where conventional silane creams cause odour complaints. It is an Australian product (Westox / Westlegate Pty Ltd) sold to approved applicators only; the product page does not publish chemistry detail, active %, drilling spec or coverage — these are calculated by an approved applicator. Injection alone is insufficient — salt-contaminated plaster must be stripped and replaced.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "Low-odour silane injection cream", source: "westox.com Westox 50 Low Odour" },
        { label: "Application", value: "Low-pressure injection (Westox CDC system)", source: "westox.com / Westox CDC brochure" },
        { label: "Key feature", value: "Low odour — for occupied buildings", source: "westox.com Westox 50 Low Odour" },
        { label: "AU supplier", value: "Westox / Westlegate Pty Ltd (approved applicators only)", source: "westox.com" },
        { label: "Active chemistry", value: "CONFIRM — silane confirmed but full chemistry not stated on westox.com" },
        { label: "Active content", value: "CONFIRM — active % not stated on westox.com" },
        { label: "Hole pattern", value: "CONFIRM — hole diameter / spacing / depth not stated on westox.com" },
        { label: "Max wall saturation", value: "CONFIRM — not stated on westox.com" },
        { label: "Standard", value: "CONFIRM — not stated on westox.com" },
        { label: "Consumption", value: "CONFIRM — calculated by an approved Westox applicator (not published)" },
        { label: "Replaster", value: "Mandatory — salt-resistant renovation plaster", source: "page" },
      ],
    },
  },
];

// ── STEP 4 — machine-readable selector variables (typed) ──────────────────────
// Canonical schema keys shared across all four products; numbers carry units in
// the key name; null = not stated on the cited TDS (see CONFIRM lines above).
export const SILANE_CREAM_DPC_SELECTORS = [
  {
    product_id: "dryzone_damp_proofing_cream",
    category: "chemical-dpc-injection-silane-cream",
    active_chemistry: "silane_siloxane",
    active_content_pct: 60, // ">60%" stated minimum
    form: "cream",
    application_method: "cartridge_no_pressure",
    max_moisture_saturation_pct: null,
    substrate_porosity: "porous",
    hole_diameter_mm: 12,
    hole_spacing_mm: 120,
    hole_depth: "~90% of wall width",
    injection_level: "first mortar course ≥150 mm above ground",
    consumption: "per coverage tables (wall thickness × length)",
    standard: ["BS_6576"],
    requires_replaster: true,
    coordinated_system: null,
    voc_odour: "standard",
    occupied_building_suitable: null,
    pack_size: "310 ml / 600 ml cartridge",
    shelf_life: null,
    au_distributor: "Wykamol Australia",
    source_tds_url: "https://static.safeguardeurope.com/downloads/datasheets/dryzone/dryzone-damp-proofing-cream-datasheet.pdf",
    confidence: "needs_confirmation",
  },
  {
    product_id: "sika_sikamur_injectocream_100",
    category: "chemical-dpc-injection-silane-cream",
    active_chemistry: "silane",
    active_content_pct: null,
    form: "cream",
    application_method: "cartridge_no_pressure",
    max_moisture_saturation_pct: null,
    substrate_porosity: "porous",
    hole_diameter_mm: 12,
    hole_spacing_mm: 120,
    hole_depth: "to within 40 mm of far face",
    injection_level: "mortar course (bed joint)",
    consumption: null,
    standard: [],
    requires_replaster: true,
    coordinated_system: null,
    voc_odour: "standard",
    occupied_building_suitable: null,
    pack_size: "300 ml cartridge",
    shelf_life: null,
    au_distributor: "Sika Australia",
    source_tds_url: "https://gbr.sika.com/dms/getdocument.get/4c6058c1-8e6d-41ac-87c6-744ba8443b55/sikamur-injectocream-100.pdf",
    confidence: "needs_confirmation",
  },
  {
    product_id: "remmers_kiesol_c",
    category: "chemical-dpc-injection-silane-cream",
    active_chemistry: "silane",
    active_content_pct: 80,
    form: "cream",
    application_method: "gravity_no_pressure",
    max_moisture_saturation_pct: 95,
    substrate_porosity: "both",
    hole_diameter_mm: 12,
    hole_spacing_mm: null,
    hole_depth: null,
    injection_level: "mortar joint ~150 mm above ground",
    consumption: "5 L ≈ 50 m single-skin (110 mm) / 25 m double-skin (220 mm)",
    standard: ["WTA_2-6-99"],
    requires_replaster: true,
    coordinated_system: "remmers_sp",
    voc_odour: "solvent_free",
    occupied_building_suitable: null,
    pack_size: "5 L / 10 × 310 ml kit",
    shelf_life: null,
    au_distributor: "Remmers Australia",
    source_tds_url: "https://media.remmers.com/celum/export/documents/TM_0727_en_GB_333_78321.pdf",
    confidence: "confirmed",
  },
  {
    product_id: "westox_50_low_odour",
    category: "chemical-dpc-injection-silane-cream",
    active_chemistry: null,
    active_content_pct: null,
    form: "cream",
    application_method: "low_pressure",
    max_moisture_saturation_pct: null,
    substrate_porosity: "porous",
    hole_diameter_mm: null,
    hole_spacing_mm: null,
    hole_depth: null,
    injection_level: null,
    consumption: null,
    standard: [],
    requires_replaster: true,
    coordinated_system: null,
    voc_odour: "low_odour",
    occupied_building_suitable: true,
    pack_size: null,
    shelf_life: null,
    au_distributor: "Westox / Westlegate Pty Ltd (AU)",
    source_tds_url: "https://westox.com/product/westox-50-low-odour-chemical-dampcourse/",
    confidence: "needs_confirmation",
  },
];
