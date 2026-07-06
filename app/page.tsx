import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Remedial Building Australia | Remedial Building Advice, Defects & Repair Systems",
  description:
    "Remedial Building Australia provides remedial building advice, defect guidance, repair system information, remedial specifications, expert remedial services and an AI-powered directory for construction and building businesses across Australia.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
