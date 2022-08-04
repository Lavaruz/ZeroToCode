const mongoose = require('mongoose')


const planetsSchema = new mongoose.Schema({
    planetName : {
        type: String,
        require: true
    }
})

module.exports = mongoose.Model('Planet', planetsSchema)