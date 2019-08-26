class Node{
  constructor(elem){
    this.data = elem
    this.left = null
    this.right = null
    this.parent = null
  }
}
class SplayTree{
  constructor(arr){
    this.root = null
    this.createTree(arr)
  }
  createTree(arr){
    while(arr.length){
      this.insert(arr.shift())
    }
  }
  insert(elem){
    if(this.root === null) this.root = new Node(elem)
    else this.insertNode(this.root, elem)
  }
  insertNode(node, elem){
    if(elem < node.data){
      if(!node.left) {
        node.left = new Node(elem)
        node.left.parent = node
        this.splay(node.left)
      }else this.insertNode(node.left, elem)
    }else if(elem > node.data){
      if(!node.right){
        node.right = new Node(elem)
        node.right.parent = node
        this.splay(node.right)
      }else this.insertNode(node.right, elem)
    }
  }
  find(elem, flag){
    let bl = flag || false
    return this.findNode(this.root, elem, bl)
  }
  findNode(node, elem, bl){
    if(node === null) {
      if(node.parent !== null && !bl) this.splay(node.parent)
      return null
    }
    if(elem < node.data) return this.findNode(node.left, elem, bl)
    else if(elem > node.data) return this.findNode(node.right, elem, bl)
    else {
      if(!bl) this.splay(node)
      return node
    }
  }
  delete(elem){
    let node = this.find(elem, true)
    this.deleteNode(node, elem)
    this.splay(node.parent)
  }
  deleteNode(node, elem){
    if(node.left === null && node.right === null){
      if(node.parent === null) this.root = null
      else if(node.parent.left && node.parent.left.data === elem) node.parent.left = null
      else if(node.parent.right && node.parent.right.data === elem) node.parent.right = null
    }else if(node.left !== null && node.right === null && node.parent){
      node.left.parent = node.parent
      if (node.parent && node.parent.right.data === elem) node.parent.right = node.left
      else if (node.parent && node.parent.left.data === elem) node.parent.left = node.left
    }else if(node.left === null && node.right !== null && node.parent){
      node.right.parent = node.parent
      if (node.parent && node.parent.right.data === elem) node.parent.right = node.right
      else if (node.parent && node.parent.left.data === elem) node.parent.left = node.right
    }else{
      let maxChildNode = this.findMax(node.left)
      let n
      n = maxChildNode.data
      maxChildNode.data = node.data
      node.data = n
      this.deleteNode(maxChildNode, elem)
    }
    return node
  }
  findMax(tree){
    let node = tree || this.root
    while(node.right){
      node = node.right
    }
    return node
  }
  splay(node){
    if(node === null || node.parent === null) return
    if(node.parent.parent === null) {
      if(node.parent.left && node.parent.left.data === node.data) this.rightRotate(node.parent)
      else if(node.parent.right && node.parent.right.data === node.data) this.leftRotate(node.parent)
    }else{
      let pNode = node.parent
      if(pNode.parent.left && pNode.parent.left.data === pNode.data){
        if(pNode.left && pNode.left.data === node.data) {
          this.rightRotate(pNode.parent)
          this.rightRotate(node.parent)
        }else if(pNode.right && pNode.right.data === node.data){
          this.leftRotate(node.parent)
          this.rightRotate(node.parent)
        }
      }else if(pNode.parent.right && pNode.parent.right.data === pNode.data){
        if(pNode.right && pNode.right.data === node.data) {
          this.leftRotate(pNode.parent)
          this.leftRotate(node.parent)
        }else if(pNode.left && pNode.left.data === node.data){
          this.rightRotate(node.parent)
          this.leftRotate(node.parent)
        }
      }
    }
  }
  leftRotate(node){
    if(node.right === null) return
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
    if(node.left === null) return
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
}

//测试
let t = new SplayTree([30])
t.insert(20)
t.insert(40)
t.find(30)
t.insert(35)
t.delete(30)
console.log(t)