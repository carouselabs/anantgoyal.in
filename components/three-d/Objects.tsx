import clsx from "clsx";
import type { CSSProperties } from "react";

type OrbVariant = "blue" | "violet" | "pearl" | "lime" | "iris" | "glass";

/** A glossy CSS sphere. Decorative: hidden from assistive tech. */
export function Orb({ variant, size, className, style }: { variant: OrbVariant; size: number | string; className?: string; style?: CSSProperties }) {
  const s = typeof size === "number" ? `${size}px` : size;
  return <span aria-hidden className={clsx("orb", `orb--${variant}`, className)} style={{ ["--s" as string]: s, ...style }} />;
}

/** A ring laid back in perspective. */
export function Torus({ size, className, style }: { size: number | string; className?: string; style?: CSSProperties }) {
  const s = typeof size === "number" ? `${size}px` : size;
  return <span aria-hidden className={clsx("torus", className)} style={{ ["--s" as string]: s, ...style }} />;
}

/** A dimensional envelope drawn in SVG gradients. */
export function Envelope3D({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg aria-hidden className={className} style={style} viewBox="0 0 240 190" fill="none">
      <defs>
        <linearGradient id="env-body" x1="0" y1="40" x2="240" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8EA2FF" />
          <stop offset="0.55" stopColor="#5B47F0" />
          <stop offset="1" stopColor="#3A1FB8" />
        </linearGradient>
        <linearGradient id="env-flap" x1="120" y1="40" x2="120" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9B8FF" />
          <stop offset="1" stopColor="#7B5CF5" />
        </linearGradient>
        <linearGradient id="env-front" x1="0" y1="190" x2="240" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A33E0" />
          <stop offset="1" stopColor="#8F7BFF" />
        </linearGradient>
        <linearGradient id="env-letter" x1="60" y1="0" x2="180" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E9E5FF" />
        </linearGradient>
        <radialGradient id="env-shine" cx="0" cy="0" r="1" gradientTransform="translate(70 70) rotate(40) scale(120 70)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="6" y="46" width="228" height="138" rx="22" fill="url(#env-body)" />
      <rect x="44" y="8" width="152" height="120" rx="12" fill="url(#env-letter)" />
      <rect x="62" y="30" width="72" height="8" rx="4" fill="#5B47F0" opacity=".85" />
      <rect x="62" y="48" width="116" height="6" rx="3" fill="#C9C1F5" />
      <rect x="62" y="62" width="96" height="6" rx="3" fill="#C9C1F5" />
      <rect x="62" y="82" width="54" height="16" rx="8" fill="#2F4BFF" />
      <path d="M6 70 L120 140 L234 70 V162 a22 22 0 0 1 -22 22 H28 a22 22 0 0 1 -22 -22 Z" fill="url(#env-front)" />
      <path d="M6 162 L96 112 M234 162 L144 112" stroke="#ffffff" strokeOpacity=".22" strokeWidth="2" />
      <rect x="6" y="46" width="228" height="138" rx="22" fill="url(#env-shine)" />
    </svg>
  );
}
