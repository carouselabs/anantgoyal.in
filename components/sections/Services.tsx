import { ArrowRight } from "lucide-react";
import { emailGroups } from "@/content/services";
import { GroupPanel } from "@/components/services/GroupPanel";
import { Orb } from "@/components/three-d/Objects";

/** Email design: every kind of email, in four groups with live mock-ups. */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-h" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 md:py-32">
      <Orb variant="violet" size={170} className="-right-24 -top-6 hidden opacity-90 lg:block" />
      <Orb variant="iris" size={64} className="left-[56%] top-36 hidden lg:block" />
      <div className="mx-auto max-w-[1400px] lg:px-8">
        <p className="text-[15px] font-medium text-violet">Email design and development</p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="services-h" className="max-w-[15ch] text-[clamp(2.2rem,1.3rem+3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Every kind of email, <span className="font-serif font-normal italic tracking-[-0.02em] text-violet">designed and coded.</span>
          </h2>
          <p className="max-w-[28rem] text-lg leading-[1.6] text-ink-2">
            Whatever your business sends, from the first welcome to the last receipt, designed for your brand and coded to work in every inbox. Point at a type to see it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {emailGroups.map((g, i) => (
            <GroupPanel key={g.id} group={g} index={i} />
          ))}
        </div>

        <p className="mt-10 flex flex-col items-start gap-2 text-[17px] text-ink-2 sm:flex-row sm:items-center sm:gap-3">
          Don&rsquo;t see yours? If your business sends it, I can design and code it.
          <a href="#contact" className="group inline-flex min-h-11 items-center gap-2 font-medium text-ink">
            <span className="link-draw">Tell me about it</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </p>
      </div>
    </section>
  );
}
