// "Before" versions: the same message as each sample email, sent the way most
// teams send it today (default font, blue links, no layout). Used by the
// before/after comparisons on the site.
//
// Line types:  "# text" = the opening line in bold   "@ label | href" = a bare link

import { esc } from "./lib.mjs";

export const PLAIN = {
  "graphwell-newsletter": [
    "Hi there,",
    "# November product update",
    "This month we added written summaries to every chart in Graphwell, so you can see what changed and why without digging through the numbers.",
    "We also shipped scheduled reports (send a dashboard every Monday at 9:00 as a PDF or a link) and alerts in Slack when a metric crosses a limit you set.",
    "Coming in December: goals on charts, a shared notes panel and CSV export for every table.",
    "@ See what's new | https://graphwell.example/whats-new",
    "@ Read the changelog | https://graphwell.example/changelog",
    "Thanks,\nThe Graphwell team",
    "Unsubscribe: https://graphwell.example/unsubscribe",
  ],
  "brookfold-winter-edit": [
    "Hello,",
    "# Winter sale: 25% off",
    "Our winter edit is on now. Throws, lamps and stoneware are 25% off until Sunday at midnight.",
    "Ceramic table lamp $96 (was $128). Enamel breakfast set $63 (was $84). Stoneware serving bowl $34 (was $46). Small dipping bowls, set of 4, $28 (was $38).",
    "Use code WINTER25 at checkout. Free delivery on orders over $80.",
    "@ Shop the edit | https://brookfold.example/winter",
    "Brookfold",
    "Unsubscribe: https://brookfold.example/unsubscribe",
  ],
  "pocketlane-launch": [
    "Hi,",
    "# Pocketlane 3.0 is out",
    "Version 3.0 adds shared budgets, bill splitting and a monthly recap.",
    "Shared budgets: invite your partner or flatmates and see the same numbers. Split bills: add a bill, pick who was there and send requests. Monthly recap: a summary of where the money went, on the first of the month.",
    "The update is free on iPhone and Android.",
    "@ Update the app | https://pocketlane.example/update",
    "The Pocketlane team",
    "Unsubscribe: https://pocketlane.example/unsubscribe",
  ],
  "farewind-fare-sale": [
    "Hello,",
    "# Spring fare sale: up to 30% off",
    "For the next 48 hours, flights and stays for April and May are up to 30% off. The sale ends Sunday at 23:59.",
    "Lisbon from $289 (3 nights). Bergen from $412 (4 nights). Madeira from $468 (5 nights). Fares are per person, return.",
    "Free changes up to 14 days before you leave.",
    "@ See all deals | https://farewind.example/sale",
    "The Farewind team",
    "Unsubscribe: https://farewind.example/unsubscribe",
  ],
  "morrow-welcome": [
    "Hi Sam,",
    "# Welcome to Morrow Roast Club",
    "Thanks for joining. Your first bag ships on Monday, roasted the Friday before.",
    "To get started: 1) pick your grind, 2) choose how often you want a delivery, 3) rate each bag so the next roast suits you better.",
    "@ Set up my first delivery | https://morrowroast.example/account/setup",
    "We also wrote a four-minute pour-over guide that works with any bag we send.",
    "@ Read the guide | https://morrowroast.example/brew/pour-over",
    "Morrow Roast",
  ],
  "sunday-margin-issue-48": [
    "The Sunday Margin, issue 48",
    "# The case for reading one book slowly",
    "We finished fewer books this year and remembered more of them. This week's essay is a short argument for a slower reading pace.",
    "@ Continue reading | https://sundaymargin.example/48/one-book-slowly",
    "Also this week: six short novels for long evenings, keeping a reading notebook, and your replies about where you read on Sundays.",
    "Next week is our first guest essay. Reply and tell us about a book you keep coming back to.",
    "Unsubscribe: https://sundaymargin.example/unsubscribe",
  ],
  "tandemly-early-access": [
    "Hi,",
    "# Tandemly early access is open",
    "Tandemly plans your team's meetings for you. Tell it who needs to meet and how much focus time each person wants, and it finds the slots and books the rooms.",
    "Teams who join before 30 November get three months free. No card needed until the trial ends.",
    "@ Claim early access | https://tandemly.example/early-access",
    "Setup takes an afternoon: connect calendars, set the rules, let it plan.",
    "The Tandemly team",
    "Unsubscribe: https://tandemly.example/unsubscribe",
  ],
};

export function plainHtml(slug, subject, preheader = "") {
  // Designs without a written plain version get a short one from their subject.
  const lines = PLAIN[slug] ?? ["Hi,", `# ${subject}`, preheader, "@ View this email online | https://example.com/view", "Unsubscribe: https://example.com/unsubscribe"].filter(Boolean);
  const p = (inner) => `<p style="margin:0 0 14px 0;">${inner}</p>`;
  const body = lines
    .map((l) => {
      if (l.startsWith("# ")) return p(`<b>${esc(l.slice(2))}</b>`);
      if (l.startsWith("@ ")) {
        const [label, href] = l.slice(2).split("|").map((s) => s.trim());
        return p(`<a href="${href}" style="color:#1155CC;text-decoration:underline;">${esc(label)}</a>`);
      }
      return p(esc(l).replace(/\n/g, "<br>"));
    })
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:24px 20px;background:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#222222;">
<div style="max-width:640px;">
${body}
</div>
</body></html>
`;
}
