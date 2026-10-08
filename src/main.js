const store =new TaskStore();
const root =document.getElementById("app");
const actions ={
  add: () =>openTaskModal(null, data => store.add(data)),
  edit: id =>{
    const task =store.tasks.find(item => item.id === id);
    if(task)openTaskModal(task, data => store.update(id, data));
  },
  remove: id =>store.remove(id),
  toggle: id =>store.toggle(id),
  move: (id, day, hour) =>store.move(id, day, hour)
};
function render(){
  document.body.classList.remove("dragging");
  root.replaceChildren(
    Toolbar(store, actions),
    h("main",{class: "layout"}, Board(store, actions), Sidebar(store, actions))
  );
}
document.addEventListener("keydown", e =>{
  if (!(e.ctrlKey || e.metaKey) || e.target.closest("input, select")) return;
  const key =e.key.toLowerCase();
  if (key ==="z" && !e.shiftKey) {
    e.preventDefault();
    store.undo();
  } else if(key=== "y" || (key === "z" && e.shiftKey)) {
    e.preventDefault();
    store.redo();
  }
});
store.subscribe(render);
render();
