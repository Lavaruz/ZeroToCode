const fs = require('fs')
const file = './anime_dancing.mp4'

const readStream = fs.createReadStream(file)
const writeStream = fs.createWriteStream('./copy.mp4')
    
readStream.on('data', (chunk) => {
    const result = writeStream.write(chunk)
    if(!result){
        console.log('backpressure');
        readStream.pause()
    }
})

writeStream.on('drain', ()=>{
    console.log('dry');
    readStream.resume()
})



// readStream.pause()

// process.stdin.on('data', chunk =>{
//     // console.log('echo: ' + chunk.toString().trim());
//     readStream.resume()
// })

// fs.readFile(file, (err, data)=>{
//     console.log(data)
// })