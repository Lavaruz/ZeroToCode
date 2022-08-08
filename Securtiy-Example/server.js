const express = require('express')
const helmet = require('helmet')
const https = require('https')
const fs = require('fs')

const app = express()
app.use(helmet())
app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/secret', (req,res) =>{
    res.send('This is secret')
})

https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
},app).listen(3000, () => console.log('server run'))