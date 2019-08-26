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
    this.treeStore = []
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
  serialize(){ //序列化
    if(this.root === null ) this.treeStore.push('$')
    else {
      this.serializeChildTree(this.root)
      return this.treeStore.join(',')
    }
  }
  serializeChildTree(node){
    if(node.data === null) {
      this.treeStore.push('$')
      return
    }
    this.treeStore.push(node.data)
    if(node.left !== null) this.serializeChildTree(node.left)
    else {
      this.treeStore.push('$') 
    }
    if(node.right !== null) this.serializeChildTree(node.right)
    else {
      this.treeStore.push('$') 
    }
  }
  DeSerializeTree(str){ //反序列化
    if(!str) return null
    else {
      let arr = str.split(',')
      return this.deserialize(arr)
    }
  }
  deserialize(arr){
    let node = null;
    let current = arr.shift();
    if (current !== '$') {
      node = new Node(current);
      node.left = this.deserialize(arr);
      node.right = this.deserialize(arr);
    }
    return node;
  }
}

// 测试
if(!module.parent){
  let arr = [1,2,3,4,null,5,6] // [1,2,2,3,4,4,3]
  let tree = new Tree(arr)
  console.log(tree)
  console.log('serialize', tree.serialize())
  console.log('deserialize', tree.DeSerializeTree('1,2,4,$,$,$,3,5,$,$,6,$,$'))
}