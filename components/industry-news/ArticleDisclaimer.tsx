import { AlertCircle } from "lucide-react";

export function ArticleDisclaimer() {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
      <AlertCircle size={14} className="mt-0.5 shrink-0 text-amber-600" />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">General Information Disclaimer</p>
        <p className="mt-1 text-xs leading-relaxed text-amber-800">
          The information on this page is general industry information only and does not constitute legal, engineering, building, insurance, or professional advice. Users should seek independent professional advice relevant to their specific circumstances. While reasonable efforts are made to ensure accuracy, Remedial Building Australia does not guarantee the completeness or reliability of this information.{" "}
          <a href="/terms" className="font-semibold underline hover:text-amber-900 transition">
            Terms &amp; Conditions
          </a>
        </p>
      </div>
    </div>
  );
}
