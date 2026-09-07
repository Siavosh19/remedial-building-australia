// Which bucket a news article falls into in the admin review list.
//
// The row colour in /directory/admin/news-articles comes from here, and so
// does how much care an article needs before it goes live. Four buckets:
//
//   government  — the agency's own site. Crown material, usually licensed for
//                 reuse, and lawyered before it was posted. Safest thing on the
//                 page. Decided by lib/gov-sources.ts.
//   gov_topic   — someone else's write-up of a government matter: a regulator,
//                 an Act, a code change, an NCC building class. Not an official
//                 source, but the same subject.
//   trusted     — an Australian industry peak body or association. Media
//                 releases exist to be picked up, so the defamation risk sits
//                 with them; the copyright is still theirs, so summarise and
//                 link, never lift.
//   other       — whatever the Google News search feeds drag in. Could be a
//                 trade magazine, could be a press-release mill. Read it first.
//
// Everything with a government angle is greyed out, so the ordinary trade,
// product and market stories stay white and stand out against it.
//
// Nothing here filters ingestion. Every article still arrives as a draft and
// still needs a human to publish it — this only sorts and colours the queue.

import { governmentAgencyFromUrl, governmentMatch, isGovernmentRelated, isGovernmentSourceUrl } from "@/lib/gov-sources";

export type SourceTier = "government" | "trusted" | "other";
export type ReviewTier = "government" | "gov_topic" | "trusted" | "other";

// Australian industry peak bodies and associations, keyed by registrable
// domain. Subdomains count, so "media.hia.com.au" matches "hia.com.au".
//
// The value is the display name, used when the feed gave us a useless
// source_name (Google News hands back the outlet, not the body).
const TRUSTED_HOSTS: Record<string, string> = {
  // Builder and construction bodies
  "masterbuilders.com.au": "Master Builders Australia",
  "mbansw.asn.au": "Master Builders NSW",
  "mbav.com.au": "Master Builders Victoria",
  "mbqld.com.au": "Master Builders Queensland",
  "hia.com.au": "Housing Industry Association",
  "australianconstructors.com.au": "Australian Constructors Association",

  // Strata and owners — the most relevant to remedial work
  "strata.community": "Strata Community Association",
  "ocn.org.au": "Owners Corporation Network",

  // Property and development
  "propertycouncil.com.au": "Property Council of Australia",

  // Professional institutes
  "engineersaustralia.org.au": "Engineers Australia",
  "aib.org.au": "Australian Institute of Building",
  "aibs.com.au": "Australian Institute of Building Surveyors",
  "architecture.com.au": "Australian Institute of Architects",
  "consultaustralia.com.au": "Consult Australia",

  // Technical bodies covering the trades RBA lists
  "concreteinstitute.com.au": "Concrete Institute of Australia",
  "corrosion.com.au": "Australasian Corrosion Association",
  "fpaa.com.au": "Fire Protection Association Australia",
  "steel.org.au": "Australian Steel Institute",
  "awci.org.au": "Association of Wall and Ceiling Industries",
};

/** The registrable domains behind the trusted tier — used to filter the admin list. */
export const TRUSTED_DOMAINS: string[] = Object.keys(TRUSTED_HOSTS);

function hostOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** The peak body this URL belongs to, or null. */
export function trustedBodyName(url: string | null | undefined): string | null {
  const host = hostOf(url);
  if (!host) return null;
  for (const [domain, name] of Object.entries(TRUSTED_HOSTS)) {
    if (host === domain || host.endsWith(`.${domain}`)) return name;
  }
  return null;
}

/** Who published it. Provenance only — says nothing about the subject. */
export function sourceTier(url: string | null | undefined): SourceTier {
  if (isGovernmentSourceUrl(url)) return "government";
  if (trustedBodyName(url)) return "trusted";
  return "other";
}

/**
 * The bucket a row is shown in. Provenance wins over subject: a Master Builders
 * release about the NCC stays green, because where it came from is what decides
 * how safely it can be republished. Only articles with no useful provenance
 * fall through to the subject test.
 */
export function reviewTier(article: {
  source_url?: string | null;
  title?: string | null;
  summary?: string | null;
  category?: string | null;
  tags?: string[] | null;
}): ReviewTier {
  if (isGovernmentSourceUrl(article.source_url)) return "government";
  if (trustedBodyName(article.source_url)) return "trusted";
  if (isGovernmentRelated(article)) return "gov_topic";
  return "other";
}

/**
 * What the badge says when you hover it. A grey row is a judgement call made by
 * keyword, so it shows the words it was made on — otherwise the only way to
 * question the colour is to guess at it.
 */
export function tierHint(
  article: Parameters<typeof reviewTier>[0],
  tier: ReviewTier = reviewTier(article),
): string {
  if (tier === "government") {
    const agency = article.source_url ? governmentAgencyFromUrl(article.source_url) : null;
    return agency
      ? `Published by ${agency} — the agency's own website.`
      : "Published on a government website.";
  }
  if (tier === "trusted") {
    const body = trustedBodyName(article.source_url);
    return body ? `Published by ${body}.` : "Published by an industry peak body.";
  }
  if (tier === "gov_topic") {
    const matched = governmentMatch(article);
    return matched
      ? `Government angle — matched "${matched}". Someone else's write-up, not an official source.`
      : "Government angle. Someone else's write-up, not an official source.";
  }
  return "";
}

/** True for both government buckets — the ones that get the grey row. */
export function isGovernmentTier(tier: ReviewTier): boolean {
  return tier === "government" || tier === "gov_topic";
}

/**
 * Row styling per bucket. Government goes grey and ordinary news stays white,
 * so the stories that need reading are the ones that catch the eye.
 */
export const TIER_STYLE: Record<ReviewTier, { row: string; card: string; badge: string; label: string }> = {
  government: {
    row: "border-slate-300 bg-slate-200/70 hover:bg-slate-300/70",
    card: "border-slate-300 bg-slate-200/70",
    badge: "bg-slate-700 text-white",
    label: "Gov source",
  },
  gov_topic: {
    row: "border-slate-200 bg-slate-100 hover:bg-slate-200",
    card: "border-slate-300 bg-slate-100",
    badge: "bg-slate-300 text-slate-800",
    label: "Government",
  },
  trusted: {
    row: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
    card: "border-emerald-300 bg-emerald-50",
    badge: "bg-emerald-200 text-emerald-900",
    label: "Industry body",
  },
  other: {
    row: "border-slate-100 bg-white hover:bg-sky-50/60",
    card: "border-slate-200 bg-white",
    badge: "",
    label: "",
  },
};
