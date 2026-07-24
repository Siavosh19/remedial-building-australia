import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Remedial Building Australia | Strata Directory & Remedial Building Platform",
  description:
    "Australia's strata directory and remedial building platform for jobs, technical resources and industry connections.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
