// ──────────────────────────────────────────────────────────────────────────────
// Moisture-suppression primers — PILOT for the revised design-criteria approach.
// Each product's Advanced Technical Data is a TABLE of the REVISED design-criteria
// parameters (the discriminating selection variables, per the Concrete & Structural
// sheet) → that product's actual value. No design-criteria note. Values are taken
// from the page's existing research; "N/A" = not confirmed on the sourced TDS
// (these are the cells worth TDS-verifying next). Machine-readable for the selector.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

// Revised design-criteria parameters for "moisture-suppression primers"
// (Concrete & Structural sheet): chemistry is the stage-1 discriminator; the rest
// are the stage-2 variables that differ between the equivalent products.
const NOTE = ""; // design-criteria note intentionally omitted — the table replaces it

export const MS_CARDS: RefCard[] = [
  {
    brand: "Ardex Australia",
    rangeName: "Ardex MC Rapid",
    shortType: "Two-part epoxy moisture-control primer",
    badges: [
      { label: "2-part epoxy", tone: "navy" },
      { label: "Moisture-suppressing", tone: "blue" },
      { label: "Single coat", tone: "slate" },
    ],
    bestFor: [
      "High-RH slabs over encapsulated magnesite",
      "Single-coat moisture barrier before self-levelling",
      "Rapid overcoat — SLC from ~4 h",
    ],
    avoidWhere: [
      "Active water ingress / running water / efflorescence",
      "Substrate below CSP 2 or contaminated",
      "Without in-situ RH / CaCl₂ moisture testing first",
    ],
    appInfo: [
      { label: "Chemistry", value: "2-part epoxy (moisture-suppressing)" },
      { label: "Max RH rated over", value: "N/A" },
      { label: "Coverage", value: "N/A" },
      { label: "Pack size", value: "N/A" },
    ],
    warnings: ["Confirm AU TDS", "CSP 2 min", "Moisture test first"],
    advanced: {
      description:
        "Ardex MC Rapid is a two-part epoxy moisture-control primer for elevated-RH substrates such as encapsulated magnesite — a single low-viscosity coat forms a moisture barrier so self-levelling underlayments bond without osmotic blistering.",
      designCriteria: NOTE,
      techData: [
        { label: "Chemistry", value: "2-part epoxy — moisture-suppressing" },
        { label: "Max substrate RH rated over", value: "N/A" },
        { label: "Number of coats", value: "1" },
        { label: "Pot life", value: "N/A" },
        { label: "Overcoat window before SLC", value: "≥ 4 h" },
        { label: "Coverage", value: "N/A" },
        { label: "Pack size", value: "N/A" },
        { label: "Compliance", value: "ASTM F2170 moisture-test protocol" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Primer MB",
    shortType: "Two-part epoxy moisture-suppressing floor primer",
    badges: [
      { label: "2-part epoxy", tone: "navy" },
      { label: "Moisture-suppressing", tone: "blue" },
      { label: "≤ 6% CM", tone: "slate" },
    ],
    bestFor: [
      "Moisture-vapour suppression before self-levelling",
      "Solvent-free — occupied buildings",
      "Substrates up to ~6% CM moisture content",
    ],
    avoidWhere: [
      "Actively damp substrates with free water",
      "As a standalone adhesive / bonding agent",
      "Over laitance / adhesive residue (remove first)",
    ],
    appInfo: [
      { label: "Chemistry", value: "2-part epoxy (moisture-suppressing)" },
      { label: "Max moisture", value: "≤ 6% CM (~9% Tramex)" },
      { label: "Coverage", value: "~10–15 m² / 4 kg" },
      { label: "Pack size", value: "4 kg kit" },
    ],
    warnings: ["RH % N/A — confirm TDS", "Roll out — no pooling", "Not a bonding agent"],
    advanced: {
      description:
        "Sika Primer MB is a two-component solvent-free epoxy primer that suppresses moisture-vapour transmission from problematic substrates including over magnesite floors, so self-levelling compounds bond without osmotic blistering.",
      designCriteria: NOTE,
      techData: [
        { label: "Chemistry", value: "2-part solvent-free epoxy — moisture-suppressing" },
        { label: "Max substrate moisture", value: "≤ 6% CM (~9% Tramex); RH % N/A" },
        { label: "Number of coats", value: "1" },
        { label: "Pot life", value: "N/A" },
        { label: "Overcoat window before SLC", value: "~24 h @ 20°C" },
        { label: "Coverage", value: "~10–15 m² / 4 kg kit" },
        { label: "Pack size", value: "4 kg kit (3 kg A + 1 kg B)" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapeproof Primer",
    shortType: "Two-part epoxy moisture barrier / DPM primer",
    badges: [
      { label: "2-part epoxy", tone: "navy" },
      { label: "Moisture barrier / DPM", tone: "blue" },
      { label: "High-RH substrates", tone: "slate" },
    ],
    bestFor: [
      "Moisture-vapour suppression over high-RH or encapsulated magnesite before levelling",
      "Forming a DPM where residual substrate moisture is elevated",
      "Priming before Mapei self-levelling underlayments",
    ],
    avoidWhere: [
      "Active free water or running water (address the source first)",
      "Substrate below the required surface profile or contaminated",
      "Without in-situ RH / moisture testing first",
    ],
    appInfo: [
      { label: "Chemistry", value: "2-part epoxy — moisture barrier / DPM" },
      { label: "Max substrate RH rated over", value: "High-RH — TODO confirm from current AU TDS" },
      { label: "Coverage", value: "TODO — confirm from current AU TDS" },
      { label: "Pack size", value: "TODO — confirm from current AU TDS" },
    ],
    warnings: ["Moisture test first", "TODO: confirm RH limit and coverage from current Mapei AU TDS"],
    advanced: {
      description:
        "Mapei Mapeproof Primer is a two-part epoxy moisture-vapour barrier / DPM primer for high-RH and encapsulated magnesite floor substrates, applied before self-levelling underlayments so they bond without osmotic blistering. TODO: confirm the maximum substrate RH rated over, number of coats, coverage and pack size from the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-part epoxy — moisture barrier / DPM" },
        { label: "Max substrate RH rated over", value: "High-RH — TODO confirm" },
        { label: "Number of coats", value: "TODO — confirm" },
        { label: "Coverage", value: "TODO — confirm" },
        { label: "Pack size", value: "TODO — confirm" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Triblock P",
    shortType: "Three-component epoxy-cementitious moisture / DPM primer",
    badges: [
      { label: "3-component", tone: "navy" },
      { label: "Epoxy-cementitious DPM", tone: "blue" },
      { label: "Damp substrates", tone: "slate" },
    ],
    bestFor: [
      "Moisture-tolerant priming of damp and high-RH floor substrates",
      "DPM / moisture control over encapsulated magnesite before levelling",
      "Priming before Mapei self-levelling underlayments",
    ],
    avoidWhere: [
      "Active free water or running water (address the source first)",
      "Contaminated or unsound substrates",
      "Without in-situ RH / moisture testing first",
    ],
    appInfo: [
      { label: "Chemistry", value: "3-component epoxy-cementitious — moisture / DPM" },
      { label: "Max substrate RH rated over", value: "High-RH — TODO confirm from current AU TDS" },
      { label: "Coverage", value: "TODO — confirm from current AU TDS" },
      { label: "Pack size", value: "TODO — confirm from current AU TDS" },
    ],
    warnings: ["Moisture test first", "TODO: confirm RH limit and coverage from current Mapei AU TDS"],
    advanced: {
      description:
        "Mapei Triblock P is a three-component epoxy-cementitious moisture-tolerant primer / DPM for damp and high-RH floor substrates such as encapsulated magnesite, applied before self-levelling underlayments. TODO: confirm the maximum substrate RH rated over, number of coats, coverage and pack size from the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "3-component epoxy-cementitious — moisture / DPM" },
        { label: "Max substrate RH rated over", value: "High-RH — TODO confirm" },
        { label: "Number of coats", value: "TODO — confirm" },
        { label: "Coverage", value: "TODO — confirm" },
        { label: "Pack size", value: "TODO — confirm" },
      ],
    },
  },
  {
    brand: "Ardex Australia",
    rangeName: "Ardex WPM 300",
    shortType: "Two-part epoxy moisture vapour barrier",
    badges: [
      { label: "2-part epoxy", tone: "navy" },
      { label: "Moisture vapour barrier", tone: "blue" },
      { label: "High-RH substrates", tone: "slate" },
    ],
    bestFor: [
      "Controlling residual substrate moisture before applying levelling compounds",
      "Moisture-vapour barrier over high-RH or encapsulated magnesite",
      "Priming before Ardex self-levelling and smoothing compounds",
    ],
    avoidWhere: [
      "Active free water or running water (address the source first)",
      "Substrate below the required surface profile or contaminated",
      "Without in-situ RH / moisture testing first",
    ],
    appInfo: [
      { label: "Chemistry", value: "2-part epoxy — moisture vapour barrier" },
      { label: "Max substrate RH rated over", value: "High-RH — TODO confirm from current AU TDS" },
      { label: "Coverage", value: "TODO — confirm from current AU TDS" },
      { label: "Pack size", value: "TODO — confirm from current AU TDS" },
    ],
    warnings: ["Moisture test first", "TODO: confirm RH limit and coverage from current Ardex AU TDS"],
    advanced: {
      description:
        "Ardex WPM 300 is a two-part epoxy moisture-vapour barrier for controlling residual substrate moisture on high-RH and encapsulated magnesite floors before levelling compounds are applied. TODO: confirm the maximum substrate RH rated over, number of coats, coverage and pack size from the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "2-part epoxy — moisture vapour barrier" },
        { label: "Max substrate RH rated over", value: "High-RH — TODO confirm" },
        { label: "Number of coats", value: "TODO — confirm" },
        { label: "Coverage", value: "TODO — confirm" },
        { label: "Pack size", value: "TODO — confirm" },
      ],
    },
  }

];
