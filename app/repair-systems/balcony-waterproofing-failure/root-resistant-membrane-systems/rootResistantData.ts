// ──────────────────────────────────────────────────────────────────────────────
// Root-resistant membrane systems (planter boxes / green roofs / podiums). These
// ARE membranes → Class-2 / NCC field applies (documented AU test evidence only).
// Values from the AU manufacturer page/TDS; empty facts pruned. appInfo columns:
// Type · Root inhibitor · Application · Use / exposure · Class 2 / NCC tested · Warranty.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Root inhibitor", "Application", "Use / exposure", "Class 2 / NCC tested", "Warranty"];
const DEFAULTS: Record<number, string> = { 4: "N/A", 5: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "" }));

export const ROOT_RESISTANT_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia", rangeName: "ARDEX Root Repell (WPM 1000 RR)",
    shortType: "Heat-welded PP-lined sheet membrane with root inhibitor",
    badges: [{ label: "Heat-welded sheet", tone: "navy" }, { label: "Preventol B2 root inhibitor", tone: "blue" }],
    appInfo: kp([
      "Polypropylene-lined heat-welded sheet membrane",
      "Preventol® B2 root inhibitor (repels root growth)",
      "Heat-welded laps & seams",
      "Planter boxes, retaining walls, green roofs",
    ]),
    bestFor: [
      "Heat-welded PP-lined sheet (the WPM 1000 family) with a Preventol B2 root inhibitor — for planter boxes, retaining walls and green roofs",
      "Consistent factory thickness; fast heat-welded installation",
    ],
    avoidWhere: ["Non-root applications where the standard WPM 1000 suffices", "Heat-sensitive substrates (heat-welding)"],
    warnings: [
      "Confirm the BRANZ/AS test report covers the RR (root-repellent) variant specifically (the WPM 1000 base is BRANZ-tested to AS 4858/AS 4654)",
      "Heat-welded seams require a competent installer",
    ],
    advanced: { description: "ARDEX Root Repell (WPM 1000 RR / WeldTec Garden membrane) is a polypropylene-lined, heat-welded sheet waterproofing membrane incorporating the Preventol B2 root inhibitor to repel root growth, for planter boxes, retaining walls and green roofs. The WPM 1000 base is BRANZ-tested to AS 4858/AS 4654; confirm the test report covers the RR variant.", designCriteria: "", techData: [
      { label: "Type", value: "PP-lined heat-welded sheet membrane", source: "ardexaustralia.com Root Repell" },
      { label: "Root inhibitor", value: "Preventol B2", source: "ardexaustralia.com Root Repell" },
    ] },
  },
  {
    brand: "Wolfin / Projex Group", rangeName: "Wolfin IB (root-resistant PVC)",
    shortType: "Loose-laid polyester-PVC sheet — inherently root-resistant",
    badges: [{ label: "Polyester-PVC", tone: "navy" }, { label: "NATA tested", tone: "blue" }],
    appInfo: kp([
      "Polyester-PVC single-ply sheet (loose-laid)",
      "Inherent — PVC chemistry is root-resistant",
      "Loose-laid, mechanically fixed",
      "Planter boxes, green roofs, podiums",
      "AS 4654.1 + AS 4858 — NATA tested",
      "Up to 20-yr Projex single-point (workmanship + materials)",
    ]),
    bestFor: [
      "Inherently root-resistant polyester-PVC sheet — NATA-tested (AS 4654.1 + AS 4858) for planter boxes and green roofs",
      "Projex single-point 20-year warranty; accredited applicators only",
    ],
    avoidWhere: ["DIY / non-accredited installation", "Where a bonded self-adhesive sheet is required (use Wolfin GWSK)"],
    warnings: ["Installation by Projex-accredited applicators only", "Confirm root-resistant detailing at upstands/penetrations against the current Projex TDS"],
    advanced: { description: "Wolfin IB is a German-engineered polyester-PVC single-ply sheet whose PVC chemistry is inherently root-resistant, used loose-laid/mechanically fixed for planter boxes, green roofs and podiums. NATA-tested to AS 4654.1 and AS 4858; Projex sole AU distributor; accredited applicators; up to 20-year single-point warranty.", designCriteria: "", techData: [
      { label: "Type", value: "Polyester-PVC single-ply sheet (loose-laid)", source: "projex.com.au Wolfin IB" },
      { label: "Test evidence", value: "NATA tested — AS 4654.1 + AS 4858", source: "projex.com.au Wolfin IB" },
      { label: "Warranty", value: "Up to 20-yr Projex single-point", source: "projex.com.au Wolfin IB" },
    ] },
  },
  {
    brand: "Cosmofin / Projex Group", rangeName: "Cosmofin FG / FG LL (root-resistant PVC)",
    shortType: "Reinforced PVC single-ply — inherently root-resistant",
    badges: [{ label: "Reinforced PVC", tone: "navy" }, { label: "NATA tested", tone: "blue" }],
    appInfo: kp([
      "Reinforced flexible PVC single-ply sheet (1.5 mm)",
      "Inherent — PVC chemistry is root-resistant",
      "Bonded / loose-laid / ballasted / mechanically fixed",
      "Planter boxes, green roofs, podiums",
      "AS 4654.1 + AS 4858 — NATA tested",
      "Up to 20-yr Projex single-point (workmanship + materials)",
    ]),
    bestFor: [
      "Inherently root-resistant 1.5 mm reinforced PVC — NATA-tested (AS 4654.1 + AS 4858); versatile install for planters and green roofs",
      "Projex single-point 20-year warranty; accredited applicators only",
    ],
    avoidWhere: ["DIY / non-accredited installation"],
    warnings: ["Installation by Projex-accredited applicators only", "Confirm FG vs FG LL grade and root-resistant detailing against the current Projex TDS"],
    advanced: { description: "Cosmofin FG / FG LL is a 1.5 mm reinforced flexible PVC single-ply membrane (engineered by Wolfin) whose PVC chemistry is inherently root-resistant, for planter boxes, green roofs and podiums. NATA-tested to AS 4654.1 and AS 4858; Projex sole AU distributor; accredited applicators; up to 20-year single-point warranty.", designCriteria: "", techData: [
      { label: "Type", value: "Reinforced flexible PVC single-ply (1.5 mm)", source: "projex.com.au Cosmofin" },
      { label: "Test evidence", value: "NATA tested — AS 4654.1 + AS 4858", source: "projex.com.au Cosmofin" },
      { label: "Warranty", value: "Up to 20-yr Projex single-point", source: "projex.com.au Cosmofin" },
    ] },
  },
  {
    brand: "Tremco CPG Australia", rangeName: "Tremco TREMproof 211 + Anti-Root Additive",
    shortType: "1-part liquid membrane with anti-root additive",
    badges: [{ label: "Liquid membrane", tone: "navy" }, { label: "Anti-root additive", tone: "blue" }],
    appInfo: kp([
      "Single-component liquid waterproofing membrane (low VOC)",
      "Anti-Root Additive (gauged into the membrane)",
      "Liquid-applied (single component)",
      "Planter boxes / green-roof decks",
    ]),
    bestFor: [
      "Single-component low-VOC liquid membrane with the Tremco Anti-Root Additive for planter boxes",
      "Single-component — minimises plural-component mixing errors",
    ],
    avoidWhere: ["Without the Anti-Root Additive in root-exposed planter applications"],
    warnings: [
      "Page states tested to AS 4654.1 but does not cite a named certificate — confirm before Class 2 specification",
      "Confirm the Anti-Root Additive dosage against the current Tremco Australia TDS",
    ],
    advanced: { description: "Tremco TREMproof 211 is a single-component, low-VOC liquid waterproofing membrane used with the Tremco Anti-Root Additive for planter boxes. The page states it is tested to AS 4654.1; a named test certificate was not cited. Confirm the additive dosage and current certification against the Tremco Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "1-part liquid membrane (low VOC)", source: "tremco.com.au TREMproof 211" },
      { label: "Root inhibitor", value: "Tremco Anti-Root Additive", source: "tremco.com.au Anti-Root Additive" },
    ] },
  },
  {
    brand: "Tremco CPG Australia", rangeName: "Tremco TREMproof Torch Anti-Root",
    shortType: "Torch-on APP SBS cap sheet with through-membrane anti-root",
    badges: [{ label: "Torch-on cap (anti-root)", tone: "navy" }],
    appInfo: kp([
      "APP modified-bitumen torch-on cap sheet (3.8 mm)",
      "Anti-root throughout the membrane, including overlaps",
      "Torch-applied (cap layer)",
      "Green-roof / planter decks (exposed cap)",
    ]),
    bestFor: [
      "3.8 mm torch-on APP cap with extremely effective anti-root properties throughout the membrane — including the overlaps",
      "Polyester spunbond + glass-filament reinforcement for the planter/green-roof cap",
    ],
    avoidWhere: ["Heat-sensitive substrates (torch flame)", "As a base sheet (it is the anti-root cap)"],
    warnings: [
      "Page states tested to AS 4654.1 but does not cite a named certificate — confirm before Class 2 specification",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: { description: "Tremco TREMproof Torch Anti-Root is a 3.8 mm APP modified-bitumen torch-applied cap sheet, polyester-spunbond and glass-filament reinforced, with extremely effective anti-root properties throughout the membrane including overlaps, applied as the top layer of a planter/green-roof system. The page states tested to AS 4654.1; a named certificate was not cited.", designCriteria: "", techData: [
      { label: "Type", value: "APP torch-on cap sheet (3.8 mm)", source: "tremco.com.au TREMproof Torch Anti-Root" },
      { label: "Root inhibitor", value: "Anti-root throughout incl. overlaps", source: "tremco.com.au TREMproof Torch Anti-Root" },
    ] },
  },
  {
    brand: "Soprema", rangeName: "Soprema Colphene 3000 + Alsan Flashing Quadro",
    shortType: "Hot-melt rubberised-asphalt system with root-resistant flashing",
    badges: [{ label: "Hot-melt system", tone: "navy" }, { label: "Root-resistant", tone: "blue" }],
    appInfo: kp([
      "Hot-melt rubberised-asphalt field membrane + root-resistant PU flashing",
      "Root-resistant flashing (Alsan Quadro) + system detailing",
      "Hot-applied field membrane; cold liquid flashing details",
      "Inverted/green roofs, planters, plaza decks (protected)",
    ]),
    bestFor: [
      "Monolithic hot-melt rubberised-asphalt field membrane with root-resistant Alsan Quadro flashing — for green roofs, planters and plaza decks",
      "Fully-bonded, joint-free field membrane under heavy overburden",
    ],
    avoidWhere: ["Light/domestic balcony work (heavy protected deck system)", "Exposed (non-protected) finishes"],
    warnings: ["Hot-applied — specialist applicator and temperature control required", "Confirm current Australian availability/system with Soprema (via Bayset)"],
    advanced: { description: "Soprema Colphene 3000 is a hot-melt rubberised-asphalt field membrane combined with root-resistant Alsan Flashing Quadro for the details — a monolithic, fully-bonded, protected system for inverted/green roofs, planters and plaza decks. Confirm the current Australian system and availability with Soprema (via Bayset).", designCriteria: "", techData: [
      { label: "Type", value: "Hot-melt rubberised asphalt + root-resistant flashing", source: "soprema Colphene 3000 / Alsan Quadro" },
      { label: "Use", value: "Inverted/green roofs, planters, plaza decks", source: "soprema Colphene 3000" },
    ] },
  },
  {
    brand: "Fosroc / Parchem", rangeName: "Fosroc Nitoproof 210",
    shortType: "1-part water-based bituminous-rubberised membrane with root inhibitor",
    badges: [{ label: "Water-based bituminous", tone: "navy" }, { label: "Root inhibitor", tone: "blue" }],
    appInfo: kp([
      "Single-component water-based bituminous rubberised membrane",
      "Root penetration inhibitor",
      "Liquid-applied (single component)",
      "Retaining walls, planter boxes, foundation walls, below-ground tanking",
    ]),
    bestFor: [
      "Single-component water-based bituminous-rubberised membrane with a root-penetration inhibitor — for retaining walls, planter boxes and below-ground tanking",
      "Easy single-component application",
    ],
    avoidWhere: ["Exposed UV / trafficable finishes (it is a protected/below-grade membrane)"],
    warnings: ["Confirm coverage, DFT, primer and certification against the current Fosroc / Parchem TDS"],
    advanced: { description: "Fosroc Nitoproof 210 is a high-performance, single-component, water-based bituminous rubberised waterproofing membrane containing a root-penetration inhibitor, for retaining walls, planter boxes, building foundation walls and below-ground tanking. Confirm coverage, DFT, primer and certification against the current Fosroc / Parchem TDS.", designCriteria: "", techData: [
      { label: "Type", value: "1-part water-based bituminous rubberised membrane", source: "fosroc.com.au Nitoproof 210" },
      { label: "Root inhibitor", value: "Root penetration inhibitor", source: "fosroc.com.au Nitoproof 210" },
    ] },
  },
];
