// ─────────────────────────────────────────────────────────────────────────
// Your details. Everything personal on the site comes from this file.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  /** Shown in the nav, footer and page title. */
  name: "Anant Goyal",
  /** Your photo: avatar in the nav and hero, cut-out in the contact section (made by scripts/make-portrait.mjs). */
  avatar: "/images/anant-goyal-avatar.webp",
  portrait: "/images/anant-goyal.webp",
  /** One line under the name in the footer and in search results. */
  role: "Email design, email software and outreach",
  /** Where project enquiries go: the contact form, the email link and "Copy email". */
  email: "hello@anantgoyal.in",
  /** Subject line of enquiries. */
  projectSubject: "New email project",
  /** Your live domain, for search engines and share previews. */
  url: "https://anantgoyal.in",
  /** The small indicator in the hero. Set `open: false` when you're fully booked. */
  availability: { open: true, label: "Available for new projects" },
  /** Add the profiles you want to show. Links with an empty href are hidden. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anantgoyal45/" },
    { label: "Dribbble", href: "" },
    { label: "Behance", href: "" },
    { label: "Instagram", href: "" },
    { label: "X", href: "" },
  ],
};

/**
 * The contact form.
 *
 * Messages go to this site's own server function, `api/contact.ts` (a Vercel
 * Function), which sends them through Resend to hello@anantgoyal.in with Reply
 * going straight to the visitor. It needs RESEND_API_KEY set in Vercel; until
 * then a send fails and the visitor is offered a plain email link instead.
 *
 * A form service works too: set `endpoint` to its URL (Web3Forms also needs
 * `accessKey`). With `endpoint` empty, sending opens the visitor's own email
 * app with the message already written and addressed to you.
 */
export const contactForm = {
  endpoint: "/api/contact/",
  accessKey: "",
};

/** True when the form can deliver by itself (a key, or a non-Web3Forms endpoint). */
export const formCanSend = contactForm.accessKey.trim() !== "" || (contactForm.endpoint.trim() !== "" && !contactForm.endpoint.includes("web3forms.com"));

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.projectSubject)}`;
export const visibleSocials = site.socials.filter((s) => s.href.trim() !== "");

/** The kinds of email a visitor can tick in the form. */
export const PROJECT_TYPES = [
  "Newsletter",
  "Promotional email",
  "Product launch",
  "Welcome email",
  "SaaS campaign",
  "E-commerce email",
  "Custom templates",
  "Not sure yet",
];

export const TIMELINES = ["As soon as possible", "Within a month", "In 1 to 3 months", "No fixed date"];
