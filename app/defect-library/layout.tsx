import TermsGate from "@/app/components/TermsGate";

export default function DefectLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TermsGate />
    </>
  );
}
