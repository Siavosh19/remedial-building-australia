// Single source of truth for Expert Remedial Advice services that are
// temporarily hidden from the public site — both the listings (nav dropdown,
// homepage carousel, section page, sitemap) and the linked detail/request
// pages (which 404 while hidden).
//
// To UN-HIDE a service, delete its slug from this set. Everything reappears and
// its pages resolve again — nothing is deleted, this is purely a visibility gate.
export const HIDDEN_EXPERT_SERVICE_SLUGS = new Set<string>([
  "preliminary-defect-assessment",
  "pre-purchase-apartment-defect-review",
]);

// True when the given href or slug belongs to a currently-hidden service.
export function isExpertServiceHidden(hrefOrSlug: string): boolean {
  for (const slug of HIDDEN_EXPERT_SERVICE_SLUGS) {
    if (hrefOrSlug === slug || hrefOrSlug.endsWith(`/${slug}`)) return true;
  }
  return false;
}
