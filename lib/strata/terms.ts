// ── Terms of use for the strata workspace ────────────────────────────────────
// Bump TERMS_VERSION whenever the substance changes: acceptance is recorded
// against the version, so a change re-prompts everyone rather than silently
// binding people to something they never saw.

export const TERMS_VERSION = "2026-09-26";

export type TermsSection = { heading: string; body: string[] };

export const TERMS_SUMMARY =
  "In short: this is record-keeping software for committees that run their own scheme. It is not strata management, it does not give advice, and it never holds your money. What you record, send and decide remains yours.";

export const TERMS: TermsSection[] = [
  {
    heading: "1. What this service is",
    body: [
      "The strata workspace (the “Service”) is software provided by Remedial Building Australia (“RBA”, “we”, “us”) that helps an owners corporation, body corporate, strata company or community corporation (each a “scheme”) keep its own records — its roll, contributions, invoices, defects, registers and correspondence.",
      "The Service is a record-keeping and calculation tool. It is not strata management, and we do not act as your agent. We do not manage your scheme, hold office, make decisions for you, or perform any function that your scheme’s law reserves to the owners, the committee or a licensed strata managing agent.",
      "You remain entirely responsible for running your scheme, including every decision, notice, payment and statutory obligation.",
    ],
  },
  {
    heading: "2. We do not give advice",
    body: [
      "Nothing in the Service is legal, financial, accounting, tax, insurance or engineering advice, and nothing in it should be relied on as advice.",
      "Strata law differs in every Australian state and territory and changes over time. The Service does not tell you what the law requires of your scheme. Wording, due dates, interest rates, notice periods, spending limits and escalation steps are settings your committee enters, or habits of the product, and are not statements of any legal requirement.",
      "You must confirm your scheme’s obligations with your state or territory authority, and obtain your own professional advice before acting.",
    ],
  },
  {
    heading: "3. Artificial intelligence features",
    body: [
      "Where the Service offers an assistant, it reads the records you have entered and produces text in response to what you ask. It is a drafting and summarising aid.",
      "Its output may be incomplete, out of date or wrong. It is not advice, it is not a substitute for professional judgement, and it must not be relied on without checking it against your own records and, where it matters, with a qualified adviser.",
      "The assistant does not act. It does not send anything, engage anyone, move money or change your records on its own.",
    ],
  },
  {
    heading: "4. Your money stays yours",
    body: [
      "We never hold, receive, pool or disburse your scheme’s funds. Contributions are paid into your scheme’s own bank account by arrangements your scheme makes directly with its own bank.",
      "The Service records payments that you enter or import. Recording a payment or an invoice in the Service does not move any money and is not a receipt issued by us.",
      "We do not operate a trust account and are not a licensed strata managing agent, real estate agent, financial services licensee or credit provider.",
    ],
  },
  {
    heading: "5. Accuracy is your responsibility",
    body: [
      "Everything the Service shows is calculated from what you put into it. Contribution schedules, arrears, interest, statements, projections and notices are only as correct as the entitlements, budgets, dates, rates and amounts you entered.",
      "You are responsible for checking every figure and every document before you rely on it, send it, or present it to owners or to a tribunal.",
      "Financial statements produced by the Service are a summary of your own records. They are not audited accounts and may not meet any audit or reporting standard that applies to your scheme.",
    ],
  },
  {
    heading: "6. Notices and communications",
    body: [
      "The Service prepares documents for you. Except for account and platform messages we send to you, and requests for quotes you choose to raise through RBA, we do not send communications to your owners, occupiers or contractors on your behalf.",
      "Issuing a notice, serving it correctly, and serving it at the right address are your responsibility. Service of documents has legal consequences and the requirements differ between states.",
    ],
  },
  {
    heading: "7. Contractors and quotes",
    body: [
      "The Service can pass a request for quotes to businesses listed in the RBA directory. Those businesses are independent third parties.",
      "We do not employ, supervise, endorse, warrant or guarantee any business, its licensing, its insurance, its pricing, its conduct or its work, and we are not a party to any contract you enter into with one. Any engagement is between your scheme and that business.",
      "Licence and insurance details shown in the Service are as supplied to us or entered by you, may be out of date, and must be verified by you before you engage anyone.",
    ],
  },
  {
    heading: "8. Your data and other people’s information",
    body: [
      "You will enter personal information about other people — owners, occupiers, agents and contractors. By doing so you confirm that you are authorised to collect and record it for the purpose of administering the scheme, and that you will handle it in accordance with the Privacy Act 1988 (Cth) and any applicable state law.",
      "We store that information in order to provide the Service, handle it in accordance with our Privacy Policy, and keep each scheme’s records accessible only to the people that scheme has invited and who have accepted.",
      "You may export your scheme’s records at any time. If your account is closed we will retain records for a reasonable period and then delete them.",
      "You must not enter information you have no proper reason to hold, and you must remove people’s access promptly when they leave the committee.",
    ],
  },
  {
    heading: "9. Access, availability and changes",
    body: [
      "We provide the Service on an “as is” basis. We do not warrant that it will be available without interruption, free of errors, or fit for any particular purpose of yours.",
      "We may change, suspend or withdraw features, and may change these terms. Where a change is significant we will tell you and, for the terms, ask you to accept the new version.",
      "You are responsible for keeping your own copies of anything you need to retain, and we recommend exporting your records periodically.",
    ],
  },
  {
    heading: "10. Fees",
    body: [
      "Current pricing, the free allowance and the trial period are shown in the Service and may change on reasonable notice. A change will not affect a period you have already paid for.",
      "Where an account is payable and payment is not made, we may put the account into a read-only state. We do not delete your records because of non-payment, and export remains available.",
      "Fees are in Australian dollars and, where applicable, include GST.",
    ],
  },
  {
    heading: "11. Acceptable use",
    body: [
      "Use the Service only to administer schemes you are genuinely involved in. Do not use it to hold data about people unconnected with those schemes, to send unsolicited communications, to misrepresent who you are, or in any way that breaks the law.",
      "You are responsible for everything done through your account and for keeping your sign-in details secure.",
    ],
  },
  {
    heading: "12. Liability",
    body: [
      "Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in these terms excludes, restricts or modifies those guarantees or any other right you have that cannot lawfully be excluded.",
      "To the extent the law allows, our liability for a failure to comply with a consumer guarantee is limited to resupplying the Service or paying the cost of having it resupplied.",
      "Otherwise, and to the extent the law allows: we are not liable for indirect or consequential loss, loss of profit, loss of opportunity, or loss arising from your reliance on figures, documents or output produced from data you entered; and our total liability arising out of or in connection with the Service is limited to the fees you paid us for it in the twelve months before the claim, or one hundred dollars if you paid nothing.",
      "You remain responsible for your scheme’s compliance with its obligations, and for any loss arising from a decision your committee makes.",
    ],
  },
  {
    heading: "13. Ending your use",
    body: [
      "You may stop using the Service at any time and export your records. We may suspend or end access where these terms are breached, where the Service is being misused, or where we discontinue it, and we will give reasonable notice unless the circumstances make that impossible.",
    ],
  },
  {
    heading: "14. Governing law",
    body: [
      "These terms are governed by the laws of New South Wales, Australia, and you submit to the non-exclusive jurisdiction of the courts of that state.",
    ],
  },
];
