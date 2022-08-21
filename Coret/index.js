let arr = "hello-world-grming_mamang".split(/[-_]+/)
let ass = arr.slice(1).map(a => {
    if(a !== a[0]){
        return a.charAt(0).toUpperCase() + a.slice(1) 
    }
})

console.log(arr[0]+ass.join(''));