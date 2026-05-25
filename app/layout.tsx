import type { Metadata } from "next";
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
  title: "Onyxcupen | Sveriges Roligaste Innebandycup | i Nyköping",
  description:
    "En smidig, rolig och proffsig innebandyhelg – allt under ett tak. Spela och upplev en cup där matcher och atmosfär sitter ihop, september 2026 i Nyköping.",
  keywords: "innebandycup, Nyköping, ungdomscup, innebandy, Rosvalla",
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
        {children}
      </body>
    </html>
  );
}
