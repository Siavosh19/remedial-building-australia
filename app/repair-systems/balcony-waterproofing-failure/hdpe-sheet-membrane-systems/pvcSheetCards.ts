// ──────────────────────────────────────────────────────────────────────────────
// PVC / HDPE single-ply sheet membranes — shared hand-authored cards, used by both
// the "HDPE sheet membrane systems" and "single-ply ballasted" categories (they
// share products). Values from the CURRENT AUSTRALIAN manufacturer/distributor
// page/TDS; empty/unconfirmed facts are pruned at render. "Class 2 / NCC tested" =
// documented AU test evidence only (NATA-accredited test, named CSIRO/BRANZ report,
// or CodeMark) — EN 13956 / CE marking is NOT asserted as AU certification.
//
// appInfo columns: Type · Thickness · Reinforcement · Application · Role/exposure ·
// Class 2 / NCC tested · Warranty.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Thickness", "Reinforcement", "Application", "Role / exposure", "Class 2 / NCC tested", "Warranty"];
const DEFAULTS: Record<number, string> = { 5: "N/A", 6: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "" }));

const WOLFIN_IB: RefCard = {
  brand: "Wolfin / Projex Group",
  rangeName: "Wolfin IB — Loose-Laid PVC Sheet Membrane",
  shortType: "Polyester-PVC single-ply sheet — loose-laid, mechanically fixed",
  badges: [{ label: "Polyester-PVC", tone: "navy" }, { label: "NATA tested", tone: "blue" }],
  appInfo: kp([
    "Polyester-PVC single-ply sheet",
    "",
    "Polyester",
    "Loose-laid, mechanically fixed",
    "Roof / podium — exposed single-ply",
    "AS 4654.1 + AS 4858 — NATA tested",
    "Up to 20-yr Projex single-point (workmanship + materials)",
  ]),
  bestFor: [
    "NATA-tested polyester-PVC loose-laid single-ply (AS 4654.1 + AS 4858) — a high-end specified roof/podium system",
    "Projex single-point 20-year warranty covering both workmanship and materials",
  ],
  avoidWhere: [
    "DIY / non-accredited installation — applicator accreditation is mandatory for the warranty",
    "Where a fully-bonded self-adhesive sheet is required (use Wolfin GWSK)",
  ],
  warnings: [
    "Installation by Projex Group-accredited applicators only — the single-point warranty depends on it",
    "Confirm thickness, fixing pattern and detailing against the current Projex TDS",
  ],
  advanced: {
    description:
      "Wolfin IB is a German-engineered polyester-PVC single-ply waterproofing sheet, loose-laid and secured with mechanical fixings, for roofs and podiums. NATA-tested in Australia and compliant to AS 4654.1-2012 and AS 4858. Sole Australian distributor Projex Group; installed only by Projex-accredited applicators, with an inspected single-point warranty of up to 20 years on workmanship and materials.",
    designCriteria: "",
    techData: [
      { label: "Type", value: "Polyester-PVC single-ply sheet", source: "projex.com.au Wolfin IB" },
      { label: "Application", value: "Loose-laid, mechanically fixed", source: "projex.com.au Wolfin IB" },
      { label: "Test evidence", value: "NATA tested — AS 4654.1 + AS 4858", source: "projex.com.au Wolfin IB" },
      { label: "Warranty", value: "Up to 20-yr Projex single-point (workmanship + materials)", source: "projex.com.au Wolfin IB" },
    ],
  },
};

const WOLFIN_GWSK: RefCard = {
  brand: "Wolfin / Projex Group",
  rangeName: "Wolfin GWSK — Self-Adhesive Bonded PVC Sheet Membrane",
  shortType: "Polyester-PVC single-ply sheet — cold self-adhesive bonded",
  badges: [{ label: "Self-adhesive PVC", tone: "navy" }, { label: "NATA tested", tone: "blue" }],
  appInfo: kp([
    "Polyester-PVC single-ply sheet (bonded)",
    "2.3 mm",
    "Polyester + integrated glass fleece",
    "Cold self-adhesive bonded",
    "Roof / podium — fully-bonded single-ply",
    "AS 4654.1 — NATA tested",
    "Up to 20-yr Projex single-point (workmanship + materials)",
  ]),
  bestFor: [
    "2.3 mm self-adhesive bonded polyester-PVC with integrated glass fleece — a cold (no-flame) fully-bonded sheet",
    "Bitumen-compatible; NATA-tested AS 4654.1; Projex 20-year single-point warranty",
  ],
  avoidWhere: [
    "DIY / non-accredited installation",
    "Loose-laid / ballasted applications (use Wolfin IB)",
  ],
  warnings: [
    "Installation by Projex Group-accredited applicators only",
    "Bitumen-compatible self-adhesive — confirm substrate, primer and conditions against the current Projex TDS",
  ],
  advanced: {
    description:
      "Wolfin GWSK is a 2.3 mm homogeneous, reinforced, cold self-adhesive (bonded) polyester-PVC waterproofing sheet with an integrated special glass fleece, bitumen-compatible, for roofs and podiums. NATA-tested and compliant to AS 4654.1-2012. Sole Australian distributor Projex Group; Projex-accredited applicators only; single-point warranty up to 20 years on workmanship and materials.",
    designCriteria: "",
    techData: [
      { label: "Type", value: "Polyester-PVC single-ply sheet (self-adhesive bonded)", source: "projex.com.au Wolfin GWSK" },
      { label: "Thickness", value: "2.3 mm", source: "projex.com.au Wolfin GWSK" },
      { label: "Reinforcement", value: "Polyester + integrated glass fleece", source: "projex.com.au Wolfin GWSK" },
      { label: "Test evidence", value: "NATA tested — AS 4654.1", source: "projex.com.au Wolfin GWSK" },
      { label: "Warranty", value: "Up to 20-yr Projex single-point", source: "projex.com.au Wolfin GWSK" },
    ],
  },
};

const COSMOFIN_FG: RefCard = {
  brand: "Cosmofin / Projex Group",
  rangeName: "Cosmofin FG / FG LL — Reinforced PVC Single-Ply Sheet Membrane",
  shortType: "Reinforced flexible PVC single-ply sheet (1.5 mm)",
  badges: [{ label: "Reinforced PVC", tone: "navy" }, { label: "NATA tested", tone: "blue" }],
  appInfo: kp([
    "Reinforced flexible PVC single-ply sheet",
    "1.5 mm",
    "Polyester (FG); glass-fleece-backed option",
    "Bonded / loose-laid / ballasted / mechanically fixed",
    "Roof / podium single-ply (light grey)",
    "AS 4654.1 + AS 4858 — NATA tested",
    "Up to 20-yr Projex single-point (workmanship + materials)",
  ]),
  bestFor: [
    "Versatile 1.5 mm reinforced PVC — bonded, loose-laid, ballasted or mechanically fixed from one membrane",
    "German-engineered (by Wolfin); NATA-tested to AS 4654.1 + AS 4858",
  ],
  avoidWhere: [
    "DIY / non-accredited installation",
    "Below-grade tanking (use a bentonite/HDPE composite)",
  ],
  warnings: [
    "Installation by Projex Group-accredited applicators only",
    "Confirm the FG vs FG LL grade and fleece backing for the chosen installation method (Projex TDS)",
  ],
  advanced: {
    description:
      "Cosmofin FG / FG LL is a 1.5 mm reinforced flexible PVC single-ply membrane (light grey), engineered in Germany by Wolfin, available with or without fleece backing for bonded, loose-laid, ballasted or mechanically-fixed installation. NATA-tested and compliant to AS 4654.1-2012 and AS 4858. Projex Group sole Australian distributor; accredited applicators only; single-point warranty up to 20 years.",
    designCriteria: "",
    techData: [
      { label: "Type", value: "Reinforced flexible PVC single-ply sheet", source: "projex.com.au Cosmofin" },
      { label: "Thickness", value: "1.5 mm", source: "projex.com.au Cosmofin" },
      { label: "Install", value: "Bonded / loose-laid / ballasted / mechanically fixed", source: "projex.com.au Cosmofin" },
      { label: "Test evidence", value: "NATA tested — AS 4654.1 + AS 4858", source: "projex.com.au Cosmofin" },
      { label: "Warranty", value: "Up to 20-yr Projex single-point", source: "projex.com.au Cosmofin" },
    ],
  },
};

const SARNAFIL_G410: RefCard = {
  brand: "Sika Australia",
  rangeName: "Sika Sarnafil G 410 — PVC Single-Ply Sheet Membrane",
  shortType: "Multi-layer PVC single-ply roof sheet (hot-air weldable)",
  badges: [{ label: "PVC single-ply", tone: "navy" }, { label: "Hot-air weldable", tone: "blue" }],
  appInfo: kp([
    "Multi-layer PVC single-ply roof sheet",
    "1.5 mm (G 410-15 L) / 2.0 mm (G 410-20 L)",
    "Glass non-woven inlay",
    "Hot-air weldable — mechanically fixed / adhered / ballasted",
    "Exposed roof single-ply (UV-stabilised)",
  ]),
  bestFor: [
    "Hot-air-weldable PVC single-ply with a glass non-woven inlay — UV-stabilised for direct exposure",
    "Part of the Sika Sarnafil roofing system used globally on large roofs/podiums",
  ],
  avoidWhere: [
    "DIY installation — hot-air-welded seams require a specialist accredited applicator",
    "Where an Australian AS 4654 certificate must be documented — confirm Sarnafil's current AU certification",
  ],
  warnings: [
    "Confirm the current Australian AS 4654 certification and accredited applicator with Sika Australia (the page cites EN 13956)",
    "Hot-air-welded laps — specialist installer and seam testing required",
  ],
  advanced: {
    description:
      "Sika Sarnafil G 410 is a multi-layer synthetic PVC roof waterproofing sheet with a glass non-woven inlay, hot-air weldable and UV-stabilised for direct exposure, available 1.5 mm (G 410-15 L) and 2.0 mm (G 410-20 L). The AU page cites EN 13956 / GB 12952; confirm the current Australian AS 4654 certification and accredited applicator with Sika Australia.",
    designCriteria: "",
    techData: [
      { label: "Type", value: "Multi-layer PVC single-ply roof sheet", source: "aus.sika.com Sarnafil G 410" },
      { label: "Thickness", value: "1.5 mm / 2.0 mm", source: "aus.sika.com Sarnafil G 410" },
      { label: "Reinforcement", value: "Glass non-woven inlay", source: "aus.sika.com Sarnafil G 410" },
      { label: "Application", value: "Hot-air weldable; mechanically fixed / adhered / ballasted", source: "aus.sika.com Sarnafil G 410" },
    ],
  },
};

const PARASEAL_LG: RefCard = {
  brand: "Tremco Australia",
  rangeName: "Tremco Paraseal LG — HDPE-Bentonite Composite Sheet Membrane",
  shortType: "HDPE-bentonite composite sheet — below-grade tanking",
  badges: [{ label: "HDPE + bentonite", tone: "navy" }, { label: "Below-grade", tone: "blue" }],
  appInfo: kp([
    "HDPE-bentonite composite sheet",
    "20 mil HDPE + granular bentonite",
    "Spun-bonded polyester protective layer",
    "Pre-applied / blindside; under-slab; backfilled walls",
    "Below-grade / negative-side tanking",
  ]),
  bestFor: [
    "Dual waterproofing — impermeable HDPE barrier + self-sealing bentonite (expands up to 8×) for below-grade blindside, under-slab and elevator pits",
    "High puncture resistance (≈180 kg/m²) — robust on blindside/lagging conditions",
  ],
  avoidWhere: [
    "Above-ground exposed roof / balcony waterproofing — it is a below-grade tanking membrane",
    "Where AS 4654.1 above-ground certification is the requirement",
  ],
  warnings: [
    "Below-grade tanking — AS 4654 (external above-ground) does not apply; confirm the below-grade design and hydrostatic head",
    "Confirm lap detailing, terminations and protection against the current Tremco TDS",
  ],
  advanced: {
    description:
      "Tremco Paraseal LG is a below-grade tanking sheet — 20 mil high-density polyethylene laminated to expandable granular bentonite with a spun-bonded polyester protective layer. The bentonite swells up to 8× to self-seal; the HDPE provides ≈180 kg/m² puncture resistance. For blindside/lagging walls, under-slab and elevator pits. A below-grade system — AS 4654.1 (external above-ground) does not apply.",
    designCriteria: "",
    techData: [
      { label: "Type", value: "HDPE-bentonite composite sheet", source: "tremco.com.au Paraseal LG" },
      { label: "Build", value: "20 mil HDPE + granular bentonite + spun-bonded polyester", source: "tremco.com.au Paraseal LG" },
      { label: "Use", value: "Below-grade — blindside / under-slab / elevator pits", source: "tremco.com.au Paraseal LG" },
      { label: "Puncture", value: "≈180 kg/m²; bentonite expands up to 8×", source: "tremco.com.au Paraseal LG" },
    ],
  },
};

const FATRAFOL_810V: RefCard = {
  brand: "Fatra Australia",
  rangeName: "Fatrafol 810v — Reinforced PVC Single-Ply Sheet Membrane",
  shortType: "Polyester-reinforced PVC single-ply roof sheet (mechanically anchored)",
  badges: [{ label: "Reinforced PVC", tone: "navy" }, { label: "Mechanically anchored", tone: "blue" }],
  appInfo: kp([
    "Reinforced PVC-P single-ply roof sheet",
    "",
    "Polyester mesh",
    "Mechanically anchored",
    "Exposed flat-roof single-ply (UV-resistant)",
  ]),
  bestFor: [
    "Polyester-mesh-reinforced PVC single-ply for mechanically-anchored exposed flat roofs; UV-resistant",
    "Fatra Australia provides direct supply and system design",
  ],
  avoidWhere: [
    "DIY installation — specialist single-ply applicator required",
    "Where an Australian AS 4654 certificate must be documented — confirm Fatra's current AU certification",
  ],
  warnings: [
    "Confirm thickness and the current Australian AS 4654 certification with Fatra Australia (the page cites EN 13956)",
    "Mechanically-anchored single-ply — confirm wind-uplift design and fixing pattern",
  ],
  advanced: {
    description:
      "Fatrafol 810v is a reinforced PVC-P single-ply roofing membrane (polyester-mesh reinforced), UV-resistant and mechanically anchored, for exposed flat roofs. Supplied/designed in Australia by Fatra Australia. The page cites EN 13956; confirm the current Australian AS 4654 certification and thickness with Fatra Australia.",
    designCriteria: "",
    techData: [
      { label: "Type", value: "Reinforced PVC-P single-ply roof sheet", source: "fatraaustralia.com.au Fatrafol 810v" },
      { label: "Reinforcement", value: "Polyester mesh", source: "fatraaustralia.com.au Fatrafol 810v" },
      { label: "Application", value: "Mechanically anchored", source: "fatraaustralia.com.au Fatrafol 810v" },
    ],
  },
};

// HDPE sheet membrane systems category (PVC single-ply + HDPE-bentonite tanking)
export const HDPE_MEMBRANE_CARDS: RefCard[] = [WOLFIN_IB, WOLFIN_GWSK, COSMOFIN_FG, SARNAFIL_G410, PARASEAL_LG];

// Single-ply ballasted category (shares the PVC single-ply products)
export const SINGLE_PLY_CARDS: RefCard[] = [WOLFIN_IB, COSMOFIN_FG, FATRAFOL_810V, SARNAFIL_G410];
