import clsx from "clsx";
import type { ReactNode } from "react";

/** An inbox window: traffic lights, sender and subject, then the email. */
export function InboxWindow({ from, subject, children, className, tone = "light" }: { from?: string; subject?: string; children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <div className={clsx("overflow-hidden rounded-[20px] ring-1", tone === "dark" ? "bg-night-2 ring-white/10" : "bg-white ring-ink/8", className)}>
      <div className={clsx("flex items-center gap-3 border-b px-4 py-3", tone === "dark" ? "border-white/10" : "border-ink/8")}>
        <span aria-hidden className="flex shrink-0 gap-1.5">
          <i className="block size-2.5 rounded-full bg-[#ff6159]" />
          <i className="block size-2.5 rounded-full bg-[#ffbd2e]" />
          <i className="block size-2.5 rounded-full bg-[#28c941]" />
        </span>
        {subject ? (
          <span className="min-w-0 truncate text-[12px] leading-4">
            {from ? <b className={clsx("font-semibold", tone === "dark" ? "text-white" : "text-ink")}>{from} · </b> : null}
            <span className={tone === "dark" ? "text-white/70" : "text-ink-2"}>{subject}</span>
          </span>
        ) : null}
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}

/** A phone body with a screen. Children fill the screen. */
export function Phone({ children, className, screenClassName }: { children: ReactNode; className?: string; screenClassName?: string }) {
  return (
    <div className={clsx("relative rounded-[2.4rem] bg-[#0d0b22] p-[7px] shadow-[0_40px_70px_-30px_rgba(16,8,80,0.7),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]", className)}>
      <div className={clsx("relative h-full overflow-hidden rounded-[1.95rem] bg-white", screenClassName)}>
        <span aria-hidden className="absolute left-1/2 top-2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-[#0d0b22]" />
        {children}
      </div>
    </div>
  );
}
