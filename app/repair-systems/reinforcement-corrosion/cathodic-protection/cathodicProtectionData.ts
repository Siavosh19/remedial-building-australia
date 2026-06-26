// ──────────────────────────────────────────────────────────────────────────────
// Cathodic Protection — hand-authored selection cards (reinforcement corrosion).
// Discrete galvanic anodes are products; ICCP and galvanic-mesh are specialist-
// designed SYSTEM approaches (framed as such — not a single off-the-shelf product).
// Values from current AU sources; "CONFIRM …" = not stated on the cited source.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["CP type", "Power", "Anode / chemistry", "Primary use", "Design", "Format"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const CATHODIC_PROTECTION_CARDS: RefCard[] = [
  {
    brand: "Vector / Parchem",
    rangeName: "Vector Galvashield XP",
    shortType: "Embedded zinc galvanic discrete anode",
    badges: [],
    appInfo: kp(["Galvanic discrete anode", "No power (sacrificial)", "Embedded zinc", "Incipient-anode (ring/halo) control around patch repairs", "Anode spacing per CP design", "Discrete anode units (tie to rebar)"]),
    bestFor: [
      "No-power sacrificial protection — controls the incipient-anode (ring/halo) effect around concrete patch repairs",
      "Embedded zinc anode tied to the reinforcement within/around the repair — no monitoring power supply",
      "Compatible with low-resistivity repair mortars (e.g. Ardex BR 340)",
    ],
    avoidWhere: [
      "Full-area, high-chloride structures needing managed current — consider ICCP",
      "Without a corrosion engineer's anode spacing / CP design",
      "Embedded in high-resistivity (epoxy) repair mortars that isolate the bar",
    ],
    warnings: [
      "Anode type, number and spacing must follow a CP design — not a guess",
      "Tie securely to clean reinforcement and embed in low-resistivity mortar",
    ],
    advanced: {
      description:
        "Vector Galvashield XP is an embedded zinc galvanic (sacrificial) discrete anode tied to the reinforcement in and around a concrete patch repair to control the incipient-anode (ring/halo) corrosion that otherwise forms at the perimeter of a repair. No power supply is required. Anode number and spacing follow a corrosion engineer's CP design. CONFIRM current output and spacing tables against the current Vector / Parchem documentation.",
      designCriteria: "",
      techData: [
        { label: "CP type", value: "Galvanic discrete anode (sacrificial)", source: "vector / parchem.com.au" },
        { label: "Power", value: "No power required", source: "vector / parchem.com.au" },
        { label: "Anode", value: "Embedded zinc", source: "vector / parchem.com.au" },
        { label: "Primary use", value: "Incipient-anode (ring/halo) control around patch repairs", source: "vector / parchem.com.au" },
        { label: "Design", value: "Anode spacing per CP design", source: "vector / parchem.com.au" },
        { label: "Current output", value: "CONFIRM (Vector / Parchem)", source: "vector / parchem.com.au" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Vector Galvashield XP2",
    shortType: "Higher-output embedded zinc galvanic discrete anode",
    badges: [],
    appInfo: kp(["Galvanic discrete anode (higher output)", "No power (sacrificial)", "Embedded zinc (higher output)", "Higher-output incipient-anode control", "Anode spacing per CP design", "Discrete anode units (tie to rebar)"]),
    bestFor: [
      "Higher current output than Galvashield XP — for more aggressive chloride exposure or wider anode spacing",
      "No-power sacrificial control of the incipient-anode effect around repairs",
      "Distributed nationally through Parchem (Fosroc / Vector)",
    ],
    avoidWhere: [
      "Full-area managed CP of heavily chloride-contaminated structures — consider ICCP",
      "Without a corrosion engineer's CP design",
      "In high-resistivity repair mortars that isolate the bar",
    ],
    warnings: [
      "Anode number/spacing must follow a CP design",
      "Confirm current output and spacing against the current Vector / Parchem documentation",
    ],
    advanced: {
      description:
        "Vector Galvashield XP2 is a higher-output embedded zinc galvanic (sacrificial) discrete anode for incipient-anode corrosion control around concrete repairs, suited to more aggressive chloride exposure or wider anode spacing than the standard XP. No power required; distributed in Australia by Parchem. CONFIRM current output and spacing tables against the current Vector / Parchem documentation.",
      designCriteria: "",
      techData: [
        { label: "CP type", value: "Galvanic discrete anode (higher output)", source: "fosroc.com.au / vector" },
        { label: "Power", value: "No power required", source: "fosroc.com.au / vector" },
        { label: "Anode", value: "Embedded zinc (higher output)", source: "fosroc.com.au / vector" },
        { label: "Primary use", value: "Higher-output incipient-anode control", source: "fosroc.com.au / vector" },
        { label: "Design", value: "Anode spacing per CP design", source: "fosroc.com.au / vector" },
        { label: "Current output", value: "Higher than XP — CONFIRM value (Vector / Parchem)", source: "fosroc.com.au / vector" },
      ],
    },
  },
  {
    brand: "System approach",
    rangeName: "Galvanic Mesh Anode System",
    shortType: "Sacrificial zinc mesh anode — full-area galvanic CP",
    badges: [],
    appInfo: kp(["Galvanic mesh anode (full-area)", "No power (sacrificial)", "Zinc mesh / sprayed zinc", "Full-area sacrificial CP of chloride-affected elements", "Specialist CP design + overlay", "System (mesh + overlay/connections)"]),
    bestFor: [
      "Full-area sacrificial CP across a whole element — beyond what discrete anodes can cover",
      "No-power option for marine / chloride-affected slabs, soffits and beams",
    ],
    avoidWhere: [
      "Localised patch repairs (use discrete galvanic anodes)",
      "Without a specialist corrosion-engineering design and a qualified CP installer",
    ],
    warnings: [
      "A designed system — anode layout, overlay and connections must be engineered and commissioned",
      "Confirm the specific proprietary mesh product and design with a CP specialist",
    ],
    advanced: {
      description:
        "A galvanic mesh anode system is a full-area sacrificial cathodic-protection approach — a zinc mesh (or sprayed zinc) anode connected to the reinforcement and embedded under an overlay to protect a whole element without a power supply. It is a specialist-engineered system (not a single off-the-shelf product); the proprietary mesh, layout and connections are set by a corrosion-engineering CP design.",
      designCriteria: "",
      techData: [
        { label: "CP type", value: "Galvanic mesh anode (full-area, sacrificial)", source: "system approach — specialist design" },
        { label: "Power", value: "No power required", source: "system approach — specialist design" },
        { label: "Primary use", value: "Full-area sacrificial CP of chloride-affected elements", source: "system approach — specialist design" },
        { label: "Design", value: "Specialist CP design + overlay + connections", source: "system approach — specialist design" },
      ],
    },
  },
  {
    brand: "System approach",
    rangeName: "Impressed Current Cathodic Protection (ICCP)",
    shortType: "Powered (DC) cathodic protection system",
    badges: [],
    appInfo: kp(["Impressed current (powered)", "Powered (DC transformer-rectifier)", "Inert anode (MMO mesh/ribbon) + power", "Managed full-area CP of high-chloride structures", "Specialist CP design + monitoring", "System (anodes + power + monitoring)"]),
    bestFor: [
      "Managed, adjustable current — the highest level of CP for heavily chloride-contaminated structures",
      "Long-term protection of large marine / infrastructure assets with monitoring",
    ],
    avoidWhere: [
      "Small localised repairs (use discrete galvanic anodes — far simpler)",
      "Without specialist CP design, power supply, monitoring and ongoing maintenance",
    ],
    warnings: [
      "A powered, monitored system requiring specialist design, commissioning and maintenance",
      "Not an off-the-shelf product — engaged through a CP specialist / corrosion engineer",
    ],
    advanced: {
      description:
        "Impressed current cathodic protection (ICCP) is a powered system that drives a controlled protective current from an inert anode (e.g. MMO mesh or ribbon) through a transformer-rectifier to the reinforcement, with reference cells and monitoring. It provides managed, adjustable, long-term protection for heavily chloride-contaminated structures — designed, commissioned and maintained by a CP specialist. Not a single product.",
      designCriteria: "",
      techData: [
        { label: "CP type", value: "Impressed current (powered)", source: "system approach — specialist design" },
        { label: "Power", value: "Powered (DC transformer-rectifier)", source: "system approach — specialist design" },
        { label: "Anode", value: "Inert (MMO mesh / ribbon)", source: "system approach — specialist design" },
        { label: "Primary use", value: "Managed full-area CP of high-chloride structures", source: "system approach — specialist design" },
        { label: "Design", value: "Specialist CP design + monitoring + maintenance", source: "system approach — specialist design" },
      ],
    },
  },
];
