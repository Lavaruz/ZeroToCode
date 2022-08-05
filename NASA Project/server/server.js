require('dotenv').config()
const cors = require('cors')
const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const { planetsRouter } = require('./src/routes/planets/planets.routes')
const { launchesRouter } = require('./src/routes/launches/launches.router')
const { loadPlanets } = require('./src/model/planets.model')

PORT = process.env.PORT || 8000

DATABASE_KEY = process.env.NASA_DATABASE_KEY
DATABASE_CONNECT = `mongodb+srv://Lavaruz:${DATABASE_KEY}@clusternasaproject.qykq0vb.mongodb.net/?retryWrites=true&w=majority`
app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/planets' ,planetsRouter)
app.use('/launches',launchesRouter)

app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

async function startServer(){
    await mongoose.connect(DATABASE_CONNECT)
    await loadPlanets()
    app.listen(PORT, ()=> console.log('Run at port '+ PORT))
}
startServer()