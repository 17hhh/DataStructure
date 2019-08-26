class Node{
  constructor(elem){
    this.data = elem
    this.children = {}
    this.isEnd = false
    this.parent = null
  }
}
class TrieTree{
  constructor(){
    this.root = new Node()
  }
  insert(str){
    let arr = str.split('')
    let node = this.root
    while (arr.length) {
      let s = arr.shift()
      if(!node.children[s]){
        let newNode = new Node(s)
        newNode.parent = node
        node.children[s] = newNode
      }
      node = node.children[s]
    }
    node.isEnd = true
  }
  find(str){
    let arr = str.split('')
    let node = this.root
    while (arr.length) {
      let s = arr.shift()
      if(!node.children[s]){
        return false
      }
      node = node.children[s]
    }
    return true
  }
  delete(str){
    let arr = str.split('')
    let node = this.root
    while (arr.length) {
      let s = arr.shift()
      if(!node.children[s]){
        console.log('not found this world')
        return
      }
      node = node.children[s]
    }
    this.deleteNode(node, str)
  }
  deleteNode(node, str){
    let arr = str.split('')
    while(arr.length){
      let s = arr.pop()
      if(node && node.data === s && Object.keys(node.children).length == 0){
        delete node.parent.children[s]
      }
      node = node.parent
    }
  }
}

// 测试
let tt = new TrieTree()
tt.insert('hello')
tt.insert('at')
tt.insert('age')
console.log('tree', tt.root.children.a)
console.log(tt.find('age'))
tt.delete('age')
console.log(tt.find('age'))
