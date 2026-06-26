// ──────────────────────────────────────────────────────────────────────────────
// Flexible cementitious waterproofing membranes — hand-authored selection cards
// (balcony / wet-area / podium / below-grade). Values from the CURRENT AUSTRALIAN
// manufacturer source; "CONFIRM (… AU TDS)" = not stated on the AU source — never
// guessed. Discriminators here differ from liquid membranes: 1C vs 2C, AS 4858
// flexibility class, crack-bridging (mm), positive- vs negative-side capability,
// and whether trafficable/exposed only when overcoated.
//
// appInfo carries the comparison columns: Chemistry · Components · AS 4858 class ·
// Crack-bridging · Build / coverage · Positive / negative side · Primer / substrate.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Chemistry", "Components", "AS 4858 class", "Crack-bridging", "Build / coverage", "Positive / negative side", "Primer / substrate", "Class 2 / NCC tested", "Warranty"];
// Class 2 / NCC tested = documented AU test evidence only (CSIRO/BRANZ/CodeMark) —
// defaults to "N/A". Warranty defaults to a CONFIRM (usually system/applicator-based).
const DEFAULTS: Record<number, string> = { 7: "N/A", 8: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "N/A" }));

export const CEMENTITIOUS_FLEX_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 002",
    shortType: "2-part modified cementitious membrane — under tile/screed",
    badges: [{ label: "2-part cementitious", tone: "navy" }, { label: "AS 4858 + AS 4654", tone: "blue" }],
    appInfo: kp([
      "Modified cementitious (liquid + powder)",
      "2-part",
      "CONFIRM class (AS 4858 + AS 4654)",
      "CONFIRM (Ardex AU TDS)",
      "2 coats · 16–24 m² / 40 kg kit",
      "CONFIRM (Ardex AU TDS)",
      "WPM 300 / 265 / 368 / Multiprime",
      "AS 4858 + AS 4654 — Ardex test certificates",
    ]),
    bestFor: [
      "Dual AS 4858 (wet-area) + AS 4654 (external) compliance under tile, screed and paver/decking systems",
      "Fast 1–2 h recoat; ready to tile in 24 h",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a tile/screed cover",
      "Negative-side / below-grade duty unless confirmed on the TDS",
    ],
    warnings: [
      "Primer mandatory — WPM 300 / 265 / 368 / Multiprime; confirm per substrate",
      "Confirm AS 4858 class, crack-bridging and DFT against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 002 is a two-part modified cementitious waterproofing membrane (Part A liquid 20 kg + Part B powder 20 kg) compliant to AS 4858 and AS 4654, applied in 2 coats under tiles, screeds and paver/decking systems internally and externally (16–24 m² per 40 kg kit). Recoat 1–2 h; ready to tile 24 h; full cure 3 days; primer WPM 300/265/368/Multiprime. CONFIRM AS 4858 class and crack-bridging against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-part modified cementitious (liquid + powder)", source: "ardexaustralia.com WPM 002" },
        { label: "Standards", value: "AS 4858 + AS 4654", source: "ardexaustralia.com WPM 002" },
        { label: "Coverage", value: "16–24 m² / 40 kg kit (2 coats)", source: "ardexaustralia.com WPM 002" },
        { label: "Recoat / cure", value: "Recoat 1–2 h · tile 24 h · full cure 3 days", source: "ardexaustralia.com WPM 002" },
        { label: "Primer", value: "WPM 300 / 265 / 368 / Multiprime", source: "ardexaustralia.com WPM 002" },
        { label: "Pack / colour", value: "20 kg A + 20 kg B · grey", source: "ardexaustralia.com WPM 002" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapelastic Smart",
    shortType: "2-component high-flexibility cementitious mortar",
    badges: [{ label: "2-component cementitious", tone: "navy" }, { label: "Class II · >2 mm", tone: "blue" }],
    appInfo: kp([
      "High-flexibility cementitious mortar",
      "2-component",
      "Class II (elongation 170%)",
      ">2 mm",
      "Trowel or roller · coverage CONFIRM",
      "Positive; AS 4654.1 exposed non-trafficable",
      "CONFIRM (Mapei AU TDS)",
      "AS 4858 (II) + AS 4654.1 — CSIRO tested",
    ]),
    bestFor: [
      "High flexibility — 170% elongation (Class II) with crack-bridging >2 mm — the flexible cementitious benchmark here",
      "AS 4858 Class II (CSIRO) and AS 4654.1 exposed non-trafficable — balconies, terraces, bathrooms and pools",
    ],
    avoidWhere: [
      "Trafficable exposed use — rated exposed non-trafficable (needs tile/screed for traffic)",
      "Negative-side / below-grade duty (use Mapelastic Foundation)",
    ],
    warnings: [
      "Exposed but NON-trafficable — protect with tile/screed where trafficked",
      "Confirm coverage, DFT and primer against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapelastic Smart is a two-component, high-flexibility cementitious mortar with crack-bridging >2 mm and 170% elongation (AS/NZS 4858 Class II, tested by CSIRO; AS 4654.1 exposed, non-trafficable), applied by trowel or roller for waterproofing balconies, terraces, bathrooms and swimming pools. CONFIRM coverage, DFT and primer against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-component high-flexibility cementitious mortar", source: "mapei.com/au Mapelastic Smart" },
        { label: "AS 4858 class", value: "Class II (elongation 170%) — CSIRO", source: "mapei.com/au Mapelastic Smart" },
        { label: "Crack-bridging", value: ">2 mm", source: "mapei.com/au Mapelastic Smart" },
        { label: "External", value: "AS 4654.1 — exposed, non-trafficable", source: "mapei.com/au Mapelastic Smart" },
        { label: "Application", value: "Trowel or roller", source: "mapei.com/au Mapelastic Smart" },
        { label: "Coverage / primer", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au Mapelastic Smart" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapelastic Foundation",
    shortType: "2-component flexible cementitious — positive/negative side",
    badges: [{ label: "2-component cementitious", tone: "navy" }, { label: "Pos / NEG side", tone: "blue" }],
    appInfo: kp([
      "Flexible cementitious mortar",
      "2-component",
      "CONFIRM (Mapei AU TDS)",
      "CONFIRM (Mapei AU TDS)",
      "CONFIRM (Mapei AU TDS)",
      "POSITIVE or NEGATIVE pressure",
      "CONFIRM (Mapei AU TDS)",
    ]),
    bestFor: [
      "Waterproofs under both positive AND negative water pressure — basements, foundations, pools and retaining/below-grade structures",
      "Flexible 2-component cementitious bonded to concrete and masonry",
    ],
    avoidWhere: [
      "Where the higher elongation / >2 mm crack-bridging of Mapelastic Smart is required for a flexing balcony",
      "Exposed trafficable use without a protective cover",
    ],
    warnings: [
      "Confirm AS 4858 class, crack-bridging, coverage and primer against the current Mapei Australia TDS",
      "Negative-side application — confirm the substrate and detailing per the TDS",
    ],
    advanced: {
      description:
        "Mapei Mapelastic Foundation is a two-component, flexible cementitious mortar for waterproofing concrete and masonry under positive or negative water pressure — basements, pools, foundations and below-grade structures. CONFIRM AS 4858 class, crack-bridging, coverage and primer against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-component flexible cementitious mortar", source: "mapei.com/au Mapelastic Foundation" },
        { label: "Pressure side", value: "Positive or negative", source: "mapei.com/au Mapelastic Foundation" },
        { label: "Use", value: "Basements, pools, foundations, below-grade", source: "mapei.com/au Mapelastic Foundation" },
        { label: "Class / crack-bridging / coverage / primer", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au Mapelastic Foundation" },
      ],
    },
  },
  {
    brand: "Davco / Sika Australia",
    rangeName: "Davco K11 Flex",
    shortType: "2-part acrylic-modified cementitious membrane",
    badges: [{ label: "2-part acrylic-cementitious", tone: "navy" }],
    appInfo: kp([
      "Acrylic-modified cementitious",
      "2-part",
      "CONFIRM (Davco AU TDS)",
      "CONFIRM (Davco AU TDS)",
      "≥2 coats · 1st coat ~1–1.5 kg/m² · WFT 0.7±0.1 mm/coat",
      "CONFIRM (Davco AU TDS)",
      "Saturate/wet substrate first; brush or float",
    ]),
    bestFor: [
      "Acrylic-modified 2-part cementitious — reacts to a hard, elastic film bonded to concrete and masonry",
      "Defined build: ~1–1.5 kg/m² first coat, 0.7±0.1 mm WFT per coat, brush or float",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a tile/screed cover",
      "Application to a dry/dusty substrate — surface must be saturated (SSD) first",
    ],
    warnings: [
      "Saturate the substrate (SSD) before application",
      "Confirm AS 4858 class, crack-bridging, total coats/DFT and primer against the current Davco / Sika Australia TDS",
    ],
    advanced: {
      description:
        "Davco K11 Flex is a flexible, 2-part acrylic-modified cementitious waterproofing system whose components react to a hard, elastic film bonded to concrete and masonry. Applied by brush or float over a saturated (SSD) substrate; first coat ~1–1.5 kg/m², wet film 0.7±0.1 mm per coat. CONFIRM AS 4858 class, crack-bridging, total coats/DFT and primer against the current Davco / Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-part acrylic-modified cementitious", source: "Davco K11 Flex TDS (Sika)" },
        { label: "Build", value: "1st coat ~1–1.5 kg/m² · WFT 0.7±0.1 mm/coat", source: "Davco K11 Flex TDS (Sika)" },
        { label: "Substrate / application", value: "Saturate (SSD) first · brush or float", source: "Davco K11 Flex TDS (Sika)" },
        { label: "Class / crack-bridging / primer", value: "CONFIRM (Davco AU TDS)", source: "Davco K11 Flex TDS (Sika)" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitoproof 410",
    shortType: "Water-based 2-part polymer-modified cementitious (fast-dry)",
    badges: [{ label: "2-component cementitious", tone: "navy" }, { label: "Trafficable if overcoated", tone: "blue" }],
    appInfo: kp([
      "Water-based polymer-modified cementitious (fast-dry)",
      "2-component",
      "CONFIRM (Fosroc AU TDS)",
      "CONFIRM (Fosroc AU TDS)",
      "Part A 12.5 L + Part B 12.5 kg · coverage CONFIRM",
      "Under toppings/tiles; exposed foot-traffic ONLY if overcoated (Nitoproof Top Coat UV)",
      "CONFIRM (Fosroc AU TDS)",
      "AS 4654.1 — CSIRO / ISO 17025 test report",
    ]),
    bestFor: [
      "Fast-drying flexible 2-component cementitious for under toppings, tiles and protected environments",
      "Can serve as a foot-trafficable exposed roof/balcony deck membrane when overcoated with Nitoproof Top Coat UV",
    ],
    avoidWhere: [
      "Exposed foot-trafficable use WITHOUT the Nitoproof Top Coat UV overcoat",
      "Negative-side / below-grade duty unless confirmed on the TDS",
    ],
    warnings: [
      "Exposed/trafficable only when overcoated with Nitoproof Top Coat UV — do not leave the base membrane exposed",
      "Confirm AS 4858 class, crack-bridging, coverage and primer against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitoproof 410 is a water-based, fast-drying, flexible two-component polymer-modified cementitious waterproofing membrane (Part A 12.5 L + Part B 12.5 kg) for under toppings, tiles and other protected environments. It may be used as a foot-trafficable exposed roof or balcony deck membrane only when overcoated with Nitoproof Top Coat UV. CONFIRM AS 4858 class, crack-bridging, coverage and primer against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based 2-part polymer-modified cementitious (fast-dry)", source: "fosroc.com.au Nitoproof 410" },
        { label: "Exposure", value: "Protected/under-topping; exposed foot-traffic if overcoated (Nitoproof Top Coat UV)", source: "fosroc.com.au Nitoproof 410" },
        { label: "Pack", value: "Part A 12.5 L + Part B 12.5 kg", source: "fosroc.com.au Nitoproof 410" },
        { label: "Class / crack-bridging / coverage / primer", value: "CONFIRM (Fosroc AU TDS)", source: "fosroc.com.au Nitoproof 410" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikalastic-1K",
    shortType: "1-component fibre-reinforced flexible cementitious",
    badges: [{ label: "1-component cementitious", tone: "navy" }, { label: "Fibre-reinforced", tone: "blue" }],
    appInfo: kp([
      "1-component fibre-reinforced cementitious mortar",
      "1-component",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
      "CONFIRM (Sika AU TDS)",
    ]),
    bestFor: [
      "Single-component (mix with water only) fibre-reinforced flexible cementitious — simpler site mixing than 2-part systems",
    ],
    avoidWhere: [
      "Where a confirmed higher-flexibility / negative-side cementitious is specified — confirm class on the TDS",
    ],
    warnings: [
      "Confirm AS 4858 class, crack-bridging, coats/DFT, coverage and primer against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika Sikalastic-1K is a one-component, fibre-reinforced cementitious mortar for flexible waterproofing. The AU TDS PDF was not machine-readable at time of writing — CONFIRM AS 4858 class, crack-bridging, coats/DFT, coverage and primer against the current Sika Australia Sikalastic-1K TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-component fibre-reinforced cementitious mortar", source: "aus.sika.com Sikalastic-1K" },
        { label: "All other fields", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com Sikalastic-1K — PDF CONFIRM" },
      ],
    },
  },
  {
    brand: "Westox Building Products",
    rangeName: "Westox Flexible Cement Membrane (FCM) Kit 18 kg",
    shortType: "2-component latex-cementitious membrane (Australian-made)",
    badges: [{ label: "Latex-cementitious", tone: "navy" }, { label: "AU-made", tone: "blue" }],
    appInfo: kp([
      "Latex-based 2-component cementitious emulsion",
      "2-component (liquid + powder)",
      "CONFIRM (Westox AU TDS)",
      "CONFIRM (Westox AU TDS)",
      "Min 2 × 1 mm coats · ~1 m² / L per coat",
      "CONFIRM (Westox AU TDS)",
      "CONFIRM (Westox AU TDS)",
    ]),
    bestFor: [
      "Australian-made 2-component latex-cementitious flexible waterproof coating",
      "Defined build: minimum 2 × 1 mm coats at ~1 m² per litre per coat",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a protective cover — confirm on the TDS",
      "Where a specified AS 4858 class / crack-bridging value must be documented (CONFIRM)",
    ],
    warnings: [
      "Confirm AS 4858 class, crack-bridging, primer and substrate prep against the current Westox TDS",
      "Mix Part B powder slowly into Part A liquid while mixing",
    ],
    advanced: {
      description:
        "Westox Flexible Cement Membrane (FCM) is a two-component, latex-based cementitious emulsion that mixes to a flexible waterproof coating — 100% Australian-owned and made. Apply a minimum of 2 × 1 mm coats at approximately 1 m² per litre per coat. CONFIRM AS 4858 class, crack-bridging, primer and substrate prep against the current Westox TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Latex-based 2-component cementitious emulsion", source: "westox.com FCM" },
        { label: "Build / coverage", value: "Min 2 × 1 mm coats · ~1 m² / L per coat", source: "westox.com FCM" },
        { label: "Pack", value: "FCM Kit 18 kg (Part A liquid + Part B powder)", source: "westox.com FCM" },
        { label: "Class / crack-bridging / primer", value: "CONFIRM (Westox AU TDS)", source: "westox.com FCM" },
      ],
    },
  },
];
