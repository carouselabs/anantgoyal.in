"use client";

import clsx from "clsx";
import { MoveHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  before: { src: string; srcSet?: string; alt: string; width: number; height: number };
  after: { src: string; srcSet?: string; alt: string; width: number; height: number };
  className?: string;
  /** Visible height of the comparison window (CSS length). */
  height?: string;
};

/**
 * Drag (or use the arrow keys on) the handle to compare a plain email with
 * the designed one. A real range input carries the value, so it works with a
 * keyboard and screen readers; the picture layers only follow it.
 */
export function BeforeAfter({ before, after, className, height = "560px" }: Props) {
  const [pos, setPos] = useState(50);
  const [kbd, setKbd] = useState(false);
  const hinted = useRef(false);
  // Set as soon as the visitor touches the control: the hint nudge then stops.
  const touched = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  // A one-time nudge the first time it comes into view, so people see it moves.
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || hinted.current) return;
        hinted.current = true;
        io.disconnect();
        const frames = [50, 38, 62, 50];
        let t0: number | null = null;
        const dur = 1600;
        const step = (t: number) => {
          if (t0 === null) t0 = t;
          const p = Math.min(1, (t - t0) / dur);
          const seg = p * (frames.length - 1);
          const i = Math.min(frames.length - 2, Math.floor(seg));
          const k = seg - i;
          const ease = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          if (touched.current) return;
          setPos(frames[i] + (frames[i + 1] - frames[i]) * ease);
          if (p < 1) requestAnimationFrame(step);
        };
        setTimeout(() => requestAnimationFrame(step), 400);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className={clsx("relative select-none overflow-hidden", className)} style={{ height }}>
      {/* after (designed) underneath, full width */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after.src} srcSet={after.srcSet} sizes="(min-width: 1024px) 720px, 92vw" alt={after.alt} width={after.width} height={after.height} loading="lazy" className="absolute inset-x-0 top-0 block w-full" draggable={false} />
      {/* before (plain) on top, clipped from the right */}
      <div className="absolute inset-0 overflow-hidden bg-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.src} srcSet={before.srcSet} sizes="(min-width: 1024px) 720px, 92vw" alt={before.alt} width={before.width} height={before.height} loading="lazy" className="block w-full" draggable={false} />
      </div>

      <span aria-hidden className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-[12px] font-medium text-white backdrop-blur">
        Before
      </span>
      <span aria-hidden className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-ink shadow-sm backdrop-blur">
        After
      </span>

      {/* handle */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_1px_rgba(16,12,51,0.12),0_0_24px_rgba(47,75,255,0.45)]" />
        <div className={clsx("absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(16,12,51,0.45)]", kbd ? "ring-4 ring-blue" : "ring-1 ring-ink/10")}>
          <MoveHorizontal className="size-5" strokeWidth={2} />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        onPointerDown={() => (touched.current = true)}
        onKeyDown={() => (touched.current = true)}
        onFocus={() => {
          touched.current = true;
          setKbd(true);
        }}
        onBlur={() => setKbd(false)}
        aria-label="Compare the plain email with the designed email"
        aria-valuetext={`${Math.round(pos)}% plain email shown`}
        className="compare-range absolute inset-0 h-full w-full opacity-0 focus:opacity-100 focus:outline-[3px] focus:outline-offset-[-3px] focus:outline-blue"
      />
    </div>
  );
}
