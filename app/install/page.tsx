import type { Metadata } from "next";
import InstallGuide from "@/components/InstallGuide";

export const metadata: Metadata = {
  title: "Install the app | Remedial Building Australia",
  description:
    "Step-by-step guide to add the Remedial Building Australia app to your iPhone or Android home screen for faster access and offline reading.",
  alternates: { canonical: "/install" },
};

export default function InstallPage() {
  return <InstallGuide />;
}
