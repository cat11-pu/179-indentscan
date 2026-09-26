// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "行 " + (spec.lines || []).length + " 条，点统计看缩进分布。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.per_line.forEach(function (count, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, count)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "缩进 " + count + " 格";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最深 " + view.deepest + " 格，直方图 " + JSON.stringify(view.histogram);
    parts.log.textContent = "行数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "统计缩进";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一行带缩进";
  addButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).concat(["      deep"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一行";
  dropButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一行";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "  two";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { lines: (spec.lines || []).concat([box.value]) }));
      parts.out.textContent = box.value + " 缩进 " + view.per_line[view.per_line.length - 1] + " 格";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最深";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最深 " + view.deepest + " 格，行数 " + view.count;
  });
  parts.controls.appendChild(readButton);

  draw();
}
