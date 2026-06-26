// ──────────────────────────────────────────────────────────────────────────────
// Concrete crack stitching — hand-authored selection cards (concrete cracking).
// Crack stitching re-establishes tensile continuity across a DORMANT, structural
// crack with proprietary carbon-fibre stitches or custom-fabricated stainless
// staples/dowels bonded with a structural epoxy anchoring adhesive. There is NO
// crack-width → size lookup: stitch size, number, spacing and embedment are
// ENGINEER-DETERMINED to ACI 224.1R / AS 3600. Unverified values are flagged
// "CONFIRM against current manufacturer TDS" — never fabricated.
//
// appInfo deliberately carries the comparison columns the page renders:
//   Type · Material · Sizing basis · Bonding medium · Standard
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Material", "Sizing basis", "Bonding medium", "Standard"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const CRACK_STITCH_CARDS: RefCard[] = [
  {
    brand: "Ardex Australia (Rhino)",
    rangeName: "Ardex Concrete Crack Lock (CCL)",
    shortType: "Carbon-fibre crack-bridging stitch for concrete",
    badges: [],
    appInfo: kp([
      "Carbon-fibre crack-bridging stitch",
      "Carbon fibre",
      "Per manufacturer detail / engineer",
      "Structural epoxy — CONFIRM (Ardex AU TDS)",
      "ACI 224.1R / AS 3600",
    ]),
    bestFor: [
      "Re-knits a dormant crack across the crack plane with a carbon-fibre stitch — restoring tensile continuity",
      "Non-corroding carbon fibre — suited to repairs where a steel staple would be at risk of rusting",
      "Low-profile stitch — minimal surface intrusion compared with a fabricated steel dog",
    ],
    avoidWhere: [
      "Live / moving cracks — the cause of movement must be arrested first (engineer to confirm dormancy)",
      "Any structural case without an engineer's stitch design (size, number, spacing, embedment)",
      "Substrate preparation and embedment detail — CONFIRM against the current Ardex Australia TDS",
    ],
    warnings: [
      "Stitch spacing, number and embedment are engineer-determined to ACI 224.1R / AS 3600 — there is no crack-width → size lookup",
      "Confirm product detail, bonding adhesive and installation against the current Ardex Australia TDS",
    ],
    advanced: {
      description:
        "Ardex Concrete Crack Lock (CCL) is a carbon-fibre crack-bridging stitch used to re-establish tensile continuity across dormant cracks in concrete. The stitch is bedded into a prepared slot/route and bonded with a structural epoxy. It is a proprietary stitch system — stitch spacing and number follow the manufacturer detail within an engineer's design; all structural cases must be designed to ACI 224.1R / AS 3600. CONFIRM the bonding adhesive, slot detail and installation method against the current Ardex Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Carbon-fibre crack-bridging stitch", source: "Ardex Australia TDS — CONFIRM" },
        { label: "Material", value: "Carbon fibre", source: "Ardex Australia TDS — CONFIRM" },
        { label: "Sizing basis", value: "Per manufacturer detail within engineer design", source: "ACI 224.1R / AS 3600" },
        { label: "Bonding medium", value: "Structural epoxy — CONFIRM", source: "Ardex Australia TDS — CONFIRM" },
        { label: "Standard", value: "ACI 224.1R / AS 3600", source: "ACI 224.1R / AS 3600" },
      ],
    },
  },
  {
    brand: "Fortress (imported)",
    rangeName: "Fortress Crack Stitch / StitchDog",
    shortType: "Carbon-fibre crack stitch (imported)",
    badges: [{ label: "Confirm AU availability", tone: "navy" }],
    appInfo: kp([
      "Carbon-fibre crack stitch",
      "Carbon fibre",
      "Per manufacturer detail / engineer",
      "Structural epoxy — CONFIRM (manufacturer TDS)",
      "ACI 224.1R / AS 3600",
    ]),
    bestFor: [
      "Carbon-fibre stitch for bridging dormant cracks where a non-corroding stitch is preferred",
      "Pre-formed stitch profile — installed into a routed slot and bonded with structural epoxy",
    ],
    avoidWhere: [
      "Confirm Australian availability and the current TDS before specifying — imported system",
      "Live / moving cracks, and any structural case without an engineer's stitch design",
    ],
    warnings: [
      "Confirm AU availability and TDS — imported product",
      "Stitch size, number, spacing and embedment are engineer-determined to ACI 224.1R / AS 3600",
    ],
    advanced: {
      description:
        "Fortress Crack Stitch / StitchDog is an imported carbon-fibre crack-stitching system for re-establishing tensile continuity across dormant cracks. The stitch is bonded into a prepared slot with a structural epoxy. Confirm current Australian availability and all installation and performance detail against the manufacturer TDS. All structural stitching must be designed to ACI 224.1R / AS 3600.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Carbon-fibre crack stitch", source: "Manufacturer TDS — CONFIRM" },
        { label: "Material", value: "Carbon fibre", source: "Manufacturer TDS — CONFIRM" },
        { label: "Sizing basis", value: "Per manufacturer detail within engineer design", source: "ACI 224.1R / AS 3600" },
        { label: "Bonding medium", value: "Structural epoxy — CONFIRM", source: "Manufacturer TDS — CONFIRM" },
        { label: "Standard", value: "ACI 224.1R / AS 3600", source: "ACI 224.1R / AS 3600" },
      ],
    },
  },
  {
    brand: "Custom-fabricated (no proprietary brand)",
    rangeName: "Steel stitching dog / dowel (custom-fabricated)",
    shortType: "Austenitic stainless staple / dowel — fabricated to the engineer's detail",
    badges: [],
    appInfo: kp([
      "Stitching staple / dowel (fabricated)",
      "Austenitic stainless steel (304 / 316)",
      "Engineer-specified",
      "Structural epoxy anchoring adhesive",
      "ACI 224.1R / AS 3600",
    ]),
    bestFor: [
      "Fully engineer-detailed — staple / dowel size, number, spacing and embedment set by the structural design",
      "Austenitic stainless (304 / 316) resists corrosion in the crack zone",
      "Bonded with a structural epoxy anchoring adhesive (see the Epoxy anchoring adhesives page)",
    ],
    avoidWhere: [
      "Any size taken from a generic table — size, number, spacing and embedment are SUBJECT TO ENGINEER SPECIFICATION (ACI 224.1R / AS 3600)",
      "Live / moving cracks where the movement has not first been arrested",
      "Plain carbon steel in exposed or chloride environments — use austenitic stainless (304 / 316)",
    ],
    warnings: [
      "No size table — all stitch dimensions are engineer-specified to ACI 224.1R / AS 3600",
      "Bond with a structural epoxy anchoring adhesive per that adhesive's TDS and the engineer's embedment detail",
    ],
    advanced: {
      description:
        "A custom-fabricated steel stitching dog or dowel is an austenitic stainless (304 / 316) staple or dowel fabricated to the engineer's detail and bonded across a dormant crack with a structural epoxy anchoring adhesive to re-establish tensile continuity. There is no proprietary product and no size table — staple/dowel size, number, spacing and embedment are subject to engineer specification to ACI 224.1R / AS 3600. The bonding adhesive is selected and installed per its own TDS (see the Epoxy anchoring adhesives page).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Stitching staple / dowel (fabricated)", source: "Engineer detail" },
        { label: "Material", value: "Austenitic stainless steel (304 / 316)", source: "Engineer detail" },
        { label: "Sizing basis", value: "Engineer-specified", source: "ACI 224.1R / AS 3600" },
        { label: "Bonding medium", value: "Structural epoxy anchoring adhesive", source: "Adhesive TDS — see Epoxy anchoring adhesives" },
        { label: "Standard", value: "ACI 224.1R / AS 3600", source: "ACI 224.1R / AS 3600" },
      ],
    },
  },
];
