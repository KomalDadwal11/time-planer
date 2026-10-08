const seenTasks = new Set();

function TaskCard(task, index, count, actions) {
  const offset = ((toMinutes(task.time) % 60) / 60) * 100;
  const height = (task.duration / 60) * 100;
  const width = 100 / count;
  const classes = ["task"];
  if (task.done) classes.push("done");
  if (task.duration < 60) classes.push("compact");
  if (!seenTasks.has(task.id)) classes.push("enter");
  seenTasks.add(task.id);

  const action =(label, title, handler) =>
    h("button", { class: "icon-btn", title, onClick: e => { e.stopPropagation(); handler(); } }, label);

  return h("div", {
    class: classes.join(" "),
    draggable: "true",
    title: `${task.title} · ${task.time} · ${formatDuration(task.duration)}`,
    style: `top:${offset}%;height:calc(${height}% - 2px);left:calc(${index * width}% + 2px);width:calc(${width}% - 4px);--accent:${SUBJECTS[task.subject]}`,
    onDragstart: e => {
      e.dataTransfer.setData("text/plain", task.id);
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() =>document.body.classList.add("dragging"), 0);
    },
    onDragend: () =>document.body.classList.remove("dragging")
  },
    h("span", {class: `dot p-${task.priority.toLowerCase()}` }),
    h("div", {class: "task-body" },
      h("strong", {}, task.title),
      h("small", {}, `${task.time} · ${task.subject}`)),
    h("div", { class: "task-actions" },
      action(task.done ? "↺" : "✓", task.done ? "Mark pending" : "Complete", () => actions.toggle(task.id)),
      action("✎", "Edit", () =>actions.edit(task.id)),
      action("✕", "Delete", () =>actions.remove(task.id))));
}

function Cell(tasks, actions, day, hour) {
  const here = tasks.filter(task =>task.day === day && Math.floor(toMinutes(task.time) / 60) ===hour);
  const cell = h("div",{
    class: "cell",
    onDragover: e =>{
      e.preventDefault();
      cell.classList.add("over");
    },
    onDragleave: () =>cell.classList.remove("over"),
    onDrop: e => {
      e.preventDefault();
      cell.classList.remove("over");
      document.body.classList.remove("dragging");
      const id =e.dataTransfer.getData("text/plain");
      if (id) actions.move(id, day, hour);
    }
  }, here.map((task, i) =>TaskCard(task, i, here.length, actions)));
  return cell;
}
function Board(store, actions) {
  const tasks =store.tasks.toArray();
  const hours =Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
  const header =DAYS.map((name, i) =>
    h("div", {class: "day-head" +(i ===todayIndex() ? " today" : "") },
      h("span", {class: "full"}, name),
      h("span", {class: "short" },DAY_SHORT[i])));
  const rows =hours.flatMap(hour =>[
    h("div", {class: "time-label" }, formatHour(hour)),
    ...DAYS.map((_, day) =>Cell(tasks, actions, day, hour))
  ]);
  return h("section", {class: "board", style: `--rows:${hours.length}` }, h("div", {class: "corner" }), ...header, ...rows);
}
