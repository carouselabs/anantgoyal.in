"use client";

import clsx from "clsx";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import type { Design } from "@/projects/types";
import { emailSrc, previewEmailSrc } from "@/content/projects";
import { EmailFrame } from "@/components/email/EmailFrame";
import { InboxWindow, Phone } from "@/components/email/Frames";

type View = "both" | "desktop" | "mobile";

/** The real HTML email, live and scrollable, with desktop / mobile / both controls. */
export function LiveEmail({ design: d }: { design: Design }) {
  const [view, setView] = useState<View>("both");
  const options: { id: View; label: string; icon?: React.ReactNode }[] = [
    { id: "both", label: "Both" },
    { id: "desktop", label: "Desktop", icon: <Monitor aria-hidden className="size-4" /> },
    { id: "mobile", label: "Mobile", icon: <Smartphone aria-hidden className="size-4" /> },
  ];
  const src = previewEmailSrc(d.slug);
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Preview size" className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-ink/5">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={view === o.id}
              onClick={() => setView(o.id)}
              className={clsx("btn flex h-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium", view === o.id ? "bg-ink text-white" : "text-ink-2 hover:text-ink", o.id === "both" && "hidden lg:flex")}
            >
              {o.icon}
              {o.label}
            </button>
          ))}
        </div>
        <a href={emailSrc(d.slug)} target="_blank" rel="noopener" className="btn inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-medium text-ink shadow-sm ring-1 ring-ink/5">
          Open the HTML
          <ExternalLink aria-hidden className="size-4" />
        </a>
      </div>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-center">
        <InboxWindow
          from={d.from}
          subject={d.subject}
          className={clsx("w-full flex-col shadow-[var(--shadow-float)] lg:max-w-[760px] lg:flex-1 [&>div:last-child]:flex-1", view === "mobile" ? "hidden" : view === "both" ? "flex max-lg:flex" : "flex")}
        >
          <EmailFrame src={src} title={`${d.title}, desktop version`} width={680} className="h-[min(72vh,680px)]" />
        </InboxWindow>
        <Phone className={clsx("aspect-[375/780] h-[min(72vh,680px)] shrink-0", view === "desktop" ? "hidden" : view === "both" ? "hidden lg:block" : "block")}>
          <EmailFrame src={src} title={`${d.title}, mobile version`} width={375} className="h-full pt-7" />
        </Phone>
      </div>
    </div>
  );
}
