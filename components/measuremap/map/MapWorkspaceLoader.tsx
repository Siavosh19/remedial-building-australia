"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { ApiItem, ApiCategory, ApiAnnotation } from "./api";

// Client-side dynamic import with ssr:false — required because MapWorkspace pulls
// in OpenLayers (browser-only) and must be code-split out of the main bundle.
const MapWorkspace = dynamic(() => import("./MapWorkspace"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-200 text-slate-500">
      <Loader2 className="h-5 w-5 animate-spin" /> <span className="ml-2 text-sm">Loading map…</span>
    </div>
  ),
});

export default function MapWorkspaceLoader(props: {
  project: { id: string; latitude: number | null; longitude: number | null; full_address: string };
  initialItems: ApiItem[];
  initialCategories: ApiCategory[];
  initialAnnotations: ApiAnnotation[];
}) {
  return <MapWorkspace {...props} />;
}
