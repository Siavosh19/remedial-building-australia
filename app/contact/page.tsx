"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `mailto:info@remedialbuildingaustralia.com.au?subject=Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AReply to: ${encodeURIComponent(email)}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
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
            <a
              href="/newsletter"
              className="whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 transition"
            >
              Subscribe
            </a>
          </nav>

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
            Get in Touch
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
            Contact Us
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            For enquiries about the platform, technical content or industry partnerships, reach us directly at{" "}
            <a
              href="mailto:info@remedialbuildingaustralia.com.au"
              className="font-semibold text-sky-700 hover:text-red-700"
            >
              info@remedialbuildingaustralia.com.au
            </a>
            {" "}or use the form below.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-sky-950 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Email</div>
                  <a
                    href="mailto:info@remedialbuildingaustralia.com.au"
                    className="text-sm font-semibold text-sky-300 hover:text-white"
                  >
                    info@remedialbuildingaustralia.com.au
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-8">
              {sent ? (
                <div className="rounded-2xl bg-sky-50 p-6 text-center">
                  <div className="text-lg font-bold text-sky-950">Your email client has opened.</div>
                  <p className="mt-2 text-sm text-slate-500">
                    If it didn&apos;t open automatically, email us directly at{" "}
                    <a href="mailto:info@remedialbuildingaustralia.com.au" className="font-semibold text-sky-700">
                      info@remedialbuildingaustralia.com.au
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-sky-950">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-sky-950">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-sky-950">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-sky-800"
                  >
                    <Mail size={16} />
                    Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Home
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="underline hover:text-sky-700">About</a>
            <a href="/terms" className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
