class Position{
  constructor(node){
    this.id = node
    this.element = node
  }
}

class Node{
  constructor(elem, parent){
    this.data = elem
    this.parent = parent
    this.children = []
  }
  position(){
    return new Position(this)
  }
  add_children(node){
    this.children.push(node)
    return node
  }
  preorderTranverse(op){
    op(this)
    for(let item of this.children){
      this.preorderTranverse.call(item, op)
    }
  }
  postorderTranverse(op=null){
    for(let item of this.children){
      this.postorderTranverse.call(item, op)
    }
    op(this)
  }
  breadthTranverse(op){
    let queue = []
    queue.push(this)
    while(queue.length){
      let n = queue.shift()
      op(n)
      for(let node of n.children){
        queue.push(node)
      }
    } 
  }
}

class Tree extends Node {
  constructor(rootValue){
    super(rootValue, null)
  }
  find(elem){
    let findNode
    this.breadthTranverse((node)=>{
      if(node.data===elem) findNode = node
    })
    return findNode
  }
}

//test
// let tree = new Tree(1);
// let n2 = tree.add_children(new Node(2, tree))
// let n3 = tree.add_children(new Node(3, tree))
// let n4 = n2.add_children(new Node(4, n2));
// let n5 = n2.add_children(new Node(5, n2));


// function preorderTranverse(tree, op){
//   op(tree.data);
//   for(let t of tree.children){
//     preorderTranverse(t, op);
//   }
// }

// preorderTranverse(tree, console.log);
// tree.preorderTranverse(x=>console.log(x.data))
// tree.postorderTranverse(x=>console.log(x.data))
// tree.breadthTranverse(x=>console.log(x.data))
// console.log(tree.find(2))

// json数据存储
let tree = new Tree('corporation')
let n2 = tree.add_children(new Node('department', tree))
let n3 = n2.add_children(new Node('finance', n2))
let n4 = n2.add_children(new Node('marketing', n2));
let n5 = n2.add_children(new Node('production', n2));
let n6 = n3.add_children(new Node('accountant', n3))
let n7 = n4.add_children(new Node('salers', n4))
let n8 = n5.add_children(new Node('designer', n5))
let n9 = n5.add_children(new Node('developper', n5))
let n10 = n6.add_children(new Node('a1', n6))
let n11 = n6.add_children(new Node('a2', n6))
let n12 = n7.add_children(new Node('s1', n7))
let n13 = n7.add_children(new Node('s2', n7))
let n14 = n7.add_children(new Node('s3', n7))
let n15 = n8.add_children(new Node('d1', n8))
let n16 = n8.add_children(new Node('d2', n8))
let n17 = n9.add_children(new Node('dev1', n9))
let n18 = n9.add_children(new Node('dev2', n9))
// tree.preorderTranverse(x=>console.log(x.data))
// tree.postorderTranverse(x=>console.log(x.data))
// tree.breadthTranverse(x=>console.log(x.data))

//打印人员”dev1” 所属的部门链：由高级到低级
let findNode = tree.find('dev1')
let linkStr = ''
function printDev1Link(node){
  if(!node) return
  printDev1Link(node.parent)
  if(node.parent) linkStr+='->'+node.data
  else linkStr = node.data
}
printDev1Link(findNode)
console.log(linkStr)

let levelStr = ''
function printLevelLink(node){
  let queue = []
  let curLevel = -1
  queue.push(node)
  node.level = 0
  while(queue.length){
    let n = queue.shift()
    if(curLevel !== n.level){
      if(curLevel !== -1) levelStr+='\n'
      levelStr += `${n.level}. `
      curLevel = n.level
    }
    levelStr += n.data + ', '
    for(let childNode of n.children){
      childNode.level = curLevel + 1
      queue.push(childNode)
    }
  }
}
printLevelLink(tree)
console.log(levelStr)

tree.preorderTranverse((node)=>{
  console.log(`${' '.repeat(node.level * 2)}- ${node.data}`)
})
