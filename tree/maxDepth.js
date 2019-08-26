import { Tree } from "./symmetricBinaryTree";

class DepthTree extends Tree{
  constructor(treeArr){
    super(treeArr)
    this.getMaxDepth = this.getMaxDepth(this.root)
  }
  getMaxDepth(root){
    if (root === null) return 0
    return Math.max(this.getMaxDepth(root.left), this.getMaxDepth(root.right))+1
  }
}
// 测试
let arr = [3,9,20,null,null,15] //[1,2,3,4]
let t = new DepthTree(arr)
console.log(t)
console.log(t.getMaxDepth)