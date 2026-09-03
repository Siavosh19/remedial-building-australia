// Which bucket a news source falls into in the admin review list.
//
// The row colour in /directory/admin/news-articles comes from here, and so
// does how much care an article needs before it goes live. Three tiers, in
// descending order of how safe republication is:
//
//   government — the agency's own site. Crown material, usually licensed for
//                reuse, and lawyered before it was posted. Safest thing on the
//                page. Decided by lib/gov-sources.ts, unchanged.
//   trusted    — an Australian industry peak body or association. Media
//                releases exist to be picked up, so the defamation risk sits
//                with them; the copyright is still theirs, so summarise and
//                link, never lift.
//   other      — whatever the Google News search feeds drag in. Could be a
//                trade magazine, could be a press-release mill. Read it first.
//
// Nothing here filters ingestion. Every article still arrives as a draft and
// still needs a human to publish it — this only sorts and colours the queue.

import { isGovernmentSourceUrl } from "@/lib/gov-sources";

export type SourceTier = "government" | "trusted" | "other";

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

export function sourceTier(url: string | null | undefined): SourceTier {
  if (isGovernmentSourceUrl(url)) return "government";
  if (trustedBodyName(url)) return "trusted";
  return "other";
}

/** Row styling per tier. Government keeps the amber it has always had. */
export const TIER_STYLE: Record<SourceTier, { row: string; card: string; badge: string; label: string }> = {
  government: {
    row: "border-amber-200 bg-amber-50 hover:bg-amber-100",
    card: "border-amber-300 bg-amber-50",
    badge: "bg-amber-200 text-amber-900",
    label: "Gov source",
  },
  trusted: {
    row: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
    card: "border-emerald-300 bg-emerald-50",
    badge: "bg-emerald-200 text-emerald-900",
    label: "Industry body",
  },
  other: {
    row: "border-slate-100 hover:bg-slate-50",
    card: "border-slate-200 bg-white",
    badge: "",
    label: "",
  },
};
