// ──────────────────────────────────────────────────────────────────────────────
// Primers & bonding agents — hand-authored cards. These are SYSTEM COMPONENTS
// (not standalone membranes), so no "Class 2 / NCC tested" or warranty field.
// Values from the CURRENT AUSTRALIAN manufacturer page/TDS; empty facts pruned.
// appInfo columns: Type/chemistry · Function · Substrate suitability · Coverage ·
// Recoat/drying · Primes / compatible with.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type / chemistry", "Function", "Substrate suitability", "Coverage", "Recoat / drying", "Primes / compatible with"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const PRIMER_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 265",
    shortType: "Water-based acrylic penetrating primer / porous-substrate sealer",
    badges: [{ label: "Water-based acrylic", tone: "blue" }, { label: "Low VOC", tone: "navy" }],
    appInfo: kp([
      "Water-based acrylic penetrating primer (red)",
      "Membrane primer / porous-substrate sealer (bond coat)",
      "Concrete, timber, FC board, marine ply, render, screed, masonry",
      "~6 m² / L",
      "Recoat 1 h",
      "ARDEX Superflex / water-based membranes & coatings",
    ]),
    bestFor: [
      "Penetrating water-based acrylic — seals porous substrates and creates a positive bond for water-based membranes/coatings",
      "Broad substrate range including timber, fibre-cement board and marine plywood; low VOC (11 g/L)",
    ],
    avoidWhere: [
      "Under solvent / torch-applied bitumen systems (use WPM 240)",
      "As a moisture barrier over damp / green concrete (use WPM 300)",
    ],
    warnings: [
      "Formulated for water-based ARDEX systems — confirm membrane compatibility",
      "Allow 1 h before overcoating",
    ],
    advanced: {
      description:
        "ARDEX WPM 265 is a red, water-based acrylic penetrating primer that seals porous substrates and creates a positive bond between the substrate and most water-based coatings/membranes (e.g. ARDEX Superflex), for internal and external floors and walls. Suits concrete, timber, fibre-cement sheet, marine plywood, renders, screeds and masonry. ~6 m²/L; recoat 1 h; VOC 11 g/L; 20 L pails.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Water-based acrylic penetrating primer", source: "ardexaustralia.com WPM 265" },
        { label: "Coverage", value: "~6 m² / L", source: "ardexaustralia.com WPM 265" },
        { label: "Recoat", value: "1 h", source: "ardexaustralia.com WPM 265" },
        { label: "VOC", value: "11 g/L", source: "ardexaustralia.com WPM 265" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 300 (HydrEpoxy)",
    shortType: "2-part water-based epoxy moisture barrier / primer",
    badges: [{ label: "2-part epoxy", tone: "navy" }, { label: "Moisture barrier / DPM", tone: "blue" }],
    appInfo: kp([
      "2-part water-based epoxy primer / barrier",
      "Moisture-barrier DPM + primer — to 250 kPa (25 m head)",
      "Damp / green concrete",
      "",
      "",
      "ARDEX liquid membranes & tile adhesives",
    ]),
    bestFor: [
      "Two-part epoxy moisture barrier — applies over green/damp concrete and resists 250 kPa (25 m head) of hydrostatic pressure",
      "Doubles as a primer for liquid membranes and tile adhesives; AS/NZS 4020 potable-water compliant",
    ],
    avoidWhere: [
      "As a simple bond-coat where a water-based acrylic primer suffices (use WPM 265)",
      "Without substrate moisture testing — confirm the condition first",
    ],
    warnings: [
      "Two-part epoxy — observe the mix ratio and pot life",
      "Confirm coverage and overcoat window against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 300 (HydrEpoxy) is a two-component, water-based epoxy primer/barrier coating that acts as a moisture barrier over green or damp concrete (withstanding 250 kPa — a 25 m head of water), a low-vapour-transmission barrier, and a primer for ARDEX liquid membranes and tile adhesives. AS/NZS 4020 potable-water compliant; VOC 26 g/L; 4 L and 20 L kits; grey or Mojo Black.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part water-based epoxy primer / barrier", source: "ardexaustralia.com WPM 300" },
        { label: "Hydrostatic", value: "To 250 kPa (25 m head)", source: "ardexaustralia.com WPM 300" },
        { label: "Compliance", value: "AS/NZS 4020 potable", source: "ardexaustralia.com WPM 300" },
        { label: "VOC / pack", value: "26 g/L · 4 L / 20 L kits", source: "ardexaustralia.com WPM 300" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 240",
    shortType: "Solvent-based bitumen-modified primer (for torch membranes)",
    badges: [{ label: "Solvent bitumen primer", tone: "navy" }],
    appInfo: kp([
      "Solvent-based bitumen-modified primer (black)",
      "Primer to seal/prepare substrates before torch-applied membranes",
      "",
      "",
      "",
      "ARDEX torch-applied (Shelterbit) membranes",
    ]),
    bestFor: [
      "Solvent bitumen primer that keys the substrate for torch-applied (Shelterbit) bitumen membranes",
    ],
    avoidWhere: [
      "Under water-based liquid membranes (use WPM 265)",
      "Enclosed / occupied spaces without ventilation — it is solvent-based",
    ],
    warnings: [
      "Solvent-based — confirm ventilation / VOC and flammability controls",
      "Confirm coverage and tack-off time against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 240 is a solvent-based, bitumen-modified primer used to seal and prepare substrates before the installation of torch-applied (Shelterbit) bitumen membranes. Black liquid; 20 L pail.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Solvent-based bitumen-modified primer", source: "ardexaustralia.com WPM 240" },
        { label: "Use", value: "Primer for torch-applied (Shelterbit) membranes", source: "ardexaustralia.com WPM 240" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "SikaTile-010 Secure Prime",
    shortType: "1-part ready-to-use primer (crystalline, efflorescence-inhibiting)",
    badges: [{ label: "Ready-to-use primer", tone: "blue" }],
    appInfo: kp([
      "1-part ready-to-use primer (crystalline)",
      "Porosity-reducing primer; keyed finish for membrane/tile adhesion; efflorescence-inhibiting",
      "Porous & dense — concrete, screed, render",
      "",
      "Allow to dry before overcoating",
      "Sika membranes / tile adhesives / Sikalastic Moisture Seal",
    ]),
    bestFor: [
      "Crystalline efflorescence-inhibiting primer — reduces substrate porosity and dries to a keyed finish for strong adhesion",
      "Suits porous and dense substrates; brush, roller or low-pressure spray",
    ],
    avoidWhere: [
      "As a moisture-barrier DPM over wet substrates (use a moisture-seal / epoxy primer)",
    ],
    warnings: [
      "Allow to dry fully before the waterproofing membrane or tile adhesive",
      "Confirm coverage against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "SikaTile-010 Secure Prime is a high-performance, ready-to-use, 1-part primer with efflorescence-inhibiting crystalline technology that reduces the porosity of concrete, screeds and renders and dries to a keyed finish for excellent adhesion of tiles and Sika coatings (e.g. Sikalastic Moisture Seal). Applied by brush, roller or low-pressure spray.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-part ready-to-use crystalline primer", source: "aus.sika.com SikaTile-010 Secure Prime" },
        { label: "Function", value: "Porosity-reducing / efflorescence-inhibiting; keyed finish", source: "aus.sika.com SikaTile-010 Secure Prime" },
        { label: "Application", value: "Brush / roller / low-pressure spray", source: "aus.sika.com SikaTile-010 Secure Prime" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikalastic Moisture Seal",
    shortType: "Moisture-tolerant primer (green screeds/renders, AAC)",
    badges: [{ label: "Moisture-tolerant primer", tone: "navy" }],
    appInfo: kp([
      "Moisture-tolerant primer",
      "Primer for green/young screeds & renders and AAC",
      "Green screeds / renders, autoclaved aerated concrete (AAC)",
      "",
      "",
      "Sika Sikalastic liquid membranes (e.g. Sikalastic-487)",
    ]),
    bestFor: [
      "Moisture-tolerant primer for green/young screeds and renders and autoclaved aerated concrete — allows earlier membrane application",
      "Part of the Sika Sikalastic system",
    ],
    avoidWhere: [
      "As a structural moisture barrier under hydrostatic pressure (confirm the correct DPM)",
    ],
    warnings: [
      "Confirm the substrate moisture limit and overcoat window against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika Sikalastic Moisture Seal is a moisture-tolerant primer used over green/young screeds and renders and autoclaved aerated concrete (AAC) ahead of a Sika Sikalastic liquid membrane. Confirm the substrate moisture limit and overcoat window against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Moisture-tolerant primer", source: "aus.sika.com Sikalastic Moisture Seal" },
        { label: "Use", value: "Green screeds/renders & AAC; primes Sikalastic membranes", source: "aus.sika.com Sikalastic Moisture Seal" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitobond SBR",
    shortType: "SBR latex bonding agent / cement admixture",
    badges: [{ label: "SBR latex", tone: "navy" }],
    appInfo: kp([
      "SBR latex polymer (white liquid)",
      "Bonding agent + gauging admixture for mortars, screeds, renders, slurries",
      "Cementitious — repair mortars, toppings, screeds, waterproof renders",
      "",
      "",
      "Cementitious repair / screed / render & slurry systems",
    ]),
    bestFor: [
      "Water-resistant SBR latex — improves strength, adhesion and water resistance of repair mortars, screeds, waterproof renders and slurries",
      "Used both as a brushed bond coat and as a gauging admixture",
    ],
    avoidWhere: [
      "As a standalone waterproof membrane (it is a bonding agent / admixture)",
    ],
    warnings: [
      "Confirm dosage / mix and the bond-coat (wet-on-wet) method against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitobond SBR is a water-resistant modified styrene-butadiene-rubber emulsion (white liquid) for improving the strength and adhesion of concrete repair mortars, cementitious floor toppings and screeds, waterproof renders and cementitious slurries — used as a bond coat and as a gauging admixture. Supplied via Parchem Construction Supplies (DuluxGroup).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "SBR latex polymer (white liquid)", source: "fosroc.com.au Nitobond SBR" },
        { label: "Function", value: "Bonding agent + gauging admixture", source: "fosroc.com.au Nitobond SBR" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitobond EP",
    shortType: "2-component epoxy bonding agent",
    badges: [{ label: "2-part epoxy", tone: "navy" }],
    appInfo: kp([
      "2-component epoxy bonding agent",
      "Structural bond coat — fresh wet cementitious to existing; damp/wet substrate barrier",
      "Existing cementitious substrates",
      "",
      "",
      "Cementitious repair / topping systems",
    ]),
    bestFor: [
      "Epoxy bond coat for bonding fresh wet cementitious materials to hardened concrete; internal and external",
      "Can also act as a substrate/repair barrier where the substrate is permanently damp or wet",
    ],
    avoidWhere: [
      "As a waterproof membrane (it is a bonding agent)",
    ],
    warnings: [
      "Two-part epoxy — observe pot life and open time; bond within the window",
      "Confirm mix and application against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitobond EP is a two-component epoxy bonding agent for bonding fresh wet cementitious materials to existing cementitious surfaces, internal and external. It may also be used as a substrate/repair barrier within a repair system where the substrate is likely to remain permanently damp or wet. Supplied via Parchem (DuluxGroup).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-component epoxy bonding agent", source: "fosroc.com.au Nitobond EP" },
        { label: "Function", value: "Fresh-to-hardened cementitious bond; damp/wet barrier", source: "fosroc.com.au Nitobond EP" },
      ],
    },
  },
  {
    brand: "Gripset Industries",
    rangeName: "Gripset 11Y",
    shortType: "Concentrated SBR latex admixture / high-bond slurry primer",
    badges: [{ label: "SBR latex (concentrated)", tone: "navy" }],
    appInfo: kp([
      "Concentrated SBR latex polymer admixture",
      "High-bond slurry primer + cement admixture; waterproof slurry coat",
      "Porous concrete, blockwork (incl. immersed / subterranean)",
      "Slurry primer ~1 L / 3 m²",
      "",
      "Cement-based systems; pools, tanks, immersed/underground",
    ]),
    bestFor: [
      "Concentrated SBR latex — high-bond slurry primer and thin waterproof protective slurry for immersed, subterranean, pool and tank areas",
      "Boosts adhesion, strength and water resistance of cement-based compounds",
    ],
    avoidWhere: [
      "As a finished trafficable membrane (it is a primer / admixture / slurry)",
    ],
    warnings: [
      "Confirm the slurry-primer mix (1:1:1 Gripset 11Y : sharp sand : cement, ~1 mm) and coverage against the current Gripset TDS",
    ],
    advanced: {
      description:
        "Gripset 11Y is a concentrated SBR latex polymer admixture that enhances adhesion, strength, water resistance and general performance of cement-based compounds — used as a high-bond slurry primer (1:1:1 with sharp sand and cement, ~1 mm) and as a gauging admixture, including for immersed/subterranean areas, pools and tanks. Slurry-primer coverage ~1 L per 3 m².",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Concentrated SBR latex polymer admixture", source: "gripset.com Gripset 11Y" },
        { label: "Slurry primer", value: "1:1:1 with sand + cement; ~1 L / 3 m²", source: "gripset.com Gripset 11Y" },
        { label: "Use", value: "High-bond primer; immersed / pools / tanks", source: "gripset.com Gripset 11Y" },
      ],
    },
  },
  {
    brand: "Tremco CPG Australia",
    rangeName: "Tremco TREMproof Torch Bitumen Primer",
    shortType: "Solvent-based modified-bitumen primer (for torch membranes)",
    badges: [{ label: "Solvent bitumen primer", tone: "navy" }],
    appInfo: kp([
      "Solvent-based modified-bitumen primer",
      "Primer to key the substrate for Tremco torch-applied membranes",
      "",
      "6–8 m² / L",
      "Apply membrane once tack-free",
      "Tremco TREMproof Torch / 560A membranes",
    ]),
    bestFor: [
      "Solvent bitumen primer that keys the substrate for Tremco TREMproof Torch and 560A membranes (6–8 m²/L)",
    ],
    avoidWhere: [
      "Under water-based liquid membranes",
      "Enclosed / occupied spaces without ventilation — it is solvent-based",
    ],
    warnings: [
      "Solvent-based — ventilation / VOC and flammability controls required",
      "Apply the membrane once the primer is tack-free",
    ],
    advanced: {
      description:
        "Tremco TREMproof Torch Bitumen Primer is a solvent-based, modified-bitumen primer that assists adhesion of the TREMproof Torch and TREMproof 560A membranes to the substrate. Applied at 6–8 m²/L; allow to become tack-free before applying the membrane.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Solvent-based modified-bitumen primer", source: "tremco.com.au TREMproof Torch Bitumen Primer" },
        { label: "Coverage", value: "6–8 m² / L", source: "tremco.com.au TREMproof Torch Bitumen Primer" },
        { label: "Use", value: "Primer for TREMproof Torch / 560A membranes", source: "tremco.com.au TREMproof Torch Bitumen Primer" },
      ],
    },
  },
  {
    brand: "Westox Building Products",
    rangeName: "Westox Wesprime",
    shortType: "Pre-mixed primer for the Westox coating system",
    badges: [{ label: "Pre-mixed primer", tone: "navy" }],
    appInfo: kp([
      "Pre-mixed primer",
      "Primer for Westox coatings over masonry / concrete / timber",
      "Wood, cement roof tiles, render, concrete, sound previously-coated substrates",
      "",
      "1 h dry before top coat",
      "Westox Colourcote / Satintex / Glosstex / Wesdex",
    ]),
    bestFor: [
      "Pre-mixed primer for the Westox coating system over wood, cement roof tiles, render, concrete and sound previously-coated substrates",
    ],
    avoidWhere: [
      "As a primer for non-Westox membranes/coatings without confirmation",
    ],
    warnings: [
      "Allow 1 h drying before the top coat",
      "Confirm substrate suitability against the current Westox TDS",
    ],
    advanced: {
      description:
        "Westox Wesprime is a pre-mixed primer for wood, cement roof tiles, cement render, concrete or sound previously-coated substrates to be coated with Westox Colourcote, Satintex, Glosstex or Wesdex. Allow one hour drying before applying the top coat.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Pre-mixed primer", source: "westox.com Wesprime" },
        { label: "Dry", value: "1 h before top coat", source: "westox.com Wesprime" },
      ],
    },
  },
];
