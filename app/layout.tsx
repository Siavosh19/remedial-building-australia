import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.remedialbuildingaustralia.com.au";

// Organisation + WebSite structured data (JSON-LD) for Remedial Building Australia.
const organisationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Remedial Building Australia",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description:
        "Australian remedial building knowledge platform — remedial building advice, defect guidance, repair systems, remedial specifications and a directory of specialists.",
      areaServed: "AU",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Remedial Building Australia",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Remedial Building Australia",
  description: "Technical defect database and remedial building knowledge platform for Australian Class 2 buildings",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
  },
  other: {
    copyright: "Arasep Projects Pty Ltd ABN 20 675 874 003",
    rights: "All content copyright Arasep Projects Pty Ltd. All rights reserved.",
  },
  // Google Search Console verification (URL-prefix / HTML-tag method).
  // Set GOOGLE_SITE_VERIFICATION in Vercel to the token Google gives you and redeploy.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        {children}
        <Script
          src="https://app.termly.io/resource-blocker/cd648cb9-82de-4258-b9b6-13de590b2886"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
