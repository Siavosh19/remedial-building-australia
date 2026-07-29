"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// OpenLayers + pdf.js are browser-only and heavy — code-split behind ssr:false.
const PlanTakeoff = dynamic(() => import("./PlanTakeoff"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#0c2b3f] text-white/70">
      <Loader2 className="h-5 w-5 animate-spin" /> <span className="ml-2 text-sm">Loading takeoff…</span>
    </div>
  ),
});

type Plan = { id: string; filename: string; mime_type: string | null; url: string | null; page: { id: string; pixels_per_metre: number | null; scale_status: string } | null };

export default function PlanTakeoffLoader({ projectId, plan }: { projectId: string; plan: Plan }) {
  return <PlanTakeoff projectId={projectId} plan={plan} />;
}
