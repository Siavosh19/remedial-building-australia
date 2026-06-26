// ──────────────────────────────────────────────────────────────────────────────
// Breathable render systems (rising damp — external face). Hand-authored
// selection cards. Values from each product's manufacturer / AU-distributor TDS
// (cited per field). Values not stated on the cited source are written
// "CONFIRM — <field> not stated on <url>"; uncertain AU product names are flagged.
//
// appInfo comparison columns: Type · Binder · Vapour permeability · Application ·
// Coats / build · Standard · Colour / finish · Pack.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Binder", "Vapour permeability", "Application", "Coats / build", "Standard", "Colour / finish", "Pack"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const BREATHABLE_RENDER_CARDS: RefCard[] = [
  {
    brand: "Parex Australia",
    rangeName: "Parex Monorex GM / GF (through-coloured render)",
    shortType: "One-coat through-coloured breathable mineral render",
    badges: [{ label: "EN 998-1", tone: "navy" }, { label: "Through-coloured", tone: "blue" }, { label: "CONFIRM AU name", tone: "rose" }],
    appInfo: kp([
      "One-coat through-coloured decorative mineral render",
      "Hydraulic mortar — cement + lime + siliceous / calcareous sands + mineral pigments",
      "Breathable (vapour-permeable) — CONFIRM µ / Sd value (Parex PDS)",
      "Machine or manual spray (10–12 bar water / 15–16 bar pump) or hand",
      "One-coat decorative render",
      "EN 998-1 (BBA Certificate 21/5888)",
      "48 colours; medium grain (GM) / fine grain (GF)",
      "25 kg bags; 12-month shelf life",
    ]),
    bestFor: [
      "One-coat through-coloured breathable mineral render — economical breathable finish for standard masonry / concrete",
      "EN 998-1, BBA certified, 48 colours, machine-sprayable for larger facades",
    ],
    avoidWhere: [
      "Heritage soft masonry where a lime / silicate render is more compatible",
      "As a substitute for internal WTA renovation plaster — different role in the system",
    ],
    warnings: [
      "CONFIRM current AU product — 'Monorex GT' was not found; current Parex Monorex renders are GM (medium grain) and GF (fine grain) — confirm AU supply with Parex / Sika Australia",
      "Strip old salt-contaminated render to masonry first; do not topcoat with impermeable acrylic paint",
    ],
    advanced: {
      description:
        "Parex Monorex is a through-coloured, one-coat, semi-lightweight, weather-resistant and breathable decorative mineral render for masonry and concrete — a hydraulic mortar of cement, lime, siliceous / calcareous sands, mineral pigments and admixtures. EN 998-1 with BBA Certificate 21/5888; 48 colours; 25 kg bags, 12-month shelf life; machine (10–12 bar water / 15–16 bar pump) or manual application. NOTE: the page name 'Monorex GT' was not located — the current Monorex renders are GM (medium grain) and GF (fine grain). Confirm the correct AU product and the vapour-permeability value with Parex / Sika Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "One-coat through-coloured breathable mineral render", source: "Parex Monorex GM PDS (Jan 2022, v01.01)" },
        { label: "Binder", value: "Hydraulic mortar — cement + lime + siliceous / calcareous sands + pigments", source: "Parex Monorex GM PDS" },
        { label: "Standard", value: "EN 998-1; BBA Certificate 21/5888", source: "Parex Monorex GM PDS" },
        { label: "Colours / finish", value: "48 colours; GM (medium) / GF (fine)", source: "Parex Monorex GM PDS" },
        { label: "Application", value: "Machine spray (10–12 bar water / 15–16 bar pump) or manual", source: "Parex Monorex GM PDS" },
        { label: "Pack / shelf life", value: "25 kg bags; 12 months", source: "Parex Monorex GM PDS" },
        { label: "AU product name", value: "CONFIRM — 'Monorex GT' not found; current = GM / GF (Parex / Sika Australia)" },
        { label: "Vapour permeability", value: "CONFIRM — µ / Sd value not stated on the cited Parex source" },
      ],
    },
  },
  {
    brand: "Keim Australia",
    rangeName: "Keim Universalputz (mineral render)",
    shortType: "Mineral lime-cement render — silicate coating system",
    badges: [{ label: "Mineral", tone: "navy" }, { label: "Breathable", tone: "blue" }, { label: "EN 998-1", tone: "amber" }],
    appInfo: kp([
      "Mineral renovation / thin-layer render",
      "Lime-cement with organic additives + fibre reinforcement",
      "High vapour permeability (mineral) — CONFIRM µ / Sd (Keim TDS)",
      "Manual or machine; coordinated with Keim silicate coatings",
      "Render + Keim silicate topcoat (coordinated system)",
      "EN 998-1",
      "Mineral finish; overcoat with Keim potassium-silicate paint",
      "CONFIRM AU pack (Keim Australia)",
    ]),
    bestFor: [
      "Mineral lime-cement render coordinated with Keim potassium-silicate coatings — high breathability for heritage and damp masonry",
      "Renovation / thin-layer render with fibre reinforcement for masonry and concrete",
    ],
    avoidWhere: [
      "Over acrylic / polymer paints or renders without stripping the existing coating first",
      "Sealed with an impermeable topcoat — defeats the breathable system",
    ],
    warnings: [
      "Use with the coordinated Keim silicate topcoat — do not seal with impermeable paint",
      "CONFIRM the current AU Keim render product and µ / Sd value with Keim Australia",
    ],
    advanced: {
      description:
        "Keim Universalputz is a mineral renovation / thin-layer exterior render based on lime-cement with organic additives and fibre reinforcement, forming a coordinated render / coating system with Keim potassium-silicate coatings. Mineral renders are highly vapour-permeable, suited to heritage and damp masonry that must keep drying. Confirm the current AU Keim render product, the exact vapour-permeability value and pack sizes with Keim Australia.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Mineral renovation / thin-layer render", source: "Keim Universalputz TDS" },
        { label: "Binder", value: "Lime-cement with organic additives + fibre reinforcement", source: "Keim Universalputz TDS" },
        { label: "Standard", value: "EN 998-1", source: "Keim Universalputz TDS" },
        { label: "System", value: "Coordinated with Keim silicate coatings", source: "Keim Universalputz TDS" },
        { label: "Vapour permeability", value: "CONFIRM — µ / Sd value not stated on the cited Keim source" },
        { label: "AU pack", value: "CONFIRM — not stated (Keim Australia)" },
      ],
    },
  },
  {
    brand: "Remmers Australia",
    rangeName: "NHL Lime-Based Breathable Render — CONFIRM Remmers product",
    shortType: "Natural hydraulic lime (NHL) breathable render",
    badges: [{ label: "NHL lime", tone: "navy" }, { label: "Breathable", tone: "blue" }, { label: "CONFIRM product", tone: "rose" }],
    appInfo: kp([
      "Natural hydraulic lime (NHL) render",
      "NHL binder (NHL 2 most breathable → NHL 5 least)",
      "High vapour permeability (lime)",
      "Manual / machine; multi-coat lime render",
      "Multi-coat lime render build",
      "EN 998-1",
      "Mineral / lime finish",
      "CONFIRM AU pack",
    ]),
    bestFor: [
      "NHL lime render — high breathability and compatibility with soft / heritage masonry and lime mortars",
      "Suits the external face in a single-manufacturer WTA rising-damp system",
    ],
    avoidWhere: [
      "Rigid / strong cement renders over soft masonry — incompatible movement and breathability",
      "Sealed with an impermeable paint — keep the system vapour-open",
    ],
    warnings: [
      "CONFIRM the current product — 'Remmers Kalkputz' not confirmed; 'NHL-Kalkputz' is a KEIM product — confirm the correct AU NHL lime render and grade with the manufacturer",
      "Lime renders are multi-coat and slow-curing — confirm coat build, thickness and cure from the manufacturer TDS",
    ],
    advanced: {
      description:
        "Natural hydraulic lime (NHL) renders are highly vapour-permeable, multi-coat lime renders suited to soft / heritage masonry and lime mortars, used on the external face after rising-damp treatment to keep the wall drying. NHL breathability varies with grade (NHL 2 most breathable, NHL 5 least). NOTE: the page name 'Remmers Kalkputz' could not be confirmed and 'NHL-Kalkputz' is a KEIM product — confirm the correct current AU NHL lime render, grade and coat build with the manufacturer.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Natural hydraulic lime (NHL) render", source: "NHL render practice / EN 998-1" },
        { label: "Binder", value: "NHL (NHL 2 most breathable → NHL 5 least)", source: "NHL render practice" },
        { label: "Standard", value: "EN 998-1", source: "EN 998-1" },
        { label: "Product name", value: "CONFIRM — 'Remmers Kalkputz' not confirmed; NHL-Kalkputz is a KEIM product" },
        { label: "Coat build / thickness / pack", value: "CONFIRM — confirm from the manufacturer TDS" },
      ],
    },
  },
];

export const BREATHABLE_RENDER_SELECTORS = [
  { product_id: "parex_monorex", category: "breathable-render-systems", type: "one_coat_mineral_render", binder: "cement_lime_hydraulic", vapour_permeable: true, standard: ["EN_998-1", "BBA_21/5888"], colours: 48, pack_size: "25 kg", au_product_name_confirmed: false, au_distributor: "Parex / Sika Australia", source_tds_url: "https://gbr.sika.com/dms/getdocument.get/8ded63f4-8509-42a0-be93-f7aa8e421af1/parex-monorex-gm.pdf", confidence: "needs_confirmation" },
  { product_id: "keim_universalputz", category: "breathable-render-systems", type: "mineral_render", binder: "lime_cement_fibre", vapour_permeable: true, standard: ["EN_998-1"], coordinated_topcoat: "keim_silicate", pack_size: null, au_distributor: "Keim Australia", source_tds_url: "https://keim-usa.com/wp-content/uploads/2024/07/tds-universalputz-fine-engl-2021.pdf", confidence: "needs_confirmation" },
  { product_id: "nhl_lime_render", category: "breathable-render-systems", type: "nhl_lime_render", binder: "natural_hydraulic_lime", vapour_permeable: true, standard: ["EN_998-1"], product_name_confirmed: false, pack_size: null, au_distributor: "Remmers Australia (confirm)", source_tds_url: "https://www.remmers.com.au", confidence: "needs_confirmation" },
];
