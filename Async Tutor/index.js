const promise = new Promise((resolve, reject) =>{
    resolve('HI')
})

Promise.all([promise])
    .then(res => console.log(res))