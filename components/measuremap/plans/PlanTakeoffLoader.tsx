"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// OpenLayers + pdf.js are browser-only and heavy — code-split behind ssr:false.
const PlanTakeoff = dynamic(() => import("./PlanTakeoff"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#565b5e] text-white/80">
      <Loader2 className="h-5 w-5 animate-spin" /> <span className="ml-2 text-sm">Loading takeoff…</span>
    </div>
  ),
});

type Drawing = { id: string; filename: string; mime_type: string | null; url: string | null };
type Page = { id: string; page_number: number; pixels_per_metre: number | null; scale_status: string };

export default function PlanTakeoffLoader({ projectId, drawing, page }: { projectId: string; drawing: Drawing; page: Page }) {
  return <PlanTakeoff projectId={projectId} drawing={drawing} page={page} />;
}
