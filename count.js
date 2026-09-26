// count.js：数一行行首连续空格；整行皆空格按整行长度算，空行给零。
export function leadingSpaces(line) {
  let count = 0;
  while (count < line.length && line[count] === " ") {
    count += 1;
  }
  return count;
}
