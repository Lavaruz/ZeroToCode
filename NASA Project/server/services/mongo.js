const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const mongoose = require('mongoose')

DATABASE_CONNECT = process.env.DATABASE_AUTH

async function mongoConnect(){
    await mongoose.connect(DATABASE_CONNECT)
}

module.exports = {
    mongoConnect
}