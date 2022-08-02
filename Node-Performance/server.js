const cluster = require('cluster')
const os = require('os')
const express = require('express')
const app = express()

function delay(duration){
    const startTime = Date.now()
    while(Date.now() - startTime < duration){
        // blcking
    }
}


app.get('/', (req,res)=>{
    res.send('Run in ' + process.pid)
})

app.get('/timer',(req,res)=>{
    delay(5000)
    res.send('Run timer in '+ process.pid)
})


console.log('run server.js...');
if (cluster.isMaster){
    NUM_WORKER = os.cpus().length
    for (const i of Array(NUM_WORKER).keys()){
        cluster.fork()
    }
    // cluster.fork()
}else{
    console.log('run on worker cluster..');
    app.listen(3000, ()=>{
        console.log('run on port 3000');
    })
}
