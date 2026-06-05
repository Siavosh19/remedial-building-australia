import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import TermsGate from "./components/TermsGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remedial Building Australia",
  description: "Technical defect database and remedial building knowledge platform for Australian Class 2 buildings",
  other: {
    copyright: "Arasep Projects Pty Ltd ABN 20 675 874 003",
    rights: "All content copyright Arasep Projects Pty Ltd. All rights reserved.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Terms gate — z-index 99999, shows above Termly banner, one-time per visitor */}
        <TermsGate />
        {/* Termly cookie-consent banner — keep as-is, loads after gate */}
        <Script
          src="https://app.termly.io/resource-blocker/cd648cb9-82de-4258-b9b6-13de590b2886"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
