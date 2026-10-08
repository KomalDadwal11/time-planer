class Stack{
  constructor(limit =100) {
    this.items =[];
    this.limit= limit;
  }
  get size(){
    return this.items.length;
  }
  push(value){
    this.items.push(value);
    if(this.items.length > this.limit) this.items.shift();
  }
  pop(){
    return this.items.pop();
  }
  peek(){
    return this.items[this.items.length -1];
  }
  isEmpty(){
    return this.items.length ===0;
  }
  clear() {
    this.items =[];
  }
}
