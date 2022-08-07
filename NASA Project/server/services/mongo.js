const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const mongoose = require('mongoose')

DATABASE_KEY = process.env.NASA_DATABASE_KEY
DATABASE_CONNECT = `mongodb+srv://Lavaruz:${DATABASE_KEY}@clusternasaproject.qykq0vb.mongodb.net/?retryWrites=true&w=majority`

async function mongoConnect(){
    await mongoose.connect(DATABASE_CONNECT)
}

module.exports = {
    mongoConnect
}