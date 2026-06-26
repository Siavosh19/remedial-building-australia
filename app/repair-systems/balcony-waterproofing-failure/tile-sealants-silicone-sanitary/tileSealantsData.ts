// ──────────────────────────────────────────────────────────────────────────────
// Tile / movement-joint sealants (silicone & PU). System components → no Class-2 /
// warranty field. Values from the AU manufacturer page/TDS; empty facts pruned.
// appInfo columns: Type / chemistry · Movement capability · Use · Finish / colour · Notes.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type / chemistry", "Movement capability", "Use", "Finish / colour", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const TILE_SEALANT_CARDS: RefCard[] = [
  {
    brand: "Sika Australia", rangeName: "Sikaflex-11 FC+",
    shortType: "1-part fast-cure polyurethane sealant / adhesive",
    badges: [{ label: "Polyurethane", tone: "navy" }, { label: "Seal + bond", tone: "blue" }],
    appInfo: kp([
      "1-component fast-curing polyurethane sealant / adhesive",
      "Elastic movement joint (confirm % on TDS)",
      "Sealing & bonding construction / movement joints; perimeter & penetration seals",
      "Paintable; range of colours (confirm)",
      "Permanently elastic; multi-substrate adhesion",
    ]),
    bestFor: [
      "Versatile fast-curing PU that both seals and bonds — construction/movement joints, perimeters and penetrations",
      "Permanently elastic with strong adhesion to most building substrates",
    ],
    avoidWhere: [
      "Continuous-immersion sanitary joints better suited to a neutral-cure silicone",
      "Where a non-staining low-modulus facade silicone is specified",
    ],
    warnings: ["Confirm the movement capability (%) and substrate priming against the current Sika Australia TDS", "Not a substitute for the waterproofing membrane — joints are detailed within the system"],
    advanced: { description: "Sikaflex-11 FC+ is a one-component, fast-curing, permanently-elastic polyurethane joint sealant and adhesive for sealing and bonding construction and movement joints, perimeters and penetrations, with strong adhesion to most building substrates. Confirm the movement capability and priming against the current Sika Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "1-part fast-cure polyurethane sealant/adhesive", source: "aus.sika.com Sikaflex-11 FC+" },
      { label: "Function", value: "Seals and bonds; permanently elastic", source: "aus.sika.com Sikaflex-11 FC+" },
    ] },
  },
  {
    brand: "Bostik Australia", rangeName: "Bostik Seal 'N' Flex 1",
    shortType: "Low-modulus Class-A polyurethane movement-joint sealant",
    badges: [{ label: "Polyurethane (low-modulus)", tone: "navy" }, { label: "±100% movement", tone: "blue" }],
    appInfo: kp([
      "1-component low-modulus polyurethane sealant (Class A)",
      "±100% (+50%) of installed joint width",
      "Expansion / movement / control joints; perimeters",
      "Range of colours (confirm)",
      "Tough, flexible seal; high movement accommodation",
    ]),
    bestFor: [
      "Low-modulus Class-A PU with high movement accommodation (±100% / +50%) — expansion and control joints",
      "Tough, flexible seal across building movement joints",
    ],
    avoidWhere: [
      "Continuous-immersion sanitary joints (use a neutral-cure silicone)",
    ],
    warnings: ["Use a backer rod at the correct depth:width ratio for movement joints", "Confirm priming and substrate against the current Bostik Australia TDS"],
    advanced: { description: "Bostik Seal 'N' Flex 1 is a low-modulus, one-component, Class-A polyurethane sealant that forms a tough, flexible seal capable of accommodating movement of ±100% (+50%) of the original installed joint width — for expansion, movement and control joints and perimeters. Use a backer rod at the correct depth:width ratio.", designCriteria: "", techData: [
      { label: "Type", value: "Low-modulus Class-A polyurethane sealant", source: "bostik.com AU Seal 'N' Flex 1" },
      { label: "Movement", value: "±100% (+50%) of installed joint width", source: "bostik.com AU Seal 'N' Flex 1" },
    ] },
  },
  {
    brand: "Tremco CPG Australia", rangeName: "Tremco Spectrem 1",
    shortType: "1-part ultra-low-modulus moisture-cure silicone",
    badges: [{ label: "Silicone (ULM)", tone: "navy" }, { label: "+100/-50% movement", tone: "blue" }],
    appInfo: kp([
      "1-component moisture-cure ultra-low-modulus silicone",
      "+100 / -50% movement",
      "High-movement expansion / facade joints; sensitive indoor environments",
      "Range of colours (confirm)",
      "Greenguard Gold; high elasticity",
    ]),
    bestFor: [
      "Ultra-low-modulus silicone with very high elasticity (+100/-50%) — high-movement expansion and facade joints",
      "Greenguard Gold certified — suited to sensitive indoor environments (hospitals, schools)",
    ],
    avoidWhere: [
      "Joints to be painted or tiled over (silicone is not paintable/over-tileable)",
      "As a structural bonding adhesive (use a PU)",
    ],
    warnings: ["Silicone is not paintable — confirm the colour at specification", "Confirm substrate priming and joint design against the current Tremco Australia TDS"],
    advanced: { description: "Tremco Spectrem 1 is a high-performance, single-component, moisture-cure, ultra-low-modulus silicone sealant with very high elasticity (movement accommodation +100/-50%), Greenguard Gold certified for sensitive indoor environments — for high-movement expansion and facade joints. Available in 300 mL cartridges and 600 mL sausages.", designCriteria: "", techData: [
      { label: "Type", value: "1-part moisture-cure ultra-low-modulus silicone", source: "tremco.com.au Spectrem 1" },
      { label: "Movement", value: "+100 / -50%", source: "tremco.com.au Spectrem 1" },
      { label: "Cert", value: "Greenguard Gold", source: "tremco.com.au Spectrem 1" },
    ] },
  },
  {
    brand: "Mapei Australia", rangeName: "Mapei Mapesil T",
    shortType: "Neutral / acetic silicone sealant for tile joints (sanitary)",
    badges: [{ label: "Silicone (sanitary)", tone: "navy" }],
    appInfo: kp([
      "Silicone sealant for tile movement / perimeter joints",
      "Elastic movement joint (confirm % on TDS)",
      "Sanitary / perimeter & movement joints in tiled wet areas",
      "Colour-matched to Mapei grouts; mould-resistant",
      "",
    ]),
    bestFor: [
      "Silicone for sanitary, perimeter and movement joints in tiled wet areas — colour-matched to Mapei grouts",
      "Mould-resistant for showers and wet areas",
    ],
    avoidWhere: ["High-movement structural expansion joints better suited to a low-modulus PU/ULM silicone (confirm movement class)"],
    warnings: ["Confirm the exact current product (e.g. Mapesil T vs Mapesil AC), cure type and movement class against the current Mapei Australia TDS"],
    advanced: { description: "Mapei Mapesil is a silicone sealant for sanitary, perimeter and movement joints in tiled wet areas, colour-matched to Mapei grouts and mould-resistant. Confirm the exact current product (Mapesil T / AC), cure type and movement class against the current Mapei Australia TDS.", designCriteria: "", techData: [
      { label: "Type", value: "Silicone sealant for tile joints (sanitary)", source: "mapei.com/au Mapesil" },
      { label: "Finish", value: "Colour-matched to Mapei grouts; mould-resistant", source: "mapei.com/au Mapesil" },
    ] },
  },
  {
    brand: "ARDEX Australia", rangeName: "ARDEX SE",
    shortType: "Sanitary silicone sealant for tile joints",
    badges: [{ label: "Silicone (sanitary)", tone: "navy" }],
    appInfo: kp([
      "Silicone sealant for tile perimeter / movement joints",
      "Elastic movement joint (confirm % on TDS)",
      "Sanitary / perimeter & movement joints in tiled wet areas",
      "Colour-matched to ARDEX grouts; mould-resistant",
      "",
    ]),
    bestFor: [
      "Silicone for sanitary, perimeter and internal movement joints in tiled wet areas — colour-matched to ARDEX grouts",
      "Mould-resistant for showers and wet areas",
    ],
    avoidWhere: ["High-movement structural expansion joints (use a low-modulus PU / ULM silicone)"],
    warnings: ["Confirm the cure type and movement class against the current Ardex Australia TDS", "Use a bond breaker / backer rod in movement joints"],
    advanced: { description: "ARDEX SE is a silicone sealant for sanitary, perimeter and internal movement joints in tiled wet areas, colour-matched to ARDEX grouts and mould-resistant. Confirm the cure type and movement class against the current Ardex Australia TDS; use a bond breaker / backer rod in movement joints.", designCriteria: "", techData: [
      { label: "Type", value: "Sanitary silicone sealant for tile joints", source: "ardexaustralia.com SE" },
      { label: "Finish", value: "Colour-matched to ARDEX grouts; mould-resistant", source: "ardexaustralia.com SE" },
    ] },
  },
];
