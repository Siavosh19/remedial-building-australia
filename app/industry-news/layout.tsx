import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry News | Remedial Building Australia",
  description:
    "Tracking Australian remedial building updates — Building Commission NSW, waterproofing compliance, façade defects, strata issues, concrete repair and DBP Act developments.",
  openGraph: {
    title: "Industry News | Remedial Building Australia",
    description:
      "Tracking Australian remedial building updates — Building Commission NSW, waterproofing compliance, façade defects, strata issues, concrete repair and DBP Act developments.",
    type: "website",
    siteName: "Remedial Building Australia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry News | Remedial Building Australia",
    description:
      "Tracking Australian remedial building updates — Building Commission NSW, waterproofing compliance, façade defects, strata issues, concrete repair and DBP Act developments.",
  },
};

export default function IndustryNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
