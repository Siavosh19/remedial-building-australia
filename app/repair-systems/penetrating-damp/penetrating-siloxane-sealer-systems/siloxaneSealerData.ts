// ──────────────────────────────────────────────────────────────────────────────
// Penetrating siloxane / cream sealer systems (penetrating damp). Hand-authored
// selection cards. Values from each product's manufacturer / AU source (cited per
// field). Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Active chemistry · Active content ·
// Form / carrier · Coverage / coats · Penetration / breathability · Standard ·
// Substrate.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Active chemistry", "Active content", "Form / carrier", "Coverage / coats", "Penetration / breathability", "Standard", "Substrate"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const SILOXANE_SEALER_CARDS: RefCard[] = [
  {
    brand: "Safeguard Europe",
    rangeName: "Stormdry Masonry Protection Cream",
    shortType: "Silane/siloxane water-repellent cream — deep penetration",
    badges: [{ label: "BBA 15/5198", tone: "navy" }, { label: "25-yr durability", tone: "amber" }, { label: "Breathable cream", tone: "blue" }],
    appInfo: kp([
      "Silane/siloxane water-repellent CREAM",
      "Silane/siloxane (cream)",
      "CONFIRM active % (Safeguard TDS)",
      "Cream (colourless; dries clear)",
      "Per substrate — CONFIRM coverage (Safeguard TDS)",
      "Deep penetration (cream penetrates deeper than liquid); lines pores (breathable)",
      "BBA certificate 15/5198 — 25-year durability statement",
      "Brick, stone and concrete masonry",
    ]),
    bestFor: [
      "Cream consistency penetrates deeper than liquid water repellents — ideal for brick with open / raked mortar joints; lines the pores (breathable), dries clear",
      "The only colourless masonry water repellent carrying BBA approval (15/5198) with a 25-year durability statement",
    ],
    avoidWhere: [
      "To waterproof cracks, failed joints or membrane penetrations — it treats the intact masonry fabric only",
      "On a wet substrate or where another moisture pathway has not been addressed first",
    ],
    warnings: [
      "Rain-resistant after ~2–4 h; the full beading effect can take up to ~2 months to develop",
      "Confirm active %, coverage and substrate preparation from the Safeguard / AU distributor TDS",
    ],
    advanced: {
      description:
        "Stormdry Masonry Protection Cream (Safeguard Europe) is a deeply-penetrating silane/siloxane water-repellent cream for brick, stone and concrete — the cream form penetrates more deeply than standard liquid water seals, and it lines the masonry pores to form a water-repellent silicone matrix while keeping the wall vapour-permeable (breathable). It is the only colourless masonry water repellent carrying BBA approval (certificate 15/5198), with a 25-year durability statement after freeze-thaw and UV testing. Walls are rain-resistant after ~2–4 hours; the beading effect can take up to ~2 months to appear. Confirm active %, coverage and AU supply with the AU distributor.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Silane/siloxane water-repellent cream", source: "Safeguard Stormdry datasheet" },
        { label: "Technology", value: "Lines pores (silicone matrix); breathable", source: "Safeguard Stormdry datasheet" },
        { label: "Penetration", value: "Deeper than standard liquid water seals (cream)", source: "Safeguard Stormdry datasheet" },
        { label: "Certification", value: "BBA cert 15/5198 — 25-year durability statement", source: "Safeguard Stormdry datasheet" },
        { label: "Rain resistance", value: "~2–4 h; full beading up to ~2 months", source: "Safeguard Stormdry datasheet" },
        { label: "Active % / coverage", value: "CONFIRM — not stated on the cited Safeguard source" },
      ],
    },
  },
  {
    brand: "Remmers Australia",
    rangeName: "Remmers Funcosil SNL",
    shortType: "Silane/siloxane hydrophobising impregnation (liquid)",
    badges: [{ label: "Silane/siloxane", tone: "navy" }, { label: "~7% active", tone: "blue" }, { label: "CONFIRM VOC", tone: "rose" }],
    appInfo: kp([
      "Silane/siloxane hydrophobising impregnation (liquid)",
      "Silane/siloxane",
      "~7% by mass active",
      "Liquid; dearomatised-hydrocarbon carrier (density ~0.78) — solvent-based",
      "Per substrate — CONFIRM coverage / coats (Remmers TDS)",
      "Penetrating; protects against driving rain; reduces dirt / discolouration",
      "WTA facade water repellent — CONFIRM EN 1504-2",
      "Mineral substrates / facades",
    ]),
    bestFor: [
      "Clear silane/siloxane impregnation (~7% active) for facade protection against driving rain — reduces dirt and green discolouration",
      "Suitable for subsequent treatment / renewal of previously hydrophobic surfaces",
    ],
    avoidWhere: [
      "Where solvent-free / low-odour is required — standard SNL is solvent-based (a 'Funcosil SNL Odourless' variant exists)",
      "On a wet substrate or to address cracks / failed joints",
    ],
    warnings: [
      "CONFIRM — the standard Funcosil SNL is solvent-based (dearomatised hydrocarbon), not solvent-free; a 'Funcosil SNL Odourless' variant exists — confirm the correct AU product and VOC with Remmers",
      "Confirm coverage and number of coats for the substrate from the Remmers Funcosil SNL TDS",
    ],
    advanced: {
      description:
        "Remmers Funcosil SNL is a clear, hydrophobising impregnation on a silane/siloxane base (~7% active by mass) in a dearomatised-hydrocarbon carrier (density ~0.78 g/cm³) — solvent-based. It protects facades against driving rain, reduces dirt and green discolouration, and suits renewal of previously hydrophobic surfaces, on mineral substrates. NOTE: the standard SNL is solvent-based (a 'Funcosil SNL Odourless' variant exists) — confirm the correct AU product, VOC, coverage and coats with Remmers Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Silane/siloxane hydrophobising impregnation (liquid)", source: "Remmers Funcosil SNL (remmers.com)" },
        { label: "Active content", value: "~7% by mass", source: "Remmers Funcosil SNL" },
        { label: "Carrier", value: "Dearomatised hydrocarbons (density ~0.78) — solvent-based", source: "Remmers Funcosil SNL" },
        { label: "VOC variant", value: "CONFIRM — 'Funcosil SNL Odourless' exists; confirm correct AU product", source: "Remmers" },
        { label: "Coverage / coats / EN 1504-2", value: "CONFIRM — confirm from the Remmers Funcosil SNL TDS" },
      ],
    },
  },
  {
    brand: "Sika Australia",
    rangeName: "Sika Sikagard-700 S",
    shortType: "Silane/siloxane water-repellent impregnation (1-part)",
    badges: [{ label: "EN 1504-2", tone: "navy" }, { label: "0.30–0.50 kg/m²/coat", tone: "blue" }, { label: "Min 2 coats", tone: "amber" }],
    appInfo: kp([
      "Silane/siloxane water-repellent impregnation (1-part)",
      "Silane/siloxane in organic solvent",
      "CONFIRM active % (Sika PDS)",
      "1-part liquid (organic solvent)",
      "0.30–0.50 kg/m² per coat; minimum 2 coats wet-on-wet",
      "Penetrates open pores; vapour diffusion both ways (breathable)",
      "EN 1504-2 (hydrophobic impregnation, penetration class I)",
      "Absorbent cementitious substrates",
    ]),
    bestFor: [
      "1-part silane/siloxane impregnation, EN 1504-2 hydrophobic impregnation (penetration class I) — penetrates open pores for durable water repellency while remaining vapour-permeable both ways",
      "0.30–0.50 kg/m² per coat; minimum 2 coats wet-on-wet by low-pressure spray, brush or roller",
    ],
    avoidWhere: [
      "Single-coat application — a minimum of 2 coats is required",
      "On a wet substrate or to address cracks / failed joints",
    ],
    warnings: [
      "Apply a minimum of 2 coats wet-on-wet, working bottom-up without runs; solvent-based — confirm SDS / PPE",
      "Confirm active content and current AU pack (20 L / 200 L) from the Sika AU PDS",
    ],
    advanced: {
      description:
        "Sika Sikagard-700 S is a one-part silane/siloxane water-repellent impregnation in organic solvent for absorbent cementitious substrates. It penetrates well into open pores for durable water repellency while still allowing water-vapour diffusion in both directions, and complies with EN 1504-2 for hydrophobic impregnation (penetration depth class I). Coverage 0.30–0.50 kg/m² per coat; a minimum of 2 coats must be applied wet-on-wet by low-pressure spray, brush or roller (bottom-up, no runs). Supplied in 20 L cans / 200 L drums. Confirm active content with the Sika AU PDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "1-part silane/siloxane water-repellent impregnation", source: "Sika Sikagard-700 S PDS" },
        { label: "Coverage", value: "0.30–0.50 kg/m² per coat", source: "Sika Sikagard-700 S PDS" },
        { label: "Coats", value: "Minimum 2 coats, wet-on-wet", source: "Sika Sikagard-700 S PDS" },
        { label: "Standard", value: "EN 1504-2 hydrophobic impregnation (penetration class I)", source: "Sika Sikagard-700 S PDS" },
        { label: "Breathability", value: "Vapour diffusion in both directions", source: "Sika Sikagard-700 S PDS" },
        { label: "Pack", value: "20 L cans / 200 L drums", source: "Sika Sikagard-700 S PDS" },
        { label: "Active content", value: "CONFIRM — % not stated on the cited Sika source" },
      ],
    },
  },
];

export const SILOXANE_SEALER_SELECTORS = [
  { product_id: "stormdry_masonry_protection_cream", category: "penetrating-siloxane-sealer-systems", type: "silane_siloxane_cream", active_pct: null, form: "cream", breathable: true, penetration: "deep", standard: ["BBA_15/5198"], durability_years: 25, substrate: ["brick", "stone", "concrete"], au_distributor: "Safeguard Europe (AU distributor)", source_tds_url: "https://media.safeguardeurope.com/downloads/Datasheets/Stormdry/stormdry-masonry-protection-cream-datasheet.pdf", confidence: "confirmed" },
  { product_id: "remmers_funcosil_snl", category: "penetrating-siloxane-sealer-systems", type: "silane_siloxane_impregnation", active_pct: 7, form: "liquid_solvent", carrier: "dearomatised_hydrocarbon", voc_variant: "snl_odourless", standard: ["WTA"], au_distributor: "Remmers Australia", source_tds_url: "https://en.remmers.com/en_IN/building-floor-protection/refurbishment/facade-refurbishment/impregnating-agent/funcosil-snl/p/000000000000060201", confidence: "confirmed" },
  { product_id: "sika_sikagard_700_s", category: "penetrating-siloxane-sealer-systems", type: "silane_siloxane_impregnation", active_pct: null, form: "liquid_solvent", coverage_kg_m2_per_coat: { min: 0.30, max: 0.50 }, min_coats: 2, standard: ["EN_1504-2_class_I"], breathable: true, pack: ["20L", "200L"], substrate: "absorbent_cementitious", au_distributor: "Sika Australia", source_tds_url: "https://gbr.sika.com/dam/dms/gb01/b/sikagard-700-s.pdf", confidence: "confirmed" },
];
