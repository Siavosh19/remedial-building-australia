import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Remedial Building Australia | Strata Directory & Remedial Building Platform",
  description:
    "Australia's remedial building directory — business listings, industry news, jobs and expert desktop review.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
