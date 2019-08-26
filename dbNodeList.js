class Node{
  constructor(elem){
    this.data = elem
    this.next = null
    this.prev = null
  }
}
class DbNodeList{
  constructor(){
    this.head = new Node(null)
    this.tail = new Node(null)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.length = 0
  }
  add_head(elem){
    let currentNode = new Node(elem)
    currentNode.next = this.head.next
    this.head.next.prev = currentNode
    currentNode.prev = this.head
    this.head.next = currentNode
    this.length++
  }
  add_tail(elem){
    let currentNode = new Node(elem)
    currentNode.next = this.tail
    currentNode.prev = this.tail.prev
    this.tail.prev.next = currentNode
    this.tail.prev = currentNode
    this.length++
  }
  delete_head(){
    if(this.head.next === null) return null
    let currentNode = this.head.next
    this.head.next = currentNode.next
    currentNode.next.prev = this.head
    this.length--
  }
  delete_tail(){
    if(this.tail.prev === null) return null
    let currentNode = this.tail.prev
    currentNode.prev.next = this.tail
    this.tail.prev = currentNode.prev
    this.length--
  }
  find(elem){
    let currentNode = this.head
    while (currentNode.next && currentNode.data !== elem) {
      currentNode = currentNode.next
    }
    if(currentNode.data !== elem) return null
    else return currentNode
  }
  delete(elem){
    let deleteNode = this.find(elem)
    if(deleteNode !== null){
      deleteNode.prev.next = deleteNode.next
      deleteNode.next.prev = deleteNode.prev
      this.length--
    }
  }
}

// test
let list = new DbNodeList()
list.add_head(3)
console.log('find_3', list.find(3))
list.add_tail(4)
console.log('find_4', list.find(4))
list.add_tail(5)
// list.delete(4)
// list.delete_head()
console.log('find_5_pre', list.find(5).prev)
list.delete_tail()
console.log('find_5', list.find(5))