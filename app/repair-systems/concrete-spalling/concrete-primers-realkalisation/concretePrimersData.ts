// ──────────────────────────────────────────────────────────────────────────────
// Concrete Primers & Re-alkalisation — hand-authored selection cards.
// Values from the CURRENT AUSTRALIAN manufacturer TDS; "CONFIRM …" = not stated
// on the cited AU source. Both current products are bonding primers (no discrete
// re-alkalising product is listed — re-alkalisation is an electrochemical process).
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Function", "Chemistry", "EN 1504-7", "Coats / build", "Overcoat window", "Pack size"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const CONCRETE_PRIMER_CARDS: RefCard[] = [
  {
    brand: "Sika Australia",
    rangeName: "SikaTop Armatec-110 EpoCem",
    shortType: "Cementitious epoxy-modified bonding primer + rebar corrosion protection (EN 1504-7)",
    badges: [],
    appInfo: kp([
      "Bonding primer + rebar corrosion protection",
      "3-component cementitious, epoxy-modified",
      "Yes",
      "Brush; rebar 2 coats — confirm rate",
      "Apply mortar within the overcoat window (TDS)",
      "CONFIRM (Sika AU TDS)",
    ]),
    bestFor: [
      "Dual-purpose — a substrate bonding primer AND reinforcement corrosion protection (EN 1504-7) in one product",
      "EpoCem technology — an epoxy-cementitious bond layer compatible with Sika MonoTop / SikaTop repair mortars",
    ],
    avoidWhere: [
      "Do not exceed the overcoat window — place the repair mortar within the stated time",
      "Three-component — do not split-batch; mix complete pre-packed units",
    ],
    warnings: [
      "Apply the repair mortar within the overcoat window or the bond is compromised",
      "Confirm coverage rate and pack size against the current Sika Australia TDS",
    ],
    advanced: {
      description:
        "SikaTop Armatec-110 EpoCem is a three-component, cementitious epoxy-modified slurry used as a bonding primer and reinforcement corrosion protection, conforming to EN 1504-7. Built on Sika's EpoCem technology, it is brushed onto exposed reinforcement and the prepared substrate, then overlaid with a Sika MonoTop / compatible repair mortar within the overcoat window. CONFIRM coverage rate, number of coats and pack size against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Function", value: "Bonding primer + rebar corrosion protection", source: "aus.sika.com TDS" },
        { label: "Chemistry", value: "3-component cementitious, epoxy-modified (EpoCem)", source: "aus.sika.com TDS" },
        { label: "EN 1504-7", value: "Yes (conforms)", source: "aus.sika.com TDS" },
        { label: "Coats", value: "Brush; 2 coats on rebar — confirm rate", source: "aus.sika.com TDS" },
        { label: "Overcoat window", value: "Apply mortar within the stated window", source: "aus.sika.com TDS" },
        { label: "Application", value: "Brush", source: "aus.sika.com TDS" },
        { label: "Pack size", value: "CONFIRM (Sika AU TDS)", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitobond HAR",
    shortType: "Single-component polymer-emulsion substrate bonding primer (Renderoc system)",
    badges: [],
    appInfo: kp([
      "Substrate bonding primer (Renderoc system)",
      "Single-component polymer emulsion",
      "N/A — bonding primer",
      "Scrub in 1 coat",
      "Apply mortar while primer is tacky",
      "CONFIRM (Parchem AU TDS)",
    ]),
    bestFor: [
      "Single-component — no mixing; scrubbed-in bonding primer for Fosroc Renderoc repair mortars",
      "Non-flammable polymer emulsion — improves old-to-new bond on the prepared substrate",
    ],
    avoidWhere: [
      "Place the Renderoc mortar while the primer is still tacky — do not let it dry out first",
      "A substrate bonding primer — not a rebar corrosion-protection coat (prime exposed steel with Nitoprime Zincrich)",
    ],
    warnings: [
      "Apply the repair mortar within the tacky window or the bond is compromised",
      "Confirm coverage rate and pack size against the current Fosroc / Parchem TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitobond HAR is a single-component polymer-emulsion bonding agent used as the substrate primer for Fosroc Renderoc repair mortars. It is scrubbed well into the prepared, saturated-surface-dry substrate and the Renderoc mortar is applied while the primer is still tacky. Non-flammable. CONFIRM coverage rate and pack size against the current Fosroc / Parchem TDS.",
      designCriteria: "",
      techData: [
        { label: "Function", value: "Substrate bonding primer (Renderoc system)", source: "fosroc.com.au TDS" },
        { label: "Chemistry", value: "Single-component polymer emulsion", source: "fosroc.com.au TDS" },
        { label: "EN 1504-7", value: "N/A — bonding primer (not a rebar protection coat)", source: "fosroc.com.au TDS" },
        { label: "Coats", value: "Scrub in 1 coat", source: "fosroc.com.au TDS" },
        { label: "Overcoat window", value: "Apply mortar while primer tacky", source: "fosroc.com.au TDS" },
        { label: "Application", value: "Brush / scrub-in", source: "fosroc.com.au TDS" },
        { label: "Pack size", value: "CONFIRM (Parchem AU TDS)", source: "fosroc.com.au TDS" },
      ],
    },
  },
];
