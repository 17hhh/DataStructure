class Stack{
  constructor(){
    this.data = []
    this.top = 0
  }
  push(elem){
    this.data.push(elem)
    this.top++
  }
  pop(){
    this.top--
    return this.data.pop()
    
  }
  peek(){
    return this.data[this.top-1]
  }
  is_empty(){
    return this.top === 0
  }
}

// test
let s = new Stack()
console.log('is_empty', s.is_empty())
s.push(2)
s.push(8)
console.log('is_empty', s.is_empty(), s.data)
console.log(s.peek())
console.log(s.pop(), s.data)