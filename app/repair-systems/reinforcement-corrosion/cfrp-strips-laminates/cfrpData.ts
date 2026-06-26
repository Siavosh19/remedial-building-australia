// ──────────────────────────────────────────────────────────────────────────────
// CFRP Strips & Laminates — hand-authored selection cards (structural strengthening).
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated on
// the cited AU source. Numeric fibre properties left CONFIRM rather than guessed —
// design values must come from the manufacturer's TDS / engineer.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Form", "Fibre / direction", "Application", "Tensile strength", "E-modulus", "Bonding system"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const CFRP_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "Sika CarboDur S",
    shortType: "Pultruded CFRP plate (pre-cured laminate) for flexural strengthening",
    badges: [],
    appInfo: kp(["Pultruded CFRP plate (pre-cured laminate)", "Unidirectional carbon (0°)", "Externally bonded to the soffit", "CONFIRM (Sika AU TDS)", "CONFIRM (Sika AU TDS — high modulus)", "Bonded with Sikadur-30 adhesive"]),
    bestFor: [
      "Pre-cured, factory-controlled CFRP plate — consistent thickness and properties vs wet layup",
      "Flexural strengthening of beams and slabs (externally-bonded reinforcement)",
      "Fast install — bonded directly with Sikadur-30, no wet saturation",
    ],
    avoidWhere: [
      "Tight radii / confinement wraps (use a flexible fabric such as SikaWrap)",
      "Without an engineered CFRP strengthening design and the correct plate grade",
    ],
    warnings: [
      "Design tensile strength and modulus must be taken from the current Sika TDS — not assumed",
      "Bond only with the matched Sikadur-30 adhesive on a prepared substrate",
    ],
    advanced: {
      description:
        "Sika CarboDur S is a pultruded, pre-cured unidirectional CFRP plate (laminate) bonded to the soffit as externally-bonded reinforcement for flexural strengthening, using Sikadur-30 adhesive. Factory-controlled thickness and properties. CONFIRM the design tensile strength, E-modulus, plate dimensions and pack against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "Pultruded CFRP plate (pre-cured laminate)", source: "aus.sika.com TDS" },
        { label: "Fibre / direction", value: "Unidirectional carbon (0°)", source: "aus.sika.com TDS" },
        { label: "Application", value: "Externally bonded with Sikadur-30", source: "aus.sika.com TDS" },
        { label: "Tensile strength", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
        { label: "E-modulus", value: "CONFIRM (Sika AU TDS — high modulus)", source: "aus.sika.com TDS" },
        { label: "Bonding system", value: "Sikadur-30 adhesive", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei MapeWrap C Uni-Ax",
    shortType: "Unidirectional carbon-fibre fabric (wet layup)",
    badges: [],
    appInfo: kp(["Carbon-fibre fabric (wet layup)", "Unidirectional carbon (0°)", "Wet-applied with a MapeWrap saturant", "CONFIRM (Mapei AU TDS)", "CONFIRM (Mapei AU TDS)", "MapeWrap 31 / 21 epoxy saturant"]),
    bestFor: [
      "Conformable unidirectional fabric — wraps columns and irregular geometry that a rigid plate cannot",
      "Confinement and flexural/shear strengthening by wet layup",
    ],
    avoidWhere: [
      "Where a pre-cured, factory-controlled laminate is preferred (use a CFRP plate)",
      "Without an engineered strengthening design and the matched saturant system",
    ],
    warnings: [
      "Design fibre properties must come from the current Mapei TDS — confirm fabric weight and design values",
      "Use only with the matched MapeWrap epoxy primer/saturant system",
    ],
    advanced: {
      description:
        "Mapei MapeWrap C Uni-Ax is a unidirectional carbon-fibre fabric applied by wet layup with a MapeWrap epoxy primer and saturant for confinement, flexural and shear strengthening of concrete elements — conforming to columns and geometry a rigid plate cannot. CONFIRM the fabric weight, design tensile strength, E-modulus and the matched saturant system against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "Unidirectional carbon-fibre fabric (wet layup)", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Fibre / direction", value: "Unidirectional carbon (0°)", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Application", value: "Wet-applied with a MapeWrap saturant", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Bonding system", value: "MapeWrap 31 / 21 epoxy saturant", source: "mapei.com/au TDS — AU CONFIRM" },
        { label: "Design values", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS — AU CONFIRM" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitowrap CF",
    shortType: "Carbon-fibre fabric (wet layup) — Nitowrap system",
    badges: [],
    appInfo: kp(["Carbon-fibre fabric (wet layup)", "Unidirectional carbon", "Wet-applied with the Nitowrap saturant", "CONFIRM (Parchem TDS)", "CONFIRM (Parchem TDS)", "Nitowrap 30 primer + Nitowrap 410 saturant"]),
    bestFor: [
      "Carbon-fibre fabric for the Fosroc Nitowrap wet-layup strengthening system",
      "Conformable — wraps columns and irregular sections for confinement/strengthening",
    ],
    avoidWhere: [
      "Where a pre-cured CFRP plate is preferred",
      "Without an engineered strengthening design and the matched Nitowrap resin system",
    ],
    warnings: [
      "Confirm the exact fabric designation (Nitowrap CF vs Nitowrap EP(CF)) and design values with Parchem",
      "Use only with the matched Nitowrap 30 primer + Nitowrap 410 saturant",
    ],
    advanced: {
      description:
        "Fosroc Nitowrap CF is a carbon-fibre fabric applied by wet layup within the Fosroc Nitowrap strengthening system (Nitowrap 30 primer + Nitowrap 410 high-build saturant) for confinement and flexural/shear strengthening. CONFIRM the exact fabric designation, fabric weight and design tensile/modulus values against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Form", value: "Carbon-fibre fabric (wet layup)", source: "fosroc.com.au — confirm" },
        { label: "Application", value: "Wet-applied with the Nitowrap saturant", source: "fosroc.com.au — confirm" },
        { label: "Bonding system", value: "Nitowrap 30 primer + Nitowrap 410 saturant", source: "fosroc.com.au — confirm" },
        { label: "Design values", value: "CONFIRM (Parchem TDS)", source: "fosroc.com.au — confirm" },
      ],
    },
  },
];
