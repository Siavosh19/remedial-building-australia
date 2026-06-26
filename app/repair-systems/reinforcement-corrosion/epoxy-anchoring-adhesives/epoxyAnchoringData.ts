// ──────────────────────────────────────────────────────────────────────────────
// Epoxy Anchoring Adhesives — hand-authored selection cards (reinforcement corrosion).
// Values from the CURRENT AUSTRALIAN manufacturer TDS / ETA; "CONFIRM …" = not
// stated on the cited AU source. Key discriminators: hole moisture rating,
// cracked/seismic approval, and gel/cure time.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Chemistry", "Standard / approval", "Hole condition", "Cracked / seismic", "Bar / rod", "Cartridge"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] }));

export const EPOXY_ANCHORING_CARDS: RefCard[] = [
  {
    brand: "Hilti",
    rangeName: "Hilti HIT-RE 500 V3",
    shortType: "Pure epoxy injection anchor — dry/damp/water-filled, seismic",
    badges: [],
    appInfo: kp(["Pure epoxy", "AS 5216 (ETA — design via PROFIS)", "Dry / damp / water-filled", "Cracked (C2) + seismic", "Rebar (post-installed) + threaded rod", "330 / 500 mL"]),
    bestFor: [
      "The most tolerant hole condition here — qualified for dry, damp AND water-filled holes",
      "Cracked-concrete (C2) and seismic qualified — the high-duty structural option",
      "Long working/cure profile for deep embedments and post-installed rebar",
    ],
    avoidWhere: [
      "Where a faster gel/cure is needed in warm conditions (consider an acrylate)",
      "Without designing the anchorage to AS 5216 (Hilti PROFIS)",
    ],
    warnings: [
      "Design the anchorage to AS 5216 — embedment, edge/spacing and concrete condition govern capacity",
      "Observe gel and full-cure times for the hole temperature/condition",
    ],
    advanced: {
      description:
        "Hilti HIT-RE 500 V3 is a pure-epoxy injection anchoring adhesive qualified for dry, damp and water-filled holes, with cracked-concrete (C2) and seismic approvals — for post-installed reinforcement and threaded rod. Design to AS 5216 via Hilti PROFIS. CONFIRM cartridge sizes and gel/cure times for the hole condition against the current Hilti AU documentation.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Pure epoxy", source: "hilti.com.au ETA" },
        { label: "Standard", value: "AS 5216 (ETA — PROFIS design)", source: "hilti.com.au ETA" },
        { label: "Hole condition", value: "Dry / damp / water-filled", source: "hilti.com.au ETA" },
        { label: "Cracked / seismic", value: "Cracked (C2) + seismic", source: "hilti.com.au ETA" },
        { label: "Bar / rod", value: "Post-installed rebar + threaded rod", source: "hilti.com.au ETA" },
        { label: "Cartridge", value: "330 / 500 mL", source: "hilti.com.au ETA" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika AnchorFix-3+",
    shortType: "Epoxy-acrylate anchoring adhesive — dry/damp, cracked & uncracked",
    badges: [],
    appInfo: kp(["Epoxy acrylate", "AS 5216 (ETA)", "Dry / damp", "Cracked & uncracked", "Rebar + threaded rod", "330 mL"]),
    bestFor: [
      "Cracked- and uncracked-concrete approved with a faster cure than a pure epoxy",
      "Dry and damp holes for rebar and threaded-rod anchoring",
      "Standard cartridge — common gun compatibility",
    ],
    avoidWhere: [
      "Water-filled holes (use a pure epoxy rated for water-filled holes, e.g. HIT-RE 500 V3)",
      "Without designing the anchorage to AS 5216",
    ],
    warnings: [
      "Not for water-filled holes — confirm hole moisture rating",
      "Design to AS 5216; observe gel/cure times for the hole condition",
    ],
    advanced: {
      description:
        "Sika AnchorFix-3+ is an epoxy-acrylate anchoring adhesive (AS 5216 / ETA) for rebar and threaded rod in dry and damp holes, approved for cracked and uncracked concrete, with a faster cure than a pure epoxy. CONFIRM cartridge sizes and gel/cure times against the current Sika Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Epoxy acrylate", source: "aus.sika.com TDS" },
        { label: "Standard", value: "AS 5216 (ETA)", source: "aus.sika.com TDS" },
        { label: "Hole condition", value: "Dry / damp", source: "aus.sika.com TDS" },
        { label: "Cracked / seismic", value: "Cracked & uncracked", source: "aus.sika.com TDS" },
        { label: "Bar / rod", value: "Rebar + threaded rod", source: "aus.sika.com TDS" },
        { label: "Cartridge", value: "330 mL", source: "aus.sika.com TDS" },
      ],
    },
  },
  {
    brand: "Ramset",
    rangeName: "Ramset Chemset Epoxy 500+",
    shortType: "Pure epoxy anchoring adhesive — dry/damp holes",
    badges: [],
    appInfo: kp(["Pure epoxy", "AS 5216 (ETA)", "Dry / damp (not water-filled)", "Cracked (confirm C-class)", "N12/N16 rebar + threaded rod", "380 / 585 mL"]),
    bestFor: [
      "High-strength pure-epoxy anchoring for N12/N16 rebar and threaded rod",
      "Dry and damp holes; cracked-concrete approved (confirm C-class)",
      "Widely available Australian-market anchoring adhesive",
    ],
    avoidWhere: [
      "Water-filled holes (use a pure epoxy rated for water-filled holes)",
      "Without designing the anchorage to AS 5216",
    ],
    warnings: [
      "Not for water-filled holes",
      "Design to AS 5216; confirm the cracked-concrete C-class and gel/cure times",
    ],
    advanced: {
      description:
        "Ramset Chemset Epoxy 500+ is a pure-epoxy anchoring adhesive (AS 5216 / ETA) for N12/N16 rebar and threaded rod in dry and damp holes, approved for cracked concrete. CONFIRM the cracked-concrete C-class, cartridge sizes and gel/cure times against the current Ramset AU documentation.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Pure epoxy", source: "ramset.com.au ETA" },
        { label: "Standard", value: "AS 5216 (ETA)", source: "ramset.com.au ETA" },
        { label: "Hole condition", value: "Dry / damp (not water-filled)", source: "ramset.com.au ETA" },
        { label: "Cracked / seismic", value: "Cracked (confirm C-class)", source: "ramset.com.au ETA" },
        { label: "Bar / rod", value: "N12/N16 rebar + threaded rod", source: "ramset.com.au ETA" },
        { label: "Cartridge", value: "380 / 585 mL", source: "ramset.com.au ETA" },
      ],
    },
  },
  {
    brand: "Mapei Australia",
    rangeName: "Mapei Mapefix EP 100",
    shortType: "Pure epoxy chemical anchor — rebar / threaded rod",
    badges: [],
    appInfo: kp(["Pure epoxy", "AS 5216 — CONFIRM scope", "Dry / damp — CONFIRM", "CONFIRM (C-class)", "Rebar + threaded rod", "CONFIRM (Mapei AU TDS)"]),
    bestFor: [
      "Pure-epoxy chemical anchor for post-installed rebar and threaded rod",
      "Mapei system option for anchoring within a Mapei repair scheme",
    ],
    avoidWhere: [
      "Where a published cracked-concrete / seismic ETA is mandatory — confirm the approval scope",
      "Without designing the anchorage to AS 5216",
    ],
    warnings: [
      "Confirm the AS 5216 approval scope, hole moisture rating and cartridge size against the current Mapei Australia TDS",
      "Design to AS 5216; observe gel/cure times",
    ],
    advanced: {
      description:
        "Mapei Mapefix EP 100 is a pure-epoxy chemical anchoring adhesive for post-installed rebar and threaded rod. CONFIRM the AS 5216 approval scope (cracked/seismic), hole moisture rating, cartridge size and gel/cure times against the current Mapei Australia TDS.",
      designCriteria: "",
      techData: [
        { label: "Chemistry", value: "Pure epoxy", source: "mapei.com/au TDS" },
        { label: "Standard", value: "AS 5216 — CONFIRM scope", source: "mapei.com/au TDS" },
        { label: "Hole condition", value: "Dry / damp — CONFIRM", source: "mapei.com/au TDS" },
        { label: "Cracked / seismic", value: "CONFIRM (C-class)", source: "mapei.com/au TDS" },
        { label: "Bar / rod", value: "Rebar + threaded rod", source: "mapei.com/au TDS" },
        { label: "Cartridge", value: "CONFIRM (Mapei AU TDS)", source: "mapei.com/au TDS" },
      ],
    },
  },
];
