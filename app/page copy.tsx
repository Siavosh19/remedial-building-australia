"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Database, Wrench, Boxes, FileText, ArrowRight, Mail, Menu, ShieldCheck, Building2, ClipboardCheck, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const coreServices = [
  {
    title: "Defect Library",
    text: "Structured guidance for common Class 2 building defects, organised by category, cause, risk and repair pathway.",
    icon: Database,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    href: "/defect-library",
  },
  {
    title: "Repair Systems",
    text: "Compare waterproofing, concrete repair, crack injection, coatings, sealants and corrosion protection systems.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    href: "/repair-systems",
  },
  {
    title: "Materials & Products",
    text: "Future technical product database with applications, compatible substrates, coverage rates and linked defects.",
    icon: Boxes,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1400&q=80",
    href: "/materials-products",
  },
  {
    title: "AI Scope Builder",
    text: "Initial interface placeholder for future AI-assisted remedial scope writing using structured technical data.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    href: "/ai-scope-builder",
  },
];

const defectCategories = [
  { title: "Concrete & Structural Defects", items: "Spalling · corrosion · cracking" },
  { title: "Waterproofing & Water Ingress", items: "Balconies · roofs · podiums" },
  { title: "Façade & External Envelope", items: "Render · cladding · sealants" },
  { title: "Roofing Defects", items: "Leaks · flashings · ponding" },
  { title: "Balconies & Podiums", items: "Tiles · screeds · balustrades" },
  { title: "Internal Defects & Finishes", items: "Mould · cracking · water damage" },
  { title: "Services & Drainage", items: "Stormwater · downpipes · penetrations" },
  { title: "Basements & Substructure", items: "Hydrostatic pressure · joint leaks" },
];

const platformStats = [
  { label: "Structured defect categories", value: "08" },
  { label: "Core platform sections", value: "04" },
  { label: "Future AI-ready database", value: "01" },
];

const newsSlides = [
  {
    title: "Class 2 Building Defect Trends",
    tag: "Defect Trends",
    text: "Track recurring issues across waterproofing, façades, concrete repairs and strata remedial works.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Waterproofing & Compliance Updates",
    tag: "Waterproofing",
    text: "Follow changes, commentary and practical issues affecting balcony, roof and podium waterproofing.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Remedial Construction News",
    tag: "Industry News",
    text: "A focused news section for Building Commission, DBP Act, strata and technical remedial construction updates.",
    image: "https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=1400&q=80",
  },
];

export function BalconyWaterproofingFailurePage() {
  const causes = ["Failed or aged membrane", "Poor falls to drainage outlets", "Saturated screed beds", "Inadequate door threshold detailing", "Failed tile grout, joints or penetrations"];
  const repairs = ["Remove tiles, screed and failed membrane system", "Prepare substrate and correct falls before waterproofing", "Install membrane to compliant terminations and penetrations", "Detail hobs, drains, puddle flanges and upturns correctly", "Reinstate suitable finishes with falls maintained"];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <section className="relative overflow-hidden bg-sky-800">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80" alt="Balcony waterproofing" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-800 via-sky-700/85 to-sky-700/30" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-28">
          <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">Waterproofing & Water Ingress</div>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">Balcony Waterproofing Failure</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50">A high-risk remedial defect involving failed membranes, poor drainage falls, saturated screeds, leaking thresholds and deterioration below balcony finishes.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_18px_60px_rgba(8,47,73,0.08)]">
              <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Overview</div>
              <h2 className="mt-3 text-3xl font-extrabold text-sky-950">Why balcony waterproofing fails</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Balcony leaks commonly occur when the waterproofing system is poorly detailed, incorrectly sequenced, damaged by movement, or buried under saturated screeds with insufficient falls to outlets.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="rounded-[2rem] border-sky-100 shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Common Causes</div><div className="mt-6 grid gap-3">{causes.map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm font-semibold text-sky-950">{item}</div>)}</div></CardContent></Card>
              <Card className="rounded-[2rem] border-sky-100 shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Typical Risks</div><div className="mt-6 grid gap-3">{["Leaks to units below", "Tile drumming and delamination", "Concrete spalling at slab edges", "Mould and internal water damage", "Recurring repairs if falls are not corrected"].map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-red-50 p-4 text-sm font-semibold text-sky-950">{item}</div>)}</div></CardContent></Card>
            </div>
            <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_18px_60px_rgba(8,47,73,0.08)]">
              <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Typical Repair Approach</div>
              <div className="mt-6 grid gap-4">{repairs.map((item, index) => <div key={item} className="flex items-start gap-4 rounded-2xl border border-sky-100 p-5"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-extrabold text-sky-800">0{index + 1}</div><div className="text-sm font-semibold leading-7 text-sky-950">{item}</div></div>)}</div>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="rounded-[2rem] border-sky-100 shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Related Systems</div><div className="mt-5 grid gap-3">{["Liquid-applied membranes", "Sheet membranes", "Drainage cells and outlets", "Tile finishes and screeds"].map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm font-semibold text-sky-950">{item}</div>)}</div></CardContent></Card>
            <Card className="rounded-[2rem] border-sky-100 bg-sky-700 text-white shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-300">Important Note</div><p className="mt-5 text-sm leading-7 text-sky-50">The repair must address falls, terminations, outlets and thresholds. Replacing membrane alone may not solve the leak.</p></CardContent></Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export function FacadeCrackingPage() {
  const causes = ["Building movement", "Render shrinkage", "Poor joint design", "Water ingress behind coating", "Failed sealants or transitions"];
  const inspections = ["Visual crack mapping", "Moisture testing", "Render adhesion/tap testing", "Sealant and joint inspection", "Façade access inspection"];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <section className="relative overflow-hidden bg-sky-800">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80" alt="Facade cracking" className="h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-sky-800 via-sky-700/85 to-sky-700/30" /></div>
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-28"><div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">Façade & External Envelope</div><h1 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">Façade Cracking</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50">Cracking to render, masonry, cladding transitions and façade coatings can allow water ingress and accelerate deterioration of the external envelope.</p></div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16"><div className="grid gap-10 lg:grid-cols-[1fr_320px]"><div className="space-y-8"><div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_18px_60px_rgba(8,47,73,0.08)]"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Overview</div><h2 className="mt-3 text-3xl font-extrabold text-sky-950">Why façade cracking matters</h2><p className="mt-5 text-lg leading-8 text-slate-600">Façade cracking is not only cosmetic. It can indicate movement, poor detailing, coating failure, water ingress, render delamination or joint failure requiring targeted investigation.</p></div><div className="grid gap-8 md:grid-cols-2"><Card className="rounded-[2rem] border-sky-100 shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Common Causes</div><div className="mt-6 grid gap-3">{causes.map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm font-semibold text-sky-950">{item}</div>)}</div></CardContent></Card><Card className="rounded-[2rem] border-sky-100 shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Inspection Methods</div><div className="mt-6 grid gap-3">{inspections.map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-white p-4 text-sm font-semibold text-sky-950">{item}</div>)}</div></CardContent></Card></div><div className="rounded-[2rem] border border-sky-100 bg-sky-50/40 p-8"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Repair Approach</div><p className="mt-5 text-lg leading-8 text-slate-600">Repair may include crack routing and sealing, render patching, joint reinstatement, façade coating systems, sealant replacement and correcting details that allow water ingress.</p></div></div><div className="space-y-6"><Card className="rounded-[2rem] border-sky-100 shadow-none"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Related Systems</div><div className="mt-5 grid gap-3">{["Elastomeric coatings", "Façade sealants", "Render repair systems", "Movement joint systems"].map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm font-semibold text-sky-950">{item}</div>)}</div></CardContent></Card></div></div></section>
    </div>
  );
}

export function IndustryNewsPage({ onBackHome }) {
  const topics = ["Building Commission", "Class 2 Buildings", "Waterproofing", "DBP Act", "Façade Defects", "Concrete Repair", "Strata Defects", "Remedial Construction"];
  const articles = [
    { title: "Class 2 defect trends to monitor", tag: "Defect Trends", text: "Short technical updates on recurring building defects and remedial risk areas." },
    { title: "Waterproofing details and compliance", tag: "Waterproofing", text: "Practical commentary on balcony, roof, podium and planter box waterproofing issues." },
    { title: "Façade and external envelope failures", tag: "Façades", text: "Updates covering render, sealants, cladding interfaces and water ingress pathways." },
  ];
  return (
    <div className="min-h-screen bg-white text-sky-950"><header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between"><div className="font-extrabold text-sky-950">Industry News</div><Button onClick={onBackHome} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button></div></header><section className="bg-sky-50/70"><div className="mx-auto max-w-7xl px-5 py-16 md:py-20"><div className="max-w-4xl"><div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-red-700">Technical Updates</div><h1 className="text-4xl font-extrabold tracking-tight text-sky-950 md:text-6xl">Industry news for remedial building, strata defects and Class 2 construction.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">A focused news section for regulatory updates, defect trends, technical changes and remedial construction commentary.</p></div></div></section><section className="mx-auto max-w-7xl px-5 py-16"><div className="mb-8"><div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Browse Topics</div><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">News categories</h2></div><div className="flex flex-wrap gap-3">{topics.map((topic) => <button key={topic} className="rounded-full border border-sky-100 bg-sky-50 px-5 py-3 text-sm font-bold text-sky-800 hover:border-red-200 hover:text-red-700">{topic}</button>)}</div><div className="mt-12 grid gap-6 md:grid-cols-3">{articles.map((article) => <Card key={article.title} className="rounded-[2rem] border-sky-100 bg-white shadow-sm"><CardContent className="p-6"><div className="mb-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-extrabold text-red-700">{article.tag}</div><h3 className="text-xl font-extrabold text-sky-950">{article.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{article.text}</p><Button className="mt-5 w-full bg-sky-700 hover:bg-sky-800">Read update</Button></CardContent></Card>)}</div></section></div>
  );
}

export function AIScopeBuilderPage({ onBackHome }) {
  return (
    <div className="min-h-screen bg-white text-sky-950"><header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between"><div className="font-extrabold text-sky-950">AI Scope Builder</div><Button onClick={onBackHome} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button></div></header><section className="bg-sky-50/70"><div className="mx-auto max-w-7xl px-5 py-16 md:py-20"><div className="max-w-4xl"><div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-red-700">UI Placeholder Only</div><h1 className="text-4xl font-extrabold tracking-tight text-sky-950 md:text-6xl">Future AI-assisted remedial scope writing interface.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">This is only a mockup. The real version should later retrieve structured defect, system, product and uploaded scope document data.</p></div></div></section><section className="mx-auto max-w-7xl px-5 py-16"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><Card className="rounded-[2rem] border-sky-100 bg-white shadow-sm"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">Inputs</div><div className="mt-6 grid gap-4"><div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/70 p-8 text-center text-sm font-bold text-sky-800">Upload consultant scope / photos / notes</div>{["Select defect type", "Select repair system", "Select material/product group", "Add project constraints"].map((item) => <div key={item} className="rounded-2xl border border-sky-100 bg-white p-4 text-sm font-semibold text-sky-950">{item}</div>)}<Button className="mt-2 bg-red-700 hover:bg-red-800">Generate Draft Scope Placeholder</Button></div></CardContent></Card><Card className="rounded-[2rem] border-sky-100 bg-sky-700 text-white shadow-sm"><CardContent className="p-7"><div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-300">Output Preview</div><div className="mt-6 rounded-2xl bg-white/10 p-5 text-sm leading-7 text-sky-50"><p><strong>Draft scope output will appear here.</strong></p><p className="mt-4">Future AI should generate structured scope wording by linking selected defects, inspection methods, repair systems, product data and uploaded documents.</p></div><div className="mt-6 grid gap-3 text-sm font-semibold">{["Linked defect references", "Related repair systems", "Product compatibility notes", "Assumptions and exclusions"].map((item) => <div key={item} className="rounded-2xl bg-white/12 p-4">{item}</div>)}</div></CardContent></Card></div></section></div>
  );
}

export function MaterialsProductsPage({ onBackHome }) {
  const productGroups = [
    {
      title: "Concrete Repair Mortars",
      application: "Patch repairs, slab edges, balcony edges, façade concrete repairs",
      data: "Compressive strength · build thickness · shrinkage · exposure rating",
      linked: "Concrete spalling · reinforcement corrosion",
    },
    {
      title: "Waterproofing Membranes",
      application: "Balconies, roofs, podiums, planter boxes and wet areas",
      data: "Coverage rate · primer · elongation · compatible finishes",
      linked: "Balcony leaks · roof leaks · podium waterproofing failure",
    },
    {
      title: "Protective Coatings",
      application: "Concrete façades, rendered walls, exposed structural elements",
      data: "UV resistance · crack bridging · vapour permeability · recoat cycle",
      linked: "Façade cracking · coating failure · concrete deterioration",
    },
    {
      title: "Sealants & Joint Systems",
      application: "Façade joints, window perimeters, movement joints and penetrations",
      data: "Movement capacity · substrate compatibility · primer requirements",
      linked: "Façade water ingress · window perimeter failure",
    },
    {
      title: "Corrosion Protection Products",
      application: "Reinforcement treatment, concrete repair zones and exposed steel",
      data: "Primer type · inhibitor use · compatibility with repair mortar",
      linked: "Concrete spalling · reinforcement corrosion",
    },
    {
      title: "Crack Injection Products",
      application: "Basements, concrete walls, slabs, water-stopping and structural cracks",
      data: "Epoxy/PU type · viscosity · wet crack suitability · pressure method",
      linked: "Basement water ingress · crack injection failures",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="font-extrabold text-sky-950">Materials & Products</div>
          <Button onClick={onBackHome} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button>
        </div>
      </header>

      <section className="bg-sky-50/70">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-red-700">
              Product Data Structure
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-sky-950 md:text-6xl">
              Future technical product database for remedial materials and system selection.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This section is prepared for structured product entries, supplier listings, compatible substrates, coverage rates, technical data and links back to defects and repair systems.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Product Categories</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Structured product groups</h2>
          </div>
          <div className="text-sm font-semibold text-slate-500">Designed for future supplier and technical data integration</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productGroups.map((product) => (
            <Card key={product.title} className="rounded-[2rem] border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
                  <Boxes size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-sky-950">{product.title}</h3>
                <div className="mt-5 space-y-3 text-sm leading-6">
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                    <div className="font-extrabold text-red-700">Application</div>
                    <div className="mt-1 font-semibold text-sky-900">{product.application}</div>
                  </div>
                  <div className="rounded-2xl border border-sky-100 bg-white p-4">
                    <div className="font-extrabold text-red-700">Technical Data</div>
                    <div className="mt-1 font-semibold text-sky-900">{product.data}</div>
                  </div>
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                    <div className="font-extrabold text-red-700">Linked Defects</div>
                    <div className="mt-1 font-semibold text-sky-900">{product.linked}</div>
                  </div>
                </div>
                <Button className="mt-5 w-full bg-sky-700 hover:bg-sky-800">View product group</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sky-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-300">Database Logic</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Products should not be random listings.</h2>
              <p className="mt-4 text-sky-50">
                Each product entry should connect to compatible defects, repair systems, substrates, application conditions and future AI scope clauses.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6">
              <div className="grid gap-3 text-sm font-semibold">
                <div className="rounded-2xl bg-white/12 p-4">Defect → Balcony waterproofing failure</div>
                <div className="rounded-2xl bg-white/12 p-4">System → Liquid-applied membrane</div>
                <div className="rounded-2xl bg-white/12 p-4">Product → Compatible membrane options</div>
                <div className="rounded-2xl bg-white/12 p-4">Data → Coverage, primer, substrate, limitations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function RepairSystemsPage({ onBackHome }) {
  const systemCategories = [
    {
      title: "Waterproofing Systems",
      text: "Liquid membranes, sheet membranes, torch-on systems, trafficable coatings and wet area/external waterproofing systems.",
      linked: "Balcony leaks · roof leaks · podium failures",
      image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Concrete Repair Systems",
      text: "Patch repair mortars, high-build mortars, anti-carbonation coatings and structural repair methodologies.",
      linked: "Concrete spalling · slab edge deterioration",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Crack Injection Systems",
      text: "Epoxy injection, polyurethane injection, pressure grouting and water-stopping methods.",
      linked: "Basement leaks · concrete cracking · joint leaks",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Coatings",
      text: "Protective façade coatings, anti-carbonation coatings, elastomeric coatings and surface protection systems.",
      linked: "Façade cracking · concrete deterioration",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Sealants",
      text: "Movement joints, façade sealants, perimeter window joints and remedial joint replacement systems.",
      linked: "Window leaks · façade water ingress",
      image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Corrosion Protection",
      text: "Reinforcement primers, corrosion inhibitors, cathodic protection concepts and protective repair strategies.",
      linked: "Reinforcement corrosion · concrete spalling",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="font-extrabold text-sky-950">Repair Systems</div>
          <Button onClick={onBackHome} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button>
        </div>
      </header>

      <section className="bg-sky-50/70">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-red-700">
              Systems Database
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-sky-950 md:text-6xl">
              Compare remedial repair systems by application, defect type and substrate.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This section connects defect pages to practical repair systems, future product data and AI-assisted scope writing. It should remain structured, searchable and supplier-neutral at the start.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">System Categories</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Core repair system groups</h2>
          </div>
          <div className="text-sm font-semibold text-slate-500">Built for defect → system → product linking</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {systemCategories.map((system) => (
            <Card key={system.title} className="overflow-hidden rounded-[2rem] border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-48">
                <img src={system.image} alt={system.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/55 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-sky-800">
                  Repair System
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-extrabold text-sky-950">{system.title}</h3>
                <p className="mt-3 min-h-[96px] text-sm leading-6 text-slate-500">{system.text}</p>
                <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm font-semibold leading-6 text-sky-900">
                  Linked defects: {system.linked}
                </div>
                <Button className="mt-5 w-full bg-sky-700 hover:bg-sky-800">
                  View system group
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sky-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-300">Future Structure</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Every system should link back to defects and forward to materials.</h2>
              <p className="mt-4 text-sky-50">
                This is the important database relationship: defects identify the problem, repair systems define the method, and products provide the technical material options.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6">
              <div className="grid gap-3 text-sm font-semibold">
                <div className="rounded-2xl bg-white/12 p-4">Defect → Concrete spalling</div>
                <div className="rounded-2xl bg-white/12 p-4">System → Concrete repair mortar + corrosion protection</div>
                <div className="rounded-2xl bg-white/12 p-4">Product → Future material database entry</div>
                <div className="rounded-2xl bg-white/12 p-4">AI → Draft scope wording from linked data</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function DefectLibraryPage({ onOpenConcreteSpalling, onOpenBalconyWaterproofing, onOpenFacadeCracking, onBackHome }) {
  const featuredDefects = [
    {
      title: "Concrete Spalling",
      category: "Concrete & Structural Defects",
      text: "Reinforcement corrosion, delamination, exposed steel and concrete breakout risk.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      page: "concrete-spalling",
    },
    {
      title: "Balcony Waterproofing Failure",
      category: "Waterproofing & Water Ingress",
      text: "Leaks through tiled balcony systems, poor falls, failed membranes and saturated screeds.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      page: "balcony-waterproofing",
    },
    {
      title: "Façade Cracking",
      category: "Façade & External Envelope",
      text: "Render cracking, movement joints, coating failure and external envelope water ingress paths.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      page: "facade-cracking",
    },
  ];

  const filters = ["Concrete", "Waterproofing", "Façade", "Roofing", "Balconies", "Drainage", "Basements"];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="font-extrabold text-sky-950">Defect Library</div>
          <Button onClick={onBackHome} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button>
        </div>
      </header>

      <section className="bg-sky-50/70">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-red-700">
              Structured Defect Database
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-sky-950 md:text-6xl">
              Browse remedial building defects by category, risk and repair pathway.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              This library is designed as a searchable technical database, not a blog archive. Each defect can link to inspection methods, repair systems, materials, related products and future AI scope generation.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-sky-100 bg-white p-4 shadow-[0_18px_60px_rgba(8,47,73,0.08)] md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border border-sky-100 bg-sky-50/60 px-4">
                <Search className="text-sky-600" size={20} />
                <input className="w-full bg-transparent text-sm font-semibold text-sky-950 outline-none" placeholder="Search defects, symptoms, systems or materials..." />
              </div>
              <Button className="min-h-14 bg-red-700 px-8 hover:bg-red-800">Search Library</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button key={filter} className="rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-bold text-sky-700 hover:border-red-200 hover:text-red-700">
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Categories</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Defect categories</h2>
          </div>
          <div className="text-sm font-semibold text-slate-500">8 primary categories for scalable database structure</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {defectCategories.map((category, index) => (
            <Card key={category.title} className="group border-sky-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-1.5 w-12 rounded-full bg-red-700" />
                  <span className="text-xs font-extrabold text-sky-300">0{index + 1}</span>
                </div>
                <h3 className="min-h-[56px] text-lg font-extrabold leading-7 text-sky-950">{category.title}</h3>
                <p className="mt-3 min-h-[44px] text-sm font-medium leading-6 text-slate-500">{category.items}</p>
                <div className="mt-5 flex items-center text-sm font-bold text-sky-700 group-hover:text-red-700">
                  Browse category <ArrowRight className="ml-2" size={16} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sky-50/55 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8">
            <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Featured Defects</div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Start with high-value defect pages</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredDefects.map((defect) => (
              <Card key={defect.title} className="overflow-hidden rounded-[2rem] border-sky-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52">
                  <img src={defect.image} alt={defect.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/55 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-sky-800">
                    {defect.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-extrabold text-sky-950">{defect.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">{defect.text}</p>
                  <Button
                    onClick={() => defect.page === "concrete-spalling" ? onOpenConcreteSpalling() : defect.page === "balcony-waterproofing" ? onOpenBalconyWaterproofing() : onOpenFacadeCracking()}
                    className="mt-5 w-full bg-sky-700 hover:bg-sky-800"
                  >
                    Open defect page
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ConcreteSpallingDefectPage() {
  const signs = [
    "Rust staining to concrete surfaces",
    "Delaminated or drummy concrete",
    "Exposed reinforcement",
    "Cracking and moisture ingress",
    "Concrete edge deterioration",
  ];

  const inspectionMethods = [
    "Visual inspection and defect mapping",
    "Hammer sounding or chain drag testing",
    "Cover meter reinforcement scanning",
    "Carbonation and chloride testing",
    "Concrete breakout investigation",
  ];

  const repairMethods = [
    "Saw cut perimeter around affected concrete",
    "Break out unsound concrete",
    "Clean and prepare corroded reinforcement",
    "Apply corrosion protection systems",
    "Reinstate using suitable repair mortars",
    "Apply protective coatings where required",
  ];

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <section className="relative overflow-hidden bg-sky-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80"
            alt="Concrete spalling repair works"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-800 via-sky-700/85 to-sky-700/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-28">
          <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
            Concrete & Structural Defects
          </div>

          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            Concrete Spalling
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50">
            Concrete spalling is one of the most common structural deterioration issues affecting balconies, slab edges, façades and exposed reinforced concrete elements across Class 2 buildings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_18px_60px_rgba(8,47,73,0.08)]">
              <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                Overview
              </div>

              <h2 className="mt-3 text-3xl font-extrabold text-sky-950">
                What is concrete spalling?
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Concrete spalling generally occurs when reinforcement steel corrodes and expands within the concrete structure, causing cracking, delamination and eventual concrete breakdown. Common contributing factors include carbonation, chloride ingress, water penetration, inadequate concrete cover and long-term exposure to harsh environments.
              </p>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Card className="rounded-[2rem] border-sky-100 shadow-none">
                <CardContent className="p-7">
                  <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                    Warning Signs
                  </div>

                  <div className="mt-6 grid gap-3">
                    {signs.map((item) => (
                      <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm font-semibold text-sky-950">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-sky-100 shadow-none">
                <CardContent className="p-7">
                  <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                    Typical Risks
                  </div>

                  <div className="mt-6 grid gap-3">
                    {[
                      "Falling concrete hazards",
                      "Structural deterioration",
                      "Water ingress into occupied areas",
                      "Balcony edge deterioration",
                      "Escalating repair costs if untreated",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-sky-100 bg-red-50 p-4 text-sm font-semibold text-sky-950">
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-[2rem] border border-sky-100 bg-sky-50/40 p-8">
              <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                Inspection Methods
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {inspectionMethods.map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-5 text-sm font-semibold text-sky-950 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-sky-100 bg-white p-8 shadow-[0_18px_60px_rgba(8,47,73,0.08)]">
              <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                Typical Repair Approach
              </div>

              <div className="mt-6 grid gap-4">
                {repairMethods.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-2xl border border-sky-100 p-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-extrabold text-sky-800">
                      0{index + 1}
                    </div>
                    <div className="text-sm font-semibold leading-7 text-sky-950">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[2rem] border-sky-100 shadow-none">
              <CardContent className="p-7">
                <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                  Related Repair Systems
                </div>

                <div className="mt-5 grid gap-3">
                  {[
                    "Concrete repair mortars",
                    "Corrosion protection systems",
                    "Protective coatings",
                    "Cathodic protection",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 text-sm font-semibold text-sky-950">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-sky-100 shadow-none">
              <CardContent className="p-7">
                <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-700">
                  Related Defects
                </div>

                <div className="mt-5 grid gap-3">
                  {[
                    "Balcony concrete deterioration",
                    "Reinforcement corrosion",
                    "Concrete cracking",
                    "Water ingress to slab edges",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-sky-100 bg-white p-4 text-sm font-semibold text-sky-950">
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-sky-100 bg-sky-700 text-white shadow-none">
              <CardContent className="p-7">
                <div className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-300">
                  Future AI Integration
                </div>

                <p className="mt-5 text-sm leading-7 text-sky-50">
                  Future AI tools will connect defect types, repair methodologies, material systems and uploaded consultant documents to generate draft remedial scopes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function RemedialBuildingAustraliaHome() {
  const [previewPage, setPreviewPage] = useState("home");
  const [serviceIndex, setServiceIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0);

  const activeService = coreServices[serviceIndex];
  const ServiceIcon = activeService.icon;
  const activeNews = newsSlides[newsIndex];

  if (previewPage === "defect-library") {
    return (
      <DefectLibraryPage
        onBackHome={() => setPreviewPage("home")}
        onOpenConcreteSpalling={() => setPreviewPage("concrete-spalling")}
        onOpenBalconyWaterproofing={() => setPreviewPage("balcony-waterproofing")}
        onOpenFacadeCracking={() => setPreviewPage("facade-cracking")}
      />
    );
  }

  if (previewPage === "repair-systems") {
    return <RepairSystemsPage onBackHome={() => setPreviewPage("home")} />;
  }

  if (previewPage === "materials-products") {
    return <MaterialsProductsPage onBackHome={() => setPreviewPage("home")} />;
  }

  if (previewPage === "industry-news") {
    return <IndustryNewsPage onBackHome={() => setPreviewPage("home")} />;
  }

  if (previewPage === "ai-scope-builder") {
    return <AIScopeBuilderPage onBackHome={() => setPreviewPage("home")} />;
  }

  if (previewPage === "balcony-waterproofing") {
    return (
      <div>
        <div className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="font-extrabold text-sky-950">Remedial Building Australia</div>
            <div className="flex gap-2">
              <Button onClick={() => setPreviewPage("defect-library")} variant="outline" className="border-sky-100 text-sky-800">Back to Defect Library</Button>
              <Button onClick={() => setPreviewPage("home")} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button>
            </div>
          </div>
        </div>
        <BalconyWaterproofingFailurePage />
      </div>
    );
  }

  if (previewPage === "facade-cracking") {
    return (
      <div>
        <div className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="font-extrabold text-sky-950">Remedial Building Australia</div>
            <div className="flex gap-2">
              <Button onClick={() => setPreviewPage("defect-library")} variant="outline" className="border-sky-100 text-sky-800">Back to Defect Library</Button>
              <Button onClick={() => setPreviewPage("home")} className="bg-sky-700 hover:bg-sky-800">Back to Homepage</Button>
            </div>
          </div>
        </div>
        <FacadeCrackingPage />
      </div>
    );
  }

  if (previewPage === "concrete-spalling") {
    return (
      <div>
        <div className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-5 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="font-extrabold text-sky-950">Remedial Building Australia</div>
            <div className="flex gap-2">
              <Button onClick={() => setPreviewPage("defect-library")} variant="outline" className="border-sky-100 text-sky-800">
                Back to Defect Library
              </Button>
              <Button onClick={() => setPreviewPage("home")} className="bg-sky-700 hover:bg-sky-800">
                Back to Homepage
              </Button>
            </div>
          </div>
        </div>
        <ConcreteSpallingDefectPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-sky-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
              <Building2 size={23} />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Technical Defect Database</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-sky-800 md:flex">
            <button onClick={() => setPreviewPage("defect-library")} className="hover:text-red-700">Defect Library</button>
            <button onClick={() => setPreviewPage("repair-systems")} className="hover:text-red-700">Repair Systems</button>
            <button onClick={() => setPreviewPage("materials-products")} className="hover:text-red-700">Materials</button>
            <button onClick={() => setPreviewPage("industry-news")} className="hover:text-red-700">Industry News</button>
            <button onClick={() => setPreviewPage("ai-scope-builder")} className="hover:text-red-700">AI Scope Builder</button>
          </nav>
          <Button onClick={() => setPreviewPage("defect-library")} className="hidden bg-sky-700 hover:bg-sky-800 md:inline-flex">Browse Library</Button>
          <Menu className="md:hidden" />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-sky-800">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
              alt="Australian apartment building facade"
              className="h-full w-full object-cover opacity-32"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sky-800 via-sky-700/82 to-sky-600/20" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.08fr_0.92fr] md:py-28">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-5 inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white">
                Class 2 Buildings · Defects · Repair Systems
              </div>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                Structured remedial building knowledge for Australian strata and Class 2 buildings.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50">
                A technical platform for defect identification, repair system selection, material data and future AI-assisted scope writing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => setPreviewPage("defect-library")} className="bg-red-700 px-6 py-6 text-base hover:bg-red-800">Explore Defect Library</Button>
                <Button onClick={() => setPreviewPage("repair-systems")} variant="outline" className="border-white/40 bg-white/15 px-6 py-6 text-base text-white hover:bg-white hover:text-sky-950">
                  View Repair Systems
                </Button>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {platformStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur">
                    <div className="text-2xl font-extrabold">{stat.value}</div>
                    <div className="mt-1 text-xs font-semibold leading-5 text-sky-50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <Card className="border-white/20 bg-white/95 shadow-2xl">
              <CardContent className="p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-red-700 p-3 text-white"><Search size={22} /></div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-[0.18em] text-sky-500">Platform Focus</div>
                    <div className="text-2xl font-extrabold text-sky-950">Searchable technical structure</div>
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-sky-900">
                  {[
                    { icon: ShieldCheck, text: "Defects linked to causes, risks and inspection methods" },
                    { icon: Wrench, text: "Repair systems linked to compatible applications" },
                    { icon: Layers, text: "Product data prepared for systems and substrates" },
                    { icon: ClipboardCheck, text: "AI scope builder planned around structured retrieval" },
                  ].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 font-semibold">
                        <ItemIcon className="mt-0.5 text-sky-700" size={18} />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Core Services</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Main platform sections</h2>
            </div>
            <div className="flex gap-2">
              {coreServices.map((service, index) => (
                <button
                  key={service.title}
                  onClick={() => setServiceIndex(index)}
                  className={`h-3 w-10 rounded-full ${index === serviceIndex ? "bg-red-700" : "bg-slate-300"}`}
                  aria-label={service.title}
                />
              ))}
            </div>
          </div>

          <div className="grid overflow-hidden rounded-[2rem] border border-sky-100 bg-white shadow-[0_24px_70px_rgba(8,47,73,0.10)] md:grid-cols-[0.86fr_1.14fr]">
            <div className="p-8 md:p-12">
              <div className="mb-6 inline-flex rounded-2xl bg-sky-100 p-4 text-sky-800"><ServiceIcon size={30} /></div>
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-700">Core platform section</div>
              <h3 className="mt-3 text-3xl font-extrabold text-sky-950 md:text-4xl">{activeService.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-500">{activeService.text}</p>
              <div className="mt-7 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm font-semibold leading-6 text-sky-900">
                Designed as a structured section, not a simple article category.
              </div>
              <Button onClick={() => activeService.title === "Repair Systems" ? setPreviewPage("repair-systems") : activeService.title === "Defect Library" ? setPreviewPage("defect-library") : activeService.title === "Materials & Products" ? setPreviewPage("materials-products") : activeService.title === "AI Scope Builder" ? setPreviewPage("ai-scope-builder") : null} className="mt-8 bg-sky-700 hover:bg-sky-800">
                Open section <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
            <div className="relative min-h-[390px]">
              <img src={activeService.image} alt={activeService.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/28 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/92 px-5 py-4 shadow-lg backdrop-blur">
                <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-500">Database ready</div>
                <div className="mt-1 text-base font-extrabold text-sky-950">Linked defects · systems · products</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-sky-50/55 py-20">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-10 max-w-3xl">
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-700">Defect Library Preview</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950 md:text-4xl">Browse by defect category</h2>
              <p className="mt-4 text-slate-500">The homepage only previews the library. The full structured database sits under /defect-library.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {defectCategories.map((category, index) => (
                <Card key={category.title} className="group border-sky-100 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="h-1.5 w-12 rounded-full bg-red-700" />
                      <span className="text-xs font-extrabold text-sky-300">0{index + 1}</span>
                    </div>
                    <h3 className="min-h-[56px] text-lg font-extrabold leading-7 text-sky-950">{category.title}</h3>
                    <p className="mt-3 min-h-[44px] text-sm font-medium leading-6 text-slate-500">{category.items}</p>
                    <button
                      onClick={() => setPreviewPage("defect-library")}
                      className="mt-5 flex items-center text-sm font-bold text-sky-700 group-hover:text-red-700"
                    >
                      View category <ArrowRight className="ml-2" size={16} />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
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
              <Button onClick={() => setPreviewPage("industry-news")} className="mt-8 bg-white text-sky-950 hover:bg-slate-100">Browse Industry News</Button>
            </div>
          </div>
        </section>

        <section className="bg-sky-700 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-500">Newsletter</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Fortnightly remedial building updates</h2>
              <p className="mt-4 max-w-2xl text-slate-300">Industry news, defect trends, technical updates and new articles without turning the homepage into a blog.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input className="min-h-12 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sky-950 outline-none" placeholder="Email address" />
                <Button className="min-h-12 bg-red-700 hover:bg-red-800"><Mail className="mr-2" size={18} /> Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-slate-500 md:grid-cols-3">
            <a href="/about">About</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
            <a href="/defect-library">Defect Library</a>
            <a href="/repair-systems">Repair Systems</a>
            <a href="/industry-news">Industry News</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
