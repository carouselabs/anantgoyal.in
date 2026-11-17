"use client";

import clsx from "clsx";
import { useState } from "react";
import type { EmailGroup, EmailType } from "@/content/services";
import { previewSrc, previewSrcSet } from "@/content/projects";
import { Orb } from "@/components/three-d/Objects";
import { MockBody } from "./EmailMocks";

const STAGE = {
  canvas: "canvas",
  lavender: "bg-[linear-gradient(150deg,#e9ecff,#f3e9ff)]",
  night: "night",
  mist: "bg-[linear-gradient(150deg,#eef0fb,#e3e9ff)]",
};

/** A small email: sender row, subject, then a real preview or a coded body. */
function MiniEmail({ t }: { t: EmailType }) {
  return (
    <div className="flex h-[264px] w-[208px] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_30px_50px_-24px_rgba(10,0,60,0.6)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(150deg,#4766ff,#a445f0)] text-[9px] font-bold text-white">{t.from.replace(/^The /, "").charAt(0)}</span>
        <div className="min-w-0 leading-[1.2]">
          <div className="truncate text-[10px] font-semibold text-ink">{t.from}</div>
          <div className="truncate text-[9px] text-ink-3">{t.subject}</div>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        {t.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewSrc(t.preview, "mobile")} srcSet={previewSrcSet(t.preview, "mobile")} sizes="208px" alt="" width={750} height={4500} loading="lazy" className="block w-full" />
        ) : t.mock ? (
          <MockBody id={t.mock} />
        ) : null}
      </div>
    </div>
  );
}

export function GroupPanel({ group, index }: { group: EmailGroup; index: number }) {
  const [active, setActive] = useState(0);
  const dark = group.tone === "night" || group.tone === "canvas";

  return (
    <article data-reveal style={{ ["--reveal-delay" as string]: `${(index % 2) * 90}ms` }} className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
      {/* stage: the active type in front, the others fanned behind */}
      <div aria-hidden className={clsx("relative h-[312px] overflow-hidden rounded-[20px]", STAGE[group.tone])}>
        {dark ? <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1.2px)] [background-size:22px_22px]" /> : null}
        <Orb variant={group.tone === "night" ? "violet" : group.tone === "canvas" ? "pearl" : "iris"} size={64} className="right-5 top-5" />
        <Orb variant="blue" size={34} className="bottom-6 left-6" />
        {group.types.map((t, i) => {
          const rel = i - active;
          const far = Math.abs(rel) > 2;
          return (
            <div
              key={t.title}
              className="absolute left-1/2 top-6 transition-[transform,opacity,filter] duration-500 ease-[var(--ease-out-soft)] motion-reduce:transition-none"
              style={{
                transform: `translateX(calc(-50% + ${rel * 62}%)) scale(${rel === 0 ? 1 : 0.84})`,
                opacity: far ? 0 : 1,
                filter: rel === 0 ? "none" : "brightness(0.96) saturate(0.9)",
                zIndex: 10 - Math.abs(rel),
              }}
            >
              <MiniEmail t={t} />
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
        <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-violet">{group.label}</span>
        <h3 className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-ink">{group.title}</h3>
        <p className="mt-1.5 text-[15.5px] leading-[1.55] text-ink-2">{group.copy}</p>

        <ul className="mt-5 divide-y divide-line border-y border-line">
          {group.types.map((t, i) => {
            const on = i === active;
            return (
              <li key={t.title}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group/type flex w-full items-start gap-3 py-3 text-left"
                >
                  <span className={clsx("mt-[7px] size-2 shrink-0 rounded-full transition-colors", on ? "bg-violet" : "bg-ink/20 group-hover/type:bg-ink/40")} />
                  <span className="min-w-0 flex-1">
                    <span className={clsx("block text-[16px] font-semibold tracking-[-0.01em] transition-colors", on ? "text-ink" : "text-ink-2")}>{t.title}</span>
                    <span className={clsx("grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-soft)]", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="block pt-1 text-[14.5px] leading-[1.55] text-ink-2">{t.copy}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
