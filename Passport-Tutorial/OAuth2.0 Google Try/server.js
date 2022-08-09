const express = require('express')
const helmet = require('helmet')
const https = require('https')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'base.html'))
})

app.get('/secret', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'secret.html'))
})

https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
},app).listen(3000, () => console.log('server run'))