"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Strata Connect feature/benefit slides. Each slide is split half image / half
// text and the set auto-crossfades. All slide text is rendered in the DOM (only
// hidden via opacity), so it stays crawlable for SEO. Images are strata-related
// shots reused from the news library in /public/Images.
type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

const SLIDES: Slide[] = [
  {
    image: "/Images/News8-Apartment.jpg",
    alt: "Strata apartment building serviced through Strata Connect",
    eyebrow: "One request, every trade",
    title: "From remedial works to cleaning — all in one place",
    body:
      "Whether it's waterproofing, concrete repair, façades and roofing or everyday building cleaning, gardening and maintenance, a single Strata Connect request reaches the right specialists across every trade.",
    points: [
      "Every remedial and building services trade covered",
      "One work order, matched to the right categories",
    ],
  },
  {
    image: "/Images/News14 Rope Access.jpg",
    alt: "Remedial rope-access work on a strata building",
    eyebrow: "Quotes, faster",
    title: "Reach available businesses near the building",
    body:
      "Your work order is matched instantly to verified businesses that are available and operating in the right location — so competitive quotes come back quickly, with no chasing trades or cold-calling one contractor at a time.",
    points: [
      "Matched to verified, available specialists",
      "Compare competitive quotes side by side",
    ],
  },
  {
    image: "/Images/News 30 Highrise Building.jpg",
    alt: "High-rise strata building managed with Strata Connect",
    eyebrow: "Submit once, not every time",
    title: "No repeating a quote form for every job",
    body:
      "Owners corporations and strata managers simply forward a work order or scope of works. Strata Connect handles the matching and broadcasting — you stay in control while the right specialists come to you.",
    points: [
      "Forward a work order — no repeat forms",
      "Full control, less admin for every repair",
    ],
  },
];

const INTERVAL_MS = 5500;

export default function StrataConnectSlides() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-10">
      {/* Crossfading slide stack — fixed responsive height so slides overlay */}
      <div className="relative h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[420px]">
        {SLIDES.map((s, i) => (
          <article
            key={s.title}
            aria-hidden={i !== active}
            className={`absolute inset-0 grid grid-rows-2 transition-opacity duration-700 ease-in-out sm:grid-cols-2 sm:grid-rows-1 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* Image half */}
            <div className="relative h-full w-full">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>

            {/* Text half */}
            <div className="flex flex-col justify-center gap-3 px-6 py-6 sm:px-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-700">
                {s.eyebrow}
              </p>
              <h3 className="text-xl font-extrabold leading-tight text-sky-950 sm:text-2xl">
                {s.title}
              </h3>
              <p className="text-sm leading-7 text-slate-600">{s.body}</p>
              <ul className="mt-1 space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm font-medium text-sky-900">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
            aria-current={i === active}
            className={`h-2.5 rounded-full transition-all ${
              i === active ? "w-7 bg-red-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
