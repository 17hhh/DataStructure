class Queue{
  constructor(){
    this.data = []
    this.length = 0
  }
  enqueue(elem){
    this.data.push(elem)
    this.length++
  }
  dequeue(){
    if(this.length > 0) this.length--
    return this.data.shift()
  }
  first(){
    return this.data[0]
  }
  is_empty(){
    return this.data.length === 0
  }
}
export { Queue }
// test
// let s = new Queue()
// console.log(s.dequeue())
// console.log('is_empty', s.is_empty())
// s.enqueue(4)
// console.log('is_empty', s.is_empty(), s.data)
// console.log(s.first())
// console.log(s.dequeue())
// console.log('is_empty', s.is_empty())