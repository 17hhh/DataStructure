import { BST } from "./binarySearchTree";

class BinarySearchTree extends BST{
  getPrevNode(node){
    if(node.left === null){
      if(node.parent){
        if(node.parent.right && node.parent.right.data === node.data) return node.parent
        else {
          let pNode = node.parent
          if(pNode.parent === null) return null
          else{
            let n = null
            while (pNode.parent && pNode.parent.right.data === pNode.data) {
              n = pNode.parent
              pNode = pNode.parent
            }
            return n
          }
        }
      }else return null
    }else if(node.left) {
      return this.findMax(node.left).element
    }else return null
  }
  getKthSmallestAfterInsert(k,insertValue){
    let kthSmallest = this.kthSmallest(k)
    if(insertValue >= kthSmallest.data) return kthSmallest
    else {
      if(insertValue <= this.getPrevNode(kthSmallest).data) return this.getPrevNode(kthSmallest)
      else {
        this.insert(insertValue)
        return this.find(insertValue)
      }
    }
  }
}
//测试
let t = new BinarySearchTree([8,6,10,5,7,9,13,3])
let node 
node = t.getPrevNode(t.find(13).element)
// node = t.getPrevNode(t.kthSmallest(1))
// console.log(t.root.left)
console.log(t.getKthSmallestAfterInsert(2,2))
// console.log(node)