class Vector{
  constructor(capacity =8){
    this.items =new Array(capacity);
    this.length =0;
  }
  get size(){
    return this.length;
  }
  grow(){
    const next =new Array(this.items.length * 2);
    for (let i =0; i < this.length; i++) next[i] =this.items[i];
    this.items =next;
  }
  push(value){
    if(this.length===this.items.length) this.grow();
    this.items[this.length++] = value;
  }
  get(index){
    return index >=0 && index <this.length ?this.items[index] : undefined;
  }
  set(index, value){
    if(index >= 0 && index <this.length) this.items[index] =value;
  }
  removeAt(index) {
    if (index <0 || index >= this.length) return undefined;
    const removed = this.items[index];
    for (let i =index; i < this.length - 1; i++) this.items[i] = this.items[i + 1];
    this.items[--this.length] =undefined;
    return removed;
  }
  findIndex(predicate){
    for (let i =0; i<this.length; i++) if(predicate(this.items[i], i)) return i;
    return -1;
  }
  find(predicate){
    return this.get(this.findIndex(predicate));
  }
  toArray(){
    return this.items.slice(0, this.length);
  }
  static from(array){
    const vector =new Vector(Math.max(8, array.length));
    array.forEach(item =>vector.push(item));
    return vector;
  }
}
