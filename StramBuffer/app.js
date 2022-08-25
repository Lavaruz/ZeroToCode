const fs = require('fs')
const path = require('path')

fs.createReadStream(path.join(__dirname, 'text.txt'))
    .on('data', (chunk)=>{
        console.log(chunk)
        console.log(Date.now());
    })