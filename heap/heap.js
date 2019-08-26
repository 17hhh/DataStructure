import { Tree } from "./completeBinaryTree.js";

class Heap extends Tree{
  constructor(arr){
    super(arr)
  }
  shiftUp(idx){
    let nIdx = idx || this.treeArr.length-1
    let pIdx = this.getParentIdx(nIdx)
    if(this.treeArr[nIdx] < this.treeArr[pIdx]){
      [this.treeArr[nIdx], this.treeArr[pIdx]] = [this.treeArr[pIdx], this.treeArr[nIdx]]
    }else return null
    this.shiftUp(pIdx)
  }
  shiftDown(idx){
    let nIdx = idx || 0
    let leftIdx = this.getLeftChildIdx(nIdx)
    if(leftIdx === null) return null
    let rightIdx = this.getRightChildIdx(nIdx)
    if(rightIdx === null) {
      if(this.treeArr[nIdx] > this.treeArr[leftIdx]){
        [this.treeArr[nIdx], this.treeArr[leftIdx]] = [this.treeArr[leftIdx], this.treeArr[nIdx]]
      }else return null
    }else{
      let min = Math.min(this.treeArr[leftIdx], this.treeArr[rightIdx])
      if(this.treeArr[nIdx] > min){
        if(this.treeArr[leftIdx] < this.treeArr[rightIdx]){
          [this.treeArr[nIdx], this.treeArr[leftIdx]] = [this.treeArr[leftIdx], this.treeArr[nIdx]]
        }else{
          [this.treeArr[nIdx], this.treeArr[rightIdx]] = [this.treeArr[rightIdx], this.treeArr[nIdx]]
        }
      }
      this.shiftDown(leftIdx)
      this.shiftDown(rightIdx)
    }
  }
  heapify(){
    let lastNode = this.treeArr.length - 1
    let parentNode = Math.ceil(lastNode/2)-1
    
    for(let i = parentNode; i>=0; i--){
      this.shiftDown(i)
    }
  }
  insert(elem){
    this.treeArr.push(elem)
    this.shiftUp()
  }
  deleteMin(){
    this.treeArr.shift()
    this.treeArr.unshift(this.treeArr.pop())
    this.shiftDown()
  }
}

// 测试
let heap = new Heap([8,6,9,4,3])
// console.log(heap.root.left)
heap.heapify()
heap.insert(12)
heap.deleteMin()
console.log('heapify', heap)
console.log(Math.floor(Math.log2(12+1)+1))