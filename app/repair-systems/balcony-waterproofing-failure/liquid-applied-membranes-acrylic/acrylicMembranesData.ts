// ──────────────────────────────────────────────────────────────────────────────
// Liquid-applied acrylic / SBR-latex waterproofing membranes — hand-authored
// selection cards (balcony / wet-area / roof / podium). Values from the CURRENT
// AUSTRALIAN manufacturer source; "CONFIRM (… AU TDS)" = not stated on the AU
// source — never guessed. Discriminators: chemistry (acrylic vs SBR latex),
// AS 4858 wet-area class vs AS 4654 external/exposed rating, UV/exposure class
// (under-tile vs exposed trafficable), build/DFT, crack-bridging.
//
// appInfo carries the comparison columns: Chemistry · AS 4858 class · External
// (AS 4654) · Build · Coverage · Finish/exposure · Primer.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Chemistry", "AS 4858 class", "External (AS 4654)", "Build", "Coverage", "Finish / exposure", "Primer", "Class 2 / NCC tested", "Warranty"];
// Class 2 / NCC tested = documented AU test evidence only (CSIRO/BRANZ/CodeMark) —
// defaults to "N/A". Warranty defaults to a CONFIRM (usually system/applicator-based).
const DEFAULTS: Record<number, string> = { 7: "N/A", 8: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "N/A" }));

export const ACRYLIC_MEMBRANE_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 909",
    shortType: "1-part water-based acrylic — exposed trafficable roof/podium",
    badges: [{ label: "Water-based acrylic", tone: "blue" }, { label: "Exposed / UV", tone: "navy" }],
    appInfo: kp([
      "1-part water-based acrylic",
      "CONFIRM — rated to AS 4654 (not AS 4858)",
      "Yes — AS 4654",
      "2 coats; DFT CONFIRM",
      "8–9 m² / 15 L (2 coats)",
      "EXPOSED — UV-resistant, pedestrian-trafficable",
      "Optional — WPM 300 / WPM 265 / Multiprime",
      "AS 4654.1 — Ardex test report",
    ]),
    bestFor: [
      "Exposed, UV-resistant pedestrian-trafficable acrylic for rooftops, podiums and walkways — no tile/screed cover required",
      "Slip- and abrasion-resistant finish; primer optional on sound substrates",
    ],
    avoidWhere: [
      "Under-tile / under-screed wet-area duty where an AS 4858 Class membrane is specified",
      "Permanently-wet / ponding or immersed areas (acrylic/SBR re-emulsification risk) — confirm on the TDS",
    ],
    warnings: [
      "Rated to AS 4654 (external) — NOT an AS 4858 wet-area membrane; confirm classification before specifying",
      "Confirm DFT, recoat/cure and ponding tolerance against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 909 is a single-component, water-based acrylic waterproofing membrane compliant to AS 4654, for exposed pedestrian-trafficable rooftops, podiums and walkways with excellent UV resistance and slip/abrasion resistance. Two-coat application, 8–9 m² per 15 L drum; primer (WPM 300 / WPM 265 / Multiprime) optional on sound substrates. Light grey. CONFIRM DFT, recoat/cure and ponding tolerance against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "1-part water-based acrylic", source: "ardexaustralia.com WPM 909" },
        { label: "Standard", value: "AS 4654 (external above-ground)", source: "ardexaustralia.com WPM 909" },
        { label: "Build / coverage", value: "2 coats · 8–9 m² / 15 L", source: "ardexaustralia.com WPM 909" },
        { label: "Exposure", value: "Exposed, UV-resistant, pedestrian-trafficable", source: "ardexaustralia.com WPM 909" },
        { label: "Primer", value: "Optional — WPM 300 / WPM 265 / Multiprime", source: "ardexaustralia.com WPM 909" },
        { label: "Pack / colour", value: "15 L drum · light grey", source: "ardexaustralia.com WPM 909" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 310",
    shortType: "Water-based acrylic — exposed facade / roof (tintable)",
    badges: [{ label: "Water-based acrylic", tone: "blue" }, { label: "UV-stable / tintable", tone: "navy" }],
    appInfo: kp([
      "Water-based acrylic (tintable)",
      "CONFIRM — AS 4654 certified",
      "Yes — AS 4654",
      "0.3 mm DFT (walls) / 1.0 mm (roof)",
      "~24 m² / 15 L (2 coats @ 0.3 mm)",
      "EXPOSED facade / roof — UV-stable",
      "CONFIRM (Ardex AU TDS)",
      "AS 4654 — Ardex test certification",
    ]),
    bestFor: [
      "Exposed, UV-stable acrylic facade and roof coating — tintable to a wide colour range for fair-faced finishes",
      "Defined builds: 0.3 mm DFT for walls/facades, 1.0 mm for roof; recoat in 4 h",
    ],
    avoidWhere: [
      "Under-tile wet-area duty (AS 4858) — this is an exposed coating, not an undertile membrane",
      "Ponding / immersion — confirm on the TDS",
    ],
    warnings: [
      "Full cure ~7 days — protect from rain/traffic until cured",
      "Confirm AS 4858 applicability, primer and substrate prep against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 310 is a water-based acrylic membrane (AS 4654 certified) for exposed facades and roofs, UV-stable and tintable to a wide colour range. Applied in 2 coats to 0.3 mm DFT for walls/facades (≈24 m² per 15 L) or 1.0 mm for roofs; recoat 4 h, full cure ~7 days. CONFIRM AS 4858 applicability, primer and substrate prep against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based acrylic (tintable)", source: "ardexaustralia.com WPM 310" },
        { label: "Standard", value: "AS 4654 certified", source: "ardexaustralia.com WPM 310" },
        { label: "Build", value: "0.3 mm DFT walls / 1.0 mm roof (2 coats)", source: "ardexaustralia.com WPM 310" },
        { label: "Coverage", value: "~24 m² / 15 L (2 coats @ 0.3 mm)", source: "ardexaustralia.com WPM 310" },
        { label: "Recoat / cure", value: "Recoat 4 h · full cure ~7 days", source: "ardexaustralia.com WPM 310" },
        { label: "Colour", value: "Tintable (Koala Grey / White certified)", source: "ardexaustralia.com WPM 310" },
      ],
    },
  },
  {
    brand: "Crommelin",
    rangeName: "Crommelin Wetite",
    shortType: "Water-based acrylic / SBR under-tile membrane (standard cure)",
    badges: [{ label: "Water-based acrylic/SBR", tone: "blue" }],
    appInfo: kp([
      "Water-based acrylic / SBR under-tile membrane",
      "Class III (CONFIRM)",
      "CONFIRM (Crommelin AU TDS)",
      "CONFIRM (Crommelin AU TDS)",
      "CONFIRM (Crommelin AU TDS)",
      "Under tile / wet area",
      "CONFIRM (Crommelin AU TDS)",
    ]),
    bestFor: [
      "Established water-based under-tile wet-area membrane — standard-cure counterpart to Wetite Rapid",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a tile/screed cover",
      "Programme-critical work where the rapid recoat of Wetite Rapid is needed",
    ],
    warnings: [
      "Confirm AS 4858 class, build/DFT, coverage, recoat and primer against the current Crommelin TDS",
    ],
    advanced: {
      description:
        "Crommelin Wetite is a water-based acrylic/SBR under-tile waterproofing membrane for wet areas — the standard-cure counterpart to Wetite Rapid. CONFIRM AS 4858 class, build/DFT, coverage, recoat time and primer against the current Crommelin Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based acrylic / SBR under-tile membrane", source: "crommelin.com.au Wetite" },
        { label: "All other fields", value: "CONFIRM (Crommelin AU TDS)", source: "crommelin.com.au Wetite — CONFIRM" },
      ],
    },
  },
  {
    brand: "Crommelin",
    rangeName: "Crommelin Wetite Rapid",
    shortType: "Water-based SBR polymer — rapid under-tile membrane",
    badges: [{ label: "Water-based SBR (rapid)", tone: "blue" }, { label: "Class III", tone: "navy" }],
    appInfo: kp([
      "Water-based SBR polymer (rapid-dry)",
      "Class III (AS 4858)",
      "Yes — AS 4654 + AS 3740",
      "Recoat 1–2 h; tile over ~4 h; DFT CONFIRM",
      "CONFIRM (Crommelin AU TDS)",
      "Under tile (rapid; keyed finish)",
      "CONFIRM (Crommelin AU TDS)",
    ]),
    bestFor: [
      "Rapid recoat (1–2 h) and tile-over in as little as 4 h — programme advantage for under-tile wet-area work",
      "Permanent Class III elongation; keyed finish promotes tile-adhesive bond",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a tile/screed cover",
      "Substrates outside the AS 4858 / AS 4654 scope — confirm on the TDS",
    ],
    warnings: [
      "Confirm total DFT, coverage and primer against the current Crommelin TDS",
      "SBR latex — confirm permanently-wet/ponding suitability before specifying",
    ],
    advanced: {
      description:
        "Crommelin Wetite Rapid is a water-based SBR-polymer waterproofing membrane modified for rapid drying and tile-over, compliant with AS 4858 Wet Area Membranes (Class III), AS 3740 and AS 4654. Rapid recoat 1–2 h; tile over in as little as 4 h; permanent Class III elongation; keyed finish. CONFIRM total DFT, coverage and primer against the current Crommelin Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based SBR polymer (rapid-dry)", source: "crommelin.com.au Wetite Rapid" },
        { label: "AS 4858 class", value: "Class III", source: "crommelin.com.au Wetite Rapid" },
        { label: "Standards", value: "AS 4858 + AS 3740 + AS 4654", source: "crommelin.com.au Wetite Rapid" },
        { label: "Recoat / tile over", value: "Recoat 1–2 h · tile over ~4 h", source: "crommelin.com.au Wetite Rapid" },
        { label: "Finish", value: "Under-tile; keyed finish for adhesive bond", source: "crommelin.com.au Wetite Rapid" },
        { label: "DFT / coverage / primer", value: "CONFIRM (Crommelin AU TDS)", source: "crommelin.com.au Wetite Rapid" },
      ],
    },
  },
  {
    brand: "Gripset Industries",
    rangeName: "Gripset 38FC",
    shortType: "Water-based fibre-reinforced SBR latex — fast-cure under-tile",
    badges: [{ label: "SBR latex (fibre)", tone: "navy" }, { label: "Fast-cure", tone: "blue" }],
    appInfo: kp([
      "Water-based fibre-reinforced SBR latex (fast-cure)",
      "AS 4858 (CSIRO TA 349 / AS 3740)",
      "Yes — AS 4654.1",
      "≥2 coats · 1.5 L/m² · min 1.0 mm DFT",
      "1.5 L/m² (≈10 m² / 15 L)",
      "Under toppings / screeds / tile beds (int + ext)",
      "CONFIRM (Gripset AU TDS)",
      "AS 4858 + AS 4654.1 — CSIRO TA 349; BRANZ CodeMark",
    ]),
    bestFor: [
      "Fast-cure fibre-reinforced SBR latex — 1 h recoat, tile in 4 h, flood test 24 h",
      "Elastomeric crack-bridging with low water-vapour transmission; brush or medium-nap roller",
    ],
    avoidWhere: [
      "Exposed UV trafficable use without a topping/screed/tile cover",
      "Below the minimum 1.0 mm dried film (≥2 coats, 1.5 L/m²)",
    ],
    warnings: [
      "Confirm the correct Gripset primer and substrate prep against the current Gripset AU TDS",
      "Achieve the full 1.0 mm DFT (≥2 coats @ 1.5 L/m² total)",
    ],
    advanced: {
      description:
        "Gripset 38FC is a water-based, fast-cure, fibre-reinforced SBR-latex membrane compliant with AS 4858 (internal wet areas) and AS 4654.1 (external above-ground), holding CSIRO Technical Assessment 349 for AS 3740. Apply ≥2 coats by brush or medium-nap roller to a total 1.5 L/m² and a minimum 1.0 mm dried film (≈10 m² per 15 L). Recoat 1 h; tile/toppings 4 h; flood test 24 h. For internal and external wet areas under toppings, screeds or tile beds. CONFIRM primer against the current Gripset Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based fibre-reinforced SBR latex (fast-cure)", source: "gripset.com Gripset 38FC" },
        { label: "Standards", value: "AS 4858 + AS 4654.1 · CSIRO TA 349 (AS 3740)", source: "gripset.com Gripset 38FC" },
        { label: "Build", value: "≥2 coats · 1.5 L/m² · min 1.0 mm DFT", source: "gripset.com Gripset 38FC" },
        { label: "Coverage", value: "1.5 L/m² (≈10 m² / 15 L)", source: "gripset.com Gripset 38FC" },
        { label: "Drying", value: "Recoat 1 h · tile 4 h · flood test 24 h", source: "gripset.com Gripset 38FC" },
        { label: "Application", value: "Brush or medium-nap roller", source: "gripset.com Gripset 38FC" },
      ],
    },
  },
  {
    brand: "Gripset Industries",
    rangeName: "Gripset RD",
    shortType: "Water-based acrylic — exposed weatherproofing (light-traffic)",
    badges: [{ label: "Water-based acrylic", tone: "blue" }, { label: "Exposed / UV", tone: "navy" }],
    appInfo: kp([
      "Water-based acrylic (solvent-free), elastomeric",
      "CONFIRM (Gripset AU TDS)",
      "Yes — exposed weatherproofing",
      "Roof 1.5 L/m² · facade 1.0 L/m²; bridges to 3 mm",
      "Roof ≈10 m² / 15 L · facade ≈15 m² / 15 L",
      "EXPOSED — facades, parapets, box gutters, light-traffic roofs",
      "CONFIRM (Gripset AU TDS)",
    ]),
    bestFor: [
      "Exposed, UV-durable elastomeric acrylic for facades, parapets, box gutters and graded light-trafficable roofs",
      "Bridges cracks up to 3 mm; fungi/algae resistant for humid/tropical climates; solvent-free",
    ],
    avoidWhere: [
      "Under-tile wet-area duty where an AS 4858 Class membrane is specified",
      "Heavy trafficking or permanent ponding — confirm on the TDS",
    ],
    warnings: [
      "Confirm AS 4858/AS 4654 classification, primer and substrate prep against the current Gripset AU TDS",
      "Apply at the correct rate (roof 1.5 L/m², facade 1.0 L/m²) — under-application reduces film build",
    ],
    advanced: {
      description:
        "Gripset RD is a water-based, solvent-free, elastomeric acrylic weatherproofing membrane for exposed areas — facades, parapet walls, graded light-trafficable floors, box gutters and roof surfaces — that bridges cracks up to 3 mm and resists fungi/algae growth in humid/tropical environments. Roof/deck rate 1.5 L/m² (≈10 m² per 15 L); facade rate 1.0 L/m² (≈15 m² per 15 L). CONFIRM AS 4858/AS 4654 classification and primer against the current Gripset Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Water-based acrylic (solvent-free), elastomeric", source: "gripset.com Gripset RD" },
        { label: "Exposure", value: "Exposed — facades, parapets, box gutters, light-traffic roofs", source: "gripset.com Gripset RD" },
        { label: "Crack-bridging", value: "Up to 3 mm", source: "gripset.com Gripset RD" },
        { label: "Coverage", value: "Roof 1.5 L/m² (≈10 m²/15 L) · facade 1.0 L/m² (≈15 m²/15 L)", source: "gripset.com Gripset RD" },
        { label: "Durability", value: "Fungi/algae resistant; UV durable", source: "gripset.com Gripset RD" },
        { label: "AS class / primer", value: "CONFIRM (Gripset AU TDS)", source: "gripset.com Gripset RD" },
      ],
    },
  },
];
