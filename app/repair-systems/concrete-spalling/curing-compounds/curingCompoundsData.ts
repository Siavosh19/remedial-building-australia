// ──────────────────────────────────────────────────────────────────────────────
// Curing Compounds — hand-authored selection cards (concrete spalling).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source. All membrane curing compounds are bond breakers and
// must be removed before overcoating — carried in Cautions/Key warnings.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type / binder", "Standard", "Remove before overcoat?", "Visual coverage aid", "Coverage", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const CURING_COMPOUND_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika Antisol-15 SF",
    shortType: "Water-based liquid acrylic membrane curing compound",
    badges: [],
    appInfo: kp(["Water-based acrylic resin", "AS 3600 (7-day cure)", "Yes — bond breaker", "No", "CONFIRM (Sika AU TDS)", "CONFIRM (Sika AU TDS)"]),
    bestFor: [
      "Liquid acrylic membrane — sprays, brushes or rolls onto fresh repair mortar to retain cure water",
      "Solvent-free, low-odour — suited to occupied/enclosed work",
    ],
    avoidWhere: [
      "On surfaces to be overcoated/tiled without full removal — it is a bond breaker",
      "Where a permanent (non-removable) cure film is wanted",
    ],
    warnings: [
      "Acts as a bond breaker — must be removed (abrade/blast) before any coating, topping or adhesive",
      "Confirm coverage rate and pack size against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika Antisol-15 SF is a water-based liquid acrylic membrane curing compound sprayed/brushed/rolled onto fresh concrete or repair mortar to retard moisture loss during curing. As a membrane it must be removed before overcoating. CONFIRM coverage rate and pack size against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type / binder", value: "Water-based acrylic resin", source: "aus.sika.com TDS" },
        { label: "Standard", value: "AS 3600 (7-day cure)", source: "aus.sika.com TDS" },
        { label: "Remove before overcoat?", value: "Yes — bond breaker", source: "aus.sika.com TDS" },
        { label: "Coverage", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Concure WB30",
    shortType: "Water-based wax-emulsion curing compound (AS 3799)",
    badges: [],
    appInfo: kp(["Water-based wax emulsion", "AS 3799", "Yes — bond breaker", "Yes — white on, dries clear", "CONFIRM (Parchem TDS)", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Wax-emulsion membrane conforming to AS 3799 — non-flammable, sprays onto fresh concrete",
      "White on application, dries clear — gives a visual check of full coverage on large areas",
    ],
    avoidWhere: [
      "On surfaces to receive coatings, toppings or adhesives without full removal — wax is a bond breaker",
      "Where an acrylic (vs wax) film is specified",
    ],
    warnings: [
      "Wax film is a bond breaker — must be removed before overcoating",
      "Confirm coverage rate and pack size against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Concure WB30 is a water-based wax-emulsion curing compound conforming to AS 3799, spray-applied to fresh concrete and repair mortar to retard moisture loss. It is white on application and dries clear, allowing a visual coverage check. Non-flammable. CONFIRM coverage rate and pack size against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Type / binder", value: "Water-based wax emulsion", source: "fosroc.com.au TDS" },
        { label: "Standard", value: "AS 3799", source: "fosroc.com.au TDS" },
        { label: "Remove before overcoat?", value: "Yes — bond breaker", source: "fosroc.com.au TDS" },
        { label: "Visual coverage aid", value: "White on application, dries clear", source: "fosroc.com.au TDS" },
        { label: "Coverage", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Tremco",
    rangeName: "Tremco Evencure AC",
    shortType: "Water-based acrylic membrane curing compound",
    badges: [],
    appInfo: kp(["Water-based acrylic", "AS 3799 — CONFIRM", "Yes — bond breaker", "No", "CONFIRM (Tremco TDS)", "CONFIRM (Tremco TDS)"]),
    bestFor: [
      "Water-based acrylic membrane — spray-applied to fresh concrete/mortar to retard moisture loss",
      "Low-odour acrylic for occupied/enclosed work",
    ],
    avoidWhere: [
      "On surfaces to be coated/topped without full removal — bond breaker",
      "Where a specific AS 3799 certificate is required without confirmation",
    ],
    warnings: [
      "Acts as a bond breaker — remove before overcoating",
      "Confirm AS 3799 compliance, coverage and pack size against the current Tremco (CPG) AU TDS",
    ],
    advanced: {
      description:
        "Tremco Evencure AC is a water-based acrylic membrane-forming curing compound spray-applied to fresh concrete and repair mortar to retard moisture loss during curing. CONFIRM AS 3799 compliance, coverage and pack size against the current Tremco CPG Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type / binder", value: "Water-based acrylic", source: "tremco.com.au TDS" },
        { label: "Standard", value: "AS 3799 — CONFIRM", source: "tremco.com.au TDS" },
        { label: "Remove before overcoat?", value: "Yes — bond breaker", source: "tremco.com.au TDS" },
        { label: "Coverage", value: "CONFIRM (Tremco TDS)", source: "tremco.com.au TDS" },
        { label: "Pack size", value: "CONFIRM (Tremco TDS)", source: "tremco.com.au TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Antisol AC",
    shortType: "Water-based resin membrane curing compound (AS 3799)",
    badges: [],
    appInfo: kp(["Water-based resin (acrylic)", "AS 3799 — confirm AU TDS", "Yes — bond breaker", "No", "CONFIRM (Sika AU TDS)", "CONFIRM (Sika AU TDS)"]),
    bestFor: [
      "Water-based resin membrane — the AS 3799 grade alongside Antisol-15 SF",
      "Solvent-free, low-odour spray-applied curing",
    ],
    avoidWhere: [
      "On surfaces receiving coatings/toppings without full removal — bond breaker",
      "Where a permanent cure film is wanted",
    ],
    warnings: [
      "Acts as a bond breaker — remove before overcoating",
      "Confirm AS 3799 compliance, coverage and pack size against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "Sika Antisol AC is a water-based resin membrane-forming curing compound (AS 3799 grade) for fresh concrete and repair mortar, applied alongside / as an alternative to Antisol-15 SF. As a membrane it must be removed before overcoating. CONFIRM coverage rate and pack size against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type / binder", value: "Water-based resin (acrylic)", source: "aus.sika.com TDS" },
        { label: "Standard", value: "AS 3799 — confirm AU TDS", source: "aus.sika.com TDS" },
        { label: "Remove before overcoat?", value: "Yes — bond breaker", source: "aus.sika.com TDS" },
        { label: "Coverage", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapecure E 30",
    shortType: "Water-based concrete curing compound",
    badges: [],
    appInfo: kp(["Water-based (resin)", "CONFIRM (Mapei AU TDS)", "Yes — bond breaker", "No", "CONFIRM (Mapei AU TDS)", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Mapei's current AU water-based curing compound — spray-applied to retard surface moisture loss",
      "Reduces plastic-shrinkage cracking and surface dusting on slabs/decks",
    ],
    avoidWhere: [
      "On surfaces to be coated/topped without full removal — bond breaker",
      "Where a specific standard certificate is required without confirmation",
    ],
    warnings: [
      "Acts as a bond breaker — remove before overcoating",
      "Confirm the curing standard, coverage and pack size against the current Mapei Australia TDS",
    ],
    advanced: {
      description:
        "Mapei Mapecure E 30 is the current Mapei Australia water-based curing compound, spray-applied to fresh concrete and repair mortar to retard rapid water loss, reducing plastic-shrinkage cracking and surface dusting. As a membrane it must be removed before overcoating. CONFIRM the curing standard, coverage and pack size against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type / binder", value: "Water-based (resin)", source: "mapei.com/au TDS" },
        { label: "Standard", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
        { label: "Remove before overcoat?", value: "Yes — bond breaker", source: "mapei.com/au TDS" },
        { label: "Coverage", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
        { label: "Pack size", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
];
