// Single source of truth for site sections that are temporarily DISCONNECTED
// while they are still being built. A disconnected section keeps all of its
// links (nav, homepage, footers, external/Google results all still resolve),
// but every route beneath it renders the "Under development" notice from
// components/UnderDevelopment.tsx instead of its real content.
//
// Nothing is deleted — the pages, data and components are untouched. To
// RECONNECT a section, delete its entry from the list below and the real pages
// come straight back on the next deploy. The same list also keeps the section
// out of the sitemap (app/sitemap.ts) while it is disconnected.

export type UnderDevelopmentSection = {
  /** Route prefix that is disconnected — this path and everything beneath it. */
  path: string;
  /** Section name shown on the notice. */
  title: string;
  /** One-line explanation of what is coming. */
  blurb: string;
};

export const UNDER_DEVELOPMENT_SECTIONS: UnderDevelopmentSection[] = [
  {
    path: "/repair-systems",
    title: "Repair Systems",
    blurb:
      "Our repair system library, system selector and product guidance are being rebuilt and expanded before they go live.",
  },
  {
    path: "/defect-library",
    title: "Defect Library",
    blurb:
      "The defect library — causes, risks and repair pathways for common Class 2 building defects — is being finalised before it goes live.",
  },
  {
    path: "/industry-news",
    title: "News & Insights",
    blurb:
      "Our industry news feed is being reworked so we can bring you Australian remedial building updates properly.",
  },
];

/** The disconnected section covering this path, or null when it is live. */
export function underDevelopmentSection(
  pathname: string,
): UnderDevelopmentSection | null {
  for (const section of UNDER_DEVELOPMENT_SECTIONS) {
    if (pathname === section.path || pathname.startsWith(`${section.path}/`)) {
      return section;
    }
  }
  return null;
}

/** True when the given path sits inside a section that is under development. */
export function isUnderDevelopment(pathname: string): boolean {
  return underDevelopmentSection(pathname) !== null;
}
