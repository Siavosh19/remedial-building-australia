import type { MetadataRoute } from "next";
import { CONCRETE_DEFECTS_DATA } from "@/lib/concrete-defects-data";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600; // regenerate every hour so new articles appear without a redeploy

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

const EXPERT_ADVICE_SLUGS = [
  "preliminary-defect-assessment",
  "scope-quote-tender-review",
  "remedial-budget-estimate",
  "capital-works-forecast",
  "building-repair-strategy-advice",
  "pre-purchase-apartment-defect-review",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ── Homepage ──────────────────────────────────────────────────────────────
  entries.push({ url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 });

  // ── Top-level section pages ───────────────────────────────────────────────
  for (const path of [
    "/defect-library",
    "/repair-systems",
    "/industry-news",
    "/rba-insights",
    "/directory",
    "/expert-remedial-advice",
    "/ai-scope-builder",
  ]) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 });
  }

  // ── Core public pages ─────────────────────────────────────────────────────
  for (const path of ["/about", "/contact", "/newsletter", "/directory/pricing"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }

  // ── Materials & Products Index (live data page) ───────────────────────────
  entries.push({ url: `${BASE}/materials-products-index`, lastModified: now, changeFrequency: "monthly", priority: 0.75 });

  // ── AI Scope Builder public reference pages ───────────────────────────────
  for (const path of ["/ai-scope-builder/materials", "/ai-scope-builder/repair-systems"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  // ── Placeholder / coming-soon public pages ────────────────────────────────
  for (const path of ["/courses", "/materials-products", "/useful-resources"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }

  // ── Legal ─────────────────────────────────────────────────────────────────
  for (const path of ["/terms", "/privacy-policy"]) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "yearly", priority: 0.3 });
  }

  // ── Expert Remedial Advice — service pages ────────────────────────────────
  for (const slug of EXPERT_ADVICE_SLUGS) {
    entries.push({
      url: `${BASE}/expert-remedial-advice/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  // ── Defect Library — category index pages ────────────────────────────────
  for (const cat of DEFECT_LIBRARY_CATEGORIES) {
    entries.push({
      url: `${BASE}/defect-library/${cat.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const defect of cat.defects) {
      entries.push({
        url: `${BASE}/defect-library/${cat.slug}/${defect}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // ── Repair Systems — static category and tool pages ──────────────────────
  for (const path of [
    "/repair-systems/system-selector",
    "/repair-systems/library",
    "/repair-systems/waterproofing-water-ingress",
    "/repair-systems/concrete-structural-defects",
    "/repair-systems/repair-mortars",
  ]) {
    entries.push({ url: `${BASE}${path}`, lastModified: now, changeFrequency: "weekly", priority: 0.85 });
  }

  // ── Repair Systems — balcony waterproofing failure index + subcategories ──
  entries.push({
    url: `${BASE}/repair-systems/balcony-waterproofing-failure`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  });
  for (const slug of BALCONY_SUBCATEGORIES) {
    entries.push({
      url: `${BASE}/repair-systems/balcony-waterproofing-failure/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  // ── Repair Systems — dynamic subcategory and product-category pages ───────
  for (const sub of CONCRETE_DEFECTS_DATA) {
    entries.push({
      url: `${BASE}/repair-systems/${sub.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const cat of sub.productCategories) {
      entries.push({
        url: `${BASE}/repair-systems/${sub.slug}/${cat.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // ── RBA Insights — published articles ────────────────────────────────────
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
    // Graceful degradation if DB unavailable
  }

  // ── Industry News — published articles ───────────────────────────────────
  try {
    const news = await prisma.industryNews.findMany({
      where: { status: "published" },
      select: { slug: true, published_date: true },
    });
    for (const article of news) {
      entries.push({
        url: `${BASE}/industry-news/${article.slug}`,
        lastModified: article.published_date ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // Graceful degradation if DB unavailable
  }

  // ── Directory — published company profiles ────────────────────────────────
  try {
    const companies = await prisma.company.findMany({
      where: { status: "published", suspended: false },
      select: { slug: true, updated_at: true },
    });
    for (const company of companies) {
      entries.push({
        url: `${BASE}/directory/company/${company.slug}`,
        lastModified: company.updated_at,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch {
    // Graceful degradation if DB unavailable
  }

  return entries;
}
