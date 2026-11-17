import { Info } from "lucide-react";
import { infraCapabilities, outreachSteps, warmupNote } from "@/content/outreach";
import { InfraStack } from "@/components/outreach/Parts";
import { Orb } from "@/components/three-d/Objects";

export function Infrastructure() {
  return (
    <section id="infrastructure" aria-labelledby="infrastructure-h" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 md:py-32">
      <Orb variant="iris" size={80} className="right-[8%] top-20 hidden lg:block" />
      <div className="relative mx-auto max-w-[1400px] lg:px-8">
        <p className="text-[15px] font-medium text-violet">Build your email infrastructure before you scale.</p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="infrastructure-h" className="max-w-[17ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Warm up your sending infrastructure. <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">Scale your outreach responsibly.</span>
          </h2>
          <p className="max-w-[28rem] text-lg leading-[1.6] text-ink-2">
            Proper configuration, a steady sending history and close monitoring give your emails the best chance of being trusted by mailbox providers.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <ol data-reveal className="relative">
            <span aria-hidden className="absolute bottom-8 left-[19px] top-6 w-0.5 bg-line" />
            <span aria-hidden className="draw-line-y absolute bottom-8 left-[19px] top-6 w-0.5 bg-[linear-gradient(#2f4bff,#a445f0)]" />
            {outreachSteps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 pb-7 last:pb-0">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-ink font-mono text-[12.5px] font-medium text-white ring-4 ring-white">{String(i + 1).padStart(2, "0")}</span>
                <div className="pt-1.5">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{s.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-5">
            <div data-reveal className="rounded-[28px] bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
              <InfraStack />
            </div>
            <div className="rounded-[28px] bg-mist p-6 ring-1 ring-ink/5 sm:p-7">
              <h3 className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-ink">
                <Info aria-hidden className="size-5 text-violet" /> What warm-up does
              </h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-ink-2">{warmupNote}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {infraCapabilities.map((c) => (
                  <li key={c} className="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-2 ring-1 ring-ink/5">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
