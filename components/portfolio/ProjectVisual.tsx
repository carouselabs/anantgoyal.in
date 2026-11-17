import clsx from "clsx";
import type { Design } from "@/projects/types";
import { previewSrc, previewSrcSet } from "@/content/projects";
import { InboxWindow, Phone } from "@/components/email/Frames";

/**
 * A design's picture for cards: its desktop email in an inbox window with the
 * phone version beside it, or its own image when it has one.
 */
export function ProjectVisual({ design: d, priority }: { design: Design; priority?: boolean }) {
  const t = d.thumbnail;
  if (t?.kind === "image") {
    return (
      <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_30px_60px_-30px_rgba(10,0,60,0.55)] ring-1 ring-black/6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.src} srcSet={t.small ? `${t.small} 720w, ${t.src} ${t.width}w` : undefined} sizes="(min-width: 1024px) 420px, 92vw" alt={t.alt} width={t.width} height={t.height} loading={priority ? "eager" : "lazy"} className="block h-auto w-full" />
      </div>
    );
  }
  const slug = t?.kind === "email" ? t.slug : d.slug;
  const dark = d.aesthetics.includes("dark") || d.aesthetics.includes("cinematic");
  return (
    <div className="relative h-full">
      <div className="w-[74%]">
        <InboxWindow from={d.from} subject={d.subject} tone={dark ? "dark" : "light"} className="shadow-[0_30px_60px_-28px_rgba(10,0,60,0.6)]">
          <div className={clsx("h-[260px] overflow-hidden", dark ? "bg-night" : "bg-white")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc(slug, "desktop")} srcSet={previewSrcSet(slug, "desktop")} sizes="420px" alt={`${d.title}, desktop version`} width={1020} height={2600} loading={priority ? "eager" : "lazy"} className="block w-full" />
          </div>
        </InboxWindow>
      </div>
      <div className="absolute right-0 top-[96px] w-[24%] max-w-[130px]">
        <Phone className="aspect-[9/19]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc(slug, "mobile")} srcSet={previewSrcSet(slug, "mobile")} sizes="130px" alt={`${d.title}, mobile version`} width={750} height={4600} loading="lazy" className="block w-full" />
        </Phone>
      </div>
    </div>
  );
}
