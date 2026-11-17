"use client";

import clsx from "clsx";
import { ArrowRight, Check, ChevronDown, LoaderCircle, Mail, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { designBySlug } from "@/projects";
import { contactForm, PROJECT_TYPES, site, TIMELINES } from "@/content/site";

type Values = { name: string; email: string; brand: string; types: string[]; timeline: string; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; name: string; email: string }
  | { kind: "mail-app"; href: string }
  | { kind: "error"; href: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Write your name.";
  if (!v.email.trim()) e.email = "Write the email address I should reply to.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Check the email address: it needs an @ and a domain, like name@company.com.";
  if (v.message.trim().length < 10) e.message = "Write a few lines about the email: what it is for and who receives it.";
  return e;
}

function summary(v: Values) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.brand ? `Brand or company: ${v.brand}` : "",
    v.types.length ? `Kind of email: ${v.types.join(", ")}` : "",
    v.timeline ? `Timing: ${v.timeline}` : "",
    "",
    v.message,
  ]
    .filter((line, i, all) => line !== "" || (i > 0 && all[i - 1] !== ""))
    .join("\n");
}

function mailtoFor(v: Values) {
  const subject = `${site.projectSubject} from ${v.name}`;
  // Mail apps cut very long mailto links: keep the body comfortably short.
  const body = summary({ ...v, message: v.message.length > 1500 ? v.message.slice(0, 1500) + "…" : v.message });
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Shown at the top of the screen once a message has really been delivered to
 * the form service (never for the email-app fallback). Hides itself after a
 * while; the confirmation card in place of the form stays.
 */
function SentBanner({ name, onClose }: { name: string; onClose: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onClose, 10_000);
    return () => window.clearTimeout(t);
  }, [onClose]);
  // Portalled to <body> so no transformed ancestor can pin it inside the page.
  return createPortal(
    <div role="status" className="banner-in on-light fixed inset-x-3 top-[84px] z-[70] mx-auto flex max-w-[560px] items-start gap-3 rounded-2xl bg-white p-4 pr-3 text-ink shadow-[0_24px_60px_-20px_rgba(10,0,60,0.55)] ring-1 ring-go/35 sm:top-[92px]">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-go text-white">
        <Check className="size-5" strokeWidth={3} />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[15.5px] font-semibold">Message sent successfully</p>
        <p className="mt-0.5 text-[14px] leading-[1.5] text-ink-2">
          {name ? `Thanks, ${name}. ` : ""}I&rsquo;ll reply as soon as possible.
        </p>
      </div>
      <button type="button" onClick={onClose} aria-label="Dismiss" className="grid size-9 shrink-0 place-items-center rounded-full text-ink-3 transition-colors hover:bg-mist hover:text-ink">
        <X aria-hidden className="size-4" />
      </button>
    </div>,
    document.body,
  );
}

const inputCls =
  "mt-2 block w-full rounded-xl border bg-white px-4 text-[16px] text-ink placeholder:text-ink-3/70 transition-[border-color,box-shadow] outline-none! focus:border-blue focus:shadow-[0_0_0_4px_rgba(47,75,255,0.15)]";

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-ink-3"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13.5px] font-medium text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // "Start from this design" links here as /?design=<slug>#contact, and the
  // Design page banner as /?design=personalised#contact: note the request in
  // the message so the visitor only has to add their own details.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("design");
    const d = slug ? designBySlug(slug) : undefined;
    const box = messageRef.current;
    if (!box || box.value) return;
    if (d) box.value = `I'd like an email in the style of "${d.title}" (${window.location.origin}/email-design/${d.slug}/), made for my brand.

`;
    else if (slug === "personalised") box.value = `I'd like a personalised email design, made for my brand.

`;
  }, []);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [banner, setBanner] = useState(false);
  const hideBanner = useCallback(() => setBanner(false), []);
  // After sending, focus the confirmation so screen readers announce it, and
  // bring the card to the middle of the screen, clear of the nav and banner.
  const sentRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status.kind !== "sent") return;
    sentRef.current?.focus({ preventScroll: true });
    cardRef.current?.scrollIntoView({ block: "center" });
  }, [status.kind]);

  const read = (form: HTMLFormElement): Values => {
    const d = new FormData(form);
    const s = (k: string) => String(d.get(k) ?? "").trim();
    return { name: s("name"), email: s("email"), brand: s("brand"), types: d.getAll("types").map(String), timeline: s("timeline"), message: String(d.get("message") ?? "").trim() };
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // A field people never see: bots fill it in. Pretend it worked, send nothing.
    if (String(new FormData(form).get("website") ?? "") !== "") {
      setStatus({ kind: "sent", name: "", email: "" });
      return;
    }
    const v = read(form);
    const errs = validate(v);
    setErrors(errs);
    const first = (["name", "email", "message"] as const).find((k) => errs[k]);
    if (first) {
      form.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      setStatus({ kind: "idle" });
      return;
    }

    const endpoint = form.dataset.endpoint ?? "";
    const key = form.dataset.key ?? "";
    const canSend = key !== "" || (endpoint !== "" && !endpoint.includes("web3forms.com"));
    if (!canSend) {
      const href = mailtoFor(v);
      setStatus({ kind: "mail-app", href });
      window.location.href = href;
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(key ? { access_key: key } : {}),
          subject: `${site.projectSubject} from ${v.name}`,
          from_name: `${site.name} website`,
          name: v.name,
          email: v.email,
          replyto: v.email,
          brand: v.brand,
          kind_of_email: v.types.join(", "),
          timing: v.timeline,
          message: v.message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; ok?: boolean };
      if (!res.ok || json.success === false) throw new Error(`HTTP ${res.status}`);
      setStatus({ kind: "sent", name: v.name, email: v.email });
      setBanner(true);
      form.reset();
    } catch {
      setStatus({ kind: "error", href: mailtoFor(v) });
    }
  };

  if (status.kind === "sent") {
    return (
      <>
        {banner ? <SentBanner name={status.name} onClose={hideBanner} /> : null}
        <div ref={cardRef} className="on-light flex min-h-[420px] flex-col items-start justify-center rounded-[28px] bg-white p-8 text-ink shadow-[0_40px_100px_-40px_rgba(10,0,60,0.7)] sm:p-10">
          <span className="grid size-12 place-items-center rounded-full bg-go/15 text-[#13723a]">
            <Check aria-hidden className="size-6" strokeWidth={2.5} />
          </span>
          <h3 ref={sentRef} tabIndex={-1} className="mt-6 text-2xl font-semibold tracking-[-0.03em] outline-none">
            Message sent successfully.
          </h3>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink-2">
            {status.name ? `Thanks, ${status.name}. ` : "Thanks. "}Your message has reached {site.email}.
            {status.email ? ` I’ll reply to ${status.email} as soon as possible.` : " I’ll reply as soon as possible."}
          </p>
          <button
            type="button"
            onClick={() => {
              setBanner(false);
              setStatus({ kind: "idle" });
            }}
            className="btn mt-8 inline-flex h-11 items-center rounded-full border border-ink/15 px-5 text-[15px] font-medium text-ink hover:border-ink/30"
          >
            Send another message
          </button>
        </div>
      </>
    );
  }

  const sending = status.kind === "sending";
  const err = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `contact-${k}-error` } : {});

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      data-endpoint={contactForm.endpoint}
      data-key={contactForm.accessKey}
      aria-labelledby="contact-form-h"
      className="on-light rounded-[28px] bg-white p-6 text-ink shadow-[0_40px_100px_-40px_rgba(10,0,60,0.7)] sm:p-8"
    >
      <h3 id="contact-form-h" className="text-xl font-semibold tracking-[-0.02em]">
        Tell me about your project
      </h3>
      <p className="mt-1 text-[15px] text-ink-2">Every field except the first three can stay empty.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={errors.name}>
          <input id="contact-name" name="name" type="text" autoComplete="name" className={clsx(inputCls, "h-12", errors.name ? "border-[#b42318]" : "border-line")} {...err("name")} />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" className={clsx(inputCls, "h-12", errors.email ? "border-[#b42318]" : "border-line")} {...err("email")} />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-message" label="About the email" error={errors.message}>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={4}
            placeholder="What the email is for, who receives it, and anything you already have: brand guide, copy, a link to your current emails."
            className={clsx(inputCls, "resize-y py-3 leading-[1.55]", errors.message ? "border-[#b42318]" : "border-line")}
            {...err("message")}
          />
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="text-[14px] font-medium text-ink">
          Kind of email <span className="font-normal text-ink-3">(optional, pick any)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <label key={t} className="relative cursor-pointer">
              <input type="checkbox" name="types" value={t} className="peer sr-only" />
              <span className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-4 text-[14px] font-medium text-ink-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue peer-focus-visible:ring-offset-2 hover:border-ink/30">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="contact-brand" label="Brand or company" optional>
          <input id="contact-brand" name="brand" type="text" autoComplete="organization" className={clsx(inputCls, "h-12 border-line")} />
        </Field>
        <Field id="contact-timeline" label="When do you need it?" optional>
          <div className="relative">
            <select id="contact-timeline" name="timeline" defaultValue="" className={clsx(inputCls, "h-12 appearance-none border-line pr-10")}>
              <option value="">Choose one</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-ink-3" />
          </div>
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status.kind === "mail-app" ? (
          <p className="mt-6 flex gap-3 rounded-2xl bg-mist p-4 text-[14.5px] leading-[1.55] text-ink-2">
            <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-violet" />
            <span>
              Your email app should now be open with the message written out to {site.email}. Press send there.{" "}
              <a href={status.href} className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                Open it again
              </a>
            </span>
          </p>
        ) : null}
        {status.kind === "error" ? (
          <p role="alert" className="mt-6 rounded-2xl bg-[#fef3f2] p-4 text-[14.5px] leading-[1.55] text-[#7a271a]">
            The message did not send. Try again in a moment, or{" "}
            <a href={status.href} className="font-medium underline underline-offset-2">
              email it to {site.email}
            </a>
            .
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className="btn inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-medium text-white shadow-[0_10px_24px_-10px_rgba(16,12,51,0.6)] hover:bg-[#1d1850] disabled:opacity-70">
          {sending ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
          {sending ? "Sending" : "Send project details"}
          {sending ? null : <ArrowRight aria-hidden className="btn-arrow size-4" />}
        </button>
        <p className="text-[13px] text-ink-3">
          Goes to{" "}
          <a href={`mailto:${site.email}`} className="text-ink-2 underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
