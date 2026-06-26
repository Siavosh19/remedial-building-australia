// ──────────────────────────────────────────────────────────────────────────────
// Rigid Epoxy Crack-Injection Resins — hand-authored cards (concrete cracking).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated.
// Key discriminators: viscosity, injectable crack width, moisture tolerance,
// and pot-life/temperature grade.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Viscosity", "Crack width", "Substrate moisture", "Pot life / grade", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const INJECTION_EPOXY_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikadur-52 AU (Normal)",
    shortType: "Low-viscosity structural epoxy injection resin — moderate temperatures",
    badges: [],
    appInfo: kp(["2-part solvent-free epoxy", "Low — free-flowing, fast-curing", "0.2–5 mm", "Dry", "Normal grade (moderate ambient temp)", "3 kg kit"]),
    bestFor: [
      "Structural injection of dormant cracks 0.2–5 mm — restores monolithic load transfer",
      "Low-viscosity, free-flowing and fast-curing for productive injection at moderate temperatures",
    ],
    avoidWhere: [
      "Hot / tropical conditions — use the Long Pot-life (LP) grade",
      "Wet or actively-leaking cracks — use a flexible PU injection resin",
      "Active or moving cracks (rigid resin re-cracks)",
    ],
    warnings: [
      "Dry, dormant cracks only — seal both crack faces before injecting",
      "Confirm pot life for the ambient temperature; mix only what can be injected in time",
    ],
    advanced: {
      description:
        "Sika Sikadur-52 AU is a low-viscosity, free-flowing, fast-curing two-component solvent-free epoxy injection resin for structurally injecting dormant cracks 0.2–5 mm wide, restoring monolithic load transfer. The Normal grade suits moderate ambient temperatures; use Sikadur-52 LP for hot/tropical conditions. CONFIRM exact pot life and pack against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part solvent-free epoxy injection resin", source: "aus.sika.com TDS" },
        { label: "Viscosity", value: "Low — free-flowing, fast-curing", source: "aus.sika.com TDS" },
        { label: "Crack width", value: "0.2–5 mm", source: "aus.sika.com TDS" },
        { label: "Substrate moisture", value: "Dry", source: "aus.sika.com TDS" },
        { label: "Pot life / grade", value: "Normal (moderate temp); LP grade for hot climates", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "3 kg kit", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikadur-52 LP",
    shortType: "Long pot-life low-viscosity epoxy injection resin — hot climates",
    badges: [],
    appInfo: kp(["2-part solvent-free epoxy", "Low — free-flowing", "0.2–5 mm", "Dry", "Long pot-life (hot / tropical conditions)", "CONFIRM (Sika AU TDS)"]),
    bestFor: [
      "The Long Pot-life grade — extended working time for hot and tropical conditions or larger pours",
      "Same low-viscosity structural injection of dormant cracks 0.2–5 mm as the Normal grade",
    ],
    avoidWhere: [
      "Where fast turnaround at moderate temperature is wanted (use the Normal grade)",
      "Wet / actively-leaking or moving cracks",
    ],
    warnings: [
      "Dry, dormant cracks only — seal both faces before injecting",
      "Confirm pot life and pack size against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika Sikadur-52 LP is the long pot-life grade of the Sikadur-52 low-viscosity structural epoxy injection resin, formulated for hot and tropical conditions where the Normal grade cures too quickly. Same injectable crack width (0.2–5 mm) and structural function. CONFIRM exact pot life and pack against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part solvent-free epoxy injection resin", source: "aus.sika.com TDS" },
        { label: "Viscosity", value: "Low — free-flowing", source: "aus.sika.com TDS" },
        { label: "Crack width", value: "0.2–5 mm", source: "aus.sika.com TDS" },
        { label: "Substrate moisture", value: "Dry", source: "aus.sika.com TDS" },
        { label: "Pot life / grade", value: "Long pot-life (hot / tropical)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Epojet",
    shortType: "Superfluid two-component epoxy injection / anchoring resin",
    badges: [],
    appInfo: kp(["2-part superfluid epoxy", "Superfluid (low)", "Fine cracks (dormant)", "Dry", "CONFIRM (Mapei AU TDS)", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Superfluid epoxy for monolithic restoration of cracked load-bearing structures",
      "Dual-purpose — crack injection and anchoring",
    ],
    avoidWhere: [
      "Damp / microcracks — use the moisture-tolerant Epojet LV",
      "Wet / actively-leaking or moving cracks",
    ],
    warnings: [
      "Dry, dormant cracks only — seal both faces before injecting",
      "Confirm pot life and pack against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Epojet is a superfluid two-component epoxy resin for crack injection and anchoring, for the monolithic restoration of cracked load-bearing structures on dry, dormant cracks. For damp substrates or microcracks use the moisture-tolerant Epojet LV. CONFIRM pot life and pack against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part superfluid epoxy (injection + anchoring)", source: "mapei.com/au TDS" },
        { label: "Viscosity", value: "Superfluid (low)", source: "mapei.com/au TDS" },
        { label: "Crack width", value: "Fine cracks (dormant)", source: "mapei.com/au TDS" },
        { label: "Substrate moisture", value: "Dry", source: "mapei.com/au TDS" },
        { label: "Pot life / grade", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Epojet LV",
    shortType: "Very-low-viscosity moisture-tolerant epoxy injection resin (microcracks)",
    badges: [],
    appInfo: kp(["2-part 100%-solids epoxy", "Very low viscosity", "Hairline / microcracks", "Dry or damp (moisture-tolerant)", "~35 min @23 °C", "2.5 kg kit"]),
    bestFor: [
      "Very-low-viscosity — deeply penetrates and seals hairline / microcracks others can't enter",
      "Moisture-tolerant — injects dry AND damp non-dynamic cracks",
      "100%-solids structural epoxy",
    ],
    avoidWhere: [
      "Wider cracks where a standard low-viscosity resin is sufficient",
      "Dynamic / moving cracks — it is for non-dynamic cracks",
    ],
    warnings: [
      "Pot life ~35 min @23 °C — mix only what can be injected in time",
      "Non-dynamic cracks only — seal both faces before injecting",
    ],
    advanced: {
      description:
        "Mapei Epojet LV is a moisture-tolerant, two-component, 100%-solids, very-low-viscosity epoxy injection resin that deeply penetrates and seals dry and damp hairline, non-dynamic cracks (microcracks), with a ~35 min pot life at 23 °C, supplied in 2.5 kg kits.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part 100%-solids epoxy injection resin", source: "mapei.com/au TDS" },
        { label: "Viscosity", value: "Very low", source: "mapei.com/au TDS" },
        { label: "Crack width", value: "Hairline / microcracks", source: "mapei.com/au TDS" },
        { label: "Substrate moisture", value: "Dry or damp (moisture-tolerant)", source: "mapei.com/au TDS" },
        { label: "Pot life / grade", value: "~35 min @23 °C", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "2.5 kg kit", source: "mapei.com/au TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitofill LV",
    shortType: "Low-viscosity epoxy crack-injection system (0.3–9 mm)",
    badges: [],
    appInfo: kp(["2-part epoxy injection system", "Low viscosity", "0.3–9 mm", "Dry", "CONFIRM (Parchem TDS)", "Dual cartridge or 15 L"]),
    bestFor: [
      "Widest injectable range here — cracks 0.3 to 9 mm in concrete and masonry",
      "High-strength consolidation, or excluding water/air from the reinforcement",
      "Dual-cartridge (gun) or 15 L bulk packs",
    ],
    avoidWhere: [
      "Where the crack can't be surface-sealed both sides (resin will drain out)",
      "Wet / actively-leaking or moving cracks",
    ],
    warnings: [
      "Seal both crack faces before injecting to prevent resin drainage",
      "Confirm pot life and exact pack against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitofill LV is a high-strength, low-viscosity two-part epoxy crack-injection system for injecting cracks 0.3–9 mm wide in concrete and masonry — to consolidate the structure or exclude water and air from the reinforcement. Supplied in dual-cartridge or 15 L packs; both crack faces must be sealed to prevent drainage. CONFIRM pot life against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part epoxy injection system", source: "fosroc.com.au TDS" },
        { label: "Viscosity", value: "Low viscosity", source: "fosroc.com.au TDS" },
        { label: "Crack width", value: "0.3–9 mm", source: "fosroc.com.au TDS" },
        { label: "Substrate moisture", value: "Dry", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "Dual cartridge or 15 L", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex RA 142 / RA 144",
    shortType: "Low-viscosity epoxy crack-injection resins",
    badges: [],
    appInfo: kp(["2-part epoxy injection resin", "Low viscosity", "CONFIRM (Ardex AU TDS)", "Dry", "RA 142 / RA 144 grades — CONFIRM difference", "CONFIRM (Ardex AU TDS)"]),
    bestFor: [
      "Ardex two-part epoxy injection resins for structural crack repair",
      "Two grades (RA 142 / RA 144) for different viscosity / temperature — confirm selection",
    ],
    avoidWhere: [
      "Wet / actively-leaking or moving cracks",
      "Without confirming the grade selection for the crack width and temperature",
    ],
    warnings: [
      "Dry, dormant cracks only — seal both faces before injecting",
      "Confirm the RA 142 vs RA 144 difference, crack-width range, pot life and pack against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex RA 142 / RA 144 are low-viscosity two-component epoxy crack-injection resins for structural repair of dormant cracks. CONFIRM the difference between the RA 142 and RA 144 grades (viscosity / temperature / crack width), pot life and pack against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "2-part epoxy injection resin", source: "ardexaustralia.com TDS" },
        { label: "Viscosity", value: "Low viscosity", source: "ardexaustralia.com TDS" },
        { label: "Grades", value: "RA 142 / RA 144 — CONFIRM difference", source: "ardexaustralia.com TDS" },
        { label: "Substrate moisture", value: "Dry", source: "ardexaustralia.com TDS" },
        { label: "Crack width / pack", value: "CONFIRM (Ardex AU TDS)", source: "ardexaustralia.com TDS" },
      ],
    },
  },
];
