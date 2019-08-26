class Node{
  constructor(elem){
    this.data = elem
    this.left = null
    this.right = null
    this.leftH = 0
    this.rightH = 0
    this.parent = null
  }
}
class AVL{
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
  insertNode(node,elem){
    if(elem < node.data) {
      if(node.left === null) {
        node.left = new Node(elem)
        node.left.parent = node
      }else this.insertNode(node.left, elem)
    }else if(elem > node.data){
      if(node.right === null) {
        node.right = new Node(elem)
        node.right.parent = node
      }else this.insertNode(node.right, elem)
    }
    node.leftH = this.getTreeHeight(node.left)
    node.rightH = this.getTreeHeight(node.right)
    let bfactor = node.leftH - node.rightH
    if(bfactor !== 0 && bfactor !== 1 && bfactor !== -1){
      this.balanceTree(node)
    }
  }
  getTreeHeight(node){
    if(node === null) return 0
    return Math.max(this.getTreeHeight(node.left), this.getTreeHeight(node.right))+1
  }
  find(elem){
    return this.findNode(this.root, elem)
  }
  findNode(node, elem){
    if(node === null) return null
    if(elem < node.data) return this.findNode(node.left, elem)
    else if(elem > node.data) return this.findNode(node.right, elem)
    else return node
  }
  delete(elem){
    let node = this.find(elem)
    this.deleteNode(node,elem)
    if(node !== null) {
      console.log('wahahha')
      while(node.parent && (node.parent.leftH !== this.getTreeHeight(node.parent.left)
      || node.parent.rightH !== this.getTreeHeight(node.parent.right))) {
        node.parent.leftH = this.getTreeHeight(node.parent.left)
        node.parent.rightH = this.getTreeHeight(node.parent.right)
        let bfactor = node.parent.leftH - node.parent.rightH
        if(bfactor !== 0 && bfactor !== 1 && bfactor !== -1){
          this.balanceTree(node.parent)
        }
        node = node.parent
      }
    }
  }
  deleteNode(node,elem){
    if(node.left === null && node.right === null) { //node.parent存在时
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
  balanceTree(node){
    console.log('平衡化',node.data, node.leftH - node.rightH)
    if(node.leftH - node.rightH === 2){
      if(node.left.leftH - node.left.rightH === 1 || node.left.leftH - node.left.rightH === 0) this.rightRotate(node)
      else if(node.left.leftH - node.left.rightH === -1) {
        this.leftRotate(node.left)
        this.rightRotate(node)
      }
    }else if(node.leftH - node.rightH === -2){
      if(node.right.leftH - node.right.rightH === -1 || node.left.leftH - node.left.rightH === 0) this.leftRotate(node)
      else if(node.right.leftH - node.right.rightH === 1) {
        this.rightRotate(node.right)
        this.leftRotate(node)
      }
    }
  }
  leftRotate(node){
    if(!node.right) return
    let newRoot = node.right
    if(node.parent === null) this.root = newRoot
    else if(node.parent.left && node.parent.left.data === node.data) node.parent.left = newRoot
    else if(node.parent.right && node.parent.right.data === node.data) node.parent.right = newRoot
    newRoot.parent = node.parent
    node.right = newRoot.left
    if(newRoot.left) newRoot.left.parent = node
    newRoot.left = node
    node.parent = newRoot
    node.leftH = this.getTreeHeight(node.left)
    node.rightH = this.getTreeHeight(node.right)
    newRoot.leftH = this.getTreeHeight(newRoot.left)
    newRoot.rightH = this.getTreeHeight(newRoot.right)
    return newRoot
  }
  rightRotate(node){
    if(!node.left) return
    let newRoot = node.left
    if(node.parent === null) this.root = newRoot
    else if(node.parent.left && node.parent.left.data === node.data) node.parent.left = newRoot
    else if(node.parent.right && node.parent.right.data === node.data) node.parent.right = newRoot
    newRoot.parent = node.parent
    node.left = newRoot.right
    if(newRoot.right) newRoot.right.parent = node
    newRoot.right = node
    node.parent = newRoot
    node.leftH = this.getTreeHeight(node.left)
    node.rightH = this.getTreeHeight(node.right)
    newRoot.leftH = this.getTreeHeight(newRoot.left)
    newRoot.rightH = this.getTreeHeight(newRoot.right)
    return newRoot
  }
}

//测试
let t = new AVL([30,20,40,35,45,60]) //[3,5,2,6,4]
// console.log('树', t)
// t.insert(7)
// t.delete(7)
// t.delete(6)
t.delete(30)
t.insert(41)
t.insert(42)
t.insert(43)
console.log('shu', t.root.right.left)