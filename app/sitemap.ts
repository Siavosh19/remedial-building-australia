import type { MetadataRoute } from "next";
import { CONCRETE_DEFECTS_DATA } from "@/lib/concrete-defects-data";
import { prisma } from "@/lib/prisma";
import { isExpertServiceHidden } from "@/lib/expert-advice-hidden";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // ── SEO landing pages ──
  for (const path of [
    "/remedial-building-services",
    "/building-remediation",
    "/remedial-repair-specifications",
    "/remedial-building-solutions",
    "/remedial-builders",
    "/remedial-building-sydney",
  ]) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }

  // ── Expert Remedial Advice (index + services) ──
  // Hidden services are excluded so they aren't indexed (see lib/expert-advice-hidden.ts).
  for (const path of [
    "/expert-remedial-advice",
    "/expert-remedial-advice/preliminary-defect-assessment",
    "/expert-remedial-advice/scope-quote-tender-review",
    "/expert-remedial-advice/remedial-budget-estimate",
    "/expert-remedial-advice/building-repair-strategy-advice",
    "/expert-remedial-advice/pre-purchase-apartment-defect-review",
    "/expert-remedial-advice/capital-works-forecast",
  ].filter((path) => !isExpertServiceHidden(path))) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 });
  }

  // ── Other indexable section pages ──
  for (const path of ["/materials-products-index", "/useful-resources"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
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

  // ── RBA Insights (published only) ──────────────────────────────────────────
  entries.push({ url: `${BASE}/rba-insights`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
  try {
    const insights = await prisma.rbaInsightsArticle.findMany({
      where: { status: "published" },
      select: { slug: true, updated_at: true },
    });
    for (const insight of insights) {
      entries.push({
        url: `${BASE}/rba-insights/${insight.slug}`,
        lastModified: insight.updated_at,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  } catch {
    // Graceful degradation if DB unavailable during sitemap generation
  }

  // ── Directory: business profiles + populated category×state landing pages ──
  try {
    const companies = await prisma.company.findMany({
      where: { status: "published" },
      select: { slug: true, updated_at: true, main_category: { select: { slug: true } }, locations: { take: 1, select: { state: true } } },
      take: 20000,
    });
    const combos = new Set<string>();
    for (const c of companies) {
      entries.push({ url: `${BASE}/directory/company/${c.slug}`, lastModified: c.updated_at, changeFrequency: "monthly", priority: 0.6 });
      const catSlug = c.main_category?.slug;
      const state = c.locations[0]?.state;
      if (catSlug && state) combos.add(`${catSlug}/${state.toLowerCase()}`);
    }
    for (const combo of combos) {
      entries.push({ url: `${BASE}/directory/${combo}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 });
    }
  } catch {
    // Graceful degradation if DB unavailable
  }

  // ── Industry Jobs: board index + active listings ───────────────────────────
  entries.push({ url: `${BASE}/industry-jobs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 });
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "active", OR: [{ expires_at: null }, { expires_at: { gt: new Date() } }] },
      select: { slug: true, updated_at: true },
      take: 5000,
    });
    for (const job of jobs) {
      entries.push({ url: `${BASE}/industry-jobs/${job.slug}`, lastModified: job.updated_at, changeFrequency: "weekly", priority: 0.6 });
    }
  } catch {
    // Graceful degradation if DB unavailable
  }

  return entries;
}
