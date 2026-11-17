import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Design } from "@/projects/types";
import { aestheticLabel, collectionLabel, designHref } from "@/projects";
import { ProjectVisual } from "./ProjectVisual";

/** One design as a card (used for "More like this"). */
export function ProjectCard({ project: d, priority }: { project: Design; priority?: boolean }) {
  return (
    <Link href={designHref(d.slug)} className="peek-host lift group flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
      <div className="relative h-[300px] overflow-hidden rounded-[20px] bg-[linear-gradient(150deg,#e7ebff,#f1e8ff)] px-6 pt-7 sm:px-8 sm:pt-8">
        <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5">
          <ProjectVisual design={d} priority={priority} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <span className="text-[13px] font-medium text-violet">{collectionLabel(d.collection)}</span>
        <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-ink">{d.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[15px] leading-[1.55] text-ink-2">{d.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {d.aesthetics.slice(0, 3).map((a) => (
            <li key={a} className="rounded-full bg-mist px-2.5 py-0.5 text-[12px] font-medium text-ink-2">
              {aestheticLabel(a)}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink">
          <span className="link-draw">View design</span>
          <ArrowUpRight aria-hidden className="btn-arrow size-4" />
        </span>
      </div>
    </Link>
  );
}
