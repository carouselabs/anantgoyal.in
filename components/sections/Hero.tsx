"use client";

import { m, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { site } from "@/content/site";
import { previewSrc, previewSrcSet } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { CLIENTS } from "@/content/clients";
import { InboxWindow, Phone } from "@/components/email/Frames";
import { Orb, Torus } from "@/components/three-d/Objects";
import { AuthChecks, SendBars } from "@/components/outreach/Parts";

const LINES: { words: string[]; em?: boolean }[] = [
  { words: ["Your", "brand"] },
  { words: ["is", "beautiful."] },
  { words: ["Why", "aren’t", "your"] },
  { words: ["emails?"], em: true },
];


/** Moves its children with the pointer by `depth` pixels at the edge. */
function Depth({ x, y, depth, className, style, children }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <m.div aria-hidden className={className} style={{ ...style, x: tx, y: ty }}>
      {children}
    </m.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const onMove = (e: PointerEvent) => {
      if (reduce.matches || !fine.matches || document.documentElement.getAttribute("data-motion") === "paused") return;
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    const reset = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    window.addEventListener("motionchange", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      window.removeEventListener("motionchange", reset);
    };
  }, [px, py]);

  let wordIndex = 0;

  return (
    <section ref={ref} id="top" data-enter aria-labelledby="hero-h" className="canvas relative isolate overflow-hidden px-3 pb-3 pt-[88px] sm:px-4 sm:pb-4 md:px-6 md:pb-6">
      <div className="relative mx-auto max-w-[1400px]">
        <div className="relative grid min-h-[calc(100svh-100px)] overflow-hidden sm:min-h-[calc(100svh-104px)] md:min-h-[calc(100svh-112px)] rounded-[28px] bg-white shadow-[0_40px_120px_-40px_rgba(16,6,90,0.65)] sm:rounded-[40px] lg:grid-cols-[1.08fr_1fr]">
          {/* words */}
          <div className="relative z-10 flex flex-col justify-between gap-10 px-5 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-10 lg:px-14 lg:pb-12 lg:pt-12">
            <div>
              <div data-enter-fade style={{ ["--d" as string]: "0ms" }} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {site.availability.open ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-go/25 bg-go/10 py-1.5 pl-2.5 pr-3.5 text-[13px] font-medium text-[#13723a]">
                    <span className="live-dot size-2 rounded-full bg-go" />
                    {site.availability.label}
                  </span>
                ) : null}
                <p className="flex items-center gap-2 text-[13px] font-medium text-ink-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.avatar} alt="" width={28} height={28} className="size-7 rounded-full ring-2 ring-white shadow-[0_4px_10px_-4px_rgba(40,20,140,0.6)]" />
                  <span>
                    <span className="text-ink">{site.name}</span> · Email design and outreach
                  </span>
                </p>
              </div>

              <h1 id="hero-h" className="mt-7 text-[clamp(2.6rem,1.1rem+4.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-ink [font-stretch:92%] sm:mt-9">
                {LINES.map((line, li) => (
                  <span key={li} className="block">
                    {line.words.map((w, wi) => {
                      const d = 80 + wordIndex++ * 70;
                      return (
                        <Fragment key={wi}>
                          <span className="hero-mask">
                            <span className={line.em ? "hero-word font-serif text-[1.12em] font-normal italic tracking-[-0.02em]" : "hero-word"} style={{ ["--d" as string]: `${d}ms` }}>
                              {line.em ? <span className="text-gradient pr-[0.06em]">{w}</span> : w}
                            </span>
                          </span>
                          {wi < line.words.length - 1 ? " " : null}
                        </Fragment>
                      );
                    })}
                    {li < LINES.length - 1 ? " " : null}
                  </span>
                ))}
              </h1>

              <p data-enter-fade style={{ ["--d" as string]: "620ms" }} className="mt-7 max-w-[30rem] text-[17px] leading-[1.6] text-ink-2 sm:text-lg">
                From beautifully crafted HTML emails to custom email software and scalable outreach infrastructure, I help businesses design, send and manage better email experiences.
              </p>

              <div data-enter-fade style={{ ["--d" as string]: "720ms" }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="#contact" size="lg" arrow="right">
                  Let&rsquo;s work together
                </ButtonLink>
                <ButtonLink href="#work" size="lg" variant="ghost">
                  Explore my work
                </ButtonLink>
              </div>
            </div>

            <div data-enter-fade style={{ ["--d" as string]: "820ms" }}>
              <p className="text-[13px] font-medium text-ink-3">Every email hand-coded and checked in</p>
              <ul className="mt-3 flex flex-wrap items-center gap-2">
                {CLIENTS.map((c) => (
                  <li key={c.name} className="flex h-10 items-center gap-2 rounded-full border border-line bg-mist/60 px-3.5 text-[13px] font-medium text-ink-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.src} alt="" width={c.w} height={c.h} loading="lazy" className="h-4 w-auto" />
                    {c.name === "Yahoo Mail" ? <span className="sr-only">Yahoo Mail</span> : c.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* stage */}
          <div data-enter-stage style={{ ["--d" as string]: "260ms" }} className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-0">
            <div aria-hidden className="absolute inset-3 overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#eef1ff_0%,#f1ebff_55%,#fbefff_100%)] sm:inset-4 sm:rounded-[30px]">
              <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(75,48,238,0.14)_1px,transparent_1.2px)] [background-size:22px_22px]" />
            </div>

            <Depth x={x} y={y} depth={10} className="absolute right-[1%] top-[2%]">
              <Torus size={180} className="relative" />
            </Depth>

            {/* main email */}
            <Depth x={x} y={y} depth={6} className="absolute left-1/2 top-[8%] w-[64%] max-w-[400px] -translate-x-[42%] sm:top-[9%]">
              <InboxWindow from="Tandemly" subject="Early access is open" className="shadow-[var(--shadow-float)]">
                <div className="h-[330px] overflow-hidden sm:h-[clamp(300px,52vh,520px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewSrc("tandemly-early-access", "desktop")}
                    srcSet={previewSrcSet("tandemly-early-access", "desktop")}
                    sizes="(min-width: 1024px) 400px, 64vw"
                    alt="Tandemly early access email: a calendar hero, a headline and an orange call to action"
                    width={1020}
                    height={2597}
                    fetchPriority="high"
                    className="email-scroll block w-full"
                    style={{ ["--scroll-to" as string]: "-38%", ["--dur" as string]: "18s" }}
                  />
                </div>
              </InboxWindow>
            </Depth>

            {/* phone */}
            <Depth x={x} y={y} depth={16} className="absolute bottom-[5%] left-[6%] w-[34%] max-w-[200px] sm:left-[7%]">
              <div className="float" style={{ ["--dur" as string]: "8s", ["--float" as string]: "-10px" }}>
                <Phone className="aspect-[9/19]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewSrc("brookfold-winter-edit", "mobile")}
                    srcSet={previewSrcSet("brookfold-winter-edit", "mobile")}
                    sizes="200px"
                    loading="lazy"
                    alt="Brookfold winter sale email on a phone"
                    width={750}
                    height={5776}
                    className="email-scroll block w-full"
                    style={{ ["--scroll-to" as string]: "-22%", ["--dur" as string]: "20s" }}
                  />
                </Phone>
              </div>
            </Depth>

            {/* inbox notification */}
            <Depth x={x} y={y} depth={22} className="absolute left-[4%] top-[33%] hidden w-[min(270px,46%)] sm:block lg:left-[2%]">
              <div className="float rounded-2xl bg-white/85 p-3 shadow-[var(--shadow-float)] ring-1 ring-ink/5 backdrop-blur-md" style={{ ["--dur" as string]: "7s", ["--delay" as string]: "-2s" }}>
                <div className="flex items-start gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#3b2618] font-serif text-[15px] text-[#fbf6ee]">M</span>
                  <div className="min-w-0 text-[11.5px] leading-[1.35]">
                    <div className="flex items-baseline justify-between gap-2">
                      <b className="font-semibold text-ink">Morrow Roast</b>
                      <span className="text-ink-3">now</span>
                    </div>
                    <div className="font-medium text-ink">Welcome to the club, Sam</div>
                    <div className="truncate text-ink-3">Your first bag ships on Monday.</div>
                  </div>
                </div>
              </div>
            </Depth>

            {/* outreach analytics card: the second service, in miniature */}
            <Depth x={x} y={y} depth={28} className="absolute right-[3%] top-[40%] hidden w-[232px] sm:block">
              <div className="float rounded-2xl bg-night p-3.5 text-white shadow-[0_24px_44px_-18px_rgba(10,0,60,0.85)]" style={{ ["--dur" as string]: "9s", ["--delay" as string]: "-4s" }}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-white/60">Outreach · sending</span>
                  <span className="size-1.5 rounded-full bg-go live-dot" />
                </div>
                <div className="mt-2.5 h-10">
                  <SendBars dark />
                </div>
                <div className="mt-2.5">
                  <AuthChecks compact dark />
                </div>
              </div>
            </Depth>

            {/* checked-in card */}
            <Depth x={x} y={y} depth={20} className="absolute bottom-[7%] right-[5%] w-[min(230px,48%)]">
              <div className="float rounded-2xl bg-white p-3.5 shadow-[var(--shadow-float)] ring-1 ring-ink/5" style={{ ["--dur" as string]: "8.5s", ["--delay" as string]: "-1s" }}>
                <div className="text-[11px] font-medium text-ink-3">Rendering check</div>
                <ul className="mt-2 space-y-1.5">
                  {CLIENTS.slice(0, 3).map((c) => (
                    <li key={c.name} className="flex items-center justify-between text-[12px] font-medium text-ink">
                      <span className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.src} alt="" width={c.w} height={c.h} loading="lazy" className="h-3.5 w-auto" />
                        {c.name}
                      </span>
                      <span className="grid size-4 place-items-center rounded-full bg-go text-white">
                        <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Depth>

            <Depth x={x} y={y} depth={34} className="absolute left-[8%] top-[8%] hidden sm:block">
              <div className="float" style={{ ["--dur" as string]: "6s", ["--delay" as string]: "-3s" }}>
                <Orb variant="iris" size={72} className="relative" />
              </div>
            </Depth>
            <Depth x={x} y={y} depth={26} className="absolute bottom-[13%] left-[37%] hidden sm:block">
              <div className="drift" style={{ ["--dur" as string]: "12s" }}>
                <Orb variant="violet" size={112} className="relative" />
              </div>
            </Depth>
            <Depth x={x} y={y} depth={40} className="absolute left-[54%] top-[3%] hidden sm:block">
              <Orb variant="lime" size={26} className="relative" />
            </Depth>
            <Depth x={x} y={y} depth={18} className="absolute right-[3%] top-[26%]">
              <div className="float" style={{ ["--dur" as string]: "10s", ["--delay" as string]: "-5s" }}>
                <Orb variant="blue" size={64} className="relative" />
              </div>
            </Depth>
          </div>
        </div>
      </div>
    </section>
  );
}
