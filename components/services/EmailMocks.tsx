import { CalendarDays, Check, CircleDot, GripVertical, MapPin, Star } from "lucide-react";
import type { MockId } from "@/content/services";

// Small coded email bodies for the types that have no full sample email yet.
// Everything here is illustrative: invented names on .example-style brands.

function Btn({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "blue" | "violet" }) {
  const bg = tone === "blue" ? "bg-blue" : tone === "violet" ? "bg-violet" : "bg-ink";
  return <span className={`mt-3 inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold text-white ${bg}`}>{children}</span>;
}

function Lines({ n = 2 }: { n?: number }) {
  return (
    <div className="mt-2 space-y-1">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="block h-1.5 rounded-full bg-ink/12" style={{ width: `${90 - i * 18}%` }} />
      ))}
    </div>
  );
}

export function MockBody({ id }: { id: MockId }) {
  switch (id) {
    case "ticket":
      return (
        <div className="p-3">
          <div className="rounded-xl bg-[linear-gradient(135deg,#4766ff,#a445f0)] p-3 text-white">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/75">You&rsquo;re invited</div>
            <div className="mt-1 font-serif text-[19px] italic leading-[1.05]">Design Systems Live</div>
          </div>
          <div className="mt-2.5 space-y-1.5 text-[10px] text-ink-2">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="size-3 text-violet" /> Thu 14 Dec · 18:00
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3 text-violet" /> Online, link after you RSVP
            </div>
          </div>
          <div className="flex gap-1.5">
            <Btn tone="violet">RSVP</Btn>
            <span className="mt-3 inline-flex h-7 items-center rounded-full px-3 text-[10px] font-semibold text-ink ring-1 ring-ink/15">Add to calendar</span>
          </div>
        </div>
      );
    case "winback":
      return (
        <div className="p-3 text-center">
          <div className="mx-auto mt-1 grid size-12 place-items-center rounded-full bg-[radial-gradient(circle_at_32%_28%,#fff,#c9d2ff_20%,#7b3aee_80%)] text-[18px]" aria-hidden>
            <span className="text-white">♥</span>
          </div>
          <div className="mt-2 font-serif text-[20px] italic leading-[1.05] text-ink">We miss you, Alex</div>
          <Lines n={2} />
          <div className="mx-auto mt-2.5 w-fit rounded-lg border border-dashed border-violet/60 px-2.5 py-1 font-mono text-[10px] font-semibold text-violet">WELCOMEBACK20</div>
          <Btn tone="violet">Come back</Btn>
        </div>
      );
    case "drip":
      return (
        <div className="p-3">
          <div className="text-[10px] font-semibold text-ink">Your onboarding series</div>
          <ol className="relative mt-2.5 space-y-2.5 border-l-2 border-line pl-3">
            {[
              ["Day 1", "Why most onboarding fails", "Sent"],
              ["Day 3", "A five-minute fix", "Sent"],
              ["Day 7", "See it in your account", "Today"],
              ["Day 10", "Book a short call", "Next"],
            ].map(([d, t, s]) => (
              <li key={d} className="relative">
                <span className={`absolute -left-[17px] top-0.5 size-2.5 rounded-full ring-2 ring-white ${s === "Sent" ? "bg-go" : s === "Today" ? "bg-violet" : "bg-ink/20"}`} />
                <div className="text-[9px] font-medium text-ink-3">{d}</div>
                <div className="text-[10.5px] font-semibold leading-[1.25] text-ink">{t}</div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "receipt":
      return (
        <div className="p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
            <span className="grid size-4 place-items-center rounded-full bg-go text-white">
              <Check className="size-2.5" strokeWidth={3.5} />
            </span>
            Order confirmed
          </div>
          <div className="text-[9.5px] text-ink-3">#4821 · arriving Tue 12 Nov</div>
          <div className="mt-2.5 space-y-1.5 border-y border-line py-2 text-[10px] text-ink-2">
            {[
              ["Ceramic table lamp", "$96.00"],
              ["Enamel breakfast set", "$63.00"],
              ["Delivery", "Free"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span>{k}</span>
                <span className="font-medium text-ink">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[11px] font-semibold text-ink">
            <span>Total</span>
            <span>$159.00</span>
          </div>
          <Btn>View invoice</Btn>
        </div>
      );
    case "cart":
      return (
        <div className="p-3">
          <div className="font-serif text-[18px] italic leading-[1.1] text-ink">You left something behind</div>
          <div className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-mist p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/emails/img/brookfold-lamp.jpg" alt="" width={44} height={50} loading="lazy" className="h-[50px] w-11 rounded-lg object-cover" />
            <div className="text-[10px] leading-[1.35]">
              <div className="font-semibold text-ink">Ceramic table lamp</div>
              <div className="text-ink-3">Cream · 1 item</div>
              <div className="font-semibold text-[#b4532a]">$96</div>
            </div>
          </div>
          <div className="mt-2 text-[9.5px] text-ink-3">Saved in your cart for 7 days.</div>
          <span className="mt-2.5 inline-flex h-7 items-center rounded-full bg-[#b4532a] px-3 text-[10px] font-semibold text-white">Return to your cart</span>
        </div>
      );
    case "flow":
      return (
        <div className="p-3">
          <div className="text-[10.5px] text-ink">
            Hi <span className="rounded bg-violet/12 px-1 font-mono text-[9.5px] text-violet">{"{{first_name}}"}</span>,
          </div>
          <div className="mt-2.5 flex flex-col items-center gap-1 text-[9.5px] font-medium">
            <span className="rounded-lg bg-ink px-2.5 py-1 text-white">Signed up</span>
            <span className="h-2.5 w-px bg-ink/25" />
            <span className="rounded-lg bg-mist px-2.5 py-1 text-ink-2 ring-1 ring-ink/8">Wait 2 days</span>
            <span className="h-2.5 w-px bg-ink/25" />
            <span className="rotate-0 rounded-lg bg-violet/12 px-2.5 py-1 text-violet ring-1 ring-violet/25">Opened email 1?</span>
            <div className="mt-1 grid w-full grid-cols-2 gap-1.5 text-center">
              <span className="rounded-lg bg-go/12 px-1.5 py-1 text-[#13723a]">Yes: send tips</span>
              <span className="rounded-lg bg-[#fff4db] px-1.5 py-1 text-[#8a5a00]">No: reminder</span>
            </div>
          </div>
        </div>
      );
    case "support":
      return (
        <div className="space-y-2 p-3 text-[10px] leading-[1.4]">
          <div className="w-[85%] rounded-xl rounded-tl-sm bg-mist px-2.5 py-1.5 text-ink-2">My invoice shows the old address. Can you fix it?</div>
          <div className="ml-auto w-[85%] rounded-xl rounded-tr-sm bg-blue px-2.5 py-1.5 text-white">Done, Priya: the new invoice is attached. Anything else?</div>
          <div className="pt-1 text-center">
            <div className="text-[9.5px] font-semibold text-ink">How did we do?</div>
            <div className="mt-1 flex justify-center gap-0.5 text-[#ffb83d]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>
      );
    case "internal":
      return (
        <div className="p-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet">Company update</div>
          <div className="mt-1 text-[15px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">All-hands on Friday, 10:00</div>
          <ul className="mt-2 space-y-1 text-[10px] text-ink-2">
            {["What we shipped this quarter", "Welcome to four new people", "Plans for January"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <CircleDot className="size-3 text-violet" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex -space-x-1.5">
            {["#4766ff", "#a445f0", "#22c55e", "#ffb83d"].map((c) => (
              <span key={c} className="size-5 rounded-full ring-2 ring-white" style={{ background: c }} />
            ))}
          </div>
        </div>
      );
    case "templates":
      return (
        <div className="space-y-1.5 p-3">
          {[
            ["header", ["w-10 bg-violet/70", "ml-auto w-12 bg-ink/15"]],
            ["hero", ["w-3/4 h-2 bg-ink/70", "w-1/2 bg-ink/20", "w-12 h-3 rounded-full bg-blue"]],
            ["two-columns", null],
            ["footer", ["w-1/2 mx-auto bg-ink/15"]],
          ].map(([name, rows]) => (
            <div key={name as string} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 ring-1 ring-ink/8">
              <GripVertical className="size-3 shrink-0 text-ink-3" />
              <div className="min-w-0 flex-1">
                {rows ? (
                  <div className="flex flex-col gap-1">
                    {(rows as string[]).map((r, j) => (
                      <span key={j} className={`block h-1.5 rounded-full ${r}`} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    <span className="h-4 rounded bg-ink/10" />
                    <span className="h-4 rounded bg-ink/10" />
                  </div>
                )}
              </div>
              <span className="font-mono text-[8.5px] text-ink-3">{name as string}</span>
            </div>
          ))}
        </div>
      );
  }
}
