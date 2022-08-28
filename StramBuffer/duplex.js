const {Duplex, PassThrough} = require('stream')
const fs = require('fs')

const start = Date.now()


class Torrtle extends Duplex{
    constructor(ms){
        super()
        this.delay = ms
    }
    _read(){}
    _write(chunk, encoding, callback){
        this.push(chunk)
        setTimeout(callback, this.delay)
    }
    _final(){
        this.push(null)
    }
}


const writeStream = fs.createWriteStream('copy.mp4')
const readStream = fs.createReadStream('./anime_dancing.mp4')

const report = new PassThrough()
const torrtle = new Torrtle(100)

let total = 0
report.on('data', chunk=>{
    total += chunk.length
    console.log(`Bytes : ${total}`);
})

readStream.pipe(torrtle).pipe(report).pipe(writeStream).on('close',()=> {
    const end = Date.now()
    console.log(end - start);
})

