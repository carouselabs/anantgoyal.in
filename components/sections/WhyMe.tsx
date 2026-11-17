import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about } from "@/content/outreach";
import { site } from "@/content/site";
import { Envelope3D, Orb } from "@/components/three-d/Objects";

/** About: the person behind the work, rising out of a sphere. */
export function WhyMe() {
  return (
    <section id="about" aria-labelledby="about-h" className="night on-dark relative overflow-hidden px-4 py-24 sm:px-6 md:py-32">
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-8">
        <div className="relative mx-auto w-[min(80vw,340px)] sm:w-[380px] lg:w-[440px]">
          <div className="relative aspect-square">
            <Orb variant="blue" size="100%" className="inset-0" />
            {/* The cut-out rises out of the sphere: clipped to its lower half, free above it. */}
            <div className="absolute inset-0" style={{ clipPath: "inset(-60% 0 0 0 round 0 0 50% 50%)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.portrait} alt={site.name} width={500} height={500} loading="lazy" className="absolute bottom-0 left-1/2 w-[118%] max-w-none -translate-x-1/2" />
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -left-10 bottom-4 hidden sm:block">
            <div className="float" style={{ ["--dur" as string]: "9s", ["--float" as string]: "-12px" }}>
              <Envelope3D className="w-[140px] -rotate-12 drop-shadow-[0_24px_24px_rgba(0,0,0,0.45)]" />
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-4 top-[20%]">
            <div className="float" style={{ ["--dur" as string]: "7s", ["--delay" as string]: "-2s" }}>
              <Orb variant="iris" size={64} className="relative" />
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-8 bottom-[8%] hidden sm:block">
            <Orb variant="violet" size={44} className="relative" />
          </div>
        </div>

        <div>
          <p className="text-[15px] font-medium text-lime">About {site.name}</p>
          <h2 id="about-h" className="mt-3 max-w-[15ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Designer by thinking. <span className="font-serif font-normal italic tracking-[-0.02em]">Builder by execution.</span>
          </h2>
          {about.paragraphs.map((t) => (
            <p key={t.slice(0, 20)} className="mt-6 max-w-[38rem] text-[17px] leading-[1.65] text-white/85">
              {t}
            </p>
          ))}
          <h3 className="mt-10 text-[15px] font-medium text-white/60">Where I spend my time</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {about.skills.map((s) => (
              <li key={s} className="rounded-full bg-white/8 px-3.5 py-1.5 text-[14px] font-medium text-white ring-1 ring-white/15">
                {s}
              </li>
            ))}
          </ul>
          <Link href="/email-design/" className="group mt-10 inline-flex items-center gap-2 text-[16px] font-medium text-white">
            <span className="link-draw">See my email designs</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
