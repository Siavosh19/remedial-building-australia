import type { Metadata } from "next";
import TermsGate from "@/app/components/TermsGate";
import UnderDevelopment from "@/components/UnderDevelopment";
import { underDevelopmentSection } from "@/lib/under-development";

const disconnected = underDevelopmentSection("/defect-library");

// While the section is disconnected it must not be indexed (see
// lib/under-development.ts); it is dropped from the sitemap for the same reason.
export const metadata: Metadata = disconnected
  ? {
      title: "Defect Library — under development | Remedial Building Australia",
      description: "The Remedial Building Australia defect library is under development and will be back soon.",
      robots: { index: false, follow: true },
    }
  : {};

export default function DefectLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // DISCONNECTED — the real Defect Library pages are untouched; they simply
  // aren't rendered while the section is listed in lib/under-development.ts.
  if (disconnected) return <UnderDevelopment section={disconnected} />;

  return (
    <>
      {children}
      <TermsGate />
    </>
  );
}
