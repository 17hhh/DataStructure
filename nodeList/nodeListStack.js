import {NodeList} from './nodeList.js'

class Stack {
  constructor(elem){
    this.data = new NodeList(elem)
  }
  push(elem){
    this.data.add_tail(elem)
  }
  pop(){
    this.data.delete_tail()
  }
  top(){
    return this.data.tail().data
  }
  is_empty(){
    return this.data.length === 0
  }
}

//test
let s = new Stack()
console.log(s.is_empty())
s.push(9)
s.push(3)
console.log(s.is_empty(), s.top())
s.pop()
console.log(s.top())
