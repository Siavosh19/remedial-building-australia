import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Remedial Building Australia | Remedial Building Advice, Defects & Repair Systems",
  description:
    "Australia's strata and remedial building directory — connect owners corporations and strata managers with remedial contractors, consultants, engineers and suppliers. Plus Strata Connect quote requests, a defect library, repair systems, industry news and expert remedial advice.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
