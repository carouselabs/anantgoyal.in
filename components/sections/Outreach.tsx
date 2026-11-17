import { Info, Scale } from "lucide-react";
import { Dashboard, Pipeline } from "@/components/outreach/Parts";
import { Orb, Torus } from "@/components/three-d/Objects";
import { complianceNote, deliverabilityNote, outreachCapabilities } from "@/content/outreach";

export function Outreach() {
  return (
    <section id="outreach" aria-labelledby="outreach-h" className="relative overflow-hidden bg-mist px-4 py-24 sm:px-6 md:py-32">
      <Orb variant="blue" size={200} className="-left-24 top-[38%] hidden opacity-90 lg:block" />
      <Torus size={220} className="-right-28 -top-20 hidden lg:block" />
      <div className="relative mx-auto max-w-[1400px] lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="outreach-h" className="max-w-[17ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Reach thousands. Manage every send. <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">Track every campaign.</span>
          </h2>
          <p className="max-w-[28rem] text-lg leading-[1.6] text-ink-2">
            I help businesses reach thousands of relevant prospects through scalable campaigns, sent from properly configured domains and watched from the first email to the last.
          </p>
        </div>

        <div data-reveal className="mt-14">
          <Pipeline />
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="rounded-[28px] bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-8">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">What a campaign includes</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {outreachCapabilities.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-mono text-[13px] font-medium text-violet">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{s.title}</h4>
                    <p className="mt-1 text-[14.5px] leading-[1.55] text-ink-2">{s.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <Dashboard />
          </div>
        </div>

        <div className="mt-6 grid max-w-[64rem] gap-3">
          <p className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-ink-2">
            <Scale aria-hidden className="mt-0.5 size-4 shrink-0 text-violet" />
            {complianceNote}
          </p>
          <p className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-ink-2">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-violet" />
            {deliverabilityNote}
          </p>
        </div>
      </div>
    </section>
  );
}
