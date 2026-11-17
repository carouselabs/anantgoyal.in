import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap", axes: ["wdth"] });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });

const title = `${site.name} · Email design, software and outreach`;
const description =
  "Responsive HTML emails, custom email sending software, email infrastructure and warm-up, and scalable outreach: I help businesses design, send and manage better email.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title, description, url: "/", siteName: site.name, images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  other: { "page-type": "service", "site-kind": "other" },
};

export const viewport: Viewport = {
  themeColor: "#3a33ec",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: marks JS as available (scroll reveals only hide
// content when this is set), starts the hero entrance, and restores a saved
// "pause motion" choice.
const headScript = `(function(){var d=document.documentElement;d.classList.add('js','m-enter');var done=function(){d.classList.add('m-enter-done')};setTimeout(done,900);document.addEventListener('DOMContentLoaded',function(){requestAnimationFrame(function(){requestAnimationFrame(done)})});try{if(localStorage.getItem('motion')==='paused')d.setAttribute('data-motion','paused')}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior: page-to-page navigation jumps straight to the top
    // (or to #contact); in-page links keep the smooth scroll (Next 16 opt-in).
    <html lang="en" data-type="service" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
