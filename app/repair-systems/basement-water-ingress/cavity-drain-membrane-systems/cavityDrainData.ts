// ──────────────────────────────────────────────────────────────────────────────
// Cavity drain membrane systems (basement water ingress, BS 8102 Type C).
// Hand-authored selection cards. Values from the manufacturer / AU source (cited
// per field). Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Material · Stud / profile · Compressive
// strength · Drainage · Use · Fire · Standard.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Material", "Stud / profile", "Compressive strength", "Drainage", "Use", "Fire", "Standard"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const CAVITY_DRAIN_CARDS: RefCard[] = [
  {
    brand: "Delta Membranes",
    rangeName: "Delta MS 500",
    shortType: "Studded HDPE cavity drain membrane (Type C)",
    badges: [{ label: "BS 8102 Type C", tone: "navy" }, { label: ">250 kN/m²", tone: "blue" }, { label: "8 mm stud", tone: "amber" }],
    appInfo: kp([
      "Type C cavity drain membrane (studded)",
      "High-density polyethylene (HDPE), clear",
      "8 mm studded profile; 0.5 mm sheet",
      ">250 kN/m²",
      "2.25 L/s·m (135 L/min·m)",
      "Walls, floors and vaulted ceilings — interior water control & management",
      "EN 13501-1 Class E (reaction to fire)",
      "BS 8102 Type C cavity drainage",
    ]),
    bestFor: [
      "8 mm studded HDPE cavity drain — >250 kN/m² compressive, 2.25 L/s·m drainage — interior water-management membrane for sub-ground walls and floors",
      "Walls, floors and vaulted ceilings, above or below ground, over damp / contaminated backgrounds",
    ],
    avoidWhere: [
      "As a waterproofing barrier — cavity drain MANAGES water (drains it), it does not stop it; it needs a perimeter channel and sump pump",
      "Grade 3 (habitable) space without a backup sump pump and high-level alarm",
    ],
    warnings: [
      "Design the complete system — membrane + perimeter drainage channel + sump pump (with backup and alarm) — membrane alone is not a functioning cavity drain",
      "Ongoing maintenance obligation — sump, float switch and channels need periodic inspection (strata maintenance plan)",
    ],
    advanced: {
      description:
        "Delta MS 500 is an 8 mm studded-profile HDPE (clear) cavity drainage membrane (BS 8102 Type C) for the internal faces of sub-ground walls and floors as a drained water-management system. Compressive strength >250 kN/m²; drainage capacity 2.25 L/s·m (135 L/min·m); air volume between studs ~5.3 L/m²; reaction to fire EN 13501-1 Class E; R-value ~0.12 m²K/W. It is fitted on the interior face (no adhesion; the studs provide stand-off) and forms part of a complete system with a perimeter drainage channel and a sump pump (with backup for habitable space).",
      designCriteria: "",
      techData: [
        { label: "Type", value: "BS 8102 Type C studded cavity drain membrane", source: "deltamembranes.com MS 500" },
        { label: "Material", value: "HDPE (clear), 0.5 mm, 8 mm studs", source: "deltamembranes.com MS 500" },
        { label: "Compressive strength", value: ">250 kN/m²", source: "deltamembranes.com MS 500" },
        { label: "Drainage", value: "2.25 L/s·m (135 L/min·m)", source: "deltamembranes.com MS 500" },
        { label: "Fire", value: "EN 13501-1 Class E", source: "deltamembranes.com MS 500" },
        { label: "R-value", value: "~0.12 m²K/W", source: "deltamembranes.com MS 500" },
      ],
    },
  },
  {
    brand: "Delta Membranes",
    rangeName: "Delta MS 20",
    shortType: "High-drainage HDPE cavity drain membrane (Type C)",
    badges: [{ label: "BS 8102 Type C", tone: "navy" }, { label: "High drainage", tone: "blue" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Type C cavity drain membrane (high-drainage)",
      "High-density polyethylene (HDPE)",
      "Studded — CONFIRM stud height (Delta TDS)",
      "Higher than MS 500 — CONFIRM kN/m² (Delta TDS)",
      "Superior drainage capacity — CONFIRM L/s·m (Delta TDS)",
      "Walls / floors — high water pressure / high groundwater table",
      "CONFIRM fire class (Delta TDS)",
      "BS 8102 Type C",
    ]),
    bestFor: [
      "Higher-drainage, higher-strength HDPE cavity drain — for high water pressure, a high groundwater table, or floor applications in high-flow conditions",
    ],
    avoidWhere: [
      "As a waterproofing barrier (it manages water, not stops it)",
      "Grade 3 habitable space without backup pump and alarm",
    ],
    warnings: [
      "Design as a complete system with perimeter channel and sump (with backup)",
      "Confirm stud height, compressive strength, drainage capacity and fire class from the current Delta TDS",
    ],
    advanced: {
      description:
        "Delta MS 20 is a high-density polyethylene high-drainage cavity drain membrane (BS 8102 Type C) with superior drainage capacity and compressive strength versus the standard membrane — for high-performance water control where water pressure or the groundwater table is high, including floor applications. Confirm exact stud height, compressive strength, drainage capacity and fire class from the current Delta TDS / AU distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "BS 8102 Type C high-drainage cavity drain membrane", source: "deltamembranes.com MS 20" },
        { label: "Material", value: "HDPE", source: "deltamembranes.com MS 20" },
        { label: "Compressive / drainage / stud / fire", value: "CONFIRM — exact values not stated on the cited Delta source" },
      ],
    },
  },
  {
    brand: "Delta Membranes",
    rangeName: "Delta Geo-Drain (floor drainage)",
    shortType: "Floor drainage geocomposite (cavity drain + filtration)",
    badges: [{ label: "Floor drainage", tone: "navy" }, { label: "Geotextile filter", tone: "blue" }, { label: "CONFIRM specs", tone: "rose" }],
    appInfo: kp([
      "Floor drainage geocomposite (cavity drain + filtration)",
      "HDPE studded core + geotextile filter — CONFIRM (Delta TDS)",
      "Studded core with bonded geotextile — CONFIRM profile",
      "CONFIRM kN/m² (Delta TDS)",
      "High floor drainage — CONFIRM L/s·m (Delta TDS)",
      "Floor applications under a concrete topping",
      "CONFIRM fire class (Delta TDS)",
      "BS 8102 Type C",
    ]),
    bestFor: [
      "Floor drainage mat with geotextile filtration — for floor applications under a concrete topping; filtration prevents long-term blockage of the drainage layer",
      "Used with the wall membrane, perimeter channel and sump to form the complete Type C system",
    ],
    avoidWhere: [
      "Wall-only applications where a studded wall membrane (MS 500 / MS 20) is the correct product",
    ],
    warnings: [
      "Always specify for floor applications under a topping — the geotextile filtration prevents fines blocking the drainage layer over time",
      "Confirm the exact current Delta floor-drainage product, profile, compressive strength and drainage with Delta / the AU distributor",
    ],
    advanced: {
      description:
        "Delta Geo-Drain is a floor drainage geocomposite (a studded HDPE cavity-drain core with a bonded geotextile filter) for floor applications under a concrete topping. The geotextile filtration prevents fines from blocking the drainage layer over the life of the system. It is used with the wall cavity-drain membrane, perimeter drainage channel and sump pump to form a complete BS 8102 Type C drained system. Confirm the exact current Delta floor-drainage product, profile, compressive strength, drainage capacity and fire class with Delta Membranes / the AU distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Floor drainage geocomposite (cavity drain + geotextile filtration)", source: "deltamembranes.com (floor drainage)" },
        { label: "Use", value: "Floor applications under concrete topping", source: "deltamembranes.com" },
        { label: "Profile / strength / drainage / fire", value: "CONFIRM — exact current product and values with Delta / AU distributor" },
      ],
    },
  },
];

export const CAVITY_DRAIN_SELECTORS = [
  { product_id: "delta_ms_500", category: "cavity-drain-membrane-systems", type: "type_c_cavity_drain", material: "hdpe", stud_mm: 8, sheet_mm: 0.5, compressive_kn_m2: 250, compressive_basis: "min", drainage_l_s_m: 2.25, fire_en13501: "E", standard: ["BS_8102_TypeC"], au_distributor: "Delta Membranes (AU distributor)", source_tds_url: "https://www.deltamembranes.com/products/ms-500/", confidence: "confirmed" },
  { product_id: "delta_ms_20", category: "cavity-drain-membrane-systems", type: "type_c_cavity_drain_high_drainage", material: "hdpe", stud_mm: null, compressive_kn_m2: null, drainage_l_s_m: null, standard: ["BS_8102_TypeC"], au_distributor: "Delta Membranes (AU distributor)", source_tds_url: "https://www.deltamembranes.com/products/ms-20/", confidence: "needs_confirmation" },
  { product_id: "delta_geo_drain", category: "cavity-drain-membrane-systems", type: "floor_drainage_geocomposite", material: "hdpe_geotextile", use: "floor_under_topping", standard: ["BS_8102_TypeC"], au_distributor: "Delta Membranes (AU distributor)", source_tds_url: "https://www.deltamembranes.com/", confidence: "needs_confirmation" },
];
