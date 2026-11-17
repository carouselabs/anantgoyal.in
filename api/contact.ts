// POST /api/contact: the contact form's server side, run as a Vercel Function.
//
// Checks the message, drops bots, limits repeat sends, then hands it to Resend,
// which delivers it to the inbox with Reply-To set to the visitor. The Resend
// key never reaches the browser.
//
// Environment (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   required. A Resend key allowed to send from anantgoyal.in.
//   CONTACT_TO       optional. Default hello@anantgoyal.in.
//   CONTACT_FROM     optional. Default "Anant Goyal website <form@anantgoyal.in>".

const TO = process.env.CONTACT_TO || "hello@anantgoyal.in";
const FROM = process.env.CONTACT_FROM || "Anant Goyal website <form@anantgoyal.in>";
const SUBJECT = "New email project";

// Only this site's pages may post here (browsers always send Origin on fetch).
const ORIGINS = [/^https:\/\/(www\.)?anantgoyal\.in$/, /^https:\/\/anantgoyal(-[a-z0-9-]+)?\.vercel\.app$/, /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 200, brand: 150, kind_of_email: 300, timing: 100, message: 5000 } as const;
type Field = keyof typeof LIMITS;

// Best effort: a few sends per address per 10 minutes on each running instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();
function tooMany(ip: string, now: number) {
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
// Header-safe: no line breaks in anything that becomes part of the subject.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export type ContactInput = Partial<Record<Field | "website", unknown>>;

/** Clean and check what the form sent. Returns the fields, or a reason. */
export function readMessage(input: ContactInput): { ok: true; v: Record<Field, string> } | { ok: false; error: string } {
  const v = {} as Record<Field, string>;
  for (const k of Object.keys(LIMITS) as Field[]) {
    const raw = typeof input[k] === "string" ? (input[k] as string) : "";
    v[k] = (k === "message" ? raw : oneLine(raw)).trim();
    if (v[k].length > LIMITS[k]) return { ok: false, error: `${k} is too long` };
  }
  if (!v.name) return { ok: false, error: "name is required" };
  if (!EMAIL_RE.test(v.email)) return { ok: false, error: "email is not valid" };
  if (v.message.length < 10) return { ok: false, error: "message is too short" };
  return { ok: true, v };
}

/** The email that lands in the inbox. */
export function buildEmail(v: Record<Field, string>) {
  const rows: [string, string][] = [
    ["Name", v.name],
    ["Email", v.email],
    ["Brand or company", v.brand],
    ["Kind of email", v.kind_of_email],
    ["Timing", v.timing],
  ];
  const filled = rows.filter(([, val]) => val);
  const text = [...filled.map(([k, val]) => `${k}: ${val}`), "", v.message, "", "Reply to this email to answer them directly."].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#100c33;max-width:600px">
<h2 style="font-size:20px;margin:0 0 16px">${escapeHtml(SUBJECT)} from ${escapeHtml(v.name)}</h2>
<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px">${filled
    .map(([k, val]) => `<tr><td style="padding:4px 16px 4px 0;color:#5c5884;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(val)}</td></tr>`)
    .join("")}</table>
<div style="white-space:pre-wrap;padding:16px;background:#f4f2ff;border-radius:12px">${escapeHtml(v.message)}</div>
<p style="color:#5c5884;font-size:13px;margin:20px 0 0">Sent from the contact form on anantgoyal.in. Reply to this email to answer ${escapeHtml(v.name)} directly.</p>
</div>`;
  return { from: FROM, to: [TO], reply_to: v.email, subject: `${SUBJECT} from ${v.name}`, text, html };
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin") ?? "";
  if (!ORIGINS.some((re) => re.test(origin))) return json(403, { success: false, error: "not allowed" });

  const raw = await request.text();
  if (raw.length > 20_000) return json(413, { success: false, error: "too large" });
  let input: ContactInput;
  try {
    input = JSON.parse(raw) as ContactInput;
  } catch {
    return json(400, { success: false, error: "bad request" });
  }

  // The hidden field only bots fill in: say yes, send nothing.
  if (typeof input.website === "string" && input.website.trim() !== "") return json(200, { success: true });

  const checked = readMessage(input);
  if (!checked.ok) return json(400, { success: false, error: checked.error });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (tooMany(ip, Date.now())) return json(429, { success: false, error: "too many messages, try again later" });

  const key = process.env.RESEND_API_KEY;
  if (!key) return json(503, { success: false, error: "email is not set up yet" });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(buildEmail(checked.v)),
  }).catch(() => null);
  if (!res || !res.ok) {
    // Logged for Vercel's function logs; the visitor gets a plain failure.
    console.error("contact: resend failed", res?.status, res ? (await res.text().catch(() => "")).slice(0, 300) : "network error");
    return json(502, { success: false, error: "could not send" });
  }
  return json(200, { success: true });
}

export function GET(): Response {
  return json(405, { success: false, error: "use POST" });
}
