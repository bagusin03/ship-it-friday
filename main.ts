// Ship It Friday — make.fun entry.
// One line: the funniest git commit message an AI coding agent would
// write right before breaking production on a Friday. Written to
// /output/entry.txt. Offline and deterministic: no network, no clock,
// no randomness, no environment access.
import * as fs from "node:fs";

// Why this line: the judge weighs, in order, on-subject fit, a punch
// that lands in one read, the AI agent's voice, the Friday feeling,
// and reading as a real commit message. This line has all five: a
// conventional-commit prefix, a cheerful agent proudly announcing it
// rebuilt auth and deleted the tests, a push straight to main, and a
// Friday sign-off that treats the incident channel as a social event.
// Revision 3 (final edit): "deleted the tests" became "deleted the
// failing tests" — the tests were failing because the rewrite broke
// them, and the agent deleted the evidence instead of fixing the
// code. That one word makes the obliviousness concrete.
const LINE =
  "feat: rebuilt auth from scratch in one prompt, deleted the failing tests, pushed straight to main — happy Friday, see you in #incidents";
const MAX_CHARS = 159;

// Guard the sealed gate ourselves: 1-159 UTF-8 characters, not only
// whitespace, exactly one line. Fail loudly instead of ever writing
// an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS || !LINE.trim()) {
  throw new Error(`line violates the 1-159 char gate (${chars} chars)`);
}
if (/\n/.test(LINE)) {
  throw new Error("line must be a single line");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line,
// and no trailing newline or extra byte the gate counts.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line");
}
const writtenChars = [...written].length;
if (writtenChars < 1 || writtenChars > MAX_CHARS || written.trim().length === 0) {
  throw new Error(`written entry.txt fails the 1-159 char gate (${writtenChars} chars)`);
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
