import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serpentine = localFont({
  src: "../public/fonts/SerpentineD-Bold.woff",
  variable: "--font-serpentine",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onyxcupen.se"),
  title: {
    default: "Onyxcupen | Innebandycup i Nyköping",
    template: "%s | Onyxcupen",
  },
  description:
    "En rolig och proffsig innebandyhelg för ungdomslag – september 2026 i Nyköping, Rosvalla Arena. Anmäl ditt lag idag.",
  keywords: ["innebandycup", "Nyköping", "ungdomsinnebandy", "Rosvalla Arena", "innebandycup Sverige", "ungdomscup innebandy"],
  openGraph: {
    siteName: "Onyxcupen",
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Onyxcupen – Innebandycup i Nyköping" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} ${serpentine.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#181B22] text-[#E8E8E8]" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Onyx Innebandy",
              url: "https://onyxcupen.se",
              logo: "https://onyxcupen.se/logo.png",
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
