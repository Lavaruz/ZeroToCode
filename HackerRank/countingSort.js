const a = [1,1,4,2,5,6,3,3]
let zeros = Array(10).fill(0)

a.map(item => zeros[item] += 1)

console.log(zeros);