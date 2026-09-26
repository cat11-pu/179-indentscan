// app.js：渲染结果
import { leadingSpaces } from "./count.js";
import { scanIndents } from "./scan.js";

export function render(spec) {
  const lines = spec.lines || [];
  const view = scanIndents(lines);
  const perLine = view.per_line || [];
  return { per_line: perLine, histogram: view.histogram || [], deepest: view.deepest || 0,
           count: perLine.length, total: perLine.reduce((sum, item) => sum + item, 0) };
}
