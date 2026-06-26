// ──────────────────────────────────────────────────────────────────────────────
// Epoxy Repair Mortars — hand-authored selection cards (concrete spalling).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source. Nitomortar S removed — not listed on fosroc.com.au
// (the AU Nitomortar range is 903 / AP / 908 / EL-HB).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Form", "Compressive", "Non-sag V/OH", "Pot life / cure", "Substrate moisture", "Pack / cartridge"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const EPOXY_MORTAR_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sikadur-41 CF Normal",
    shortType: "Three-part thixotropic structural epoxy repair mortar",
    badges: [],
    appInfo: kp(["3-part epoxy mortar", "~70 MPa (7d @23 °C)", "Yes (thixotropic)", "~30 min pot life @23 °C", "Dry", "Pre-proportioned kit"]),
    bestFor: [
      "Thixotropic, non-sag — formulated for vertical and overhead patch repair without aggregate batching",
      "High structural strength — ~70 MPa (7d @23 °C)",
      "Pre-proportioned 3-part kit — consistent on-site mix",
    ],
    avoidWhere: [
      "Dry substrate only — not for damp or wet concrete",
      "Place within the ~30 min pot life at 23 °C — shorter when warmer",
      "Not for large-area or deep cementitious reinstatement (use a cementitious/micro-concrete mortar)",
    ],
    warnings: [
      "Three-part epoxy — mix complete pre-proportioned units; respect the pot life",
      "Confirm VOC / ventilation suitability for enclosed or occupied spaces against the TDS",
    ],
    advanced: {
      description:
        "Sikadur-41 CF Normal is a three-part, solvent-free, thixotropic structural epoxy repair mortar (~70 MPa at 7 days @23 °C) for non-sag patch repair on vertical and overhead surfaces. Supplied as a pre-proportioned kit with ~30 min pot life at 23 °C; applied to a dry, prepared substrate.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "3-part epoxy mortar (thixotropic)", source: "aus.sika.com TDS (Nov 2023)" },
        { label: "Compressive", value: "~70 MPa (7d @23 °C)", source: "aus.sika.com TDS (Nov 2023)" },
        { label: "Non-sag V/OH", value: "Yes (thixotropic)", source: "aus.sika.com TDS (Nov 2023)" },
        { label: "Pot life", value: "~30 min @23 °C", source: "aus.sika.com TDS (Nov 2023)" },
        { label: "Substrate moisture", value: "Dry", source: "aus.sika.com TDS (Nov 2023)" },
        { label: "Pack / cartridge", value: "Pre-proportioned kit", source: "aus.sika.com TDS (Nov 2023)" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitomortar 903",
    shortType: "Solvent-free epoxy binder + fillers — high-strength epoxy mortar/screed",
    badges: [],
    appInfo: kp(["3-component (binder + filler + aggregate)", "Up to 90 MPa (mix-dependent)", "CONFIRM (consistency-dependent)", "CONFIRM (Parchem TDS)", "Dry", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Highest strength in this group — up to 90 MPa depending on the mix consistency",
      "Versatile — one solvent-free epoxy binder system produces mortars or screeds at various consistencies",
    ],
    avoidWhere: [
      "Strength and non-sag depend on the chosen filler / aggregate mix — confirm the mix design for the duty",
      "Dry substrate only — not for damp or wet concrete",
      "Not where a ready-graded paste is preferred (use Nitomortar AP)",
    ],
    warnings: [
      "Multi-component — batch the binder + filler/aggregate to the TDS ratios for the target strength",
      "Confirm pot life and pack sizes against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitomortar 903 is a solvent-free epoxy resin binder system combined with selected fillers and aggregates to produce epoxy mortars / screeds of various consistencies, achieving up to 90 MPa compressive strength depending on the mix. Applied to a dry, prepared substrate. CONFIRM pot life, non-sag capability and pack sizes against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "3-component epoxy binder + filler + aggregate", source: "fosroc.com.au TDS" },
        { label: "Compressive", value: "Up to 90 MPa (mix-dependent)", source: "fosroc.com.au TDS" },
        { label: "Non-sag V/OH", value: "CONFIRM (consistency-dependent)", source: "fosroc.com.au TDS" },
        { label: "Pot life", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
        { label: "Substrate moisture", value: "Dry", source: "fosroc.com.au TDS" },
        { label: "Pack / cartridge", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitomortar AP",
    shortType: "Two-component epoxy paste — patching, bonding and anchoring",
    badges: [],
    appInfo: kp(["2-component epoxy paste", "69 MPa @28d", "Yes (paste)", "30–60 min pot life", "Dry", "CONFIRM (Parchem TDS)"]),
    bestFor: [
      "Ready-graded epoxy paste — defined 69 MPa @28d with no aggregate batching",
      "Multi-use — patching, bonding precast components, setting starter bars / dowels and general anchoring",
      "Impermeable to water and resistant to aggressive chemicals",
    ],
    avoidWhere: [
      "Dry substrate only — not for damp or wet concrete",
      "Place within the 30–60 min pot life",
      "Not for large-area structural reinstatement (use a cementitious / micro-concrete mortar)",
    ],
    warnings: [
      "Two-part epoxy — mix complete units; respect the 30–60 min pot life",
      "Confirm pack / cartridge size against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitomortar AP is a two-component epoxy paste (69 MPa @28d, 30–60 min pot life) for patching repairs to concrete, bonding precast components, setting starter bars / dowels, general anchoring, and as the adhesive for the Nitofill LV crack-injection system — where strength, water impermeability and chemical resistance are essential. Applied to a dry, prepared substrate.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "2-component epoxy paste", source: "fosroc.com.au TDS" },
        { label: "Compressive", value: "69 MPa @28d", source: "fosroc.com.au TDS" },
        { label: "Non-sag V/OH", value: "Yes (paste)", source: "fosroc.com.au TDS" },
        { label: "Pot life", value: "30–60 min", source: "fosroc.com.au TDS" },
        { label: "Substrate moisture", value: "Dry", source: "fosroc.com.au TDS" },
        { label: "Pack / cartridge", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
];
