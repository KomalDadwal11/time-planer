function Sidebar(store, actions) {
  const stats =store.stats();
  const queue =store.pendingQueue();
  const front =queue.peek();
  const upcoming =queue.toArray().slice(0, 6);
  const tile =(value, label) => h("div", {class: "tile"}, h("b", {}, value), h("span", {}, label));

  const item =task =>
    h("li", {class: "queue-item" +(task === front ? " next" : "") },
      h("span", {class: "swatch", style: `background:${SUBJECTS[task.subject]}`}),
      h("div", {},
        h("strong", {}, task.title),
        h("small", {}, `${DAY_SHORT[task.day]} · ${task.time} · ${formatDuration(task.duration)}`)),
      h("button", {class: "icon-btn round", title: "Complete", onClick: () => actions.toggle(task.id) }, "✓"));

  return h("aside", {class: "sidebar" },
    h("section", {class: "panel" },
      h("h3", {}, "Weekly Progress"),
      h("div", {class: "percent"}, `${stats.percent}%`),
      h("div", {class: "progress"}, h("i", { style: `width:${stats.percent}%`})),
      h("div", {class: "stats"},
        tile(stats.total, "Total tasks"),
        tile(stats.completed, "Completed"),
        tile(stats.pending, "Pending"),
        tile(`${formatHours(stats.doneMinutes)} / ${formatHours(stats.plannedMinutes)}`, "Study hours"))),
    h("section", { class: "panel" },
      h("h3", {}, `Up Next · ${queue.size} pending`),
      upcoming.length
        ? h("ul", {class: "queue"}, upcoming.map(item))
        : h("p", {class: "empty"}, "You're all caught up.")));
}
