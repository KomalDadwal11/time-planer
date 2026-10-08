function openTaskModal(task, onSave) {
  const data =task || { title: "", day: todayIndex(), time: "09:00", duration: 60, subject: "Math", priority: "Medium" };
  const durations =DURATIONS.includes(Number(data.duration))
    ? DURATIONS
    : [...DURATIONS, Number(data.duration)].sort((a, b) => a - b);

  const field =(label, control) => h("label", { class: "field" }, h("span", {}, label), control);
  const select =(name, options, value) =>
    h("select",{ name }, options.map(([v, l]) => h("option", { value: v, selected: String(v) === String(value) }, l)));
  const title = h("input", { name: "title", type: "text", required: "true", maxlength: "40", placeholder: "e.g. Linear algebra revision", value: data.title });
  const close = () => overlay.remove();
  const form = h("form", {
    class: "modal",
    onSubmit: e => {
      e.preventDefault();
      onSave(Object.fromEntries(new FormData(form)));
      close();
    }
  },
    h("h2", {}, task ? "Edit Task" : "Add Task"),
    field("Title", title),
    h("div", {class: "row"},
      field("Day", select("day", DAYS.map((d, i) => [i, d]), data.day)),
      field("Time", h("input", { name: "time", type: "time", required: "true", min: formatHour(START_HOUR), max: "21:45", step: "900", value: data.time }))),
    h("div", {class: "row"},
      field("Duration", select("duration", durations.map(m =>[m, formatDuration(m)]), data.duration)),
      field("Subject", select("subject", Object.keys(SUBJECTS).map(s =>[s, s]), data.subject))),
    field("Priority", select("priority", PRIORITIES.map(p =>[p, p]), data.priority)),
    h("div", {class: "actions"},
      h("button", {type: "button", class: "btn-cancel", onClick: close }, "Cancel"),
      h("button", {type: "submit", class: "btn-primary" }, task ? "Save Changes" : "Add Task")));
  const overlay = h("div", {class: "overlay", onMousedown: e => {if (e.target === overlay) close();}}, form);
  document.body.append(overlay);
  title.focus();
}
