import type { Metadata } from "next";
import UnderDevelopment from "@/components/UnderDevelopment";
import { underDevelopmentSection } from "@/lib/under-development";

const disconnected = underDevelopmentSection("/industry-news");

const liveMetadata: Metadata = {
  title: "News & Insights | Remedial Building Australia",
  description:
    "Stay updated with Class 2 building works and remedial building news — waterproofing, façade defects, concrete repair and strata issues.",
  openGraph: {
    title: "News & Insights | Remedial Building Australia",
    description:
      "Stay updated with Class 2 building works and remedial building news — waterproofing, façade defects, concrete repair and strata issues.",
    type: "website",
    siteName: "Remedial Building Australia",
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Insights | Remedial Building Australia",
    description:
      "Stay updated with Class 2 building works and remedial building news — waterproofing, façade defects, concrete repair and strata issues.",
  },
};

// While the section is disconnected it must not be indexed (see
// lib/under-development.ts); it is dropped from the sitemap for the same reason.
export const metadata: Metadata = disconnected
  ? {
      title: "News & Insights — under development | Remedial Building Australia",
      description: "The Remedial Building Australia news section is under development and will be back soon.",
      robots: { index: false, follow: true },
    }
  : liveMetadata;

export default function IndustryNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // DISCONNECTED — the real News & Insights pages are untouched; they simply
  // aren't rendered while the section is listed in lib/under-development.ts.
  if (disconnected) return <UnderDevelopment section={disconnected} />;

  return <>{children}</>;
}
