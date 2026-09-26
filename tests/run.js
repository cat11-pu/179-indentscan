import assert from "node:assert";
import { leadingSpaces } from "../count.js";
import { scanIndents } from "../scan.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("leadingSpaces returns a number", () => {
  assert.strictEqual(typeof leadingSpaces("  a"), "number");
});

check("scanIndents returns per line list", () => {
  assert.ok(Array.isArray(scanIndents(["a"]).per_line));
});

check("scanIndents returns histogram", () => {
  assert.ok(Array.isArray(scanIndents(["a"]).histogram));
});

check("render counts lines", () => {
  assert.strictEqual(typeof render({ lines: ["a"] }).count, "number");
});

check("render exposes deepest", () => {
  assert.strictEqual(typeof render({ lines: ["a"] }).deepest, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
