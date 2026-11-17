"use client";

import clsx from "clsx";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { AESTHETICS, COLLECTIONS, INDUSTRIES, PURPOSES, collectionLabel, designHref, searchDesigns, type Query } from "@/projects";
import type { Design } from "@/projects/types";
import { previewSrc, previewSrcSet } from "@/content/projects";
import { InboxWindow, Phone } from "@/components/email/Frames";

// An editorial showcase rather than a grid of equal tiles. Designs flow
// through a repeating pattern of shapes, so the page reads the same with
// 20 designs or 500:
//   feature  - a large desktop view with the phone beside it
//   portrait - the phone version, tall
//   standard - desktop and phone, medium
//   wide     - a panoramic slice of the desktop email
// Each row shares one height, so the mosaic stays tidy at any length.
const PATTERN = [
  { shape: "feature", span: "lg:col-span-8", row: "tall" },
  { shape: "portrait", span: "lg:col-span-4", row: "tall" },
  { shape: "standard", span: "lg:col-span-4", row: "mid" },
  { shape: "standard", span: "lg:col-span-4", row: "mid" },
  { shape: "portrait", span: "lg:col-span-4", row: "mid" },
  { shape: "wide", span: "lg:col-span-7", row: "short" },
  { shape: "standard", span: "lg:col-span-5", row: "short" },
] as const;
type Shape = (typeof PATTERN)[number]["shape"];
type Row = (typeof PATTERN)[number]["row"];
// One height on phones and tablets; the rhythm opens up on large screens.
const STAGE_H: Record<Row, string> = { tall: "h-[380px] lg:h-[560px]", mid: "h-[380px] lg:h-[470px]", short: "h-[380px]" };

const PAGE = PATTERN.length * 2;
const KEYS = ["collection", "purpose", "style", "industry"] as const;

// A tag picked on a design page (?style=dark) narrows the view; it shows as a
// chip that clears it. There is no filter bar of its own.
function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener("showcase-query", cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener("showcase-query", cb);
  };
}
const readSearch = () => window.location.search;
function parse(search: string): Query {
  const p = new URLSearchParams(search);
  const q: Query = {};
  for (const k of KEYS) {
    const v = p.get(k);
    if (v) q[k] = v;
  }
  return q;
}
function clear(key: keyof Query, query: Query) {
  const p = new URLSearchParams();
  for (const k of KEYS) if (k !== key && query[k]) p.set(k, query[k]!);
  const qs = p.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  window.dispatchEvent(new Event("showcase-query"));
}
const LISTS = { collection: COLLECTIONS, style: AESTHETICS, purpose: PURPOSES, industry: INDUSTRIES } as const;

const STAGES = [
  "bg-[linear-gradient(150deg,#e7ebff,#f1e8ff)]",
  "bg-[linear-gradient(150deg,#f3ecff,#ffe9f1)]",
  "bg-[linear-gradient(150deg,#e6f3ff,#ece7ff)]",
  "bg-[linear-gradient(150deg,#efeafc,#e3e8ff)]",
];

function Visual({ d, shape, row, priority }: { d: Design; shape: Shape; row: Row; priority?: boolean }) {
  const dark = d.aesthetics.includes("dark") || d.aesthetics.includes("cinematic");
  const desktop = (h: string, w: string) => (
    <div className={w}>
      <InboxWindow from={d.from} subject={d.subject} tone={dark ? "dark" : "light"} className="shadow-[0_34px_70px_-30px_rgba(10,0,60,0.6)]">
        <div className={clsx("overflow-hidden", h, dark ? "bg-night" : "bg-white")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc(d.slug, "desktop")} srcSet={previewSrcSet(d.slug, "desktop")} sizes={shape === "feature" ? "(min-width: 1024px) 640px, 90vw" : "(min-width: 1024px) 460px, 90vw"} alt={`${d.title}, desktop version`} width={1020} height={2600} loading={priority ? "eager" : "lazy"} className="block w-full" />
        </div>
      </InboxWindow>
    </div>
  );
  const phone = (cls: string, sizes: string) => (
    <Phone className={clsx("aspect-[9/19]", cls)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={previewSrc(d.slug, "mobile")} srcSet={previewSrcSet(d.slug, "mobile")} sizes={sizes} alt={`${d.title}, mobile version`} width={750} height={4600} loading={priority ? "eager" : "lazy"} className="block w-full" />
    </Phone>
  );

  if (shape === "portrait") {
    return <div className="flex h-full justify-center pt-8">{phone("w-[min(62%,240px)] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2", "240px")}</div>;
  }
  if (shape === "wide") {
    return <div className="px-6 pt-8 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2 sm:px-10">{desktop("h-[300px]", "w-full")}</div>;
  }
  const big = shape === "feature";
  const mid = row === "mid";
  return (
    <div className="relative h-full px-6 pt-8 sm:px-10">
      <div className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2">{desktop(big ? "h-[420px]" : mid ? "h-[280px] lg:h-[360px]" : "h-[280px]", big ? "w-[72%]" : "w-[76%]")}</div>
      <div className={clsx("absolute right-6 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-4 sm:right-10", big ? "top-[22%] w-[24%] max-w-[210px]" : mid ? "top-[100px] w-[26%] max-w-[150px] lg:top-[130px]" : "top-[100px] w-[24%] max-w-[130px]")}>{phone("", big ? "210px" : "150px")}</div>
    </div>
  );
}

function ShowcaseItem({ d, shape, span, row, index }: { d: Design; shape: Shape; span: string; row: Row; index: number }) {
  return (
    <li className={clsx("min-w-0", span)}>
      <Link href={designHref(d.slug)} className="group block h-full">
        <div className={clsx("relative overflow-hidden rounded-[28px] ring-1 ring-ink/5 transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]", STAGES[index % STAGES.length], STAGE_H[row])}>
          <Visual d={d} shape={shape} row={row} priority={index < 2} />
        </div>
        <div className="flex items-start justify-between gap-4 px-1 pt-4">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-violet">{collectionLabel(d.collection)}</p>
            <h3 className="mt-0.5 text-[clamp(1.15rem,1rem+0.4vw,1.4rem)] font-semibold tracking-[-0.02em] text-ink">{d.title}</h3>
          </div>
          <span aria-hidden className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 transition-[transform,background-color,color] duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function DesignIndex({ designs }: { designs: Design[] }) {
  const search = useSyncExternalStore(subscribe, readSearch, () => "");
  const query = parse(search);
  const results = searchDesigns(query, designs);
  const [paging, setPaging] = useState({ key: "", n: PAGE });
  const shown = paging.key === search ? paging.n : PAGE;
  const active = KEYS.flatMap((k) => {
    const v = query[k];
    const label = v ? (LISTS[k] as readonly { id: string; label: string }[]).find((x) => x.id === v)?.label : undefined;
    return label ? [{ key: k, label }] : [];
  });

  return (
    <div>
      {active.length ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {active.map((t) => (
            <button key={t.key} type="button" onClick={() => clear(t.key, query)} className="btn inline-flex h-10 items-center gap-1.5 rounded-full bg-violet/10 px-4 text-[14px] font-medium text-violet" aria-label={`Remove filter: ${t.label}`}>
              {t.label}
              <X aria-hidden className="size-3.5" />
            </button>
          ))}
        </div>
      ) : null}

      {results.length ? (
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {results.slice(0, shown).map((d, i) => {
            const p = PATTERN[i % PATTERN.length];
            return <ShowcaseItem key={d.slug} d={d} shape={p.shape} span={p.span} row={p.row} index={i} />;
          })}
        </ul>
      ) : (
        <p className="py-16 text-center text-lg text-ink-2">Nothing here yet.</p>
      )}

      {results.length > shown ? (
        <div className="mt-14 flex justify-center">
          <button type="button" onClick={() => setPaging({ key: search, n: shown + PAGE })} className="btn inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-medium text-ink shadow-[var(--shadow-card)] ring-1 ring-ink/10 hover:ring-ink/25">
            Keep exploring
          </button>
        </div>
      ) : null}
    </div>
  );
}
