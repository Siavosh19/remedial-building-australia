import TermsGate from "@/app/components/TermsGate";

export default function RepairSystemsLayout({
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
