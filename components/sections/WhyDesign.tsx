"use client";

import clsx from "clsx";
import { useState } from "react";
import { previewSrc, previewSrcSet } from "@/content/projects";
import { InboxWindow } from "@/components/email/Frames";
import { Orb } from "@/components/three-d/Objects";

// Pin positions are percentages of the visible crop of the Graphwell email
// (its top 1,000px at 680px wide).
const POINTS = [
  { title: "Consistent visual identity", copy: "Your colours, type and logo in every send, so people know it is you before they read the sender.", pin: { x: 9, y: 4.2 } },
  { title: "Better readability", copy: "Clear headings, comfortable line lengths and enough space that people finish the email.", pin: { x: 87, y: 17 } },
  { title: "Responsive layouts", copy: "Columns that stack, images that scale and buttons big enough for a thumb on a phone.", pin: { x: 91, y: 51 } },
  { title: "Professional presentation", copy: "Even spacing and clean alignment that make a small team look as careful as a large one.", pin: { x: 14, y: 89 } },
  { title: "Memorable communication", copy: "One strong first screen and one clear action, so the email is remembered and acted on.", pin: { x: 43, y: 36.4 } },
  { title: "Email-client compatibility", copy: "Tables, inline styles and Outlook fallbacks, so the design holds in Gmail, Outlook and Apple Mail.", pin: { x: 92, y: 9 } },
];

export function WhyDesign() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="why" aria-labelledby="why-h" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <Orb variant="iris" size={90} className="-left-6 -top-8 z-10 hidden sm:block" />
          <Orb variant="blue" size={150} className="-bottom-12 -right-10 hidden lg:block" />
          <InboxWindow from="Graphwell" subject="What shipped in November" className="relative mx-auto max-w-[560px] shadow-[var(--shadow-float)]">
            <div className="relative aspect-[680/1000] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewSrc("graphwell-newsletter", "desktop")} srcSet={previewSrcSet("graphwell-newsletter", "desktop")} sizes="(min-width: 1024px) 560px, 90vw" alt="The Graphwell newsletter with six parts of the design marked" width={1020} height={2805} loading="lazy" className="block w-full" />
              {POINTS.map((pt, i) => (
                <span
                  key={pt.title}
                  aria-hidden
                  className={clsx(
                    "absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[13px] font-semibold transition-all duration-300",
                    active === i ? "scale-125 bg-lime text-ink shadow-[0_0_0_8px_rgba(212,255,92,0.35)]" : "bg-ink text-white shadow-[0_6px_16px_-6px_rgba(16,12,51,0.6)] ring-2 ring-white",
                    active !== null && active !== i && "opacity-40",
                  )}
                  style={{ left: `${pt.pin.x}%`, top: `${pt.pin.y}%` }}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </InboxWindow>
        </div>

        <div className="order-1 lg:order-2">
          <h2 id="why-h" className="max-w-[16ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Your emails are part of your <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">brand experience.</span>
          </h2>
          <ol className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {POINTS.map((pt, i) => (
              <li
                key={pt.title}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group cursor-default border-t border-line py-2 outline-offset-2"
              >
                <div className={clsx("-mx-3 flex items-baseline gap-3 rounded-2xl px-3 py-3 transition-colors", active === i && "bg-mist")}>
                  <span className={clsx("font-mono text-[12px] transition-colors", active === i ? "text-violet" : "text-ink-3")}>0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{pt.title}</h3>
                    <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{pt.copy}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
