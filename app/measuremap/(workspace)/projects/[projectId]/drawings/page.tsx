import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { FileText } from "lucide-react";

export default async function DrawingsPage() {
  await requireMeasureMapUser();
  return (
    <div className="flex h-full items-center justify-center bg-slate-100 p-8">
      <div className="max-w-sm rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <FileText className="mx-auto h-8 w-8 text-slate-300" />
        <p className="mt-3 text-sm font-semibold text-slate-700">Drawings & scale calibration</p>
        <p className="mt-1 text-sm text-slate-500">Upload PDF/image plans, calibrate a scale, and measure on drawings. Arriving in Phase 4.</p>
      </div>
    </div>
  );
}
