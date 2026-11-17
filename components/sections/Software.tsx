import clsx from "clsx";
import { BarChart3, Globe, LayoutDashboard, Mail, PlugZap, Send, Settings, Users, Activity, LineChart } from "lucide-react";
import { softwareCapabilities, softwareFlow } from "@/content/outreach";
import { Orb } from "@/components/three-d/Objects";

// Illustrative numbers for the example dashboard. Not client results.
const KPIS = [
  { label: "Emails sent", value: "48,210", sub: "last 30 days" },
  { label: "Delivered", value: "47,340", sub: "98.2%" },
  { label: "Bounced", value: "530", sub: "1.1%" },
  { label: "Opened", value: "19,880", sub: "tracked opens" },
];
const DAILY = [32, 38, 41, 36, 44, 52, 49, 55, 61, 58, 66, 72, 69, 75, 81, 78, 84, 90, 86, 93];
const CAMPAIGNS = [
  { name: "Spring launch", status: "Sending", tone: "bg-blue/10 text-blue", sent: 64 },
  { name: "Founder outreach", status: "Scheduled", tone: "bg-[#fff4db] text-[#8a5a00]", sent: 0 },
  { name: "Onboarding series", status: "Completed", tone: "bg-go/12 text-[#13723a]", sent: 100 },
];
const DOMAINS = [
  { name: "go.yourbrand.example", ok: true },
  { name: "mail.yourbrand.example", ok: true },
  { name: "hi.yourbrand.example", ok: false },
];
const EVENTS = [
  { what: "Clicked", who: "priya@northfield.example", when: "1 min" },
  { what: "Opened", who: "marcus@brightpath.example", when: "3 min" },
  { what: "Delivered", who: "elena@studio-ro.example", when: "4 min" },
  { what: "Bounced", who: "old@closedco.example", when: "9 min" },
];

function SoftwareDashboard() {
  const max = Math.max(...DAILY);
  const nav = [
    { icon: LayoutDashboard, label: "Overview", on: true },
    { icon: Send, label: "Campaigns" },
    { icon: Users, label: "Contacts" },
    { icon: Globe, label: "Domains" },
    { icon: BarChart3, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];
  return (
    <div role="img" aria-label="Example email platform dashboard with illustrative data: emails sent, delivered, bounced and opened, daily sends, campaigns, sending domains and tracking events" className="overflow-hidden rounded-[28px] bg-white shadow-[0_50px_120px_-40px_rgba(16,6,90,0.75)] ring-1 ring-white/30 lg:grid lg:grid-cols-[200px_1fr]">
      <aside aria-hidden className="hidden flex-col gap-1 border-r border-line bg-mist/60 p-4 lg:flex">
        <div className="mb-4 flex items-center gap-2 px-2 text-[13px] font-semibold text-ink">
          <span className="grid size-7 place-items-center rounded-lg bg-[linear-gradient(150deg,#4766ff,#7b3aee)] text-white">
            <Mail className="size-4" />
          </span>
          Your platform
        </div>
        {nav.map((n) => {
          const Icon = n.icon;
          return (
            <span key={n.label} className={clsx("flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px]", n.on ? "bg-white font-semibold text-ink shadow-sm" : "text-ink-3")}>
              <Icon className="size-4" /> {n.label}
            </span>
          );
        })}
      </aside>

      <div aria-hidden className="min-w-0 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[12px] text-ink-3">Overview · last 30 days</div>
            <div className="text-lg font-semibold tracking-[-0.02em] text-ink">All campaigns</div>
          </div>
          <span className="rounded-full bg-lime px-3 py-1 text-[11.5px] font-semibold text-ink">Illustrative data</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl bg-mist p-3.5 ring-1 ring-ink/5">
              <div className="text-[11.5px] text-ink-3">{k.label}</div>
              <div className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">{k.value}</div>
              <div className="text-[11px] font-medium text-ink-2">{k.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl p-3.5 ring-1 ring-ink/8">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="font-semibold text-ink">Daily sends</span>
              <span className="text-ink-3">delivered · bounced</span>
            </div>
            <div className="mt-3 flex h-28 items-end gap-1">
              {DAILY.map((v, i) => (
                <span key={i} className="bar-grow flex flex-1 flex-col justify-end" style={{ height: `${(v / max) * 100}%`, ["--i" as string]: i }}>
                  <span className="block flex-1 rounded-t-[3px] bg-[linear-gradient(#8ea2ff,#5b47f0)]" />
                  <span className="block h-[3px] bg-[#ff8a65]" />
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-3.5 ring-1 ring-ink/8">
            <div className="text-[11.5px] font-semibold text-ink">Sending domains</div>
            <ul className="mt-2.5 space-y-2">
              {DOMAINS.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="truncate font-mono text-ink-2">{d.name}</span>
                  <span className={clsx("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", d.ok ? "bg-go/12 text-[#13723a]" : "bg-[#fff4db] text-[#8a5a00]")}>{d.ok ? "Healthy" : "Warming"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-2.5 grid gap-2.5 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl p-3.5 ring-1 ring-ink/8">
            <div className="text-[11.5px] font-semibold text-ink">Campaigns</div>
            <ul className="mt-2.5 space-y-2.5">
              {CAMPAIGNS.map((c) => (
                <li key={c.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[12px]">
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className={clsx("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", c.tone)}>{c.status}</span>
                  <span className="col-span-2 block h-1.5 overflow-hidden rounded-full bg-mist">
                    <span className="block h-full rounded-full bg-[linear-gradient(90deg,#2f4bff,#a445f0)]" style={{ width: `${c.sent}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-night p-3.5 text-white">
            <div className="flex items-center gap-1.5 text-[11.5px] font-semibold">
              <Activity className="size-3.5 text-lime" /> Live tracking
            </div>
            <ul className="mt-2.5 space-y-2 text-[10.5px]">
              {EVENTS.map((e) => (
                <li key={e.who} className="flex items-center gap-2">
                  <span className={clsx("size-1.5 shrink-0 rounded-full", e.what === "Bounced" ? "bg-[#ff6b6b]" : e.what === "Clicked" ? "bg-lime" : "bg-go")} />
                  <span className="w-14 shrink-0 font-semibold">{e.what}</span>
                  <span className="min-w-0 truncate text-white/60">{e.who}</span>
                  <span className="ml-auto shrink-0 text-white/40">{e.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const FLOW_ICONS = [PlugZap, Send, Mail, Activity, LineChart];

export function Software() {
  return (
    <section id="software" aria-labelledby="software-h" className="canvas on-dark relative isolate overflow-hidden px-3 py-24 sm:px-4 md:px-6 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-16 top-24 hidden lg:block">
        <div className="drift" style={{ ["--dur" as string]: "15s" }}>
          <Orb variant="pearl" size={150} className="relative" />
        </div>
      </div>
      <Orb variant="violet" size={240} className="-bottom-24 -right-20 hidden opacity-90 sm:block" />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-8 px-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:px-8">
          <h2 id="software-h" className="max-w-[16ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Your own email software. <span className="font-serif font-normal italic tracking-[-0.02em]">Built around your business.</span>
          </h2>
          <div>
            <p className="text-xl font-medium leading-[1.45] text-white">Need your own email sending platform? I can build custom email software around your business requirements.</p>
            <p className="mt-3 text-[16px] leading-[1.6] text-white">Sending, campaigns, tracking and reports in one place, connected to the email provider you choose and shaped around how your team actually works.</p>
          </div>
        </div>

        <div data-reveal className="mt-12">
          <SoftwareDashboard />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[28px] bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-md sm:p-8">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">How it works</h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-5">
              {softwareFlow.map((step, i) => {
                const Icon = FLOW_ICONS[i];
                return (
                  <li key={step} className="relative flex items-center gap-3 sm:flex-col sm:items-start">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-indigo shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]">
                      <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-[14.5px] font-medium leading-[1.35] text-white">
                      <span className="mr-1 font-mono text-[12px] text-lime">0{i + 1}</span> {step}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="flex flex-col rounded-[28px] bg-white p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">What I can build</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {softwareCapabilities.map((c) => (
                <li key={c} className="rounded-full bg-mist px-3 py-1.5 text-[13.5px] font-medium text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
