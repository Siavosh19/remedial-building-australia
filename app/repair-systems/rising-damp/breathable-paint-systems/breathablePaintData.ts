// ──────────────────────────────────────────────────────────────────────────────
// Breathable paint systems (rising damp — final topcoat). Hand-authored selection
// cards. Values from each product's manufacturer / AU source (cited per field).
// Values not stated on the cited source are written "CONFIRM — <field> not stated
// on <url>"; uncertain AU product names and breathability claims are flagged.
//
// appInfo comparison columns: Type · Binder · Sd value (vapour) · Substrate ·
// Coats · Standard · Finish / colour · Pack.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Binder", "Sd value (vapour)", "Substrate", "Coats", "Standard", "Finish / colour", "Pack"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const BREATHABLE_PAINT_CARDS: RefCard[] = [
  {
    brand: "Keim Australia",
    rangeName: "Keim Granital",
    shortType: "Potassium-silicate mineral exterior paint",
    badges: [{ label: "Sd ≤ 0.01 m", tone: "navy" }, { label: "Mineral silicate", tone: "blue" }, { label: "Highly breathable", tone: "amber" }],
    appInfo: kp([
      "Mineral exterior paint (sol-silicate)",
      "Potassium silicate (sol-silicate)",
      "Sd ≤ 0.01 m; vapour diffusion ≥ 2000 g/(m²·d) — extremely vapour-permeable",
      "Mineral substrates (render, masonry, mineral coatings)",
      "CONFIRM coats (Keim Granital TDS)",
      "EN 1062 — CONFIRM class",
      "Matt mineral finish; wide colour range",
      "CONFIRM AU pack (Keim Australia)",
    ]),
    bestFor: [
      "Sd ≤ 0.01 m — among the most vapour-permeable masonry paints; ideal over breathable mineral / lime render on a drying wall",
      "Potassium-silicate paint silicifies (chemically bonds) to mineral substrates rather than forming a film — durable, mineral-matt, water-repellent",
    ],
    avoidWhere: [
      "Over acrylic / organic paints or non-mineral substrates without the correct Keim primer system",
      "On a wall with active rising damp / early drying — let the renovation-plaster system manage salts first",
    ],
    warnings: [
      "Mineral silicate paint — apply only on mineral substrates with the coordinated Keim primer; confirm substrate, coats and EN 1062 class from the Keim Granital TDS",
      "Highly alkaline during application — mask glass / metal / timber; follow Keim H&S guidance",
    ],
    advanced: {
      description:
        "Keim Granital is a high-quality potassium-silicate (sol-silicate) mineral exterior paint with a diffusion-equivalent air-layer thickness Sd ≤ 0.01 m and water-vapour diffusion ≥ 2000 g/(m²·d) — among the most vapour-permeable masonry paints — combined with high water repellency. It silicifies (chemically bonds) to mineral substrates rather than forming a film, giving a durable, matt mineral finish. It is the technically superior breathable topcoat over breathable mineral / lime render on a drying rising-damp wall. Confirm coats, EN 1062 class and AU pack with Keim Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Potassium-silicate (sol-silicate) mineral paint", source: "Keim Granital TDS" },
        { label: "Sd value", value: "≤ 0.01 m (vapour diffusion ≥ 2000 g/(m²·d))", source: "Keim Granital TDS" },
        { label: "Substrate", value: "Mineral substrates (render, masonry, mineral coatings)", source: "Keim Granital TDS" },
        { label: "Water repellency", value: "Highly water-repellent", source: "Keim Granital TDS" },
        { label: "Coats / EN 1062 class", value: "CONFIRM — not stated on the cited Keim source" },
        { label: "AU pack", value: "CONFIRM — not stated (Keim Australia)" },
      ],
    },
  },
  {
    brand: "Tikkurila Australia",
    rangeName: "Tikkurila Finngard Silicate Solid",
    shortType: "Waterborne silicate facade paint",
    badges: [{ label: "Silicate", tone: "navy" }, { label: "Vapour-permeable", tone: "blue" }, { label: "CONFIRM AU name", tone: "rose" }],
    appInfo: kp([
      "Waterborne silicate facade paint",
      "Silicate (potassium silicate) binder",
      "Vapour-permeable (high) — CONFIRM Sd value (Tikkurila TDS)",
      "Lime-cement / lime plaster, silicate & mineral-polymer plaster, sand-lime brick, concrete",
      "CONFIRM coats (Tikkurila TDS)",
      "EN 1062 — CONFIRM class",
      "Matt facade finish; tintable",
      "CONFIRM AU pack (Tikkurila)",
    ]),
    bestFor: [
      "Waterborne silicate facade paint — vapour-permeable, for lime-cement and mineral renders on drying masonry",
      "Hydrophobic / low water absorption combined with high vapour permeability",
    ],
    avoidWhere: [
      "Over organic / acrylic coatings without preparation — silicate paints need mineral substrates",
      "On a wall with active rising damp / early drying",
    ],
    warnings: [
      "CONFIRM the current AU product — page name 'Silora' not confirmed; the current Tikkurila silicate facade paint is Finngard Silicate Solid (silicone option: Finngard Silicone Protect) — confirm with Tikkurila Australia",
      "Confirm Sd value, coats and EN 1062 class from the Tikkurila TDS",
    ],
    advanced: {
      description:
        "Tikkurila Finngard Silicate Solid is a waterborne silicate facade paint for traditional lime-cement and lime plasters, thin-layer silicate and mineral-polymer plasters, sand-lime brick and concrete. It is a vapour-permeable coating that allows moisture to leave the wall while remaining hydrophobic with low water absorption. NOTE: the page name 'Silora' was not confirmed — the current Tikkurila silicate facade paint is Finngard Silicate Solid (a silicone-emulsion option is Finngard Silicone Protect). Confirm the AU product, Sd value, coats and pack with Tikkurila Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Waterborne silicate facade paint", source: "Tikkurila Finngard Silicate Solid (tikkurila.com)" },
        { label: "Substrate", value: "Lime-cement / lime plaster, silicate & mineral-polymer plaster, sand-lime brick, concrete", source: "Tikkurila Finngard Silicate Solid" },
        { label: "Breathability", value: "Vapour-permeable; hydrophobic / low water absorption", source: "Tikkurila Finngard Silicate Solid" },
        { label: "AU product name", value: "CONFIRM — 'Silora' not confirmed; current = Finngard Silicate Solid (Tikkurila Australia)" },
        { label: "Sd value / coats / pack", value: "CONFIRM — not stated on the cited Tikkurila source" },
      ],
    },
  },
  {
    brand: "Dulux Australia",
    rangeName: "Dulux Weathershield (acrylic — not a mineral breathable paint)",
    shortType: "Acrylic exterior masonry paint — limited breathability",
    badges: [{ label: "Acrylic", tone: "navy" }, { label: "Sd not published", tone: "rose" }, { label: "Not for damp walls", tone: "rose" }],
    appInfo: kp([
      "Acrylic exterior masonry paint",
      "Acrylic (organic binder)",
      "Sd NOT published — lower vapour permeability than silicate paints",
      "Masonry, brick, concrete, render, fibre cement, timber",
      "CONFIRM coats (Dulux AU TDS)",
      "AS/NZS 2311 — CONFIRM",
      "Wide colour range; low sheen",
      "Various pack sizes (Dulux AU)",
    ]),
    bestFor: [
      "Widely available Australian exterior masonry paint with a long weathering warranty (per the Dulux DuSpec specification)",
    ],
    avoidWhere: [
      "Over walls still drying after rising-damp treatment, or lime / heritage masonry — Dulux does not publish an Sd value and does not recommend its paints for lime plaster",
      "Where genuine high breathability is required — acrylic 'micro-porous' paints are not vapour-open like a silicate paint",
    ],
    warnings: [
      "NOT a mineral / silicate breathable paint — for genuine breathability over a drying rising-damp wall use a silicate paint (Keim Granital, Tikkurila Finngard Silicate); acrylic micro-porous paints can trap moisture and blister on damp masonry",
      "Confirm any vapour-permeability data and suitability for the drying stage directly with Dulux before specifying on a rising-damp wall",
    ],
    advanced: {
      description:
        "Dulux Weathershield is a standard acrylic exterior masonry paint (masonry, brick, concrete, render, fibre cement, timber) with a long weathering warranty under the Dulux DuSpec specification. Dulux markets it as micro-porous / breathable, but it is an organic acrylic film, Dulux does not publish an Sd value, and technical guidance is that general-purpose masonry paints like Weathershield are not genuinely breathable and are not recommended for lime / heritage masonry. For a drying rising-damp wall, a mineral silicate paint (Keim Granital, Tikkurila Finngard Silicate) is the correct choice. Confirm any vapour-permeability data with Dulux.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Acrylic exterior masonry paint", source: "Dulux Weathershield (dulux.com.au)" },
        { label: "Substrate", value: "Masonry, brick, concrete, render, fibre cement, timber", source: "Dulux Weathershield AU datasheet" },
        { label: "Sd value", value: "CONFIRM — not published by Dulux; lower than silicate paints" },
        { label: "Breathability", value: "Marketed micro-porous; not a genuine mineral breathable paint — caution on rising-damp walls", source: "Dulux / heritage coating guidance" },
        { label: "Coats / standard / pack", value: "CONFIRM — confirm from the Dulux AU TDS" },
      ],
    },
  },
];

export const BREATHABLE_PAINT_SELECTORS = [
  { product_id: "keim_granital", category: "breathable-paint-systems", type: "mineral_silicate_paint", binder: "potassium_silicate", sd_m: 0.01, sd_basis: "max", vapour_diffusion_g_m2d: 2000, substrate: "mineral_only", standard: ["EN_1062"], au_distributor: "Keim Australia", source_tds_url: "https://www.keim.com/documents/en-DE/723/TM_Granital_EN-DE.pdf", confidence: "confirmed" },
  { product_id: "tikkurila_finngard_silicate_solid", category: "breathable-paint-systems", type: "silicate_paint", binder: "potassium_silicate", sd_m: null, substrate: "mineral_lime_concrete", standard: ["EN_1062"], au_product_name_confirmed: false, au_distributor: "Tikkurila Australia", source_tds_url: "https://tikkurila.com/pro/products/finngard-silicate-solid", confidence: "needs_confirmation" },
  { product_id: "dulux_weathershield", category: "breathable-paint-systems", type: "acrylic_masonry_paint", binder: "acrylic", sd_m: null, sd_published: false, genuinely_breathable: false, substrate: "general_masonry", standard: ["AS/NZS_2311"], au_distributor: "Dulux Australia", source_tds_url: "https://www.dulux.com.au/paint/weathershield/", confidence: "needs_confirmation" },
];
