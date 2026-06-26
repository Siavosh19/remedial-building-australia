// ──────────────────────────────────────────────────────────────────────────────
// Cold-applied sheet membranes (self-adhesive / loose-laid / heat-welded) —
// hand-authored selection cards (balcony / roof / podium / below-grade).
// Values from the CURRENT AUSTRALIAN manufacturer page/TDS. Empty / unconfirmed
// facts are pruned at render (AutoProductReference pruneEmptyFacts), so only
// real TDS values show. "Class 2 / NCC tested" = documented AU test evidence only
// (named CSIRO/BRANZ report or CodeMark) — verified from each product's own page.
//
// appInfo columns: Type · Thickness · Reinforcement/facing · Application ·
// Role/exposure · Lap/seam · Class 2 / NCC tested · Warranty.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Thickness", "Reinforcement / facing", "Application", "Role / exposure", "Lap / seam", "Class 2 / NCC tested", "Warranty"];
const DEFAULTS: Record<number, string> = { 6: "N/A", 7: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "" }));

export const COLD_SHEET_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 1000",
    shortType: "Heat-welded undertile sheet membrane (polypropylene-lined)",
    badges: [{ label: "Heat-welded", tone: "navy" }, { label: "AS 4858 + AS 4654 + AS 2904", tone: "blue" }],
    appInfo: kp([
      "Polypropylene-lined sheet (butynol-type)",
      "1.2 mm",
      "Polypropylene-lined",
      "Heat-welded laps & seams; direct tile adhesion",
      "Undertile / non-exposed (tiles, pavers, decking)",
      "Heat-welded",
      "AS 4858 + AS 4654 + AS 2904 — BRANZ / Bureau Veritas reports",
    ]),
    bestFor: [
      "Consistent 1.2 mm heat-welded sheet — tiles bond directly to it, no fillet or bond breaker required",
      "Triple-standard tested — AS 4858 (wet-area) + AS 4654 (external) + AS 2904 (flashing)",
    ],
    avoidWhere: [
      "Fully-exposed UV roofs without a cover — it is a non-exposed undertile sheet",
      "Where a torch-applied or self-adhesive system is specified",
    ],
    warnings: [
      "Heat-welded seams require a competent installer with the correct equipment",
      "Flood test before tiling (per the TDS, ~60 min after installation)",
    ],
    advanced: {
      description:
        "ARDEX WPM 1000 is a 1.2 mm polypropylene-lined (butynol-type) undertile sheet waterproofing membrane with heat-welded laps and seams, for direct adhesion of tiles, pavers and decking over non-exposed balconies, terraces and podiums. Tested by BRANZ to AS 4858 and AS 4654 and by Bureau Veritas to AS 2904 (flashing). Supplied 1.4 m × 20 m (≈35 kg) rolls.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Polypropylene-lined sheet (butynol-type)", source: "ardexaustralia.com WPM 1000" },
        { label: "Thickness", value: "1.2 mm", source: "ardexaustralia.com WPM 1000" },
        { label: "Standards", value: "AS 4858 + AS 4654 + AS 2904", source: "ardexaustralia.com WPM 1000" },
        { label: "Test evidence", value: "BRANZ AS 4654 (DC2893-5) + AS 4858; Bureau Veritas AS 2904", source: "ardexaustralia.com WPM 1000" },
        { label: "Seams", value: "Heat-welded — no fillet / bond breaker", source: "ardexaustralia.com WPM 1000" },
        { label: "Roll", value: "1.4 m × 20 m (≈35 kg)", source: "ardexaustralia.com WPM 1000" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 117",
    shortType: "Self-adhesive SBS modified-bitumen sheet (cold, no flame)",
    badges: [{ label: "Self-adhesive (cold)", tone: "navy" }, { label: "AS 4654.1", tone: "blue" }],
    appInfo: kp([
      "Self-adhesive SBS modified-bitumen sheet",
      "2.0 mm",
      "SBS-reinforced",
      "Self-adhesive — cold (no open flame)",
      "Multi-layer system; heat-sensitive substrates (insulation, timber)",
      "",
      "AS 4654.1 — BRANZ report",
    ]),
    bestFor: [
      "Cold self-adhesive (no open flame) — for heat-sensitive substrates such as insulation panels and timber",
      "Horizontal and vertical application within a multi-layer waterproofing system",
    ],
    avoidWhere: [
      "As a standalone exposed membrane — used within a multi-layer build with a cap/finish layer",
      "Where a single-layer solution is required",
    ],
    warnings: [
      "Confirm the cap / finish layer and full multi-layer build for the exposure",
      "Surface preparation and primer per the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 117 is a 2.0 mm self-adhesive SBS-reinforced modified-bitumen sheet membrane applied cold (no open flame) — suited to heat-sensitive substrates (insulation, timber) — for horizontal and vertical use within multi-layer waterproofing systems. Tested by BRANZ to AS 4654.1. Supplied 1 m × 15 m (≈30 kg) rolls.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Self-adhesive SBS modified-bitumen sheet", source: "ardexaustralia.com WPM 117" },
        { label: "Thickness", value: "2.0 mm", source: "ardexaustralia.com WPM 117" },
        { label: "Application", value: "Self-adhesive — cold, no open flame", source: "ardexaustralia.com WPM 117" },
        { label: "Test evidence", value: "BRANZ report — AS 4654.1", source: "ardexaustralia.com WPM 117" },
        { label: "Roll", value: "1 m × 15 m (≈30 kg)", source: "ardexaustralia.com WPM 117" },
      ],
    },
  },
  {
    brand: "Gripset Industries",
    rangeName: "Gripset BRW-PFN",
    shortType: "Self-adhesive butyl rubber sheet — fabric-faced (takes finishes)",
    badges: [{ label: "Self-adhesive butyl", tone: "navy" }],
    appInfo: kp([
      "Self-adhesive butyl rubber sheet",
      "1.0 mm",
      "Needle-punched fabric face (accepts finishes)",
      "Self-adhesive — cold",
      "Under finishes — internal & external",
      "",
    ]),
    bestFor: [
      "Needle-punched fabric facing accepts direct surface finishes / tile beds over the sheet",
      "Self-adhesive butyl — a consistent 1 mm waterproof barrier across the floor",
    ],
    avoidWhere: [
      "Subterranean / negative-side use — use the HDPE-faced BRW-HD instead",
      "Fully-exposed UV without a finish over it",
    ],
    warnings: [
      "Page states compliance to AS 4858 / AS 4654.1 — confirm a current test report before Class 2 specification",
      "Surface preparation and primer per the current Gripset TDS",
    ],
    advanced: {
      description:
        "Gripset BRW-PFN is a 1.0 mm self-adhesive butyl rubber sheet membrane with a high-strength needle-punched fabric facing that supports the direct application of surface finishes, for waterproofing internal and external areas. The product page states compliance to AS 4858 and AS 4654.1; a named independent test report was not cited on the page.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Self-adhesive butyl rubber sheet", source: "gripset.com BRW-PFN" },
        { label: "Thickness", value: "1.0 mm", source: "gripset.com BRW-PFN" },
        { label: "Facing", value: "Needle-punched fabric (accepts finishes)", source: "gripset.com BRW-PFN" },
      ],
    },
  },
  {
    brand: "Gripset Industries",
    rangeName: "Gripset BRW-HD",
    shortType: "Self-adhesive butyl rubber sheet — HDPE-faced (subterranean)",
    badges: [{ label: "Self-adhesive butyl", tone: "navy" }, { label: "HDPE face", tone: "blue" }],
    appInfo: kp([
      "Self-adhesive butyl rubber sheet",
      "",
      "Laminated HDPE film face",
      "Self-adhesive — cold",
      "Subterranean / below-grade & multi-layer sheet systems",
      "",
    ]),
    bestFor: [
      "HDPE-faced butyl for subterranean / below-grade tanking and multi-layer sheet systems",
      "Self-adhesive cold application; classified Class III on the manufacturer page",
    ],
    avoidWhere: [
      "Where a fabric-faced sheet is needed to take direct finishes (use BRW-PFN)",
      "Fully-exposed UV without protection",
    ],
    warnings: [
      "Page states compliance to AS 4858 / AS 4654.1 (Class III) — confirm a current test report before Class 2 specification",
      "Confirm thickness, primer and detailing against the current Gripset TDS",
    ],
    advanced: {
      description:
        "Gripset BRW-HD is a self-adhesive butyl rubber sheet membrane with a laminated high-strength HDPE film facing, designed for subterranean waterproofing and multi-layered sheet membrane applications. The product page states it passes AS 4858 and AS 4654.1 and is Class III; a named independent test report was not cited on the page.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Self-adhesive butyl rubber sheet", source: "gripset.com BRW-HD" },
        { label: "Facing", value: "Laminated HDPE film", source: "gripset.com BRW-HD" },
        { label: "Use", value: "Subterranean / multi-layer sheet systems", source: "gripset.com BRW-HD" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 116 Fibre-Backed Base Sheet",
    shortType: "APP modified-bitumen base sheet (multi-layer)",
    badges: [{ label: "APP base sheet", tone: "navy" }],
    appInfo: kp([
      "APP-modified bitumen base sheet",
      "2.7 mm",
      "Fibreglass + non-woven polyester",
      "Loose-laid / mechanically fixed / WA 98 adhesive / hot-melt bitumen",
      "Base sheet (multi-layer); heat-sensitive / rough substrates",
      "",
    ]),
    bestFor: [
      "Versatile base sheet — loose-lay, mechanically fix, adhere with WA 98, or lay in hot-melt bitumen",
      "For heat-sensitive or rough/uneven substrates, and over sound existing membranes (rubber, PVC, bitumen, acrylic, PU)",
    ],
    avoidWhere: [
      "As a standalone or cap membrane — it is a base layer only",
      "As the exposed final layer",
    ],
    warnings: [
      "Requires a cap sheet / finish layer over it — confirm the full system build",
      "Confirm fixing method and compatibility with the chosen cap sheet",
    ],
    advanced: {
      description:
        "ARDEX WPM 116 (Shelterbit fibre-backed base sheet) is an APP (atactic polypropylene) plastomeric modified-bitumen base sheet reinforced with fibreglass and non-woven polyester, installed as the base layer in multilayer waterproofing systems. Designed for heat-sensitive substrates (timber, insulation) and rough/uneven surfaces, and for overlay of sound existing membranes. Loose-laid, mechanically fastened, adhered with ARDEX WA 98, or laid in hot-melt bitumen.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP-modified bitumen base sheet", source: "ardexaustralia.com WPM 116" },
        { label: "Thickness", value: "2.7 mm", source: "ardexaustralia.com WPM 116" },
        { label: "Reinforcement", value: "Fibreglass + non-woven polyester", source: "ardexaustralia.com WPM 116" },
        { label: "Install", value: "Loose-laid / mech-fixed / WA 98 / hot-melt", source: "ardexaustralia.com WPM 116" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX Butynol",
    shortType: "Butyl rubber (Butynol) sheet — exposed, loose-laid single layer",
    badges: [{ label: "Butyl rubber", tone: "navy" }, { label: "AS 4654.1 + AS/NZS 4020", tone: "blue" }],
    appInfo: kp([
      "Butyl rubber (Butynol) sheet",
      "1.0 / 1.5 / 2.25 mm (black); 1.2 mm (dove grey)",
      "",
      "Loose-laid single layer (WPM 299 seam primer + seam tape)",
      "EXPOSED — UV decks, roofs, gutters; also under slabs / behind masonry",
      "WPM 299 seam primer + seam tape",
      "AS 4654.1 — BRANZ reports (+ AS/NZS 4020 potable water)",
    ]),
    bestFor: [
      "UV-exposed single-layer butyl for decks, roofs and gutters; also tanking under slabs and behind masonry",
      "BRANZ AS 4654.1 tested across thicknesses; AS/NZS 4020 potable-water compliant",
    ],
    avoidWhere: [
      "Direct tile adhesion — use an undertile butynol (e.g. WPM 1000 / WPM 750)",
      "1.5 mm Dove Grey is not recommended as an undertile membrane",
    ],
    warnings: [
      "Loose-laid seams are bonded with WPM 299 seam primer + seam tape — installer-critical",
      "Select thickness for the exposure / severity (1.0 mm general, heavier for severe conditions)",
    ],
    advanced: {
      description:
        "ARDEX Butynol is a butyl-rubber single-layer waterproofing sheet for horizontal and vertical use — UV-exposed decks, roofs and gutters, and tanking under floor slabs or behind masonry walls. Available 1.0 / 1.5 / 2.25 mm black and 1.2 mm dove grey. Loose-laid with laps bonded using ARDEX WPM 299 seam primer and seam tape. BRANZ tested to AS 4654.1 (per thickness) and AS/NZS 4020 potable-water compliant.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Butyl rubber (Butynol) sheet", source: "ardexaustralia.com Butynol" },
        { label: "Thickness", value: "1.0 / 1.5 / 2.25 mm black; 1.2 mm dove grey", source: "ardexaustralia.com Butynol" },
        { label: "Application", value: "Loose-laid single layer; WPM 299 primer + seam tape", source: "ardexaustralia.com Butynol" },
        { label: "Exposure", value: "UV-exposed decks/roofs/gutters; under slabs / behind masonry", source: "ardexaustralia.com Butynol" },
        { label: "Test evidence", value: "BRANZ AS 4654.1 (per thickness); AS/NZS 4020 potable", source: "ardexaustralia.com Butynol" },
      ],
    },
  },
];
