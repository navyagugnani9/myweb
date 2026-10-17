import test from "node:test";
import assert from "node:assert/strict";
import app from "../.vercel/output/functions/__server.func/index.mjs";
process.env.RESEND_API_KEY = "local-test-only";
const body = {
  formType: "Employer Requirement",
  fields: [
    { label: "Email", value: "test@example.invalid" },
    { label: "Organization", value: "LOCAL AUTOMATED TEST" },
  ],
};
const submit = (data = body) =>
  app.fetch(
    new Request("http://localhost/api/public/form-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  );
test("built route validates, keeps retry payload stable, and isolates confirmation failure", async () => {
  const original = global.fetch;
  const messages = new Map();
  let calls = [];
  let failConfirmation = false,
    failNotification = false;
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    const key = options.headers["Idempotency-Key"];
    const email = JSON.parse(options.body);
    calls.push({ key, email });
    assert.ok(email.reply_to);
    assert.equal(email.replyTo, undefined);
    if (failNotification && key.endsWith("/notification"))
      return Response.json({ name: "rate_limit_exceeded" }, { status: 429 });
    if (failConfirmation && key.endsWith("/confirmation"))
      throw new TypeError("simulated network loss");
    if (messages.has(key)) assert.equal(messages.get(key).body, options.body);
    else messages.set(key, { body: options.body, id: `mock-${messages.size + 1}` });
    return Response.json({ id: messages.get(key).id });
  };
  try {
    assert.equal((await submit({})).status, 400);
    assert.equal(calls.length, 0);
    const first = await submit();
    assert.equal(first.status, 200);
    const receipt = await first.json();
    assert.ok(receipt.receipt);
    const retry = await submit();
    assert.deepEqual(await retry.json(), receipt);
    assert.equal(messages.size, 2);
    failConfirmation = true;
    const confirmed = await submit({
      ...body,
      fields: [...body.fields, { label: "Role", value: "Changed role" }],
    });
    assert.equal(confirmed.status, 200);
    assert.equal((await confirmed.json()).success, true);
    failNotification = true;
    assert.equal((await submit()).status, 503);
  } finally {
    global.fetch = original;
  }
});

test('rendered pages select responsive compressed hero images', async () => {
  for (const [route, image] of [['/', 'homepage-hero'], ['/for-employers', 'candidate-sourcing']]) {
    const response = await app.fetch(new Request(`http://localhost${route}`));
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(`${image}-768.webp 768w`));
    assert.ok(html.includes(`${image}-1536.webp 1536w`));
    assert.ok(!html.includes(`${image}.png`));
  }
});
