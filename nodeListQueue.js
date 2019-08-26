import {NodeList} from './nodeList.js'

class Queue {
  constructor(elem){
    this.data = new NodeList(elem)
  }
  enqueue(elem){
    this.data.add_tail(elem)
  }
  dequeue(){
    this.data.delete_head()
  }
  first(){
    return this.data.head.data
  }
  is_empty(){
    return this.data.length === 0
  }
}

//test
let s = new Queue()
console.log(s.is_empty())
s.enqueue(9)
s.enqueue(3)
console.log(s.is_empty(), s.first())
s.dequeue()
console.log(s.first())
