// ─────────────────────────────────────────────────────────────────────────
// Email outreach & deliverability: services, workflow and the example
// dashboard. Every number below is illustrative sample data for the
// example dashboard (marked "Example data" on the page), not a client result.
// ─────────────────────────────────────────────────────────────────────────

/** Service 02 in "What I do". */
export const outreachServices = [
  "Cold email infrastructure",
  "Custom sending domains",
  "SPF, DKIM and DMARC",
  "Campaign preparation",
  "Deliverability optimisation",
  "Sending at scale",
  "Monitoring and analytics",
];

/** Service 01 in "What I do". */
export const designServices = [
  "HTML email design",
  "Responsive newsletters",
  "Promotional campaigns",
  "Product announcements",
  "Welcome emails",
  "SaaS and e-commerce templates",
];

/** The infrastructure section: six stages from a new domain to tracked sending. */
export const outreachSteps = [
  { title: "Domain setup", copy: "Separate sending domains that keep your main domain's reputation out of harm's way." },
  { title: "SPF, DKIM and DMARC", copy: "Authentication records, so mailbox providers can check that mail really comes from you." },
  { title: "Sending infrastructure", copy: "Mailboxes, daily limits per mailbox, a tracking domain and webhooks for delivery events." },
  { title: "Warm-up and reputation", copy: "Volume that starts small and grows slowly, with bounces, complaints and blocklists watched along the way." },
  { title: "Campaign preparation", copy: "Verified lists, a plain-text version and copy checked before the first send." },
  { title: "Sending and tracking", copy: "Steady daily volumes, with delivery, bounces, replies and complaints tracked for every campaign." },
];

/** What warm-up is for, said honestly. */
export const warmupNote =
  "Warm-up gives a new domain a steady sending history: a few emails a day at first, more each week, while bounces and complaints are watched. It helps mailbox providers learn your pattern and shows when you're ready to send more. It does not guarantee the inbox.";

/** Section C: email infrastructure and warm-up. */
export const infraCapabilities = [
  "Custom domain configuration",
  "Sending domain setup",
  "SPF, DKIM and DMARC",
  "Sending infrastructure",
  "Domain reputation management",
  "Warm-up schedules",
  "Bounce monitoring",
  "Sending health monitoring",
  "Deliverability optimisation",
];

/** Section B: custom email software. */
export const softwareCapabilities = [
  "Custom sending platforms",
  "Bulk email sending",
  "Campaign management",
  "Tracking and analytics",
  "Delivery and bounce monitoring",
  "Reporting dashboards",
  "Sending domain management",
  "Automation workflows",
  "Email provider and API integrations",
];

/** The software section's workflow. */
export const softwareFlow = ["Connect sending infrastructure", "Create a campaign", "Send emails", "Monitor activity", "Analyse results"];

/** Section D: large-scale outreach. */
export const outreachCapabilities = [
  { title: "Campaign setup", copy: "Audience, offer, copy and schedule agreed before anything is sent." },
  { title: "Bulk sending", copy: "Thousands of emails spread across warmed domains and mailboxes at steady daily volumes." },
  { title: "Personalised outreach", copy: "Merge fields and per-person subjects and bodies, so each email reads like it was written for one person." },
  { title: "Sending domain management", copy: "Each domain's health, limits and authentication kept in one place." },
  { title: "Campaign analytics", copy: "Sent, delivered, opened, clicked and replied, per campaign and per domain." },
  { title: "Delivery monitoring", copy: "Bounces and deferrals caught early, with volumes adjusted before they hurt a domain." },
  { title: "Bounce and unsubscribe management", copy: "Bounced and unsubscribed addresses removed automatically and never emailed again." },
  { title: "Campaign optimisation", copy: "Subject lines, timing and copy improved from what each campaign shows." },
];

/** Shown under the outreach section: sending responsibly. */
export const complianceNote =
  "Every campaign goes to people it is relevant to, follows the email laws that apply to you and your recipients (such as CAN-SPAM, GDPR or PECR), and includes a working unsubscribe link in every email.";

/** The four capability areas at the top of the page. */
export const capabilityAreas = [
  { verb: "Design", title: "Beautiful HTML email experiences", copy: "Newsletters, launches, welcome emails and templates, designed for your brand and coded for every inbox.", href: "#services", cta: "See the email design" },
  { verb: "Build", title: "Custom email software and dashboards", copy: "Your own platform for sending, tracking and reporting, shaped around how your team works.", href: "#software", cta: "See the software" },
  { verb: "Prepare", title: "Build your email infrastructure before you scale", copy: "Sending domains, SPF, DKIM and DMARC, and a warm-up schedule before the first campaign.", href: "#infrastructure", cta: "See the infrastructure" },
  { verb: "Reach", title: "Scalable outreach and campaign management", copy: "Campaigns to thousands of relevant people, with every send managed and tracked.", href: "#outreach", cta: "See the outreach" },
];

/** About. */
export const about = {
  paragraphs: [
    "I like the whole of a problem, not just the part people see. A good email needs a layout that reads well on a phone, and it also needs a domain that mailbox providers trust, software that sends it on time and a dashboard that shows what happened next.",
    "So I work on both sides. I design interfaces and emails, and I build the products and systems behind them, from an AI content studio to custom software that sends and tracks outreach for a client.",
  ],
  skills: ["UI/UX design", "HTML email development", "SaaS products", "Custom email software", "Web applications", "Email infrastructure", "Marketing technology", "Product development"],
};

/** Shown under the outreach section: what authentication does and does not do. */
export const deliverabilityNote =
  "Authentication helps mailbox providers trust your mail, but no setup can guarantee the inbox. Placement also depends on list quality, content, sending volume and how people respond.";

/** Example dashboard data (illustrative). */
export const exampleDashboard = {
  domains: [
    { name: "go.yourbrand.example", status: "Active", tone: "go" as const },
    { name: "hello.yourbrand.example", status: "Warming · day 12 of 21", tone: "warn" as const },
    { name: "team.yourbrand.example", status: "Active", tone: "go" as const },
  ],
  auth: [
    { name: "SPF", detail: "include:_spf.mailhost.example" },
    { name: "DKIM", detail: "2048-bit key, selector s1" },
    { name: "DMARC", detail: "p=quarantine, reports on" },
  ],
  // Emails sent per day over two weeks: a gradual ramp.
  sent: [40, 55, 70, 90, 110, 130, 150, 175, 200, 225, 250, 280, 310, 340],
  delivery: [
    { label: "Delivered", value: "98.2%", share: 98.2, tone: "go" as const },
    { label: "Bounced", value: "1.1%", share: 1.1, tone: "warn" as const },
    { label: "Spam complaints", value: "0.02%", share: 0.02, tone: "bad" as const },
  ],
  bounces: { hard: 6, soft: 9, removed: 6 },
};

/** Process: the two tracks. */
export const processTracks = {
  design: [
    { title: "Understand the brief", copy: "A short call or a written brief: who the email is for, what it should do and what it must include." },
    { title: "Explore the visual direction", copy: "Two or three directions built from your brand: colours, type, imagery and tone. You choose one." },
    { title: "Design the email", copy: "The full email at desktop and phone size, with your real copy, ready for your comments." },
    { title: "Develop responsive HTML", copy: "Hand-coded, table-based HTML with inline styles and fallbacks for Outlook on Windows." },
    { title: "Test email-client compatibility", copy: "Checked in Gmail, Outlook, Apple Mail and Yahoo Mail, on desktop and phone, before you see the final." },
    { title: "Deliver the final template", copy: "Clean HTML and images, ready for Mailchimp, Klaviyo, HubSpot or the platform you already use." },
  ],
  outreach: [
    { title: "Understand the campaign goals", copy: "Who you want to reach, what you offer them, and what a good reply looks like." },
    { title: "Configure sending domains", copy: "Domains and mailboxes set up apart from your main domain, with DNS you keep control of." },
    { title: "Set up authentication", copy: "SPF, DKIM and DMARC records added, then checked until every one passes." },
    { title: "Prepare and validate lists", copy: "Addresses verified, duplicates and risky contacts removed before anything is sent." },
    { title: "Launch responsibly", copy: "Volumes that start small and grow as each domain earns trust with mailbox providers." },
    { title: "Monitor and optimise", copy: "Bounces, replies and complaints tracked, with changes made from what the data shows." },
  ],
};

/** "Why work with me". */
export const reasons = [
  { title: "Creative email design", copy: "Layouts made for your brand and your message, not adapted from a template pack." },
  { title: "Responsive HTML development", copy: "Hand-coded tables and inline styles that hold up in Gmail, Outlook and Apple Mail, on any screen." },
  { title: "Attention to visual detail", copy: "Spacing, type and image crops checked at desktop and phone size before you see them." },
  { title: "Scalable email infrastructure", copy: "Sending domains and mailboxes set up so volume can grow without putting your main domain at risk." },
  { title: "Proper authentication and deliverability", copy: "SPF, DKIM and DMARC done properly, a gradual warm-up and clean lists. No shortcuts that burn a domain." },
  { title: "End-to-end email work", copy: "The design, the code and the sending handled by one person, so nothing gets lost between teams." },
];
