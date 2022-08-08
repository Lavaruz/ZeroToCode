const express = require('express')
const helmet = require('helmet')

const app = express()

app.get('/', (req, res) => {
    res.send('home page')
})

app.get('/secret', (req,res) =>{
    res.send('This is secret')
})

app.listen(3000, () => console.log('server run'))