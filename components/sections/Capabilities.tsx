import clsx from "clsx";
import { ArrowRight, Globe, Inbox, Send, ShieldCheck } from "lucide-react";
import { capabilityAreas } from "@/content/outreach";
import { previewSrc, previewSrcSet } from "@/content/projects";
import { InboxWindow, Phone } from "@/components/email/Frames";
import { AuthChecks, SendBars } from "@/components/outreach/Parts";
import { Orb } from "@/components/three-d/Objects";

function DesignArt() {
  return (
    <div aria-hidden className="relative h-full">
      <div className="absolute left-6 top-6 w-[70%]">
        <InboxWindow from="Brookfold" subject="The winter edit" className="shadow-[var(--shadow-float)]">
          <div className="h-[190px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc("brookfold-winter-edit", "desktop")} srcSet={previewSrcSet("brookfold-winter-edit", "desktop")} sizes="380px" alt="" width={1020} height={3060} loading="lazy" className="peek-img block w-full" />
          </div>
        </InboxWindow>
      </div>
      <div className="float absolute bottom-[-24%] right-6 w-[24%] max-w-[110px]" style={{ ["--dur" as string]: "8s" }}>
        <Phone className="aspect-[9/19]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc("morrow-welcome", "mobile")} srcSet={previewSrcSet("morrow-welcome", "mobile")} sizes="110px" alt="" width={750} height={4318} loading="lazy" className="block w-full" />
        </Phone>
      </div>
      <Orb variant="iris" size={46} className="right-[30%] top-3" />
    </div>
  );
}

function BuildArt() {
  return (
    <div aria-hidden className="relative h-full p-6">
      <div className="rounded-2xl bg-white p-4 shadow-[var(--shadow-float)]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-ink">Campaigns · last 14 days</span>
          <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold text-ink-3">Illustrative</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10.5px]">
          {[
            ["Sent", "12,480"],
            ["Delivered", "98.2%"],
            ["Bounced", "1.1%"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-mist px-2.5 py-2">
              <div className="text-ink-3">{k}</div>
              <div className="text-[14px] font-semibold text-ink">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-16">
          <SendBars />
        </div>
      </div>
      <div className="float absolute -bottom-2 right-8 w-[46%] rounded-xl bg-night p-3 text-[10.5px] text-white shadow-[0_20px_40px_-18px_rgba(10,0,60,0.8)]" style={{ ["--dur" as string]: "9s", ["--delay" as string]: "-3s" }}>
        <div className="text-white/55">Tracking</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-go" /> Opened · 2 min ago
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-lime" /> Clicked · 6 min ago
        </div>
      </div>
    </div>
  );
}

function PrepareArt() {
  return (
    <div aria-hidden className="relative h-full p-6">
      <div className="rounded-2xl bg-white p-4 shadow-[var(--shadow-float)]">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-ink">
          <ShieldCheck className="size-4 text-go" /> go.yourbrand.example
        </div>
        <div className="mt-3">
          <AuthChecks compact />
        </div>
      </div>
      <div className="float absolute bottom-5 right-6 w-[58%] rounded-2xl bg-night p-3.5 text-white shadow-[0_24px_40px_-20px_rgba(10,0,60,0.8)]" style={{ ["--dur" as string]: "10s" }}>
        <div className="flex justify-between text-[10.5px]">
          <span className="text-white/60">Warm-up</span>
          <span className="font-semibold">Day 12 of 21</span>
        </div>
        <div className="mt-2 h-10">
          <SendBars dark />
        </div>
      </div>
    </div>
  );
}

function ReachArt() {
  const steps = [
    { icon: Send, label: "Campaign" },
    { icon: Globe, label: "3 domains" },
    { icon: Inbox, label: "Delivered" },
  ];
  return (
    <div aria-hidden className="relative flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex items-center justify-between rounded-2xl bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur-sm">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <span className={clsx("grid size-11 place-items-center rounded-xl text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.6)]", i === 2 ? "bg-go" : "bg-white/20")}>
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <span className="text-[10.5px] font-medium text-white/85">{s.label}</span>
              </div>
              {i < steps.length - 1 ? (
                <span className="relative mb-5 block h-0.5 w-10 bg-white/25 sm:w-16">
                  <span className="packet-x absolute inset-y-0 left-0 block w-full" style={{ ["--delay" as string]: `${i * 0.4}s` }}>
                    <span className="absolute -top-[4px] left-0 block size-2.5 rounded-full bg-lime" />
                  </span>
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 text-[10.5px] text-white">
        {[
          ["Recipients", "Verified"],
          ["Volume", "Steady"],
          ["Replies", "Tracked"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/15">
            <div className="text-white/60">{k}</div>
            <div className="text-[13px] font-semibold">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ART = [DesignArt, BuildArt, PrepareArt, ReachArt];
const STAGE = [
  "bg-[linear-gradient(150deg,#e9ecff,#f3e9ff)]",
  "bg-[linear-gradient(150deg,#eef0f6,#e4e9ff)]",
  "bg-[linear-gradient(150deg,#e7f6ef,#e9ecff)]",
  "canvas",
];

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-h" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 md:py-32">
      <Orb variant="violet" size={180} className="-right-24 top-10 hidden opacity-90 lg:block" />
      <div className="relative mx-auto max-w-[1400px] lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="capabilities-h" className="max-w-[17ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Not just beautiful emails. <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">Everything behind them.</span>
          </h2>
          <p className="max-w-[28rem] text-lg leading-[1.6] text-ink-2">
            From designing the perfect email to building the software and infrastructure that sends it, I work across the complete email ecosystem.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {capabilityAreas.map((a, i) => {
            const Art = ART[i];
            const onCanvas = i === 3;
            return (
              <li key={a.verb} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}>
                <a href={a.href} className="peek-host lift group flex h-full flex-col overflow-hidden rounded-[28px] bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
                  <div className={clsx("relative h-[300px] overflow-hidden rounded-[20px]", STAGE[i])}>
                    <Art />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-[30px] italic leading-none text-violet">0{i + 1}</span>
                      <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-3">{a.verb}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">{a.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-[1.55] text-ink-2">{a.copy}</p>
                    <span className={clsx("mt-5 inline-flex items-center gap-2 text-[15px] font-medium", onCanvas ? "text-indigo" : "text-ink")}>
                      <span className="link-draw">{a.cta}</span>
                      <ArrowRight aria-hidden className="btn-arrow size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
