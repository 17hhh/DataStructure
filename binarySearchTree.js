class Node{
  constructor(data){
    this.data = data
    this.times = 1
    this.parent = null
    this.left = null
    this.right = null
  }
  position(){
    return new Position(this)
  }
}
class Position{
  constructor(node){
    this.element = node
    this.id = node
  }
}
export class BST{
  constructor(arr){
    this.root = null
    this.createBST(arr)
    this.inorderList = []
  }
  insert(elem){
    if(this.root === null) {
      this.root = new Node(elem)
    } else this.insertNode(this.root, elem)
  }
  insertNode(node,elem){
    if(elem < node.data) {
      if(node.left === null) {
        node.left = new Node(elem)
        node.left.parent = node
      }else this.insertNode(node.left, elem)
    }else if(elem > node.data) {
      if(node.right === null) {
        node.right = new Node(elem)
        node.right.parent = node
      }else this.insertNode(node.right, elem)
    }else if(elem === node.data) {
      node.times++
    }
  }
  createBST(arr){
    while(arr.length){
      this.insert(arr.shift())
    }
  }
  find(elem){
    return this.findNode(this.root, elem)
  }
  findNode(node,elem){
    if(node === null) return null
    else if(elem < node.data) return this.findNode(node.left, elem)
    else if(elem > node.data) return this.findNode(node.right, elem)
    else if(elem === node.data) return node.position()
  }
  findMax(tree){
    let node = tree || this.root
    while(node.right){
      node = node.right
    }
    return node.position()
  }
  findMin(tree){
    let node = tree || this.root
    while(node.left){
      node = node.left
    }
    return node.position()
  }
  delete(elem){
    let node = this.find(elem).element
    node.times--
    if(node.times === 0){
      this.deleteNode(node,elem)
    }
  }
  deleteNode(node,elem){
    if(node.left === null && node.right === null) {
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
      let maxChildNode = this.findMax(node.left).element
      let n,m
      n = maxChildNode.data
      m = maxChildNode.times
      maxChildNode.times = node.times
      maxChildNode.data = node.data
      node.times = m
      node.data = n
      this.deleteNode(maxChildNode, elem)
    }
    return node
  }
  inorderTranverse(op){
    this.inorderList = []
    this.inorder(this.root, op)
  }
  inorder(node, op){
    if(node === null) return null
    this.inorder(node.left, op)
    this.inorderList.push(node)
    if(op) op(node)
    this.inorder(node.right, op)
  }
  isBST(){
    if(this.root === null) return true
    return this.isBSTNode(this.root)
  }
  isBSTNode(node){
    if(node === null) return true
    if(node.left !== null && this.findMax(node.left).element.data > node.data) return false
    if(node.right !== null && this.findMin(node.right).element.data < node.data) return false
    return this.isBSTNode(node.left) && this.isBSTNode(node.right)
  }
  kthSmallest(k){
    this.inorderTranverse()
    if(k > this.inorderList.length) return null
    return this.inorderList[k-1]
  }
  leftRotate(node){
    if(!node.right) return
    let newRoot = node.right
    if(node.parent && node.parent.left.data === node.data) node.parent.left = newRoot
    else if(node.parent && node.parent.right.data === node.data) node.parent.right = newRoot
    else if(node.parent === null) this.root = newRoot
    newRoot.parent = node.parent
    node.right = newRoot.left
    if(newRoot.left) newRoot.left.parent = node
    newRoot.left = node
    node.parent = newRoot
    return newRoot
  }
  rightRotate(node){
    if(!node.left) return
    let newRoot = node.left
    if(node.parent && node.parent.left.data === node.data) node.parent.left = newRoot
    else if(node.parent && node.parent.right.data === node.data) node.parent.right = newRoot
    else if(node.parent === null) this.root = newRoot
    newRoot.parent = node.parent
    node.left = newRoot.right
    if(newRoot.right) newRoot.right.parent = node
    newRoot.right = node
    node.parent = newRoot
    return newRoot
  }
}

// 测试
if(!module.parent){
  let t = new BST([3,2])
  // t.insert(4)

  // console.log('find', t.find(3))
  // t.inorderTranverse(x=>console.log(x.data))
  t.delete(2)
  // console.log('max', t.findMax().data, t.findMax(t.root.left).data)
  // console.log('min', t.findMin().data)
  console.log(t)
  // t.inorderTranverse(x=>console.log(x.data))
  // console.log(t.isBST())
  // console.log(t.kthSmallest(2))

  // 旋转测试
  // t.leftRotate(t.root)
  // t.rightRotate(t.root)
  // console.log(t.root)
}
