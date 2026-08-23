"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Cross-promotion for Mapmetra (our estimating & takeoff product) on the
// business signup form. The slides are finished square ads that already carry
// their own headline and call to action, so the surrounding card stays quiet —
// eyebrow, image, one line, one button. Deliberately NOT rendered on the
// account-type chooser: there is no spare column there and it would compete
// with the four cards.
const SLIDES = [
  { file: "takeoff",         label: "AI takeoff" },
  { file: "one-workflow",    label: "One connected workflow" },
  { file: "ai-pricing",      label: "AI pricing" },
  { file: "tender",          label: "Tender documents" },
  { file: "program",         label: "Construction program" },
  { file: "rate-library",    label: "Rate library" },
  { file: "boq",             label: "Bill of quantities" },
  { file: "wbs",             label: "Work breakdown structure" },
  { file: "project-summary", label: "Project summary" },
  { file: "change-control",  label: "Change control" },
  { file: "map-measure",     label: "Measure from an address" },
];

const ROTATE_MS = 5000;

// Current slide plus the one either side, wrapping at both ends.
const near = (i: number, at: number) => {
  const n = SLIDES.length;
  return i === at || i === (at + 1) % n || i === (at - 1 + n) % n;
};

export default function MapmetraPromo() {
  const [at, setAt] = useState(0);
  const [paused, setPaused] = useState(false);
  // Respect the OS "reduce motion" setting — no auto-rotation, dots only.
  const [still, setStill] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (still || paused) return;
    timer.current = setInterval(() => setAt((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [still, paused]);

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 text-[11px] font-semibold text-slate-500">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1b54d6]" aria-hidden="true" />
        Also from Remedial Building Australia
      </p>

      <div className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#eef3fd]">
          {SLIDES.map((s, i) =>
            // Only the current slide and its two neighbours are in the DOM. All
            // eleven at once would be ~640 KB of images on a signup page; this
            // keeps the first paint to one and loads the rest as they come up
            // (revisited slides come straight from cache).
            near(i, at) ? (
              <Image
                key={s.file}
                src={`/Images/mapmetra/${s.file}.webp`}
                alt={`Mapmetra — ${s.label}`}
                fill
                sizes="(max-width: 1023px) 100vw, 320px"
                loading={i === 0 ? "eager" : "lazy"}
                className={`object-cover transition-opacity duration-500 ${i === at ? "opacity-100" : "opacity-0"}`}
              />
            ) : null,
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Choose a screenshot">
          {SLIDES.map((s, i) => (
            <button
              key={s.file}
              type="button"
              aria-label={s.label}
              aria-current={i === at}
              onClick={() => setAt(i)}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === at ? "scale-150 bg-[#1b54d6]" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          <b className="font-bold text-[#0a2a5e]">Mapmetra</b>{" — "}
          estimating &amp; takeoff built for remedial work. Measure from an address, take off the plans,
          price it and send the tender in one connected workflow.
        </p>

        <a
          href="https://www.mapmetra.com"
          target="_blank"
          rel="noopener"
          className="mt-3.5 block rounded-xl bg-[#1b54d6] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1746b4]"
        >
          Start a 14-day free trial &rarr;
        </a>
        <p className="mt-2 text-center text-[11px] text-slate-400">No card required</p>
      </div>
    </div>
  );
}
