import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Footer } from "@/components/site/Footer";
import { Envelope3D, Orb } from "@/components/three-d/Objects";

/** The closing band on the /work pages: one call to action, then the footer. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-h" className="canvas on-dark relative isolate overflow-hidden px-4 pt-24 sm:px-6 md:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Orb variant="blue" size={260} className="-left-28 top-8 opacity-95" />
        <Orb variant="violet" size={240} className="-right-24 top-[30%] hidden sm:block" />
        <div className="float absolute right-[14%] top-14 hidden md:block" style={{ ["--dur" as string]: "9s" }}>
          <Envelope3D className="w-[150px] rotate-12 drop-shadow-[0_30px_30px_rgba(10,0,60,0.45)]" />
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] lg:px-8">
        <h2 id="cta-h" className="max-w-[16ch] text-[clamp(2.2rem,1.2rem+3.4vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em] text-white">
          Ready to make your emails look as good as your <span className="font-serif font-normal italic tracking-[-0.02em]">ideas?</span>
        </h2>
        <p className="mt-5 max-w-[30rem] text-xl leading-[1.55] text-white">Let&rsquo;s turn your next email into something worth opening.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/#contact" className="btn inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-7 text-base font-medium text-ink shadow-[0_10px_30px_-12px_rgba(10,0,60,0.5)]">
            Start a project
            <ArrowRight aria-hidden className="btn-arrow size-4" />
          </Link>
          <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center px-2 text-[16px] font-medium text-white">
            <span className="link-draw">{site.email}</span>
          </a>
        </div>
      </div>
      <Footer home={false} className="mt-20 md:mt-24" />
    </section>
  );
}
