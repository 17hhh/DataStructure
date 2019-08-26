let arr = []
for(let i=1; i<=100; i++){
  arr.push(i)
}
function isPrime(params) {
  if(params === 1) return false
  let k = 0
  for(let i=1; i<=params; i++){
    if(params%i === 0){
      k++
    }
  }
  if(k === 2) return true
  else return false
}
let primeArr = arr.filter(item=>{
  if(isPrime(item)){
    return item
  }
})
let squareArr = primeArr.map(item=>item*item)
function sum(s,elem){
  return s+elem
}
let s = squareArr.reduce(sum)
console.log(s)