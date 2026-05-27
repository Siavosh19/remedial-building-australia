import { CONCRETE_DEFECTS_DATA } from "./concrete-defects-data";
import type { MaterialRow } from "./concrete-defects-data";
import {
  CATEGORY_ENRICHMENT,
  PRODUCT_CARD_ENRICHMENT,
  PRODUCT_TECH_SPECS,
  RETAILER_PRICES,
  MATERIAL_PRICES,
} from "./product-enrichment";
import type { RetailerPrice } from "./product-enrichment";

// ── Brand key helpers ──────────────────────────────────────────────────────────

export const BRAND_KEYS = [
  "brandArdex",
  "brandSika",
  "brandFosroc",
  "brandTremco",
  "brandParchem",
] as const;
export type BrandKey = (typeof BRAND_KEYS)[number];

const MANUFACTURER: Record<BrandKey, string> = {
  brandArdex:   "Ardex",
  brandSika:    "Sika",
  brandFosroc:  "Fosroc",
  brandTremco:  "Tremco",
  brandParchem: "Parchem",
};

// ── Searchable product type ────────────────────────────────────────────────────

export interface SearchableProduct {
  id: string;
  productName: string;
  manufacturer: string;
  brandKey: BrandKey;
  subcategorySlug: string;
  subcategoryLabel: string;
  categorySlug: string;
  categoryLabel: string;
  materialName: string;
  productType: string;
  brandDescription: string;
  materialNotes: string;
  advantages: string[];
  disadvantages: string[];
  categoryDescription: string;
  enClass: string | null;
  repairDepth: string | null;
  orientation: string | null;
  structural: string | null;
  fibreReinforced: boolean;
  retailers: RetailerPrice[];
  priceRange: string | null;
  pageUrl: string;
}

// ── Parsing ────────────────────────────────────────────────────────────────────

function parseBrand(s: string): { productName: string; description: string } {
  // Split on first " – " or " — " (en-dash or em-dash with spaces)
  const match = s.match(/^(.+?)\s+[–—]\s+([\s\S]+)$/);
  if (match) return { productName: match[1].trim(), description: match[2].trim() };
  return { productName: s.trim(), description: "" };
}

function derivePrice(retailers: RetailerPrice[], productType: string, materialName: string): string | null {
  if (retailers.length > 0) {
    const prices = retailers
      .map((r) => parseFloat(r.price.replace(/[^0-9.]/g, "")))
      .filter((n) => !isNaN(n));
    if (prices.length > 0) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const unit = retailers[0].gst;
      return min === max
        ? `$${min.toFixed(0)} (${unit})`
        : `$${min.toFixed(0)}–$${max.toFixed(0)} (${unit})`;
    }
  }
  return MATERIAL_PRICES[productType] ?? MATERIAL_PRICES[materialName] ?? null;
}

// ── Index builder ──────────────────────────────────────────────────────────────

let _cache: SearchableProduct[] | null = null;

export function buildProductIndex(): SearchableProduct[] {
  if (_cache) return _cache;

  const products: SearchableProduct[] = [];

  for (const sub of CONCRETE_DEFECTS_DATA) {
    for (const cat of sub.productCategories) {
      const catEnrich = CATEGORY_ENRICHMENT[cat.slug];

      for (let mi = 0; mi < cat.materials.length; mi++) {
        const mat = cat.materials[mi] as MaterialRow & Record<string, unknown>;

        for (const bk of BRAND_KEYS) {
          const raw = mat[bk] as string | null;
          if (!raw) continue;

          const { productName, description } = parseBrand(raw);
          const techSpecs = PRODUCT_TECH_SPECS[productName] ?? null;
          const cardEnrich = PRODUCT_CARD_ENRICHMENT[productName];
          const retailers = RETAILER_PRICES[`${bk}_${cat.slug}`] ?? [];

          products.push({
            id: `${sub.slug}/${cat.slug}/${bk}/${mi}`,
            productName,
            manufacturer: MANUFACTURER[bk],
            brandKey: bk,
            subcategorySlug: sub.slug,
            subcategoryLabel: sub.label,
            categorySlug: cat.slug,
            categoryLabel: cat.label,
            materialName: mat.materialName ?? "",
            productType: mat.productType ?? "",
            brandDescription: description,
            materialNotes: mat.notes ?? "",
            advantages: cardEnrich?.advantages ?? catEnrich?.advantages ?? [],
            disadvantages: cardEnrich?.disadvantages ?? catEnrich?.disadvantages ?? [],
            categoryDescription: catEnrich?.description ?? "",
            enClass: techSpecs?.enClass ?? null,
            repairDepth: techSpecs?.repairDepth ?? null,
            orientation: techSpecs?.orientation ?? null,
            structural: techSpecs?.structural ?? null,
            fibreReinforced: techSpecs?.fibreReinforced ?? false,
            retailers,
            priceRange: derivePrice(retailers, mat.productType ?? "", mat.materialName ?? ""),
            pageUrl: `/repair-systems/${sub.slug}/${cat.slug}`,
          });
        }
      }
    }
  }

  _cache = products;
  return products;
}

// ── Keyword scorer (used by API for pre-filtering) ────────────────────────────

export const DOMAIN_SYNONYMS: Record<string, string[]> = {
  balcony:       ["balcony", "soffit", "overhead", "edge", "spall"],
  overhead:      ["overhead", "soffit", "ceiling", "o / v", "h / v / o"],
  vertical:      ["vertical", "v /", "/ v", "h / v"],
  coastal:       ["coastal", "marine", "chloride", "exposure", "saltwater"],
  marine:        ["marine", "coastal", "chloride", "saltwater"],
  fast:          ["fast", "rapid", "early", "quick", "trafficable"],
  crack:         ["crack", "injection", "polyurethane", "epoxy"],
  structural:    ["structural", "r3", "r4", "en 1504-3"],
  thin:          ["thin", "cosmetic", "fairing", "profil", "0–"],
  deep:          ["deep", "high-build", "large area", "bulk", "50 mm", "75 mm"],
  waterproofing: ["waterproof", "membrane", "wb"],
};

export function expandTokens(tokens: string[]): string[] {
  const set = new Set(tokens);
  for (const t of tokens) {
    const syns = DOMAIN_SYNONYMS[t];
    if (syns) syns.forEach((s) => set.add(s));
  }
  return Array.from(set);
}

export function keywordScore(p: SearchableProduct, tokens: string[]): number {
  const haystack = [
    p.productName,
    p.manufacturer,
    p.categoryLabel,
    p.subcategoryLabel,
    p.materialName,
    p.productType,
    p.materialNotes,
    p.brandDescription,
    ...p.advantages.slice(0, 3),
    p.enClass ?? "",
    p.repairDepth ?? "",
    p.orientation ?? "",
    p.structural ?? "",
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  for (const t of tokens) {
    if (!haystack.includes(t)) continue;
    score += 1;
    if (p.productName.toLowerCase().includes(t)) score += 2;
    if (p.categoryLabel.toLowerCase().includes(t)) score += 1;
    if (p.materialNotes.toLowerCase().includes(t)) score += 1;
  }
  return score;
}
