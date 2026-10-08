class TaskStore{
  constructor(){
    this.tasks =new Vector();
    this.undoStack =new Stack();
    this.redoStack =new Stack();
    this.listeners =[];
    this.load();
  }
  subscribe(listener){
    this.listeners.push(listener);
  }
  emit(){
    this.save();
    this.listeners.forEach(listener => listener());
  }
  load(){
    let stored =null;
    try{
      stored= JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch(e){}
    this.tasks = Vector.from(Array.isArray(stored) ? stored : SAMPLE_TASKS);
  }
  save(){
    try{
      localStorage.setItem(STORAGE_KEY, this.snapshot());
    } catch(e){}
  }
  snapshot(){
    return JSON.stringify(this.tasks.toArray());
  }
  record(){
    this.undoStack.push(this.snapshot());
    this.redoStack.clear();
  }
  normalize(data){
    const maxDuration =END_HOUR *60 -toMinutes(data.time);
    return{
      title: data.title.trim(),
      day: Number(data.day),
      time: data.time,
      duration: Math.max(15, Math.min(Number(data.duration), maxDuration)),
      subject: data.subject,
      priority: data.priority
    };
  }
  add(data){
    this.record();
    const id=Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    this.tasks.push({id, ...this.normalize(data), done: false });
    this.emit();
  }
  update(id, data){
    const index =this.tasks.findIndex(task => task.id === id);
    if(index <0) return;
    this.record();
    this.tasks.set(index, { ...this.tasks.get(index), ...this.normalize(data)});
    this.emit();
  }
  remove(id){
    const index=this.tasks.findIndex(task =>task.id ===id);
    if(index <0) return;
    this.record();
    this.tasks.removeAt(index);
    this.emit();
  }
  toggle(id){
    const index=this.tasks.findIndex(task =>task.id ===id);
    if(index <0)return;
    this.record();
    const task =this.tasks.get(index);
    this.tasks.set(index, { ...task, done: !task.done});
    this.emit();
  }
  move(id, day, hour) {
    const index =this.tasks.findIndex(task => task.id === id);
    if (index <0) return;
    const task= this.tasks.get(index);
    const time =`${pad(hour)}:00`;
    if (task.day ===day && task.time === time) return;
    this.record();
    this.tasks.set(index, { ...task, ...this.normalize({ ...task, day, time })});
    this.emit();
  }
  canUndo(){
    return !this.undoStack.isEmpty();
  }
  canRedo(){
    return !this.redoStack.isEmpty();
  }
  undo(){
    if (!this.canUndo()) return;
    this.redoStack.push(this.snapshot());
    this.tasks =Vector.from(JSON.parse(this.undoStack.pop()));
    this.emit();
  }
  redo(){
    if(!this.canRedo()) return;
    this.undoStack.push(this.snapshot());
    this.tasks =Vector.from(JSON.parse(this.redoStack.pop()));
    this.emit();
  }
  pendingQueue(){
    const now =nowWeekMinutes();
    const week =7*1440;
    const key =task =>(task.day * 1440 + toMinutes(task.time) -now +week) % week;
    const queue =new Queue();
    this.tasks
      .toArray()
      .filter(task =>!task.done)
      .sort((a, b) =>key(a) -key(b))
      .forEach(task =>queue.enqueue(task));
    return queue;
  }
  stats(){
    const all =this.tasks.toArray();
    const done =all.filter(task =>task.done);
    const minutes =list =>list.reduce((sum, task) =>sum + task.duration, 0);
    return{
      total: all.length,
      completed: done.length,
      pending: all.length - done.length,
      plannedMinutes: minutes(all),
      doneMinutes: minutes(done),
      percent: all.length ? Math.round((done.length / all.length) *100) : 0
    };
  }
}
