class Node{
  constructor(elem){
    this.data = elem
    this.parent = null
    this.left = null
    this.right = null
  }
}
export class Tree{
  constructor(elem){
    this.treeArr = elem
    // this.root = null
    // if(this.treeArr.length) {
    //   this.root = new Node(this.treeArr[0])
    //   this.root.idx = 0
    // }
    // this.createTree(this.root)
  }
  createTree(node){
    if(this.getLeftChildIdx(node.idx)) {
      node.left = new Node(this.treeArr[this.getLeftChildIdx(node.idx)])
      node.left.idx = this.getLeftChildIdx(node.idx)
      node.left.parent = node
      this.createTree(node.left)
    }else node.left = null
    if(this.getRightChildIdx(node.idx)) {
      node.right = new Node(this.treeArr[this.getRightChildIdx(node.idx)])
      node.right.idx = this.getRightChildIdx(node.idx)
      node.right.parent = node
      this.createTree(node.right)
    }else node.right = null
  }
  add_child(elem){
    this.treeArr.push(elem)
  }
  getParentIdx(idx){
    if(idx <= 0 || idx > this.treeArr.length) return null
    else if(idx%2 === 0 && idx/2 >= 1) return idx/2 - 1
    else return (idx-1)/2
  }
  getLeftChildIdx(idx){
    if(idx < 0 || idx > this.treeArr.length) return null
    else if(idx*2+1 < this.treeArr.length) return idx*2+1
    else return null
  }
  getRightChildIdx(idx){
    if(idx < 0 || idx > this.treeArr.length) return null
    else if((idx+1)*2 < this.treeArr.length) return (idx+1)*2
    else return null
  }
  getNodeDepth(idx){
    if(idx < 0 || idx > this.treeArr.length) return null
    else return Math.floor(Math.log2(idx+1)+1)
  }
}

// 测试
if(!module.parent){
  let arr = ['A','B','C','D','E','F','G','H','I','J']
  let tree = new Tree(arr)

  let depth = tree.getNodeDepth(2)
  console.log(depth)

  console.log(tree.getParentIdx(3))
  console.log(tree.getLeftChildIdx(4))
  console.log(tree.getRightChildIdx(4))
}
