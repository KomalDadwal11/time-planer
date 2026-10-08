function Toolbar(store, actions) {
  return h("header", {class: "toolbar" },
    h("div", {class: "brand" },
      h("h1",{}, "StudyFlow"),
      h("p", {},"Weekly Study Board")),
    h("div", {class: "toolbar-actions" },
      h("div",{class: "history" },
        h("button",{class: "btn-history", title: "Undo (Ctrl+Z)", disabled: !store.canUndo(), onClick: () => store.undo() }, "↶ Undo"),
        h("button", {class: "btn-history", title: "Redo (Ctrl+Y)", disabled: !store.canRedo(), onClick: () => store.redo() }, "↷ Redo")),
      h("button", {class: "btn-add", onClick: actions.add}, "+ Add Task")));
}
