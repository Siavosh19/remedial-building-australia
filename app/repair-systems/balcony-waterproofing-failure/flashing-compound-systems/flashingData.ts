// ──────────────────────────────────────────────────────────────────────────────
// Flashing compounds, tapes & reinforcing fabric — detail/junction products.
// System components → no Class-2 / warranty field. Values from the AU manufacturer
// page/TDS; empty facts pruned. appInfo columns: Type · Form · Use · Reinforcement
// / system · Notes.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Form", "Use", "Reinforcement / system", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const FLASHING_CARDS: RefCard[] = [
  {
    brand: "Soprema", rangeName: "Soprema Alsan Flashing (RS 230 Flash)",
    shortType: "Rapid-set PMMA liquid flashing resin (fleece-reinforced)",
    badges: [{ label: "PMMA liquid flashing", tone: "navy" }, { label: "Rapid-cure", tone: "blue" }],
    appInfo: kp([
      "Rapid-setting PMMA liquid flashing resin",
      "Liquid-applied (cold)",
      "Seamless self-flashing of penetrations, upstands and complex details",
      "Fleece-reinforced (resin + fleece field)",
      "Rapid-cure — fast return to service",
    ]),
    bestFor: [
      "Seamless, self-adhering fleece-reinforced PMMA flashing for penetrations, upstands and complex details",
      "Rapid cure — detailing can be over-coated/returned to service quickly",
    ],
    avoidWhere: ["Large field areas (it is a detailing resin)", "Where a compatible field membrane / primer is not confirmed"],
    warnings: ["Confirm the primer and the compatible field membrane against the current Soprema Australia TDS", "PMMA reactive resin — observe mix/catalyst and temperature"],
    advanced: { description: "Soprema Alsan Flashing (ALSAN RS 230 Flash) is a rapid-setting PMMA liquid flashing resin combined with fleece to create a seamless, self-adhering, reinforced detail membrane for penetrations, upstands and complex roof details. Available in Australia via Bayset/Soprema.", designCriteria: "", techData: [
      { label: "Type", value: "Rapid-set PMMA liquid flashing resin", source: "soprema Alsan RS 230 Flash" },
      { label: "Reinforcement", value: "Fleece-reinforced", source: "soprema Alsan RS 230 Flash" },
    ] },
  },
  {
    brand: "Soprema", rangeName: "Soprema Alsan Flashing Quadro",
    shortType: "1-part root-resistant PU liquid flashing resin",
    badges: [{ label: "PU liquid flashing", tone: "navy" }, { label: "Root-resistant", tone: "blue" }],
    appInfo: kp([
      "1-component root-resistant polyurethane flashing resin",
      "Liquid-applied (cold)",
      "Waterproofing junctions, upstands & roof details — incl. green-roof/planter details",
      "Fleece-reinforced (system)",
      "ETAG 005 highest solicitation category",
    ]),
    bestFor: [
      "Root-resistant 1-part PU flashing for junctions, upstands and details — suited to green-roof and planter detailing",
      "Meets the highest solicitation category to ETAG 005",
    ],
    avoidWhere: ["Large field areas (it is a detailing resin)"],
    warnings: ["Confirm the primer and compatible field membrane against the current Soprema Australia TDS"],
    advanced: { description: "Soprema Alsan Flashing Quadro is a single-component, root-resistant polyurethane flashing resin for waterproofing junctions between horizontal surfaces, up-stands and roof details to the highest solicitation category (ETAG 005) — suited to green-roof and planter detailing.", designCriteria: "", techData: [
      { label: "Type", value: "1-part root-resistant PU flashing resin", source: "soprema Alsan Flashing Quadro" },
      { label: "Standard", value: "ETAG 005 highest category", source: "soprema Alsan Flashing Quadro" },
    ] },
  },
  {
    brand: "Soprema", rangeName: "Soprema Alsan Flashing Jardin",
    shortType: "1-part bitumen-PU flashing resin (UV/alkali/root-resistant)",
    badges: [{ label: "Bitumen-PU flashing", tone: "navy" }, { label: "Root-resistant", tone: "blue" }],
    appInfo: kp([
      "1-component elastic bitumen-polyurethane flashing resin",
      "Liquid-applied (cold)",
      "Upstands & roof details for green roofs / planters (anti-root)",
      "Fleece-reinforced (system)",
      "UV, alkali and root resistant",
    ]),
    bestFor: [
      "UV-, alkali- and root-resistant bitumen-PU flashing for upstands and details on green roofs and planters",
      "Ready-to-use, elastic detailing resin",
    ],
    avoidWhere: ["Large field areas (it is a detailing resin)"],
    warnings: ["Confirm the primer and compatible field membrane against the current Soprema Australia TDS"],
    advanced: { description: "Soprema Alsan Flashing Jardin is a single-component, ready-to-use, UV-, alkali- and root-resistant elastic bitumen-polyurethane flashing resin for waterproofing up-stands and roof details with anti-root penetration properties for green-roof and planter applications.", designCriteria: "", techData: [
      { label: "Type", value: "1-part elastic bitumen-PU flashing resin", source: "soprema Alsan Flashing Jardin" },
      { label: "Properties", value: "UV / alkali / root resistant", source: "soprema Alsan Flashing Jardin" },
    ] },
  },
  {
    brand: "Tremco CPG Australia", rangeName: "Tremco Brushable Hydroseal",
    shortType: "Heavy bituminous fibre-reinforced brush-applied sealing compound",
    badges: [{ label: "Bituminous compound", tone: "navy" }],
    appInfo: kp([
      "Heavy bituminous, fibre-reinforced, rust-inhibiting sealing compound",
      "Brush-applied (thick)",
      "Flashing/sealing details, patching and localised repairs",
      "Reinforce large holes with Tremco PermAFab (≥150 mm overlap)",
      "Minimum 2 coats — first coat dry before the second",
    ]),
    bestFor: [
      "Thick brush-applied bituminous sealer for flashing details, patching and localised repairs",
      "Fibre-reinforced and rust-inhibiting; reinforce large holes with PermAFab",
    ],
    avoidWhere: ["As a primary field membrane on a balcony (it is a detailing/repair compound)"],
    warnings: ["Minimum 2 coats — let the first dry before the second", "Confirm substrate and overcoat compatibility against the current Tremco Australia TDS"],
    advanced: { description: "Tremco Brushable Hydroseal is a heavy bituminous, fibre-reinforced, rust-inhibiting sealing compound applied thickly by brush for flashing details, patching and localised repairs. Reinforce large holes with Tremco PermAFab (mesh overlapped ≥150 mm); minimum 2 coats with the first dry before the second.", designCriteria: "", techData: [
      { label: "Type", value: "Heavy bituminous fibre-reinforced sealing compound", source: "tremco.com.au Brushable Hydroseal" },
      { label: "Coats", value: "Minimum 2; PermAFab for large holes", source: "tremco.com.au Brushable Hydroseal" },
    ] },
  },
  {
    brand: "Tremco CPG Australia", rangeName: "Tremco PermAFab Reinforcing Fabric",
    shortType: "Stitch-bonded polyester reinforcing fabric (for liquid membranes)",
    badges: [{ label: "Reinforcing fabric", tone: "navy" }],
    appInfo: kp([
      "100% stitch-bonded polyester reinforcing fabric",
      "Fabric (embedded in the membrane)",
      "Reinforce liquid membranes/flashing at junctions, upstands and details",
      "Used with Tremco liquid membranes (e.g. AlphaGuard BIO)",
      "High tensile strength + good elongation (thermal-stress resistance)",
    ]),
    bestFor: [
      "Stitch-bonded polyester fabric — high tensile strength with good elongation for thermal-stress resistance when embedded in a liquid membrane",
      "Reinforces junctions, upstands, drains and crack details",
    ],
    avoidWhere: ["As a standalone membrane (it is a reinforcement embedded in a membrane)"],
    warnings: ["Embed fully in the liquid membrane — voids/dry fabric compromise the detail", "Confirm the compatible membrane against the current Tremco Australia TDS"],
    advanced: { description: "Tremco PermAFab is a 100% stitch-bonded polyester reinforcing fabric combining high tensile properties with good elongation for resistance to thermal stresses, embedded in a Tremco liquid waterproofing membrane (e.g. AlphaGuard BIO) to reinforce junctions, upstands and details.", designCriteria: "", techData: [
      { label: "Type", value: "Stitch-bonded polyester reinforcing fabric", source: "tremco.com.au PermAFab" },
      { label: "Use", value: "Embedded reinforcement at details/junctions", source: "tremco.com.au PermAFab" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX Flashing Tape",
    shortType: "Self-adhesive flashing tape (detailing)",
    badges: [{ label: "Flashing tape", tone: "navy" }],
    appInfo: kp([
      "Self-adhesive flashing tape",
      "Tape",
      "Detailing junctions, penetrations and terminations under/within the membrane",
      "",
      "Used within the ARDEX waterproofing system",
    ]),
    bestFor: ["Self-adhesive tape to detail junctions, penetrations and terminations within the ARDEX waterproofing system"],
    avoidWhere: ["As a field membrane"],
    warnings: ["Confirm the width, substrate and overcoat compatibility against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX Flashing Tape is a self-adhesive flashing tape used to detail junctions, penetrations and terminations within the ARDEX waterproofing system. Confirm width, substrate and membrane overcoat compatibility against the current Ardex Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "Self-adhesive flashing tape", source: "ardexaustralia.com Flashing Tape" },
    ] },
  },
  {
    brand: "Generic", rangeName: "Generic Butyl / Aluminium Flashing Tape",
    shortType: "Self-adhesive butyl / aluminium-faced flashing tape",
    badges: [{ label: "Flashing tape", tone: "navy" }],
    appInfo: kp([
      "Self-adhesive butyl / aluminium-faced flashing tape",
      "Tape",
      "Detailing penetrations, laps and terminations",
      "",
      "Generic format — confirm the specific product spec",
    ]),
    bestFor: ["Self-adhesive butyl/aluminium flashing tape for detailing penetrations, laps and terminations (widely stocked)"],
    avoidWhere: ["As a field membrane", "Where a system-matched flashing tape is required for warranty"],
    warnings: ["Generic product — confirm the specific brand, butyl vs aluminium face and membrane compatibility before specifying"],
    advanced: { description: "Generic self-adhesive butyl / aluminium-faced flashing tape for detailing penetrations, laps and terminations, available in various formats (e.g. Crommelin and generic). Confirm the specific product, facing and membrane compatibility before specifying.", designCriteria: "", techData: [
      { label: "Type", value: "Self-adhesive butyl / aluminium flashing tape", source: "generic — confirm product" },
    ] },
  },
];
