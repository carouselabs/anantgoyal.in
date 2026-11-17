// ─────────────────────────────────────────────────────────────────────────
// Every kind of email, in four groups. Each type has a small preview:
//   preview: a project slug in content/projects.ts (its phone screenshot), or
//   mock:    one of the coded mock-ups in components/services/EmailMocks.tsx.
// Add a type by adding a line to a group.
// ─────────────────────────────────────────────────────────────────────────

export type MockId = "ticket" | "winback" | "drip" | "receipt" | "cart" | "flow" | "support" | "internal" | "templates";

export type EmailType = {
  title: string;
  copy: string;
  /** Who it appears to be from, in the preview's header. */
  from: string;
  subject: string;
  preview?: string;
  mock?: MockId;
};

export type EmailGroup = {
  id: string;
  label: string;
  title: string;
  copy: string;
  tone: "canvas" | "lavender" | "night" | "mist";
  types: EmailType[];
};

export const emailGroups: EmailGroup[] = [
  {
    id: "campaigns",
    label: "Marketing",
    title: "Campaigns that sell",
    copy: "One offer, one message and a button people want to press.",
    tone: "canvas",
    types: [
      { title: "Promotional and marketing campaigns", copy: "Sales, offers and seasonal campaigns with an end date that is easy to see.", from: "Farewind", subject: "48 hours only: up to 30% off", preview: "farewind-fare-sale" },
      { title: "E-commerce campaigns", copy: "Product grids, prices and photography laid out to sell, from new arrivals to the last sale of the season.", from: "Brookfold", subject: "The winter edit", preview: "brookfold-winter-edit" },
      { title: "Product launches and announcements", copy: "New products, features and versions, shown at their best on every screen.", from: "Pocketlane", subject: "Budgets you can share", preview: "pocketlane-launch" },
      { title: "Event invitations and follow-ups", copy: "Invitations with the date up front and a clear RSVP, then the thank-you and the recording after.", from: "Design Systems Live", subject: "You're invited: 14 December", mock: "ticket" },
    ],
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    title: "Relationships that last",
    copy: "From the first hello to the email that brings someone back.",
    tone: "lavender",
    types: [
      { title: "Welcome and onboarding", copy: "The first emails after sign-up: what happens next, what to do first and why they joined.", from: "Morrow Roast", subject: "Welcome to the club, Sam", preview: "morrow-welcome" },
      { title: "Newsletters and editorial", copy: "Regular letters people look forward to, with a layout your team can refill every issue.", from: "The Sunday Margin", subject: "Issue 48", preview: "sunday-margin-issue-48" },
      { title: "Retention and re-engagement", copy: "Win-back emails that give quiet customers a real reason to return.", from: "Your brand", subject: "We miss you, Alex", mock: "winback" },
      { title: "Lead nurturing and drip campaigns", copy: "A series that answers questions in the right order, until someone is ready to buy.", from: "Your brand", subject: "Day 3: a five-minute fix", mock: "drip" },
    ],
  },
  {
    id: "automated",
    label: "Automated",
    title: "Emails that send themselves",
    copy: "Triggered by what people do, and designed as carefully as any campaign.",
    tone: "night",
    types: [
      { title: "Transactional emails", copy: "Receipts, invoices and order confirmations that are clear at a glance and still look like you.", from: "Your shop", subject: "Order #4821 confirmed", mock: "receipt" },
      { title: "Abandoned cart", copy: "A friendly reminder of what was left behind, with the way back one tap away.", from: "Brookfold", subject: "You left something behind", mock: "cart" },
      { title: "Personalised and automated sequences", copy: "Emails that change with each person's name, plan, history and behaviour.", from: "Your app", subject: "Hi Priya, here's your next step", mock: "flow" },
      { title: "SaaS product updates and notifications", copy: "Changelogs, usage reports and alerts that look like part of your product.", from: "Graphwell", subject: "What shipped in November", preview: "graphwell-newsletter" },
    ],
  },
  {
    id: "business",
    label: "Service and business",
    title: "The emails that run a business",
    copy: "Support replies, team updates and the templates your people send every day.",
    tone: "mist",
    types: [
      { title: "Customer support and service", copy: "Ticket replies, status updates and satisfaction surveys that feel human.", from: "Support", subject: "Re: Ticket #2291", mock: "support" },
      { title: "Internal and business communication", copy: "Company updates, reports and announcements your team will actually read.", from: "Your company", subject: "All-hands on Friday", mock: "internal" },
      { title: "Custom HTML email templates", copy: "Reusable, coded modules your team rearranges in Mailchimp, Klaviyo, HubSpot or any email platform.", from: "Template library", subject: "Hero, two columns, footer", mock: "templates" },
    ],
  },
];
