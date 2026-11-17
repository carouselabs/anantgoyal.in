"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { mailto, site, visibleSocials } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Envelope3D, Orb } from "@/components/three-d/Objects";
import { Footer } from "@/components/site/Footer";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = mailto;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : "Copy my email address"}
      title={copied ? "Copied" : "Copy"}
      className="btn grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="canvas on-dark relative isolate overflow-hidden px-4 pt-24 sm:px-6 md:pt-32">
      {/* 3D composition */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Orb variant="blue" size={300} className="-left-36 top-[2%] opacity-95" />
        <div className="drift absolute right-[3%] top-[3%] hidden lg:block" style={{ ["--dur" as string]: "13s" }}>
          <Orb variant="pearl" size={110} className="relative" />
        </div>
        <Orb variant="violet" size={320} className="-right-40 top-[46%] hidden opacity-95 sm:block" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:px-8">
        <div className="relative min-w-0">
          <h2 id="contact-h" className="max-w-[13ch] text-[clamp(2.5rem,1.1rem+3.8vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
            Ready to make your emails look as good as your <span className="font-serif font-normal italic tracking-[-0.02em]">ideas?</span>
          </h2>
          <p className="mt-6 max-w-[30rem] text-xl leading-[1.55] text-white">Let&rsquo;s turn your next email into something worth opening.</p>

          <div className="mt-10 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.avatar} alt={site.name} width={64} height={64} loading="lazy" className="size-14 shrink-0 rounded-full ring-2 ring-white/70 sm:size-16" />
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-white/90">Or email me directly</p>
              <div className="mt-1 flex items-center gap-3">
                <a href={mailto} className="min-w-0 break-all text-[clamp(1.25rem,1rem+1.1vw,1.9rem)] font-semibold tracking-[-0.02em] text-white">
                  <span className="link-draw">{site.email}</span>
                </a>
                <CopyEmail />
              </div>
            </div>
          </div>

          {visibleSocials.length > 0 ? (
            <ul className="mt-8 flex flex-wrap items-center gap-2">
              {visibleSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener me" className="inline-flex h-11 items-center rounded-full px-4 text-[15px] font-medium text-white ring-1 ring-white/30 transition-colors hover:bg-white/10">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <div aria-hidden className="pointer-events-none relative mt-16 hidden h-[220px] lg:block">
            <div className="float absolute left-[4%] top-0" style={{ ["--dur" as string]: "9s", ["--float" as string]: "-16px" }}>
              <Envelope3D className="w-[230px] -rotate-12 drop-shadow-[0_40px_40px_rgba(10,0,60,0.45)]" />
            </div>
            <div className="float absolute left-[52%] top-[18%]" style={{ ["--dur" as string]: "7s", ["--delay" as string]: "-2s" }}>
              <Orb variant="iris" size={70} className="relative" />
            </div>
            <div className="float absolute left-[40%] top-[62%]" style={{ ["--dur" as string]: "8s", ["--delay" as string]: "-4s" }}>
              <Orb variant="glass" size={64} className="relative" />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <ContactForm />
        </div>
      </div>

      <Footer className="mt-24 md:mt-32" />
    </section>
  );
}
