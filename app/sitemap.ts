import type { MetadataRoute } from "next";
import { CONCRETE_DEFECTS_DATA } from "@/lib/concrete-defects-data";

const BASE = "https://www.remedialbuildingaustralia.com.au";

const BALCONY_SUBCATEGORIES = [
  "liquid-applied-membranes-polyurethane",
  "liquid-applied-membranes-acrylic",
  "sheet-membranes-torch-on",
  "sheet-membranes-cold-applied",
  "cementitious-flexible-membranes",
  "primers-bonding-agents",
  "screed-systems-polymer-modified",
  "screed-systems-self-levelling",
  "drainage-puddle-flanges-floor-wastes",
  "drainage-linear-grates-channel-drains",
  "penetration-collars",
  "protection-boards",
  "reinforcing-fabric-mesh",
  "flood-test-equipment",
  "tile-adhesive-systems",
  "abrasives-blades-tools",
  "hdpe-sheet-membrane-systems",
  "hot-melt-rubberised-asphalt-systems",
  "root-resistant-membrane-systems",
  "tapered-insulation-board-systems",
  "pedestal-systems-adjustable-height",
  "drainage-cell-systems",
  "filter-fabric-systems",
  "ballast-systems",
  "drainage-podium-outlets-scuppers",
  "gutter-lining-systems",
  "flashing-compound-systems",
];

const DEFECT_LIBRARY_CATEGORIES = [
  {
    slug: "balconies-podiums",
    defects: ["balcony-leaks", "concrete-deterioration", "failed-screeds", "rusted-balustrades", "tile-delamination"],
  },
  {
    slug: "basements-substructure",
    defects: ["crack-injection-failures", "hydrostatic-pressure-issues", "joint-leaks", "negative-side-waterproofing-failure"],
  },
  {
    slug: "concrete-structural-defects",
    defects: ["concrete-cracking", "concrete-spalling", "magnesite-flooring-deterioration", "reinforcement-corrosion", "settlement-cracks", "slab-edge-deterioration"],
  },
  {
    slug: "facade-external-envelope",
    defects: ["brickwork-deterioration", "cladding-failure", "defective-non-compliant-balustrades", "external-coating-paint-deterioration", "facade-cracking", "failed-sealants-joints", "render-cracking-delamination", "window-door-perimeter-failure"],
  },
  {
    slug: "internal-defects-finishes",
    defects: ["ceiling-water-damage", "internal-cracking", "mould-moisture-damage", "paint-failure"],
  },
  {
    slug: "miscellaneous-other",
    defects: ["acoustic-issues", "fire-compliance-defects", "thermal-condensation-issues"],
  },
  {
    slug: "roofing-defects",
    defects: ["box-gutter-failure", "flashing-failures", "overflow-issues", "poor-falls-ponding", "roof-leaks"],
  },
  {
    slug: "services-drainage",
    defects: ["blocked-undersized-stormwater", "downpipe-defects", "inadequate-drainage-design", "pipe-penetrations-failure"],
  },
  {
    slug: "waterproofing-water-ingress",
    defects: ["balcony-waterproofing-failure", "basement-water-ingress", "facade-water-ingress", "failed-screeds-tile-delamination", "penetrating-damp", "planter-box-waterproofing-failure", "podium-waterproofing-failure", "rising-damp", "roof-waterproofing-failure"],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── Homepage ──
  entries.push({ url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 });

  // ── Top-level section pages ──
  for (const path of ["/defect-library", "/repair-systems", "/industry-news", "/directory", "/ai-scope-builder"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 });
  }

  // ── About / Contact ──
  for (const path of ["/about", "/contact"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // ── Legal ──
  for (const path of ["/terms", "/privacy-policy"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 });
  }

  // ── Defect Library — category index pages ──
  for (const cat of DEFECT_LIBRARY_CATEGORIES) {
    entries.push({
      url: `${BASE}/defect-library/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    // Individual defect pages
    for (const defect of cat.defects) {
      entries.push({
        url: `${BASE}/defect-library/${cat.slug}/${defect}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // ── Repair Systems — static subcategory index pages ──
  for (const path of [
    "/repair-systems/waterproofing-water-ingress",
    "/repair-systems/concrete-structural-defects",
    "/repair-systems/repair-mortars",
  ]) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 });
  }

  // ── Repair Systems — balcony waterproofing failure index ──
  entries.push({
    url: `${BASE}/repair-systems/balcony-waterproofing-failure`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  });

  // ── Repair Systems — balcony waterproofing failure subcategories ──
  for (const slug of BALCONY_SUBCATEGORIES) {
    entries.push({
      url: `${BASE}/repair-systems/balcony-waterproofing-failure/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  // ── Repair Systems — dynamic [subcategory] and [subcategory]/[productCategory] ──
  for (const sub of CONCRETE_DEFECTS_DATA) {
    entries.push({
      url: `${BASE}/repair-systems/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const cat of sub.productCategories) {
      entries.push({
        url: `${BASE}/repair-systems/${sub.slug}/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
