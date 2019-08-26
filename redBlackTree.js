class NilNode{
  constructor(){
    this.color = 'black'
    this.data = NaN
  }
}
class Node{
  constructor(elem){
    this.data = elem
    this.color = 'red'
    this.left = new NilNode()
    this.right = new NilNode()
    this.parent = null
  }
}
class RBT{
  constructor(elem){
    this.root = new Node(elem)
    this.root.color = 'black'
  }
  insert(elem){
    let node = this.insertNode(this.root, elem)
    this.dealAfterInsert(node)
    this.root.color = 'black'
  }
  insertNode(node, elem){
    let newNode
    if(elem < node.data) {
      if(Object.is(node.left.data, NaN)) {
        node.left = new Node(elem)
        node.left.parent = node
        newNode = node.left
      }else return this.insertNode(node.left, elem)
    }else if(elem > node.data) {
      if(Object.is(node.right.data, NaN)){
        node.right = new Node(elem)
        node.right.parent = node
        newNode = node.right
      }else return this.insertNode(node.right, elem)
    }
    return newNode
  }
  dealAfterInsert(node){
    if(node.parent === null) return
    let pNode = node.parent
    if(pNode.color === 'black') return // 黑父
    else{
      if(pNode.parent.left.data === pNode.data){
        if(pNode.parent.right.color === 'black'){// 红父黑叔
          if(pNode.left.data === node.data){
            console.log('右黑叔左值', pNode)
            pNode.color = 'black'
            pNode.parent.color = 'red'
            this.rightRotate(pNode.parent)
          }else if(pNode.right.data === node.data){
            node.color = 'black'
            pNode.parent.color = 'red'
            console.log('右黑叔右值', pNode)
            this.leftRotate(pNode)
            this.rightRotate(node.parent)
          }
        }else if(pNode.parent.right.color === 'red'){ //红父红叔
          pNode.parent.color = 'red'
          pNode.color = 'black'
          pNode.parent.right.color = 'black'
          this.dealAfterInsert(pNode.parent)
        }
      }else if(pNode.parent.right.data === pNode.data){
        if(pNode.parent.left.color === 'black'){// 红父黑叔
          if(pNode.right.data === node.data){
            pNode.color = 'black'
            pNode.parent.color = 'red'
            console.log('左黑叔右值', pNode)
            this.leftRotate(pNode.parent)
          }else if(pNode.left.data === node.data){
            node.color = 'black'
            pNode.parent.color = 'red'
            console.log('左黑叔左值', pNode)
            this.rightRotate(pNode)
            this.leftRotate(node.parent)
          }
        }else if(pNode.parent.left.color === 'red'){ //红父红叔
          pNode.parent.color = 'red'
          pNode.color = 'black'
          pNode.parent.left.color = 'black'
          this.dealAfterInsert(pNode.parent)
        }
      }
    }
  }
  find(elem){
    return this.findNode(this.root, elem)
  }
  findNode(node, elem){
    if(Object.is(node.data, NaN)) return null
    if(elem < node.data) return this.findNode(node.left, elem)
    else if(elem > node.data) return this.findNode(node.right, elem)
    else return node
  }
  leftRotate(node){
    if(Object.is(node.right.data, NaN)) return
    let newRoot = node.right
    if(node.parent === null) this.root = newRoot
    else if(node.parent.left && node.parent.left.data === node.data) node.parent.left = newRoot
    else if(node.parent.right && node.parent.right.data === node.data) node.parent.right = newRoot 
    newRoot.parent = node.parent
    node.right = newRoot.left
    if(newRoot.left) newRoot.left.parent = node
    node.parent = newRoot
    newRoot.left = node
    return newRoot
  }
  rightRotate(node){
    if(Object.is(node.left.data, NaN)) return
    let newRoot = node.left
    if(node.parent === null) this.root = newRoot
    else if(node.parent.left && node.parent.left.data === node.data) node.parent.left = newRoot
    else if(node.parent.right && node.parent.right.data === node.data) node.parent.right = newRoot
    newRoot.parent = node.parent
    node.left = newRoot.right
    if(newRoot.right) newRoot.right.parent = node
    node.parent = newRoot
    newRoot.right = node
    return newRoot
  }
  delete(elem){
    let node = this.find(elem)
    console.log('删除', node)
    this.deleteNode(node, elem)
  }
  deleteNode(node, elem){
    if(Object.is(node.left.data, NaN) && Object.is(node.right.data, NaN)){
      this.dealAfterDeleteNode(node)
      if(node.parent === null) this.root = null
      else if(node.parent.left.data === elem) node.parent.left = new NilNode()
      else if(node.parent.right.data === elem) node.parent.right = new NilNode()
      if(this.root !== null) this.root.color = 'black'
    }else {
      let nextNode = this.getNextNode(node)
      node.data = nextNode.data
      nextNode.data = elem
      this.deleteNode(nextNode, elem)
    }
  }
  dealAfterDeleteNode(node){
    if(node.parent === null) return 
    let pNode = node.parent
    if(pNode.left.data === node.data){
      if(pNode.right.color === 'red'){ //红兄变黑兄
        pNode.color = 'red'
        pNode.right.color = 'black'
        this.leftRotate(pNode)
        this.dealAfterDeleteNode(node)
      }else{
        //红侄
        if(pNode.right.left.color === 'red'){
          pNode.right.left.color = pNode.color
          pNode.color = 'black'
          this.rightRotate(pNode.right)
          this.leftRotate(pNode)
          return
        }else if(pNode.right.right.color === 'red'){
          pNode.right.right.color = 'black'
          pNode.right.color = pNode.color
          pNode.color = 'black'
          this.leftRotate(pNode)
          return
        }
        if(pNode.color === 'red'){ //红父
          pNode.color = 'black'
          pNode.right.color = 'red'
        }else{ //黑父
          pNode.right.color = 'red'
          this.dealAfterDeleteNode(pNode)
        }
      }
    }else if(pNode.right.data === node.data){
      if(pNode.left.color === 'red'){ //红兄变黑兄
        pNode.color = 'red'
        pNode.left.color = 'black'
        this.rightRotate(pNode)
        this.dealAfterDeleteNode(node)
      }else{
        //红侄
        if(pNode.left.left.color === 'red'){
          pNode.left.left.color = 'black'
          pNode.left.color = pNode.color
          pNode.color = 'black'
          this.rightRotate(pNode)
          return
        }else if(pNode.left.right.color === 'red'){
          pNode.left.right = pNode.color
          pNode.color = 'black'
          this.leftRotate(pNode.left)
          this.rightRotate(pNode)
          return
        }
        if(pNode.color === 'red'){ //红父
          console.log('红父')
          pNode.color = 'black'
          pNode.left.color = 'red'
        }else{ //黑父
          pNode.left.color = 'red'
          this.dealAfterDeleteNode(pNode)
        }
      }
    }
  }
  findMin(tree){
    let node = tree || this.root
    while(!Object.is(node.left.data, NaN)){
      node = node.left
    }
    return node
  }
  getNextNode(node){
    if(Object.is(node.right.data, NaN)){
      if(node.parent){
        if(node.parent.left.data === node.data) return node.parent
        else {
          let pNode = node.parent
          if(!pNode.parent) return null
          else{
            let n = null
            while (pNode.parent.left.data === pNode.data) {
              n = pNode.parent
              pNode = pNode.parent
            }
            return n
          }
        }
      }else return null
    }else if(!Object.is(node.right.data, NaN)) {
      return this.findMin(node.right)
    }else return null
  }
}

//测试

let t = new RBT(10)
t.insert(5)
t.insert(12)
t.insert(6)
t.insert(4)
t.insert(2)
t.insert(1)
// t.insert(20)
// t.insert(18)
// console.log(t.getNextNode(t.root.left).data)
t.delete(10)
console.log('树',t.root.right)