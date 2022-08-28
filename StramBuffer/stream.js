const fs = require('fs')
const file = './anime_dancing.mp4'

const readStream = fs.createReadStream(file)
    
readStream.on('data', (chunk) => {
    console.log(chunk);
})

readStream.pause()

process.stdin.on('data', chunk =>{
    // console.log('echo: ' + chunk.toString().trim());
    readStream.resume()
})

// fs.readFile(file, (err, data)=>{
//     console.log(data)
// })