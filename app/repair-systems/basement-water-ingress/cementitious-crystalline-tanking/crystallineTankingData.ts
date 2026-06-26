// ──────────────────────────────────────────────────────────────────────────────
// Cementitious crystalline tanking (basement water ingress). Hand-authored
// selection cards. Values from each product's manufacturer / AU source (cited per
// field). Values not stated on the cited source are written "CONFIRM — <field>
// not stated on <url>" — never guessed.
//
// appInfo comparison columns: Type · Chemistry · Side · Coats / use · Coverage ·
// Pressure · Cure · Standard.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Chemistry", "Side", "Coats / use", "Coverage", "Pressure", "Cure", "Standard"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const CRYSTALLINE_TANKING_CARDS: RefCard[] = [
  {
    brand: "Xypex Australia",
    rangeName: "Xypex Concentrate",
    shortType: "Crystalline waterproofing slurry — positive / negative side",
    badges: [{ label: "Crystalline", tone: "navy" }, { label: "Pos / neg side", tone: "blue" }, { label: "Self-healing", tone: "amber" }],
    appInfo: kp([
      "Crystalline waterproofing slurry coat",
      "Catalytic crystalline (cement + active chemicals)",
      "Positive OR negative side; above / below grade",
      "Single coat, or first of a two-coat system (with Xypex Modified)",
      "0.65–0.8 kg/m² per coat (normal surface)",
      "Resists high hydrostatic pressure",
      "Wet-cure (mist + cover); keep damp",
      "AS/NZS 4020 (potable) — CONFIRM with Xypex Australia",
    ]),
    bestFor: [
      "Catalytic crystalline slurry that integrates with the concrete and self-heals new cracks while water is present — positive or negative side",
      "Single coat, or the base coat of the two-coat Xypex system, against high hydrostatic pressure",
    ],
    avoidWhere: [
      "Masonry / brick / render / non-cementitious substrates — the reaction needs unhydrated cement particles in concrete",
      "Active running water — plug discrete leaks with hydraulic cement first; inject cracks >0.4 mm before treatment",
    ],
    warnings: [
      "Open the concrete pores (grind / HP water blast) before application — a sealed or laitance-covered surface blocks penetration",
      "Wet-cure (mist and cover with hessian) — drying out during cure impairs crystalline growth",
    ],
    advanced: {
      description:
        "Xypex Concentrate is a catalytic crystalline waterproofing applied as a cementitious slurry to above- or below-grade concrete, positive or negative side. It reacts with unhydrated cement and water to form an insoluble crystalline structure in the pores and capillaries, resisting high hydrostatic pressure and self-healing new microcracks while water is present. Coverage 0.65–0.8 kg/m² per coat; single coat or the first of a two-coat system with Xypex Modified. Open the pores by grinding / HP water blast and wet-cure. Confirm AS/NZS 4020 potable-water status with Xypex Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Crystalline waterproofing slurry", source: "xypex.com Concentrate datasheet (2025-05-30)" },
        { label: "Chemistry", value: "Catalytic crystalline (cement + active chemicals)", source: "xypex.com Concentrate" },
        { label: "Side", value: "Positive or negative; above / below grade", source: "xypex.com Concentrate" },
        { label: "Coats", value: "Single coat or first of two-coat (with Modified)", source: "xypex.com Concentrate" },
        { label: "Coverage", value: "0.65–0.8 kg/m² per coat (normal surface)", source: "xypex.com Concentrate" },
        { label: "Pressure", value: "Resists high hydrostatic pressure", source: "xypex.com Concentrate" },
        { label: "Cure", value: "Wet-cure (mist + cover)", source: "xypex.com Concentrate" },
        { label: "Potable standard", value: "CONFIRM — AS/NZS 4020 status with Xypex Australia" },
      ],
    },
  },
  {
    brand: "Xypex Australia",
    rangeName: "Xypex Modified",
    shortType: "Crystalline second coat / damp-proofing slurry",
    badges: [{ label: "Crystalline", tone: "navy" }, { label: "Second coat", tone: "blue" }, { label: "Finer finish", tone: "amber" }],
    appInfo: kp([
      "Crystalline waterproofing slurry (finer / harder finish)",
      "Catalytic crystalline (cement + active chemicals)",
      "Second coat over Concentrate, or single coat exterior foundation damp-proofing",
      "Second coat — apply while Concentrate is green (<48 h)",
      "0.65–0.8 kg/m² per coat",
      "With Concentrate — high hydrostatic pressure",
      "Wet-cure; keep damp",
      "AS/NZS 4020 — CONFIRM with Xypex Australia",
    ]),
    bestFor: [
      "Second coat over Xypex Concentrate (apply while green, <48 h) — chemically reinforces it and gives a harder finish",
      "Single coat for damp-proofing exterior foundation walls",
    ],
    avoidWhere: [
      "Alone for negative-side high-pressure tanking — use it over Concentrate in the two-coat system",
      "Non-cementitious substrates",
    ],
    warnings: [
      "Do not use Modified alone for negative-side tanking — it is the second coat of the Xypex system",
      "Apply over Concentrate while still green (<48 h); wet-cure",
    ],
    advanced: {
      description:
        "Xypex Modified is a crystalline waterproofing slurry used as the second coat to chemically reinforce Xypex Concentrate (applied after Concentrate reaches initial set but while still green, <48 h, giving a harder finish), or as a single coat for damp-proofing exterior foundation walls. Coverage 0.65–0.8 kg/m² per coat. It is not used alone for negative-side high-pressure tanking. Wet-cure. Confirm AS/NZS 4020 status with Xypex Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Crystalline slurry (second coat / damp-proofing)", source: "xypex.com Modified" },
        { label: "Use", value: "Second coat over Concentrate (green <48 h) or single-coat damp-proofing", source: "xypex.com Modified" },
        { label: "Coverage", value: "0.65–0.8 kg/m² per coat", source: "xypex.com Modified" },
        { label: "Cure", value: "Wet-cure", source: "xypex.com Modified" },
        { label: "Potable standard", value: "CONFIRM — AS/NZS 4020 status with Xypex Australia" },
      ],
    },
  },
  {
    brand: "Penetron Australia",
    rangeName: "Penetron (Standard)",
    shortType: "Surface-applied integral crystalline waterproofing",
    badges: [{ label: "Crystalline", tone: "navy" }, { label: "Pos / neg side", tone: "blue" }, { label: "Self-healing", tone: "amber" }],
    appInfo: kp([
      "Surface-applied integral crystalline waterproofing",
      "Portland cement + treated quartz sand + active chemicals",
      "Positive OR negative side",
      "Slurry coat on hardened concrete; or dry-sprinkle on fresh concrete; construction joints",
      "Dry-sprinkle 1 kg/m²; construction joints 1.6 kg/m²; slurry rate CONFIRM",
      "Resists high hydrostatic pressure; self-healing",
      "Keep damp 5 days; protect from sun / wind / frost",
      "AS/NZS 4020 — CONFIRM with Penetron Australia",
    ]),
    bestFor: [
      "Brush- or spray-applied crystalline that penetrates deeply and self-heals microcracks under high hydrostatic pressure — positive or negative side",
      "Flexible application — slurry on hardened concrete, dry-sprinkle 1 kg/m² on fresh concrete, 1.6 kg/m² at construction joints",
    ],
    avoidWhere: [
      "Non-cementitious substrates (masonry / brick / render)",
      "Active running water or cracks >0.4 mm without prior plugging / injection",
    ],
    warnings: [
      "Keep treated areas damp for 5 days, protected from direct sun / wind / frost — curing is critical to crystal growth",
      "Stop active water with hydraulic cement plug and inject large cracks before applying",
    ],
    advanced: {
      description:
        "Penetron is a surface-applied integral crystalline waterproofing of Portland cement, specially treated quartz sand and active chemicals, brushed or sprayed to the positive or negative side of concrete. In the presence of moisture it penetrates deeply and forms an insoluble crystalline structure that fills microcracks, pores and capillaries and resists high hydrostatic pressure, with self-healing of cracks over the concrete's life. Slurry coat on hardened concrete; dry-sprinkle 1 kg/m² and trowel into fresh concrete at initial set; 1.6 kg/m² at construction joints. Keep damp for 5 days, protected from sun / wind / frost. Confirm AS/NZS 4020 status with Penetron Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Surface-applied integral crystalline waterproofing", source: "penetron.com data sheet" },
        { label: "Chemistry", value: "Portland cement + treated quartz sand + active chemicals", source: "penetron.com data sheet" },
        { label: "Side", value: "Positive or negative", source: "penetron.com data sheet" },
        { label: "Coverage", value: "Dry-sprinkle 1 kg/m²; construction joints 1.6 kg/m²", source: "penetron.com data sheet" },
        { label: "Pressure / healing", value: "High hydrostatic pressure; self-healing", source: "penetron.com data sheet" },
        { label: "Cure", value: "Keep damp 5 days; protect from sun / wind / frost", source: "penetron.com data sheet" },
        { label: "Slurry rate", value: "CONFIRM — slurry coverage not stated on the cited Penetron source" },
        { label: "Potable standard", value: "CONFIRM — AS/NZS 4020 status with Penetron Australia" },
      ],
    },
  },
];

export const CRYSTALLINE_TANKING_SELECTORS = [
  { product_id: "xypex_concentrate", category: "cementitious-crystalline-tanking", type: "crystalline_slurry", chemistry: "catalytic_crystalline", side: "both", coats: "1_or_first_of_2", coverage_kg_m2_per_coat: { min: 0.65, max: 0.8 }, hydrostatic: "high", cure: "wet", substrate: "concrete_only", standard_potable: "AS/NZS_4020_confirm", au_distributor: "Xypex Australia", source_tds_url: "https://www.xypex.com/product/coatings/concentrate/", confidence: "confirmed" },
  { product_id: "xypex_modified", category: "cementitious-crystalline-tanking", type: "crystalline_slurry", chemistry: "catalytic_crystalline", side: "both", coats: "second_coat_over_concentrate", coverage_kg_m2_per_coat: { min: 0.65, max: 0.8 }, hydrostatic: "high_with_concentrate", cure: "wet", substrate: "concrete_only", standard_potable: "AS/NZS_4020_confirm", au_distributor: "Xypex Australia", source_tds_url: "https://www.xypex.com/product/coatings/concentrate/", confidence: "confirmed" },
  { product_id: "penetron_standard", category: "cementitious-crystalline-tanking", type: "crystalline_surface_applied", chemistry: "crystalline_quartz_cement", side: "both", coverage_dry_kg_m2: 1.0, coverage_joint_kg_m2: 1.6, hydrostatic: "high", self_healing: true, cure: "damp_5_days", substrate: "concrete_only", standard_potable: "AS/NZS_4020_confirm", au_distributor: "Penetron Australia", source_tds_url: "https://www.penetron.com/products/PENETRON/data-sheet.pdf", confidence: "confirmed" },
];
