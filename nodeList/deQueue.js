class Deque{
  constructor(){
    this.data = []
  }
  add_first(elem){
    this.data.unshift(elem)
  }
  add_last(elem){
    this.data.push(elem)
  }
  delete_first(){
    return this.data.shift()
  }
  delete_last(){
    return this.data.pop()
  }
  first(){
    return this.data[0]
  }
  last(){
    return this.data[this.data.length-1]
  }
  is_empty(){
    return this.data.length === 0
  }
}

// test
let s = new Deque()
console.log('is_empty', s.is_empty())
s.add_first(4)
s.add_last(5)
console.log('is_empty', s.is_empty())
console.log(s.first(), s.last())
console.log(s.delete_first(), s.delete_last())
console.log('is_empty', s.is_empty())