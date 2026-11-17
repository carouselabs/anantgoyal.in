"use client";

import clsx from "clsx";
import { ArrowLeft, ArrowRight, ExternalLink, Monitor, Smartphone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { emailSrc, previewEmailSrc, projects } from "@/content/projects";
import { EmailFrame } from "@/components/email/EmailFrame";
import { InboxWindow, Phone } from "@/components/email/Frames";

export function ProjectViewer({ index, onClose, onNavigate }: { index: number | null; onClose: () => void; onNavigate: (i: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const open = index !== null;
  const p = open ? projects[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") onNavigate((index! + 1) % projects.length);
      if (e.key === "ArrowLeft") onNavigate((index! - 1 + projects.length) % projects.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, onNavigate]);

  const prev = open ? projects[(index! - 1 + projects.length) % projects.length] : null;
  const next = open ? projects[(index! + 1) % projects.length] : null;

  return (
    <dialog ref={ref} className="viewer" aria-labelledby="viewer-title" onClose={onClose} onCancel={onClose}>
      {p ? (
        <div
          className="flex h-full items-center justify-center p-2 sm:p-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="viewer-panel relative flex h-full max-h-[920px] w-full max-w-[1360px] flex-col overflow-y-auto rounded-[24px] bg-white shadow-2xl sm:rounded-[32px] lg:flex-row lg:overflow-hidden">
            <aside className="flex shrink-0 flex-col border-b border-line p-6 sm:p-8 lg:w-[360px] lg:overflow-y-auto lg:border-b-0 lg:border-r">
              <span className="w-fit rounded-full bg-mist px-3 py-1 text-[12px] font-medium text-ink-2">{p.category}</span>
              <h2 id="viewer-title" className="mt-4 pr-12 text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink lg:pr-0">
                {p.name}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">{p.description}</p>

              <dl className="mt-6 space-y-3 rounded-2xl bg-mist p-4 text-[13px]">
                <div>
                  <dt className="text-ink-3">From</dt>
                  <dd className="font-medium text-ink">{p.from}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">Subject line</dt>
                  <dd className="font-medium text-ink">{p.subject}</dd>
                </div>
                <div>
                  <dt className="text-ink-3">Preview text</dt>
                  <dd className="text-ink-2">{p.preheader}</dd>
                </div>
              </dl>

              <h3 className="mt-6 text-[13px] font-medium text-ink-3">Inside this email</h3>
              <ul className="mt-2 space-y-1.5 text-[14px] text-ink">
                {p.modules.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet" />
                    {m}
                  </li>
                ))}
              </ul>

              <a href={emailSrc(p.slug)} target="_blank" rel="noopener" className="btn mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full border border-ink/15 px-5 text-[14px] font-medium text-ink hover:border-ink/30">
                Open the email in a new tab
                <ExternalLink aria-hidden className="btn-arrow size-4" />
              </a>

              <div className="mt-auto flex gap-2 pt-8">
                <button type="button" onClick={() => onNavigate(projects.indexOf(prev!))} className="btn flex h-11 flex-1 items-center gap-2 rounded-full bg-mist px-4 text-left text-[13px] font-medium text-ink hover:bg-line" aria-label={`Previous project: ${prev!.name}`}>
                  <ArrowLeft aria-hidden className="size-4 shrink-0" />
                  <span className="truncate">{prev!.from}</span>
                </button>
                <button type="button" onClick={() => onNavigate(projects.indexOf(next!))} className="btn flex h-11 flex-1 items-center justify-end gap-2 rounded-full bg-mist px-4 text-right text-[13px] font-medium text-ink hover:bg-line" aria-label={`Next project: ${next!.name}`}>
                  <span className="truncate">{next!.from}</span>
                  <ArrowRight aria-hidden className="size-4 shrink-0" />
                </button>
              </div>
            </aside>

            <div className="relative flex min-h-[78vh] flex-1 flex-col bg-[linear-gradient(150deg,#eef1ff,#f3ecff)] lg:min-h-0">
              <div className="flex items-center justify-center gap-2 p-4 xl:hidden">
                <div role="group" aria-label="Preview size" className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-ink/5">
                  {(["desktop", "mobile"] as const).map((v) => {
                    const Icon = v === "desktop" ? Monitor : Smartphone;
                    return (
                      <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={clsx("btn flex h-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium", view === v ? "bg-ink text-white" : "text-ink-2 hover:text-ink")}>
                        <Icon aria-hidden className="size-4" />
                        {v === "desktop" ? "Desktop" : "Mobile"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex min-h-0 flex-1 items-stretch justify-center gap-6 px-3 pb-4 sm:px-6 xl:p-8 xl:pt-20">
                <div className={clsx("min-h-[60vh] min-w-0 flex-1 xl:block xl:min-h-0", view === "desktop" ? "block" : "hidden")}>
                  <InboxWindow from={p.from} subject={p.subject} className="flex h-full flex-col shadow-[var(--shadow-float)] [&>div:last-child]:flex-1">
                    <EmailFrame src={previewEmailSrc(p.slug)} title={`${p.name}, desktop version`} width={680} className="h-full min-h-[56vh] xl:min-h-0" />
                  </InboxWindow>
                </div>
                <div className={clsx("shrink-0 items-center xl:flex", view === "mobile" ? "flex justify-center" : "hidden")}>
                  <Phone className="aspect-[375/780] h-[min(72vh,700px)] xl:h-full xl:max-h-[760px]">
                    <EmailFrame src={previewEmailSrc(p.slug)} title={`${p.name}, mobile version`} width={375} className="h-full pt-7" />
                  </Phone>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="btn absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-ink text-white shadow-lg sm:right-5 sm:top-5"
              aria-label="Close project"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
