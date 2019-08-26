class Position{
  constructor(node){
    this.id = node;
    this.element = node;
  }
}
class Node{
  constructor(elem){
    this.data = elem
    this.next = null
    this.prev = null
  }
  position(){
    return new Position(this)
  }
}
class LinkList{
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
  findNodeObj(node){
    return node.position()
  }
  prev(pos){
    if(pos.element.prev === null) return null
    else {
      let elem = pos.element.prev
      return elem.position()
    }
  }
  next(pos){
    if(pos.element.next === null) return null
    else {
      let elem = pos.element.next
      return elem.position()
    }
  }
  [Symbol.iterator]() {
    return  new NodeListIterator(this, this.head.next.position())
  }
}
class NodeListIterator{
  constructor(llist, pos){
    this.llist = llist;
    this.pos = pos;
  }
  next(){
    if(this.pos.element.data !== null){
      let val = this.pos.element.data
      this.pos = this.llist.next(this.pos)
      return {
        value: val,
        done: false
      }
    }else{
      return {done: true, value: undefined}
    }
  }
}

//test
let list = new LinkList()
list.add_head(2)
list.add_tail(4)
list.add_tail(6)
for(let item of list){
  console.log(item)
}