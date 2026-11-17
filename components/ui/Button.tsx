import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "light" | "ghost" | "ghost-light";
type Size = "md" | "lg";

const base =
  "btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-[0_10px_24px_-10px_rgba(16,12,51,0.6)] hover:bg-[#1d1850] hover:shadow-[0_16px_30px_-12px_rgba(16,12,51,0.6)]",
  light: "bg-white text-ink shadow-[0_10px_30px_-12px_rgba(10,0,60,0.5)] hover:shadow-[0_18px_36px_-14px_rgba(10,0,60,0.6)]",
  ghost: "border border-ink/15 bg-white/60 text-ink hover:border-ink/30 hover:bg-white",
  "ghost-light": "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base sm:h-14 sm:px-7",
};

type Common = { variant?: Variant; size?: Size; arrow?: "right" | "up" | false; children: ReactNode; className?: string };

function Arrow({ kind }: { kind: "right" | "up" }) {
  const Icon = kind === "up" ? ArrowUpRight : ArrowRight;
  return <Icon aria-hidden className="btn-arrow size-[1.1em] shrink-0" strokeWidth={2} />;
}

export function ButtonLink({ variant = "primary", size = "md", arrow = false, className, children, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow ? <Arrow kind={arrow} /> : null}
    </a>
  );
}

export function Button({ variant = "primary", size = "md", arrow = false, className, children, type = "button", ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={clsx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow ? <Arrow kind={arrow} /> : null}
    </button>
  );
}
