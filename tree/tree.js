class Position{
  constructor(node){
    this.id = node
    this.element = node
  }
}

class Node{
  constructor(elem, parent=null){
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
}

let Tree = Node;

//test
let tree = new Tree(1);
let n2 = tree.add_children(new Node(2, tree))
let n3 = tree.add_children(new Node(3, tree))
let n4 = n2.add_children(new Node(4, n2));
let n5 = n2.add_children(new Node(5, n2));

//先序
function preorderTranverse(tree, op){
  op(tree.data);
  for(let t of tree.children){
    preorderTranverse(t, op);
  }
}

preorderTranverse(tree, console.log);
console.log('-------')
//后序
function postorderTranverse(tree,op){
  for(let item of tree.children){
    postorderTranverse(item, op)
  }
  op(tree.data)
}

postorderTranverse(tree, console.log)
console.log(tree.children[0].children)