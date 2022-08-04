
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
app.listen(3000, ()=>{
    console.log('run on port 3000');
})
