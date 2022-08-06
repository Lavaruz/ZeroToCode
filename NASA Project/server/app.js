const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const { planetsRouter } = require('./src/routes/planets/planets.routes')
const { launchesRouter } = require('./src/routes/launches/launches.router')

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/planets' ,planetsRouter)
app.use('/launches',launchesRouter)

app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app
