import { Tree } from "./symmetricBinaryTree";

class PathSumTree extends Tree{
  constructor(treeArr){
    super(treeArr)
    this.res = []
    this.path = []
  }
  getTargetParth(target){
    if(this.root === null) return null
    this.getPath(this.root, target)
    return this.res
  }
  getPath(node, target){
    if(target<0) return null
    this.path.push(node.data)
    if(node.data === target && node.left === null && node.right === null){
      this.res.push(this.path.slice())
    }
    if(node.left !== null) this.getPath(node.left, target-node.data)
    if(node.right !== null) this.getPath(node.right, target-node.data)
    // console.log(this.path, target) 
    this.path.pop()
  }
}

//测试
let arr = [5,4,8,11,null,13,4,7,2,null,null,null, null,5,1]
let t = new PathSumTree(arr)
// console.log(t)
let path = t.getTargetParth(22)
console.log('path', path)