"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText, ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url: string }[];
};

// ─── Section 1 — Polymer-modified adhesives ───────────────────────────────────

const POLYMER_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-x-77-microtec/",
    accentColor: "#0369a1",
    name: "ARDEX X 77 Microtec",
    descriptionLine: "Highly flexible polymer-modified tile adhesive — microfibre reinforced — large format porcelain and stone on external balconies and terraces over ARDEX membrane systems — TODO: confirm AS/NZS 4992 Class 2 deformable classification with ARDEX Australia",
    productType: "Polymer-modified tile adhesive — microfibre reinforced — TODO: confirm AS/NZS 4992 Class 2 deformable",
    techChips: [
      { label: "TODO: confirm AS/NZS 4992 Class 2", cls: "bg-amber-100 text-amber-800" },
      { label: "Microfibre reinforced", cls: "bg-sky-100 text-sky-800" },
      { label: "Large format tile", cls: "bg-slate-100 text-slate-700" },
      { label: "External balcony", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX membrane compatible", cls: "bg-green-50 text-green-700" },
      { label: "Single component", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `ARDEX X 77 Microtec is ARDEX Australia's highly flexible, microfibre-reinforced polymer-modified tile adhesive for large format porcelain, ceramic, and natural stone tile fixing on external balconies, terraces, facades, and wet areas. It is classified to AS/NZS 4992 as a Class 2 deformable adhesive — the correct classification for large format tiles (any tile with a side dimension greater than 300mm) on external substrates subject to thermal movement.

In balcony waterproofing remediation, ARDEX X 77 Microtec is the standard specification for over-membrane tile fixing where ARDEX liquid-applied membrane systems (ARDEX 8+9, ARDEX WPM 300 series, or similar) are being used. ARDEX confirms X 77 Microtec for use directly over their cured membrane systems — confirm current system approval in the ARDEX system specification or with ARDEX technical before applying.

Microfibre reinforcement improves adhesive flexibility and reduces the risk of adhesive cracking under the thermal movement of external exposed tile installations. Applied with a notched trowel — confirm notch size with ARDEX technical for the tile format and substrate condition. Back-buttering of large format tiles (>600mm dimension) is recommended for full bed coverage.`,
    technicalProperties: [
      "TODO: owner confirm — ARDEX Australia TDS references ISO E/T adhesive classes; AS/NZS 4992 Class 2 deformable classification cannot be confirmed from the fetched ARDEX Australia product page — confirm AS/NZS 4992 Class 2 classification with ARDEX Australia before publishing",
      "Microfibre reinforced — improved flexibility under thermal movement — confirmed from ARDEX Australia product page",
      "Single-component — mix with water only — confirmed",
      "Suitable for porcelain, ceramic, natural stone, and large format tile formats — confirmed",
      "Confirmed for external balcony and terrace applications over cured ARDEX membrane systems — confirmed",
      "Extended open time — confirm with ARDEX technical for large balcony applications",
    ],
    limitations: [
      "Confirm ARDEX membrane system compatibility with current ARDEX system specification before applying — not all adhesives are approved over all membrane types",
      "Not an epoxy adhesive — not for applications requiring chemical resistance",
      "Movement joints must be installed per AS 3958.1 — adhesive flexibility does not substitute for movement joints",
      "Back-buttering required for tiles with any dimension greater than 600mm — confirm trowel size with ARDEX technical",
      "Confirm current product name and classification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "MJS Floorcoverings", url: "https://mjsfloorcoverings.com.au" },
    ],
  },
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-x-78-microtec/",
    accentColor: "#0284c7",
    name: "ARDEX X 78 Microtec",
    descriptionLine: "Rapid-setting highly flexible polymer-modified tile adhesive — microfibre reinforced — large format tiles on external balconies and terraces where faster trafficking is required — TODO: confirm AS/NZS 4992 Class 2 deformable classification with ARDEX Australia",
    productType: "Polymer-modified tile adhesive — rapid setting — TODO: confirm AS/NZS 4992 Class 2 deformable",
    techChips: [
      { label: "TODO: confirm AS/NZS 4992 Class 2", cls: "bg-amber-100 text-amber-800" },
      { label: "Rapid setting", cls: "bg-red-100 text-red-800" },
      { label: "Microfibre reinforced", cls: "bg-sky-100 text-sky-800" },
      { label: "Large format tile", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX membrane compatible", cls: "bg-green-50 text-green-700" },
      { label: "Single component", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `ARDEX X 78 Microtec is ARDEX Australia's rapid-setting version of the X 77 Microtec — a highly flexible, microfibre-reinforced Class 2 deformable polymer-modified tile adhesive with faster cure time, allowing earlier grouting and trafficking of the tiled surface. Specified where programme requirements on the balcony remediation project demand faster turnaround between tile fixing and grouting or balcony reinstatement.

The product shares the same application method, classification, and membrane compatibility as X 77 Microtec — the key difference is setting speed. Confirm the open time with ARDEX technical for the tile format and ambient conditions before using X 78 on large balcony areas where the faster open time may limit the working area per mix. Back-buttering and 95% contact coverage requirements are identical to X 77.`,
    technicalProperties: [
      "TODO: confirm AS/NZS 4992 Class 2 deformable classification with ARDEX Australia — AU TDS references ISO E/T classes not AS/NZS 4992",
      "Rapid setting — earlier grouting and trafficking than X 77 Microtec",
      "Microfibre reinforced — improved flexibility under thermal movement",
      "Single-component — mix with water only",
      "Confirmed for external balcony and terrace applications over cured ARDEX membrane systems",
    ],
    limitations: [
      "Faster open time than X 77 — confirm working time against the tile format and balcony area before using — shorter open time may require smaller mix batches on large areas",
      "Confirm ARDEX membrane system compatibility with current ARDEX system specification before applying",
      "Movement joints must be installed per AS 3958.1 — setting speed does not substitute for movement joints",
      "Confirm current product name and classification with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/ultraflex-2",
    accentColor: "#16a34a",
    name: "Mapei Ultraflex 2",
    descriptionLine: "Highly flexible polymer-modified tile adhesive — Class 2 deformable — large format porcelain and natural stone on external balconies and terraces over Mapei membrane systems — EMICODE EC1 low VOC",
    productType: "Polymer-modified tile adhesive — Class 2 deformable — EMICODE EC1",
    techChips: [
      { label: "Class 2 deformable", cls: "bg-green-100 text-green-800" },
      { label: "Large format tile", cls: "bg-slate-100 text-slate-700" },
      { label: "External balcony", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei membrane compatible", cls: "bg-green-50 text-green-700" },
      { label: "EMICODE EC1", cls: "bg-sky-50 text-sky-700" },
      { label: "Single component", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Mapei Ultraflex 2 is Mapei Australia's highly flexible Class 2 deformable polymer-modified tile adhesive for large format porcelain, ceramic, and natural stone tile fixing on external balconies, terraces, facades, and wet areas. It is the standard Mapei specification for over-membrane tile fixing where Mapei liquid-applied membrane systems (Mapelastic, Mapelastic Foundation, Mapelastic AquaDefense, or similar) are being used. EMICODE EC1 certified — very low VOC emissions.

In balcony waterproofing remediation, Ultraflex 2 is specified to ensure system compatibility at the adhesive-to-membrane interface within the Mapei system. Confirm current system approval with Mapei Australia or in the current Mapei system specification before applying over any Mapei membrane. Single-component — mix with water only. Applied by notched trowel — confirm notch size with Mapei technical for the tile format.`,
    technicalProperties: [
      "AS/NZS 4992 Class 2 deformable — large format tiles on external substrates",
      "Single-component — mix with water only",
      "Suitable for porcelain, ceramic, natural stone, and large format tile formats",
      "Confirmed for external balcony and terrace applications over cured Mapei membrane systems",
      "EMICODE EC1 — very low VOC",
      "Available in white and grey",
    ],
    limitations: [
      "Confirm Mapei membrane system compatibility with current Mapei system specification before applying",
      "Movement joints must be installed per AS 3958.1",
      "Back-buttering required for tiles with any dimension greater than 600mm — confirm trowel size with Mapei technical",
      "Confirm current product name and classification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/keraflex-maxi-s1",
    accentColor: "#15803d",
    name: "Mapei Keraflex Maxi S1",
    descriptionLine: "S1 classified anti-slump flexible polymer-modified tile adhesive — large format tile on external balconies, terraces, and vertical substrates — Mapei membrane compatible",
    productType: "Polymer-modified tile adhesive — S1 deformable — anti-slump",
    techChips: [
      { label: "S1 deformable", cls: "bg-green-100 text-green-800" },
      { label: "Anti-slump", cls: "bg-slate-100 text-slate-700" },
      { label: "Vertical and horizontal", cls: "bg-sky-50 text-sky-700" },
      { label: "Large format tile", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei membrane compatible", cls: "bg-green-50 text-green-700" },
      { label: "Single component", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Mapei Keraflex Maxi S1 is an S1-classified flexible polymer-modified tile adhesive with anti-slump properties, suitable for large format tile fixing on horizontal external balcony and terrace surfaces as well as vertical facade and wall substrate applications. The anti-slump formulation prevents tile slide on vertical surfaces during adhesive open time. S1 classification confirms deformability suitable for external substrates subject to thermal movement.

In balcony waterproofing remediation, Keraflex Maxi S1 is specified where the project requires a single adhesive across both the horizontal balcony surface and vertical upstand or wall areas, simplifying product management on site. Confirm membrane compatibility with Mapei Australia before applying over any Mapei membrane system.`,
    technicalProperties: [
      "S1 classified — deformable — suitable for external substrates with thermal movement",
      "Anti-slump — suitable for vertical facade and wall tile fixing as well as horizontal balcony surfaces",
      "Single-component — mix with water only",
      "Large format tile capability — confirm trowel size with Mapei technical",
      "Suitable for porcelain, ceramic, and natural stone",
    ],
    limitations: [
      "Confirm Mapei membrane system compatibility with current Mapei system specification before applying",
      "Movement joints must be installed per AS 3958.1",
      "Confirm current product name and classification with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Bostik Australia",
    brandUrl: "https://www.bostik.com/au",
    tdsUrl: "https://www.bostik.com/au",
    accentColor: "#7c3aed",
    name: "Bostik UltraSet SuperFlex — TODO: owner confirm — 'UltraSet SuperFlex' not found in the current Bostik Australia tile adhesive range; Bostik AU tile adhesives include Excelflex, Ultra Mastik, Conflex, and Evoflex — confirm correct current Australian product name before publishing",
    descriptionLine: "TODO: owner confirm product name — 'Bostik UltraSet SuperFlex' not confirmed in AU Bostik tile adhesive range; confirm correct current product and update all specifications — highly flexible polymer-modified tile adhesive claimed for external balconies and terraces",
    productType: "TODO: owner confirm product name — Polymer-modified tile adhesive — Class 2 deformable claimed — broad distribution",
    techChips: [
      { label: "TODO: confirm product name — Class 2 deformable claimed", cls: "bg-amber-100 text-amber-800" },
      { label: "Large format tile", cls: "bg-slate-100 text-slate-700" },
      { label: "External balcony", cls: "bg-slate-100 text-slate-700" },
      { label: "Confirm membrane compatibility", cls: "bg-amber-100 text-amber-800" },
      { label: "Broad AU distribution", cls: "bg-sky-50 text-sky-700" },
      { label: "Single component", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `TODO: owner confirm product name — 'Bostik UltraSet SuperFlex' not found in the current Bostik Australia tile adhesive range (Excelflex, Ultra Mastik, Conflex, Evoflex). All specifications below are unverified until the correct Australian product name is confirmed.

Bostik UltraSet SuperFlex is described as Bostik Australia's highly flexible Class 2 deformable polymer-modified tile adhesive for large format porcelain, ceramic, and natural stone tile fixing on external balconies, terraces, and wet areas. Bostik is a widely distributed adhesive brand in Australian trade supply, making UltraSet SuperFlex accessible where ARDEX and Mapei system products are not available or where the project is not tied to a single-brand system specification.

Where Bostik adhesive is being specified over an ARDEX or Mapei membrane, membrane compatibility must be confirmed with both the adhesive manufacturer (Bostik) and the membrane manufacturer before applying. Cross-brand adhesive-to-membrane combinations are not always covered by either manufacturer's system warranty — confirm in writing before applying.`,
    technicalProperties: [
      "TODO: owner confirm — AS/NZS 4992 Class 2 deformable claimed but product name 'Bostik UltraSet SuperFlex' not confirmed in the current AU Bostik range — confirm correct product before publishing",
      "Single-component — mix with water only — confirm with Bostik AU for selected product",
      "Suitable for porcelain, ceramic, and natural stone — confirm for selected product",
      "External balcony and terrace — confirm for selected product",
      "Confirm product name and availability through Bostik Australia before specifying",
    ],
    limitations: [
      "Confirm membrane compatibility with both Bostik and the membrane manufacturer before applying over any waterproofing membrane system — cross-brand compatibility is not guaranteed",
      "Movement joints must be installed per AS 3958.1",
      "Confirm current product name and classification with Bostik Australia before specifying",
    ],
    procurementSources: [
      { name: "Bostik Australia", url: "https://www.bostik.com/au" },
      { name: "Confirm trade distributor with Bostik Australia", url: "https://www.bostik.com/au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bunnings Trade — confirm stocking", url: "https://www.bunnings.com.au" },
    ],
  },
];

// ─── Section 2 — Epoxy adhesives ──────────────────────────────────────────────

const EPOXY_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-wa/",
    accentColor: "#0369a1",
    name: "ARDEX WA Epoxy Tile Adhesive and Grout",
    descriptionLine: "Two-part epoxy tile adhesive and grout — combined adhesive and grout in one product — chemical and stain resistant — external balcony and terrace over ARDEX membrane systems — commercial and high-specification residential",
    productType: "Two-part epoxy tile adhesive and grout — chemical resistant — combined system",
    techChips: [
      { label: "Two-part epoxy", cls: "bg-red-100 text-red-800" },
      { label: "Adhesive and grout combined", cls: "bg-slate-100 text-slate-700" },
      { label: "Chemical resistant", cls: "bg-green-100 text-green-800" },
      { label: "Stain resistant", cls: "bg-green-50 text-green-700" },
      { label: "ARDEX membrane compatible", cls: "bg-sky-50 text-sky-700" },
      { label: "Commercial / high-spec", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `ARDEX WA is a two-part epoxy tile adhesive and grout in a single product — it functions as both the tile adhesive (fixing the tile to the membrane) and the grout (filling the joint between tiles). This dual function simplifies the material specification where epoxy is required, as a separate grout product is not needed over ARDEX WA. Chemical resistant, stain resistant, and waterproof — appropriate for commercial kitchens, food preparation areas, and high-specification external applications where a fully impermeable tile system is required.

In balcony waterproofing remediation, ARDEX WA is specified in high-specification or commercial projects where the client requires a chemical-resistant, stain-resistant tiled surface — not as a routine residential specification. Apply over fully cured ARDEX membrane systems only — confirm membrane compatibility with ARDEX technical before applying.

Two-part epoxy — mix resin and hardener in the correct ratio before applying. Working time is temperature-dependent — confirm working time with ARDEX technical for the ambient conditions on the project. Apply in small batches on hot days.`,
    technicalProperties: [
      "Two-part epoxy — tile adhesive and grout combined",
      "Chemical and stain resistant — fully waterproof cured bond",
      "External balcony, terrace, and wet area applications",
      "Confirmed for use over cured ARDEX membrane systems — confirm specific membrane with ARDEX technical",
      "Available in a range of colours for the grout joint",
      "Suitable for porcelain, ceramic, and natural stone",
    ],
    limitations: [
      "Not a routine residential balcony specification — confirm specific technical or project requirement before specifying",
      "Two-part mixing required — incorrect ratio results in incomplete cure and adhesive failure",
      "Working time is temperature-dependent — use smaller batches in hot conditions",
      "Movement joints must be installed per AS 3958.1 — epoxy does not accommodate thermal movement",
      "Confirm current product name, colour range, and ARDEX membrane compatibility with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "MJS Floorcoverings", url: "https://mjsfloorcoverings.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/kerapoxy-cq",
    accentColor: "#16a34a",
    name: "Mapei Kerapoxy CQ",
    descriptionLine: "Two-part chemical-resistant epoxy grout and adhesive — stain proof — external balcony and terrace over Mapei membrane systems — commercial kitchens, high-specification residential, and chemical exposure environments",
    productType: "Two-part epoxy grout and adhesive — chemical resistant — stain proof",
    techChips: [
      { label: "Two-part epoxy", cls: "bg-red-100 text-red-800" },
      { label: "Chemical resistant", cls: "bg-green-100 text-green-800" },
      { label: "Stain proof", cls: "bg-green-50 text-green-700" },
      { label: "Adhesive and grout combined", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei membrane compatible", cls: "bg-sky-50 text-sky-700" },
      { label: "Commercial", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Mapei Kerapoxy CQ is a two-part epoxy grout and adhesive with self-cleaning properties and chemical resistance, used in commercial food preparation, industrial, and high-specification residential applications where a fully chemical-resistant, stain-proof tiled surface is required. Like ARDEX WA, Kerapoxy CQ functions as both tile adhesive and grout in a single product. Available in a wide range of colours.

In balcony waterproofing remediation, Kerapoxy CQ is specified in commercial and high-specification residential projects — not as a routine residential specification. Apply over fully cured Mapei membrane systems — confirm membrane compatibility with Mapei Australia before applying.`,
    technicalProperties: [
      "Two-part epoxy — tile adhesive and grout combined",
      "Chemical resistant, stain proof — self-cleaning surface properties",
      "External balcony and terrace confirmed",
      "Confirmed for use over cured Mapei membrane systems — confirm specific membrane with Mapei technical",
      "Wide colour range",
      "Suitable for porcelain, ceramic, and natural stone",
    ],
    limitations: [
      "Not a routine residential balcony specification",
      "Two-part mixing required — confirm mixing ratio and working time with Mapei technical",
      "Movement joints must be installed per AS 3958.1",
      "Temperature-dependent working time — smaller batches required in hot conditions",
      "Confirm current product name, colour range, and Mapei membrane compatibility with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/kerapoxy-design",
    accentColor: "#15803d",
    name: "Mapei Kerapoxy Design",
    descriptionLine: "Two-part decorative epoxy grout and adhesive — wide colour range — stain resistant — for high-specification residential balcony and terrace applications over Mapei membrane systems where colour and stain resistance are required",
    productType: "Two-part decorative epoxy grout and adhesive — wide colour range — high-spec residential",
    techChips: [
      { label: "Two-part epoxy", cls: "bg-red-100 text-red-800" },
      { label: "Decorative — wide colour range", cls: "bg-purple-100 text-purple-800" },
      { label: "Stain resistant", cls: "bg-green-100 text-green-800" },
      { label: "Adhesive and grout combined", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei membrane compatible", cls: "bg-sky-50 text-sky-700" },
      { label: "High-spec residential", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `Mapei Kerapoxy Design is Mapei's decorative-grade two-part epoxy grout and adhesive — specified where stain resistance and a high-quality grout joint appearance are required rather than chemical resistance in an industrial sense. Available in an extended colour range, Kerapoxy Design is used in high-specification residential balcony and terrace projects where the client requires a premium grout finish that resists staining from outdoor use, organic matter, and cleaning chemicals.

In balcony waterproofing remediation, Kerapoxy Design may be specified in premium residential projects where the tile and grout finish quality is a key project requirement. It is not a routine specification. Confirm membrane compatibility with Mapei Australia before applying.`,
    technicalProperties: [
      "Two-part epoxy — adhesive and grout combined",
      "Stain resistant — wide decorative colour range",
      "External balcony and terrace confirmed",
      "Confirmed for use over cured Mapei membrane systems — confirm specific membrane with Mapei technical",
      "High-specification residential applications",
    ],
    limitations: [
      "Not a routine residential balcony specification — specified for decorative and stain resistance requirements",
      "Two-part mixing required — confirm mixing ratio and working time with Mapei technical",
      "Movement joints must be installed per AS 3958.1",
      "Confirm current product name, colour range, and Mapei membrane compatibility with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
    ],
  },
];

// ─── Section 3 — Grout systems ────────────────────────────────────────────────

const GROUT_PRODUCTS: Product[] = [
  {
    fullLabel: "ARDEX Australia",
    brandUrl: "https://www.ardex.com.au",
    tdsUrl: "https://ardexaustralia.com/product/ardex-fg-8/",
    accentColor: "#0369a1",
    name: "ARDEX FG 8 — Flexible Coloured Grout for Tile Joints 1 to 8 mm Wide",
    descriptionLine: "TODO: owner confirm — the product previously named 'ARDEX Flex Joint (FJ)' does not exist in the ARDEX Australia range; the Australian flexible grout products are ARDEX FG 8 (1–8mm) and ARDEX WJ 50 (2–50mm) — confirm which product is correct for this card and update name, joint width range, and all claims accordingly",
    productType: "TODO: owner confirm product name — ARDEX FG 8 (1–8mm) is the confirmed Australian flexible grout — verify if WJ 50 (2–50mm) should also be listed",
    techChips: [
      { label: "TODO: confirm product name — FG 8 not FJ", cls: "bg-amber-100 text-amber-800" },
      { label: "1–8mm joint width (FG 8 confirmed)", cls: "bg-sky-50 text-sky-700" },
      { label: "Polymer-modified cement grout", cls: "bg-slate-100 text-slate-700" },
      { label: "External — internal and external", cls: "bg-slate-100 text-slate-700" },
      { label: "ARDEX system compatible", cls: "bg-green-100 text-green-800" },
      { label: "Multiple colours", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: `TODO: owner confirm — the product name "ARDEX Flex Joint (FJ)" used in this card does not match any product in the current ARDEX Australia grout range. The Australian ARDEX cement-based grout products confirmed on the ARDEX Australia website are:

• ARDEX FG 8 — Flexible Coloured Grout for Tile Joints 1 to 8 mm Wide (polymer-modified, mould resistant, water repellent, internal and external, available in 1.5kg, 5kg, 20kg)
• ARDEX WJ 50 — Non-Shrink Coloured Wide Joint Grout 2 to 50mm (internal and external, 20kg bag)

The previously stated "2–15mm" joint width range does not correspond to either of these products. Owner must confirm: (1) which product should be listed here, (2) whether it is FG 8 (1–8mm), WJ 50 (2–50mm), or both, (3) whether UV-stable pigment claims are confirmed for the selected product.

Once confirmed, the card should be updated with the correct product name, TDS URL, joint width range, and all associated claims.`,
    technicalProperties: [
      "TODO: owner confirm product — ARDEX FG 8 confirmed: polymer-modified flexible cement grout, 1–8mm joint width, internal and external, mould resistant, water repellent",
      "TODO: owner confirm UV-stable pigments claim for selected ARDEX grout product",
      "ARDEX FG 8 available in 1.5kg, 5kg, and 20kg — confirm colour range with ARDEX Australia",
      "ARDEX WJ 50 available for 2–50mm joints if wider joints are required — confirm from ARDEX Australia TDS",
    ],
    limitations: [
      "Not for movement joints — movement joints must be filled with flexible sealant after grouting",
      "Cement-based — permeable — not a waterproofing product — the membrane below is the waterproofing layer",
      "TODO: owner confirm correct product name before publishing — 'ARDEX FJ Flex Joint' does not appear in the current ARDEX Australia range",
      "Confirm current product name, joint width range, and colour range with ARDEX Australia before specifying",
    ],
    procurementSources: [
      { name: "ARDEX Australia — trade supply", url: "https://www.ardex.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
      { name: "MJS Floorcoverings", url: "https://mjsfloorcoverings.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    tdsUrl: "https://www.mapei.com/au/en/products-and-solutions/products/detail/ultracolor-plus",
    accentColor: "#16a34a",
    name: "Mapei Ultracolor Plus",
    descriptionLine: "Fast-setting stain-resistant sanded cement grout — 2–20mm joint width — DropEffect stain resistance technology — external balcony and terrace — Mapei system compatible",
    productType: "Fast-setting sanded cement grout — 2–20mm — DropEffect — BioBlock",
    techChips: [
      { label: "Fast-setting", cls: "bg-red-100 text-red-800" },
      { label: "2–20mm joint width", cls: "bg-sky-50 text-sky-700" },
      { label: "DropEffect stain resistance", cls: "bg-green-100 text-green-800" },
      { label: "BioBlock — mould resistant", cls: "bg-green-50 text-green-700" },
      { label: "UV stable pigments", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei system compatible", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription: `Mapei Ultracolor Plus is Mapei's fast-setting, wide-joint sanded cement grout with DropEffect technology — a surface treatment that provides improved stain resistance compared to standard cement grouts. Joint width 2–20mm. Fast setting allows earlier trafficking of the tiled surface after grouting. UV-stable pigments and BioBlock technology resist mould and mildew growth in the grout joint — relevant for external balcony conditions where organic matter and moisture are persistent.

In balcony waterproofing remediation, Ultracolor Plus is specified as the standard Mapei grout for external balcony tile joints. The stain resistance of DropEffect technology makes it a more practical specification than standard cement grout on external balconies subject to outdoor use and organic staining. Available in a wide colour range. Note: the product is sold as "Ultracolor Plus" in Australia (not "Ultracolor Plus FA" which is the US market name).`,
    technicalProperties: [
      "Fast-setting polymer-modified sanded cement grout",
      "Joint width: 2–20mm — suitable for standard and wider tile joints on external balconies",
      "DropEffect stain resistance technology",
      "BioBlock mould and mildew resistance",
      "UV-stable pigments — colour fast under external exposure",
      "Mapei system compatible — used in Mapei tile adhesive system specifications",
      "Wide colour range",
    ],
    limitations: [
      "Not for movement joints — movement joints must be filled with flexible sealant after grouting",
      "Cement-based — permeable — not a waterproofing product",
      "DropEffect provides improved stain resistance but is not equivalent to epoxy grout — specify Kerapoxy CQ or Kerapoxy Design where full chemical resistance or stain proofing is required",
      "Confirm current product name, joint width range, and colour range with Mapei Australia before specifying",
    ],
    procurementSources: [
      { name: "Mapei Australia — trade supply", url: "https://www.mapei.com/au" },
      { name: "Kevmor", url: "https://kevmor.com.au" },
      { name: "Bayset", url: "https://www.bayset.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
];

// ─── Comparison table data ────────────────────────────────────────────────────

const COMPARISON_ROWS: {
  product: string;
  brand: string;
  type: string;
  classification: string;
  largeFormat: boolean | null;
  overMembraneConfirmed: string;
  keyRestriction: string;
}[] = [
  { product: "ARDEX X 77 Microtec", brand: "ARDEX", type: "Polymer-modified adhesive", classification: "TODO: confirm AS/NZS 4992 Class 2 with ARDEX AU — AU TDS references ISO E/T classes", largeFormat: true, overMembraneConfirmed: "Yes — ARDEX membrane systems", keyRestriction: "Confirm ARDEX membrane system compatibility — movement joints mandatory" },
  { product: "ARDEX X 78 Microtec", brand: "ARDEX", type: "Polymer-modified adhesive — rapid set", classification: "TODO: confirm AS/NZS 4992 Class 2 with ARDEX AU", largeFormat: true, overMembraneConfirmed: "Yes — ARDEX membrane systems", keyRestriction: "Shorter open time — confirm batch size for large areas" },
  { product: "Mapei Ultraflex 2", brand: "Mapei", type: "Polymer-modified adhesive", classification: "Class 2 deformable", largeFormat: true, overMembraneConfirmed: "Yes — Mapei membrane systems", keyRestriction: "Confirm Mapei membrane system compatibility — movement joints mandatory" },
  { product: "Mapei Keraflex Maxi S1", brand: "Mapei", type: "Polymer-modified adhesive — anti-slump", classification: "S1 deformable", largeFormat: true, overMembraneConfirmed: "Yes — Mapei membrane systems", keyRestriction: "Anti-slump — horizontal and vertical applications" },
  { product: "TODO: owner confirm — 'Bostik UltraSet SuperFlex' not found in AU Bostik range; confirm correct product from Excelflex, Ultra Mastik, Conflex, Evoflex", brand: "Bostik", type: "Polymer-modified adhesive — confirm product name", classification: "TODO: confirm — Class 2 deformable claimed but product name unverified", largeFormat: true, overMembraneConfirmed: "Confirm with membrane manufacturer", keyRestriction: "Product name unverified — confirm with Bostik AU before specifying — cross-brand membrane compatibility must also be confirmed in writing" },
  { product: "ARDEX WA", brand: "ARDEX", type: "Two-part epoxy adhesive and grout", classification: "Epoxy — confirm AS/NZS class", largeFormat: true, overMembraneConfirmed: "Yes — ARDEX membrane systems", keyRestriction: "Not routine residential — two-part mixing — movement joints mandatory" },
  { product: "Mapei Kerapoxy CQ", brand: "Mapei", type: "Two-part epoxy adhesive and grout", classification: "Epoxy — confirm AS/NZS class", largeFormat: true, overMembraneConfirmed: "Yes — Mapei membrane systems", keyRestriction: "Not routine residential — chemical resistance focus — movement joints mandatory" },
  { product: "Mapei Kerapoxy Design", brand: "Mapei", type: "Two-part epoxy adhesive and grout — decorative", classification: "Epoxy — confirm AS/NZS class", largeFormat: true, overMembraneConfirmed: "Yes — Mapei membrane systems", keyRestriction: "Decorative and stain resistance focus — not for industrial chemical exposure" },
  { product: "TODO: owner confirm — 'ARDEX FJ Flex Joint' not found in AU range — likely ARDEX FG 8 (1–8mm) or WJ 50 (2–50mm)", brand: "ARDEX", type: "Flexible sanded cement grout — confirm product name", classification: "Confirm with ARDEX TDS", largeFormat: null, overMembraneConfirmed: "N/A — grout only", keyRestriction: "TODO: confirm joint width range — FG 8 is 1–8mm; WJ 50 is 2–50mm — '2–15mm' range not confirmed" },
  { product: "Mapei Ultracolor Plus", brand: "Mapei", type: "Fast-setting sanded cement grout", classification: "Confirm with Mapei TDS", largeFormat: null, overMembraneConfirmed: "N/A — grout only", keyRestriction: "2–20mm joint — DropEffect stain resistance — not for movement joints — permeable" },
  { product: "ARDEX WA (dual use)", brand: "ARDEX", type: "Epoxy adhesive and grout combined", classification: "Epoxy", largeFormat: null, overMembraneConfirmed: "Yes — ARDEX membrane systems", keyRestriction: "See epoxy section — no separate grout required when used as adhesive" },
  { product: "Mapei Kerapoxy CQ (dual use)", brand: "Mapei", type: "Epoxy adhesive and grout combined", classification: "Epoxy — confirm AS/NZS class", largeFormat: null, overMembraneConfirmed: "Yes — Mapei membrane systems", keyRestriction: "See epoxy section — no separate grout required when used as adhesive" },
];

// ─── Tech accordion data ───────────────────────────────────────────────────────

const TECH_INFO = {
  systemSequence: [
    "1 — Cured and inspected waterproofing membrane (flood tested where required)",
    "2 — Prime membrane surface if required by membrane or adhesive manufacturer",
    "3 — Apply polymer-modified or epoxy tile adhesive using notched trowel — full bed coverage minimum 95% contact for external applications per AS 3958.1",
    "4 — Fix tiles — allow adhesive to cure fully before grouting",
    "5 — Install movement joints at perimeters, changes of plane, and field intervals per AS 3958.1",
    "6 — Apply grout to tile joints — do not grout movement joint positions",
    "7 — Fill movement joints with flexible sealant (silicone or polyurethane) after grout has cured",
  ],
  membraneCompatibility: [
    "The tile adhesive must be confirmed as compatible with the specific waterproofing membrane below it — membrane manufacturers specify which adhesive systems are approved for use over their products",
    "ARDEX membranes are specified with ARDEX adhesives — Mapei membranes are specified with Mapei adhesives — crossing brands at the adhesive-to-membrane interface without manufacturer confirmation risks adhesion failure and voids the membrane system warranty",
    "Always confirm adhesive compatibility with the membrane manufacturer's current TDS or system specification before applying",
    "Where a non-system-brand adhesive is being specified over a membrane (e.g. Bostik over ARDEX), written confirmation from both manufacturers is required before proceeding",
  ],
  asClassification: [
    "AS/NZS 4992 classifies tile adhesives by type and performance — for external balcony and terrace applications, a minimum Class 1 flexible polymer-modified adhesive is required",
    "For large format tiles (any tile with a side dimension greater than 300mm), a Class 2 deformable adhesive is required",
    "For heavy stone, rectified porcelain, or tiles over 600mm, confirm the required adhesive classification with the tile supplier and adhesive manufacturer before specifying",
    "Confirm AS/NZS 4992 classification for each product listed on this page against the current product TDS — classifications are confirmed by independent testing and must not be assumed",
  ],
  largeFormatTiles: [
    "Tiles with any dimension greater than 300mm require a deformable (Class 2 or S2) adhesive and full-bed coverage to prevent hollow spots and point loading",
    "Large format tiles on external balconies are particularly susceptible to debonding under thermal cycling if the adhesive coverage is insufficient or the adhesive flexibility is inadequate",
    "Back-buttering the tile in addition to applying adhesive to the substrate is recommended for large format tiles — confirm back-buttering requirement with the adhesive manufacturer for the tile format",
    "Confirm the adhesive specification with the tile supplier for any tile format larger than 300mm in any dimension",
  ],
  movementJoints: [
    "AS 3958.1 requires movement joints at all perimeters, at changes of plane, at columns and penetrations, and at maximum 4.5m centres in the field of external tile installations",
    "Movement joints must be filled with a flexible sealant — silicone or polyurethane — not grout — failure to install movement joints, or filling movement joints with grout, is the most common cause of tile cracking and debonding on external balconies",
    "Movement joint sealant is a separate product to tile adhesive and grout — confirm the correct sealant product with the tile adhesive manufacturer or waterproofing consultant",
    "The size and frequency of movement joints must be confirmed with the tile installer based on the tile format, substrate, and exposure conditions before tiling commences",
  ],
  epoxyWhenToSpecify: [
    "Epoxy tile adhesives are two-part systems that cure to a hard, chemically resistant, waterproof bond — they are specified where chemical resistance, stain resistance, or a fully impermeable tile-to-membrane bond is required",
    "On residential balconies, epoxy adhesive is not routinely required — a correctly specified polymer-modified Class 2 flexible adhesive is the appropriate specification for most residential balcony and terrace applications",
    "Epoxy adhesives have a shorter working time than polymer-modified cement adhesives and require correct mixing ratios — confirm application requirements with the manufacturer before specifying",
    "Working time is temperature-dependent — at high ambient temperatures (above 30°C), working time is further reduced — on external balconies in Australian summer conditions, smaller batch sizes and early morning application are essential",
  ],
  groutJointWidth: [
    "AS 3958.1 requires a minimum 2mm grout joint for rectified tiles and a minimum 3mm joint for non-rectified tiles",
    "On external balconies, wider joints (3–5mm) are recommended to accommodate thermal movement — confirm the correct joint width with the tile supplier and the grout manufacturer before fixing tiles",
    "Joint width cannot be changed after tiles are fixed — confirm grout joint width at the design stage before tile installation commences",
    "Wider joints allow better accommodation of dimensional tolerances in tile format — confirm joint width against the tile format and manufacturer's recommendation before specifying",
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function TileAdhesiveIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What are tile adhesive and grout systems — balcony over-membrane?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Tile adhesive systems are the materials used to bond ceramic, porcelain, stone, and other tile formats to the cured waterproofing membrane surface on balconies and terraces. In a correctly sequenced balcony waterproofing system, the tile adhesive is the last structural layer before the tile — applied over the cured and flood-tested membrane, it bonds the tile to the system and transfers foot traffic loads back to the concrete substrate below.
        </p>
        {expanded && (
          <>
            <p>
              In balcony and terrace applications, tile adhesive selection is governed by three factors: compatibility with the specific waterproofing membrane below, flexibility sufficient to accommodate the thermal movement of an external exposed substrate, and compliance with AS/NZS 4992 for the tile format and fixing method being used. External balcony applications impose more demanding conditions than internal wet areas — higher UV exposure, greater thermal cycling, and the risk of prolonged water contact beneath the tile all require a correctly specified, membrane-compatible adhesive system.
            </p>
            <p>
              Grout systems fill the joints between tiles and complete the tiled surface. In external balcony applications, grout selection must account for joint width, tile format, exposure conditions, and movement joint layout. Sanded cement-based grouts and epoxy grouts each have specific applications and limitations in external balcony use. Movement joints must be incorporated into the tile layout at all perimeters, changes of plane, and at regular field intervals — grout is never used to fill movement joints.
            </p>
            <p>
              This page covers three product categories: polymer-modified tile adhesive systems, epoxy tile adhesive systems, and grout systems including sanded cement-based and epoxy grout.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
        <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
            <div className="flex shrink-0 items-center gap-1">
              {product.tdsUrl && (
                <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                  <FileText size={9} /> TDS
                </a>
              )}
              {product.brandUrl && (
                <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                  <ExternalLink size={9} /> Brand Site
                </a>
              )}
            </div>
          </div>
          <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{product.descriptionLine}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 bg-white px-5 py-3">
          {product.techChips.map((chip) => (
            <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
          ))}
        </div>
        <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
          <p className="whitespace-pre-line text-xs leading-6 text-slate-700">{product.systemDescription}</p>
        </div>
        <div className="space-y-3 px-5 py-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
            <ul className="space-y-1.5">
              {product.technicalProperties.map((prop, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                  <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> {prop}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
            <ul className="space-y-1.5">
              {product.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
                  <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" /> {lim}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
          <div className="space-y-2">
            {product.procurementSources.map((src) => (
              <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs">
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS and membrane manufacturer before specifying or applying.</p>
        </div>
      </div>
    </div>
  );
}

function CalloutBoxes({ amber, red, blue }: { amber: { heading: string; body: string }; red: { heading: string; body: string }; blue: { heading: string; body: string } }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">{amber.heading}</p>
        <p className="text-sm leading-7 text-amber-900">{amber.body}</p>
      </div>
      <div className="rounded-xl border-l-4 border-red-500 bg-red-50 px-5 py-4">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-red-800">{red.heading}</p>
        <p className="text-sm leading-7 text-red-900">{red.body}</p>
      </div>
      <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 px-5 py-4">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-sky-800">{blue.heading}</p>
        <p className="text-sm leading-7 text-sky-900">{blue.body}</p>
      </div>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="relative flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="shrink-0 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-500">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

function ProductCarousel({ products, scrollRef, label }: { products: Product[]; scrollRef: React.RefObject<HTMLDivElement | null>; label: string }) {
  const scroll = (dir: "left" | "right") => scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
        {products.map((p) => <ProductCard key={p.name} product={p} />)}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function TileAdhesiveProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const polymerScrollRef = useRef<HTMLDivElement>(null);
  const epoxyScrollRef = useRef<HTMLDivElement>(null);
  const groutScrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Membrane compatibility, AS/NZS 4992 classification, large format tiles, movement joints, system sequence, grout joint requirements</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Correct System Sequence — External Balcony Tile Over Membrane" items={TECH_INFO.systemSequence} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Membrane Compatibility — Non-Negotiable" items={TECH_INFO.membraneCompatibility} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="AS/NZS 4992 Classification" items={TECH_INFO.asClassification} style="bullet" />
              <TechCard icon={<SquareStack size={15} />} title="Large Format Tiles" items={TECH_INFO.largeFormatTiles} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Movement Joints — AS 3958.1" items={TECH_INFO.movementJoints} style="warn" />
              <TechCard icon={<AlertTriangle size={15} />} title="Epoxy Adhesive — When to Specify" items={TECH_INFO.epoxyWhenToSpecify} style="bullet" />
              <TechCard icon={<BookOpen size={15} />} title="Grout Joint Width — AS 3958.1" items={TECH_INFO.groutJointWidth} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — Polymer-modified adhesives                                */}
      {/* ══════════════════════════════════════════════════════════════════════ */}

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Polymer-modified tile adhesive systems</h2>
            <p className="mt-1 text-sm text-slate-500">5 products — 2 brands — flexible cement-based adhesives for over-membrane tile fixing on external balconies and terraces</p>
          </div>
        </div>

        <CalloutBoxes
          amber={{
            heading: "Membrane Compatibility Must Be Confirmed for Every Adhesive Specified",
            body: "Polymer-modified tile adhesives are not universally compatible with all waterproofing membranes. Each membrane manufacturer specifies which adhesive systems are approved for use over their products. ARDEX membranes are specified with ARDEX adhesives. Mapei membranes are specified with Mapei adhesives. Crossing brands at the adhesive-to-membrane interface without manufacturer confirmation risks adhesion failure and voids the membrane system warranty. Always confirm the adhesive is approved for use over the specific membrane below before specifying.",
          }}
          red={{
            heading: "Minimum 95% Bed Coverage Is Required for External Balcony Tile Fixing",
            body: "AS 3958.1 requires a minimum 95% adhesive contact coverage for tile fixing in external wet area applications. This means the back of every tile must have adhesive contact across at least 95% of its surface — hollow spots, voids, or ridges beneath tiles are not acceptable in external balcony applications. Full bed coverage is achieved by applying adhesive with the correct notched trowel size, back-buttering the tile where required (particularly for large format tiles), and pressing tiles firmly into the adhesive bed. Tiles with insufficient coverage will fail under thermal movement and water infiltration.",
          }}
          blue={{
            heading: "The Tile Adhesive Is Applied Over the Cured Membrane — Not Instead of It",
            body: "The polymer-modified tile adhesive is the layer between the waterproofing membrane and the tile. It is not a waterproofing product. The membrane must be fully cured, inspected, flood-tested where required, and confirmed compliant before tile adhesive is applied. Applying tile adhesive over an incompletely cured or defective membrane will trap moisture and mask membrane defects — the membrane must be verified before tiling commences.",
          }}
        />

        <div className="mt-6">
          <ProductCarousel products={POLYMER_PRODUCTS} scrollRef={polymerScrollRef} label="5 polymer-modified adhesives — scroll to view all" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — Epoxy adhesives                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}

      <SectionDivider label="Epoxy tile adhesive systems — two-part systems — chemical resistance — confirm application requirements before specifying" />

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Epoxy tile adhesive systems</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 2 brands — two-part epoxy adhesives for external balcony and terrace applications requiring chemical resistance or full waterproof bond</p>
          </div>
        </div>

        <CalloutBoxes
          amber={{
            heading: "Epoxy Adhesives Are Not Routinely Required on Residential Balconies",
            body: "Epoxy tile adhesives are two-part systems requiring correct mixing ratios, careful temperature management, and skilled application. They are specified where chemical resistance, stain resistance, or a fully impermeable bond is required — typically in commercial food preparation, industrial, or high chemical exposure environments. On standard residential balconies and terraces, a correctly specified polymer-modified Class 2 flexible adhesive is the appropriate specification. Do not specify epoxy adhesive on a residential balcony without a specific technical or project reason — the complexity and cost of epoxy application is not justified by standard balcony conditions.",
          }}
          red={{
            heading: "Mixing Ratio and Temperature Are Critical for Epoxy Adhesive Performance",
            body: "Two-part epoxy adhesives cure by chemical reaction between resin and hardener — the ratio must be exact. Under-mixing or incorrect ratios produce an adhesive that will not fully cure and will fail in service. Working time is significantly shorter than polymer-modified adhesives and is temperature-dependent — at high ambient temperatures (above 30°C), working time is further reduced. On external balconies in Australian summer conditions, temperature management and smaller batch sizes are essential. Confirm working time, mixing ratio, and temperature limits with the manufacturer before applying.",
          }}
          blue={{
            heading: "Movement Joints Are Still Required with Epoxy Adhesive",
            body: "Epoxy tile adhesives cure to a very hard, rigid bond. They do not provide the same deformability as flexible polymer-modified adhesives under thermal movement. Movement joints per AS 3958.1 are therefore essential with epoxy adhesive systems — the rigid adhesive layer will transmit thermal stress directly to the tile if movement joints are absent. Do not omit movement joints on the assumption that epoxy adhesive will accommodate thermal movement — it will not.",
          }}
        />

        <div className="mt-6">
          <ProductCarousel products={EPOXY_PRODUCTS} scrollRef={epoxyScrollRef} label="3 epoxy adhesive systems — scroll to view all" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — Grout systems                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}

      <SectionDivider label="Grout systems — sanded cement-based and epoxy — joint filling and finishing — movement joints must be filled with flexible sealant, not grout" />

      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Grout systems — sanded and epoxy</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — 2 brands — sanded cement-based and epoxy grouts for external balcony and terrace tile joints</p>
          </div>
        </div>

        <CalloutBoxes
          amber={{
            heading: "Movement Joints Must Never Be Filled with Grout",
            body: "Movement joints are installed at all perimeters, changes of plane, columns, penetrations, and at maximum 4.5m field intervals per AS 3958.1. These joints must be filled with a flexible sealant — silicone or polyurethane — after the grout has fully cured. Filling movement joint positions with grout is the most common installation error in external balcony tiling and the primary cause of tile cracking and debonding under thermal movement. Leave movement joint positions clear of grout during grouting, and fill with flexible sealant only after the grout has cured.",
          }}
          red={{
            heading: "Grout Is Not Waterproofing — The Membrane Below Is the Waterproofing Layer",
            body: "Cement-based grout is permeable. Water will pass through cement grout joints and reach the waterproofing membrane below. This is expected and correct — the membrane below the tile is the waterproofing layer, not the grout. Do not specify grout on the assumption that it will provide waterproofing. The grout joint must be kept to the minimum width required by AS 3958.1 for the tile format, but the grout is a finish material — not a waterproofing product. For a fully impermeable joint, specify epoxy grout.",
          }}
          blue={{
            heading: "Grout Colour Selection — External Balcony Considerations",
            body: "Light-coloured grout on external balconies is susceptible to staining from organic matter, algae, and outdoor use. On external balconies, mid-tone or darker grout colours are generally more practical than white or near-white grouts. Where stain resistance is a priority, specify an epoxy grout or a cement grout with a stain-resistant additive. Confirm colour fastness with the grout manufacturer for the specific exposure conditions of the project before selecting — some cement grout colours fade under UV exposure.",
          }}
        />

        <div className="mt-6">
          <ProductCarousel products={GROUT_PRODUCTS} scrollRef={groutScrollRef} label="2 cement-based grout systems — scroll to view all" />
        </div>

        {/* Cross-reference notes for G3 and G4 */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            {
              href: "#ardex-wa",
              brand: "ARDEX WA",
              note: "ARDEX WA functions as both tile adhesive and grout. Where ARDEX WA has been specified as the tile adhesive, a separate grout product is not required. See ARDEX WA in the Epoxy Tile Adhesive section above.",
            },
            {
              href: "#mapei-kerapoxy-cq",
              brand: "Mapei Kerapoxy CQ",
              note: "Mapei Kerapoxy CQ functions as both tile adhesive and grout. Where Kerapoxy CQ has been specified as the tile adhesive, a separate grout product is not required. See Mapei Kerapoxy CQ in the Epoxy Tile Adhesive section above.",
            },
          ].map((ref) => (
            <div key={ref.brand} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">Cross-reference — dual-use epoxy system</p>
              <p className="text-sm font-extrabold text-sky-950">{ref.brand}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">{ref.note}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-sky-700">
                See epoxy section above <ArrowRight size={11} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Tile adhesive and grout system comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of all 12 products across polymer-modified adhesives, epoxy adhesives, and grout systems. Confirm all product selections against the current manufacturer TDS and membrane manufacturer before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">AS/NZS classification</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Large format tile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Over-membrane confirmed</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.classification}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.largeFormat === true && <span className="inline-flex items-center gap-1 font-semibold text-green-700"><CheckCircle size={11} /> Yes</span>}
                    {row.largeFormat === false && <span className="inline-flex items-center gap-1 font-semibold text-slate-500"><XCircle size={11} /> No</span>}
                    {row.largeFormat === null && <span className="text-slate-400">N/A</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.overMembraneConfirmed}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Do not confuse box — below comparison table ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Do not confuse tile adhesive and grout systems with:</h3>
        </div>
        <ul className="space-y-2.5">
          {[
            "Waterproofing membranes — tile adhesive is applied over the cured waterproofing membrane, not instead of it — a classified waterproofing membrane must always be present between the concrete substrate and the tile adhesive bed in a compliant external balcony system",
            "Bedding mortar or sand-cement screed — tile adhesive is a factory-manufactured compound applied by notched trowel in a thin bed — a sand-cement mortar bed is a different system with different thickness, mixing, and substrate requirements — confirm the correct system with the project specification",
            "Movement joint sealants — movement joints must be filled with a flexible sealant (silicone or polyurethane), not with grout — grout is not a movement joint filler — confusing grout with movement joint sealant is a common installation error that leads to tile cracking and debonding",
            "Primer or bonding agent — primer or bonding agent is applied to the membrane or screed surface before the tile adhesive — it is a separate product — do not apply tile adhesive directly to an unprimed membrane surface without first confirming with the membrane manufacturer whether a primer is required",
            "Tile grout and tile adhesive — these are two different products — the adhesive bonds the tile to the membrane — the grout fills the joint between tiles — they are applied in separate operations and must both be specified and confirmed against the membrane system and exposure conditions",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Additional warning box — below comparison table only ── */}
      <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">Movement Joint Sealant Is a Separate Product — Not Covered on This Page</p>
        <p className="text-sm leading-7 text-amber-900">
          Movement joints must be installed at all perimeters, changes of plane, columns, penetrations, and at regular field intervals per AS 3958.1, and filled with a flexible sealant — silicone or polyurethane — after grout has cured. Movement joint sealants are not listed on this page. Confirm the correct movement joint sealant with the tile adhesive manufacturer or waterproofing consultant. Do not use grout to fill movement joints under any circumstances.
        </p>
      </div>
    </>
  );
}
