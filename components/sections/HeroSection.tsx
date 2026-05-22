"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop')",
        }}
      ></div>

      <div className="relative z-20 max-w-5xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Remedial Building Australia
        </h1>

        <p className="text-xl md:text-2xl text-slate-200 mb-8">
          Structured technical knowledge platform for remedial construction,
          waterproofing, façade defects, concrete repair systems, and future
          AI-assisted scope generation.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-xl font-semibold">
            Explore Defect Library
          </button>

          <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition">
            View Repair Systems
          </button>
        </div>
      </div>
    </section>
  );
}