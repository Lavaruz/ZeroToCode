function diagonalDifference(arr) {
    let d1 = arr.map((item, index) => item[index])
                .reduce((acum,a) => acum+a)
    let d2 = arr.reverse().map((item, index) => item[index])
                .reduce((acum,a) => acum+a)
    return Math.abs(d1-d2)
}

const arr = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

console.log(diagonalDifference(arr));
