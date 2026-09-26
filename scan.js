// scan.js：逐行统计行首缩进，返回 per_line、histogram（下标即缩进格数）与 deepest。
import { leadingSpaces } from "./count.js";

export function scanIndents(lines) {
  const perLine = new Array(lines.length);
  let deepest = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.includes("\t")) {
      const error = new Error("tab character found at line " + index);
      error.code = "E_TAB_FOUND";
      throw error;
    }
    const indent = leadingSpaces(line);
    perLine[index] = indent;
    if (indent > deepest) {
      deepest = indent;
    }
  }
  const histogram = new Array(deepest + 1).fill(0);
  for (const indent of perLine) {
    histogram[indent] += 1;
  }
  return { per_line: perLine, histogram: histogram, deepest: deepest };
}
