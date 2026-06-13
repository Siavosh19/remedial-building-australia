"use client";

import { useState, useEffect } from "react";
import { X, Map, ChevronRight, ZoomIn } from "lucide-react";

const SYSTEMS = [
  {
    num: "01",
    label: "Waterproofing Systems",
    href: "/repair-systems/waterproofing-water-ingress",
    color: "bg-sky-950",
    subs: [
      { label: "Balcony, roof, planter box & podium waterproofing failure", href: "/repair-systems/balcony-waterproofing-failure" },
      { label: "Rising damp", href: "/repair-systems/rising-damp" },
      { label: "Basement water ingress", href: "/repair-systems/basement-water-ingress" },
      { label: "Penetrating damp", href: "/repair-systems/penetrating-damp" },
    ],
  },
  {
    num: "02",
    label: "Concrete & Structural Defect Repair Systems",
    href: "/repair-systems/concrete-structural-defects",
    color: "bg-sky-800",
    subs: [
      { label: "Concrete spalling", href: "/repair-systems/concrete-spalling" },
      { label: "Reinforcement corrosion", href: "/repair-systems/reinforcement-corrosion" },
      { label: "Concrete cracking", href: "/repair-systems/concrete-cracking" },
      { label: "Settlement cracks", href: "/repair-systems/settlement-cracks" },
      { label: "Slab edge deterioration", href: "/repair-systems/slab-edge-deterioration" },
      { label: "Magnesite flooring deterioration", href: "/repair-systems/magnesite-flooring-deterioration" },
    ],
  },
  {
    num: "03",
    label: "Facade & External Envelope Repair Systems",
    href: "/repair-systems/facade-external-envelope",
    color: "bg-teal-700",
    subs: [
      { label: "Render repair systems", href: "/repair-systems/facade-external-envelope/render-repair-systems" },
      { label: "Masonry & structural", href: "/repair-systems/facade-external-envelope/masonry-structural" },
      { label: "Cladding", href: "/repair-systems/facade-external-envelope/cladding" },
      { label: "Sealants, joints & cracks", href: "/repair-systems/facade-external-envelope/sealants-joints-cracks" },
      { label: "Windows, doors & penetrations", href: "/repair-systems/facade-external-envelope/windows-doors-penetrations" },
      { label: "Coatings", href: "/repair-systems/facade-external-envelope/external-coating-paint-deterioration" },
    ],
  },
  {
    num: "04",
    label: "Roofing Defect Repair Systems",
    href: "/repair-systems/roofing-defects",
    color: "bg-orange-700",
    subs: [
      { label: "Roof leaks — pitched tiled roof", href: "/repair-systems/roofing-defects/roof-leaks-pitched-tiled-roof" },
      { label: "Roof leaks — metal sheet roof", href: "/repair-systems/roofing-defects/roof-leaks-metal-sheet-roof" },
      { label: "Box gutter failure", href: "/repair-systems/roofing-defects/box-gutter-failure" },
      { label: "Flashing failures", href: "/repair-systems/roofing-defects/flashing-failures" },
      { label: "Overflow issues", href: "/repair-systems/roofing-defects/overflow-issues" },
      { label: "Skylight replacement", href: "/repair-systems/roofing-defects/skylight-replacement" },
      { label: "Roof access hatch", href: "/repair-systems/roofing-defects/roof-access-hatch" },
      { label: "Gutter replacement", href: "/repair-systems/roofing-defects/gutter-replacement" },
    ],
  },
];

const IMG_SRC = "/Images/repair-systems-library-map.png";
const IMG_ALT = "Repair Systems Library Map — visual navigation guide showing all four system categories and their subcategories";

export default function LibraryMapModal() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  // Lock/unlock body scroll
  useEffect(() => {
    document.body.style.overflow = open || lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, lightbox]);

  // Escape key: close lightbox first, then modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (lightbox) { setLightbox(false); return; }
        setOpen(false);
      }
    }
    if (open || lightbox) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lightbox]);

  return (
    <>
      {/* ── Notification bar ── */}
      <div className="mx-auto max-w-7xl px-8 pb-2 -mt-8">
        <div className="flex flex-col gap-3 rounded-xl border border-sky-200 bg-sky-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-sky-950">Not sure where to start?</p>
            <p className="mt-0.5 text-xs leading-5 text-sky-800">
              Open the Repair Systems Library Map to see all system categories and subcategories before choosing.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-sky-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-800"
          >
            <Map size={13} />
            Open Library Map
          </button>
        </div>
      </div>

      {/* ── Main modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Repair Systems Library Map"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 flex w-full flex-col bg-white sm:mx-4 sm:max-w-3xl sm:rounded-2xl overflow-hidden max-h-[92dvh] sm:max-h-[88vh]">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-sky-950 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Map size={16} className="text-sky-300" />
                <span className="text-sm font-bold text-white">Repair Systems Library Map</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto overscroll-contain px-6 py-6">

              {/* Intro */}
              <p className="mb-6 text-xs text-slate-500">
                Select any system or subcategory below to browse the technical product pages.
              </p>

              {/* Clickable directory list */}
              <div className="space-y-5">
                {SYSTEMS.map((sys) => (
                  <div key={sys.num} className="overflow-hidden rounded-xl border border-slate-200">
                    <a
                      href={sys.href}
                      className={`flex items-center gap-3 px-4 py-3 transition hover:opacity-90 ${sys.color}`}
                    >
                      <span className="shrink-0 text-xs font-black tracking-widest text-white/60">{sys.num}</span>
                      <span className="flex-1 text-sm font-bold text-white">{sys.label}</span>
                      <ChevronRight size={14} className="shrink-0 text-white/50" />
                    </a>
                    <ul className="divide-y divide-slate-100 bg-white">
                      {sys.subs.map((sub) => (
                        <li key={sub.href}>
                          <a
                            href={sub.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-sky-800"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                            {sub.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Note */}
              <p className="mt-6 text-center text-xs text-slate-400">
                Tap any item to go directly to that repair system page.
              </p>

              {/* ── Infographic image ── */}
              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setLightbox(true)}
                  className="group relative block w-full"
                  aria-label="Open full-size library map image"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG_SRC}
                    alt={IMG_ALT}
                    className="w-full object-contain"
                  />
                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-bold text-white">
                      <ZoomIn size={13} /> View full size
                    </span>
                  </div>
                </button>
                <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-center">
                  <span className="text-xs text-slate-400">Tap image to view full size</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full size library map"
          onClick={() => setLightbox(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close full size view"
          >
            <X size={20} />
          </button>

          {/* Scrollable image container — allows pinch-to-zoom on mobile */}
          <div
            className="max-h-full max-w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG_SRC}
              alt={IMG_ALT}
              className="block max-w-none w-auto h-auto"
              style={{ maxHeight: "90dvh", maxWidth: "95dvw" }}
            />
          </div>

          <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/40">
            Tap outside or press Esc to close
          </p>
        </div>
      )}
    </>
  );
}
