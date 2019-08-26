class Node{
  constructor(elem){
    this.data = elem
    this.next = null
  }
}

class NodeList{
  constructor(){
    this.head = null
    this.length = 0
  }
  tail(){
    let currentNode = this.head
    if(currentNode === null) return null
    while(currentNode.next){
      currentNode = currentNode.next
    }
    return currentNode
  }
  add_head(elem){
    let newHead = new Node(elem)
    if(this.head === null) this.head = newHead
    else {
      newHead.next = this.head
      this.head = newHead
    }
    this.length++
  }
  add_tail(elem){
    let currentNode = this.tail()
    let newTail = new Node(elem)
    if(currentNode===null) this.head=newTail
    else currentNode.next = newTail
    this.length++
  }
  delete_head(){
    if(this.head === null) return null
    else if(this.head.next){
      this.head = this.head.next
    }else{
      this.head = null
    }
    this.length--
  }
  delete_tail(){
    let tailNode = this.tail()
    if(tailNode === null) return null
    let preTail = this.findPreNode(tailNode.data)
    if(preTail){
      preTail.next = null
    }else{
      this.head = null
    }
    this.length--
  }
  find(elem){
    let currentNode = this.head
    if(currentNode === null) return null
    while(currentNode && currentNode.data !== elem){
      if (currentNode.next) {
        currentNode = currentNode.next
      } else {
        currentNode = null
      }
    }
    return currentNode
  }
  findPreNode(elem){
    let currentNode = this.head
    if(currentNode === null || currentNode.next === null) return null
    while(currentNode && currentNode.next && currentNode.next.data !== elem){
      if (currentNode.next) {
        currentNode = currentNode.next
      } else {
        currentNode = null
      } 
    }
    return currentNode
  }
  delete(elem){
    if (this.head.data === elem) {
      this.head = this.head.next
      this.length--
    }else{
      let preNode = this.findPreNode(elem)
      console.log('preNode', preNode)
      if(preNode.next !== null) {
        preNode.next = preNode.next.next
        this.length--
      }
    }
  }
}

// let list = new NodeList()
// list.add_head(4)
// list.add_tail(5)
// console.log('head', list.head, list.length)
// console.log('tail', list.tail())
// console.log('find', list.find(4))
// // list.delete_tail()
// // list.delete_head()
// console.log(list.tail(), list.findPreNode(list.tail().data))
// list.delete(4)
// console.log(list.head, list.length)

export { NodeList }