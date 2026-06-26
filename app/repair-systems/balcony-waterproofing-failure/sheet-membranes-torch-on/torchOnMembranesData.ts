// ──────────────────────────────────────────────────────────────────────────────
// Torch-on (torch-applied) modified-bitumen sheet membranes — hand-authored
// selection cards (balcony / roof / podium). Values from the CURRENT AUSTRALIAN
// manufacturer page/TDS; empty/unconfirmed facts are pruned at render. "Class 2 /
// NCC tested" = documented AU test evidence only (named CSIRO/BRANZ report or
// CodeMark), verified from each product's own page — bare "complies/tested to" or
// EN/CE marking is NOT asserted.
//
// appInfo columns: Type · Thickness / weight · Reinforcement · Surface finish ·
// Role / exposure · Application · Class 2 / NCC tested · Warranty.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Thickness / weight", "Reinforcement", "Surface finish", "Role / exposure", "Application", "Class 2 / NCC tested", "Warranty"];
const DEFAULTS: Record<number, string> = { 6: "N/A", 7: "—" };
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? DEFAULTS[i] ?? "" }));

export const TORCH_ON_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 150",
    shortType: "APP modified-bitumen torch-on base/cap sheet",
    badges: [{ label: "APP torch-on", tone: "navy" }, { label: "AS 4654.1 (BRANZ)", tone: "blue" }],
    appInfo: kp([
      "APP modified bitumen",
      "3.0 mm (≈35 kg roll)",
      "Polyester",
      "",
      "Base / cap layer in a multi-layer system",
      "Torch-applied",
      "AS 4654.1 — BRANZ report (DC13305-004)",
    ]),
    bestFor: [
      "Polyester-reinforced APP membrane — robust torch-on layer for multi-layer roof/podium systems",
      "BRANZ-tested to AS 4654.1 for external above-ground use",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (insulation, timber) — torch flame; use a cold self-adhesive sheet there",
      "As a standalone undertile wet-area membrane (AS 4858)",
    ],
    warnings: [
      "Torch application — hot-works permit, fire watch and competent installer required",
      "Confirm the base/cap build and exposure with the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 150 is a 3.0 mm APP (atactic polypropylene) plastomeric modified-bitumen torch-on membrane reinforced with polyester, used as a base or cap layer in multi-layer external waterproofing systems. BRANZ tested to AS 4654.1 (report DC13305-004). Supplied ≈35 kg rolls.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP modified bitumen", source: "ardexaustralia.com WPM 150" },
        { label: "Thickness", value: "3.0 mm (≈35 kg roll)", source: "ardexaustralia.com WPM 150" },
        { label: "Reinforcement", value: "Polyester", source: "ardexaustralia.com WPM 150" },
        { label: "Application", value: "Torch-applied", source: "ardexaustralia.com WPM 150" },
        { label: "Test evidence", value: "BRANZ — AS 4654.1 (DC13305-004)", source: "ardexaustralia.com WPM 150" },
      ],
    },
  },
  {
    brand: "ARDEX Australia",
    rangeName: "ARDEX WPM 185",
    shortType: "APP modified-bitumen torch-on mineral cap sheet (UV)",
    badges: [{ label: "APP torch-on cap", tone: "navy" }, { label: "AS 4654.1 (BRANZ)", tone: "blue" }],
    appInfo: kp([
      "APP modified bitumen",
      "4.0 mm (≈36 kg roll)",
      "Polyester + fibreglass",
      "Mineral (slate grey / white)",
      "UV-exposed cap sheet",
      "Torch-applied",
      "AS 4654.1 — BRANZ reports (grey + white)",
    ]),
    bestFor: [
      "Mineral-finished UV-exposed cap sheet — final layer of a torch-on roof/podium system",
      "Dual polyester + fibreglass reinforcement; BRANZ-tested to AS 4654.1 (grey and white)",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (torch flame)",
      "Direct tile adhesion / undertile wet-area duty",
    ],
    warnings: [
      "Torch application — hot-works permit, fire watch and competent installer required",
      "As the exposed cap — confirm the base sheet and full system with the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "ARDEX WPM 185 is a 4.0 mm APP modified-bitumen torch-on capping membrane reinforced with combined polyester and fibreglass, mineral-finished (slate grey or white) for UV-exposed use as the final layer of a multi-layer system. BRANZ tested to AS 4654.1 (separate grey and white reports). Supplied ≈36 kg rolls.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP modified bitumen (mineral cap)", source: "ardexaustralia.com WPM 185" },
        { label: "Thickness", value: "4.0 mm (≈36 kg roll)", source: "ardexaustralia.com WPM 185" },
        { label: "Reinforcement", value: "Polyester + fibreglass", source: "ardexaustralia.com WPM 185" },
        { label: "Finish", value: "Mineral — slate grey / white", source: "ardexaustralia.com WPM 185" },
        { label: "Test evidence", value: "BRANZ — AS 4654.1 (grey + white)", source: "ardexaustralia.com WPM 185" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "SikaShield P24 PE Argo 3 mm",
    shortType: "APP modified-bitumen torch-on base sheet (sand)",
    badges: [{ label: "APP torch-on base", tone: "navy" }],
    appInfo: kp([
      "APP modified bitumen",
      "3.0 mm ± 0.2 mm",
      "Non-woven polyester stabilised with glass fibre",
      "Sand top / PE foil underside",
      "Base sheet in a multi-layer system",
      "Torch-applied",
    ]),
    bestFor: [
      "Glass-fibre-stabilised polyester base sheet — dimensionally stable; sand top welds the cap layer",
      "Flexible to 0 °C; consistent 3.0 mm factory thickness",
    ],
    avoidWhere: [
      "As an exposed cap (it is a sanded base sheet — needs a cap over it)",
      "Heat-sensitive substrates (torch flame)",
    ],
    warnings: [
      "Page cites EN 13707 / CE marking; a named Australian (AS 4654.1) test certificate was not shown — confirm before Class 2 specification",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: {
      description:
        "SikaShield P24 PE Argo 3 mm is a 3.0 mm (±0.2) APP modified-bitumen torch-on base sheet reinforced with non-woven polyester dimensionally stabilised with glass fibre, sand-finished on top (to weld the overlying layer) with a polyethylene foil underside, flexible to 0 °C. The AU page cites EN 13707 / CE; a named Australian AS 4654.1 certificate was not shown on the page.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP modified bitumen", source: "aus.sika.com SikaShield P24 PE Argo" },
        { label: "Thickness", value: "3.0 mm ± 0.2 mm", source: "aus.sika.com SikaShield P24 PE Argo" },
        { label: "Reinforcement", value: "Non-woven polyester + glass-fibre stabilised", source: "aus.sika.com SikaShield P24 PE Argo" },
        { label: "Surface", value: "Sand top / PE foil underside", source: "aus.sika.com SikaShield P24 PE Argo" },
        { label: "Role", value: "Base sheet (multi-layer)", source: "aus.sika.com SikaShield P24 PE Argo" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "SikaShield P44 MG Fidia 4.5 kg/m²",
    shortType: "APP modified-bitumen torch-on mineral cap sheet (UV)",
    badges: [{ label: "APP torch-on cap", tone: "navy" }],
    appInfo: kp([
      "APP modified bitumen",
      "4.5 kg/m² ± 0.45",
      "Non-woven polyester stabilised with glass fibre",
      "Mineral granules top / PE film underside",
      "Exposed UV cap sheet (multi-layer)",
      "Torch-applied",
    ]),
    bestFor: [
      "Mineral-granule cap for permanent UV exposure — the exposed final layer of a torch-on system",
      "Glass-fibre-stabilised polyester; AS 4654.1 approved (test certificate available on request)",
    ],
    avoidWhere: [
      "As a base/intermediate sheet (it is an exposed mineral cap)",
      "Heat-sensitive substrates (torch flame)",
    ],
    warnings: [
      "AU page states AS 4654.1 approval with a test certificate available on request — obtain the certificate for Class 2 specification",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: {
      description:
        "SikaShield P44 MG Fidia 4.5 kg/m² is an APP modified-bitumen torch-on cap sheet reinforced with glass-fibre-stabilised non-woven polyester, finished with mineral granules (top) for permanent UV exposure and a polyethylene film underside, used as the exposed cap of a multi-layer system. The AU page states AS 4654.1-2012 approval for external above-ground use, with a test certificate available on request.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP modified bitumen (mineral cap)", source: "aus.sika.com SikaShield P44 MG Fidia" },
        { label: "Weight", value: "4.5 kg/m² ± 0.45", source: "aus.sika.com SikaShield P44 MG Fidia" },
        { label: "Reinforcement", value: "Non-woven polyester + glass-fibre stabilised", source: "aus.sika.com SikaShield P44 MG Fidia" },
        { label: "Surface", value: "Mineral granules top / PE film underside", source: "aus.sika.com SikaShield P44 MG Fidia" },
        { label: "AS 4654.1", value: "Approved — test certificate on request", source: "aus.sika.com SikaShield P44 MG Fidia" },
      ],
    },
  },
  {
    brand: "Tremco CPG Australia",
    rangeName: "Tremco TREMproof Torch 3000",
    shortType: "APP modified-bitumen torch-on base sheet",
    badges: [{ label: "APP torch-on base", tone: "navy" }],
    appInfo: kp([
      "APP modified bitumen",
      "3 mm",
      "Non-woven polyester mat",
      "",
      "Base sheet",
      "Torch-applied",
    ]),
    bestFor: [
      "Polyester-mat APP base sheet for multi-layer torch-on roof/podium systems",
      "Supplied 1 m × 10 m rolls",
    ],
    avoidWhere: [
      "As an exposed cap (it is a base sheet — needs a cap layer)",
      "Heat-sensitive substrates (torch flame)",
    ],
    warnings: [
      "Page states the product is tested to AS 4654.1 but does not cite a named certificate — confirm before Class 2 specification",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: {
      description:
        "Tremco TREMproof Torch 3000 is a 3 mm APP modified-bitumen torch-applied base sheet reinforced with a non-woven polyester mat, for multi-layer external waterproofing systems (1 m × 10 m rolls). The page states it is tested to AS 4654.1; a named test certificate was not cited.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP modified bitumen", source: "tremco.com.au TREMproof Torch 3000" },
        { label: "Thickness", value: "3 mm", source: "tremco.com.au TREMproof Torch 3000" },
        { label: "Reinforcement", value: "Non-woven polyester mat", source: "tremco.com.au TREMproof Torch 3000" },
        { label: "Role", value: "Base sheet", source: "tremco.com.au TREMproof Torch 3000" },
      ],
    },
  },
  {
    brand: "Soprema",
    rangeName: "Soprema Sopralene Flam 180 AR",
    shortType: "SBS modified-bitumen torch-on cap sheet (granule)",
    badges: [{ label: "SBS torch-on", tone: "navy" }],
    appInfo: kp([
      "SBS elastomeric modified bitumen",
      "",
      "Non-woven polyester 180 g/m²",
      "Granule top / thermofusible film underside",
      "Cap sheet (granule)",
      "Torch-applied (heat-weld)",
    ]),
    bestFor: [
      "SBS elastomer — strong low-temperature flexibility and static/dynamic puncture resistance",
      "Granule-faced cap with 180 g/m² non-woven polyester reinforcement",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (torch / heat-weld)",
      "As a sanded base sheet — this is a granule cap",
    ],
    warnings: [
      "Page cites EN 13707 / CE marking — confirm a current Australian AS 4654 test certificate before Class 2 specification",
      "Confirm Australian distributor, thickness and current TDS (imported system)",
    ],
    advanced: {
      description:
        "Soprema Sopralene Flam 180 AR is an SBS elastomeric modified-bitumen torch-on (heat-weld) cap membrane with a 180 g/m² non-woven polyester reinforcement, granule-protected top surface and a thermofusible film underside. CE marked to EN 13707; a named Australian AS 4654 certificate was not shown — confirm the current Australian TDS/availability.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "SBS elastomeric modified bitumen", source: "soprema-international.com Sopralene Flam 180 AR" },
        { label: "Reinforcement", value: "Non-woven polyester 180 g/m²", source: "soprema-international.com Sopralene Flam 180 AR" },
        { label: "Surface", value: "Granule top / thermofusible film underside", source: "soprema-international.com Sopralene Flam 180 AR" },
        { label: "Application", value: "Torch-on / heat-weld only", source: "soprema-international.com Sopralene Flam 180 AR" },
      ],
    },
  },
  {
    brand: "Soprema",
    rangeName: "Soprema Sopralene Flam 250 S",
    shortType: "SBS modified-bitumen torch-on sheet (sand)",
    badges: [{ label: "SBS torch-on", tone: "navy" }],
    appInfo: kp([
      "SBS elastomeric modified bitumen",
      "",
      "Non-woven polyester 250 g/m²",
      "Sand finish",
      "Base / intermediate sheet (multi-layer)",
      "Torch-applied (heat-weld)",
    ]),
    bestFor: [
      "Heavier 250 g/m² polyester reinforcement — high static/dynamic puncture resistance",
      "Sand-finished sheet for a multi-layer SBS system",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (torch / heat-weld)",
      "As an exposed UV cap (use a granule/slate-faced cap)",
    ],
    warnings: [
      "Confirm a current Australian AS 4654 test certificate before Class 2 specification (CE/EN basis on the international page)",
      "Confirm Australian distributor, thickness and current TDS (imported system)",
    ],
    advanced: {
      description:
        "Soprema Sopralene Flam 250 S is an SBS elastomeric modified-bitumen torch-on (heat-weld) sheet with a heavy 250 g/m² non-woven polyester reinforcement for high puncture resistance, sand-finished for use within a multi-layer system. Confirm the current Australian TDS, thickness and AS 4654 certification.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "SBS elastomeric modified bitumen", source: "soprema Sopralene Flam 250" },
        { label: "Reinforcement", value: "Non-woven polyester 250 g/m²", source: "soprema Sopralene Flam 250" },
        { label: "Application", value: "Torch-on / heat-weld", source: "soprema Sopralene Flam 250" },
      ],
    },
  },
  {
    brand: "IKO",
    rangeName: "IKO Armour Cap",
    shortType: "Modified-bitumen torch-on mineral cap sheet",
    badges: [{ label: "Torch-on cap", tone: "navy" }],
    appInfo: kp([
      "Modified-bitumen torch-on cap sheet",
      "",
      "Polyester",
      "Mineral",
      "UV-exposed cap sheet",
      "Torch-applied",
    ]),
    bestFor: [
      "Mineral-finished modified-bitumen cap sheet for the exposed layer of a torch-on system",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (torch flame)",
      "As a base sheet",
    ],
    warnings: [
      "Imported system — confirm current Australian distributor, the exact product grade, thickness and AS 4654 certification before specifying",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: {
      description:
        "IKO Armour Cap is a polyester-reinforced, mineral-finished modified-bitumen torch-on cap sheet for the UV-exposed layer of a multi-layer roofing/waterproofing system. Confirm the exact Australian product grade, thickness and AS 4654 certification with the current IKO Australian distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Modified-bitumen torch-on cap sheet", source: "IKO (confirm AU distributor)" },
        { label: "Finish", value: "Mineral (UV cap)", source: "IKO (confirm AU distributor)" },
      ],
    },
  },
  {
    brand: "IKO",
    rangeName: "IKO Armourbase Pro",
    shortType: "Bitumen-polyester base / underlay sheet",
    badges: [{ label: "Base / underlay", tone: "navy" }],
    appInfo: kp([
      "Bitumen polyester-based sheet (PP film both sides)",
      "",
      "Polyester",
      "Polypropylene film both sides",
      "Underlay / base layer",
      "",
    ]),
    bestFor: [
      "Lightweight bitumen-polyester base / underlay layer of a multi-layer build",
    ],
    avoidWhere: [
      "As a standalone or exposed cap membrane (it is a base/underlay)",
    ],
    warnings: [
      "Imported system — confirm the exact Australian product grade, fixing method, thickness and AS 4654 certification with the current IKO Australian distributor",
      "Requires a cap / finish layer over it",
    ],
    advanced: {
      description:
        "IKO Armourbase Pro is a lightweight bitumen polyester-based sheet faced with polypropylene film on both sides, used as the base/underlay layer of a multi-layer system. Confirm the exact Australian product grade, fixing method, thickness and AS 4654 certification with the current IKO Australian distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Bitumen polyester sheet (PP film both sides)", source: "IKO (confirm AU distributor)" },
        { label: "Role", value: "Underlay / base layer", source: "IKO (confirm AU distributor)" },
      ],
    },
  },
  {
    brand: "Nuralite",
    rangeName: "Nuralite NP250",
    shortType: "SBS modified-bitumen torch-on membrane",
    badges: [{ label: "SBS torch-on", tone: "navy" }],
    appInfo: kp([
      "SBS modified-bitumen torch-on membrane",
      "",
      "Polyester",
      "",
      "Roof / deck / gutter membrane (multi-layer)",
      "Torch-applied",
    ]),
    bestFor: [
      "SBS modified-bitumen torch-on membrane for roofs, decks, gutters and parapets",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (torch flame)",
    ],
    warnings: [
      "Nuralite's Nuraply 3PM torch-on range holds CodeMark (CM70032) — confirm the NP250 product grade and its current Australian certification with Nuralite / Nurajack Australia before Class 2 specification",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: {
      description:
        "Nuralite NP250 is an SBS modified-bitumen torch-on waterproofing membrane for roofs, decks, gutters and parapets. Nuralite's Nuraply 3PM torch-on range is CodeMark-certified (CM70032); confirm the specific NP250 grade, thickness and its current Australian certification with Nuralite / Nurajack Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "SBS modified-bitumen torch-on", source: "nuralite (confirm NP250 grade)" },
        { label: "Use", value: "Roofs, decks, gutters, parapets", source: "nuralite (confirm NP250 grade)" },
      ],
    },
  },
  {
    brand: "Polyglass / Mapei",
    rangeName: "Polyglass Polybest",
    shortType: "APP modified-bitumen torch-on membrane",
    badges: [{ label: "APP torch-on", tone: "navy" }],
    appInfo: kp([
      "APP modified-bitumen torch-on membrane",
      "",
      "Polyester",
      "",
      "Roof / podium membrane (multi-layer)",
      "Torch-applied",
    ]),
    bestFor: [
      "APP modified-bitumen torch-on membrane (Polyglass, distributed in Australia via Mapei / Parchem)",
    ],
    avoidWhere: [
      "Heat-sensitive substrates (torch flame)",
    ],
    warnings: [
      "Confirm the exact Polybest grade (base vs mineral cap), thickness and current Australian AS 4654 certification with Mapei / Parchem before specifying",
      "Torch application — hot-works controls and competent installer required",
    ],
    advanced: {
      description:
        "Polyglass Polybest is an APP modified-bitumen torch-on waterproofing membrane (Polyglass is part of Mapei; distributed in Australia via Mapei / Parchem). Confirm the exact grade (base or mineral cap), thickness and current Australian AS 4654 certification before specifying.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "APP modified-bitumen torch-on", source: "Polyglass / Mapei (confirm AU grade)" },
        { label: "Application", value: "Torch-applied", source: "Polyglass / Mapei (confirm AU grade)" },
      ],
    },
  },
];
