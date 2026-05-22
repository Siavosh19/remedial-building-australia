"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const coreServices = [
  {
    title: "Defect Library",
    text: "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    image: "/Images/Defect%20Library.jpg",
    href: "/defect-library",
  },
  {
    title: "Repair Systems",
    text: "Compare waterproofing, concrete repair, crack injection, coatings, sealants and corrosion protection systems.",
    image: "/Images/Repair%20methods.jpg",
    href: "/repair-systems",
  },
  {
    title: "Materials & Products",
    text: "Technical product database with applications, compatible substrates, coverage rates and linked defects.",
    image: "/Images/Material%20and%20tools.jpg",
    href: "/materials-products",
  },
  {
    title: "AI Scope Builder",
    text: "AI-assisted remedial scope writing using structured technical data for faster, more accurate outputs.",
    image: "/Images/AI%20Scope%20Builder.png",
    href: "/ai-scope-builder",
  },
  {
    title: "Courses",
    text: "Training resources covering remedial building works, waterproofing systems, concrete repair, defect identification and industry practice.",
    image: "/Images/Courses.jpg",
    href: "/courses",
  },
  {
    title: "Useful Resources",
    text: "Practical drawings, data sheets, spreadsheets and reference documents suited to remedial building scopes, systems and industry applications.",
    image: "/Images/technical%20Resources.jpg",
    href: "/useful-resources",
  },
];


// Add new cover photos here as they are saved — they will automatically rotate across hero slides.
const coverPhotos = [
  "/Images/Home%20Cover%20Photo.Jpg",
  "/Images/Home%20Cover%20Photo%202.Jpg",
  "/Images/Home%20Cover%20Photo%203.Jpg",
];

const heroSlidesBase = [
  {
    label: "Defect Library",
    title: "Structured remedial building knowledge for Australian strata and Class 2 buildings.",
    description: "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    href: "/defect-library",
    cta: "Explore Defect Library",
  },
  {
    label: "Repair Systems",
    title: "Compare and select the right repair system for every defect type.",
    description: "Waterproofing, concrete repair, crack injection, coatings, sealants and corrosion protection systems — all structured for quick selection.",
    href: "/repair-systems",
    cta: "View Repair Systems",
  },
  {
    label: "Materials & Products",
    title: "Technical product data prepared for real remedial applications.",
    description: "Future product database with applications, compatible substrates, coverage rates and defects linked directly to material selection.",
    href: "/materials-products",
    cta: "Browse Materials",
  },
  {
    label: "Industry News",
    title: "Stay current with remedial building and strata construction updates.",
    description: "Focused updates for Building Commission, DBP Act, strata remedial works, waterproofing compliance and façade rectification.",
    href: "/industry-news",
    cta: "Read Industry News",
  },
  {
    label: "AI Scope Builder",
    title: "AI-assisted scope writing built on structured technical data.",
    description: "Future tool for faster, more accurate remedial scope writing using a structured defect and repair system database.",
    href: "/ai-scope-builder",
    cta: "Learn About AI Scope Builder",
  },
];

const heroSlides = heroSlidesBase.map((slide, i) => ({
  ...slide,
  image: coverPhotos[i % coverPhotos.length],
}));

const newsSlides = [
  {
    title: "Building Commission NSW — Updated Inspection Framework for Class 2 Buildings",
    tag: "Building Commission NSW",
    text: "The Building Commission NSW has released an updated inspection framework targeting waterproofing, concrete elements and façade systems across Class 2 residential buildings.",
    image: "/Images/Categories/facade-external-envelope.jpg",
  },
  {
    title: "Waterproofing Failures in Balcony Construction Remain the Leading Defect Type",
    tag: "Waterproofing Defects",
    text: "Analysis of recent defect reports identifies balcony waterproofing failures as the most frequently recorded defect, driven by inadequate membrane detailing at junctions.",
    image: "/Images/Categories/waterproofing-water-ingress.jpg",
  },
  {
    title: "DBP Act Compliance: Key Obligations for Design and Building Practitioners",
    tag: "DBP Act",
    text: "NSW Fair Trading has outlined updated compliance expectations under the Design and Building Practitioners Act, with focus on documentation for Class 2 building works.",
    image: "/Images/Categories/basements-substructure.jpg",
  },
];

export default function RemedialBuildingAustraliaHome() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeHero = heroSlides[heroIndex];
  const activeNews = newsSlides[newsIndex];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Defect Database
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
          <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
          <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
          <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
          <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
          <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
        </nav>

          <Menu className="md:hidden" />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-sky-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={activeHero.image}
                alt={activeHero.label}
                className="h-full w-full object-cover opacity-40"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-800/75 to-sky-700/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

          <div className="relative mx-auto max-w-7xl px-10 py-24 md:px-16 md:py-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white">
                  {activeHero.label}
                </div>

                <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                  {activeHero.title}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50">
                  {activeHero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={activeHero.href} className="rounded-xl bg-red-700 px-6 py-4 text-base font-semibold text-white hover:bg-red-800">
                    {activeHero.cta}
                  </a>
                  <a href="/defect-library" className="rounded-xl border border-white/40 bg-white/15 px-6 py-4 text-base font-semibold text-white hover:bg-white hover:text-sky-950">
                    Browse Defect Library
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                  aria-label={heroSlides[i].label}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-10">
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">What We Provide</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Core platform sections</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 h-1.5 w-12 rounded-full bg-red-700" />
                  <h3 className="text-2xl font-extrabold text-sky-950">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-500">{service.text}</p>
                  <div className="mt-auto pt-6 flex items-center text-sm font-bold text-sky-700">
                    View more <ArrowRight className="ml-2" size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Industry News</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Featured updates</h2>
            </div>

            <div className="flex gap-2">
              {newsSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  onClick={() => setNewsIndex(index)}
                  className={`h-3 w-10 rounded-full ${index === newsIndex ? "bg-red-700" : "bg-slate-300"}`}
                  aria-label={slide.title}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-sky-700 shadow-[0_24px_70px_rgba(8,47,73,0.12)]">
            <img src={activeNews.image} alt={activeNews.title} className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="relative max-w-3xl p-8 text-white md:p-14">
              <div className="mb-4 inline-flex rounded-full bg-red-700 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em]">{activeNews.tag}</div>
              <h3 className="text-3xl font-extrabold md:text-5xl">{activeNews.title}</h3>
              <p className="mt-5 text-lg leading-8 text-slate-200">{activeNews.text}</p>
              <a href="/industry-news" className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-950 hover:bg-slate-100">
                Browse Industry News
              </a>
            </div>
          </div>
        </section>

        <section className="bg-sky-700 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-300">Newsletter</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Fortnightly remedial building updates</h2>
              <p className="mt-4 max-w-2xl text-sky-50">Industry news, defect trends, technical updates and new articles.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input className="min-h-12 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sky-950 outline-none" placeholder="Email address" />
                <Button className="min-h-12 bg-red-700 hover:bg-red-800">
                  <Mail className="mr-2" size={18} /> Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 md:grid-cols-3">
            <a href="/about">About</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>          </div>
        </div>
      </footer>
    </div>
  );
}