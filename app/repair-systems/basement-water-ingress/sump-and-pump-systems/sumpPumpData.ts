// ──────────────────────────────────────────────────────────────────────────────
// Sump & pump systems (basement water ingress — active discharge for cavity
// drain). Hand-authored selection cards. Values from the manufacturer / AU
// source (cited per field). Values not stated → "CONFIRM — <field> not stated
// on <url>".
//
// appInfo comparison columns: Type · Role · Max flow · Max head · Power ·
// Solids size · Switch · Outlet.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Role", "Max flow", "Max head", "Power", "Solids size", "Switch", "Outlet"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SUMP_PUMP_CARDS: RefCard[] = [
  {
    brand: "Grundfos Australia",
    rangeName: "Grundfos Unilift KP 150-A-1",
    shortType: "Submersible drainage pump — backup / light-duty primary",
    badges: [{ label: "2.36 L/s", tone: "navy" }, { label: "5.5 m head", tone: "blue" }, { label: "Auto float", tone: "amber" }],
    appInfo: kp([
      "Submersible drainage pump (stainless, semi-open impeller)",
      "Backup or light-duty primary (cavity drain sump)",
      "2.36 L/s",
      "5.5 m",
      "300 W (230–240 V, 1-phase)",
      "10 mm free passage",
      "Automatic float switch (A version)",
      "1¼\"",
    ]),
    bestFor: [
      "Compact submersible drainage pump — 2.36 L/s, 5.5 m head, 10 mm free passage, stainless with semi-open impeller — backup or light-duty primary in a cavity drain sump",
      "Automatic float switch (A version), thermal overload, suction strainer, 5 m cable — for groundwater, surface and rain water",
    ],
    avoidWhere: [
      "As the sole pump for a Grade 3 habitable basement — provide a backup pump and a high-water alarm",
      "Sewage or solids larger than 10 mm",
    ],
    warnings: [
      "Size the pump to at least 1.5× peak inflow; test the float switch at every maintenance inspection",
      "Discharge to an approved point (not to sewer without approval); provide battery / generator backup for Grade 3",
    ],
    advanced: {
      description:
        "Grundfos Unilift KP 150-A-1 is a vertical single-stage stainless-steel submersible drainage pump with a semi-open impeller for 10 mm free passage — max flow 2.36 L/s, max head 5.5 m, 300 W, 230–240 V single-phase, 1¼\" discharge, with a suction strainer, carrying handle and 5 m cable. The 'A' version has an automatic float switch and thermal overload protection. Suited to backup or light-duty primary duty in a cavity drain sump pumping groundwater, surface or rain water. Size to ≥1.5× peak inflow and design with a backup pump and high-water alarm for habitable basements.",
      designCriteria: "",
      techData: [
        { label: "Max flow", value: "2.36 L/s", source: "Grundfos Unilift KP datasheet" },
        { label: "Max head", value: "5.5 m", source: "Grundfos Unilift KP datasheet" },
        { label: "Power", value: "300 W (230–240 V, 1-phase)", source: "Grundfos Unilift KP datasheet" },
        { label: "Free passage", value: "10 mm (semi-open impeller)", source: "Grundfos Unilift KP datasheet" },
        { label: "Switch", value: "Automatic float (A); thermal overload", source: "Grundfos Unilift KP datasheet" },
        { label: "Outlet", value: "1¼\"", source: "Grundfos Unilift KP datasheet" },
      ],
    },
  },
  {
    brand: "Grundfos Australia",
    rangeName: "Grundfos Unilift AP 35.40.08",
    shortType: "Submersible drainage / wastewater pump — primary automatic",
    badges: [{ label: "Primary auto", tone: "navy" }, { label: "~35 mm solids", tone: "blue" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Submersible drainage / wastewater pump",
      "Primary automatic (cavity drain sump)",
      "CONFIRM max flow (Grundfos Unilift AP data booklet)",
      "CONFIRM max head (Grundfos Unilift AP data booklet)",
      "~0.8 kW (model code .08) — CONFIRM (Grundfos)",
      "~35 mm free passage (AP35) — CONFIRM (Grundfos)",
      "Automatic float (model-dependent)",
      "CONFIRM outlet (Grundfos)",
    ]),
    bestFor: [
      "Higher-duty submersible drainage / wastewater pump (~35 mm free passage) — primary automatic pump for cavity drain sumps with higher inflow or a larger basement footprint",
      "Free-passage impeller handles larger solids than the KP drainage pump",
    ],
    avoidWhere: [
      "As the sole pump for a Grade 3 habitable basement without a backup pump and alarm",
    ],
    warnings: [
      "Size to ≥1.5× peak inflow; install an independent high-water alarm; test the float switch at each inspection",
      "Confirm exact flow, head, power, free passage and outlet from the Grundfos Unilift AP data booklet",
    ],
    advanced: {
      description:
        "Grundfos Unilift AP 35.40.08 is a submersible drainage / wastewater pump from the Unilift AP range (model code: AP35 = ~35 mm free passage; .08 ≈ 0.8 kW). It is used as a primary automatic sump pump for cavity drain systems with higher inflow or larger footprints, handling larger solids than the KP drainage pump. Confirm exact max flow, head, power, free passage, outlet and switch configuration from the Grundfos Unilift KP/AP data booklet. Design with backup and a high-water alarm for habitable basements.",
      designCriteria: "",
      techData: [
        { label: "Range", value: "Grundfos Unilift AP (submersible drainage / wastewater)", source: "Grundfos Unilift AP data booklet" },
        { label: "Free passage", value: "~35 mm (AP35)", source: "Grundfos Unilift AP (model code)" },
        { label: "Power", value: "~0.8 kW (model code .08)", source: "Grundfos Unilift AP (model code)" },
        { label: "Flow / head / outlet", value: "CONFIRM — from the Grundfos Unilift AP data booklet" },
      ],
    },
  },
  {
    brand: "DAB Pumps",
    rangeName: "DAB Feka VS 550 T-NA",
    shortType: "Submersible vortex drainage pump — primary automatic",
    badges: [{ label: "Vortex", tone: "navy" }, { label: "~550 W", tone: "blue" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Submersible vortex drainage pump",
      "Primary automatic (cavity drain sump)",
      "CONFIRM max flow (DAB Feka VS TDS)",
      "CONFIRM max head (DAB Feka VS TDS)",
      "~550 W (VS 550)",
      "Vortex impeller — solids size CONFIRM (DAB)",
      "Float switch (model-dependent)",
      "CONFIRM outlet (DAB)",
    ]),
    bestFor: [
      "DAB Feka VS 550 vortex submersible drainage pump (~550 W) — primary automatic pump option for cavity drain sumps; the vortex impeller passes fibrous solids",
      "Alternative primary pump where DAB is the preferred supplier",
    ],
    avoidWhere: [
      "As the sole pump for a Grade 3 habitable basement without backup and alarm",
    ],
    warnings: [
      "Confirm max flow, head, free passage and outlet from the DAB Feka VS 550 TDS",
      "Size to ≥1.5× peak inflow; install a high-water alarm and a backup pump for habitable basements",
    ],
    advanced: {
      description:
        "DAB Feka VS 550 T-NA is a submersible vortex drainage pump (~550 W) from the DAB Feka VS range, used as a primary automatic sump pump for cavity drain systems; the vortex impeller passes fibrous solids better than a semi-open drainage impeller. Confirm exact max flow, head, free passage, outlet and switch configuration from the DAB Feka VS 550 TDS. Design with a backup pump and high-water alarm for habitable basements.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Submersible vortex drainage pump (~550 W)", source: "DAB Feka VS 550 (dabpumps)" },
        { label: "Impeller", value: "Vortex — passes fibrous solids", source: "DAB Feka VS range" },
        { label: "Flow / head / free passage / outlet", value: "CONFIRM — from the DAB Feka VS 550 TDS" },
      ],
    },
  },
];

export const SUMP_PUMP_SELECTORS = [
  { product_id: "grundfos_unilift_kp_150_a_1", category: "sump-and-pump-systems", type: "submersible_drainage_pump", role: "backup_or_light_primary", max_flow_l_s: 2.36, max_head_m: 5.5, power_w: 300, free_passage_mm: 10, switch: "auto_float", outlet: "1_1_4_in", au_distributor: "Grundfos Australia", source_tds_url: "https://www.ozpump.com.au/wp-content/uploads/2016/10/Grundfos-KP-Data-Sheet.pdf", confidence: "confirmed" },
  { product_id: "grundfos_unilift_ap_35_40_08", category: "sump-and-pump-systems", type: "submersible_drainage_wastewater_pump", role: "primary_auto", max_flow_l_s: null, max_head_m: null, power_kw: 0.8, free_passage_mm: 35, switch: "auto_float", au_distributor: "Grundfos Australia", source_tds_url: "https://api.grundfos.com/literature/Grundfosliterature-1661536.pdf", confidence: "needs_confirmation" },
  { product_id: "dab_feka_vs_550", category: "sump-and-pump-systems", type: "submersible_vortex_pump", role: "primary_auto", power_w: 550, impeller: "vortex", max_flow_l_s: null, max_head_m: null, au_distributor: "DAB Pumps Australia", source_tds_url: "https://www.dabpumps.com/", confidence: "needs_confirmation" },
];
