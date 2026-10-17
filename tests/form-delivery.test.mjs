import test from "node:test";
import assert from "node:assert/strict";
import { deliveryKey, deliverEmail } from "../src/lib/form-delivery.ts";
import { submitFormNotification } from "../src/lib/submit-form.ts";
const payload = {
  formType: "Employer Requirement",
  fields: [{ label: "Email", value: "test@example.invalid" }],
};
test("same enquiry keeps its key; changed details change it", () => {
  assert.equal(deliveryKey(payload), deliveryKey(structuredClone(payload)));
  assert.notEqual(deliveryKey(payload), deliveryKey({ ...payload, formType: "Contact" }));
});
test("provider uses stable deduplication keys and requires a receipt", async () => {
  const calls = [];
  const transport = async (url, options) => {
    calls.push({ url, options });
    return Response.json({ id: "receipt-1" });
  };
  const key = deliveryKey(payload) + "/notification";
  assert.equal(
    await deliverEmail("test-key", { to: "test@example.invalid" }, key, transport),
    "receipt-1",
  );
  await deliverEmail("test-key", { to: "test@example.invalid" }, key, transport);
  assert.equal(calls[0].options.headers["Idempotency-Key"], key);
  assert.equal(calls[0].options.body, calls[1].options.body);
  await assert.rejects(
    deliverEmail("test", {}, key, async () =>
      Response.json({ name: "rate_limit_exceeded" }, { status: 429 }),
    ),
  );
  await assert.rejects(deliverEmail("test", {}, key, async () => Response.json({})));
});
test("overlapping clicks share one request and success requires a receipt", async () => {
  const original = global.fetch;
  let release,
    calls = 0;
  global.fetch = async () => {
    calls++;
    await new Promise((r) => {
      release = r;
    });
    return Response.json({ success: true, receipt: "one" });
  };
  try {
    const a = submitFormNotification(payload),
      b = submitFormNotification(payload);
    assert.equal(calls, 1);
    release();
    await Promise.all([a, b]);
    global.fetch = async () => Response.json({ success: true });
    await assert.rejects(submitFormNotification(payload), /could not confirm/);
  } finally {
    global.fetch = original;
  }
});
test("transient failure retries same payload; permanent rejection does not retry", async () => {
  const original = global.fetch;
  let bodies = [];
  global.fetch = async (url, options) => {
    bodies.push(options.body);
    return bodies.length === 1
      ? Response.json({}, { status: 503 })
      : Response.json({ success: true, receipt: "same" });
  };
  try {
    await submitFormNotification(payload);
    assert.equal(bodies.length, 2);
    assert.equal(bodies[0], bodies[1]);
    let calls = 0;
    global.fetch = async () => {
      calls++;
      return Response.json({}, { status: 400 });
    };
    await assert.rejects(submitFormNotification(payload));
    assert.equal(calls, 1);
  } finally {
    global.fetch = original;
  }
});
