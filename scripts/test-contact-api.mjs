// Tests the contact form's server function (api/contact.ts) without sending
// any email: Resend is replaced by a fake fetch.
//
//   node scripts/test-contact-api.mjs
import { POST, GET, readMessage, buildEmail } from "../api/contact.ts";

let failures = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "ok  " : "FAIL"} ${msg}`);
  if (!ok) failures++;
};

const good = { name: "Test Person", email: "test@example.com", brand: "Acme", kind_of_email: "Newsletter", timing: "This month", message: "A monthly newsletter for our customers." };
let ipCounter = 0;
const req = (body, { origin = "https://anantgoyal.in", ip } = {}) =>
  new Request("https://anantgoyal.in/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...(origin ? { origin } : {}), "x-forwarded-for": ip ?? `10.0.0.${++ipCounter}` },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

// A fake Resend: records what it was asked to send.
let sent = [];
let resendStatus = 200;
globalThis.fetch = async (url, init) => {
  sent.push({ url: String(url), init });
  return new Response(JSON.stringify(resendStatus === 200 ? { id: "test" } : { message: "nope" }), { status: resendStatus });
};

// Checking the message.
check(readMessage(good).ok, "a complete message passes");
check(readMessage({ ...good, name: "" }).error === "name is required", "a name is required");
check(readMessage({ ...good, email: "not-an-email" }).error === "email is not valid", "the email address must look real");
check(readMessage({ ...good, message: "hi" }).error === "message is too short", "the message needs a few words");
check(readMessage({ ...good, message: "x".repeat(5001) }).error === "message is too long", "very long messages are refused");
check(readMessage({ ...good, name: 42 }).error === "name is required", "non-text fields count as empty");
const oneLine = readMessage({ ...good, name: "Test\r\nBcc: someone@example.com" });
check(oneLine.ok && !/[\r\n]/.test(oneLine.v.name), "line breaks are taken out of the name (no header tricks)");

// The email itself.
const mail = buildEmail({ ...readMessage(good).v, name: "<b>Eve</b>", message: "<script>alert(1)</script> hello there" });
check(mail.to.length === 1 && mail.to[0] === "hello@anantgoyal.in", "it goes to hello@anantgoyal.in");
check(mail.from.endsWith("@anantgoyal.in>"), `it is sent from anantgoyal.in (${mail.from})`);
check(mail.reply_to === "test@example.com", "Reply goes straight to the visitor");
check(mail.subject === "New email project from <b>Eve</b>", "the subject names the sender");
check(!mail.html.includes("<script>") && mail.html.includes("&lt;script&gt;") && !mail.html.includes("<b>Eve</b>"), "anything typed in is escaped in the HTML version");
check(mail.text.includes("Kind of email: Newsletter") && mail.text.includes("Brand or company: Acme") && mail.text.includes("hello there"), "the text version carries the answers and the message");

// The endpoint.
delete process.env.RESEND_API_KEY;
let r = await POST(req(good, { origin: "https://evil.example" }));
check(r.status === 403, "other websites cannot post to it");
r = await POST(req(good, { origin: null }));
check(r.status === 403, "requests without an Origin are refused");
r = await POST(req("{not json"));
check(r.status === 400, "broken JSON is refused");
r = await POST(req("x".repeat(20_001)));
check(r.status === 413, "oversized requests are refused");
sent = [];
r = await POST(req({ ...good, website: "spam.example" }));
check(r.status === 200 && (await r.json()).success === true && sent.length === 0, "a bot that fills the hidden field is told yes and nothing is sent");
r = await POST(req({ ...good, email: "nope" }));
check(r.status === 400 && (await r.json()).error === "email is not valid", "invalid messages say why");
r = await POST(req(good));
check(r.status === 503 && sent.length === 0, "without RESEND_API_KEY it fails plainly and sends nothing");

process.env.RESEND_API_KEY = "re_test_key";
sent = [];
r = await POST(req(good, { origin: "https://www.anantgoyal.in" }));
const call = sent[0];
const body = call ? JSON.parse(call.init.body) : {};
check(r.status === 200 && (await r.json()).success === true, "a good message is accepted");
check(sent.length === 1 && call.url === "https://api.resend.com/emails" && call.init.headers.Authorization === "Bearer re_test_key", "it is handed to Resend with the key");
check(body.reply_to === "test@example.com" && body.to[0] === "hello@anantgoyal.in" && body.text.includes("A monthly newsletter"), "Resend gets the right addresses and the message");
check(r.headers.get("cache-control") === "no-store", "answers are never cached");

resendStatus = 500;
const realError = console.error;
console.error = () => {};
r = await POST(req(good));
console.error = realError;
check(r.status === 502 && (await r.json()).success === false, "if Resend fails, the form is told it did not send");
resendStatus = 200;

const statuses = [];
for (let i = 0; i < 6; i++) statuses.push((await POST(req(good, { ip: "203.0.113.9" }))).status);
check(statuses.slice(0, 5).every((s) => s === 200) && statuses[5] === 429, `one address can send five in ten minutes, then waits (${statuses.join(",")})`);

check(GET().status === 405, "GET is refused");

console.log(failures ? `\n${failures} failure(s)` : "\nall contact API checks passed");
process.exit(failures ? 1 : 0);
