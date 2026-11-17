"use client";

import clsx from "clsx";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { emailSrc, previewEmailSrc, projects } from "@/content/projects";
import { EmailFrame } from "@/components/email/EmailFrame";
import { Phone } from "@/components/email/Frames";
import { Orb, Torus } from "@/components/three-d/Objects";

type Device = "desktop" | "mobile";
type Version = "after" | "before";

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string; icon?: React.ReactNode }[]; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-mist p-1 ring-1 ring-ink/5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx("btn flex h-11 items-center gap-2 rounded-full px-3.5 text-[14px] font-medium sm:px-4", value === o.value ? "bg-white text-ink shadow-[0_4px_12px_-6px_rgba(16,12,51,0.35)]" : "text-ink-3 hover:text-ink")}
        >
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Studio() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<Device>("desktop");
  const [version, setVersion] = useState<Version>("after");
  const p = projects[active];
  const src = emailSrc(p.slug, version === "before");
  const preview = previewEmailSrc(p.slug, version === "before");
  const frameTitle = `${p.name}, ${version === "before" ? "plain version" : "designed version"}, ${device} view`;

  return (
    <section id="studio" aria-labelledby="studio-h" className="canvas relative isolate overflow-hidden px-3 py-24 sm:px-4 md:px-6 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-10 hidden lg:block">
        <div className="drift" style={{ ["--dur" as string]: "16s" }}>
          <Orb variant="pearl" size={170} className="relative" />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute -right-10 bottom-16 hidden lg:block">
        <Torus size={240} className="relative" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 px-2 md:flex-row md:items-end lg:px-8">
          <h2 id="studio-h" className="max-w-[15ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Try the email studio
          </h2>
          <p className="max-w-[30rem] text-lg leading-[1.6] text-white">
            Pick a campaign, switch between desktop and phone, and scroll the full email. Press Before to see the same message as a plain email.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] bg-white shadow-[0_40px_120px_-40px_rgba(16,6,90,0.7)] sm:rounded-[36px] lg:grid lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* inbox */}
          <div className="min-w-0 border-b border-line lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between px-5 pb-2 pt-5 sm:px-6">
              <p className="text-[15px] font-semibold text-ink">Inbox</p>
              <span className="text-[12px] text-ink-3">{projects.length} campaigns</span>
            </div>
            <ul className="grid grid-cols-1 gap-1 p-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Campaigns">
              {projects.map((proj, i) => (
                <li key={proj.slug}>
                  <button
                    type="button"
                    aria-pressed={active === i}
                    onClick={() => setActive(i)}
                    className={clsx("flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors", active === i ? "bg-mist ring-1 ring-ink/5" : "hover:bg-mist/60")}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full text-[14px] font-semibold" style={{ background: proj.tint.b, color: proj.tint.ink === "#f2f3fa" ? "#fff" : proj.tint.ink }}>
                      {proj.from.replace(/^The /, "").charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className={clsx("truncate text-[14px] text-ink", active === i ? "font-semibold" : "font-medium")}>{proj.from}</span>
                        <span className="shrink-0 text-[11px] text-ink-3">{proj.time}</span>
                      </span>
                      <span className="block truncate text-[13px] text-ink">{proj.subject}</span>
                      <span className="block truncate text-[12px] text-ink-3">{proj.preheader}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* reading pane */}
          <div className="flex min-w-0 flex-col">
            <div className="flex flex-col gap-4 border-b border-line p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <p className="text-[13px] text-ink-3">
                  {p.from} · {p.category}
                </p>
                <p className="mt-0.5 truncate text-lg font-semibold tracking-[-0.02em] text-ink" aria-live="polite">
                  {p.subject}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Segmented
                  label="Screen size"
                  value={device}
                  onChange={setDevice}
                  options={[
                    { value: "desktop", label: "Desktop", icon: <Monitor aria-hidden className="size-4" /> },
                    { value: "mobile", label: "Mobile", icon: <Smartphone aria-hidden className="size-4" /> },
                  ]}
                />
                <Segmented
                  label="Version"
                  value={version}
                  onChange={setVersion}
                  options={[
                    { value: "after", label: "Designed" },
                    { value: "before", label: "Before" },
                  ]}
                />
                <a href={src} target="_blank" rel="noopener" aria-label="Open this email in a new tab" className="btn grid size-11 place-items-center rounded-full text-ink-2 ring-1 ring-ink/10 hover:text-ink hover:ring-ink/25">
                  <ExternalLink aria-hidden className="size-4" />
                </a>
              </div>
            </div>

            <div className="relative flex h-[min(78vh,640px)] items-stretch justify-center bg-[linear-gradient(150deg,#eef1ff,#f3ecff)] p-3 sm:p-6">
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(75,48,238,0.14)_1px,transparent_1.2px)] [background-size:22px_22px]" />
              {device === "desktop" ? (
                <div className="relative h-full w-full max-w-[680px] overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-float)] ring-1 ring-ink/5">
                  <EmailFrame src={preview} title={frameTitle} width={680} className="h-full" />
                </div>
              ) : (
                <Phone className="relative aspect-[375/780] h-full">
                  <EmailFrame src={preview} title={frameTitle} width={375} className="h-full pt-7" />
                </Phone>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
