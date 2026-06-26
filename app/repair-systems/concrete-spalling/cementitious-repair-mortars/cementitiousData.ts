// ──────────────────────────────────────────────────────────────────────────────
// Cementitious repair mortars — TEMPLATE EXAMPLE for the consultant-funnel card.
// Identity → Key properties (identical labels across cards, compare straight down)
// → Best for (use-cases only) → Avoid where → Key warnings → Advanced data.
// Values: existing TDS-cited research + targeted web research; "N/A — sought" =
// looked for, not published. No invention, no supplier noise, complete sentences.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const PROPS = ["Set type", "EN 1504-3 class", "Compressive @28d", "Max build / pour", "Application form", "Pack size"];
const props = (vals: string[]) => PROPS.map((label, i) => ({ label, value: vals[i] }));

export const CEMENTITIOUS_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika MonoTop-412 NFG",
    shortType: "R4 fibre-reinforced structural repair mortar with corrosion inhibitor",
    badges: [],
    appInfo: props(["Normal-set", "R4", "≥45 MPa (R4 minimum) — tested value CONFIRM", "CONFIRM (Sika AU TDS)", "Trowel / hand-applied (fibre-reinforced + corrosion inhibitor)", "20 kg (~11 L mortar)"]),
    bestFor: [
      "EN 1504-3 R4 (≥45 MPa) with an integral corrosion inhibitor — structural patch and rebar protection in one mortar",
      "Low-shrinkage and fibre-reinforced — resists cracking on vertical and overhead patches",
      "20 kg bag yields ~11 L of mortar",
    ],
    avoidWhere: [
      "Not suited to deep-section pours — use a pourable micro-concrete for those",
      "Do not apply without the specified bonding primer (and rebar primer) on a properly prepared substrate",
    ],
    warnings: ["Apply with the specified bonding / rebar primer on a prepared SSD substrate", "EN 1504-3 R4 — confirm the maximum layer thickness and tested @28d strength on the current Sika Australia TDS"],
    advanced: {
      description:
        "Sika MonoTop-412 NFG is a one-component, polymer-modified, fibre-reinforced, low-shrinkage cementitious structural repair mortar (EN 1504-3 R4) with an integral corrosion inhibitor, for hand and trowel patch repair of spalled and cracked concrete on vertical and overhead surfaces. A 20 kg bag yields ~11 L of mortar. R4 implies a ≥45 MPa minimum; CONFIRM the tested @28d compressive strength and maximum layer thickness against the current Sika Australia TDS.",
      designCriteria: "",
      techData: props(["Normal-set", "R4 (EN 1504-3)", "≥45 MPa (R4 minimum) — tested value CONFIRM", "CONFIRM (Sika AU TDS)", "Trowel / hand-applied (fibre-reinforced + corrosion inhibitor)", "20 kg (~11 L mortar)"]),
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika MonoTop-352 NFG",
    shortType: "R3 fibre-reinforced lightweight hand-applied repair mortar",
    badges: [],
    appInfo: props(["Normal-set", "R3", "≥25 MPa (R3 minimum) — tested value CONFIRM", "CONFIRM (Sika AU TDS)", "Trowel / hand-applied (lightweight, fibre-reinforced + inhibitor)", "20 kg (~12.8 L mortar)"]),
    bestFor: [
      "Lightweight R3 fibre-reinforced — easier overhead and vertical placement than a standard-density mortar",
      "Integral corrosion inhibitor and low-shrinkage in a general-purpose patch mortar",
      "20 kg bag yields ~12.8 L of mortar",
    ],
    avoidWhere: [
      "Not where an R4 structural-grade mortar is required — use MonoTop-412 NFG instead",
      "Not suited to deep-section reinstatement — use a pourable micro-concrete for those",
    ],
    warnings: ["Apply with the specified bonding / rebar primer on a prepared SSD substrate", "EN 1504-3 R3 — confirm the maximum layer thickness and tested @28d strength on the current Sika Australia TDS"],
    advanced: {
      description:
        "Sika MonoTop-352 NFG is a one-component, polymer-modified, fibre-reinforced, lightweight low-shrinkage cementitious repair mortar (EN 1504-3 R3) with an integral corrosion inhibitor, for general hand and trowel patch repair on vertical and overhead surfaces. A 20 kg bag yields ~12.8 L of mortar. R3 implies a ≥25 MPa minimum; CONFIRM the tested @28d compressive strength and maximum layer thickness against the current Sika Australia TDS.",
      designCriteria: "",
      techData: props(["Normal-set", "R3 (EN 1504-3)", "≥25 MPa (R3 minimum) — tested value CONFIRM", "CONFIRM (Sika AU TDS)", "Trowel / hand-applied (lightweight, fibre-reinforced + inhibitor)", "20 kg (~12.8 L mortar)"]),
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapegrout T60",
    shortType: "R4 sulphate-resistant fibre-reinforced thixotropic repair mortar",
    badges: [],
    appInfo: props(["Normal-set", "R4", "≥45 MPa (R4 minimum) — tested value CONFIRM", "To 40 mm single coat (multi-coat for thicker)", "Trowel thixotropic (fibre-reinforced, sulphate-resistant)", "25 kg"]),
    bestFor: [
      "Sulphate-resistant R4 — suited to aggressive / sulphate-exposure where a standard R4 mortar is not",
      "Thixotropic and fibre-reinforced — placed to 40 mm in a single coat on vertical and overhead surfaces",
      "Higher structural grade (R4) than the R3 Mapegrout T40",
    ],
    avoidWhere: [
      "Not for thin cosmetic fairing — use a dedicated fairing coat for that",
      "Do not apply without the specified primer and a saturated-surface-dry (SSD) prepared substrate",
    ],
    warnings: ["EN 1504-3 R4 — confirm the tested @28d strength on the current Mapei Australia TDS", "Apply with the specified primer on an SSD substrate"],
    advanced: {
      description:
        "Mapei Mapegrout T60 is a one-component, sulphate-resistant, fibre-reinforced thixotropic cementitious structural repair mortar (EN 1504-3 R4) for hand-applied reinstatement on vertical and overhead surfaces, placed to 40 mm in a single coat (multi-coat for thicker builds), supplied in 25 kg bags. R4 implies a ≥45 MPa minimum; CONFIRM the tested @28d compressive strength against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: props(["Normal-set", "R4 (EN 1504-3, sulphate-resistant)", "≥45 MPa (R4 minimum) — tested value CONFIRM", "To 40 mm single coat (multi-coat for thicker)", "Trowel thixotropic (fibre-reinforced, sulphate-resistant)", "25 kg"]),
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapegrout T40",
    shortType: "R3 thixotropic fibre-reinforced cementitious repair mortar (40 MPa)",
    badges: [],
    appInfo: props(["Normal-set", "R3", "40 MPa @28d", "30–35 mm per coat", "Trowel thixotropic (fibre-reinforced)", "25 kg"]),
    bestFor: [
      "Hand-applied structural patch repair where an EN 1504-3 R3 mortar is specified",
      "Vertical and overhead repair of balconies, columns and beams up to 30–35 mm per coat",
      "Thixotropic, fibre-reinforced general-purpose reinstatement",
    ],
    avoidWhere: [
      "Not where an R4 structural-grade mortar is required — use Mapegrout T60 instead",
      "Do not place deeper than ~35 mm in a single pass — build up in successive coats",
    ],
    warnings: ["EN 1504-3 R3 — confirm primer/SSD from current Mapei AU TDS", "Build up in coats beyond 30–35 mm"],
    advanced: {
      description:
        "Mapei Mapegrout T40 is a thixotropic, fibre-reinforced cementitious repair mortar (EN 1504-3 R3, ~40 MPa) for hand-applied repair of vertical and overhead concrete up to 30–35 mm per coat, supplied in 25 kg bags. Confirm the primer/SSD requirement, exact layer limits and rebar-protection compatibility from the current Mapei Australia TDS.",
      designCriteria: "",
      techData: props(["Normal-set", "R3 (EN 1504-3)", "40 MPa @28d", "30–35 mm per coat", "Trowel thixotropic (fibre-reinforced)", "25 kg"]),
    },
  }


];
