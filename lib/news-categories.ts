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

// ─── Local industry news image pool (public/Images/News) ─────────────────────
const IMAGE_DIR = "/Images/News";
const p = (name: string) => `${IMAGE_DIR}/${name}`;

const PHOTOS = {
  workers: [
    p("news-04.jpg"), // design practitioner
    p("news-06.jpg"), // design practitioner
    p("news-17.jpg"), // civil engineer inspection
    p("news-15.jpg"), // building commissioner
    p("news-02.jpg"), // building commissioner
    p("news-14.jpg"), // rope access
  ],
  concrete: [
    p("news-07.jpg"), // concrete spalling
    p("news-20.jpg"), // concrete spalling
    p("news-21.jpg"), // structural defects
    p("news-22b.jpg"), // concrete and structural
    p("news-23.jpg"), // concrete cracking
    p("news-25.jpg"), // magnesite deterioration
  ],
  facades: [
    p("news-05.jpg"), // cladding
    p("news-16.jpg"), // cladding
    p("news-22.jpg"), // building defects
    p("news-30.jpg"), // highrise building
    p("news-03.jpg"), // class 2 building registration
    p("news-08.jpg"), // apartment
    p("news-27.jpg"), // defective apartment
  ],
  site: [
    p("news-01.jpg"),
    p("news-10.jpg"), // NCC building codes
    p("news-24.jpg"), // remedial works
    p("news-11.jpg"),
    p("news-13.jpg"), // plumbing stormwater
    p("news-31.jpg"), // Sydney
  ],
  waterproofing: [
    p("news-26.jpg"), // waterproofing issues
    p("news-28.jpg"), // waterproofing issues
    p("news-09.jpg"), // waterproofing planterboxes
    p("news-18.jpg"), // passive fire/waterproofing
    p("news-12.jpg"), // smoke alarm / services
  ],
};

// Category → preferred topic order
const CATEGORY_TOPIC_ORDER: Record<NewsCategory, Array<keyof typeof PHOTOS>> = {
  "Building Commission NSW":    ["workers", "site", "concrete"],
  "DBP Act":                    ["site", "workers", "concrete"],
  "Class 2 Buildings":          ["site", "facades", "workers"],
  "Strata Defects":             ["site", "concrete", "workers"],
  "Waterproofing Defects":      ["waterproofing", "concrete", "site"],
  "Façade Defects":             ["facades", "concrete", "workers"],
  "Concrete Repair":            ["concrete", "workers", "site"],
  "Building Defects":           ["site", "workers", "concrete"],
  "Remedial Construction":      ["site", "workers", "concrete"],
  "Product & Material Updates": ["site", "concrete", "workers"],
  "New Construction Systems":   ["site", "workers", "concrete"],
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
 * When `imagePool` is supplied (dynamic filesystem list from /api/news-images),
 * uses that pool — hash-based so assignments are deterministic.
 * Falls back to empty string when pool exhausted; caller handles gracefully.
 *
 * When `imagePool` is omitted, uses the hardcoded category-matched pools above.
 */
export function assignUniqueImages<T extends { title: string; category: string }>(
  articles: T[],
  reservedImages: string[] = [],
  imagePool?: string[]
): (T & { featured_image: string })[] {
  const used = new Set(reservedImages);

  if (imagePool) {
    return articles.map((article) => {
      if (imagePool.length === 0) return { ...article, featured_image: "" };
      const hash = titleHash(article.title ?? "");
      let image: string | undefined;
      for (let i = 0; i < imagePool.length; i++) {
        const candidate = imagePool[(hash + i) % imagePool.length];
        if (!used.has(candidate)) { image = candidate; break; }
      }
      if (!image) return { ...article, featured_image: "" };
      used.add(image);
      return { ...article, featured_image: image };
    });
  }

  // Legacy / fallback mode — category-matched hardcoded pools
  return articles.map((article) => {
    const hash = titleHash(article.title ?? "");
    const topicOrder = (CATEGORY_TOPIC_ORDER[article.category as NewsCategory] ?? ["site"]) as Array<keyof typeof PHOTOS>;

    let image: string | undefined;

    for (const topic of topicOrder) {
      const pool = PHOTOS[topic];
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
  const topic = CATEGORY_TOPIC_ORDER[category as NewsCategory]?.[0] ?? "site";
  const pool = PHOTOS[topic] ?? ALL_PHOTOS;
  return pool[titleHash(title ?? "") % pool.length];
}
export function getCategoryImage(category: string): string {
  const topic = CATEGORY_TOPIC_ORDER[category as NewsCategory]?.[0] ?? "site";
  const pool = PHOTOS[topic] ?? ALL_PHOTOS;
  return pool[titleHash(category) % pool.length];
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
