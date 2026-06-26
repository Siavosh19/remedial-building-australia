// ──────────────────────────────────────────────────────────────────────────────
// Positive / negative tanking coatings (basement water ingress). Hand-authored
// selection cards. Values from the manufacturer / AU source (cited per field).
// Values not stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Chemistry · Side · Mix ratio · Coverage ·
// Use · Format · Standard.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Chemistry", "Side", "Mix ratio", "Coverage", "Use", "Format", "Standard"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const POSITIVE_NEGATIVE_TANKING_CARDS: RefCard[] = [
  {
    brand: "Westox",
    rangeName: "Westox CR25",
    shortType: "Latex-modified cementitious tanking coating — positive / negative side",
    badges: [{ label: "Pos / neg side", tone: "navy" }, { label: "Latex-modified", tone: "blue" }, { label: "AU supplier", tone: "amber" }],
    appInfo: kp([
      "Cementitious tanking coating (latex-modified)",
      "Latex (acrylic) emulsion + GP cement (site-gauged)",
      "Positive AND negative side",
      "1 part CR25 : 2 parts GP cement (by volume)",
      "5 L CR25 + 10 L cement ≈ 12.5 m² @ 1 mm",
      "Tanking membrane for walls / slabs; bond coat under render / sheet membrane",
      "5 L / 20 L containers",
      "CONFIRM hydrostatic-pressure rating (Westox TDS)",
    ]),
    bestFor: [
      "Latex-modified cementitious tanking for positive OR negative side — also bonds render to high-strength / non-porous concrete and eliminates render slide",
      "Australian-supplied; gauged 1:2 with GP cement; ≈12.5 m² per 5 L + 10 L cement at 1 mm",
    ],
    avoidWhere: [
      "Over active running water — plug leaks with hydraulic cement first",
      "Structures subject to significant structural movement",
    ],
    warnings: [
      "Confirm the negative-side hydrostatic-pressure rating, primer and surface preparation from the Westox CR25 TDS",
      "For tanking to be rendered over: confirm the third CR25/cement bond coat + wet-on-wet render scratch-coat sequence per the TDS",
    ],
    advanced: {
      description:
        "Westox CR25 is a latex (acrylic) emulsion used with GP cement as a tanking membrane for internal and external walls and to provide a sealed surface on concrete under a sheet membrane — usable for both positive- and negative-side waterproofing. It also bonds render to high-strength / non-porous concrete and eliminates render slide. Mix 1 part CR25 to 2 parts GP cement by volume; 5 L CR25 + 10 L cement gives ≈12.5 m² at 1 mm. Available in 5 L and 20 L. Stop active water (hydraulic plug) first; confirm the negative-side hydrostatic rating and the render sequence from the Westox CR25 TDS.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Latex-modified cementitious tanking coating", source: "westox.com — CR25 (TDS 2023)" },
        { label: "Side", value: "Positive and negative", source: "westox.com — CR25" },
        { label: "Mix ratio", value: "1 part CR25 : 2 parts GP cement (by volume)", source: "westox.com — CR25" },
        { label: "Coverage", value: "5 L CR25 + 10 L cement ≈ 12.5 m² @ 1 mm", source: "westox.com — CR25" },
        { label: "Format", value: "5 L / 20 L containers", source: "westox.com — CR25" },
        { label: "Hydrostatic rating", value: "CONFIRM — pressure rating not stated on the cited Westox source" },
      ],
    },
  },
];

export const POSITIVE_NEGATIVE_TANKING_SELECTORS = [
  { product_id: "westox_cr25", category: "positive-negative-tanking-coatings", type: "cementitious_tanking_latex", chemistry: "latex_cement", side: "both", mix_cr25_cement: "1:2", coverage_m2_per_5l_kit: 12.5, coverage_thickness_mm: 1, format: ["5L", "20L"], au_distributor: "Westox / Westlegate Pty Ltd", source_tds_url: "https://westox.com/product/cr25-positive-negative-waterproofing-coating/", confidence: "confirmed" },
];
