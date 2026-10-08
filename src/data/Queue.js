class Queue {
  constructor() {
    this.items =[];
    this.head =0;
  }
  get size(){
   return this.items.length - this.head;
  }
  enqueue(value){
    this.items.push(value);
  }
  dequeue(){
    if (this.size=== 0) return undefined;
    const value =this.items[this.head++];
    if (this.head> 16 && this.head * 2 >= this.items.length) {
      this.items= this.items.slice(this.head);
      this.head= 0;
    }
    return value;
  }
  peek(){
    return this.size=== 0 ? undefined : this.items[this.head];
  }

  toArray(){
    return this.items.slice(this.head);
  }
}
