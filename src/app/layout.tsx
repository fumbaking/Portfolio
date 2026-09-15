/**
 * @component  RootLayout
 * @spec       design.md § 4 L-01 (Page shell), § 3 T-02, § 6 (chrome), § 10 A-03
 * @tokens     T-01.ink-700/text-hi, T-02.font-display/body/mono, T-07.z-preloader
 * @motion     M-xx via C-00 MotionProvider
 */

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/chrome/MotionProvider";
import { ToastProvider } from "@/components/chrome/Toast";
import { Preloader } from "@/components/chrome/Preloader";
import { Cursor } from "@/components/chrome/Cursor";
import { Starfield } from "@/components/chrome/Starfield";
import { Navbar } from "@/components/chrome/Navbar";
import { SideRails } from "@/components/chrome/SideRails";
import { Footer } from "@/components/chrome/Footer";
import { BackToTop } from "@/components/chrome/BackToTop";
import { THEME_COLOR } from "@/config/theme";
import { profile } from "@/data/profile";
import "./globals.css";

/* ── T-02 Typography ──────────────────────────────────────────────────── */

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // P-01 — preload display + body only
});

export const metadata: Metadata = {
  // Required to resolve the file-based OG/Twitter images to absolute URLs (§15.9).
  // Set NEXT_PUBLIC_SITE_URL to the deployed origin before going live.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${profile.name} — Portfolio`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.tagline,
    type: "website",
    locale: "en_RW",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <MotionProvider>
          <ToastProvider>
            {/* A-03 — first focusable node */}
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-preloader focus:rounded-r-sm focus:bg-ink-700 focus:px-4 focus:py-2 focus:font-mono focus:text-m-md focus:text-text-hi"
            >
              Skip to content
            </a>

            <Preloader />
            <Cursor />
            <Starfield />
            <Navbar />
            <SideRails />

            <main id="main" className="relative z-raised">
              {children}
            </main>

            <Footer />
            <BackToTop />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
