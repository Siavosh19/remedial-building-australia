"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Info } from "lucide-react";

export type HelpTopic =
  | "schemes"
  | "overview"
  | "roll"
  | "budget"
  | "levies"
  | "arrears"
  | "defects"
  | "workOrders"
  | "contractors"
  | "expenses"
  | "compliance"
  | "capitalWorks"
  | "members";

type Help = { title: string; intro: string; steps: string[]; note?: string };

const HELP: Record<HelpTopic, Help> = {
  schemes: {
    title: "How this works",
    intro:
      "A free workspace for owners corporations that manage themselves — your lots, your people, and (as it grows) your levies, defects and quotes. Nothing here costs anything.",
    steps: [
      "Add a scheme. Choose the state it is in and the whole workspace uses that state's wording.",
      "Enter the lots and their entitlements on the strata roll. This is the foundation everything else is built on.",
      "Invite your committee. Each person signs in and accepts before they can see anything.",
      "Set your scheme's own rules on the Overview tab — financial year, how often contributions are raised, grace days, interest.",
    ],
    note:
      "Your records stay yours. Only people you invite and who accept can see this scheme, and each scheme is kept separate from every other one.",
  },
  overview: {
    title: "How this works",
    intro:
      "This is the scheme's home page. The tiles show where the roll stands, and the settings below tell the software how your scheme runs.",
    steps: [
      "Scheme details — name, plan number and address. These appear on anything you produce later.",
      "Funds — call them whatever your scheme calls them. Nothing in the software depends on the names.",
      "Your scheme's rules — financial year, how often contributions are raised, notice days, grace days, interest and the committee spending limit.",
      "Use the tabs above to move between the roll and the people who have access.",
    ],
    note:
      "These settings are your committee's decisions, not legal advice. The software only does arithmetic on the numbers you enter — for what your scheme is required to do, check with your state authority.",
  },
  roll: {
    title: "How the roll works",
    intro:
      "The strata roll is the register of lots and owners. Get this right and levies, notices and voting all follow from it.",
    steps: [
      "Add lot — enter the lot number, the owner and the entitlement. Everything else can be filled in later.",
      "The entitlement figure is what contributions are apportioned on. The Share column updates live as you add lots.",
      "Service address is where formal notices go. Keep it current — for an investor lot it is often not the unit itself.",
      "Each lot gets a payment reference automatically. Owners quote it when they pay so the money matches itself to the right lot.",
      "Click the pencil to edit a lot, the bin to remove it.",
    ],
    note:
      "In Victoria and Queensland a lot has two different figures — one that contributions are charged on and one that voting and ownership share go on. Where your state splits them, both columns are shown and both need entering.",
  },
  budget: {
    title: "How the budget works",
    intro:
      "What the scheme expects to spend over the year, split between the two funds. The levies are worked straight out of these totals, so this comes first.",
    steps: [
      "Add one line per cost — insurance, cleaning, lifts, gardening, and so on.",
      "Put each line against the fund that pays for it: day-to-day running costs in one, long-term and capital work in the other.",
      "Enter the amount for the whole year. The per-period figure is worked out for you.",
      "When the budget is right, go to Levies and build the schedule from it.",
    ],
    note:
      "Change a figure later and the levies do not move until you rebuild the schedule — so you can revise a draft budget without disturbing contributions already raised.",
  },
  levies: {
    title: "How levies work",
    intro:
      "The year's budget divided into periods, then apportioned across the lots by entitlement. Each lot's share follows the roll.",
    steps: [
      "Build the schedule once the budget and the roll are both in. Rebuild it any time either changes.",
      "Pick a period to see every lot, what was raised, what has come in and what is still owing.",
      "Record a payment with Receipt. Outstanding, interest and status all update from there.",
      "Print notices produces one notice per lot with its payment reference and any arrears carried forward.",
    ],
    note:
      "Notices are yours to send. The scheme emails or posts them under its own name — this site never sends anything to your owners on your behalf.",
  },
  arrears: {
    title: "How arrears work",
    intro:
      "Everything owing across every period that has fallen due, per lot, with the escalation stage each debt has reached.",
    steps: [
      "Stages follow days overdue: a reminder, then a notice of demand, then a final notice, then recovery.",
      "Interest only accrues after the grace period your committee set, at the rate your committee set.",
      "Log action records what you did and when. Click a lot to see its history.",
      "Anything marked Committee is a decision for the committee, never something that happens on its own.",
    ],
    note:
      "The day thresholds are this product's habits, not legal periods. What your scheme must do, and when, is set by your own rules and your state's law.",
  },
  defects: {
    title: "How defects work",
    intro:
      "Everything that needs fixing, from a loose fence panel to a leaking balcony. This is where a job starts, and where getting quotes begins.",
    steps: [
      "Log a defect describes the problem, where it is, and how urgent it is.",
      "Get quotes raises a request on RBA and matches it to verified businesses for that trade in your area.",
      "You see the request before anything is sent — nothing goes out until you send it.",
      "When a business is engaged, raise a work order so the job, the price and the dates are on the record.",
    ],
    note:
      "A defect out to quote shows as Awaiting quotes automatically. The quote request itself behaves exactly like one raised from the ordinary form.",
  },
  workOrders: {
    title: "How work orders work",
    intro:
      "A work order is the record of a job: what was agreed, with whom, for how much, and when it happened. It is the building's work history.",
    steps: [
      "Create one from a defect, from a quote that came back, or on its own for routine work.",
      "Businesses that were sent the job appear at the top with their responses and quotes — Engage picks one.",
      "Engaging adds that business to your contractor log with its licence and insurance from the directory.",
      "Record warranty and defects liability dates while you have the paperwork. Nobody can find them three years later.",
    ],
    note:
      "The work order is yours to issue. RBA matches you to businesses and keeps the record; it does not instruct anyone on your behalf.",
  },
  contractors: {
    title: "Who looks after this building",
    intro:
      "Two lists: the standing arrangements that recur, and everyone who has done a job here before.",
    steps: [
      "Ongoing services are the recurring ones — cleaning, lawns, lift servicing. Record how often and at what rate.",
      "Engaged as needed builds itself: engaging a business on a work order adds it here.",
      "Add anyone by hand — the cleaner who has been coming for ten years does not need an RBA listing.",
      "Businesses from the directory keep a link to their listing, and their insurance expiry is flagged when it lapses.",
    ],
    note:
      "A business with work history is archived rather than deleted. The record of who did what on the building outlives the arrangement.",
  },
  expenses: {
    title: "How expenses work",
    intro:
      "Every invoice the scheme receives, coded to a budget line so budget-versus-actual answers itself.",
    steps: [
      "Record an invoice as it arrives — you do not have to wait until it is paid.",
      "Allocate it to a budget line and a fund. That is what makes the comparison at the bottom work.",
      "Mark paid when it is paid. Money out of the long-term fund is what the capital works projection spends.",
      "An invoice past its due date and still unpaid is flagged red.",
    ],
    note:
      "Recording an invoice does not pay it. The scheme pays from its own bank account — this is the record, not the payment.",
  },
  compliance: {
    title: "How the compliance register works",
    intro:
      "The dates that catch a self-managed scheme out: insurance, fire, lifts, valuations. Enter what applies to your building and when it was last done.",
    steps: [
      "Add each obligation with the date it was last done and how often it repeats.",
      "The next due date is worked out for you, or you can set it directly.",
      "Mark done stamps today and rolls the next date forward by the cycle.",
      "Anything inside 60 days shows as Due soon; anything past shows as Overdue.",
    ],
    note:
      "What your scheme must hold, and how often, is set by your state's law and your own policies — the register only does the date arithmetic on what you enter.",
  },
  capitalWorks: {
    title: "How the capital works plan works",
    intro:
      "The big jobs ahead — roof, paint, lifts, waterproofing — and whether the long-term fund will cover them when they land.",
    steps: [
      "Add each item with what it would cost today, when it was last done, and how often it comes round.",
      "The projection escalates costs 3% a year and grows contributions 3% a year.",
      "The fund balance comes from the opening balance on the Overview tab plus what has been received, less what has been paid out of it.",
      "A year that goes red is a year the fund cannot cover the work planned.",
    ],
    note:
      "This is a planning tool, not a statutory capital works plan. Some states require a formal plan prepared to a set standard.",
  },
  members: {
    title: "Who can see this scheme",
    intro:
      "Access is by invitation only. Inviting somebody shares nothing on its own — they have to sign in and accept first.",
    steps: [
      "Fill in their email, pick a role, and optionally link them to their lot.",
      "Chairperson, treasurer, secretary and committee member can change scheme records.",
      "Owner is read-only — useful for owners who want visibility without edit rights.",
      "If the invitation cannot be emailed you will be shown the link to pass on yourself. It only works for the address you invited.",
      "Use the bin to withdraw an invitation or remove somebody. The last person who can manage the scheme cannot be removed.",
    ],
    note:
      "This scheme holds other people's personal details — names, addresses, contacts. Only invite people who are genuinely part of it.",
  },
};

export default function StrataHelp({ topic }: { topic: HelpTopic }) {
  const help = HELP[topic];
  const storageKey = `rba.strata.help.${topic}`;
  // Open by default the first time someone lands on a page, then remember the
  // choice. Storage can throw (private windows, blocked site data), so every
  // access is guarded and the panel still renders correctly without it.
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === "closed") setOpen(false);
    } catch {
      /* no stored preference available — leave it open */
    }
  }, [storageKey]);

  function toggle() {
    setOpen((wasOpen) => {
      const next = !wasOpen;
      try {
        localStorage.setItem(storageKey, next ? "open" : "closed");
      } catch {
        /* preference simply is not remembered */
      }
      return next;
    });
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-sky-200 bg-sky-50/70">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left transition hover:bg-sky-100/60"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-900 text-white">
          <Info size={14} />
        </span>
        <span className="flex-1 text-sm font-bold text-sky-950">{help.title}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-sky-700 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-sky-200 px-4 py-4 sm:px-5">
          <p className="text-sm leading-relaxed text-sky-950">{help.intro}</p>
          <ol className="mt-3 space-y-2">
            {help.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-900 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {help.note && (
            <p className="mt-4 rounded-xl bg-white/80 px-3.5 py-3 text-xs leading-relaxed text-slate-600">
              {help.note}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
