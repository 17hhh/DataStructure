class Node{
  constructor(elem){
    this.data = elem
    this.next = null
  }
}

class CircularLinkedList{
  constructor(num){
    let head = new Node(1)
    let p = head
    for(let i=2; i<=num; i++){
      let temp = new Node(i)
      p.next = temp
      p = temp
    }
    p.next = head
    return head
  }
}

// test
let list = new CircularLinkedList(11)
while (list.next.data !== list.data) {
  let temp
  for(let i=1; i<3; i++){
    temp = list
    list = list.next
  }
  temp.next = list.next
  list = temp.next
}
list.next = null
console.log(list)
