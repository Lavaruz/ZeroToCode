const cors = require('cors')
const express = require('express')
const app = express()

const { planetsRouter } = require('./src/routes/planets/planets.routes')
const { launchesRouter } = require('./src/routes/launches/launches.router')
const { loadPlanets } = require('./src/model/planets.model')

app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())
app.use('/planets' ,planetsRouter)
app.use('/launches',launchesRouter)

async function startServer(){
    await loadPlanets()
    app.listen(8000, ()=> console.log('Run at port 8000'))
}
startServer()