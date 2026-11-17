"use client";

import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useState } from "react";
import { previewSrc, previewSrcSet, projects } from "@/content/projects";
import { InboxWindow, Phone } from "@/components/email/Frames";
import { ProjectViewer } from "@/components/work/ProjectViewer";
import Link from "next/link";
import { Orb } from "@/components/three-d/Objects";

// Alternating widths on large screens: 7/5, 5/7, 7/5 of a 12-column grid.
// The seventh project runs full width, its text beside the previews.
const SPAN = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5", "lg:col-span-12"];

export function Work() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const navigate = useCallback((i: number) => setOpen(i), []);

  return (
    <section id="work" aria-labelledby="work-h" className="night on-dark relative overflow-hidden px-4 py-20 sm:px-6 md:py-24">
      <Orb variant="blue" size={240} className="-left-28 top-[38%] hidden opacity-80 lg:block" />
      <Orb variant="violet" size={120} className="-right-14 top-[48%] hidden lg:block" />
      <div className="relative mx-auto max-w-[1400px] lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="work-h" className="max-w-[16ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Emails that deserve a <span className="font-serif font-normal italic tracking-[-0.02em]">second look.</span>
          </h2>
          <p className="max-w-[28rem] text-lg leading-[1.6] text-white/70">
            A few directions from my email design work. Open any one to scroll the full desktop and mobile versions side by side.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-12">
          {projects.map((p, i) => {
            const full = SPAN[i] === "lg:col-span-12";
            const wide = SPAN[i] === "lg:col-span-7" || full;
            const dark = p.slug === "pocketlane-launch";
            return (
              <li key={p.slug} className={SPAN[i]} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 100}ms` }}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-haspopup="dialog"
                  className={clsx("peek-host lift group flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-night-2 p-3 text-left ring-1 ring-white/10 hover:ring-white/20", full && "lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center")}
                >
                  <div className="relative h-[280px] overflow-hidden rounded-[20px] sm:h-[300px]" style={{ background: `linear-gradient(150deg, ${p.tint.a}, ${p.tint.b})` }}>
                    <div
                      className={clsx("peek absolute left-5 top-6 sm:left-8 sm:top-8", wide ? "w-[68%]" : "w-[76%]")}
                      style={{ ["--peek" as string]: "-30%" }}
                    >
                      <InboxWindow from={p.from} subject={p.subject} tone={dark ? "dark" : "light"} className="shadow-[0_30px_60px_-28px_rgba(10,0,60,0.6)]">
                        <div className="h-[300px] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={previewSrc(p.slug, "desktop")} srcSet={previewSrcSet(p.slug, "desktop")} sizes="(min-width: 1024px) 520px, 80vw" alt={`${p.name}, desktop version`} width={1020} height={2600} loading="lazy" className="block w-full" />
                        </div>
                      </InboxWindow>
                    </div>
                    <div className={clsx("absolute bottom-[-26%] right-4 sm:right-7", wide ? "w-[22%] max-w-[160px]" : "w-[26%] max-w-[132px]")}>
                      <Phone className="aspect-[9/19] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewSrc(p.slug, "mobile")} srcSet={previewSrcSet(p.slug, "mobile")} sizes="160px" alt={`${p.name}, mobile version`} width={750} height={4600} loading="lazy" className="block w-full" />
                      </Phone>
                    </div>
                  </div>
                  <div className={clsx("px-3 pb-3 pt-5", full && "lg:px-10 lg:py-6")}>
                    <div className="grid gap-x-4 sm:grid-cols-[1fr_auto] sm:items-start">
                      <div className="min-w-0">
                        <span className="text-[13px] font-medium text-lime">{p.category}</span>
                        <h3 className="mt-0.5 text-xl font-semibold tracking-[-0.02em] text-white">{p.name}</h3>
                      </div>
                      <span className="btn order-last mt-4 inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-ink sm:order-none sm:mt-0">
                        View design
                        <ArrowUpRight aria-hidden className="btn-arrow size-4" />
                      </span>
                      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.55] text-white/65 sm:col-span-2">{p.description}</p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link href="/email-design/" className="btn inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink">
            Explore more email design
            <ArrowUpRight aria-hidden className="btn-arrow size-4" />
          </Link>
        </div>
      </div>
      <ProjectViewer index={open} onClose={close} onNavigate={navigate} />
    </section>
  );
}
