const cluster = require('cluster')
const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    res.send('Run in ' + process.pid)
})


console.log('run server.js...');
if (cluster.isMaster){
    console.log('run on master cluster.');
    cluster.fork()
    cluster.fork()
}else{
    console.log('run on worker cluster..');
}

app.listen(3000, ()=>{
    console.log('run on port 3000');
})