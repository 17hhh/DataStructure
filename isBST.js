import { BST } from "./binarySearchTree";

let t = new BST([10,6,8,9,1,4,7,12,28,2,19])
t.inorderTranverse(x=>console.log(x.data)) //中序遍历为递增序列则说明是二叉搜索树
// t.root.data = 4
// console.log(t)
console.log(t.isBST())