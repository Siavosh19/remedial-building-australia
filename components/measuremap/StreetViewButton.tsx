"use client";

import { Eye } from "lucide-react";

// Opens Google Street View in a new tab using coordinates (preferred) or the
// encoded address. Not embedded — no Google API/licence required. Disabled with
// a hint if the project somehow has no coordinates (fails gracefully).
export default function StreetViewButton({
  latitude,
  longitude,
  address,
}: {
  latitude: number | null;
  longitude: number | null;
  address: string;
}) {
  const hasCoords = Number.isFinite(latitude) && Number.isFinite(longitude);

  function open() {
    const url = hasCoords
      ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={open}
      title="Open Google Street View in a new tab"
      className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      <Eye className="h-4 w-4" /> Street View
    </button>
  );
}
