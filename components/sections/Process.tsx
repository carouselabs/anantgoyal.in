"use client";

import clsx from "clsx";
import { Check, FileCode2, FolderClosed, Globe, ListChecks, PenLine, Send, TrendingUp } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CLIENTS } from "@/content/clients";
import { processTracks } from "@/content/outreach";
import { AuthChecks, SendBars } from "@/components/outreach/Parts";

function Artefact({ children }: { children: ReactNode }) {
  return <div aria-hidden className="flex h-[112px] items-center justify-center overflow-hidden rounded-2xl bg-mist p-3 ring-1 ring-ink/5">{children}</div>;
}

const STEPS: { title: string; copy: string; art: ReactNode }[] = [
  {
    title: "Understand your goals",
    copy: "A short call or a written brief: who the email is for, what it should do and what it must include.",
    art: (
      <div className="w-full max-w-[170px] rounded-xl bg-white p-3 text-[10.5px] leading-[1.45] text-ink-2 shadow-[0_8px_18px_-12px_rgba(16,12,51,0.5)]">
        <div className="font-semibold text-ink">Brief</div>
        <div className="mt-1 flex gap-1.5"><span className="text-ink-3">For</span> new trial users</div>
        <div className="flex gap-1.5"><span className="text-ink-3">Goal</span> first project set up</div>
        <div className="flex gap-1.5"><span className="text-ink-3">Send</span> day 1 after sign-up</div>
      </div>
    ),
  },
  {
    title: "Explore the visual direction",
    copy: "Two or three directions built from your brand: colours, type, imagery and tone. You choose one.",
    art: (
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {["#2f4bff", "#7b3aee", "#d4ff5c", "#100c33"].map((c) => (
            <span key={c} className="size-8 rounded-full ring-2 ring-white" style={{ background: c }} />
          ))}
        </div>
        <span className="font-serif text-4xl italic text-ink">Aa</span>
      </div>
    ),
  },
  {
    title: "Design the email",
    copy: "The full email at desktop and phone size, with your real copy, ready for your comments.",
    art: (
      <div className="flex items-end gap-2">
        <div className="w-[92px] space-y-1.5 rounded-lg bg-white p-2 shadow-[0_8px_18px_-12px_rgba(16,12,51,0.5)]">
          <span className="block h-7 rounded bg-[linear-gradient(120deg,#c9d2ff,#e7d6ff)]" />
          <span className="block h-1.5 w-3/4 rounded-full bg-ink/60" />
          <span className="block h-1.5 w-1/2 rounded-full bg-ink/15" />
          <span className="block h-3 w-8 rounded-full bg-blue" />
        </div>
        <div className="w-[40px] space-y-1 rounded-md bg-white p-1.5 shadow-[0_8px_18px_-12px_rgba(16,12,51,0.5)]">
          <span className="block h-4 rounded-sm bg-[linear-gradient(120deg,#c9d2ff,#e7d6ff)]" />
          <span className="block h-1 rounded-full bg-ink/50" />
          <span className="block h-1 w-2/3 rounded-full bg-ink/15" />
          <span className="block h-2 w-5 rounded-full bg-blue" />
        </div>
      </div>
    ),
  },
  {
    title: "Develop responsive HTML",
    copy: "Hand-coded, table-based HTML with inline styles and fallbacks for Outlook on Windows.",
    art: (
      <pre className="w-full overflow-hidden rounded-xl bg-night p-3 font-mono text-[10px] leading-[1.6] text-white/75">
        <span className="text-[#ff9be0]">{"<table"}</span> <span className="text-[#9fb5ff]">role</span>=<span className="text-lime">{'"presentation"'}</span>
        {"\n"}
        <span className="text-white/40">{"<!--[if mso]>"}</span>
        {"\n"}
        <span className="text-[#ff9be0]">{"<v:roundrect"}</span> <span className="text-white/50">…</span>
      </pre>
    ),
  },
  {
    title: "Test across email clients",
    copy: "Checked in Gmail, Outlook, Apple Mail and Yahoo Mail, on desktop and phone, before you see the final.",
    art: (
      <ul className="grid w-full max-w-[180px] grid-cols-2 gap-1.5">
        {CLIENTS.map((c) => (
          <li key={c.name} className="flex h-9 items-center justify-between rounded-lg bg-white px-2 shadow-[0_6px_14px_-10px_rgba(16,12,51,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt="" width={c.w} height={c.h} loading="lazy" className="h-3.5 w-auto max-w-[44px]" />
            <span className="grid size-4 place-items-center rounded-full bg-go text-white">
              <Check className="size-2.5" strokeWidth={3.5} />
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Deliver the final email",
    copy: "Clean HTML and images, ready for Mailchimp, Klaviyo, HubSpot or the platform you already use.",
    art: (
      <div className="flex w-full max-w-[170px] flex-col gap-1.5 text-[11px] font-medium text-ink">
        <span className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_6px_14px_-10px_rgba(16,12,51,0.5)]">
          <FileCode2 className="size-4 text-violet" /> campaign.html
        </span>
        <span className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_6px_14px_-10px_rgba(16,12,51,0.5)]">
          <FolderClosed className="size-4 text-blue" /> images
        </span>
      </div>
    ),
  },
];

const card = "w-full max-w-[180px] rounded-xl bg-white p-3 text-[10.5px] leading-[1.45] text-ink-2 shadow-[0_8px_18px_-12px_rgba(16,12,51,0.5)]";

const OUTREACH_ART: ReactNode[] = [
  <div key="goal" className={card}>
    <div className="flex items-center gap-1.5 font-semibold text-ink">
      <PenLine className="size-3.5 text-violet" /> Campaign goal
    </div>
    <div className="mt-1 flex gap-1.5"><span className="text-ink-3">Who</span> SaaS founders</div>
    <div className="flex gap-1.5"><span className="text-ink-3">Offer</span> a free email audit</div>
    <div className="flex gap-1.5"><span className="text-ink-3">Win</span> a call booked</div>
  </div>,
  <div key="domains" className={card}>
    <div className="flex items-center gap-1.5 font-semibold text-ink">
      <Globe className="size-3.5 text-blue" /> Sending domains
    </div>
    <div className="mt-1.5 space-y-1 font-mono text-[9.5px]">
      <div>go.yourbrand.example</div>
      <div>hello.yourbrand.example</div>
    </div>
  </div>,
  <div key="auth" className="w-full max-w-[190px]">
    <AuthChecks compact />
  </div>,
  <div key="lists" className={card}>
    <div className="flex items-center gap-1.5 font-semibold text-ink">
      <ListChecks className="size-3.5 text-go" /> List check
    </div>
    <div className="mt-1.5 flex justify-between"><span>Verified</span><b className="text-[#13723a]">1,240</b></div>
    <div className="flex justify-between"><span>Risky, removed</span><b className="text-[#a1271b]">38</b></div>
  </div>,
  <div key="launch" className="flex h-full w-full max-w-[180px] flex-col justify-end">
    <div className="mb-1 flex items-center gap-1.5 text-[10.5px] font-semibold text-ink">
      <Send className="size-3.5 text-violet" /> Daily volume, rising
    </div>
    <div className="h-14">
      <SendBars />
    </div>
  </div>,
  <div key="monitor" className={card}>
    <div className="flex items-center gap-1.5 font-semibold text-ink">
      <TrendingUp className="size-3.5 text-blue" /> This week
    </div>
    <div className="mt-1.5 flex justify-between"><span>Delivered</span><b className="text-ink">98.2%</b></div>
    <div className="flex justify-between"><span>Bounced</span><b className="text-ink">1.1%</b></div>
  </div>,
];

const TRACKS = {
  design: { label: "Email design", steps: processTracks.design.map((s, i) => ({ ...s, art: STEPS[i].art })) },
  outreach: { label: "Email outreach", steps: processTracks.outreach.map((s, i) => ({ ...s, art: OUTREACH_ART[i] })) },
};
type Track = keyof typeof TRACKS;
const ORDER: Track[] = ["design", "outreach"];

export function Process() {
  const [track, setTrack] = useState<Track>("design");
  const tabs = useRef<Record<Track, HTMLButtonElement | null>>({ design: null, outreach: null });
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = ORDER[(ORDER.indexOf(track) + 1) % ORDER.length];
    setTrack(next);
    tabs.current[next]?.focus();
  };
  const steps = TRACKS[track].steps;

  return (
    <section id="process" aria-labelledby="process-h" className="relative flex flex-col justify-center overflow-hidden bg-mist px-4 py-24 sm:px-6 md:py-32 lg:min-h-svh">
      <div className="mx-auto w-full max-w-[1400px] lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="process-h" className="max-w-[18ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            From the first idea to the <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">final send.</span>
          </h2>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-[26rem] text-lg leading-[1.6] text-ink-2 md:text-right">Six steps for each kind of work, the same for a single email or a full programme.</p>
            <div role="tablist" aria-label="Process" onKeyDown={onKey} className="flex w-fit rounded-full bg-white p-1 shadow-sm ring-1 ring-ink/5">
              {ORDER.map((t) => (
                <button
                  key={t}
                  ref={(el) => {
                    tabs.current[t] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`process-tab-${t}`}
                  aria-selected={track === t}
                  aria-controls="process-panel"
                  tabIndex={track === t ? 0 : -1}
                  onClick={() => setTrack(t)}
                  className={clsx("btn h-11 rounded-full px-5 text-[14.5px] font-medium", track === t ? "bg-ink text-white" : "text-ink-2 hover:text-ink")}
                >
                  {TRACKS[t].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${track}`} data-reveal className="relative mt-14">
          {/* the line joining the steps (large screens) */}
          <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-[14px] hidden xl:block">
            <div className="h-0.5 w-full rounded-full bg-[#d6d1f3]" />
            <div className="draw-line absolute inset-x-0 top-0 h-0.5 rounded-full bg-[linear-gradient(90deg,#2f4bff,#a445f0)]" />
            <span className="pulse-travel absolute -top-[5px] left-0 block w-full">
              <span className="-ml-1.5 block size-3 rounded-full bg-violet shadow-[0_0_0_6px_rgba(123,58,238,0.18)]" />
            </span>
          </div>
          {/* vertical line on small screens */}
          <div aria-hidden className="absolute bottom-6 left-[14px] top-4 w-0.5 bg-[linear-gradient(#2f4bff,#a445f0)] opacity-40 md:hidden" />

          <ol key={track} className="process-swap grid gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-6">
            {steps.map((s, i) => (
              <li key={s.title} className="relative pl-12 md:pl-0" style={{ ["--i" as string]: i }}>
                <span className="absolute left-0 top-0 grid size-[30px] place-items-center rounded-full bg-ink font-mono text-[12px] font-medium text-white ring-4 ring-mist md:relative xl:mx-auto">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:mt-5">
                  <Artefact>{s.art}</Artefact>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.55] text-ink-2">{s.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
