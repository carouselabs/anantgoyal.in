import clsx from "clsx";
import { Check, Globe, Inbox, MailCheck, RotateCcw, Send, ShieldCheck } from "lucide-react";
import { CLIENTS } from "@/content/clients";
import { exampleDashboard as D } from "@/content/outreach";
import { Orb } from "@/components/three-d/Objects";

const tone = {
  go: "bg-go/12 text-[#13723a]",
  warn: "bg-[#fff4db] text-[#8a5a00]",
  bad: "bg-[#fdecea] text-[#a1271b]",
};

/** SPF / DKIM / DMARC with a pass mark each. */
export function AuthChecks({ compact, dark }: { compact?: boolean; dark?: boolean }) {
  return (
    <ul className={clsx("grid gap-1.5", compact ? "grid-cols-3" : "grid-cols-1")}>
      {D.auth.map((a) => (
        <li key={a.name} className={clsx("flex items-center rounded-lg", compact ? "justify-center gap-1 px-1 py-1.5" : "gap-2 px-3 py-2", dark ? "bg-white/6" : "bg-mist")}>
          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-go text-white">
            <Check aria-hidden className="size-2.5" strokeWidth={3.5} />
          </span>
          <span className={clsx("font-semibold", compact ? "text-[11px]" : "text-[12px]", dark ? "text-white" : "text-ink")}>{a.name}</span>
          {compact ? null : <span className={clsx("ml-auto truncate font-mono text-[10.5px]", dark ? "text-white/55" : "text-ink-3")}>{a.detail}</span>}
        </li>
      ))}
    </ul>
  );
}

/** Bars for emails sent per day; rise into place when their section is shown. */
export function SendBars({ dark, className }: { dark?: boolean; className?: string }) {
  const max = Math.max(...D.sent);
  return (
    <div className={clsx("flex h-full items-end gap-[3px]", className)}>
      {D.sent.map((v, i) => (
        <span
          key={i}
          className={clsx("bar-grow block flex-1 rounded-t-[3px]", i === D.sent.length - 1 ? "bg-lime" : dark ? "bg-[linear-gradient(#7d8bff,#5b3df5)]" : "bg-[linear-gradient(#8ea2ff,#5b47f0)]")}
          style={{ height: `${(v / max) * 100}%`, ["--i" as string]: i }}
        />
      ))}
    </div>
  );
}

/** Service 02 visual: layered infrastructure cards over the site gradient. */
export function InfraStack() {
  return (
    <div aria-hidden className="canvas relative h-full min-h-[580px] overflow-hidden rounded-[22px] sm:min-h-[440px]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1.2px)] [background-size:22px_22px]" />
      <div className="drift absolute -right-8 -top-10" style={{ ["--dur" as string]: "14s" }}>
        <Orb variant="violet" size={150} className="relative" />
      </div>
      <div className="float absolute -bottom-10 left-[44%]" style={{ ["--dur" as string]: "9s" }}>
        <Orb variant="iris" size={84} className="relative" />
      </div>

      {/* sending domains */}
      <div className="absolute left-[6%] top-[9%] w-[min(330px,82%)] rounded-2xl bg-white p-4 shadow-[var(--shadow-float)]">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
          <Globe className="size-4 text-blue" /> Sending domains
        </div>
        <ul className="mt-3 space-y-2">
          {D.domains.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-2 text-[11.5px]">
              <span className="truncate font-mono text-ink-2">{d.name}</span>
              <span className={clsx("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", tone[d.tone])}>{d.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* authentication */}
      <div className="float absolute right-[6%] top-[37%] w-[min(300px,84%)] sm:top-[42%] rounded-2xl bg-white p-4 shadow-[var(--shadow-float)]" style={{ ["--dur" as string]: "8s", ["--float" as string]: "-8px" }}>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-ink">
          <ShieldCheck className="size-4 text-go" /> DNS authentication
        </div>
        <div className="mt-3">
          <AuthChecks />
        </div>
      </div>

      {/* warm-up */}
      <div className="float absolute bottom-[8%] left-[8%] w-[180px] rounded-2xl bg-night p-4 text-white shadow-[0_24px_40px_-20px_rgba(10,0,60,0.8)]" style={{ ["--dur" as string]: "10s", ["--delay" as string]: "-3s", ["--float" as string]: "-10px" }}>
        <div className="text-[11px] font-medium text-white/60">Warm-up</div>
        <div className="mt-1 text-[15px] font-semibold">Day 12 of 21</div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
          <span className="block h-full w-[57%] rounded-full bg-lime" />
        </div>
        <div className="mt-3 h-10">
          <SendBars dark />
        </div>
      </div>
    </div>
  );
}

/** Emails travelling from a campaign, through authenticated domains, to the inbox. */
export function Pipeline() {
  const nodes = [
    { icon: Send, title: "Your campaign", sub: "Copy, list, schedule" },
    { icon: Globe, title: "Sending domains", sub: "Three warmed domains" },
    { icon: ShieldCheck, title: "Authenticated", sub: "SPF · DKIM · DMARC" },
    { icon: MailCheck, title: "Mailbox providers", sub: "", clients: true },
    { icon: Inbox, title: "Delivered", sub: "Bounces caught and removed", end: true },
  ];
  return (
    <div className="relative rounded-[28px] bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-8">
      <ol className="relative grid gap-y-10 lg:grid-cols-5 lg:gap-x-4">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          return (
            <li key={n.title} className="relative flex items-center gap-4 lg:flex-col lg:text-center">
              {/* track to the next node */}
              {i < nodes.length - 1 ? (
                <>
                  <span aria-hidden className="absolute left-7 top-14 h-[calc(100%-16px)] w-0.5 bg-line lg:left-[calc(50%+36px)] lg:top-7 lg:h-0.5 lg:w-[calc(100%-56px)]">
                    <span className="packet-y absolute inset-x-0 top-0 block h-full lg:hidden" style={{ ["--delay" as string]: `${i * 0.35}s` }}>
                      <span className="absolute -left-[5px] top-0 block size-3 rounded-full bg-violet shadow-[0_0_0_5px_rgba(123,58,238,0.18)]" />
                    </span>
                    <span className="packet-x absolute inset-y-0 left-0 hidden w-full lg:block" style={{ ["--delay" as string]: `${i * 0.35}s` }}>
                      <span className="absolute -top-[5px] left-0 block size-3 rounded-full bg-violet shadow-[0_0_0_5px_rgba(123,58,238,0.18)]" />
                    </span>
                    <span className="packet-x absolute inset-y-0 left-0 hidden w-full lg:block" style={{ ["--delay" as string]: `${i * 0.35 + 1.2}s` }}>
                      <span className="absolute -top-[4px] left-0 block size-2.5 rounded-full bg-blue/80" />
                    </span>
                  </span>
                </>
              ) : null}
              <span className={clsx("relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl shadow-[0_14px_26px_-14px_rgba(32,16,110,0.6)]", n.end ? "bg-go text-white" : "bg-[linear-gradient(150deg,#4766ff,#7b3aee)] text-white")}>
                <Icon aria-hidden className="size-6" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-ink lg:mt-3">{n.title}</div>
                {n.clients ? (
                  <div className="mt-1.5 flex items-center gap-2 lg:justify-center">
                    {CLIENTS.map((c) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={c.name} src={c.src} alt={c.name} width={c.w} height={c.h} loading="lazy" className="h-3.5 w-auto" />
                    ))}
                  </div>
                ) : (
                  <div className="text-[13px] text-ink-3">{n.sub}</div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 flex items-start gap-2 border-t border-line pt-5 text-[13px] leading-[1.55] text-ink-3">
        <RotateCcw aria-hidden className="mt-0.5 size-3.5 shrink-0" />
        Not every email reaches the inbox. Bounces and complaints are tracked from the first send, and lists and volumes are corrected before they hurt the domain.
      </p>
    </div>
  );
}

/** The example deliverability dashboard (illustrative data, labelled as such). */
export function Dashboard() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-night-2 p-5 text-white shadow-[0_40px_90px_-40px_rgba(10,0,60,0.8)] ring-1 ring-white/10 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[12px] text-white/60">Outreach dashboard</div>
          <div className="text-[17px] font-semibold tracking-[-0.01em]">Spring founders campaign</div>
        </div>
        <span className="rounded-full bg-lime px-3 py-1 text-[11.5px] font-semibold text-ink">Example data</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <section className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8">
          <h4 className="text-[12px] font-medium text-white/60">Sending domains</h4>
          <ul className="mt-2.5 space-y-2">
            {D.domains.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-2 text-[11.5px]">
                <span className="truncate font-mono text-white/80">{d.name}</span>
                <span className={clsx("size-2 shrink-0 rounded-full", d.tone === "go" ? "bg-go" : "bg-[#ffb83d]")} title={d.status} />
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8">
          <h4 className="text-[12px] font-medium text-white/60">Authentication</h4>
          <div className="mt-2.5">
            <AuthChecks compact dark />
          </div>
          <p className="mt-2.5 text-[11px] leading-[1.45] text-white/50">All three pass on every sending domain.</p>
        </section>
      </div>

      <section className="mt-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/8">
        <div className="flex items-baseline justify-between">
          <h4 className="text-[12px] font-medium text-white/60">Emails sent per day, last 14 days</h4>
          <span className="text-[12px] font-semibold text-lime">{D.sent[D.sent.length - 1]} today</span>
        </div>
        <div className="mt-3 h-24">
          <SendBars dark />
        </div>
      </section>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8">
          <h4 className="text-[12px] font-medium text-white/60">Delivery</h4>
          <ul className="mt-2.5 space-y-2.5">
            {D.delivery.map((r) => (
              <li key={r.label}>
                <div className="flex justify-between text-[12px]">
                  <span className="text-white/80">{r.label}</span>
                  <span className="font-semibold">{r.value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span className={clsx("block h-full rounded-full", r.tone === "go" ? "bg-go" : r.tone === "warn" ? "bg-[#ffb83d]" : "bg-[#ff6b6b]")} style={{ width: `${Math.max(r.share, 1.5)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8">
          <h4 className="text-[12px] font-medium text-white/60">Bounce monitor</h4>
          <dl className="mt-2.5 grid grid-cols-2 gap-2 text-[12px]">
            <div>
              <dt className="text-white/55">Hard</dt>
              <dd className="text-[18px] font-semibold">{D.bounces.hard}</dd>
            </div>
            <div>
              <dt className="text-white/55">Soft</dt>
              <dd className="text-[18px] font-semibold">{D.bounces.soft}</dd>
            </div>
          </dl>
          <p className="mt-2 text-[11px] leading-[1.45] text-white/55">{D.bounces.removed} addresses removed from the list automatically.</p>
        </section>
      </div>
    </div>
  );
}
