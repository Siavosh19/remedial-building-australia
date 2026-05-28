export const VALID_CATEGORIES = [
  "Building Commission NSW",
  "DBP Act",
  "Class 2 Buildings",
  "Waterproofing Defects",
  "Façade Defects",
  "Concrete Repair",
  "Strata Defects",
  "Building Defects",
  "Remedial Construction",
  "Product & Material Updates",
  "New Construction Systems",
  "Other",
] as const;

export type NewsCategory = typeof VALID_CATEGORIES[number];

export const FILTER_CATEGORIES = ["All", ...VALID_CATEGORIES] as const;

// ─── Image pools by visual topic ─────────────────────────────────────────────
const IMAGE_DIR = "/Images/News";
const p = (name: string) => `${IMAGE_DIR}/${name}`;

const PHOTOS = {
  // People on site: commissioners, practitioners, engineers, inspectors
  workers: [
    p("news-04.jpg"),  // design practitioner
    p("news-06.jpg"),  // design practitioner
    p("news-02.jpg"),  // building commissioner
    p("news-15.jpg"),  // building commissioner
    p("news-17.jpg"),  // civil engineer inspection
    p("news-14.jpg"),  // rope access technician
  ],
  // Concrete defects: spalling, cracking, structural, magnesite
  concrete: [
    p("news-07.jpg"),  // concrete spalling
    p("news-20.jpg"),  // concrete spalling
    p("news-23.jpg"),  // concrete cracking
    p("news-21.jpg"),  // structural defects
    p("news-22b.jpg"), // concrete and structural
    p("news-25.jpg"),  // magnesite deterioration
  ],
  // Facades: cladding, high-rise, apartments, rope access
  facades: [
    p("news-05.jpg"),  // cladding
    p("news-16.jpg"),  // cladding
    p("news-30.jpg"),  // highrise building
    p("news-08.jpg"),  // apartment building
    p("news-27.jpg"),  // defective apartment
    p("news-03.jpg"),  // class 2 building
  ],
  // Waterproofing: wet areas, planterboxes, water ingress
  waterproofing: [
    p("news-26.jpg"),  // waterproofing issues
    p("news-28.jpg"),  // waterproofing issues
    p("news-09.jpg"),  // waterproofing planterboxes
    p("news-13.jpg"),  // plumbing / stormwater
  ],
  // General site / regulatory / compliance
  site: [
    p("news-10.jpg"),  // NCC building codes / standards
    p("news-24.jpg"),  // remedial works on site
    p("news-01.jpg"),  // general site
    p("news-31.jpg"),  // Sydney skyline
    p("news-22.jpg"),  // building defects general
    p("news-18.jpg"),  // passive fire inspection
    p("news-12.jpg"),  // smoke alarm / electrical services
    p("news-11.jpg"),  // general
    p("news-13.jpg"),  // plumbing / stormwater
  ],
} as const;

type PhotoTopic = keyof typeof PHOTOS;

// ─── Topic tags per clean filename ───────────────────────────────────────────
// Used by the dynamic-pool assignment to match articles to relevant images.
// A file can belong to multiple topics; earlier topics take precedence.
const IMAGE_TOPICS: Record<string, PhotoTopic[]> = {
  "news-01.jpg":  ["site"],
  "news-02.jpg":  ["workers"],
  "news-03.jpg":  ["facades", "site"],
  "news-04.jpg":  ["workers"],
  "news-05.jpg":  ["facades"],
  "news-06.jpg":  ["workers"],
  "news-07.jpg":  ["concrete"],
  "news-08.jpg":  ["facades", "site"],
  "news-09.jpg":  ["waterproofing"],
  "news-10.jpg":  ["site"],
  "news-11.jpg":  ["site"],
  "news-12.jpg":  ["site"],
  "news-13.jpg":  ["waterproofing", "site"],
  "news-14.jpg":  ["facades", "workers"],
  "news-15.jpg":  ["workers"],
  "news-16.jpg":  ["facades"],
  "news-17.jpg":  ["workers"],
  "news-18.jpg":  ["site"],
  "news-20.jpg":  ["concrete"],
  "news-21.jpg":  ["concrete"],
  "news-22.jpg":  ["site"],
  "news-22b.jpg": ["concrete"],
  "news-23.jpg":  ["concrete"],
  "news-24.jpg":  ["site"],
  "news-25.jpg":  ["concrete"],
  "news-26.jpg":  ["waterproofing"],
  "news-27.jpg":  ["facades"],
  "news-28.jpg":  ["waterproofing"],
  "news-30.jpg":  ["facades"],
  "news-31.jpg":  ["facades", "site"],
};

// ─── Category → preferred topic order ────────────────────────────────────────
const CATEGORY_TOPIC_ORDER: Record<NewsCategory, PhotoTopic[]> = {
  "Building Commission NSW":    ["workers", "site", "facades"],
  "DBP Act":                    ["workers", "site", "facades"],
  "Class 2 Buildings":          ["facades", "site", "workers"],
  "Waterproofing Defects":      ["waterproofing", "facades", "site"],
  "Façade Defects":             ["facades", "waterproofing", "workers"],
  "Concrete Repair":            ["concrete", "workers", "site"],
  "Strata Defects":             ["facades", "site", "concrete"],
  "Building Defects":           ["site", "facades", "concrete"],
  "Remedial Construction":      ["site", "workers", "concrete"],
  "Product & Material Updates": ["site", "concrete", "workers"],
  "New Construction Systems":   ["facades", "site", "workers"],
  "Other":                      ["site", "workers", "facades"],
};

const ALL_PHOTOS: string[] = Object.values(PHOTOS).flat();

function titleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Assigns a unique local image to every article.
 *
 * Dynamic mode (imagePool provided): category-aware — picks from topic-tagged
 * images that match the article's category first, then falls back to any unused
 * image in the pool. New images dropped into /Images/News/ are auto-discovered
 * if they are added to IMAGE_TOPICS above.
 *
 * Legacy mode (no imagePool): uses the hardcoded PHOTOS pools (same logic,
 * used as a build-time fallback).
 */
export function assignUniqueImages<T extends { title: string; category: string }>(
  articles: T[],
  reservedImages: string[] = [],
  imagePool?: string[]
): (T & { featured_image: string })[] {
  const used = new Set(reservedImages);

  if (imagePool) {
    const basename = (path: string) => path.split("/").pop() ?? "";

    return articles.map((article) => {
      if (imagePool.length === 0) return { ...article, featured_image: "" };

      const hash = titleHash(article.title ?? "");
      const topicOrder: PhotoTopic[] =
        CATEGORY_TOPIC_ORDER[article.category as NewsCategory] ??
        ["site", "workers", "facades"];

      // Try each preferred topic — pick deterministically from matching unused images
      for (const topic of topicOrder) {
        const candidates = imagePool.filter((path) => {
          const tags = IMAGE_TOPICS[basename(path)];
          return tags?.includes(topic) && !used.has(path);
        });
        if (candidates.length > 0) {
          const image = candidates[hash % candidates.length];
          used.add(image);
          return { ...article, featured_image: image };
        }
      }

      // Fallback: any unused image from pool
      for (let i = 0; i < imagePool.length; i++) {
        const candidate = imagePool[(hash + i) % imagePool.length];
        if (!used.has(candidate)) {
          used.add(candidate);
          return { ...article, featured_image: candidate };
        }
      }

      return { ...article, featured_image: "" };
    });
  }

  // Legacy / build-time fallback — category-matched hardcoded pools
  return articles.map((article) => {
    const hash = titleHash(article.title ?? "");
    const topicOrder: PhotoTopic[] =
      CATEGORY_TOPIC_ORDER[article.category as NewsCategory] ?? ["site"];

    let image: string | undefined;

    for (const topic of topicOrder) {
      const pool = PHOTOS[topic] as readonly string[];
      for (let i = 0; i < pool.length; i++) {
        const candidate = pool[(hash + i) % pool.length];
        if (!used.has(candidate)) { image = candidate; break; }
      }
      if (image) break;
    }

    if (!image) {
      for (let i = 0; i < ALL_PHOTOS.length; i++) {
        const candidate = ALL_PHOTOS[(hash + i) % ALL_PHOTOS.length];
        if (!used.has(candidate)) { image = candidate; break; }
      }
    }

    if (!image) image = ALL_PHOTOS[hash % ALL_PHOTOS.length];

    used.add(image);
    return { ...article, featured_image: image };
  });
}

// Legacy exports kept so ingest route still compiles
export const CATEGORY_IMAGES: Record<string, string> = {};
export function getNewsImage(category: string, title: string): string {
  const topic = (CATEGORY_TOPIC_ORDER[category as NewsCategory]?.[0] ?? "site") as PhotoTopic;
  const pool = PHOTOS[topic] as readonly string[];
  return pool[titleHash(title ?? "") % pool.length];
}
export function getCategoryImage(category: string): string {
  const topic = (CATEGORY_TOPIC_ORDER[category as NewsCategory]?.[0] ?? "site") as PhotoTopic;
  const pool = PHOTOS[topic] as readonly string[];
  return pool[titleHash(category) % pool.length];
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
