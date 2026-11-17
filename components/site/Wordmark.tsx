import clsx from "clsx";
import { site } from "@/content/site";

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "white" }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.avatar}
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-full shadow-[0_6px_14px_-6px_rgba(40,20,140,0.6)] ring-2 ring-white"
      />
      <span className={clsx("text-[17px] font-semibold tracking-[-0.02em]", tone === "white" ? "text-white" : "text-ink")}>{site.name}</span>
    </span>
  );
}
