import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { previewSrc } from "@/content/projects";
import { Orb } from "@/components/three-d/Objects";

// Two directions from the showcase sit behind a blank "your brand" email:
// the picture is "take what you like here and make it yours".
const BEHIND = ["nordlys-launch", "daily-fold-digest"];

/** A blank email waiting for the visitor's brand. Decorative. */
function BrandMock() {
  return (
    <div aria-hidden className="relative mx-auto h-[300px] w-full max-w-[440px] lg:h-[330px]">
      {BEHIND.map((slug, i) => (
        <div
          key={slug}
          className={
            i === 0
              ? "absolute left-[2%] top-[10%] w-[46%] -rotate-[9deg] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-x-3 group-hover:-rotate-[13deg]"
              : "absolute right-[2%] top-[6%] w-[46%] rotate-[8deg] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-x-3 group-hover:rotate-[12deg]"
          }
        >
          <div className="h-[230px] overflow-hidden rounded-[14px] bg-white opacity-80 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc(slug, "desktop").replace(".webp", "-sm.webp")} alt="" width={520} height={1300} loading="lazy" className="block w-full" />
          </div>
        </div>
      ))}

      {/* The visitor's email, front and centre. */}
      <div className="absolute left-1/2 top-0 w-[58%] -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2">
        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_34px_70px_-26px_rgba(0,0,0,0.75)]">
          <div className="flex items-center gap-2 border-b border-ink/5 px-4 py-3">
            <span className="grid size-7 place-items-center rounded-full border border-dashed border-violet/60 text-[8px] font-semibold uppercase text-violet">Logo</span>
            <span className="text-[12px] font-semibold text-ink">Your brand</span>
          </div>
          <div className="px-4 pb-4 pt-3">
            <div className="relative h-[86px] overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#5a78ff,#9a44ea)]">
              <span className="absolute -bottom-6 -right-4 size-20 rounded-full bg-white/25" />
              <span className="absolute left-3 top-3 size-8 rounded-full bg-lime/90" />
            </div>
            <span className="mt-3 block h-2.5 w-[85%] rounded-full bg-ink/85" />
            <span className="mt-1.5 block h-2.5 w-[60%] rounded-full bg-ink/85" />
            <span className="mt-3 block h-1.5 w-full rounded-full bg-ink/15" />
            <span className="mt-1.5 block h-1.5 w-[92%] rounded-full bg-ink/15" />
            <span className="mt-1.5 block h-1.5 w-[70%] rounded-full bg-ink/15" />
            <span className="mt-4 inline-flex h-7 items-center rounded-full bg-violet px-3 text-[10px] font-semibold text-white">Your button</span>
          </div>
        </div>
      </div>

      {/* The brand colours being picked. */}
      <div className="float absolute bottom-[4%] right-[4%] flex items-center gap-1.5 rounded-full bg-white px-3 py-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]" style={{ ["--dur" as string]: "8s" }}>
        <span className="text-[10.5px] font-semibold text-ink">Your colours</span>
        {["#2f4bff", "#7b3aee", "#d4ff5c", "#100c33"].map((c) => (
          <span key={c} className="size-4 rounded-full ring-2 ring-white" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

/**
 * The one call to action on the Design page, placed where it is seen before
 * any scrolling: a visitor can ask for a design made for their brand. It
 * opens the contact form with that request already noted.
 */
export function PersonalisedBanner() {
  return (
    <aside aria-labelledby="personal-h" className="night on-dark group relative isolate mb-14 overflow-hidden rounded-[28px] px-6 py-9 ring-1 ring-white/10 sm:rounded-[36px] sm:px-10 sm:py-11 md:mb-20 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center md:gap-8 lg:px-14 lg:py-12">
      <Orb variant="blue" size={190} className="-left-20 -top-24 -z-10 opacity-70" />
      <Orb variant="violet" size={110} className="-bottom-14 right-[44%] -z-10 hidden opacity-80 md:block" />
      <div className="relative min-w-0">
        <p className="inline-flex items-center gap-2 text-[13px] font-medium text-lime">
          <span aria-hidden className="size-1.5 rounded-full bg-lime" />
          Personalised design
        </p>
        <h2 id="personal-h" className="mt-3 max-w-[15ch] text-[clamp(2rem,1.25rem+2.4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
          Make your own <span className="font-serif font-normal italic tracking-[-0.02em]">personalised design.</span>
        </h2>
        <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6] text-white/75">
          Like a direction here? Tell me about your brand and I&rsquo;ll design and code an email that&rsquo;s made only for it.
        </p>
        <Link href="/?design=personalised#contact" className="btn mt-8 inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-6 text-[15.5px] font-medium text-ink shadow-[0_14px_34px_-14px_rgba(0,0,0,0.6)]">
          Get your personalised design
          <ArrowRight aria-hidden className="btn-arrow size-4" />
        </Link>
      </div>
      <div className="relative mt-10 hidden min-w-0 sm:block md:mt-0">
        <BrandMock />
      </div>
    </aside>
  );
}
