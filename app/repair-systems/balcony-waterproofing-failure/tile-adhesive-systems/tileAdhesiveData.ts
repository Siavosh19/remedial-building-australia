// ──────────────────────────────────────────────────────────────────────────────
// Tile adhesives, admixes & grouts (over the membrane). System components → no
// Class-2 / warranty field. Values from the AU manufacturer page/TDS; empty facts
// pruned. appInfo columns: Type · Classification · Use / best for · Bed / joint
// range · Open time / pot life · Notes.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Classification", "Use / best for", "Bed / joint range", "Open time / pot life", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const TILE_ADHESIVE_CARDS: RefCard[] = [
  {
    brand: "ARDEX Australia", rangeName: "ARDEX X 77 Microtec",
    shortType: "Flexible polymer-modified wall & floor tile adhesive",
    badges: [{ label: "C2 TE S1", tone: "navy" }, { label: "Fibre-reinforced", tone: "blue" }],
    appInfo: kp([
      "Fibre-reinforced polymer-modified cementitious adhesive",
      "C2 TE S1 (S2 with ARDEX E 90)",
      "Wall & floor — vitrified/ceramic/porcelain, stone, mosaics",
      "",
      "Open time 60 min; pot life 3 h",
      "Coverage ~9 m² wall / 6 m² floor; tensile ≥1.0 MPa @28 d",
    ]),
    bestFor: [
      "Flexible (S1) Microtec adhesive for the majority of wall and floor tiling over a membrane — upgrades to S2 with ARDEX E 90",
      "Long 60-min open time and non-slip handling across most tile types",
    ],
    avoidWhere: [
      "Highly-deforming substrates needing S2 without the E 90 admix",
      "Epoxy-grade chemical/hygiene areas (use an epoxy adhesive/grout)",
    ],
    warnings: ["Confirm the S1 vs S2 (E 90) requirement for the substrate movement", "Tile over a fully-cured, flood-tested membrane only"],
    advanced: { description: "ARDEX X 77 Microtec is a high-performance, fibre-reinforced, polymer-modified cementitious wall and floor tile adhesive, classified C2 TE S1 (S2 with ARDEX E 90). Off-white; open time 60 min; pot life 3 h; ~9 m² wall / 6 m² floor; 28-day dry tensile adhesion ≥1.0 MPa. Suits vitrified and ceramic tiles, porcelain, stone, Terrazzo and mosaics.", designCriteria: "", techData: [
      { label: "Classification", value: "C2 TE S1 (S2 with E 90)", source: "ardexaustralia.com X 77" },
      { label: "Open time / pot life", value: "60 min / 3 h", source: "ardexaustralia.com X 77" },
      { label: "Tensile @28 d", value: "≥1.0 MPa", source: "ardexaustralia.com X 77" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX X 78 Microtec",
    shortType: "Flexible semi-pourable floor tile adhesive",
    badges: [{ label: "Semi-pourable floor", tone: "navy" }],
    appInfo: kp([
      "Polymer-modified cementitious adhesive (Microtec)",
      "",
      "Floor tiling — semi-pourable for full bed contact",
      "",
      "",
      "",
    ]),
    bestFor: ["Semi-pourable floor adhesive — flows to a full, void-free bed under large-format floor tiles"],
    avoidWhere: ["Wall tiling (it is a semi-pourable floor adhesive)"],
    warnings: ["Confirm the ISO 13007 classification (C/S grade), coverage and open time against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX X 78 Microtec is a flexible, polymer-modified, semi-pourable floor tile adhesive (Microtec technology) that flows to a full, void-free bed beneath large-format floor tiles. Confirm the ISO 13007 classification and coverage against the current Ardex Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "Polymer-modified semi-pourable floor adhesive", source: "ardexaustralia.com X 78" },
    ] },
  },
  {
    brand: "Mapei Australia", rangeName: "Mapei Ultraflex 2",
    shortType: "Flexible polymer-modified tile adhesive",
    badges: [{ label: "Flexible adhesive", tone: "navy" }],
    appInfo: kp([
      "Polymer-modified cementitious adhesive",
      "",
      "Wall & floor — ceramic, porcelain, stone",
      "",
      "",
      "",
    ]),
    bestFor: ["Flexible polymer-modified adhesive for wall and floor tiling over a membrane"],
    avoidWhere: ["Where a documented deformability class (S1/S2) must be confirmed for the substrate"],
    warnings: ["Confirm the ISO 13007 / EN 12004 classification (C/S grade), bed thickness and open time against the current Mapei Australia TDS"],
    advanced: { description: "Mapei Ultraflex 2 is a flexible, polymer-modified cementitious tile adhesive for wall and floor ceramic, porcelain and stone over a membrane. Confirm the ISO 13007 classification, bed thickness and open time against the current Mapei Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "Polymer-modified cementitious adhesive", source: "mapei.com/au Ultraflex 2" },
    ] },
  },
  {
    brand: "Mapei Australia", rangeName: "Mapei Keraflex Maxi S1",
    shortType: "Deformable large-format adhesive (C2 TE S1)",
    badges: [{ label: "C2 TE S1", tone: "navy" }, { label: "Large-format", tone: "blue" }],
    appInfo: kp([
      "Deformable polymer-modified cementitious adhesive",
      "C2 TE S1 (EN 12004 / ISO 13007 / ANSI A118.4)",
      "Large-format porcelain & natural stone",
      "Bed 3–15 mm (corrects unevenness without pre-levelling)",
      "Open time >30 min; adjustable ~60 min @23 °C",
      "Initial tensile ~2.6 N/mm²; no vertical slip",
    ]),
    bestFor: [
      "Deformable (S1) large-format adhesive — 3–15 mm bed corrects unevenness without pre-levelling",
      "No vertical slip + extended open time and ~60-min adjustability for precise alignment",
    ],
    avoidWhere: ["Very high-movement substrates needing S2", "Chemical/hygiene areas needing an epoxy"],
    warnings: ["Confirm bed thickness (3–15 mm) for the tile/format", "Tile over a fully-cured, flood-tested membrane only"],
    advanced: { description: "Mapei Keraflex Maxi S1 is a deformable (S1), improved (2), slip-resistant (T) cementitious adhesive with extended open time (E) — C2 TE S1 to EN 12004 / ISO 13007-1 (ANSI A118.4) — for large-format porcelain and natural stone, with a 3–15 mm bed that corrects unevenness without pre-levelling. Open time >30 min, adjustable ~60 min @23 °C, initial tensile ~2.6 N/mm², no vertical slip.", designCriteria: "", techData: [
      { label: "Classification", value: "C2 TE S1 (EN 12004 / ISO 13007 / ANSI A118.4)", source: "mapei.com/au Keraflex Maxi S1" },
      { label: "Bed", value: "3–15 mm", source: "mapei.com/au Keraflex Maxi S1" },
      { label: "Tensile (initial)", value: "~2.6 N/mm²", source: "mapei.com/au Keraflex Maxi S1" },
    ] },
  },
  {
    brand: "Bostik Australia", rangeName: "Bostik UltraSet SuperFlex",
    shortType: "Flexible tile adhesive",
    badges: [{ label: "Flexible adhesive", tone: "navy" }],
    appInfo: kp([
      "Flexible adhesive (confirm chemistry/grade)",
      "",
      "Wall & floor tiling",
      "",
      "",
      "",
    ]),
    bestFor: ["Flexible Bostik tile adhesive for wall and floor tiling over a membrane"],
    avoidWhere: ["Where a documented ISO 13007 class must be confirmed"],
    warnings: ["Confirm the exact product, chemistry and ISO 13007 classification with Bostik Australia (the Ultraset name also covers timber-flooring adhesives)"],
    advanced: { description: "Bostik UltraSet SuperFlex is a flexible tile adhesive. Confirm the exact current product, chemistry and ISO 13007 classification with Bostik Australia before specifying (Bostik's Ultraset range also includes timber-flooring adhesives).", designCriteria: "", techData: [
      { label: "Type", value: "Flexible tile adhesive (confirm grade)", source: "bostik.com AU (confirm)" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX X 56",
    shortType: "Fast-setting, highly flexible (S2) tile adhesive",
    badges: [{ label: "S2 highly flexible", tone: "navy" }, { label: "Fast-set", tone: "blue" }],
    appInfo: kp([
      "Fast-setting polymer-modified cementitious adhesive",
      "Highly flexible — S2",
      "Direct to sheet timber & concrete subject to movement (no additive)",
      "",
      "Fast-setting",
      "",
    ]),
    bestFor: [
      "Highly flexible S2 — tiles directly to sheet timber and concrete subject to thermal/shrinkage movement without an additive",
      "Fast-setting for quick turnaround",
    ],
    avoidWhere: ["Where a long open/adjustment time is needed (fast-set reduces working time)"],
    warnings: ["Plan placement — fast-set reduces working time", "Tile over a fully-cured, flood-tested membrane only"],
    advanced: { description: "ARDEX X 56 is a fast-setting, polymer-modified, highly flexible (S2) tile adhesive suitable for tiling directly to sheet timber and concrete substrates subject to thermal/shrinkage movement without the addition of an admix.", designCriteria: "", techData: [
      { label: "Classification", value: "Highly flexible — S2", source: "ardexaustralia.com X 56" },
      { label: "Set", value: "Fast-setting", source: "ardexaustralia.com X 56" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX X 52 (Improved Glue)",
    shortType: "Economical flexible rubber-modified tile adhesive",
    badges: [{ label: "Flexible (rubber-modified)", tone: "navy" }],
    appInfo: kp([
      "Rubber-modified cementitious adhesive",
      "",
      "Wall & floor — situations with minimal anticipated movement",
      "",
      "",
      "",
    ]),
    bestFor: ["Economical flexible rubber-modified adhesive for situations where minimal movement is anticipated"],
    avoidWhere: ["Substrates subject to significant thermal/shrinkage movement (use X 56/X 77)"],
    warnings: ["For minimal-movement situations only — confirm the substrate movement and ISO 13007 class against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX X 52 (Improved Glue) is an economical, flexible, rubber-modified cementitious tile adhesive for situations where minimal movement is anticipated. Confirm the ISO 13007 classification against the current Ardex Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "Rubber-modified cementitious adhesive", source: "ardexaustralia.com X 52" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX X 18",
    shortType: "Polymer-fortified, fibre-reinforced tile adhesive (S1)",
    badges: [{ label: "S1", tone: "navy" }, { label: "Non-slump", tone: "blue" }],
    appInfo: kp([
      "Polymer-fortified, fibre-reinforced cementitious adhesive",
      "Flexible — S1",
      "Large-format wall; pools, wet areas, early-age concrete",
      "",
      "Extended open time",
      "Non-slump consistency",
    ]),
    bestFor: [
      "Non-slump, fibre-reinforced S1 adhesive — large-format wall tiles and demanding wet areas (pools, showers)",
      "Extended open time; bonds reliably over early-age concrete",
    ],
    avoidWhere: ["Where S2 deformability is required for heavy substrate movement (use X 56)"],
    warnings: ["Tile over a fully-cured, flood-tested membrane only", "Confirm pool/immersion suitability against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX X 18 is a superior polymer-fortified, fibre-reinforced cementitious tile adhesive with a non-slump consistency for large-format wall tiles, extended open time and flexible S1 performance for demanding applications including swimming pools, wet areas and tiling over early-age concrete.", designCriteria: "", techData: [
      { label: "Classification", value: "Flexible — S1", source: "ardexaustralia.com X 18" },
      { label: "Use", value: "Large-format wall; pools/wet/early-age concrete", source: "ardexaustralia.com X 18" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX E 90 (Tile Adhesive Admix)",
    shortType: "Admix improver for cement-based tile adhesives",
    badges: [{ label: "Admix (S1→S2)", tone: "navy" }],
    appInfo: kp([
      "Liquid admix improver for cement-based adhesives",
      "Upgrades flexibility (e.g. X 77 S1 → S2)",
      "Gauge into ARDEX cement adhesives for elasticity & water repellency",
      "",
      "",
      "Higher adhesive strength, elastic, water-repellent set",
    ]),
    bestFor: ["Gauged into a cement adhesive (e.g. X 77) it raises flexibility (S1 → S2) and adds elasticity and water repellency"],
    avoidWhere: ["As a standalone adhesive or membrane (it is an admix)"],
    warnings: ["It is an admix, not an adhesive — confirm the dosage/mix and the adhesive it upgrades against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX E 90 is a liquid admix improver for cement-based tile adhesives — gauged in place of water it produces a mortar with higher adhesive strength, elastic and water-repellent properties (e.g. upgrading ARDEX X 77 from S1 to S2).", designCriteria: "", techData: [
      { label: "Type", value: "Admix improver for cement adhesives", source: "ardexaustralia.com E 90" },
      { label: "Effect", value: "Raises flexibility (S1 → S2); water-repellent", source: "ardexaustralia.com E 90" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX WA Epoxy Tile Adhesive and Grout",
    shortType: "2-part 100%-solids epoxy adhesive + grout (RG)",
    badges: [{ label: "Epoxy adhesive + grout", tone: "navy" }, { label: "Chemical-resistant", tone: "blue" }],
    appInfo: kp([
      "2-component 100%-solids epoxy adhesive & grout",
      "Reaction-resin (RG / R2)",
      "High-hygiene & chemical areas — pools, showers, dairies, commercial kitchens",
      "",
      "",
      "Stain & chemical resistant; bonds and grouts in one product",
    ]),
    bestFor: [
      "100%-solids epoxy that both bonds and grouts — for high-hygiene, chemical and high-use areas (pools, hot tubs, showers, dairies, food/medical)",
      "Stain- and chemical-resistant; impervious joints",
    ],
    avoidWhere: ["General domestic tiling where a cement adhesive/grout is sufficient (epoxy is harder to apply/clean)"],
    warnings: ["Two-part epoxy — observe pot life; clean before it cures", "Confirm joint width and chemical-exposure rating against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX WA is a solvent-free, two-component, 100%-solids epoxy grout and adhesive (reaction-resin) for tiling in industrial areas, swimming pools, hot tubs, showers, bathrooms, dairies, food and medical facilities and anywhere requiring high hygiene and chemical/stain resistance — it both bonds and grouts.", designCriteria: "", techData: [
      { label: "Type", value: "2-part 100%-solids epoxy adhesive + grout (RG)", source: "ardexaustralia.com WA" },
      { label: "Use", value: "Hygiene/chemical areas — pools, showers, food/medical", source: "ardexaustralia.com WA" },
    ] },
  },
  {
    brand: "Mapei Australia", rangeName: "Mapei Kerapoxy CQ",
    shortType: "2-part 100%-solids epoxy grout & mortar (RG)",
    badges: [{ label: "Epoxy grout (RG)", tone: "navy" }, { label: "Stain/chemical-resistant", tone: "blue" }],
    appInfo: kp([
      "2-component 100%-solids epoxy grout & mortar",
      "Reaction-resin (RG / R2) — EN 13888",
      "High-traffic, stain- & chemical-resistant joints; countertops",
      "Joints up to ~10 mm",
      "Pot life ~45 min",
      "Light foot traffic ~24 h; chemical-ready 4 days; water-cleanable",
    ]),
    bestFor: [
      "100%-solids epoxy grout with a proprietary quartz aggregate — durable colour, stain and chemical resistance for high-traffic and wet areas",
      "Non-sag in joints up to ~10 mm; water-cleanable (easier than older epoxies)",
    ],
    avoidWhere: ["General low-duty domestic joints where a cement grout suffices"],
    warnings: ["Two-part epoxy — pot life ~45 min; clean before it cures", "Allow 4 days before chemical exposure"],
    advanced: { description: "Mapei Kerapoxy CQ is a two-component, 100%-solids epoxy grout and mortar (reaction-resin, EN 13888 RG) that is non-sag in joints up to ~10 mm, water-cleanable, with a proprietary quartz aggregate for durable colour and stain/chemical resistance. Pot life ~45 min; light foot traffic ~24 h; chemical-ready after 4 days.", designCriteria: "", techData: [
      { label: "Type", value: "2-part 100%-solids epoxy grout/mortar (RG)", source: "mapei.com/au Kerapoxy CQ" },
      { label: "Joint", value: "Up to ~10 mm", source: "mapei.com/au Kerapoxy CQ" },
      { label: "Pot life", value: "~45 min", source: "mapei.com/au Kerapoxy CQ" },
    ] },
  },
  {
    brand: "Mapei Australia", rangeName: "Mapei Kerapoxy Design",
    shortType: "2-part epoxy designer grout (RG)",
    badges: [{ label: "Epoxy grout (RG)", tone: "navy" }, { label: "Designer / translucent", tone: "blue" }],
    appInfo: kp([
      "2-component epoxy grout & adhesive",
      "Reaction-resin (RG / R2) — EN 13888",
      "Decorative / translucent joints; glass & mosaic; can add MapeGlitter",
      "",
      "",
      "Stain & chemical resistant; decorative finishes",
    ]),
    bestFor: [
      "Decorative epoxy grout — translucent/designer finishes for glass and mosaic, with optional MapeGlitter, plus epoxy stain/chemical resistance",
    ],
    avoidWhere: ["Plain general-purpose joints where a cement grout suffices"],
    warnings: ["Two-part epoxy — observe pot life and clean before it cures", "Confirm colour/finish system and joint width against the current Mapei Australia TDS"],
    advanced: { description: "Mapei Kerapoxy Design is a two-component, decorative epoxy grout and adhesive (reaction-resin, EN 13888 RG) for translucent/designer joints, glass and mosaic, with the option to add MapeGlitter, combining decorative finishes with epoxy stain and chemical resistance.", designCriteria: "", techData: [
      { label: "Type", value: "2-part epoxy designer grout (RG)", source: "mapei.com/au Kerapoxy Design" },
      { label: "Use", value: "Decorative / translucent; glass & mosaic", source: "mapei.com/au Kerapoxy Design" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX FG 8",
    shortType: "Flexible coloured cement grout (1–8 mm joints)",
    badges: [{ label: "Flexible cement grout", tone: "navy" }],
    appInfo: kp([
      "Flexible coloured cement-based grout",
      "Cementitious grout (CG) — flexible",
      "Wall & floor tile joints; improved colour integrity",
      "Joints 1–8 mm",
      "",
      "Smooth, easy to use on walls and floors",
    ]),
    bestFor: ["Flexible coloured cement grout for tile joints 1–8 mm with improved colour integrity — easy on walls and floors"],
    avoidWhere: ["Joints wider than 8 mm (use a wide-joint grout)", "High-chemical/hygiene areas (use an epoxy grout)"],
    warnings: ["Confirm joint width (1–8 mm) and colour against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX FG 8 is a smooth, flexible, cement-based coloured grout with improved colour integrity for tile joints 1–8 mm wide on walls and floors.", designCriteria: "", techData: [
      { label: "Type", value: "Flexible coloured cement grout (CG)", source: "ardexaustralia.com FG 8" },
      { label: "Joint", value: "1–8 mm", source: "ardexaustralia.com FG 8" },
    ] },
  },
  {
    brand: "Mapei Australia", rangeName: "Mapei Ultracolor Plus",
    shortType: "Quick-set/dry cement grout (CG2, joints to 20 mm)",
    badges: [{ label: "Cement grout (CG2)", tone: "navy" }, { label: "Quick-set/dry", tone: "blue" }],
    appInfo: kp([
      "High-performance quick-set & dry cementitious grout",
      "Improved cementitious (CG2) — EN 13888",
      "Wall & floor tile joints; efflorescence-free, water-repellent (BioBlock/DropEffect)",
      "Joints up to 20 mm",
      "Quick-set & quick-dry",
      "Wide colour range",
    ]),
    bestFor: [
      "Quick-set/dry CG2 cement grout for joints up to 20 mm — efflorescence-free with water-repellent (DropEffect) and mould-resistant (BioBlock) technology",
      "One product across narrow and wide joints; broad colour range",
    ],
    avoidWhere: ["High-chemical/hygiene immersion areas needing an epoxy grout"],
    warnings: ["Confirm joint width (to 20 mm) and colour against the current Mapei Australia TDS"],
    advanced: { description: "Mapei Ultracolor Plus is a high-performance, quick-setting and quick-drying, improved cementitious grout (EN 13888 CG2) for tile joints up to 20 mm, with water-repellent DropEffect and mould-resistant BioBlock technology and a wide colour range.", designCriteria: "", techData: [
      { label: "Type", value: "Quick-set/dry cement grout (CG2)", source: "mapei.com/au Ultracolor Plus" },
      { label: "Joint", value: "Up to 20 mm", source: "mapei.com/au Ultracolor Plus" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX EG 15",
    shortType: "High-performance epoxy tile grout (RG, 1.5–15 mm)",
    badges: [{ label: "Epoxy grout (RG)", tone: "navy" }, { label: "Chemical/hygiene", tone: "blue" }],
    appInfo: kp([
      "2-component epoxy tile grout",
      "Reaction-resin (RG / R2) — EN 13888",
      "Strict hygiene, high chemical & physical resistance",
      "Joints 1.5–15 mm",
      "",
      "Walls & floors; impervious joints",
    ]),
    bestFor: [
      "High-performance epoxy grout for strict-hygiene, high-chemical and high-physical-resistance areas — joints 1.5–15 mm",
      "Impervious, easy-clean joints for commercial wet/industrial use",
    ],
    avoidWhere: ["General domestic joints where a cement grout suffices"],
    warnings: ["Two-part epoxy — observe pot life and clean before it cures", "Confirm joint width (1.5–15 mm) and chemical exposure against the current Ardex Australia TDS"],
    advanced: { description: "ARDEX EG 15 is a high-performance, two-component epoxy tile grout (reaction-resin, EN 13888 RG) for situations requiring strict hygiene and high chemical and physical resistance, in joints 1.5–15 mm wide on walls and floors.", designCriteria: "", techData: [
      { label: "Type", value: "2-part epoxy grout (RG)", source: "ardexaustralia.com EG 15" },
      { label: "Joint", value: "1.5–15 mm", source: "ardexaustralia.com EG 15" },
    ] },
  },
];
