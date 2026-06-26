// ──────────────────────────────────────────────────────────────────────────────
// Structural Grouts — hand-authored selection cards (concrete spalling).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source (never guessed).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Compressive @28d", "Flow / consistency", "Max pour depth", "Expansion / shrinkage", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const STRUCTURAL_GROUT_CARDS: RefCard[] = [
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Conbextra GP",
    shortType: "General-purpose shrinkage-compensated cementitious grout",
    badges: [],
    appInfo: kp(["Cementitious non-shrink (general-purpose)", "65 MPa (1d 15 / 7d 45)", "Dry-pack to flowable", "CONFIRM (Parchem TDS)", "Shrinkage-compensated", "20 kg"]),
    bestFor: [
      "General-purpose base-plate, anchor and void grouting — 65 MPa @28d",
      "Consistency-selectable from dry-pack to flowable to suit the gap",
      "Shrinkage-compensated for full bearing contact",
    ],
    avoidWhere: [
      "Very deep or very narrow gaps better suited to a high-flow precision grout (Conbextra HF)",
      "High-early-strength / rapid reinstatement (use a high-early grout)",
    ],
    warnings: [
      "Mix water/consistency controls strength — mix precisely to the TDS",
      "Confirm maximum pour depth per consistency against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Conbextra GP is a general-purpose, shrinkage-compensated cementitious grout reaching 65 MPa @28d (15 MPa @1d, 45 MPa @7d) at trowellable consistency, for base plates, anchors and void filling. Mix consistency (dry-pack to flowable) is selected to suit the gap. CONFIRM the maximum pour depth per consistency against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious non-shrink (general-purpose)", source: "fosroc.com.au TDS" },
        { label: "Compressive @28d", value: "65 MPa (1d 15 / 7d 45)", source: "fosroc.com.au TDS" },
        { label: "Flow / consistency", value: "Dry-pack to flowable (selectable)", source: "fosroc.com.au TDS" },
        { label: "Max pour depth", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
        { label: "Expansion / shrinkage", value: "Shrinkage-compensated", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "20 kg", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Conbextra HF",
    shortType: "High-flow dual-expansion cementitious precision grout (to 125 mm)",
    badges: [],
    appInfo: kp(["Cementitious dual-expansion high-flow precision", "CONFIRM (Parchem TDS)", "High-flow (excellent retention)", "To 125 mm gap", "Dual shrinkage-compensated", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "High-flow precision grouting of deep / congested gaps up to 125 mm",
      "Excellent flow retention — long placement window",
      "Dual shrinkage-compensation for full contact and load transfer",
    ],
    avoidWhere: [
      "Shallow trowel-pack applications (use Conbextra GP)",
      "Where high-early strength is the priority",
    ],
    warnings: [
      "Confirm compressive strength and water ratio against the current Fosroc / Parchem TDS",
      "Maintain flow within the placement window for the full pour",
    ],
    advanced: {
      description:
        "Fosroc Conbextra HF is a dual shrinkage-compensated, high-flow cementitious precision grout for gap thicknesses up to 125 mm, with excellent flow-retention for placing deep or congested gaps in a single pour. CONFIRM the compressive strength and pack size against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious dual-expansion high-flow precision", source: "fosroc.com.au TDS" },
        { label: "Compressive @28d", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
        { label: "Flow / consistency", value: "High-flow (excellent retention)", source: "fosroc.com.au TDS" },
        { label: "Max pour depth", value: "To 125 mm gap", source: "fosroc.com.au TDS" },
        { label: "Expansion / shrinkage", value: "Dual shrinkage-compensated", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika SikaGrout-212 HP",
    shortType: "Non-shrink dual-expansion high-performance cementitious grout",
    badges: [],
    appInfo: kp(["Cementitious non-shrink dual-expansion", "CONFIRM (Sika AU TDS)", "Plastic → fluid (consistency-selectable)", "CONFIRM (Sika AU TDS)", "Dual expansion (non-shrink)", "20 kg"]),
    bestFor: [
      "Versatile high-performance grout — one product mixed plastic, flowable or fluid to suit the gap",
      "Dual-expansion non-shrink for base plates, anchors and machinery bases",
    ],
    avoidWhere: [
      "Confirm the strength for the selected consistency — strength varies with water content",
      "Where a rapid high-early grout is required",
    ],
    warnings: [
      "Strength depends on the chosen consistency / water content — mix to the TDS",
      "Confirm @28d strength and maximum pour depth against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika SikaGrout-212 HP is a high-quality, versatile, non-shrink cementitious grout with dual expansion, mixed at plastic, flowable or fluid consistency to suit the application (base plates, anchors, machinery bases). CONFIRM the @28d compressive strength per consistency and the maximum pour depth against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious non-shrink, dual-expansion (high-performance)", source: "aus.sika.com TDS" },
        { label: "Compressive @28d", value: "CONFIRM (Sika AU TDS) — varies with consistency", source: "aus.sika.com TDS" },
        { label: "Flow / consistency", value: "Plastic / flowable / fluid (selectable)", source: "aus.sika.com TDS" },
        { label: "Max pour depth", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
        { label: "Expansion / shrinkage", value: "Dual expansion (non-shrink)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "20 kg", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapefill SP",
    shortType: "Non-shrink precision cementitious grout (≥70 MPa)",
    badges: [],
    appInfo: kp(["Cementitious non-shrink precision", "≥70 MPa (1d ≥25 / 7d ≥55)", "Super-flow / free-flow", "CONFIRM (Mapei AU TDS)", "Non-shrink (controlled expansion)", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "High strength — ≥70 MPa @28d (≥25 @1d, ≥55 @7d) for precision structural grouting",
      "Super-flow / free-flow placement into base plates, anchors and ducts",
      "Non-shrink with controlled expansion",
    ],
    avoidWhere: [
      "Rapid high-early reinstatement (use Mapefill HES)",
      "Where a deep-pour micro-concrete is needed (50–250 mm)",
    ],
    warnings: [
      "Mix water controls flow and strength — mix precisely to the TDS",
      "Confirm maximum pour depth and pack size against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapefill SP is a non-shrink, super-flow precision cementitious grout reaching ≥70 MPa @28d (≥25 @1d, ≥55 @7d), for column bases, machinery bases, anchors and post-tensioning ducts. CONFIRM the maximum pour depth and pack size against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious non-shrink precision", source: "mapei.com/au TDS" },
        { label: "Compressive @28d", value: "≥70 MPa (1d ≥25 / 7d ≥55)", source: "mapei.com/au TDS" },
        { label: "Flow / consistency", value: "Super-flow / free-flow", source: "mapei.com/au TDS" },
        { label: "Max pour depth", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
        { label: "Expansion / shrinkage", value: "Non-shrink (controlled expansion)", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapefill HES",
    shortType: "High early-strength non-shrink structural grout",
    badges: [],
    appInfo: kp(["Cementitious non-shrink (high-early)", "CONFIRM (Mapei AU TDS) — 25 MPa @2 h", "Free-flow", "CONFIRM (Mapei AU TDS)", "Non-shrink", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Rapid strength gain — ~25 MPa in 2 hours for fast return-to-service grouting",
      "Programme-critical base-plate / anchor reinstatement",
      "Non-shrink for full bearing contact",
    ],
    avoidWhere: [
      "Long working-time pours — it is high-early with a short window",
      "Where standard set is acceptable (use Mapefill SP)",
    ],
    warnings: [
      "High-early — mix only what can be placed in the short working time",
      "Confirm @28d strength, maximum pour depth and pack size against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapefill HES is a high early-strength, non-shrink cementitious structural grout developing ~25 MPa in 2 hours for rapid, programme-critical base-plate and anchor reinstatement. CONFIRM the @28d compressive strength, maximum pour depth and pack size against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Cementitious non-shrink (high early-strength)", source: "mapei.com/au TDS" },
        { label: "Compressive", value: "~25 MPa @2 h; @28d CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
        { label: "Flow / consistency", value: "Free-flow", source: "mapei.com/au TDS" },
        { label: "Max pour depth", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
        { label: "Expansion / shrinkage", value: "Non-shrink", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
];
