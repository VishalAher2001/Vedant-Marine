import test from "node:test";
import assert from "node:assert/strict";

import { createMailtoHref, getExternalLinkProps } from "./security.ts";

test("createMailtoHref strips unsafe characters and keeps valid mailto links", () => {
  const href = createMailtoHref("mahesh@vedantgroup.org", "Quote request: A&B", "Hello\n<script>alert(1)</script>");

  assert.equal(href.startsWith("mailto:mahesh@vedantgroup.org?"), true);
  assert.ok(href.includes("subject=Quote+request%3A+A%26B") || href.includes("subject=Quote%20request%3A%20A%26B"));
  assert.doesNotMatch(href, /<script>/i);
});

test("getExternalLinkProps hardens window.open links", () => {
  assert.deepEqual(getExternalLinkProps(), {
    target: "_blank",
    rel: "noopener noreferrer nofollow",
  });
});
