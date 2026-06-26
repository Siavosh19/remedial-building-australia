// ──────────────────────────────────────────────────────────────────────────────
// Moisture suppression primers (basement water ingress). Hand-authored selection
// cards. Values from the manufacturer / AU source (cited per field). Values not
// stated → "CONFIRM — <field> not stated on <url>".
//
// appInfo comparison columns: Type · Chemistry · DFT · Substrate moisture · Role ·
// VOC / odour · Cure · Standard.
// ──────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";

const KEYS = ["Type", "Chemistry", "DFT", "Substrate moisture", "Role", "VOC / odour", "Cure", "Standard"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));

export const MOISTURE_SUPPRESSION_CARDS: RefCard[] = [
  {
    brand: "Fosroc / Parchem",
    rangeName: "Fosroc Nitoproof 510",
    shortType: "Two-component epoxy moisture-barrier coating (primer course)",
    badges: [{ label: "2-part epoxy", tone: "navy" }, { label: "300 µm DFT", tone: "blue" }, { label: "Damp-tolerant", tone: "amber" }],
    appInfo: kp([
      "Two-component epoxy moisture-barrier coating (primer course)",
      "Water-borne epoxy (solvent-free)",
      "300 µm DFT — moisture barrier",
      "Compatible with damp substrates (not running / pooled water)",
      "Primer / moisture barrier before a waterproofing system — not standalone waterproofing",
      "Very low VOC; very low odour; anti-microbial",
      "Touch-dry 2 h; hard cure 24 h; full cure 7 days (20 °C)",
      "CONFIRM standard (Fosroc AU TDS)",
    ]),
    bestFor: [
      "Water-borne 2-part epoxy that restricts dampness through concrete / masonry at 300 µm DFT — compatible with damp substrates where dry-substrate primers fail",
      "Solvent-free, very low VOC, very low odour and anti-microbial — suited to enclosed basements / occupied buildings; bonds to concrete, brick, block, compressed FC, stone and timber",
    ],
    avoidWhere: [
      "As a standalone waterproofing product — it is a primer / moisture-barrier course before a membrane or tanking system",
      "Over running or pooled water — stop active water (hydraulic plug / injection) first",
    ],
    warnings: [
      "Confirm allowable substrate moisture content and the compatible Fosroc waterproofing / tanking system with Parchem before specifying",
      "Apply at 300 µm DFT — confirm coverage and recoat windows from the current Fosroc AU TDS",
    ],
    advanced: {
      description:
        "Fosroc Nitoproof 510 is a grey, two-component, water-borne epoxy moisture-barrier coating that, at 300 µm dry film thickness, restricts the passage of dampness through concrete and masonry substrates. It is solvent-free with very low VOC and odour, anti-microbial, compatible with damp substrates, and adheres to concrete, brick, masonry, block, compressed fibre board, stone and timber — for interior faces of basement walls / floors, tunnels, cellars, retaining walls, lift wells and underground carparks. Cure (23 °C / 50% RH): touch-dry 2 h, hard cure 24 h, full cure 7 days at 20 °C. It is a primer / moisture-barrier course, not a standalone waterproofing system. Confirm substrate moisture limits and the compatible Fosroc system with Parchem.",
      designCriteria: "",
      techData: [
        { label: "Type", value: "Two-component water-borne epoxy moisture-barrier coating", source: "Fosroc Nitoproof 510 TDS (AU, Oct 2019; Parchem)" },
        { label: "DFT", value: "300 µm (moisture barrier)", source: "Fosroc Nitoproof 510 TDS" },
        { label: "Substrate", value: "Compatible with damp substrates; concrete, brick, masonry, block, FC, stone, timber", source: "Fosroc Nitoproof 510 TDS" },
        { label: "VOC / odour", value: "Solvent-free; very low VOC; very low odour; anti-microbial", source: "Fosroc Nitoproof 510 TDS" },
        { label: "Cure", value: "Touch-dry 2 h; hard 24 h; full 7 days (20 °C)", source: "Fosroc Nitoproof 510 TDS" },
        { label: "Role", value: "Primer / moisture barrier before waterproofing — not standalone", source: "Fosroc Nitoproof 510 TDS" },
        { label: "Substrate moisture limit", value: "CONFIRM — exact % not stated on the cited Fosroc source" },
      ],
    },
  },
];

export const MOISTURE_SUPPRESSION_SELECTORS = [
  { product_id: "fosroc_nitoproof_510", category: "moisture-suppression-primers", type: "epoxy_moisture_barrier", chemistry: "waterborne_epoxy_2k", dft_um: 300, damp_tolerant: true, role: "primer_moisture_barrier", voc: "very_low", anti_microbial: true, cure_full_days: 7, au_distributor: "Parchem (Fosroc)", source_tds_url: "https://www.fosroc.com.au/sites/default/files/products_file_storage/Fosroc_Nitoproof_510_TDS.pdf", confidence: "confirmed" },
];
