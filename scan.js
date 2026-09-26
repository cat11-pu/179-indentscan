// scan.js：逐行统计（基线：一律给空表）
import { leadingSpaces } from "./count.js";

export function scanIndents(lines) {
  return { per_line: [], histogram: [], deepest: 0 };
}
