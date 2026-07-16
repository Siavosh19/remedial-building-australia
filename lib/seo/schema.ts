import { SITE_URL, SITE_NAME, canonicalUrl, type SeoCompany } from "./business-profile";

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD builders for directory business profiles.
//
// Google requires structured data to reflect what's VISIBLE on the page. Contact
// fields (telephone, website) are only rendered for claimed profiles, so they are
// emitted here only when `showContact` is true — preventing a structured-data /
// visible-content mismatch that could trigger a manual action.
// ─────────────────────────────────────────────────────────────────────────────

export type SchemaOpts = {
  /** True when phone/website are actually rendered on the page (claimed listings). */
  showContact: boolean;
};

function postalAddress(c: SeoCompany) {
  const l = c.locations?.[0];
  if (!l) return undefined;
  return {
    "@type": "PostalAddress",
    ...(l.suburb ? { addressLocality: l.suburb } : {}),
    ...(l.state ? { addressRegion: l.state } : {}),
    ...(l.postcode ? { postalCode: l.postcode } : {}),
    addressCountry: "AU",
  };
}

export function localBusinessSchema(c: SeoCompany, opts: SchemaOpts) {
  const url = canonicalUrl(c.slug);
  const l = c.locations?.[0];
  const desc = (c.full_description || c.description || "").trim();
  const address = postalAddress(c);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: c.name,
    url,
    ...(c.logo_url ? { image: c.logo_url, logo: c.logo_url } : {}),
    ...(desc ? { description: desc.slice(0, 300) } : {}),
    ...(c.main_category?.name ? { additionalType: c.main_category.name } : {}),
    ...(opts.showContact && c.phone ? { telephone: c.phone } : {}),
    ...(opts.showContact && c.website ? { sameAs: [c.website] } : {}),
    ...(address ? { address } : {}),
    areaServed: l?.services_nationwide ? "AU" : l?.state ?? "AU",
  };
}

export function organizationSchema(c: SeoCompany, opts: SchemaOpts) {
  const url = canonicalUrl(c.slug);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#organization`,
    name: c.name,
    url,
    ...(c.logo_url ? { logo: c.logo_url } : {}),
    ...(opts.showContact && c.website ? { sameAs: [c.website] } : {}),
  };
}

export function breadcrumbSchema(c: SeoCompany) {
  const url = canonicalUrl(c.slug);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: `${SITE_NAME} Directory`, item: `${SITE_URL}/directory` },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
    ],
  };
}

/** All profile JSON-LD as an array, ready to serialise into <script> tags. */
export function profileJsonLd(c: SeoCompany, opts: SchemaOpts) {
  return [localBusinessSchema(c, opts), organizationSchema(c, opts), breadcrumbSchema(c)];
}
