class Node {
  constructor(elem){
    this.data = elem
    this.left = null
    this.right = null
  }
}
export class Tree{
  constructor(arr){
    this.treeArr = arr
    if(this.treeArr && this.treeArr.length) {
      this.root = new Node(this.treeArr[0])
      this.root.idx = 0
      this.createTree(this.root)
    }else{
      this.root = null
    }
  }
  createTree(root){
    let currentIdx = root.idx*2+1
    if(currentIdx < this.treeArr.length) {
      root.left = new Node(this.treeArr[currentIdx])
      root.left.idx = currentIdx
    }else return null
    currentIdx = currentIdx + 1
    if(currentIdx < this.treeArr.length) {
      root.right = new Node(this.treeArr[currentIdx])
      root.right.idx = currentIdx
    } else return null
    this.createTree(root.left)
    this.createTree(root.right)
  }
  isSymmetricBinaryTree(){
    if(this.root === null) return true
    else return this.symmetricBinaryTree(this.root.left, this.root.right)
  }
  symmetricBinaryTree(left, right){
    if(left === null && right !== null) return false
    else if(left !== null && right === null) return false
    else if(left === null && right === null) return true
    else if(left.data !== right.data) return false
    else return this.symmetricBinaryTree(left.left, right.right) && this.symmetricBinaryTree(left.right, right.left)
  }
}

// 测试
if(!module.parent){
  let arr = [1,2,2,null,3,null,3] // [1,2,2,3,4,4,3]
  let tree = new Tree(arr)
  console.log(tree)
  console.log(tree.isSymmetricBinaryTree())
}