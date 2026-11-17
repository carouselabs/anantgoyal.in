# Anant Goyal: email design and outreach

A one-page site for two services, HTML email design and development, and email outreach and deliverability: Next.js 16 (static
export), React 19, Tailwind CSS 4, Framer Motion and Lucide. The six emails
shown on the site are real, table-based HTML emails built from `emails/`. The outreach dashboard shows illustrative example data, labelled as such on the page.

## Run it

```powershell
cd C:\Users\anant\email-studio
npm install          # first time only
npm run dev          # http://localhost:3000
```

## Make it yours

| What | Where |
| --- | --- |
| Your name, email, availability, social links, domain | `content/site.ts` |
| Projects in "Selected work" and the studio | `content/projects.ts` |
| The kinds of email in the services section | `content/services.ts` |
| Software, infrastructure and outreach copy, the example dashboard numbers, both process tracks, About | `content/outreach.ts` |
| Your photo (avatar + cut-out) | replace `assets/anant-goyal.png` (transparent background), then `node scripts/make-portrait.mjs` |
| Colours, fonts, 3D objects, motion | `app/globals.css`, `app/layout.tsx` |

Social links with an empty `href` are hidden, so add your profile URLs there.

### The contact form

The form at the bottom of the page (and every "Start a project" button) sends
enquiries to `hello@anantgoyal.in`. This is a static site with no server, so
delivery goes through a form service:

1. Go to https://web3forms.com, enter hello@anantgoyal.in, and copy the access
   key they email you.
2. Paste it into `contactForm.accessKey` in `content/site.ts`, then rebuild.

From then on, messages arrive in your inbox and Reply goes to the visitor.
Until a key is set, pressing Send opens the visitor's own email app with the
message already written and addressed to you, so nothing is lost. (Formspree
works as well: put your form URL in `contactForm.endpoint` and leave the key
empty.) Once a key is set, visitors' answers pass through that service on the
way to you.

### Add a design to the email design library (/email-design)

A design is two small pieces:

1. **Its HTML**: write it in any file in `emails/templates/` (one email per file, or several with
   `export const emails = [{ meta, html }, ...]`), using the email-safe helpers in `emails/lib.mjs`.
   Pictures it needs go through `scripts/render-email-art.mjs` (photo crops and coded scenes).
2. **Its entry**: add an object to `projects/email-design/library.ts` with the same `slug`, a title,
   summary, `collection`, `purposes`, `aesthetics`, `industries`, subject and modules.

Then run:

```powershell
npm run emails          # build HTML, render art, shoot desktop/mobile/plain previews
npm run emails:test     # size, Outlook buttons, alt text, rendering at 320-680px
npm run build           # the library, search, filters and /email-design/<slug>/ update by themselves
```

New collections, purposes, styles or industries are one line each in `projects/types.ts`. The library
shows 12 designs at a time with "Show more", and all filters live in the URL
(`/email-design/?collection=social&style=dark`), so it stays fast as it grows.

### The kinds of email on the homepage

`content/services.ts` lists every kind of email in four groups. Add a line to a group to add a kind;
give it a `preview` (a design's slug) or one of the coded mock-ups in `components/services/EmailMocks.tsx`.

### Replace the sample projects with your own work

The seven projects are designs for fictional brands, made for this site. For each
real project:

1. Put the email's HTML in `public/emails/<slug>.html` (images in `public/emails/img/`).
2. Optionally a plain "before" version at `public/emails/<slug>-plain.html`.
3. Add it to `public/emails/manifest.json` (`slug`, `from`, `subject`, `preheader`).
4. `npm run emails:build` makes the link-free preview copies the site shows
   (`public/emails/preview/`), then `npm run emails:previews` screenshots the
   desktop, mobile and plain versions into `public/previews/`.
5. Edit the entry in `content/projects.ts`.

To change one of the sample emails instead, edit `emails/templates/<name>.mjs`
and run `npm run emails` (builds the HTML, renders the artwork, re-shoots the
previews).

## The emails

`emails/lib.mjs` holds the email-safe building blocks every template uses:
table layout with `role="presentation"`, inline styles, a 600px container with
Outlook ghost tables, hybrid columns that stack without media queries, VML
buttons for Outlook on Windows, and JPG images with width and alt text.

`npm run emails:test` checks every built email (size under Gmail's 102 KB
clipping limit, no scripts, forms or SVG, no flex/grid or positioning, alt and
width on every image, one VML fallback per button) and renders each one at
320, 375, 600 and 680px in Chromium (no sideways scroll, no broken images,
columns stack on phones).

That is not a substitute for real inboxes: Outlook for Windows renders with
Word, and Gmail rewrites CSS. Before a real send, test the file in Litmus or
Email on Acid, or send test copies to Gmail, Outlook and Apple Mail. The image
paths in the built files are relative (`img/…`): upload the images to your
email platform or a CDN and use absolute URLs when you send.

## Check and build

```powershell
npm run check        # ESLint + TypeScript
npm run build        # static site in out/ (also flattens Next's prefetch files, see scripts/fix-export.mjs)
npm test             # email checks + site smoke test (needs a build first)
npx serve out        # preview the built site
```

`out/` is plain HTML, CSS and JS, so it deploys to any static host (Vercel,
Netlify, Cloudflare Pages, GitHub Pages).

## Credits

Photographs inside the sample emails come from Unsplash and Wikimedia Commons
(list on `/credits/`, data in `content/photo-credits.json`). Email client
logos come from Gil Barbara's SVG Logos (CC0) and VSCode Icons (MIT); product
names and logos are trademarks of their owners.
