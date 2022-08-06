require('dotenv').config()
const mongoose = require('mongoose')
const http = require('http')

const { loadPlanets } = require('./src/model/planets.model')
const app = require('./app')

const PORT = process.env.PORT || 8000
const server = http.createServer(app)

DATABASE_KEY = process.env.NASA_DATABASE_KEY
DATABASE_CONNECT = `mongodb+srv://Lavaruz:${DATABASE_KEY}@clusternasaproject.qykq0vb.mongodb.net/?retryWrites=true&w=majority`

async function startServer(){
    await mongoose.connect(DATABASE_CONNECT)
    await loadPlanets()
    server.listen(PORT, ()=> console.log('Run at port '+ PORT))
}
startServer()